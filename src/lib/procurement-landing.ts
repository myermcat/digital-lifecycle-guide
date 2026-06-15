import type { PracticeCardData } from "@/components/PracticeCard";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import { PROCUREMENT_SOURCES } from "@/lib/procurement-sources";
import { PROCUREMENT_STRINGS } from "@/lib/procurement-strings";

export type LinkedProse = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
};

export const PROCUREMENT_LANDING_PATH = "/thread/procurement";

export function procurementSubPath(slug: string) {
  return `/thread/procurement/${slug}` as const;
}

/** @deprecated Use PROCUREMENT_LANDING_PATH */
export const CONTRACTING_LANDING_PATH = PROCUREMENT_LANDING_PATH;

/** @deprecated Use procurementSubPath */
export const contractingSubPath = procurementSubPath;

export const PROCUREMENT_GOOD_LOOKS_CARDS: PracticeCardData[] = [
  {
    label: "You looked before you bought",
    href: procurementSubPath("you-looked-before-you-bought"),
    description:
      "You checked whether you needed to buy at all, and what the real options were, before reaching for a contract.",
  },
  {
    label: "You bought small, in pieces",
    href: procurementSubPath("you-bought-small-in-pieces"),
    description:
      "You bought the work in small, separate pieces instead of one large block.",
  },
  {
    label: "You did not over-customise",
    href: procurementSubPath("you-did-not-over-customise"),
    description:
      "You changed your process to fit the software, rather than changing the software to fit your process.",
  },
  {
    label: "You can leave when you need to",
    href: procurementSubPath("you-can-leave-when-you-need-to"),
    description:
      "You can leave the supplier when you need to, with your data, your code, and the knowledge to move.",
  },
  {
    label: "You kept enough in-house",
    href: procurementSubPath("you-kept-enough-in-house"),
    description:
      "You held on to enough understanding to govern the work and to handle an exit.",
  },
  {
    label: "The contract carries the practices",
    href: procurementSubPath("the-contract-carries-the-practices"),
    description:
      "The contract names the work the supplier must deliver, and says how you will see it being done.",
  },
];

/** @deprecated Use PROCUREMENT_GOOD_LOOKS_CARDS */
export const CONTRACTING_GOOD_LOOKS_CARDS = PROCUREMENT_GOOD_LOOKS_CARDS;

export type ProcurementJourneyStep = {
  label: string;
  title: string;
  leadIn: string;
  body: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: { phrase: string; to: string }[];
  anchorLinks?: { phrase: string; hash: string }[];
};

export type ComparisonRow = {
  topic: string;
  traditional: string;
  agile: string;
};

const S = PROCUREMENT_STRINGS;

export const PROCUREMENT_LANDING = {
  title: S.title,
  intro: S.intro,
  scopeCallout: S.scopeCallout,
  whatStaysYours: S.whatWorkStaysYours,
  journeyIntro: S.journey.intro,
  journeySteps: S.journey.steps satisfies ProcurementJourneyStep[],
  comparisonRows: S.comparison.rows satisfies ComparisonRow[],
  comparisonCaption: S.comparison.caption,
  caseStudy: S.caseStudy,
  goodLooksIntro: S.goodLooksIntro,
  whyItMatters: S.whyItMatters,
  whoseJob: S.whoseJob satisfies LinkedProse,
  byRegionIntro: S.byRegionIntro,
  byRegion: S.byRegion,
  furtherReading: S.furtherReading satisfies LinkedProse,
  sources: PROCUREMENT_SOURCES,
};

/** @deprecated Use PROCUREMENT_LANDING */
export const CONTRACTING_LANDING = PROCUREMENT_LANDING;
