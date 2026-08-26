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
import { PHASE_CROSSING } from "@/lib/phase-crossing-strings";
import type { SourceItem } from "@/components/SourcesBlock";
import { renderLinkedProse } from "@/lib/thread-rich-content";
import {
  guideSubsectionTitle,
  guideCalloutLabel,
  guideBodySubheading,
  guideCardHeading,
  guideLink,
  guideListIndent,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";
import { UI } from "@/lib/ui-strings";

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
              guideSubsectionTitle: the serif subheading the home page uses for "What this
              guide is". These headings open a topic in running prose, which is the same job.
              The margin overrides pull the heading away from the paragraph above and close it
              against the one below, so it reads as belonging to what follows.

              Not guideBodySubheading, which is plain bold sans at body size and inside a
              space-y block sits an equal distance from both neighbours, reading as stray bold
              text. Not guideBlockSubheading either, whose small uppercase label suits a block
              rather than a page's opening prose.
            */}
            <h2 className={`${guideSubsectionTitle} !mt-8 !mb-2`}>{paragraph.heading}</h2>
            <p>{paragraph.text}</p>
          </div>
        ))}
      </section>

      <CheckpointMapPhaseCallout
        text={PHASE_CROSSING.liveCheckpointsLead}
        hash="live"
        linkLabel={UI.seeCheckpointsInLive}
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
        <h2 className={`${guideSectionTitle} mb-3`}>{UI.theThreeSubPhasesOfLive}</h2>
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
          {PHASE_CROSSING.liveToSunsetLeadIn}{" "}
          <Link to={PHASES.sunset.href} className={guideLink}>
            {UI.sunset}
          </Link>
          {PHASE_CROSSING.liveToSunsetRest}
        </p>

        <img
          src={createToSunsetVisual}
          alt={UI.liveToSunsetCrossingAlt}
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
        sourcesIntro={UI.phaseLevelReferencesNote}
      />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <SubphaseSectionNav
        prev={{ href: "/create-beta", label: UI.subBetaCreate, level: "subphase" }}
        next={{
          href: "/live-stabilization",
          label: PHASE_CROSSING.nextStabilizationSubphase,
          level: "subphase",
        }}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
