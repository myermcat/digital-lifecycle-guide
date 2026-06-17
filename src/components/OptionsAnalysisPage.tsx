import type { ReactNode } from "react";
import { OptionsLadder } from "@/components/OptionsLadder";
import { ReferenceArticleLayout } from "@/components/ReferenceArticleLayout";
import { PhaseFitCards } from "@/components/WeightedPhaseBlock";
import { SourcesBlock } from "@/components/SourcesBlock";
import { ThreadArticleLeadList, ThreadArticleSection } from "@/components/ThreadArticleSection";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import { OPTIONS_ANALYSIS } from "@/lib/options-analysis-content";
import { guideProseSpace } from "@/lib/guide-typography";

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
  const { startWithProblem, fieldOfOptions, howToWeigh, homework, byPhase } =
    OPTIONS_ANALYSIS;

  return (
    <ReferenceArticleLayout id="reference-options-analysis" title={OPTIONS_ANALYSIS.title}>
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
        <OptionsLadder items={fieldOfOptions.ladder} />
      </ThreadArticleSection>

      <ThreadArticleSection title={howToWeigh.title} sectionId={howToWeigh.id}>
        <p>{howToWeigh.intro}</p>
        <ThreadArticleLeadList
          items={howToWeigh.criteria.map((item) => ({
            lead: item.lead,
            body: item.placeholderLinks
              ? proseWithMixedLinks(item.body, { placeholder: item.placeholderLinks })
              : item.body,
          }))}
        />
        <p>
          {proseWithMixedLinks(OPTIONS_ANALYSIS.howToWeighClosing, {
            placeholder: OPTIONS_ANALYSIS.howToWeighClosingPlaceholderLinks,
          })}
        </p>
      </ThreadArticleSection>

      <ThreadArticleSection title={homework.title} sectionId={homework.id}>
        <p>{homework.body}</p>
      </ThreadArticleSection>

      <ThreadArticleSection title={byPhase.title} sectionId={byPhase.id}>
        <PhaseFitCards cards={byPhase.cards} />
      </ThreadArticleSection>

      <SourcesBlock items={OPTIONS_ANALYSIS.sources} />
    </ReferenceArticleLayout>
  );
}
