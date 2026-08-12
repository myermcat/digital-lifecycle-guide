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
      text: "Create is the part of a service's life with a clear finish line. That finish is launch, the day the service goes live.",
      bold: [{ phrase: "a clear finish line" }],
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
      text: "After launch the work does not end. It changes: the one-time work of standing the service up becomes the years-long work of running and improving it, which is Live.",
      internalLinks: [{ phrase: "Live", to: PHASES.live.href }],
    },
    {
      text: "Think ahead to Live while you create. The service you are standing up will need to be kept running, growing, healthy, and responsive for years, and what that takes is decided now: the running team, the operating money, the support that answers for the service, and the room to keep improving it. The cheapest time to secure each of these is before the contract is signed and before the design settles.",
      bold: [{ phrase: "Think ahead to Live while you create." }],
    },
  ] satisfies ThreadLinkedProse[],

  costOfLate: {
    title: "The cost of leaving it late",
    lead: "Everything in Create is cheapest the first time it comes up, and the price rises from there:",
    items: [
      {
        heading: "Exit rights missed at signature.",
        line: "The one moment of leverage passes, and the department rents its own service for a decade.",
      },
      {
        heading: "Accessibility bolted on after the build.",
        line: "In Canada the accessibility check happens when you buy, so a product bought without the clauses is paid for twice.",
      },
      {
        heading: "The authorizations started late.",
        line: "The security authorization and the privacy assessment each take months, and the launch waits on the slower one.",
      },
      {
        heading: "The running team found after launch.",
        line: "Nobody is staffed to operate the service, and it decays while the hiring catches up.",
      },
      {
        heading: "The operating money discovered late.",
        line: "The build was funded but the running was not, and year one becomes an emergency request.",
      },
    ],
  },

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
          text: "A replacement still benefits from every sub-phase. When a service is replacing an existing one, it can feel like much of the work is already done, since the old service shows what it did. What it cannot show is what people need now. The problem may have shifted, the users may have changed, the rules may be different, and some of what the old service did may no longer be worth carrying forward. Going through Discovery, Alpha, and Beta with the same care as a new service is what helps a team notice those changes, so the new service improves on the old one.",
          bold: [
            { phrase: "A replacement still benefits from every sub-phase." },
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
        lead:
          "The real service is not built until the money and the sign-offs are in place, and for most services that happens inside the department.",
        bullets: [
          {
            text: "Projects above Treasury Board's thresholds are costed and risk-assessed through the Project Complexity and Risk Assessment, and that assessment decides the approval path the service takes.",
          },
          {
            text: "For most services, the assessment keeps them inside the department: added to the department's investment plan, funded from the department's own budget, and reviewed by its own governance bodies and its own architecture review board.",
          },
          {
            text: "Only the largest or most complex services go further, to the Government of Canada Enterprise Architecture Review Board and a Treasury Board submission. Most do not.",
          },
          {
            text: "Funding sets out the whole path, and which one a given service takes. The official checkpoints of a digital service lays out every official checkpoint on one page.",
            internalLinks: [
              { phrase: "Funding", to: "/thread/funding" },
              {
                phrase: "The official checkpoints of a digital service",
                to: "/gate-map",
              },
            ],
          },
          {
            text: "Winning whichever approvals apply, before the build, is what gives Create its finish line.",
          },
        ],
      },
      {
        heading: "3. Build it so it can be run, and later replaced or retired.",
        lead: "What is settled here is what the service will live with for years, so it is worth getting right while it is still easy to change.",
        bullets: [
          {
            text: "Security and privacy are designed in while changing the design is still cheap. If the service handles personal information used to make decisions about people, a Privacy Impact Assessment is done here.",
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
            text: "When technology is bought, procurement writes the requirements, and the exit, into the contract.",
            internalLinks: [{ phrase: "procurement", to: "/thread/procurement" }],
          },
          {
            text: "The team that will run the service is put together.",
            internalLinks: [{ phrase: "team", to: "/thread/team-capability" }],
          },
        ],
      },
    ],
    closing: {
      leadIn: "These are one-time decisions, made to get the service built.",
      text: "The business case is made, the money for building and running it is committed, and the design is signed off. Most of them come round again after launch, each on its own cycle: some at every release, some once a year, some only when something about the service changes. That recurring rhythm is what makes Live different.",
    },
  },

  workingThroughCreate: {
    id: "create-in-three-sub-phases",
    title: "Create in three sub-phases",
    intro:
      "Create is delivered in three sub-phases, each with its own page. Approval and funding are not settled all at once before they begin. They build up across the sub-phases, and the big commitment, the money and sign-offs for the build, comes before Beta.",
    subphases: [
      {
        title: "Discovery",
        description:
          "understand the problem, work out whether a service is needed, and whether to reuse, buy, or build. Stopping here can be a good outcome.",
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
      label: "Templates and tools",
      linkKey: "pcra-tool" satisfies ExternalLinkKey,
      description:
        "Project Complexity and Risk Assessment (PCRA) tool (TBS): the questionnaire that rates how big and risky the project is; the score, against the department's approved capacity class, decides who can approve it.",
    },
    {
      label: "Governing instrument",
      linkKey: "guideline-service-digital" satisfies ExternalLinkKey,
      description: "Guideline on Service and Digital (TBS).",
    },
    {
      label: "Governing instrument",
      linkKey: "concept-case-procedures" satisfies ExternalLinkKey,
      description: "Mandatory Procedures for Concept Cases for Digitally Enabled Projects (TBS).",
    },
    {
      label: "Governing instrument",
      linkKey: "directive-projects-programmes" satisfies ExternalLinkKey,
      description: "Directive on the Management of Projects and Programmes (TBS).",
    },
    {
      label: "Communities",
      linkKey: "gcdigital-community" satisfies ExternalLinkKey,
      description:
        "GCDigital community (TBS OCIO): the community for digital practitioners across government.",
    },
  ] satisfies SourceItem[],
} as const;

export const createPhaseLeadPlainText = [
  phaseQuotePlainText(CREATE_PHASE.quote),
  ...CREATE_PHASE.lead.map((paragraph) => paragraph.text),
].join(" ");
