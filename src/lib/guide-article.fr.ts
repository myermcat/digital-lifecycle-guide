import { guideProse, guideProseTight } from "@/lib/guide-typography";

export {
  CALLOUT_BLOCK,
  EDITORIAL_NOTE_BLOCK,
  GUIDE_BLOCKS_BY_NAME,
  SUPPORT_CALLOUT_BLOCK,
  guideBlockTypes,
  type GuideBlockName,
} from "@/lib/guide-blocks";

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

/** Q&A accordion shell — muted fill from the original procurement Q&A cards. */
export const guideArticleQaShell =
  "rounded-lg border border-border/50 bg-muted/15";

/** Q&A question line inside an accordion trigger. */
export const guideArticleQaQuestion = `${guideProse} font-medium text-primary`;

/** Q&A answer line below an expanded trigger. */
export const guideArticleQaAnswer = `${guideProseTight} text-foreground/55 ml-3 md:ml-4`;

/** Light aside below a list or block — smaller sans, low contrast. Not main body copy.
 *  Example: "One option is left off this ladder on purpose…" (You looked before you bought). */
export const guideAsideNote =
  "mt-3 font-sans text-xs leading-[1.45] text-foreground/45 font-normal";

/** Inline link within a guideAsideNote — muted to match the note tone. */
export const guideAsideLink =
  "font-medium text-foreground/55 underline underline-offset-4 decoration-foreground/30 hover:text-foreground/70 hover:decoration-foreground/45 transition-colors";

/** @deprecated Use guideAsideNote */
export const guideArticleNote = guideAsideNote;
