import { readFile } from "node:fs/promises";
import { loadRetriever } from "../lib/retrieval";
import { Rewriter, buildContents, loadKey } from "../lib/rewrite";

const FLOOR = 12.8;
const r = await loadRetriever("./corpus");
const map = JSON.parse(await readFile("./corpus/map.json", "utf8"));
const rw = await Rewriter.create({
  key: await loadKey(".", "groq"),
  contents: buildContents(map),
  cachePath: "./corpus/.rewrite-cache.json",
  provider: "groq",
});

const questions = (await readFile(
  "/private/tmp/claude-501/-Users-maryy-Desktop-Claude-Hub/b6ab7bd1-a3d3-4c6f-8049-6372e6802d7c/scratchpad/questions40.txt",
  "utf8",
)).split("\n").map(s => s.trim()).filter(Boolean);

console.log(`model: ${rw.modelName}, floor ${FLOOR}\n`);
let beforeUp = 0, afterUp = 0, failed = 0, ran = 0;

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  const before = r.search(q, 1).hits[0];
  const bScore = before?.score ?? 0;

  let rewritten;
  try { rewritten = await rw.rewrite(q); }
  catch (e) { console.log(`${String(i+1).padStart(2)}. ERROR ${(e as Error).message.split("\n")[0].slice(0,70)}`); failed++; continue; }

  const pooled = new Map<string, { score: number; heading: string }>();
  for (const query of rewritten.queries) {
    for (const h of r.search(query, 5).hits) {
      const cur = pooled.get(h.section.path);
      pooled.set(h.section.path, { score: (cur?.score ?? 0) + h.score, heading: cur?.heading ?? h.section.heading });
    }
  }
  const after = [...pooled.entries()].sort((a, b) => b[1].score - a[1].score)[0];
  const aScore = after?.[1].score ?? 0;

  ran++;
  if (bScore >= FLOOR) beforeUp++;
  if (aScore >= FLOOR) afterUp++;

  const moved = after?.[0] !== before?.section.path;
  console.log(`${String(i+1).padStart(2)}. ${q.slice(0, 74)}`);
  console.log(`    before ${bScore.toFixed(1).padStart(5)}  ${(before?.section.path ?? "-").padEnd(34)} ${(before?.section.heading ?? "").slice(0,32)}`);
  console.log(`    after  ${aScore.toFixed(1).padStart(5)}  ${(after?.[0] ?? "-").padEnd(34)} ${(after?.[1].heading ?? "").slice(0,32)}${moved ? "   [moved]" : ""}`);
  console.log(`    ${rewritten.queries.join(" | ").slice(0, 130)}${rewritten.outOfScope ? "   <out of scope>" : ""}`);
  await new Promise(res => setTimeout(res, 2500));
}

console.log(`\n${ran} compared, ${failed} failed`);
console.log(`above the floor before: ${beforeUp}/${ran}  (${Math.round(100*beforeUp/ran)}%)`);
console.log(`above the floor after:  ${afterUp}/${ran}  (${Math.round(100*afterUp/ran)}%)`);
