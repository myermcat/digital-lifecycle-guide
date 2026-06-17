import { useId, useState } from "react";
import { CautionBlock } from "@/components/CautionBlock";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { InlineArrowLeadList } from "@/lib/guide-lists";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PracticeCardGroup } from "@/components/PracticeCard";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import { SourcesBlock } from "@/components/SourcesBlock";
import { SunsetJourneySection } from "@/components/SunsetJourneySection";
import { WhereThisFits } from "@/components/WhereThisFits";
import { whereThisFitsForSunsetPhaseLanding } from "@/lib/lifecycle-navigation";
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

export function SunsetLandingPage() {
  const [path, setPath] = useState<SunsetPath>("replace");
  const toggleId = useId();
  const landing = SUNSET_LANDING;
  const visibleSteps = sunsetJourneyStepsForPath(path);

  return (
    <GuideLayout id="sunset">
      <PhaseBreadcrumb lifecyclePhase="Sunset" lifecyclePhaseHref="/sunset" />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForSunsetPhaseLanding()} />
      </section>

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        {landing.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <aside className="mt-8 rounded-lg border border-primary/30 bg-primary/5 px-6 py-5 md:px-7 md:py-6">
        <p className={guideCalloutLabel}>Scope</p>
        <p className={`${guideProseTight} mt-2`}>
          {proseWithMixedLinks(landing.scope.text, {
            internal: landing.scope.internalLinks,
          })}
        </p>
      </aside>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="replace-or-retire">
        <h2 className={`${guideSectionTitle} mb-3`}>{landing.fork.title}</h2>
        <p className={`${guideProse} mb-4`}>{landing.fork.intro}</p>
        <InlineArrowLeadList items={landing.fork.bullets} />
        <p className={`${guideProse} mt-4`}>{landing.fork.close}</p>

        <div
          role="radiogroup"
          aria-label="Replace or retire path"
          className="mt-5 inline-flex rounded-full border border-border bg-background p-1"
        >
          {(
            [
              { key: "replace" as const, label: "Replace" },
              { key: "retire" as const, label: "Retire" },
            ] as const
          ).map((opt) => {
            const selected = path === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-controls={`${toggleId}-journey`}
                onClick={() => setPath(opt.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>

      <div id={`${toggleId}-journey`}>
        <SunsetJourneySection
          intro={landing.journeyIntro}
          footer={landing.journeyFooter}
          steps={visibleSteps}
        />
      </div>

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

      <SourcesBlock items={landing.sources} />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <div className="h-24" />
    </GuideLayout>
  );
}
