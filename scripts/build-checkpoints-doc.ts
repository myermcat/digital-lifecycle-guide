/**
 * Builds the Word document for the official-checkpoints page.
 *
 * Unlike the other document builders, this one is IN the repo and imports the
 * same content files the site renders, so the two cannot drift. Nothing here
 * restates page copy: if a sentence is wrong, fix it in `src/lib` and rebuild.
 *
 *   npx tsx scripts/build-checkpoints-doc.ts
 *
 * The layout rules this has to obey are in "Claude Hub/Document house rules.md".
 * Read them before changing anything here.
 *
 * House style follows the existing builders in
 * "TBS (Claude Output)/Transcripts & chat knowledge/Document builders (scripts + assets)":
 * the same palette, Georgia for headings and Arial for text, a 9360-twip content
 * width on Letter portrait, the UNCLASSIFIED banner, roman front matter and
 * decimal body, and "Back to contents" at the end of each section.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  AlignmentType,
  HorizontalPositionRelativeFrom,
  TextWrappingType,
  VerticalPositionRelativeFrom,
  BorderStyle,
  Bookmark,
  Document,
  ExternalHyperlink,
  Footer,
  Header,
  HeadingLevel,
  ImageRun,
  InternalHyperlink,
  LevelFormat,
  LineRuleType,
  NumberFormat,
  PageBreak,
  PageNumber,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TabStopType,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";

import {
  CHECKPOINT_MAP_APPENDIX_PATH,
  CHECKPOINT_MAP_APPENDIX_REUSE,
  CHECKPOINT_MAP_COLKEY,
  CHECKPOINT_MAP_FOOTER_DISCLAIMER,
  CHECKPOINT_MAP_HOW_TO_USE,
  CHECKPOINT_MAP_JUMP,
  CHECKPOINT_MAP_LAUNCH,
  CHECKPOINT_MAP_NADIA,
  CHECKPOINT_MAP_PHASES,
  CHECKPOINT_MAP_SUBTITLE,
  CHECKPOINT_MAP_TABLE_SECTION,
  CHECKPOINT_MAP_TERMS,
  CHECKPOINT_MAP_TERMS_CAPTION,
  CHECKPOINT_MAP_TERMS_TITLE,
  CHECKPOINT_MAP_TITLE,
  CHECKPOINT_MAP_VARIES,
  CHECKPOINT_MAP_WHAT_TABLE,
  CHECKPOINT_MAP_WHO,
  CHECKPOINT_MAP_WHO_CAPTION,
  CHECKPOINT_MAP_WHO_TITLE,
  CHECKPOINT_MAP_WHY_CREATE,
  CHECKPOINT_MAP_WHY_GCS,
  type CheckpointMapBodyPart,
  type CheckpointMapPhaseBlock,
} from "../src/lib/checkpoint-map-content";
import {
  INSTRUMENT_MATRIX,
  MATRIX_ACTIONS,
  MATRIX_FAMILY_SECTIONS,
  MATRIX_KINDS,
  MATRIX_SUBPHASES,
  type MatrixInstrument,
} from "../src/lib/instrument-matrix";
import { REUSABLE_CATEGORIES, REUSABLE_PIECES } from "../src/lib/reusable-pieces";
import { EXTERNAL_LINKS, type ExternalLinkKey } from "../src/lib/external-links";
import { CHECKPOINTS_DOC as S } from "../src/lib/checkpoints-doc-strings";

/* ---------------------------------------------------------------- palette */

const BROWN = "26374A";
const RUST = "2A6BA8";
const MUTED = "49586A";
const TAN = "AEC4D6";
const CREAM = "DCE7F0";
const SURF = "DAE6EF";
const CARD = "E8F0F7";
const NAVY = "343E48";
const BANNERBLUE = "7E96A8";
const UNCL = "8A9AA8";
const BODY = "2A3742";
const AMBER = "8A5A18";
const AMBERFILL = "F6EEDF";
const SERIF = "Georgia";
const SANS = "Arial";
const CW = 9360;

const IMG =
  "/Users/maryy/Desktop/Claude Hub/Claude -- TBS/TBS (Claude Output)/" +
  "Transcripts & chat knowledge/Document builders (scripts + assets)/img";
/** The page's own figures live with the rest of the guide's blue visuals. */
const FIGS =
  "/Users/maryy/Desktop/Claude Hub/Claude -- TBS/TBS (Claude Output)/GCX Repo/" +
  "DLG -- EN/DLG -- Blue Visuals/figures";

/**
 * The French edition.
 *
 * This document is generated outside Vite, so the build's module swap never runs here.
 * It is reached through build-checkpoints-doc.mjs, which registers the same resolve
 * hook the search index uses: with DLG_LOCALE=fr every "../src/lib/x" import loads
 * "x.fr.ts" instead. What is left is this file's own words, which live in
 * checkpoints-doc-strings, and the three things below that are paths rather than prose.
 */
const IS_FR = process.env.DLG_LOCALE === "fr";
const FR_FIGS =
  "/Users/maryy/Desktop/Claude Hub/Claude -- TBS/TBS (Claude Output)/GCX Repo/" +
  "DLG -- FR/DLG -- Blue Visuals FR/figures";
const OUT = IS_FR
  ? "/Users/maryy/Desktop/Claude Hub/Claude -- TBS/TBS (Claude Output)/GCX Repo/" +
    "DLG -- FR/DLG -- Editable Source Files (Word) FR/" +
    "Points de contrôle.docx"
  : "/Users/maryy/Desktop/Claude Hub/Claude -- TBS/TBS (Claude Output)/GCX Repo/" +
    "DLG -- EN/DLG -- Editable Source Files (Word)/The official checkpoints of a digital service.docx";
const DATE = IS_FR ? "17 août 2026" : "17 August 2026";

/** A PNG for each topic, keyed by the topic name in whichever language is being built. */
const TOPIC_ICON: Record<string, string> = S.topicIcons;

/**
 * Fills {name} placeholders in a string from `checkpoints-doc-strings`.
 *
 * A few of this document's own sentences carry a count or a topic name. They are
 * held as templates rather than as sentence fragments, because a French sentence
 * does not put its pieces in the same order an English one does.
 */
function fillIn(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in vars ? String(vars[key]) : whole,
  );
}

/* ------------------------------------------------------- reference numbers */

/**
 * Every instrument link becomes a numbered reference.
 *
 * The numbering is worked out before the body is built, because the reference
 * list is grouped into governing instruments and supporting references, and a
 * citation in a table has to carry the number the list will actually print. An
 * earlier version numbered them in table order and then grouped them, which
 * printed [1] [4] [5] [6] [8] down the page.
 */
function isGoverning(key: ExternalLinkKey): boolean {
  return /^(policy|directive|standard|guideline|access-to-information-act|laca)/.test(key);
}

const encountered: ExternalLinkKey[] = [];
for (const section of MATRIX_FAMILY_SECTIONS) {
  for (const row of INSTRUMENT_MATRIX.filter((r) => r.family === section.family)) {
    for (const key of [row.linkKey, ...(row.moreLinks ?? [])]) {
      if (key && !encountered.includes(key)) encountered.push(key);
    }
  }
}
for (const piece of REUSABLE_PIECES) {
  if (piece.linkKey && !encountered.includes(piece.linkKey)) encountered.push(piece.linkKey);
}
const govRefs = encountered.filter(isGoverning);
const supRefs = encountered.filter((key) => !isGoverning(key));
const refOrder: ExternalLinkKey[] = [...govRefs, ...supRefs];

