/**
 * The whole pipeline on one question: rewrite, retrieve, answer.
 *
 *   npx tsx scripts/answer.ts "can I just extend the old contract"
 *   npx tsx scripts/answer.ts --no-rewrite "..."   skip the rewrite, to see its effect
 *   npx tsx scripts/answer.ts --gemini "..."       compare providers
 *   npx tsx scripts/answer.ts --reference "..."    let it read the PSPC guide too
 */

import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { loadRetriever, deepLink } from "./lib/retrieval";
import { selectSections } from "../src/lib/assistant/retrieval";
import { Rewriter, buildContents } from "./lib/rewrite";
import { answerQuestion } from "./lib/answer";
import { loadKey, type Provider } from "./lib/llm";
import type { Section } from "../src/lib/assistant/retrieval";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(HERE, "..");
const CORPUS = resolve(PROJECT, "corpus");

const args = process.argv.slice(2);
const provider: Provider = args.includes("--gemini") ? "gemini" : "groq";
const noRewrite = args.includes("--no-rewrite");
const withReference = args.includes("--reference");
const question = args.filter((a) => !a.startsWith("--")).join(" ");

if (!question) {
  console.log('Usage: npx tsx scripts/answer.ts "your question"');
  process.exit(0);
}

const retriever = await loadRetriever(CORPUS, { includeReference: withReference });
const key = await loadKey(PROJECT, provider);

let situation: string | undefined;
let sections: Section[] = [];

if (noRewrite) {
  sections = retriever.search(question, 4).hits.map((h) => h.section);
} else {
  const map = JSON.parse(await readFile(resolve(CORPUS, "map.json"), "utf8"));
  const rewriter = await Rewriter.create({
    key,
    contents: buildContents(map),
    cachePath: resolve(CORPUS, ".rewrite-cache.json"),
    provider,
  });
  const rewritten = await rewriter.rewrite(question);
  situation = rewritten.situation;
  console.log(`rewritten: ${rewritten.queries.join(" | ")}`);

  /**
   * Pool across the rewritten queries and keep the best few sections. Summing rather
   * than taking the maximum, so a section two queries agree on outranks one that a
   * single query liked a lot.
   */
  const pooled = new Map<string, { section: Section; score: number }>();
  /* the reader's own words go in the pool too, so a bad rewrite cannot lose a good hit */
  for (const q of [question, ...rewritten.queries]) {
    for (const hit of retriever.search(q, 5).hits) {
      const prev = pooled.get(hit.section.id);
      pooled.set(hit.section.id, {
        section: hit.section,
        score: (prev?.score ?? 0) + hit.score,
      });
    }
  }
  sections = selectSections([...pooled.values()], 4, 2);
}

const budget = sections.reduce((a, s) => a + s.tokens, 0);
console.log(`retrieved: ${sections.map((s) => s.heading).join(" | ")}`);
console.log(`context:   ${sections.length} sections, ~${budget} tokens\n`);

const result = await answerQuestion({ question, sections, situation, provider, key });

const LABEL: Record<string, string> = {
  quoted: "QUOTED · the material states it",
  conditional: "CONDITIONAL · the dependency is the answer",
  asked_back: "ASKED BACK · one question decides it",
  routed: "ROUTED · no fixed answer exists",
};

console.log(LABEL[result.shape] ?? result.shape);
console.log("-".repeat(72));
console.log(result.answer);

if (result.options.length) {
  console.log("\noptions:");
  for (const o of result.options) console.log(`  [ ${o} ]`);
}

if (result.citedSections.length) {
  console.log("\nfrom:");
  for (const s of result.citedSections) {
    console.log(`  ${s.page} · ${s.heading}`);
    console.log(`    ${deepLink(s)}`);
  }
}

if (result.followUps.length) {
  console.log("\nnext:");
  for (const f of result.followUps) console.log(`  ${f}`);
}

if (result.cannotAnswer) console.log("\n[the guide does not answer this]");
