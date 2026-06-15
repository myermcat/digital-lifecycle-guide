import { ReferenceArticleLayout } from "@/components/ReferenceArticleLayout";
import { ThreadArticleSection } from "@/components/ThreadArticleSection";
import { MANAGING_WHAT_YOU_BOUGHT } from "@/lib/managing-what-you-bought-content";
import { guideProseSpace } from "@/lib/guide-typography";

export function ManagingWhatYouBoughtPage() {
  return (
    <ReferenceArticleLayout
      id="reference-managing-what-you-bought"
      title={MANAGING_WHAT_YOU_BOUGHT.title}
    >
      <section className={guideProseSpace}>
        {MANAGING_WHAT_YOU_BOUGHT.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      {MANAGING_WHAT_YOU_BOUGHT.sections.map((section) => (
        <ThreadArticleSection
          key={section.id}
          title={section.title}
          sectionId={section.id}
        >
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ThreadArticleSection>
      ))}
    </ReferenceArticleLayout>
  );
}
