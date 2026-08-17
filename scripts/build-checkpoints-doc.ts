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
  "DLG -- Blue Visuals/figures";
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
  const path = existsSync(`${IMG}/${file}`) ? `${IMG}/${file}` : `${FIGS}/${file}`;
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
const PAGES_FILE = fileURLToPath(new URL("./.checkpoints-doc-pages.json", import.meta.url));

/* ------------------------------------------------------------ the tables */

const COLS = [2280, 2520, 2400, 2160];

/** The sub-phases where something happens, as one line. */
function whenItComesUp(row: MatrixInstrument): string {
  const active = MATRIX_SUBPHASES.filter((s) => row.cells[s.key]);
  if (active.length === 0) return "";
  return active
    .map(
      (s) => `${s.label} ${row.cells[s.key]!.tags.map((t) => MATRIX_ACTIONS[t].label).join(", ")}`,
    )
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
                  [
                    "Discovery",
                    "Alpha",
                    "Beta",
                    "Stabilization",
                    "Growth",
                    "Maturity",
                    "Live",
                    "Sunset",
                  ],
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

/**
 * A term-and-definition list. Used for the glossary and for the people list.
 *
 * Horizontal rules only, and the term column shaded, because the full grid it
 * had before made a plain two-column list look like a data table.
 */
function definitionTable(entries: readonly { term: string; def: string }[]) {
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
    rows: entries.map(
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
                  ...step.response.tags.map(
                    (tag) =>
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

function chipTable(items: { label: string; gloss: string; fill: string; ink: string }[]) {
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
    rows: items.map(
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
                  shading: { fill: item.fill, type: ShadingType.CLEAR },
                  spacing: { before: 30, after: 30 },
                  indent: { left: 90, right: 90 },
                  children: [
                    new TextRun({
                      text: item.label.toUpperCase(),
                      font: SANS,
                      bold: true,
                      color: item.ink,
                      size: 16,
                      characterSpacing: 20,
                    }),
                  ],
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
  });
}

function tableCaption(label: string, title: string) {
  tables.push({ label, title });
  return caption(`${label}  ${title}`);
}

/* ------------------------------------------------------------------ body */

const body: (Paragraph | Table)[] = [];

/* 1. Introduction */
body.push(H1D(SECTIONS.intro, "Introduction", "intro", false));
body.push(H2D(`${SECTIONS.intro}.1`, "Context"));
body.push(
  P(
    "Getting a Government of Canada digital service into service means passing official checkpoints: assessments to run, boards to attend, registers to appear in, and duties that carry on for as long as the service does. They come from Treasury Board policy, from Acts, and from standards, and they are spread across dozens of instruments. Which of them apply depends on what the service does and how much is being spent, so no two services take quite the same path.",
  ),
);
body.push(H2D(`${SECTIONS.intro}.2`, "Purpose and scope"));
body.push(boldedP(CHECKPOINT_MAP_WHAT_TABLE.body, CHECKPOINT_MAP_WHAT_TABLE.bold));
body.push(
  P(
    `This document covers ${INSTRUMENT_MATRIX.length} instruments, grouped into ${MATRIX_FAMILY_SECTIONS.length} topics. Appendix 1 lists what other parts of government have already built and a team can reuse. Appendix 2 follows one invented service from its first sign of trouble to the day it is replaced.`,
  ),
);
body.push(H2D(`${SECTIONS.intro}.3`, "Audience"));
body.push(
  P(
    "This document is intended for the business owner of a Government of Canada digital service, and for the people who support one: program and service managers, project teams, enterprise architects, and the corporate functions a business owner has to work with, in security, privacy, procurement, information management and communications.",
  ),
);
body.push(backToTop());

/* 2. How to use this document */
body.push(H1D(SECTIONS.howToUse, "How to use this document", "how-to-use", false));
for (const item of CHECKPOINT_MAP_HOW_TO_USE.items) {
  body.push(
    new Paragraph({
      spacing: { after: 130, line: 278 },
      numbering: { reference: "b", level: 0 },
      children: [
        new TextRun({ text: `${item.lead} `, font: SANS, bold: true, color: BROWN, size: 21 }),
        text(item.body.replace("read the tables", "read the tables in section 5")),
      ],
    }),
  );
}
body.push(backToTop());

/* 3. Nearly everything here varies */
body.push(H1D(SECTIONS.varies, CHECKPOINT_MAP_VARIES.heading, "everything-varies", false));
body.push(
  callout(
    CHECKPOINT_MAP_VARIES.paragraphs.map((paragraph, index) =>
      P(paragraph, { after: index === CHECKPOINT_MAP_VARIES.paragraphs.length - 1 ? 0 : 130 }),
    ),
  ),
);
body.push(backToTop());

/* 4. Glossary */
body.push(H1D(SECTIONS.glossary, CHECKPOINT_MAP_TERMS_TITLE, "thecheckpoints", false));
body.push(P(CHECKPOINT_MAP_TERMS_CAPTION));
body.push(definitionTable(CHECKPOINT_MAP_TERMS));
body.push(tableCaption(`Table ${SECTIONS.glossary}-1`, "Words the tables use and do not define"));
body.push(backToTop());

/* 5. Every official thing a service has to do */
body.push(H1D(SECTIONS.tables, CHECKPOINT_MAP_TABLE_SECTION.heading, "annex-instruments"));
body.push(P(CHECKPOINT_MAP_TABLE_SECTION.intro));
body.push(H3("What the tags mean"));
body.push(
  chipTable(
    (Object.keys(MATRIX_ACTIONS) as (keyof typeof MATRIX_ACTIONS)[]).map((key) => ({
      label: MATRIX_ACTIONS[key].label,
      gloss: MATRIX_ACTIONS[key].gloss,
      fill: ACTION_FILL[key],
      ink: ACTION_INK[key],
    })),
  ),
);
body.push(H3("What kind of thing each one is"));
body.push(
  chipTable(
    (Object.keys(MATRIX_KINDS) as (keyof typeof MATRIX_KINDS)[]).map((key) => ({
      label: MATRIX_KINDS[key].label,
      gloss: MATRIX_KINDS[key].gloss,
      fill: SURF,
      ink: BROWN,
    })),
  ),
);
body.push(new Paragraph({ spacing: { after: 140 }, children: [] }));
body.push(
  P(
    "An amber ONLY IF tag marks an instrument that does not apply to every service. Everything without one applies to all of them.",
  ),
);
body.push(backToTop());

let topicIndex = 0;
for (const section of MATRIX_FAMILY_SECTIONS) {
  const rows = INSTRUMENT_MATRIX.filter((row) => row.family === section.family);
  if (rows.length === 0) continue;
  topicIndex += 1;
  body.push(
    H2D(`${SECTIONS.tables}.${topicIndex}`, section.family, section.id, TOPIC_ICON[section.family]),
  );
  body.push(P(section.intro));
  body.push(topicTable(rows));
  body.push(
    tableCaption(
      `Table ${SECTIONS.tables}-${topicIndex}`,
      `${section.family}: what applies, who does it, and when it comes up`,
    ),
  );
  body.push(backToTop());
}

/* 6. Conclusion and next steps */
body.push(H1D(SECTIONS.conclusion, "Conclusion and next steps", "conclusion", false));
body.push(
  P(
    "The list is long, and no service meets all of it. The step that saves the most time is the cheapest one: read down the scope column of each topic that matches what your service does, and rule out what does not apply, before anyone starts planning around it. What is left is usually smaller than a team expects, and most of it belongs to somebody else to do.",
  ),
);
body.push(
  P(
    "Two things are worth settling earlier than feels necessary, because both change the shape of the build and both are expensive to add later: how long the service is allowed to be unavailable, and what the system has to be able to do with its records. Both are in section 5, under Continuity and incidents and under Registries and records.",
  ),
);
body.push(new Paragraph({ spacing: { before: 340, after: 0 }, children: [] }));
body.push(
  callout(
    [
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: "ABOUT",
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
                text: "The Digital Lifecycle Guide",
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
          text("This document is one part of the "),
          text("Digital Lifecycle Guide", { bold: true }),
          text(
            ", a guide for the people who run Government of Canada digital services across the whole life of a service: from before it exists, through running and maturing it, to retiring or replacing it well. This document is the index of official checkpoints. The phase and sub-phase documents cover how to do the work inside each step, and the thread documents explain the reasoning behind each subject. To find the other documents and where they fit, start at the guide's home page, or go straight to the Index of the Digital Lifecycle Guide.",
          ),
        ],
      }),
    ],
    { fill: CREAM, border: RUST },
  ),
);
body.push(backToTop());

