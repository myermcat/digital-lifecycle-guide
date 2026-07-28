import { CautionBlock } from "@/components/CautionBlock";
import { RealExampleCallout } from "@/components/RealExampleCallout";
import { REAL_EXAMPLES } from "@/lib/real-examples";
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
import { SubphaseExtractCard } from "@/components/SubphaseExtractCard";
import { SubphaseFinishSection } from "@/components/SubphaseFinishSection";
import { SubphaseSectionNav } from "@/components/SubphaseSectionNav";
import { SubphaseTeamRoles } from "@/components/SubphaseTeamRoles";
import { WhereThisFits } from "@/components/WhereThisFits";
import type { SourceItem } from "@/components/SourcesBlock";
import {
  STABILIZATION_ACCORDION,
  STABILIZATION_ACCORDION_STAGES,
  STABILIZATION_CAUTION,
  STABILIZATION_EXTRACT,
  STABILIZATION_FINISH,
  STABILIZATION_LEAD,
  STABILIZATION_ON_RAMP,
  STABILIZATION_PILLAR,
  STABILIZATION_TEAM,
} from "@/lib/live-stabilization-content";
import { SUBPHASE_META } from "@/lib/lifecycle-navigation";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import stabilizationFireVisual from "@/assets/stabilization_fire.svg?url";
import {
  renderLinkedProse,
  renderThreadSections,
} from "@/lib/thread-rich-content";
import { guideProse } from "@/lib/guide-typography";

const STABILIZATION_SOURCES: SourceItem[] = [
  { label: "Directive on Service and Digital (TBS)", linkKey: "directive-on-service-and-digital" },
  { label: "Guideline on Service and Digital (TBS)", linkKey: "guideline-service-digital" },
  { label: "Service Fees Act", linkKey: "service-fees-act" },
  { label: "OAG 2018 Spring Reports, Report 1: Building and Implementing the Phoenix Pay System", linkKey: "oag-phoenix-build" },
];

export function LiveStabilizationPage() {
  const meta = SUBPHASE_META.stabilization;
  const PillarIcon = STABILIZATION_PILLAR.icon;

  return (
    <GuideLayout id="live-stabilization">
      <PhaseBreadcrumb
        pageHeading={meta.pageHeading}
        lifecyclePhase="Live"
        lifecyclePhaseHref="/live"
        subphase="Stabilization"
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...meta.where()} />
      </section>

      <SubphaseDescriptionPanel visual={LIFECYCLE_VISUALS.subphaseKeyStabilization}>
        <SubphaseExtractCard extract={STABILIZATION_EXTRACT} />
      </SubphaseDescriptionPanel>

      <GateMapSeeAlsoLink phaseLabel="Stabilization" hash="live" />

      <section className="mt-8 md:mt-10 flex items-center gap-4 md:gap-6">
        <img
          src={stabilizationFireVisual}
          alt="A person standing calmly in the fire"
          className="w-36 shrink-0 md:w-44"
        />
        <p className={guideProse}>{renderLinkedProse(STABILIZATION_LEAD)}</p>
      </section>

      <OnRampChecklist
        title={STABILIZATION_ON_RAMP.title}
        intro={STABILIZATION_ON_RAMP.intro}
        items={STABILIZATION_ON_RAMP.items.map((item) => renderLinkedProse(item))}
      />

      <PillarCallout
        id="agree-the-exit"
        label={STABILIZATION_PILLAR.label}
        title={STABILIZATION_PILLAR.title}
        icon={PillarIcon}
        href={STABILIZATION_PILLAR.href}
        linkLabel={STABILIZATION_PILLAR.linkLabel}
      >
        <p>{renderLinkedProse(STABILIZATION_PILLAR.body)}</p>
      </PillarCallout>

      <IconAccordionSection
        id={STABILIZATION_ACCORDION.id}
        title={STABILIZATION_ACCORDION.title}
        stages={STABILIZATION_ACCORDION_STAGES.map((stage) => ({
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
        title={STABILIZATION_TEAM.title}
        intro={STABILIZATION_TEAM.intro}
        roles={STABILIZATION_TEAM.roles}
        closing={STABILIZATION_TEAM.closing}
      />

      <CautionBlock
        id="when-stabilization-goes-wrong"
        className="mt-10 md:mt-12"
        title={STABILIZATION_CAUTION.title}
        items={STABILIZATION_CAUTION.items.map((item) => ({ heading: item }))}
      />

      <RealExampleCallout example={REAL_EXAMPLES.stabilization!} className="mt-8 md:mt-10" />

      <SubphaseFinishSection
        title={STABILIZATION_FINISH.title}
        sectionId={STABILIZATION_FINISH.sectionId}
        intro={STABILIZATION_FINISH.intro}
        followUp={STABILIZATION_FINISH.followUp}
        exits={STABILIZATION_FINISH.exits}
        offRamp={STABILIZATION_FINISH.offRamp}
      />

      <PageFoot sources={STABILIZATION_SOURCES} subphaseFootFor="Live" />

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <SubphaseSectionNav
        prev={meta.sectionNav?.prev}
        next={meta.sectionNav?.next}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
