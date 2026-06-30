import { useId, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CaseStudyBlock } from "@/components/CaseStudyBlock";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideFolderTabs } from "@/components/GuideFolderTabs";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import { PracticeCardGroup } from "@/components/PracticeCard";
import {
  FUNDING_DETAIL_CARDS,
  FUNDING_HERO_ALT,
  FUNDING_THREAD,
} from "@/lib/funding-thread-content";
import {
  renderLinkedProse,
  renderThreadSections,
  renderThreadWhoseJob,
} from "@/lib/thread-rich-content";
import { guidePageTitle, guideProse, guideProseSpace, guideSectionTitle } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";
import fundingHero from "@/assets/funding_hero.svg?url";

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

function FundingByPhaseSection() {
  const { byPhase } = FUNDING_THREAD;
  const phasePanelId = useId();
  const phaseTabOptions = byPhase.blocks.map((block) => ({
    value: block.title,
    label: (
      <span className="inline-flex items-center justify-center gap-2">
        <FundingDollarMark />
        <span>{block.title.replace(/\.$/, "")}</span>
      </span>
    ),
  }));
  type PhaseTab = (typeof phaseTabOptions)[number]["value"];
  const [activePhaseTab, setActivePhaseTab] = useState<PhaseTab>(phaseTabOptions[0].value);
  const activePhaseBlock =
    byPhase.blocks.find((block) => block.title === activePhaseTab) ?? byPhase.blocks[0];

  return (
    <section className="mt-10 md:mt-12 scroll-mt-24" id={byPhase.id}>
      <h2 className={`${guideSectionTitle} mb-4`}>{byPhase.title}</h2>
      <GuideFolderTabs
        options={phaseTabOptions}
        value={activePhaseTab}
        onChange={setActivePhaseTab}
        ariaLabel={byPhase.title}
        panelId={phasePanelId}
      >
        {renderThreadSections(activePhaseBlock.popup)}
      </GuideFolderTabs>
    </section>
  );
}

export function FundingThreadPage() {
  const {
    title,
    lead,
    whereMoneyComesFrom,
    detailCards,
    whoseJob,
    twoWaysComparison,
    furtherReading,
    sources,
  } = FUNDING_THREAD;

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

      <section className="mt-10 md:mt-12 scroll-mt-24" id={detailCards.id}>
        <h2 className={`${guideSectionTitle} mb-5`}>{detailCards.title}</h2>
        <PracticeCardGroup cards={FUNDING_DETAIL_CARDS} numbered />
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

      <FundingByPhaseSection />

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
