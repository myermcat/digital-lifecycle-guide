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
import type { SectionNavLink } from "@/components/SubphaseSectionNav";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";

export const DISCOVERY_EXTRACT = {
  spine: "Discovery exists to understand the problem before anything is committed.",
  opening: {
    text: "Discovery is the first sub-phase of Create, and nothing is built in it. The team works out:",
    internalLinks: [{ phrase: "Create", to: "/create" }],
  } satisfies ThreadLinkedProse,
  workOutItems: [
    "what the real problem is",
    "who has it",
    "whether a new service is even the right answer",
  ],
  closing: {
    text: "Set a goal at the start: name what the discovery needs to find out. That is how the team knows when it is done.",
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
      text: "A named problem. Something in the program is failing the people it serves: complaints, backlogs, workarounds, an aging system, a policy change. Written down in a sentence or two. A solution does not need to be chosen yet; noticing the pain is enough to start.",
      bold: [{ phrase: "A named problem." }],
    },
    {
      text: "A business owner sponsors the work and can act on what it finds.",
      bold: [{ phrase: "business owner" }],
    },
    {
      text: "A small, dedicated team is available, and its members are not split across other work.",
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
  opening: {
    text: "The needs behind most existing Government of Canada services were met by something that already existed:",
    bold: [{ phrase: "existing" }],
  } satisfies ThreadLinkedProse,
  options: [
    {
      text: "bought from a vendor",
      bold: [{ phrase: "bought" }],
    },
    {
      text: "reused from another department",
      bold: [{ phrase: "reused" }],
    },
    {
      text: "configured from a platform the government already runs",
      bold: [{ phrase: "configured" }],
    },
  ] satisfies ThreadLinkedProse[],
  weigh: {
    text: "Before any solution is named, Discovery weighs those options and makes sure the service will not duplicate one that already exists. Three public registries make the scan concrete: the GC Service Inventory lists existing services, the Open Resource Exchange lists open-source solutions other teams have released, and the Open Government Portal holds the government's published data.",
    externalLinks: [
      { phrase: "GC Service Inventory", linkKey: "gc-service-inventory" },
      { phrase: "Open Resource Exchange", linkKey: "gc-open-resource-exchange" },
      { phrase: "Open Government Portal", linkKey: "open-government-portal" },
    ],
  } satisfies ThreadLinkedProse,
  sometimes: {
    text: "Sometimes the answer is not a service at all. Clearer information, or a change to a form, can be enough on its own.",
    bold: [{ phrase: "Sometimes the answer is not a service at all." }],
  } satisfies ThreadLinkedProse,
  teamNote: {
    title: {
      text: "If the department is buying a Team, the competition happens at the end of Discovery.",
      bold: [
        {
          phrase: "If the department is buying a Team, the competition happens at the end of Discovery.",
        },
      ],
    } satisfies ThreadLinkedProse,
    routes: {
      text: "There are four buying routes: Team, Solution, Finished Product, and In-house or Reuse. Only Team is contracted this early, because the team is what does Alpha. Prepare the competition during Discovery, and award only once the decision is to continue, so the team is in place when Alpha starts.",
      internalLinks: [
        { phrase: "four buying routes", to: "/thread/procurement" },
        { phrase: "Alpha", to: "/create-alpha" },
      ],
    } satisfies ThreadLinkedProse,
    competition: {
      text: "The competition usually runs against an existing supply arrangement, which is a pre-competed list of approved suppliers, so it is faster than an open tender. Plan for the contract to be signed as Discovery ends.",
    } satisfies ThreadLinkedProse,
  },
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
        text: "For a big enough project, the problem statement has an official form: the concept case. It is mandatory when a department is willing to invest at least $2.5 million, a floor that rises with the department's project-management capacity class, up to $25 million.",
        bold: [{ phrase: "the concept case" }],
      },
      {
        text: "The concept case describes the problem or the opportunity before any solution is chosen. It is approved at assistant deputy minister level or above, and goes to the Treasury Board of Canada Secretariat for review by the Chief Information Officer of the Government of Canada. Discovery's problem work is what fills it; the Mandatory Procedures for Concept Cases for Digitally Enabled Projects set out the rest.",
        bold: [{ phrase: "before any solution is chosen" }],
        externalLinks: [
          {
            phrase: "Mandatory Procedures for Concept Cases for Digitally Enabled Projects",
            linkKey: "concept-case-procedures",
          },
        ],
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
    title: "Learn who the service could exclude.",
    sections: [
      {
        text: "Nothing is designed in Discovery, so the accessibility work here is research: include the people most likely to be excluded, and learn where the current way of doing things shuts them out.",
        bold: [{ phrase: "include the people most likely to be excluded" }],
      },
      {
        text: "That means talking with people with visual, hearing, motor, or cognitive impairments, and with people who have little digital access or confidence. What the research finds becomes the barriers the designs in Alpha will have to clear. Meeting the standard is a legal duty for a Government of Canada service, and it is far cheaper to plan for now than to fix later. Accessibility covers the obligation and how to meet it.",
        bold: [{ phrase: "legal duty" }],
        internalLinks: [{ phrase: "Accessibility", to: "/thread/accessibility" }],
      },
      {
        text: "For exclusion beyond disability, Gender-based Analysis Plus is the Government of Canada's process: it asks who a service affects differently, and the Treasury Board submission that funds the build requires one.",
        externalLinks: [{ phrase: "Gender-based Analysis Plus", linkKey: "gba-plus" }],
      },
    ],
  },
  {
    id: "constraints",
    icon: Shield,
    title: "Understand the constraints.",
    sections: [
      {
        text: "Work out the constraints you would face if you move on to the Alpha sub-phase: legislation, existing contracts, legacy technology, and established processes, among others. Sort them into two kinds:",
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
        text: "Learn the built-in needs at the same time, because they shape which options are even possible: how sensitive the information is, so security is designed in from the start; how many people will need the service at once, so it performs under real load; and what it can afford to cost to run, so it stays efficient for years. Found in Discovery, these are requirements. Found after the build, they are rework.",
        bold: [{ phrase: "Learn the built-in needs at the same time" }],
      },
      {
        text: "One constraint has its own early question: personal information. If the service will use it, ask your department's ATIP office now whether a Privacy Impact Assessment is needed. The Policy on Privacy Protection requires one for new programs that use personal information to decide things about people, and the assessment is easiest while the design can still move.",
        bold: [{ phrase: "Privacy Impact Assessment" }],
        externalLinks: [{ phrase: "Policy on Privacy Protection", linkKey: "policy-privacy-protection" }],
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
    title: "Write down today's numbers, and what better would look like.",
    sections: [
      {
        text: "Record today's baselines now, before anything changes, because they cannot be reconstructed later. Numbers worth writing down:",
        bold: [{ phrase: "baselines" }],
      },
      {
        type: "unorderedList",
        items: [
          "how long the task takes today, end to end",
          "how many people give up, fail, or phone for help",
          "what one transaction costs in staff time",
        ],
      },
      {
        text: "Then sketch what better would look like: the two or three numbers that should move if the problem were solved, and by roughly how much. Those become the service's first success measures, and the decision to go on or stop leans on them at every step from here. Monitoring and instrumentation covers the signals and targets.",
        bold: [{ phrase: "what better would look like" }],
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
        text: "Unless confidentiality prevents it, share what the team is learning while it learns. Two habits are enough:",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "A short show-and-tell",
            text: " every few weeks, with the enabling branches and the teams on either side of the problem invited.",
          },
          {
            bold: "Short posts where other public servants can find them,",
            text: " on the department's internal channels or the GC-wide communities.",
          },
        ],
      },
      {
        text: "Working in the open is one of the Government of Canada's digital standards, and it pays back quickly: someone who has already solved part of the problem finds you, and duplicate work surfaces before money is spent on it. The Support page lists the communities to share with.",
        externalLinks: [{ phrase: "digital standards", linkKey: "digital-standards" }],
        internalLinks: [{ phrase: "Support page", to: "/support" }],
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
      text: "Everything Discovery makes is knowledge, and all of it crosses over. Before you move to Alpha, have ready:",
      bold: [{ phrase: "Everything Discovery makes is knowledge," }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "The problem, written down. One or two sentences the whole team agrees on, with the evidence behind them.",
        bold: [{ phrase: "The problem, written down." }],
      },
      {
        text: "The journey map. The as-is picture of how people get this done today, with the pain points marked. It is Discovery's key artefact, and Alpha tests ideas against it.",
        bold: [{ phrase: "The journey map." }],
      },
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
        text: "Baselines and first success measures. What the problem costs today, and what better would look like in numbers. At the end of Alpha, the team's own decision to go on or stop is made with these.",
        bold: [{ phrase: "Baselines and first success measures." }],
      },
      {
        text: "The funding path for Alpha, lined up early, since it takes time to arrange.",
        bold: [{ phrase: "The funding path for Alpha," }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};

export const DISCOVERY_SECTION_NAV = {
  prev: { href: "/create", label: "Create phase", level: "phase" },
  next: { href: "/create-alpha", label: "Alpha sub-phase", level: "subphase" },
} satisfies { prev: SectionNavLink; next: SectionNavLink };