function refNumber(key: ExternalLinkKey): number {
  const at = refOrder.indexOf(key);
  return at === -1 ? 0 : at + 1;
}

/* --------------------------------------------------------------- helpers */

function text(t: string, opts: Record<string, unknown> = {}) {
  return new TextRun({ text: t, font: SANS, size: 21, color: BODY, ...opts });
}

function P(
  t: string,
  opts: { after?: number; size?: number; color?: string; italics?: boolean } = {},
) {
  return new Paragraph({
    spacing: { after: opts.after ?? 150, line: 278 },
    widowControl: true,
    children: [
      text(t, { size: opts.size ?? 21, color: opts.color ?? BODY, italics: !!opts.italics }),
    ],
  });
}

/** Bolds the given phrases inside a paragraph, the way the page does. */
function boldedP(t: string, phrases: readonly string[] = [], opts: { after?: number } = {}) {
  const hits: { start: number; end: number }[] = [];
  for (const phrase of phrases) {
    const at = t.indexOf(phrase);
    if (at !== -1) hits.push({ start: at, end: at + phrase.length });
  }
  hits.sort((a, b) => a.start - b.start);
  const runs: TextRun[] = [];
  let cursor = 0;
  for (const hit of hits) {
    if (hit.start < cursor) continue;
    if (hit.start > cursor) runs.push(text(t.slice(cursor, hit.start)));
    runs.push(text(t.slice(hit.start, hit.end), { bold: true }));
    cursor = hit.end;
  }
  if (cursor < t.length) runs.push(text(t.slice(cursor)));
  return new Paragraph({
    spacing: { after: opts.after ?? 150, line: 278 },
    widowControl: true,
    children: runs,
  });
}

function bullet(t: string, ref = "b") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 90, line: 276 },
    widowControl: true,
    children: [text(t)],
  });
}

function img(file: string, w: number, h: number, alt: string) {
  const path =
    IS_FR && existsSync(`${FR_FIGS}/${file}`)
      ? `${FR_FIGS}/${file}`
      : existsSync(`${IMG}/${file}`)
        ? `${IMG}/${file}`
        : `${FIGS}/${file}`;
  return new ImageRun({
    type: "png",
    data: readFileSync(path),
    transformation: { width: w, height: h },
    altText: { title: alt, description: alt, name: alt },
  });
}

/** A numbered or named section heading, bookmarked so the contents can link to it. */
function H1D(label: string, title: string, id: string, pageBreak = true) {
  const number = /^(\d+|Appendix \d+)$/.test(label) ? `${label}.` : label;
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    keepNext: true,
    pageBreakBefore: pageBreak,
    spacing: { before: pageBreak ? 0 : 520, after: 180 },
    children: [
      new Bookmark({
        id,
        children: [
          new TextRun({
            text: `${number}  ${title}`,
            font: SERIF,
            bold: true,
            color: BROWN,
            size: 38,
          }),
        ],
      }),
    ],
  });
}

function H2D(label: string, title: string, id: string, icon?: string) {
  const number = label;
  const kids: (TextRun | ImageRun)[] = [];
  if (icon && existsSync(`${IMG}/${icon}`)) {
    kids.push(img(icon, 20, 20, title));
    kids.push(new TextRun({ text: "  ", font: SANS }));
  }
  kids.push(
    new TextRun({
      text: `${number}  ${title}`,
      font: SERIF,
      bold: true,
      color: RUST,
      size: 26,
      position: icon ? 4 : 0,
    }),
  );
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    keepNext: true,
    spacing: { before: 340, after: 110 },
    children: [new Bookmark({ id, children: kids })],
  });
}

function H3(title: string) {
  return new Paragraph({
    keepNext: true,
    spacing: { before: 240, after: 90 },
    children: [new TextRun({ text: title, font: SERIF, bold: true, color: BROWN, size: 23 })],
  });
}

function caption(t: string) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 60, after: 240 },
    children: [text(t, { italics: true, color: MUTED, size: 17 })],
  });
}

/**
 * Keeps a run of children on one page, by putting them in a borderless table.
 *
 * Word will not split a row with cantSplit, so this is how the other builders stop
 * a heading, a first line or a stray link being left alone on a page.
 */
function keepTogether(children: (Paragraph | Table)[]) {
  const NONE = { style: BorderStyle.NONE };
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    borders: {
      top: NONE,
      bottom: NONE,
      left: NONE,
      right: NONE,
      insideHorizontal: NONE,
      insideVertical: NONE,
    },
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            width: { size: CW, type: WidthType.DXA },
            borders: { top: NONE, bottom: NONE, left: NONE, right: NONE },
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
            children,
          }),
        ],
      }),
    ],
  });
}

/**
 * Adds the back-to-contents link, tied to whatever it follows.
 *
 * On its own it can be pushed to the top of the next page and sit there alone,
 * which happened after section 2. Tying it to the last paragraph of the section
 * means the two move together.
 */
function pushBackToTop(arr: (Paragraph | Table)[]) {
  const last = arr[arr.length - 1];
  if (last instanceof Paragraph) {
    arr.pop();
    arr.push(keepTogether([last, backToTop()]));
    return;
  }
  arr.push(backToTop());
}

function backToTop() {
  return new Paragraph({
    spacing: { before: 120, after: 320 },
    children: [
      new InternalHyperlink({
        anchor: "toc",
        children: [
          new TextRun({
            text: S.backToContents,
            font: SANS,
            italics: true,
            color: MUTED,
            size: 15,
          }),
        ],
      }),
    ],
  });
}

function cell(
  children: Paragraph[],
  {
    width,
    head = false,
    fill,
    span,
  }: { width: number; head?: boolean; fill?: string; span?: number } = { width: CW },
) {
  const line = { style: BorderStyle.SINGLE, size: 4, color: TAN };
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    columnSpan: span,
    shading: head
      ? { fill: SURF, type: ShadingType.CLEAR }
      : fill
        ? { fill, type: ShadingType.CLEAR }
        : undefined,
    margins: { top: 90, bottom: 90, left: 130, right: 130 },
    borders: { top: line, bottom: line, left: line, right: line },
    children,
  });
}

function headCell(t: string, width: number) {
  return cell(
    [
      new Paragraph({
        keepNext: true,
        children: [
          new TextRun({
            text: t.toUpperCase(),
            font: SANS,
            bold: true,
            color: BROWN,
            size: 16,
            characterSpacing: 20,
          }),
        ],
      }),
    ],
    { width, head: true },
  );
}

function callout(children: Paragraph[], { fill = CARD, border = RUST } = {}) {
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            width: { size: CW, type: WidthType.DXA },
            shading: { fill, type: ShadingType.CLEAR },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 6, color: border },
              bottom: { style: BorderStyle.SINGLE, size: 6, color: border },
              left: { style: BorderStyle.SINGLE, size: 18, color: border },
              right: { style: BorderStyle.SINGLE, size: 6, color: border },
            },
            margins: { top: 130, bottom: 130, left: 180, right: 180 },
            children,
          }),
        ],
      }),
    ],
  });
}