/* 7. References */
body.push(H1D(SECTIONS.references, "References", "references"));
body.push(
  P(
    "Every instrument in section 5 and Appendix 1 that has a public source, numbered in the order the tables use them. Where a row carries no reference, the instrument is obtained through a departmental office rather than from a published page.",
  ),
);
const refHead = (t: string) =>
  new Paragraph({
    spacing: { before: 220, after: 90 },
    children: [new TextRun({ text: t, font: SANS, bold: true, color: MUTED, size: 19 })],
  });
body.push(refHead("Governing instruments"));
for (const key of govRefs) body.push(srcNum(refOrder.indexOf(key) + 1, key));
body.push(refHead("Supporting references"));
for (const key of supRefs) body.push(srcNum(refOrder.indexOf(key) + 1, key));
body.push(
  new Paragraph({
    spacing: { before: 220, after: 0, line: 268 },
    children: [text(CHECKPOINT_MAP_FOOTER_DISCLAIMER, { italics: true, color: MUTED, size: 19 })],
  }),
);
body.push(backToTop());

/* Appendix 1 */
body.push(H1D("Appendix 1", CHECKPOINT_MAP_APPENDIX_REUSE.heading, "annex-reuse"));
body.push(
  P(
    "Look for something to reuse before making your own. These are the pieces already built and maintained by another part of government, so a team can configure something instead of making it. Choosing to make your own breaks no rule. The enterprise architecture framework does ask teams to look at reuse first, so an architecture review board is likely to ask which of these were considered and why none of them fitted.",
  ),
);
body.push(reuseTable());
body.push(tableCaption("Table A1-1", "What another part of government has already built"));
body.push(backToTop());

