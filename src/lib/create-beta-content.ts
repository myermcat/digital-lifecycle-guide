import type { LucideIcon } from "lucide-react";
import {
  Archive,
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
import {
  ACCESSIBILITY_EXCLUSION_GROUPS,
  ACCESSIBILITY_EXCLUSION_INTRO,
} from "@/lib/accessibility-exclusion-groups";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import type { LifecycleVisualAsset } from "@/lib/lifecycle-visuals";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { FinishBlock } from "@/components/SubphaseFinishSection";
import type { SectionNavLink } from "@/components/SubphaseSectionNav";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";

export const BETA_EXTRACT = {
  spine: "Beta exists to build the service for real, and prove it before it becomes official.",
  opening: {
    text: "Beta is the third sub-phase of Create. The team takes the tested idea from Alpha and:",
    internalLinks: [{ phrase: "Create", to: "/create" }],
  } satisfies ThreadLinkedProse,
  workOutItems: [
    "signs the contract for the build, if buying.",
    "builds or configures the real thing, at production quality.",
    "proves it with real people, in a private beta and then a public beta.",
  ],
  whatsNew: {
    label: "New since Alpha",
    text: "The build is real, and the public starts using it.",
  },
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
    text: "There are two parts to Beta: private and public. Before either, be exact about what changed. People were trying things in Alpha too, so their arrival is not what moved. What moved is that the service is real, and what people do in it counts. Somebody's application exists afterwards. That is the line. It is why a prototype tested with five real users is still Alpha, and why the smallest version that works end to end belongs here.",
    bold: [
      {
        phrase:
          "What moved is that the service is real, and what people do in it counts.",
      },
    ],
  } satisfies ThreadLinkedProse,
  privateBeta: {
    text: "Private beta. Beta starts private. A limited number of people are invited to use the real service, so the team can get feedback and improve it while the audience is still small enough to apologise to.",
    bold: [{ phrase: "Private beta." }],
  } satisfies ThreadLinkedProse,
  publicBeta: {
    text: "Public beta. Once the service has been improved and the team is confident it can be run at scale, it opens to anyone who needs it. If it replaces an existing service, it runs alongside the old way until launch.",
    bold: [{ phrase: "Public beta." }],
  } satisfies ThreadLinkedProse,
  keepOldService: {
    text: "If the service is replacing an existing one, keep the old service running until the new one is properly live. Beta is not the moment to switch it off. If the service is new, there is nothing to keep running, and this does not apply.",
  } satisfies ThreadLinkedProse,
  notLaunch: {
    text: "Neither private beta nor public beta is a launch. Launch is when the service becomes the official one for everyone. If there was an older way of doing this, that is when it is retired, and the older way is whatever people were actually using before: a paper form, a phone line, an inbox, or an application that has been running for fifteen years. If the service is new, there is nothing to retire. Either way, launch is what ends Beta.",
  } satisfies ThreadLinkedProse,
};

