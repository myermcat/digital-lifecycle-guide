/**
 * Builds the Word document for the official-checkpoints page.
 *
 * Unlike the other document builders, this one is IN the repo and imports the
 * same content files the site renders, so the two cannot drift. Nothing here
 * restates page copy: if a sentence is wrong, fix it in `src/lib` and rebuild.
 *
 *   npx tsx scripts/build-checkpoints-doc.ts
 *
 * House style follows the existing builders in
 * "TBS (Claude Output)/Transcripts & chat knowledge/Document builders (scripts + assets)":
 * the same palette, Georgia for headings and Arial for text, a 9360-twip content
 * width on Letter portrait, the UNCLASSIFIED banner, roman front matter and
 * decimal body, and "Back to contents" at the end of each section.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
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
  checkpointMapSectionNumber,
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
const OUT =
  "/Users/maryy/Desktop/Claude Hub/Claude -- TBS/TBS (Claude Output)/GCX Repo/" +
  "DLG -- Editable Source Files (Word)/The official checkpoints of a digital service.docx";
const DATE = "17 August 2026";

/** A PNG for each topic, from the assets the other builders already use. */
const TOPIC_ICON: Record<string, string> = {
  Security: "shieldcheck.png",
  "Continuity and incidents": "siren.png",
  "Privacy and automated decisions": "shield.png",
  Accessibility: "users.png",
  "Official languages": "megaphone.png",
  "Approvals and money": "coins.png",
  "Contracts and suppliers": "filesignature.png",
  "Hosting and cloud": "server.png",
  "Identity and sign-in": "user.png",
  "Publishing on canada.ca": "layers.png",
  "Registries and records": "archive.png",
  "Access to information and openness": "search.png",
};

/* ------------------------------------------------------- reference numbers */

/**
 * Every instrument link becomes a numbered reference, in the order the tables
 * use them, so a printed table can still be followed to its source.
 */
const refOrder: ExternalLinkKey[] = [];
function refNumber(key: ExternalLinkKey): number {
  const at = refOrder.indexOf(key);
  if (at !== -1) return at + 1;
  refOrder.push(key);
  return refOrder.length;
}

/* --------------------------------------------------------------- helpers */

function text(t: string, opts: Record<string, unknown> = {}) {
  return new TextRun({ text: t, font: SANS, size: 21, color: BODY, ...opts });
}

function P(t: string, opts: { after?: number; size?: number; color?: string; italics?: boolean } = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 150, line: 278 },
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
  return new Paragraph({ spacing: { after: opts.after ?? 150, line: 278 }, children: runs });
}

function bullet(t: string, ref = "b") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 90, line: 276 },
    children: [text(t)],
  });
}

function img(file: string, w: number, h: number, alt: string) {
  return new ImageRun({
    type: "png",
    data: readFileSync(`${IMG}/${file}`),
    transformation: { width: w, height: h },
    altText: { title: alt, description: alt, name: alt },
  });
}

