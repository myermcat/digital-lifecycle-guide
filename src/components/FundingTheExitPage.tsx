import { ReferenceArticleLayout } from "@/components/ReferenceArticleLayout";
import { ThreadArticleSection } from "@/components/ThreadArticleSection";
import { renderLinkedProse } from "@/lib/thread-rich-content";
import { FUNDING_THE_EXIT } from "@/lib/funding-the-exit-content";
import { FUNDING_REFERENCE_BREADCRUMB } from "@/lib/funding-thread-content";
import { ArrowLeadList } from "@/lib/guide-lists";
import { guideProseSpace } from "@/lib/guide-typography";

export function FundingTheExitPage() {
  const { lead, whatCostsMoney, sources } = FUNDING_THE_EXIT;

  return (
    <ReferenceArticleLayout
      id="thread-funding-funding-the-exit"
      title={FUNDING_THE_EXIT.title}
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
        title={whatCostsMoney.title}
        sectionId={whatCostsMoney.id}
        isFirst
      >
        <ArrowLeadList
          items={whatCostsMoney.items.map((item) => ({
            lead: item.lead,
            body: item.internalLinks
              ? renderLinkedProse({ text: item.body, internalLinks: item.internalLinks })
              : item.body,
          }))}
        />
        <p className="mt-5">{whatCostsMoney.closing}</p>
      </ThreadArticleSection>
    </ReferenceArticleLayout>
  );
}
