import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import type { ThreadLinkedProse, ThreadWhoseJobSection } from "@/lib/thread-rich-content";

export type CreateSubphaseRow = {
  title: string;
  description: string;
  href: string;
};

export const CREATE_PHASE = {
  title: PHASES.create.title,

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

  team: {
    id: "the-team-youll-need-for-create",
    title: "The team you'll need for Create",
    intro: "",
    roles: [
      {
        role: "The business owner of the application",
        text: "drives the work: the problem, the options, the business case, and the approvals they sponsor.",
      },
      {
        role: "The finance team and the Chief Financial Officer (CFO)",
        text: "build and stand behind the cost estimate.",
      },
      {
        role: "The department's architecture review board and GC EARB",
        text: "judge the design.",
      },
      {
        role: "A Treasury Board Secretariat analyst",
        text: "guides the submission, and the responsible minister signs it.",
        bold: [{ phrase: "responsible minister" }],
      },
    ],
  } satisfies ThreadWhoseJobSection & { id: string; title: string },

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
  CREATE_PHASE.oneLineDescription,
  ...CREATE_PHASE.lead.map((paragraph) => paragraph.text),
].join(" ");
