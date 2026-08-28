/**
 * TRANSITORY WORKING MATERIAL. Not part of the guide's published structure.
 *
 * Every official Government of Canada instrument a digital service meets, mapped
 * to the sub-phase where something has to happen to it, with what has to be done,
 * who does it, who submits it, and whether it applies to every service.
 *
 * Sources: the research pass recorded in
 * `TBS (Claude Output)/Worklists/Official_Instruments_Research_2026-08-05.md`.
 * Facts here survived an adversarial verification round unless flagged otherwise.
 *
 * Placement of an instrument in a sub-phase is EDITORIAL. No Government of Canada
 * instrument uses Discovery / Alpha / Beta / Stabilization / Growth / Maturity /
 * Sunset. Each placement is anchored on a real deadline or trigger in the source,
 * and where it is judgement the note says so.
 *
 * CURRENCY RULES. Three instruments moved and must never be cited as current:
 *  - Standard on Web Accessibility: rescinded 2 March 2026, with the Guideline on
 *    Making Information Technology Usable by All. Cite the Accessible Canada
 *    Regulations and CAN/ASC-EN 301 549 instead.
 *  - Directive on the Management of Communications (2016) and the Procedures for
 *    Publishing (2013): replaced 27 March 2025 by the Directive on the Management
 *    of Communications and Federal Identity. Its Appendix D replaced the Mandatory
 *    Procedures for Social Media and Web Communications.
 *  - ITSG-33 Annexes 3A and 4A: superseded spring 2026 by ITSP.10.033 and
 *    ITSP.10.033-01. Annexes 1 and 2 remain valid.
 *
 * Also rescinded 9 October 2024: the stand-alone Directive on Privacy Impact
 * Assessment. The live instrument is Appendix C of the Directive on Privacy
 * Practices.
 *
 * And archived 28 June 2019: the stand-alone Standard on Identity and Credential
 * Assurance. The live version is Appendix A of the Directive on Identity
 * Management. Same pattern as the privacy one: the standard did not disappear, it
 * moved inside its directive, so cite the appendix.
 */

import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Archive,
  BookOpen,
  Cloud,
  FileSignature,
  Globe,
  KeyRound,
  Landmark,
  Languages,
  Lock,
  ShieldCheck,
  Siren,
} from "lucide-react";
import type { ExternalLinkKey } from "@/lib/external-links";

export type MatrixSubPhase =
  | "discovery"
  | "alpha"
  | "beta"
  | "stabilization"
  | "growth"
  | "maturity"
  | "sunset";

/** What kind of thing an instrument is, so a reader knows what to expect of it. */
export type MatrixKind =
  | "assessment"
  | "authorization"
  | "review"
  | "submission"
  | "register"
  | "plan"
  | "duty"
  | "filing";

export const MATRIX_KINDS: Record<MatrixKind, { label: string; gloss: string }> = {
  assessment: {
    label: "Assessment",
    gloss: "Work that ends in a judgement: how bad, how likely, how critical.",
  },
  authorization: {
    label: "Authorization",
    gloss: "Permission to proceed, signed by a named person who accepts the risk.",
  },
  review: {
    label: "Review",
    gloss: "A board or committee looks at the work and decides.",
  },
  submission: {
    label: "Submission",
    gloss: "A document sent up for a decision, usually about money or authority.",
  },
  register: {
    label: "Register",
    gloss: "A record the service is entered in and kept current.",
  },
  plan: {
    label: "Plan",
    gloss: "Arrangements written down in advance and tested.",
  },
  duty: {
    label: "Standing duty",
    gloss: "A standard the service has to meet for as long as it runs.",
  },
  filing: {
    label: "Filing",
    gloss: "Something sent or published, on a cycle or when an event triggers it.",
  },
};

export type MatrixAction = "check" | "gather" | "fill" | "sign" | "submit" | "keep" | "close";

export const MATRIX_ACTIONS: Record<
  MatrixAction,
  { label: string; gloss: string; className: string }
> = {
  check: {
    label: "Check",
    gloss: "Find out whether it applies to this service at all.",
    className:
      "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800/70",
  },
  gather: {
    label: "Gather",
    gloss:
      "Hand over the business judgement only the service team holds. Someone else writes it up.",
    className:
      "bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950 dark:text-teal-200 dark:border-teal-800/70",
  },
  fill: {
    label: "Fill",
    gloss: "The thing is actually produced.",
    className:
      "bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-950 dark:text-violet-200 dark:border-violet-800/70",
  },
  sign: {
    label: "Sign or accept",
    gloss:
      "A named person puts their name to it, or receives someone else's result and decides what to do about it.",
    className:
      "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800/70",
  },
  submit: {
    label: "Submit",
    gloss: "Sent, filed, registered or published where the rule says.",
    className:
      "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800/70",
  },
  keep: {
    label: "Keep current",
    gloss:
      "The service changed, or the clock came round. Re-run it, re-test it, or refresh the record.",
    className:
      "bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800/70",
  },
  close: {
    label: "Close out",
    gloss: "Formally ended, disposed of, or marked retired.",
    className:
      "bg-stone-200 text-stone-800 border-stone-400 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-600",
  },
};

export const MATRIX_SUBPHASES: {
  key: MatrixSubPhase;
  label: string;
  phase: "Create" | "Live" | "Sunset";
}[] = [
  { key: "discovery", label: "Discovery", phase: "Create" },
  { key: "alpha", label: "Alpha", phase: "Create" },
  { key: "beta", label: "Beta", phase: "Create" },
  { key: "stabilization", label: "Stabilization", phase: "Live" },
  { key: "growth", label: "Growth", phase: "Live" },
  { key: "maturity", label: "Maturity", phase: "Live" },
  { key: "sunset", label: "Sunset", phase: "Sunset" },
];

export type MatrixCell = {
  tags: MatrixAction[];
  note: string;
};

export type MatrixInstrument = {
  name: string;
  acronym?: string;
  /** Plain definition for someone who has never heard of it. */
  whatItIs: string;
  family: string;
  kind: MatrixKind;
  /** true when it applies to every service with no threshold. */
  everyService: boolean;
  /** What brings it into scope. For universal ones, the scope statement. */
  scope: string;
  /** What the business owner personally does, and where the input comes from. */
  ownerDoes: string;
  whoDoes: string;
  whereItEndsUp: string;
  linkKey?: ExternalLinkKey;
  /** Further official homes for this instrument, shown when the row is opened. */
  moreLinks?: readonly ExternalLinkKey[];
  /** Phrases in ownerDoes to bold, so the column can be skimmed for the verb. */
  ownerBold?: readonly string[];
  /** Phrases in whoDoes to bold, so the column can be skimmed for the actor. */
  whoBold?: readonly string[];
  /** Thread pages that own this instrument's subject. Never rendered in the table. */
  threads?: readonly string[];
  /**
   * Reader-facing caution about the instrument itself: it moved, it was replaced,
   * or something about it cannot be seen from outside the GC network.
   */
  caveat?: string;
  cells: Partial<Record<MatrixSubPhase, MatrixCell>>;
};

export const MATRIX_FAMILIES = [
  "Security",
  "Continuity and incidents",
  "Privacy and automated decisions",
  "Accessibility",
  "Official languages",
  "Approvals and money",
  "Contracts and suppliers",
  "Hosting and cloud",
  "Identity and sign-in",
  "Publishing on canada.ca",
  "Registries and records",
  "Access to information and openness",
] as const;

/**
 * One section per family, so each topic is its own table with its own anchor.
 *
 * The intro is the only place on this page that is allowed to say something the
 * table does not: the order the work runs in, the thing teams get wrong, the
 * cost of being late. Anything that belongs in a cell goes in the cell.
 */
