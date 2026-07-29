import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Code2,
  Compass,
  Gauge,
  Layers,
  LifeBuoy,
  Megaphone,
  Repeat,
  Server,
  Shield,
  ShoppingCart,
} from "lucide-react";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";

export const GROWTH_LEAD: ThreadLinkedProse = {
  text: "Growth is when the team builds again. The service is steady underneath, and the work turns to what comes next: the features the first version left out, the people the service has not reached yet, the load it has not yet carried. Each significant addition is built inside a running service, and it must not break what already works.",
};

export const GROWTH_ON_RAMP = {
  title: "Before you start Growth",
  intro:
    "Growth starts when a steady service has real new capability waiting to be built. Have these ready:",
  items: [
    {
      text: "A steady service. Stabilization's exit test met, and the running team standing on its own.",
      bold: [{ phrase: "A steady service." }],
      internalLinks: [{ phrase: "Stabilization", to: "/live-stabilization" }],
    },
    {
      text: "The addition named, with evidence it is needed: research findings, a mandate, or demand the service cannot meet as it is.",
      bold: [{ phrase: "The addition named," }],
    },
    {
      text: "The money for the new work. New capability is funded on its own, and the approval lead time is real.",
      bold: [{ phrase: "The money for the new work." }],
    },
    {
      text: "The contract room checked: what the task-authorization ceiling and the option years still hold, before any dates are promised.",
      bold: [{ phrase: "The contract room checked:" }],
    },
    {
      text: "A team that can build again: the running roles stay, and build capacity returns beside them.",
      bold: [{ phrase: "A team that can build again:" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const GROWTH_PILLAR = {
  label: "THE MAKE-OR-BREAK QUESTION",
  title: "Treat every significant addition as its own small project",
  body: {
    text: "A live service makes building feel cheap: the platform exists, the users are there, and a new feature seems one release away. That feeling skips the work that made the service good the first time. A significant addition changes what the service is, so it gets its own small Discovery, Alpha, and Beta, sized to the feature, and it brings the earlier checkpoints back: privacy, automation, architecture, procurement.",
    bold: [{ phrase: "its own small Discovery, Alpha, and Beta" }],
  } satisfies ThreadLinkedProse,
  href: "/create",
  linkLabel: "See the full build cycle →",
  icon: Repeat,
};

export type GrowthAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  sections: readonly ThreadContentSection[];
};

export const GROWTH_ACCORDION = {
  id: "running-your-service",
  title: "Running your service in Growth",
} as const;

export const GROWTH_ACCORDION_STAGES: readonly GrowthAccordionStage[] = [
  {
    id: "build-in-small-lifecycles",
    icon: Layers,
    title: "Build each addition through its own small lifecycle.",
    sections: [
      {
        text: "The cycle that built the service builds each significant feature: a small discovery to learn who needs it and what problem it solves, throwaway prototypes while the idea is cheap to change, then a real build proven with a small group before everyone gets it. Size it to the feature: a small improvement needs a conversation and a sketch; a big one needs the full pass.",
        bold: [{ phrase: "Size it to the feature:" }],
      },
      {
        text: "The checkpoints come back with the significant ones:",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Privacy. When the addition changes what personal information the service uses to make decisions about people, the privacy assessment is updated before it goes live.",
            bold: [{ phrase: "Privacy." }],
          },
          {
            text: "Automation. An addition that automates decisions needs its Algorithmic Impact Assessment published before it reaches production, under the Directive on Automated Decision-Making.",
            bold: [{ phrase: "Automation." }],
            externalLinks: [
              {
                phrase: "Directive on Automated Decision-Making",
                linkKey: "directive-automated-decision-making",
              },
            ],
          },
          {
            text: "Architecture. A big enough initiative goes back through the department's architecture review board, and the largest, above Treasury Board's cost thresholds, reach GC EARB (the Government of Canada Enterprise Architecture Review Board).",
            bold: [{ phrase: "Architecture." }],
            externalLinks: [
              {
                phrase: "GC EARB",
                linkKey: "gc-enterprise-architecture-framework",
              },
            ],
          },
          {
            text: "Procurement. New work is bought, and buying it well is the next block down.",
            bold: [{ phrase: "Procurement." }],
          },
        ],
      },
      {
        text: "Two more things follow a significant addition. New code is new attack surface, so the security testing that ran before launch runs again for a major change. And a redesigned online service must give clients real-time application status, a requirement of the Directive on Service and Digital that every redesign re-invokes.",
        bold: [{ phrase: "New code is new attack surface," }],
        internalLinks: [{ phrase: "security testing", to: "/thread/security" }],
        externalLinks: [
          {
            phrase: "Directive on Service and Digital",
            linkKey: "directive-on-service-and-digital",
          },
        ],
      },
      {
        text: "After each major launch, a short Stabilization-style window: watched daily, fixed fast, until the new part is boring too.",
        bold: [{ phrase: "a short Stabilization-style window" }],
      },
    ],
  },
  {
    id: "buy-the-new-work-well",
    icon: ShoppingCart,
    title: "Buy the new work well.",
    sections: [
      {
        text: "The features Growth builds could not be named when the contract was signed, and a good contract expected that: new work arrives through task authorizations, each task described, priced at the contract's rates, and approved in writing before it starts, within the contract's scope and its ceiling. What a good contract looks like shows the clauses.",
        bold: [{ phrase: "a good contract expected that" }],
        externalLinks: [
          { phrase: "task authorizations", linkKey: "task-authorizations" },
        ],
        internalLinks: [
          { phrase: "What a good contract looks like", to: GOOD_CONTRACT_PATH },
        ],
      },
      {
        text: "Where an addition falls decides how it is bought:",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "Within the contract's scope:",
            text: " a task authorization, priced and approved.",
          },
          {
            bold: "Stretching the terms:",
            text: " an amendment, and each one needs its justification.",
          },
          {
            bold: "Outside the scope:",
            text: " a new procurement, because an amendment cannot lawfully grow a contract into something the original competition never covered.",
          },
        ],
      },
      {
        text: "Growth by endless amendment is the lock-in trap: each stretch makes the supplier harder to leave. When the additions stop fitting the contract, compete them.",
        bold: [{ phrase: "Growth by endless amendment is the lock-in trap:" }],
      },
    ],
  },
  {
    id: "work-on-adoption",
    icon: Megaphone,
    title: "Work on adoption until the people arrive.",
    sections: [
      {
        text: "A service can grow features while its use stands still. Growth includes the people:",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "Tell them.",
            text: " Promote the service through the doors people already use: the program's letters, the call centre, the services on either side.",
          },
          {
            bold: "Watch the numbers.",
            text: " Who arrives, who finishes, who comes back. A feature that changes none of them was built on a guess.",
          },
          {
            bold: "Keep the other doors open.",
            text: " The people the online service excludes still need the phone and the paper way while the need remains, and every channel keeps up with the features as they arrive.",
          },
        ],
      },
      {
        text: "Change management covers winning adoption inside the department; the journey on either side of the service belongs to joined-up delivery.",
        internalLinks: [
          { phrase: "Change management", to: "/thread/change-management" },
          { phrase: "joined-up delivery", to: "/thread/joined-up-delivery" },
        ],
      },
    ],
  },
  {
    id: "scale-with-the-users",
    icon: Gauge,
    title: "Scale the service with its users.",
    sections: [
      {
        text: "More users arrive with more than traffic:",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "The infrastructure.",
            text: " Re-run the capacity and performance testing as load rises; the headroom measured at launch shrinks as use grows.",
          },
          {
            bold: "The support.",
            text: " More users mean more calls. Scale the support staffing before the wave, and listen to what the calls say about each new feature.",
          },
        ],
      },
      {
        text: "The money scales too. Usage-based costs rise with use, so revisit the operating budget as the numbers move and flag the growth to funding before it outruns the envelope.",
        bold: [{ phrase: "The money scales too." }],
        internalLinks: [{ phrase: "funding", to: "/thread/funding" }],
      },
    ],
  },
  {
    id: "protect-the-running-service",
    icon: Shield,
    title: "Protect the running service while you build.",
    sections: [
      {
        text: "The people already using the service outnumber the people the new feature is for, and their service keeps its floor. The health cycle turns through every build: monitoring read, patches applied, small releases through the same pipeline. Build capacity and running capacity are separate lines; when the same people hold both, the build wins and the floor slips.",
        bold: [{ phrase: "their service keeps its floor" }],
        internalLinks: [
          { phrase: "monitoring", to: "/thread/monitoring-and-instrumentation" },
        ],
      },
      {
        text: "Release each addition so it can fail small: behind a flag, to a small group first, easy to reverse. Releasing changes covers the practice.",
        bold: [{ phrase: "fail small" }],
        internalLinks: [
          { phrase: "Releasing changes", to: "/thread/releasing-changes" },
        ],
      },
    ],
  },
];

