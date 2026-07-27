import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Briefcase,
  Code2,
  Map,
  PencilRuler,
  PenTool,
  Route,
  Shield,
  ShoppingCart,
  Target,
  Users,
} from "lucide-react";
import {
  ACCESSIBILITY_EXCLUSION_GROUPS,
  ACCESSIBILITY_EXCLUSION_INTRO,
} from "@/lib/accessibility-exclusion-groups";
import type { LifecycleVisualAsset } from "@/lib/lifecycle-visuals";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { SectionNavLink } from "@/components/SubphaseSectionNav";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";

export const ALPHA_EXTRACT = {
  spine: "Alpha exists to break the idea while breaking is cheap.",
  opening: {
    text: "Alpha is the second sub-phase of Create. The team takes the problem from Discovery and:",
    internalLinks: [
      { phrase: "Create", to: "/create" },
      { phrase: "Discovery", to: "/create-discovery" },
    ],
  } satisfies ThreadLinkedProse,
  workOutItems: [
    "lists the assumptions most likely to kill the idea",
    "builds quick, throwaway mock-ups (paper sketches, clickable screens) to test them",
    "watches real users try them",
  ],
  whatsNew: {
    label: "New since Discovery",
    text: "The team starts making things, and users start trying them.",
  },
  closing: {
    text: "Alpha builds nothing that lasts. No code survives into Beta, and the prototypes are seen only by the handful of people who test them, never the public.",
  } satisfies ThreadLinkedProse,
};

export const ALPHA_EXTRACT_CLOSING: ThreadLinkedProse = {
  text: "A prototype that proves an idea wrong has done its job.",
  bold: [{ phrase: "A prototype that proves an idea wrong has done its job." }],
};

export const ALPHA_PROTOTYPE_QUOTE = {
  title: "You do not need a supplier, or developers, to start prototyping.",
  body: "The cheapest prototypes need a pen, or half a day and an AI tool.",
} as const;

