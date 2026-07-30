import { CautionBlock } from "@/components/CautionBlock";
import { RealExampleCallout } from "@/components/RealExampleCallout";
import { REAL_EXAMPLES } from "@/lib/real-examples";
import { EditorialNote } from "@/components/EditorialNote";
import { GateMapSeeAlsoLink } from "@/components/GateMapPointers";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
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
  DISCOVERY_ACCORDION,
  DISCOVERY_ACCORDION_STAGES,
  DISCOVERY_CAUTION,
  DISCOVERY_EXTRACT,
  DISCOVERY_EXTRACT_CLOSING,
  DISCOVERY_FINISH,
  DISCOVERY_ON_RAMP,
  DISCOVERY_PILLAR,
  DISCOVERY_SECTION_NAV,
  DISCOVERY_TEAM,
} from "@/lib/create-discovery-content";
import { SUBPHASE_META } from "@/lib/lifecycle-navigation";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import {
  renderLinkedProse,
  renderThreadSections,
} from "@/lib/thread-rich-content";
import { guideBodySubheading, guideListIndent, guideProse } from "@/lib/guide-typography";

const DISCOVERY_SOURCES: SourceItem[] = [
  {
    label: "Templates and tools",
    description:
      "Concept Case Template (TBS): the fill-in form the concept case procedures require; ask your project-management office for the current version.",
  },
  {
    label: "Templates and tools",
    linkKey: "pcra-tool",
    description: "Project Complexity and Risk Assessment (PCRA) tool (TBS): the questionnaire that scores the project.",
  },
  {
    label: "Templates and tools",
    linkKey: "gc-service-inventory",
    description:
      "GC Service Inventory (Open Government): the list of existing GC services, for checking a new one would not duplicate them.",
  },
  {
    label: "Templates and tools",
    linkKey: "gc-notify-contact",
    description: "GC Notify (Canadian Digital Service): a notification platform to configure before building one.",
  },
  {
    label: "Templates and tools",
    linkKey: "gc-forms-assistance",
    description: "GC Forms (Canadian Digital Service): a form-building platform to configure before building one.",
  },
  { label: "Governing instrument", linkKey: "digital-standards", description: "Government of Canada Digital Standards (TBS)." },
  { label: "Governing instrument", linkKey: "guideline-service-digital", description: "Guideline on Service and Digital (TBS)." },
  {
    label: "Governing instrument",
    linkKey: "concept-case-procedures",
    description: "Mandatory Procedures for Concept Cases for Digitally Enabled Projects (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "gc-enterprise-architecture-framework",
    description: "GC Enterprise Architecture Framework (TBS): the criteria the architecture reviews apply, reuse first.",
  },
  {
    label: "Supporting reference",
    linkKey: "design-with-users",
    description: "Digital Standards, Design with users: the how-to for discovery research.",
  },
  {
    label: "Supporting reference",
    linkKey: "oag-it-shared-services",
    description: "OAG Fall 2015 Reports, Report 4: Information Technology Shared Services.",
  },
  {
    label: "Communities",
    linkKey: "gc-ux-network",
    description: "Government of Canada UX Network: user research practitioners across government; also on GCXchange, search the name.",
  },
];

export function CreateDiscoveryPage() {
  const meta = SUBPHASE_META.discovery;
  const PillarIcon = DISCOVERY_PILLAR.icon;

  return (
    <GuideLayout id="create-discovery">
      <PhaseBreadcrumb
        pageHeading={meta.pageHeading}
        lifecyclePhase="Create"
        lifecyclePhaseHref="/create"
        subphase="Discovery"
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...meta.where()} />
      </section>

      <SubphaseDescriptionPanel visual={LIFECYCLE_VISUALS.subphaseKeyDiscovery}>
        <div className={`${guideProse} space-y-3`}>
          <p className={guideBodySubheading}>{DISCOVERY_EXTRACT.spine}</p>
          <p>{renderLinkedProse(DISCOVERY_EXTRACT.opening)}</p>
          <ul className={`list-disc space-y-1 ${guideListIndent}`}>
            {DISCOVERY_EXTRACT.workOutItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{renderLinkedProse(DISCOVERY_EXTRACT.closing)}</p>
          <p>{renderLinkedProse(DISCOVERY_EXTRACT_CLOSING)}</p>
        </div>
      </SubphaseDescriptionPanel>

      <GateMapSeeAlsoLink phaseLabel="Discovery" hash="discovery" />

      <OnRampChecklist
        title={DISCOVERY_ON_RAMP.title}
        intro={DISCOVERY_ON_RAMP.intro}
        items={DISCOVERY_ON_RAMP.items.map((item) => renderLinkedProse(item))}
      />

      <PillarCallout
        id="reuse-buy-build"
        label={DISCOVERY_PILLAR.label}
        title={DISCOVERY_PILLAR.title}
        icon={PillarIcon}
        href={DISCOVERY_PILLAR.href}
        linkLabel={DISCOVERY_PILLAR.linkLabel}
      >
        <p>{renderLinkedProse(DISCOVERY_PILLAR.opening)}</p>
        <ul className={`mt-3 list-disc space-y-1.5 ${guideListIndent}`}>
          {DISCOVERY_PILLAR.options.map((item) => (
            <li key={item.text}>{renderLinkedProse(item)}</li>
          ))}
        </ul>
        <p className="mt-3">{renderLinkedProse(DISCOVERY_PILLAR.weigh)}</p>
        <p className="mt-3">{renderLinkedProse(DISCOVERY_PILLAR.sometimes)}</p>
      </PillarCallout>

      <EditorialNote className="mt-5 md:mt-6" label="Note">
        <div className="space-y-2.5">
          <p>{renderLinkedProse(DISCOVERY_PILLAR.teamNote.title)}</p>
          <p>{renderLinkedProse(DISCOVERY_PILLAR.teamNote.routes)}</p>
          <p>{renderLinkedProse(DISCOVERY_PILLAR.teamNote.competition)}</p>
        </div>
      </EditorialNote>

      <IconAccordionSection
        id={DISCOVERY_ACCORDION.id}
        title={DISCOVERY_ACCORDION.title}
        stages={DISCOVERY_ACCORDION_STAGES.map((stage) => ({
          id: stage.id,
          icon: stage.icon,
          title: stage.title,
          children: renderThreadSections(stage.sections),
        }))}
      />

      <SubphaseTeamRoles
        id="the-team-you-need"
        title={DISCOVERY_TEAM.title}
        intro={DISCOVERY_TEAM.intro}
        roles={DISCOVERY_TEAM.roles}
        closing={DISCOVERY_TEAM.closing}
      />

      <CautionBlock
        id="what-bad-looks-like"
        className="mt-10 md:mt-12"
        title={DISCOVERY_CAUTION.title}
        items={DISCOVERY_CAUTION.items.map((item) => ({ heading: item }))}
      />

      <RealExampleCallout example={REAL_EXAMPLES.discovery!} className="mt-8 md:mt-10" />

      <SubphaseFinishSection
        title={DISCOVERY_FINISH.title}
        sectionId={DISCOVERY_FINISH.sectionId}
        intro={DISCOVERY_FINISH.intro}
        exits={DISCOVERY_FINISH.exits}
        offRamp={DISCOVERY_FINISH.offRamp}
      />

      <PageFoot sources={DISCOVERY_SOURCES} subphaseFootFor="Create" />

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <SubphaseSectionNav
        prev={DISCOVERY_SECTION_NAV.prev}
        next={DISCOVERY_SECTION_NAV.next}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
