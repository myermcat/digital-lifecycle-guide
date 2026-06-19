import { guideProse, guideProseTight } from "@/lib/guide-typography";

/** Comfortable reading measure — matches assumptions and footnote blocks site-wide. */
export const guideArticleMeasure = "max-w-xl";

/** Vertical gap between sections (larger than within-section paragraph gaps). */
export const guideArticleSectionGap = "mt-14 md:mt-16";

/** Gap from intro or page header into the first section. */
export const guideArticleFirstSectionGap = "mt-10 md:mt-12";

/** Section heading on thread/reference article pages — subordinate to the page h1. */
export const guideArticleSectionTitle =
  "font-serif text-2xl md:text-3xl lg:text-[2.125rem] font-bold text-foreground tracking-tight leading-[1.12] mb-4 md:mb-5";

/** Within-section paragraph and block rhythm. */
export const guideArticleProse = `${guideProse} space-y-4`;

/** Space before editorial notes, case studies, and similar lifted blocks. */
export const guideArticleCalloutLift = "mt-8 md:mt-10";

/** Dialogue Q&A: gap between question-and-answer pairs. */
export const guideArticleQaList = "space-y-5 md:space-y-6 list-none pl-0";

/** Dialogue Q&A: light card per exchange. */
export const guideArticleQaCard =
  "rounded-md border border-border/50 bg-muted/15 px-4 py-3.5 md:px-5 md:py-4";

/** Dialogue Q&A: question line — leads the eye. */
export const guideArticleQaQuestion = `${guideProse} font-medium text-primary border-l-2 border-primary/25 pl-3 -ml-px`;

/** Dialogue Q&A: answer line — smaller, plainer, slightly indented. */
export const guideArticleQaAnswer = `${guideProseTight} text-foreground/55 ml-3 md:ml-4 mt-2.5`;

/** Light aside below a list or block — smaller sans, low contrast. Not main body copy.
 *  Example: "One option is left off this ladder on purpose…" (You looked before you bought). */
export const guideAsideNote =
  "mt-3 font-sans text-xs leading-[1.45] text-foreground/45 font-normal";

/** @deprecated Use guideAsideNote */
export const guideArticleNote = guideAsideNote;
