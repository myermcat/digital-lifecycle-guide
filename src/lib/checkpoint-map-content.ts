import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  Layers,
  LayoutGrid,
  Lock,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { ExternalLinkKey } from "@/lib/external-links";
import { CHECKPOINT_MAP_PATH } from "@/lib/reference-paths";

export type CheckpointMapWhoTag = "dept" | "central";

export type CheckpointMapBodyPart =
  | { type: "p"; text: string; bold?: readonly string[] }
  | { type: "ul"; items: readonly string[]; itemBold?: readonly string[] }
  | { type: "caution"; lead: string; text: string };

export type CheckpointMapCell = {
  /** Bold lead-in for the cell. */
  lead: string;
  body?: readonly CheckpointMapBodyPart[];
};

export type CheckpointMapResponse = CheckpointMapCell & {
  /** Empty for "Nothing yet." */
  tags: readonly CheckpointMapWhoTag[];
};

export type CheckpointMapStep = {
  n: number;
  action: CheckpointMapCell;
  response: CheckpointMapResponse;
};

export type CheckpointMapFork = {
  /** Bold opening phrase / title. */
  title: string;
  /** Rest of the fork body; may continue the title sentence. */
  text: string;
  bold?: readonly string[];
  /** Phrases rendered in the primary "checkpoint" weight. */
  checkpointPhrases?: readonly string[];
};

export type CheckpointMapPhaseBlock = {
  id: "discovery" | "alpha" | "beta" | "live" | "sunset";
  heading: string;
  /** Text inside the duration pill. */
  durationLabel: string;
  /** Rest of the phase note, after the pill. */
  phaseNote: string;
  /** Steps before any mid-phase fork. */
  steps: readonly CheckpointMapStep[];
  /** Fork that sits between steps (Discovery, after step 5). */
  forkAfter?: CheckpointMapFork;
  /** Steps after the mid-phase fork (Discovery 6-7). */
  stepsAfterFork?: readonly CheckpointMapStep[];
  /** Fork after all steps (Alpha bigger project, Beta automated decision). */
  forkEnd?: CheckpointMapFork;
  showLaunchAfter?: boolean;
};

export type CheckpointMapLink = {
  label: string;
  linkKey: ExternalLinkKey;
  icon: LucideIcon;
};

export type CheckpointMapGroup = {
  phaseLabel: string;
  links: readonly CheckpointMapLink[];
  entries: readonly { term: string; def: string }[];
};

export type CheckpointMapWhoEntry = { term: string; def: string };

/* ---------------------------------------------------------------------- */
/* Page-level constants                                                   */
/* ---------------------------------------------------------------------- */

export { CHECKPOINT_MAP_PATH };

export const CHECKPOINT_MAP_EYEBROW = "See the whole path";

export const CHECKPOINT_MAP_TITLE = "The official checkpoints of a digital service";

export const CHECKPOINT_MAP_SUBTITLE = {
  text: "A worked example of the official checkpoints, the approvals, reviews, and sign-offs a Government of Canada service has to pass through, from the first problem definition all the way to retiring or replacing it, and who owns each one.",
  bold: ["official checkpoints"],
} as const;

/** Shown at the very top of the page, in the caution tone, before anything else. */
export const CHECKPOINT_MAP_STATUS_BANNER = {
  label: "Work in progress",
  lines: [
    "This page is unfinished and may not survive. It carries 17 of the 35 official instruments the guide now knows about, because it was written before that list existed.",
    "The complete list is the table on the home page, which is kept up to date. This page may end up folded into it, or rewritten as a worked example that points at it. Use the table for completeness and this page for the shape of the journey.",
  ],
} as const;

export const CHECKPOINT_MAP_HOW_TO_USE = {
  heading: "How to use this page",
  items: [
    {
      lead: "To find out what applies to your service, use Annex 1.",
      body: "It has a row for every official instrument a Government of Canada digital service can meet, with what it is, what brings it into scope, and what the business owner personally has to do about it. Read down the scope column and rule out what does not apply to you.",
    },
    {
      lead: "To get a feel for the order and the people, use Annex 2.",
      body: "It follows one invented service from the first sign of trouble to the day it is replaced, showing what its director general does at each step and who answers. It is a worked example of one route, not a template.",
    },
    {
      lead: "To understand a single instrument properly, follow it to its thread page.",
      body: "Each subject, security, privacy, accessibility, procurement, has a page of its own in the guide that explains the reasoning. This page is the index, not the explanation.",
    },
  ],
} as const;

