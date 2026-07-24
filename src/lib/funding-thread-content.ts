import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import { GATE_MAP_PATH } from "@/lib/reference-paths";
import {
  threadWhoseJobPlainText,
  type ThreadLinkedProse,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export const fundingLeadPlainText = (lead: readonly ThreadLinkedProse[]) =>
  lead.map((paragraph) => paragraph.text).join(" ");
export const fundingWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const FUNDING_HERO_ALT =
  "The department is at the centre. For almost every service, about 95 percent, the department funds and approves it from money it already holds. For the exception, about 5 percent, when a service needs new money or is large or complex, the department asks the Treasury Board, which releases the money and grants permission.";

export type FundingDetailIcon = "coins" | "refresh" | "logout";

export type FundingDetailItem = {
  id: string;
  icon: FundingDetailIcon;
  title: string;
  paragraphs: readonly ThreadLinkedProse[];
  formula?: string;
  afterFormula?: ThreadLinkedProse;
};

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
        "For most services this is more routine than people expect. About nineteen in twenty services are small enough that the department funds and approves them itself, from money it already holds, and they never go to the Treasury Board. This page covers that common path first. The exception, a service that needs new money or is large or complex enough to need the Treasury Board's approval, comes at the end.",
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
        text: "The ongoing budget a department gets each year to run its programs, called its reference levels, or the A-base. A service funded from here, within the department's own limit, is approved inside the department and needs nothing from the Treasury Board.",
      },
      {
        heading: "New money from a federal Budget.",
        text: "When the government decides to pay for something new, it sets the money aside in a federal Budget. That money is promised, not yet in the department's hands. The Treasury Board has to release it before the department can spend it.",
      },
      {
        heading: "Money moved from another priority.",
        text: "The department shifts money it already holds from one thing to this one.",
      },
    ],
    closing:
      "A Budget sets money aside; it does not hand it over. It is closer to an IOU (a written promise to pay). To turn the promise into money it can spend, a department has to produce a plan and take it to the Treasury Board. So new money always arrives in two steps: it is set aside, then it is released.",
  },

  commonPath: {
    id: "the-common-path",
    title: "The common path: almost every service",
    paragraphs: [
      {
        text:
          "Most services stay inside the department. When a service runs on money the department already holds, and is not too large or complex for it to manage on its own, the department costs it, funds it, and approves it. There is no submission to the Treasury Board and no central sign-off.",
      },
      {
        text:
          "The first call is the department's own corporate services, the finance and planning people who handle the money side. Across a service's whole life, the money story runs like this, mostly in their hands:",
      },
    ] satisfies ThreadLinkedProse[],
    stepGroups: [
      {
        phase: "CREATE",
        steps: [
          {
            text:
              "A whole-life cost. The finance team builds the estimate, including what it will cost to run year after year, not just to build.",
            bold: [{ phrase: "A whole-life cost." }],
          },
          {
            text:
              "A confirmed source of funds. Existing budget, or money moved from another priority.",
            bold: [{ phrase: "A confirmed source of funds." }],
          },
          {
            text:
              "A place on the department's investment plan. The department's own governance approves the service and commits the budget.",
            bold: [{ phrase: "A place on the department's investment plan." }],
          },
        ],
      },
      {
        phase: "LIVE",
        steps: [
          {
            text:
              "Funding that holds once it is live. The service keeps running on the budget secured for it, and any time-limited funding is renewed before it runs out.",
            bold: [{ phrase: "Funding that holds once it is live." }],
          },
        ],
      },
      {
        phase: "SUNSET",
        steps: [
          {
            text:
              "Money set aside for the exit. Before the current funding ends, the department budgets for moving or retiring the service.",
            bold: [{ phrase: "Money set aside for the exit." }],
          },
        ],
      },
    ] satisfies ReadonlyArray<{
      phase: string;
      steps: readonly ThreadLinkedProse[];
    }>,
    planAheadCallout: {
      label: "PLAN AHEAD",
      title: "Commit the money to run it early",
      body: {
        text:
          "The budget to run a service year after year is set separately from the money to build it. The department flags the expected running cost at the start and commits to it in principle before the build begins (the Beta sub-phase); a service that launches without that can go live with no plan to keep it running.",
        internalLinks: [
          {
            phrase: "Beta sub-phase",
            to: "/create-beta",
          },
        ],
      } satisfies ThreadLinkedProse,
    },
    keyCallout:
      "Nineteen in twenty services never go to the Treasury Board. For most teams, funding is settled inside their own department.",
  },

  treasuryBoardException: {
    id: "when-a-service-goes-to-the-treasury-board",
    title: "When a service goes to the Treasury Board",
    thresholdFigure: {
      alt: "Column diagram: a small project stays under the limit and is approved inside the department; a larger one crosses the limit and needs Treasury Board.",
      caption:
        "The limit is not a fixed amount. It depends on the department and the kind of project.",
    },
    paragraphs: [
      {
        text:
          "A service crosses into the exception when it needs new money the department does not have, a new authority (such as running a new grants program), or when it is too large or complex for the department to approve on its own.",
      },
      {
        text:
          "How large is too large is not one national number. Each department is trusted with a level of project it can manage on its own, set by its Organizational Project Management Capacity Assessment (OPMCA). Each project is sized by a Project Complexity and Risk Assessment (PCRA). When a project's PCRA is above the department's level, it goes to the Treasury Board; below it, the department decides on its own.",
      },
      {
        text:
          "Getting the money then means producing a plan, and that plan is a Treasury Board submission. A large service also passes a set of other checks along the way, from an early concept case to an architecture review, and the money comes only at the end, on a fixed yearly cycle, so a large request that starts late waits for the next cycle. The full sequence, in order, with who signs off at each step, is laid out in the official gates of a digital service. Funding is one part of it.",
        internalLinks: [
          {
            phrase: "the official gates of a digital service",
            to: GATE_MAP_PATH,
          },
        ],
      },
    ] satisfies ThreadLinkedProse[],
  },

  detailWork: {
    id: "the-funding-work-in-detail",
    title: "The funding work, in detail",
    items: [
      {
        id: "costing-a-service",
        icon: "coins",
        title: "Costing a service",
        paragraphs: [
          {
            text:
              "Before a department can ask for money, or commit its own, it has to know how much the service will cost. A cost estimate is that figure, produced by the finance team, who stand behind it. The number that matters is the whole-life cost: building the service, running it, supporting it, keeping it secure, and retiring it at the end. A build-only figure looks cheaper, and it sets the service up to run short later.",
          },
          {
            text:
              "An early estimate is allowed to be rough, as long as it says how rough. A Rough Order of Magnitude (ROM) estimate can be up to 40 percent away from the real cost; an indicative estimate narrows that to about 25 percent; a substantive estimate to about 15 percent. Each estimate should say which kind it is, so an early figure is not read as a firm price.",
          },
        ],
        formula: "ROM ±40%  →  indicative ±25%  →  substantive ±15%",
        afterFormula: {
          text:
            "The GC Guide to Costing sets out a seven-step method for building an estimate that holds up.",
          externalLinks: [
            { phrase: "GC Guide to Costing", linkKey: "tbs-guide-costing" },
          ] satisfies ExternalPhraseLink[],
        },
      },
      {
        id: "staying-funded",
        icon: "refresh",
        title: "Staying funded once it is live",
        paragraphs: [
          {
            text:
              "Getting a service funded is only the beginning. A running service has to stay funded, year after year, and that takes attention.",
          },
          {
            text:
              "Running within the budget: a live service runs on the money secured for it, tracked so it does not run short partway through the year.",
            bold: [{ phrase: "Running within the budget:" }],
          },
          {
            text:
              "Planning renewals early: some funding is time-limited and runs out on a set date, and the next decision, a renewal or an expansion, has to start well before the money ends, because approval takes months.",
            bold: [{ phrase: "Planning renewals early:" }],
          },
          {
            text:
              "Adjusting when priorities shift: a department can move money it already holds toward the service, or make a fresh request for more.",
            bold: [{ phrase: "Adjusting when priorities shift:" }],
          },
        ],
      },
      {
        id: "funding-the-exit",
        icon: "logout",
        title: "Funding the exit",
        paragraphs: [
          {
            text:
              "Retiring or replacing a service is not free, and a department that has not budgeted for the exit can find itself stuck paying for a service it wants to leave.",
          },
          {
            text:
              "The exit costs money in three places: moving the data and standing up the replacement (the data side of the move is its own work), winding the old service down and running two in parallel during the switch, and closing the supplier contracts cleanly. The money for the exit is set aside before the current funding ends, so the move is planned rather than scrambled.",
            internalLinks: [
              { phrase: "data side of the move", to: THREADS["data-stewardship"].path },
            ],
          },
        ],
      },
    ] satisfies FundingDetailItem[],
  },

  whoseJob: {
    intro: "Funding is shared across a department:",
    roles: [
      {
        role: "The department's corporate services",
        text: "are the first door: they walk a team through costing, the source of funds, and the investment plan.",
      },
      {
        role: "The finance team and the Chief Financial Officer (CFO)",
        text: "produce the cost estimate and stand behind the numbers.",
      },
      {
        role: "The business owner of the application",
        text: "owns the business case and the decisions about what the service needs and what it should cost.",
      },
    ],
    closing: {
      text: "(The fuller set of players for the exception, when a large or complex service goes to the Treasury Board, including legal, the Treasury Board Secretariat analyst, and the minister, is shown in order in the official gates of a digital service.)",
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

  furtherReading: [
    {
      text: "Introduction to the Planning and Management of Investments, COR433 (Canada School of Public Service)",
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
      linkKey: "csps-cor433" satisfies ExternalLinkKey,
    },
    {
      label: "Governing instrument",
      linkKey: "tbs-directive-management-projects-programmes" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-guide-costing" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;
