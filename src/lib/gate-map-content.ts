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
import { GATE_MAP_PATH } from "@/lib/reference-paths";

export type GateMapWhoTag = "dept" | "central";

export type GateMapBodyPart =
  | { type: "p"; text: string; bold?: readonly string[] }
  | { type: "ul"; items: readonly string[]; itemBold?: readonly string[] }
  | { type: "caution"; lead: string; text: string };

export type GateMapCell = {
  /** Bold lead-in for the cell. */
  lead: string;
  body?: readonly GateMapBodyPart[];
};

export type GateMapResponse = GateMapCell & {
  /** Empty for "Nothing yet." */
  tags: readonly GateMapWhoTag[];
};

export type GateMapStep = {
  n: number;
  action: GateMapCell;
  response: GateMapResponse;
};

export type GateMapFork = {
  /** Bold opening phrase / title. */
  title: string;
  /** Rest of the fork body; may continue the title sentence. */
  text: string;
  bold?: readonly string[];
  /** Phrases rendered in the primary "gate" weight. */
  gatePhrases?: readonly string[];
};

export type GateMapPhaseBlock = {
  id: "discovery" | "alpha" | "beta" | "live" | "sunset";
  heading: string;
  /** Text inside the duration pill. */
  durationLabel: string;
  /** Rest of the phase note, after the pill. */
  phaseNote: string;
  /** Steps before any mid-phase fork. */
  steps: readonly GateMapStep[];
  /** Fork that sits between steps (Discovery, after step 5). */
  forkAfter?: GateMapFork;
  /** Steps after the mid-phase fork (Discovery 6-7). */
  stepsAfterFork?: readonly GateMapStep[];
  /** Fork after all steps (Alpha bigger project, Beta automated decision). */
  forkEnd?: GateMapFork;
  showLaunchAfter?: boolean;
};

export type GateMapGateLink = {
  label: string;
  linkKey: ExternalLinkKey;
  icon: LucideIcon;
};

export type GateMapGateGroup = {
  phaseLabel: string;
  links: readonly GateMapGateLink[];
  entries: readonly { term: string; def: string }[];
};

export type GateMapWhoEntry = { term: string; def: string };

/* ---------------------------------------------------------------------- */
/* Page-level constants                                                   */
/* ---------------------------------------------------------------------- */

export { GATE_MAP_PATH };

export const GATE_MAP_EYEBROW = "See the whole path";

export const GATE_MAP_TITLE = "The official gates of a digital service";

export const GATE_MAP_SUBTITLE = {
  text: "A worked example of the official gates, the approvals, reviews, and sign-offs a Government of Canada service has to pass through, from a first problem all the way to retiring or replacing it, and who owns each one.",
  bold: ["official gates"],
} as const;

export const GATE_MAP_WORKING_NOTE = {
  lead: "Working scheme, for figuring out the gates.",
  body: 'This traces one invented person, Nadia, through the real path a new service takes. Some mechanics (who chairs what, exact thresholds, how long each step runs) vary by department and are marked "varies."',
  disclaimer:
    "Nadia is invented, and so is her program. Any resemblance to real persons or programs is coincidental.",
} as const;

export const GATE_MAP_JUMP = [
  { label: "Discovery", href: "#discovery" },
  { label: "Alpha", href: "#alpha" },
  { label: "Beta", href: "#beta" },
  { label: "Live", href: "#live" },
  { label: "Sunset", href: "#sunset" },
  { label: "Who's who", href: "#whoswho" },
  { label: "The gates", href: "#thegates" },
] as const;

/** On-this-page rail items for /gate-map (same targets as GATE_MAP_JUMP). */
export const GATE_MAP_ON_THIS_PAGE = GATE_MAP_JUMP.map((item) => ({
  id: item.href.slice(1),
  label: item.label,
}));

export const GATE_MAP_NADIA = {
  heading: "Meet Nadia, a director general",
  body: "Her grants program has outgrown its spreadsheets, so she is buying a grants management system. Her project scores below her department's threshold, so it stays inside the department: no Treasury Board submission and no GC EARB. That is the ordinary case, roughly 95% of projects. Where a bigger project would branch upward is shown in the amber boxes.",
  bold: ["below"],
  amber: ["amber boxes"],
} as const;

export const GATE_MAP_WHY_GCS = {
  heading: "Why G&Cs is the example",
  body: "This journey is built around a grants and contributions system because it is a useful worked case: it touches almost every gate at once - public money, procurement, a security authorization, personal information, records, and a decision made about people. The guide as a whole is not limited to G&Cs; any service can be mapped through the same path.",
} as const;

