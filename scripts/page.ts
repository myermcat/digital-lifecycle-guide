/**
 * The page's pipeline, from the command line.
 *
 * WHY THIS EXISTS. scripts/ask.ts and scripts/answer.ts are not the page, and believing they
 * were produced three separate "fixed" reports on 28 August that were false on the live site:
 * a retrieval change, a rewrite hint and a wording rule all worked here and not there. Two
 * things differed, and both mattered.
 *
 *   The corpus. build-corpus.ts writes corpus/sections.json, everything it extracted, and
 *   public/assistant/sections.json, the slice the browser downloads. The older scripts load
 *   the first. Since the French content files landed that is 2852 sections against the
 *   reader's 1107, more than half of it French duplicates and /unmapped/ modules like
 *   ui-strings, which a reader can never retrieve.
 *
 *   The model. The older scripts post straight to Groq. The page posts to the worker, which
 *   leads with a different provider per step, so the rewrite a reader gets is written by a
 *   different and smaller model than the one the command line used.
 *
 * This runs the browser slice through the shared Retriever, pools the raw question with the
 * rewrites exactly as the component does, and posts to the proxy with the same "step" field,
 * so the providers resolve the way they do for a reader. It prints what the model was GIVEN
 * as well as what it said, because "the guide does not give a duration" from a model holding
 * the duration is a different defect from not retrieving it.
 *
 *   npx tsx scripts/page.ts "how long does a procurement take"
 *   npx tsx scripts/page.ts --json "..."      the raw answer object, for options and followUps
 *
 * It is still not the page: no React, no rendering. Anything about what a reader SEES still
 * has to be checked in a browser.
 */

import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Retriever, poolSections, type Section } from "../src/lib/assistant/retrieval";
import { bridgeQueries } from "../src/lib/assistant/vocabulary";
import { buildRewritePrompt, buildAnswerPrompt, buildContents } from "../src/lib/assistant/prompts";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(HERE, "..");
const SLICE = join(PROJECT, "public", "assistant");

const args = process.argv.slice(2);
const asJson = args.includes("--json");

/** Which provider answered each step, for the summary line. */
const lastProviders: Record<string, string> = {};
const question = args.filter((a) => !a.startsWith("--")).join(" ");

if (!question) {
  console.log('Usage: npx tsx scripts/page.ts "your question"');
  process.exit(0);
}

/** The proxy the page uses. Read from .env.local so this file holds no address of its own. */
async function proxyUrl(): Promise<string> {
  const env = await readFile(join(PROJECT, ".env.local"), "utf8").catch(() => "");
  const line = env.split("\n").find((l) => l.startsWith("VITE_ASSISTANT_PROXY="));
  const url = line?.slice("VITE_ASSISTANT_PROXY=".length).trim().replace(/\/$/, "");
  if (!url) throw new Error("VITE_ASSISTANT_PROXY is not set in .env.local");
  return url;
}

/** The same body the page sends, including the "step" the proxy reads to pick a provider. */
async function call<T>(
  url: string,
  prompt: string,
  maxTokens: number,
  step: "rewrite" | "answer",
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://myermcat.github.io" },
    body: JSON.stringify({
      step,
      model: "openai/gpt-oss-120b",
      temperature: 0,
      reasoning_effort: "low",
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${step} returned ${res.status}. ${text.slice(0, 300)}`);
  /*
   * Which provider answered decides what the reply looks like, and the worker says so in a
   * header. It matters most on the rewrite: ORDER.rewrite leads with Workers AI, a much
   * smaller model than the Groq one that writes the answer, so a rule added to the rewrite
   * prompt can be followed by the answer step and ignored by the rewrite step. That is why a
   * rewrite hint tested against Groq from the command line did not hold on the page.
   */
  const answeredBy = res.headers.get("X-Answered-By") ?? "unknown";
  const body = JSON.parse(text);
  const content = body?.choices?.[0]?.message?.content ?? "";
  if (!asJson) console.log(`  (${step} answered by ${answeredBy})`);
  lastProviders[step] = answeredBy;
  return JSON.parse(content) as T;
}

async function main() {
  const url = await proxyUrl();
  const sections = JSON.parse(await readFile(join(SLICE, "sections.json"), "utf8")) as Section[];
  const map = JSON.parse(await readFile(join(SLICE, "map.json"), "utf8"));
  const retriever = new Retriever(sections);

  if (!asJson) console.log(`corpus: ${sections.length} sections, the slice a reader downloads\n`);

  const rewritten = await call<{ queries?: string[]; situation?: string; followUps?: string[] }>(
    url,
    buildRewritePrompt(question, buildContents(map)),
    1200,
    "rewrite",
  );
  const queries = (rewritten.queries ?? []).map(String).filter(Boolean).slice(0, 3);
  if (!asJson) console.log(`rewritten: ${queries.join(" | ")}`);

  /* the same shared function the component calls, so this cannot drift from the page */
  const bridge = bridgeQueries(question);
  if (!asJson && bridge.length) console.log(`bridge:    ${bridge.join(" | ")}`);
  const { given } = poolSections(retriever, question, queries, bridge);

  if (!asJson) {
    console.log(`\ngiven to the model:`);
    for (const s of given) console.log(`   ${s.page} · ${s.heading}`);
  }

  const written = await call<Record<string, unknown>>(
    url,
    buildAnswerPrompt(question, given, rewritten.situation),
    1500,
    "answer",
  );

  if (asJson) {
    console.log(
      JSON.stringify(
        {
          queries,
          rewriteFollowUps: rewritten.followUps ?? [],
          given: given.map((s) => `${s.page} · ${s.heading}`),
          answer: written,
        },
        null,
        1,
      ),
    );
    return;
  }

  console.log(`\n${String(written.shape ?? "?").toUpperCase()}`);
  console.log("-".repeat(72));
  console.log(String(written.answer ?? ""));
  const options = (written.options ?? []) as string[];
  const followUps = (written.followUps ?? []) as string[];
  console.log(`\noptions:   ${options.length ? options.join(" / ") : "(none)"}`);
  console.log(
    `followUps: ${followUps.length ? followUps.join(" / ") : `(none from the answer step; the page falls back to the rewrite's ${(rewritten.followUps ?? []).length})`}`,
  );
}

main();
