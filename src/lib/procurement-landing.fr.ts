import type { PracticeCardData } from "@/components/PracticeCard";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { PlaceholderPhraseLink } from "@/lib/placeholder-sources";
import { PROCUREMENT_SOURCES } from "@/lib/procurement-sources";
import {
  PROCUREMENT_STRINGS,
  type ProcurementJourneyBodyBlock,
} from "@/lib/procurement-strings";
import { OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";

export type LinkedProse = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  placeholderLinks?: PlaceholderPhraseLink[];
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
    label: "Vous avez regardé avant d’acheter",
    href: OPTIONS_ANALYSIS_PATH,
    description:
      "Vous avez vérifié s’il fallait acheter, et quelles étaient les vraies options, avant de vous tourner vers un contrat. La page de référence Analyse des options parcourt l’échelle complète.",
  },
  {
    label: "Vous avez acheté petit, en morceaux",
    href: procurementSubPath("buy-in-small-pieces"),
    description:
      "Vous avez acheté le travail en petits morceaux distincts plutôt qu’en un seul gros bloc.",
  },
  {
    label: "Vous n’avez pas trop personnalisé",
    href: procurementSubPath("avoid-over-customising"),
    description:
      "Vous avez changé votre processus pour l’adapter au logiciel, plutôt que de changer le logiciel pour l’adapter à votre processus.",
  },
  {
    label: "Vous pouvez partir quand il le faut",
    href: procurementSubPath("avoid-lock-in"),
    description:
      "Vous pouvez quitter le fournisseur quand il le faut, avec vos données, votre code et la connaissance nécessaire pour déménager.",
  },
  {
    label: "Vous avez gardé assez de capacité à l’interne",
    href: procurementSubPath("keep-capability-in-house"),
    description:
      "Vous avez conservé assez de compréhension pour gouverner le travail et pour gérer une sortie.",
  },
  {
    label: "Le contrat porte les pratiques",
    href: procurementSubPath("put-the-practices-in-the-contract"),
    description:
      "Le contrat nomme les travaux que le fournisseur doit livrer, et dit comment vous en verrez l’exécution.",
  },
];

/** @deprecated Use PROCUREMENT_GOOD_LOOKS_CARDS */
export const CONTRACTING_GOOD_LOOKS_CARDS = PROCUREMENT_GOOD_LOOKS_CARDS;

export type ProcurementJourneyStep = {
  label: string;
  title: string;
  blocks: ProcurementJourneyBodyBlock[];
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: { phrase: string; to: string }[];
  anchorLinks?: { phrase: string; hash: string }[];
  placeholderLinks?: PlaceholderPhraseLink[];
  reviewNotice?: string;
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
  whatStaysYours: S.whatWorkStaysYours,
  whatYouAreBuying: S.whatYouAreBuying,
  goodContractCallout: S.goodContractCallout,
  glossary: S.glossary,
  journeyIntro: S.journey.intro,
  journeySteps: S.journey.steps satisfies ProcurementJourneyStep[],
  comparisonRows: S.comparison.rows satisfies ComparisonRow[],
  comparisonCaption: S.comparison.caption,
  caseStudy: S.caseStudy,
  goodLooksIntro: S.goodLooksIntro,
  whyItMatters: S.whyItMatters,
  whoseJob: S.whoseJob satisfies LinkedProse,
  whoseJobSplit: S.whoseJobSplit,
  byPhase: S.byPhase,
  furtherReading: S.furtherReading satisfies LinkedProse,
  sources: PROCUREMENT_SOURCES,
};

/** @deprecated Use PROCUREMENT_LANDING */
export const CONTRACTING_LANDING = PROCUREMENT_LANDING;
