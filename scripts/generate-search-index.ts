import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import { PAGE_INDEX } from "../src/lib/page-index";
import { PROCUREMENT_STRINGS } from "../src/lib/procurement-strings";
import { PROCUREMENT_SUBPAGES } from "../src/lib/contracting-subpages";
import { SOO_VS_SOW } from "../src/lib/soo-vs-sow-content";
import { MANAGING_WHAT_YOU_BOUGHT } from "../src/lib/managing-what-you-bought-content";
import {
  MANAGING_WHAT_YOU_BOUGHT_PATH,
  SOO_VS_SOW_PATH,
} from "../src/lib/reference-paths";

type SearchIndexRecord = {
  id: string;
  pageTitle: string;
  pagePath: string;
  sectionId: string;
  sectionHeading: string;
  region: string;
  text: string;
};

function inferRegion(path: string) {
  if (path.startsWith("/create")) return "create";
  if (path.startsWith("/live")) return "live";
  if (path.startsWith("/sunset")) return "sunset";
  if (path.startsWith("/thread/")) return "thread";
  if (path.startsWith("/reference/")) return "reference";
  return "other";
}

function collapseWhitespace(text: string) {
  return String(text ?? "").replace(/\s+/g, " ").trim();
}

function concat(...parts: Array<string | undefined>) {
  return collapseWhitespace(parts.filter(Boolean).join("\n"));
}

function recordId({ pagePath, sectionId }: { pagePath: string; sectionId: string }) {
  return sectionId ? `${pagePath}#${sectionId}` : pagePath;
}

const records: SearchIndexRecord[] = [];

// Base: every page title is searchable (even if it has no sections).
for (const page of PAGE_INDEX) {
  records.push({
    id: recordId({ pagePath: page.path, sectionId: "" }),
    pageTitle: page.title,
    pagePath: page.path,
    sectionId: "",
    sectionHeading: page.title,
    region: inferRegion(page.path),
    text: "",
  });
}

// Procurement landing — section-level records with known anchors.
{
  const pageTitle = PROCUREMENT_STRINGS.title;
  const pagePath = "/thread/procurement";

  const landingSections: Array<{
    sectionId: string;
    sectionHeading: string;
    text: string;
  }> = [
    {
      sectionId: "what-work-stays-yours",
      sectionHeading: PROCUREMENT_STRINGS.whatWorkStaysYours.heading,
      text: concat(
        PROCUREMENT_STRINGS.whatWorkStaysYours.intro,
        ...PROCUREMENT_STRINGS.whatWorkStaysYours.items.map((i) => `${i.lead} ${i.body}`),
        PROCUREMENT_STRINGS.whatWorkStaysYours.close,
      ),
    },
    {
      sectionId: "how-a-procurement-goes",
      sectionHeading: "How a procurement goes",
      text: concat(
        PROCUREMENT_STRINGS.journey.intro,
        ...PROCUREMENT_STRINGS.journey.steps.map((s) => `${s.title} ${s.leadIn} ${s.body}`),
      ),
    },
    {
      sectionId: "traditional-vs-agile",
      sectionHeading: "Traditional vs agile",
      text: concat(
        ...PROCUREMENT_STRINGS.comparison.rows.map(
          (r) => `${r.topic}. Traditional: ${r.traditional}. Agile: ${r.agile}.`,
        ),
        PROCUREMENT_STRINGS.comparison.caption,
      ),
    },
    {
      sectionId: "case-study",
      sectionHeading: PROCUREMENT_STRINGS.caseStudy.title,
      text: concat(
        PROCUREMENT_STRINGS.caseStudy.risky.heading,
        PROCUREMENT_STRINGS.caseStudy.risky.framing,
        ...PROCUREMENT_STRINGS.caseStudy.risky.good.map((t) => `${t.lead} ${t.body}`),
        ...PROCUREMENT_STRINGS.caseStudy.risky.bad.map((t) => `${t.lead} ${t.body}`),
        PROCUREMENT_STRINGS.caseStudy.safer.heading,
        PROCUREMENT_STRINGS.caseStudy.safer.framing,
        ...PROCUREMENT_STRINGS.caseStudy.safer.good.map((t) => `${t.lead} ${t.body}`),
        ...PROCUREMENT_STRINGS.caseStudy.safer.bad.map((t) => `${t.lead} ${t.body}`),
      ),
    },
    {
      sectionId: "what-good-looks-like",
      sectionHeading: "What good looks like",
      text: PROCUREMENT_STRINGS.goodLooksIntro,
    },
    {
      sectionId: "why-it-matters",
      sectionHeading: "Why it matters",
      text: concat(...PROCUREMENT_STRINGS.whyItMatters),
    },
    {
      sectionId: "whose-job",
      sectionHeading: "Whose job it is",
      text: PROCUREMENT_STRINGS.whoseJob.text,
    },
    {
      sectionId: "by-region",
      sectionHeading: "What it looks like in each region",
      text: PROCUREMENT_STRINGS.byRegionIntro,
    },
    {
      sectionId: "further-reading",
      sectionHeading: "Further reading",
      text: PROCUREMENT_STRINGS.furtherReading.text,
    },
    { sectionId: "sources", sectionHeading: "Sources", text: "Sources and references." },
  ];

  for (const section of landingSections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.sectionId }),
      pageTitle,
      pagePath,
      sectionId: section.sectionId,
      sectionHeading: section.sectionHeading,
      region: inferRegion(pagePath),
      text: section.text,
    });
  }
}

