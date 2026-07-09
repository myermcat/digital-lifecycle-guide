/**
 * Card surface rule — site-wide convention.
 *
 * **Clickable** cards (navigate or open a dialog on card click): cream fill via
 * `guideClickableCardFillStyle`.
 *
 * **Static** cards (decorative, informational, outline-only): transparent
 * background via `guideStaticCardClassName`.
 */

/** Cream fill for interactive cards — `var(--phase-group)`. */
export const guideClickableCardFillStyle = {
  backgroundColor: "var(--phase-group)",
} as const;

/** Transparent surface for non-interactive bordered cards. */
export const guideStaticCardClassName = "bg-transparent";

/** Doorway block shell — Maturity orientation, Create in three parts, etc. */
export const guideDoorwayCardClassName =
  "rounded-lg border-2 border-primary/35 bg-background";
