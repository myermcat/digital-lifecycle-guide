import { ReferenceArticleLayout } from "@/components/ReferenceArticleLayout";
import { ThreadArticleSection } from "@/components/ThreadArticleSection";
import { STAYING_FUNDED } from "@/lib/staying-funded-content";
import { FUNDING_REFERENCE_BREADCRUMB } from "@/lib/funding-thread-content";
import { ArrowLeadList } from "@/lib/guide-lists";
import { guideProseSpace } from "@/lib/guide-typography";

export function StayingFundedPage() {
  const { lead, whatThisTakes, sources } = STAYING_FUNDED;

  return (
    <ReferenceArticleLayout
      id="thread-funding-staying-funded"
      title={STAYING_FUNDED.title}
      breadcrumbParent={FUNDING_REFERENCE_BREADCRUMB}
      support="funding"
      sources={sources}
    >
      <section className={guideProseSpace}>
        {lead.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <ThreadArticleSection
        title={whatThisTakes.title}
        sectionId={whatThisTakes.id}
        isFirst
      >
        <ArrowLeadList
          items={whatThisTakes.items.map((item) => ({
            lead: item.lead,
            body: item.body,
          }))}
        />
        <p className="mt-5">{whatThisTakes.closing}</p>
      </ThreadArticleSection>
    </ReferenceArticleLayout>
  );
}
