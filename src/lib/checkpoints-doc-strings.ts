/**
 * The words that belong to the checkpoints Word document itself.
 *
 * `scripts/build-checkpoints-doc.ts` gets nearly all of its content from the same
 * `src/lib` modules the site renders, and those are twinned with `.fr.ts` files. Its
 * own words — headings, table headers, captions, front matter, the introduction and
 * the conclusion — had nowhere to be translated, which is why that document was the
 * only one in the guide with no French edition.
 *
 * They live here so the resolve hook in `build-checkpoints-doc.mjs` can swap this
 * file for `checkpoints-doc-strings.fr.ts` the way it swaps every other import, and
 * the builder produces the French document from the same code.
 *
 * Nothing that comes from another `src/lib` module belongs here: it is already
 * translated where it lives. Neither do file paths, asset names or console output.
 */

export const CHECKPOINTS_DOC = {
  /** The cover, the running header, and the contents pages. */
  frontMatter: {
    /** Never translated, in either edition. */
    classification: "UNCLASSIFIED / NON CLASSIFIÉ",
    /** The same marking in the running header, after two tab stops. */
    headerClassification: "\t\tUNCLASSIFIED / NON CLASSIFIÉ",
    /** The small line above the title on the cover. */
    eyebrow: "The Digital Lifecycle Guide",
    subtitle:
      "The approvals, reviews, sign-offs and standing duties a service has to pass, and who owns each one",
    developedByLine1:
      "Developed by the Treasury Board of Canada Secretariat, Office of the Chief Information Officer,",
    developedByLine2: "Chief Technology Officer Sector, Digital Technology and Cyber Security.",
    bannerAltTitle: "Government of Canada",
    bannerAltDescription: "Treasury Board of Canada Secretariat",
    bannerAltName: "GC banner",
    contents: "Table of Contents",
    listOfFigures: "List of Figures",
    listOfTables: "List of Tables",
  },

  /** Section and sub-section headings, in the order the document uses them. */
  headings: {
    introduction: "Introduction",
    context: "Context",
    purposeAndScope: "Purpose and scope",
    audience: "Audience",
    howToUse: "How to use this document",
    tagsMean: "What the tags mean",
    scopeTag: "The one tag that changes whether a row applies to you",
    kinds: "What kind of thing each one is",
    conclusion: "Conclusion and next steps",
    aboutTheGuide: "About the Digital Lifecycle Guide",
    references: "References",
    howLongItTook: "How long it took",
    howToReadTheSteps: "How to read the steps",
  },

  /** The running text this document writes itself. */
  prose: {
    context:
      "Getting a Government of Canada digital service into service means passing official checkpoints: assessments to run, boards to attend, registers to appear in, and duties that carry on for as long as the service does. They come from Treasury Board policy, from Acts, and from standards, and they are spread across dozens of instruments. Which of them apply depends on what the service does and how much is being spent, so no two services take quite the same path.",
    /** {instruments} and {topics} are counted from the imported content. */
    purposeAndScope:
      "This document covers {instruments} instruments, grouped into {topics} topics. Appendix A lists what other parts of government have already built and a team can reuse. Appendix B follows one invented service from its first sign of trouble to the day it is replaced.",
    audience:
      "This document is intended for the business owner of a Government of Canada digital service, and for the people who support one: program and service managers, project teams, enterprise architects, and the corporate functions a business owner has to work with, in security, privacy, procurement, information management and communications.",
    /**
     * The page's how-to-use list points at "the tables"; in a document they have a
     * section number, so the phrase is pointed at it.
     */
    howToUseFind: "read the tables",
    howToUseReplace: "read the tables in section 5",
  },

  /** Column headers. Drawn in small capitals, so they are stored in sentence case. */
  tableHeaders: {
    instrument: "Instrument",
    whatBringsItIntoScope: "What brings it into scope",
    whatTheBusinessOwnerDoes: "What the business owner does",
    whoDoesTheWork: "Who does the work",
    piece: "Piece",
    whatYouWouldOtherwiseBuild: "What you would otherwise build",
    whoRunsItAndHowToGetIt: "Who runs it, and how to get it",
    worthALookIn: "Worth a look in",
    stepNumber: "#",
    whatNadiaDoes: "What Nadia does",
    whoRespondsAndHow: "Who responds, and how",
  },

  /** The small capitals that introduce a run of text inside a cell. */
  inlineLabels: {
    /** The trailing spaces are the gap before the sentence; keep them. */
    whatItIs: "WHAT IT IS   ",
    whenItComesUp: "WHEN IT COMES UP   ",
    responderDepartment: "HER DEPARTMENT  ",
    responderCentral: "CENTRAL  ",
    about: "ABOUT",
    governingInstruments: "Governing instruments",
    supportingReferences: "Supporting references",
  },

  /** The tag legend, and the one tag the builder draws itself. */
  tags: {
    onlyIf: "Only if",
    onlyIfGloss:
      "This instrument does not apply to every service. The scope column says what brings it into scope. An instrument with no tag applies to all of them.",
  },

  /** Figure and table titles, and the numbering words in front of them. */
  captions: {
    tableWord: "Table",
    figureWord: "Figure",
    actionTags: "What each action tag means",
    scopeTag: "The scope tag",
    kinds: "What kind of thing each instrument is",
    glossary: "Words the tables use and do not define",
    /** {topic} is the topic name from the instrument matrix. */
    topicTable: "{topic}: what applies, who does it, and when it comes up",
    reuseTable: "What another part of government has already built",
    nadiaPortrait: "Nadia, a director general",
    whoTable: "The people Nadia deals with, and what each one does",
    timeline: "How long each phase took for this one service",
    /** {phase} is the phase heading, cut at its separator. */
    phaseSteps: "{phase}: what Nadia does and who responds",
  },

  /** The two appendices, and the words that only appear inside them. */
  appendix: {
    labelA: "Appendix A",
    labelB: "Appendix B",
    reuseIntro:
      "Look for something to reuse before making your own. These are the pieces already built and maintained by another part of government, so a team can configure something instead of making it. Choosing to make your own breaks no rule. The enterprise architecture framework does ask teams to look at reuse first, so an architecture review board is likely to ask which of these were considered and why none of them fitted.",
    /** The trailing space carries the gap to the sentence that follows it. */
    inventedLead: "Nadia and her grants program are invented. ",
    inventedBody:
      "Nothing in this appendix describes a real service, a real department or a real person. It is written as one worked example so the checkpoints in section 5 can be seen in an order, and the order shown is the one this invented service produced.",
    /** Follows the imported left-hand column key, with a space between them. */
    columnKeyRight:
      "The right-hand column is who answers, and how. The tag on each response says whether the responder is inside her department or central.",
    /**
     * What separates a phase name from its summary in the imported phase headings.
     * The step-table caption keeps only what comes before it.
     */
    phaseHeadingSeparator: " - ",
  },

  /** The closing section, and the standing note about the guide. */
  conclusion: {
    ruleOutFirst:
      "The list is long, and no service meets all of it. The step that saves the most time is the cheapest one: read down the scope column of each topic that matches what your service does, and rule out what does not apply, before anyone starts planning around it. What is left is usually smaller than a team expects, and most of it belongs to somebody else to do.",
    settleEarly:
      "Two things are worth settling earlier than feels necessary, because both change the shape of the build and both are expensive to add later: how long the service is allowed to be unavailable, and what the system has to be able to do with its records. Both are in section 5, under Continuity and incidents and under Registries and records.",
    /** Three runs, because the guide's name is bold inside the sentence. */
    aboutBefore: "This document is one part of the ",
    /* The callout heading carries the article; the run inside the sentence does not. */
    aboutHeading: "The Digital Lifecycle Guide",
    aboutGuideName: "Digital Lifecycle Guide",
    aboutAfter:
      ", a guide for the people who run Government of Canada digital services across the whole life of a service: from before it exists, through running and maturing it, to retiring or replacing it well. This document is the index of official checkpoints. The phase and sub-phase documents cover how to do the work inside each step, and the thread documents explain the reasoning behind each subject. To find the other documents and where they fit, start at the guide's home page, or go straight to the Index of the Digital Lifecycle Guide.",
  },

  /** The reference list's own words. */
  references: {
    intro:
      "Every instrument in section 5 and Appendix A that has a public source, numbered in the order the tables use them. Where a row carries no reference, the instrument is obtained through a departmental office rather than from a published page.",
  },

  /** The link back to the contents, at the end of every section and table. */
  backToContents: "↑ Back to contents",

  /**
   * The phase and sub-phase names, bolded wherever they appear in the reuse table's
   * "Worth a look in" column.
   */
  phaseWords: [
    "Discovery",
    "Alpha",
    "Beta",
    "Stabilization",
    "Growth",
    "Maturity",
    "Live",
    "Sunset",
  ],

  /**
   * A PNG for each topic, from the assets the other builders already use.
   *
   * The keys are the topic names as the instrument matrix gives them, so they are
   * translated with it. The file names are assets and are never translated.
   */
  topicIcons: {
    Security: "shieldcheck.png",
    "Continuity and incidents": "siren.png",
    "Privacy and automated decisions": "shield.png",
    Accessibility: "users.png",
    "Official languages": "megaphone.png",
    "Approvals and money": "coins.png",
    "Contracts and suppliers": "filesignature.png",
    "Hosting and cloud": "server.png",
    "Identity and sign-in": "user.png",
    "Publishing on canada.ca": "layers.png",
    "Registries and records": "archive.png",
    "Access to information and openness": "search.png",
  } as Record<string, string>,
} as const;
