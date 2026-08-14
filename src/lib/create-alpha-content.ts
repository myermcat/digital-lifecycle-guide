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
import type { FinishBlock } from "@/components/SubphaseFinishSection";
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
    "makes something to test them with: a sketch or a mock-up if the question is what it should look like, a clickable prototype if the question is how it should work, or, when the department is buying, prototypes suppliers build under contract",
    "puts it in front of people who are not on the team, and watches where they get stuck",
  ],
  whatsNew: {
    label: "New since Discovery",
    text: "The team starts making things, and users start trying them.",
  },
  closing: {
    text: "Alpha makes sketches, mock-ups and prototypes. Whether any of it becomes part of the finished service depends on how it was built, and that question is worked through further down this page. What carries forward in every case is the decision, what the team learned, and the approach it picked. Only the handful of people who try any of it ever see it, and never the public.",
    bold: [{ phrase: "depends on how it was built" }],
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
      text: "The Discovery team carried over, joined by a developer or technologist for the coded prototypes. The sketches and the AI-built prototypes before those need nobody technical. The same people keep the context and the momentum.",
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
    text: "Find the assumptions that would kill the service, and test those first. Run the cheapest test that could prove each one false. An assumption that falls saves the cost of a wrong build, and that is a success. One that holds has earned the next test.",
    bold: [
      {
        phrase: "Find the assumptions that would kill the service, and test those first.",
      },
    ],
  } satisfies ThreadLinkedProse,
  killersIntro: {
    text: "Most services are not killed by their software. The usual killers:",
    bold: [{ phrase: "Most services are not killed by their software." }],
  } satisfies ThreadLinkedProse,
  killers: [
    { text: "Policy does not allow it." },
    { text: "Nobody has the legal authority to do it." },
    { text: "The data the service depends on does not exist." },
    { text: "The people it is for will not use this channel." },
    { text: "Another department owns a step, and will not change it." },
  ] satisfies readonly ThreadLinkedProse[],
  ratioNote: {
    text: "Most teams spend their Alpha the other way round, on the prototype, because the prototype is the part they can see and act on. That is the mismatch worth noticing. A technical answer of no can certainly end an idea, so none of this says skip the technical tests. It says the prototype is one reason among many, and the reasons above it are the easiest to miss, the slowest to fix, and usually settled by somebody outside the team.",
    bold: [{ phrase: "That is the mismatch worth noticing." }],
  } satisfies ThreadLinkedProse,
  technicalNote: {
    text: "Technical killers are real too, and Alpha can only take them so far. Alpha answers whether a thing is possible: can the system of record be connected to at all, is the data really there, will security ever accept this approach. Whether it is fast enough under real load, or cheap enough to run, is not knowable until Beta. Plan for those. Do not claim to have tested them.",
    bold: [{ phrase: "Alpha answers whether a thing is possible" }],
  } satisfies ThreadLinkedProse,
  closingWarning: {
    text: "Commit money to a build before the risky parts hold, and everything after it is at risk.",
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
    title: "Make cheap, throwaway things, and try more than one approach.",
    headerVisual: LIFECYCLE_VISUALS.alphaPrototypeLadder,
    sections: [
      {
        text: "Make just enough to test an idea, well short of production quality, and expect to throw the code and most of the ideas away. Try several approaches to the problem rather than polishing the first one.",
      },
      {
        type: "subheading",
        text: "Mock-up or prototype: which one answers your question",
      },
      {
        text: "Mock-ups show what a service looks like. Prototypes show how it works. Nothing official defines either word, so the useful question is which one answers what you are trying to find out: a mock-up while the question is whether people understand the thing, a prototype once the question is how they move through it.",
        bold: [
          {
            phrase:
              "Mock-ups show what a service looks like. Prototypes show how it works.",
          },
        ],
        externalLinks: [
          { phrase: "Nothing official defines either word", linkKey: "miro-mockup-vs-prototype" },
        ],
      },
      {
        text: "A prototype can be interactive and still have nothing behind it, because interaction is not computation. Press Submit and it shows you the confirmation screen somebody drew earlier. Nothing has been submitted anywhere, no application exists, and there is nobody at the other end to process one. That is enough to see where people get stuck, and not enough to tell you whether the rules are right or whether it holds up under load. Alpha rules things out, and Beta finds out whether what survived actually works.",
        bold: [{ phrase: "interaction is not computation" }],
      },
      {
        type: "subheading",
        text: "What to make first, and what to make only if you must",
      },
      {
        text: "Work up this ladder, stopping as soon as the question is answered:",
      },
      {
        type: "orderedList",
        items: [
          {
            bold: "Paper, sketches and wireframes.",
            text: " The cheapest way to explain an idea to someone, and the cheapest way to find out it is wrong. A wireframe is the tidied-up version: boxes and labels showing what goes on a page and in what order, with no colour and no branding.",
          },
          {
            bold: "A mock-up.",
            text: " The screens drawn properly, in a design tool or by a colleague who has one. It looks like the service and it still does nothing.",
          },
          {
            bold: "A prototype built with AI.",
            text: " A number of tools now build a working, clickable one from a written prompt, among them Lovable, Cursor, Claude Code, v0, Bolt, and Replit, with more arriving all the time. It takes no technical skill: describe the idea in plain words and look at what comes back. Plan for about half a day all in, including learning the tool.",
          },
          {
            bold: "A coded prototype,",
            text: " once the research points the way. A developer builds it, often straight from your mock-up.",
          },
        ],
      },
      {
        text: "The value of the AI-built one is that a team can put an idea in front of colleagues and stakeholders instead of describing it in words. Their reaction shows quickly whether it holds up at all.",
      },
      {
        type: "subheading",
        text: "Who to show it to, and what to ask them",
      },
      {
        text: "Who you show it to depends on what you have made. A paper sketch goes in front of a colleague or a stakeholder, and the only question worth asking is whether they understood what the service would be. Once something is clickable, it earns a research session: five or six people who look like the service's real users try it, and the team watches where they get stuck.",
        bold: [{ phrase: "Who you show it to depends on what you have made." }],
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
            text: "A paper sketch needs one person who can draw. Sketch the screens, put them in front of a colleague, and ask whether they understood what the service is meant to do. Paper cannot tell you where a user would get stuck, because they will get stuck on the paper. It costs an afternoon and it can still change what the service is.",
            bold: [{ phrase: "A paper sketch needs one person who can draw." }],
          },
          {
            text: "A clickable prototype needs half a day, and you can make it yourself. The AI tools take a written description and build one; allow the half day to include learning the tool. A colleague who knows Figma or Penpot can build a mock-up the same way, though asking for half of someone's working day is a real ask.",
            bold: [{ phrase: "A clickable prototype needs half a day, and you can make it yourself." }],
          },
          {
            text: "If the department is buying a Team, the supplier is already there. That contract is signed as Alpha opens, because the team is what does Alpha, so it prototypes alongside the department.",
            bold: [{ phrase: "If the department is buying a Team, the supplier is already there." }],
          },
        ],
      },
      {
        text: "Whoever ends up building the service has to be told what is wanted, and a thing they can hold and click says it better than a page of prose. It does not replace the requirements. What a mock-up can and cannot carry into a contract is set out under writing the requirements, further down this page.",
        bold: [{ phrase: "It does not replace the requirements." }],
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
        type: "subheading",
        text: "Three approvals to start before the first prototype",
      },
      {
        text: "Bring the departmental web team and the head of communications in now. Anything published under the canada.ca brand has to use the mandatory templates, the set information architecture, the global header and footer, and the content style guide. Those constrain what a service can look like and where it can live. Teams usually meet them at Beta, when a custom-designed prototype reaches the web team for the first time and has to be rebuilt.",
        bold: [{ phrase: "Bring the departmental web team and the head of communications in now." }],
      },
      {
        text: "The domain is a separate approval, and it is not the department's to give. The Principal Publisher controls canada.ca and has to approve every domain and sub-domain. That is Employment and Social Development Canada, through Service Canada, and the request is filed by the departmental web account manager. Start it before any launch date is promised to anyone.",
        bold: [{ phrase: "not the department's to give" }],
      },
      {
        text: "Decide responsive web against a downloadable app here too, on evidence from research. A downloadable app is tested, published and later retired centrally, which adds a dependency the department does not control at launch or at retirement.",
      },
      {
        type: "subheading",
        text: "Then get the contract and the money ready",
      },
      {
        text: "Decide the approach and the tooling for Beta, and whether they offer value for money. Alpha is where the team gets ready to procure the build, so start early. Procurement covers the buying. This is where exit rights and data portability belong in the contract, along with the mechanisms that let Canada change course later:",
        bold: [
          { phrase: "approach and the tooling" },
          { phrase: "exit rights and data portability" },
        ],
        internalLinks: [{ phrase: "Procurement", to: "/thread/procurement" }],
      },
      {
        text: "If your route signs as Alpha opens, rather than as Beta opens, then anything that has to be in the contract has to be settled here. One of those is easy to miss: what happens at the end to the records the service will hold, meaning the applications, decisions, case files and correspondence it creates. How long each kind is kept, and whether it is eventually transferred to Library and Archives Canada or destroyed, has to be written into the contract when a supplier will hold or process any of it. Data stewardship covers how that decision is made.",
        bold: [{ phrase: "anything that has to be in the contract has to be settled here" }],
        internalLinks: [{ phrase: "Data stewardship", to: "/thread/data-stewardship" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Off-ramps: Canada declines to exercise an option, or stops issuing further work.",
            bold: [{ phrase: "Off-ramps:" }],
          },
          {
            text: "Gates: points in the contract where work cannot continue until Canada says so. These are contract gates, written by you, and separate from the official checkpoints the service has to clear anyway.",
            bold: [{ phrase: "Gates:" }],
          },
          {
            text: "The pivot: the work moves to a back-up supplier already under contract.",
            bold: [{ phrase: "The pivot:" }],
          },
        ],
      },
      {
        text: "Get the money approved for the whole path. Where a prototype contract carries an option to build, the value that matters for approval is the total the path could reach. Contracts must not be split to stay under an approval limit. Where the total may exceed what the department can approve on its own, start that conversation at strategy stage, while there is still time to shape the procurement around the answer. Funding covers how the money is raised and kept.",
        bold: [{ phrase: "Get the money approved for the whole path." }],
        internalLinks: [{ phrase: "Funding", to: "/thread/funding" }],
      },
      {
        text: "Work out the threats the service will face and how it will be kept secure. A Threat and Risk Assessment lists and ranks them. It runs three times: here against the high-level design, again against the detailed design as the build is specified, and a third time against the finished system in Beta, which is the pass the authority to operate rests on.",
      },
      {
        text: "Find out now who will sign that authority, because it is not automatic. It is normally the business owner for a service belonging to one department, the Chief Information Officer of Canada for a common or enterprise system, and the manager of the programme for a system two or more organizations share. Beta needs the answer before private beta opens, and it is a cheap question here and an expensive one then. Security covers how the assessment work is done.",
        bold: [{ phrase: "Find out now who will sign that authority" }],
        internalLinks: [{ phrase: "Security", to: "/thread/security" }],
      },
      {
        text: "The chosen direction is also assessed: departmental architecture review boards weigh every digital initiative against the Government of Canada Enterprise Architecture Framework, which asks teams to look for something that already exists before buying or building anything new. The largest initiatives go on to the government-wide review board. Arrive with the reuse scan from Discovery in hand and the review goes quickly.",
        bold: [{ phrase: "look for something that already exists before buying or building anything new" }],
        externalLinks: [
          { phrase: "Government of Canada Enterprise Architecture Framework", linkKey: "gc-enterprise-architecture-framework" },
        ],
      },
    ],
  },
  {
    id: "write-the-requirements",
    icon: Briefcase,
    title: "Write the requirements, and know which ones are safe to contract.",
    sections: [
      {
        text: "Requirements come in three kinds, and separating them decides what a later change costs. Change a requirement that is still in a prototype and someone redraws it in an afternoon. Change one that is written into a signed contract and it becomes a contract amendment, priced by the only supplier in the room. Expected amendments count inside the contract value that has to stay under the department's approval limit, and crossing that limit sends the change to Treasury Board before it can be made at all.",
        bold: [{ phrase: "separating them decides what a later change costs" }],
        externalLinks: [
          {
            phrase: "Expected amendments count inside the contract value",
            linkKey: "directive-procurement",
          },
        ],
      },
      {
        type: "subheading",
        text: "Which requirements go in the contract, and which stay out",
      },
      {
        text: "Where they go is the answer to what they are for. The statement of work is written from them, and it is an annex to the contract, which makes it the thing the supplier is actually held to.",
        bold: [{ phrase: "written from them" }],
        internalLinks: [{ phrase: "The statement of work", to: "/thread/procurement" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Business requirements become the objective and the background of the statement of work.",
            bold: [{ phrase: "Business requirements" }],
          },
          {
            text: "Non-functional requirements become its service levels, and they are what the bids are scored against.",
            bold: [{ phrase: "Non-functional requirements" }],
          },
          {
            text: "Functional requirements stay out of the contract. The prototype and the design carry those.",
            bold: [{ phrase: "Functional requirements" }],
          },
        ],
      },
      {
        text: "The requirements themselves are not filed anywhere. By the time anyone outside the department sees them, they have become the contract.",
      },
      {
        type: "subheading",
        text: "Requirements still matter when nobody is buying",
      },
      {
        text: "A team building the service itself still needs all three kinds of requirement in front of it, because that is how anyone knows what to build. Buying adds a mandated shape and a signature; it does not create the need. A statement of work is not required for an in-house build, though writing one can be easier than starting from a blank page, since it comes with a template.",
        bold: [{ phrase: "still needs all three kinds of requirement in front of it" }],
      },
      {
        type: "subheading",
        text: "Attaching the mock-up explains, it does not oblige",
      },
      {
        text: "A mock-up can be attached to the statement of work as an appendix, and that is worth doing, because it shows a bidder what is wanted better than any paragraph can. Attaching it explains. It does not oblige. Nothing binds the supplier unless the contract says so, so if a page must be built as drawn, an acceptance criterion has to name it.",
        bold: [{ phrase: "Attaching it explains." }],
      },
      {
        type: "subheading",
        text: "The rule, and why a later change costs what it does",
      },
      {
        text: "Put the business and non-functional requirements in the contract. Keep the functional ones out.",
        bold: [{ phrase: "Put the business and non-functional requirements in the contract." }],
      },
      {
        text: "A supplier held to the business need and the service levels can be told partway through that a page is wrong, and fixing it is part of the job. A supplier held to a page design agreed before anyone tested it will build that design, and every change costs a contract amendment.",
      },
      {
        type: "subheading",
        text: "What the rules actually require, by dollar value",
      },
      {
        text: "Defining the requirements is mandatory, and the Directive on the Management of Procurement places that on the business owner. No instrument provides a template or a form, which is why this page spends its time on how to write them. The dollar value changes the paperwork rather than the duty:",
        bold: [{ phrase: "Defining the requirements is mandatory" }],
        externalLinks: [
          {
            phrase: "Directive on the Management of Procurement",
            linkKey: "directive-procurement",
          },
        ],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Above $40,000 of professional services, the contracting authority gets a written statement of work before award, and the business owner signs a confirmation that the requirements were defined.",
            bold: [{ phrase: "Above $40,000 of professional services" }],
          },
          {
            text: "Below it, the buying is lighter: low-dollar contracts and purchase orders, with no mandated statement of work. The requirements still have to exist, because the order is written from them.",
            bold: [{ phrase: "Below it, the buying is lighter" }],
          },
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
  title: "What could take the service down, and how long it can stay down",
  icon: ShieldAlert,
  sectionId: "what-could-go-wrong",
  bodyIntro: {
    text: "Two answers do more than any others to set how much this service costs to run and how much engineering has to go underneath it. They are not the only inputs, but they are the ones most often left until it is too late to act on them. Get them wrong in one direction and you gold-plate a service nobody would miss for a fortnight. Get them wrong in the other and people are harmed within hours of an outage nobody planned for. Half a day with the right people settles both:",
    bold: [
      {
        phrase:
          "Two answers do more than any others",
      },
    ],
  } satisfies ThreadLinkedProse,
  bodyQuestions: [
    {
      text: "What could stop the service, or harm the people who use it?",
    },
    {
      text: "How long can it be down before real harm starts?",
    },
  ] satisfies readonly ThreadLinkedProse[],
  bodyAfterQuestions: {
    text: "Do it at the end of Alpha, while the design can still absorb the answers.",
  } satisfies ThreadLinkedProse,
  threatsHeading: "First, name what could go wrong",
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
  numbersPointer: {
    text: "Four numbers come out of that half-day: how long the service can be unavailable before real harm starts, what counts as good enough while it is down, how fast it has to be back, and how much recent data can be lost. Security defines each one and says who receives them.",
    bold: [{ phrase: "Four numbers come out of that half-day" }],
    internalLinks: [{ phrase: "Security defines each one", to: "/thread/security" }],
  } satisfies ThreadLinkedProse,
  scaleNote: {
    text: "Four hours and two weeks are not two settings of the same service. They buy different architectures and different hosting bills. So this is really a spending decision, even though it arrives wearing a security-policy label. Answer it here, with the people who know what the service is for. Leave it to a form somebody fills in later, and the budget gets set by whoever happens to be holding the form.",
    bold: [{ phrase: "this is really a spending decision" }],
  } satisfies ThreadLinkedProse,
  handoverHeading: "Then hand it over",
  ownershipNote: {
    text: "The numbers do not stay with the team once they are set. They go to the department's business continuity coordinator, because the department keeps one continuity plan covering everything it runs. Security explains what is handed over and what the team keeps.",
    bold: [{ phrase: "The numbers do not stay with the team once they are set." }],
    internalLinks: [{ phrase: "Security", to: "/thread/security" }],
  } satisfies ThreadLinkedProse,
  confusionNote: {
    text: "Doing the assessment is required for every service, at any size, with no threshold. Writing it up as a report is not. The guidance says a standalone report is neither recommended nor required, and there is nowhere to submit one, so nothing will chase you for it. What makes it real is the Authority to Operate at the end of Beta. The person who signs that is accepting the risk, and without the assessment there is nothing for them to accept.",
    bold: [
      { phrase: "Doing the assessment is required for every service" },
      { phrase: "Writing it up as a report is not." },
    ],
  } satisfies ThreadLinkedProse,
  closing: {
    text: "Three instruments sit underneath the half-day: the harmonized Threat and Risk Assessment methodology for what could go wrong, the Standard on Security Categorization for how sensitive the information is, and Appendix D of the Directive on Security Management for how critical the service is and how long it can be down. Security explains how the assessment is done.",
    internalLinks: [{ phrase: "Security explains how the assessment is done", to: "/thread/security" }],
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

export const ALPHA_BUYER_BEWARE = {
  label: "IF SOMEONE ELSE IS BUILDING IT",
  title: "A polished prototype is not a nearly-finished product.",
  body: "When a supplier demonstrates something that clicks, animates and looks finished, what you are watching is the surface. The rules, the integrations, the security, and everything that has to happen when a person does the wrong thing may not exist at all, and building them can take longer than everything in the demonstration. This is not usually anybody lying to you. It is what a prototype is for, and it is why fidelity is dangerous: the better it looks, the more everyone in the room assumes it is a week from done. Ask what is real behind each screen, and ask about the parts nobody showed you.",
  bodyBold: "Ask what is real behind each screen, and ask about the parts nobody showed you.",
} as const;

export const ALPHA_AI_CALLOUT = {
  label: "AI BUILDS",
  title: "Treat an AI-built prototype exactly like paper.",
  body: "The tools make something convincing in half a day, which is their whole value and their whole risk. It is there to be archived, not extended. If nobody on the team can explain what is inside it, no part of it should be carried into the build, and that holds hardest when the department is building in-house and the temptation to keep going is strongest.",
  bodyBold: "It is there to be archived, not extended.",
} as const;

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
  blocks: [
    {
      heading: "The requirements are written and settled",
      paragraphs: [
        {
          text: "Discovery handed over the problem, the people who have it, and what success would look like. Alpha turns that into what the service has to do, written so somebody else could build it.",
        },
        {
          text: "Settled means settled, because the request for proposals is written from them and goes out during Alpha. A requirement still vague on the day it is published stays vague in the contract, and changing it after that costs an amendment.",
          bold: [{ phrase: "Settled means settled" }],
        },
      ],
    },
    {
      heading: "The competition to find a supplier has begun",
      onlyIf: "Only if buying",
      paragraphs: [
        {
          text: "Advertising the requirements, taking bids and evaluating them runs into months, which is why it starts while the prototyping is still going on rather than after it.",
        },
        {
          text: "Whether Alpha ends with a contract signed or with one still to sign depends on the route, and both are normal. What is not survivable is a competition that has not started by the time Alpha closes, because then Beta simply waits.",
          bold: [{ phrase: "a competition that has not started by the time Alpha closes" }],
          internalLinks: [{ phrase: "Beta", to: "/create-beta" }],
        },
      ],
    },
  ] satisfies FinishBlock[],
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
      text: "Whatever the team made is either archived or carried into Beta, depending on how it was built, and what all of it taught becomes the requirements either way. Have these ready before Beta starts:",
      bold: [{ phrase: "what all of it taught becomes the requirements" }],
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
        text: "The competition run and the contract ready to sign, with the exit rights and the data portability in it. Beta opens with the signature, so anything still being negotiated is time Beta spends waiting.",
        bold: [{ phrase: "The competition run and the contract ready to sign," }],
        onlyIf: "buying a solution or a product",
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
      {
        text: "Every official checkpoint that Alpha reaches is done: the assessments started or finished, the boards attended, the approvals given. The table below names each one, what stage it reaches in Alpha, and who does the work.",
        bold: [{ phrase: "Every official checkpoint that Alpha reaches is done" }],
      },
    ] satisfies readonly (ThreadLinkedProse & {
      subItems?: readonly ThreadLinkedProse[];
      onlyIf?: string;
    })[],
  },
};

export const ALPHA_SECTION_NAV = {
  prev: { href: "/create-discovery", label: "Discovery sub-phase", level: "subphase" },
  next: { href: "/create-beta", label: "Beta sub-phase", level: "subphase" },
} satisfies { prev: SectionNavLink; next: SectionNavLink };
