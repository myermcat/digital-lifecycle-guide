import { Link } from "@tanstack/react-router";
import { CheckpointMapPhaseCallout } from "@/components/CheckpointMapPointers";
import { CautionBlock } from "@/components/CautionBlock";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import { LifecycleVisualStack } from "@/components/LifecycleVisual";
import { PageFoot } from "@/components/PageFoot";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PhaseQuote } from "@/components/PhaseQuote";
import { SubphaseSectionNav } from "@/components/SubphaseSectionNav";
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
  guideBlockSubheading,
  guideCalloutLabel,
  guideBodySubheading,
  guideCardHeading,
  guideLink,
  guideListIndent,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";

export function LivePhasePage() {
  const { lead, quote, subphases, workOfLive, whatRuns, reviews } = LIVE_PHASE;

  const sources: SourceItem[] = [...LIVE_PHASE.sources];

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
          <div key={paragraph.text}>
            {/*
              guideBlockSubheading, not guideBodySubheading. The latter is plain bold sans
              at body size, which inside a space-y block sits an equal distance from the
              paragraph above and below and reads as unattached bold text. That token's own
              comment describes the defect. This one is the small uppercase topic opener the
              other pages use, and it binds itself to the paragraph it introduces.
            */}
            <h2 className={guideBlockSubheading}>{paragraph.heading}</h2>
            <p>{paragraph.text}</p>
          </div>
        ))}
      </section>

      <CheckpointMapPhaseCallout
        text="See where Live sits in the whole lifecycle."
        hash="live"
        linkLabel="See the checkpoints in Live →"
      />

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

      <section className="mt-10 md:mt-12 scroll-mt-24" id={whatRuns.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{whatRuns.title}</h2>
        <p className={`${guideProse} mb-4`}>{whatRuns.intro}</p>
        <ul className={`${guideProse} space-y-2`}>
          {whatRuns.coreThreads.map((thread) => (
            <li key={thread.slug}>
              <Link to="/thread/$slug" params={{ slug: thread.slug }} className={guideLink}>
                {thread.title}
              </Link>
              <span className="text-muted-foreground"> {thread.note}</span>
            </li>
          ))}
        </ul>
        <p className={`${guideProse} mt-4`}>{whatRuns.obligations.lead}</p>
        <ul className={`${guideProse} mt-2 list-disc space-y-2 ${guideListIndent}`}>
          {whatRuns.obligations.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={reviews.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{reviews.title}</h2>
        <p className={guideProse}>{reviews.text}</p>
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

      <CautionBlock
        id="cost-of-leaving-it-late"
        className="mt-10 md:mt-12"
        title={LIVE_PHASE.costOfLate.title}
        lead={LIVE_PHASE.costOfLate.lead}
        items={[...LIVE_PHASE.costOfLate.items]}
      />

      <PageFoot
        sources={sources}
        sourcesIntro="These are the phase-level references. The working references for each part of the phase are on its sub-phase pages."
      />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <SubphaseSectionNav
        prev={{ href: "/create-beta", label: "Beta sub-phase (Create)", level: "subphase" }}
        next={{ href: "/live-stabilization", label: "Stabilization sub-phase", level: "subphase" }}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