/* Appendix 2 */
body.push(H1D("Appendix 2", CHECKPOINT_MAP_APPENDIX_PATH.heading, "annex-nadia"));
body.push(
  callout(
    [
      new Paragraph({
        spacing: { after: 0, line: 276 },
        children: [
          text("Nadia and her grants program are invented. ", { bold: true }),
          text(
            "Nothing in this appendix describes a real service, a real department or a real person. It is written as one worked example so the checkpoints in section 5 can be seen in an order, and the order shown is the one this invented service produced.",
          ),
        ],
      }),
    ],
    { fill: AMBERFILL, border: AMBER },
  ),
);
body.push(new Paragraph({ spacing: { after: 260 }, children: [] }));
body.push(P(CHECKPOINT_MAP_APPENDIX_PATH.intro, { after: 130 }));
body.push(P(CHECKPOINT_MAP_APPENDIX_PATH.pathNote));

body.push(H2D("Appendix 2.1", CHECKPOINT_MAP_NADIA.heading, "app2-nadia"));
body.push(
  figureBeside("Figure A2-1", "Nadia, a director general", "gate_map_nadia.png", 104, 126, [
    boldedP(CHECKPOINT_MAP_NADIA.body, CHECKPOINT_MAP_NADIA.bold, { after: 0 }),
  ]),
);
body.push(new Paragraph({ spacing: { after: 200 }, children: [] }));
body.push(P(CHECKPOINT_MAP_WHY_GCS.body));
body.push(H3(CHECKPOINT_MAP_WHY_CREATE.heading));
body.push(P(CHECKPOINT_MAP_WHY_CREATE.body));

body.push(H2D("Appendix 2.2", CHECKPOINT_MAP_WHO_TITLE, "app2-who"));
body.push(P(CHECKPOINT_MAP_WHO_CAPTION));
body.push(definitionTable(CHECKPOINT_MAP_WHO));
body.push(tableCaption("Table A2-1", "The people Nadia deals with, and what each one does"));
body.push(backToTop());

body.push(H2D("Appendix 2.3", "How long it took", "app2-timeline"));
body.push(
  ...figure(
    "Figure A2-2",
    "How long each phase took for this one service",
    "gate_map_timeline.png",
    600,
    150,
  ),
);
body.push(P(CHECKPOINT_MAP_APPENDIX_PATH.timelineNote));
body.push(backToTop());

