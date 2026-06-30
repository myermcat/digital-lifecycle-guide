import { ReferenceArticleLayout } from "@/components/ReferenceArticleLayout";
import { ThreadArticleSection } from "@/components/ThreadArticleSection";
import { renderLinkedProse } from "@/lib/thread-rich-content";
import { COSTING_A_SERVICE } from "@/lib/costing-a-service-content";
import { FUNDING_REFERENCE_BREADCRUMB } from "@/lib/funding-thread-content";
import { ArrowLeadList } from "@/lib/guide-lists";
import { guideFormulaLine, guideProse, guideProseSpace } from "@/lib/guide-typography";

export function CostingAServicePage() {
  const { lead, confidenceRange, sources } = COSTING_A_SERVICE;

  return (
    <ReferenceArticleLayout
      id="thread-funding-costing-a-service"
      title={COSTING_A_SERVICE.title}
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
        title={confidenceRange.title}
        sectionId={confidenceRange.id}
        isFirst
      >
        <p>{confidenceRange.intro}</p>
        <ArrowLeadList
          className="mt-5"
          items={confidenceRange.items.map((item) => ({
            lead: item.lead,
            body: item.body,
          }))}
        />
        <p className="mt-5">{confidenceRange.closing}</p>
        <p
          className={`mt-4 rounded-md border border-border/80 bg-muted/35 px-3 py-1.5 ${guideFormulaLine}`}
        >
          {confidenceRange.formula}
        </p>
        <p className={`${guideProse} mt-5`}>
          {renderLinkedProse(confidenceRange.guideClosing)}
        </p>
      </ThreadArticleSection>
    </ReferenceArticleLayout>
  );
}