export const CHECKPOINT_MAP_VARIES = {
  heading: "Nearly everything on this page varies",
  paragraphs: [
    "The checkpoints themselves are real and they are set out in Government of Canada instruments. Almost everything around them is not fixed. Which ones apply depends on what the service does and how much is being spent. Who chairs a board, what a department's thresholds are, who signs, and how each step is run in practice differ from one department to the next.",
    "Timing varies most of all. Nothing here says how long a step takes, because that depends on the department's capacity, the queue in front of you, and what else is happening that year. Where this page gives a duration, treat it as one team's experience rather than a planning figure, and confirm it against your own department.",
    "The order varies too. The sequence a service meets these checkpoints in follows the route it takes: buying a finished product, contracting a team, running an agile procurement and building in-house all rearrange them, and some fall away entirely.",
  ],
} as const;

export const CHECKPOINT_MAP_JUMP = [
  { label: "What this page covers", href: "#what-this-covers" },
  { label: "Annex 1: every official thing", href: "#annex-instruments" },
  { label: "Annex 2: one service's path", href: "#annex-nadia" },
] as const;

/** On-this-page rail items for the checkpoint map (same targets as CHECKPOINT_MAP_JUMP). */
export const CHECKPOINT_MAP_ON_THIS_PAGE = CHECKPOINT_MAP_JUMP.map((item) => ({
  id: item.href.slice(1),
  label: item.label,
}));

export const CHECKPOINT_MAP_ANNEX_ONE = {
  id: "annex-instruments",
  label: "ANNEX 1",
  heading: "Every official thing a service has to do",
  intro:
    "One row per instrument: what it is, when in a service's life it comes up, and what the business owner personally has to do about it. Nothing here is specific to one department or one kind of service, so this is the list to check your own service against.",
} as const;

export const CHECKPOINT_MAP_ANNEX_TWO = {
  id: "annex-nadia",
  label: "ANNEX 2",
  heading: "One service's path, step by step",
  timelineNote:
    "The durations below are what this one service experienced. They are not a planning figure, and Create in particular can run considerably shorter or longer.",
  intro:
    "Annex 1 says what exists. This annex puts it in order, by following one invented service from the first sign of trouble to the day it is replaced. Read it for the sequence and for who Nadia has to talk to at each point, not as a second list of instruments.",
  pathNote:
    "Nadia took one path, and the steps below are in the order that path produced. A department that buys a finished product, or builds in-house, or runs an agile procurement, meets the same checkpoints in a different order. Even where the contract is signed moves by a whole sub-phase depending on the route chosen, so treat the sub-phase headings here as this service's sequence rather than as the sequence.",
} as const;

export const CHECKPOINT_MAP_NADIA = {
  heading: "Meet Nadia, a director general",
  body: "Her grants program has outgrown its spreadsheets, so she is buying a grants management system. Her project scores below her department's threshold, so it stays inside the department: no Treasury Board submission and no GC EARB. That is the ordinary case, roughly 95% of projects. Where a bigger project would branch upward is shown in the amber boxes.",
  bold: ["below"],
  amber: ["amber boxes"],
} as const;

export const CHECKPOINT_MAP_WHY_GCS = {
  heading: "Why G&Cs is the example",
  body: "This journey is built around a grants and contributions system because it is a useful worked case: it touches almost every checkpoint at once - public money, procurement, a security authorization, personal information, records, and a decision made about people. The guide as a whole is not limited to G&Cs; any service can be mapped through the same path.",
} as const;

export const CHECKPOINT_MAP_WHY_CREATE = {
  heading: "Why the Create phase fills most of this table",
  body: "The official checkpoints are front-loaded. Almost every formal approval, review, and sign-off happens before launch, so Create carries most of the rows. Live and Sunset look shorter here only because this table follows the checkpoints, not because there is less to do in them.",
} as const;

