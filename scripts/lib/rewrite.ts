/**
 * Query rewriting: the step that turns how people ask into how the guide speaks.
 *
 * WHY THIS EXISTS. Mechanical retrieval scored 100% in the top three on questions
 * that used the guide's own vocabulary, and 33% on twelve questions phrased the way
 * a person actually asks. "Nobody knows who owns this service any more" matched a
 * section about backups, on the word "nobody". The corpus is not the problem and the
 * ranking is not the problem: the question and the corpus share almost no words.
 *
 * So a small model reads the question and the guide's own table of contents, and
 * writes two or three queries in the guide's vocabulary. Retrieval then runs
 * unchanged. This is the cheapest possible use of a model: a short prompt, a few
 * tokens out, and no attempt to answer anything.
 *
 * Results are cached on disk, because re-running an eval should not spend the day's
 * free-tier quota on questions already answered.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { callJson, PROVIDERS, DEFAULT_PROVIDER, type Provider } from "./llm";
import { buildRewritePrompt, PROMPT_VERSION } from "../../src/lib/assistant/prompts";

export { buildContents } from "../../src/lib/assistant/prompts";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

export type Rewrite = {
  /** Search queries in the guide's vocabulary, best first. */
  queries: string[];
  /** What the reader seems to be trying to do, in the guide's terms. */
  situation: string;
  /** Set when the model judges the guide cannot answer this at all. */
  outOfScope: boolean;
};

/**
 * TWO PROVIDERS, BECAUSE OF ONE NUMBER.
 *
 * Gemini's free tier allows 20 requests per day per model, measured from the API
 * rather than taken from documentation, and only one model is reachable on a new key.
 * Twenty calls will not test forty questions. Groq's free tier allows about 1,000
 * requests a day at 6,000 tokens a minute, which fits, because the map-plus-rewrite
 * design keeps this prompt near 2,500 tokens. An earlier note in this project ruled
 * Groq out on that token limit, assuming a 15,000-token prompt. That assumption is
 * obsolete.
 *
 * So Groq is the workhorse for testing and Gemini is kept for quality comparison.
 * Neither is trusted with anything but public content: both free tiers should be
 * assumed to train on what they are sent.
 */

export type { Provider } from "./llm";

/** Read a provider's key without a dotenv dependency. Never logged, never echoed. */
export async function loadKey(projectDir: string, provider: Provider = DEFAULT_PROVIDER): Promise<string> {
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

type Cache = Record<string, Rewrite>;

export class Rewriter {
  private cache: Cache = {};

  private constructor(
    private readonly key: string,
    private readonly contents: string,
    private readonly cachePath: string,
    private readonly model: string,
    private readonly provider: Provider,
  ) {}

  static async create(opts: {
    key: string;
    /** Compact table of contents: page titles and their leading section headings. */
    contents: string;
    cachePath: string;
    provider?: Provider;
    model?: string;
  }) {
    const provider = opts.provider ?? DEFAULT_PROVIDER;
    const r = new Rewriter(
      opts.key,
      opts.contents,
      opts.cachePath,
      opts.model ?? PROVIDERS[provider].model,
      provider,
    );
    if (existsSync(opts.cachePath)) {
      r.cache = JSON.parse(await readFile(opts.cachePath, "utf8")) as Cache;
    }
    return r;
  }

  get modelName() {
    return `${this.provider}/${this.model}`;
  }

  get cacheSize() {
    return Object.keys(this.cache).length;
  }

  async rewrite(question: string, opts: { fresh?: boolean } = {}): Promise<Rewrite> {
    const cacheKey = `v${PROMPT_VERSION}::${this.provider}/${this.model}::${question}`;
    if (!opts.fresh && this.cache[cacheKey]) return this.cache[cacheKey];
    const clean = await this.request(question);
    this.cache[cacheKey] = clean;
    await mkdir(dirname(this.cachePath), { recursive: true });
    await writeFile(this.cachePath, JSON.stringify(this.cache, null, 2), "utf8");
    return clean;
  }

  private async request(question: string): Promise<Rewrite> {
    /**
     * Transport, retries and the JSON handling all live in llm.ts, so the two places
     * that call a model cannot drift apart on the traps documented there.
     */
    const parsed = await callJson<Rewrite>({
      provider: this.provider,
      key: this.key,
      model: this.model,
      prompt: buildRewritePrompt(question, this.contents),
      maxTokens: 1200,
      schema: {
        type: "OBJECT",
        properties: {
          queries: { type: "ARRAY", items: { type: "STRING" } },
          situation: { type: "STRING" },
          outOfScope: { type: "BOOLEAN" },
        },
        required: ["queries", "situation", "outOfScope"],
      },
    });

    return {
      queries: (parsed.queries ?? []).map((q) => String(q).trim()).filter(Boolean).slice(0, 3),
      situation: String(parsed.situation ?? "").trim(),
      outOfScope: Boolean(parsed.outOfScope),
    };
  }
}

