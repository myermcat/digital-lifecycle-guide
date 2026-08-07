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
  ShieldAlert,
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
    "lists the assumptions most likely to kill the idea, and tests them",
    "builds quick, throwaway mock-ups (paper sketches, clickable screens) to test them",
    "watches real users try them",
  ],
  whatsNew: {
    label: "New since Discovery",
    text: "The team starts making things, and users start trying them.",
  },
  closing: {
    text: "Nothing made in Alpha is carried into the build. Paper sketches, artificial intelligence (AI) mock-ups, and coded prototypes are archived when Alpha ends, and they become the requirements for what gets built. Only the handful of people who test them ever see them, never the public.",
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
      text: "Funding for the alpha, often from the department's existing operating budget, including a budget for user research.",
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
    text: "Every idea rests on assumptions that, if wrong, sink the whole service: that people can and will use it, that it can connect to the systems it has to, that a legal or policy constraint can be met. Find the assumptions that would kill the service, and test those first. The killer is sometimes invisible in a demo: whether it can be made secure enough, fast enough under real load, or cheap enough to run. A prototype can test those too. Run the cheapest test that could prove each one false. An assumption that falls saves the cost of a wrong build, and that is a success. One that holds has earned the next test. Commit money to a build before the risky parts hold, and everything after it is at risk.",
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
        text: "Work up in this order, stopping as soon as the question is answered:",
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
            text: " A number of AI tools now build one from a written prompt, among them Lovable, Cursor, Claude Code, v0, Bolt, and Replit, with more arriving all the time. It takes no technical skill: describe the idea in plain words and look at what comes back. Plan for about half a day all in, including learning the tool.",
          },
          {
            bold: "A coded prototype,",
            text: " once the research points the way. A developer builds it, often straight from your mock-up.",
          },
        ],
      },
      {
        text: "Treat the AI mock-up exactly like paper: something to be archived rather than extended. No part of it should be carried into the build. That holds hardest when the department is building the service in-house, where the temptation to keep going from the prototype is strongest. Its whole value is that a team can put an idea in front of colleagues and stakeholders instead of describing it in words. Their reaction shows quickly whether it holds up at all.",
        bold: [{ phrase: "something to be archived rather than extended" }],
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
            text: "A paper prototype needs one person who can draw. Sketch the screens, put them in front of someone, and watch where they get stuck. It costs an afternoon and it can change what the service is.",
            bold: [{ phrase: "A paper prototype needs one person who can draw." }],
          },
          {
            text: "A clickable mock-up needs half a day, and you can make it yourself. The AI prototyping tools take a written description and build one; allow the half day to include learning the tool. A colleague who knows Figma or Penpot can do the same, though asking for half of someone's working day is a real ask.",
            bold: [{ phrase: "A clickable mock-up needs half a day, and you can make it yourself." }],
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
            text: "Building in-house or reusing a platform: yes. The department is the builder or the configurer, so it prototypes for itself.",
            bold: [{ phrase: "Building in-house or reusing a platform: yes." }],
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
      {
        text: "The standard has a name: CAN/ASC EN 301 549, which the Accessible Canada Regulations require new and updated web pages, applications, and digital documents to conform to. The Guidance on the Digital Technologies Accessibility Regulations says what must conform, and by when. The Digital Accessibility Toolkit shows how to build and test against it.",
        externalLinks: [
          { phrase: "CAN/ASC EN 301 549", linkKey: "en-301-549" },
          { phrase: "Guidance on the Digital Technologies Accessibility Regulations", linkKey: "esdc-a11y-regulations-guidance" },
          { phrase: "Digital Accessibility Toolkit", linkKey: "digital-accessibility-toolkit" },
        ],
      },
    ],
  },
  {
    id: "build-or-buy",
    icon: ShoppingCart,
    title: "Get ready to build or buy.",
    sections: [
      {
        text: "Bring the departmental web team and the head of communications in before the first prototype. Anything published under the canada.ca brand has to use the mandatory templates, the set information architecture, the global header and footer, and the content style guide, and those constrain what a service can look like and where it can live. Teams usually meet them at Beta, when a custom-designed prototype reaches the web team for the first time and has to be rebuilt.",
        bold: [{ phrase: "before the first prototype" }],
      },
      {
        text: "The domain is a separate approval and it is not the department's to give. The Principal Publisher, which is Employment and Social Development Canada through Service Canada, controls canada.ca and has to approve every domain and sub-domain, and the request is filed by the departmental web account manager. Start it before any launch date is promised to anyone.",
        bold: [{ phrase: "not the department's to give" }],
      },
      {
        text: "Decide responsive web against a downloadable app here too, with evidence from research rather than preference. A downloadable app is tested, published and later retired centrally, so it adds a dependency the department does not control at launch or at retirement.",
      },
      {
        text: "Decide the approach and the tooling for Beta, and whether it offers value for money. Alpha is where the team gets ready to procure the build, so start early: procurement covers the buying, and this is where exit rights and data portability belong in the contract. Work out the threats the service will face and how it will be kept secure. A Threat and Risk Assessment lists and ranks them. It runs more than once: against the high-level design here, again against the detailed design as the build is specified, and a third time against the finished system in Beta. Security covers how that work is done. Funding covers paying for Beta.",
        bold: [
          { phrase: "approach and the tooling" },
          { phrase: "exit rights and data portability" },
        ],
        internalLinks: [
          { phrase: "procurement", to: "/thread/procurement" },
          { phrase: "Security", to: "/thread/security" },
          { phrase: "Funding", to: "/thread/funding" },
        ],
        externalLinks: [
          { phrase: "Threat and Risk Assessment", linkKey: "harmonized-tra-methodology" },
        ],
      },
      {
        text: "The chosen direction is also assessed: departmental architecture review boards weigh every digital initiative against the GC Enterprise Architecture Framework, reuse before buy before build, and the largest initiatives go on to the government-wide review board. Arrive with the reuse scan from Discovery in hand and the review goes quickly.",
        bold: [{ phrase: "reuse before buy before build" }],
        externalLinks: [
          { phrase: "GC Enterprise Architecture Framework", linkKey: "gc-enterprise-architecture-framework" },
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

export const ALPHA_EXERCISE = {
  label: "THE EXERCISE",
  title: "Every service goes down eventually, and how long it stays down is decided now",
  icon: ShieldAlert,
  sectionId: "what-could-go-wrong",
  bodyIntro: {
    text: "Two questions decide most of what the service has to be built to withstand. What could stop it or harm the people who use it, and how long it can be down before real harm starts. Both are worked out at the end of Alpha, while the design can still absorb the answer, and both feed the contract signed at the start of Beta.",
    bold: [{ phrase: "how long it can be down before real harm starts" }],
  } satisfies ThreadLinkedProse,
  threatsIntro: {
    text: "Threats come in three kinds, and the Government of Canada's own guidance warns which ones teams forget:",
  } satisfies ThreadLinkedProse,
  threatItems: [
    {
      text: "deliberate: theft, tampering, an insider, a coordinated attack",
      bold: [{ phrase: "deliberate:" }],
    },
    {
      text: "accidental: human error, a contractor pulling the wrong cable, a software fault, mechanical or electrical damage",
      bold: [{ phrase: "accidental:" }],
    },
    {
      text: "natural: flood, fire, storm, earthquake, a pandemic",
      bold: [{ phrase: "natural:" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
  threatsClosing: {
    text: "The RCMP's assessment guide puts it plainly: it can be easy to overlook natural and accidental threats with the greatest attention being paid to deliberate ones. Most teams picture an attacker and forget the flood.",
    bold: [{ phrase: "it can be easy to overlook natural and accidental threats" }],
  } satisfies ThreadLinkedProse,
  listIntro: {
    text: "Half a day with the right people in a room produces four things:",
  } satisfies ThreadLinkedProse,
  listItems: [
    {
      text: "the maximum allowable downtime (MAD): how long the service can be unavailable before a high degree of injury results",
      bold: [{ phrase: "the maximum allowable downtime (MAD)" }],
    },
    {
      text: "the minimum service level: what counts as good enough during a disruption, which is often a manual or paper route rather than the digital service",
      bold: [{ phrase: "the minimum service level" }],
    },
    {
      text: "the recovery time objective (RTO): how fast it has to be back, which is a target set inside the maximum allowable downtime rather than the same number",
      bold: [{ phrase: "the recovery time objective (RTO)" }],
    },
    {
      text: "the recovery point objective (RPO): how much recent data can be lost, measured as time since the last usable copy",
      bold: [{ phrase: "the recovery point objective (RPO)" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
  scaleNote: {
    text: "A four-hour maximum allowable downtime and a two-week one buy completely different architectures and completely different hosting bills. This is a spending decision made under a security-policy label, which is why it belongs here and not in a form filled in later.",
    bold: [{ phrase: "a spending decision made under a security-policy label" }],
  } satisfies ThreadLinkedProse,
  ownershipNote: {
    text: "There is one business continuity plan for the whole department. There is not a second one for this service. What the team hands over is the impact judgement, the four numbers, and the list of what this service falls over with, and it goes to the department's business continuity coordinator. What stays with the team is the recovery of this particular service and the testing that proves the recovery works.",
    bold: [
      { phrase: "There is one business continuity plan for the whole department." },
    ],
  } satisfies ThreadLinkedProse,
  confusionNote: {
    text: "This part is often misunderstood. The assessment is required for every service, with no threshold of any kind, but a standalone report is not: the guidance says producing one is neither recommended nor required, and nothing is submitted anywhere. What enforces it is the Authority to Operate, because without the assessment the person signing has nothing to accept.",
    bold: [
      { phrase: "The assessment is required for every service" },
      { phrase: "a standalone report is not" },
    ],
  } satisfies ThreadLinkedProse,
  closing: {
    text: "Security covers how the assessment is done, and the official instruments underneath it: the harmonized Threat and Risk Assessment methodology for what could go wrong, the Standard on Security Categorization for how sensitive the information is, and Appendix D of the Directive on Security Management for how critical the service is and how long it can be down.",
    internalLinks: [{ phrase: "Security", to: "/thread/security" }],
    externalLinks: [
      {
        phrase: "harmonized Threat and Risk Assessment methodology",
        linkKey: "harmonized-tra-methodology",
      },
      {
        phrase: "Standard on Security Categorization",
        linkKey: "standard-on-security-categorization",
      },
      {
        phrase: "Directive on Security Management",
        linkKey: "directive-security-management",
      },
    ],
  } satisfies ThreadLinkedProse,
  href: "/thread/security",
  linkLabel: "See how the assessment is done →",
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
      text: "Alpha is where the requirements get written.",
      bold: [{ phrase: "Alpha is where the requirements get written." }],
    },
    {
      text: "Discovery handed over the problem, the people who have it, and what success would look like. Alpha turns that into what the service has to do. The request for proposals goes out at the start of Beta, built from these requirements, so they have to be settled before Alpha closes. A requirement that is still vague on the day it is published stays vague in the contract.",
      bold: [{ phrase: "they have to be settled before Alpha closes" }],
    },
    {
      text: "There is no Government of Canada name for this, and no template.",
      bold: [{ phrase: "There is no Government of Canada name for this, and no template." }],
    },
    {
      text: "Departments often call it a business requirements document. The term is common practice borrowed from industry, and it appears in no Treasury Board policy, directive or standard, so nobody can be made to produce one and nobody will ask for it by that name. The requirements matter for every service, whatever they are called.",
    },
    {
      text: "The concept case is what Canada names for the stage before this one. It covers the problem rather than the solution, and it applies to digitally enabled projects above a threshold: $2.5 million for a department with no approved capacity class or class 1, rising to $25 million at class 4. Below that nobody asks for one, though the template is worth using anyway.",
      bold: [{ phrase: "The concept case" }],
    },
    {
      text: "The statement of work is what Canada names for the stage after. It belongs to the contract, so it applies only if the department is buying. An in-house build never writes one.",
      bold: [{ phrase: "The statement of work" }],
    },
    {
      text: "The requirements themselves sit between those two, which is why the guide keeps calling them requirements and nothing more. They matter for every service, whatever the department calls them.",
      bold: [{ phrase: "The requirements themselves sit between those two" }],
    },
    {
      text: "One place the activity is checked: the Project Complexity and Risk Assessment asks whether the business requirements were validated with users, by walkthrough, workshop or independent review, and the answer feeds the score that decides who is allowed to approve the project. It applies only to projects above the same kind of threshold, so a small service never meets the question. Where it does apply, requirements written without users cost more than rework.",
      bold: [{ phrase: "One place the activity is checked:" }],
    },
    {
      text: "The competition to find a supplier runs during Alpha.",
      bold: [{ phrase: "The competition to find a supplier runs during Alpha." }],
    },
    {
      text: "This is the procurement competition: the requirements are written and advertised, bids come in and are evaluated, and the work is awarded. That takes months. If it has not begun by the end of Alpha, Beta cannot start on time.",
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
      text: "The prototypes are archived; what they taught becomes the requirements. Have these ready before Beta starts:",
      bold: [{ phrase: "The prototypes are archived; what they taught becomes the requirements." }],
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
        text: "The requirements, gathered in one place. The request for proposals is written from them, so each line has to be something a supplier can be held to:",
        bold: [{ phrase: "The requirements, gathered in one place." }],
        subItems: [
          {
            text: "what the service has to do, written out so a builder can act on it",
          },
          {
            text: "the sharpened metrics that say whether it worked",
          },
          {
            text: "the accessibility clauses the service has to meet",
          },
          {
            text: "how the system has to behave: how fast, how available, and how long it holds records",
          },
          {
            text: "the data the service has to hold, and the metadata that describes it",
          },
          {
            text: "the recovery targets the exercise above produced: how long the service can be down, and how much recent data it can afford to lose",
          },
        ] satisfies readonly ThreadLinkedProse[],
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
    ] satisfies readonly (ThreadLinkedProse & {
      subItems?: readonly ThreadLinkedProse[];
    })[],
  },
};

export const ALPHA_SECTION_NAV = {
  prev: { href: "/create-discovery", label: "Discovery sub-phase", level: "subphase" },
  next: { href: "/create-beta", label: "Beta sub-phase", level: "subphase" },
} satisfies { prev: SectionNavLink; next: SectionNavLink };
