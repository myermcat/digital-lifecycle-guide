/**
 * The eval set, generated from the guide rather than invented.
 *
 * The problem this solves: nobody knows what questions readers will actually ask, so
 * a hand-written question list mostly tests the imagination of whoever wrote it. But
 * the guide already contains the questions in disguise. Every instrument row has a
 * scope column ("what brings this into scope") and an owner column ("what you
 * personally have to do"), which are answers to "does this apply to me?" and "what do
 * I do about it?". Turning 37 rows into questions gives a labelled set for free,
 * because the row it came from IS the correct answer.
 *
 * Four families of question, in rising difficulty:
 *
 *   NAMED     uses the instrument's own name. Should be near-perfect; if this fails,
 *             something is broken rather than hard.
 *   OWNER     asks what the reader has to do. Same target, different words.
 *   BLIND     never names the instrument, and is built from its scope text instead.
 *             This is how somebody who does not know the vocabulary would ask, and
 *             it is the number that actually predicts whether the thing is usable.
 *   ABSENT    things the guide does not cover. The correct behaviour is a weak or
 *             empty result, so an assistant routes instead of inventing. Scoring
 *             these as "recall" would be backwards: here a confident hit is a bug.
 *
 * Run:  npx tsx scripts/eval.ts
 *       npx tsx scripts/eval.ts --family blind      one family only
 *       npx tsx scripts/eval.ts --failures          only what went wrong
 *       npx tsx scripts/eval.ts --write             save corpus/eval-set.json
 */

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { loadRetriever } from "./lib/retrieval";

const HERE = dirname(fileURLToPath(import.meta.url));
const CORPUS = resolve(HERE, "..", "corpus");

type Instrument = {
  name: string;
  family: string;
  whatItIs: string;
  scope: string;
  ownerDoes: string;
  whoDoes: string;
  everyService?: boolean;
};

type Case = {
  family: "named" | "owner" | "blind" | "absent" | "human";
  question: string;
  /** Section heading that should rank first. Absent cases have none by design. */
  expectHeading?: string;
  note?: string;
};

/* ------------------------------------------------------------------ *
 * Generating the questions
 * ------------------------------------------------------------------ */

const STOPWORDS = new Set(
  ("every service the a an and or of to in on for with at by from as it its this that these those is are " +
    "was were be been being do does did any all each both which who whose when where why how what " +
    "your you their its our must may can should will would there here separate same three two one part").split(" "),
);

/**
 * Build a question that never names the instrument, using the distinctive words of
 * its scope column. Distinctive means: appears in this row's scope and in few others,
 * which is what makes the question answerable without the vocabulary.
 */
function blindQuestion(target: Instrument, all: Instrument[]): string | null {
  const freq = new Map<string, number>();
  for (const row of all) {
    for (const w of new Set(terms(row.scope))) freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  const distinctive = [...new Set(terms(target.scope))]
    .filter((w) => (freq.get(w) ?? 0) <= 2)
    .filter((w) => !nameWords(target).has(w))
    .slice(0, 5);

  if (distinctive.length < 2) return null;
  return `my service ${distinctive.join(" ")} — what do I have to do?`;
}

function terms(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w));
}

function nameWords(row: Instrument): Set<string> {
  return new Set(terms(row.name));
}

/**
 * Questions the guide genuinely does not answer. Two kinds: departmental facts it
 * says outright vary, and subjects outside its scope entirely. A confident top hit
 * on any of these is the failure mode the whole answer-shape design exists to stop.
 */
const ABSENT: Case[] = [
  { family: "absent", question: "what is my department's delegated contracting limit", note: "departmental fact, varies" },
  { family: "absent", question: "who chairs my department's investment board", note: "departmental fact, varies" },
  { family: "absent", question: "how many weeks will my RFP evaluation take", note: "no duration in the guide" },
  { family: "absent", question: "what is the going rate for a senior developer contract", note: "outside scope" },
  { family: "absent", question: "should I use React or Vue for this service", note: "outside scope" },
  { family: "absent", question: "how do I write a python script to parse the data", note: "outside scope" },
  { family: "absent", question: "what is the deadline for my department's budget submission", note: "departmental fact" },
  { family: "absent", question: "can you approve my project", note: "not a question the guide can answer" },
];

