import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Code2,
  Compass,
  FileSignature,
  Gauge,
  PencilRuler,
  Route,
  Search,
  Server,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import type { LifecycleVisualAsset } from "@/lib/lifecycle-visuals";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";

export const BETA_EXTRACT = {
  opening: {
    text: "Beta is the third sub-phase of Create. The team takes the tested idea from Alpha and:",
  } satisfies ThreadLinkedProse,
  workOutItems: [
    "signs the contract for the build.",
    "builds or configures the real thing, at production quality.",
    "proves it with real people, in a private beta and then a public beta.",
  ],
  scoped: {
    text: "Beta is scoped to one department standing up one service, whether it is bought, reused, or built.",
  } satisfies ThreadLinkedProse,
};

export const BETA_EXTRACT_CLOSING: ThreadLinkedProse = {
  text: "A service in Beta is real, but it is not yet the official one.",
  bold: [{ phrase: "A service in Beta is real, but it is not yet the official one." }],
};

export const BETA_STAGES = {
  title: "Private Beta and Public Beta",
  opening: {
    text: "There are two stages to Beta: private and public.",
  } satisfies ThreadLinkedProse,
  privateBeta: {
    text: "Private beta. Beta starts private. A limited number of people are invited to use the real service, so the team can get feedback and improve it while the audience is still small enough to apologise to.",
    bold: [{ phrase: "Private beta." }],
  } satisfies ThreadLinkedProse,
  publicBeta: {
    text: "Public beta. Once the service has been improved and the team is confident it can be run at scale, it opens to anyone who needs it.",
    bold: [{ phrase: "Public beta." }],
  } satisfies ThreadLinkedProse,
  keepOldService: {
    text: "If the service is replacing an existing one, keep the old service running until the new one is properly live. Beta is not the moment to switch it off.",
  } satisfies ThreadLinkedProse,
  notLaunch: {
    text: "Neither stage is a launch. Launch is when the service becomes the official one for everyone and the old way is retired, and that is what ends Beta.",
  } satisfies ThreadLinkedProse,
};

