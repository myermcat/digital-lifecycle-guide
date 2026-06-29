import { Link } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { PROCUREMENT_LANDING } from "@/lib/procurement-landing";
import {
  guideBlockTitle,
  guideCalloutLabel,
  guideLink,
  guideProseTight,
} from "@/lib/guide-typography";

/**
 * Standalone good-contract callout on the Procurement thread — same visual weight
 * as {@link ProcurementCallout} on subphase pages.
 */
export function GoodContractCallout({
  id = "good-contract",
  className,
}: {
  id?: string;
  className?: string;
}) {
  const callout = PROCUREMENT_LANDING.goodContractCallout;

  return (
    <section
      id={id}
      className={
        className ??
        "scroll-mt-24 mt-10 md:mt-12 rounded-lg border border-primary/40 bg-background shadow-sm overflow-hidden"
      }
    >
      <div className="border-l-[5px] border-l-primary px-6 py-6 md:px-8 md:py-7">
        <div className="flex gap-4 md:gap-5">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/8 text-primary/80 md:size-11"
            aria-hidden="true"
          >
            <ScrollText className="size-5 md:size-[1.35rem]" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 space-y-4">
            <div>
              <p className={guideCalloutLabel}>{callout.label}</p>
              <h2 className={`${guideBlockTitle} mt-1`}>{callout.title}</h2>
            </div>
            {callout.paragraphs.map((paragraph) => (
              <p key={paragraph} className={guideProseTight}>
                {paragraph}
              </p>
            ))}
            <p>
              <Link to={callout.href} className={`text-sm ${guideLink}`}>
                {callout.linkLabel}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
