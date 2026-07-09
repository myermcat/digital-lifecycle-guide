import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import { THREADS } from "@/lib/guide-strings";
import { OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
import type { ThreadLinkedProse } from "@/lib/thread-rich-content";

export type CreateSpineStage = ThreadLinkedProse & {
  title: string;
};

export const SERVICE_APPROVAL_FUNDING_STAGES = [
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
    text: "A department does not hold one pot: a service runs on the budget the department already has, on new money set aside in a federal Budget, or on money moved from another priority. A request to spend cannot move forward until the source of funds is confirmed. Funding explains where the money comes from and how a department asks for more.",
    bold: [{ phrase: "source of funds" }],
    internalLinks: [{ phrase: "Funding", to: THREADS.funding.path }],
  },
  {
    title: "GC EARB, the architecture review.",
    text: "For a digital service, the design is reviewed early, before a solution or a supplier is chosen, so it can still change. The department's own architecture review board sees it first, then the GC Enterprise Architecture Review Board (GC EARB) checks the design is sound and fits government-wide standards.",
    bold: [{ phrase: "early, before a solution or a supplier is chosen" }],
    externalLinks: [
      {
        phrase: "GC Enterprise Architecture Review Board (GC EARB)",
        linkKey: "guideline-service-digital",
      },
    ] satisfies ExternalPhraseLink[],
  },
  {
    title: "Cost it.",
    text: "A cost estimate is built for the whole life of the service: standing it up (built or bought), running it, supporting it, and retiring it at the end. The finance team produces the numbers, and an early estimate is allowed to be rough as long as it says how rough. Funding covers costing.",
    bold: [{ phrase: "cost estimate" }],
    internalLinks: [{ phrase: "Funding", to: THREADS.funding.path }],
  },
  {
    title: "Get the authority: a Treasury Board submission.",
    text: "If the service needs new money, a new authority such as a new grants program, or approval above the department's own limit, it goes to the Treasury Board with a submission. A service that runs on existing budget and authority skips this step. Funding covers when a submission is needed and what to prepare.",
    bold: [{ phrase: "submission" }],
    internalLinks: [{ phrase: "Funding", to: THREADS.funding.path }],
  },
  {
    title: "Get project approval.",
    text: "The project itself needs project approval to proceed, with the authority to spend against it, set out in the Directive on the Management of Projects and Programmes.",
    bold: [{ phrase: "project approval" }],
    externalLinks: [
      {
        phrase: "Directive on the Management of Projects and Programmes",
        linkKey: "tbs-directive-management-projects-programmes",
      },
    ] satisfies ExternalPhraseLink[],
  },
  {
    title: "The money is released.",
    text: "Approved funds reach the department through the government's yearly spending plans, the Estimates, which Parliament votes. Because the money is released on that yearly cycle, a request that starts late delays the work.",
    bold: [{ phrase: "Parliament votes" }],
    externalLinks: [
      { phrase: "Estimates", linkKey: "lop-funding-new-government-initiatives" },
    ] satisfies ExternalPhraseLink[],
  },
  {
    title: "Buy and build.",
    text: "With the money and the approvals in place, the department runs the procurement, and delivery begins. The building or configuring itself happens across the three sub-phases below. All of it is still Create: a service is not Live until it launches, however much has already been built.",
    bold: [{ phrase: "procurement" }],
    internalLinks: [{ phrase: "Procurement", to: THREADS.procurement.path }],
  },
] satisfies CreateSpineStage[];

export const SERVICE_APPROVAL_FUNDING_NOT_EVERY_STAGE =
  "A small change paid for from money a department already holds skips the Treasury Board submission. A service with no digital build skips the GC EARB review. A project inside a department's own limit skips the central project approval.";

export const createSpinePlainText = (stages: readonly CreateSpineStage[]) =>
  stages.map((stage) => `${stage.title} ${stage.text}`).join(" ");
