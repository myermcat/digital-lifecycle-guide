import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { EditorialNote } from "@/components/EditorialNote";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { ThreadByPhaseSection } from "@/components/ThreadByPhaseSection";
import { PageFoot } from "@/components/PageFoot";
import { ThreadCoreStrip } from "@/components/ThreadCoreStrip";
import { GuideArrowBullet } from "@/lib/guide-lists";
import {
  CHANGE_MANAGEMENT_CONVERGE_DIAGRAM_ALT,
  CHANGE_MANAGEMENT_THREAD,
} from "@/lib/change-management-thread-content";
import { CHANGE_MANAGEMENT_CORE_STRIP } from "@/lib/thread-core-strip";
import { SEE_ALSO } from "@/lib/see-also";
import {
  renderLinkedProse,
  renderThreadSections,
  renderThreadWhoseJob,
  renderThreadWhyItMattersPitch,
} from "@/lib/thread-rich-content";
import {
  guideArrowList,
  guidePageTitle,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";
import changeManagementConverge from "@/assets/change_management_converge.svg?url";

function ToggleStepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

export function ChangeManagementThreadPage() {
  const {
    title,
    lead,
    twoTracksOneOutcome,
    whatGoodLooksLike,
    whyItMatters,
    closerLook,
    whoseJob,
    twoWaysComparison,
    byPhase,
    furtherReading,
    sources,
  } = CHANGE_MANAGEMENT_THREAD;

  return (
    <GuideLayout id={`thread-${CHANGE_MANAGEMENT_THREAD.slug}`}>
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <span className="text-foreground/80">{title}</span>
        </nav>
        <h1 className={`mt-4 ${guidePageTitle}`}>{title}</h1>
        <div className="mt-4 h-px w-16 bg-border" />
      </header>

      <section className={guideProseSpace}>
        {lead.map((paragraph) => (
          <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
        ))}
      </section>

      <figure className="mb-8 md:mb-10">
        <img
          src={changeManagementConverge}
          alt={CHANGE_MANAGEMENT_CONVERGE_DIAGRAM_ALT}
          className="w-full h-auto"
          width={900}
          height={380}
        />
      </figure>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={twoTracksOneOutcome.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{twoTracksOneOutcome.title}</h2>
        {renderThreadSections(twoTracksOneOutcome.sections)}
      </section>

      <ThreadCoreStrip content={CHANGE_MANAGEMENT_CORE_STRIP} />

      <section className="mt-10 md:mt-12 scroll-mt-24" id="what-good-looks-like">
        <h2 className={`${guideSectionTitle} mb-3`}>What good looks like</h2>
        <ul className={guideArrowList}>
          {whatGoodLooksLike.map((item) => (
            <li key={item.text} className="flex items-start gap-2.5">
              <GuideArrowBullet />
              <p className={guideProse}>{renderLinkedProse(item)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="why-it-matters">
        <h2 className={`${guideSectionTitle} mb-3`}>Why it matters</h2>
        {renderThreadWhyItMattersPitch(whyItMatters)}
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={closerLook.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{closerLook.title}</h2>
        <p className={`${guideProse} mb-4`}>{renderLinkedProse(closerLook.intro)}</p>
        <EditorialNote label="Example" className="mb-4">
          <p className="font-semibold">{closerLook.exampleNote.title}</p>
          <div className="mt-2">{renderThreadSections(closerLook.exampleNote.sections)}</div>
        </EditorialNote>
        <Accordion type="single" collapsible className="mt-4 rounded-lg border border-border bg-card">
          {closerLook.blocks.map((block, index) => (
            <AccordionItem key={block.title} value={block.title}>
              <AccordionTrigger className="gap-3 px-5 py-4 text-left hover:no-underline">
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <ToggleStepNumber n={index + 1} />
                  <span className="font-serif text-base font-semibold text-primary">
                    {block.title}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4">
                {renderThreadSections(block.sections)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="whose-job">
        <h2 className={`${guideSectionTitle} mb-3`}>Whose job it is</h2>
        {renderThreadWhoseJob(whoseJob)}
      </section>

      <CaseStudyBlock
        id={twoWaysComparison.id}
        className="mt-10 md:mt-12"
        label="Comparison"
        title={twoWaysComparison.title}
        actual={twoWaysComparison.risky}
        alternative={twoWaysComparison.safe}
      />

      <ThreadByPhaseSection byPhase={byPhase} />

      <PageFoot
        support="change-management"
        furtherReading={renderLinkedProse(furtherReading)}
        seeAlso={SEE_ALSO["change-management"]}
        sources={sources}
      />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
