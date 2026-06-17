import type { SourceItem } from "@/components/SourcesBlock";

export const SOURCE_COMING_SOON_PATH = "/source-coming-soon" as const;

export const GCCASE_MIGRATION_READINESS_GUIDE = "GCcase Migration Readiness Guide";

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

export function comingSoonSourceItem(source: string): SourceItem {
  return {
    label: source,
    href: placeholderSourceHref(source),
    description: source,
    comingSoon: true,
  };
}

export const GCCASE_MIGRATION_READINESS_GUIDE_DESCRIPTION =
  "GCcase Migration Readiness Guide and Assessment (TBS-OCIO, in production). Guidance for departments migrating off the GCcase case-management platform, which is being decommissioned. Cited here as a worked example of a transition; it is specific to GCcase rather than general migration guidance.";

/** @deprecated Use GCCASE_MIGRATION_READINESS_GUIDE_DESCRIPTION */
export const GCCASE_MIGRATION_ASSESSMENT_DESCRIPTION =
  GCCASE_MIGRATION_READINESS_GUIDE_DESCRIPTION;

export function gccaseComingSoonSourceItem(): SourceItem {
  return {
    label: "Supporting reference (coming soon)",
    href: placeholderSourceHref(GCCASE_MIGRATION_READINESS_GUIDE),
    description: GCCASE_MIGRATION_READINESS_GUIDE_DESCRIPTION,
    comingSoon: true,
    tone: "very-light",
  };
}
