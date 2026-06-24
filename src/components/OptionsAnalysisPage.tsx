import type { ReactNode } from "react";
import { OptionsAlternativeGrid } from "@/components/OptionsAlternativeGrid";
import { ReferenceArticleLayout } from "@/components/ReferenceArticleLayout";
import { PhaseFitCards } from "@/components/WeightedPhaseBlock";
import { InlineArrowLeadList } from "@/lib/guide-lists";
import { ThreadArticleSection } from "@/components/ThreadArticleSection";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import { OPTIONS_ANALYSIS } from "@/lib/options-analysis-content";
import { guideProse, guideProseSpace } from "@/lib/guide-typography";
import optionsAnalysisLifecycle from "@/assets/options_analysis_lifecycle.svg?url";

const OPTIONS_ANALYSIS_LIFECYCLE_ALT =
  "An Options analysis box on the left, the first step, with an arrow into the lifecycle: Create, then Live, then Sunset. A faint dashed arrow loops from Sunset back to Options analysis, showing it is revisited when weighing a replacement.";

function renderProblemParagraph(
  paragraph: string,
  index: number,
): React.ReactNode {
  const links =
    OPTIONS_ANALYSIS.startWithProblem.placeholderParagraphLinks?.filter(
      (item) => item.index === index,
    ) ?? [];
  if (links.length > 0) {
    return proseWithMixedLinks(paragraph, { placeholder: links });
  }
  return paragraph;
}

export function OptionsAnalysisPage() {
  const { startWithProblem, fieldOfOptions, howToWeigh, homework, byPhase, whyThisMatters } =
    OPTIONS_ANALYSIS;

  return (
    <ReferenceArticleLayout
      id="reference-options-analysis"
      title={OPTIONS_ANALYSIS.title}
      sources={OPTIONS_ANALYSIS.sources}
    >
      <figure className="mb-8 md:mb-10">
        <img
          src={optionsAnalysisLifecycle}
          alt={OPTIONS_ANALYSIS_LIFECYCLE_ALT}
          className="w-full h-auto"
          width={820}
          height={235}
        />
      </figure>

      <section className={guideProseSpace}>
        {OPTIONS_ANALYSIS.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <ThreadArticleSection
        title={startWithProblem.title}
        sectionId={startWithProblem.id}
        isFirst
      >
        {startWithProblem.paragraphs.map((paragraph, index) => (
          <p key={paragraph}>{renderProblemParagraph(paragraph, index)}</p>
        ))}
      </ThreadArticleSection>

      <ThreadArticleSection title={fieldOfOptions.title} sectionId={fieldOfOptions.id}>
        <p className={`${guideProse} mb-5`}>{fieldOfOptions.intro}</p>
        <OptionsAlternativeGrid items={fieldOfOptions.ladder} />
      </ThreadArticleSection>

      <ThreadArticleSection title={howToWeigh.title} sectionId={howToWeigh.id}>
        <p>{howToWeigh.intro}</p>
        <InlineArrowLeadList
          items={howToWeigh.criteria.map((item) => ({
            lead: item.lead,
            body: item.body,
            placeholderLinks: item.placeholderLinks,
          }))}
        />
        <p>
          {proseWithMixedLinks(OPTIONS_ANALYSIS.howToWeighClosing, {
            placeholder: OPTIONS_ANALYSIS.howToWeighClosingPlaceholderLinks,
          })}
        </p>
      </ThreadArticleSection>

      <ThreadArticleSection title={homework.title} sectionId={homework.id}>
        {homework.paragraphs.map((paragraph) =>
          typeof paragraph === "string" ? (
            <p key={paragraph}>{paragraph}</p>
          ) : (
            <p key={paragraph.text}>
              {proseWithMixedLinks(paragraph.text, { external: paragraph.externalLinks })}
            </p>
          ),
        )}
      </ThreadArticleSection>

      <ThreadArticleSection title={byPhase.title} sectionId={byPhase.id}>
        <PhaseFitCards cards={byPhase.cards} />
      </ThreadArticleSection>

      <ThreadArticleSection title={whyThisMatters.title} sectionId={whyThisMatters.id}>
        <p>
          {proseWithMixedLinks(whyThisMatters.body, {
            external: whyThisMatters.externalLinks,
          })}
        </p>
      </ThreadArticleSection>
    </ReferenceArticleLayout>
  );
}
