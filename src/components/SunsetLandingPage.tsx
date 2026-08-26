import { useId, useState } from "react";
import { CautionBlock } from "@/components/CautionBlock";
import { CheckpointMapPhaseCallout } from "@/components/CheckpointMapPointers";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { LifecycleVisual } from "@/components/LifecycleVisual";
import { InlineArrowLeadList } from "@/lib/guide-lists";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { SubphaseSectionNav } from "@/components/SubphaseSectionNav";
import { PhaseQuote } from "@/components/PhaseQuote";
import { PracticeCardGroup } from "@/components/PracticeCard";
import { PageFoot } from "@/components/PageFoot";
import { SubphaseInstruments } from "@/components/SubphaseInstruments";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import { SunsetJourneySection } from "@/components/SunsetJourneySection";
import { SunsetPathFork, sunsetJourneyCardBox } from "@/components/SunsetPathFork";
import { WhereThisFits } from "@/components/WhereThisFits";
import { whereThisFitsForSunsetPhaseLanding } from "@/lib/lifecycle-navigation";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import { PHASE_CROSSING } from "@/lib/phase-crossing-strings";
import {
  SUNSET_LANDING,
  SUNSET_WHERE_NEXT_CARDS,
  sunsetJourneyStepsForPath,
  type SunsetPath,
} from "@/lib/sunset-landing";
import {
  guideCalloutLabel,
  guideProse,
  guideProseSpace,
  guideProseTight,
  guideSectionTitle,
} from "@/lib/guide-typography";
import { PHASES } from "@/lib/guide-strings";
import { UI } from "@/lib/ui-strings";

export function SunsetLandingPage() {
  const [path, setPath] = useState<SunsetPath>("replace");
  const toggleId = useId();
  const landing = SUNSET_LANDING;
  const visibleSteps = sunsetJourneyStepsForPath(path);

  return (
    <GuideLayout id="sunset">
      <PhaseBreadcrumb
        pageHeading={PHASES.sunset.pageHeading}
        lifecyclePhase={PHASES.sunset.title}
        lifecyclePhaseHref={PHASES.sunset.href}
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForSunsetPhaseLanding()} />
      </section>

      <PhaseQuote quote={landing.quote} />

      <LifecycleVisual visual={LIFECYCLE_VISUALS.phasesAndSubphases} />

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        {landing.intro.map((paragraph) => (
          <p key={paragraph.text}>
            {proseWithMixedLinks(paragraph.text, { bold: paragraph.bold })}
          </p>
        ))}
      </section>

      <CheckpointMapPhaseCallout
        text={PHASE_CROSSING.sunsetCheckpointsLead}
        hash="sunset"
        linkLabel={UI.seeCheckpointsInSunset}
      />

      <aside className="mt-8 rounded-lg border border-primary/30 bg-primary/5 px-6 py-5 md:px-7 md:py-6">
        <p className={guideCalloutLabel}>{UI.scope}</p>
        <p className={`${guideProseTight} mt-2`}>
          {proseWithMixedLinks(landing.scope.text, {
            placeholder: landing.scope.placeholderLinks,
          })}
        </p>
      </aside>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="sunset-signals">
        <h2 className={`${guideSectionTitle} mb-3`}>{landing.signals.title}</h2>
        <p className={`${guideProse} mb-4`}>{landing.signals.intro}</p>
        <InlineArrowLeadList items={landing.signals.bullets} />
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="replace-or-retire">
        <h2 className={`${guideSectionTitle} mb-3`}>{landing.fork.title}</h2>
        <p className={`${guideProse} mb-4`}>{landing.fork.intro}</p>
        <InlineArrowLeadList items={landing.fork.bullets} />
        <p className={`${guideProse} mt-4`}>{landing.fork.close}</p>

        <div className={sunsetJourneyCardBox}>
          <div id={`${toggleId}-journey`} key={path}>
            <SunsetJourneySection
              embedded
              path={path}
              intro={landing.journeyIntro}
              footer={landing.journeyFooter}
              steps={visibleSteps}
              fork={
                <SunsetPathFork
                  path={path}
                  onPathChange={setPath}
                  options={landing.fork.pathOptions}
                  cardTitle={landing.fork.cardTitle}
                  journeyId={`${toggleId}-journey`}
                />
              }
            />
          </div>
        </div>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="where-to-go-next">
        <h2 className={`${guideSectionTitle} mb-4`}>{landing.whereNext.title}</h2>
        <PracticeCardGroup cards={SUNSET_WHERE_NEXT_CARDS} />
      </section>

      <CautionBlock
        id="cost-of-leaving-it-late"
        className="mt-10 md:mt-12"
        title={landing.caution.title}
        lead={landing.caution.lead}
        items={landing.caution.items}
        closing={proseWithMixedLinks(landing.caution.closingCitation.text, {
          placeholder: landing.caution.closingCitation.placeholderLinks,
        })}
      />

      <SubphaseInstruments subPhase="sunset" />


      <PageFoot sources={landing.sources} />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <SubphaseSectionNav
        prev={{ href: "/live-maturity", label: UI.subMaturityLive, level: "subphase" }}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