export const BETA_ON_RAMP = {
  title: "Before you start Beta",
  intro:
    "The minimum you should already have. These are things you bring IN, not things Beta produces.",
  items: [
    {
      text: "A tested idea from Alpha, and evidence it works for real people.",
      bold: [{ phrase: "A tested idea from Alpha," }],
    },
    {
      text: "A decision on whether to reuse, buy, or build, and the reasoning written down.",
      bold: [{ phrase: "A decision on whether to reuse, buy, or build," }],
    },
    {
      text: "The competition finished and the contract ready to sign, if the department is buying a solution or a product. The competition ran through Alpha; signing the contract is Beta's first act, before any building. A department building in-house or reusing an existing platform has no contract to sign and skips this.",
      bold: [{ phrase: "The competition finished and the contract ready to sign," }],
    },
    {
      text: "Funding and approval that cover the build as well as the research, and can fit within the department's existing operating budget.",
      bold: [{ phrase: "Funding and approval" }],
    },
    {
      text: "A named product owner with the authority to make decisions.",
      bold: [{ phrase: "A named product owner" }],
    },
    {
      text: "The go and no-go criteria for launch, written down and agreed. Do this before a launch date exists and before anyone is attached to one. Agreed in advance, the criteria let the evidence deliver the bad news, so stopping is a decision the department already made instead of one person finding the courage to tell a room full of invested people that the launch is off.",
      bold: [{ phrase: "The go and no-go criteria for launch," }],
    },
    {
      text: "The accessibility testing booked with the people most likely to be excluded, and the accessibility clauses of the standard identified so they can go into the contract.",
      bold: [{ phrase: "The accessibility testing booked" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const BETA_PILLAR = {
  label: "THE CONTRACT",
  title: "The contract you sign will outlive the service",
  icon: FileSignature,
  bodyIntro: {
    text: "When you buy, the contract, whenever in the journey it was signed, is what the department has to live with. Signature is the moment the department has real leverage, because nothing has been committed yet.",
    bold: [{ phrase: "the contract, whenever in the journey it was signed," }],
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
    {
      text: "the accessibility clauses, and an accessibility conformance report from the supplier. In Canada the accessibility check happens when you buy, so a service bought without those clauses is a service you will pay twice to fix.",
      bold: [{ phrase: "the accessibility clauses" }],
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
  /**
   * One line under the title, readable while the row is closed.
   *
   * Seven closed rows of full sentences give a reader no way to tell which one
   * holds what they came for, so each row says what is inside it.
   */
  triggerNote?: string;
  headerVisual?: LifecycleVisualAsset;
  sections: readonly ThreadContentSection[];
};

export const BETA_ACCORDION = {
  id: "what-to-build-and-prove",
  title: "What to build and prove in Beta",
} as const;

export const BETA_ACCORDION_STAGES: readonly BetaAccordionStage[] = [
  {
    id: "when-contract-signed",
    icon: FileSignature,
    title: "The contract, if there is one, is signed here, before any building.",
    triggerNote: "What you are signing, and what has to be in it before you do.",
    sections: [
      {
        text: "Where the contract falls depends on the route. Under the multi-supplier model PSPC sets out, it was signed as Alpha opened, and what happens at this boundary is an amendment exercising the option to build.",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Buying a Solution. The competition ran through Alpha, and suppliers proposed how to solve the problem. The contract for the real build is signed now, before any building.",
            bold: [{ phrase: "Buying a Solution." }],
            internalLinks: [{ phrase: "Alpha", to: "/create-alpha" }],
          },
          {
            text: "Buying a Finished Product. The department evaluated real products against what Discovery and Alpha found. The contract is signed now, before configuration begins.",
            bold: [{ phrase: "Buying a Finished Product." }],
          },
          {
            text: "Buying a Team, or building in-house. Nothing is signed in Beta. The Team contract was signed as Alpha opened, and an in-house build has no contract at all.",
            bold: [{ phrase: "Buying a Team, or building in-house." }],
            internalLinks: [{ phrase: "Discovery", to: "/create-discovery" }],
          },
        ],
      },
      {
        text: "If a contract is signed here, this is the moment the department has leverage, because nothing has been committed yet. Everything in the pillar callout above is won at that signature, or it is not won at all.",
        bold: [
          {
            phrase:
              "If a contract is signed here, this is the moment the department has leverage, because nothing has been committed yet.",
          },
        ],
      },
      {
        text: "Procurement sets out the four routes and how each one runs.",
        internalLinks: [{ phrase: "Procurement", to: "/thread/procurement" }],
      },
    ],
  },
  {
    id: "build-smallest-real-thing",
    icon: Wrench,
    title: "Build the smallest real thing that works end to end.",
    triggerNote: "One complete journey, built for real, with every other feature left out.",
    sections: [
      {
        text: "This is the first code, or the first configuration, meant to survive. Most existing Government of Canada services were bought, reused, or configured rather than written from scratch, and Beta is where that product is actually stood up.",
        bold: [{ phrase: "existing" }],
      },
      {
        text: "Build the simplest thing that meets the need, all the way through the journey. A service that works beautifully right up to the point where someone has to upload a document, and then cannot, has not helped that person at all.",
        bold: [{ phrase: "simplest thing that meets the need, all the way through the journey" }],
      },
      {
        text: "Both official languages, from the first screen. A public-facing digital service has to be offered and delivered in English and French, equally and at the same time. That covers the interface, the content, the notifications, the error messages, and the people answering the phone behind it. Equal quality is the test, so a French version that arrives a sprint later, or reads like a translation of an English idea, does not meet it.",
        bold: [{ phrase: "Both official languages, from the first screen." }],
      },
      {
        text: "Retrofitting is where the cost arises. French text runs longer than English, so a layout designed around English strings breaks when the real content arrives. Build and test in both from the start, and include francophone users in the research rather than checking the translation at the end.",
      },
      {
        text: "Where a supplier builds, hosts, supports, or writes content for any part of the service, the obligation belongs in the contract. A supplier who is not contractually bound to deliver French will bill for it later as a change. The requirement comes from the business owner; the contracting authority writes the clauses.",
        internalLinks: [{ phrase: "contracting authority", to: "/thread/procurement" }],
      },
      {
        text: "How the service is delivered is what triggers the duty. How much of the country it reaches does not. Section 24(1)(b) of the Official Languages Act lets regulations name the circumstances that make an office bilingual. Section 11(b) of the Official Languages (Communications with and Services to the Public) Regulations names one of them: communications and services made available through an automated system accessible to the public. A digital service is such a system. So a service used in one region is caught on the same terms as a national one. Reach does appear elsewhere in the same regulation, at section 11(a), but only for correspondence and telephone services.",
      },
      {
        text: "Once the service is bilingual, the Directive on Official Languages for Communications and Services sets how. Subsection 6.6.4.1 requires web content in both languages to be available at the same time and to be of equal quality, which is what rules out releasing English first and following with French. Subsections 6.2.1 and 6.2.2 cover the active offer, meaning the service says in both languages that it is available in both. Complaints go to the Commissioner of Official Languages.",
      },
      {
        text: "Where a supplier delivers the service on the department's behalf, section 25 of the Act carries the duty across to them, so buying delivery does not buy out of the obligation.",
      },
      {
        text: "As the build starts:",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "The Alpha prototype is rarely the right thing to polish into the real one. It was built to be thrown away, and it carries every shortcut that was taken on that understanding. Where the team cannot account for what is inside it, starting again is usually cheaper than untangling it.",
            bold: [{ phrase: "The Alpha prototype is rarely the right thing to polish into the real one." }],
          },
          {
            text: "Set up the pipeline that will release changes safely, small and often, because it is needed from the first day the service is live.",
            internalLinks: [{ phrase: "release changes", to: "/thread/releasing-changes" }],
          },
          {
            text: "If the service handles personal information used to make decisions about people, do the Privacy Impact Assessment before it opens. Privacy covers what it involves.",
            internalLinks: [{ phrase: "Privacy Impact Assessment", to: "/thread/privacy" }],
          },
          {
            text: "Inventory the dependencies the service will rest on, and know who patches them.",
            internalLinks: [
              { phrase: "dependencies", to: "/thread/dependencies-and-standards" },
            ],
          },
        ],
      },
      {
        text: "Two authorizations stand between the build and production, and neither is quick:",
      },
      {
        text: "The service cannot run in production until it is authorized to. This is the Security Assessment and Authorization, and it ends in an Authority to Operate. It comes from the Treasury Board Directive on Security Management and the controls in ITSG-33. It is not a formality and it is not quick, so start it early.",
        bold: [
          { phrase: "The service cannot run in production until it is authorized to." },
          { phrase: "Security Assessment and Authorization" },
        ],
        externalLinks: [
          {
            phrase: "Directive on Security Management",
            linkKey: "directive-security-management",
          },
          { phrase: "ITSG-33", linkKey: "itsg-33" },
        ],
      },
      {
        text: "Who signs it is not automatic. There are three cases:",
        bold: [{ phrase: "Who signs it is not automatic." }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "A service that belongs to one department. The business owner normally signs, accepting the risk on the department's behalf.",
            bold: [{ phrase: "A service that belongs to one department." }],
          },
          {
            text: "A common or enterprise system. The Chief Information Officer of Canada signs, including when the system runs on a Shared Services Canada platform.",
            bold: [{ phrase: "A common or enterprise system." }],
          },
          {
            text: "A system two or more organizations share. The manager of that program or service signs.",
            bold: [{ phrase: "A system two or more organizations share." }],
          },
        ],
      },
      {
        text: "Find out which case this is in Alpha. Leaving it to Beta means answering the question under launch pressure.",
      },
      {
        text: "The authorization rests on the last pass of the Threat and Risk Assessment. The earlier ones ran against the design, first at a high level in Alpha and again against the detailed design. This one runs against the system that was actually built, because the answer changes once it is real. What it finds becomes the residual risk assessment, the record of the risk that is left for whoever signs to accept. Security covers how that work is done.",
        bold: [{ phrase: "This one runs against the system that was actually built" }],
        externalLinks: [
          { phrase: "Threat and Risk Assessment", linkKey: "harmonized-tra-methodology" },
        ],
        internalLinks: [{ phrase: "Security", to: "/thread/security" }],
      },
      {
        text: "If the service makes or supports an automated decision about a person, the Algorithmic Impact Assessment has to be completed, approved and published on the Open Government Portal before the system goes into production. Under the Directive on Automated Decision-Making this is a publication requirement, and it is easy to miss.",
        bold: [
          { phrase: "If the service makes or supports an automated decision about a person," },
          {
            phrase:
              "published on the Open Government Portal before the system goes into production",
          },
        ],
        externalLinks: [
          { phrase: "Algorithmic Impact Assessment", linkKey: "algorithmic-impact-assessment" },
        ],
      },
    ],
  },
  {
    id: "private-beta",
    icon: UserCheck,
    title: "Private beta: prove it with a few real people.",
    triggerNote: "An invited group, a capped volume, and what you watch for.",
    sections: [
      {
        text: "A private beta is invite-only. It is not a soft launch, and it is not announced.",
        bold: [{ phrase: "invite-only" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Choose who is in it. A small, invited group is given access, and they use the service to do the thing they actually came to do. Nothing is simulated: the grant they apply for is a real grant, the permit they get is a real permit, and the money is really theirs.",
            bold: [{ phrase: "Choose who is in it." }, { phrase: "Nothing is simulated:" }],
          },
          {
            text: "Cap the volume. Keep control of how many transactions go through, so a fault costs a handful of people rather than a province.",
            bold: [{ phrase: "Cap the volume." }],
          },
          {
            text: "Test in short rounds. Invite, watch, fix, invite again. The rounds get shorter as the service firms up.",
            bold: [{ phrase: "Test in short rounds." }],
          },
          {
            text: "Find what is broken while the audience is small enough to apologise to.",
            bold: [{ phrase: "Find what is broken while the audience is small enough to apologise to." }],
          },
        ],
      },
      {
        text: "The exit test for private beta: the service works end to end, for a real person, without anyone stepping in behind the scenes to rescue it. Keep the private beta running until that is true.",
        bold: [{ phrase: "The exit test for private beta:" }, { phrase: "end to end" }],
      },
    ],
  },
  {
    id: "public-beta",
    icon: Users,
    title: "Public beta: open it to anyone who needs it.",
    triggerNote: "Opening up, holding the old service open beside it, and when to stop.",
    sections: [
      {
        text: "Public beta is the real service, available to the public. If the service replaces an existing one, it runs alongside the old way until launch.",
        bold: [{ phrase: "Public beta" }],
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "If the service replaces an existing one, keep the old one running. People who cannot or will not switch yet must still be able to get what they need, and Beta is not the moment to switch the old way off. If the service is new, there is nothing to keep running, and this does not apply to you.",
            bold: [
              { phrase: "If the service replaces an existing one, keep the old one running." },
              { phrase: "If the service is new, there is nothing to keep running, and this does not apply to you." },
            ],
          },
        ],
      },
      {
        text: "Fix what the accessibility testing found before you open. Meeting the accessibility standard is a legal duty. A published accessibility statement is also coming: under the amended Accessible Canada Regulations it phases in from December 2027, and it belongs to the department, so one statement can cover many services.",
        bold: [{ phrase: "Fix what the accessibility testing found before you open." }],
        internalLinks: [{ phrase: "accessibility", to: "/thread/accessibility" }],
      },
      {
        text: ACCESSIBILITY_EXCLUSION_INTRO,
      },
      {
        type: "unorderedList",
        items: [...ACCESSIBILITY_EXCLUSION_GROUPS],
      },
      {
        text: "Automated checkers catch only a fraction of the problems.",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Be able to run it at scale, and to keep improving it while the public is using it.",
            bold: [{ phrase: "run it at scale" }],
          },
        ],
      },
      {
        text: "Proving and launching are separate moments. Launch is when the service becomes the official one for everyone, and where there was an older way, that is when it is retired. That is what ends Beta. A service that goes straight from prototype to everyone arrives without ever having been tested.",
        bold: [{ phrase: "Proving is not launching." }, { phrase: "the official one for everyone" }],
      },
    ],
  },
  {
    id: "build-dashboard",
    icon: Gauge,
    title: "Build the dashboard, and decide who owns it.",
    triggerNote: "The four measures every service reports, and who keeps them current.",
    headerVisual: LIFECYCLE_VISUALS.serviceDashboard,
    sections: [
      {
        text: "The service needs to be watchable from the day it goes live, so the dashboard is built here rather than after.",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Decide the few numbers that will tell you whether the service is working for the people using it, and instrument the service to emit them. Monitoring covers what to measure and how.",
            internalLinks: [
              { phrase: "Monitoring", to: "/thread/monitoring-and-instrumentation" },
            ],
          },
          {
            text: "Name whose job the dashboard is. It is often the vendor who builds it, which means it has to be written into the contract, or it may never exist.",
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
    triggerNote: "Support, the people, and the budget that has to renew.",
    sections: [
      {
        text: "A service that nobody is staffed to operate can decay from its first week.",
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
  {
    id: "decide-records-disposition",
    icon: Archive,
    title: "Decide now what happens to the records.",
    triggerNote: "Retention and disposition, settled while the system is still being built.",
    sections: [
      {
        text:
          "The service's design is settled here and the contract is being signed. This is also when the team knows what information the service will hold. The decision about what happens to it at the end, which records get kept, transferred to Library and Archives Canada, or disposed of, should be made now, not at Sunset. By Sunset, the lead time is often too short and the options are fewer.",
      },
      {
        text:
          "Ask the department's information management (IM) office to confirm which Records Disposition Authorizations cover the records this service will hold. There are two kinds: Multi-Institution Disposition Authorizations (MIDAs) cover administrative records common across government; Institution-Specific Disposition Authorizations (ISDAs) cover records unique to a program. If no authorization covers the program records, grants decisions, assessments, case files, requesting one from Library and Archives Canada takes time. Starting now leaves options open.",
      },
      {
        text: "Two things to do in Beta:",
      },
      {
        type: "unorderedList",
        items: [
          "Ask the IM office which disposition authorities apply to the records this service will hold, and flag any gaps.",
          "If a supplier will hold or process the records, include the retention and disposition requirements in the contract.",
        ],
      },
      {
        text:
          "If the service is replacing an existing one, this conversation should start at Discovery of the replacement, when the decision to replace is made, not 12 to 18 months before the old service is switched off. Data stewardship covers deciding what happens to the data, in full.",
        internalLinks: [
          { phrase: "Discovery", to: "/create-discovery" },
          { phrase: "Data stewardship", to: "/thread/data-stewardship" },
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
  lead: "Some of the signs to watch for:",
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
    text: "The finish criteria. Beta is done when the service has been through private beta and then public beta, has been used by real people at scale, and has held up. It delivers the whole journey, end to end. The service meets the accessibility standard and what the testing found has been fixed, the privacy assessment is done, the dashboard is live, and the support is staffed.",
    bold: [{ phrase: "The finish criteria." }],
  } satisfies ThreadLinkedProse,
  blocks: [
    {
      heading: "The department can carry it after launch",
      paragraphs: [
        {
          text: "This is the test the guide exists for. The department can support the service and keep improving it, every year, until it is replaced or retired. If it cannot, the service is not ready to launch, however well it demos.",
        },
        {
          text: "Support means named people with time in their week, money in a budget that renews, and somewhere for a user to go when the service fails them. A launch with none of those produces a service that degrades from its first day and has nobody whose job it is to notice.",
        },
      ],
    },
    {
      heading: "The launch decision runs against the criteria you already wrote",
      paragraphs: [
        {
          text: "The go and no-go criteria were agreed at the start of Beta, before a launch date existed. The decision at the end of Beta is reading the evidence against them, and that is all it should be. Rewriting the criteria once the date is in a minister's calendar defeats the point of having written them.",
          internalLinks: [{ phrase: "start of Beta", to: "/create-beta" }],
        },
      ],
    },
  ] satisfies FinishBlock[],
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
      text: "Off-ramp to-do. Alpha's list was about the build: everything on it was something a supplier could be asked to deliver. This one is about the department, and by that the guide means commitments no supplier can make on the department's behalf: people with the service in their objectives, budget that renews without anyone arguing for it again, and authorizations that belong to a named official. Each item has to be true on the day the service stops being a project and becomes someone's long-term responsibility. Before you move to Stabilization, have ready:",
      bold: [
        { phrase: "Off-ramp to-do." },
        { phrase: "This one is about the department." },
        { phrase: "Stabilization" },
      ],
      internalLinks: [{ phrase: "Stabilization", to: "/live-stabilization" }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "The contract, whenever in the journey it was signed, with the exit rights, the data portability, and the code repository in it.",
        bold: [{ phrase: "The contract," }],
      },
      {
        text: "The accessibility standard met, and the testing done with the people most likely to be excluded, with its findings fixed. No official requirement demands the testing; it is the only way to know the standard is met in practice.",
        bold: [{ phrase: "The accessibility standard met," }],
      },
      {
        text: "Every official checkpoint that Beta reaches is done. The table below this section names each one, what stage it reaches, and who does the work, so they are not listed here. One of them decides whether the service can launch at all: without the Authority to Operate the service is not allowed to run in production.",
        bold: [
          { phrase: "Every official checkpoint that Beta reaches is done." },
          { phrase: "without the Authority to Operate the service is not allowed to run in production" },
        ],
      },
      {
        text: "The continuity arrangements in place. The recovery targets set in Alpha are with the department's business continuity coordinator. If the service is critical, it is named in the departmental plan, with its downtime limit and the steps for getting it back.",
        bold: [{ phrase: "The continuity arrangements in place." }],
      },
      {
        text: "The restore tested at least once. Nobody knows whether a backup works until someone has used it to rebuild the service.",
        bold: [{ phrase: "The restore tested at least once." }],
      },
      {
        text: "The dashboard live, and a named person who owns it.",
        bold: [{ phrase: "The dashboard live," }],
      },
      {
        text: "The support model staffed and reachable.",
        bold: [{ phrase: "The support model" }],
      },
      {
        text: "The team that will run the service named, and enough of it in-house to govern the work.",
        bold: [{ phrase: "The team that will run the service" }],
      },
      {
        text: "If the service replaces an existing one, the old way still running, with a dated plan to retire it once the new service is properly live. It is not switched off in Beta. If the service is new, this does not apply.",
        bold: [{ phrase: "still running" }],
      },
      {
        text: "The disposition authorities for the records the service will hold confirmed with the information management office, and any gaps flagged.",
        bold: [{ phrase: "The disposition authorities" }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};

export const BETA_SECTION_NAV = {
  prev: { href: "/create-alpha", label: "Alpha sub-phase", level: "subphase" },
  next: { href: "/live", label: "Live phase", level: "phase" },
} satisfies { prev: SectionNavLink; next: SectionNavLink };
