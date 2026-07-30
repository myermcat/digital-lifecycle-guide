import { CautionBlock } from "@/components/CautionBlock";
import { GateMapSeeAlsoLink } from "@/components/GateMapPointers";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import { LifecycleVisual } from "@/components/LifecycleVisual";
import { OnRampChecklist } from "@/components/OnRampChecklist";
import { PageFoot } from "@/components/PageFoot";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PillarCallout } from "@/components/PillarCallout";
import { SubphaseDescriptionPanel } from "@/components/SubphaseDescriptionPanel";
import { SubphaseFinishSection } from "@/components/SubphaseFinishSection";
import { SubphaseSectionNav } from "@/components/SubphaseSectionNav";
import { SubphaseTeamRoles } from "@/components/SubphaseTeamRoles";
import { WhereThisFits } from "@/components/WhereThisFits";
import type { SourceItem } from "@/components/SourcesBlock";
import {
  ALPHA_ACCORDION,
  ALPHA_ACCORDION_STAGES,
  ALPHA_CAUTION,
  ALPHA_EXTRACT,
  ALPHA_EXTRACT_CLOSING,
  ALPHA_FINISH,
  ALPHA_ON_RAMP,
  ALPHA_PILLAR,
  ALPHA_PROTOTYPE_QUOTE,
  ALPHA_SECTION_NAV,
  ALPHA_TEAM,
} from "@/lib/create-alpha-content";
import { SUBPHASE_META } from "@/lib/lifecycle-navigation";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import {
  renderLinkedProse,
  renderThreadSections,
} from "@/lib/thread-rich-content";
import { guideBodySubheading, guideListIndent, guideProse } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const ALPHA_SOURCES: SourceItem[] = [
  {
    label: "Templates and tools",
    linkKey: "design-canada",
    description:
      "Canada.ca design system (design.canada.ca): user-tested styles, templates, and patterns to prototype with.",
  },
  {
    label: "Templates and tools",
    linkKey: "gc-design-system",
    description:
      "GC Design System (Canadian Digital Service): ready-made, accessible interface components.",
  },
  {
    label: "Templates and tools",
    linkKey: "gc-forms-assistance",
    description:
      "GC Forms (Canadian Digital Service): a form-building platform for prototyping forms without writing code.",
  },
  {
    label: "Governing instrument",
    linkKey: "digital-standards",
    description:
      "Government of Canada Digital Standards (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "guideline-service-digital",
    description:
      "Guideline on Service and Digital (TBS).",
  },
  {
    label: "Supporting reference",
    linkKey: "design-research",
    description:
      "Canada.ca design system, research and testing how-to: methods for testing prototypes with users.",
  },
  {
    label: "Communities",
    linkKey: "gc-ux-network",
    description:
      "Government of Canada UX Network: user research practitioners across government; also on GCXchange, search the name.",
  },
];

const alphaQuoteClassName =
  "mt-6 md:mt-8 border-l-4 border-l-primary/35 pl-4 md:pl-5 font-serif text-lg md:text-xl text-foreground/90 leading-snug";

export function CreateAlphaPage() {
  const meta = SUBPHASE_META.alpha;
  const PillarIcon = ALPHA_PILLAR.icon;

  return (
    <GuideLayout id="create-alpha">
      <PhaseBreadcrumb
        pageHeading={meta.pageHeading}
        lifecyclePhase="Create"
        lifecyclePhaseHref="/create"
        subphase="Alpha"
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...meta.where()} />
      </section>

      <SubphaseDescriptionPanel>
        <div className={`${guideProse} space-y-3`}>
          <p className={guideBodySubheading}>{ALPHA_EXTRACT.spine}</p>
          <p>{renderLinkedProse(ALPHA_EXTRACT.opening)}</p>
          <ul className={`list-disc space-y-1 ${guideListIndent}`}>
            {ALPHA_EXTRACT.workOutItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{renderLinkedProse(ALPHA_EXTRACT.closing)}</p>
          <p>
            <Sparkles
              className="mr-1.5 inline h-4 w-4 -translate-y-px text-primary/70"
              aria-hidden
            />
            <span className="mr-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {ALPHA_EXTRACT.whatsNew.label}
            </span>
            {ALPHA_EXTRACT.whatsNew.text}
          </p>
          <p>{renderLinkedProse(ALPHA_EXTRACT_CLOSING)}</p>
        </div>
      </SubphaseDescriptionPanel>

      <GateMapSeeAlsoLink phaseLabel="Alpha" hash="alpha" />

      <blockquote className={cn(alphaQuoteClassName)}>
        <p>
          <strong className="font-semibold text-foreground">
            {ALPHA_PROTOTYPE_QUOTE.title}
          </strong>
        </p>
        <p className={`mt-2 ${guideProse}`}>{ALPHA_PROTOTYPE_QUOTE.body}</p>
      </blockquote>

      <LifecycleVisual visual={LIFECYCLE_VISUALS.subphaseKeyAlpha} />

      <OnRampChecklist
        title={ALPHA_ON_RAMP.title}
        intro={ALPHA_ON_RAMP.intro}
        items={ALPHA_ON_RAMP.items.map((item) => renderLinkedProse(item))}
      />

      <PillarCallout
        id="test-riskiest-assumption"
        label={ALPHA_PILLAR.label}
        title={ALPHA_PILLAR.title}
        icon={PillarIcon}
        href={ALPHA_PILLAR.href}
        linkLabel={ALPHA_PILLAR.linkLabel}
      >
        <p>{renderLinkedProse(ALPHA_PILLAR.body)}</p>
      </PillarCallout>

      <IconAccordionSection
        id={ALPHA_ACCORDION.id}
        title={ALPHA_ACCORDION.title}
        stages={ALPHA_ACCORDION_STAGES.map((stage) => ({
          id: stage.id,
          icon: stage.icon,
          title: stage.title,
          headerContent: stage.headerVisual ? (
            <LifecycleVisual visual={stage.headerVisual} className="mt-0" />
          ) : undefined,
          children: renderThreadSections(stage.sections),
        }))}
      />

      <SubphaseTeamRoles
        id="the-team-you-need"
        title={ALPHA_TEAM.title}
        intro={ALPHA_TEAM.intro}
        roles={ALPHA_TEAM.roles}
        closing={ALPHA_TEAM.closing}
      />

      <CautionBlock
        id="what-bad-looks-like"
        className="mt-10 md:mt-12"
        title={ALPHA_CAUTION.title}
        items={ALPHA_CAUTION.items.map((item) => ({ heading: item }))}
      />

      <SubphaseFinishSection
        title={ALPHA_FINISH.title}
        sectionId={ALPHA_FINISH.sectionId}
        intro={ALPHA_FINISH.intro}
        followUp={ALPHA_FINISH.followUp}
        exits={ALPHA_FINISH.exits}
        offRamp={ALPHA_FINISH.offRamp}
      />

      <PageFoot sources={ALPHA_SOURCES} subphaseFootFor="Create" />

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <SubphaseSectionNav
        prev={ALPHA_SECTION_NAV.prev}
        next={ALPHA_SECTION_NAV.next}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