/** One numbered reference, hanging indent, with the host as the link text. */
function srcNum(n: number, key: ExternalLinkKey) {
  const entry = EXTERNAL_LINKS[key];
  const host = entry.url.replace(/^https?:\/\//, "").split("/")[0];
  return new Paragraph({
    spacing: { after: 60, line: 258 },
    indent: { left: 560, hanging: 560 },
    children: [
      text(`[${n}]  `, { color: MUTED, size: 19 }),
      text(`${entry.description} `, { color: MUTED, size: 19 }),
      new ExternalHyperlink({
        link: entry.url,
        children: [
          new TextRun({ text: host, font: SANS, color: "3D5A80", size: 19, underline: {} }),
        ],
      }),
    ],
  });
}

/**
 * Where the previous build's page numbers are recorded, for the contents.
 *
 * fileURLToPath, not URL.pathname: this repo's path contains spaces, and pathname
 * hands back a percent-encoded string that existsSync silently fails on.
 */
/* One page map per language: French runs longer, so its headings fall elsewhere. */
const PAGES_FILE = fileURLToPath(
  new URL(
    IS_FR ? "./.checkpoints-doc-pages.fr.json" : "./.checkpoints-doc-pages.json",
    import.meta.url,
  ),
);

/* ------------------------------------------------------------ the tables */

const COLS = [2280, 2520, 2400, 2160];

/** The sub-phases where something happens, as one line. */
/**
 * The sub-phases where something happens, as runs.
 *
 * The action tags are the same chips the legend shows. Spelling a tag out in plain
 * text after the legend has shown it as a coloured chip makes the reader work out
 * that the two are the same thing.
 */
function whenItComesUpRuns(row: MatrixInstrument): TextRun[] {
  const active = MATRIX_SUBPHASES.filter((s) => row.cells[s.key]);
  if (active.length === 0) return [];
  const runs: TextRun[] = [];
  active.forEach((s, index) => {
    if (index > 0) runs.push(text("     ", { size: 20 }));
    runs.push(text(`${s.label}\u00A0`, { size: 20, color: BROWN, bold: true }));
    row.cells[s.key]!.tags.forEach((tag, tagIndex) => {
      if (tagIndex > 0) runs.push(text("\u00A0", { size: 20 }));
      runs.push(chipRun(MATRIX_ACTIONS[tag].label, ACTION_FILL[tag], ACTION_INK[tag]));
    });
  });
  return runs;
}

function instrumentNameCell(row: MatrixInstrument) {
  const runs: TextRun[] = [
    new TextRun({ text: row.name, font: SANS, bold: true, color: BROWN, size: 21 }),
  ];
  if (row.acronym) runs.push(text(` (${row.acronym})`, { color: MUTED }));
  const keys = [row.linkKey, ...(row.moreLinks ?? [])].filter(Boolean) as ExternalLinkKey[];
  for (const key of keys) {
    runs.push(
      new InternalHyperlink({
        anchor: "references",
        children: [
          new TextRun({ text: ` [${refNumber(key)}]`, font: SANS, color: RUST, size: 18 }),
        ],
      }) as unknown as TextRun,
    );
  }
  const tags: TextRun[] = [chipRun(MATRIX_KINDS[row.kind].label, SURF, BROWN)];
  const paragraphs = [
    new Paragraph({ spacing: { after: 40 }, children: runs }),
    new Paragraph({ spacing: { after: row.everyService ? 0 : 30 }, children: tags }),
  ];
  if (!row.everyService) {
    paragraphs.push(new Paragraph({ children: [chipRun(S.tags.onlyIf, ONLYIF_FILL, ONLYIF_INK)] }));
  }
  return cell(paragraphs, { width: COLS[0] });
}

function topicTable(rows: MatrixInstrument[], label: string, title: string) {
  const tableRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        headCell(S.tableHeaders.instrument, COLS[0]),
        headCell(S.tableHeaders.whatBringsItIntoScope, COLS[1]),
        headCell(S.tableHeaders.whatTheBusinessOwnerDoes, COLS[2]),
        headCell(S.tableHeaders.whoDoesTheWork, COLS[3]),
      ],
    }),
  ];
  for (const row of rows) {
    tableRows.push(
      new TableRow({
        cantSplit: true,
        children: [
          instrumentNameCell(row),
          cell([P(row.scope, { after: 0, size: 20, color: MUTED })], { width: COLS[1] }),
          cell([boldedP(row.ownerDoes, row.ownerBold, { after: 0 })], {
            width: COLS[2],
            fill: CARD,
          }),
          cell([boldedP(row.whoDoes, row.whoBold, { after: 0 })], { width: COLS[3] }),
        ],
      }),
    );
    const detail: Paragraph[] = [
      new Paragraph({
        spacing: { after: whenItComesUpRuns(row).length || row.caveat ? 70 : 0, line: 268 },
        children: [
          new TextRun({
            text: S.inlineLabels.whatItIs,
            font: SANS,
            bold: true,
            color: MUTED,
            size: 15,
            characterSpacing: 20,
          }),
          text(row.whatItIs, { size: 20 }),
        ],
      }),
    ];
    const when = whenItComesUpRuns(row);
    if (when.length) {
      detail.push(
        new Paragraph({
          spacing: { after: row.caveat ? 70 : 0, line: 268 },
          children: [
            new TextRun({
              text: S.inlineLabels.whenItComesUp,
              font: SANS,
              bold: true,
              color: MUTED,
              size: 15,
              characterSpacing: 20,
            }),
            ...when,
          ],
        }),
      );
    }
    if (row.caveat) {
      detail.push(
        new Paragraph({
          spacing: { after: 0, line: 268 },
          indent: { left: 160 },
          children: [text(row.caveat, { size: 19, italics: true, color: AMBER })],
        }),
      );
    }
    tableRows.push(
      new TableRow({
        cantSplit: true,
        children: [cell(detail, { width: CW, span: 4, fill: "F3F7FB" })],
      }),
    );
  }
  tableRows.push(captionRow(4, label, title));
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: COLS,
    rows: tableRows,
  });
}

const REUSE_COLS = [2400, 2400, 2400, 2160];

function reuseTable(label: string, title: string) {
  const rows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        headCell(S.tableHeaders.piece, REUSE_COLS[0]),
        headCell(S.tableHeaders.whatYouWouldOtherwiseBuild, REUSE_COLS[1]),
        headCell(S.tableHeaders.whoRunsItAndHowToGetIt, REUSE_COLS[2]),
        headCell(S.tableHeaders.worthALookIn, REUSE_COLS[3]),
      ],
    }),
  ];
  for (const category of REUSABLE_CATEGORIES) {
    const pieces = REUSABLE_PIECES.filter((p) => p.category === category);
    if (pieces.length === 0) continue;
    rows.push(
      new TableRow({
        cantSplit: true,
        children: [
          cell(
            [
              new Paragraph({
                keepNext: true,
                children: [
                  new TextRun({
                    text: category.toUpperCase(),
                    font: SANS,
                    bold: true,
                    color: BROWN,
                    size: 15,
                    characterSpacing: 30,
                  }),
                ],
              }),
            ],
            { width: CW, span: 4, fill: CREAM },
          ),
        ],
      }),
    );
    for (const piece of pieces) {
      const nameRuns: TextRun[] = [
        new TextRun({ text: piece.name, font: SANS, bold: true, color: BROWN, size: 21 }),
      ];
      if (piece.linkKey) {
        nameRuns.push(
          new InternalHyperlink({
            anchor: "references",
            children: [
              new TextRun({
                text: ` [${refNumber(piece.linkKey)}]`,
                font: SANS,
                color: RUST,
                size: 18,
              }),
            ],
          }) as unknown as TextRun,
        );
      }
      rows.push(
        new TableRow({
          cantSplit: true,
          children: [
            cell([new Paragraph({ children: nameRuns })], { width: REUSE_COLS[0] }),
            cell([boldedP(piece.insteadOfBuilding, piece.insteadBold, { after: 0 })], {
              width: REUSE_COLS[1],
            }),
            cell([P(`${piece.runBy} ${piece.howToGetIt}`, { after: 0, size: 20, color: MUTED })], {
              width: REUSE_COLS[2],
            }),
            cell([boldedP(piece.lookAtItIn, S.phaseWords, { after: 0 })], { width: REUSE_COLS[3] }),
          ],
        }),
      );
      const detail: Paragraph[] = [
        new Paragraph({
          spacing: { after: piece.caveat ? 70 : 0, line: 268 },
          children: [
            new TextRun({
              text: S.inlineLabels.whatItIs,
              font: SANS,
              bold: true,
              color: MUTED,
              size: 15,
              characterSpacing: 20,
            }),
            text(piece.whatItIs, { size: 20 }),
          ],
        }),
      ];
      if (piece.caveat) {
        detail.push(
          new Paragraph({
            spacing: { after: 0, line: 268 },
            indent: { left: 160 },
            children: [text(piece.caveat, { size: 19, italics: true, color: RUST })],
          }),
        );
      }
      rows.push(
        new TableRow({
          cantSplit: true,
          children: [cell(detail, { width: CW, span: 4, fill: "F3F7FB" })],
        }),
      );
    }
  }
  rows.push(captionRow(4, label, title));
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: REUSE_COLS, rows });
}

