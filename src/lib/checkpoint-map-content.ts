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
import { MATRIX_FAMILY_SECTIONS } from "@/lib/instrument-matrix";
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

export const CHECKPOINT_MAP_TITLE =
  "An unofficial list of the approvals and duties a GC digital service has to pass";

/** The page says plainly that the list was assembled, not handed down. */
export const CHECKPOINT_MAP_BEST_ATTEMPT =
  "This is our best attempt at gathering these checkpoints in one place. If something is missing, please tell us.";

export const CHECKPOINT_MAP_SUBTITLE = {
  text: "The official checkpoints a Government of Canada digital service can meet, by topic, with what brings each one into scope and what the business owner personally has to do about it. One appendix lists what is already built and can be reused. A second follows one invented service from its first sign of trouble to the day it is replaced, meeting the checkpoints in the order that service met them.",
  bold: ["official checkpoints"],
} as const;

export const CHECKPOINT_MAP_HOW_TO_USE = {
  heading: "How to use this page",
  items: [
    {
      lead: "To find out what applies to your service, read the tables.",
      body: "There is one table per topic, and a row for each official instrument a Government of Canada digital service can meet. Start with the topics that match what your service does, read down the scope column, and rule out what does not apply to you.",
    },
    {
      lead: "To get a feel for the order and the people, read Appendix B.",
      body: "It follows one invented service from the first sign of trouble to the day it is replaced, showing what its director general does at each step and who answers. It is a worked example of one route through these tables, and no two services take the same one.",
    },
    {
      lead: "To understand a single instrument properly, follow it to its thread page.",
      body: "Security, privacy, accessibility and procurement each have a page of their own in the guide that explains the reasoning. This page is the index; the thread pages carry the explanation.",
    },
  ],
} as const;

export const CHECKPOINT_MAP_VARIES = {
  heading: "Nearly everything here varies",
  paragraphs: [
    "The checkpoints themselves are real and they are set out in Government of Canada instruments. Almost everything around them is not fixed. Which ones apply depends on what the service does and how much is being spent. Who chairs a board, what a department's thresholds are, who signs, and how each step is run in practice differ from one department to the next.",
    "Timing varies most of all. Nothing here says how long a step takes, because that depends on the department's capacity, the queue in front of you, and what else is happening that year. Where a duration is given, treat it as one team's experience rather than a planning figure, and confirm it against your own department.",
    "The order varies too. The sequence a service meets these checkpoints in follows the route it takes: buying a finished product, contracting a team, running an agile procurement and building in-house all rearrange them, and some fall away entirely.",
  ],
} as const;

export const CHECKPOINT_MAP_JUMP = [
  { label: "What this page covers", href: "#what-this-covers" },
  { label: "How to use this page", href: "#how-to-use" },
  { label: "Nearly everything here varies", href: "#everything-varies" },
  { label: "Glossary", href: "#thecheckpoints" },
  { label: "The official things", href: "#annex-instruments" },
  { label: "Appendix A: reuse first", href: "#annex-reuse" },
  { label: "Appendix B: a worked example", href: "#annex-nadia" },
] as const;

/**
 * The section number for a heading, so the page and the rail agree.
 *
 * The rail is the only way to reach one topic on a page this long, and a rail
 * numbered 5.7 pointing at an unnumbered heading makes the reader count.
 */
export function checkpointMapSectionNumber(id: string): string {
  // The two appendices are named rather than numbered, on the page and in the
  // document, so the numbered run stops at the last ordinary section.
  if (id === "annex-reuse" || id === "annex-nadia") return "";
  const top = CHECKPOINT_MAP_JUMP.findIndex((item) => item.href === `#${id}`);
  if (top !== -1) return `${top + 1}.`;
  const sub = MATRIX_FAMILY_SECTIONS.findIndex((section) => section.id === id);
  if (sub === -1) return "";
  const parent = CHECKPOINT_MAP_JUMP.findIndex((item) => item.href === "#annex-instruments");
  return `${parent + 1}.${sub + 1}`;
}

