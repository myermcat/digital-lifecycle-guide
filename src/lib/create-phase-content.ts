import type { SourceItem } from "@/components/SourcesBlock";
import type { PhaseQuoteContent } from "@/components/PhaseQuote";
import { phaseQuotePlainText } from "@/components/PhaseQuote";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import type { ThreadLinkedProse } from "@/lib/thread-rich-content";

export type CreateSubphaseRow = {
  title: string;
  description: string;
  href: string;
};

export const CREATE_PHASE = {
  title: PHASES.create.pageHeading,

  quote: {
    lead:
      "Where a service goes from a problem to a working first version in users' hands. The team:",
    items: [
      "works out what the problem actually is",
      "decides whether to reuse, buy, or build",
      "gets the service funded and approved",
      "delivers the first version",
    ],
    takeaway: "Most of what shapes the service is decided here.",
  } satisfies PhaseQuoteContent,

  /** @deprecated Use CREATE_PHASE.quote.text */
  oneLineDescription:
    "Where a service goes from a problem to a working first version in users' hands. The team works out what the problem actually is, decides whether to reuse, buy, or build, gets the service funded and approved, and delivers the first version. Most of what shapes the service is decided here.",

  lead: [
    {
      text: "Create is the project part of a service's life: the one stretch with a clear finish line. That finish is launch, the day the service goes live.",
      bold: [{ phrase: "project" }],
    },
    {
      text: "It runs from the first idea to launch. In between, a team works out whether the service should exist at all, what it should be, and how to pay for it and stand it up. Create is delivered in three sub-phases, Discovery, Alpha, and Beta, from learning the need to a real service ready to launch.",
      internalLinks: [
        { phrase: "Discovery", to: "/create-discovery" },
        { phrase: "Alpha", to: "/create-alpha" },
        { phrase: "Beta", to: "/create-beta" },
      ],
    },
    {
      text: "After launch the work does not end. It changes: the service stops being a project and becomes a product that has to be run and improved for years, which is Live.",
      internalLinks: [{ phrase: "Live", to: PHASES.live.href }],
    },
  ] satisfies ThreadLinkedProse[],

  approvalPointer: {
    id: "how-a-service-gets-approved-and-funded",
    href: THREADS.funding.path,
    caption: {
      text: "How a service gets approved and funded is a path of its own, and it lives on the Funding page.",
      internalLinks: [{ phrase: "Funding page", to: THREADS.funding.path }],
    } satisfies ThreadLinkedProse,
  },

  workOfCreate: {
    id: "the-work-of-create",
    title: "The work of Create",
    introBold: "Create is three kinds of work, and it ends on the day the service goes live.",
    blocks: [
      {
        heading: "1. Work out what is needed.",
        lead: "Most of Create is deciding, and the cheapest decision is the one to stop.",
        afterLead: {
          text: "Replacing a service does not let you skip any of this. It is tempting to treat a replacement as a like-for-like rebuild, because the old service already tells you what it does. It does not tell you what people need now. The problem may have moved, the users may have changed, the law may have changed, and half of what the old service does may be worth leaving behind. A replacement goes through Discovery, Alpha and Beta exactly like a new service.",
          bold: [
            { phrase: "Replacing a service does not let you skip any of this." },
            { phrase: "need now" },
          ],
        },
        bullets: [
          {
            text: "User research finds out what people actually need, before anything is built.",
            internalLinks: [{ phrase: "user research", to: "/thread/user-research" }],
          },
          {
            text: "An options analysis works out whether to reuse, buy, or build.",
            internalLinks: [{ phrase: "options analysis", to: "/reference/options-analysis" }],
          },
          {
            text: "Joined-up delivery checks the service against the whole journey a person is on, so it is not designed as an island.",
            internalLinks: [
              { phrase: "Joined-up delivery", to: "/thread/joined-up-delivery" },
            ],
          },
        ],
      },
      {
        heading: "2. Get it funded and approved.",
        lead: "Nothing is built until the money and the sign-offs are in place.",
        bullets: [
          {
            text: "Funding sets out the whole approval path, from the business case to the Treasury Board submission.",
            internalLinks: [{ phrase: "Funding", to: "/thread/funding" }],
          },
          {
            text: "The department's architecture review board and GC EARB judge the design.",
          },
          {
            text: "These approvals are won once, before the build, and that is what gives Create a finish line.",
          },
        ],
      },
      {
        heading: "3. Build it so it can be run, and later replaced or retired.",
        lead: "What is settled here is what the service will be stuck with for years.",
        bullets: [
          {
            text: "Security and privacy are designed in while changing the design is still cheap.",
            internalLinks: [
              { phrase: "Security", to: "/thread/security" },
              { phrase: "privacy", to: "/thread/privacy" },
            ],
          },
          {
            text: "Accessibility is built in from the start.",
            internalLinks: [{ phrase: "Accessibility", to: "/thread/accessibility" }],
          },
          {
            text: "Procurement writes the requirements, and the exit, into the contract.",
            internalLinks: [{ phrase: "Procurement", to: "/thread/procurement" }],
          },
          {
            text: "The team that will run the service is put together.",
            internalLinks: [{ phrase: "team", to: "/thread/team-capability" }],
          },
        ],
      },
    ],
    closing: {
      leadIn: "The work is done once.",
      text: "The business case is made once, the money is granted once, the design is signed off once. After launch those checks start coming round again, every release and every year.",
    },
  },

  workingThroughCreate: {
    id: "create-in-three-sub-phases",
    title: "Create in three sub-phases",
    intro:
      "Once it is approved and funded, Create is delivered in three sub-phases, each with its own page.",
    subphases: [
      {
        title: "Discovery",
        description:
          "work out whether the service is needed, and whether to reuse, buy, or build. Stopping here is a good outcome.",
        href: "/create-discovery",
      },
      {
        title: "Alpha",
        description:
          "test the riskiest ideas with throwaway prototypes, before committing.",
        href: "/create-alpha",
      },
      {
        title: "Beta",
        description:
          "stand up the real service and prove it with real users, before launch.",
        href: "/create-beta",
      },
    ],
    launchNote:
      "Launch is the crossing into Live: the service goes live and becomes the real one people use, in place of whatever they did before.",
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "guideline-service-digital" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;

export const createPhaseLeadPlainText = [
  phaseQuotePlainText(CREATE_PHASE.quote),
  ...CREATE_PHASE.lead.map((paragraph) => paragraph.text),
].join(" ");