/**
 * A term-and-definition list. Used for the glossary and for the people list.
 *
 * Horizontal rules only, and the term column shaded, because the full grid it
 * had before made a plain two-column list look like a data table.
 */
function definitionTable(
  entries: readonly { term: string; def: string }[],
  label: string,
  title: string,
) {
  const w = [2860, CW - 2860];
  const NONE = { style: BorderStyle.NONE };
  const rule = { style: BorderStyle.SINGLE, size: 2, color: TAN };
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: w,
    borders: {
      top: rule,
      bottom: rule,
      left: NONE,
      right: NONE,
      insideHorizontal: rule,
      insideVertical: NONE,
    },
    rows: [
      ...entries.map(
        (entry) =>
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: w[0], type: WidthType.DXA },
                shading: { fill: "F3F7FB", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.TOP,
                borders: { top: NONE, bottom: rule, left: NONE, right: NONE },
                margins: { top: 110, bottom: 110, left: 140, right: 180 },
                children: [
                  new Paragraph({
                    spacing: { after: 0, line: 268 },
                    children: [
                      new TextRun({
                        text: entry.term,
                        font: SANS,
                        bold: true,
                        color: BROWN,
                        size: 20,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: w[1], type: WidthType.DXA },
                verticalAlign: VerticalAlign.TOP,
                borders: { top: NONE, bottom: rule, left: NONE, right: NONE },
                margins: { top: 110, bottom: 110, left: 0, right: 0 },
                children: [P(entry.def, { after: 0, size: 20 })],
              }),
            ],
          }),
      ),
      captionRow(2, label, title),
    ],
  });
}

/* ------------------------------------------------- the worked example steps */

const STEP_COLS = [620, 4100, CW - 620 - 4100];

function bodyParts(parts: readonly CheckpointMapBodyPart[] | undefined): Paragraph[] {
  if (!parts) return [];
  const out: Paragraph[] = [];
  for (const part of parts) {
    if (part.type === "ul") {
      for (const item of part.items) out.push(bullet(item, "sb"));
    } else if (part.type === "caution") {
      out.push(
        new Paragraph({
          spacing: { before: 90, after: 0, line: 268 },
          indent: { left: 160 },
          children: [
            new TextRun({ text: `${part.lead} `, font: SANS, bold: true, color: AMBER, size: 19 }),
            text(part.text, { size: 19, color: AMBER }),
          ],
        }),
      );
    } else {
      out.push(boldedP(part.text, part.bold, { after: 90 }));
    }
  }
  return out;
}

function phaseSteps(
  phase: CheckpointMapPhaseBlock,
  steps: CheckpointMapPhaseBlock["steps"],
  caption?: { label: string; title: string },
) {
  const rows: TableRow[] = [
    new TableRow({
      // Not a repeating header. A repeating header put an empty one on the last page
      // of the document: the Sunset table's final row ended flush with the page break,
      // so the header repeated onto the next page and found no rows to sit above.
      cantSplit: true,
      children: [
        headCell(S.tableHeaders.stepNumber, STEP_COLS[0]),
        headCell(S.tableHeaders.whatNadiaDoes, STEP_COLS[1]),
        headCell(S.tableHeaders.whoRespondsAndHow, STEP_COLS[2]),
      ],
    }),
  ];
  steps.forEach((step, index) => {
    const keepNext = index === steps.length - 1;
    rows.push(
      new TableRow({
        cantSplit: true,
        children: [
          cell(
            [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                keepNext,
                children: [
                  new TextRun({
                    text: String(step.n),
                    font: SANS,
                    bold: true,
                    color: RUST,
                    size: 22,
                  }),
                ],
              }),
            ],
            { width: STEP_COLS[0], fill: SURF },
          ),
          cell(
            [
              new Paragraph({
                spacing: { after: step.action.body ? 90 : 0, line: 272 },
                keepNext,
                children: [
                  new TextRun({
                    text: step.action.lead,
                    font: SANS,
                    bold: true,
                    color: RUST,
                    size: 21,
                  }),
                ],
              }),
              ...bodyParts(step.action.body),
            ],
            { width: STEP_COLS[1], fill: CARD },
          ),
          cell(
            [
              new Paragraph({
                spacing: { after: step.response.body ? 90 : 0, line: 272 },
                children: [
                  ...step.response.tags.map(
                    (tag) =>
                      new TextRun({
                        text:
                          tag === "dept"
                            ? S.inlineLabels.responderDepartment
                            : S.inlineLabels.responderCentral,
                        font: SANS,
                        bold: true,
                        color: tag === "dept" ? RUST : AMBER,
                        size: 14,
                        characterSpacing: 20,
                      }),
                  ),
                  new TextRun({
                    text: step.response.lead,
                    font: SANS,
                    bold: true,
                    color: BROWN,
                    size: 21,
                  }),
                ],
              }),
              ...bodyParts(step.response.body),
            ],
            { width: STEP_COLS[2] },
          ),
        ],
      }),
    );
  });
  void phase;
  if (caption) rows.push(captionRow(3, caption.label, caption.title, false));
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: STEP_COLS,
    rows,
  });
}

function fork(f: NonNullable<CheckpointMapPhaseBlock["forkAfter"]>) {
  return callout(
    [
      new Paragraph({
        spacing: { after: 0, line: 276 },
        children: [
          new TextRun({ text: `${f.title} `, font: SANS, bold: true, color: AMBER, size: 21 }),
          text(f.text, { color: AMBER }),
        ],
      }),
    ],
    { fill: AMBERFILL, border: AMBER },
  );
}

/* -------------------------------------------------- numbering and captions */

/**
 * Document numbering, which is not the page's numbering.
 *
 * The template opens with an Introduction and closes with Conclusion and
 * References, and the page has none of those, so the two cannot share a
 * sequence. The appendices are named, not numbered, the way the page names them.
 */
const SECTIONS = {
  intro: "1",
  howToUse: "2",
  varies: "3",
  glossary: "4",
  tables: "5",
  conclusion: "6",
  references: "7",
} as const;