function H1(id: string, title: string, pageBreak = true) {
  const number = checkpointMapSectionNumber(id);
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

function H2(id: string, title: string, icon?: string) {
  const number = checkpointMapSectionNumber(id);
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

function backToTop() {
  return new Paragraph({
    spacing: { before: 120, after: 320 },
    children: [
      new InternalHyperlink({
        anchor: "toc",
        children: [
          new TextRun({
            text: "↑ Back to contents",
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

/* ------------------------------------------------------------ the tables */

const COLS = [2280, 2520, 2400, 2160];

/** The sub-phases where something happens, as one line. */
function whenItComesUp(row: MatrixInstrument): string {
  const active = MATRIX_SUBPHASES.filter((s) => row.cells[s.key]);
  if (active.length === 0) return "";
  return active
    .map((s) => `${s.label} ${row.cells[s.key]!.tags.map((t) => MATRIX_ACTIONS[t].label).join(", ")}`)
    .join("  ·  ");
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
  const tags: TextRun[] = [
    new TextRun({
      text: MATRIX_KINDS[row.kind].label.toUpperCase(),
      font: SANS,
      bold: true,
      color: MUTED,
      size: 14,
      characterSpacing: 20,
    }),
  ];
  const paragraphs = [
    new Paragraph({ spacing: { after: 40 }, children: runs }),
    new Paragraph({ spacing: { after: row.everyService ? 0 : 30 }, children: tags }),
  ];
  if (!row.everyService) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "ONLY IF",
            font: SANS,
            bold: true,
            color: AMBER,
            size: 14,
            characterSpacing: 20,
          }),
        ],
      }),
    );
  }
  return cell(paragraphs, { width: COLS[0] });
}

function topicTable(rows: MatrixInstrument[]) {
  const tableRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        headCell("Instrument", COLS[0]),
        headCell("What brings it into scope", COLS[1]),
        headCell("What the business owner does", COLS[2]),
        headCell("Who does the work", COLS[3]),
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
        spacing: { after: whenItComesUp(row) || row.caveat ? 70 : 0, line: 268 },
        children: [
          new TextRun({
            text: "WHAT IT IS   ",
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
    const when = whenItComesUp(row);
    if (when) {
      detail.push(
        new Paragraph({
          spacing: { after: row.caveat ? 70 : 0, line: 268 },
          children: [
            new TextRun({
              text: "WHEN IT COMES UP   ",
              font: SANS,
              bold: true,
              color: MUTED,
              size: 15,
              characterSpacing: 20,
            }),
            text(when, { size: 20, color: MUTED }),
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
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: COLS,
    rows: tableRows,
  });
}

const REUSE_COLS = [2400, 2400, 2400, 2160];

function reuseTable() {
  const rows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        headCell("Piece", REUSE_COLS[0]),
        headCell("What you would otherwise build", REUSE_COLS[1]),
        headCell("Who runs it, and how to get it", REUSE_COLS[2]),
        headCell("Worth a look in", REUSE_COLS[3]),
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
            cell(
              [
                boldedP(
                  piece.lookAtItIn,
                  ["Discovery", "Alpha", "Beta", "Stabilization", "Growth", "Maturity", "Live", "Sunset"],
                  { after: 0 },
                ),
              ],
              { width: REUSE_COLS[3] },
            ),
          ],
        }),
      );
      const detail: Paragraph[] = [
        new Paragraph({
          spacing: { after: piece.caveat ? 70 : 0, line: 268 },
          children: [
            new TextRun({
              text: "WHAT IT IS   ",
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
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: REUSE_COLS, rows });
}

function definitionTable(entries: readonly { term: string; def: string }[]) {
  const w = [2900, CW - 2900];
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: w,
    rows: entries.map(
      (entry) =>
        new TableRow({
          cantSplit: true,
          children: [
            cell(
              [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: entry.term,
                      font: SANS,
                      bold: true,
                      color: RUST,
                      size: 21,
                    }),
                  ],
                }),
              ],
              { width: w[0] },
            ),
            cell([P(entry.def, { after: 0, size: 20 })], { width: w[1] }),
          ],
        }),
    ),
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

function phaseSteps(phase: CheckpointMapPhaseBlock, steps: CheckpointMapPhaseBlock["steps"]) {
  const rows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        headCell("#", STEP_COLS[0]),
        headCell("What Nadia does", STEP_COLS[1]),
        headCell("Who responds, and how", STEP_COLS[2]),
      ],
    }),
  ];
  for (const step of steps) {
    rows.push(
      new TableRow({
        cantSplit: true,
        children: [
          cell(
            [
              new Paragraph({
                alignment: AlignmentType.CENTER,
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
                  ...step.response.tags.map((tag) =>
                    new TextRun({
                      text: tag === "dept" ? "HER DEPARTMENT  " : "CENTRAL  ",
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
  }
  void phase;
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

/* ------------------------------------------------------------------ body */

const body: (Paragraph | Table)[] = [];

// 1 to 3, the on-ramp
body.push(H1("what-this-covers", CHECKPOINT_MAP_WHAT_TABLE.heading, false));
body.push(boldedP(CHECKPOINT_MAP_WHAT_TABLE.body, CHECKPOINT_MAP_WHAT_TABLE.bold));

body.push(H1("how-to-use", CHECKPOINT_MAP_HOW_TO_USE.heading, false));
for (const item of CHECKPOINT_MAP_HOW_TO_USE.items) {
  body.push(
    new Paragraph({
      spacing: { after: 130, line: 278 },
      numbering: { reference: "b", level: 0 },
      children: [
        new TextRun({ text: `${item.lead} `, font: SANS, bold: true, color: BROWN, size: 21 }),
        text(item.body),
      ],
    }),
  );
}

body.push(H1("everything-varies", CHECKPOINT_MAP_VARIES.heading, false));
body.push(
  callout(
    CHECKPOINT_MAP_VARIES.paragraphs.map((paragraph, index) =>
      P(paragraph, { after: index === CHECKPOINT_MAP_VARIES.paragraphs.length - 1 ? 0 : 130 }),
    ),
  ),
);
body.push(backToTop());

// 4 Glossary
body.push(H1("thecheckpoints", CHECKPOINT_MAP_TERMS_TITLE));
body.push(P(CHECKPOINT_MAP_TERMS_CAPTION, { italics: true, color: MUTED }));
body.push(definitionTable(CHECKPOINT_MAP_TERMS));
body.push(backToTop());

// 5 the tables
body.push(H1(CHECKPOINT_MAP_TABLE_SECTION.id, CHECKPOINT_MAP_TABLE_SECTION.heading));
body.push(P(CHECKPOINT_MAP_TABLE_SECTION.intro));
body.push(H3("What the tags mean"));
for (const key of Object.keys(MATRIX_ACTIONS) as (keyof typeof MATRIX_ACTIONS)[]) {
  body.push(bullet(`${MATRIX_ACTIONS[key].label}. ${MATRIX_ACTIONS[key].gloss}`));
}
body.push(H3("What kind of thing each one is"));
for (const key of Object.keys(MATRIX_KINDS) as (keyof typeof MATRIX_KINDS)[]) {
  body.push(bullet(`${MATRIX_KINDS[key].label}. ${MATRIX_KINDS[key].gloss}`));
}
body.push(
  P(
    "An amber ONLY IF tag marks an instrument that does not apply to every service. Everything without one applies to all of them.",
    { color: MUTED, size: 20 },
  ),
);

let tableIndex = 0;
for (const section of MATRIX_FAMILY_SECTIONS) {
  const rows = INSTRUMENT_MATRIX.filter((row) => row.family === section.family);
  if (rows.length === 0) continue;
  tableIndex += 1;
  body.push(H2(section.id, section.family, TOPIC_ICON[section.family]));
  body.push(P(section.intro));
  body.push(topicTable(rows));
  body.push(
    caption(
      `Table ${checkpointMapSectionNumber(section.id)}  ${section.family}: ${rows.length} instrument${rows.length === 1 ? "" : "s"}`,
    ),
  );
}
body.push(backToTop());

// 6 Appendix 1
body.push(H1(CHECKPOINT_MAP_APPENDIX_REUSE.id, CHECKPOINT_MAP_APPENDIX_REUSE.heading));
body.push(
  P(
    "Look for something to reuse before making your own. These are the pieces already built and maintained by another part of government, so a team can configure instead of make. Choosing to make your own breaks no rule, and an architecture review board is likely to ask which of these were considered.",
  ),
);
body.push(reuseTable());
body.push(caption(`Table ${checkpointMapSectionNumber(CHECKPOINT_MAP_APPENDIX_REUSE.id)}  What is already built`));
body.push(backToTop());

// 7 Appendix 2
body.push(H1(CHECKPOINT_MAP_APPENDIX_PATH.id, CHECKPOINT_MAP_APPENDIX_PATH.heading));
body.push(P(CHECKPOINT_MAP_APPENDIX_PATH.intro));
body.push(callout([P(CHECKPOINT_MAP_APPENDIX_PATH.pathNote, { after: 0, color: MUTED })]));
body.push(H3(CHECKPOINT_MAP_WHY_CREATE.heading));
body.push(P(CHECKPOINT_MAP_WHY_CREATE.body));
body.push(H3(CHECKPOINT_MAP_NADIA.heading));
body.push(boldedP(CHECKPOINT_MAP_NADIA.body, CHECKPOINT_MAP_NADIA.bold));
body.push(H3(CHECKPOINT_MAP_WHY_GCS.heading));
body.push(P(CHECKPOINT_MAP_WHY_GCS.body));
body.push(H3(CHECKPOINT_MAP_WHO_TITLE));
body.push(P(CHECKPOINT_MAP_WHO_CAPTION, { italics: true, color: MUTED }));
body.push(definitionTable(CHECKPOINT_MAP_WHO));
body.push(H3("How to read the steps"));
body.push(
  P(
    `${CHECKPOINT_MAP_COLKEY.left} Right is who answers, and how. The tag on each response says whether the responder is in her department or central.`,
  ),
);
body.push(P(CHECKPOINT_MAP_APPENDIX_PATH.timelineNote, { color: MUTED, size: 20 }));

for (const phase of CHECKPOINT_MAP_PHASES) {
  body.push(
    new Paragraph({
      keepNext: true,
      spacing: { before: 340, after: 60 },
      children: [
        new TextRun({ text: phase.heading, font: SERIF, bold: true, color: RUST, size: 25 }),
      ],
    }),
  );
  body.push(P(phase.durationLabel, { italics: true, color: MUTED, size: 19, after: 90 }));
  body.push(P(phase.phaseNote, { color: MUTED }));
  body.push(phaseSteps(phase, phase.steps));
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
}
body.push(backToTop());

// References
body.push(
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: true,
    keepNext: true,
    spacing: { after: 180 },
    children: [
      new Bookmark({
        id: "references",
        children: [
          new TextRun({ text: "References", font: SERIF, bold: true, color: BROWN, size: 38 }),
        ],
      }),
    ],
  }),
);
body.push(
  P(
    "Every instrument in the tables that has a public source, numbered in the order the tables use them.",
    { color: MUTED },
  ),
);
refOrder.forEach((key, index) => {
  const entry = EXTERNAL_LINKS[key];
  body.push(
    new Paragraph({
      spacing: { after: 70, line: 258 },
      indent: { left: 560, hanging: 560 },
      children: [
        text(`[${index + 1}]  `, { color: MUTED, size: 19 }),
        new ExternalHyperlink({
          link: entry.url,
          children: [
            new TextRun({
              text: entry.description,
              font: SANS,
              color: "3D5A80",
              size: 19,
              underline: {},
            }),
          ],
        }),
      ],
    }),
  );
});
body.push(P(CHECKPOINT_MAP_FOOTER_DISCLAIMER, { italics: true, color: MUTED, size: 19 }));
body.push(backToTop());

/* ----------------------------------------------------------------- cover */

const cover: Paragraph[] = [];
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
          title: "Government of Canada",
          description: "Treasury Board of Canada Secretariat",
          name: "GC banner",
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
        text: "UNCLASSIFIED / NON CLASSIFIÉ",
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
        text: "The Digital Lifecycle Guide",
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
        text: CHECKPOINT_MAP_SUBTITLE.text,
        font: SERIF,
        italics: true,
        color: NAVY,
        size: 24,
      }),
    ],
  }),
);
cover.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 2600, after: 70 },
    children: [new TextRun({ text: DATE, font: SANS, color: BROWN, size: 22 })],
  }),
);
cover.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0, line: 236 },
    children: [
      new TextRun({
        text: "Developed by the Treasury Board of Canada Secretariat, Office of the Chief Information Officer,",
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
        text: "Chief Technology Officer Sector, Digital Technology and Cyber Security.",
        font: SANS,
        color: BANNERBLUE,
        size: 15,
      }),
    ],
  }),
);

