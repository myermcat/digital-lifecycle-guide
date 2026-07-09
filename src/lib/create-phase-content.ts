import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import type { ThreadWhoseJobSection } from "@/lib/thread-rich-content";

export type CreateSubphaseRow = {
  title: string;
  description: string;
  href: string;
};

export const CREATE_PHASE = {
  title: PHASES.create.title,

  lead: [
    "Create is the first stretch of a service's life. It runs from the first idea to launch, the day the service goes live. In between, a team works out whether the service should exist at all, what it should be, and how to pay for it and stand it up.",
    "Two kinds of work fill Create, side by side. The service is approved and funded, a set order of steps owned by different people. And it is delivered in three sub-phases, Discovery, Alpha, and Beta, from learning the need to a real service ready to launch.",
  ],

  approvalPointer: {
    id: "how-a-service-gets-approved-and-funded",
    title: "How a service gets approved and funded",
    text: "A service is approved and funded through a set order of steps, from the business case to the money being released.",
    linkText: "See the whole path on the Funding page",
    linkTo: `${THREADS.funding.path}#how-a-service-gets-approved-and-funded`,
  },

  whoseJob: {
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
  } satisfies ThreadWhoseJobSection,

  workingThroughCreate: {
    id: "create-in-three-sub-phases",
    title: "Create in three sub-phases",
    intro:
      "Once it is approved and funded, Create is delivered in three sub-phases, each with its own page.",
    subphases: [
      {
        title: "Discovery",
        description:
          "Work out whether the service is needed, and whether to reuse, buy, or build. Stopping here is a good outcome.",
        href: "/create-discovery",
      },
      {
        title: "Alpha",
        description:
          "Test the riskiest ideas with throwaway prototypes, before committing.",
        href: "/create-alpha",
      },
      {
        title: "Beta",
        description:
          "Stand up the real service and prove it with real users, before launch.",
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
    {
      label: "Governing instrument",
      linkKey: "tbs-directive-management-projects-programmes" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;

export const createPhaseLeadPlainText = CREATE_PHASE.lead.join(" ");
