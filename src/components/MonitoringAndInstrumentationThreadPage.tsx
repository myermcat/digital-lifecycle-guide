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
import { LifecycleVisual } from "@/components/LifecycleVisual";
import { ThreadByPhaseSection } from "@/components/ThreadByPhaseSection";
import { PageFoot } from "@/components/PageFoot";
import { ThreadInstruments } from "@/components/ThreadInstruments";
import { GuideArrowBullet } from "@/lib/guide-lists";
import {
  MONITORING_BLIND_VS_SEEING_DIAGRAM_ALT,
  MONITORING_INSTRUMENT_SEE_ACT_DIAGRAM_ALT,
  MONITORING_THREAD,
} from "@/lib/monitoring-and-instrumentation-thread-content";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import { SEE_ALSO } from "@/lib/see-also";
import {
  renderLinkedProse,
  renderThreadSections,
  renderThreadWhoseJob,
  renderThreadWhyItMattersPitch,
} from "@/lib/thread-rich-content";
import {
  guideArrowList,
  guideCalloutLabel,
  guideKeyCallout,
  guideListIndent,
  guidePageTitle,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";
import monitoringBlindVsSeeing from "@/assets/monitoring_blind_vs_seeing.svg?url";
import monitoringInstrumentSeeAct from "@/assets/monitoring_instrument_see_act.svg?url";

function ToggleStepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

export function MonitoringAndInstrumentationThreadPage() {
  const {
    title,
    keyCallout,
    lead,
    whatGoodLooksLike,
    whatGoodLooksLikeFooter,
    whyItMatters,
    closerLook,
    whoseJob,
    twoWaysComparison,
    byPhase,
    furtherReading,
    sources,
  } = MONITORING_THREAD;

  return (
    <GuideLayout id={`thread-${MONITORING_THREAD.slug}`}>
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

      <figure className="mb-8 md:mb-10">
        <img
          src={monitoringInstrumentSeeAct}
          alt={MONITORING_INSTRUMENT_SEE_ACT_DIAGRAM_ALT}
          className="w-full h-auto"
          width={900}
          height={370}
        />
      </figure>

      <section className={guideProseSpace}>
        {lead.map((paragraph) => (
          <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
        ))}
      </section>

      <section className="mt-8 md:mt-10 rounded-lg border border-border bg-card px-6 py-6 shadow-sm md:px-8 md:py-7">
        <p className={guideCalloutLabel}>{MONITORING_THREAD.keyPoints.heading}</p>
        <ul className={`${guideArrowList} mt-4 !pl-0`}>
          {MONITORING_THREAD.keyPoints.items.map((point) => {
            const Icon = point.icon;
            return (
              <li key={point.lead} className="flex items-start gap-3">
                <Icon
                  aria-hidden="true"
                  className="mt-1 h-[1.15rem] w-[1.15rem] shrink-0 text-primary/70"
                  strokeWidth={1.6}
                />
                <p className={guideProse}>
                  <strong className="font-semibold text-foreground">{point.lead}</strong>{" "}
                  {point.body}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <figure className="mt-8 md:mt-10 mb-8 md:mb-10">
        <blockquote
          data-guide-block="key-callout"
          className={`${guideKeyCallout} m-0 mb-6 md:mb-8 text-center leading-tight`}
        >
          {keyCallout}
        </blockquote>
        <img
          src={monitoringBlindVsSeeing}
          alt={MONITORING_BLIND_VS_SEEING_DIAGRAM_ALT}
          className="block w-full h-auto"
          width={900}
          height={232}
        />
      </figure>

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
        <p className={`${guideProse} mt-4`}>{renderLinkedProse(whatGoodLooksLikeFooter)}</p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="why-it-matters">
        <h2 className={`${guideSectionTitle} mb-3`}>The cost of skipping it</h2>
        {renderThreadWhyItMattersPitch(whyItMatters)}
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={closerLook.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{closerLook.title}</h2>
        <p className={`${guideProse} mb-4`}>{renderLinkedProse(closerLook.intro)}</p>
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

      <LifecycleVisual visual={LIFECYCLE_VISUALS.serviceDashboard} className="mt-5" />

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

      <ThreadInstruments thread={MONITORING_THREAD.slug} threadTitle={MONITORING_THREAD.title} />


      <PageFoot
        support="monitoring-and-instrumentation"
        furtherReading={renderLinkedProse(furtherReading)}
        seeAlso={SEE_ALSO["monitoring-and-instrumentation"]}
        sources={sources}
      />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
