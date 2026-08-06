import { CautionBlock } from "@/components/CautionBlock";
import { RealExampleCallout } from "@/components/RealExampleCallout";
import { REAL_EXAMPLES } from "@/lib/real-examples";
import { CheckpointMapSeeAlsoLink } from "@/components/CheckpointMapPointers";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import { OnRampChecklist } from "@/components/OnRampChecklist";
import { PageFoot } from "@/components/PageFoot";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PillarCallout } from "@/components/PillarCallout";
import { SubphaseDescriptionPanel } from "@/components/SubphaseDescriptionPanel";
import { SubphaseExtractCard } from "@/components/SubphaseExtractCard";
import { SubphaseInstruments } from "@/components/SubphaseInstruments";
import { SubphaseFinishSection } from "@/components/SubphaseFinishSection";
import { SubphaseSectionNav } from "@/components/SubphaseSectionNav";
import { SubphaseTeamRoles } from "@/components/SubphaseTeamRoles";
import { WhereThisFits } from "@/components/WhereThisFits";
import type { SourceItem } from "@/components/SourcesBlock";
import {
  GROWTH_ACCORDION,
  GROWTH_ACCORDION_STAGES,
  GROWTH_CAUTION,
  GROWTH_FINISH,
  GROWTH_LEAD,
  GROWTH_ON_RAMP,
  GROWTH_PILLAR,
  GROWTH_TEAM,
} from "@/lib/live-growth-content";
import { SUBPHASE_EXTRACTS } from "@/lib/subphase-content";
import {
  SUBPHASE_META,
  whereThisFitsForLiveSubphase,
} from "@/lib/lifecycle-navigation";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import growthRisingVisual from "@/assets/growth_rising.svg?url";
import {
  renderLinkedProse,
  renderThreadSections,
} from "@/lib/thread-rich-content";
import { guideProse } from "@/lib/guide-typography";

const GROWTH_SOURCES: SourceItem[] = [
  {
    label: "Templates and tools",
    linkKey: "pcra-tool",
    description:
      "Project Complexity and Risk Assessment (PCRA) tool (TBS): the questionnaire that rates how big and risky the project is; the score, against the department's approved capacity class, decides who can approve it; a significant addition can be a project of its own.",
  },
  {
    label: "Templates and tools",
    linkKey: "algorithmic-impact-assessment",
    description:
      "Algorithmic Impact Assessment tool (TBS): scores any automation the growth adds.",
  },
  {
    label: "Governing instrument",
    linkKey: "directive-on-service-and-digital",
    description:
      "Directive on Service and Digital (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "directive-automated-decision-making",
    description:
      "Directive on Automated Decision-Making (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "concept-case-procedures",
    description:
      "Mandatory Procedures for Concept Cases for Digitally Enabled Projects (TBS): a large addition may need its own concept case.",
  },
  {
    label: "Governing instrument",
    linkKey: "gc-enterprise-architecture-framework",
    description:
      "GC Enterprise Architecture Framework (TBS): the criteria for changes that alter the architecture.",
  },
  {
    label: "Supporting reference",
    linkKey: "task-authorizations",
    description:
      "Task authorizations (CanadaBuys buyer's guide).",
  },
  {
    label: "Supporting reference",
    linkKey: "modify-contract",
    description:
      "Modifying a contract (CanadaBuys buyer's guide): the procedure for amendments that stay within scope.",
  },
  {
    label: "Supporting reference",
    linkKey: "oag-arrivecan",
    description:
      "OAG 2024 Reports, Report 1: ArriveCAN.",
  },
  {
    label: "Communities",
    linkKey: "gcdigital-community",
    description:
      "GCDigital community (TBS OCIO): the community for digital practitioners across government.",
  },
];

export function LiveGrowthPage() {
  const meta = SUBPHASE_META.growth;
  const PillarIcon = GROWTH_PILLAR.icon;
  const extract = SUBPHASE_EXTRACTS.growth;

  return (
    <GuideLayout id="live-growth">
      <PhaseBreadcrumb
        pageHeading={meta.pageHeading}
        lifecyclePhase="Live"
        lifecyclePhaseHref="/live"
        subphase="Growth"
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForLiveSubphase("growth")} />
      </section>

      <SubphaseDescriptionPanel visual={LIFECYCLE_VISUALS.subphaseKeyGrowth}>
        {extract ? <SubphaseExtractCard extract={extract} /> : null}
      </SubphaseDescriptionPanel>

      <CheckpointMapSeeAlsoLink phaseLabel="Growth" hash="live" />

      <section className="mt-8 md:mt-10 flex items-center gap-4 md:gap-6">
        <img
          src={growthRisingVisual}
          alt="A person standing between two rising arrows"
          className="w-36 shrink-0 md:w-44"
        />
        <p className={guideProse}>{renderLinkedProse(GROWTH_LEAD)}</p>
      </section>

      <OnRampChecklist
        title={GROWTH_ON_RAMP.title}
        intro={GROWTH_ON_RAMP.intro}
        items={GROWTH_ON_RAMP.items.map((item) => renderLinkedProse(item))}
      />

      <PillarCallout
        id="every-addition-its-own-project"
        label={GROWTH_PILLAR.label}
        title={GROWTH_PILLAR.title}
        icon={PillarIcon}
        href={GROWTH_PILLAR.href}
        linkLabel={GROWTH_PILLAR.linkLabel}
      >
        <p>{renderLinkedProse(GROWTH_PILLAR.body)}</p>
      </PillarCallout>

      <IconAccordionSection
        id={GROWTH_ACCORDION.id}
        title={GROWTH_ACCORDION.title}
        stages={GROWTH_ACCORDION_STAGES.map((stage) => ({
          id: stage.id,
          icon: stage.icon,
          title: stage.title,
          children: renderThreadSections(stage.sections),
        }))}
      />

      <SubphaseTeamRoles
        id="the-team-you-need"
        title={GROWTH_TEAM.title}
        intro={GROWTH_TEAM.intro}
        roles={GROWTH_TEAM.roles}
        closing={GROWTH_TEAM.closing}
      />

      <CautionBlock
        id="when-growth-goes-wrong"
        className="mt-10 md:mt-12"
        title={GROWTH_CAUTION.title}
        items={GROWTH_CAUTION.items.map((item) => ({ heading: item }))}
      />

      <RealExampleCallout example={REAL_EXAMPLES.growth!} className="mt-8 md:mt-10" />

      <SubphaseInstruments subPhase="growth" />


      <SubphaseFinishSection
        title={GROWTH_FINISH.title}
        sectionId={GROWTH_FINISH.sectionId}
        intro={GROWTH_FINISH.intro}
        followUp={GROWTH_FINISH.followUp}
        exits={GROWTH_FINISH.exits}
        offRamp={GROWTH_FINISH.offRamp}
      />

      <PageFoot sources={GROWTH_SOURCES} subphaseFootFor="Live" />

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <SubphaseSectionNav
        prev={meta.sectionNav?.prev}
        next={meta.sectionNav?.next}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
