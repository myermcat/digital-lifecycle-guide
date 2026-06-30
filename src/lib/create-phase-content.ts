import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import { OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
import type { ThreadLinkedProse, ThreadWhoseJobSection } from "@/lib/thread-rich-content";

export type CreateSpineStage = ThreadLinkedProse & {
  title: string;
};

export const CREATE_PHASE = {
  title: PHASES.create.title,

  lead: [
    "Create is the first stretch of a service's life: from the first idea to the day it is ready to build and run. Before any code, a service has to be shaped, approved, and paid for, and that runs through a set order of stages, each owned by different people.",
    "This page is the map of that order. Each stage below says what happens and points to the page that covers it in full. Not every service takes every stage, and the map says where one can be skipped.",
  ],

  stages: {
    id: "the-stages",
    title: "The stages",
    items: [
      {
        title: "Make the case.",
        text: "A service starts from a clear problem: who has it, and what a good outcome would look like. Before any solution is named, the choice of whether to reuse something that already exists, buy, or build is weighed. The problem, the options, and the reasoning come together as a business case, the document that justifies the service and feeds later funding requests. Options analysis sets out how to compare those choices, and Procurement covers the look-before-you-buy step.",
        bold: [{ phrase: "business case" }],
        internalLinks: [
          { phrase: "Options analysis", to: OPTIONS_ANALYSIS_PATH },
          { phrase: "Procurement", to: THREADS.procurement.path },
        ],
      },
      {
        title: "Find the money.",
        text: "Then comes where the money comes from. A department does not hold one pot: a service runs on the budget the department already has, on new money set aside in a federal Budget, or on money moved from another priority. A request to spend cannot move forward until the source of funds is confirmed. Funding explains where the money comes from and how a department asks for more.",
        internalLinks: [{ phrase: "Funding", to: THREADS.funding.path }],
      },
      {
        title: "GC EARB, the architecture review.",
        text: "For a digital service, the design is reviewed early, at the concept-case stage, before a solution or a supplier is chosen, so it can still change. The department's own architecture review board sees it first, then the GC Enterprise Architecture Review Board (GC EARB) checks the design is sound and fits government-wide standards.",
        externalLinks: [
          {
            phrase: "GC Enterprise Architecture Review Board (GC EARB)",
            linkKey: "guideline-service-digital",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        title: "Cost it.",
        text: "A cost estimate is built for the whole life of the service: building it, running it, supporting it, and retiring it at the end. The finance team produces the numbers, and an early estimate is allowed to be rough as long as it says how rough. Funding covers costing.",
        internalLinks: [{ phrase: "Funding", to: THREADS.funding.path }],
      },
      {
        title: "Get the authority: a Treasury Board submission.",
        text: "If the service needs new money, a new authority such as a new grants program, or approval above the department's own limit, it goes to the Treasury Board with a submission. A service that runs on existing budget and authority skips this stage. Funding covers when a submission is needed and what to prepare.",
        internalLinks: [{ phrase: "Funding", to: THREADS.funding.path }],
      },
      {
        title: "Get project approval.",
        text: "The project itself needs approval to proceed, with the authority to spend against it, set out in the Directive on the Management of Projects and Programmes.",
        externalLinks: [
          {
            phrase: "Directive on the Management of Projects and Programmes",
            linkKey: "tbs-directive-management-projects-programmes",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        title: "The money is released.",
        text: "Approved funds reach the department through the government's yearly spending plans, the Estimates, which Parliament votes. Because the money is released on that yearly cycle, a request that starts late delays the build.",
        externalLinks: [
          { phrase: "Estimates", linkKey: "lop-funding-new-government-initiatives" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        title: "Buy and build.",
        text: "With the money and the approvals in place, the department runs the procurement and starts building. Procurement covers the buying.",
        internalLinks: [{ phrase: "Procurement", to: THREADS.procurement.path }],
      },
    ] satisfies CreateSpineStage[],
  },

  notEveryStage:
    "A small change paid for from money a department already holds skips the Treasury Board submission. A service with no digital build skips the GC EARB review. A project inside a department's own limit skips the central project approval. The map is the full set of stages; a service takes the ones that apply to it.",

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
    id: "working-through-create-in-detail",
    title: "Working through Create in detail",
    intro:
      "Create has three stages of delivery once the service is approved and funded, each with its own page: Discovery, Alpha, and MVP.",
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
    {
      label: "Supporting reference",
      linkKey: "lop-funding-new-government-initiatives" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;

export const createPhaseLeadPlainText = CREATE_PHASE.lead.join(" ");

export const createSpinePlainText = (stages: readonly CreateSpineStage[]) =>
  stages.map((stage) => `${stage.title} ${stage.text}`).join(" ");
