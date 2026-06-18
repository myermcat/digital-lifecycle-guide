import { PHASES, THREADS, practicePath, reviewPath } from "./guide-strings";
import { PRACTICE_STUBS, REVIEW_STUBS } from "./practice-stubs";
import { SOO_VS_SOW_PATH, MANAGING_WHAT_YOU_BOUGHT_PATH, OPTIONS_ANALYSIS_PATH } from "./reference-paths";
import { SOO_VS_SOW } from "./soo-vs-sow-content";
import { MANAGING_WHAT_YOU_BOUGHT } from "./managing-what-you-bought-content";
import { OPTIONS_ANALYSIS } from "./options-analysis-content";

import { ALL_PAGES_PATH } from "./all-pages-path";

export { ALL_PAGES_PATH };

export type PageIndexType = "phase" | "subphase" | "thread" | "reference" | "other";

export type PageIndexStatus = "not-started" | "in-progress" | "in-review" | "done";

export type PageIndexEntry = {
  title: string;
  path: string;
  type: PageIndexType;
  status: PageIndexStatus;
};

/**
 * Single source of truth for every page in the guide and its build status.
 * Update status here when a page moves forward.
 */
export const PAGE_INDEX: PageIndexEntry[] = [
  { title: "Home", path: "/", type: "other", status: "in-review" },

  { title: PHASES.create.title, path: PHASES.create.href, type: "phase", status: "in-progress" },
  { title: PHASES.live.title, path: PHASES.live.href, type: "phase", status: "in-progress" },
  { title: PHASES.sunset.title, path: PHASES.sunset.href, type: "phase", status: "in-review" },

  { title: "Discovery", path: "/create-discovery", type: "subphase", status: "in-progress" },
  { title: "Alpha", path: "/create-alpha", type: "subphase", status: "in-progress" },
  { title: "MVP", path: "/create-mvp", type: "subphase", status: "in-progress" },
  { title: "Stabilization", path: "/live-stabilization", type: "subphase", status: "in-progress" },
  { title: "Growth", path: "/live-growth", type: "subphase", status: "in-progress" },
  { title: "Maturity", path: "/live-maturity", type: "subphase", status: "in-review" },

  { title: THREADS.accessibility.title, path: THREADS.accessibility.path, type: "thread", status: "in-progress" },
  {
    title: THREADS["monitoring-and-instrumentation"].title,
    path: THREADS["monitoring-and-instrumentation"].path,
    type: "thread",
    status: "in-progress",
  },
  {
    title: THREADS["releasing-changes"].title,
    path: THREADS["releasing-changes"].path,
    type: "thread",
    status: "not-started",
  },
  {
    title: THREADS["dependencies-and-standards"].title,
    path: THREADS["dependencies-and-standards"].path,
    type: "thread",
    status: "not-started",
  },
  {
    title: THREADS["user-research"].title,
    path: THREADS["user-research"].path,
    type: "thread",
    status: "not-started",
  },
  {
    title: THREADS.cybersecurity.title,
    path: THREADS.cybersecurity.path,
    type: "thread",
    status: "in-progress",
  },
  { title: THREADS.privacy.title, path: THREADS.privacy.path, type: "thread", status: "in-progress" },
  {
    title: THREADS.procurement.title,
    path: "/thread/procurement",
    type: "thread",
    status: "in-review",
  },
  {
    title: THREADS["data-stewardship"].title,
    path: THREADS["data-stewardship"].path,
    type: "thread",
    status: "not-started",
  },
  {
    title: THREADS["ethics-and-bias"].title,
    path: THREADS["ethics-and-bias"].path,
    type: "thread",
    status: "not-started",
  },
  {
    title: THREADS["team-capability"].title,
    path: THREADS["team-capability"].path,
    type: "thread",
    status: "not-started",
  },
  { title: THREADS.backlog.title, path: THREADS.backlog.path, type: "thread", status: "not-started" },
  {
    title: THREADS["joined-up-delivery"].title,
    path: THREADS["joined-up-delivery"].path,
    type: "thread",
    status: "in-progress",
  },

  { title: SOO_VS_SOW.title, path: SOO_VS_SOW_PATH, type: "reference", status: "in-review" },
  {
    title: MANAGING_WHAT_YOU_BOUGHT.title,
    path: MANAGING_WHAT_YOU_BOUGHT_PATH,
    type: "reference",
    status: "in-progress",
  },
  {
    title: OPTIONS_ANALYSIS.title,
    path: OPTIONS_ANALYSIS_PATH,
    type: "reference",
    status: "in-review",
  },

  {
    title: PRACTICE_STUBS["maturity-orientation"].title,
    path: practicePath("maturity-orientation"),
    type: "other",
    status: "not-started",
  },
  {
    title: REVIEW_STUBS["internal-team-review"].title,
    path: reviewPath("internal-team-review"),
    type: "other",
    status: "not-started",
  },
  {
    title: REVIEW_STUBS["external-peer-review"].title,
    path: reviewPath("external-peer-review"),
    type: "other",
    status: "not-started",
  },
  {
    title: REVIEW_STUBS["institutional-review"].title,
    path: reviewPath("institutional-review"),
    type: "other",
    status: "not-started",
  },
];

export const PAGE_INDEX_TYPE_ORDER: PageIndexType[] = [
  "phase",
  "subphase",
  "thread",
  "reference",
  "other",
];

export const PAGE_INDEX_TYPE_LABELS: Record<PageIndexType, string> = {
  phase: "Phases",
  subphase: "Subphases",
  thread: "Threads",
  reference: "Reference",
  other: "Other",
};

export function getPageIndexByType(): { type: PageIndexType; label: string; pages: PageIndexEntry[] }[] {
  return PAGE_INDEX_TYPE_ORDER.map((type) => ({
    type,
    label: PAGE_INDEX_TYPE_LABELS[type],
    pages: PAGE_INDEX.filter((page) => page.type === type),
  })).filter((group) => group.pages.length > 0);
}