body.push(H2D("Appendix 2.4", "How to read the steps", "app2-key"));
body.push(
  P(
    `${CHECKPOINT_MAP_COLKEY.left} The right-hand column is who answers, and how. The tag on each response says whether the responder is inside her department or central.`,
  ),
);
body.push(backToTop());

let phaseIndex = 4;
for (const phase of CHECKPOINT_MAP_PHASES) {
  phaseIndex += 1;
  body.push(H2D(`Appendix 2.${phaseIndex}`, phase.heading, `app2-${phase.id}`));
  body.push(P(phase.durationLabel, { italics: true, color: MUTED, size: 19, after: 90 }));
  body.push(P(phase.phaseNote));
  body.push(phaseSteps(phase, phase.steps));
  body.push(
    tableCaption(
      `Table A2-${phaseIndex - 3}`,
      `${phase.heading.replace(/ - .*/, "")}: what Nadia does and who responds`,
    ),
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
  body.push(backToTop());
}

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
        text: "The approvals, reviews, sign-offs and standing duties a service has to pass, and who owns each one",
        font: SERIF,
        italics: true,
        color: NAVY,
        size: 26,
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
            text: "Table of Contents",
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

front.push(tocEntry(SECTIONS.intro, "Introduction", "intro"));
front.push(tocEntry(`${SECTIONS.intro}.1`, "Context", null, true, "intro"));
front.push(tocEntry(`${SECTIONS.intro}.2`, "Purpose and scope", null, true, "intro"));
front.push(tocEntry(`${SECTIONS.intro}.3`, "Audience", null, true, "intro"));
front.push(tocEntry(SECTIONS.howToUse, "How to use this document", "how-to-use"));
front.push(tocEntry(SECTIONS.varies, CHECKPOINT_MAP_VARIES.heading, "everything-varies"));
front.push(tocEntry(SECTIONS.glossary, CHECKPOINT_MAP_TERMS_TITLE, "thecheckpoints"));
front.push(tocEntry(SECTIONS.tables, CHECKPOINT_MAP_TABLE_SECTION.heading, "annex-instruments"));
MATRIX_FAMILY_SECTIONS.forEach((section, index) => {
  front.push(tocEntry(`${SECTIONS.tables}.${index + 1}`, section.family, section.id, true));
});
front.push(tocEntry(SECTIONS.conclusion, "Conclusion and next steps", "conclusion"));
front.push(
  tocEntry(`${SECTIONS.conclusion}.1`, "About the Digital Lifecycle Guide", "about", true),
);
front.push(tocEntry(SECTIONS.references, "References", "references"));
front.push(tocEntry("Appendix 1", CHECKPOINT_MAP_APPENDIX_REUSE.heading, "annex-reuse"));
front.push(tocEntry("Appendix 2", CHECKPOINT_MAP_APPENDIX_PATH.heading, "annex-nadia"));
front.push(tocEntry("Appendix 2.1", CHECKPOINT_MAP_NADIA.heading, "app2-nadia", true));
front.push(tocEntry("Appendix 2.2", CHECKPOINT_MAP_WHO_TITLE, "app2-who", true));
front.push(tocEntry("Appendix 2.3", "How long it took", "app2-timeline", true));
front.push(tocEntry("Appendix 2.4", "How to read the steps", "app2-key", true));
CHECKPOINT_MAP_PHASES.forEach((phase, index) => {
  front.push(tocEntry(`Appendix 2.${index + 5}`, phase.heading, `app2-${phase.id}`, true));
});

front.push(
  new Paragraph({
    spacing: { before: 360, after: 120 },
    children: [
      new TextRun({ text: "List of Figures", font: SERIF, bold: true, color: BROWN, size: 28 }),
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
      new TextRun({ text: "List of Tables", font: SERIF, bold: true, color: BROWN, size: 28 }),
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
      `${INSTRUMENT_MATRIX.length} instruments, ${topicIndex} topic tables, ` +
      `${figures.length} figures, ${tables.length} tables, ${refOrder.length} references` +
      `${Object.keys(PAGE_MAP).length ? "" : "  (no page numbers yet: run the page pass)"}`,
  );
});
