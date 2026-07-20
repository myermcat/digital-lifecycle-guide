import type { LucideIcon } from "lucide-react";
import { Banknote, Coins, CreditCard, Hammer } from "lucide-react";
import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { ThreadByPhaseContent } from "@/components/ThreadByPhaseSection";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ChoosingWhatToBuyContent, CombiningRoutesParagraph } from "@/components/WhatYouAreBuyingBlock";
import { GOOD_CONTRACT_PATH, OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
import {
  GCCASE_MIGRATION_READINESS_GUIDE,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";

export type ProcurementJourneyBodyBlock =
  | {
      type: "p";
      text: string;
      bold?: { phrase: string }[];
    }
  | {
      type: "ul";
      items: readonly string[];
    };

export type ProcurementJourneyStepStrings = {
  label: string;
  title: string;
  /** Body under the accordion title: paragraphs and bullet lists. */
  blocks: ProcurementJourneyBodyBlock[];
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: { phrase: string; to: string }[];
  anchorLinks?: { phrase: string; hash: string }[];
  placeholderLinks?: PlaceholderPhraseLink[];
  reviewNotice?: string;
};

export type WhatStaysYoursItemStrings = {
  lead: string;
  body: string;
  placeholderLinks?: PlaceholderPhraseLink[];
};

export type ComparisonRowStrings = {
  topic: string;
  traditional: string;
  agile: string;
};

export type LinkedProseStrings = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  placeholderLinks?: PlaceholderPhraseLink[];
};

/** @deprecated Prefer ChoosingWhatToBuyContent */
export type WhatYouAreBuyingRouteStrings = {
  lead: string;
  body: string;
  externalLinks?: ExternalPhraseLink[];
  boldPhrases?: { phrase: string }[];
};

/** @deprecated Prefer ChoosingWhatToBuyContent */
export type WhatYouAreBuyingStrings = ChoosingWhatToBuyContent;

type BuyingRouteDraft = {
  id: string;
  icon: LucideIcon;
  title: string;
  sections: readonly ThreadContentSection[];
  contractSigned: ThreadLinkedProse;
};


/** Procurement thread copy — organized by page section. */
export const PROCUREMENT_STRINGS = {
  title: "Procurement",

  intro: {
    paragraphs: [
      "Most existing government applications are bought rather than built. Sometimes the whole thing, more often a part. Procurement is that buying: the whole journey from working out what you need, through choosing a supplier, to living with the contract for as long as the service runs. The contract is one part of it.",
      "Think of this thread as a guided tour. At each stop it tells you what happens, what only you can decide, and where to go for the binding detail.",
    ],
  },

  whatWorkStaysYours: {
    heading: "What work stays yours",
    intro:
      "Whatever your role here, some of the work is yours to carry. Here is what usually lands on your side.",
    items: [
      {
        lead: "How long it takes.",
        body: "Procurement runs on its own clock, often many months from first idea to signed contract. Plan your timelines around it early, so it does not catch you short.",
      },
      {
        lead: "The decisions only you can make.",
        body: "What problem you are solving, what good outcomes look like, whether to reuse or buy, and how to break the work into pieces. No one can make these calls for you.",
      },
      {
        lead: "What you bring to each approval.",
        body: "Every checkpoint along the way expects something from you, a document, a number, a sign-off, and the work waits until it has it.",
      },
      {
        lead: "The accountability.",
        body: "You can hand a supplier the work, but the result is still yours to answer for. When the service stumbles, the responsibility lands on your desk.",
      },
      {
        lead: "The long shadow of the buy.",
        body: "Today's contract shapes the whole later life of the service: what it costs, whether you can change it, and whether you can ever move off it.",
      },
    ],
    close:
      "You do not need to be an expert. You need to stay in charge, and to ask when you are unsure.",
  },

  whatYouAreBuying: {
    heading: "Choosing what to buy",
    lead: [
      {
        text: '"Procurement" sounds like one thing. It is a choice between four routes, and the department makes that choice back in Discovery, long before the money arrives. The route decides when the contract is signed, who does the prototyping, and how much leverage the department has at signature.',
        internalLinks: [{ phrase: "Discovery", to: "/create-discovery" }],
      },
    ] satisfies ThreadLinkedProse[],
    routes: [
      {
        id: "buy-a-team",
        icon: Banknote,
        title: "Buy a Team",
        sections: [
          {
            text: "The department contracts people rather than a product, through task-based professional services. The team works to the department's direction, and it prototypes and builds alongside it.",
            externalLinks: [
              {
                phrase: "task-based professional services",
                linkKey: "task-based-professional-services",
              },
            ],
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "This is the usual answer for a department with no developers of its own, which is most departments.",
                bold: [
                  {
                    phrase:
                      "This is the usual answer for a department with no developers of its own,",
                  },
                ],
              },
              {
                text: "There is still a competition. It usually runs against an existing supply arrangement, which is a pre-competed list of approved suppliers, so it is faster than an open tender. It is not instant.",
                bold: [{ phrase: "There is still a competition." }],
              },
              {
                text: "The team is what does Alpha, so it has to be in place before Alpha starts.",
                bold: [{ phrase: "The team is what does Alpha," }],
              },
            ],
          },
          {
            text: "Note that PSPC is moving toward outcomes-based contracting and narrowing task-based tools toward lower-value, routine work, so check what is currently open to you.",
          },
        ],
        contractSigned: {
          text: "at the end of Discovery, before Alpha begins.",
        },
      },
      {
        id: "buy-a-solution",
        icon: Coins,
        title: "Buy a Solution",
        sections: [
          {
            text: "The department describes the problem and the outcome it needs, and suppliers propose how to solve it.",
          },
          {
            type: "unorderedList",
            items: [
              {
                text: 'This is the route most people picture when they hear "procurement".',
                bold: [
                  {
                    phrase:
                      'This is the route most people picture when they hear "procurement".',
                  },
                ],
              },
              {
                text: "Under agile and challenge-based procurement, more than one supplier can be paid to build and demonstrate before one is chosen.",
                bold: [
                  {
                    phrase:
                      "Under agile and challenge-based procurement, more than one supplier can be paid",
                  },
                ],
                externalLinks: [
                  {
                    phrase: "agile and challenge-based procurement",
                    linkKey: "agile-challenge-based-procurement",
                  },
                ],
              },
              {
                text: "The department has to show suppliers what it wants. This is the route where the Alpha prototype does the most work. The faster a supplier understands what is needed, the less back and forth there is, the fewer changes get paid for, and the sooner the thing gets built. A few days of prototyping can save millions.",
                bold: [{ phrase: "The department has to show suppliers what it wants." }],
                internalLinks: [{ phrase: "Alpha", to: "/create-alpha" }],
              },
            ],
          },
        ],
        contractSigned: {
          text: "at the start of Beta, when the competition ends.",
          internalLinks: [{ phrase: "Beta", to: "/create-beta" }],
        },
      },
      {
        id: "buy-a-finished-product",
        icon: CreditCard,
        title: "Buy a Finished Product",
        sections: [
          {
            text: "An existing tool, bought off a standing offer or a supply arrangement, which are pre-competed lists of approved suppliers and products.",
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "Nobody prototypes a product that already exists. The department evaluates real products against what Discovery and Alpha found.",
                bold: [{ phrase: "Nobody prototypes a product that already exists." }],
              },
              {
                text: "It is the fastest route and the least flexible. The risk moves from building the wrong thing to configuring it into something the department can never leave.",
                bold: [{ phrase: "It is the fastest route and the least flexible." }],
              },
            ],
          },
        ],
        contractSigned: {
          text: "at the start of Beta, before configuration begins.",
        },
      },
      {
        id: "build-in-house-or-reuse",
        icon: Hammer,
        title: "Build in-house, or reuse what the Government of Canada already runs",
        sections: [
          {
            text: "There is no build contract at all.",
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "This is rarer than it sounds. Building with the department's own staff needs capability most departments do not have.",
                bold: [{ phrase: "This is rarer than it sounds." }],
              },
              {
                text: "A build delivered by a contracted team is Buy a Team. This route is only for a build done by the department's own staff.",
                bold: [
                  {
                    phrase: "A build delivered by a contracted team is Buy a Team.",
                  },
                ],
              },
              {
                text: "Reuse means a platform the Government of Canada already runs. Nothing is bought.",
                bold: [
                  {
                    phrase: "Reuse means a platform the Government of Canada already runs.",
                  },
                ],
              },
            ],
          },
        ],
        contractSigned: {
          text: "never. There is no build contract.",
        },
      },
    ] satisfies BuyingRouteDraft[],
    combiningRoutes: {
      heading: "Most services combine more than one route",
      intro: "The routes are not walls.",
      paragraphs: [
        {
          lead: "The commonest shape is a Finished Product plus a Team.",
          pillPhrase: "Finished Product plus a Team",
          body: {
            text: "The department buys the product for the core of the service, and buys a team to configure it, integrate it with what the department already runs, and keep it working. Reuse behaves the same way: a Government of Canada platform costs nothing to reuse and still needs someone to configure it.",
          },
        },
        {
          lead: "Each contract keeps its own timing.",
          body: {
            text: "A department buying a Team and a Finished Product signs twice: once at the end of Discovery for the team, and once at the start of Beta for the product.",
          },
        },
      ] satisfies CombiningRoutesParagraph[],
    },
    takeaway: {
      text: "The route decides when the department signs, and signature is the moment it has leverage, because nothing has been committed yet.",
      bold: [
        {
          phrase:
            "The route decides when the department signs, and signature is the moment it has leverage, because nothing has been committed yet.",
        },
      ],
    } satisfies ThreadLinkedProse,
    closingNote: {
      text: "The steps below run in all four routes. In Buy a Team they run early, during Discovery. In Buy a Finished Product they run compressed, against an existing standing offer or supply arrangement rather than an open tender. Only in Build in-house or Reuse do most of them fall away, because there is no competition to run.",
    },
  } satisfies ChoosingWhatToBuyContent,

  journey: {
    intro:
      "You might not run all of it yourself, but you should recognise every step.",
    steps: [
      {
        label: "Look",
        title: "Look before you buy.",
        blocks: [
          {
            type: "p",
            text: "Before you reach for a contract, ask whether you should, and work out the real problem and whether buying is even the answer:",
          },
          {
            type: "ul",
            items: [
              "Do you already own something that solves it?",
              "Could you reuse, adapt, or build instead?",
            ],
          },
          {
            type: "p",
            text: "This step is not in PSPC's guidance, which starts after the decision to buy, so it sits with the Policy on the Planning and Management of Investments.",
          },
        ],
        externalLinks: [
          {
            phrase: "Policy on the Planning and Management of Investments",
            linkKey: "policy-planning-investments",
          },
        ],
        internalLinks: [
          { phrase: "reuse, adapt, or build", to: OPTIONS_ANALYSIS_PATH },
        ],
      },
      {
        label: "People",
        title: "Assemble the people who will run the buy.",
        blocks: [
          {
            type: "p",
            text: "This is not the same as buying a Team. These are the people inside government who run the purchase:",
          },
          {
            type: "ul",
            items: ["you", "the contracting authority", "users", "subject-matter experts"],
          },
          {
            type: "p",
            text: "Buying a Team means contracting a supplier to deliver the work, which is a route, not a step. A good procurement keeps this cross-functional team in the room the whole way, rather than handing the buy off.",
          },
        ],
      },
      {
        label: "Ask",
        title: "Say the problem, not the solution.",
        blocks: [
          {
            type: "p",
            text: "Write a challenge statement: what, who, when, where, why, and no solution baked in. Then set out:",
          },
          {
            type: "ul",
            items: ["your desired outcomes", "the least you must have"],
          },
          {
            type: "p",
            text: "Asking for objectives, rather than dictating the work, lets suppliers offer answers better than the one you would have written.",
          },
        ],
      },
      {
        label: "Strategy",
        title: "Choose the strategy.",
        blocks: [
          {
            type: "p",
            text: 'This is where the route is chosen. Whether the department is buying a Team, a Solution, or a Finished Product, or building in-house, it is settled here, and it settles everything downstream (see "Choosing what to buy" above).',
          },
          {
            type: "p",
            text: "There are two ways to shape a buy: the traditional way and the agile way. For digital, agile is the recommended default. Break a large buy into smaller, tightly scoped pieces that build on each other, using:",
          },
          {
            type: "ul",
            items: [
              "phased deliveries with go and no-go gates, or",
              "contracts with task authorizations",
            ],
          },
          {
            type: "p",
            text: "The case study just below shows the same programme bought two ways.",
          },
          {
            type: "p",
            text: "One thing to be clear about: this is not contract splitting. Splitting is slicing the same work to slip under a threshold or dodge an approval, and it is against the rules. Buying in genuine increments is allowed and encouraged.",
          },
        ],
        anchorLinks: [
          { phrase: "Choosing what to buy", hash: "choosing-what-to-buy" },
          { phrase: "case study just below", hash: "case-study" },
        ],
      },
      {
        label: "Approve",
        title: "Get the approval level right, and check in at the right moment.",
        blocks: [
          {
            type: "p",
            text: "Most services are approved and funded inside the department. What decides the path is the department's project-management capacity class and the project's Project Complexity and Risk Assessment (PCRA) score, and a concept case and the departmental architecture review board come first. If the project sits within the department's capacity, its own governance approves it, and that is roughly 95% of projects.",
          },
          {
            type: "p",
            text: "Only the largest or most complex projects climb higher, to the Government of Canada Enterprise Architecture Review Board and a Treasury Board submission. If that is you, engage at the strategy stage, before you are committed. That path is a branch of its own; the Funding page sets out which path a given project takes, so most readers will not need the detail here.",
          },
        ],
        internalLinks: [
          { phrase: "Treasury Board submission", to: "/thread/funding" },
          { phrase: "Funding", to: "/thread/funding" },
        ],
      },
      {
        label: "Engage",
        title: "Engage industry early, under clear rules.",
        blocks: [
          {
            type: "p",
            text: "Talk to the market early, with the ground rules set first.",
          },
          {
            type: "p",
            text: "Talking to suppliers early makes your requirement sharper and your market clearer. Do it with ground rules written down first, so it stays fair to everyone.",
          },
        ],
      },
      {
        label: "Award",
        title: "Solicit, evaluate, and award.",
        blocks: [
          {
            type: "p",
            text: "Now you go out, compare what comes back, and choose.",
          },
          {
            type: "p",
            text: "Publish, assess, choose. The agile twist: you can judge real things, prototypes, demonstrations, tested increments, not just a written promise.",
          },
        ],
      },
      {
        label: "Manage",
        title: "Manage the contract.",
        blocks: [
          {
            type: "p",
            text: "Signing is where the real work begins.",
          },
          {
            type: "p",
            text: "The signature is the starting line, not the finish. What happens next lives in the Live and Sunset phases.",
          },
        ],
        internalLinks: [
          { phrase: "Live", to: "/live" },
          { phrase: "Sunset", to: "/sunset" },
        ],
      },
    ] satisfies ProcurementJourneyStepStrings[],
  },

  comparison: {
    rows: [
      {
        topic: "Requirements",
        traditional: "Fixed up front, then sent to market",
        agile: "Start from a challenge and your minimum needs, refine with suppliers",
      },
      {
        topic: "Shape of the buy",
        traditional: "One or two large contracts",
        agile: "Several smaller contracts, in series or in parallel",
      },
      {
        topic: "Talking to industry",
        traditional: "Through formal documents",
        agile: "Early and often, in workshops and working sessions",
      },
      {
        topic: "Handling change",
        traditional: "Strategy mostly frozen once approved",
        agile: "Strategy evolves as you learn",
      },
      {
        topic: "When planning happens",
        traditional: "Mostly at the start",
        agile: "All the way through",
      },
      {
        topic: "When you know it worked",
        traditional: "After award and delivery",
        agile: "At each increment along the way",
      },
    ] satisfies ComparisonRowStrings[],
    caption:
      "Agile is not always faster. The payoff is confidence. You find the problems early, while they are still cheap to fix. And because the work comes in smaller pieces, you see its value earlier too. Traditional and agile describe the shape of a buy. They are a different question from what is being bought. A department can buy a team in a traditional shape, or a product in an agile one.",
  },

  caseStudy: {
    title: "The same programme, bought two ways",
    risky: {
      heading: "The risky way",
      framing:
        "Buy the whole programme as a single contract, awarded to a single supplier, delivered over years. This is how most government buying has been done.",
      good: [
        {
          lead: "Simple to set up and run.",
          body: "One competition, one contract, one supplier, one relationship. For a small team with little procurement capacity, that simplicity is worth a lot.",
        },
        {
          lead: "Accountability is in one place.",
          body: "When something goes wrong, there is a single supplier to answer for it and a single contract to hold them to.",
        },
        {
          lead: "Less to coordinate.",
          body: "You are not stitching together the work of several suppliers or making sure the pieces fit at the seams.",
        },
      ],
      bad: [
        {
          lead: "The risk all arrives at the end.",
          body: "You spend months, often years, before you see anything working, and only then learn whether it meets the need. By that point the money is largely spent.",
        },
        {
          lead: "You get locked in.",
          body: "Once the supplier is deep in the build, moving away is slow and costly, so departments keep paying even when the work is going badly.",
        },
        {
          lead: "Change is expensive.",
          body: "The contract is written around the original plan. When the need shifts, every adjustment becomes a negotiation.",
        },
        {
          lead: "One failure can sink the whole programme.",
          body: "Everything rides on a single supplier and a single delivery, so a single bad call puts all of it at risk.",
        },
      ],
    } satisfies CaseStudySide,
    safer: {
      heading: "The safe way",
      framing:
        "Break the programme into smaller, tightly scoped contracts that build on each other, often across several suppliers. This is the agile default.",
      good: [
        {
          lead: "Value shows up early.",
          body: "Each piece delivers something usable in weeks or months, so the service starts helping people sooner and you learn from real use as you go.",
        },
        {
          lead: "You can course-correct.",
          body: "A weak supplier or a wrong turn costs you one small piece you can replace, rather than the whole programme.",
        },
        {
          lead: "Change is cheaper.",
          body: "The next piece absorbs the new need, so the work bends with reality.",
        },
        {
          lead: "Risk is spread.",
          body: "No single delivery or supplier can take the whole thing down.",
        },
        {
          lead: "More suppliers can compete.",
          body: "Smaller pieces let smaller and more specialised firms bid, which widens the field and can lower cost.",
        },
      ],
      bad: [
        {
          lead: "More coordination falls on you.",
          body: "Several contracts and suppliers mean more relationships to manage and more seams to keep aligned.",
        },
        {
          lead: "Keeping pieces small takes discipline.",
          body: "A \"small\" piece drifts back into a monolith if no one holds the line.",
        },
        {
          lead: "It needs more procurement attention up front.",
          body: "Designing the pieces and how they fit is real work, and in-house capacity for it is often thin.",
        },
        {
          lead: "Integration becomes your problem.",
          body: "When different suppliers build different parts, making them work together lands on your side.",
        },
      ],
    } satisfies CaseStudySide,
  },

  goodLooksIntro:
    "A handful of things, all of which you can check. Each one has its own page.",

  whyItMatters: [
    "The contract decides the future of your service. What it costs over its life. Whether you can change it. Whether you can ever move off it. Most of that is settled the day you sign, and undoing it later is slow and expensive.",
    "A good buy leaves your options open. A bad one closes them over time, for as long as the service runs, often without anyone noticing until it is too late.",
    "Buying the agile way lowers the worst risk of all, the two-year effort that ends in \"start over.\" When you can correct course along the way, you are never far from solid ground.",
  ],

  whoseJob: {
    text: "Your department's. You can give the building to a supplier, but the responsibility stays with you. If the service lets a user down, \"the contractor did it\" is not an answer anyone will accept. The Treasury Board Directive on the Management of Procurement says it in plainer policy terms. Your department is the business owner, accountable for the outcomes from start to finish. A procurement specialist, the contracting authority, runs the buying. You own the result. Keep that split in mind at every step along the way. TBS's GCcase migration guidance sets out the same split: departments are accountable for the decision and outcomes, TBS provides enterprise direction and standards, PSPC runs the service, and EARB reviews the architecture.",
    externalLinks: [
      {
        phrase: "Treasury Board Directive on the Management of Procurement",
        linkKey: "directive-procurement",
      },
    ],
    // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Roles and Responsibilities — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
    placeholderLinks: [
      {
        phrase: "TBS's GCcase migration guidance",
        source: GCCASE_MIGRATION_READINESS_GUIDE,
        part: "Roles and Responsibilities",
      },
    ],
  } satisfies LinkedProseStrings,

  goodContractCallout: {
    label: "A GOOD CONTRACT",
    title: "What a good contract looks like",
    paragraphs: [
      "When a supplier builds or runs your service, the contract is where every promise lives: what they must deliver, how you will see it being done, and whether you can ever leave.",
      "We have written out a short, real-looking sample contract for the grant portal, with each clause the rest of the playbook tells you to put in.",
    ],
    linkLabel: "See what a good contract looks like →",
    href: GOOD_CONTRACT_PATH,
  },

  byPhase: {
    id: "by-phase",
    title: "What Procurement looks like in each phase",
    intro:
      "Procurement runs through the whole life of a service, but it weighs more at some stages than others.",
    blocks: [
      {
        title: "Create.",
        preview: "This is where procurement weighs the most.",
        popup: [
          {
            text: "This is where procurement weighs the most.",
            bold: [{ phrase: "This is where procurement weighs the most." }],
          },
          {
            text:
              "You work out the real problem, choose whether to reuse or buy, set the strategy, go to market, and award the contract.",
          },
          {
            text:
              "Almost every decision that will bind the service for years is made here, so it is worth slowing down to get right.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "The buying has stopped, but the work has not.",
        popup: [
          {
            text: "The buying has stopped, but the work has not.",
            bold: [{ phrase: "The buying has stopped, but the work has not." }],
          },
          {
            text:
              "You hold the supplier to what the contract promised, and watch the service levels and the relationship for drift.",
          },
          {
            text:
              "Keep the service improving too, so it does not age into a forced replacement, and start lining up the next contract well before this one ends.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Leaving takes longer than people expect.",
        popup: [
          {
            text: "Leaving takes longer than people expect.",
            bold: [{ phrase: "Leaving takes longer than people expect." }],
          },
          {
            text:
              "Plan the re-compete or the retirement well before the contract ends, because the move itself takes real time.",
          },
          {
            text:
              "Data has to move, knowledge has to transfer, and what you bought is retired or replaced.",
          },
        ],
      },
    ],
  } satisfies ThreadByPhaseContent,

  furtherReading: {
    text: "This thread comes under the Treasury Board Directive on the Management of Procurement, which takes an outcomes-based, lifecycle view of buying. Its closest internal companion is the PSPC Agile Procurement Guide, on the GC network, which this thread leans on for the agile patterns. It also draws on the Boots and Clarke guide to reforming IT procurement in Canada, the UK Service Manual, and Skylight's open agile procurement playbook, all translated to Canadian rules.",
    externalLinks: [
      {
        phrase: "Treasury Board Directive on the Management of Procurement",
        linkKey: "directive-procurement",
      },
      {
        phrase: "PSPC Agile Procurement Guide",
        linkKey: "agile-procurement-guide",
      },
    ],
  } satisfies LinkedProseStrings,
};
