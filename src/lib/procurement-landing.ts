import type { PracticeCardData } from "@/components/PracticeCard";
import type { WeightedRegionNote } from "@/components/WeightedRegionBlock";
import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import { PROCUREMENT_SOURCES } from "@/lib/procurement-sources";

export type LinkedProse = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
};

export const PROCUREMENT_LANDING_PATH = "/thread/procurement";

export function procurementSubPath(slug: string) {
  return `/thread/procurement/${slug}` as const;
}

/** @deprecated Use PROCUREMENT_LANDING_PATH */
export const CONTRACTING_LANDING_PATH = PROCUREMENT_LANDING_PATH;

/** @deprecated Use procurementSubPath */
export const contractingSubPath = procurementSubPath;

export const PROCUREMENT_GOOD_LOOKS_CARDS: PracticeCardData[] = [
  {
    label: "You looked before you bought",
    href: procurementSubPath("you-looked-before-you-bought"),
    description:
      "Before you buy anything, you worked out what the problem actually is and what the real options are.",
  },
  {
    label: "You bought small, in pieces",
    href: procurementSubPath("you-bought-small-in-pieces"),
    description:
      "You bought the work in small, separate pieces instead of one large block.",
  },
  {
    label: "You did not over-customise",
    href: procurementSubPath("you-did-not-over-customise"),
    description:
      "You changed your process to fit the software, rather than changing the software to fit your process.",
  },
  {
    label: "You can leave when you need to",
    href: procurementSubPath("you-can-leave-when-you-need-to"),
    description:
      "You can leave the supplier when you need to, with your data, your code, and the knowledge to move.",
  },
  {
    label: "You kept enough in-house",
    href: procurementSubPath("you-kept-enough-in-house"),
    description:
      "You held on to enough understanding to govern the work and to handle an exit.",
  },
  {
    label: "The contract carries the practices",
    href: procurementSubPath("the-contract-carries-the-practices"),
    description:
      "The contract names the work the supplier must deliver, and says how you will see it being done.",
  },
];

/** @deprecated Use PROCUREMENT_GOOD_LOOKS_CARDS */
export const CONTRACTING_GOOD_LOOKS_CARDS = PROCUREMENT_GOOD_LOOKS_CARDS;

export type ProcurementJourneyStep = {
  label: string;
  title: string;
  body: string;
  externalLinks?: ExternalPhraseLink[];
};

export type ComparisonRow = {
  topic: string;
  traditional: string;
  agile: string;
};