export const MATRIX_FAMILY_SECTIONS: readonly {
  family: (typeof MATRIX_FAMILIES)[number];
  id: string;
  icon: LucideIcon;
  intro: string;
  /** A phrase in the intro that links to a thread page. */
  introLink?: { phrase: string; to: string };
}[] = [
  {
    family: "Security",
    id: "topic-security",
    icon: ShieldCheck,
    intro:
      "These four run in order, and each one feeds the next. The categorization decides how large the set of security controls has to be. The threat and risk assessment looks at what could still go wrong once those controls are in place. The Authority to Operate is the signature that lets the service run in production, and for a service that lives inside one department the person who signs it is usually the business owner.",
  },
  {
    family: "Continuity and incidents",
    id: "topic-continuity",
    icon: Siren,
    intro:
      "This is about how long the service can be unavailable before it matters, and who is told when something goes wrong. Every service is worth asking the question, because the answer decides whether anything else here applies. The formal requirement for a business impact analysis is narrower than that: it reaches services supporting something critical to the health, safety, security or economic well-being of Canadians, or to the functioning of government. A continuity plan follows only where the analysis marks the service critical. The recovery numbers are worth settling early, because a four-hour limit and a two-week one lead to different designs and different costs.",
  },
  {
    family: "Privacy and automated decisions",
    id: "topic-privacy",
    icon: Lock,
    intro:
      "The checklist comes first, and it is worth completing even where the answer is that no assessment is needed, because having asked is itself part of the requirement. The automated-decision half applies only if the service decides something about a person without someone making the call, including scoring and ranking. A service can acquire that later, when a feature is added to save time, so it is worth looking again whenever the service changes.",
  },
  {
    family: "Accessibility",
    id: "topic-accessibility",
    icon: Accessibility,
    intro:
      "Two related duties. A supplier's conformance report exists only if you are buying something, and it describes one version of their product. The department's own conformance is about the service as people meet it, so a good report from a supplier is a starting point and not the finish. Two deadlines set when the service itself has to conform: web pages created or updated on or after 5 December 2027, and mobile applications, digital documents and the conformity assessment used in buying from 5 December 2028.",
  },
  {
    family: "Official languages",
    id: "topic-official-languages",
    icon: Languages,
    intro:
      "This applies to every service the public can use online. It has no form, no board and nothing to file, which is why it is often noticed late. Two things help: design and test in both languages from the first prototype, and put the requirement in the contract where a supplier is involved, because French added afterwards is priced as a change.",
  },
  {
    family: "Approvals and money",
    id: "topic-approvals",
    icon: Landmark,
    intro:
      "These decide how much of the rest of the list applies to you. Two different measures are at work and they are easy to mix up. The project's complexity score, compared with the department's approved capacity class, decides whether the Treasury Board has to approve it. Separate investment thresholds decide whether a concept case is needed. Most projects are under both and stay inside the department.",
  },
  {
    family: "Contracts and suppliers",
    id: "topic-contracts",
    icon: FileSignature,
    intro:
      "All three apply only when you are buying, and all three run on the procurement timetable, which makes them earlier than they look. The check list and the screening apply where a supplier will handle sensitive information: the check list has to be settled before the solicitation goes out, because the security clauses in the solicitation come from it, and clearing a supplier's people can take longer than the competition itself. The 5% target for contracts awarded to Indigenous businesses is the department's to meet, and the one moment a business owner can affect it is before the solicitation is written.",
  },
  {
    family: "Hosting and cloud",
    id: "topic-hosting",
    icon: Cloud,
    intro:
      "Where the service runs is worth deciding deliberately, because otherwise it is decided by whoever sets up the first environment. There is a government-wide order of preference to work through, and choosing something else is allowed with a case for it. One thing to watch: a service categorized at Protected B or below that runs on anything other than public cloud goes to the government-wide architecture board however small the spend, since that trigger has no dollar floor. The cloud security work in the second row applies only to a cloud-hosted service.",
  },
  {
    family: "Identity and sign-in",
    id: "topic-identity",
    icon: KeyRound,
    intro:
      "This applies where people or businesses have accounts, sign in, or are identified. Both rows follow from what would happen if the service got someone's identity wrong, and both shape the design early. The shared government sign-in services are the expected route, and building your own is the choice that needs explaining. Joining a shared service takes time, so it is worth asking about early.",
  },
  {
    family: "Publishing on canada.ca",
    id: "topic-publishing",
    icon: Globe,
    intro:
      "If the service is public-facing, a good deal of how it looks is decided for you: the page templates, the information architecture and the content style are all set centrally. Those are easier to work with than to work around, so it helps to bring the departmental web team and communications in while the design can still change, and not at Beta when it has already been built.",
  },
  {
    family: "Registries and records",
    id: "topic-registries",
    icon: Archive,
    introLink: { phrase: "Data stewardship thread", to: "/thread/data-stewardship" },
    intro:
      "Registers are how the service becomes visible to the rest of government, and records are the information it keeps. Neither is difficult, and both are easy to overlook because they arrive after launch, when the project team has usually moved on. Two things worth knowing. Only one of the two registers has anywhere to say the service is critical. And nothing may be destroyed without written consent from Library and Archives Canada: everything else in these tables can be fixed late at some cost, and a destroyed record cannot, because it is gone. The last row is the one to read before buying anything, since it says what the system itself has to be able to do with records. How data is modelled, described and kept usable is the subject of the Data stewardship thread.",
  },
  {
    family: "Access to information and openness",
    id: "topic-openness",
    icon: BookOpen,
    intro:
      "Anyone at all can ask a federal institution for its records, and the institution then has to find them and release whatever the law allows. So plan on the basis that what this service records may one day be read by someone outside it. A second duty runs on a clock: contracts over $10,000, and grants and contributions over $25,000, are published every quarter whether or not anyone has asked to see them, and it is the department that has to remember, because no request arrives to prompt it. Both duties change what the service should record while it is running, and how quickly one record can be pulled out of thousands, which is something the build has to allow for.",
  },
];

