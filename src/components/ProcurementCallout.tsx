import { Link } from "@tanstack/react-router";
import {
  PROCUREMENT_CALLOUT_AT_SUBPHASE,
  PROCUREMENT_CALLOUT_FRAMING,
  PROCUREMENT_CALLOUT_HEADING,
  PROCUREMENT_CALLOUT_LABEL,
  PROCUREMENT_CALLOUT_LINK,
  PROCUREMENT_CALLOUT_LINK_LABEL,
  type ProcurementCalloutSubphaseId,
} from "@/lib/procurement-callout";
import {
  guideBlockTitle,
  guideCalloutLabel,
  guideLink,
  guideProseTight,
} from "@/lib/guide-typography";

/**
 * Standalone procurement callout for subphase pages — visually heavier than practice
 * cards, with accent border. Only this cross-cutting thread gets its own block.
 * Renders as `section[id]` + `h2` so it appears in the page's On this page nav.
 */
export function ProcurementCallout({
  subphaseId,
  id = "procurement-and-contracting",
  className,
}: {
  subphaseId: ProcurementCalloutSubphaseId;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={
        className ??
        "scroll-mt-24 mt-10 md:mt-12 rounded-lg border border-primary/40 bg-background shadow-sm overflow-hidden"
      }
    >
      <div className="border-l-[5px] border-l-primary px-6 py-6 md:px-8 md:py-7 space-y-4">
        <p className={guideCalloutLabel}>{PROCUREMENT_CALLOUT_LABEL}</p>
        <h2 className={`${guideBlockTitle} mt-1`}>{PROCUREMENT_CALLOUT_HEADING}</h2>
        <p className={guideProseTight}>{PROCUREMENT_CALLOUT_FRAMING}</p>
        <p className={guideProseTight}>{PROCUREMENT_CALLOUT_AT_SUBPHASE[subphaseId]}</p>
        <p>
          <Link to={PROCUREMENT_CALLOUT_LINK} className={`text-sm ${guideLink}`}>
            {PROCUREMENT_CALLOUT_LINK_LABEL}
          </Link>
        </p>
      </div>
    </section>
  );
}
