import { GuideLayout } from "@/components/GuideLayout";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { WhereThisFits } from "@/components/WhereThisFits";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import type { WhereThisFitsConfig } from "@/lib/lifecycle-navigation";

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

      <section className="mt-8 md:mt-10">
        <WhereThisFits {...whereThisFits} />
      </section>

      {phase && (
        <p className="mt-10 font-serif text-[1.1rem] md:text-lg leading-[1.75] text-muted-foreground italic">
          Page content coming soon.
        </p>
      )}

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <div className="h-24" />
    </GuideLayout>
  );
}
