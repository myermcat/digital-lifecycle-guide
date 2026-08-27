import type { SourceItem } from "@/components/SourcesBlock";

export const SOURCE_COMING_SOON_PATH = "/source-coming-soon" as const;

export const GCCASE_MIGRATION_READINESS_GUIDE = "Guide de préparation à la migration GCcase";

export const EOL_OF_PARTS_SOURCE = "Fin de vie des composants";

export const COMPONENT_END_OF_LIFE_GUIDANCE =
  "Orientations sur la fin de vie des composants (SCT, ébauche GCX)";

export const SECURE_APPLICATION_DEVELOPMENT_GUIDELINE =
  "Ligne directrice sur le développement sécurisé d’applications (SCT, mai 2026)";

/** Shorter source label used in coming-soon links from page copy. */
export const SECURE_APPLICATION_DEVELOPMENT_GUIDELINE_SHORT =
  "Ligne directrice sur le développement sécurisé d’applications";

export const DIGITAL_SOLUTIONS_CHANGE_MANAGEMENT_PORTAL =
  "Portail de gestion du changement des solutions numériques";

export const SECURITY_CATEGORIZATION_OF_SOURCE_CODE = "Catégorisation de sécurité du code source";

export const GC_SECURITY_CATEGORIZATION_INJURY_ASSESSMENT =
  "Catégorisation de sécurité du GC (évaluation du préjudice)";

export const THREAT_AND_RISK_ASSESSMENT_TRA =
  "Évaluation de la menace et des risques (EMR) (CCC, méthodologie harmonisée d’EMR)";

export type PlaceholderPhraseLink = {
  phrase: string;
  source: string;
  part?: string;
};

export function placeholderSourceHref(source: string, part?: string): string {
  const params = new URLSearchParams({ source });
  if (part) {
    params.set("part", part);
  }
  return `${SOURCE_COMING_SOON_PATH}?${params.toString()}`;
}

export function eolOfPartsComingSoonHref(): string {
  return placeholderSourceHref(EOL_OF_PARTS_SOURCE);
}

export function comingSoonSourceItem(source: string): SourceItem {
  return {
    label: source,
    href: placeholderSourceHref(source),
    description: source,
    comingSoon: true,
  };
}

export const GCCASE_MIGRATION_READINESS_GUIDE_TITLE =
  "Guide de préparation à la migration GCcase et son évaluation (SCT-DPI, en production)";

export const GCCASE_MIGRATION_READINESS_GUIDE_NOTE =
  "Orientations pour les ministères qui migrent hors de la plateforme de gestion des cas GCcase, en cours de mise hors service. Citées ici comme exemple concret de transition; elles portent sur GCcase plutôt que sur la migration en général.";

/** @deprecated Use GCCASE_MIGRATION_READINESS_GUIDE_TITLE and GCCASE_MIGRATION_READINESS_GUIDE_NOTE */
export const GCCASE_MIGRATION_READINESS_GUIDE_DESCRIPTION = `${GCCASE_MIGRATION_READINESS_GUIDE_TITLE} ${GCCASE_MIGRATION_READINESS_GUIDE_NOTE}`;

/** @deprecated Use GCCASE_MIGRATION_READINESS_GUIDE_TITLE */
export const GCCASE_MIGRATION_ASSESSMENT_DESCRIPTION =
  GCCASE_MIGRATION_READINESS_GUIDE_TITLE;

export function gccaseComingSoonSourceItem(): SourceItem {
  return {
    label: "Référence complémentaire",
    href: placeholderSourceHref(GCCASE_MIGRATION_READINESS_GUIDE),
    description: GCCASE_MIGRATION_READINESS_GUIDE_TITLE,
    note: GCCASE_MIGRATION_READINESS_GUIDE_NOTE,
    comingSoon: true,
  };
}