export const INSTRUMENT_MATRIX: MatrixInstrument[] = [
  /* ------------------------------------------------------------------ */
  /* Security                                                            */
  /* ------------------------------------------------------------------ */
  {
    name: "Security categorization",
    family: "Security",
    kind: "assessment",
    whatItIs:
      "A rating of how much injury would follow a leak, an unwanted change to the information, or an outage. It is set on four levels, from low to very high, and the result decides how large a set of security controls the build has to meet.",
    everyService: true,
    scope:
      "Every service. Three separate requirements point at the same standard: for assets, for information, and for services and activities. The service-level one is part of the business impact analysis requirement.",
    ownerDoes:
      "Makes the judgement about how bad it would be if this information leaked, if someone changed it, or if the service stopped, judging the three separately.",
    whoDoes:
      "The departmental security team assigns the category, ideally with legal and the access to information and privacy office in the room.",
    whoBold: ["departmental security team"],
    ownerBold: ["Makes the judgement", "judging the three separately"],
    whereItEndsUp:
      "Held within the department. Nothing outside is waiting on it, so the timing is the department's own. The result feeds the security assessment and the control set.",
    linkKey: "standard-on-security-categorization",
    threads: ["security"],
    cells: {
      discovery: {
        tags: ["gather"],
        note: "Name what information the service will hold and how bad each kind of loss would be. Anchored on the categorization sitting in the concept phase, before requirements and design.",
      },
      alpha: {
        tags: ["fill"],
        note: "The category is assigned. It decides the size of the control set the contract then has to buy, so a vague injury statement leaves that decision to someone else's estimate.",
      },
      growth: {
        tags: ["keep"],
        note: "Volume growth alone can raise the category, because a million low-sensitivity records in one place are not automatically still low sensitivity.",
      },
      maturity: {
        tags: ["keep"],
        note: "Reviewing the category of the business activities the service supports is the first authorization-maintenance activity, on the department's cycle.",
      },
    },
  },
  {
    name: "Threat and risk assessment",
    acronym: "TRA",
    family: "Security",
    kind: "assessment",
    whatItIs:
      "The exercise that lists what could go wrong, ranks each one by how likely it is and how much damage it would do, and states the risk left over once the safeguards are in place. It covers deliberate, accidental and natural threats alike, so it is wider than a cybersecurity exercise.",
    everyService: true,
    scope:
      "The activity applies to all information systems that support departmental programs, services or activities. No dollar figure, no user count, no risk score. A standalone report is a different matter: producing one is neither recommended nor required, and the results are meant to go into the ordinary design documents.",
    ownerDoes:
      "Approves the work plan before the assessment starts, and states in advance how much left-over risk is acceptable. Supplies what the service is worth to the business and what it depends on. Accepts or refuses the left-over risk at the end.",
    whoDoes:
      "A security practitioner works with the system designers during design; a security assessor, often a contractor, assesses the built system. The business owner sits on the assessment team as the program authority.",
    whoBold: ["security practitioner", "security assessor", "business owner"],
    ownerBold: [
      "Approves the work plan",
      "states in advance how much left-over risk is acceptable",
      "Accepts or refuses the left-over risk",
    ],
    whereItEndsUp:
      "Held within the department. Nothing outside is waiting on it, so the timing is the department's own. The results feed the authorization package.",
    linkKey: "harmonized-tra-methodology",
    moreLinks: ["itsg-33"],
    threads: ["security"],
    cells: {
      alpha: {
        tags: ["gather", "fill"],
        note: "First pass, against the design, while the design can still change. The service team supplies the security the business actually needs and the level of risk the department will carry.",
      },
      beta: {
        tags: ["fill"],
        note: "Second pass, against the system that was actually built. Its results go into the residual risk assessment the authorization rests on.",
      },
      growth: {
        tags: ["keep"],
        note: "A change means the residual risk assessment is updated; a major change also goes back to the authorizer.",
      },
      maturity: {
        tags: ["keep"],
        note: "Re-assessed as the threat picture moves, at a frequency set in the departmental security plan.",
      },
    },
  },
  {
    name: "Physical security assessment and Authority to Occupy Facility",
    acronym: "ATOF",
    family: "Security",
    kind: "authorization",
    whatItIs:
      "The second security track, running in parallel and covering buildings, equipment and physical space. It uses the same harmonized method as the systems assessment, run by different people and ending in a different signature.",
    everyService: false,
    scope:
      "Only if the service touches physical space: new accommodation, hardware in people's hands, kiosks, or software that operates doors, gates, lighting or heating. A cloud-hosted service with no hardware usually stays clear of it.",
    ownerDoes:
      "Says whether the service touches physical space at all, early enough for the answer to reach the solicitation.",
    whoDoes:
      "Departmental physical security, using the Royal Canadian Mounted Police (RCMP) assessment guide.",
    whoBold: ["Departmental physical security"],
    ownerBold: ["Says whether the service touches physical space"],
    whereItEndsUp:
      "Held within the department. Nothing outside is waiting on it, so the timing is the department's own. The chief security officer or their delegate signs the assessment report; the delegated authority approves the Authority to Occupy Facility.",
    threads: ["security"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Work out whether the service touches physical space at all. Editorial placement: the guide's own timing, chosen so the answer arrives before the solicitation.",
      },
      beta: {
        tags: ["fill", "sign"],
        note: "Where software will operate building equipment, the assessment and authorization have to be complete before implementation, and starting early is advised in the source.",
      },
    },
  },
  {
    name: "Security assessment and authorization, ending in the Authority to Operate",
    acronym: "SA&A, ATO",
    family: "Security",
    kind: "authorization",
    whatItIs:
      "The formal permission for the service to run in production. Someone with the authority reads what the security work found, accepts the risk that is left, and signs. For a departmental system that signer is normally the business owner.",
    everyService: true,
    scope:
      "Every information system, before operations commence. Each department defines its own documented practice for how it is done, which is why identical systems get different treatment in different departments.",
    ownerDoes:
      "Gets the conditions for authorization in writing before the design starts, from the departmental security plan or from the authorizer directly. Reads the package and decides: authorize, authorize with conditions, or refuse.",
    whoDoes:
      "The information technology security team assembles the package; a security assessor, often independent, does the assessment.",
    whoBold: ["information technology security team", "security assessor"],
    ownerBold: [
      "Gets the conditions for authorization in writing",
      "Reads the package and decides",
    ],
    whereItEndsUp:
      "Held within the department and signed there. The authorizer is the only person waiting on it. For common or enterprise systems, including Shared Services Canada services, the authorizer is the Chief Information Officer of Canada instead. Where two or more organizations share a system, it is the manager of the program or service.",
    linkKey: "directive-security-management",
    threads: ["security"],
    cells: {
      discovery: {
        tags: ["gather", "sign"],
        note: "Get the standing conditions for authorization out of the departmental security plan, or from the authorizer directly, and put them in the project charter. The authorizer signs the charter.",
      },
      alpha: {
        tags: ["sign"],
        note: "The authorizer approves the initial security assurance requirements, the control set, and the high-level design. Three of their seven approval points.",
      },
      beta: {
        tags: ["sign"],
        note: "The authorizer approves the detailed design, approves production installation on larger projects, then signs the Authority to Operate before operations commence. It does not expire and is not renewed on a clock.",
      },
      growth: {
        tags: ["keep", "sign"],
        note: "Major changes need change requests approved by the operational authorities and the authorizer.",
      },
      maturity: {
        tags: ["keep"],
        note: "Authorization is maintained throughout the operational life: control performance reviewed, threat environment re-assessed.",
      },
      sunset: {
        tags: ["close"],
        note: "The authorization is formally ended and decommissioned storage securely wiped, rather than the system being switched off and forgotten.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Continuity                                                          */
  /* ------------------------------------------------------------------ */
  {
    name: "Business impact analysis",
    acronym: "BIA",
    family: "Continuity and incidents",
    kind: "assessment",
    whatItIs:
      "The exercise that decides how critical the service is, and produces four numbers with it: maximum allowable downtime, minimum service level, recovery time objective and recovery point objective.",
    everyService: true,
    scope:
      "Every service should answer the question, because the answer is what decides whether anything further is owed. The directive's formal requirement is narrower. It reaches only the services and activities that support the availability of what is critical to the health, safety, security or economic well-being of Canadians, or to the effective functioning of government. Large departments are separately measured on holding an up-to-date analysis for every external and internal enterprise service.",
    ownerDoes:
      "Makes the judgement about who is harmed if the service stops, how fast that harm escalates, and what the service depends on.",
    whoDoes:
      "The departmental business continuity management specialist, who is also the person responsible for identifying which services are critical.",
    whoBold: ["business continuity management specialist"],
    ownerBold: ["Makes the judgement"],
    whereItEndsUp:
      "The department reports its identified critical services to the Treasury Board of Canada Secretariat on a regular basis or when asked. The analysis itself stays in the department.",
    threads: ["security"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "Work out how long the service can be down before real harm starts, and how much data it can afford to lose. Those two numbers change the architecture and the hosting bill, so they belong before the build is bought.",
      },
      beta: {
        tags: ["gather"],
        note: "Hand over the dependency list: the systems, suppliers, staff, facilities and partner services this one depends on, including where another organization is relied on.",
      },
      stabilization: {
        tags: ["keep"],
        note: "Measured against real incidents for the first time. Editorial placement, argued from what the sub-phase already does.",
      },
      growth: {
        tags: ["keep"],
        note: "A new capability can change what the service is critical for, and growth in volume can change the injury.",
      },
      maturity: {
        tags: ["keep"],
        note: "Refreshed on the department's own cycle. Public Safety Canada recommends a full refresh of the analysis and the plan in year one, with reviews in years two and three.",
      },
    },
  },
  {
    name: "Business continuity plan",
    acronym: "BCP",
    family: "Continuity and incidents",
    kind: "plan",
    whatItIs:
      "The written arrangements for keeping a critical service delivering at a minimum acceptable level during a disruption, and recovering it afterwards. There is one plan for the department, and this service either has its own section in that plan or is covered by several.",
    everyService: false,
    scope:
      "Only if the business impact analysis marks the service critical, meaning disruption would cause a high or very high degree of injury. One department reads that as needing to recover to minimum service levels within 72 hours.",
    ownerDoes:
      "Supplies the recovery steps and the workarounds, then tests them. Asks the coordinator where this service appears in the departmental plan, and with what downtime limit.",
    whoDoes:
      "The departmental or branch business continuity coordinator drafts it on the departmental template.",
    whoBold: ["business continuity coordinator"],
    ownerBold: ["Supplies the recovery steps", "tests them", "Asks the coordinator"],
    whereItEndsUp:
      "Held within the department. Nothing outside is waiting on it, so the timing is the department's own. The senior official for the program area approves it.",
    threads: ["security"],
    cells: {
      beta: {
        tags: ["gather"],
        note: "Before launch, the service's recovery steps and workarounds go to the coordinator so the plan covers it from day one. Editorial placement: the directive sets no launch checkpoint.",
      },
      stabilization: {
        tags: ["keep"],
        note: "A real incident is a live test of arrangements that were written on paper.",
      },
      maturity: {
        tags: ["keep"],
        note: "Tested. There is no mandated interval in the directive, which requires only regular testing in accordance with departmental practices; large departments are measured on a two-year testing window. The testing obligation lands on service owners in practice.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Privacy and automated decisions                                     */
  /* ------------------------------------------------------------------ */
  {
    name: "Privacy checklist and privacy impact assessment",
    acronym: "PIA",
    family: "Privacy and automated decisions",
    kind: "assessment",
    whatItIs:
      "A structured look at what personal information the service collects, why it is allowed to, where it flows, how long it is kept, and what could happen to people if it goes wrong. A mandatory checklist comes first, and it decides whether a full assessment, a lighter privacy protocol, or neither is needed.",
    everyService: false,
    scope:
      "Triggers are broad. A new or substantially modified program that creates, collects, uses, discloses, retains or disposes of personal information brings it into scope. So does using it for an administrative purpose, contracting the program out or transferring it, bringing in a third party, changing the technology that processes it, or automating a decision. No dollar or user-count threshold.",
    ownerDoes:
      "Completes the checklist, even where the answer turns out to be no. Says what personal information the service will use and which decisions about people it will be used to make.",
    whoDoes:
      "The program area drafts it on the Treasury Board template; the access to information and privacy office reviews, iterates and owns the instrument.",
    whoBold: ["program area", "access to information and privacy office"],
    ownerBold: ["Completes the checklist", "Says what personal information the service will use"],
    whereItEndsUp:
      "The privacy office sends the completed assessment to the Treasury Board of Canada Secretariat and to the Office of the Privacy Commissioner at the same time, after the deputy head approves. A summary is published on the institution's website.",
    linkKey: "directive-privacy-practices",
    caveat:
      "The stand-alone Directive on Privacy Impact Assessment was rescinded on 9 October 2024. The live instrument is Appendix C of the Directive on Privacy Practices.",
    threads: ["privacy"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Complete the privacy checklist. It is a documented step in its own right, and the answer can be no.",
      },
      alpha: {
        tags: ["gather"],
        note: "Hand over what the assessment is built from: what personal information the service will use, and which decisions about people it will be used to make.",
      },
      beta: {
        tags: ["fill", "submit"],
        note: "Approved and filed before real personal information is collected.",
      },
      growth: {
        tags: ["keep"],
        note: "A feature that handles personal information reopens it.",
      },
      maturity: {
        tags: ["keep"],
        note: "Updated as the service changes, rather than left to go stale.",
      },
    },
  },
  {
    name: "Algorithmic impact assessment",
    acronym: "AIA",
    family: "Privacy and automated decisions",
    kind: "assessment",
    whatItIs:
      "A scored questionnaire about how much an automated decision could affect a person's rights, health or economic interests, or the ongoing sustainability of an ecosystem. The score sets what the service then owes on explanation, human involvement, testing and recourse.",
    everyService: false,
    scope:
      "Only if the service makes or supports an automated decision about a person: scoring, ranking, recommending, or auto-approving. A later efficiency feature can trigger it without anyone noticing.",
    ownerDoes:
      "Fills in the questionnaire, answering from how the program works and what the decision does to people.",
    whoDoes:
      "The department completes it itself, normally the program team with support from the data or chief information officer function.",
    whoBold: ["program team"],
    ownerBold: ["Fills in the questionnaire"],
    whereItEndsUp:
      "The results are published on the Open Government Portal before the system goes into production, where anyone outside the department can see them. The assistant deputy minister responsible for the program completes and approves them, or another senior official the deputy head names.",
    linkKey: "algorithmic-impact-assessment",
    moreLinks: ["directive-automated-decision-making"],
    threads: ["ethics-and-bias", "privacy"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Decide whether the service will automate a decision. Deciding this in Beta leaves no time to design the automation differently, and the only remaining option is to record the impact rather than reduce it.",
      },
      beta: {
        tags: ["fill", "submit"],
        note: "Completed, approved and published before production. At impact level two and above a peer review is also required, and its findings published before launch.",
      },
      growth: {
        tags: ["keep"],
        note: "Reviewed, approved and updated whenever the functionality or scope of the automated decision system changes.",
      },
      maturity: {
        tags: ["keep"],
        note: "Updated on a scheduled basis.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Accessibility                                                       */
  /* ------------------------------------------------------------------ */
  {
    name: "Accessibility conformance report",
    acronym: "ACR",
    family: "Accessibility",
    kind: "assessment",
    whatItIs:
      "A supplier's written statement of how far their product meets the accessibility standard, clause by clause, with the gaps named. It is a claim to be tested.",
    everyService: false,
    scope:
      "Only when buying. An in-house build has no supplier and no report; the equivalent duty is the department's own conformance assessment against the standard.",
    ownerDoes:
      "Says which clauses of the standard the service has to meet, so they go into the solicitation, then reads the supplier's report and checks its claims against the product.",
    whoDoes: "The supplier, through a third party or a qualified in-house accessibility expert.",
    whoBold: ["supplier"],
    ownerBold: ["Says which clauses", "reads the supplier's report"],
    whereItEndsUp:
      "The supplier provides it at contract award. The department verifies it, tests independently, and requires a remediation roadmap for every gap.",
    linkKey: "a11y-toolkit-procurement",
    moreLinks: ["a11y-ict-procurement-guide"],
    threads: ["accessibility", "procurement"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "Work out which clauses of the standard the service has to meet, so they go into the solicitation rather than being argued about later.",
      },
      beta: {
        tags: ["sign"],
        note: "Provided at contract award and verified, not taken on trust. A remediation roadmap covers what it does not meet.",
      },
      maturity: {
        tags: ["keep"],
        note: "Updated after significant software updates, and at minimum annually, with changes marked.",
      },
    },
  },
  {
    name: "Accessibility conformance and the accessibility statement",
    family: "Accessibility",
    kind: "duty",
    whatItIs:
      "Conformance of the service itself to the Canadian accessibility standard for information and communication technology, plus a published statement that names what does not conform, what the alternatives are, and when the gaps close.",
    everyService: true,
    scope:
      "By 5 December 2027, every web page, public-facing and employee-facing, created or updated on or after that date, plus the published statement. Mobile applications, digital documents, and the procurement conformity assessment follow on 5 December 2028. Legally the duty sits on the department through its deputy head.",
    ownerDoes:
      "Includes the people most likely to be excluded in the research, books the testing early, and funds the fixes.",
    whoDoes:
      "The service team, testing with people with disabilities. Automated checkers catch only a fraction of the barriers.",
    whoBold: ["service team"],
    ownerBold: [
      "Includes the people most likely to be excluded",
      "books the testing early",
      "funds the fixes",
    ],
    whereItEndsUp:
      "The department publishes the statement, reachable from a prominent location on each page it covers.",
    linkKey: "en-301-549",
    threads: ["accessibility"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "Book the testing, and budget for the fixes it will find.",
      },
      beta: {
        tags: ["fill", "submit"],
        note: "Tested against the standard, findings fixed, and the statement published no later than the day the obligation first applies.",
      },
      growth: {
        tags: ["keep"],
        note: "The duty re-attaches to any page created or updated after the date, so new features carry it.",
      },
      maturity: {
        tags: ["keep"],
        note: "Statement refreshed every 12 months and retained electronically for four years.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Approvals and money                                                 */
  /* ------------------------------------------------------------------ */
  {
    name: "Concept case",
    family: "Approvals and money",
    kind: "submission",
    whatItIs:
      "A short, early write-up of the problem and the rough size of the investment, produced before a business case and before any solution is chosen.",
    everyService: false,
    scope:
      "Mandatory for digitally enabled projects where the department is willing to invest at least: $2.5 million with no approved capacity class or class 1; $5 million at class 2; $10 million at class 3; $15 million for National Defence; $25 million at class 4.",
    ownerDoes:
      "Writes the problem and the rough size from Discovery's evidence, then takes it up for approval.",
    whoDoes: "The department, approved at assistant deputy minister level or above.",
    whoBold: ["assistant deputy minister level"],
    ownerBold: ["Writes the problem and the rough size", "takes it up for approval"],
    whereItEndsUp:
      "The department sends it to the Treasury Board of Canada Secretariat for review by the Chief Information Officer of Canada.",
    linkKey: "concept-case-procedures",
    moreLinks: ["policy-planning-investments"],
    threads: ["funding"],
    cells: {
      discovery: {
        tags: ["check", "fill", "submit"],
        note: "Work out whether the threshold is crossed, write it, get assistant deputy minister approval, and send it. It precedes the architecture review board submission and any Treasury Board submission.",
      },
    },
  },
  {
    name: "Project complexity and risk assessment",
    acronym: "PCRA",
    family: "Approvals and money",
    kind: "assessment",
    whatItIs:
      "A 64-question scoring tool that rates a project from level 1, sustaining, to level 4, transformational. The score decides who is allowed to approve the project: the minister, or the Treasury Board.",
    everyService: false,
    scope:
      "Required at: $2.5 million with no approved capacity class or class 0; $5 million at class 1; $10 million at class 2; $25 million at class 3; $50 million at class 4, all tax included. Note this ladder differs from the architecture review board ladder as written.",
    ownerDoes:
      "Answers the business-risk questions, including how ready the organization actually is to adopt the thing.",
    whoDoes:
      "The departmental project management office authors it; the project sponsor is responsible for ensuring it is completed; the deputy head is responsible for its accuracy.",
    whoBold: ["project management office", "project sponsor", "deputy head"],
    ownerBold: ["Answers the business-risk questions"],
    whereItEndsUp:
      "It stays in the department, and goes to the Treasury Board of Canada Secretariat with a submission where one is needed.",
    linkKey: "pcra-tool",
    threads: ["funding"],
    cells: {
      discovery: {
        tags: ["check", "gather", "fill"],
        note: "The business risks section comes from the client or project sponsor, including how ready the organization is to adopt the thing.",
      },
      growth: {
        tags: ["keep"],
        note: "A significant addition can re-score the project and move who is allowed to approve it.",
      },
    },
  },
  {
    name: "Departmental architecture review board",
    acronym: "DARB",
    family: "Approvals and money",
    kind: "review",
    whatItIs:
      "The department's own board, which reviews a digital initiative's design against the government-wide architecture framework: look for something that already exists before buying or building, open standards, data, security and privacy.",
    everyService: true,
    scope:
      "All departmental digital initiatives. Two carve-outs: small departments and agencies, meaning reference levels under $300 million a year or so designated, are exempt; and Agents of Parliament are exempt.",
    ownerDoes: "Presents the direction, bringing the reuse scan Discovery produced.",
    whoDoes:
      "The board reviews. The chief information officer's architecture team books the slot and prepares the material.",
    whoBold: ["board reviews", "architecture team"],
    ownerBold: ["Presents the direction", "bringing the reuse scan"],
    whereItEndsUp:
      "Held within the department unless the initiative goes on to the government-wide board.",
    linkKey: "gc-enterprise-architecture-framework",
    threads: ["dependencies-and-standards"],
    cells: {
      alpha: {
        tags: ["submit", "sign"],
        note: "The chosen direction is assessed. Arriving with the reuse scan from Discovery in hand makes it go quickly.",
      },
      growth: {
        tags: ["keep"],
        note: "Major architectural changes go back to the board.",
      },
    },
  },
  {
    name: "Government of Canada Enterprise Architecture Review Board",
    acronym: "GC EARB",
    family: "Approvals and money",
    kind: "review",
    whatItIs:
      "The government-wide architecture board, co-chaired by the Chief Technology Officer of Canada and the Chief Technology Officer of Shared Services Canada. Six separate triggers can send an initiative to it, and the size of the investment is only one of them.",
    everyService: false,
    scope:
      "Any one of these is enough. The department is willing to invest $2.5 million with no class or class 1, $5 million at class 2, $10 million at class 3, $15 million for National Defence, $25 million at class 4. Or the initiative involves emerging technologies. Or it needs an exception under the directive. Or it is categorized at Protected B or below and uses a deployment model other than public cloud. Or it extends or creates custom support to stop a technology becoming unsupported. Or the Chief Information Officer of Canada directs it.",
    ownerDoes:
      "Checks all six triggers, since a small initiative can qualify on emerging technology or hosting alone, then supplies the material for the departmental chief information officer's submission.",
    whoDoes:
      "The departmental chief information officer submits; the project team usually attends.",
    whoBold: ["departmental chief information officer"],
    ownerBold: ["Checks all six triggers", "supplies the material"],
    whereItEndsUp:
      "The department submits, not the individual. It comes after the departmental board has reviewed, after the concept case review, and before a Treasury Board submission or departmental business case.",
    linkKey: "gc-enterprise-architecture-framework",
    threads: ["dependencies-and-standards"],
    cells: {
      alpha: {
        tags: ["check", "submit"],
        note: "Check every one of the six triggers, not only the dollar one. The non-dollar triggers catch small initiatives that assume they are too small to qualify.",
      },
    },
  },
  {
    name: "Treasury Board submission",
    family: "Approvals and money",
    kind: "submission",
    whatItIs:
      "The formal request to the Treasury Board for authority and money when the project is beyond what the minister can approve alone. It commits the department to specific benefits.",
    everyService: false,
    scope:
      "When the project's complexity level exceeds the department's approved capacity class, or the department has no class and the project is over $2.5 million. Plus all programmes. Plus procurement or real property above their own approval limits.",
    ownerDoes:
      "Supplies what the service is for, what it will cost, and what benefits it promises. Those promises are tracked after approval.",
    whoDoes: "The department writes it; the chief financial officer attests.",
    whoBold: ["department writes it", "chief financial officer attests"],
    ownerBold: ["Supplies what the service is for", "what benefits it promises"],
    whereItEndsUp: "The minister signs and it goes to the Treasury Board.",
    linkKey: "tbs-tb-submissions",
    threads: ["funding"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Whether one is needed follows from the complexity level and the department's capacity class, so it is knowable early.",
      },
      alpha: {
        tags: ["fill", "submit"],
        note: "Written and submitted. It takes months, and a gender-based analysis plus is required with it.",
      },
    },
  },
  {
    name: "Benefits realization plan and project close-out report",
    family: "Approvals and money",
    kind: "submission",
    whatItIs:
      "The written statement of what good this project is supposed to do, and the later report confirming what was actually delivered and whether the promised benefits arrived.",
    everyService: false,
    scope:
      "Universal for anything that counts as a project under the projects and programmes directive, with no dollar trigger. Baseline reporting to the Office of the Comptroller General starts at $25 million.",
    ownerDoes:
      "Names the benefits when the money is sought, then supplies the delivery record at close-out.",
    whoDoes: "The project sponsor and the departmental project office.",
    whoBold: ["project sponsor", "departmental project office"],
    ownerBold: ["Names the benefits", "supplies the delivery record"],
    whereItEndsUp:
      "Filed through the department's own project governance. Projects of $25 million or more also report to the Office of the Comptroller General at approval, expenditure authority, each amendment, and close-out.",
    linkKey: "directive-projects-programmes",
    threads: ["funding", "monitoring-and-instrumentation"],
    cells: {
      discovery: {
        tags: ["fill"],
        note: "The benefits are named when the funding is sought, not afterwards.",
      },
      stabilization: {
        tags: ["submit"],
        note: "The funded project ends with a close-out: what was delivered, what is left of the budget, and the delivery record.",
      },
      maturity: {
        tags: ["keep"],
        note: "Whether the promised benefits actually arrived is tracked after the project is over.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Registries and records                                              */
  /* ------------------------------------------------------------------ */
  {
    name: "GC Service Inventory",
    family: "Registries and records",
    kind: "register",
    whatItIs:
      "The government-wide register of what services exist, who they serve, how digital they are, and how much volume they handle. Its 70 published fields include nothing about criticality, recovery or continuity.",
    everyService: true,
    scope:
      "Every external service and every internal enterprise service, meaning one department serving other departments government-wide. Purely internal departmental services are out of scope. A department with no services files a deputy minister declaration.",
    ownerDoes:
      "Names the service in words its clients would recognise, and supplies the details for the register entry.",
    whoDoes: "The designated official for service registers it.",
    whoBold: ["designated official for service"],
    ownerBold: ["Names the service", "supplies the details"],
    whereItEndsUp:
      "The department publishes through the open government portal; the deputy head approves the inventory and its annual updates.",
    linkKey: "gc-service-inventory",
    moreLinks: ["policy-on-service-and-digital"],
    threads: ["data-stewardship"],
    cells: {
      stabilization: {
        tags: ["submit"],
        note: "Registered once the service is live. Easy to forget, because nobody chases it.",
      },
      maturity: {
        tags: ["keep"],
        note: "Updated annually, with every data element reviewed, typically collected over the summer for the previous fiscal year.",
      },
      sunset: {
        tags: ["close"],
        note: "Updated to show the service retired.",
      },
    },
  },
  {
    name: "Application Portfolio Management",
    acronym: "APM",
    family: "Registries and records",
    kind: "register",
    whatItIs:
      "The register of the applications behind the services, rated for business value, technical condition, support cost and criticality, and sorted into tolerate, innovate, mitigate or eliminate. This is where criticality actually gets recorded, since the service inventory has no field for it.",
    everyService: true,
    scope:
      "Every business application behind a service. No dollar threshold, though the system is in practice used by a subset of departments.",
    ownerDoes:
      "Rates the application's criticality, business value and condition. Left blank, no government-wide record shows the service as critical.",
    whoDoes: "A departmental portfolio delegate holds the inventory and coordinates entry.",
    whoBold: ["portfolio delegate"],
    ownerBold: ["Rates the application's criticality"],
    whereItEndsUp:
      "The department transmits to the Treasury Board of Canada Secretariat annually; the public dataset refreshes twice a year.",
    threads: ["data-stewardship", "dependencies-and-standards"],
    cells: {
      stabilization: {
        tags: ["submit"],
        note: "Rated once live, including its criticality.",
      },
      maturity: {
        tags: ["keep"],
        note: "Updated through the year. Where owners are not engaged, the data goes incomplete and support costs go untracked.",
      },
      sunset: {
        tags: ["close"],
        note: "Marked retired.",
      },
    },
  },
  {
    name: "Records retention and disposition authority",
    family: "Registries and records",
    kind: "register",
    whatItIs:
      "The written consent from Library and Archives Canada without which no government record may be destroyed. The authority is permission to dispose. It does not order anyone to dispose, and it does not set retention periods; the department's own schedule does that.",
    everyService: true,
    scope:
      "All information and data. Library and Archives Canada issues either an institution-specific or a multi-institution authority; the department confirms which one covers its records and sets the retention periods itself.",
    ownerDoes:
      "Tells the information management office what records and data the service will create and hold, and sets how long each kind is kept.",
    whoDoes:
      "The information management function under the departmental chief information officer.",
    whoBold: ["information management function"],
    ownerBold: ["Tells the information management office", "sets how long each kind is kept"],
    whereItEndsUp:
      "The department requests a new authority from Library and Archives Canada where none covers the records.",
    linkKey: "lac-information-disposition-hub",
    moreLinks: ["laca"],
    threads: ["data-stewardship", "privacy"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "Tell the information management office what records and data the service will create and hold, so they can map them to an existing authority or ask for a new one.",
      },
      beta: {
        tags: ["fill"],
        note: "The retention and disposition schedule is set. Any gaps are flagged before launch rather than discovered at retirement.",
      },
      maturity: {
        tags: ["keep"],
        note: "Disposition happens regularly through the life of the service, not only at the end.",
      },
      sunset: {
        tags: ["close"],
        note: "Confirm the authority is in place and that no litigation hold, access request or other statutory duty blocks destruction. Records with archival value transfer to Library and Archives Canada.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Continuity and incidents, second batch                              */
  /* ------------------------------------------------------------------ */
  {
    name: "Systems that manage information and data",
    family: "Registries and records",
    kind: "duty",
    whatItIs:
      "A set of things any system holding government information has to be able to do: apply retention and disposition rules in a way that can be audited, carry metadata, support the department's classification structures, work with other systems, and export in bulk in open formats.",
    everyService: true,
    scope:
      "All systems, in force since 4 May 2022. Anything built or bought before that had 24 months to transition, and anything treated as legacy had 24 months to produce a plan. The capabilities can be met by one system or by several used together.",
    ownerDoes:
      "Puts these into the requirements before anything is bought, above all bulk export in open formats and the ability to apply a retention rule. A product that cannot do those two cannot be made to later without replacing it.",
    ownerBold: ["Puts these into the requirements before anything is bought"],
    whoDoes:
      "The information management function says what is needed; the service team or the supplier builds it.",
    whoBold: ["information management function"],
    whereItEndsUp:
      "Held within the department. Nothing is filed. It shows up as clauses in the solicitation and as things to check on acceptance.",
    linkKey: "standard-systems-manage-information",
    moreLinks: ["standard-managing-metadata"],
    threads: ["data-stewardship"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "These become requirements here, while the solicitation is still being written.",
      },
      beta: {
        tags: ["check"],
        note: "Confirm the built or bought system actually does them. Bulk export is the one most often missing and the most expensive to discover late.",
      },
      sunset: {
        tags: ["close"],
        note: "Bulk export in open formats is what makes a migration possible when the service is replaced.",
      },
    },
  },
  {
    name: "Information technology continuity management",
    family: "Continuity and incidents",
    kind: "plan",
    whatItIs:
      "The service team's own recovery arrangements: how this system gets back up, in what order its parts are restored, and proof from testing that the restore works. The departmental business continuity plan belongs to the department; this is the part the team owns.",
    everyService: true,
    scope:
      "All information systems. Recovery strategies are set in accordance with the department's business continuity requirements, so the recovery targets come down from the business impact analysis and this is where they get met.",
    ownerDoes:
      "Confirms the restore has been tested at least once before launch, and that the build meets the recovery target set by the business impact analysis.",
    whoDoes:
      "The team running the service, with information technology operations and the hosting provider.",
    whoBold: ["team running the service"],
    ownerBold: ["Confirms the restore has been tested", "meets the recovery target"],
    whereItEndsUp:
      "Held within the department. Nothing outside is waiting on it, so the timing is the department's own. The evidence is the tested restore, held by the team.",
    linkKey: "directive-security-management",
    threads: ["security", "releasing-changes"],
    cells: {
      beta: {
        tags: ["fill"],
        note: "Backups, restore procedure and restoration priorities exist and have been tested at least once before launch, rather than being assumed.",
      },
      stabilization: {
        tags: ["keep"],
        note: "The first real incidents test whether the restore works under pressure and whether the recovery target is achievable.",
      },
      maturity: {
        tags: ["keep"],
        note: "Re-tested on the department's cycle. An untested backup has not been shown to work.",
      },
    },
  },
  {
    name: "Cyber security event response and reporting",
    family: "Continuity and incidents",
    kind: "plan",
    whatItIs:
      "The duty to have a way of spotting, containing and reporting a cyber incident before one happens, and to report it up the government-wide chain when it does. The government-wide plan sets who is told, in what order, and how an event escalates into a coordinated response.",
    everyService: true,
    scope:
      "Every service. Departmental plans and procedures for responding to cyber events must operate in accordance with the Government of Canada Cyber Security Event Management Plan, and security events are reported under the security event reporting standard.",
    ownerDoes:
      "Knows before launch who to call and how fast, and passes an incident to them as soon as the team spots one.",
    whoDoes:
      "The departmental security operations function sets the escalation route, with the designated official for cyber security. The service team detects, contains and supplies the facts.",
    whoBold: ["security operations function", "service team"],
    ownerBold: ["Knows before launch who to call", "passes an incident to them"],
    whereItEndsUp:
      "The department reports to the Canadian Centre for Cyber Security and the Treasury Board of Canada Secretariat through the routes the government-wide plan sets. The business owner does not report government-wide themselves.",
    linkKey: "directive-on-service-and-digital",
    threads: ["security", "monitoring-and-instrumentation"],
    cells: {
      beta: {
        tags: ["fill"],
        note: "Know before launch who to call at 2am, how the service is monitored, and what the escalation path is. Editorial placement: the duty is standing rather than tied to launch.",
      },
      stabilization: {
        tags: ["keep"],
        note: "This is when it gets used. Incidents are reported through the departmental route, not sat on.",
      },
      growth: {
        tags: ["keep"],
        note: "A new component or integration changes what has to be watched.",
      },
      maturity: {
        tags: ["keep"],
        note: "Response arrangements are exercised and kept current with the service.",
      },
    },
  },
  {
    name: "Material privacy breach report",
    family: "Continuity and incidents",
    kind: "filing",
    whatItIs:
      "The report a department must make when personal information is lost, accessed or disclosed in a way that could reasonably be expected to cause serious injury. It goes to the Office of the Privacy Commissioner of Canada and to the Treasury Board of Canada Secretariat, and the people affected are notified.",
    everyService: false,
    scope:
      "Only when a breach involving personal information is judged material, on sensitivity of the information, number of people affected, and whether it is a systemic problem. A cyber incident touching personal information can trigger both this and the cyber reporting route at once.",
    ownerDoes:
      "Tells the privacy office immediately what happened and what information was involved.",
    whoDoes:
      "The access to information and privacy office assesses materiality and prepares the report.",
    whoBold: ["access to information and privacy office"],
    ownerBold: ["Tells the privacy office immediately"],
    whereItEndsUp:
      "The institution reports to the Office of the Privacy Commissioner and the Treasury Board of Canada Secretariat, and notifies affected individuals.",
    threads: ["privacy", "security"],
    cells: {
      beta: {
        tags: ["check"],
        note: "Know, before launch, who in the department makes the materiality call and how fast they need to hear from the team.",
      },
      stabilization: {
        tags: ["submit"],
        note: "If it happens, it is reported. Editorial placement: the duty is triggered by the event, not by a phase.",
      },
      growth: {
        tags: ["keep"],
        note: "New personal information in the service widens what a breach would cover.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Official languages                                                  */
  /* ------------------------------------------------------------------ */
  {
    name: "Service in both official languages",
    family: "Official languages",
    kind: "duty",
    whatItIs:
      "The duty to offer and deliver the service in English and French at the same time and to the same standard. For a digital service that covers the interface, the content, notifications, error messages, and the human support behind it, so a translated afterthought does not meet it.",
    everyService: true,
    scope:
      "Every service the public can use online. The trigger is being an automated system accessible to the public, under section 11(b) of the Official Languages Regulations, with Official Languages Act section 24(1)(b) as the enabling hook. Geographic reach is a different test that covers correspondence and telephone, so a service is not exempt for serving one region. How bilingual web content is published is set by subsection 6.6.4.1 of the Directive on Official Languages for Communications and Services.",
    ownerDoes:
      "Funds and schedules both languages from the first prototype, and tests with francophone users.",
    whoDoes:
      "The service team builds it bilingual; the departmental official languages champion or adviser sets the obligations; communications owns the content standards.",
    whoBold: ["service team", "official languages champion or adviser"],
    ownerBold: ["Funds and schedules both languages", "tests with francophone users"],
    whereItEndsUp:
      "Nothing routine is filed. One artefact is real: any initiative going to the Treasury Board carries a completed Official Languages Appendix screening it against Parts IV, V, VI and VII, plus an impact analysis if any answer is yes.",
    caveat:
      "Bill C-13 changed language-of-work duties with effect from 20 June 2025, so anything written before that date may be out of date on the work side.",
    threads: ["joined-up-delivery", "change-management"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Confirm the service will be reachable by the public online, which is what makes it bilingual by rule. Reaching only one region does not exempt it.",
      },
      alpha: {
        tags: ["gather"],
        note: "Design and test in both languages from the first prototype. Retrofitting French into an interface built around English is where the cost arises.",
      },
      beta: {
        tags: ["fill", "submit"],
        note: "Both languages launch together. Where a Treasury Board submission is involved, the Official Languages Appendix goes with it.",
      },
      growth: {
        tags: ["keep"],
        note: "Every new feature and every new notification ships in both languages, at the same time.",
      },
      maturity: {
        tags: ["keep"],
        note: "Carried through the department's annual official languages review, and again on funding renewal.",
      },
    },
  },
  {
    name: "Official languages in what you buy",
    family: "Official languages",
    kind: "duty",
    whatItIs:
      "The obligation to write official languages requirements into the contract, so the supplier is contractually bound to deliver both languages.",
    everyService: false,
    scope:
      "Whenever a supplier delivers, hosts or supports any part of a service that reaches the public, or produces content on the department's behalf. Guidance is set through a contracting policy notice.",
    ownerDoes:
      "States the bilingual requirement in the statement of work before the solicitation goes out. Left out, French becomes a priced contract amendment later.",
    whoDoes: "The contracting authority writes the clauses into the solicitation and the contract.",
    whoBold: ["contracting authority"],
    ownerBold: ["States the bilingual requirement"],
    whereItEndsUp:
      "Held within the department. It appears in the solicitation and in the signed contract.",
    threads: ["procurement", "accessibility"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "The requirement goes into the solicitation, alongside the accessibility clauses, before anyone bids.",
      },
      beta: {
        tags: ["sign"],
        note: "The clauses are in the signed contract and the deliverables are checked against them.",
      },
      maturity: {
        tags: ["keep"],
        note: "Renewals and amendments carry the clauses forward.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Contracts and suppliers                                             */
  /* ------------------------------------------------------------------ */
  {
    name: "Security Requirements Check List",
    acronym: "SRCL, form TBS/SCT 350-103",
    family: "Contracts and suppliers",
    kind: "submission",
    whatItIs:
      "A short form that states, for one contract, exactly what security the supplier and its people need: what level of information they will touch, what screening each role needs, and whether the company may hold government information at its own offices.",
    everyService: false,
    scope:
      "Only where the supplier or its people will access Protected or Classified information or assets, enter restricted sites, or connect electronically to departmental systems, which includes any access to personal information the department holds. Where there are no security requirements, no check list is produced and the department certifies that instead.",
    ownerDoes:
      "Drafts the check list from the statement of work, saying what the supplier will do and touch, and signs the project authority block. A vague description produces clauses that block the work.",
    whoDoes:
      "The departmental security officer advises on the levels. Public Services and Procurement Canada's Contract Security Program reviews it and derives the clauses.",
    whoBold: ["departmental security officer", "Contract Security Program"],
    ownerBold: ["Drafts the check list", "signs the project authority block"],
    whereItEndsUp:
      "The contracting authority moves it with the requisition. It has to be settled before the solicitation is released or the contract awarded, and the approved check list is annexed to both. The project authority signs one block of it.",
    linkKey: "pspc-security-requirements-contracting",
    threads: ["procurement", "security"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Work out whether a supplier will be involved at all, and whether they would have access to protected information. Editorial placement.",
      },
      alpha: {
        tags: ["fill"],
        note: "Drafted while getting ready to buy, because the clauses it produces have to be in the solicitation.",
      },
      beta: {
        tags: ["sign", "submit"],
        note: "The project authority signs their block; the security officer signs theirs. Clearance is confirmed before award, and supplier screening can take months, so a late start delays the contract, not the paperwork.",
      },
      growth: {
        tags: ["keep"],
        note: "Each new requirement or requisition that touches new information needs its own check list, with new signatures.",
      },
      maturity: {
        tags: ["keep"],
        note: "Renewals, re-competitions and amendments carrying a security requirement each need one.",
      },
      sunset: {
        tags: ["keep"],
        note: "The decommissioning or migration contract is itself a new requirement, so a vendor doing the retirement work needs one too.",
      },
    },
  },
  {
    name: "Supplier organization and personnel security screening",
    family: "Contracts and suppliers",
    kind: "authorization",
    whatItIs:
      "The clearances a company and its individual staff must hold before touching sensitive government work. A department cannot issue them itself, and the work cannot be awarded until the clearance is confirmed in writing.",
    everyService: false,
    scope:
      "Every procurement whose Security Requirements Check List identifies a security requirement, and the same applies to subcontractors at every tier. Organization screening covers Protected A, B and C; a facility clearance is for Classified.",
    ownerDoes:
      "Finds out early what clearance level the work needs. Screening often runs longer than the procurement.",
    whoDoes:
      "The Contract Security Program screens. The supplier appoints a company security officer. Individual staff apply through their employer.",
    whoBold: ["Contract Security Program", "company security officer"],
    ownerBold: ["Finds out early what clearance level"],
    whereItEndsUp:
      "Bidders submit a registration application with their bid, which the buyer forwards to the program. The program confirms in writing, before award, that the successful bidder meets the requirements.",
    linkKey: "pspc-security-requirements-contracting",
    moreLinks: ["directive-procurement"],
    threads: ["procurement", "security"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Find out what clearance level the work needs, because it sets the timeline more than the procurement does.",
      },
      beta: {
        tags: ["gather", "sign"],
        note: "Confirmed before award. Individual screening can run months, and new staff joining mid-contract need it too.",
      },
      growth: {
        tags: ["keep"],
        note: "New supplier staff and new subcontractors are screened before they get access.",
      },
      maturity: {
        tags: ["keep"],
        note: "Clearances expire and are renewed. Work cannot continue on lapsed screening.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Hosting and cloud                                                   */
  /* ------------------------------------------------------------------ */
  {
    name: "Contracts awarded to Indigenous businesses",
    acronym: "the 5% target",
    family: "Contracts and suppliers",
    kind: "duty",
    whatItIs:
      "A government-wide commitment that at least 5% of the total value of contracts goes to Indigenous businesses each year. Departments plan for it, report against it, and meet it or miss it one procurement at a time.",
    everyService: false,
    scope:
      "Only when buying. The target belongs to the department and not to any one contract, so no single procurement has to be set aside. Every procurement is where the target is met or missed, which is why departments plan for it up front. Whether a supplier counts is verified through Indigenous Services Canada.",
    ownerDoes:
      "Says early whether the requirement could be met by an Indigenous business, and says so before the solicitation is written, when the route is still open.",
    ownerBold: ["Says early whether the requirement could be met by an Indigenous business"],
    whoDoes:
      "The contracting authority chooses the route and runs it. The department's procurement function plans against the target and reports the results.",
    whoBold: ["contracting authority", "procurement function"],
    whereItEndsUp:
      "Public. Contracts awarded to Indigenous businesses are disclosed, and departments report on planning and performance against the target.",
    linkKey: "directive-procurement-indigenous-appendix-e",
    threads: ["procurement"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Ask the contracting authority what the department's position on the target is this year, because it shapes the buying route more than the requirement does.",
      },
      alpha: {
        tags: ["gather"],
        note: "Say whether the work could be done by an Indigenous business while the solicitation is still being written. Once it is published the route is fixed.",
      },
    },
  },
  {
    name: "Application hosting decision, and the public cloud default",
    family: "Hosting and cloud",
    kind: "review",
    whatItIs:
      "The decision about where the service runs, made against a government-wide preference order: software as a service before platform before infrastructure, and public cloud before hybrid before private before non-cloud. Departing from that order needs a case.",
    everyService: true,
    scope:
      "Every service has to make the decision. The trigger is specific: an initiative categorized at Protected B or below that uses a deployment model other than public cloud for hosting, deployment or development must go to the Government of Canada Enterprise Architecture Review Board. There is no dollar floor on that trigger.",
    ownerDoes:
      "States what the service needs from its hosting, and makes the case where the answer is anything other than public cloud.",
    whoDoes:
      "The departmental architecture and hosting functions decide. A departmental architecture review board approval is mandatory on application hosting initiatives.",
    whoBold: ["architecture and hosting functions"],
    ownerBold: ["States what the service needs", "makes the case"],
    whereItEndsUp:
      "Hosting submissions go to Shared Services Canada through its hosting services portal. Where the trigger is met, the departmental chief information officer submits to the government-wide board.",
    linkKey: "directive-on-service-and-digital",
    threads: ["dependencies-and-standards"],
    cells: {
      alpha: {
        tags: ["check", "submit"],
        note: "Decide the hosting model while the design can still absorb the answer, and take it to the departmental board. Anything other than public cloud at Protected B or below also goes to the government-wide board.",
      },
      beta: {
        tags: ["sign"],
        note: "The hosting arrangement is in place and the decision is on the record.",
      },
      maturity: {
        tags: ["keep"],
        note: "Revisited as the technology ages, and again where custom support has to be extended to keep something supported.",
      },
    },
  },
  {
    name: "Cloud security profile, guardrails, and the cloud authorization",
    family: "Hosting and cloud",
    kind: "authorization",
    whatItIs:
      "The extra security work a cloud-hosted service carries: a ready-made control profile to build against, guardrails that have to be implemented, validated and reported within the first 30 business days of getting a cloud account, and a security assessment that accounts for the split between what the provider does and what the department does.",
    everyService: false,
    scope:
      "Only for cloud-hosted services. The Protected B control profile is the usual starting point. The Cyber Centre separately assesses cloud service providers, so a department inherits that assessment rather than repeating it, and assesses only its own configuration and use.",
    ownerDoes: "Says what the service holds, so the right control profile is picked.",
    whoDoes:
      "The departmental security team, with the cloud team, works out the split of responsibility with the provider; the provider's own assessment is inherited.",
    whoBold: ["departmental security team"],
    ownerBold: ["Says what the service holds"],
    linkKey: "gc-cloud-security-control-profile",
    whereItEndsUp:
      "Held within the department beyond the hosting route. The authorization is signed there, as for any other service.",
    threads: ["dependencies-and-standards", "security"],
    cells: {
      alpha: {
        tags: ["check", "gather"],
        note: "Establish which control profile applies and what the provider covers, because it changes the size of what the department has to build and buy.",
      },
      beta: {
        tags: ["fill", "sign"],
        note: "Guardrails in place in the new environment, the security assessment done against the split of responsibility, and the authorization signed before operations commence.",
      },
      growth: {
        tags: ["keep"],
        note: "New cloud services added to the environment come with their own assessment work.",
      },
      maturity: {
        tags: ["keep"],
        note: "Configuration drifts. The guardrails and the assessment are re-checked.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Identity and sign-in                                                */
  /* ------------------------------------------------------------------ */
  {
    name: "Identity and credential assurance levels",
    family: "Identity and sign-in",
    kind: "assessment",
    whatItIs:
      "Two ratings, from one to four, of how sure the service has to be about who someone is and how strong the sign-in has to be. They constrain the design from the beginning, because they decide what the sign-in has to do before anyone builds it.",
    everyService: false,
    scope:
      "Any service where people or businesses have accounts, sign in, or are identified. There are four levels, one to four, running from little confidence needed to very high confidence needed. A worksheet in the Guideline on Defining Authentication Requirements produces the level for a given service.",
    ownerDoes: "Makes the judgement about what harm results from getting someone's identity wrong.",
    whoDoes:
      "The departmental identity management function sets the level, with the security team.",
    whoBold: ["identity management function"],
    linkKey: "directive-identity-management",
    moreLinks: ["guideline-authentication-requirements"],
    caveat:
      "The stand-alone Standard on Identity and Credential Assurance was archived on 28 June 2019. The live version is Appendix A of the Directive on Identity Management.",
    ownerBold: ["Makes the judgement about what harm results"],
    whereItEndsUp:
      "Held within the department. Nothing outside is waiting on it, so the timing is the department's own.",
    threads: ["security", "user-research"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Establish whether the service identifies people at all.",
      },
      alpha: {
        tags: ["gather", "fill"],
        note: "The level is set. It decides whether the service can use a simple sign-in or needs strong authentication and identity proofing, which is not a late-stage change.",
      },
      growth: {
        tags: ["keep"],
        note: "A new transaction with higher consequences can raise the level.",
      },
    },
  },
  {
    name: "Government of Canada credential and sign-in services",
    family: "Identity and sign-in",
    kind: "duty",
    whatItIs:
      "The shared sign-in services a department can use in place of building its own: the government-branded credential service, the commercial bank-based option, and the newer federated sign-in platform. Using one of them is the default, and a sign-in built from scratch is what needs justifying.",
    everyService: false,
    scope:
      "Any external-facing service where clients sign in. Joining a shared platform involves compliance checks and testing before go-live, and the platform's own team sets what those are.",
    ownerDoes:
      "Picks the credential route before the prototype hard-codes a sign-in of its own, and allows for the onboarding time in the schedule.",
    whoDoes:
      "The departmental identity and integration teams, with the platform's onboarding team.",
    whoBold: ["identity and integration teams"],
    ownerBold: ["Picks the credential route", "allows for the onboarding time"],
    whereItEndsUp:
      "The department onboards through the platform's process, including an attestation.",
    threads: ["dependencies-and-standards"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Pick the credential route before the prototype hard-codes a sign-in of its own.",
      },
      beta: {
        tags: ["fill", "submit"],
        note: "Onboarding, attestation and testing in the acceptance environment take real calendar time and are a common launch delay.",
      },
      maturity: {
        tags: ["keep"],
        note: "Platform changes and credential migrations land on the service.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Publishing on canada.ca                                             */
  /* ------------------------------------------------------------------ */
  {
    name: "Publishing under the canada.ca brand",
    family: "Publishing on canada.ca",
    kind: "duty",
    whatItIs:
      "The rules for anything the public sees: the domain, the global header and footer, the Government of Canada signature and wordmark, the mandatory page templates, the information architecture, and the content style guide. They are mandatory, and they constrain how a service can look and where it can live.",
    everyService: false,
    scope:
      "Every external-facing website and web application. Inside the department the head of communications is accountable for external-facing websites and for mobile applications, and the directive holds both to its Appendix D, the Standard on External-facing Websites and Mobile Applications. The same directive requires the official web analytics tool administered by Service Canada.",
    ownerDoes:
      "Brings the departmental web team and the head of communications in before the first prototype, and settles the web address with them before any launch date is promised.",
    whoDoes:
      "The departmental web team and content designers, under the communications organization. The departmental web account manager files the domain request.",
    whoBold: ["web team and content designers", "web account manager"],
    ownerBold: ["Brings the departmental web team", "settles the web address"],
    linkKey: "directive-communications-federal-identity",
    whereItEndsUp:
      "The web address is settled outside the service team, through the departmental web team. For a downloadable mobile application, the mandated publishing entity independently tests, publishes and later retires it, so the department does not control its own app store presence.",
    caveat:
      "The governing instrument changed on 27 March 2025: the Directive on the Management of Communications and Federal Identity replaced the 2016 communications directive, and its Appendix D replaced the former mandatory procedures for social media and web communications. Anything citing the older instrument is citing an archived one.",
    threads: ["accessibility", "change-management"],
    cells: {
      alpha: {
        tags: ["check", "gather"],
        note: "Bring the departmental web team and the head of communications in before the first prototype. The templates and the information architecture are usually discovered at Beta, when a custom-designed prototype meets the web team for the first time.",
      },
      beta: {
        tags: ["submit", "sign"],
        note: "The web address is settled and the official web analytics tool is in place. Start that with the departmental web team before any launch date is promised to stakeholders.",
      },
      growth: {
        tags: ["keep"],
        note: "New pages use the mandatory templates.",
      },
      maturity: {
        tags: ["keep"],
        note: "Analytics-based optimization is a continuing duty, not a launch task.",
      },
      sunset: {
        tags: ["close"],
        note: "Pages are retired through the web team; a downloadable app is removed centrally rather than by the department.",
      },
    },
  },
  {
    name: "Responsive web, or a native mobile app",
    family: "Publishing on canada.ca",
    kind: "duty",
    whatItIs:
      "The rule that a public-facing service works properly on a phone, and that choosing a downloadable app over a responsive web page has to be justified. A downloadable app also adds a central publishing step the department does not control.",
    everyService: false,
    scope: "Every public-facing website and web application.",
    ownerDoes:
      "Decides between responsive web and a downloadable app, with evidence from user research.",
    whoDoes: "The service team and the departmental web team.",
    whoBold: ["service team", "departmental web team"],
    ownerBold: [
      "Decides between responsive web and a downloadable app",
      "evidence from user research",
    ],
    whereItEndsUp:
      "Nothing for a responsive service. A downloadable app is handed to the mandated publishing entity, which tests, publishes and retires it.",
    threads: ["accessibility"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Decide responsive web against native app during prototyping, with evidence from user research, not after the build.",
      },
      beta: {
        tags: ["fill"],
        note: "Tested on real devices before launch. A native app additionally goes through the central publishing process.",
      },
      maturity: {
        tags: ["keep"],
        note: "Re-tested as devices, browsers and operating systems change.",
      },
      sunset: {
        tags: ["submit"],
        note: "App removal is performed centrally, which is a dependency at retirement as well as at launch.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* Access to information and openness                                  */
  /* ------------------------------------------------------------------ */
  {
    name: "Access to information readiness, and the duty to document",
    family: "Access to information and openness",
    kind: "duty",
    whatItIs:
      "Everything the service records can be asked for under an access request, and decisions of business value have to be documented in the first place. That shapes what gets written down, what the system keeps, and whether records can be found and released when someone asks.",
    everyService: true,
    scope:
      "All records under the department's control. Systems that manage information and data carry their own standard, which sets what a system has to be able to do with records.",
    ownerDoes: "Says what decisions the service makes and what evidence should be kept.",
    whoDoes:
      "The service team builds the records so they can be found and released; the access to information and privacy office handles requests.",
    whoBold: ["service team", "access to information and privacy office"],
    ownerBold: ["Says what decisions the service makes", "what evidence should be kept"],
    whereItEndsUp:
      "The department responds to requests, and publishes summaries of completed requests on the open government portal.",
    threads: ["data-stewardship"],
    cells: {
      alpha: {
        tags: ["gather"],
        note: "Say what decisions the service will make and what evidence it should keep, so the system is built to produce a retrievable record.",
      },
      beta: {
        tags: ["fill"],
        note: "Records are structured and retrievable, not scattered across systems nobody can search.",
      },
      maturity: {
        tags: ["keep"],
        note: "Summaries of completed requests are published monthly by the department.",
      },
    },
  },
  {
    name: "Proactive publication",
    family: "Access to information and openness",
    kind: "filing",
    whatItIs:
      "Publication that happens without anyone asking, as a statutory duty. For a procured digital service the live ones are contracts over $10,000, grants and contributions over $25,000, and the titles of briefing materials.",
    everyService: false,
    scope:
      "Triggered by what the service does rather than by its size. Any contract over $10,000 triggers contract publication; a grants or contributions program triggers the other.",
    ownerDoes: "Tells the contracting authority which contracts and grants cross the thresholds.",
    whoDoes:
      "The department's proactive publication function publishes; the contracting authority supplies the contract data.",
    whoBold: ["proactive publication function", "contracting authority"],
    ownerBold: ["Tells the contracting authority"],
    whereItEndsUp:
      "The department publishes on the open government portal, on a quarterly cycle for contracts.",
    threads: ["data-stewardship"],
    cells: {
      beta: {
        tags: ["submit"],
        note: "The contract that buys the build is published once awarded.",
      },
      maturity: {
        tags: ["keep"],
        note: "Amendments and renewals are published on the same cycle.",
      },
    },
  },
  {
    name: "Open data and open information",
    family: "Access to information and openness",
    kind: "filing",
    whatItIs:
      "The expectation that data and information of business value are released openly by default, in reusable formats, unless something specific stops it. Info Source separately describes what information the institution holds.",
    everyService: true,
    scope:
      "Applies by default. What is actually released depends on privacy, security and legal restrictions, so the work is deciding what can be opened rather than whether the duty exists.",
    ownerDoes: "Says what the service will hold that could be released, and what stops it.",
    whoDoes: "The departmental open government and information management functions.",
    whoBold: ["open government and information management functions"],
    ownerBold: ["Says what the service will hold", "what stops it"],
    whereItEndsUp: "The department publishes on the open government portal.",
    threads: ["data-stewardship"],
    cells: {
      alpha: {
        tags: ["check"],
        note: "Work out what the service will hold that could be released, and what stops it. Editorial placement.",
      },
      maturity: {
        tags: ["keep"],
        note: "Releases and the institution's information description are kept current.",
      },
    },
  },
];
