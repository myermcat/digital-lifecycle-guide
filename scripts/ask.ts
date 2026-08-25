/**
 * Ask the corpus a question, mechanically. No model, no key, no network.
 *
 *   npx tsx scripts/ask.ts "how long does a procurement take"
 *   npx tsx scripts/ask.ts --eval          run the built-in question set
 *   npx tsx scripts/ask.ts --full "..."       print whole sections, not snippets
 *   npx tsx scripts/ask.ts --reference "..."  include the PSPC guide (local only)
 *
 * This is the layer a model sits on top of. Run it on your own questions: if the
 * right section is not in the top three, no model will rescue the answer.
 */

import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadRetriever, deepLink } from "./lib/retrieval";

const HERE = dirname(fileURLToPath(import.meta.url));
const CORPUS = resolve(HERE, "..", "corpus");

/**
 * The question set is deliberately mixed: questions the guide answers well, questions
 * it deliberately refuses to answer with a number, and questions phrased the way
 * somebody who does not know the vocabulary would phrase them. The last group is the
 * one that fails first.
 */
const EVAL = [
  { q: "where does alpha stop and beta start", expect: "create-alpha" },
  { q: "how many years does a procurement run for", expect: "thread--procurement" },
  { q: "what do I need to prepare for GC EARB", expect: "gate-map" },
  { q: "do I need a PIA", expect: "thread--privacy" },
  { q: "when does a project go to the Treasury Board", expect: "thread--funding" },
  { q: "should we reuse buy or build", expect: "reference--options-analysis" },
  { q: "which accessibility standard applies now", expect: "thread--accessibility" },
  { q: "how do I decommission an application", expect: "sunset" },
  { q: "who signs off on the complexity assessment", expect: "gate-map" },
  // Discovery is the right landing place for somebody just handed a service, so the
  // original expectation of the Create phase page was wrong rather than the ranking.
  { q: "I was handed an application and do not know where to start", expect: "create-discovery" },
  // The contract is settled in Alpha: "Beta opens with the signature". Expecting the
  // Beta page was a misreading of the guide on my part.
  { q: "what has to be in the contract before beta opens", expect: "create-alpha" },
  { q: "how do I avoid getting stuck with one vendor", expect: "thread--procurement" },
  { q: "what should a live service be measuring", expect: "thread--monitoring-and-instrumentation" },
  { q: "how long is a TB submission", expect: "gate-map" },
  { q: "can I buy it in smaller pieces", expect: "thread--procurement" },
];

async function main() {
  const args = process.argv.slice(2);
  const full = args.includes("--full");
  const evalMode = args.includes("--eval");
  const query = args.filter((a) => !a.startsWith("--")).join(" ");

  const r = await loadRetriever(CORPUS, { includeReference: args.includes("--reference") });

  if (evalMode) {
    console.log(`${r.size} sections indexed. Checking whether the right page ranks in the top 3.\n`);
    let top1 = 0;
    let top3 = 0;
    const misses: string[] = [];

    for (const { q, expect } of EVAL) {
      const { hits } = r.search(q, 3);
      const slugs = hits.map((h) => h.section.slug);
      const at1 = slugs[0] === expect;
      const at3 = slugs.includes(expect);
      if (at1) top1++;
      if (at3) top3++;
      else misses.push(`${q}\n      wanted ${expect}, got ${slugs.join(", ") || "nothing"}`);
      console.log(`  ${at1 ? "1st" : at3 ? "top3" : "MISS"}  ${q}`);
      console.log(`        ${slugs.map((s, i) => `${i + 1}.${s}`).join("  ")}`);
    }

    console.log(`\n  first place  ${top1}/${EVAL.length}`);
    console.log(`  top three    ${top3}/${EVAL.length}`);
    if (misses.length) {
      console.log(`\n  misses, which are the ones worth fixing:`);
      for (const m of misses) console.log(`    - ${m}`);
    }
    return;
  }

  if (!query) {
    console.log('Usage: npx tsx scripts/ask.ts "your question"   (or --eval)');
    return;
  }

  const { hits, expansions, intents } = r.search(query, full ? 3 : 6);

  console.log(`\n"${query}"`);
  if (expansions.length) console.log(`  expanded: ${expansions.join("; ")}`);
  if (intents.length) console.log(`  reads as a ${intents.join(" and ")} question, so sections carrying one rank higher`);
  console.log(`  ${r.size} sections searched\n`);

  if (!hits.length) {
    console.log("  Nothing matched. That is the honest answer, and it is what a model would need to be told.");
    return;
  }

  hits.forEach((h, i) => {
    const s = h.section;
    console.log(`${String(i + 1).padStart(2)}. ${s.page} · ${s.heading}`);
    console.log(`    ${s.words} words, ~${s.tokens} tokens${h.why.length ? `, ${h.why.join(", ")}` : ""}`);
    console.log(`    ${deepLink(s)}`);
    console.log(full ? `\n${s.text}\n` : `    "${h.snippet}"\n`);
  });

  const cost = hits.slice(0, 3).reduce((a, h) => a + h.section.tokens, 0);
  console.log(`Handing the top 3 to a model costs ~${cost} tokens of context.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
