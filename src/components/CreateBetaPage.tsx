import { CautionBlock } from "@/components/CautionBlock";
import { RealExampleCallout } from "@/components/RealExampleCallout";
import { REAL_EXAMPLES } from "@/lib/real-examples";
import { Sparkles } from "lucide-react";
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
  BETA_ACCORDION,
  BETA_ACCORDION_STAGES,
  BETA_CAUTION,
  BETA_EXTRACT,
  BETA_EXTRACT_CLOSING,
  BETA_FINISH,
  BETA_ON_RAMP,
  BETA_PILLAR,
  BETA_SECTION_NAV,
  BETA_STAGES,
  BETA_TEAM,
} from "@/lib/create-beta-content";
import { SUBPHASE_META } from "@/lib/lifecycle-navigation";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";
import {
  renderLinkedProse,
  renderThreadSections,
} from "@/lib/thread-rich-content";
import { guideBodySubheading, guideListIndent, guideProse, guideSectionTitle } from "@/lib/guide-typography";

const BETA_SOURCES: SourceItem[] = [
  {
    label: "Templates and tools",
    linkKey: "algorithmic-impact-assessment",
    description:
      "Algorithmic Impact Assessment tool (TBS): the questionnaire that scores an automated decision system.",
  },
  {
    label: "Templates and tools",
    linkKey: "a11y-toolkit-procurement",
    description:
      "Digital Accessibility Toolkit, procurement: generates the accessibility requirements for what you buy and build.",
  },
  {
    label: "Templates and tools",
    linkKey: "gc-notify-contact",
    description:
      "GC Notify (Canadian Digital Service): a notification platform to configure instead of building one.",
  },
  {
    label: "Templates and tools",
    linkKey: "gc-forms-assistance",
    description:
      "GC Forms (Canadian Digital Service): a form-building platform to configure instead of building one.",
  },
  {
    label: "Templates and tools",
    linkKey: "gc-design-system",
    description:
      "GC Design System (Canadian Digital Service): ready-made, accessible interface components.",
  },
  {
    label: "Governing instrument",
    linkKey: "guideline-service-digital",
    description:
      "Guideline on Service and Digital (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "directive-security-management",
    description:
      "Directive on Security Management (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "directive-automated-decision-making",
    description:
      "Directive on Automated Decision-Making (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "directive-privacy-practices",
    description:
      "Directive on Privacy Practices (TBS).",
  },
  {
    label: "Supporting reference",
    linkKey: "itsg-33",
    description:
      "ITSG-33, IT security risk management (Canadian Centre for Cyber Security).",
  },
  {
    label: "Supporting reference",
    linkKey: "lac-information-disposition-hub",
    description:
      "Library and Archives Canada, information disposition: where records-keeping duties come from.",
  },
  {
    label: "Supporting reference",
    linkKey: "oag-phoenix-build",
    description:
      "OAG 2018 Spring Reports, Report 1: Building and Implementing the Phoenix Pay System.",
  },
  {
    label: "Communities",
    linkKey: "a11y-community-terms",
    description:
      "Access Working Group: the interdepartmental accessibility community behind the Digital Accessibility Toolkit.",
  },
];

export function CreateBetaPage() {
  const meta = SUBPHASE_META.beta;
  const PillarIcon = BETA_PILLAR.icon;

  return (
    <GuideLayout id="create-beta">
      <PhaseBreadcrumb
        pageHeading={meta.pageHeading}
        lifecyclePhase="Create"
        lifecyclePhaseHref="/create"
        subphase="Beta"
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...meta.where()} />
      </section>

      <SubphaseDescriptionPanel visual={LIFECYCLE_VISUALS.subphaseKeyBeta}>
        <div className={`${guideProse} space-y-3`}>
          <p className={guideBodySubheading}>{BETA_EXTRACT.spine}</p>
          <p>{renderLinkedProse(BETA_EXTRACT.opening)}</p>
          <ul className={`list-disc space-y-1 ${guideListIndent}`}>
            {BETA_EXTRACT.workOutItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{renderLinkedProse(BETA_EXTRACT.scoped)}</p>
          <p>
            <Sparkles
              className="mr-1.5 inline h-4 w-4 -translate-y-px text-primary/70"
              aria-hidden
            />
            <span className="mr-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {BETA_EXTRACT.whatsNew.label}
            </span>
            {BETA_EXTRACT.whatsNew.text}
          </p>
          <p>{renderLinkedProse(BETA_EXTRACT_CLOSING)}</p>
        </div>
      </SubphaseDescriptionPanel>

      <GateMapSeeAlsoLink phaseLabel="Beta" hash="beta" />

      <section className="mt-10 md:mt-12 scroll-mt-24">
        <h2 className={`${guideSectionTitle} mb-4`}>{BETA_STAGES.title}</h2>
        <div className={`${guideProse} space-y-3`}>
          <p>{renderLinkedProse(BETA_STAGES.opening)}</p>
          <p>{renderLinkedProse(BETA_STAGES.privateBeta)}</p>
          <p>{renderLinkedProse(BETA_STAGES.publicBeta)}</p>
          <p>{renderLinkedProse(BETA_STAGES.keepOldService)}</p>
          <p>{renderLinkedProse(BETA_STAGES.notLaunch)}</p>
        </div>
      </section>

      <OnRampChecklist
        title={BETA_ON_RAMP.title}
        intro={BETA_ON_RAMP.intro}
        items={BETA_ON_RAMP.items.map((item) => renderLinkedProse(item))}
      />

      <PillarCallout
        id="contract-outlives-service"
        label={BETA_PILLAR.label}
        title={BETA_PILLAR.title}
        icon={PillarIcon}
      >
        <p>{renderLinkedProse(BETA_PILLAR.bodyIntro)}</p>
        <p>{renderLinkedProse(BETA_PILLAR.listIntro)}</p>
        <ul className={`mt-4 md:mt-5 list-disc space-y-1 ${guideListIndent}`}>
          {BETA_PILLAR.listItems.map((item) => (
            <li key={item.text}>{renderLinkedProse(item)}</li>
          ))}
        </ul>
        <p className="mt-4 md:mt-5">{renderLinkedProse(BETA_PILLAR.closing)}</p>
      </PillarCallout>

      <IconAccordionSection
        id={BETA_ACCORDION.id}
        title={BETA_ACCORDION.title}
        stages={BETA_ACCORDION_STAGES.map((stage) => ({
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
        title={BETA_TEAM.title}
        intro={BETA_TEAM.intro}
        keepTeam={BETA_TEAM.keepTeam}
        rolesIntro={BETA_TEAM.rolesIntro}
        roles={BETA_TEAM.roles}
      />

      <CautionBlock
        id="when-beta-goes-wrong"
        className="mt-10 md:mt-12"
        title={BETA_CAUTION.title}
        lead={BETA_CAUTION.lead}
        items={BETA_CAUTION.items}
      />

      <RealExampleCallout example={REAL_EXAMPLES.beta!} className="mt-8 md:mt-10" />

      <SubphaseFinishSection
        title={BETA_FINISH.title}
        sectionId={BETA_FINISH.sectionId}
        intro={BETA_FINISH.intro}
        followUp={BETA_FINISH.followUp}
        exits={BETA_FINISH.exits}
        offRamp={BETA_FINISH.offRamp}
      />

      <PageFoot sources={BETA_SOURCES} subphaseFootFor="Create" />

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <SubphaseSectionNav prev={BETA_SECTION_NAV.prev} next={BETA_SECTION_NAV.next} />

      <div className="h-24" />
    </GuideLayout>
  );
}
