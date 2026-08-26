import { Link } from "@tanstack/react-router";
import { AgileProcurementAppendix } from "@/components/AgileProcurementAppendix";
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
import { ThreadByPhaseSection } from "@/components/ThreadByPhaseSection";
import { WhatStaysYoursBlock } from "@/components/WhatStaysYoursBlock";
import { WhatYouAreBuyingBlock } from "@/components/WhatYouAreBuyingBlock";
import {
  PROCUREMENT_GOOD_LOOKS_CARDS,
  PROCUREMENT_LANDING,
} from "@/lib/procurement-landing";
import { SEE_ALSO } from "@/lib/see-also";
import {
  guideArrowList,
  guideBlockSubheading,
  guideCalloutLabel,
  guideListIndent,
  guidePageTitle,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";
import { UI } from "@/lib/ui-strings";

export function ProcurementLandingPage() {
  const landing = PROCUREMENT_LANDING;

  return (
    <GuideLayout id="thread-procurement">
      <header className="mb-8 md:mb-10">
        <nav aria-label={UI.breadcrumb} className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            {UI.home}
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

      <section className="mt-8 md:mt-10 rounded-lg border border-border bg-card px-6 py-6 shadow-sm md:px-8 md:py-7">
        <p className={guideCalloutLabel}>{landing.intro.keyPointsHeading}</p>
        <ul className={`${guideArrowList} mt-4 !pl-0`}>
          {landing.intro.keyPoints.map((point) => {
            const Icon = point.icon;
            return (
              <li key={point.lead} className="flex items-start gap-3">
                <Icon
                  aria-hidden="true"
                  className="mt-1 h-[1.15rem] w-[1.15rem] shrink-0 text-primary/70"
                  strokeWidth={1.6}
                />
                <p className={guideProse}>
                  <strong className="font-semibold text-foreground">{point.lead}</strong>{" "}
                  {proseWithMixedLinks(point.body, { anchor: point.anchorLinks })}
                </p>
              </li>
            );
          })}
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

      <section className="mt-10 md:mt-12 scroll-mt-24" id="what-good-looks-like">
        <h2 className={`${guideSectionTitle} mb-2`}>{UI.whatGoodLooksLike}</h2>
        <p className={`${guideProse} mb-4`}>{landing.goodLooksIntro}</p>
        <PracticeCardGroup cards={PROCUREMENT_GOOD_LOOKS_CARDS} numbered />
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="why-it-matters">
        <h2 className={`${guideSectionTitle} mb-3`}>{UI.whyItMatters}</h2>
        <div className={guideProseSpace}>
          {landing.whyItMatters.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="whose-job">
        <h2 className={`${guideSectionTitle} mb-3`}>{UI.whoseJobItIs}</h2>
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
