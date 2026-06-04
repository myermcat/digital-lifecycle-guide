import { GuideLayout } from "@/components/GuideLayout";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { WhereThisFits } from "@/components/WhereThisFits";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { PhaseSection } from "@/components/PhaseSection";
import type { WhereThisFitsConfig } from "@/lib/lifecycle-navigation";
import { guideProse } from "@/lib/guide-typography";

interface PhasePlaceholderPageProps {
  id: string;
  region: string;
  regionHref: string;
  phase?: string;
  subtitle: string;
  whereThisFits: WhereThisFitsConfig;
}

export function PhasePlaceholderPage({
  id,
  region,
  regionHref,
  phase,
  subtitle,
  whereThisFits,
}: PhasePlaceholderPageProps) {
  return (
    <GuideLayout id={id}>
      <PhaseBreadcrumb
        region={region}
        regionHref={regionHref}
        phase={phase}
        subtitle={subtitle}
      />

      <section className="mt-2 md:mt-3">
        <WhereThisFits {...whereThisFits} />
      </section>

      <PhaseSection
        title={phase ?? region}
        sectionId="page-content"
        className={phase ? undefined : "mt-10"}
      >
        <p className={`italic text-foreground/60 ${guideProse}`}>Page content coming soon.</p>
      </PhaseSection>

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <div className="h-24" />
    </GuideLayout>
  );
}
