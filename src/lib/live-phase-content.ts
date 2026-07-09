import type { SourceItem } from "@/components/SourcesBlock";
import { PHASES, THREADS, type ThreadSlug } from "@/lib/guide-strings";

export type LiveSubphaseRow = {
  title: string;
  description: string;
  href: string;
};

export const LIVE_PHASE = {
  title: PHASES.live.title,

  lead: [
    "Live is the longest stretch of a service's life, and where most of it is spent. The service is launched and being used, and the work now is to keep it working and make it better, year after year.",
    "This is where the idea that a service is a project that ends at launch falls apart. A live service has to be watched, funded, secured, and improved, from the day it goes live until the day it is replaced or retired. Live moves through three sub-phases: Stabilization, Growth, and Maturity.",
  ],

  subphases: {
    id: "live-in-three-sub-phases",
    title: "Live in three sub-phases",
    intro: "Live moves through three sub-phases, each with its own page.",
    rows: [
      {
        title: "Stabilization",
        description: "Just launched; make it reliable under real, full load.",
        href: "/live-stabilization",
      },
      {
        title: "Growth",
        description: "Expand reach, features, and scale.",
        href: "/live-growth",
      },
      {
        title: "Maturity",
        description: "Steady state; keep it healthy and resist decay.",
        href: "/live-maturity",
      },
    ] satisfies LiveSubphaseRow[],
    leavingLine:
      "Leaving Live is the crossing into Sunset: the service is being replaced or retired, and the exit has to be planned and funded before the money runs out.",
  },

  whatRuns: {
    id: "what-runs-in-live",
    title: "What runs in Live",
    intro:
      "Every cross-cutting thread keeps running through Live. A few carry most of the weight here:",
    coreThreads: [
      {
        slug: "monitoring-and-instrumentation",
        title: THREADS["monitoring-and-instrumentation"].title,
        note: "Watch the signals and turn them into work; most monitoring lives here.",
      },
      {
        slug: "backlog",
        title: THREADS.backlog.title,
        note: "Decide what to improve next; this is the longest chapter of continuous improvement.",
      },
      {
        slug: "releasing-changes",
        title: THREADS["releasing-changes"].title,
        note: "Release small changes often, and roll them out safely.",
      },
      {
        slug: "change-management",
        title: THREADS["change-management"].title,
        note: "Win adoption, so the service is actually used.",
      },
      {
        slug: "security",
        title: THREADS.security.title,
        note: "Detect and respond, and keep the service patched and current.",
      },
    ] satisfies readonly { slug: ThreadSlug; title: string; note: string }[],
    obligations:
      "And the obligations that quietly recur here: Funding a renewal before the money runs out, keeping the privacy assessment current, holding the service to the accessibility standard, patching dependencies, retaining and disposing of data on schedule, and keeping the team together.",
  },

  reviews: {
    id: "live-reviews-come-round-again",
    title: "Live's reviews come round again",
    text:
      "Create runs through one-time approval gates. Live works differently: its checks recur. A security check on every release, the privacy assessment kept current as the service changes, renewal funding secured before the current money ends. The work does not finish; it comes round again.",
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "guideline-service-digital",
    },
  ] satisfies SourceItem[],
} as const;

export const livePhaseLeadPlainText = LIVE_PHASE.lead.join(" ");

