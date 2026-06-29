import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import {
  threadLeadPlainText,
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  type ThreadCloserLookBlock,
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type EthicsAndBiasLinkedProse = ThreadLinkedProse;
export type EthicsAndBiasContentSection = ThreadContentSection;
export type EthicsAndBiasCloserLookBlock = ThreadCloserLookBlock;
export type EthicsAndBiasPhasePreviewBlock = ThreadPhasePreviewBlock;

export const ethicsAndBiasSectionsPlainText = threadSectionsPlainText;
export const ethicsAndBiasLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const ethicsAndBiasWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const ETHICS_AND_BIAS_THREAD = {
  title: "Ethics and bias",
  slug: "ethics-and-bias" as const,

  lead: {
    text:
      "Ethics and bias is about building a service that treats people fairly and stays accountable for the decisions it makes, especially when those decisions are automated or use AI. Bias is a design problem before it is a technology problem: any service can advantage some people and shut others out without anyone noticing. When a service automates or assists a decision about a person, the Government of Canada requires it to be transparent, accountable, and fair, and to be assessed for its impact before it goes live. The decisions that shape this are made early and revisited as the service learns.",
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    {
      text: "Before launch, the service is checked for who it affects differently and who might be left out, using GBA Plus.",
      externalLinks: [{ phrase: "GBA Plus", linkKey: "gba-plus" }] satisfies ExternalPhraseLink[],
    },
    {
      text: "If the service automates or assists a decision about a person, an Algorithmic Impact Assessment is done before launch, published, and redone when the system changes.",
      externalLinks: [
        { phrase: "Algorithmic Impact Assessment", linkKey: "algorithmic-impact-assessment" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "The oversight, testing, and review match the decision's impact level: the higher the impact, the more is required.",
    },
    {
      text: "The data and the outputs are tested for bias, before launch and as the service runs.",
    },
    {
      text: "A person can get a meaningful human alternative to an automated decision, and can challenge or appeal the result.",
    },
    {
      text: "People are told when a decision is automated, and can get a plain explanation of how it was reached.",
    },
    {
      text: "A named person stays accountable for the decisions; the system never is.",
    },
    {
      text: "Any use of generative AI follows the FASTER principles, fair, accountable, secure, transparent, educated, relevant.",
      externalLinks: [
        { phrase: "FASTER principles", linkKey: "generative-ai-faster" },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies EthicsAndBiasLinkedProse[],

  whyItMatters: {
    text:
      'Automated decisions can deny a benefit, flag a person, or rank an application, and when the system is biased or unexplained, real people are harmed and the harm repeats at scale. Trust in the service, and the basic fairness owed in any government decision, are on the line. It is also a legal duty: the Directive on Automated Decision-Making makes the impact assessment, notice, explanation, bias testing, human oversight, and recourse mandatory for federal automated decisions, and GBA Plus is required in Treasury Board submissions. One trap worth naming: "representative data" does not fix everything, because systems still misjudge the people who sit far from the average, so testing and human judgment stay necessary.',
    externalLinks: [
      {
        phrase: "Directive on Automated Decision-Making",
        linkKey: "directive-automated-decision-making",
      },
      { phrase: "GBA Plus", linkKey: "gba-plus" },
    ] satisfies ExternalPhraseLink[],
  },

  happenedAtScaleCallout: {
    title: "It has happened, at scale",
    body: {
      text:
        "Automated decisions have gone badly wrong elsewhere. In Australia, the Robodebt scheme used a crude automated method to wrongly tell about 381,000 people they owed money they did not owe, around A$746 million of it, and it ended in a Royal Commission. In the Netherlands, a fraud-detection algorithm wrongly accused around 26,000 families of childcare-benefit fraud, treated dual nationality as a risk factor, and helped bring the government down. Canada has not had a failure on that scale, and the Directive on Automated Decision-Making and its impact assessment exist to keep it that way. Bias is also measurable: a NIST study found face-recognition systems misidentified Asian and Black faces 10 to 100 times more often than white faces.",
      externalLinks: [
        { phrase: "Robodebt scheme", linkKey: "robodebt-royal-commission-report" },
        {
          phrase: "fraud-detection algorithm",
          linkKey: "netherlands-childcare-fraud-algorithm-ap",
        },
        {
          phrase: "Directive on Automated Decision-Making",
          linkKey: "directive-automated-decision-making",
        },
        { phrase: "NIST study", linkKey: "nist-face-recognition-demographics-study" },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

  whoseJob: {
    intro: "Ethics and bias is shared across the team, with each role holding a different part:",
    roles: [
      {
        role: "Data scientists and developers",
        text: "build and test the system, and check the data and the outputs for bias.",
      },
      {
        role: "The department's data, privacy, and legal teams",
        text: "advise from the concept stage, run the peer review, and help with the impact assessment and GBA Plus.",
      },
      {
        role: "The business owner of the application",
        text: "makes sure the assessments are done, that human oversight and recourse exist, and answers for decisions that are fair and lawful.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "Bias is a design problem, not only an AI one.",
        sections: [
          {
            text:
              "Long before any AI, a service can advantage some people and exclude others, through who it is designed for, what it asks, and who it forgets. GBA Plus is the Government of Canada's method for catching that: before you build, ask who is affected differently and who might be left out, across intersecting factors like disability, language, income, age, and geography. It applies to every service, with or without AI, and it is required in Treasury Board submissions. The personal-information side of this connects to privacy, and building for everyone connects to accessibility.",
            bold: [{ phrase: "GBA Plus" }],
            externalLinks: [{ phrase: "GBA Plus", linkKey: "gba-plus" }] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "privacy", to: THREADS.privacy.path },
              { phrase: "accessibility", to: THREADS.accessibility.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "If it makes a decision, the Directive applies.",
        sections: [
          {
            text:
              "When a service automates or assists an administrative decision about a person, the Directive on Automated Decision-Making is mandatory, whatever the technology. The first step is the Algorithmic Impact Assessment, a questionnaire that scores the system into one of four impact levels. The level sets how much you must do:",
            bold: [{ phrase: "Directive on Automated Decision-Making" }],
            externalLinks: [
              {
                phrase: "Directive on Automated Decision-Making",
                linkKey: "directive-automated-decision-making",
              },
              {
                phrase: "Algorithmic Impact Assessment",
                linkKey: "algorithmic-impact-assessment",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              "notice that a decision is automated",
              "a plain explanation of how it was reached",
              "testing for bias, before launch and as it runs",
              "human oversight, scaled up as the impact rises",
              "a way to challenge or appeal the decision",
            ],
          },
          {
            text: "You complete the assessment at design and again before production, and publish it.",
          },
        ],
      },
      {
        title: "Keep a human accountable, and watch the edges.",
        sections: [
          {
            text:
              "Accountability rests with the institution, never with the system, so a person must always be able to reach a meaningful human alternative and contest a result. Two cautions worth holding: average systems misjudge the people who are unusual or far from the norm, which representative data alone does not fix (this is called statistical discrimination), so test across groups and keep a person in the loop. And for generative AI, follow the FASTER principles; for AI that acts on its own, keep tight limits and a way to stop it.",
            externalLinks: [
              {
                phrase: "meaningful human alternative",
                linkKey: "can-asc-62-equitable-ai",
              },
              { phrase: "FASTER principles", linkKey: "generative-ai-faster" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies EthicsAndBiasCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Two ways to automate a decision",
    risky: {
      heading: "Vell",
      framing:
        "Meet Vell, a benefits caseworker. They run a service that screens benefit applications and added an AI model to auto-score them and save staff time:",
      items: [
        "trained it on past decisions, with no Algorithmic Impact Assessment and no GBA Plus",
        "gave applicants no notice it was automated, and no way to appeal",
        "never tested the outputs across different groups",
      ],
      closing:
        "The result: the model repeated old bias without anyone noticing, rejecting strong applicants from some regions, no one could explain why a given application was scored low, and there was no human to turn to.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Meet Pax, a benefits caseworker. They run a service that screens benefit applications and treated the auto-scoring as a decision about people:",
      items: [
        "ran a GBA Plus and an Algorithmic Impact Assessment before building, and published it",
        "kept the AI as a recommendation, with a person making the final call",
        "tested the outputs for bias across groups, before launch and as it ran",
        "told applicants a tool was used, gave a plain explanation, and offered an appeal to a human",
      ],
      closing:
        "The result: decisions people could understand and challenge, less bias, and a system that holds up to scrutiny.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "What Ethics and bias looks like in each phase",
    intro: "The fairness work changes shape across the life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "Assess who it affects, before you build.",
        popup: [
          {
            text:
              "The fairness work is cheapest and most effective before launch. The team runs a GBA Plus to see who the service affects differently, and if it automates a decision, completes an Algorithmic Impact Assessment to set the impact level and the safeguards. Human oversight, a plain explanation, and a way to appeal are designed in, and the data and outputs are tested for bias before anything goes live.",
            externalLinks: [
              { phrase: "GBA Plus", linkKey: "gba-plus" },
              {
                phrase: "Algorithmic Impact Assessment",
                linkKey: "algorithmic-impact-assessment",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Watch the real outcomes for bias.",
        popup: [
          {
            text:
              "Once the service is running, real data can surface bias that testing missed, so outcomes are monitored across groups and the model is adjusted or retrained as needed. The impact assessment is kept current, and the human-in-the-loop and the appeal route stay open and staffed. If the service uses generative AI, the FASTER principles keep guiding its use.",
            externalLinks: [
              { phrase: "FASTER principles", linkKey: "generative-ai-faster" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Keep the record, carry the fairness forward.",
        popup: [
          {
            text:
              "When an automated decision system is retired or replaced, the records of how decisions were made are kept, so people can still appeal or audit past decisions, and the fairness requirements (assessment, oversight, recourse) carry into whatever replaces it. An automated decision left running unmonitored is a fairness risk, so winding it down properly is part of the work.",
          },
        ],
      },
    ] satisfies EthicsAndBiasPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Beyond the binding Directive, Algorithmic Impact Assessment, and GBA Plus already linked above, a few sources go further. The twelve guiding principles for the use of AI in government set out the openness-and-accountability expectations, and the OPC's principles add the privacy-and-fairness lens. For a plain statement of the ethical values your service should uphold, the made-in-Canada Montréal Declaration on Responsible AI gives ten principles you can hold a design up against, and CIFAR's AI & Society work under the Pan-Canadian AI Strategy gathers Canadian research on AI's effects on people. When you want a hands-on sense of how to check a system rather than just principles, the UK government's Introduction to AI assurance walks through the techniques teams use to test that an AI system is fair and works as intended. For how other places frame it, the US NIST AI Risk Management Framework and the EU AI Act are useful companions.",
    externalLinks: [
      { phrase: "guiding principles", linkKey: "ai-guiding-principles" },
      { phrase: "OPC's principles", linkKey: "opc-generative-ai-principles" },
      {
        phrase: "Montréal Declaration on Responsible AI",
        linkKey: "montreal-declaration-responsible-ai",
      },
      { phrase: "AI & Society", linkKey: "cifar-ai-and-society" },
      { phrase: "Introduction to AI assurance", linkKey: "uk-introduction-to-ai-assurance" },
      { phrase: "NIST AI Risk Management Framework", linkKey: "nist-ai-rmf" },
      { phrase: "EU AI Act", linkKey: "eu-ai-act-summary" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "directive-automated-decision-making" satisfies ExternalLinkKey,
      description:
        "Directive on Automated Decision-Making (TBS) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592",
    },
    {
      label: "Governing instrument",
      linkKey: "algorithmic-impact-assessment" satisfies ExternalLinkKey,
      description:
        "Algorithmic Impact Assessment (TBS; open-source tool, published results) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/algorithmic-impact-assessment.html",
    },
    {
      label: "Governing instrument",
      linkKey: "gba-plus" satisfies ExternalLinkKey,
      description:
        "Gender-based Analysis Plus (Women and Gender Equality Canada; required in TB submissions) — https://www.canada.ca/en/women-gender-equality/gender-based-analysis-plus.html",
    },
    {
      label: "Supporting reference",
      linkKey: "responsible-use-ai-hub" satisfies ExternalLinkKey,
      description:
        "Responsible use of AI in government (hub, TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai.html",
    },
    {
      label: "Supporting reference",
      linkKey: "ai-guiding-principles" satisfies ExternalLinkKey,
      description:
        "Guiding principles for the use of AI in government (TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/principles.html",
    },
    {
      label: "Supporting reference",
      linkKey: "generative-ai-faster" satisfies ExternalLinkKey,
      description:
        "Guide on the Use of Generative AI, the FASTER principles (TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/guide-use-generative-ai.html",
    },
    {
      label: "Supporting reference",
      linkKey: "agentic-ai-guide" satisfies ExternalLinkKey,
      description:
        "Guide on the Use of Agentic AI (TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/guide-use-agentic-artificial-antelligence.html",
    },
    {
      label: "Supporting reference",
      linkKey: "can-asc-62-equitable-ai" satisfies ExternalLinkKey,
      description:
        "CAN-ASC-6.2 Accessible and Equitable AI Systems (Accessibility Standards Canada) — https://accessible.canada.ca/creating-accessibility-standards/asc-62-accessible-equitable-artificial-intelligence-systems",
    },
    {
      label: "Supporting reference",
      linkKey: "opc-generative-ai-principles" satisfies ExternalLinkKey,
      description:
        "OPC, Principles for responsible, trustworthy and privacy-protective generative AI — https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/",
    },
    {
      label: "Supporting reference",
      linkKey: "statcan-ai" satisfies ExternalLinkKey,
      description:
        "Artificial intelligence at Statistics Canada + Framework for Responsible Machine Learning — https://www.statcan.gc.ca/en/trust/collecting-your-data/artificial-intelligence",
    },
    {
      label: "Supporting reference",
      linkKey: "nist-ai-rmf" satisfies ExternalLinkKey,
      description:
        "US NIST AI Risk Management Framework (AI RMF 1.0) — https://www.nist.gov/itl/ai-risk-management-framework",
    },
    {
      label: "Supporting reference",
      linkKey: "oecd-ai-principles" satisfies ExternalLinkKey,
      description: "OECD AI Principles — https://oecd.ai/en/ai-principles",
    },
    {
      label: "Supporting reference",
      linkKey: "eu-ai-act-summary" satisfies ExternalLinkKey,
      description:
        "EU AI Act, high-level summary — https://artificialintelligenceact.eu/high-level-summary/",
    },
    {
      label: "Supporting reference",
      linkKey: "montreal-declaration-responsible-ai" satisfies ExternalLinkKey,
      description:
        "Montréal Declaration on Responsible AI — https://montrealdeclaration-responsibleai.com/the-declaration/",
    },
    {
      label: "Supporting reference",
      linkKey: "cifar-ai-and-society" satisfies ExternalLinkKey,
      description:
        "CIFAR AI & Society (Pan-Canadian AI Strategy) — https://cifar.ca/ai/ai-and-society/",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-introduction-to-ai-assurance" satisfies ExternalLinkKey,
      description:
        "UK DSIT Introduction to AI assurance — https://www.gov.uk/government/publications/introduction-to-ai-assurance",
    },
  ] satisfies SourceItem[],
} as const;
