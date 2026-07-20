import { Link } from "@tanstack/react-router";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import { LifecycleVisualStack } from "@/components/LifecycleVisual";
import { PageFoot } from "@/components/PageFoot";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PhaseQuote } from "@/components/PhaseQuote";
import { WhereThisFits } from "@/components/WhereThisFits";
import { guideDoorwayCardClassName } from "@/lib/guide-cards";
import { PHASES } from "@/lib/guide-strings";
import createToSunsetVisual from "@/assets/lifecycle_live_to_sunset.svg?url";
import { whereThisFitsForLiveSubphase } from "@/lib/lifecycle-navigation";
import { subphaseFootVisuals } from "@/lib/lifecycle-visuals";
import { LIVE_PHASE } from "@/lib/live-phase-content";
import type { SourceItem } from "@/components/SourcesBlock";
import { renderLinkedProse } from "@/lib/thread-rich-content";
import {
  guideCalloutLabel,
  guideCardHeading,
  guideLink,
  guideListIndent,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";

export function LivePhasePage() {
  const { lead, quote, subphases, workOfLive } = LIVE_PHASE;

  const sources: SourceItem[] = [
    { label: "Guideline on Service and Digital (TBS)", linkKey: "guideline-service-digital" },
  ];

  return (
    <GuideLayout id="live">
      <PhaseBreadcrumb
        pageHeading={PHASES.live.pageHeading}
        lifecyclePhase={PHASES.live.title}
        lifecyclePhaseHref={PHASES.live.href}
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForLiveSubphase(null)} />
      </section>

      <PhaseQuote quote={quote} />

      <LifecycleVisualStack
        visuals={subphaseFootVisuals("Live")}
        variant="subphaseFoot"
        className="mt-5 md:mt-6"
      />

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        {lead.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={workOfLive.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{workOfLive.title}</h2>
        <div className={guideProseSpace}>
          <p>
            <strong>{workOfLive.introBold}</strong>
          </p>
          <div className="mt-5">
            <IconAccordionSection
              embedded
              stages={workOfLive.blocks.map((block) => ({
                id: block.heading,
                title: block.heading,
                children: (
                  <>
                    <p>{block.lead}</p>
                    <ul className={`mt-2 list-disc space-y-2 ${guideListIndent}`}>
                      {block.bullets.map((bullet) => (
                        <li key={bullet.text}>{renderLinkedProse(bullet)}</li>
                      ))}
                    </ul>
                  </>
                ),
              }))}
            />
          </div>
          <p className="mt-6">
            <strong>{workOfLive.closing.leadIn}</strong> {workOfLive.closing.text}
          </p>
        </div>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={subphases.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>The three sub-phases of Live</h2>
        <p className={`${guideProse} mb-5`}>{subphases.intro}</p>

        <div className={guideDoorwayCardClassName}>
          <div className="divide-y divide-primary/20">
            {subphases.rows.map((row) => (
              <div key={row.href} className="px-5 py-2.5 md:px-6 md:py-3">
                <Link
                  to={row.href as string}
                  className={`${guideCardHeading} ${guideLink} inline-flex items-center gap-1 text-primary`}
                >
                  {row.title} <span aria-hidden>→</span>
                </Link>
                <p className={`${guideCalloutLabel} mt-1`}>{row.description}</p>
              </div>
            ))}
          </div>
        </div>

        <p className={`${guideProse} mt-5`}>
          Leaving Live is the crossing into{" "}
          <Link to={PHASES.sunset.href} className={guideLink}>
            Sunset
          </Link>
          : the service is being replaced or retired, and the exit has to be planned and funded
          before the money runs out.
        </p>

        <img
          src={createToSunsetVisual}
          alt="Live to Sunset crossing"
          className="max-w-2xl mx-auto mt-4 w-full"
        />
      </section>

      <PageFoot sources={sources} />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <div className="h-24" />
    </GuideLayout>
  );
}