/** Figures and tables get a number, a caption, and a line in the front matter. */
const figures: { label: string; title: string }[] = [];
const tables: { label: string; title: string }[] = [];

function figure(label: string, title: string, file: string, w: number, h: number) {
  figures.push({ label, title });
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepLines: true,
      keepNext: true,
      spacing: { before: 200, after: 40 },
      children: [img(file, w, h, title)],
    }),
    caption(`${label}  ${title}`),
  ];
}

/**
 * A figure to the left of the text it belongs to, the way the page sets it.
 *
 * A borderless two-cell table, because a floating image in a Word document
 * reflows unpredictably once the text around it changes length.
 */
function figureBeside(
  label: string,
  title: string,
  file: string,
  w: number,
  h: number,
  beside: Paragraph[],
) {
  figures.push({ label, title });
  const NONE = { style: BorderStyle.NONE };
  const imgW = Math.round(w * 15 + 400);
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [imgW, CW - imgW],
    borders: {
      top: NONE,
      bottom: NONE,
      left: NONE,
      right: NONE,
      insideHorizontal: NONE,
      insideVertical: NONE,
    },
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            width: { size: imgW, type: WidthType.DXA },
            verticalAlign: VerticalAlign.TOP,
            borders: { top: NONE, bottom: NONE, left: NONE, right: NONE },
            margins: { top: 0, bottom: 0, left: 0, right: 220 },
            children: [
              new Paragraph({ spacing: { after: 60 }, children: [img(file, w, h, title)] }),
              new Paragraph({
                spacing: { after: 0 },
                children: [text(`${label}  ${title}`, { italics: true, color: MUTED, size: 16 })],
              }),
            ],
          }),
          new TableCell({
            width: { size: CW - imgW, type: WidthType.DXA },
            verticalAlign: VerticalAlign.TOP,
            borders: { top: NONE, bottom: NONE, left: NONE, right: NONE },
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
            children: beside,
          }),
        ],
      }),
    ],
  });
}

/**
 * The scope tag. Solid fill, white text, the brightest mark in the document.
 *
 * It used to be the same pale amber as the Check action tag, on the page and here,
 * so the one tag that decides whether a row applies to you looked like one of the
 * seven action tags.
 */
const ONLYIF_FILL = "B45309";
const ONLYIF_INK = "FFFFFF";

/** A tag, drawn the same way wherever it appears: legend, name cell, or timing line. */
function chipRun(label: string, fill: string, ink: string, bold = true) {
  return new TextRun({
    // Non-breaking spaces for the padding: a normal space lets Word wrap inside the
    // chip, or leave the phase label at the end of one line and its chip on the next.
    text: `\u00A0${label.toUpperCase().replace(/ /g, "\u00A0")}\u00A0`,
    font: SANS,
    bold,
    color: ink,
    size: 15,
    // No letter tracking: the extra space lands after the non-breaking padding too,
    // which drew a visible seam through "ONLY IF".
    shading: { fill, type: ShadingType.CLEAR },
  });
}

/** The legend chips, coloured the way the page colours them. */
const ACTION_FILL: Record<string, string> = {
  check: "FBEED5",
  gather: "D6EFEC",
  fill: "E6DEF5",
  sign: "F7DFE4",
  submit: "D9EFE1",
  keep: "D9E9F6",
  close: "E4E2DF",
};
const ACTION_INK: Record<string, string> = {
  check: "7A4E12",
  gather: "14544E",
  fill: "402C6B",
  sign: "7A2036",
  submit: "1B5133",
  keep: "1C4C71",
  close: "3E3A35",
};

function chipTable(
  items: { label: string; gloss: string; fill: string; ink: string }[],
  label: string,
  title: string,
) {
  const w = [2400, CW - 2400];
  const NONE = { style: BorderStyle.NONE };
  const rule = { style: BorderStyle.SINGLE, size: 2, color: TAN };
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: w,
    borders: {
      top: NONE,
      bottom: NONE,
      left: NONE,
      right: NONE,
      insideHorizontal: rule,
      insideVertical: NONE,
    },
    rows: [
      ...items.map(
        (item) =>
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: w[0], type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                borders: { top: NONE, bottom: rule, left: NONE, right: NONE },
                margins: { top: 70, bottom: 70, left: 0, right: 160 },
                children: [
                  new Paragraph({
                    spacing: { before: 20, after: 20 },
                    children: [chipRun(item.label, item.fill, item.ink)],
                  }),
                ],
              }),
              new TableCell({
                width: { size: w[1], type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                borders: { top: NONE, bottom: rule, left: NONE, right: NONE },
                margins: { top: 70, bottom: 70, left: 0, right: 0 },
                children: [P(item.gloss, { after: 0, size: 20 })],
              }),
            ],
          }),
      ),
      captionRow(2, label, title, false),
    ],
  });
}

function tableCaption(label: string, title: string) {
  tables.push({ label, title });
  return caption(`${label}  ${title}`);
}

/**
 * A table's caption and its back-to-contents link, as the table's own last row.
 *
 * They used to be paragraphs after the table, and a table that ended flush with a
 * page break left them alone on the next page. Inside the table they cannot be
 * separated from it, which is the only way to be sure.
 */
function captionRow(columns: number, label: string, title: string, back = true) {
  tables.push({ label, title });
  const NONE = { style: BorderStyle.NONE };
  const children: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: back ? 40 : 0 },
      children: [text(`${label}  ${title}`, { italics: true, color: MUTED, size: 17 })],
    }),
  ];
  if (back) children.push(backToTop());
  return new TableRow({
    cantSplit: true,
    children: [
      new TableCell({
        width: { size: CW, type: WidthType.DXA },
        columnSpan: columns,
        borders: { top: NONE, bottom: NONE, left: NONE, right: NONE },
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
        children,
      }),
    ],
  });
}

/* ------------------------------------------------------------------ body */

const body: (Paragraph | Table)[] = [];

/* 1. Introduction */
body.push(H1D(SECTIONS.intro, S.headings.introduction, "intro", false));
body.push(H2D(`${SECTIONS.intro}.1`, S.headings.context));
body.push(P(S.prose.context));
body.push(H2D(`${SECTIONS.intro}.2`, S.headings.purposeAndScope));
body.push(boldedP(CHECKPOINT_MAP_WHAT_TABLE.body, CHECKPOINT_MAP_WHAT_TABLE.bold));
body.push(
  P(
    fillIn(S.prose.purposeAndScope, {
      instruments: INSTRUMENT_MATRIX.length,
      topics: MATRIX_FAMILY_SECTIONS.length,
    }),
  ),
);
body.push(H2D(`${SECTIONS.intro}.3`, S.headings.audience));
body.push(P(S.prose.audience));
pushBackToTop(body);

/* 2. How to use this document */
body.push(H1D(SECTIONS.howToUse, S.headings.howToUse, "how-to-use", false));
for (const item of CHECKPOINT_MAP_HOW_TO_USE.items) {
  body.push(
    new Paragraph({
      spacing: { after: 130, line: 278 },
      numbering: { reference: "b", level: 0 },
      children: [
        new TextRun({ text: `${item.lead} `, font: SANS, bold: true, color: BROWN, size: 21 }),
        text(item.body.replace(S.prose.howToUseFind, S.prose.howToUseReplace)),
      ],
    }),
  );
}
pushBackToTop(body);

