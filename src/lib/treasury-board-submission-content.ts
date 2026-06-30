import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { COSTING_A_SERVICE_PATH } from "@/lib/reference-paths";
import {
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type TreasuryBoardSubmissionStep = ThreadLinkedProse & {
  title: string;
};

export const TREASURY_BOARD_SUBMISSION_THRESHOLD_ALT =
  "A small square inside a larger square. The inner square is labelled What the department can approve on its own. The ring between the two is labelled Needs Treasury Board.";

export const treasuryBoardSubmissionLeadPlainText = (lead: readonly ThreadLinkedProse[]) =>
  lead.map((paragraph) => paragraph.text).join(" ");

export const treasuryBoardSubmissionSectionsPlainText = threadSectionsPlainText;

export const treasuryBoardSubmissionWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const TREASURY_BOARD_SUBMISSION = {
  title: "The Treasury Board submission",

  lead: [
    {
      text:
        "A Treasury Board submission is a formal request to the Treasury Board, a committee of Cabinet that controls government spending, for permission to act. Most often it asks to release funding that has been set aside, and to approve creating or changing a service.",
      bold: [{ phrase: "Treasury Board submission" }],
    },
    {
      text:
        "A submission is about authority as well as money. It is how a department gets permission to do things it cannot do on its own, such as start a new grants program or spend above its limit.",
    },
    {
      text:
        "The Government of Canada publishes full guidance on how to write one, the Treasury Board submissions overview and the Guidance for Drafters of Treasury Board Submissions. That guidance begins once a department already knows it needs a submission. This page covers what comes before: what one is, when it is needed, and what to prepare.",
      externalLinks: [
        {
          phrase: "Treasury Board submissions overview",
          linkKey: "tbs-tb-submissions-overview",
        },
        {
          phrase: "Guidance for Drafters of Treasury Board Submissions",
          linkKey: "tbs-guidance-drafters-tb-submissions",
        },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies ThreadLinkedProse[],

  whenNeeded: {
    id: "when-a-service-needs-a-submission",
    title: "When a service needs a submission",
    sections: [
      {
        text:
          "A department can approve much of its own spending. Up to a set limit, it decides on its own. Above that limit, it has to ask the Treasury Board.",
      },
      {
        text:
          "That limit is not one national number. It depends on the department, on how well its ability to manage projects has been assessed, and on the kind of work. A department judged to handle complex projects well is trusted with a higher limit, so the same project can fall within one department's authority and exceed another's.",
      },
      { text: "A service needs a submission when any of these is true:" },
      {
        type: "orderedList",
        items: [
          {
            text: "it needs new money that the government earmarked but has not yet released to the department;",
            bold: [{ phrase: "new money" }],
          },
          {
            text: "it needs a new authority, for example permission to run a new grants program;",
            bold: [{ phrase: "new authority" }],
          },
          {
            text: "its cost is above the department's own approval limit.",
            bold: [{ phrase: "above the department's own approval limit" }],
          },
        ],
      },
      {
        text:
          "A service that runs on money the department already holds, and stays inside the limit, does not need a submission.",
      },
    ] satisfies ThreadContentSection[],
  },

  whatToPrepare: {
    id: "what-to-prepare",
    title: "What to prepare",
    intro: "A submission is built from a set of documents. A department puts these together before writing it:",
    items: [
      {
        title: "Cost estimate.",
        text: "A figure for the whole life of the service, produced by the finance team. Costing a service covers how this is built.",
        internalLinks: [{ phrase: "Costing a service", to: COSTING_A_SERVICE_PATH }],
      },
      {
        title: "Business case.",
        text: "The problem, the options that were considered, and why this one. This is shaped earlier, when the case for the service is first made.",
        internalLinks: [{ phrase: "case for the service is first made", to: "/create" }],
      },
      {
        title: "Gender-based Analysis Plus (GBA Plus).",
        text: "A look at who the service affects and what could make it harder for some people to use, beyond gender, at things like age, disability, language, income, and where people live. The submission has to show how this shaped the design. The free introductory course covers how to do one.",
        externalLinks: [
          { phrase: "introductory course", linkKey: "gba-plus-course" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        title: "Legal risk assessment.",
        text: "Written by the department's legal team.",
      },
      {
        title: "The required appendices.",
        text: "The submission template sets these out: a Financial appendix whenever money is involved, a Human Resources appendix when the work adds more than ten new staff, and others, for results, risks, service and digital, and official languages, when the work calls for them.",
        externalLinks: [
          {
            phrase: "submission template",
            linkKey: "tbs-tb-submission-template-form",
          },
        ] satisfies ExternalPhraseLink[],
      },
    ],
    closing:
      "One rule decides whether a submission goes anywhere: the department has to name a confirmed source of funds. The Treasury Board will not consider a request that cannot say which money will pay for it, because a submission releases money that is already earmarked, it does not conjure new money.",
  },

  howItGoes: {
    id: "how-it-goes-step-by-step",
    title: "How it goes, step by step",
    intro:
      "Once a department knows it needs a submission, the work runs in a fairly set order.",
    items: [
      {
        title: "Confirm the source of funds.",
        text: "Before anything else, the department has to know where the money will come from, a Budget allocation or its existing budget. The Treasury Board will not look at a submission that cannot name a confirmed source, so this comes first.",
      },
      {
        title: "Prepare the documents.",
        text: "The cost estimate, the business case, the Gender-based Analysis Plus, the legal risk assessment, and the appendices are pulled together. Each has its own owner in the department, and a missing one sends the submission back.",
      },
      {
        title: "Write and clear the submission.",
        text: "The department drafts the submission and gets its internal sign-offs: the Chief Financial Officer attests to the numbers, legal signs the risk assessment, and the department approves it before it goes up.",
      },
      {
        title: "Treasury Board decides.",
        text: "A Treasury Board Secretariat analyst reviews and challenges the submission, the responsible minister signs it, and it goes to the Board for a decision.",
      },
      {
        title: "The money is released.",
        text: "Once approved, the funds reach the department through the government's spending plans, the Estimates, which Parliament votes on a fixed yearly cycle. Because the money is released on that cycle, a request that starts late delays the build.",
        externalLinks: [
          { phrase: "Estimates", linkKey: "lop-funding-new-government-initiatives" },
        ] satisfies ExternalPhraseLink[],
      },
    ] satisfies TreasuryBoardSubmissionStep[],
  },

  oneOfSeveralApprovals: {
    id: "a-submission-is-one-of-several-approvals",
    title: "A submission is one of several approvals",
    text:
      "A submission is the money-and-authority gate. A digital service also passes through other gates run by different people: GC EARB (the Enterprise Architecture Review Board), which reviews the design, and the project approval, which checks the project is ready. The Create page lays out the full path, from first idea to money in hand, in order.",
    internalLinks: [{ phrase: "Create page", to: "/create" }],
  } satisfies ThreadLinkedProse,

  whoseJob: {
    intro: "Preparing a submission is shared across a department:",
    roles: [
      {
        role: "The business owner of the application",
        text: "owns the business case and the decisions about what the service needs.",
      },
      {
        role: "The finance team and the Chief Financial Officer (CFO)",
        text: "produce the cost estimate and sign off that the numbers stand up.",
      },
      {
        role: "The legal team",
        text: "writes the legal risk assessment.",
      },
      {
        role: "A Treasury Board Secretariat analyst",
        text: "guides the submission and challenges it before it goes forward.",
      },
      {
        role: "The responsible minister",
        text: "signs the submission.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  furtherReading: [
    {
      text: "Funding New Government Initiatives: From Announcement to Money Allocation (Library of Parliament) — a clear walk from a Budget announcement, through the Estimates, to money reaching a department.",
      externalLinks: [
        {
          phrase: "Funding New Government Initiatives: From Announcement to Money Allocation",
          linkKey: "lop-funding-new-government-initiatives",
        },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies ThreadLinkedProse[],

  sources: [
    {
      label: "Supporting reference",
      linkKey: "tbs-tb-submissions-overview" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-guidance-drafters-tb-submissions" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-tb-submission-template-form" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "gba-plus-course" satisfies ExternalLinkKey,
    },
    {
      label: "Governing instrument",
      linkKey: "tbs-directive-management-projects-programmes" satisfies ExternalLinkKey,
    },
    {
      label: "Governing instrument",
      linkKey: "guideline-service-digital" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;
