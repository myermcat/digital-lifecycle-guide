/**
 * Canonical list patterns for the guide.
 *
 * - GuideArrowBullet — the small arrow only. Pair with your own text layout.
 * - ArrowLeadList — stacked lead + body layout (uses GuideArrowBullet).
 * - InlineArrowLeadList — bold lead and body on one line (What work stays yours style).
 */
export {
  ArrowLeadList,
  GuideArrowBullet,
  InlineArrowLeadList,
  type ArrowLeadItem,
  type InlineArrowLeadItem,
} from "@/components/CompactLinkedList";
export {
  guideArrowLeadGroup,
  guideArrowLeadList,
  guideArrowList,
  guideArrowListIcon,
  guideArrowListIconInline,
} from "@/lib/guide-typography";