export const CHECKPOINT_MAP_WHAT_TABLE = {
  heading: "What this map covers",
  body: "It is an overview of the official checkpoints only, the formal approvals, reviews, and sign-offs, laid out across the whole journey from the first problem to retiring or replacing the service. It is not the whole journey, and it does not tell Nadia how to do the work inside each step. That detail lives in the phase and sub-phase documents. This is the map of the checkpoints she has to pass through; the people she talks to give her the rest.",
  bold: ["official checkpoints only"],
} as const;

export const CHECKPOINT_MAP_COLKEY = {
  left: "Left is what Nadia does.",
  right:
    "Right is who answers, and how. The tag on each response says whether the responder is her department or a central agency.",
  rightTags: { dept: "her department", central: "central agency" },
} as const;

export const CHECKPOINT_MAP_LAUNCH = {
  tag: "LAUNCH",
  text: "The service goes live here. Everything above is Create (the build); everything below is Live and Sunset (running it, then retiring or replacing it).",
} as const;

export const CHECKPOINT_MAP_VARY_NOTE =
  "Departmental mechanics and timelines vary; confirm against your own department before treating any step as fixed.";

export const CHECKPOINT_MAP_FOOTER_DISCLAIMER =
  "Nadia is invented, and so is her program. Any resemblance to real persons or programs is coincidental.";

/* ---------------------------------------------------------------------- */
/* Phase blocks (all 21 steps, forks, launch)                             */
/* ---------------------------------------------------------------------- */

