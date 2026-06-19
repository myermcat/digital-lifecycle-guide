import { Link } from "@tanstack/react-router";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { PhaseFitCards } from "@/components/WeightedPhaseBlock";
import { SourcesBlock } from "@/components/SourcesBlock";
import { ThreadArticleSection } from "@/components/ThreadArticleSection";
import { guideArticleMeasure } from "@/lib/guide-article";
import { DESIGN_FOR_WHOLE_JOURNEY } from "@/lib/design-for-whole-journey-content";
import { PHASES } from "@/lib/guide-strings";
import { guidePageTitle } from "@/lib/guide-typography";
import wholeJourneyVisual from "@/assets/building_a_life_in_canada_whole_journey.svg?url";

const WHOLE_JOURNEY_VISUAL_ALT =
  "Eleven steps in order across federal, provincial, and private services: get permission to come (IRCC, highlighted), labour market assessment (ESDC), enter Canada (CBSA), Social Insurance Number (Service Canada), bank account (private), health card (province), driver's licence (province), recognise credentials (regulator), enrol kids in school (province), taxes and child benefit (CRA), PR renewal and citizenship (IRCC).";

export function DesignForWholeJourneyPage() {
  const {
    title,
    mostPeopleDoNotWant,
    seeingTheBiggerPicture,
    buildingALifeInCanada,
    yourServiceIsOneBox,
    whereToGoNext,
    sources,
  } = DESIGN_FOR_WHOLE_JOURNEY;

  return (
    <GuideLayout id="design-for-whole-journey">
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <Link to={PHASES.create.href} className="hover:text-foreground transition-colors">
            {PHASES.create.title}
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <Link to="/create-discovery" className="hover:text-foreground transition-colors">
            Discovery
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <span className="text-foreground/80">{title}</span>
        </nav>
        <h1 className={`mt-4 ${guidePageTitle}`}>{title}</h1>
        <div className="mt-4 h-px w-16 bg-border" />
      </header>

      <div className={guideArticleMeasure}>
        <ThreadArticleSection
          title={mostPeopleDoNotWant.title}
          sectionId={mostPeopleDoNotWant.id}
          isFirst
        >
          {mostPeopleDoNotWant.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ThreadArticleSection>

        <ThreadArticleSection
          title={seeingTheBiggerPicture.title}
          sectionId={seeingTheBiggerPicture.id}
        >
          {seeingTheBiggerPicture.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ThreadArticleSection>

        <ThreadArticleSection
          title={buildingALifeInCanada.title}
          sectionId={buildingALifeInCanada.id}
        >
          <p>{buildingALifeInCanada.intro}</p>
          <p>{buildingALifeInCanada.amaraJourney}</p>

          <figure className="my-6 md:my-8 -mx-2 sm:mx-0">
            <img
              src={wholeJourneyVisual}
              alt={WHOLE_JOURNEY_VISUAL_ALT}
              className="w-full h-auto"
              width={800}
              height={250}
            />
          </figure>

          {buildingALifeInCanada.afterVisual.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ThreadArticleSection>

        <ThreadArticleSection title={yourServiceIsOneBox.title} sectionId={yourServiceIsOneBox.id}>
          {yourServiceIsOneBox.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ThreadArticleSection>

        <ThreadArticleSection title={whereToGoNext.title} sectionId={whereToGoNext.id}>
          <PhaseFitCards cards={whereToGoNext.cards} />
        </ThreadArticleSection>

        <SourcesBlock items={sources} />
      </div>

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
