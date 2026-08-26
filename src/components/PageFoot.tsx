import type { ReactNode } from "react";
import { SeeAlso, type SeeAlsoItem } from "@/components/SeeAlso";
import { LifecycleVisual, LifecycleVisualStack } from "@/components/LifecycleVisual";
import { SourcesBlock, type SourceItem } from "@/components/SourcesBlock";
import { SupportCallout } from "@/components/SupportCallout";
import type { LifecycleVisualAsset } from "@/lib/lifecycle-visuals";
import type { SupportCalloutVariant } from "@/lib/support-callout";
import { guideSectionTitle, guideProse } from "@/lib/guide-typography";
import { UI } from "@/lib/ui-strings";

/**
 * Standard page foot: support callout → Further reading → See also → Sources.
 * GuideAssumptions usually follows this block on the page.
 */
export function PageFoot({
  support = "generic",
  showSupportCallout = true,
  lifecycleVisual,
  furtherReading,
  seeAlso,
  sources,
  sourcesIntro,
  className,
}: {
  support?: SupportCalloutVariant;
  showSupportCallout?: boolean;
  lifecycleVisual?: LifecycleVisualAsset | LifecycleVisualAsset[];
  furtherReading?: ReactNode;
  seeAlso?: SeeAlsoItem[];
  sources?: SourceItem[];
  /** One-line note above the sources groups. */
  sourcesIntro?: string;
  className?: string;
}) {
  const hasFurtherReading = furtherReading != null;
  const hasSeeAlso = seeAlso != null && seeAlso.length > 0;
  const hasSources = sources != null && sources.length > 0;
  const lifecycleVisuals = lifecycleVisual == null
    ? []
    : Array.isArray(lifecycleVisual)
      ? lifecycleVisual
      : [lifecycleVisual];

  return (
    <div className={className ?? "mt-10 md:mt-12 space-y-10 md:space-y-12"}>
      {lifecycleVisuals.length === 1 ? (
        <LifecycleVisual visual={lifecycleVisuals[0]!} className="mt-0" />
      ) : lifecycleVisuals.length > 1 ? (
        <LifecycleVisualStack visuals={lifecycleVisuals} />
      ) : null}
      {showSupportCallout ? <SupportCallout variant={support} /> : null}
      {hasFurtherReading ? (
        <section className="scroll-mt-24" id="further-reading">
          <h2 className={`${guideSectionTitle} mb-3`}>{UI.furtherReading}</h2>
          <div className={guideProse}>{furtherReading}</div>
        </section>
      ) : null}
      {hasSeeAlso ? <SeeAlso items={seeAlso} className="mt-0" /> : null}
      {hasSources ? <SourcesBlock items={sources} intro={sourcesIntro} /> : null}
    </div>
  );
}
