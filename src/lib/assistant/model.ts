/**
 * The model calls, from the browser.
 *
 * WHERE THE KEY LIVES, AND WHY IT IS THE READER'S.
 *
 * The site is static and served from GitHub Pages, so anything the page can read, every
 * visitor can read. A shared key in the bundle would be published. So the page holds no
 * key of its own: it uses one the reader supplies, kept in their own browser storage and
 * sent only to the model provider.
 *
 * That is the arrangement for now, and it means the assistant is fully usable by anyone
 * willing to paste a free Groq key. The alternative is a small server holding one key on
 * everybody's behalf, and `endpoint` below is the seam for it: point it at that server
 * and nothing else in the page changes.
 *
 * Retrieval does not need any of this. It runs on the corpus in the browser, so the page
 * answers with the right sections whether or not a key is present.
 */

import { buildRewritePrompt, buildAnswerPrompt, buildContents, PROMPT_VERSION, type PriorTurn } from "./prompts";
import type { Section } from "./retrieval";

export type Rewrite = { queries: string[]; situation: string; outOfScope: boolean };

export type Shape = "quoted" | "conditional" | "asked_back" | "routed";

export type Answer = {
  shape: Shape;
  answer: string;
  usedSectionIds: string[];
  options: string[];
  followUps: string[];
  cannotAnswer: boolean;
};

/**
 * The seam for a server-held key. Point MODEL_ENDPOINT at a small proxy and the page
 * stops needing the reader's key; nothing else here changes.
 */
const MODEL_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

/** Shown in the page's status line, so the reader knows what answered. */
export const MODEL_LABEL = "gpt-oss-120b";

const KEY_STORAGE = "dlg-assistant-groq-key";

export function storedKey(): string {
  try {
    return window.localStorage.getItem(KEY_STORAGE) ?? "";
  } catch {
    return "";
  }
}

export function storeKey(key: string): void {
  try {
    if (key.trim()) window.localStorage.setItem(KEY_STORAGE, key.trim());
    else window.localStorage.removeItem(KEY_STORAGE);
  } catch {
    /* private browsing: the key simply does not persist */
  }
}

/**
 * One request. The traps here are the same three the command line hit, and they are
 * worth restating because the error messages point at the wrong thing:
 * the model reasons before answering and the reasoning is billed against max_tokens,
 * so too small a cap returns an empty response; the JSON mode requires the literal
 * word "json" in the prompt, which the prompts satisfy; and 503 is routine.
 */
async function call<T>(key: string, prompt: string, maxTokens: number, attempt = 1): Promise<T> {
  const res = await fetch(MODEL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0,
      reasoning_effort: "low",
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const detail = (await res.text()).replaceAll(key, "[key]");
    if ((res.status === 503 || res.status === 500) && attempt < 4) {
      await new Promise((r) => setTimeout(r, attempt * 4000));
      return call<T>(key, prompt, maxTokens, attempt + 1);
    }
    if (res.status === 401) throw new Error("That key was rejected. Check it and try again.");

    /**
     * The free tier allows 6,000 tokens a minute, and INPUT PLUS OUTPUT count against it,
     * which is how a single question could exhaust it. Waiting is the correct response, so
     * wait rather than reporting a failure the reader can do nothing about. Groq says how
     * long in the message; fall back to twenty seconds.
     */
    if (res.status === 429 && attempt < 4) {
      const seconds = Number(detail.match(/try again in ([\d.]+)s/i)?.[1] ?? 20);
      await new Promise((r) => setTimeout(r, Math.min(60, seconds + 2) * 1000));
      return call<T>(key, prompt, maxTokens, attempt + 1);
    }
    if (res.status === 429) {
      throw new Error(
        "The key is out of allowance for now. A free key allows 6,000 tokens a minute, " +
          "counting the answer as well as the question, so a couple of questions in quick " +
          "succession can reach it. Waiting a minute is usually enough.",
      );
    }
    throw new Error(`The model returned ${res.status}. ${detail.slice(0, 160)}`);
  }

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string }; finish_reason?: string }>;
  };
  const text = json.choices?.[0]?.message?.content;
  if (!text) throw new Error("The model returned nothing. Try again.");
  return JSON.parse(text) as T;
}

/** Straight quotes and ordinary hyphens, whatever the model produced. */
function normalise(t: string): string {
  return t
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‑‒–—]/g, "-")
    .replace(/ /g, " ");
}

export type MapEntry = { title: string; path: string; sections: string[] };

export async function rewriteQuestion(
  key: string,
  question: string,
  map: MapEntry[],
  previousQuestion?: string,
): Promise<Rewrite> {
  const raw = await call<Rewrite>(
    key,
    buildRewritePrompt(question, buildContents(map), previousQuestion),
    1200,
  );
  return {
    queries: (raw.queries ?? []).map((q) => String(q).trim()).filter(Boolean).slice(0, 3),
    situation: String(raw.situation ?? "").trim(),
    outOfScope: Boolean(raw.outOfScope),
  };
}

export async function answerFrom(
  key: string,
  question: string,
  sections: Section[],
  situation?: string,
  history: PriorTurn[] = [],
): Promise<Answer & { citedSections: Section[] }> {
  const raw = await call<Answer>(
    key,
    buildAnswerPrompt(question, sections, situation, history),
    1500,
  );
  const byId = new Map(sections.map((s) => [s.id, s]));
  // only cite what was actually supplied: an invented id would look checkable and lead nowhere
  const citedSections = (raw.usedSectionIds ?? [])
    .map((id) => byId.get(id))
    .filter((s): s is Section => Boolean(s));

  return {
    shape: raw.shape ?? "routed",
    answer: normalise(String(raw.answer ?? "").trim()),
    usedSectionIds: citedSections.map((s) => s.id),
    options: (raw.options ?? []).map(normalise),
    followUps: (raw.followUps ?? []).map(normalise),
    cannotAnswer: Boolean(raw.cannotAnswer),
    citedSections,
  };
}

export { PROMPT_VERSION };
export type { PriorTurn };