/**
 * Real phrasing, written by hand, and the family that matters most.
 *
 * The generated BLIND family turned out not to be blind: it was built from the
 * guide's own scope text, so it still spoke the guide's vocabulary and scored 86%.
 * These share almost no words with the corpus, which is how people actually ask.
 * Targets are pages rather than sections, because at this level of vagueness the
 * right page is the honest bar.
 */
const HUMAN: Array<Case & { expectPath: string }> = [
  { family: "human", question: "my boss wants this live by March and I have not started", expectPath: "/create-discovery" },
  { family: "human", question: "the vendor says they own the data, is that allowed", expectPath: "/thread/procurement" },
  { family: "human", question: "nobody knows who owns this service any more", expectPath: "/thread/team-capability" },
  { family: "human", question: "we already built it, did we skip anything", expectPath: "/gate-map" },
  { family: "human", question: "is it okay to just extend the old contract", expectPath: "/live-maturity" },
  { family: "human", question: "the old system is falling over and we need to replace it fast", expectPath: "/sunset" },
  { family: "human", question: "do I need permission to put this on the internet", expectPath: "/thread/security" },
  { family: "human", question: "how do I know if my service is any good", expectPath: "/thread/monitoring-and-instrumentation" },
  { family: "human", question: "we have no money, can we still start", expectPath: "/thread/funding" },
  { family: "human", question: "what if the users hate it after we launch", expectPath: "/thread/user-research" },
  { family: "human", question: "someone told me I need a PIA but I do not know what that is", expectPath: "/thread/privacy" },
  { family: "human", question: "can I just use an off the shelf product and be done", expectPath: "/reference/options-analysis" },
];

function buildCases(instruments: Instrument[]): Case[] {
  const cases: Case[] = [];

  for (const row of instruments) {
    cases.push({
      family: "named",
      question: `does ${row.name.toLowerCase()} apply to my service`,
      expectHeading: row.name,
    });
    cases.push({
      family: "owner",
      question: `what do I personally have to do about ${row.name.toLowerCase()}`,
      expectHeading: row.name,
    });
    const blind = blindQuestion(row, instruments);
    if (blind) cases.push({ family: "blind", question: blind, expectHeading: row.name });
  }

  return [...cases, ...ABSENT, ...HUMAN];
}

/* ------------------------------------------------------------------ *
 * Running
 * ------------------------------------------------------------------ */

