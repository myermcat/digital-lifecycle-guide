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
      "and, long before the last day, getting ready for Sunset",
    ],
  } satisfies PhaseQuoteContent,

  // Four separate points, and as one column of identical paragraphs a reader could not tell them
  // apart. Each carries the heading of the thing it is actually about.
  lead: [
    {
      heading: "Launch is where the running work begins",
      text: "This is where the one-time work of standing the service up ends, and the service becomes something a team looks after. Launch is not the finish line. It is the point where the service starts being used, where its running costs begin, and where it needs steady care to stay useful.",
    },
    {
      heading: "Live is open-ended, and the work is a cycle",
      text: "Live is open-ended. There is no single delivery date to aim at the way Create has launch. Sometimes an end is already known, when a contract runs for a fixed term or a policy sets a retirement date, but even then the daily work is a cycle. That cycle repeats for as long as the service is used: watch how it performs, fix and improve it, keep listening to the people who use it, keep it secure, and renew its funding in good time. The three sub-phases below mark how the cycle changes as the service matures.",
    },
    {
      heading: "Think ahead to Sunset while the service runs",
      text: "Think ahead to Sunset while you run. Every service ends, and the teams that end well are the ones that saw it coming: they watch the signals that point to retirement or replacement, keep the exit possible as contracts renew, and set the money aside before the current funding ends.",
    },
    {
      heading: "A replacement overlaps the service it replaces",
      text: "If something is going to replace this service, the planning starts years before the last day, because the old service stays available until the new one has been steady for a while. Before that can happen the replacement has to go through its own Discovery, Alpha, Beta and Stabilization, and any competition that comes with them. For much of that time a department is paying for both, and the team is winding one service down while standing another one up.",
    },
  ],

  costOfLate: {
    title: "The cost of leaving it late",
    lead: "The recurring work is easy to defer, and every deferral has a price:",
    items: [
      {
        heading: "The renewal starts late.",
        line: "The only option left is an emergency extension on the supplier's terms, and the lock-in deepens.",
      },
      {
        heading: "Improvement is deferred.",
        line: "The service ages into a forced replacement, run as an emergency with a fixed date. The last famous one of those was named Phoenix.",
      },
      {
        heading: "The exit money is never set aside.",
        line: "The signals point to Sunset, and there is nothing to pay for the crossing.",
      },
      {
        heading: "The assessments go stale.",
        line: "A new feature waits on a privacy assessment that should have been kept current as the service changed.",
      },
      {
        heading: "Support is scaled after the wave.",
        line: "The users arrive before the help does, and people struggling alone becomes the service's reputation.",
      },
    ],
  },

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
        lead: "Real use is some of the best evidence a team gets about what to build next.",
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
            internalLinks: [{ phrase: "Change management", to: "/thread/change-management" }],
          },
        ],
      },
      {
        heading: "3. Keep it funded and within the rules.",
        lead: "A live service needs looking after to keep going well.",
        bullets: [
          {
            text: "Its funding is renewed before the current money runs out. The official checkpoints of a digital service shows which checkpoints still apply once the service is running.",
            internalLinks: [
              { phrase: "funding", to: "/thread/funding" },
              {
                phrase: "The official checkpoints of a digital service",
                to: "/gate-map",
              },
            ],
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
      text: "Live's checks recur: a security check on every release, the privacy assessment refreshed as the service changes, funding renewed before it runs out. Live settles into a rhythm and keeps going.",
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
    obligations: {
      lead: "And the obligations that recur here:",
      items: [
        "renewing funding before the money runs out",
        "keeping the privacy assessment current",
        "holding the service to the accessibility standard",
        "patching dependencies",
        "retaining and disposing of data on schedule",
        "re-testing that the service can actually be recovered in the time it promised",
        "keeping the team together",
      ],
    },
  },

  reviews: {
    id: "live-reviews-come-round-again",
    title: "Live's checks come round again",
    text:
      "Create runs through one-time approvals. Live works differently: its checks recur. Build a security check into every release, update the privacy assessment when the service changes substantially, and secure renewal funding before the current money ends. How critical the service is and how fast it has to come back are re-asked here too. Stabilization tests whether the recovery targets set in Alpha are achievable. Growth reopens them when the service changes, and Maturity re-runs them on the department's own cycle. The work does not finish; it comes round again.",
  },

  sources: [
    {
      label: "Templates and tools",
      linkKey: "gc-service-inventory",
      description:
        "GC Service Inventory (Open Government): the dataset the running service is registered in.",
    },
    {
      label: "Governing instrument",
      linkKey: "guideline-service-digital",
      description: "Guideline on Service and Digital (TBS).",
    },
    {
      label: "Supporting reference",
      linkKey: "apm-gcwiki",
      description: "Application Portfolio Management guidance hub (GCcollab wiki).",
    },
  ] satisfies SourceItem[],
} as const;

export const livePhaseLeadPlainText = [
  phaseQuotePlainText(LIVE_PHASE.quote),
  ...LIVE_PHASE.lead.map((paragraph) => paragraph.text),
].join(" ");