/* ----------------------------------------------------------- front matter */

const front: (Paragraph | Table)[] = [];
front.push(new Paragraph({ children: [new PageBreak()] }));
front.push(
  new Paragraph({
    spacing: { after: 160 },
    children: [
      new Bookmark({
        id: "toc",
        children: [
          new TextRun({ text: "Contents", font: SERIF, bold: true, color: BROWN, size: 36 }),
        ],
      }),
    ],
  }),
);
function tocLine(id: string, label: string, sub = false) {
  return new Paragraph({
    spacing: { after: sub ? 40 : 70, line: 264 },
    indent: { left: sub ? 760 : 0 },
    children: [
      new InternalHyperlink({
        anchor: id,
        children: [
          new TextRun({
            text: `${checkpointMapSectionNumber(id)}  ${label}`,
            font: SANS,
            bold: !sub,
            color: sub ? BODY : BROWN,
            size: sub ? 20 : 22,
          }),
        ],
      }),
    ],
  });
}
for (const item of CHECKPOINT_MAP_JUMP) {
  const id = item.href.slice(1);
  const label =
    id === "annex-instruments"
      ? CHECKPOINT_MAP_TABLE_SECTION.heading
      : id === "annex-reuse"
        ? CHECKPOINT_MAP_APPENDIX_REUSE.heading
        : id === "annex-nadia"
          ? CHECKPOINT_MAP_APPENDIX_PATH.heading
          : item.label;
  front.push(tocLine(id, label));
  if (id !== "annex-instruments") continue;
  for (const section of MATRIX_FAMILY_SECTIONS) {
    front.push(tocLine(section.id, section.family, true));
  }
}
front.push(
  new Paragraph({
    spacing: { before: 40, after: 70, line: 264 },
    children: [
      new InternalHyperlink({
        anchor: "references",
        children: [
          new TextRun({ text: "References", font: SANS, bold: true, color: BROWN, size: 22 }),
        ],
      }),
    ],
  }),
);
front.push(
  new Paragraph({
    spacing: { before: 320, after: 0 },
    children: [
      text(
        `This document is the web page of the same name, printed. It carries ${INSTRUMENT_MATRIX.length} instruments across ${MATRIX_FAMILY_SECTIONS.length} topics, one appendix of what is already built and can be reused, and one appendix following an invented service through the lot.`,
        { color: MUTED, size: 20, italics: true },
      ),
    ],
  }),
);

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
          text: "\t\tUNCLASSIFIED / NON CLASSIFIÉ",
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
    default: { document: { run: { font: SANS, size: 21, color: BODY } } },
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
      `${INSTRUMENT_MATRIX.length} instruments, ${tableIndex} topic tables, ${refOrder.length} references`,
  );
});
