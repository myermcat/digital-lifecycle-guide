import { GuideLayout } from "@/components/GuideLayout";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PhaseLeavingSection } from "@/components/PhaseLeavingSection";
import { WhereThisFits } from "@/components/WhereThisFits";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { PageFoot } from "@/components/PageFoot";
import type { WhereThisFitsConfig } from "@/lib/lifecycle-navigation";
import {
  getPhaseLeavingContent,
  type PhaseLeavingSlug,
} from "@/lib/phase-leaving-content";
import { guideProseSpace } from "@/lib/guide-typography";

interface PhasePlaceholderPageProps {
  id: string;
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

  return (
    <GuideLayout id={id}>
      <PhaseBreadcrumb
        lifecyclePhase={lifecyclePhase}
        lifecyclePhaseHref={lifecyclePhaseHref}
        subphase={subphase}
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFits} />
      </section>

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        <p>{intro}</p>
        {showComingSoon ? (
          <p className="italic text-foreground/60">Page content coming soon.</p>
        ) : null}
      </section>

      {leavingContent ? <PhaseLeavingSection content={leavingContent} /> : null}

      <PageFoot />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <div className="h-24" />
    </GuideLayout>
  );
}
