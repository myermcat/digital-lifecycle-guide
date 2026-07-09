import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Activity,
  Briefcase,
  Eye,
  Map,
  PenTool,
  Scale,
  Shield,
  Target,
  Users,
} from "lucide-react";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";

export const DISCOVERY_EXTRACT = {
  opening: {
    text: "Discovery is the first sub-phase of Create, and nothing is built in it. The team works out:",
    bold: [{ phrase: "nothing is built in it" }],
  } satisfies ThreadLinkedProse,
  workOutItems: [
    "what the real problem is",
    "who has it",
    "whether a new service is even the right answer",
  ],
  closing: {
    text: "Set a goal at the start so the work stays scoped.",
  } satisfies ThreadLinkedProse,
};

export const DISCOVERY_EXTRACT_CLOSING: ThreadLinkedProse = {
  text: "Discovery can end in a decision not to build, and that is a success.",
  bold: [{ phrase: "Discovery can end in a decision not to build, and that is a success." }],
};

export const DISCOVERY_ON_RAMP = {
  title: "Before you start Discovery",
  intro:
    "A discovery goes badly when the basics are not in place first. These are the things to have before you begin:",
  items: [
    {
      text: "A business owner sponsors the work and can act on what it finds.",
      bold: [{ phrase: "business owner" }],
    },
    {
      text: "A small, dedicated team is available, and its members are not split across other projects.",
      bold: [{ phrase: "small, dedicated team" }],
    },
    {
      text: "There is budget to run the research. This is usually covered by the department's existing operating budget, so it needs no Treasury Board submission; the request for new money to build comes later. Funding explains where money comes from.",
      bold: [{ phrase: "budget to run the research" }],
      internalLinks: [{ phrase: "Funding", to: "/thread/funding" }],
    },
    {
      text: "The team is genuinely free to stop, if what it finds points that way.",
      bold: [{ phrase: "genuinely free to stop" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const DISCOVERY_PILLAR = {
  label: "THE MAKE-OR-BREAK QUESTION",
  title: "Reuse, buy, or build",
  body: {
    text: "Most Government of Canada services are met by something that already exists: bought from a vendor, reused from another department, or configured from a platform the government already runs. Before any solution is named, Discovery weighs those options, and it makes sure the service will not duplicate one that already exists. Sometimes clearer information or a change to a form is enough, with no new service at all. Get this wrong and everything after it is built on the wrong foundation.",
    bold: [{ phrase: "something that already exists" }],
  } satisfies ThreadLinkedProse,
  href: "/reference/options-analysis",
  linkLabel: "See how to weigh the options →",
  icon: Scale,
};

export type DiscoveryAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  sections: readonly ThreadContentSection[];
};

export const DISCOVERY_ACCORDION = {
  id: "what-to-find-out",
  title: "What to find out in Discovery",
} as const;

export const DISCOVERY_ACCORDION_STAGES: readonly DiscoveryAccordionStage[] = [
  {
    id: "goal-and-problem",
    icon: Target,
    title: "Set a goal, and define the problem.",
    sections: [
      {
        text: "Start by setting a clear goal for the discovery. It keeps the work scoped and tells you when you are done.",
        bold: [{ phrase: "clear goal" }],
      },
      {
        text: "At the start you are often handed a solution: someone has decided the answer is a new portal, app, or system. Turn that back into a problem. Interrogate the solution, break down assumptions, and agree what is not part of the problem.",
        bold: [{ phrase: "Turn that back into a problem." }],
      },
      {
        text: "It also helps to put a number on it: how much the problem costs today in staff time, delays, and failed applications. That feeds the business case later.",
        bold: [{ phrase: "put a number on it" }],
      },
      {
        type: "editorialNote",
        label: "Example",
        paragraphs: [
          {
            text: 'A program team asks for "a new online portal so organizations can apply for our grant." Reframed, the problem is: "How can an organization apply for this grant, and report on how the money was spent, without phoning their program officer three times and re-entering information they already gave us?" The second version is something the team can research, and it points at fixes the portal idea would miss.',
          },
        ],
      },
    ],
  },
  {
    id: "users-and-context",
    icon: Users,
    title: "Understand your users and their context.",
    sections: [
      {
        text: "Through user research, learn what users are trying to achieve and how they go about it today. For example, for a grants-and-contributions service, talk to:",
        internalLinks: [{ phrase: "user research", to: "/thread/user-research" }],
      },
      {
        type: "unorderedList",
        items: [
          "applicants and the organizations receiving funds",
          "program officers and anyone helping an applicant through",
          "operations and call-centre colleagues, since the journey runs across offline channels too",
        ],
      },
      {
        text: "What the user is trying to do is almost always one step in a longer journey, so map that whole journey across every channel and service it touches, drawn from the real journeys people describe. This is the start of joined-up delivery. The journey map is Discovery's key artefact; group the pain points you hear and agree the one or two worth solving.",
        bold: [{ phrase: "one step in a longer journey" }],
        internalLinks: [{ phrase: "joined-up delivery", to: "/thread/joined-up-delivery" }],
      },
    ],
  },
  {
    id: "accessibility",
    icon: Accessibility,
    title: "Design for accessibility from the start.",
    sections: [
      {
        text: "Learn enough about users' accessibility needs to know whether the problem space presents particular barriers. Accessibility is a legal duty for a Government of Canada service, and it is far cheaper to design in now than to add later. Accessibility covers the obligation and how to meet it.",
        bold: [{ phrase: "legal duty" }],
        internalLinks: [{ phrase: "Accessibility", to: "/thread/accessibility" }],
      },
    ],
  },
  {
    id: "constraints",
    icon: Shield,
    title: "Understand the constraints.",
    sections: [
      {
        text: "Work out the constraints you would face if you move on to the Alpha sub-phase: legislation, existing contracts, legacy technology, and established processes. Sort them into two kinds:",
        internalLinks: [{ phrase: "Alpha sub-phase", to: "/create-alpha" }],
      },
      {
        type: "orderedList",
        items: [
          {
            bold: "Hard constraints",
            text: " that will not move, such as the law a program runs under. The service has to work within these.",
          },
          {
            bold: "Soft constraints",
            text: " that feel fixed but can be changed, such as an internal process that makes things worse. Work on these directly rather than around them.",
          },
        ],
      },
      {
        text: "If a hard constraint means the service could never be better than what already exists, that is a strong signal to stop at the end of Discovery.",
        bold: [{ phrase: "stop" }],
      },
    ],
  },
  {
    id: "measure-success",
    icon: Activity,
    title: "Decide how you'll measure success.",
    sections: [
      {
        text: 'Decide what "working" will mean, and record today\'s baselines, such as how long an application takes or how many fail, so later improvement can be seen. Monitoring and instrumentation covers the signals and targets.',
        bold: [{ phrase: "baselines" }],
        internalLinks: [
          {
            phrase: "Monitoring and instrumentation",
            to: "/thread/monitoring-and-instrumentation",
          },
        ],
      },
    ],
  },
  {
    id: "work-in-the-open",
    icon: Eye,
    title: "Work in the open.",
    sections: [
      {
        text: "Unless confidentiality prevents it, share what you are learning through short show-and-tells and posts others can read. Working in the open is one of the Government of Canada's digital standards. It surfaces work already done elsewhere and makes reuse more likely.",
        externalLinks: [{ phrase: "digital standards", linkKey: "digital-standards" }],
      },
    ],
  },
];

export const DISCOVERY_TEAM = {
  title: "The team you need",
  intro: {
    text: "Discovery needs a small, multidisciplinary team, dedicated to it. The minimum roles (one person can hold more than one):",
    bold: [{ phrase: "minimum roles" }],
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "User researcher",
      icon: Map,
      body: { text: "runs the research and interviews." },
    },
    {
      role: "Designer",
      icon: PenTool,
      body: { text: "maps the journey and shapes early thinking." },
    },
    {
      role: "Business and policy lead",
      icon: Briefcase,
      body: { text: "knows the program, the rules, and the constraints." },
    },
    {
      role: "Business owner",
      icon: Users,
      body: { text: "steers the work and owns the decision to go on or stop." },
    },
  ] satisfies readonly SubphaseTeamRole[],
  closing: {
    text: "In the Government of Canada the team is usually assembled from a mix of public servants and vendors. A discovery is short: four to eight weeks is typical.",
    bold: [{ phrase: "four to eight weeks" }],
  } satisfies ThreadLinkedProse,
};

export const DISCOVERY_CAUTION = {
  title: "When Discovery goes wrong",
  items: [
    "The team runs with the solution it was handed and never asks what the real problem is.",
    "No goal was set, so the work drifts and never finishes.",
    "The people who actually live with the problem are never spoken to.",
    "Someone starts building, or picks a vendor, before the problem is understood.",
    "A constraint that would kill the idea surfaces late, after months of work.",
  ],
};

export const DISCOVERY_FINISH = {
  title: "How you know Discovery is finished",
  sectionId: "how-you-know-discovery-is-finished",
  intro: {
    text: "Discovery is finished when you have decided whether or not to move on to Alpha. That decision weighs two things: whether there is a viable service worth building, and whether it is cost-effective to pursue.",
    bold: [{ phrase: "decided whether or not to move on to Alpha" }],
  } satisfies ThreadLinkedProse,
  exits: [
    {
      lead: "Forward to Alpha,",
      rest: {
        text: "when the problem is real and worth solving.",
      },
      href: "/create-alpha",
    },
    {
      lead: "Stop or pause,",
      rest: {
        text: "when the evidence says it is not worth building. Stopping here is a success, and it saves the money a wrong build would have cost.",
        bold: [{ phrase: "success" }],
      },
    },
  ],
  offRamp: {
    intro: {
      text: "Before you move to Alpha, have ready:",
      bold: [{ phrase: "Alpha" }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "The wider context. The other services and teams in the problem space.",
        bold: [{ phrase: "The wider context." }],
      },
      {
        text: "A ranked list of ideas to test in Alpha, and which one first.",
        bold: [{ phrase: "A ranked list of ideas" }],
      },
      {
        text: "A rough team for Alpha.",
        bold: [{ phrase: "A rough team" }],
      },
      {
        text: "A way to measure success.",
        bold: [{ phrase: "A way to measure success." }],
      },
      {
        text: "The funding path for Alpha, lined up early, since it takes time to arrange.",
        bold: [{ phrase: "The funding path for Alpha," }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};

export const DISCOVERY_SECTION_NAV = {
  next: { href: "/create-alpha", label: "Alpha" },
};
