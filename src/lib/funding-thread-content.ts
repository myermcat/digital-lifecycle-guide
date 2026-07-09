import type { PracticeCardData } from "@/components/PracticeCard";
import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import {
  COSTING_A_SERVICE_PATH,
  FUNDING_THE_EXIT_PATH,
  STAYING_FUNDED_PATH,
  TREASURY_BOARD_SUBMISSION_PATH,
} from "@/lib/reference-paths";
import {
  threadWhoseJobPlainText,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";
import {
  SERVICE_APPROVAL_FUNDING_NOT_EVERY_STAGE,
  SERVICE_APPROVAL_FUNDING_STAGES,
} from "@/lib/service-approval-funding-content";

export const fundingLeadPlainText = (lead: readonly ThreadLinkedProse[]) =>
  lead.map((paragraph) => paragraph.text).join(" ");
export const fundingWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const FUNDING_HERO_ALT =
  "A person between a service and the Treasury Board. An arrow from the person to the service is labelled Procurement, how a service is bought. An arrow from the Treasury Board to the person is labelled Funding and permission.";

export const FUNDING_DETAIL_CARDS: PracticeCardData[] = [
  {
    label: "The Treasury Board submission",
    href: TREASURY_BOARD_SUBMISSION_PATH,
    description:
      "The formal request for new money or a new authority, and the hardest part of funding to get right.",
  },
  {
    label: "Costing a service",
    href: COSTING_A_SERVICE_PATH,
    description:
      "Building a whole-life cost estimate that holds up, and saying how firm each number is.",
  },
  {
    label: "Staying funded once it is live",
    href: STAYING_FUNDED_PATH,
    description:
      "Running within the budget, and planning the next funding decision before the money runs out.",
  },
  {
    label: "Funding the exit",
    href: FUNDING_THE_EXIT_PATH,
    description:
      "Paying for the move, the wind-down, and the contracts when a service is retired.",
  },
];

export const FUNDING_REFERENCE_BREADCRUMB = {
  title: THREADS.funding.title,
  href: THREADS.funding.path,
} as const;

export const FUNDING_THREAD = {
  title: "Funding",
  slug: "funding" as const,

  lead: [
    {
      text:
        "Every government service costs money, and someone has to approve spending it. Funding is how a service gets that money and the permission to spend it, across its whole life: getting it built, keeping it running, and paying to retire it at the end.",
    },
    {
      text:
        "It is the other half of buying. Procurement is how a service is bought; funding is how it is paid for and approved. A service can have a supplier ready to start and still go nowhere until the money and the permission are in place.",
      internalLinks: [{ phrase: "Procurement", to: THREADS.procurement.path }],
    },
    {
      text:
        "Most of a service's funding is more routine than people expect, because it runs on money its department already has. The demanding part comes when a service needs new money, or permission to spend above what the department can approve on its own. That means a formal request to the Treasury Board, called a submission. It is one event in a service's money story, and the rest of that story matters too.",
      bold: [{ phrase: "submission" }],
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
        text: "The ongoing budget a department gets each year to run its existing programs, called its reference levels, or the A-base. Running a service from here, within the department's own limit, does not need a submission.",
      },
      {
        heading: "New money from a federal Budget.",
        text: "When the government decides to pay for something new, it earmarks the money in the federal Budget. That money is promised, but it is not yet in the department's hands. Treasury Board has to release it, through a submission, before the department can spend it.",
      },
      {
        heading: "Money moved from another priority.",
        text: "The department shifts money it already holds from one thing to this one.",
      },
    ],
    closing:
      "So a Treasury Board submission does not invent money. It unlocks money the government has already earmarked and grants the permission to spend it. That is why every submission has to name where its money comes from: the money exists, and the submission releases it.",
  },

  approvalPath: {
    id: "how-a-service-gets-approved-and-funded",
    title: "How a service gets approved and funded",
    intro: [
      {
        text:
          "Before it goes live, a service is approved, costed, and funded through a set order of steps. Different people own different steps, and the whole path takes months, so it starts early.",
      },
      {
        text:
          "Early work comes first, and it is cheap. A team can research the problem and shape the business case using the department's existing operating budget, before any request for new money. That is why research comes before the big approvals: you research to make the case for the money. The approvals below come once the team knows what it is building.",
        bold: [{ phrase: "existing operating budget" }],
      },
    ] satisfies ThreadLinkedProse[],
    items: SERVICE_APPROVAL_FUNDING_STAGES,
    notEveryStage: SERVICE_APPROVAL_FUNDING_NOT_EVERY_STAGE,
  },

  detailCards: {
    id: "the-funding-work-in-detail",
    title: "The funding work, in detail",
  },

  whoseJob: {
    intro: "Funding is shared across a department:",
    roles: [
      {
        role: "The business owner of the application",
        text: "owns the business case and the decisions about what the service needs and what it should cost.",
      },
      {
        role: "The finance team and the Chief Financial Officer (CFO)",
        text: "produce the cost estimate and stand behind the numbers.",
      },
    ],
    closing: {
      text: "The fuller set of roles for a Treasury Board submission, including legal, the Treasury Board Secretariat analyst, and the minister, is on the Treasury Board submission page.",
      internalLinks: [
        { phrase: "Treasury Board submission page", to: TREASURY_BOARD_SUBMISSION_PATH },
      ],
    },
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
    ] satisfies ThreadPhasePreviewBlock[],
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
      linkKey: "tbs-guide-costing" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;