/* 3. Nearly everything here varies */
body.push(H1D(SECTIONS.varies, CHECKPOINT_MAP_VARIES.heading, "everything-varies", false));
body.push(
  callout(
    CHECKPOINT_MAP_VARIES.paragraphs.map((paragraph, index) =>
      P(paragraph, { after: index === CHECKPOINT_MAP_VARIES.paragraphs.length - 1 ? 0 : 130 }),
    ),
  ),
);
pushBackToTop(body);

/* 4. Glossary */
body.push(H1D(SECTIONS.glossary, CHECKPOINT_MAP_TERMS_TITLE, "thecheckpoints", false));
body.push(P(CHECKPOINT_MAP_TERMS_CAPTION));
body.push(
  definitionTable(
    CHECKPOINT_MAP_TERMS,
    `${S.captions.tableWord} ${SECTIONS.glossary}-1`,
    S.captions.glossary,
  ),
);

/* 5. Every official thing a service has to do */
body.push(H1D(SECTIONS.tables, CHECKPOINT_MAP_TABLE_SECTION.heading, "annex-instruments"));
body.push(P(CHECKPOINT_MAP_TABLE_SECTION.intro));
let tableNo = 0;
const nextTable = () => {
  tableNo += 1;
  return `${S.captions.tableWord} ${SECTIONS.tables}-${tableNo}`;
};

body.push(H3(S.headings.tagsMean));
body.push(
  chipTable(
    (Object.keys(MATRIX_ACTIONS) as (keyof typeof MATRIX_ACTIONS)[]).map((key) => ({
      label: MATRIX_ACTIONS[key].label,
      gloss: MATRIX_ACTIONS[key].gloss,
      fill: ACTION_FILL[key],
      ink: ACTION_INK[key],
    })),
    nextTable(),
    S.captions.actionTags,
  ),
);

body.push(H3(S.headings.scopeTag));
body.push(
  chipTable(
    [{ label: S.tags.onlyIf, gloss: S.tags.onlyIfGloss, fill: ONLYIF_FILL, ink: ONLYIF_INK }],
    nextTable(),
    S.captions.scopeTag,
  ),
);

body.push(H3(S.headings.kinds));
body.push(
  chipTable(
    (Object.keys(MATRIX_KINDS) as (keyof typeof MATRIX_KINDS)[]).map((key) => ({
      label: MATRIX_KINDS[key].label,
      gloss: MATRIX_KINDS[key].gloss,
      fill: SURF,
      ink: BROWN,
    })),
    nextTable(),
    S.captions.kinds,
  ),
);
pushBackToTop(body);

let topicIndex = 0;
for (const section of MATRIX_FAMILY_SECTIONS) {
  const rows = INSTRUMENT_MATRIX.filter((row) => row.family === section.family);
  if (rows.length === 0) continue;
  topicIndex += 1;
  body.push(
    H2D(`${SECTIONS.tables}.${topicIndex}`, section.family, section.id, TOPIC_ICON[section.family]),
  );
  body.push(P(section.intro));
  const topicCaption = fillIn(S.captions.topicTable, { topic: section.family });
  body.push(topicTable(rows, nextTable(), topicCaption));
}

/* 6. Conclusion and next steps */
body.push(H1D(SECTIONS.conclusion, S.headings.conclusion, "conclusion", false));
body.push(P(S.conclusion.ruleOutFirst));
body.push(P(S.conclusion.settleEarly));
body.push(new Paragraph({ spacing: { before: 340, after: 0 }, children: [] }));
body.push(
  callout(
    [
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: S.inlineLabels.about,
            font: SANS,
            bold: true,
            color: MUTED,
            size: 15,
            characterSpacing: 60,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new Bookmark({
            id: "about",
            children: [
              new TextRun({
                text: S.conclusion.aboutHeading,
                font: SERIF,
                bold: true,
                color: BROWN,
                size: 30,
              }),
            ],
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 0, line: 276 },
        children: [
          text(S.conclusion.aboutBefore),
          text(S.conclusion.aboutGuideName, { bold: true }),
          text(S.conclusion.aboutAfter),
        ],
      }),
    ],
    { fill: CREAM, border: RUST },
  ),
);
pushBackToTop(body);

/* 7. References */
body.push(H1D(SECTIONS.references, S.headings.references, "references"));
body.push(P(S.references.intro));
const refHead = (t: string) =>
  new Paragraph({
    spacing: { before: 220, after: 90 },
    children: [new TextRun({ text: t, font: SANS, bold: true, color: MUTED, size: 19 })],
  });
body.push(refHead(S.inlineLabels.governingInstruments));
for (const key of govRefs) body.push(srcNum(refOrder.indexOf(key) + 1, key));
body.push(refHead(S.inlineLabels.supportingReferences));
for (const key of supRefs) body.push(srcNum(refOrder.indexOf(key) + 1, key));
body.push(
  new Paragraph({
    spacing: { before: 220, after: 0, line: 268 },
    children: [text(CHECKPOINT_MAP_FOOTER_DISCLAIMER, { italics: true, color: MUTED, size: 19 })],
  }),
);
pushBackToTop(body);

/* Appendix A */
body.push(H1D(S.appendix.labelA, CHECKPOINT_MAP_APPENDIX_REUSE.heading, "annex-reuse"));
body.push(P(S.appendix.reuseIntro));
body.push(reuseTable(`${S.captions.tableWord} A1-1`, S.captions.reuseTable));

/* Appendix B */
body.push(H1D(S.appendix.labelB, CHECKPOINT_MAP_APPENDIX_PATH.heading, "annex-nadia"));
body.push(
  callout(
    [
      new Paragraph({
        spacing: { after: 0, line: 276 },
        children: [text(S.appendix.inventedLead, { bold: true }), text(S.appendix.inventedBody)],
      }),
    ],
    { fill: AMBERFILL, border: AMBER },
  ),
);
body.push(new Paragraph({ spacing: { after: 260 }, children: [] }));
body.push(P(CHECKPOINT_MAP_APPENDIX_PATH.intro, { after: 130 }));
body.push(P(CHECKPOINT_MAP_APPENDIX_PATH.pathNote));

body.push(H2D(`${S.appendix.labelB}.1`, CHECKPOINT_MAP_NADIA.heading, "app2-nadia"));
body.push(
  figureBeside(
    `${S.captions.figureWord} A2-1`,
    S.captions.nadiaPortrait,
    "gate_map_nadia.png",
    104,
    126,
    [boldedP(CHECKPOINT_MAP_NADIA.body, CHECKPOINT_MAP_NADIA.bold, { after: 0 })],
  ),
);
body.push(new Paragraph({ spacing: { after: 200 }, children: [] }));
body.push(P(CHECKPOINT_MAP_WHY_GCS.body));
body.push(H3(CHECKPOINT_MAP_WHY_CREATE.heading));
body.push(P(CHECKPOINT_MAP_WHY_CREATE.body));

body.push(H2D(`${S.appendix.labelB}.2`, CHECKPOINT_MAP_WHO_TITLE, "app2-who"));
body.push(P(CHECKPOINT_MAP_WHO_CAPTION));
body.push(definitionTable(CHECKPOINT_MAP_WHO, `${S.captions.tableWord} A2-1`, S.captions.whoTable));

body.push(H2D(`${S.appendix.labelB}.3`, S.headings.howLongItTook, "app2-timeline"));
body.push(
  ...figure(
    `${S.captions.figureWord} A2-2`,
    S.captions.timeline,
    "gate_map_timeline.png",
    600,
    150,
  ),
);
body.push(P(CHECKPOINT_MAP_APPENDIX_PATH.timelineNote));
pushBackToTop(body);

