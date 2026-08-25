/**
 * Records which page each heading, figure and table caption fell on.
 *
 * The template's contents list carries page numbers with dot leaders. A Word
 * table-of-contents field renders empty when LibreOffice makes the PDF, so the
 * numbers are found by reading the built PDF back and written to a JSON map the
 * builder picks up on its next run. Two passes, and the second one is stable.
 *
 *   node scripts/checkpoints-doc-pages.mjs <path-to.pdf>
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const pdf = process.argv[2];
if (!pdf) {
  console.error("usage: node scripts/checkpoints-doc-pages.mjs <path-to.pdf>");
  process.exit(1);
}

const total = Number(
  execFileSync("pdfinfo", [pdf], { encoding: "utf8" })
    .split("\n")
    .find((line) => line.startsWith("Pages:"))
    .replace(/\D/g, ""),
);

/** The body restarts at page 1, so a body page is its printed number. */
const pages = [];
for (let n = 1; n <= total; n += 1) {
  const raw = execFileSync("pdftotext", ["-f", String(n), "-l", String(n), pdf, "-"], {
    encoding: "utf8",
  });
  pages.push(raw.replace(/\s+/g, " "));
}

/**
 * The printed number of a PDF page: the front matter is roman, so it is offset.
 *
 * The contents page also contains "1. Introduction", so it has to be skipped, or
 * every entry resolves to the contents page and the whole map reads 1.
 */
const firstBodyPage = pages.findIndex(
  (t) => /1\. *Introduction/.test(t) && !t.includes("Table of Contents"),
);
const printed = (index) => index - firstBodyPage + 1;

const map = {};
function record(key, needle) {
  const at = pages.findIndex((t, i) => i >= firstBodyPage && t.includes(needle));
  if (at !== -1) map[key] = printed(at);
}

// Section anchors, matched on the heading text as it prints.
const { CHECKPOINT_MAP_TERMS_TITLE, CHECKPOINT_MAP_TABLE_SECTION, CHECKPOINT_MAP_VARIES } =
  await import("../src/lib/checkpoint-map-content.ts");
const { MATRIX_FAMILY_SECTIONS } = await import("../src/lib/instrument-matrix.ts");

record("intro", "1. Introduction");
record("how-to-use", "2. How to use this document");
record("everything-varies", `3. ${CHECKPOINT_MAP_VARIES.heading}`);
record("thecheckpoints", `4. ${CHECKPOINT_MAP_TERMS_TITLE}`);
record("annex-instruments", `5. ${CHECKPOINT_MAP_TABLE_SECTION.heading}`);
MATRIX_FAMILY_SECTIONS.forEach((section, index) => {
  record(section.id, `5.${index + 1} ${section.family}`);
});
record("conclusion", "6. Conclusion and next steps");
record("about", "The Digital Lifecycle Guide");
record("references", "7. References");
record("annex-reuse", "Appendix A Reuse before you buy or build");
record("annex-nadia", "Appendix B A worked example");
record("app2-nadia", "Appendix B.1");
record("app2-who", "Appendix B.2");
record("app2-timeline", "Appendix B.3");
record("app2-key", "Appendix B.4");
for (const id of ["discovery", "alpha", "beta", "live", "sunset"]) {
  const n = ["discovery", "alpha", "beta", "live", "sunset"].indexOf(id) + 5;
  record(`app2-${id}`, `Appendix B.${n}`);
}

// Figure and table captions, keyed by their label alone, which is unambiguous.
pages.forEach((t, i) => {
  if (i < firstBodyPage) return;
  for (const match of t.matchAll(/\b((?:Figure|Table) A?\d+-\d+)\b/g)) {
    if (!(match[1] in map)) map[match[1]] = printed(i);
  }
});

writeFileSync(
  fileURLToPath(new URL("./.checkpoints-doc-pages.json", import.meta.url)),
  JSON.stringify(map, null, 2) + "\n",
);
console.log(`recorded ${Object.keys(map).length} page numbers from ${total} pages`);