/**
 * On-this-page rail items, with the twelve topic tables nested under the tables
 * section. The rail is the only way to reach one topic directly on a page this
 * long, so the nesting is worth the extra dozen lines.
 */
export const CHECKPOINT_MAP_ON_THIS_PAGE = CHECKPOINT_MAP_JUMP.flatMap((item) => {
  const id = item.href.slice(1);
  const number = checkpointMapSectionNumber(id);
  const parent = { id, label: number ? `${number} ${item.label}` : item.label };
  if (id !== "annex-instruments") return [parent];
  return [
    parent,
    ...MATRIX_FAMILY_SECTIONS.map((section) => ({
      id: section.id,
      label: `${checkpointMapSectionNumber(section.id)} ${section.family}`,
      depth: 1,
    })),
  ];
});

export const CHECKPOINT_MAP_TABLE_SECTION = {
  id: "annex-instruments",
  label: "THE TABLE",
  heading: "The official things a service has to do",
  intro:
    "Split into twelve topics so a reader can go straight to the ones that apply. Every topic opens with what matters most about it, then a table of its instruments. Nothing here is specific to one department or one kind of service.",
} as const;

export const CHECKPOINT_MAP_APPENDIX_REUSE = {
  id: "annex-reuse",
  label: "APPENDIX A",
  heading: "Reuse before you buy or build",
} as const;

export const CHECKPOINT_MAP_APPENDIX_PATH = {
  id: "annex-nadia",
  label: "APPENDIX B",
  heading: "A worked example: one service's path, step by step",
  timelineNote:
    "This is Nadia's timeline, not a general one. It is what this one invented service experienced, and Create in particular can run considerably shorter or longer. Do not plan against it.",
  intro:
    "The tables above say what exists. This appendix puts them in an order, by following one invented service from the first sign of trouble to the day it is replaced. Read it for the sequence, and for who Nadia has to talk to at each point. It is not a second list of instruments.",
  pathNote:
    "Nadia took one path, and the steps below are in the order that path produced. A department that buys a finished product, or builds in-house, or runs an agile procurement, meets the same checkpoints in a different order. Even where the contract is signed moves by a whole sub-phase depending on the route chosen, so treat the sub-phase headings here as this service's sequence rather than as the sequence.",
} as const;

export const CHECKPOINT_MAP_NADIA = {
  heading: "Meet Nadia, a director general",
  body: "Her grants program has outgrown its spreadsheets, so she is buying a grants management system. Her project scores below her department's threshold, so no Treasury Board submission is needed. GC EARB is a separate question: six triggers send a department there and money is only one of them, so her team checks all six in Alpha and none of them fires. Both together are the ordinary case, roughly 95% of projects. Where another project would branch upward is shown in the amber boxes.",
  bold: ["below", "six triggers send a department there and money is only one of them"],
  amber: ["amber boxes"],
} as const;

export const CHECKPOINT_MAP_WHY_GCS = {
  heading: "Why G&Cs is the example",
  body: "This journey is built around a grants and contributions system because it is a useful worked case: it touches almost every checkpoint at once - public money, procurement, a security authorization, personal information, records, and a decision made about people. The guide as a whole is not limited to G&Cs; any service can be mapped through the same path.",
} as const;

export const CHECKPOINT_MAP_WHY_CREATE = {
  heading: "Why Create fills most of this appendix",
  body: "The official checkpoints are front-loaded. Almost every formal approval, review and sign-off happens before launch, so Create carries most of the steps. Live and Sunset look shorter here only because this appendix follows the checkpoints, and not because there is less work in them.",
} as const;

