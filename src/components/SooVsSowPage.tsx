import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { ReferenceArticleLayout } from "@/components/ReferenceArticleLayout";
import { ThreadArticleSection } from "@/components/ThreadArticleSection";
import { guideArticleCalloutLift } from "@/lib/guide-article";
import { SOO_VS_SOW } from "@/lib/soo-vs-sow-content";
import { guideProseSpace } from "@/lib/guide-typography";

export function SooVsSowPage() {
  const { comparison } = SOO_VS_SOW;

  return (
    <ReferenceArticleLayout
      id="reference-soo-vs-sow"
      title={SOO_VS_SOW.title}
      sources={SOO_VS_SOW.sources}
    >
      <section className={guideProseSpace}>
        <p>{SOO_VS_SOW.opening}</p>
      </section>

      <ThreadArticleSection
        title={SOO_VS_SOW.whatEachOneIs.title}
        sectionId={SOO_VS_SOW.whatEachOneIs.id}
        isFirst
      >
        <p>{SOO_VS_SOW.whatEachOneIs.body}</p>
      </ThreadArticleSection>

      <CaseStudyBlock
        className={guideArticleCalloutLift}
        actual={comparison.sow}
        alternative={comparison.soo}
        actualLabel={comparison.actualLabel}
        alternativeLabel={comparison.alternativeLabel}
      />

      <ThreadArticleSection
        title={SOO_VS_SOW.workTogether.title}
        sectionId={SOO_VS_SOW.workTogether.id}
      >
        <p>{SOO_VS_SOW.workTogether.body}</p>
      </ThreadArticleSection>

      <ThreadArticleSection
        title={SOO_VS_SOW.workedExample.title}
        sectionId={SOO_VS_SOW.workedExample.id}
      >
        {SOO_VS_SOW.workedExample.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </ThreadArticleSection>
    </ReferenceArticleLayout>
  );
}
