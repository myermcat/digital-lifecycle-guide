import { Link } from "@tanstack/react-router";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { PracticeCardGroup } from "@/components/PracticeCard";
import { GoodContractCallout } from "@/components/GoodContractCallout";
import { ProcurementJourneySection } from "@/components/ProcurementJourneySection";
import { PageFoot } from "@/components/PageFoot";
import { proseWithExternalLinks, proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import { TraditionalAgileComparison } from "@/components/TraditionalAgileComparison";
import { ThreadByPhaseSection } from "@/components/ThreadByPhaseSection";
import { WhatStaysYoursBlock } from "@/components/WhatStaysYoursBlock";
import {
  PROCUREMENT_GOOD_LOOKS_CARDS,
  PROCUREMENT_LANDING,
} from "@/lib/procurement-landing";
import { SEE_ALSO } from "@/lib/see-also";
import { guideLink, guidePageTitle, guideProse, guideProseSpace, guideSectionTitle } from "@/lib/guide-typography";

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
        <p>
          {landing.intro.managingLink.lead}{" "}
          <Link to={landing.intro.managingLink.to} className={guideLink}>
            {landing.intro.managingLink.phrase}
          </Link>
          .
        </p>
      </section>

      <WhatStaysYoursBlock
        heading={landing.whatStaysYours.heading}
        intro={landing.whatStaysYours.intro}
        items={landing.whatStaysYours.items}
        close={landing.whatStaysYours.close}
      />

      <ProcurementJourneySection intro={landing.journeyIntro} steps={landing.journeySteps} />

      <GoodContractCallout />

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
