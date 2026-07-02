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
import { SecurityLifecycleStrip } from "@/components/SecurityLifecycleStrip";
import { ThreadByPhaseSection } from "@/components/ThreadByPhaseSection";
import { PageFoot } from "@/components/PageFoot";
import { GuideArrowBullet } from "@/lib/guide-lists";
import { securityLifecycleIconForLabel } from "@/lib/security-lifecycle-icons";
import {
  SECURITY_THREAD,
  type SecurityCloserLookBlock,
} from "@/lib/security-thread-content";
import { SEE_ALSO } from "@/lib/see-also";
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
  guideProseTight,
  guideSectionTitle,
} from "@/lib/guide-typography";

function ToggleStepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

function LifecycleAccordionIcon({ label }: { label: string }) {
  const Icon = securityLifecycleIconForLabel(label);
  return <Icon className="size-7 shrink-0 text-primary md:size-8" strokeWidth={1.75} aria-hidden />;
}

function renderCloserLookBlock(block: SecurityCloserLookBlock) {
  if (block.sections) {
    return renderThreadSections(block.sections);
  }

  if (!block.text) {
    return null;
  }

  return <p className={guideProseTight}>{renderLinkedProse(block)}</p>;
}

export function SecurityThreadPage() {
  const {
    title,
    lead,
    securityLifecycle,
    whatGoodLooksLike,
    whyItMatters,
    whoseJob,
    closerLook,
    twoWaysComparison,
    byPhase,
    furtherReading,
    sources,
  } = SECURITY_THREAD;

  return (
    <GuideLayout id={`thread-${SECURITY_THREAD.slug}`}>
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

      <SecurityLifecycleStrip content={securityLifecycle} />

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

        <div className="mb-6 overflow-x-auto pb-1">
          <ol className="flex min-w-max gap-2 list-none pl-0">
            {securityLifecycle.tiles.map((tile, index) => (
              <li
                key={tile.label}
                className="flex min-w-[4.5rem] flex-col items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2.5"
              >
                <ToggleStepNumber n={index + 1} />
                <span className="font-sans text-[11px] font-medium uppercase tracking-wide text-foreground/70">
                  {tile.label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <Accordion type="single" collapsible className="rounded-lg border border-border bg-card">
          {closerLook.blocks.map((block, index) => (
            <AccordionItem key={block.title} value={block.title}>
              <AccordionTrigger className="gap-3 px-5 py-4 text-left hover:no-underline">
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <LifecycleAccordionIcon label={securityLifecycle.tiles[index]?.label ?? ""} />
                  <span className="font-serif text-base font-semibold text-primary">
                    {block.title}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4">
                {renderCloserLookBlock(block)}
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
        support="security"
        furtherReading={renderLinkedProse(furtherReading)}
        seeAlso={SEE_ALSO.security}
        sources={sources}
      />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
