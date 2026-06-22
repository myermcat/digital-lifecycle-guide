import type { ReactNode } from "react";
import { SourcesBlock, type SourceItem } from "@/components/SourcesBlock";
import { SupportCallout } from "@/components/SupportCallout";
import type { SupportCalloutVariant } from "@/lib/support-callout";
import { guideSectionTitle, guideProse } from "@/lib/guide-typography";

/**
 * Standard page foot: support callout → Further reading → Sources.
 * GuideAssumptions usually follows this block on the page.
 */
export function PageFoot({
  support = "generic",
  showSupportCallout = true,
  furtherReading,
  sources,
  className,
}: {
  support?: SupportCalloutVariant;
  showSupportCallout?: boolean;
  furtherReading?: ReactNode;
  sources?: SourceItem[];
  className?: string;
}) {
  const hasFurtherReading = furtherReading != null;
  const hasSources = sources != null && sources.length > 0;

  return (
    <div className={className ?? "mt-10 md:mt-12 space-y-10 md:space-y-12"}>
      {showSupportCallout ? <SupportCallout variant={support} /> : null}
      {hasFurtherReading ? (
        <section className="scroll-mt-24" id="further-reading">
          <h2 className={`${guideSectionTitle} mb-3`}>Further reading</h2>
          <div className={guideProse}>{furtherReading}</div>
        </section>
      ) : null}
      {hasSources ? <SourcesBlock items={sources} /> : null}
    </div>
  );
}