export const GATE_MAP_WHY_CREATE = {
  heading: "Why the Create phase fills most of this table",
  body: "The official gates are front-loaded. Almost every formal approval, review, and sign-off happens before launch, so Create carries most of the rows. Live and Sunset look shorter here only because this table follows the gates, not because there is less to do in them.",
} as const;

export const GATE_MAP_WHAT_TABLE = {
  heading: "What this map covers",
  body: "It is an overview of the official gates only, the formal approvals, reviews, and sign-offs, laid out across the whole journey from the first problem to retiring or replacing the service. It is not the whole journey, and it does not tell Nadia how to do the work inside each step. That detail lives in the phase and sub-phase documents. This is the map of the gates she has to pass through; the people she talks to give her the rest.",
  bold: ["official gates only"],
} as const;

export const GATE_MAP_COLKEY = {
  left: "Left is what Nadia does.",
  right:
    "Right is who answers, and how. The tag on each response says whether the responder is her department or a central agency.",
  rightTags: { dept: "her department", central: "central agency" },
} as const;

export const GATE_MAP_LAUNCH = {
  tag: "LAUNCH",
  text: "The service goes live here. Everything above is Create (the build); everything below is Live and Sunset (running it, then retiring or replacing it).",
} as const;

export const GATE_MAP_VARY_NOTE =
  "Departmental mechanics and timelines vary; confirm against your own department before treating any step as fixed.";

export const GATE_MAP_FOOTER_DISCLAIMER =
  "Nadia is invented, and so is her program. Any resemblance to real persons or programs is coincidental.";

/* ---------------------------------------------------------------------- */
/* Phase blocks (all 20 steps, forks, launch)                             */
/* ---------------------------------------------------------------------- */

