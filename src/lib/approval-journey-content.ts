import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import { OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
import type { ThreadWhoseJobSection } from "@/lib/thread-rich-content";

export type ApprovalJourneyStep = {
  label: string;
  title: string;
  leadIn: string;
  body: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: { phrase: string; to: string }[];
};

export const APPROVAL_JOURNEY = {
  title: "How a digital service gets approved and funded",

  intro: [
    "Before a digital service is built, it has to be approved and funded. That is not one decision. It is a series of gates, run by different people, and they are easy to confuse: getting the money is not the same as getting the design approved, which is not the same as getting the project approved.",
    "This page is the map. It walks the whole journey from idea to money-in-hand, in order, and points you to the page that goes deep on each stop. Most of it happens in the Create phase, before anything is bought or built. Not every service passes through every gate, and the map says where you can skip one.",
  ],

  journey: {
    steps: [
      {
        label: "Case",
        title: "Make the case.",
        leadIn:
          "Name the problem and who has it before you name a solution, and weigh whether to reuse, buy, or build.",
        body: "A clear problem and a real look at the options is the cheapest work you will do. See Options analysis and the Procurement thread.",
        internalLinks: [
          { phrase: "Options analysis", to: OPTIONS_ANALYSIS_PATH },
          { phrase: "Procurement thread", to: THREADS.procurement.path },
        ],
      },
      {
        label: "Money",
        title: "Find the money.",
        leadIn:
          "Work out whether the service runs on the budget your department already holds, or needs new funding, for example money set aside in a Budget.",
        body: "The rule that governs everything after this: no confirmed source of funds, nothing moves. See Funding.",
        internalLinks: [{ phrase: "Funding", to: THREADS.funding.path }],
      },
      {
        label: "Design",
        title: "Check the design (architecture review).",
        leadIn:
          "For a digital project, the concept case goes to your departmental architecture review board, then to the GC Enterprise Architecture Review Board, to check the design is sound and aligns with government-wide standards.",
        body: "This is about the design, not the money, and it happens early, before the solution is locked.",
        externalLinks: [
          {
            phrase: "GC Enterprise Architecture Review Board",
            linkKey: "guideline-service-digital",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        label: "Cost",
        title: "Cost it.",
        leadIn:
          "Build a whole-life cost estimate and the business case behind the ask.",
        body: "Your CFO and finance team own and sign off the numbers, and an early estimate is allowed to be rough as long as you say so. See Funding.",
        internalLinks: [{ phrase: "Funding", to: THREADS.funding.path }],
      },
      {
        label: "TB",
        title: "Get the authority (a Treasury Board submission).",
        leadIn:
          "If the service needs new money, a new authority, or an approval above your department's own limit, you go to the Treasury Board with a submission.",
        body: "If it runs on existing budget and authority, you can skip this gate. See Funding.",
        internalLinks: [{ phrase: "Funding", to: THREADS.funding.path }],
      },
      {
        label: "Project",
        title: "Get project approval.",
        leadIn:
          "The project itself needs approval to proceed, with the right expenditure authority, under the Directive on the Management of Projects and Programmes.",
        body: "This asks whether the project is ready and within limits.",
        externalLinks: [
          {
            phrase: "Directive on the Management of Projects and Programmes",
            linkKey: "tbs-directive-management-projects-programmes",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        label: "Flow",
        title: "Money reaches the department.",
        leadIn: "Funds flow through the Estimates, the government's spending plans that Parliament votes, on the government's schedule, not yours.",
        body: "This is why you start early.",
        externalLinks: [
          { phrase: "Estimates", linkKey: "lop-funding-new-government-initiatives" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        label: "Buy",
        title: "Now you can buy and build.",
        leadIn: "With the money and the authorities in hand, you run the procurement and start delivering.",
        body: "See the Procurement thread.",
        internalLinks: [{ phrase: "Procurement thread", to: THREADS.procurement.path }],
      },
    ] satisfies ApprovalJourneyStep[],
  },

  notEveryGate:
    "A small change funded from money you already have skips the Treasury Board submission. A service with no digital build skips the architecture review. A project inside your department's own limits skips the central project approval. The map is the full set of gates; your service takes the stops that apply to it.",

  whoseJob: {
    intro: "",
    roles: [
      {
        role: "You, the business owner",
        text: "drive the journey: the problem, the options, the business case, and the approvals you sponsor.",
      },
      {
        role: "The CFO and finance team",
        text: "own the costing and the financial attestation.",
      },
      {
        role: "Your departmental review board and the GC EARB",
        text: "judge the architecture.",
      },
      {
        role: "A TBS analyst",
        text: "guides the submission, and the minister signs it.",
        bold: [{ phrase: "minister" }],
      },
    ],
  } satisfies ThreadWhoseJobSection,

  sources: [
    {
      label: "Governing instrument",
      linkKey: "guideline-service-digital" satisfies ExternalLinkKey,
    },
    {
      label: "Governing instrument",
      linkKey: "policy-planning-investments" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-directive-management-projects-programmes" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "lop-funding-new-government-initiatives" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;