body.push(H2D(`${S.appendix.labelB}.4`, S.headings.howToReadTheSteps, "app2-key"));
body.push(P(`${CHECKPOINT_MAP_COLKEY.left} ${S.appendix.columnKeyRight}`));
pushBackToTop(body);

let phaseIndex = 4;
for (const phase of CHECKPOINT_MAP_PHASES) {
  phaseIndex += 1;
  body.push(H2D(`${S.appendix.labelB}.${phaseIndex}`, phase.heading, `app2-${phase.id}`));
  body.push(P(phase.durationLabel, { italics: true, color: MUTED, size: 19, after: 90 }));
  body.push(P(phase.phaseNote));
  body.push(
    phaseSteps(phase, phase.steps, {
      label: `${S.captions.tableWord} A2-${phaseIndex - 3}`,
      title: fillIn(S.captions.phaseSteps, {
        phase: phase.heading.split(S.appendix.phaseHeadingSeparator)[0],
      }),
    }),
  );
  if (phase.forkAfter) body.push(fork(phase.forkAfter));
  if (phase.stepsAfterFork) body.push(phaseSteps(phase, phase.stepsAfterFork));
  if (phase.forkEnd) body.push(fork(phase.forkEnd));
  if (phase.showLaunchAfter) {
    body.push(
      callout(
        [
          new Paragraph({
            spacing: { after: 0 },
            children: [
              new TextRun({
                text: `${CHECKPOINT_MAP_LAUNCH.tag}  `,
                font: SANS,
                bold: true,
                color: RUST,
                size: 18,
                characterSpacing: 30,
              }),
              new TextRun({
                text: CHECKPOINT_MAP_LAUNCH.text,
                font: SERIF,
                color: BROWN,
                size: 23,
              }),
            ],
          }),
        ],
        { fill: CREAM, border: RUST },
      ),
    );
  }
  pushBackToTop(body);
}

/**
 * The dated-guide note that closes the title page.
 *
 * The same caveat the home page carries, in the same words: this is a 2026 guide, the
 * addresses in it will rot before the thinking does. On a document it matters more than
 * on a page, because a downloaded file has no way of telling the reader how old it is.
 *
 * Dashed rather than solid, and the palest fill in the palette, so it reads as an aside
 * on the title page instead of competing with the title above it.
 */
function datedNote() {
  const dash = { style: BorderStyle.DASHED, size: 4, color: TAN };
  const INSET = 1100;
  return new Table({
    width: { size: CW - INSET * 2, type: WidthType.DXA },
    columnWidths: [CW - INSET * 2],
    alignment: AlignmentType.CENTER,
    indent: { size: INSET, type: WidthType.DXA },
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            width: { size: CW - INSET * 2, type: WidthType.DXA },
            shading: { fill: CARD, type: ShadingType.CLEAR },
            borders: { top: dash, bottom: dash, left: dash, right: dash },
            margins: { top: 220, bottom: 240, left: 300, right: 300 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 140 },
                children: [
                  new TextRun({
                    text: S.frontMatter.datedNoteLabel,
                    font: SANS,
                    bold: true,
                    color: RUST,
                    size: 15,
                    characterSpacing: 60,
                  }),
                ],
              }),
              ...S.frontMatter.datedNote.map(
                (line, i, all) =>
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { after: i === all.length - 1 ? 0 : 130, line: 288 },
                    children: [new TextRun({ text: line, font: SANS, color: MUTED, size: 17 })],
                  }),
              ),
            ],
          }),
        ],
      }),
    ],
  });
}

/* ----------------------------------------------------------------- cover */

const cover: (Paragraph | Table)[] = [];
cover.push(
  new Paragraph({
    spacing: { after: 0 },
    children: [
      new ImageRun({
        type: "png",
        data: readFileSync(`${IMG}/gc_banner.png`),
        transformation: { width: 816, height: 82 },
        floating: {
          horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 0 },
          verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: 0 },
          wrap: { type: TextWrappingType.TOP_AND_BOTTOM },
          allowOverlap: true,
        },
        altText: {
          title: S.frontMatter.bannerAltTitle,
          description: S.frontMatter.bannerAltDescription,
          name: S.frontMatter.bannerAltName,
        },
      }),
    ],
  }),
);
cover.push(
  new Paragraph({
    alignment: AlignmentType.RIGHT,
    spacing: { before: 60, after: 1500 },
    children: [
      new TextRun({
        text: S.frontMatter.classification,
        font: SANS,
        bold: true,
        color: UNCL,
        size: 18,
        characterSpacing: 20,
      }),
    ],
  }),
);
cover.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: S.frontMatter.eyebrow,
        font: SANS,
        color: MUTED,
        size: 19,
        characterSpacing: 30,
      }),
    ],
  }),
);
cover.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 280 },
    children: [
      new TextRun({ text: CHECKPOINT_MAP_TITLE, font: SERIF, bold: true, color: BROWN, size: 50 }),
    ],
  }),
);
cover.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0, line: 1, lineRule: LineRuleType.EXACTLY },
    border: { top: { style: BorderStyle.SINGLE, size: 14, color: NAVY, space: 1 } },
    children: [],
  }),
);
cover.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 280, after: 400 },
    children: [
      new TextRun({
        text: S.frontMatter.subtitle,
        font: SERIF,
        italics: true,
        color: NAVY,
        size: 26,
      }),
    ],
  }),
);
cover.push(new Paragraph({ spacing: { before: 1900, after: 0 } }));
cover.push(datedNote());

cover.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 520, after: 70 },
    children: [new TextRun({ text: DATE, font: SANS, color: BROWN, size: 22 })],
  }),
);
cover.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0, line: 236 },
    children: [
      new TextRun({
        text: S.frontMatter.developedByLine1,
        font: SANS,
        color: BANNERBLUE,
        size: 15,
      }),
    ],
  }),
);
cover.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0, line: 236 },
    children: [
      new TextRun({
        text: S.frontMatter.developedByLine2,
        font: SANS,
        color: BANNERBLUE,
        size: 15,
      }),
    ],
  }),
);

/* ----------------------------------------------------------- front matter */

/**
 * Page numbers for the contents, from the previous build.
 *
 * The template's contents list carries page numbers with dot leaders, and a Word
 * field renders empty when LibreOffice makes the PDF. So the build is run twice:
 * the first pass writes the document, `npm run doc:checkpoints` then reads the
 * PDF back and records which page each heading fell on, and the second pass sets
 * the numbers. Without the map the entries render without a number, which is the
 * state of a first build on a clean checkout.
 */
const PAGE_MAP: Record<string, number> = existsSync(PAGES_FILE)
  ? (JSON.parse(readFileSync(PAGES_FILE, "utf8")) as Record<string, number>)
  : {};

function tocEntry(
  label: string,
  title: string,
  anchor: string | null,
  sub = false,
  pageKey?: string,
) {
  const numbered = /^\d+$/.test(label);
  const shown = label ? `${label}${!sub && numbered ? ".  " : "  "}${title}` : title;
  const colour = sub ? MUTED : BROWN;
  const size = sub ? 18 : 20;
  const page = PAGE_MAP[pageKey ?? anchor ?? shown];
  const head = anchor
    ? new InternalHyperlink({
        anchor,
        children: [new TextRun({ text: shown, font: SANS, color: colour, bold: !sub, size })],
      })
    : new TextRun({ text: shown, font: SANS, color: colour, bold: !sub, size });
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: CW, leader: "dot" }],
    spacing: { after: sub ? 40 : 60 },
    indent: { left: sub ? 340 : 0 },
    children: [head, new TextRun({ text: `\t${page ?? ""}`, font: SANS, color: colour, size })],
  });
}

