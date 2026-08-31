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

/**
 * followUps is here because the rewrite step is asked for them and used to have them
 * parsed away. The answer step sometimes returns none despite being told to always
 * give two or three, and these are the fallback, already paid for.
 */
export type Rewrite = {
  queries: string[];
  situation: string;
  outOfScope: boolean;
  followUps: string[];
};

export type Shape = "quoted" | "conditional" | "asked_back" | "routed" | "out_of_scope";

export type Answer = {
  shape: Shape;
  answer: string;
  usedSectionIds: string[];
  options: string[];
  followUps: string[];
  cannotAnswer: boolean;
};

/**
 * TWO WAYS TO REACH A MODEL, AND THE ORDER MATTERS.
 *
 * If VITE_ASSISTANT_PROXY is set, the page posts to that proxy, which holds one shared key
 * server-side. A reader asks a question without signing up for anything. When the shared
 * allowance runs out for the day, the proxy says so by name, and the page can then offer the
 * reader their own key.
 *
 * Without the proxy, or once a reader has supplied a key, the page talks to Groq directly
 * with that key, which never leaves their browser.
 */
const PROXY = (import.meta.env.VITE_ASSISTANT_PROXY ?? "").replace(/\/$/, "");
const GROQ_DIRECT = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

export const hasSharedKey = Boolean(PROXY);

/** Which provider answered the most recent call, for the page's status line. */
export let lastAnsweredBy = "";
export let lastProviderLabel = "";

/**
 * What to call each provider to a reader. They will see the name change when one
 * allowance runs out and the proxy moves to the next, and an unexplained change of voice
 * is unsettling, so the page says which model and why.
 */
const PROVIDER_LABELS: Record<string, string> = {
  "workers-ai": "Llama 3.3 70B on Cloudflare",
  groq: "gpt-oss 120B on Groq",
  gemini: "Gemini Flash",
  cerebras: "Llama on Cerebras",
  openrouter: "a free model via OpenRouter",
  own: "gpt-oss 120B on your key",
};

/** Which route answered, so the page can say so and handle its limits differently. */
export type Route = "shared" | "own";

/**
 * Nothing was out of quota; the shared models simply could not produce a usable answer.
 * Kept apart from SharedExhausted because "come back tomorrow" is wrong advice for it.
 */
export class SharedUnavailable extends Error {
  constructor() {
    super("No shared model could answer this one.");
    this.name = "SharedUnavailable";
  }
}

export class SharedExhausted extends Error {
  constructor() {
    super("The shared allowance for today is used up.");
    this.name = "SharedExhausted";
  }
}

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
async function call<T>(
  key: string,
  prompt: string,
  maxTokens: number,
  step: "rewrite" | "answer",
  attempt = 1,
): Promise<T> {
  /* no key means the shared proxy, which holds one; a key means talk to Groq directly */
  const viaProxy = !key && Boolean(PROXY);
  const res = await fetch(viaProxy ? PROXY : GROQ_DIRECT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(viaProxy ? {} : { Authorization: `Bearer ${key}` }),
    },
    body: JSON.stringify({
      /*
       * "step" is ours, not the API's: the proxy leads with a different provider per step,
       * see worker/index.js. It must go ONLY to the proxy. Groq is strict about unknown
       * properties and answers a request carrying it with 400, "property 'step' is
       * unsupported", so sending it unconditionally broke every question asked by a reader
       * holding their own key while leaving the shared path working.
       */
      ...(viaProxy ? { step } : {}),
      model: MODEL,
      temperature: 0,
      reasoning_effort: "low",
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const detail = key ? (await res.text()).replaceAll(key, "[key]") : await res.text();

    /**
     * The proxy names the two rate limits apart, because a reader needs different things
     * from them: busy means wait, exhausted means the day is gone and their own key is the
     * only way through today.
     */
    if (viaProxy && res.status === 429) {
      if (/shared_exhausted/.test(detail)) throw new SharedExhausted();
      if (/shared_unavailable/.test(detail)) throw new SharedUnavailable();
      const wait = Number(detail.match(/"retryAfterSeconds":\s*(\d+)/)?.[1] ?? 25);
      if (attempt < 4) {
        await new Promise((r) => setTimeout(r, Math.min(60, wait + 2) * 1000));
        return call<T>(key, prompt, maxTokens, step, attempt + 1);
      }
      throw new SharedExhausted();
    }
    if ((res.status === 503 || res.status === 500) && attempt < 4) {
      await new Promise((r) => setTimeout(r, attempt * 4000));
      return call<T>(key, prompt, maxTokens, step, attempt + 1);
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
      return call<T>(key, prompt, maxTokens, step, attempt + 1);
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

  /**
   * The proxy names which provider answered, because with several free keys in play the
   * reader is better told than left guessing why an answer reads differently.
   */
  lastAnsweredBy = res.headers.get("X-Answered-By") ?? (viaProxy ? "shared" : "own");
  lastProviderLabel = PROVIDER_LABELS[lastAnsweredBy] ?? lastAnsweredBy;

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string }; finish_reason?: string }>;
  };
  const text = json.choices?.[0]?.message?.content;
  if (!text) throw new Error("The model returned nothing. Try again.");
  return JSON.parse(text) as T;
}

