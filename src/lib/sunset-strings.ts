import type { CautionItem } from "@/components/CautionBlock";
import type { PhaseQuoteContent } from "@/components/PhaseQuote";
import type { BoldPhrase, ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import { PROCUREMENT_LANDING_PATH } from "@/lib/procurement-landing";
import { OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
import {
  EOL_OF_PARTS_SOURCE,
  GCCASE_MIGRATION_READINESS_GUIDE,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";

export type SunsetJourneyStepExample = {
  title: string;
  left: { heading: string; body: string };
  right: { heading: string; body: string };
  caption: string;
};

export type SunsetJourneyStepStrings = {
  label: string;
  title: string;
  leadIn: string;
  body: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: { phrase: string; to: string }[];
  placeholderLinks?: PlaceholderPhraseLink[];
  boldPhrases?: BoldPhrase[];
  example?: SunsetJourneyStepExample;
  /** Hidden on the retire path (step 4 Buy or build). */
  replaceOnly?: boolean;
};

const GCCASE = GCCASE_MIGRATION_READINESS_GUIDE;

/** Sunset phase landing copy — organized by page section. */
export const SUNSET_STRINGS = {
  quote: {
    lead: "Where a service reaches its end and is retired or replaced cleanly. The team:",
    leadBold: [{ phrase: "retired or replaced" }],
    items: [
      "plans the shutdown",
      "moves or archives the data",
      "brings users safely onto whatever comes next",
    ],
    takeaway:
      "In the Government of Canada, replacing a service is far more common than shutting one down.",
    takeawayBold: false,
  } satisfies PhaseQuoteContent,

  intro: [
    "Sunset often runs in parallel with Create: while a replacement is being bought or built, the old service still has to keep running. The team plans the exit, funds it, and carries users and records through the change without leaving anyone stranded.",
    "A transition is more than a technical migration. It is the moment to reassess the process, drop the technical debt that has built up, improve the data, and re-confirm what the service is really for, so what comes next improves on the old rather than copying it.",
  ],

  scope: {
    text: "This page is about sunsetting a whole service. If it is one part reaching its end of life, a library, a dependency, or a bought product inside a larger service, see End of life of parts.",
    placeholderLinks: [{ phrase: "End of life of parts", source: EOL_OF_PARTS_SOURCE }],
  },

  fork: {
    title: "The first fork: replace or retire?",
    intro: "Before anything else, answer one question: is the service still needed?",
    bullets: [
      {
        lead: "The need is gone, so you retire it.",
        body: "You still plan the shutdown, archive the records, and decommission, but you are not standing up a replacement.",
      },
      {
        lead: "The need remains, so you replace it.",
        body: "You assess what should come next, acquire it, and migrate across.",
      },
    ],
    close:
      "Most of this page follows the replace path, the longer of the two. The retire path is the same journey with the middle removed.",
    cardTitle: "Replace or retire?",
    pathOptions: [
      {
        path: "replace" as const,
        description:
          "The need remains, so you replace it. You assess what should come next, acquire it, and migrate across.",
      },
      {
        path: "retire" as const,
        description:
          "The need is gone, so you retire it. You plan the shutdown, archive the records, and decommission, but you are not standing up a replacement.",
      },
    ],
  },

  journey: {
    intro: "You might not run all of it yourself, but you should recognise every step.",
    footer:
      "These steps are shown in order, but in practice they overlap and some repeat. While you acquire and migrate to the new solution, you are still shutting down the old one, so steps four and five run together. You are out of Sunset when the old service is fully shut down and its data and users have a safe home. If you replaced it, that new service has already begun its own Create.",
    steps: [
      {
        label: "Assess",
        title: "Assess.",
        leadIn: "Build a clear picture of what you have.",
        body: "Build a clear picture of what you have before you change anything. Inventory the service: what it does, who uses it and how, what it connects to, what it costs to run, what data it holds, and how critical it is. Then ask the harder question for each application: is it still needed at all? Some are worth keeping and moving, others can be retired outright. Name the risks of touching it, especially anything that would disrupt users mid-cycle.",
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Step 1, Application Inventory Template — REPLACE WITH REAL LINK WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "Inventory",
            source: GCCASE,
            part: "Step 1, Application Inventory Template",
          },
        ],
      },
      {
        label: "Decide",
        title: "Decide.",
        leadIn: "Work out what you need going forward, and how to get it.",
        body: "Work out what you actually need going forward, and how to get it. The trap is recreating the old system feature for feature. Separate the business need from the current features, so you carry forward what creates value and drop what only exists because of the old platform's limits. Judge how complex the replacement really is, map the integrations (they are routinely underestimated), then do options analysis.",
        internalLinks: [{ phrase: "do options analysis", to: OPTIONS_ANALYSIS_PATH }],
        boldPhrases: [{ phrase: "Separate the business need from the current features" }],
        example: {
          title: "Write the need, not the feature",
          left: {
            heading: "The need",
            body: "A nonprofit applies for funding online, an officer assesses it against the published criteria, and the applicant gets a decision with reasons within the 40-day service standard.",
          },
          right: {
            heading: "The old feature",
            body: "The 47-field intake form, the three-tab approval routing, and the colour-coded status flags, rebuilt exactly as the old system had them.",
          },
          caption:
            "The features are only how the old tool met the need. The new one may meet it better.",
        },
      },
      {
        label: "Plan",
        title: "Plan.",
        leadIn: "Turn the decision into a plan.",
        body: "Turn the decision into a plan that lines up people, money, and timing. Bring the right people in early: the users who live in the service, IM for records retention, IT and security, and whoever holds the budget and the approvals. Write the business case, plan the change for users (adoption makes or breaks a migration), set out who is responsible for what, and define what success looks like and how you will measure it.",
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Step 3, Business Case and Roles and Responsibilities — REPLACE WITH REAL LINK WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "business case",
            source: GCCASE,
            part: "Step 3, Business Case and Roles and Responsibilities",
          },
        ],
      },
      {
        label: "Buy/build",
        title: "Buy or build.",
        leadIn: "Get and prepare the new solution, by buying it or building it.",
        body: "If you buy, run the procurement process. If you build with a contracted team, stand up that team and do the development work. If you build in-house, stand up the department's own team. Either way, configure it to the requirements rather than to the old system's habits, choose your migration approach (all at once, or phased with pilots), clean the data before you move it, and train people. Buying can run 12 to 24 months on the procurement alone, so starting early matters.",
        replaceOnly: true,
        internalLinks: [{ phrase: "the procurement process", to: PROCUREMENT_LANDING_PATH }],
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Risks of Delayed Planning — REPLACE WITH REAL LINK WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "12 to 24 months",
            source: GCCASE,
            part: "Risks of Delayed Planning",
          },
        ],
      },
      {
        label: "Migrate",
        title: "Migrate.",
        leadIn: "Make the switch and close out the old.",
        body: "Make the switch and close out the old. Move the data, archive the historical records to their retention schedule, and bring users across.\n\nDo not switch the old service off too early. It keeps running while the new service is in beta, both while that is invite-only and after it opens to the public, so anyone who has not moved across yet can still get what they need. The old service is decommissioned only once the new service is properly live.\n\nA migration succeeds only if people adopt the replacement, which is what change management is for. A migration is also a chance to simplify, so move what still creates value and leave the rest behind.",
        internalLinks: [{ phrase: "change management", to: "/thread/change-management" }],
        boldPhrases: [
          { phrase: "Make the switch and close out the old." },
          { phrase: "Do not switch the old service off too early." },
          { phrase: "A migration succeeds only if people adopt the replacement," },
        ],
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Step 5, Migrate and Common Migration Approaches — REPLACE WITH REAL LINK WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "archive",
            source: GCCASE,
            part: "Step 5, Migrate and Common Migration Approaches",
          },
          {
            phrase: "decommissioned",
            source: GCCASE,
            part: "Step 5, Migrate and Common Migration Approaches",
          },
        ],
      },
    ] satisfies SunsetJourneyStepStrings[],
    decommissionStep: {
      label: "Decommission",
      title: "Decommission.",
      leadIn: "Wind the service down for good.",
      body: "There is no switch to a replacement, so the work is a clean shutdown: archive the records to their retention schedule, confirm nothing still depends on the service, and retire it.",
    } satisfies SunsetJourneyStepStrings,
  },

  whereNext: {
    title: "Where to go next",
    cards: [
      {
        label: "Options analysis",
        href: OPTIONS_ANALYSIS_PATH,
        description:
          'The full version of the "assess options" step, shared with Create.',
      },
      {
        label: "The official gates of a digital service",
        href: "/gate-map",
        description:
          "The map of official gates across Create, Live, and Sunset, including the records gate at exit.",
      },
      {
        label: "Procurement thread",
        href: PROCUREMENT_LANDING_PATH,
        description: "How the buying works if you are acquiring a replacement.",
      },
    ],
  },

  caution: {
    title: "The cost of leaving it late",
    lead: "Sunset goes much more smoothly when it starts early. The most common difficulties all come from leaving it late:",
    items: [
      {
        heading: "Procurement runs out of time.",
        line: "Buying a cloud solution can take 12 to 24 months. Start late and you may not have a replacement before support ends.",
      },
      {
        heading: "The help is already taken.",
        line: "Skilled implementation partners get booked by the teams who started earlier.",
      },
      {
        heading: "Rushed migrations cost more.",
        line: "Compressed timelines mean more defects, less testing, and weaker adoption.",
      },
      {
        heading: "Security exposure.",
        line: "Running on an unsupported platform past its end date leaves you without security patches.",
      },
      {
        heading: "Operational disruption.",
        line: "Miss the deadline and the business processes that depend on the service can stop.",
      },
    ] satisfies CautionItem[],
    // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Risks of Delayed Planning — REPLACE WITH REAL LINK WHEN PUBLISHED
    closingCitation: {
      text: "Source: GCcase Migration Readiness Guide — Risks of Delayed Planning.",
      placeholderLinks: [
        {
          phrase: "GCcase Migration Readiness Guide — Risks of Delayed Planning",
          source: GCCASE,
          part: "Risks of Delayed Planning",
        },
      ],
    },
  },
};