export const GROWTH_TEAM = {
  title: "The team you need",
  intro: {
    text: "Growth runs two kinds of work at once, building and running, so the team holds both shapes (one person can hold more than one role):",
    bold: [{ phrase: "two kinds of work at once" }],
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "Product and research",
      icon: Compass,
      body: {
        text: "run the small discoveries: who needs each addition, what problem it solves, and whether it worked.",
      },
    },
    {
      role: "Developers, supplier or in-house",
      icon: Code2,
      body: {
        text: "build the additions, as new paid work under the contract or by assignment in-house.",
      },
    },
    {
      role: "Operations",
      icon: Server,
      body: { text: "keep the running service to its floor while the building happens." },
    },
    {
      role: "Support lead",
      icon: LifeBuoy,
      body: {
        text: "scales the help as the users arrive, and reports what the calls say about each new feature.",
      },
    },
    {
      role: "Business owner of the application",
      icon: Briefcase,
      body: {
        text: "decides which additions are worth building, and owns the scope, the money, and the contract room they consume.",
      },
    },
  ] satisfies readonly SubphaseTeamRole[],
  closing: {
    text: "Growth has no set length. It runs while there is real new capability worth building, and the team holds this shape for as long as it does.",
    bold: [{ phrase: "Growth has no set length." }],
  } satisfies ThreadLinkedProse,
};