async function main() {
  const args = process.argv.slice(2);
  const onlyFamily = args.includes("--family") ? args[args.indexOf("--family") + 1] : null;
  const failuresOnly = args.includes("--failures");
  const write = args.includes("--write");

  const instruments = (
    JSON.parse(await readFile(join(CORPUS, "instruments.json"), "utf8")) as {
      INSTRUMENT_MATRIX: Instrument[];
    }
  ).INSTRUMENT_MATRIX;

  const retriever = await loadRetriever(CORPUS);
  const cases = buildCases(instruments).filter((c) => !onlyFamily || c.family === onlyFamily);

  type Row = Case & { rank: number | null; got: string[]; topScore: number; expectPath?: string };
  const rows: Row[] = [];

  for (const c of cases) {
    const { hits } = retriever.search(c.question, 5);
    const expectPath = (c as Case & { expectPath?: string }).expectPath;
    const got = expectPath ? hits.map((h) => h.section.path) : hits.map((h) => h.section.heading);
    const target = expectPath ?? c.expectHeading;
    const rank = target ? got.indexOf(target) + 1 || null : null;
    rows.push({ ...c, rank, got, topScore: hits[0]?.score ?? 0, expectPath });
  }

  const byFamily = new Map<string, Row[]>();
  for (const r of rows) {
    if (!byFamily.has(r.family)) byFamily.set(r.family, []);
    byFamily.get(r.family)!.push(r);
  }

  console.log(`${retriever.size} sections indexed, ${rows.length} cases\n`);

  for (const family of ["named", "owner", "blind", "human"] as const) {
    const set = byFamily.get(family);
    if (!set?.length) continue;
    const at1 = set.filter((r) => r.rank === 1).length;
    const at3 = set.filter((r) => r.rank !== null && r.rank <= 3).length;
    const at5 = set.filter((r) => r.rank !== null).length;
    console.log(
      `${family.toUpperCase().padEnd(6)} ${String(set.length).padStart(3)} cases   ` +
        `1st ${pct(at1, set.length)}   top3 ${pct(at3, set.length)}   top5 ${pct(at5, set.length)}`,
    );
  }

  const absent = byFamily.get("absent") ?? [];
  if (absent.length) {
    /**
     * Judged the other way round. There is no right section, so the only signal is
     * how confident the top hit was. A high score means it found something it
     * believes in, which is exactly what should not happen here.
     */
    const scores = rows.filter((r) => r.expectHeading).map((r) => r.topScore).sort((a, b) => a - b);
    const median = scores[Math.floor(scores.length / 2)] ?? 0;
    const overconfident = absent.filter((r) => r.topScore >= median);
    console.log(
      `\nABSENT ${String(absent.length).padStart(3)} cases   ` +
        `top hit as confident as a real answer: ${overconfident.length}/${absent.length}` +
        `   (median real score ${median.toFixed(2)})`,
    );
    for (const r of absent) {
      const flag = r.topScore >= median ? "OVERCONFIDENT" : "ok";
      console.log(`   ${flag.padEnd(14)} ${r.topScore.toFixed(2).padStart(6)}  ${r.question}`);
      if (r.topScore >= median) console.log(`                          → returned "${r.got[0]}"`);
    }
    console.log(
      "\n   A high score here is not retrieval failing. It is the reason the model layer\n" +
        "   needs a confidence floor: below it, route the reader instead of answering.",
    );
  }

  /* the confidence floor the ABSENT family implies, reported so the model layer can use it */
  const realScores = rows
    .filter((r) => r.family === "named" || r.family === "owner")
    .map((r) => r.topScore)
    .sort((a, b) => a - b);
  const floorFrom = realScores[Math.floor(realScores.length * 0.1)] ?? 0;
  const humanRows = byFamily.get("human") ?? [];
  const belowFloor = humanRows.filter((r) => r.topScore < floorFrom).length;
  if (humanRows.length) {
    console.log(
      `\nCONFIDENCE  a real answer scores at least ${floorFrom.toFixed(1)} (10th percentile of named/owner).` +
        `\n            human-phrased questions below that floor: ${belowFloor}/${humanRows.length}` +
        `\n            Below the floor the honest move is to route, not answer.`,
    );
  }

  const misses = rows.filter((r) => (r.expectHeading || r.expectPath) && (r.rank === null || r.rank > 3));
  if (misses.length) {
    console.log(`\nMISSES, target not in the top 3 (${misses.length}):`);
    for (const m of misses.slice(0, failuresOnly ? 100 : 12)) {
      console.log(`  [${m.family}] ${m.question}`);
      console.log(`      wanted: ${m.expectHeading}`);
      console.log(`      got:    ${m.got.slice(0, 3).join(" | ") || "nothing"}`);
    }
    if (!failuresOnly && misses.length > 12) console.log(`  … ${misses.length - 12} more, see --failures`);
  }

  if (write) {
    await writeFile(
      join(CORPUS, "eval-set.json"),
      JSON.stringify(
        {
          note:
            "Generated by scripts/eval.ts from instruments.json. named/owner/blind cases are " +
            "auto-labelled: the instrument row a question was built from is the correct answer. " +
            "absent cases have no correct section, and are scored on whether the top hit was " +
            "overconfident.",
          cases,
        },
        null,
        2,
      ),
      "utf8",
    );
    console.log(`\nWrote corpus/eval-set.json (${cases.length} cases)`);
  }
}

const pct = (n: number, total: number) => `${String(n).padStart(3)}/${total} ${((100 * n) / total).toFixed(0).padStart(3)}%`;

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
