import { GuideLayout } from "@/components/GuideLayout";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { WhereThisFits } from "@/components/WhereThisFits";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import type { WhereThisFitsConfig } from "@/lib/lifecycle-navigation";
import { guideProseSpace } from "@/lib/guide-typography";

interface PhasePlaceholderPageProps {
  id: string;
  region: string;
  regionHref: string;
  phase?: string;
  /** Opening prose below Where this fits (same role as Maturity intro). */
  intro: string;
  whereThisFits: WhereThisFitsConfig;
}

export function PhasePlaceholderPage({
  id,
  region,
  regionHref,
  phase,
  intro,
  whereThisFits,
}: PhasePlaceholderPageProps) {
  return (
    <GuideLayout id={id}>
      <PhaseBreadcrumb region={region} regionHref={regionHref} phase={phase} />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFits} />
      </section>

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        <p>{intro}</p>
        <p className="italic text-foreground/60">Page content coming soon.</p>
      </section>

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <div className="h-24" />
    </GuideLayout>
  );
}
