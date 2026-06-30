import { EditorialNote } from "@/components/EditorialNote";
import { ProcurementJourneySection } from "@/components/ProcurementJourneySection";
import { ReferenceArticleLayout } from "@/components/ReferenceArticleLayout";
import { APPROVAL_JOURNEY } from "@/lib/approval-journey-content";
import { renderThreadWhoseJob } from "@/lib/thread-rich-content";
import { guideProseSpace, guideSectionTitle } from "@/lib/guide-typography";

export function ApprovalJourneyPage() {
  const { journey, notEveryGate, whoseJob } = APPROVAL_JOURNEY;

  return (
    <ReferenceArticleLayout
      id="reference-approval-journey"
      title={APPROVAL_JOURNEY.title}
      sources={APPROVAL_JOURNEY.sources}
    >
      <section className={guideProseSpace}>
        {APPROVAL_JOURNEY.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <ProcurementJourneySection
        sectionId="the-journey"
        heading="The journey"
        intro=""
        steps={journey.steps}
      />

      <EditorialNote className="mt-10 md:mt-12 scroll-mt-24" label="Not every service hits every gate">
        <p>{notEveryGate}</p>
      </EditorialNote>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="who-runs-the-gates">
        <h2 className={`${guideSectionTitle} mb-3`}>Who runs the gates</h2>
        {renderThreadWhoseJob(whoseJob)}
      </section>
    </ReferenceArticleLayout>
  );
}
