import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { WeightedPhaseNote } from "@/components/WeightedPhaseBlock";
import { MANAGING_WHAT_YOU_BOUGHT_PATH, OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
import {
  GCCASE_MIGRATION_READINESS_GUIDE,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";

export type ProcurementJourneyStepStrings = {
  label: string;
  title: string;
  leadIn: string;
  body: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: { phrase: string; to: string }[];
  anchorLinks?: { phrase: string; hash: string }[];
  placeholderLinks?: PlaceholderPhraseLink[];
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

/** Procurement thread copy — organized by page section. */
export const PROCUREMENT_STRINGS = {
  title: "Procurement",

  intro: {
    paragraphs: [
      "Most government services are bought rather than built. Sometimes the whole thing, more often a part. Procurement is that buying: the whole journey from working out what you need, through choosing a supplier, to living with the contract for as long as the service runs. The contract is one part of it.",
      "Think of this thread as a guided tour. At each stop it tells you what happens, what only you can decide, and where to go for the binding detail.",
    ],
    managingLink: {
      lead: "Already running something you bought, or mixing a buy with managing it? That falls just outside this tour.",
      phrase: "See what changes",
      to: MANAGING_WHAT_YOU_BOUGHT_PATH,
    },
  },

  scopeCallout:
    "Throughout this playbook the worked example is a critical grants and contributions application. The procurement rules here are general and apply to most buys. The grants and contributions example is there to make them concrete, not to fence them in.",

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

  journey: {
    intro:
      "You might not run all of it yourself, but you should recognise every step.",
    steps: [
      {
        label: "Look",
        title: "Look before you buy.",
        leadIn: "The cheapest procurement is the one you do not have to run.",
        body: "Before you reach for a contract, ask whether you should. Work out the real problem, and whether buying is even the answer. Do you already own something that solves it? Could you reuse or adapt instead? See Options analysis for how to widen and weigh your choices before you commit.",
        internalLinks: [{ phrase: "Options analysis", to: OPTIONS_ANALYSIS_PATH }],
      },
      {
        label: "Team",
        title: "Build the team.",
        leadIn: "Buying well is a team sport from the start.",
        body: "A good procurement runs as a cross-functional team, and you stay involved the whole way: you the business owner, a procurement officer (the contracting authority), end-user representatives, and subject-matter experts. Think in two rings. The core team lives the work day to day. The extended team is the wider group who care about the outcome and may need the same thing you do, brought in to round out the use cases so the problem gets solved once for everyone.",
      },
      {
        label: "Ask",
        title: "Say the problem, not the solution.",
        leadIn: "Hand suppliers the problem and let them bring the solution.",
        body: "Write a challenge statement: what, who, when, where, why, and no solution baked in. Then your desired outcomes and the least you must have. Asking for objectives instead of dictating the work lets suppliers offer answers better than the one you would have written. TBS's own migration guidance makes the same point: separate the business need from the system's features, so you do not rebuild a legacy tool's quirks into the new one.",
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Step 2, Confirm Requirements / Business Requirements Discovery Workbook — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "TBS's own migration guidance",
            source: GCCASE_MIGRATION_READINESS_GUIDE,
            part: "Step 2, Confirm Requirements / Business Requirements Discovery Workbook",
          },
        ],
      },
      {
        label: "Strategy",
        title: "Choose the strategy.",
        leadIn: "There are two ways to buy, and for digital, agile is the default.",
        body: "There are two ways to buy: the traditional way and the agile way. For digital, agile is the recommended default going forward. It means breaking a large buy into smaller, tightly scoped pieces that build on each other, delivered in phases with go and no-go gates, or through contracts with task authorizations. The comparison table below sets the two approaches side by side.",
        anchorLinks: [{ phrase: "comparison table below", hash: "traditional-vs-agile" }],
      },
      {
        label: "Approve",
        title: "Get the approval level right, and check in at the right moment.",
        leadIn: "The question everyone asks: when do you loop in Treasury Board?",
        body: "It comes down to authority. Do you have the expenditure authority to spend the money, the project approval to run the work, and the contract authority to sign? While the value stays inside your department's own authority, governance is in-house. When the total may exceed it, or the costs are still unknown, you engage Treasury Board at the strategy stage, before you are committed. Earlier than that there is little to judge, and later the cost of redoing the work climbs. Bring the best information you have and a plan for the unknowns. Exact value thresholds are in the PSPC Agile Procurement Guide (see Sources). For a cloud solution, procurement can run 12 to 24 months from start to contract award, depending on value and complexity.",
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Risks of Delayed Planning, procurement delays — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "12 to 24 months",
            source: GCCASE_MIGRATION_READINESS_GUIDE,
            part: "Risks of Delayed Planning, procurement delays",
          },
        ],
      },
      {
        label: "Engage",
        title: "Engage industry early, under clear rules.",
        leadIn: "Talk to the market early, with the ground rules set first.",
        body: "Talking to suppliers early makes your requirement sharper and your market clearer. Do it with ground rules written down first, so it stays fair to everyone.",
      },
      {
        label: "Award",
        title: "Solicit, evaluate, and award.",
        leadIn: "Now you go out, compare what comes back, and choose.",
        body: "Publish, assess, choose. The agile twist: you can judge real things, prototypes, demonstrations, tested increments, not just a written promise.",
      },
      {
        label: "Manage",
        title: "Manage the contract.",
        leadIn: "Signing is where the real work begins.",
        body: "The signature is the starting line, not the finish. What happens next lives in the Live and Sunset phases.",
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
      "Agile is not always faster. The payoff is confidence. You find the problems early, while they are still cheap to fix. And because the work comes in smaller pieces, you see its value earlier too.",
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
      heading: "The safer way",
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

  byPhaseIntro:
    "Procurement runs through the whole life of a service, but it weighs more at some stages than others.",

  byPhase: [
    {
      lifecyclePhase: "create" as const,
      weight: "heavy" as const,
      body: "Heaviest. Diagnose, set the strategy, go to market, award. Almost every decision that will bind you is made here.",
    },
    {
      lifecyclePhase: "live" as const,
      weight: "medium" as const,
      body: "You have stopped buying. Now you hold the supplier to what was agreed, watch the relationship for drift, and keep the service improving so it does not gradually age into a forced replacement.",
    },
    {
      lifecyclePhase: "sunset" as const,
      weight: "light" as const,
      body: "You are leaving. Plan the re-compete or the retirement well before the contract ends, because the move itself takes real time. Data moves, knowledge transfers, and what you bought is retired or replaced.",
    },
  ] satisfies WeightedPhaseNote[],

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