export const BETA_ON_RAMP = {
  title: "Before you start Beta",
  intro:
    "The minimum you should already have. These are things you bring IN, not things Beta produces.",
  items: [
    {
      text: "A tested idea from Alpha, and evidence it works for real people.",
      internalLinks: [{ phrase: "Alpha", to: "/create-alpha" }],
    },
    {
      text: "A decision on whether to reuse, buy, or build, and the reasoning written down.",
    },
    {
      text: "Funding and approval for the build, not only for the research.",
    },
    {
      text: "A named product owner with the authority to make decisions.",
    },
    {
      text: "The accessibility audit booked, since an auditor takes weeks to arrange.",
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const BETA_PILLAR = {
  label: "THE CONTRACT",
  title: "The contract you sign here will outlive the service",
  icon: FileSignature,
  bodyIntro: {
    text: "Beta is when the department signs the contract for the build. It is the only moment it has real leverage, because nothing has been committed yet.",
    bold: [{ phrase: "only moment it has real leverage" }],
  } satisfies ThreadLinkedProse,
  listIntro: {
    text: "Everything that makes a service possible to leave later is won or lost at signature:",
  } satisfies ThreadLinkedProse,
  listItems: [
    {
      text: "exit rights and data portability, written in from the start",
      bold: [{ phrase: "exit rights and data portability" }],
    },
    {
      text: "the code in a repository the department controls, from day one",
      bold: [{ phrase: "the code in a repository the department controls" }],
    },
    {
      text: "the end date, and the real lead time for renewing or re-competing",
      bold: [{ phrase: "the end date, and the real lead time" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
  closing: {
    text: "A service that was never designed to be left is expensive to leave, and by then the department has no leverage at all. Procurement covers how to buy, and what a good contract looks like sets out the clauses.",
    internalLinks: [
      { phrase: "Procurement", to: "/thread/procurement" },
      { phrase: "what a good contract looks like", to: GOOD_CONTRACT_PATH },
    ],
  } satisfies ThreadLinkedProse,
};

export type BetaAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  headerVisual?: LifecycleVisualAsset;
  sections: readonly ThreadContentSection[];
};

export const BETA_ACCORDION = {
  id: "what-to-build-and-prove",
  title: "What to build and prove in Beta",
} as const;

export const BETA_ACCORDION_STAGES: readonly BetaAccordionStage[] = [
  {
    id: "build-smallest-real-thing",
    icon: Wrench,
    title: "Build the smallest real thing that works end to end.",
    sections: [
      {
        text: "This is the first code, or the first configuration, meant to survive. Most Government of Canada services are bought, reused, or configured rather than written from scratch, and Beta is where that product is actually stood up.",
        bold: [{ phrase: "bought, reused, or configured" }],
      },
      {
        text: "Build the simplest thing that meets the need, all the way through the journey. A service that handles the first three steps beautifully and then stops is not usable by anyone.",
        bold: [{ phrase: "simplest thing that meets the need, all the way through the journey" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Do not polish the Alpha prototype into the real thing. It was built to be thrown away and it carries every shortcut that was taken on that understanding. Start again, properly.",
            bold: [{ phrase: "Do not polish the Alpha prototype into the real thing." }],
          },
          {
            text: "Set up the pipeline that will release changes safely, small and often, because it is needed from the first day the service is live.",
            internalLinks: [{ phrase: "release changes", to: "/thread/releasing-changes" }],
          },
          {
            text: "Design security in now, while changing the design is still cheap.",
            internalLinks: [{ phrase: "security", to: "/thread/security" }],
          },
          {
            text: "Do the Privacy Impact Assessment before the service opens. Privacy covers what it involves.",
            internalLinks: [{ phrase: "Privacy", to: "/thread/privacy" }],
          },
          {
            text: "Inventory the dependencies the service will rest on, and know who patches them.",
            internalLinks: [
              { phrase: "dependencies", to: "/thread/dependencies-and-standards" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "private-beta",
    icon: UserCheck,
    title: "Private beta: prove it with a few real people.",
    sections: [
      {
        text: "A private beta is invite-only. It is not a soft launch, and it is not announced.",
        bold: [{ phrase: "invite-only" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Choose who is in it. A small, invited group uses the real service, for real. Their money, their claim, their permit. Nothing is pretend.",
            bold: [{ phrase: "Choose who is in it." }],
          },
          {
            text: "Cap the volume. Keep control of how many transactions go through, so a fault costs a handful of people rather than a province.",
            bold: [{ phrase: "Cap the volume." }],
          },
          {
            text: "Find what is broken while the audience is small enough to apologise to.",
            bold: [{ phrase: "Find what is broken while the audience is small enough to apologise to." }],
          },
        ],
      },
      {
        text: "The gate out of private beta: the service works end to end, for a real person, without anyone stepping in behind the scenes to rescue it. Keep the private beta running until that is true.",
        bold: [{ phrase: "The gate out of private beta:" }, { phrase: "end to end" }],
      },
    ],
  },
  {
    id: "public-beta",
    icon: Users,
    title: "Public beta: open it to anyone who needs it.",
    sections: [
      {
        text: "Public beta is the real service, available to the public, running alongside the old way.",
        bold: [{ phrase: "alongside the old way" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Keep the old service running. People who cannot or will not switch yet must still be able to get what they need. Beta is not the moment to switch the old way off.",
            bold: [{ phrase: "Keep the old service running." }],
          },
          {
            text: "Fix the accessibility findings before you open, and publish the service's accessibility page. The accessibility audit is a legal duty and an auditor takes weeks to arrange.",
            internalLinks: [{ phrase: "accessibility", to: "/thread/accessibility" }],
          },
          {
            text: "Be able to run it at scale, and to keep improving it while the public is using it.",
            bold: [{ phrase: "run it at scale" }],
          },
        ],
      },
      {
        text: "Proving is not launching. Launch is when the service becomes the official one for everyone and the old way is finally retired. That is what ends Beta. A service that goes straight from prototype to everyone has never actually been tested.",
        bold: [{ phrase: "Proving is not launching." }, { phrase: "the official one for everyone" }],
      },
    ],
  },
  {
    id: "build-dashboard",
    icon: Gauge,
    title: "Build the dashboard, and decide who owns it.",
    headerVisual: LIFECYCLE_VISUALS.serviceDashboard,
    sections: [
      {
        text: "The service needs to be watchable from the day it goes live, so the dashboard is built here rather than after.",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Decide the few numbers that will tell you whether the service is working, and instrument the service to emit them. Monitoring covers what to measure and how.",
            internalLinks: [
              { phrase: "Monitoring", to: "/thread/monitoring-and-instrumentation" },
            ],
          },
          {
            text: "Name whose job the dashboard is. It is often the vendor who builds it, which means it has to be written into the contract, or it will not exist.",
            bold: [{ phrase: "Name whose job the dashboard is." }],
          },
          "Make sure the department can read the dashboard without asking the supplier.",
        ],
      },
    ],
  },
  {
    id: "ready-to-run",
    icon: Server,
    title: "Get ready to run it.",
    sections: [
      {
        text: "A service that nobody is staffed to operate will decay from its first week.",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Assemble the team that will run the service after launch, and keep enough of it in-house to govern the work.",
            internalLinks: [{ phrase: "team", to: "/thread/team-capability" }],
          },
          {
            text: "Staff the support before the public arrives. Some people will struggle with the service in ways nobody predicted, and support has to be able to cope. Plan the help for people who cannot use it on their own.",
            bold: [{ phrase: "Staff the support before the public arrives." }],
          },
          {
            text: "Make sure the service works across every channel people actually use, including the letters it sends and the call centre that answers for it.",
            bold: [{ phrase: "every channel people actually use" }],
          },
          {
            text: "Plan the adoption. A delivered service that nobody switches to has failed. Change management covers winning that switch.",
            internalLinks: [{ phrase: "Change management", to: "/thread/change-management" }],
          },
        ],
      },
    ],
  },
];

export const BETA_TEAM = {
  title: "The team you need",
  intro: {
    text: "Beta is the longest and most expensive part of Create. Expect months, and expect the cost to be dominated by the build or the configuration.",
    bold: [{ phrase: "months" }],
  } satisfies ThreadLinkedProse,
  keepTeam: {
    text: "Keep the Alpha team on. The people who did the research and the prototyping carry the empathy, the context, and the momentum. Handing the service to a fresh team at the moment it becomes real throws all three away.",
    bold: [{ phrase: "Keep the Alpha team on." }],
  } satisfies ThreadLinkedProse,
  rolesIntro: {
    text: "The minimum roles to sustain Beta. One person can hold more than one.",
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "Product owner",
      icon: Compass,
      body: {
        text: "decides what is in the first real version and what waits, and holds the authority to say no.",
      },
    },
    {
      role: "Delivery manager",
      icon: Route,
      body: {
        text: "keeps the build moving and holds the timeline against the launch date.",
      },
    },
    {
      role: "Developers or a supplier team",
      icon: Code2,
      body: { text: "build or configure the real service." },
    },
    {
      role: "Designer",
      icon: PencilRuler,
      body: {
        text: "takes the service from a proven idea to something people can actually use.",
      },
    },
    {
      role: "User researcher",
      icon: Search,
      body: {
        text: "runs the proving with real users, and keeps finding what is broken.",
      },
    },
    {
      role: "Operations",
      icon: Server,
      body: { text: "stand up what the service runs on, and prepare to run it." },
    },
    {
      role: "Contracting authority",
      icon: FileSignature,
      body: {
        text: "signs the contract, and is the one person who can hold the supplier to the exit clauses.",
      },
    },
    {
      role: "Business owner of the application",
      icon: Briefcase,
      body: {
        text: "accepts the risk that remains, funds the work, and gives the go-ahead to launch.",
      },
    },
  ] satisfies readonly SubphaseTeamRole[],
};

export const BETA_CAUTION = {
  title: "When Beta goes wrong",
  lead: "The signs to watch for:",
  items: [
    {
      heading: "The prototype was promoted.",
      line: "Alpha's throwaway code became the real service, and it carries every shortcut taken when it was meant to be discarded.",
    },
    {
      heading: "The contract was signed in a hurry.",
      line: "No exit rights, no data portability, the code in the supplier's repository. The department is now renting its own service.",
    },
    {
      heading: "Proving was skipped.",
      line: "The service went from prototype to everyone, so its first real users are the entire public.",
    },
    {
      heading: "Nobody owns the dashboard.",
      line: "The service is live and blind, and the only party who can see it is the supplier.",
    },
    {
      heading: "The team that built it is not the team that will run it,",
      line: "and nothing was written down.",
    },
    {
      heading: "Launch became the goal.",
      line: "The date is being defended rather than the service, and quality is being traded away to hit it.",
    },
  ],
};

export const BETA_FINISH = {
  title: "How you know Beta is finished",
  sectionId: "how-you-know-beta-is-finished",
  intro: {
    text: "The finish criteria. Beta is done when the service has been through private beta and then public beta, has been used by real people at scale, and held. It delivers the whole journey, end to end. The accessibility audit is passed and its findings fixed, the privacy assessment is done, the dashboard is live, and the support is staffed.",
    bold: [{ phrase: "The finish criteria." }],
  } satisfies ThreadLinkedProse,
  followUp: {
    text: "The last test is the one this guide exists for: the department can support the service, and keep improving it, every year until it is replaced or retired. If it cannot, the service is not ready to launch, however well it demos.",
    bold: [{ phrase: "The last test" }],
  } satisfies ThreadLinkedProse,
  exits: [
    {
      lead: "Forward to Stabilization,",
      rest: {
        text: "when the service launches and becomes the official one for everyone. The work turns from building it to steadying it.",
      },
      href: "/live-stabilization",
    },
    {
      lead: "Back to Alpha,",
      rest: {
        text: "when proving with real users shows the approach does not work, and it needs rethinking before more money goes into it.",
      },
      href: "/create-alpha",
    },
    {
      lead: "Stop,",
      rest: {
        text: "when the evidence says the service should not launch at all. This is rare and it is expensive, and it is still cheaper than launching something that does not work.",
      },
    },
  ],
  offRamp: {
    intro: {
      text: "Off-ramp to-do. Before you move to Stabilization, have ready:",
      bold: [{ phrase: "Off-ramp to-do." }, { phrase: "Stabilization" }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "The contract signed, with the exit rights, the data portability, and the code repository in it.",
      },
      {
        text: "The accessibility audit passed.",
      },
      {
        text: "The Privacy Impact Assessment completed and acted on.",
      },
      {
        text: "The dashboard live, and a named person who owns it.",
      },
      {
        text: "The support model staffed and reachable.",
      },
      {
        text: "The team that will run the service named, and enough of it in-house to govern the work.",
      },
      {
        text: "The old way still running, with a dated plan to retire it once the new service is properly live. It is not switched off in Beta.",
        bold: [{ phrase: "still running" }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};

export const BETA_SECTION_NAV = {
  prev: { href: "/create-alpha", label: "Alpha" },
  next: { href: "/live-stabilization", label: "Stabilization" },
};
