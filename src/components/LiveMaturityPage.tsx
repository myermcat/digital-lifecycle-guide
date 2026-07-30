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
  MATURITY_ACCORDION,
  MATURITY_ACCORDION_STAGES,
  MATURITY_CAUTION,
  MATURITY_FINISH,
  MATURITY_LEAD,
  MATURITY_ON_RAMP,
  MATURITY_PILLAR,
  MATURITY_TEAM,
} from "@/lib/live-maturity-content";
import { SUBPHASE_EXTRACTS } from "@/lib/subphase-content";
import {
  SUBPHASE_META,
  whereThisFitsForLiveSubphase,
} from "@/lib/lifecycle-navigation";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import maturityCalmVisual from "@/assets/maturity_calm.svg?url";
import {
  renderLinkedProse,
  renderThreadSections,
} from "@/lib/thread-rich-content";
import { guideProse } from "@/lib/guide-typography";

const MATURITY_SOURCES: SourceItem[] = [
  {
    label: "Templates and tools",
    linkKey: "gc-service-inventory",
    description:
      "GC Service Inventory (Open Government): the dataset where the service's record is kept current.",
  },
  {
    label: "Governing instrument",
    linkKey: "policy-on-service-and-digital",
    description:
      "Policy on Service and Digital (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "directive-on-service-and-digital",
    description:
      "Directive on Service and Digital (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "guideline-service-digital",
    description:
      "Guideline on Service and Digital (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "standard-at-risk-it",
    description:
      "Standard on At-Risk Information Technology (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "service-fees-act",
    description:
      "Service Fees Act.",
  },
  {
    label: "Governing instrument",
    linkKey: "charging-directive",
    description:
      "Directive on Charging and Special Financial Authorities (TBS): how service fees are set and reviewed.",
  },
  {
    label: "Supporting reference",
    linkKey: "apm-gcwiki",
    description:
      "Application Portfolio Management guidance hub (GCcollab wiki).",
  },
  {
    label: "Supporting reference",
    linkKey: "oag-phoenix-build",
    description:
      "OAG 2018 Spring Reports, Report 1: Building and Implementing the Phoenix Pay System.",
  },
  {
    label: "Communities",
    description:
      "Application Portfolio Management community: on GCXchange, search the name.",
  },
];

export function LiveMaturityPage() {
  const meta = SUBPHASE_META.maturity;
  const PillarIcon = MATURITY_PILLAR.icon;
  const extract = SUBPHASE_EXTRACTS.maturity;

  return (
    <GuideLayout id="live-maturity">
      <PhaseBreadcrumb
        pageHeading={meta.pageHeading}
        lifecyclePhase="Live"
        lifecyclePhaseHref="/live"
        subphase="Maturity"
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForLiveSubphase("maturity")} />
      </section>

      <SubphaseDescriptionPanel visual={LIFECYCLE_VISUALS.subphaseKeyMaturity}>
        {extract ? <SubphaseExtractCard extract={extract} /> : null}
      </SubphaseDescriptionPanel>

      <GateMapSeeAlsoLink phaseLabel="Maturity" hash="live" />

      <section className="mt-8 md:mt-10 flex items-center gap-4 md:gap-6">
        <img
          src={maturityCalmVisual}
          alt="A person standing calmly between two growing plants"
          className="w-36 shrink-0 md:w-44"
        />
        <p className={guideProse}>{renderLinkedProse(MATURITY_LEAD)}</p>
      </section>

      <OnRampChecklist
        title={MATURITY_ON_RAMP.title}
        intro={MATURITY_ON_RAMP.intro}
        items={MATURITY_ON_RAMP.items.map((item) => renderLinkedProse(item))}
      />

      <PillarCallout
        id="start-renewals-early"
        label={MATURITY_PILLAR.label}
        title={MATURITY_PILLAR.title}
        icon={PillarIcon}
        href={MATURITY_PILLAR.href}
        linkLabel={MATURITY_PILLAR.linkLabel}
      >
        <p>{renderLinkedProse(MATURITY_PILLAR.body)}</p>
      </PillarCallout>

      <IconAccordionSection
        id={MATURITY_ACCORDION.id}
        title={MATURITY_ACCORDION.title}
        stages={MATURITY_ACCORDION_STAGES.map((stage) => ({
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
        title={MATURITY_TEAM.title}
        intro={MATURITY_TEAM.intro}
        roles={MATURITY_TEAM.roles}
        closing={MATURITY_TEAM.closing}
      />

      <CautionBlock
        id="when-maturity-goes-wrong"
        className="mt-10 md:mt-12"
        title={MATURITY_CAUTION.title}
        items={MATURITY_CAUTION.items.map((item) => ({ heading: item }))}
      />

      <RealExampleCallout example={REAL_EXAMPLES.maturity!} className="mt-8 md:mt-10" />

      <SubphaseFinishSection
        title={MATURITY_FINISH.title}
        sectionId={MATURITY_FINISH.sectionId}
        intro={MATURITY_FINISH.intro}
        followUp={MATURITY_FINISH.followUp}
        exits={MATURITY_FINISH.exits}
        offRamp={MATURITY_FINISH.offRamp}
      />

      <PageFoot sources={MATURITY_SOURCES} subphaseFootFor="Live" />

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <SubphaseSectionNav
        prev={meta.sectionNav?.prev}
        next={meta.sectionNav?.next}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
