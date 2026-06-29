import type { SourceItem } from "@/components/SourcesBlock";

export const SOURCE_COMING_SOON_PATH = "/source-coming-soon" as const;

export const GCCASE_MIGRATION_READINESS_GUIDE = "GCcase Migration Readiness Guide";

export const EOL_OF_PARTS_SOURCE = "EoL of parts";

export const COMPONENT_END_OF_LIFE_GUIDANCE =
  "Component end of life guidance (TBS, GCX draft)";

export const SECURE_APPLICATION_DEVELOPMENT_GUIDELINE =
  "Guideline on Secure Application Development (TBS, May 2026)";

/** Shorter source label used in coming-soon links from page copy. */
export const SECURE_APPLICATION_DEVELOPMENT_GUIDELINE_SHORT =
  "Guideline on Secure Application Development";

export const SECURITY_CATEGORIZATION_OF_SOURCE_CODE = "Security Categorization of Source Code";

export const GC_SECURITY_CATEGORIZATION_INJURY_ASSESSMENT =
  "GC security categorization (injury assessment)";

export const THREAT_AND_RISK_ASSESSMENT_TRA =
  "Threat and Risk Assessment (TRA) (CCCS, harmonized TRA methodology)";

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
  "GCcase Migration Readiness Guide and Assessment (TBS-OCIO, in production)";

export const GCCASE_MIGRATION_READINESS_GUIDE_NOTE =
  "Guidance for departments migrating off the GCcase case-management platform, which is being decommissioned. Cited here as a worked example of a transition; it is specific to GCcase rather than general migration guidance.";

/** @deprecated Use GCCASE_MIGRATION_READINESS_GUIDE_TITLE and GCCASE_MIGRATION_READINESS_GUIDE_NOTE */
export const GCCASE_MIGRATION_READINESS_GUIDE_DESCRIPTION = `${GCCASE_MIGRATION_READINESS_GUIDE_TITLE} ${GCCASE_MIGRATION_READINESS_GUIDE_NOTE}`;

/** @deprecated Use GCCASE_MIGRATION_READINESS_GUIDE_TITLE */
export const GCCASE_MIGRATION_ASSESSMENT_DESCRIPTION =
  GCCASE_MIGRATION_READINESS_GUIDE_TITLE;

export function gccaseComingSoonSourceItem(): SourceItem {
  return {
    label: "Supporting reference",
    href: placeholderSourceHref(GCCASE_MIGRATION_READINESS_GUIDE),
    description: GCCASE_MIGRATION_READINESS_GUIDE_TITLE,
    note: GCCASE_MIGRATION_READINESS_GUIDE_NOTE,
    comingSoon: true,
  };
}