export const GATE_MAP_PHASES: readonly GateMapPhaseBlock[] = [
  {
    id: "discovery",
    heading: "Create · Discovery - work out what is needed",
    durationLabel: "Typical: weeks to a few months · varies",
    phaseNote:
      "Funded from the department's existing operating budget. This is where the path is decided.",
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
      title: "The fork that decides everything.",
      text: "If the PCRA level lands within the department's capacity class, the department approves and funds the project itself, which is Nadia's path. If it lands above the class, or its cost exceeds the department's delegated limit, the project needs Treasury Board approval: it goes up to GC EARB and a Treasury Board submission. That is the other ~5%, and it can add six to twelve months or more. Nadia is under the line.",
      bold: ["within", "above"],
      gatePhrases: ["GC EARB", "Treasury Board submission"],
    },
    stepsAfterFork: [
      {
        n: 6,
        action: {
          lead: "Decides whether to reuse, buy, or build.",
          body: [
            {
              type: "p",
              text: "Checks first whether another department already runs a grants system she could reuse.",
            },
          ],
        },
        response: {
          tags: ["dept", "central"],
          lead: "She looks on the shelf.",
          body: [
            { type: "p", text: "She checks a few places:" },
            {
              type: "ul",
              items: [
                "the GC Reference Architectures and the enterprise solutions catalogue (on the GC network)",
                "the Enterprise Architecture Community of Practice",
                "the CIO office",
                "Shared Services Canada",
              ],
              itemBold: [
                "GC Reference Architectures",
                "Enterprise Architecture Community of Practice",
              ],
            },
            {
              type: "p",
              text: "If a fit exists, she reuses instead of buying.",
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
              text: "A budget outline, not the full picture. This covers getting from here to launch.",
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
              text: "A designer (or a colleague who knows Figma, or an AI tool) makes a clickable mockup with her. No contract needed for this.",
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
          ],
        },
      },
    ],
    forkEnd: {
      title: "If the project were bigger",
      text: ", the departmental CIO would take it up to GC EARB, the Government of Canada Enterprise Architecture Review Board, co-chaired by the CTO of Canada (TBS) and the CTO of Shared Services Canada. Departments go there when a project crosses the investment or capacity thresholds, uses emerging technology, needs a policy exception, or runs on something other than public cloud. The department submits, not the individual: the CIO's architecture team prepares the material and the project team usually attends to present it. GC EARB reviews only the large or complex ones.",
      bold: ["department"],
      gatePhrases: ["GC EARB"],
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
              text: "The security team runs the Security Assessment and Authorization and hands the residual IT (cyber) security risk to a senior departmental executive, the authorizing official for the program. That executive signs the Authority to Operate, accepting the risk, under the Directive on Security Management and ITSG-33.",
              bold: [
                "Security Assessment and Authorization",
                "senior departmental executive",
                "Authority to Operate",
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
          ],
        },
      },
    ],
    forkEnd: {
      title: "If the system automated a decision.",
      text: 'Nadia\'s adjudicators decide by hand, so this gate does not apply to her. But if the grants system scored, ranked, or auto-approved applications, the Directive on Automated Decision-Making would apply, and an Algorithmic Impact Assessment would be required before launch, published, with notice to applicants, a human in the loop, and an appeal route. Worth knowing, because a later "efficiency" feature can quietly trigger it.',
      bold: ["Directive on Automated Decision-Making"],
      gatePhrases: ["Algorithmic Impact Assessment"],
    },
    showLaunchAfter: true,
  },
  {
    id: "live",
    heading: "Live - run it, and put it on the record",
    durationLabel: "Ongoing, for years · varies",
    phaseNote:
      "Live is shown as a single section here because it has very few official gates - far fewer than Create. The full Live phase has its own sub-phases in the playbook. The work is a recurring cycle; the one filing that is easy to forget is getting the service onto the official registries.",
    steps: [
      {
        n: 15,
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
        n: 16,
        action: {
          lead: "Keeps it running.",
          body: [
            { type: "p", text: "Year after year:" },
            {
              type: "ul",
              items: [
                "watches it and patches it",
                "renews the funding before it runs out",
                "refreshes the accessibility statement and the privacy assessment as it changes",
                "names someone to manage the supplier",
              ],
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
      "Fewer gates than Create, but two are strict: records cannot be destroyed without Library and Archives Canada's written consent, and the security authorization has to be closed, not just switched off.",
    steps: [
      {
        n: 17,
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
        n: 18,
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
            { type: "p", text: "This is the real Sunset gate." },
          ],
        },
      },
      {
        n: 19,
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
        n: 20,
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

export const GATE_MAP_WHO_TITLE = "People in this journey";

export const GATE_MAP_WHO_CAPTION =
  "The people and bodies that appear in the tables above, and what role they play.";

export const GATE_MAP_WHO: readonly GateMapWhoEntry[] = [
  {
    term: "Corporate services",
    def: "Her department's enabling branches: CIO/IT office, finance, procurement, security, ATIP (privacy), records. Her first stop, and where the contracting authority sits.",
  },
  {
    term: "Departmental project-management office",
    def: "Helps the sponsor complete the PCRA, cost and score the project, and line up a project manager. How this is organized varies by department; the deputy head is accountable for the score.",
  },
  {
    term: "DARB",
    def: "Departmental Architecture Review Board. Inside her department, chaired by the departmental CIO. Reviews the design.",
  },
  {
    term: "GC EARB",
    def: "Government of Canada Enterprise Architecture Review Board. Government-wide, co-chaired by the CTO of Canada (TBS) and the CTO of Shared Services Canada. Only for large or complex projects.",
  },
  {
    term: "Contracting authority",
    def: "The procurement officer, in her department's contracting branch (or PSPC above the department's limit), who runs the competition and signs the contract. Not Nadia. She reaches them through corporate services.",
  },
  {
    term: "Authorizing official",
    def: "The senior departmental executive who signs the Authority to Operate, accepting the residual IT (cyber) security risk.",
  },
  {
    term: "ATIP / privacy office",
    def: "Supports the program in completing the Privacy Impact Assessment, coordinates with the Office of the Privacy Commissioner and TBS, and handles the Personal Information Bank registration. The program area owns the assessment.",
  },
  {
    term: "Service management function",
    def: "Whoever owns the service inventory in your department (the name varies). Records the service in the departmental and GC Service Inventory and in Application Portfolio Management, and updates it when the service retires.",
  },
  {
    term: "Information management office",
    def: "Holds the disposition authorities. Records cannot be destroyed without Library and Archives Canada's written consent.",
  },
];

/* ---------------------------------------------------------------------- */
/* The gates                                                              */
/* ---------------------------------------------------------------------- */

export const GATE_MAP_GATES_TITLE = "Official gates, by phase";

export const GATE_MAP_GATES_CAPTION =
  "Every formal approval, review, or sign-off named in the tables. Gates with an official home are linked.";

export const GATE_MAP_GATES: readonly GateMapGateGroup[] = [
  {
    phaseLabel: "Create · Discovery",
    links: [
      { label: "PCRA tool", linkKey: "pcra-tool", icon: BarChart3 },
      {
        label: "TB submission (5% path)",
        linkKey: "tbs-tb-submissions",
        icon: Building2,
      },
    ],
    entries: [
      {
        term: "Concept case",
        def: "A short write-up of the problem and rough size, used to get the initiative onto the departmental plan. An internal document - no standard GC template.",
      },
      {
        term: "Departmental investment plan",
        def: "The department's list of planned investments, approved by the deputy head. A project has to be on it before it can proceed.",
      },
      {
        term: "PCRA - Project Complexity and Risk Assessment",
        def: "A detailed questionnaire that rates how big and risky a project is. The score is compared against the department's approved capacity class to decide the path.",
      },
      {
        term: "Capacity class (OPMCA)",
        def: "The department's approved project-management capacity, set by an Organizational Project Management Capacity Assessment. If the PCRA level is above it, or the project's value exceeds the department's delegated limit, the project needs Treasury Board approval.",
      },
      {
        term: "Reuse / options check",
        def: "Checking the GC shelf - the GC Reference Architectures and enterprise or shared solutions catalogues - before buying or building. GC policy expects reuse where possible, and the architecture review looks for it.",
      },
      {
        term: "Treasury Board submission",
        def: "The small-minority path: formal approval and expenditure authority from Treasury Board, needed when a project's PCRA level exceeds the department's capacity class, or its value exceeds the department's delegated limit, or Treasury Board otherwise requires it. Can add six to twelve months or more.",
      },
    ],
  },
  {
    phaseLabel: "Create · Alpha",
    links: [
      {
        label: "GC EARB (5% path)",
        linkKey: "gc-enterprise-architecture-framework",
        icon: LayoutGrid,
      },
    ],
    entries: [
      {
        term: "DARB - Departmental Architecture Review Board",
        def: "Architecture review inside the department, chaired by the departmental CIO. Confirms the design lines up with GC standards. For Nadia's size of project, this is where architecture review stops.",
      },
      {
        term: "GC EARB - Government of Canada Enterprise Architecture Review Board",
        def: "Government-wide review for large or complex projects only: above investment or capacity thresholds, using emerging technology, needing a policy exception, or running on non-public cloud. Nadia does not go here.",
      },
    ],
  },
  {
    phaseLabel: "Create · Beta",
    links: [
      {
        label: "Directive on Management of Procurement",
        linkKey: "directive-procurement",
        icon: Briefcase,
      },
      {
        label: "Contract Security Program",
        linkKey: "pspc-security-requirements-contracting",
        icon: ShieldCheck,
      },
      {
        label: "Accessibility Conformance Report guide",
        linkKey: "a11y-ict-procurement-guide",
        icon: Accessibility,
      },
      { label: "ITSG-33 (Authority to Operate)", linkKey: "itsg-33", icon: Lock },
      {
        label: "Directive on Privacy Impact Assessment",
        linkKey: "directive-privacy-practices",
        icon: UserRound,
      },
      {
        label: "Directive on Automated Decision-Making",
        linkKey: "directive-automated-decision-making",
        icon: Bot,
      },
    ],
    entries: [
      {
        term: "Procurement / contract",
        def: "The competition and award, run by the contracting authority under the Directive on the Management of Procurement. The contracting authority signs; Nadia does not.",
      },
      {
        term: "Contract Security Program",
        def: "PSPC screening of the supplier's organization and personnel when the contract involves protected or classified information.",
      },
      {
        term: "Accessibility Conformance Report",
        def: "The supplier's statement of how accessible a specific version of the product is, tested against EN 301 549 (which includes WCAG 2.1 AA). Covers one version only - re-check on every significant update.",
      },
      {
        term: "Security Assessment and Authorization → Authority to Operate",
        def: "The IT security team runs the assessment, then a senior departmental executive signs the Authority to Operate, accepting the residual security risk. Required before the system goes live.",
      },
      {
        term: "Privacy Impact Assessment",
        def: "The assessment of privacy risk for a service that handles personal information, completed by the program area with ATIP support, and sent to the Office of the Privacy Commissioner and TBS before launch.",
      },
      {
        term: "Personal Information Bank",
        def: "The registered description of the personal information the service holds, published in the department's Info Source listing. Created alongside the Privacy Impact Assessment.",
      },
      {
        term: "Algorithmic Impact Assessment",
        def: 'Required only if a decision about a person is automated, under the Directive on Automated Decision-Making. Nadia\'s adjudicators decide by hand, so this gate does not apply - but a later "efficiency" feature can quietly trigger it.',
      },
    ],
  },
  {
    phaseLabel: "Live",
    links: [
      {
        label: "Policy on Service and Digital (Service Inventory)",
        linkKey: "policy-on-service-and-digital",
        icon: Layers,
      },
    ],
    entries: [
      {
        term: "GC Service Inventory + Application Portfolio Management",
        def: "The two registries a live service must be listed and rated in, approved by the deputy head and updated yearly. The CIO office does the registering; Nadia supplies the details.",
      },
    ],
  },
  {
    phaseLabel: "Sunset",
    links: [
      {
        label: "Library and Archives of Canada Act",
        linkKey: "laca",
        icon: BookOpen,
      },
    ],
    entries: [
      {
        term: "Disposition authority",
        def: "Library and Archives Canada's written consent to keep, transfer, or destroy a government record. No record may be destroyed without it. The real Sunset gate.",
      },
    ],
  },
];