export const CHECKPOINT_MAP_PHASES: readonly CheckpointMapPhaseBlock[] = [
  {
    id: "discovery",
    heading: "Create · Discovery - work out what is needed",
    durationLabel: "Typical: weeks to a few months · varies",
    phaseNote:
      "Funded from the department's existing operating budget. This is where the path is decided. Nadia has spotted a problem. Discovery is where she works out how serious it is, who needs to be brought in, and which path the project should take.",
    steps: [
      {
        n: 1,
        action: {
          lead: "Notices the program is breaking.",
          body: [
            {
              type: "p",
              text: "Applications have doubled, her team cannot keep up, applicants cannot track anything, and auditors cannot verify decisions. She decides something has to change.",
            },
          ],
        },
        response: {
          tags: [],
          lead: "Nothing yet.",
          body: [
            {
              type: "p",
              text: "This is her problem to raise. The guide's point: she already owns a digital service, whether she calls it that or not.",
            },
          ],
        },
      },
      {
        n: 2,
        action: {
          lead: "Calls her own department's corporate services.",
          body: [{ type: "p", text: 'Asks, plainly, "where do I start?"' }],
        },
        response: {
          tags: ["dept"],
          lead: "Corporate services is the front door.",
          body: [
            {
              type: "p",
              text: "The enabling branches walk her through it and point her on:",
            },
            {
              type: "ul",
              items: [
                "the CIO or IT office",
                "finance",
                "procurement",
                "security",
                "the privacy (ATIP) office",
                "records",
              ],
            },
            {
              type: "p",
              text: "If anything later needs a central agency, her department is the one that takes it there.",
            },
          ],
        },
      },
      {
        n: 3,
        action: {
          lead: "Pulls together a small team to look into it.",
          body: [
            {
              type: "p",
              text: "She cannot do this alone, and she is not meant to.",
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "A few people, drawn from two places.",
          body: [
            {
              type: "p",
              text: "Some from her own program who know the work, and, through the CIO or IT office, a business analyst and often a project manager from the departmental project-management office. The team is small in Discovery and grows through Beta as the build and the supplier's people come on. Nadia sponsors it; she does not do the hands-on work herself.",
            },
          ],
        },
      },
      {
        n: 4,
        action: {
          lead: "Writes up the need and gets it onto the plan.",
          body: [
            {
              type: "p",
              text: "A short concept case describing the problem and roughly what it would take.",
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "Her management chain and the CIO's planning team.",
          body: [
            {
              type: "p",
              text: "They add the initiative to the departmental plan and the departmental investment plan (approved by the deputy head). She feeds the initiative in; she does not update those plans herself.",
              bold: ["departmental plan", "departmental investment plan"],
            },
          ],
        },
      },
      {
        n: 5,
        action: {
          lead: "Gets the project sized, risk-rated, and costed.",
          body: [
            { type: "p", text: "How big is this really, and how risky?" },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "The departmental project-management or investment office.",
          body: [
            {
              type: "p",
              text: "It helps her team complete the Project Complexity and Risk Assessment (PCRA), a detailed multi-section questionnaire (how this is organized varies by department).",
              bold: ["Project Complexity and Risk Assessment (PCRA)"],
            },
            {
              type: "ul",
              items: [
                "the deputy head is accountable for an accurate score",
                "that score is compared against the department's approved project-management capacity class (set by an Organizational Project Management Capacity Assessment)",
              ],
              itemBold: ["deputy head", "project-management capacity class"],
            },
          ],
        },
      },
    ],
    forkAfter: {
      title: "The choice that decides everything.",
      text: "If the PCRA level lands within the department's capacity class, the department approves and funds the project itself, which is Nadia's path. If it lands above the class, or its cost exceeds the department's delegated limit, the project needs Treasury Board approval: it goes up to GC EARB and a Treasury Board submission. That is the other ~5%, and it can add six to twelve months or more. Nadia is under the line.",
      bold: ["within", "above"],
      checkpointPhrases: ["GC EARB", "Treasury Board submission"],
    },
    stepsAfterFork: [
      {
        n: 6,
        action: {
          lead: "Asks the IT office whether anything on the GC shelf already does what she needs.",
          body: [
            {
              type: "p",
              text: "Reuse comes first in GC policy. She is not the one who searches; she is the one who decides.",
            },
          ],
        },
        response: {
          tags: ["dept", "central"],
          lead: "The CIO or IT office does the looking.",
          body: [
            { type: "p", text: "They check:" },
            {
              type: "ul",
              items: [
                "the GC Reference Architectures and the enterprise solutions catalogue (on the GC network)",
                "the Enterprise Architecture Community of Practice",
                "Shared Services Canada",
              ],
              itemBold: [
                "GC Reference Architectures",
                "Enterprise Architecture Community of Practice",
              ],
            },
            {
              type: "p",
              text: "If a fit exists, Nadia adopts it instead of buying.",
            },
          ],
        },
      },
      {
        n: 7,
        action: {
          lead: "Gets the build budget committed.",
          body: [
            {
              type: "p",
              text: "A budget outline. This covers getting from here to launch.",
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "Her own governance, because she is under threshold.",
          body: [
            {
              type: "p",
              text: "Her director commits the budget to proceed - from the department's existing funds, through the department's own governance. No Treasury Board submission. This covers Discovery, Alpha, and the Beta build.",
            },
            {
              type: "p",
              text: "The money to run it year after year (the operational budget) is different: that is set through the Estimates process once the service is Live. She should flag the expected operating cost now, even though the formal approval comes later. If the department has not thought about ongoing funding by Discovery, it is much harder to secure it after launch.",
              bold: ["run"],
            },
            {
              type: "caution",
              lead: "Common gap:",
              text: "teams plan the build cost carefully and treat the operational budget as someone else's problem. It is not - if the funding to run the service is not committed in principle by the time Beta starts, the service risks launching with no plan for what comes next.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "alpha",
    heading: "Create · Alpha - test the idea, and clear architecture review",
    durationLabel: "Typical: a few weeks · varies",
    phaseNote:
      "A prototype needs no vendor: a paper or Figma sketch is enough to show suppliers what she wants.",
    steps: [
      {
        n: 8,
        action: {
          lead: "Tests the riskiest ideas with a cheap prototype.",
          body: [{ type: "p", text: "Before committing any real money." }],
        },
        response: {
          tags: ["dept"],
          lead: "A designer and her team.",
          body: [
            {
              type: "p",
              text: "A designer (or a colleague who knows Figma, or an AI tool) makes a clickable prototype with her. No contract needed for this.",
            },
          ],
        },
      },
      {
        n: 9,
        action: {
          lead: "Takes the design to architecture review.",
        },
        response: {
          tags: ["dept"],
          lead: "The Departmental Architecture Review Board (DARB).",
          body: [
            {
              type: "p",
              text: "Chaired by her departmental CIO, it reviews the design and confirms it lines up with GC architecture standards. For a project her size, architecture review stops here.",
              bold: ["stops here"],
            },
            {
              type: "p",
              text: "Every department has its own board and there is no national page for one. The architecture team in the CIO's office is the door: they prepare the material and they know when the board sits.",
              bold: ["The architecture team in the CIO's office is the door"],
            },
          ],
        },
      },
    ],
    forkEnd: {
      title: "If the project were bigger",
      text: ", the departmental CIO would take it up to GC EARB, the Government of Canada Enterprise Architecture Review Board, co-chaired by the CTO of Canada (TBS) and the CTO of Shared Services Canada. Departments go there when a project crosses the investment or capacity thresholds, uses emerging technology, needs a policy exception, or runs on something other than public cloud. The department submits, not the individual: the CIO's architecture team prepares the material and the project team usually attends to present it. GC EARB reviews only the large or complex ones.",
      bold: ["department"],
      checkpointPhrases: ["GC EARB"],
    },
  },
  {
    id: "beta",
    heading: "Create · Beta - buy it, secure it, and prove it",
    durationLabel: "Typical: several months · varies",
    phaseNote:
      "The contract, the security authorization, and the privacy assessment all land here. Procurement alone is often a few months, longer for a full competitive tender.",
    steps: [
      {
        n: 10,
        action: {
          lead: "Writes the requirements and helps choose the supplier.",
          body: [
            { type: "p", text: "What the system has to do:" },
            {
              type: "ul",
              items: [
                "a portal for applicants",
                "a queue for adjudicators",
                "an audit trail for finance",
                "reports for Parliament",
              ],
            },
            {
              type: "p",
              text: "Nadia writes or approves the requirements, sits on the evaluation committee when bids are scored (often as chair), and endorses the final supplier choice. She does not run the competition - but she is in the room when the supplier is chosen.",
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "The contracting authority runs the mechanics.",
          body: [
            {
              type: "p",
              text: "A procurement officer in the department's own contracting branch (part of the corporate services she called in step 2), or Public Services and Procurement Canada above the department's contract limit. They:",
            },
            {
              type: "ul",
              items: [
                "advise on which procurement vehicle to use (standing offer, supply arrangement, open tender)",
                "draft the solicitation documents and post the competition",
                "manage the evaluation process and award the contract under the Directive on the Management of Procurement; the contracting authority signs, not Nadia",
                "if the supplier will handle protected information, also run it through the Contract Security Program (PSPC) for personnel and organization clearances",
              ],
              itemBold: [
                "Directive on the Management of Procurement",
                "Contract Security Program",
              ],
            },
          ],
        },
      },
      {
        n: 11,
        action: {
          lead: "Requires an accessibility report from the supplier, and checks it.",
        },
        response: {
          tags: ["dept"],
          lead: "The supplier provides an Accessibility Conformance Report.",
          body: [
            {
              type: "p",
              text: "It states how accessible one specific version of the product is, tested against the EN 301 549 standard (which includes WCAG 2.1 AA).",
              bold: ["version"],
            },
            {
              type: "caution",
              lead: "Caution:",
              text: "in the story, the report covered an older release, and the version actually deployed was never re-checked.",
            },
          ],
        },
      },
      {
        n: 12,
        action: {
          lead: "Gets the system cleared to run in production.",
        },
        response: {
          tags: ["dept"],
          lead: "The IT security team, then a senior executive.",
          body: [
            {
              type: "p",
              text: "The security team runs the Security Assessment and Authorization and hands the residual IT (cyber) security risk to the authorizing official for the program. That official signs the Authority to Operate, accepting the risk, under the Policy on Government Security, its Directive on Security Management, and ITSG-33. For a service that sits inside one department, the authorizing official is normally the business owner: Nadia signs her own.",
              bold: [
                "Security Assessment and Authorization",
                "Authority to Operate",
                "Nadia signs her own",
              ],
            },
            {
              type: "p",
              text: "What she is signing against is the Threat and Risk Assessment: what could go wrong, ranked by how likely each one is and how much damage it would do. It covers deliberate, accidental and natural causes alike, and it is required for every system. It does not start here. A first pass runs against the design back in Alpha, while the design can still change, and a second runs against the system that was actually built. A standalone report is not required. The results go into the design documents and then into the residual risk assessment inside the authorization package, so what she reads is that package. The Authority to Operate is what enforces the work, because without the assessment there is nothing for her to accept.",
              bold: [
                "Threat and Risk Assessment",
                "It does not start here.",
                "A standalone report is not required.",
              ],
            },
          ],
        },
      },
      {
        n: 13,
        action: {
          lead: "Deals with the personal information the service will hold.",
        },
        response: {
          tags: ["dept", "central"],
          lead: "The program area, with the ATIP / privacy office.",
          body: [
            {
              type: "p",
              text: "Because the grants system handles personal information, the program completes the Privacy Impact Assessment, with the ATIP office's support; it is sent to the Office of the Privacy Commissioner and TBS before launch; the Personal Information Bank is registered in the department's Info Source listing.",
              bold: [
                "Privacy Impact Assessment",
                "Office of the Privacy Commissioner",
                "Personal Information Bank",
              ],
            },
          ],
        },
      },
      {
        n: 14,
        action: {
          lead: "Proves it with real users, then launches.",
        },
        response: {
          tags: ["dept"],
          lead: "A private Beta, then a public Beta.",
          body: [
            {
              type: "p",
              text: "A small invited group uses the real service first (private Beta), then it opens to everyone (public Beta), with the old process still running until the new one is properly live.",
            },
            {
              type: "caution",
              lead: "Before launch, confirm the operating budget.",
              text: "The money to run the service year after year (flagged back in Discovery) has to be committed in principle by now, through the department's own governance. A service that launches without it can go live with no plan to keep it running.",
            },
          ],
        },
      },
    ],
    forkEnd: {
      title: "If the system automated a decision.",
      text: 'Nadia\'s adjudicators decide by hand, so this checkpoint does not apply to her. But if the grants system scored, ranked, or auto-approved applications, the Directive on Automated Decision-Making would apply. The Algorithmic Impact Assessment would then have to be completed, approved and published on the Open Government Portal before the system goes into production, with notice to applicants, a human in the loop, and an appeal route. At impact level two and above a peer review is also required, and its findings published before launch. Worth knowing, because a later "efficiency" feature can trigger all of it without anyone noticing.',
      bold: ["Directive on Automated Decision-Making"],
      checkpointPhrases: ["Algorithmic Impact Assessment"],
    },
    showLaunchAfter: true,
  },
  {
    id: "live",
    heading: "Live - run it, and put it on the record",
    durationLabel: "Ongoing, for years · varies",
    phaseNote:
      "Live is shown as a single section here because it has very few official checkpoints - far fewer than Create. The full Live phase has its own sub-phases in the playbook, from stabilising after launch, through growing the service, to the long maturity cycle. The one filing that is easy to forget is getting the service onto the official registries. Adding a significant feature can also bring earlier checkpoints back.",
    steps: [
      {
        n: 15,
        action: {
          lead: "Closes the project, and reports what it delivered.",
        },
        response: {
          tags: ["dept"],
          lead: "The project sponsor, through the department's project governance.",
          body: [
            {
              type: "p",
              text: "The funded project ends with a close-out: the department confirms what was delivered, releases what remains of the budget, and tracks whether the promised benefits arrive, the benefits realization the Treasury Board submission committed to. The Directive on the Management of Projects and Programmes sets the duty; Nadia supplies the delivery record, and the project office files it.",
              bold: ["close-out", "benefits realization"],
            },
          ],
        },
      },
      {
        n: 16,
        action: {
          lead: "Gets the live service onto the official registries.",
        },
        response: {
          tags: ["dept"],
          lead: "The service-management / CIO office registers it.",
          body: [
            {
              type: "p",
              text: "She gives the details; they register the service in the GC Service Inventory (approved by the deputy head, updated yearly) and rate the application in Application Portfolio Management. She feeds the information in; the CIO office does the registering.",
              bold: ["GC Service Inventory", "Application Portfolio Management"],
            },
          ],
        },
      },
      {
        n: 17,
        action: {
          lead: "Keeps it running and improves it.",
          body: [
            { type: "p", text: "Live has three kinds of ongoing work:" },
            {
              type: "ul",
              items: [
                "Stabilise (right after launch): fix bugs, respond to incidents, tune performance",
                "Grow: add features and improve the service as user needs evolve",
                "Mature (recurring): watch it and patch it; renew the funding before it runs out; keep the accessibility testing current, feeding the department's accessibility statement (required from December 2027); update the privacy assessment as the service changes; manage the supplier",
              ],
              itemBold: ["Stabilise (right after launch):", "Grow:", "Mature (recurring):"],
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "The running team, security, ATIP, and finance, on a recurring cycle.",
          body: [
            {
              type: "p",
              text: 'Each carries their part for as long as the service is used. The money to run it comes from the department\'s own operating budget (its reference levels), set each year through the Estimates. If the original funding was time-limited (a "sunset" clause), it has to be renewed by a new funding decision before it runs out, and that lead time is easy to underestimate.',
            },
            {
              type: "p",
              text: "Adding a significant feature can bring earlier checkpoints back: a feature that handles personal information may require an updated Privacy Impact Assessment; automating a decision triggers an Algorithmic Impact Assessment; major architectural changes go back to the DARB; a new or expanded capability may need a contract amendment or a new procurement.",
            },
            {
              type: "caution",
              lead: "Caution:",
              text: "in the story, launch was treated as the finish line, so no one clearly owned the running service and the contract's end was left unplanned. When the three-year term came up, there was no budget set aside and no lead time to re-compete or renew.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "sunset",
    heading: "Sunset - retire or replace it, and account for the data",
    durationLabel: "Typical: months · varies",
    phaseNote:
      "Fewer checkpoints than Create, but two are strict: records cannot be destroyed without Library and Archives Canada's written consent, and the security authorization has to be closed, not just switched off.",
    steps: [
      {
        n: 18,
        action: {
          lead: "Decides the service has to go.",
          body: [
            {
              type: "p",
              text: "A better system will replace it, or the program is ending. Plans the exit before the money and the contract run out.",
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "The same departmental governance that approved it, plus finance.",
          body: [
            {
              type: "p",
              text: "Retiring or replacing a service is a project of its own, with its own exit funding, not something that just happens when the contract lapses.",
            },
          ],
        },
      },
      {
        n: 19,
        action: {
          lead: "Works out what happens to the records and the data.",
        },
        response: {
          tags: ["dept", "central"],
          lead: "The information management office confirms the disposition authority.",
          body: [
            {
              type: "p",
              text: "Under the Library and Archives of Canada Act, no government record may be destroyed without the written consent of the Librarian and Archivist. Each record is:",
              bold: [
                "Library and Archives of Canada Act",
                "Librarian and Archivist",
              ],
            },
            {
              type: "ul",
              items: [
                "kept",
                "transferred to Library and Archives Canada",
                "or destroyed on schedule",
              ],
              itemBold: ["Library and Archives Canada"],
            },
            { type: "p", text: "This is the real Sunset checkpoint." },
          ],
        },
      },
      {
        n: 20,
        action: {
          lead: "Moves or disposes of the data.",
        },
        response: {
          tags: ["dept"],
          lead: "Migrate if replaced; dispose if retired.",
          body: [
            {
              type: "p",
              text: "If the service is replaced, the data is cleaned, migrated to the new system with its meaning intact, and checked before the old system is switched off. If it is retired, personal information is disposed of under its retention schedule and the Personal Information Bank is closed in Info Source.",
              bold: ["replaced", "retired", "Personal Information Bank"],
            },
          ],
        },
      },
      {
        n: 21,
        action: {
          lead: "Shuts the old system down cleanly.",
        },
        response: {
          tags: ["dept"],
          lead: "Security, contracting, and the service-management office each close their part.",
          body: [
            {
              type: "p",
              text: "The IT security team ends the Authority to Operate and securely wipes the decommissioned storage; the contracting authority closes the contract; the service-management office updates the GC Service Inventory and Application Portfolio Management to show the service retired.",
              bold: [
                "Authority to Operate",
                "GC Service Inventory",
                "Application Portfolio Management",
              ],
            },
          ],
        },
      },
    ],
  },
];

/* ---------------------------------------------------------------------- */
/* Who's who                                                              */
/* ---------------------------------------------------------------------- */

export const CHECKPOINT_MAP_WHO_TITLE = "People in this journey";

export const CHECKPOINT_MAP_WHO_CAPTION =
  "Who the annexes keep referring to. One line each, because what each of them does about a particular instrument is in the annex row for that instrument.";

export const CHECKPOINT_MAP_WHO: readonly CheckpointMapWhoEntry[] = [
  {
    term: "The users",
    def: "The people the service is for, inside or outside government, present at every step from research to support.",
  },
  {
    term: "Business owner of the application",
    def: "Accountable for the service from before it exists until after it is switched off, and reaches everyone else here through corporate services.",
  },
  {
    term: "Corporate services",
    def: "The department's enabling branches: the CIO or IT office, finance, procurement, security, privacy, records. The first stop for everything.",
  },
  {
    term: "Departmental project-management office",
    def: "Helps score and cost the project and find a project manager. How it is organized varies; the deputy head is accountable for the score.",
  },
  {
    term: "DARB",
    def: "Departmental Architecture Review Board. Inside the department, chaired by its CIO, and it reviews the design.",
  },
  {
    term: "GC EARB",
    def: "Government of Canada Enterprise Architecture Review Board. Government-wide, and only for large or complex projects.",
  },
  {
    term: "Contracting authority",
    def: "The procurement officer who runs the competition and signs the contract. Never the business owner.",
  },
  {
    term: "Authorizing official",
    def: "The senior executive who signs the Authority to Operate and accepts the security risk that is left.",
  },
  {
    term: "ATIP or privacy office",
    def: "Supports the privacy assessment and the registrations that follow it. The program area still owns the assessment.",
  },
  {
    term: "Service management function",
    def: "Whoever owns the service inventory in your department, under whatever name. Registers the service and updates it when it retires.",
  },
  {
    term: "Information management office",
    def: "Holds the disposition authorities. Records cannot be destroyed without Library and Archives Canada's written consent.",
  },
];

export const CHECKPOINT_MAP_TERMS_TITLE = "Terms the annex does not have a row for";

export const CHECKPOINT_MAP_TERMS_CAPTION =
  "Annex 1 has a row for every instrument with an official home of its own. These six come up throughout both annexes and do not have one, so they are defined here.";

export const CHECKPOINT_MAP_TERMS: readonly CheckpointMapWhoEntry[] = [
  {
    term: "Departmental investment plan",
    def:
      "The department's list of planned investments, approved by the deputy head. A project has to be on it before it can proceed.",
  },
  {
    term: "Capacity class (OPMCA)",
    def:
      "The department's approved project-management capacity, set by an Organizational Project Management Capacity Assessment. If the PCRA level is above it, or the project's value exceeds the department's delegated limit, the project needs Treasury Board approval.",
  },
  {
    term: "Reuse / options check",
    def:
      "Checking the GC shelf - the GC Reference Architectures and enterprise or shared solutions catalogues - before buying or building. GC policy expects reuse where possible, and the architecture review looks for it.",
  },
  {
    term: "Procurement / contract",
    def:
      "The competition and award, run by the contracting authority under the Directive on the Management of Procurement. The contracting authority signs; Nadia does not.",
  },
  {
    term: "Contract Security Program",
    def:
      "PSPC screening of the supplier's organization and personnel when the contract involves protected or classified information.",
  },
  {
    term: "Personal Information Bank",
    def:
      "The registered description of the personal information the service holds, published in the department's Info Source listing. Created alongside the Privacy Impact Assessment.",
  },
];
