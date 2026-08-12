import { Link } from "@tanstack/react-router";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { DescribingWhatYouBuy } from "@/components/DescribingWhatYouBuy";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideCallout } from "@/components/GuideCallout";
import { GuideLayout } from "@/components/GuideLayout";
import { PracticeCardGroup } from "@/components/PracticeCard";
import { GoodContractCallout } from "@/components/GoodContractCallout";
import { ProcurementJourneySection } from "@/components/ProcurementJourneySection";
import { PageFoot } from "@/components/PageFoot";
import { ThreadInstruments } from "@/components/ThreadInstruments";
import { proseWithExternalLinks, proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import { TraditionalAgileComparison } from "@/components/TraditionalAgileComparison";
import { ThreadByPhaseSection } from "@/components/ThreadByPhaseSection";
import { WhatStaysYoursBlock } from "@/components/WhatStaysYoursBlock";
import { WhatYouAreBuyingBlock } from "@/components/WhatYouAreBuyingBlock";
import {
  PROCUREMENT_GOOD_LOOKS_CARDS,
  PROCUREMENT_LANDING,
} from "@/lib/procurement-landing";
import { SEE_ALSO } from "@/lib/see-also";
import { guideListIndent, guidePageTitle, guideProse, guideProseSpace, guideSectionTitle } from "@/lib/guide-typography";

export function ProcurementLandingPage() {
  const landing = PROCUREMENT_LANDING;

  return (
    <GuideLayout id="thread-procurement">
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <span className="text-foreground/80">{landing.title}</span>
        </nav>
        <h1 className={`mt-4 ${guidePageTitle}`}>
          {landing.title}
        </h1>
        <div className="mt-4 h-px w-16 bg-border" />
      </header>

      <section className={guideProseSpace}>
        {landing.intro.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <WhatStaysYoursBlock
        heading={landing.whatStaysYours.heading}
        intro={landing.whatStaysYours.intro}
        items={landing.whatStaysYours.items}
        close={landing.whatStaysYours.close}
      />

      <WhatYouAreBuyingBlock {...landing.whatYouAreBuying} />

      <GuideCallout
        className="mt-10 md:mt-12"
        label={landing.aiCaveat.label}
        title={landing.aiCaveat.heading}
      >
        <div className="space-y-3">
          <p className="font-semibold text-foreground">{landing.aiCaveat.lead}</p>
          {landing.aiCaveat.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="font-semibold text-foreground">{landing.aiCaveat.close}</p>
        </div>
      </GuideCallout>

      <ProcurementJourneySection intro={landing.journeyIntro} steps={landing.journeySteps} />

      <GoodContractCallout />

      <DescribingWhatYouBuy />

      <section
        className="mt-10 md:mt-12 scroll-mt-24"
        id={landing.workedExamples.id}
      >
        <h2 className={`${guideSectionTitle} mb-3`}>
          {landing.workedExamples.heading}
        </h2>
        <p className={`${guideProse} mb-4`}>{landing.workedExamples.intro}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {landing.workedExamples.cases.map((example) => (
            <div
              key={example.title}
              className="rounded-lg border border-border bg-card px-4 py-3.5"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {example.label}
              </p>
              <p className="mt-1.5 font-semibold text-foreground">{example.title}</p>
              <ul className={`${guideProse} mt-2 list-disc space-y-1 ${guideListIndent}`}>
                {example.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
              <p className={`${guideProse} mt-2.5 text-foreground/80`}>
                {example.verdict}
              </p>
            </div>
          ))}
        </div>
        <p className={`${guideProse} mt-5`}>{landing.workedExamples.testIntro}</p>
        <dl className="mt-3 space-y-3">
          {landing.workedExamples.test.map((entry) => (
            <div key={entry.term}>
              <dt className="font-semibold text-foreground">{entry.term}</dt>
              <dd className={`${guideProse} mt-0.5 text-foreground/80`}>{entry.text}</dd>
            </div>
          ))}
        </dl>
        <p className={`${guideProse} mt-4 font-semibold`}>
          {landing.workedExamples.close}
        </p>
      </section>

      <section
        className="mt-10 md:mt-12 scroll-mt-24"
        id={landing.contractParts.id}
      >
        <h2 className={`${guideSectionTitle} mb-3`}>
          {landing.contractParts.heading}
        </h2>
        <p className={`${guideProse} mb-4`}>{landing.contractParts.intro}</p>
        <ol className={`${guideProse} list-decimal space-y-2 ${guideListIndent}`}>
          {landing.contractParts.parts.map((part) => (
            <li key={part.term}>
              <span className="font-semibold text-foreground">{part.term}.</span>{" "}
              {part.text}
            </li>
          ))}
        </ol>
        <p className={`${guideProse} mt-4`}>{landing.contractParts.order}</p>
        <p className={`${guideProse} mt-3`}>{landing.contractParts.close}</p>
      </section>

      <section
        className="mt-10 md:mt-12 scroll-mt-24"
        id={landing.glossary.id}
      >
        <h2 className={`${guideSectionTitle} mb-3`}>{landing.glossary.heading}</h2>
        <p className={`${guideProse} mb-4`}>{landing.glossary.intro}</p>
        <dl className="space-y-3">
          {landing.glossary.terms.map((entry) => (
            <div
              key={entry.term}
              className="rounded-md border border-border/70 bg-background/50 px-3.5 py-3"
            >
              <dt className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-semibold text-foreground">{entry.term}</span>
                {"short" in entry && entry.short ? (
                  <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                    {entry.short}
                  </span>
                ) : null}
              </dt>
              <dd className="mt-1 text-[0.9rem] leading-snug text-foreground/80">
                {entry.text}
              </dd>
            </div>
          ))}
        </dl>
        <p className={`${guideProse} mt-4`}>{landing.glossary.close}</p>
      </section>

      <TraditionalAgileComparison
        rows={landing.comparisonRows}
        caption={landing.comparisonCaption}
      />

      <CaseStudyBlock
        className="mt-8"
        id="case-study"
        title={landing.caseStudy.title}
        actual={landing.caseStudy.risky}
        alternative={landing.caseStudy.safer}
      />

      <section className="mt-10 md:mt-12 scroll-mt-24" id="what-good-looks-like">
        <h2 className={`${guideSectionTitle} mb-2`}>What good looks like</h2>
        <p className={`${guideProse} mb-4`}>{landing.goodLooksIntro}</p>
        <PracticeCardGroup cards={PROCUREMENT_GOOD_LOOKS_CARDS} numbered />
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="why-it-matters">
        <h2 className={`${guideSectionTitle} mb-3`}>Why it matters</h2>
        <div className={guideProseSpace}>
          {landing.whyItMatters.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="whose-job">
        <h2 className={`${guideSectionTitle} mb-3`}>Whose job it is</h2>
        <p className={guideProse}>
          {proseWithMixedLinks(landing.whoseJob.text, {
            external: landing.whoseJob.externalLinks,
            placeholder: landing.whoseJob.placeholderLinks,
          })}
        </p>
      </section>

      <ThreadByPhaseSection byPhase={landing.byPhase} />

      <ThreadInstruments thread="procurement" threadTitle="Procurement" />


      <PageFoot
        support="procurement"
        furtherReading={proseWithExternalLinks(
          landing.furtherReading.text,
          landing.furtherReading.externalLinks ?? [],
        )}
        seeAlso={SEE_ALSO.procurement}
        sources={landing.sources}
      />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
