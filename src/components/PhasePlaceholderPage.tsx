import { GuideLayout } from "@/components/GuideLayout";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PhaseLeavingSection } from "@/components/PhaseLeavingSection";
import { WhereThisFits } from "@/components/WhereThisFits";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { PageFoot } from "@/components/PageFoot";
import { SubphaseDescriptionPanel } from "@/components/SubphaseDescriptionPanel";
import type { WhereThisFitsConfig } from "@/lib/lifecycle-navigation";
import {
  getPhaseLeavingContent,
  type PhaseLeavingSlug,
} from "@/lib/phase-leaving-content";
import { OnRampChecklist } from "@/components/OnRampChecklist";
import { SUBPHASE_CONTENT } from "@/lib/subphase-content";
import { renderLinkedProse } from "@/lib/thread-rich-content";
import { guideProse, guideProseSpace, guideSectionTitle } from "@/lib/guide-typography";

interface PhasePlaceholderPageProps {
  id: string;
  pageHeading: string;
  lifecyclePhase: string;
  lifecyclePhaseHref: string;
  subphase?: string;
  /** Opening prose below Where this fits (same role as Maturity intro). */
  intro: string;
  whereThisFits: WhereThisFitsConfig;
  subphaseLeavingSlug?: PhaseLeavingSlug;
  showComingSoon?: boolean;
}

export function PhasePlaceholderPage({
  id,
  pageHeading,
  lifecyclePhase,
  lifecyclePhaseHref,
  subphase,
  intro,
  whereThisFits,
  subphaseLeavingSlug,
  showComingSoon = true,
}: PhasePlaceholderPageProps) {
  const leavingContent = subphaseLeavingSlug
    ? getPhaseLeavingContent(subphaseLeavingSlug)
    : null;
  const body = subphaseLeavingSlug ? SUBPHASE_CONTENT[subphaseLeavingSlug] : null;
  const renderIntro = !body;

  return (
    <GuideLayout id={id}>
      <PhaseBreadcrumb
        pageHeading={pageHeading}
        lifecyclePhase={lifecyclePhase}
        lifecyclePhaseHref={lifecyclePhaseHref}
        subphase={subphase}
      />

      {body ? (
        <>
          <section className={`${guideProseSpace} mt-8 md:mt-10`}>
            <p>{body.lead}</p>
          </section>

          <section className="mt-5 md:mt-6">
            <WhereThisFits {...whereThisFits} />
          </section>

          <SubphaseDescriptionPanel />

          <section className="mt-10 md:mt-12 scroll-mt-24" id="what-happens-here">
            <h2 className={`${guideSectionTitle} mb-3`}>What happens here</h2>
            <p className={guideProse}>{body.whatHappens.intro}</p>
            <ul className="mt-4 space-y-3 list-none pl-0">
              {body.whatHappens.points.map((point) => (
                <li key={point.lead} className={guideProse}>
                  <strong>{point.lead}</strong>{" "}
                  {renderLinkedProse({
                    text: point.text,
                    internalLinks: point.internalLinks,
                    externalLinks: point.externalLinks,
                    placeholderLinks: point.placeholderLinks,
                    placeholderGcNetworkLinks: point.placeholderGcNetworkLinks,
                    bold: point.bold,
                  })}
                </li>
              ))}
            </ul>
            <p className={`${guideProse} mt-4`}>{body.whatHappens.closing}</p>
          </section>

          <OnRampChecklist
            title={body.onRamp.title}
            intro={body.onRamp.intro}
            items={body.onRamp.items}
          />
        </>
      ) : null}

      {renderIntro ? (
        <>
          <section className="mt-5 md:mt-6">
            <WhereThisFits {...whereThisFits} />
          </section>

          <SubphaseDescriptionPanel />

          <section className={`${guideProseSpace} mt-8 md:mt-10`}>
            <p>{intro}</p>
            {showComingSoon ? (
              <p className="italic text-foreground/60">Page content coming soon.</p>
            ) : null}
          </section>
        </>
      ) : null}

      {leavingContent ? <PhaseLeavingSection content={leavingContent} /> : null}

      <PageFoot subphaseFootFor={subphase ? lifecyclePhase : undefined} />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <div className="h-24" />
    </GuideLayout>
  );
}
