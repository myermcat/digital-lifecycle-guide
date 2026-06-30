import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";

export const COSTING_A_SERVICE = {
  title: "Costing a service",

  lead: [
    "Before a department can ask for money, it has to know how much the service will cost. A cost estimate is that figure. The finance team produces it and stands behind it.",
    "The number that matters is the whole-life cost: building the service, running it, supporting it, keeping it secure, and retiring it at the end. A build-only figure looks cheaper, and it sets the service up to run short later.",
  ],

  confidenceRange: {
    id: "an-estimate-has-a-confidence-range",
    title: "An estimate has a confidence range",
    intro:
      "An early estimate is allowed to be rough, as long as it says how rough. The range narrows as the work becomes clearer:",
    items: [
      {
        lead: "Rough Order of Magnitude (ROM) estimate",
        body: "can be up to 40 percent away from the real cost;",
      },
      {
        lead: "indicative estimate",
        body: "narrows that to about 25 percent;",
      },
      {
        lead: "substantive estimate",
        body: "narrows it to about 15 percent.",
      },
    ],
    closing:
      "Each estimate should say which kind it is, so an early figure is not read as a firm price.",
    formula: "ROM ±40%  →  indicative ±25%  →  substantive ±15%",
    guideClosing: {
      text: "The GC Guide to Costing sets out a seven-step method for building an estimate that holds up.",
      externalLinks: [
        { phrase: "GC Guide to Costing", linkKey: "tbs-guide-costing" },
      ] satisfies ExternalPhraseLink[],
    },
  },

  sources: [
    {
      label: "Supporting reference",
      linkKey: "tbs-guide-costing" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-guide-assessing-cost-estimates" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;
