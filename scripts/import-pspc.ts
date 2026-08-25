/**
 * Import the PSPC Agile Procurement Guide into the corpus as reference material.
 *
 * WHY IT IS MARKED "reference" AND NOT "public".
 *
 * The PDF carries no classification marking, so it is Unclassified, and quoting it is
 * fine. But PSPC published it, not us, and the browser slice of the corpus is served
 * as a static asset, which is as public as the page that loads it. Shipping 45 pages
 * of somebody else's guide to every reader is republication. Marked "reference" it
 * stays on this machine: build-corpus.ts filters the browser slice to public sections
 * only and reports what it withheld, so the CLI and a future server-side model can
 * read every detail while readers get the guide's own words plus a citation.
 *
 * Extraction is pdftotext, so this costs nothing and can be re-run whenever the
 * source is updated. There is already a hand-written summary beside the PDF
 * (PSPC_Agile_Procurement_Guide_notes.md); this is the full text, for the details a
 * summary drops.
 *
 * Run:  npx tsx scripts/import-pspc.ts
 */

import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(HERE, "..");
const CORPUS = join(PROJECT, "corpus");
const OUT_DIR = join(CORPUS, "reference");

const PDF = resolve(PROJECT, "../Knowledge Base/PSPC_Agile_Procurement_Guide_v1_EN.pdf");

const SOURCE = {
  title: "PSPC Agile Procurement Guide",
  publisher: "Public Services and Procurement Canada",
  version: "1.0",
  date: "2023-06-05",
  marking: "none found; treated as Unclassified",
  note: "Printed page numbers run one behind the PDF page numbers.",
};

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const tokens = (s: string) => Math.ceil(s.length / 3.8);

/**
 * A numbered section heading: "6. Procurement Strategy".
 *
 * Periods have to be allowed inside the heading, because section 4 is "Agile
 * Procurement vs. Traditional Procurement" and excluding them silently dropped it
 * along with Table 4.1, the traditional-versus-agile comparison. Guarded instead by
 * requiring a short, title-cased line that does not end in a period, so numbered
 * sentences in body text are not mistaken for headings.
 */
const NUMBERED = /^\s{0,12}(\d{1,2})\.\s+([A-Z][A-Za-z][^\n]{2,70})$/;

function looksLikeHeading(text: string): boolean {
  if (text.endsWith(".")) return false;
  if (text.split(/\s+/).length > 10) return false;
  return true;
}

/** Page furniture repeated on every page, which would otherwise land in every section. */
const FURNITURE = [
  /^\s*Agile Procurement Guide\s*$/i,
  /^\s*Page \d+ of \d+\s*$/i,
  /^\s*\d{1,3}\s*$/,
  /^\s*Version \d/i,
  /^\s*Date: /i,
];

function isFurniture(line: string): boolean {
  return FURNITURE.some((re) => re.test(line));
}

async function main() {
  if (!existsSync(PDF)) {
    console.error(`PDF not found: ${PDF}`);
    process.exit(1);
  }

  const { stdout } = await run("pdftotext", ["-layout", PDF, "-"], { maxBuffer: 32 * 1024 * 1024 });
  const lines = stdout.split("\n");

  type Chunk = { number: number | null; heading: string; lines: string[] };
  const chunks: Chunk[] = [{ number: null, heading: "Front matter", lines: [] }];
  let inTableOfContents = true;

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (isFurniture(line)) continue;

    const match = NUMBERED.exec(line);
    /**
     * Every heading appears twice: once in the table of contents at the front, once
     * where the section actually starts. Taking the first occurrence produces 20
     * empty sections, so the contents list is skipped until section 1 begins for real,
     * which is the second time "1." is seen.
     */
    if (match && looksLikeHeading(match[2].trim())) {
      const number = Number(match[1]);
      const heading = match[2].trim();
      if (inTableOfContents && number === 1 && chunks.some((c) => c.number === 1)) {
        inTableOfContents = false;
        chunks.length = 1;
        chunks.push({ number, heading, lines: [] });
        continue;
      }
      chunks.push({ number, heading, lines: [] });
      continue;
    }
    chunks[chunks.length - 1].lines.push(line);
  }

  // merge duplicate headings: the contents entry and the real section
  const merged = new Map<string, Chunk>();
  for (const chunk of chunks) {
    const key = `${chunk.number ?? "front"}:${chunk.heading}`;
    const existing = merged.get(key);
    if (!existing) merged.set(key, chunk);
    else if (words(chunk.lines.join(" ")) > words(existing.lines.join(" "))) merged.set(key, chunk);
  }

  const sections = [...merged.values()]
    .map((chunk) => {
      const text = chunk.lines
        .join("\n")
        .replace(/[ \t]{2,}/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      return { chunk, text };
    })
    .filter(({ text }) => words(text) >= 40)
    .map(({ chunk, text }, i) => ({
      id: `pspc#${i}`,
      page: SOURCE.title,
      // no route: this is not a page of the guide, so an answer cites it rather than links
      path: "/reference/pspc-agile-procurement",
      slug: "pspc-agile-procurement",
      heading: chunk.number ? `${chunk.number}. ${chunk.heading}` : chunk.heading,
      text,
      words: words(text),
      tokens: tokens(text),
      visibility: "reference",
      facets: {
        hasDuration: /\b\d+\s*(?:to\s*\d+\s*)?(?:day|week|month|year)s?\b|\b(?:weeks|months|years)\b/i.test(text),
        hasThreshold: /\$\s?[\d.,]+\s*(?:million|billion|k\b)?/i.test(text),
        hasRole: /\b(procurement officer|business owner|contracting authority|senior management|governance)\b/i.test(text),
      },
    }));

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(join(OUT_DIR, "pspc-sections.json"), JSON.stringify(sections, null, 2), "utf8");

  const markdown = [
    `# ${SOURCE.title}`,
    "",
    `**Publisher:** ${SOURCE.publisher}  `,
    `**Version:** ${SOURCE.version}, ${SOURCE.date}  `,
    `**Classification marking:** ${SOURCE.marking}  `,
    `**Note:** ${SOURCE.note}`,
    "",
    "> Reference material, not part of the guide. Held locally so answers can cite the",
    "> detail; never included in the browser slice of the corpus.",
    "",
    ...sections.flatMap((s) => [`## ${s.heading}`, "", s.text, ""]),
  ].join("\n");

  await writeFile(join(OUT_DIR, "pspc-agile-procurement.md"), markdown, "utf8");

  const totalWords = sections.reduce((a, s) => a + s.words, 0);
  const totalTokens = sections.reduce((a, s) => a + s.tokens, 0);

  console.log(`${SOURCE.title} — ${sections.length} sections, ${totalWords.toLocaleString()} words, ~${totalTokens.toLocaleString()} tokens`);
  console.log(`visibility "reference": excluded from public/assistant/, available to the CLI\n`);
  for (const s of sections) {
    const marks = [
      s.facets.hasDuration ? "duration" : "",
      s.facets.hasThreshold ? "threshold" : "",
    ].filter(Boolean).join(", ");
    console.log(`  ${String(s.words).padStart(5)}w  ${s.heading}${marks ? `   [${marks}]` : ""}`);
  }
  console.log(`\nWrote corpus/reference/pspc-sections.json and pspc-agile-procurement.md`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