export const PROCUREMENT_LANDING = {
  title: "Procurement",
  intro: [
    "Procurement is how most government services come to exist. You buy them. Sometimes the whole thing, more often a part.",
    "Procurement is the whole journey to a signed contract and beyond. Working out what you need, deciding to buy, shaping the strategy, going to market, choosing a supplier, then living with the contract for as long as the service runs. The contract is one part of that journey, not all of it.",
    "This thread is your tour. It will not turn you into a procurement officer, and it does not replace the official rules. It tells you what happens at each stop, what only you can decide, and where to go for the binding detail.",
  ],
  scopeCallout:
    "Throughout this playbook the worked example is a critical grants and contributions application. The procurement rules here are general and apply to most buys. The grants and contributions example is there to make them concrete, not to fence them in.",
  whatStaysYours: {
    intro:
      "You are not the procurement officer. You will not run the competition or draft the legal clauses. So why learn any of this? Because the result is yours. When a service lets a user down, \"the supplier did it\" is not an answer anyone accepts. You are accountable, so a handful of things are yours and no one else's.",
    items: [
      {
        lead: "The shape of the trip.",
        body: "What the journey looks like and roughly how long, so the timelines do not blindside you.",
      },
      {
        lead: "The decisions only you can make.",
        body: "What problem you are solving, what outcomes you want, whether to reuse, buy, or build, and how to slice the work.",
      },
      {
        lead: "What you bring to each checkpoint.",
        body: "The approvals have moments, and each one expects something from you.",
      },
      {
        lead: "The responsibility that does not move.",
        body: "You can hand a supplier the work. You cannot hand them the accountability.",
      },
      {
        lead: "The long shadow of the buy.",
        body: "How today's contract shapes the whole later life of the service.",
      },
    ],
    close:
      "None of this asks you to be an expert. It asks you to stay in charge. Getting stuck is normal, and every stop below tells you where to turn.",
  },
  journeyIntro:
    "Here is the whole trip, stop by stop. You will not do all of it yourself, but you should recognise every stop and know what it needs from you.",
  journeySteps: [
    {
      label: "Look",
      title: "Look before you buy.",
      body: "Before you reach for a contract, ask whether you should. Work out the real problem, and whether buying is even the answer. Do you already own something that solves it? Could you reuse, adapt, or build instead? This step is not in PSPC's guidance, which starts after the decision to buy, so it sits with the Policy on the Planning and Management of Investments.",
      externalLinks: [
        {
          phrase: "Policy on the Planning and Management of Investments",
          linkKey: "policy-planning-investments",
        },
      ],
    },
    {
      label: "Team",
      title: "Build the team.",
      body: "A good procurement is a cross-functional team, not a handoff. You, the business owner. A procurement officer, the contracting authority, who runs the buy. End-user representatives. Subject-matter experts. You stay in the room the whole way.",
    },
    {
      label: "Ask",
      title: "Say the problem, not the solution.",
      body: "Write a challenge statement: what, who, when, where, why, and no solution baked in. Then your desired outcomes and the least you must have. Asking for objectives instead of dictating the work lets suppliers offer answers better than the one you would have written.",
    },
    {
      label: "Strategy",
      title: "Choose the strategy.",
      body: "Agile by default. Break a large buy into smaller, tightly scoped pieces that build on each other, using phased deliveries with go and no-go gates, or contracts with task authorizations. The case study just below shows the same programme bought two ways. One thing to be clear about: this is not contract splitting. Splitting is slicing the same work to slip under a threshold or dodge an approval, and it is against the rules. Buying in genuine increments is allowed and encouraged.",
    },
    {
      label: "Approve",
      title: "Get the approval level right, and check in at the right moment.",
      body: "This is the question everyone asks: when do I go to Treasury Board? While the value sits inside your department's own authority, governance stays in-house. When the total may exceed your authority, or the costs are still unknown, you engage Treasury Board, and the moment is the strategy stage, before you are committed. Bring the best information you have and a plan for the unknowns. Not at the end, when redoing it is slow and costly. Not so early there is nothing yet to judge.",
    },
    {
      label: "Engage",
      title: "Engage industry early, under clear rules.",
      body: "Talking to suppliers early makes your requirement sharper and your market clearer. Do it with ground rules written down first, so it stays fair to everyone.",
    },
    {
      label: "Award",
      title: "Solicit, evaluate, and award.",
      body: "Publish, assess, choose. The agile twist: you can judge real things, prototypes, demonstrations, tested increments, not just a written promise.",
    },
    {
      label: "Manage",
      title: "Manage the contract, and write down what you learned.",
      body: "The signature is the starting line, not the finish. What happens next lives in the regions below.",
    },
  ] satisfies ProcurementJourneyStep[],
  comparisonRows: [
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
      agile: "Early, in workshops and working sessions",
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
  ] satisfies ComparisonRow[],
  comparisonCaption:
    "Agile is not always faster. The payoff is confidence. You find the problems early, while they are still cheap to fix.",
  caseStudy: {
    intro: "The work does not change. The shape of the buying does.",
    risky: {
      heading: "Where this goes wrong",
      items: [
        "Treat the whole thing as one big, knowable block.",
        "Write one large contract and hand it to one supplier.",
        "Wait years for a single, distant delivery.",
        "If the supplier underperforms, the whole programme is in trouble.",
        "If needs change midway, you are locked into the old plan.",
      ],
    } satisfies CaseStudySide,
    safer: {
      heading: "What this protects",
      items: [
        "Accept that the whole thing is complex and not fully knowable yet.",
        "Name the real pieces: the architecture, the data move, each part of the service.",
        "Buy each piece as its own smaller contract, often to different suppliers.",
        "Each piece is due soon, so value shows up early and so do problems.",
        "If one supplier underperforms, replace that piece, not the whole programme.",
      ],
    } satisfies CaseStudySide,
  },
  goodLooksIntro:
    "A handful of things, all of which you can check. Each one has its own page.",
  whyItMatters: [
    "The contract decides the future of your service. What it costs over its life. Whether you can change it. Whether you can ever move off it. Most of that is settled the day you sign, and undoing it later is slow and expensive.",
    "A good buy leaves your options open. A bad one closes them quietly, for as long as the service runs, often without anyone noticing until it is too late.",
    "Buying the agile way lowers the worst risk of all, the two-year effort that ends in \"start over.\" When you can correct course along the way, you are never far from solid ground.",
  ],
  whoseJob: {
    text: "Your department's. You can give the building to a supplier, but the responsibility stays with you. If the service lets a user down, \"the contractor did it\" is not an answer anyone will accept. The Treasury Board Directive on the Management of Procurement says it in plainer policy terms. Your department is the business owner, accountable for the outcomes from start to finish. A procurement specialist, the contracting authority, runs the buying. You own the result. Keep that split in mind on every stop of this tour.",
    externalLinks: [
      {
        phrase: "Treasury Board Directive on the Management of Procurement",
        linkKey: "directive-procurement",
      },
    ],
  } satisfies LinkedProse,
  byRegionIntro:
    "Procurement runs through the whole life of a service, but it weighs more at some stages than others.",
  byRegion: [
    {
      region: "create" as const,
      weight: "heavy" as const,
      body: "Heaviest. Diagnose, set the strategy, go to market, award. Almost every decision that will bind you is made here.",
    },
    {
      region: "live" as const,
      weight: "medium" as const,
      body: "You have stopped buying. Now you hold the supplier to what was agreed, watch the relationship for drift, and keep the service improving so it does not quietly age into a forced replacement.",
    },
    {
      region: "sunset" as const,
      weight: "light" as const,
      body: "You are leaving. Plan the re-compete or the retirement well before the contract ends, because the move itself takes real time. Data moves, knowledge transfers, and what you bought is retired or replaced.",
    },
  ] satisfies WeightedRegionNote[],
  furtherReading: {
    text: "This thread sits under the Treasury Board Directive on the Management of Procurement, which takes an outcomes-based, lifecycle view of buying. Its closest internal companion is the PSPC Agile Procurement Guide, on the GC network, which this thread leans on for the agile patterns. It also draws on the Boots and Clarke guide to reforming IT procurement in Canada, the UK Service Manual, and Skylight's open agile procurement playbook, all translated to Canadian rules.",
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
  } satisfies LinkedProse,
  sources: PROCUREMENT_SOURCES,
};

/** @deprecated Use PROCUREMENT_LANDING */
export const CONTRACTING_LANDING = PROCUREMENT_LANDING;
