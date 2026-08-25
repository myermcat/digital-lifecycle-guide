/**
 * One place for talking to a model, because the two steps that need it hit the same
 * three traps and neither is obvious from the error message.
 *
 * WHAT THIS EXISTS TO REMEMBER
 *
 * 1. Reasoning eats the output budget. Both gemini-3.x and gpt-oss reason before
 *    answering, and the reasoning is billed against the same cap as the answer. A cap
 *    set for the answer alone returns an empty response, and the error says the model
 *    produced nothing, which reads like an outage. Cap the reasoning, leave room.
 * 2. Groq's JSON mode requires the literal word "json" in the prompt. Without it the
 *    call is rejected as an invalid request, naming response_format rather than the
 *    prompt.
 * 3. Free tiers answer 429 for two different things. "Per minute" means slow down and
 *    retry. Anything else means the day is over, and retrying burns nothing but time.
 *    503 "high demand" is routine and clears in seconds.
 *
 * QUOTAS, MEASURED RATHER THAN READ. Gemini's free tier gives 20 requests per day per
 * model, and only one model is reachable on a new key. Groq gives about 1,000 a day at
 * 6,000 tokens a minute. Groq is therefore the default; Gemini is kept for comparison.
 *
 * Neither free tier should be trusted with anything but public content: assume both
 * train on what they are sent.
 */

import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

export type Provider = "gemini" | "groq";

export const PROVIDERS = {
  gemini: {
    /**
     * The alias, not a pinned version. Pinning does not survive contact: 2.5-flash
     * answers 404 "no longer available to new users", and a pinned 3.x spent its whole
     * daily allowance in six calls.
     */
    model: "gemini-flash-latest",
    keyVar: "GEMINI_API_KEY",
  },
  groq: {
    /**
     * Chosen from what a key actually offers rather than from documentation: a new Groq
     * key lists gpt-oss-120b, gpt-oss-20b and qwen3.6-27b, and not the Llama models most
     * write-ups name.
     */
    model: "openai/gpt-oss-120b",
    keyVar: "GROQ_API_KEY",
  },
} as const;

export const DEFAULT_PROVIDER: Provider = "groq";

/** Read a provider's key without a dotenv dependency. Never logged, never echoed. */
export async function loadKey(
  projectDir: string,
  provider: Provider = DEFAULT_PROVIDER,
): Promise<string> {
  const varName = PROVIDERS[provider].keyVar;
  const fromEnv = process.env[varName]?.trim();
  if (fromEnv) return fromEnv;

  const path = join(projectDir, ".env.local");
  if (!existsSync(path)) throw new Error(`no ${varName} and no ${path}`);
  const line = (await readFile(path, "utf8"))
    .split("\n")
    .find((l) => l.trim().startsWith(`${varName}=`));
  const key = line?.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
  if (!key) throw new Error(`.env.local has no value for ${varName}`);
  return key;
}

export type CallOptions = {
  provider: Provider;
  key: string;
  model?: string;
  prompt: string;
  maxTokens?: number;
  /** Gemini only. Groq has no equivalent for an arbitrary shape. */
  schema?: Record<string, unknown>;
};

/**
 * Ask for JSON and return the parsed object. Retries what is worth retrying and fails
 * loudly on what is not.
 */
export async function callJson<T>(opts: CallOptions, attempt = 1): Promise<T> {
  const { provider, key, prompt } = opts;
  const model = opts.model ?? PROVIDERS[provider].model;
  const maxTokens = opts.maxTokens ?? 1200;

  const body =
    provider === "gemini"
      ? {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0,
            thinkingConfig: { thinkingBudget: 0 },
            maxOutputTokens: maxTokens,
            responseMimeType: "application/json",
            ...(opts.schema ? { responseSchema: opts.schema } : {}),
          },
        }
      : {
          model,
          temperature: 0,
          reasoning_effort: "low",
          max_tokens: maxTokens,
          response_format: { type: "json_object" },
          messages: [{ role: "user", content: prompt }],
        };

  const url =
    provider === "gemini"
      ? `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`
      : "https://api.groq.com/openai/v1/chat/completions";

  const headers: Record<string, string> =
    provider === "gemini"
      ? { "Content-Type": "application/json" }
      : { "Content-Type": "application/json", Authorization: `Bearer ${key}` };

  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });

  if (!res.ok) {
    const detail = (await res.text()).replaceAll(key, "[key]");
    const perMinute = res.status === 429 && /per minute|RPM|rate/i.test(detail);
    const transient = res.status === 503 || res.status === 500;
    if ((perMinute || transient) && attempt < 6) {
      await new Promise((r) => setTimeout(r, transient ? attempt * 12_000 : attempt * 20_000));
      return callJson<T>(opts, attempt + 1);
    }
    throw new Error(`${provider} ${res.status}: ${detail.slice(0, 600)}`);
  }

  const json = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> }; finishReason?: string }>;
    choices?: Array<{ message?: { content?: string }; finish_reason?: string }>;
  };

  const text =
    provider === "gemini"
      ? json.candidates?.[0]?.content?.parts?.[0]?.text
      : json.choices?.[0]?.message?.content;

  if (!text) {
    const reason =
      json.candidates?.[0]?.finishReason ?? json.choices?.[0]?.finish_reason ?? "unknown";
    throw new Error(
      `${provider} returned no content (finish reason: ${reason}). ` +
        `If this says MAX_TOKENS, reasoning consumed the budget: raise maxTokens.`,
    );
  }

  return JSON.parse(text) as T;
}
