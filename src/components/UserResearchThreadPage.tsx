import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { ThreadByPhaseSection } from "@/components/ThreadByPhaseSection";
import { PageFoot } from "@/components/PageFoot";
import { ThreadCoreStrip } from "@/components/ThreadCoreStrip";
import { GuideArrowBullet } from "@/lib/guide-lists";
import { USER_RESEARCH_THREAD } from "@/lib/user-research-thread-content";
import { USER_RESEARCH_CORE_STRIP } from "@/lib/thread-core-strip";
import {
  renderLinkedProse,
  renderThreadLead,
  renderThreadSections,
  renderThreadWhoseJob,
} from "@/lib/thread-rich-content";
import {
  guideArrowList,
  guidePageTitle,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";

function ToggleStepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

export function UserResearchThreadPage() {
  const {
    title,
    lead,
    whatGoodLooksLike,
    whyItMatters,
    whoseJob,
    closerLook,
    twoWaysComparison,
    byPhase,
    furtherReading,
    sources,
  } = USER_RESEARCH_THREAD;

  return (
    <GuideLayout id={`thread-${USER_RESEARCH_THREAD.slug}`}>
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

      <section className={guideProseSpace}>{renderThreadLead(lead)}</section>

      <ThreadCoreStrip content={USER_RESEARCH_CORE_STRIP} />

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
        <p className={guideProse}>{renderLinkedProse(whyItMatters)}</p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="whose-job">
        <h2 className={`${guideSectionTitle} mb-3`}>Whose job it is</h2>
        {renderThreadWhoseJob(whoseJob)}
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={closerLook.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{closerLook.title}</h2>
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
        support="user-research"
        furtherReading={renderLinkedProse(furtherReading)}
        sources={sources}
      />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
