import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { EditorialNote } from "@/components/EditorialNote";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  GOOD_CONTRACT,
  type GoodContractClause,
  type GoodContractLinkedProse,
  type GoodContractScheduleTag,
} from "@/lib/good-contract-content";
import { THREADS } from "@/lib/guide-strings";
import {
  guidePageTitle,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
  guideSubsectionTitle,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

const contractPanelClassName =
  "relative overflow-hidden rounded-lg border border-[#c9bc9e]/70 bg-[#f8f4eb] px-6 py-7 md:px-9 md:py-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_2px_16px_rgba(44,36,22,0.07)]";

const contractSchedulesPanelClassName =
  "relative overflow-hidden rounded-lg border border-[#c9bc9e]/70 bg-[#f8f4eb] px-6 py-1 md:px-9 md:py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_2px_16px_rgba(44,36,22,0.07)]";

const contractBodyClassName =
  "font-serif text-base md:text-[1.05rem] leading-[1.55] text-[#3d362c]/90";

const contractAnnotationClassName =
  "font-serif text-sm italic leading-[1.5] text-[#4a4338]/58";

function renderLinkedProseBlock(prose: GoodContractLinkedProse) {
  return proseWithMixedLinks(prose.text, {
    external: prose.externalLinks,
    internal: prose.internalLinks,
    anchor: prose.anchorLinks,
    bold: prose.bold,
  });
}

function ScheduleTag({ tag }: { tag: GoodContractScheduleTag }) {
  const isStandard = tag === "standard";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 align-middle rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-medium uppercase tracking-[0.12em]",
        isStandard
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-amber-600/30 bg-amber-500/12 text-amber-900/85",
      )}
    >
      {isStandard ? "Standard, in every contract" : "Added for this service"}
    </span>
  );
}

function ContractClause({ clause }: { clause: GoodContractClause }) {
  return (
    <li className="flex items-start gap-3">
      <span className="shrink-0 font-semibold tabular-nums text-[#2f2920]/90">{clause.label}</span>
      <span>
        {clause.externalLinks
          ? proseWithMixedLinks(clause.text, { external: clause.externalLinks })
          : clause.text}
      </span>
    </li>
  );
}

function ContractSchedulesAccordion({
  openSchedule,
  onOpenSchedule,
}: {
  openSchedule: string | undefined;
  onOpenSchedule: (id: string | undefined) => void;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      value={openSchedule}
      onValueChange={onOpenSchedule}
      className="relative"
    >
      {GOOD_CONTRACT.schedules.map((schedule) => (
        <AccordionItem
          key={schedule.id}
          id={schedule.id}
          value={schedule.id}
          className="scroll-mt-24 border-b border-[#c9bc9e]/60 last:border-b-0"
        >
          <AccordionTrigger className="gap-3 py-3.5 text-left hover:no-underline [&[data-state=open]]:pb-2">
            <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2 pr-2">
              <span className={`${guideSubsectionTitle} text-[#2f2920]`}>{schedule.heading}</span>
              <ScheduleTag tag={schedule.tag} />
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-0">
            <p className={contractAnnotationClassName}>{schedule.purpose}</p>
            <ol className={`mt-4 list-none space-y-2.5 ${contractBodyClassName}`}>
              {schedule.clauses.map((clause) => (
                <ContractClause key={clause.label} clause={clause} />
              ))}
            </ol>
            <p className={`mt-4 ${contractAnnotationClassName}`}>
              {renderLinkedProseBlock(schedule.whyHere)}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function GoodContractPage() {
  const [openSchedule, setOpenSchedule] = useState<string | undefined>("schedule-a");

  function jumpToSchedule(scheduleId: string) {
    setOpenSchedule(scheduleId);
    requestAnimationFrame(() => {
      document.getElementById(scheduleId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const tagLegendLead = GOOD_CONTRACT.howToRead.intro.at(-1)?.text ?? "";

  return (
    <GuideLayout id="reference-good-contract">
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <Link
            to={THREADS.procurement.path}
            className="hover:text-foreground transition-colors"
          >
            {THREADS.procurement.title}
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <span className="text-foreground/80">{GOOD_CONTRACT.title}</span>
        </nav>
        <h1 className={`mt-4 ${guidePageTitle}`}>{GOOD_CONTRACT.title}</h1>
        <div className="mt-4 h-px w-16 bg-border" />
      </header>

      <section className={guideProseSpace}>
        {GOOD_CONTRACT.lead.map((paragraph) => (
          <p key={paragraph.text} className={guideProse}>
            {proseWithMixedLinks(paragraph.text, {
              external: paragraph.externalLinks,
              internal: paragraph.internalLinks,
            })}
          </p>
        ))}
        <EditorialNote label="Example">{GOOD_CONTRACT.exampleNote}</EditorialNote>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="how-to-read">
        <h2 className={`${guideSectionTitle} mb-3`}>How to read this contract</h2>
        <div className={guideProseSpace}>
          {GOOD_CONTRACT.howToRead.intro.slice(0, -1).map((paragraph) => (
            <p key={paragraph.text}>{renderLinkedProseBlock(paragraph)}</p>
          ))}
          <p>
            {tagLegendLead}{" "}
            <ScheduleTag tag="standard" /> means it is conventional, in nearly every service
            contract; <ScheduleTag tag="tailored" /> means we wrote it in because of what the
            grant portal is and the information it holds.
          </p>
        </div>
        <nav aria-label="Contract schedules" className="mt-6">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 list-none p-0 font-sans text-sm">
            {GOOD_CONTRACT.schedules.map((schedule) => (
              <li key={schedule.id}>
                <button
                  type="button"
                  onClick={() => jumpToSchedule(schedule.id)}
                  className="inline-flex items-center gap-2 text-left text-foreground/70 hover:text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      schedule.tag === "standard" ? "bg-primary/80" : "bg-amber-500/80",
                    )}
                  />
                  <span>
                    {schedule.letter} — {schedule.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="the-contract">
        <h2 className={`${guideSectionTitle} mb-4`}>The contract</h2>
        <article className={contractPanelClassName}>
          <header className="pb-6">
            <p className={`text-center font-serif text-lg font-semibold text-[#2f2920] md:text-xl`}>
              {GOOD_CONTRACT.contractTitle}
            </p>
            <p className={`mt-3 text-center ${contractBodyClassName}`}>{GOOD_CONTRACT.parties}</p>
          </header>

          <h3 className={`${guideSubsectionTitle} text-[#2f2920]`}>
            {GOOD_CONTRACT.articlesHeading}
          </h3>
          <ol className={`mt-4 list-none space-y-3 ${contractBodyClassName}`}>
            {GOOD_CONTRACT.articles.map((article) => (
              <li key={article.number} className="flex items-start gap-3">
                <span className="shrink-0 font-semibold tabular-nums text-[#2f2920]/90">
                  {article.number}.
                </span>
                <span>
                  <strong className="font-semibold text-[#2f2920]">{article.title}</strong>{" "}
                  {article.text}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 font-serif text-sm italic text-[#4a4338]/55">
            {GOOD_CONTRACT.schedulesClosing}
          </p>
        </article>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="the-schedules">
        <h2 className={`${guideSectionTitle} mb-4`}>The schedules</h2>
        <article className={contractSchedulesPanelClassName}>
          <ContractSchedulesAccordion
            openSchedule={openSchedule}
            onOpenSchedule={setOpenSchedule}
          />
        </article>
      </section>

      <PageFoot support="procurement" sources={[...GOOD_CONTRACT.sources]} />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