/** Straight quotes and ordinary hyphens, whatever the model produced. */
/**
 * Phrases that name our own machinery, and what the reader should see instead.
 *
 * A reader cannot see the sections that were retrieved and does not know a retrieval step
 * exists, so "No single answer is provided in the material" reads as a machine talking about
 * itself. The prompt has been told not to write these and still does, so they come out here,
 * where compliance is not required.
 *
 * Every pattern below was checked against the 1107 sections the browser downloads and appears
 * in none of them, so a scrub cannot corrupt an answer that is quoting the guide correctly.
 * That check matters: "the material" on its own is guide prose six times over, in "prepares
 * the material" and "supplies the material" about a board submission, so the broad form of
 * this rule would have rewritten a correct answer. Check anything added here the same way.
 */
const PLUMBING: Array<[RegExp, string]> = [
  [/\bin the (?:provided|supplied|given) material\b/gi, "in the guide"],
  [/\bin the material provided\b/gi, "in the guide"],
  [/\bthe (?:provided|supplied|given) material\b/gi, "the guide"],
  [/\bin the material\b/gi, "in the guide"],
  [/\bthe material (covers|says|states|gives|provides)\b/gi, "the guide $1"],
  [/\bthe sections (?:you have|provided|supplied)\b/gi, "the guide"],
  [/\bno section (?:supplies|provides|gives)\b/gi, "the guide does not give"],
  [/\bthese sources\b/gi, "the guide"],
  [/\bthe (?:provided|supplied) (?:text|context|sections)\b/gi, "the guide"],
  [/\bthe context provided\b/gi, "the guide"],
  /*
   * The prompt labels each supplied section "--- SECTION 1 id=create-discovery#0" so the model
   * can cite one in usedSectionIds. It sometimes writes the label into the prose instead, and
   * "(Section id=create-discovery#0)" appeared in a live answer. The page already lists where
   * an answer came from, with real titles and links, so the raw id is noise at best.
   */
  [/\s*\((?:section\s+)?id=[^)]*\)/gi, ""],
  [/\s*\(section\s+\d+(?:\s*,\s*id=[^)]*)?\)/gi, ""],
];

function normalise(t: string): string {
  let out = t
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‑‒–—]/g, "-")
    .replace(/ /g, " ");
  for (const [pattern, replacement] of PLUMBING) out = out.replace(pattern, replacement);
  /* if two rules meet on one phrase, do not leave "the guide provided" behind */
  out = out.replace(/\bthe guide (?:provided|supplied|given)\b/gi, "the guide");
  /*
   * The phrases replaced above are plural, "the sections you have", "these sources", so the
   * verb after them is plural too and "the guide do not cover it" is what comes out. Put the
   * agreement back rather than leaving the reader a sentence that reads as broken English.
   */
  return out
    .replace(/\bthe guide do not\b/gi, "the guide does not")
    .replace(/\bthe guide (cover|mention|say|state|give|provide|include|list)\b/gi, "the guide $1s")
    .replace(/\bthe guide are\b/gi, "the guide is")
    .replace(/\bthe guide have\b/gi, "the guide has");
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
    "rewrite",
  );
  return {
    queries: (raw.queries ?? []).map((q) => String(q).trim()).filter(Boolean).slice(0, 3),
    situation: String(raw.situation ?? "").trim(),
    outOfScope: Boolean(raw.outOfScope),
    followUps: (raw.followUps ?? [])
      .map((f) => String(f).trim())
      .filter(Boolean)
      .slice(0, 3),
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
    "answer",
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