export const CHECKPOINT_MAP_WHAT_TABLE = {
  heading: "What this page covers",
  body: "The official checkpoints only: the formal approvals, reviews, sign-offs and standing duties that come from Government of Canada instruments. Each one gets what it is, what pulls it into scope, and what the business owner personally has to do. It does not cover how to do the work inside each step, which is what the phase and sub-phase pages are for. Read it as the list to check your own service against.",
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
/* Phase blocks (all 22 steps, forks, launch)                             */
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
              text: "A short write-up of the problem and roughly what it would take, in whatever form her department's project intake asks for.",
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
          body: [{ type: "p", text: "How big is this really, and how risky?" }],
        },
        response: {
          tags: ["dept"],
          lead: "The departmental project-management or investment office.",
          body: [
            {
              type: "p",
              text: "It helps her team complete the Project Complexity and Risk Assessment (PCRA). How that is organized varies by department.",
              bold: ["Project Complexity and Risk Assessment (PCRA)"],
            },
            {
              type: "ul",
              items: [
                "the deputy head is accountable for an accurate score",
                "that score is compared against the department's approved project-management capacity class",
              ],
              itemBold: ["deputy head", "project-management capacity class"],
            },
          ],
        },
      },
    ],
    forkAfter: {
      title: "The choice that decides everything.",
      text: "If the PCRA level lands within the department's capacity class, the department approves and funds the project itself, which is Nadia's path. If it lands above the class, or its cost exceeds the department's delegated limit, the project needs Treasury Board approval, and that means a Treasury Board submission. That is the other ~5%, and it can add six to twelve months or more. Nadia is under that line. A bigger project would also owe a concept case, a separate instrument with its own threshold and its own reviewers. Nadia is under that floor as well, so the write-up in step 4 stays inside the department and is not one. GC EARB is a separate question again, an architecture one, and the Alpha block sets it out.",
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
              text: "The department's own governance commits the budget to proceed, from existing funds and under its delegated financial authority. No Treasury Board submission. This covers Discovery, Alpha, and the Beta build.",
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
    heading: "Create · Alpha - test the idea, clear architecture review, and go to market",
    durationLabel: "Typical: six to twelve weeks · varies",
    phaseNote:
      "A prototype needs no vendor: a paper or Figma sketch is enough to show suppliers what she wants. The buying starts here too, because a competition runs into months and Beta opens with the signature.",
    steps: [
      {
        n: 8,
        action: {
          lead: "Tests the assumptions that could kill the service, before committing real money.",
          body: [
            {
              type: "p",
              text: "A cheap prototype answers one kind of question: how people move through the design. The assumptions most likely to end the project are the other kind. Whether policy allows it, who has the legal authority to decide, whether the data the service depends on exists, and whether another department will change a step it owns.",
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "A designer for the prototype, and people outside the team for the rest.",
          body: [
            {
              type: "p",
              text: "A designer (or a colleague who knows Figma, or an AI tool) makes a clickable prototype with her, and five or six people who look like real applicants try it. No contract needed for this.",
            },
            {
              type: "p",
              text: "The other questions she cannot answer from inside her team. She takes the authority question to the policy team in her program area and to departmental legal services, the data question to whoever owns the system the grants data would come from, and any step another department owns to that department. None of these is a checkpoint with a form, and each one can end the idea.",
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
              text: "It reviews the design and confirms it lines up with GC architecture standards. Her team checks the GC EARB triggers too, and none of them catch her: she is under the investment and capacity thresholds, she is using nothing that counts as emerging technology, she needs no exception under the directive, and the system will run on public cloud. Architecture review stops here.",
              bold: ["stops here"],
            },
            {
              type: "p",
              text: "Most departments have their own board and there is no national page for one, so the architecture team in the CIO's office is the door. They prepare the material and they know when the board meets.",
              bold: ["The architecture team in the CIO's office is the door"],
            },
          ],
        },
      },
      {
        n: 10,
        action: {
          lead: "Settles the requirements and starts the competition.",
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
              text: "Nadia writes or approves the requirements, and the solicitation is written from them, so a line still vague on the day it is posted stays vague in the contract. This runs alongside the prototyping rather than after it, because advertising, bidding and evaluation take months, and Beta cannot open until the contract is ready to sign.",
              bold: ["alongside the prototyping rather than after it"],
            },
            {
              type: "p",
              text: "Two of the requirements are hers to judge and are the easiest to leave out: how long the grants service can be down before real harm starts, and how much data it can afford to lose. Her department's business continuity specialist works those into a business impact analysis, which is also what decides whether the service counts as critical. Both numbers change the architecture and the hosting bill, so they belong in the solicitation and not in a conversation after the build is bought.",
              bold: [
                "how long the grants service can be down",
                "how much data it can afford to lose",
              ],
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
                "draft the solicitation documents and post the competition, with the accessibility clauses and the security requirements already settled so they are in it from the start",
                "if the supplier will handle protected information, start the Contract Security Program (PSPC) screening now, because personnel and organization clearances often take longer than the competition itself",
              ],
              itemBold: ["Contract Security Program"],
            },
          ],
        },
      },
    ],
    forkEnd: {
      title: "If any one of the triggers were met",
      text: ", the departmental CIO would take it up to GC EARB, the Government of Canada Enterprise Architecture Review Board. Six triggers send a department there and any one of them is enough; the table above lists all six. The five that have nothing to do with money are the ones teams miss, because a small initiative can qualify on emerging technology or hosting alone. The department submits, and the CIO's architecture team prepares the material with the project team usually attending to present it.",
      bold: ["department"],
      checkpointPhrases: ["GC EARB"],
    },
  },
  {
    id: "beta",
    heading: "Create · Beta - buy it, secure it, and prove it",
    durationLabel: "Typical: several months · varies",
    phaseNote:
      "The signature, the security authorization, and the privacy assessment all land here. The competition itself ran through Alpha, because a full competitive tender is often a few months and Beta would otherwise spend them waiting.",
    steps: [
      {
        n: 11,
        action: {
          lead: "Helps choose the supplier, and the contract is signed.",
          body: [
            {
              type: "p",
              text: "The competition ran through Alpha, so what lands here is the end of it. Nadia sits on the evaluation committee when bids are scored (often as chair) and endorses the final supplier choice. She does not run the competition and she does not sign, but she is in the room when the supplier is chosen.",
              bold: ["The competition ran through Alpha"],
            },
          ],
        },
        response: {
          tags: ["dept"],
          lead: "The contracting authority awards and signs.",
          body: [
            {
              type: "p",
              text: "The same procurement officer, or Public Services and Procurement Canada above the department's contract limit. They:",
            },
            {
              type: "ul",
              items: [
                "manage the evaluation process and award the contract under the Directive on the Management of Procurement; the contracting authority signs, not Nadia",
                "confirm before award that the successful bidder holds the personnel and organization clearances the Contract Security Program requires, and annex the approved Security Requirements Check List to the contract",
              ],
              itemBold: ["Directive on the Management of Procurement", "Contract Security Program"],
            },
            {
              type: "p",
              text: "Signature is the moment the department has the most room to negotiate, because nothing has been committed yet. The exit rights, the data portability, the end date and the accessibility clauses are won here or not at all.",
            },
          ],
        },
      },
      {
        n: 12,
        action: {
          lead: "Requires an accessibility report from the supplier, and checks it.",
        },
        response: {
          tags: ["dept"],
          lead: "The supplier provides an Accessibility Conformance Report.",
          body: [
            {
              type: "p",
              text: "It covers one specific version of the product, tested against the EN 301 549 standard, which includes WCAG 2.1 AA.",
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
        n: 13,
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
              text: "What she is signing against is the Threat and Risk Assessment, and it does not start here. Earlier passes run against the design back in Alpha, while the design can still change, and the last pass runs against the system that was actually built. A standalone report is not required. The results go into the design documents and then into the residual risk assessment inside the authorization package, so what she reads is that package. The Authority to Operate is what enforces the work, because without the assessment there is nothing for her to accept.",
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
        n: 14,
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
        n: 15,
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
      text: 'Nadia\'s adjudicators decide by hand, so this checkpoint does not apply to her. But if the grants system scored, ranked, or auto-approved applications, the Directive on Automated Decision-Making would apply. The Algorithmic Impact Assessment would then have to be completed, approved and published on the Open Government Portal before the system goes into production, with notice to applicants, an appeal route, and human oversight scaled to the impact level. At impact level two and above a peer review is also required, and its findings published before launch. Worth knowing, because a later "efficiency" feature can trigger all of it without anyone noticing.',
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
      "Live is shown as a single section here because it has very few official checkpoints, far fewer than Create. It has its own sub-phases in the playbook, and the steps below cover what they owe. The one filing that is easy to forget is getting the service onto the official registries. Adding a significant feature can also bring earlier checkpoints back.",
    steps: [
      {
        n: 16,
        action: {
          lead: "Closes the project, and reports what it delivered.",
        },
        response: {
          tags: ["dept"],
          lead: "The project sponsor, through the department's project governance.",
          body: [
            {
              type: "p",
              text: "The funded project ends with a close-out: the department confirms what was delivered, releases what remains of the budget, and tracks whether the promised benefits arrive, the benefits realization named when the department committed the funding. The Directive on the Management of Projects and Programmes sets the duty; Nadia supplies the delivery record, and the project office files it.",
              bold: ["close-out", "benefits realization"],
            },
          ],
        },
      },
      {
        n: 17,
        action: {
          lead: "Gets the live service onto the official registries.",
        },
        response: {
          tags: ["dept"],
          lead: "The service-management / CIO office registers it.",
          body: [
            {
              type: "p",
              text: "She gives the details; they register the service in the GC Service Inventory and rate the application in Application Portfolio Management. She feeds the information in; the CIO office does the registering.",
              bold: ["GC Service Inventory", "Application Portfolio Management"],
            },
          ],
        },
      },
      {
        n: 18,
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
        n: 19,
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
        n: 20,
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
              bold: ["Library and Archives of Canada Act", "Librarian and Archivist"],
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
        n: 21,
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
        n: 22,
        action: {
          lead: "Shuts the old system down cleanly.",
        },
        response: {
          tags: ["dept"],
          lead: "The authorizing official, security, contracting, and the service-management office each close their part.",
          body: [
            {
              type: "p",
              text: "The authorizing official who signed the Authority to Operate formally ends it, and the IT security team securely wipes the decommissioned storage; the contracting authority closes the contract; the service-management office updates the GC Service Inventory and Application Portfolio Management to show the service retired.",
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
  "Who the steps below keep referring to. One line each, because what any of them does about a particular instrument is in that instrument's own row.";

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

export const CHECKPOINT_MAP_TERMS_TITLE = "Glossary";

export const CHECKPOINT_MAP_TERMS_CAPTION =
  "Four things the tables name without giving them a row of their own.";

export const CHECKPOINT_MAP_TERMS: readonly CheckpointMapWhoEntry[] = [
  {
    term: "Departmental investment plan",
    def: "The department's list of planned investments, approved by the deputy head. A project has to be on it before it can proceed.",
  },
  {
    term: "Capacity class (OPMCA)",
    def: "The department's approved project-management capacity, set by an Organizational Project Management Capacity Assessment. If the PCRA level is above it, or the project's value exceeds the department's delegated limit, the project needs Treasury Board approval.",
  },
  {
    term: "Contract Security Program",
    def: "PSPC screening of the supplier's organization and personnel when the contract involves protected or classified information.",
  },
  {
    term: "Personal Information Bank",
    def: "The registered description of the personal information the service holds, published in the department's Info Source listing. Created alongside the Privacy Impact Assessment.",
  },
];