export const ALPHA_ON_RAMP = {
  title: "Before you start Alpha",
  intro:
    "Alpha starts where Discovery ended, so it needs what Discovery produced. Have these before you begin:",
  items: [
    {
      text: "A defined problem, with evidence it is real and worth solving.",
      bold: [{ phrase: "defined problem" }],
    },
    {
      text: "A ranked list of risky ideas to test, and which one to test first.",
      bold: [{ phrase: "ranked list of risky ideas" }],
    },
    {
      text: "The Discovery team carried over, joined by a developer or technologist for the coded prototypes. The paper and clickable mock-ups before those need nobody technical. The same people keep the context and the momentum.",
      bold: [{ phrase: "The Discovery team carried over," }],
    },
    {
      text: "Funding for the alpha, including a budget for user research.",
      bold: [{ phrase: "Funding for the alpha" }],
    },
    {
      text: "The team is free to stop, or return to Discovery, if the ideas do not hold.",
      bold: [{ phrase: "free to stop, or return to Discovery" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const ALPHA_PILLAR = {
  label: "THE MAKE-OR-BREAK QUESTION",
  title: "Test the riskiest assumption first",
  body: {
    text: "Every idea rests on assumptions that, if wrong, sink the whole service: that people can and will use it, that it can connect to the systems it has to, that a legal or policy constraint can be met. Find the assumptions that would kill the service, and test those first. Run the cheapest test that could prove each one false. An assumption that falls saves the cost of a wrong build, and that is a success. One that holds has earned the next test. Commit money to a build before the risky parts hold, and everything after it is at risk.",
    bold: [
      {
        phrase: "Find the assumptions that would kill the service, and test those first.",
      },
    ],
  } satisfies ThreadLinkedProse,
  href: "/thread/user-research",
  linkLabel: "See how to test with users →",
  icon: Target,
};

export type AlphaAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  headerVisual?: LifecycleVisualAsset;
  sections: readonly ThreadContentSection[];
};

export const ALPHA_ACCORDION = {
  id: "what-to-find-out",
  title: "What to do in Alpha",
} as const;

export const ALPHA_ACCORDION_STAGES: readonly AlphaAccordionStage[] = [
  {
    id: "throwaway-prototypes",
    icon: PencilRuler,
    title: "Build throwaway prototypes, and try more than one approach.",
    headerVisual: LIFECYCLE_VISUALS.alphaPrototypeLadder,
    sections: [
      {
        text: "Make just enough to test an idea, well short of production quality, and expect to throw the code and most of the ideas away. Try several approaches to the problem rather than polishing the first one.",
      },
      {
        text: "Work up in this order, stopping as soon as the idea is answered:",
      },
      {
        type: "orderedList",
        items: [
          {
            bold: "Paper or sketches.",
            text: " The cheapest way to find out an idea is wrong.",
          },
          {
            bold: "A clickable mock-up.",
            text: " A number of AI (artificial intelligence) tools now build one from a written prompt, among them Lovable, Cursor, Claude Code, v0, Bolt, and Replit, with more arriving all the time. It takes no technical skill: describe the idea in plain words and look at what comes back. Plan for about half a day all in, including learning the tool.",
          },
          {
            bold: "A coded prototype,",
            text: " once the research points the way. A developer builds it, often straight from your mock-up.",
          },
        ],
      },
      {
        text: "Treat the AI mock-up exactly as you would treat paper: something to be thrown away. It is not the beginning of the real service, and no part of it should survive into the build. Its whole value is that it lets a team show an idea to colleagues or stakeholders instead of describing it in the air, and it shows quickly whether the idea works at all.",
        bold: [{ phrase: "something to be thrown away" }],
      },
      {
        text: "Each round of testing is a research session: five or six people who look like the service's real users try the mock-up, and the team watches where they get stuck.",
        bold: [{ phrase: "Each round of testing is a research session:" }],
      },
    ],
  },
  {
    id: "prototype-without-vendor",
    icon: PenTool,
    title: "You do not need a supplier, or developers, to start prototyping.",
    sections: [
      {
        text: "This is the objection that stops teams from doing Alpha at all. It should not.",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "A paper prototype needs one person who can draw. Sketch the screens, put them in front of someone, and watch where they get stuck. It costs an afternoon and it will change what the service is.",
            bold: [{ phrase: "A paper prototype needs one person who can draw." }],
          },
          {
            text: "A clickable mockup needs half a day, and you can make it yourself. The AI prototyping tools take a written description and build one; allow the half day to include learning the tool. A colleague who knows Figma or Penpot can do the same, though asking for half of someone's working day is a real ask.",
            bold: [{ phrase: "A clickable mockup needs half a day, and you can make it yourself." }],
          },
          {
            text: "If the department is buying a Team, the supplier is already there. That contract was signed at the end of Discovery, so the team prototypes alongside the department.",
            bold: [{ phrase: "If the department is buying a Team, the supplier is already there." }],
          },
        ],
      },
      {
        text: "Not every route needs a prototype from you. There are four buying routes, Team, Solution, Finished Product, and In-house or Reuse, and they do not all need the same thing.",
        bold: [{ phrase: "Not every route needs a prototype from you." }],
        internalLinks: [{ phrase: "four buying routes", to: "/thread/procurement" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Buying a Solution: yes. The department has to show suppliers what it wants, and a prototype does that better than a written specification.",
            bold: [{ phrase: "Buying a Solution: yes." }],
          },
          {
            text: "Building in-house: yes. The department is the builder, so it prototypes for itself.",
            bold: [{ phrase: "Building in-house: yes." }],
          },
          {
            text: "Buying a Team: the team prototypes with you.",
            bold: [{ phrase: "Buying a Team: the team prototypes with you." }],
          },
          {
            text: "Buying a Finished Product: no. There is nothing to prototype, because the product already exists. The department evaluates real products instead.",
            bold: [{ phrase: "Buying a Finished Product: no." }],
          },
        ],
      },
      {
        text: "The prototype is the clearest requirements document a department will ever write. Whoever ends up building the service, a contracted team or the department's own staff, has to be told what is wanted. A thing they can hold and click beats a page of prose describing it.",
        bold: [
          {
            phrase:
              "The prototype is the clearest requirements document a department will ever write.",
          },
        ],
      },
    ],
  },
  {
    id: "joined-up",
    icon: Route,
    title: "Solve the whole problem, joined up.",
    sections: [
      {
        text: "Get the scope right from the user's point of view, and bring forward the journey map from Discovery. Where the service is one step in a longer journey, test whether the other services and teams can change to make that journey work, and plan to reuse information the government already holds so people are not asked for it twice. This continues joined-up delivery.",
        bold: [
          { phrase: "scope right" },
          { phrase: "reuse information the government already holds" },
        ],
        internalLinks: [{ phrase: "joined-up delivery", to: "/thread/joined-up-delivery" }],
      },
    ],
  },
  {
    id: "constraints",
    icon: Shield,
    title: "Work within the constraints.",
    sections: [
      {
        text: "Test the hard constraints found in Discovery: legislation, existing contracts, and legacy technology. By the end of Alpha, be able to say how the service will meet the need within those constraints, or set out the plan to remove a constraint that can be moved.",
        bold: [{ phrase: "how the service will meet the need within those constraints" }],
      },
    ],
  },
  {
    id: "accessibility",
    icon: Users,
    title: "Design for accessibility and inclusion.",
    sections: [
      {
        text: "Understand the accessibility principles and include the people most likely to be excluded in the research.",
      },
      {
        text: ACCESSIBILITY_EXCLUSION_INTRO,
      },
      {
        type: "unorderedList",
        items: [...ACCESSIBILITY_EXCLUSION_GROUPS],
      },
      {
        text: "A prototype is too rough to test for full conformance, so use Alpha to get the accessibility work ready for Beta, where the contract is signed. Work out which clauses of the standard the service has to meet, so they can go into the contract rather than be argued about later. Book the testing early. Automated checkers catch only a fraction of the problems. Accessibility covers the duty and how to meet it.",
        internalLinks: [{ phrase: "Accessibility", to: "/thread/accessibility" }],
      },
    ],
  },
  {
    id: "build-or-buy",
    icon: ShoppingCart,
    title: "Get ready to build or buy.",
    sections: [
      {
        text: "Decide the approach and the tooling for Beta, and whether it offers value for money. Alpha is where the team gets ready to procure the build, so start early: procurement covers the buying, and this is where exit rights and data portability belong in the contract. Start thinking about the threats the service will face and how it will be kept secure. Funding covers paying for Beta.",
        bold: [
          { phrase: "approach and the tooling" },
          { phrase: "exit rights and data portability" },
        ],
        internalLinks: [
          { phrase: "procurement", to: "/thread/procurement" },
          { phrase: "Funding", to: "/thread/funding" },
        ],
      },
    ],
  },
  {
    id: "measure-success",
    icon: Activity,
    title: "Sharpen how you'll measure success.",
    sections: [
      {
        text: "Carry forward the baselines set in Discovery and refine the metrics you will use to tell whether the service works. Monitoring and instrumentation covers the signals and targets.",
        internalLinks: [
          {
            phrase: "Monitoring and instrumentation",
            to: "/thread/monitoring-and-instrumentation",
          },
        ],
      },
    ],
  },
];

export const ALPHA_TEAM = {
  title: "The team you need",
  intro: {
    text: "Alpha keeps Discovery's team and adds someone who can build. Keeping the same people holds the context and the momentum. The minimum roles (one person can hold more than one):",
    bold: [{ phrase: "minimum roles" }],
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "User researcher",
      icon: Map,
      body: { text: "plans and runs the testing." },
    },
    {
      role: "Designer",
      icon: PenTool,
      body: { text: "shapes the prototypes and the journey." },
    },
    {
      role: "Developer or technologist",
      icon: Code2,
      body: { text: "builds the throwaway prototypes and probes feasibility." },
    },
    {
      role: "Business and policy lead",
      icon: Briefcase,
      body: { text: "knows the program, the rules, and the constraints." },
    },
    {
      role: "Business owner",
      icon: Users,
      body: { text: "steers the work and owns the decision to go on, return, or stop." },
    },
  ] satisfies readonly SubphaseTeamRole[],
  closing: {
    text: "In the Government of Canada the team is usually assembled from a mix of public servants and vendors. An alpha is short: roughly six to twelve weeks is typical.",
    bold: [{ phrase: "roughly six to twelve weeks" }],
  } satisfies ThreadLinkedProse,
};

export const ALPHA_CAUTION = {
  title: "When Alpha goes wrong",
  items: [
    "The prototypes get too polished and end up used as the real build.",
    "Only the safe assumptions are tested, and the risky ones are avoided.",
    "Prototypes are shown to stakeholders and never tested with real users.",
    "The team commits to the build before the riskiest assumptions hold.",
    "Alpha runs long and turns into a slow, expensive first version.",
  ],
};

export const ALPHA_FINISH = {
  title: "How you know Alpha is finished",
  sectionId: "how-you-know-alpha-is-finished",
  intro: {
    text: "Alpha is finished when you have a prototype substantial enough to decide, the riskiest assumptions have been tested, and you are confident you can build or buy something that meets the need and is cost-effective. What survives Alpha has earned the build.",
    bold: [{ phrase: "riskiest assumptions have been tested" }],
  } satisfies ThreadLinkedProse,
  followUp: [
    {
      text: "The competition to find a supplier runs during Alpha.",
      bold: [{ phrase: "The competition to find a supplier runs during Alpha." }],
    },
    {
      text: "This is the procurement competition. The requirements are written, the competition is published, bids come in, they are evaluated, and the work is awarded, and that takes months. If it has not begun by the end of Alpha, Beta cannot start on time.",
      internalLinks: [
        { phrase: "procurement", to: "/thread/procurement" },
        { phrase: "Beta", to: "/create-beta" },
      ],
    },
    {
      text: "This does not apply if the department is building in-house or reusing an existing platform, because there is no supplier to find.",
    },
  ] satisfies ThreadLinkedProse[],
  exits: [
    {
      lead: "Forward to Beta,",
      rest: {
        text: "when the risky assumptions hold and you know the approach to build or buy.",
      },
      href: "/create-beta",
    },
    {
      lead: "Back to Discovery,",
      rest: {
        text: "when Alpha shows the problem was not understood well enough.",
      },
      href: "/create-discovery",
    },
    {
      lead: "Stop,",
      rest: {
        text: "when the evidence says it is not worth building. Stopping here still saves the cost of a wrong build.",
      },
    },
  ],
  offRamp: {
    intro: {
      text: "The code dies; the learning lives. Before you move to Beta, have ready what Alpha learned:",
      bold: [{ phrase: "The code dies; the learning lives." }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "The chosen approach to build or buy, with the tooling for Beta and its value for money.",
        bold: [{ phrase: "The chosen approach" }],
      },
      {
        text: "The smallest version, defined: the simplest thing that can be built or bought that meets the need. That definition scopes what Beta builds.",
        bold: [{ phrase: "The smallest version, defined:" }],
      },
      {
        text: "The tested design: the winning mock-ups, kept as the clearest requirements document the department will ever hand a builder.",
        bold: [{ phrase: "The tested design:" }],
      },
      {
        text: "The journey map from Discovery, updated with what the testing taught.",
        bold: [{ phrase: "The journey map" }],
      },
      {
        text: "A procurement plan for the build, with exit rights and data portability written into the contract.",
        bold: [{ phrase: "A procurement plan for the build," }],
      },
      {
        text: "The budget and people for Beta, including a research budget.",
        bold: [{ phrase: "The budget and people for Beta," }],
      },
      {
        text: "Accessibility, ready for Beta: the clauses of the standard the service must meet, ready to go into the contract, and the testing with the people most likely to be excluded booked.",
        bold: [{ phrase: "Accessibility, ready for Beta:" }],
      },
      {
        text: "Sharpened success metrics, carried from Discovery.",
        bold: [{ phrase: "Sharpened success metrics," }],
      },
      {
        text: "The record of which ideas died, and why, so the next team does not pay to re-test them.",
        bold: [{ phrase: "The record of which ideas died," }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};

export const ALPHA_SECTION_NAV = {
  prev: { href: "/create-discovery", label: "Discovery sub-phase", level: "subphase" },
  next: { href: "/create-beta", label: "Beta sub-phase", level: "subphase" },
} satisfies { prev: SectionNavLink; next: SectionNavLink };
