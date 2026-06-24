/**
 * Lifted in-page blocks — canonical names for conversation and implementation.
 *
 * | You say            | Component       | Import                          |
 * |--------------------|-----------------|----------------------------------|
 * | **editorial note** | `EditorialNote` | `@/components/EditorialNote`     |
 * | **callout**        | `GuideCallout`  | `@/components/GuideCallout`      |
 *
 * Do not swap them. Editorial notes frame who/why; callouts orient or test within the page.
 */

/** Editorial note — audience, framing, cautions. */
export const EDITORIAL_NOTE_BLOCK = {
  /** Say "editorial note" when referring to this block. */
  name: "editorial note",
  blockId: "editorial-note",
  component: "EditorialNote",
  importPath: "@/components/EditorialNote",
  purpose:
    "Editorial framing: who the page is for, background context, cautions. Not for practical how-to within the page.",
  visual:
    "Muted grey fill (bg-muted/40). Thick left bar in muted grey (border-l-muted-foreground/60). Tiny uppercase label in muted sans (guideCalloutLabel). Body in tight sans (guideProseTight). Caution tone uses red accent instead.",
  examples: ['Home — "Who this is for"'],
} as const;

/** Callout — practical tips, tests, scope within a page. */
export const CALLOUT_BLOCK = {
  /** Say "callout" when referring to this block. */
  name: "callout",
  blockId: "callout",
  component: "GuideCallout",
  importPath: "@/components/GuideCallout",
  purpose:
    "In-page orientation and practical tips: tests, scope notes, how to tell something. Not for audience framing.",
  visual:
    "Primary-tint fill (bg-primary/[0.04]). Thick left bar in primary red (border-l-primary). Heading: tiny uppercase primary sans (guideCalloutTitle) or muted label for short tags like Scope. Body in serif (guideProse) or tight sans when compact.",
  examples: ['Home — "Not sure which phase you are in?"', "Procurement — Scope"],
} as const;

/** Support callout — help pointer before Further reading on every page. */
export const SUPPORT_CALLOUT_BLOCK = {
  /** Say "support callout" when referring to this block. */
  name: "support callout",
  blockId: "support-callout",
  component: "SupportCallout",
  importPath: "@/components/SupportCallout",
  purpose:
    "Standing offer of help at the foot of every page, immediately before Further reading and Sources.",
  visual:
    "Doorway-card anatomy: small-caps primary label, tight sans body, arrow link to /support.",
  examples: ["Generic on most pages", "Security → CCCS", "Procurement → CanadaBuys"],
} as const;

export type GuideBlockName =
  | typeof EDITORIAL_NOTE_BLOCK.name
  | typeof CALLOUT_BLOCK.name
  | typeof SUPPORT_CALLOUT_BLOCK.name;

/** Lookup by conversational name. */
export const GUIDE_BLOCKS_BY_NAME = {
  [EDITORIAL_NOTE_BLOCK.name]: EDITORIAL_NOTE_BLOCK,
  [CALLOUT_BLOCK.name]: CALLOUT_BLOCK,
  [SUPPORT_CALLOUT_BLOCK.name]: SUPPORT_CALLOUT_BLOCK,
} as const;

/** Card surfaces — clickable vs static. See `src/lib/guide-cards.ts`. */
export {
  guideClickableCardFillStyle,
  guideStaticCardClassName,
} from "@/lib/guide-cards";

/** @deprecated Prefer EDITORIAL_NOTE_BLOCK / CALLOUT_BLOCK */
export const guideBlockTypes = {
  editorialNote: EDITORIAL_NOTE_BLOCK.component,
  callout: CALLOUT_BLOCK.component,
} as const;
