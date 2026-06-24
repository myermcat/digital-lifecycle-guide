import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PROCUREMENT_LANDING_PATH } from "@/lib/procurement-landing";
import {
  GCCASE_MIGRATION_READINESS_GUIDE,
  gccaseComingSoonSourceItem,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";

export const OPTIONS_ANALYSIS = {
  title: "Options analysis",

  intro: [
    "Options analysis is the step where you work out the different ways a need could be met, and weigh them, before committing to any one. It happens early, before anything has been bought or built, and it applies whether you are solving a new problem or replacing a service that is ending.",
    "Why do it? Because the instinct is to jump straight to a solution, usually the one already in mind, and that is how departments end up buying something they did not need, or a worse answer than they could have had. The value of this step is the pause: name the problem plainly, then look across the real options with clear eyes before you pick one. An afternoon here can save a two-year procurement.",
  ],

  startWithProblem: {
    id: "start-with-the-problem",
    title: "Start with the problem",
    paragraphs: [
      "Before you compare options, be sure what you are solving. Name the problem and the outcomes you need, and separate the business need from the features of whatever you have now. A clear need is what every option gets measured against, and it keeps you from rebuilding an old tool's quirks into a new one.",
      "TBS's GCcase migration guidance puts it the same way: distinguish business needs from system features, so you do not recreate a legacy solution by default.",
    ],
    // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Step 2, Business Requirements Discovery Workbook — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
    placeholderParagraphLinks: [
      {
        index: 1,
        phrase: "TBS's GCcase migration guidance",
        source: GCCASE_MIGRATION_READINESS_GUIDE,
        part: "Step 2, Business Requirements Discovery Workbook",
      },
    ],
  },

  fieldOfOptions: {
    id: "the-field-of-options",
    title: "The field of options",
    intro:
      "The answer might not be a purchase at all. Sometimes a small process change, or a tool another team already runs, solves the problem without buying anything. Here are the options, roughly cheapest first:",
    ladder: [
      {
        lead: "Use what you already have.",
        body: "Do you own a tool that already does this, or nearly does? The cheapest solution is the one you do not have to buy.",
      },
      {
        lead: "Reuse or adapt what someone else runs.",
        body: "Another team, another department, or a government-wide platform may already solve your problem. You might use something idle on someone else's books, or ride an existing enterprise contract to get the same thing for less, since buying in volume costs less per unit. Borrowing beats buying.",
      },
      {
        lead: "Partner with another department.",
        body: "If someone else needs the same thing, build or buy it together so the problem gets solved once for both of you. If the thing does not exist yet, ask around before you set up a buy of your own.",
      },
      {
        lead: "Solve it a different way.",
        body: "Sometimes the answer is not software at all. A process change, a policy fix, or one small manual step can make the whole purchase unnecessary.",
      },
      {
        lead: "Buy new.",
        body: "If none of the above fits, you procure a solution, through an existing framework or your own procurement. And you can explain why when someone asks.",
      },
      {
        lead: "Build it yourself.",
        body: "Possible, but the in-house capability to build and run software is thin in most departments, so treat building as a rare exception rather than a default.",
      },
      {
        lead: "Retire without replacing.",
        body: "If the need has genuinely gone, the right option may be to stop. This one mostly comes up in Sunset.",
      },
    ],
  },

  howToWeigh: {
    id: "how-to-weigh-them",
    title: "How to weigh them",
    intro:
      "No option is best in the abstract. The right one depends on your situation. A few things to weigh for each:",
    criteria: [
      { lead: "How soon you need it", body: "and how long each path takes to stand up." },
      {
        lead: "Whether it needs procurement",
        body: "and how long that runs. For a cloud solution this can be 12 to 24 months from start to contract award, depending on value and complexity.",
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Migration Decision Checklist; Risks of Delayed Planning — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "12 to 24 months",
            source: GCCASE_MIGRATION_READINESS_GUIDE,
            part: "Migration Decision Checklist; Risks of Delayed Planning",
          },
        ] satisfies PlaceholderPhraseLink[],
      },
      {
        lead: "How complex your service is",
        body: "and whether the option fits that complexity.",
      },
      {
        lead: "Integrations and dependencies",
        body: "which are easy to underestimate and often decide the effort.",
      },
      {
        lead: "How much you would need to customise",
        body: "and whether that is worth it.",
      },
      {
        lead: "Cost over its whole life",
        body: "not just to set up.",
      },
      {
        lead: "Who supports and maintains it",
        body: "once it is running.",
      },
      {
        lead: "Room to grow",
        body: "and how well it meets where you are heading.",
      },
    ],
  },

  // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Migration Decision Checklist; Risks of Delayed Planning — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
  howToWeighClosing:
    "TBS's GCcase migration guidance includes a structured checklist that compares the main options against criteria like these. It is the deeper tool when you are ready to score them.",
  howToWeighClosingPlaceholderLinks: [
    {
      phrase: "structured checklist",
      source: GCCASE_MIGRATION_READINESS_GUIDE,
      part: "Migration Decision Checklist; Risks of Delayed Planning",
    },
  ] satisfies PlaceholderPhraseLink[],

  homework: {
    id: "do-the-homework-first",
    title: "Do the homework first",
    paragraphs: [
      {
        text:
          "You are almost never the first to face this. Before you commit, look at how other departments solved the same problem and what it cost them, and look at other jurisdictions with similar rules. Australia's reuse standard and the UK's Technology Code of Practice both make checking for reuse a step before you spend, and the UK's guidance on sharing and reusing technology points to the common platforms and components other departments already run. Borrowing a worked answer beats starting from a blank page.",
        externalLinks: [
          { phrase: "reuse standard", linkKey: "australia-digital-architecture-reuse" },
          { phrase: "Technology Code of Practice", linkKey: "uk-technology-code-of-practice" },
          {
            phrase: "sharing and reusing technology",
            linkKey: "uk-share-and-reuse-technology",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text:
          "A good place to start is the Government of Canada's own shelf. The GC Reference Architectures repository holds approved starting designs for common kinds of system, including case management and grants and contributions, so a team builds from a proven pattern instead of a blank page. A draft enterprise solutions catalog lists what other teams already run. Both are on the Government of Canada network.",
        externalLinks: [
          { phrase: "GC Reference Architectures repository", linkKey: "gc-reference-architectures" },
          { phrase: "enterprise solutions catalog", linkKey: "gc-enterprise-solutions-catalog" },
        ] satisfies ExternalPhraseLink[],
      },
    ],
  },

  byPhase: {
    id: "by-phase",
    title: "What Options analysis looks like in each phase",
    cards: [
      {
        lifecyclePhase: "create" as const,
        weight: "light" as const,
        compact: true,
        body: 'In Create, this is your "look before you buy" step, done before any contract exists.',
        linkTo: PROCUREMENT_LANDING_PATH,
        linkLabel: "Procurement thread",
      },
      {
        lifecyclePhase: "sunset" as const,
        weight: "light" as const,
        compact: true,
        body: "In Sunset, this is how you assess options for a replacement, or reach the decision to retire without one.",
        linkTo: "/sunset",
        linkLabel: "Sunset phase",
      },
    ],
  },

  whyThisMatters: {
    id: "why-this-matters",
    title: "Why this matters",
    body: "PSPC's procurement guidance begins after the decision to buy is made. This step is on you, and it decides where the biggest savings and the biggest regrets land.",
    externalLinks: [
      { phrase: "PSPC's procurement guidance", linkKey: "agile-procurement-guide" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "policy-planning-investments" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "buyers-portal" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "agile-procurement-guide" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference (GC network)",
      linkKey: "gc-reference-architectures" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference (GC network)",
      linkKey: "gc-enterprise-solutions-catalog" satisfies ExternalLinkKey,
      note: "Draft catalog; URL may change.",
    },
    gccaseComingSoonSourceItem(),
  ] satisfies SourceItem[],
};
