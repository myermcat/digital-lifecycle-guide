import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReferenceArticleLayout } from "@/components/ReferenceArticleLayout";
import { ThreadArticleSection } from "@/components/ThreadArticleSection";
import { ThreadWhoseJobIconList } from "@/components/ThreadWhoseJobIconList";
import { renderLinkedProse, renderThreadSections } from "@/lib/thread-rich-content";
import {
  TREASURY_BOARD_SUBMISSION,
  TREASURY_BOARD_SUBMISSION_THRESHOLD_ALT,
} from "@/lib/treasury-board-submission-content";
import { FUNDING_REFERENCE_BREADCRUMB } from "@/lib/funding-thread-content";
import { guideProse, guideProseSpace, guideProseTight, guideSectionTitle } from "@/lib/guide-typography";
import fundingThreshold from "@/assets/funding_threshold.svg?url";

function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

export function TreasuryBoardSubmissionPage() {
  const {
    lead,
    whenNeeded,
    whatToPrepare,
    howItGoes,
    oneOfSeveralApprovals,
    whoseJob,
    furtherReading,
    sources,
  } = TREASURY_BOARD_SUBMISSION;

  return (
    <ReferenceArticleLayout
      id="thread-funding-treasury-board-submission"
      title={TREASURY_BOARD_SUBMISSION.title}
      breadcrumbParent={FUNDING_REFERENCE_BREADCRUMB}
      support="treasury-board-submission"
      sources={sources}
      furtherReading={
        <ul className="space-y-2 list-none pl-0">
          {furtherReading.map((item) => (
            <li key={item.text}>{renderLinkedProse(item)}</li>
          ))}
        </ul>
      }
    >
      <section className={guideProseSpace}>
        {lead.map((paragraph) => (
          <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
        ))}
      </section>

      <ThreadArticleSection
        title={whenNeeded.title}
        sectionId={whenNeeded.id}
        isFirst
      >
        <figure className="mb-6">
          <img
            src={fundingThreshold}
            alt={TREASURY_BOARD_SUBMISSION_THRESHOLD_ALT}
            className="w-full h-auto max-w-2xl"
            width={760}
            height={450}
          />
        </figure>
        {renderThreadSections(whenNeeded.sections)}
      </ThreadArticleSection>

      <ThreadArticleSection title={whatToPrepare.title} sectionId={whatToPrepare.id}>
        <p>{whatToPrepare.intro}</p>
        <ol className="mt-5 list-none space-y-5 pl-0">
          {whatToPrepare.items.map((item, index) => (
            <li key={item.title} className="flex items-start gap-2 md:gap-3">
              <span className="w-5 shrink-0 text-right font-semibold tabular-nums text-foreground/90">
                {index + 1}.
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground/90">{item.title}</p>
                <p className={`${guideProse} mt-1`}>{renderLinkedProse(item)}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5">{whatToPrepare.closing}</p>
      </ThreadArticleSection>

      <ThreadArticleSection title={howItGoes.title} sectionId={howItGoes.id}>
        <p>{howItGoes.intro}</p>
        <Accordion type="single" collapsible className="mt-5 rounded-lg border border-border bg-card">
          {howItGoes.items.map((step, index) => (
            <AccordionItem key={step.title} value={step.title}>
              <AccordionTrigger className="gap-3 px-5 py-4 text-left hover:no-underline">
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <StepNumber n={index + 1} />
                  <span className="font-serif text-base font-semibold text-primary">{step.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4">
                <p className={guideProseTight}>{renderLinkedProse(step)}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ThreadArticleSection>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={oneOfSeveralApprovals.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{oneOfSeveralApprovals.title}</h2>
        <p className={guideProse}>{renderLinkedProse(oneOfSeveralApprovals)}</p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="whose-job">
        <h2 className={`${guideSectionTitle} mb-3`}>Whose job it is</h2>
        <ThreadWhoseJobIconList {...whoseJob} />
      </section>
    </ReferenceArticleLayout>
  );
}
