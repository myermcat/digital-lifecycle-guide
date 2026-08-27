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
import { register } from "node:module";
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/* The needles below are the document's own headings, so they have to be read in the
   language being measured. Registering the hook first makes the dynamic imports below
   resolve to the .fr.ts twins when DLG_LOCALE=fr. */
register(new URL("./french-module-hook.mjs", import.meta.url));

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
const { CHECKPOINTS_DOC: S } = await import("../src/lib/checkpoints-doc-strings.ts");
const firstBodyPage = pages.findIndex(
  (t) => t.includes(`1. ${S.headings.introduction}`) && !t.includes(S.frontMatter.contents),
);
const printed = (index) => index - firstBodyPage + 1;

const map = {};
function record(key, needle) {
  /* The page text has already had its whitespace collapsed, so the needle needs the
     same treatment: French headings carry a non-breaking space before the colon, and
     an un-normalised needle silently matches nothing. */
  const flat = needle.replace(/\s+/g, " ");
  const at = pages.findIndex((t, i) => i >= firstBodyPage && t.includes(flat));
  if (at !== -1) map[key] = printed(at);
}

// Section anchors, matched on the heading text as it prints.
const { CHECKPOINT_MAP_TERMS_TITLE, CHECKPOINT_MAP_TABLE_SECTION, CHECKPOINT_MAP_VARIES } =
  await import("../src/lib/checkpoint-map-content.ts");
const { MATRIX_FAMILY_SECTIONS } = await import("../src/lib/instrument-matrix.ts");
/* The bare appendix label appears in cross-references before its own heading, so the
   needle has to carry the heading too or findIndex lands on the first mention. */
const { CHECKPOINT_MAP_APPENDIX_REUSE, CHECKPOINT_MAP_APPENDIX_PATH } = await import(
  "../src/lib/checkpoint-map-content.ts"
);

record("intro", `1. ${S.headings.introduction}`);
record("how-to-use", `2. ${S.headings.howToUse}`);
record("everything-varies", `3. ${CHECKPOINT_MAP_VARIES.heading}`);
record("thecheckpoints", `4. ${CHECKPOINT_MAP_TERMS_TITLE}`);
record("annex-instruments", `5. ${CHECKPOINT_MAP_TABLE_SECTION.heading}`);
MATRIX_FAMILY_SECTIONS.forEach((section, index) => {
  record(section.id, `5.${index + 1} ${section.family}`);
});
record("conclusion", `6. ${S.headings.conclusion}`);
record("about", S.conclusion.aboutHeading);
record("references", `7. ${S.headings.references}`);
record("annex-reuse", `${S.appendix.labelA} ${CHECKPOINT_MAP_APPENDIX_REUSE.heading}`);
record("annex-nadia", `${S.appendix.labelB} ${CHECKPOINT_MAP_APPENDIX_PATH.heading}`);
record("app2-nadia", `${S.appendix.labelB}.1`);
record("app2-who", `${S.appendix.labelB}.2`);
record("app2-timeline", `${S.appendix.labelB}.3`);
record("app2-key", `${S.appendix.labelB}.4`);
for (const id of ["discovery", "alpha", "beta", "live", "sunset"]) {
  const n = ["discovery", "alpha", "beta", "live", "sunset"].indexOf(id) + 5;
  record(`app2-${id}`, `${S.appendix.labelB}.${n}`);
}

// Figure and table captions, keyed by their label alone, which is unambiguous.
pages.forEach((t, i) => {
  if (i < firstBodyPage) return;
  const capRe = new RegExp(`\\b((?:${S.captions.figureWord}|${S.captions.tableWord}) A?\\d+-\\d+)\\b`, "g");
  for (const match of t.matchAll(capRe)) {
    if (!(match[1] in map)) map[match[1]] = printed(i);
  }
});

writeFileSync(
  fileURLToPath(
    new URL(
      process.env.DLG_LOCALE === "fr"
        ? "./.checkpoints-doc-pages.fr.json"
        : "./.checkpoints-doc-pages.json",
      import.meta.url,
    ),
  ),
  JSON.stringify(map, null, 2) + "\n",
);
console.log(`recorded ${Object.keys(map).length} page numbers from ${total} pages`);
