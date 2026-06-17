import type { CautionItem } from "@/components/CautionBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import { PROCUREMENT_LANDING_PATH } from "@/lib/procurement-landing";
import { OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
import { threadPath } from "@/lib/guide-strings";
import {
  GCCASE_MIGRATION_READINESS_GUIDE,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";

export type SunsetJourneyStepStrings = {
  label: string;
  title: string;
  leadIn: string;
  body: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: { phrase: string; to: string }[];
  placeholderLinks?: PlaceholderPhraseLink[];
  /** Hidden on the retire path (step 4 Acquire). */
  replaceOnly?: boolean;
};

const GCCASE = GCCASE_MIGRATION_READINESS_GUIDE;

/** Sunset phase landing copy — organized by page section. */
export const SUNSET_STRINGS = {
  intro: [
    "Every service reaches a point where it has to move on. It might be replaced, folded into something else, or retired because the need has gone. Sunset is the work of that transition: deciding the path, moving or archiving the data, bringing users safely across, and shutting the old service down without disruption.",
    "A transition is more than a technical migration. It is the moment to reassess the process, drop the technical debt that has built up, improve the data, and re-confirm what the service is really for, so what comes next improves on the old rather than copying it.",
  ],

  scope: {
    text: "This page is about sunsetting a whole service. If it is one part reaching its end of life, a library, a dependency, or a bought product inside a larger service, see the End of life of parts thread.",
    internalLinks: [{ phrase: "End of life of parts", to: threadPath("component-eol") }],
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
        body: "Inventory the service: what it does, who uses it, how critical it is, what it connects to, what it costs, and what data it holds. Then decide, for each application, whether it is still needed and what the risks of touching it are.",
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
        body: "Separate the business need from the current features, so you do not rebuild the old tool's quirks into the new one. Judge the complexity. Then weigh your options, and confirm the replace-or-retire decision. The Options analysis page is the full version of this step.",
        internalLinks: [{ phrase: "Options analysis", to: OPTIONS_ANALYSIS_PATH }],
      },
      {
        label: "Plan",
        title: "Plan.",
        leadIn: "Turn the decision into a plan.",
        body: "Bring in the people who matter (the users, IM for records retention, IT, security, and whoever holds the budget), write a business case, plan the change for users, name who is responsible for what, and define what success looks like.",
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
        label: "Acquire",
        title: "Acquire.",
        leadIn: "Get and prepare the new solution.",
        body: "Run the procurement or build, configure it, decide your migration approach, clean the data, and train people. Procurement here can take 12 to 24 months, so start early. See the Procurement thread for how the buying works.",
        replaceOnly: true,
        internalLinks: [{ phrase: "Procurement thread", to: PROCUREMENT_LANDING_PATH }],
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
        body: "Move the data, archive the historical records to their retention schedule, bring users across, and decommission the old service.",
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Step 5, Migrate and Common Migration Approaches — REPLACE WITH REAL LINK WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "archive",
            source: GCCASE,
            part: "Step 5, Migrate and Common Migration Approaches",
          },
          {
            phrase: "decommission",
            source: GCCASE,
            part: "Step 5, Migrate and Common Migration Approaches",
          },
        ],
      },
    ] satisfies SunsetJourneyStepStrings[],
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
        label: "Procurement thread",
        href: PROCUREMENT_LANDING_PATH,
        description: "How the buying works if you are acquiring a replacement.",
      },
    ],
  },

  caution: {
    title: "The cost of leaving it late",
    lead: "Sunset rewards starting early and punishes delay. The most common ways it goes wrong:",
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
