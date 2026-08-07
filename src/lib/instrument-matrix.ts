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
 */

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

export type MatrixAction =
  | "check"
  | "gather"
  | "fill"
  | "sign"
  | "submit"
  | "keep"
  | "close";

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
  /** Thread pages that own this instrument's subject. Never rendered in the table. */
  threads?: readonly string[];
  /** Flagged where the research is thin. */
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

export const INSTRUMENT_MATRIX: MatrixInstrument[] = [
  /* ------------------------------------------------------------------ */
  /* Security                                                            */
  /* ------------------------------------------------------------------ */
  {
    name: "Security categorization",
    family: "Security",
    kind: "assessment",
    whatItIs:
      "A rating of how much injury would result if the service's information leaked, if someone altered it, or if the service became unavailable. The three are judged separately, on four levels from low to very high, and the result decides the size of the security control set the build has to meet.",
    everyService: true,
    scope:
      "Every service. Three separate requirements point at the same standard: for assets, for information, and for services and activities. The service-level one is part of the business impact analysis requirement.",
    ownerDoes:
      "Makes the judgement about how bad it would be if this information leaked, if someone changed it, or if the service stopped, judging the three separately. That judgement is in no document anywhere: it comes from knowing the program and its clients, which is exactly why the security team cannot supply it.",
    whoDoes:
      "The departmental security team assigns it. The injury judgement behind it comes from the business, ideally with legal and the access to information and privacy office in the room.",
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
      "The exercise that lists what could go wrong, ranks each by how likely it is and how much damage it would do, and states the risk left over after safeguards. By doctrine it covers deliberate, accidental and natural threats alike, so it is not a cybersecurity-only exercise, though in practice the information technology one runs narrower because natural hazards are routed into continuity instead.",
    everyService: true,
    scope:
      "The activity applies to all information systems that support departmental programs, services or activities. No dollar figure, no user count, no risk score. A standalone report is a different matter: producing one is neither recommended nor required, and the results are meant to go into the ordinary design documents.",
    ownerDoes:
      "Approves the work plan before the assessment starts, and states in advance how much left-over risk is acceptable. Supplies what the service is worth to the business and what it depends on. Accepts or refuses the left-over risk at the end. Does not write the assessment.",
    whoDoes:
      "A security practitioner works with the system designers during design, and a security assessor, often a contractor, assesses the built system. The business owner joins the assessment team as the program authority rather than as its author.",
    whereItEndsUp:
      "Held within the department. Nothing outside is waiting on it, so the timing is the department's own. The results feed the authorization package.",
    linkKey: "harmonized-tra-methodology",
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
      "The second, parallel security track, for buildings, equipment and physical space rather than systems. It uses the same harmonized method, run by different people, ending in a different signature.",
    everyService: false,
    scope:
      "Only if the service touches physical space: new accommodation, hardware in people's hands, kiosks, or software that operates doors, gates, lighting or heating. A cloud-hosted service with no hardware usually stays clear of it.",
    ownerDoes:
      "Says whether the service touches physical space at all. That answer comes from knowing what is actually being built.",
    whoDoes:
      "Departmental physical security, using the Royal Canadian Mounted Police (RCMP) assessment guide.",
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
      "The formal permission for the service to run. Someone with the authority reads what the security work found, accepts the risk that is left, and signs. For a departmental system that signer is normally the program or service delivery manager, which is to say the business owner.",
    everyService: true,
    scope:
      "Every information system, before operations commence. Each department defines its own documented practice for how it is done, which is why identical systems get different treatment in different departments.",
    ownerDoes:
      "Gets the conditions for authorization in writing before the design starts, then reads the package and decides: authorize, authorize with conditions, or refuse. The conditions come from the departmental security plan, or from the authorizer directly where the plan does not record them.",
    whoDoes:
      "The information technology security team assembles the package; a security assessor, often independent, does the assessment.",
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
      "The exercise that works out who is harmed if the service stops, how quickly that harm becomes serious, and what the service depends on. Its outputs are the criticality judgement and four numbers: maximum allowable downtime, minimum service level, recovery time objective and recovery point objective.",
    everyService: true,
    scope:
      "Every service should answer the question, because the answer is what decides whether anything further is owed. The directive's formal requirement is narrower. It reaches only the services and activities that support the availability of what is critical to the health, safety, security or economic well-being of Canadians, or to the effective functioning of government. Large departments are separately measured on holding an up-to-date analysis for every external and internal enterprise service.",
    ownerDoes:
      "Makes the judgement about who is harmed if the service stops, how fast that harm escalates, and what the service depends on. None of it can be looked up: it comes from knowing the clients and the program calendar, which is why the continuity specialist cannot produce it alone.",
    whoDoes:
      "The departmental business continuity management specialist, who is also the person responsible for identifying which services are critical.",
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
      "The written arrangements for keeping a critical service delivering at a minimum acceptable level during a disruption, and recovering it afterwards. There is one plan for the department. A critical service may have its own, sit inside a broader one, or be supported by several.",
    everyService: false,
    scope:
      "Only if the business impact analysis marks the service critical, meaning disruption would cause a high or very high degree of injury. One department reads that as needing to recover to minimum service levels within 72 hours.",
    ownerDoes:
      "Supplies the recovery steps and the workarounds, then tests them. Both come from the people who run it day to day. Asks the coordinator to point to where this service appears in the departmental plan, with its downtime limit.",
    whoDoes:
      "The departmental or branch business continuity coordinator drafts it on the departmental template. No instrument assigns the drafting to a service's business owner.",
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
      "A structured look at what personal information the service collects, why it is allowed to, where it flows, how long it is kept, and what happens to people if it goes wrong. A mandatory checklist comes first and decides whether a full assessment, a lighter privacy protocol, or neither is needed.",
    everyService: false,
    scope:
      "Triggers are broad. A new or substantially modified program that creates, collects, uses, discloses, retains or disposes of personal information brings it into scope. So does using it for an administrative purpose, contracting the program out or transferring it, bringing in a third party, changing the technology that processes it, or automating a decision. No dollar or user-count threshold.",
    ownerDoes:
      "Says what personal information the service will use and which decisions about people it will be used to make. Comes from the program design. The checklist step happens whether or not the answer turns out to be yes.",
    whoDoes:
      "The program area drafts it on the Treasury Board template; the access to information and privacy office reviews, iterates and owns the instrument.",
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
      "A questionnaire the department fills in about itself, scoring how much an automated decision could affect people's rights, health, economic interests or the ongoing sustainability of an ecosystem. The score sets obligations for explanation, human involvement, testing and recourse.",
    everyService: false,
    scope:
      "Only if the service makes or supports an automated decision about a person: scoring, ranking, recommending, or auto-approving. A later efficiency feature can trigger it without anyone noticing.",
    ownerDoes:
      "Fills in the questionnaire, usually with the department's data or artificial intelligence people. The answers come from how the program works and what the decision does to people, so nobody outside can supply them.",
    whoDoes:
      "The department completes it itself, normally the program team with support from the data or chief information officer function. It is not an external audit.",
    whereItEndsUp:
      "The results are published on the Open Government Portal before the system goes into production, where anyone outside the department can see them. The assistant deputy minister responsible for the program completes and approves them, or another senior official the deputy head names.",
    linkKey: "algorithmic-impact-assessment",
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
      "A supplier's written statement of how far their product meets the accessibility standard, clause by clause, with the gaps named. It is a claim to be tested, not a certificate.",
    everyService: false,
    scope:
      "Only when buying. An in-house build has no supplier and no report; the equivalent duty is the department's own conformance assessment against the standard.",
    ownerDoes:
      "Says which clauses of the standard the service has to meet, so they go into the solicitation, then reads the supplier's report instead of trusting it.",
    whoDoes:
      "The supplier, through a third party or a qualified in-house accessibility expert.",
    whereItEndsUp:
      "The supplier provides it at contract award. The department verifies it, tests independently, and requires a remediation roadmap for every gap.",
    linkKey: "a11y-toolkit-procurement",
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
      "Includes the people most likely to be excluded in the research, books the testing early, and funds the fixes. Who is excluded comes from research, not from an automated checker, which catches only a fraction.",
    whoDoes:
      "The service team, with testing done with people with disabilities. Automated checkers catch only a fraction.",
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
      "A short, early write-up of the problem, the rough size of the investment, and the direction being considered, produced before a business case and before any solution is chosen.",
    everyService: false,
    scope:
      "Mandatory for digitally enabled projects where the department is willing to invest at least: $2.5 million with no approved capacity class or class 1; $5 million at class 2; $10 million at class 3; $15 million for National Defence; $25 million at class 4.",
    ownerDoes:
      "Writes the problem and the rough size, and gets assistant deputy minister approval. It is built from Discovery's evidence, so a thin Discovery produces a thin concept case.",
    whoDoes: "The department, approved at assistant deputy minister level or above.",
    whereItEndsUp:
      "The department sends it to the Treasury Board of Canada Secretariat for review by the Chief Information Officer of Canada.",
    linkKey: "concept-case-procedures",
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
      "Answers the business-risk questions, including how ready the organization actually is to adopt the thing. Only the program can answer that with any accuracy, and the score decides who is allowed to approve the project.",
    whoDoes:
      "The departmental project management office authors it; the project sponsor is responsible for ensuring it is completed; the deputy head is responsible for its accuracy.",
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
      "The department's own board, chaired by its chief information officer, that reviews a digital initiative's design against the government-wide architecture framework: reuse before buy before build, open standards, data, security and privacy.",
    everyService: true,
    scope:
      "All departmental digital initiatives. Two carve-outs: small departments and agencies, meaning reference levels under $300 million a year or so designated, are exempt; and Agents of Parliament are exempt.",
    ownerDoes:
      "Presents the direction, bringing the reuse scan Discovery produced. Reach the board through the architecture team in the chief information officer's office.",
    whoDoes:
      "The board reviews. The chief information officer's architecture team prepares the material and the project team usually presents.",
    whereItEndsUp: "Held within the department unless the initiative goes on to the government-wide board.",
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
      "The government-wide architecture board, co-chaired by the Chief Technology Officer of Canada and the Chief Technology Officer of Shared Services Canada, which reviews only the large or unusual initiatives.",
    everyService: false,
    scope:
      "Any one of these is enough. The department is willing to invest $2.5 million with no class or class 1, $5 million at class 2, $10 million at class 3, $15 million for National Defence, $25 million at class 4. Or the initiative involves emerging technologies. Or it needs an exception under the directive. Or it is categorized at Protected B or below and uses a deployment model other than public cloud. Or it extends or creates custom support to stop a technology becoming unsupported. Or the Chief Information Officer of Canada directs it.",
    ownerDoes:
      "Checks all six triggers rather than only the money one, then supports the departmental chief information officer's submission. A small initiative can qualify on emerging technology or hosting alone.",
    whoDoes: "The departmental chief information officer submits; the project team usually attends.",
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
      "The formal request to the Treasury Board for authority and money when the project is beyond what the minister can approve alone. It carries a chief financial officer attestation and commits the department to specific benefits.",
    everyService: false,
    scope:
      "When the project's complexity level exceeds the department's approved capacity class, or the department has no class and the project is over $2.5 million. Plus all programmes. Plus procurement or real property above their own approval limits.",
    ownerDoes:
      "Supplies what the service is for, what it will cost, and what benefits it promises. The promises get tracked afterwards, so they are worth being careful about.",
    whoDoes: "The department writes it; the chief financial officer attests.",
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
      "Names the benefits when the money is sought, then supplies the delivery record at close-out. Both come from the program's own evidence.",
    whoDoes: "The project sponsor and the departmental project office.",
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
      "Supplies the service details to whoever holds the inventory. Name the service in language its clients would recognise rather than in program shorthand, because this is the public record of it.",
    whoDoes: "The designated official for service registers it; the business owner supplies the details.",
    whereItEndsUp:
      "The department publishes through the open government portal; the deputy head approves the inventory and its annual updates.",
    linkKey: "gc-service-inventory",
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
      "Supplies the application's criticality and its condition. This is the only register that records criticality at all, so leaving it blank means no government-wide record shows the service as critical.",
    whoDoes:
      "A departmental portfolio delegate holds the inventory and coordinates entry; the substantive ratings depend on the business application owner.",
    whereItEndsUp:
      "The department transmits to the Treasury Board of Canada Secretariat annually; the public dataset refreshes twice a year.",
    caveat:
      "The numeric weighting behind the business value and technical condition scores is documented only on Government of Canada network guides and is unverified here.",
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
      "The written consent from Library and Archives Canada without which no government record may be destroyed, plus the department's own schedule saying how long each kind of record is kept. The authority is permission to dispose. It is not an instruction to dispose, and it does not set retention periods.",
    everyService: true,
    scope:
      "All information and data. Library and Archives Canada issues either an institution-specific or a multi-institution authority; the department confirms which one covers its records and sets the retention periods itself.",
    ownerDoes:
      "Tells the information management office what records and data the service will create and hold, and sets the retention periods, because Library and Archives Canada will not set them.",
    whoDoes:
      "The information management function under the departmental chief information officer.",
    whereItEndsUp:
      "The department requests a new authority from Library and Archives Canada where none covers the records.",
    linkKey: "lac-information-disposition-hub",
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
    name: "Information technology continuity management",
    family: "Continuity and incidents",
    kind: "plan",
    whatItIs:
      "The service team's own recovery arrangements: how this system gets back up, in what order its parts are restored, and proof from testing that the restore actually works. This is the part the team owns, as distinct from the departmental business continuity plan, which is the department's.",
    everyService: true,
    scope:
      "All information systems. Recovery strategies are set in accordance with the department's business continuity requirements, so the recovery targets come down from the business impact analysis and this is where they get met.",
    ownerDoes:
      "Makes sure the restore is actually tested rather than assumed, and that the recovery target the business impact analysis set is the one the build was designed to meet.",
    whoDoes:
      "The team running the service, with information technology operations and the hosting provider.",
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
      "Knows before launch who to call and how fast, and reports an incident rather than sitting on it. The escalation route comes from the departmental security operations team.",
    whoDoes:
      "The departmental security operations function and the designated official for cyber security. The service team detects, contains and supplies the facts.",
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
      "The report a department must make when personal information is lost, accessed or disclosed in a way that could reasonably be expected to cause serious injury. It goes to the Office of the Privacy Commissioner of Canada and to the Treasury Board of Canada Secretariat, and affected people are notified.",
    everyService: false,
    scope:
      "Only when a breach involving personal information is judged material, on sensitivity of the information, number of people affected, and whether it is a systemic problem. A cyber incident touching personal information can trigger both this and the cyber reporting route at once.",
    ownerDoes:
      "Tells the privacy office immediately what happened and what information was involved. They make the materiality call and the report, not you.",
    whoDoes:
      "The access to information and privacy office assesses materiality and prepares the report; the service team supplies what happened.",
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
      "The duty to offer and deliver the service in English and French, equally and at the same time. For a digital service this covers the interface, the content, notifications, error messages, and the human support behind it. Quality has to be equal, so a translated afterthought does not meet it.",
    everyService: true,
    scope:
      "In practice yes for a national digital service. The route is the Official Languages Act section 24(1)(b) with section 11(b) of the regulations, which is what makes a service available across Canada bilingual regardless of where the office sits. The operational rule a team is measured against is subsection 6.6.4.1 of the Directive on Official Languages for Communications and Services.",
    ownerDoes:
      "Funds and schedules both languages from the first prototype, and tests with francophone users. Retrofitting French into an interface built around English is where the cost arises.",
    whoDoes:
      "The service team builds it bilingual; the departmental official languages champion or adviser sets the obligations; communications owns the content standards.",
    whereItEndsUp:
      "Nothing routine is filed. One artefact is real: any initiative going to the Treasury Board carries a completed Official Languages Appendix screening it against Parts IV, V, VI and VII, plus an impact analysis if any answer is yes.",
    caveat:
      "A first-pass research answer cited Official Languages Act section 22(a) and section 36(1)(a) here. Both were wrong and have been corrected. Bill C-13 also changed language-of-work duties effective 20 June 2025.",
    threads: ["joined-up-delivery", "change-management"],
    cells: {
      discovery: {
        tags: ["check"],
        note: "Confirm the service is available across Canada, which is what makes it bilingual by rule rather than by choice.",
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
      "The obligation to write official languages requirements into the contract, so a supplier is contractually bound to deliver both languages rather than being asked for French later as a change request.",
    everyService: false,
    scope:
      "Whenever a supplier delivers, hosts or supports any part of a service that reaches the public, or produces content on the department's behalf. Guidance is set through a contracting policy notice.",
    ownerDoes:
      "States the requirement so the contracting authority can write the clauses. A supplier not contractually bound to deliver French will charge for it later as a contract change.",
    whoDoes:
      "The business owner states the requirement; the contracting authority writes the clauses.",
    whereItEndsUp: "Held within the department. It appears in the solicitation and in the signed contract.",
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
      "A short form that states, for one specific contract, exactly what security the supplier and its people need: what level of information they will touch, what screening each role needs, and whether the company may hold government information at its own offices. It is what turns a vague sense that a contract is sensitive into the clauses that actually go into the solicitation.",
    everyService: false,
    scope:
      "Only where the supplier or its people will access Protected or Classified information or assets, enter restricted sites, or connect electronically to departmental systems, which includes any access to personal information the department holds. Where there are no security requirements, no check list is produced and the department certifies that instead.",
    ownerDoes:
      "Describes what the supplier will actually do and touch, then signs their block. The description comes from the statement of work, and a vague one produces clauses that block the work.",
    whoDoes:
      "The client department's project authority, meaning the business or program area that owns the requirement, drafts it. The departmental security officer advises on the levels. Public Services and Procurement Canada's Contract Security Program reviews it and derives the clauses.",
    whereItEndsUp:
      "The contracting authority moves it with the requisition. It has to be settled before the solicitation is released or the contract awarded, and the approved check list is annexed to both. The project authority signs one block of it.",
    caveat:
      "A first-pass answer said this goes straight to the Contract Security Program before the requisition, and that the business owner completes and submits it. Both were overstated: the citable deadline is before release of the solicitation or award, and the document travels with the requisition form.",
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
      "The clearances a company and its individual staff must hold before touching sensitive government work. Departments do not clear suppliers themselves; a single federal program does it, and confirms in writing that a supplier may be awarded the work.",
    everyService: false,
    scope:
      "Every procurement whose Security Requirements Check List identifies a security requirement, and the same applies to subcontractors at every tier. Organization screening covers Protected A, B and C; a facility clearance is for Classified.",
    ownerDoes:
      "Finds out early what clearance level the work needs, because screening timelines often exceed the procurement timelines.",
    whoDoes:
      "The Contract Security Program screens. The supplier appoints a company security officer. Individual staff apply through their employer.",
    whereItEndsUp:
      "Bidders submit a registration application with their bid, which the buyer forwards to the program. The program confirms in writing, before award, that the successful bidder meets the requirements.",
    caveat:
      "A first-pass answer said organization screening covers only Protected A and B, which would push a reader toward an unnecessary facility clearance and a much longer schedule. It covers Protected C too.",
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
    name: "Application hosting decision, and the public cloud default",
    family: "Hosting and cloud",
    kind: "review",
    whatItIs:
      "The decision about where the service runs, made against a government-wide preference order rather than a local preference. Software as a service before platform before infrastructure; public cloud before hybrid before private before non-cloud. Departing from it needs a case, not a preference.",
    everyService: true,
    scope:
      "Every service has to make the decision. The trigger is specific: an initiative categorized at Protected B or below that uses a deployment model other than public cloud for hosting, deployment or development must go to the Government of Canada Enterprise Architecture Review Board. There is no dollar floor on that trigger.",
    ownerDoes:
      "States what the service needs so the hosting choice can be made against the government-wide preference order, and takes the case to the board when the answer is anything other than public cloud.",
    whoDoes:
      "The departmental architecture and hosting functions, with the business owner setting the requirements. A departmental architecture review board approval is mandatory on application hosting initiatives.",
    whereItEndsUp:
      "Hosting submissions go to Shared Services Canada through its hosting services portal. Where the trigger is met, the departmental chief information officer submits to the government-wide board.",
    caveat:
      "The in-force citation for the non-public-cloud trigger is subsection 4.3.2.4 of the Directive on Service and Digital. A first-pass answer cited 4.1.1.2.4, which belongs to a version archived in 2022 and still circulates on wiki pages.",
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
      "The extra security work a cloud-hosted service carries: a ready-made control profile to build against, a set of guardrails to be in place within the first days of a new cloud environment, and a security assessment that has to account for what the cloud provider does versus what the department does.",
    everyService: false,
    scope:
      "Only for cloud-hosted services. The Protected B control profile is the usual starting point. The Cyber Centre separately assesses cloud service providers, so a department inherits that assessment rather than repeating it, and assesses only its own configuration and use.",
    ownerDoes:
      "Says what the service holds so the right control profile is picked, and understands which parts the provider covers and which the department still owns.",
    whoDoes:
      "The departmental security team, with the cloud team. The provider's own assessment is inherited.",
    whereItEndsUp:
      "Held within the department beyond the hosting route. The authorization is signed there, as for any other service.",
    caveat: "Research on this family is newer and thinner than the rest. Re-check before publishing.",
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
      "Two ratings, from one to four, of how sure the service has to be about who someone is, and how strong the sign-in has to be. They are set from the harm that would result from getting it wrong, and they decide what the sign-in has to do, so they constrain the design from the beginning.",
    everyService: false,
    scope:
      "Any service where people or businesses have accounts, sign in, or are identified. A worksheet under the authentication requirements guideline produces the level. At level three and above, multi-factor authentication follows.",
    ownerDoes:
      "Makes the judgement about what harm results from getting someone's identity wrong. That judgement sets the assurance level, and the level constrains the design from the very start.",
    whoDoes:
      "The departmental identity management function with the security team; the business owner supplies the harm judgement.",
    whereItEndsUp: "Held within the department. Nothing outside is waiting on it, so the timing is the department's own.",
    caveat: "Research on this family is newer and thinner than the rest. Re-check before publishing.",
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
      "The shared sign-in services a department uses instead of building its own: the government-branded credential service, the commercial bank-based option, and the newer federated sign-in platform. Using them is the default rather than a choice, and building a bespoke sign-in is the thing that needs justifying.",
    everyService: false,
    scope:
      "Any external-facing service where clients sign in. Onboarding to the federated platform involves a compliance attestation and testing in a client acceptance environment.",
    ownerDoes:
      "Picks the credential route before the prototype hard-codes a sign-in of its own, and allows for the onboarding time in the schedule.",
    whoDoes:
      "The departmental identity and integration teams, with the platform's onboarding team.",
    whereItEndsUp:
      "The department onboards through the platform's process, including an attestation.",
    caveat: "Research on this family is newer and thinner than the rest. Re-check before publishing.",
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
      "The rules for anything the public sees: the domain, the global header and footer, the Government of Canada signature and wordmark, the mandatory page templates, the information architecture, and the content style guide. They are mandatory, and they constrain what a service can look like and where it can live.",
    everyService: false,
    scope:
      "Every external-facing website and web application. Two sign-offs: inside the department the head of communications is accountable for external-facing sites, and outside it the Principal Publisher, which is Employment and Social Development Canada through Service Canada, controls the canada.ca domain and must approve every domain and sub-domain.",
    ownerDoes:
      "Brings the departmental web team and the head of communications in before the first prototype, and starts the domain request before promising anyone a launch date.",
    whoDoes:
      "The departmental web team and content designers, under the communications organization. The domain request is filed by the departmental web account manager, not by the business owner directly.",
    whereItEndsUp:
      "The department requests the domain from the Principal Publisher. For a downloadable mobile application, the mandated publishing entity independently tests, publishes and later retires it, so the department does not control its own app store presence.",
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
        note: "The domain is approved by the Principal Publisher and the official web analytics tool is in place. Start the domain request before any launch date is promised to stakeholders.",
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
    name: "Mobile: responsive by default, native app by justification",
    family: "Publishing on canada.ca",
    kind: "duty",
    whatItIs:
      "The rule that a public-facing service works properly on a phone, and that building a downloadable app instead of a responsive web page has to be justified. A native app also adds a central publishing step the department does not control.",
    everyService: false,
    scope: "Every public-facing website and web application.",
    ownerDoes:
      "Decides responsive web against a downloadable app with evidence from user research, knowing a downloadable app adds a publishing step the department does not control, at launch and at retirement.",
    whoDoes: "The service team and the departmental web team.",
    whereItEndsUp:
      "Nothing for a responsive service. A downloadable app is handed to the mandated publishing entity, which tests, publishes and retires it.",
    caveat:
      "The in-force status of the 2013 mobile standard and the 2011 usability standard could not be confirmed directly. Neither carries a rescission notice, but their practical content now runs through the canada.ca specifications. Re-check both before publishing. The Standard on Web Accessibility, by contrast, was confirmed rescinded on 2 March 2026.",
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
      "Everything the service records is subject to an access request, and decisions of business value have to be documented in the first place. That shapes what gets written down, what the system keeps, and whether records can be retrieved and released when someone asks.",
    everyService: true,
    scope:
      "All records under the department's control. Systems that manage information and data carry their own standard, which sets what a system has to be able to do with records.",
    ownerDoes:
      "Says what decisions the service makes and what evidence should be kept, so the system produces a record that can actually be found and released.",
    whoDoes:
      "The access to information and privacy office handles requests; the service team has to have made the records findable and retrievable.",
    whereItEndsUp:
      "The department responds to requests, and publishes summaries of completed requests on the open government portal.",
    caveat: "Research on this family is newer and thinner than the rest. Re-check before publishing.",
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
      "Publication that happens without anyone asking. For a procured digital service the live ones are contracts over $10,000, grants and contributions over $25,000, and titles of briefing materials. It is a statutory duty, not a courtesy.",
    everyService: false,
    scope:
      "Triggered by what the service does rather than by its size. Any contract over $10,000 triggers contract publication; a grants or contributions program triggers the other.",
    ownerDoes:
      "Supplies the contract data. Publication runs on a fixed cycle, independently of the team.",
    whoDoes:
      "The department's proactive publication function, with the contracting authority supplying contract data.",
    whereItEndsUp:
      "The department publishes on the open government portal, on a quarterly cycle for contracts.",
    caveat: "Research on this family is newer and thinner than the rest. Re-check before publishing.",
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
    ownerDoes:
      "Says what the service will hold that could be released, and what stops it. That comes from knowing the data, not from the open government office.",
    whoDoes: "The departmental open government and information management functions.",
    whereItEndsUp: "The department publishes on the open government portal.",
    caveat: "Research on this family is newer and thinner than the rest. Re-check before publishing.",
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
