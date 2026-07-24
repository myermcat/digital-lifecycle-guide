import { Link } from "@tanstack/react-router";
import { Coins, LogOut, RefreshCw, type LucideIcon } from "lucide-react";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideCallout } from "@/components/GuideCallout";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import { PageFoot } from "@/components/PageFoot";
import { StandoutIconCallout } from "@/components/StandoutIconCallout";
import {
  FUNDING_HERO_ALT,
  FUNDING_THREAD,
  type FundingDetailIcon,
} from "@/lib/funding-thread-content";
import {
  renderLinkedProse,
  renderThreadWhoseJob,
} from "@/lib/thread-rich-content";
import {
  guideFormulaLine,
  guidePageTitle,
  guideProse,
  guideProseSpace,
  guideProseTight,
  guideSectionTitle,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";
import fundingHero from "@/assets/funding_hero.svg?url";
import fundingThreshold from "@/assets/funding_threshold.svg?url";

const DETAIL_ICONS: Record<FundingDetailIcon, LucideIcon> = {
  coins: Coins,
  refresh: RefreshCw,
  logout: LogOut,
};

/** Phase label above step groups — same family as callout eyebrows, larger and heavier. */
const fundingStepPhaseLabel =
  "font-sans text-xs md:text-[0.8125rem] font-semibold uppercase tracking-[0.22em] text-primary";

function ToggleStepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

/** Large dollar-sign mark in front of a money source — not a bullet. */
function FundingDollarMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("font-serif text-2xl leading-none text-primary/65 shrink-0", className)}
      aria-hidden
    >
      $
    </span>
  );
}

export function FundingThreadPage() {
  const {
    title,
    lead,
    whereMoneyComesFrom,
    commonPath,
    treasuryBoardException,
    detailWork,
    whoseJob,
    twoWaysComparison,
    furtherReading,
    sources,
  } = FUNDING_THREAD;

  const numberedStepGroups = (() => {
    let n = 0;
    return commonPath.stepGroups.map((group) => ({
      phase: group.phase,
      steps: group.steps.map((item) => {
        n += 1;
        return { item, number: n };
      }),
    }));
  })();

  return (
    <GuideLayout id={`thread-${FUNDING_THREAD.slug}`}>
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
          src={fundingHero}
          alt={FUNDING_HERO_ALT}
          className="w-full h-auto"
          width={840}
          height={360}
        />
      </figure>

      <section className={guideProseSpace}>
        {lead.map((paragraph) => (
          <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
        ))}
      </section>

      <section
        className="mt-10 md:mt-12 scroll-mt-24"
        id={whereMoneyComesFrom.id}
      >
        <h2 className={`${guideSectionTitle} mb-3`}>{whereMoneyComesFrom.title}</h2>
        <p className={`${guideProse} mb-5`}>{whereMoneyComesFrom.intro}</p>
        <ul className="space-y-5 list-none pl-0">
          {whereMoneyComesFrom.items.map((item) => (
            <li key={item.heading} className="flex items-start gap-3 md:gap-4">
              <FundingDollarMark className="mt-0.5" />
              <p className={guideProse}>
                <span className="font-semibold text-foreground/90">{item.heading}</span>{" "}
                {item.text}
              </p>
            </li>
          ))}
        </ul>
        <p className={`${guideProse} mt-5`}>{whereMoneyComesFrom.closing}</p>
      </section>

      <IconAccordionSection
        id={detailWork.id}
        title={detailWork.title}
        stages={detailWork.items.map((item) => ({
          id: item.id,
          icon: DETAIL_ICONS[item.icon],
          title: item.title,
          children: (
            <div className={guideProseSpace}>
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
              ))}
              {item.formula ? (
                <p
                  className={`mt-1 rounded-md border border-border/80 bg-muted/35 px-3 py-2 text-center ${guideFormulaLine}`}
                >
                  {item.formula}
                </p>
              ) : null}
              {item.afterFormula ? <p>{renderLinkedProse(item.afterFormula)}</p> : null}
            </div>
          ),
        }))}
      />

      <section className="mt-10 md:mt-12 scroll-mt-24" id={commonPath.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{commonPath.title}</h2>
        <div className={guideProseSpace}>
          {commonPath.paragraphs.map((paragraph) => (
            <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
          ))}
        </div>
        <div className="mt-5 space-y-6 md:mt-6">
          {numberedStepGroups.map((group) => (
            <div key={group.phase}>
              <p className={`${fundingStepPhaseLabel} mb-3`}>{group.phase}</p>
              <ol className="space-y-3.5 list-none pl-0" start={group.steps[0]?.number}>
                {group.steps.map(({ item, number }) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <ToggleStepNumber n={number} />
                    <p className={`${guideProse} min-w-0 pt-0.5`}>
                      {renderLinkedProse(item)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <StandoutIconCallout
          className="mt-5 md:mt-6"
          as="aside"
          icon={Coins}
          label={commonPath.planAheadCallout.label}
          title={commonPath.planAheadCallout.title}
          titleAs="p"
        >
          <p>{renderLinkedProse(commonPath.planAheadCallout.body)}</p>
        </StandoutIconCallout>
        <GuideCallout compact className="mt-5 md:mt-6 bg-muted/45">
          <p>{commonPath.keyCallout}</p>
        </GuideCallout>
      </section>

      <section
        className="mt-10 md:mt-12 scroll-mt-24"
        id={treasuryBoardException.id}
      >
        <h2 className={`${guideSectionTitle} mb-3`}>{treasuryBoardException.title}</h2>
        <figure className="mb-5 md:mb-6">
          <img
            src={fundingThreshold}
            alt={treasuryBoardException.thresholdFigure.alt}
            className="w-full h-auto max-w-2xl"
            width={760}
            height={450}
          />
          <figcaption className={`${guideProseTight} mt-3 text-muted-foreground`}>
            {treasuryBoardException.thresholdFigure.caption}
          </figcaption>
        </figure>
        <div className={guideProseSpace}>
          {treasuryBoardException.paragraphs.map((paragraph) => (
            <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
          ))}
        </div>
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

      <PageFoot
        support="funding"
        furtherReading={
          <ul className="space-y-2 list-none pl-0">
            {furtherReading.map((item) => (
              <li key={item.text}>{renderLinkedProse(item)}</li>
            ))}
          </ul>
        }
        sources={sources}
      />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
