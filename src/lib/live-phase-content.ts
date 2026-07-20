import type { SourceItem } from "@/components/SourcesBlock";
import type { PhaseQuoteContent } from "@/components/PhaseQuote";
import { phaseQuotePlainText } from "@/components/PhaseQuote";
import { PHASES, THREADS, type ThreadSlug } from "@/lib/guide-strings";

export type LiveSubphaseRow = {
  title: string;
  description: string;
  href: string;
};

export const LIVE_PHASE = {
  title: PHASES.live.pageHeading,

  quote: {
    lead: "The longest phase. The service is up and running, and the work is keeping it useful:",
    items: [
      "watching how it performs",
      "fixing and improving it",
      "adding capability as more people arrive",
      "keeping it secure and funded, year after year",
    ],
  } satisfies PhaseQuoteContent,

  lead: [
    "This is where a service stops being a project and becomes something a team looks after. Launch is not the finish line. It is the point where the service starts being used, where its costs begin, and where it needs steady care to stay useful.",
    "Live is open-ended. There is no single delivery date to aim at the way Create has launch. Sometimes an end is already known, when a contract runs for a fixed term or a policy sets a retirement date, but even then the daily work is a cycle rather than a countdown to it. That cycle repeats for as long as the service is used: watch how it performs, fix and improve it, keep it secure, and renew its funding in good time. The three sub-phases below mark how the cycle changes as the service matures.",
  ],

  subphases: {
    id: "live-in-three-sub-phases",
    title: "Live in three sub-phases",
    intro:
      "Live moves through three sub-phases. They mark how the work changes as the service matures: steadying it right after launch, growing it as more people arrive, and keeping it healthy over the long term.",
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
        description: "Steady state; keep it healthy over the long term.",
        href: "/live-maturity",
      },
    ] satisfies LiveSubphaseRow[],
    leavingLine:
      "Leaving Live is the crossing into Sunset: the service is being replaced or retired, and the exit has to be planned and funded before the money runs out.",
  },

  workOfLive: {
    id: "the-work-of-live",
    title: "The work of Live",
    introBold:
      "Live is three kinds of work, running side by side for as long as the service is used.",
    blocks: [
      {
        heading: "1. Keep it running.",
        lead: "A live service has to stay reliable under real, full load.",
        bullets: [
          {
            text: "The team watches it through monitoring and acts on what the signals show.",
            internalLinks: [
              { phrase: "monitoring", to: "/thread/monitoring-and-instrumentation" },
            ],
          },
          {
            text: "Changes are released small and often, so fixes and improvements go out safely.",
            internalLinks: [{ phrase: "released", to: "/thread/releasing-changes" }],
          },
          {
            text: "Security work carries on: trouble is spotted and contained.",
            internalLinks: [{ phrase: "Security", to: "/thread/security" }],
          },
          {
            text: "Its dependencies are kept patched and current.",
            internalLinks: [
              { phrase: "dependencies", to: "/thread/dependencies-and-standards" },
            ],
          },
        ],
      },
      {
        heading: "2. Keep making it better.",
        lead: "Real use is the best evidence a team ever gets about what to build next.",
        bullets: [
          {
            text: "Fresh user research shows what to fix and what to add.",
            internalLinks: [{ phrase: "user research", to: "/thread/user-research" }],
          },
          {
            text: "The backlog is where those become prioritized work.",
            internalLinks: [{ phrase: "backlog", to: "/thread/backlog" }],
          },
          {
            text: "Change management wins the adoption that turns a delivered change into one people actually use.",
            internalLinks: [{ phrase: "change management", to: "/thread/change-management" }],
          },
        ],
      },
      {
        heading: "3. Keep it funded and within the rules.",
        lead: "A live service needs looking after to keep going well.",
        bullets: [
          {
            text: "Its funding is renewed before the current money runs out.",
            internalLinks: [{ phrase: "funding", to: "/thread/funding" }],
          },
          {
            text: "If it handles personal information, its privacy assessment is kept current as the service changes.",
            internalLinks: [{ phrase: "privacy", to: "/thread/privacy" }],
          },
          {
            text: "Its accessibility is held to standard.",
            internalLinks: [{ phrase: "accessibility", to: "/thread/accessibility" }],
          },
          {
            text: "Its data is retained and disposed of on schedule.",
            internalLinks: [{ phrase: "data", to: "/thread/data-stewardship" }],
          },
          {
            text: "The team that understands it is kept together.",
            internalLinks: [{ phrase: "team", to: "/thread/team-capability" }],
          },
        ],
      },
    ],
    closing: {
      leadIn: "The work comes round again.",
      text: "Live's checks recur: a security review on every release, the privacy assessment refreshed as the service changes, funding renewed before it runs out. Live settles into a rhythm and keeps going.",
    },
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

export const livePhaseLeadPlainText = [
  phaseQuotePlainText(LIVE_PHASE.quote),
  ...LIVE_PHASE.lead,
].join(" ");