// Procurement subpages — index each section.
for (const slug of Object.keys(PROCUREMENT_SUBPAGES) as Array<keyof typeof PROCUREMENT_SUBPAGES>) {
  const page = PROCUREMENT_SUBPAGES[slug];
  if (!page || page.stub) continue;

  const pageTitle = page.title;
  const pagePath = `/thread/procurement/${slug}`;

  for (const section of page.sections) {
    const bulletText = (section.bullets ?? [])
      .map((b) => concat(b.lead, b.body, ...(b.bodyLines ?? [])))
      .join("\n");

    records.push({
      id: recordId({ pagePath, sectionId: section.id }),
      pageTitle,
      pagePath,
      sectionId: section.id,
      sectionHeading: section.title,
      region: inferRegion(pagePath),
      text: concat(
        ...(section.paragraphs ?? []),
        bulletText,
        ...(section.paragraphsAfterBullets ?? []),
        ...(section.paragraphsAfterNote ?? []),
        section.contentTodo
          ? concat(
              section.contentTodo.title,
              ...(section.contentTodo.items ?? []),
              section.contentTodo.note,
            )
          : "",
      ),
    });
  }
}

// Reference: SOO vs SOW
{
  const pageTitle = SOO_VS_SOW.title;
  const pagePath = SOO_VS_SOW_PATH;

  records.push({
    id: recordId({ pagePath, sectionId: SOO_VS_SOW.whatEachOneIs.id }),
    pageTitle,
    pagePath,
    sectionId: SOO_VS_SOW.whatEachOneIs.id,
    sectionHeading: SOO_VS_SOW.whatEachOneIs.title,
    region: inferRegion(pagePath),
    text: concat(SOO_VS_SOW.opening, SOO_VS_SOW.whatEachOneIs.body),
  });

  records.push({
    id: recordId({ pagePath, sectionId: SOO_VS_SOW.workTogether.id }),
    pageTitle,
    pagePath,
    sectionId: SOO_VS_SOW.workTogether.id,
    sectionHeading: SOO_VS_SOW.workTogether.title,
    region: inferRegion(pagePath),
    text: SOO_VS_SOW.workTogether.body,
  });

  records.push({
    id: recordId({ pagePath, sectionId: SOO_VS_SOW.workedExample.id }),
    pageTitle,
    pagePath,
    sectionId: SOO_VS_SOW.workedExample.id,
    sectionHeading: SOO_VS_SOW.workedExample.title,
    region: inferRegion(pagePath),
    text: concat(...SOO_VS_SOW.workedExample.paragraphs),
  });
}

// Reference: Managing what you bought
{
  const pageTitle = MANAGING_WHAT_YOU_BOUGHT.title;
  const pagePath = MANAGING_WHAT_YOU_BOUGHT_PATH;

  for (const section of MANAGING_WHAT_YOU_BOUGHT.sections) {
    records.push({
      id: recordId({ pagePath, sectionId: section.id }),
      pageTitle,
      pagePath,
      sectionId: section.id,
      sectionHeading: section.title,
      region: inferRegion(pagePath),
      text: concat(...section.paragraphs),
    });
  }
}

// Dedupe by id (keep first).
const seenIds = new Set<string>();
const deduped = records.filter((r) => {
  if (seenIds.has(r.id)) return false;
  seenIds.add(r.id);
  return true;
});

const outPath = new URL("../public/search-index.json", import.meta.url);
await mkdir(dirname(outPath.pathname), { recursive: true });
await writeFile(outPath, JSON.stringify(deduped, null, 2) + "\n", "utf8");

console.log(`Wrote ${deduped.length} records to public/search-index.json`);

