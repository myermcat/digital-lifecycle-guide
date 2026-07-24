import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Briefcase,
  Building,
  Clock,
  Coins,
  FileX,
  LifeBuoy,
  Lock,
  Minimize,
  ShieldCheck,
  Split,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { EditorialNote } from "@/components/EditorialNote";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideCallout } from "@/components/GuideCallout";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import {
  practiceCardGridCols,
  practiceCardStaticClassName,
} from "@/components/PracticeCard";
import { StandoutIconCallout } from "@/components/StandoutIconCallout";
import { ThreadByPhaseSection } from "@/components/ThreadByPhaseSection";
import { ThreadCoreStrip } from "@/components/ThreadCoreStrip";
import { GuideArrowBullet } from "@/lib/guide-lists";
import { DATA_STEWARDSHIP_THREAD } from "@/lib/data-stewardship-thread-content";
import { DATA_STEWARDSHIP_CORE_STRIP } from "@/lib/thread-core-strip";
import { SEE_ALSO } from "@/lib/see-also";
import {
  renderLinkedProse,
  renderThreadLead,
  renderThreadSections,
  renderThreadWhoseJob,
} from "@/lib/thread-rich-content";
import {
  guideArrowList,
  guideListIndent,
  guidePageTitle,
  guideProse,
  guideProseSpace,
  guideProseTight,
  guideSectionTitle,
  guideSubsectionTitle,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";
import dataLifecycle from "@/assets/data_lifecycle.svg?url";
import dataAuthorityCheck from "@/assets/data_authority_check.svg?url";
import sunsetReplaceOverlap from "@/assets/sunset_replace_overlap.svg?url";

const REASON_ICONS = {
  minimize: Minimize,
  shield: ShieldCheck,
  lock: Lock,
} as const satisfies Record<string, LucideIcon>;

const DISPOSAL_ICONS = {
  fileX: FileX,
  clock: Clock,
  user: UserRound,
} as const satisfies Record<string, LucideIcon>;

const CLEANUP_ICONS = {
  briefcase: Briefcase,
  lifebuoy: LifeBuoy,
  building: Building,
} as const satisfies Record<string, LucideIcon>;

const PRACTICE_ICONS = {
  split: Split,
  coins: Coins,
} as const satisfies Record<string, LucideIcon>;

const iconTileClassName =
  "flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/[0.07] md:h-[4.25rem] md:w-[4.25rem]";

function ToggleStepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

function MutedNote({
  bold,
  text,
  className,
}: {
  bold: string;
  text: string;
  className?: string;
}) {
  return (
    <aside className={cn("border-l-4 border-l-primary/40 pl-4 md:pl-5", className)}>
      <p className={guideProseTight}>
        <strong className="font-semibold text-foreground">{bold}</strong>
        {text}
      </p>
    </aside>
  );
}

function IconLeadList({
  items,
}: {
  items: ReadonlyArray<{
    icon: LucideIcon;
    lead: string;
    body: ReactNode;
  }>;
}) {
  return (
    <ul className="mt-5 space-y-5 list-none pl-0">
      {items.map((item) => (
        <li key={item.lead} className="flex items-center gap-4 md:gap-5">
          <span className={iconTileClassName} aria-hidden>
            <item.icon className="size-8 text-primary/55 md:size-9" strokeWidth={1.75} />
          </span>
          <span className={`min-w-0 flex-1 ${guideProse}`}>
            <strong className="font-semibold text-foreground/90">{item.lead}</strong>
            {item.body}
          </span>
        </li>
      ))}
    </ul>
  );
}

function DefinitionTerm({
  term,
  definition,
  className,
}: {
  term: string;
  definition: string;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-lg border border-border bg-[var(--phase-group)]/50 px-5 py-4 md:px-6 md:py-5",
        className,
      )}
      data-guide-block="definition"
    >
      <p className={guideProseTight}>
        <strong className="font-semibold text-primary">{term}</strong>
        {" — "}
        {definition}
      </p>
    </aside>
  );
}

