import { Link } from "@tanstack/react-router";
import { AgileProcurementAppendix } from "@/components/AgileProcurementAppendix";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { DescribingWhatYouBuy } from "@/components/DescribingWhatYouBuy";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideCallout } from "@/components/GuideCallout";
import { GuideTable } from "@/components/GuideTable";
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
import {
  guideBlockSubheading,
  guideListIndent,
  guidePageTitle,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";

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
        <p>{landing.intro.keyPointsIntro}</p>
        <ul className={`list-disc space-y-2 ${guideListIndent}`}>
          {landing.intro.keyPoints.map((point) => (
            <li key={point.lead}>
              <strong className="font-semibold text-foreground">{point.lead}</strong>{" "}
              {point.body}
            </li>
          ))}
        </ul>
      </section>

      <WhatStaysYoursBlock
        heading={landing.whatStaysYours.heading}
        intro={landing.whatStaysYours.intro}
        items={landing.whatStaysYours.items}
        close={landing.whatStaysYours.close}
      />

      <WhatYouAreBuyingBlock {...landing.whatYouAreBuying} />

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
        <GuideCallout compact className="mt-5" label="One caution">
          <div className="space-y-2.5">
            <p className="font-semibold text-foreground">
              {landing.workedExamples.caution.lead}
            </p>
            {landing.workedExamples.caution.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </GuideCallout>
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
          })}
        </p>
        <p className={`${guideProse} mt-3`}>{landing.whoseJobSplit.intro}</p>
        <GuideTable
          className="mt-3"
          columns={["Who", "What they are responsible for"]}
          rows={landing.whoseJobSplit.roles.map((role) => ({
            term: role.who,
            cells: [role.does],
          }))}
        />
        <p className={`${guideProse} mt-3`}>
          {proseWithMixedLinks(landing.whoseJobSplit.close, {
            placeholder: landing.whoseJobSplit.placeholderLinks,
          })}
        </p>
      </section>

      <section
        className="mt-10 md:mt-12 scroll-mt-24"
        id={landing.glossary.id}
      >
        <h2 className={`${guideSectionTitle} mb-3`}>{landing.glossary.heading}</h2>
        <p className={`${guideProse} mb-4`}>{landing.glossary.intro}</p>
        <GuideTable
          columns={landing.glossary.columns}
          rows={landing.glossary.terms.map((entry) => ({
            term: entry.term,
            short: "short" in entry ? entry.short : undefined,
            cells: [entry.when, entry.text],
          }))}
        />
        <p className={`${guideProse} mt-4`}>{landing.glossary.close}</p>
      </section>

      <ThreadByPhaseSection byPhase={landing.byPhase} />

      <AgileProcurementAppendix />

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
