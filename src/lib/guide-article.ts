import { guideProse, guideSectionTitle } from "@/lib/guide-typography";

/** Comfortable reading measure — matches assumptions and footnote blocks site-wide. */
export const guideArticleMeasure = "max-w-xl";

/** Vertical gap between sections (larger than within-section paragraph gaps). */
export const guideArticleSectionGap = "mt-14 md:mt-16";

/** Gap from intro or page header into the first section. */
export const guideArticleFirstSectionGap = "mt-10 md:mt-12";

/** Section heading: tight below, section margin supplies space above. */
export const guideArticleSectionTitle = `${guideSectionTitle} mb-3 md:mb-4`;

/** Within-section paragraph and block rhythm. */
export const guideArticleProse = `${guideProse} space-y-4`;

/** Space before editorial notes, case studies, and similar lifted blocks. */
export const guideArticleCalloutLift = "mt-8 md:mt-10";