export function DataStewardshipThreadPage() {
  const {
    title,
    lead,
    whatGoodLooksLike,
    retentionQuestionCallout,
    whyItMatters,
    whoseJob,
    closerLook,
    decidingWhatHappens,
    twoWaysComparison,
    byPhase,
    furtherReading,
    sources,
  } = DATA_STEWARDSHIP_THREAD;

  return (
    <GuideLayout id={`thread-${DATA_STEWARDSHIP_THREAD.slug}`}>
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

      <ThreadCoreStrip content={DATA_STEWARDSHIP_CORE_STRIP} />

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

      <GuideCallout
        title={retentionQuestionCallout.title}
        className="mt-10 md:mt-12 scroll-mt-24"
      >
        {renderLinkedProse(retentionQuestionCallout.body)}
      </GuideCallout>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="why-it-matters">
        <h2 className={`${guideSectionTitle} mb-3`}>Why it matters</h2>
        <p className={guideProse}>{renderLinkedProse(whyItMatters)}</p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="whose-job">
        <h2 className={`${guideSectionTitle} mb-3`}>Whose job it is</h2>
        <div>{renderThreadWhoseJob(whoseJob)}</div>
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

      <section
        className="mt-10 md:mt-12 scroll-mt-24"
        id={decidingWhatHappens.id}
      >
        <h2 className={`${guideSectionTitle} mb-3`}>{decidingWhatHappens.title}</h2>
        <div className={guideProseSpace}>
          {decidingWhatHappens.intro.map((paragraph) => (
            <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
          ))}
        </div>

        <figure className="mt-5 md:mt-6">
          <img
            src={dataLifecycle}
            alt={decidingWhatHappens.lifecycleFigure.alt}
            className="w-full h-auto max-w-3xl"
            width={980}
            height={310}
          />
          <figcaption className={`${guideProseTight} mt-3 text-muted-foreground`}>
            {decidingWhatHappens.lifecycleFigure.caption}
          </figcaption>
        </figure>

        <StandoutIconCallout
          className="mt-5 md:mt-6"
          as="aside"
          icon={AlertTriangle}
          label="CAUTION"
          title={decidingWhatHappens.trapCallout.title}
          titleAs="p"
        >
          <p>{decidingWhatHappens.trapCallout.body}</p>
        </StandoutIconCallout>

        <section
          className="mt-8 md:mt-10 scroll-mt-24"
          id={decidingWhatHappens.oneRule.id}
        >
          <h2 className={`${guideSubsectionTitle} mb-3`}>
            {decidingWhatHappens.oneRule.title}
          </h2>
          <div className={guideProseSpace}>
            {decidingWhatHappens.oneRule.paragraphs.map((paragraph) => (
              <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
            ))}
          </div>
        </section>

        <section
          className="mt-8 md:mt-10 scroll-mt-24"
          id={decidingWhatHappens.authorityCheck.id}
        >
          <h2 className={`${guideSubsectionTitle} mb-3`}>
            {decidingWhatHappens.authorityCheck.title}
          </h2>
          <p className={guideProse}>
            {renderLinkedProse(decidingWhatHappens.authorityCheck.intro)}
          </p>
          <figure className="mt-5 md:mt-6">
            <img
              src={dataAuthorityCheck}
              alt={decidingWhatHappens.authorityCheck.figure.alt}
              className="w-full h-auto max-w-3xl"
              width={900}
              height={314}
            />
            <figcaption className={`${guideProseTight} mt-3 text-muted-foreground`}>
              {decidingWhatHappens.authorityCheck.figure.caption}
            </figcaption>
          </figure>
          <ul className={`mt-5 space-y-3 list-disc ${guideListIndent}`}>
            {decidingWhatHappens.authorityCheck.bullets.map((item) => (
              <li key={item.text} className={guideProse}>
                {renderLinkedProse(item)}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="mt-8 md:mt-10 scroll-mt-24"
          id={decidingWhatHappens.howToSort.id}
        >
          <h2 className={`${guideSubsectionTitle} mb-3`}>
            {decidingWhatHappens.howToSort.title}
          </h2>
          <p className={guideProse}>{decidingWhatHappens.howToSort.intro}</p>
          <ul className={`mt-4 space-y-3 list-disc ${guideListIndent}`}>
            {decidingWhatHappens.howToSort.points.map((point) => (
              <li key={point.lead} className={guideProse}>
                <strong className="font-semibold text-foreground/90">{point.lead}</strong>
                {renderLinkedProse(point.body)}
                {point.lead === "What to ask them." ? (
                  <ol className={`mt-2 list-decimal space-y-2 ${guideListIndent}`}>
                    {decidingWhatHappens.howToSort.askList.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ol>
                ) : null}
              </li>
            ))}
          </ul>
          <MutedNote
            className="mt-5 md:mt-6"
            bold={decidingWhatHappens.howToSort.waitNote.bold}
            text={decidingWhatHappens.howToSort.waitNote.text}
          />
        </section>

        <section
          className="mt-8 md:mt-10 scroll-mt-24"
          id={decidingWhatHappens.whileRunning.id}
        >
          <h2 className={`${guideSubsectionTitle} mb-3`}>
            {decidingWhatHappens.whileRunning.title}
          </h2>
          <p className={guideProse}>
            {renderLinkedProse(decidingWhatHappens.whileRunning.intro)}
          </p>
          <IconLeadList
            items={decidingWhatHappens.whileRunning.disposalRoutes.map((item) => ({
              icon: DISPOSAL_ICONS[item.icon],
              lead: item.lead,
              body: item.text,
            }))}
          />
          <DefinitionTerm
            className="mt-5 md:mt-6"
            term={decidingWhatHappens.whileRunning.irbv.term}
            definition={decidingWhatHappens.whileRunning.irbv.definition}
          />
          <p className={`${guideProse} mt-5`}>
            {decidingWhatHappens.whileRunning.sharedWorkIntro}
          </p>
          <IconLeadList
            items={decidingWhatHappens.whileRunning.cleanupRoles.map((item) => ({
              icon: CLEANUP_ICONS[item.icon],
              lead: item.lead,
              body: item.text,
            }))}
          />
          <p className={`${guideProse} mt-5`}>
            {renderLinkedProse(decidingWhatHappens.whileRunning.contractDuty)}
          </p>
          <p className={`${guideProse} mt-5 md:mt-6`}>
            {renderLinkedProse(decidingWhatHappens.whileRunning.reasonsLead)}
          </p>
          <ul
            className={`mt-4 grid gap-3 list-none pl-0 ${practiceCardGridCols(3)}`}
          >
            {decidingWhatHappens.reasonCards.map((card) => {
              const Icon = REASON_ICONS[card.icon];
              return (
                <li key={card.heading} className={practiceCardStaticClassName}>
                  <Icon
                    className="mb-2 size-5 text-primary/70"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <h4 className="font-serif text-sm font-medium text-primary leading-tight">
                    {card.heading}
                  </h4>
                  <p className="mt-1.5 font-sans text-[10px] leading-[1.35] text-foreground/55">
                    {card.line}
                  </p>
                </li>
              );
            })}
          </ul>

          <EditorialNote
            className="mt-5 md:mt-6"
            label={decidingWhatHappens.inPractice.label}
          >
            <p>{renderLinkedProse(decidingWhatHappens.inPractice.body)}</p>
          </EditorialNote>
        </section>

        <section
          className="mt-8 md:mt-10 scroll-mt-24"
          id={decidingWhatHappens.whenReplaced.id}
        >
          <h2 className={`${guideSubsectionTitle} mb-3`}>
            {decidingWhatHappens.whenReplaced.title}
          </h2>
          <p className={guideProse}>
            {renderLinkedProse(decidingWhatHappens.whenReplaced.intro)}
          </p>
          <ul className={`mt-4 space-y-3 list-disc ${guideListIndent}`}>
            {decidingWhatHappens.whenReplaced.decisionPoints.map((item) => (
              <li key={item.text} className={guideProse}>
                {renderLinkedProse(item)}
              </li>
            ))}
          </ul>
          <figure className="mt-5 md:mt-6">
            <img
              src={sunsetReplaceOverlap}
              alt={decidingWhatHappens.whenReplaced.figure.alt}
              className="w-full h-auto max-w-4xl"
              width={1160}
              height={384}
            />
            <figcaption className={`${guideProseTight} mt-3 text-muted-foreground`}>
              {decidingWhatHappens.whenReplaced.figure.caption}
            </figcaption>
          </figure>
          <IconLeadList
            items={decidingWhatHappens.whenReplaced.practices.map((item) => ({
              icon: PRACTICE_ICONS[item.icon],
              lead: item.lead,
              body: item.text,
            }))}
          />
          <p className={`${guideProse} mt-5`}>
            {renderLinkedProse(decidingWhatHappens.whenReplaced.closing)}
          </p>
          <MutedNote
            className="mt-5 md:mt-6"
            bold={decidingWhatHappens.whenReplaced.copyrightNote.bold}
            text={decidingWhatHappens.whenReplaced.copyrightNote.text}
          />
        </section>

        <section
          className="mt-8 md:mt-10 scroll-mt-24"
          id={decidingWhatHappens.whoYouTalkTo.id}
        >
          <h2 className={`${guideSubsectionTitle} mb-3`}>
            {decidingWhatHappens.whoYouTalkTo.title}
          </h2>
          <ul className={`space-y-3 list-disc ${guideListIndent}`}>
            {decidingWhatHappens.whoYouTalkTo.bullets.map((item) => (
              <li key={item.text} className={guideProse}>
                {renderLinkedProse(item)}
              </li>
            ))}
          </ul>
        </section>
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
        support="data-stewardship"
        furtherReading={renderLinkedProse(furtherReading)}
        seeAlso={SEE_ALSO["data-stewardship"]}
        sources={sources}
      />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