export const GROWTH_CAUTION = {
  title: "When Growth goes wrong",
  items: [
    "A significant feature goes live without its checkpoints: the assessments still describe the service as it was.",
    "Growth by endless amendment: the contract stretches until leaving the supplier stops being possible.",
    "The build starves the running service: everyone is on the new feature, and the health cycle stops turning.",
    "Nobody asked the users: capability grows, adoption stands still, and the roadmap is a wish list.",
    "The launch is treated as small because the service is live, so the new feature reaches everyone at once, untested under load.",
  ],
};

export const GROWTH_FINISH = {
  title: "How you know Growth is finished",
  sectionId: "how-you-know-growth-is-finished",
  intro: {
    text: "Growth is finished when the scope settles: the roadmap holds no significant addition worth building next, and the work in front of the team is sustaining, improving in small steps, and renewing.",
    bold: [{ phrase: "Growth is finished when the scope settles:" }],
  } satisfies ThreadLinkedProse,
  followUp: [
    {
      text: "A service can return to Growth later. The next mandate reopens it the same way it opened the first time: a named addition, evidence, money, and room in the contract.",
    },
  ] satisfies ThreadLinkedProse[],
  exits: [
    {
      lead: "Onward to Maturity,",
      rest: {
        text: "when the scope has settled and the work turns to keeping the service healthy year after year.",
      },
      href: "/live-maturity",
    },
    {
      lead: "Back toward a rebuild,",
      rest: {
        text: "when the additions reveal a foundation that cannot carry them, and extending has become harder than starting over. This is rare, and it is a Create-sized decision.",
      },
    },
  ],
  offRamp: {
    intro: {
      text: "Before you settle into Maturity, have ready:",
      bold: [{ phrase: "have ready" }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "The assessments current for the service as it now is: privacy, security, and the accessibility testing, each covering the additions.",
        bold: [{ phrase: "The assessments current" }],
      },
      {
        text: "The adoption where it should be, or the reason it is not written down.",
        bold: [{ phrase: "The adoption where it should be," }],
      },
      {
        text: "The contract room known: what the ceiling, the options, and the support terms still hold for the years ahead.",
        bold: [{ phrase: "The contract room known:" }],
      },
      {
        text: "The renewal calendar handed to the running team, with every end date and its start-by date beside it.",
        bold: [{ phrase: "The renewal calendar handed to the running team," }],
      },
      {
        text: "The knowledge current: what each addition changed, written into the runbooks and the decisions.",
        bold: [{ phrase: "The knowledge current:" }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};