const front: (Paragraph | Table)[] = [];
front.push(new Paragraph({ children: [new PageBreak()] }));
front.push(
  new Paragraph({
    spacing: { after: 160 },
    children: [
      new Bookmark({
        id: "toc",
        children: [
          new TextRun({
            text: S.frontMatter.contents,
            font: SERIF,
            bold: true,
            color: BROWN,
            size: 36,
          }),
        ],
      }),
    ],
  }),
);

front.push(tocEntry(SECTIONS.intro, S.headings.introduction, "intro"));
front.push(tocEntry(`${SECTIONS.intro}.1`, S.headings.context, null, true, "intro"));
front.push(tocEntry(`${SECTIONS.intro}.2`, S.headings.purposeAndScope, null, true, "intro"));
front.push(tocEntry(`${SECTIONS.intro}.3`, S.headings.audience, null, true, "intro"));
front.push(tocEntry(SECTIONS.howToUse, S.headings.howToUse, "how-to-use"));
front.push(tocEntry(SECTIONS.varies, CHECKPOINT_MAP_VARIES.heading, "everything-varies"));
front.push(tocEntry(SECTIONS.glossary, CHECKPOINT_MAP_TERMS_TITLE, "thecheckpoints"));
front.push(tocEntry(SECTIONS.tables, CHECKPOINT_MAP_TABLE_SECTION.heading, "annex-instruments"));
MATRIX_FAMILY_SECTIONS.forEach((section, index) => {
  front.push(tocEntry(`${SECTIONS.tables}.${index + 1}`, section.family, section.id, true));
});
front.push(tocEntry(SECTIONS.conclusion, S.headings.conclusion, "conclusion"));
front.push(tocEntry(`${SECTIONS.conclusion}.1`, S.headings.aboutTheGuide, "about", true));
front.push(tocEntry(SECTIONS.references, S.headings.references, "references"));
front.push(tocEntry(S.appendix.labelA, CHECKPOINT_MAP_APPENDIX_REUSE.heading, "annex-reuse"));
front.push(tocEntry(S.appendix.labelB, CHECKPOINT_MAP_APPENDIX_PATH.heading, "annex-nadia"));
front.push(tocEntry(`${S.appendix.labelB}.1`, CHECKPOINT_MAP_NADIA.heading, "app2-nadia", true));
front.push(tocEntry(`${S.appendix.labelB}.2`, CHECKPOINT_MAP_WHO_TITLE, "app2-who", true));
front.push(tocEntry(`${S.appendix.labelB}.3`, S.headings.howLongItTook, "app2-timeline", true));
front.push(tocEntry(`${S.appendix.labelB}.4`, S.headings.howToReadTheSteps, "app2-key", true));
CHECKPOINT_MAP_PHASES.forEach((phase, index) => {
  front.push(
    tocEntry(`${S.appendix.labelB}.${index + 5}`, phase.heading, `app2-${phase.id}`, true),
  );
});

front.push(
  new Paragraph({
    spacing: { before: 360, after: 120 },
    children: [
      new TextRun({
        text: S.frontMatter.listOfFigures,
        font: SERIF,
        bold: true,
        color: BROWN,
        size: 28,
      }),
    ],
  }),
);
for (const item of figures) {
  front.push(
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: CW, leader: "dot" }],
      spacing: { after: 70 },
      children: [
        new TextRun({ text: `${item.label}  ${item.title}`, font: SANS, color: BROWN, size: 20 }),
        new TextRun({
          text: `\t${PAGE_MAP[item.label] ?? ""}`,
          font: SANS,
          color: BROWN,
          size: 20,
        }),
      ],
    }),
  );
}

front.push(
  new Paragraph({
    spacing: { before: 280, after: 120 },
    children: [
      new TextRun({
        text: S.frontMatter.listOfTables,
        font: SERIF,
        bold: true,
        color: BROWN,
        size: 28,
      }),
    ],
  }),
);
for (const item of tables) {
  front.push(
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: CW, leader: "dot" }],
      spacing: { after: 70 },
      children: [
        new TextRun({ text: `${item.label}  ${item.title}`, font: SANS, color: BROWN, size: 20 }),
        new TextRun({
          text: `\t${PAGE_MAP[item.label] ?? ""}`,
          font: SANS,
          color: BROWN,
          size: 20,
        }),
      ],
    }),
  );
}

/* -------------------------------------------------------------- assemble */

const bannerHeader = new Header({
  children: [
    new Paragraph({
      tabStops: [
        { type: TabStopType.CENTER, position: CW / 2 },
        { type: TabStopType.RIGHT, position: CW },
      ],
      spacing: { after: 20 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: TAN, space: 4 } },
      children: [
        new TextRun({ text: CHECKPOINT_MAP_TITLE, font: SANS, color: MUTED, size: 16 }),
        new TextRun({
          text: S.frontMatter.headerClassification,
          font: SANS,
          bold: true,
          color: UNCL,
          size: 16,
        }),
      ],
    }),
  ],
});

function pageFooter() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: TAN, space: 4 } },
        spacing: { before: 20 },
        children: [
          new TextRun({ children: [PageNumber.CURRENT], font: SANS, color: MUTED, size: 16 }),
        ],
      }),
    ],
  });
}

const page = {
  size: { width: 12240, height: 15840 },
  margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
};

const doc = new Document({
  features: { updateFields: true },
  styles: {
    /* The document's language, so a screen reader pronounces it correctly and Word
       spell-checks it against the right dictionary. Without it the French edition
       declares itself English. */
    default: {
      document: {
        run: { font: SANS, size: 21, color: BODY, language: { value: IS_FR ? "fr-CA" : "en-CA" } },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 38, bold: true, font: SERIF, color: BROWN },
        paragraph: { spacing: { before: 520, after: 180 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, font: SERIF, color: RUST },
        paragraph: { spacing: { before: 340, after: 110 }, outlineLevel: 1 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "b",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "–",
            alignment: AlignmentType.LEFT,
            style: { run: { color: RUST }, paragraph: { indent: { left: 600, hanging: 280 } } },
          },
        ],
      },
      {
        reference: "sb",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "–",
            alignment: AlignmentType.LEFT,
            style: { run: { color: RUST }, paragraph: { indent: { left: 340, hanging: 200 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: { ...page, pageNumbers: { start: 1, formatType: NumberFormat.LOWER_ROMAN } },
        titlePage: true,
      },
      headers: {
        default: bannerHeader,
        first: new Header({ children: [new Paragraph({ children: [] })] }),
      },
      footers: {
        default: pageFooter(),
        first: new Footer({ children: [new Paragraph({ children: [] })] }),
      },
      children: [...cover, ...front],
    },
    {
      properties: {
        type: "nextPage",
        page: { ...page, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } },
      },
      headers: { default: bannerHeader },
      footers: { default: pageFooter() },
      children: body,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  writeFileSync(OUT, buffer);
  console.log(
    `wrote ${OUT.split("/").pop()}  ${(buffer.length / 1024).toFixed(0)} KB  ` +
      `${INSTRUMENT_MATRIX.length} instruments, ${topicIndex} topic tables, ` +
      `${figures.length} figures, ${tables.length} tables, ${refOrder.length} references` +
      `${Object.keys(PAGE_MAP).length ? "" : "  (no page numbers yet: run the page pass)"}`,
  );
});
