import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import {
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type FundingLinkedProse = ThreadLinkedProse;
export type FundingContentSection = ThreadContentSection;
export type FundingPhasePreviewBlock = ThreadPhasePreviewBlock;

export const fundingSectionsPlainText = threadSectionsPlainText;
export const fundingLeadPlainText = (lead: readonly ThreadLinkedProse[]) =>
  lead.map((paragraph) => paragraph.text).join(" ");
export const fundingWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const FUNDING_HERO_ALT =
  "A person between a service and the Treasury Board. An arrow from the person to the service is labelled Procurement, how a service is bought. An arrow from the Treasury Board to the person is labelled Funding and permission.";

export const FUNDING_THRESHOLD_ALT =
  "A small square inside a larger square. The inner square is labelled What the department can approve on its own. The ring between the two is labelled Needs Treasury Board.";

export const FUNDING_THREAD = {
  title: "Funding",
  slug: "funding" as const,

  lead: [
    {
      text:
        "Every government service costs money, and someone has to approve spending it. Funding is how a service gets that money and that permission, from the first build through every year it keeps running.",
    },
    {
      text:
        "It is the other half of buying. Procurement is how a service is bought. Funding is how it is paid for and approved. A service can have a supplier ready to start and still go nowhere until the money and the permission are in place.",
      internalLinks: [{ phrase: "Procurement", to: THREADS.procurement.path }],
    },
    {
      text:
        "This page covers three things: where the money comes from, how to tell when a service needs a fresh funding decision, and the main way a department asks for one, a Treasury Board (TB) submission.",
      bold: [{ phrase: "Treasury Board (TB) submission" }],
    },
  ] satisfies ThreadLinkedProse[],

  whereMoneyComesFrom: {
    id: "where-the-money-comes-from",
    title: "Where the money comes from",
    intro:
      "A department does not hold one pot of money. A service is usually paid for from one or more of these:",
    items: [
      {
        heading: "Money the department already has.",
        text: "The ongoing reference levels, sometimes called the A-base, cover most day-to-day running. A service that stays within the limit needs no submission.",
      },
      {
        heading: "New money from a federal Budget.",
        text: "The government earmarks it in the Budget; it is not yet in the department's hands until the Treasury Board releases it through a submission.",
      },
      {
        heading: "Money moved from another priority.",
        text: "Money the department already holds, shifted from a lower priority to this one.",
      },
    ],
    closing:
      "A Treasury Board submission does not invent money. It unlocks money already earmarked.",
  },

  whenNeedsTreasuryBoard: {
    id: "when-a-service-needs-treasury-board",
    title: "When a service needs Treasury Board",
    sections: [
      {
        text:
          "A department can approve much of its own spending. Up to a set limit, it decides on its own. Above that limit, it has to ask the Treasury Board.",
      },
      {
        text:
          "That limit is not one national number. It depends on the department, on how well its ability to manage projects has been assessed, and on the kind of work. A department judged to handle complex projects well is trusted with a higher limit, so the same project can fall within one department's authority and exceed another's.",
      },
      { text: "A service needs a Treasury Board submission when any of these is true:" },
      {
        type: "orderedList",
        items: [
          {
            text: "it needs new money that has not yet been released to the department;",
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
    ] satisfies FundingContentSection[],
  },

  whatIsSubmission: {
    id: "what-a-treasury-board-submission-is",
    title: "What a Treasury Board submission is",
    sections: [
      {
        text:
          "A Treasury Board submission is a formal request to the Treasury Board, a committee of Cabinet that controls government spending, for permission to act. Most often it asks to release funding that has been set aside, and to approve creating or changing a service.",
        bold: [{ phrase: "Treasury Board submission" }],
        externalLinks: [
          { phrase: "Treasury Board submission", linkKey: "tbs-tb-submissions-overview" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text:
          "A submission is about authority as well as money. It is how a department gets permission to do things it cannot do on its own, such as start a new grants program or spend above its limit.",
      },
      {
        text:
          "The Government of Canada publishes full guidance on how to write one, the Treasury Board submissions overview and the Guidance for Drafters of Treasury Board Submissions. That guidance begins once a department already knows it needs a submission. This page covers what comes before: what a submission is, when one is needed, and what to prepare.",
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
    ] satisfies FundingContentSection[],
  },

  whatToPrepare: {
    id: "what-to-prepare-for-a-submission",
    title: "What to prepare for a submission",
    sections: [
      {
        text: "A submission is built from a set of documents. A department puts these together before writing it:",
      },
      {
        type: "orderedList",
        items: [
          {
            bold: "a cost estimate",
            text: " for the whole life of the service, from the finance team (see Costing below);",
          },
          {
            text: "a business case: the problem, the options that were considered, and why this one;",
            bold: [{ phrase: "business case" }],
            internalLinks: [{ phrase: "business case", to: "/create" }],
          },
          {
            text: "a Gender-based Analysis Plus (GBA Plus) analysis: a way of working out who a service affects and what could make it harder for some people to use, across factors like age, disability, language, income, and where people live. A submission has to show how this analysis shaped the service. The free introductory course walks through how to do it.",
            bold: [{ phrase: "a Gender-based Analysis Plus (GBA Plus) analysis" }],
            externalLinks: [
              { phrase: "introductory course", linkKey: "gba-plus-course" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            bold: "a legal risk assessment",
            text: ", written by the department's legal team;",
          },
          {
            text: "the appendices the submission template requires: a Financial appendix whenever money is involved, a Human Resources appendix when the work adds more than ten new staff, and others, for results, risks, service and digital, and official languages, when the work calls for them.",
            bold: [{ phrase: "the appendices the submission template requires" }],
            externalLinks: [
              {
                phrase: "appendices the submission template requires",
                linkKey: "tbs-tb-submission-template-form",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        text:
          "One rule decides whether a submission goes anywhere: the department has to name a confirmed source of funds. The Treasury Board will not consider a request that cannot say which money will pay for it, because a submission releases money that has already been set aside, it does not conjure new money.",
      },
    ] satisfies FundingContentSection[],
  },

  costing: {
    id: "costing",
    title: "Costing",
    sections: [
      {
        text:
          "A cost estimate covers the whole life of a service: building it, running it, supporting it, securing it, and retiring it at the end. The finance team produces the numbers and signs off that they stand up.",
        bold: [{ phrase: "whole life" }],
      },
      {
        text:
          "An estimate carries a confidence range, and the range narrows as the work becomes clearer. A first Rough Order of Magnitude (ROM) estimate can be up to 40 percent away from the real cost. An indicative estimate narrows that to about 25 percent, and a substantive one to about 15 percent. Each estimate should say which kind it is, so an early figure is not read as a firm price.",
        bold: [{ phrase: "Rough Order of Magnitude (ROM) estimate" }],
        externalLinks: [
          {
            phrase: "Rough Order of Magnitude (ROM) estimate",
            linkKey: "tbs-guide-costing",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        type: "formula",
        text: "ROM ±40%  →  indicative ±25%  →  substantive ±15%",
      },
    ] satisfies FundingContentSection[],
  },

  fundingSteps: {
    id: "how-funding-goes-step-by-step",
    title: "How funding goes, step by step",
    intro:
      "Getting new funding for a service follows a fairly set order:",
    items: [
      {
        bold: "Work out what it needs.",
        text: " Decide whether the service can run on money the department already has, or needs new funding or a new authority.",
      },
      {
        bold: "Confirm the source of funds.",
        text: " Make sure the money exists, in a Budget or in the department's budget. Until a source is confirmed, the Treasury Board will not consider a submission.",
      },
      {
        bold: "Cost it and build the case.",
        text: " Produce the whole-life cost estimate and the business case behind the request.",
      },
      {
        bold: "Make the submission.",
        text: " If the service needs new money, a new authority, or approval above the department's limit, prepare and send a Treasury Board submission.",
      },
      {
        text: "The money is released. Once approved, the funds reach the department through the government's spending plans, the Estimates, which Parliament votes on a fixed yearly cycle. Because the money is released on that cycle, a request that starts late delays the build.",
        bold: [{ phrase: "The money is released." }],
        externalLinks: [
          { phrase: "Estimates", linkKey: "lop-funding-new-government-initiatives" },
        ] satisfies ExternalPhraseLink[],
      },
    ],
  },

  byPhase: {
    id: "by-phase",
    title: "What Funding looks like in each phase",
    intro: "",
    blocks: [
      {
        title: "Create.",
        preview: "",
        popup: [
          {
            text: "Most of the funding work happens here.",
            bold: [{ phrase: "Most of the funding work happens here." }],
          },
          {
            text:
              "A department works out what the service needs, confirms a source of funds, costs the whole life of it, and makes a Treasury Board submission if one is needed.",
          },
          {
            text: "Funding approval takes months, so this starts early.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "",
        popup: [
          {
            text: "A running service still has to stay funded.",
            bold: [{ phrase: "A running service still has to stay funded." }],
          },
          {
            text:
              "It runs on the budget secured for it, and that budget is watched and reported on.",
          },
          {
            text:
              "A renewal or an expansion needs its own funding decision, planned well before the current money runs out.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "",
        popup: [
          {
            text: "Retiring a service also costs money.",
            bold: [{ phrase: "Retiring a service also costs money." }],
          },
          {
            text:
              "Moving the data, winding the service down, and closing contracts all need funding.",
          },
          {
            text: "The money for the exit is set aside before the current funding ends.",
          },
        ],
      },
    ] satisfies FundingPhasePreviewBlock[],
  },

  oneOfSeveralApprovals: {
    id: "funding-is-one-of-several-approvals",
    title: "Funding is one of several approvals",
    text:
      "A submission is the money-and-authority gate. A digital service also passes through other gates run by different people: GC EARB (the Enterprise Architecture Review Board), which reviews the design, and the project approval, which checks the project is ready. The full path from idea to money in hand lays them out in order.",
    internalLinks: [{ phrase: "full path from idea to money in hand", to: "/create" }],
  } satisfies ThreadLinkedProse,

  whoseJob: {
    intro: "Funding is shared across a department:",
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

  twoWaysComparison: {
    id: "two-ways",
    title: "Two ways to fund a service",
    risky: {
      heading: "Vell",
      framing: "Meet Vell, a program manager. They left the money to the end:",
      items: [
        "costed only the build, with one confident-looking number",
        "went ahead before the source of funds was confirmed",
        "added the Gender-based Analysis Plus near the end to fill the template",
      ],
      closing:
        "The result: the request was sent back to be redone, the running costs turned out to be far higher than the single number, and the service had to cut features to stay inside its budget.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Meet Pax, a program manager. They treated funding as part of the work from the start:",
      items: [
        "costed the whole life of the service and said how rough the early numbers were",
        "confirmed the source of funds first, with the finance team involved early",
        "used Gender-based Analysis Plus to shape the design, so it served the people who would use it",
      ],
      closing:
        "The result: the request cleared the first time, the budget matched the real cost, and the next year of funding was known in advance.",
    } satisfies CaseStudySide,
  },

  furtherReading: [
    {
      text: "Funding New Government Initiatives: From Announcement to Money Allocation (Library of Parliament) — a clear, neutral walk from a Budget announcement, through the Estimates, to money reaching a department.",
      externalLinks: [
        {
          phrase: "Funding New Government Initiatives: From Announcement to Money Allocation",
          linkKey: "lop-funding-new-government-initiatives",
        },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Introduction to the Planning and Management of Investments, COR433 (Canada School of Public Service) — a plain-language course on how government plans and approves investments.",
      externalLinks: [
        {
          phrase: "Introduction to the Planning and Management of Investments, COR433",
          linkKey: "csps-cor433",
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
      linkKey: "tbs-guide-costing" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "gba-plus-what-is" satisfies ExternalLinkKey,
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
      linkKey: "policy-planning-investments" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "lop-funding-new-government-initiatives" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;
