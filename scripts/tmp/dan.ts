import { readFile } from "node:fs/promises";
import { loadRetriever } from "../lib/retrieval";
import { Rewriter, buildContents } from "../lib/rewrite";
import { answerQuestion } from "../lib/answer";
import { loadKey } from "../lib/llm";
import type { Section } from "../../src/lib/assistant/retrieval";

/** Situational questions from somebody senior who is under pressure, not looking up a term. */
const QUESTIONS = [
  "my minister announced this in a speech and we haven't started. what do i do",
  "the vendor built it and now nobody on my team can maintain it",
  "i want to pilot it in one region first, am i allowed to do that",
  "we are over budget and behind schedule. do i stop or push through",
  "can i just use another department's system instead of building my own",
];

const r = await loadRetriever("./corpus");
const key = await loadKey(".", "groq");
const map = JSON.parse(await readFile("./corpus/map.json", "utf8"));
const rw = await Rewriter.create({ key, contents: buildContents(map), cachePath: "./corpus/.rewrite-cache.json", provider: "groq" });

for (const q of QUESTIONS) {
  console.log("\n" + "=".repeat(78) + "\nQ  " + q + "\n");
  try {
    const rewritten = await rw.rewrite(q);
    const pooled = new Map<string, { section: Section; score: number }>();
    for (const query of rewritten.queries) {
      for (const h of r.search(query, 5).hits) {
        const prev = pooled.get(h.section.id);
        pooled.set(h.section.id, { section: h.section, score: (prev?.score ?? 0) + h.score });
      }
    }
    const sections = [...pooled.values()].sort((a, b) => b.score - a.score).slice(0, 3).map((x) => x.section);
    const out = await answerQuestion({ question: q, sections, situation: rewritten.situation, provider: "groq", key });
    console.log(out.shape.toUpperCase());
    console.log(out.answer);
    if (out.options.length) console.log("\noptions: " + out.options.join("  |  "));
    console.log("\nfrom: " + out.citedSections.map((s) => `${s.page} · ${s.heading}`).join(" / "));
  } catch (e) {
    console.log("ERROR " + (e as Error).message.split("\n")[0].slice(0, 100));
  }
  await new Promise((res) => setTimeout(res, 9000));
}
