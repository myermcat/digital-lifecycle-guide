import { CautionBlock } from "@/components/CautionBlock";
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
import { guideListIndent, guideProse, guideSectionTitle } from "@/lib/guide-typography";

const BETA_SOURCES: SourceItem[] = [
  { label: "Guideline on Service and Digital (TBS)", linkKey: "guideline-service-digital" },
  { label: "Supporting reference", linkKey: "directive-security-management" },
  { label: "Supporting reference", linkKey: "itsg-33" },
  { label: "Supporting reference", linkKey: "algorithmic-impact-assessment" },
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
          <p>{renderLinkedProse(BETA_EXTRACT.opening)}</p>
          <ul className={`list-disc space-y-1 ${guideListIndent}`}>
            {BETA_EXTRACT.workOutItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{renderLinkedProse(BETA_EXTRACT.scoped)}</p>
          <p>{renderLinkedProse(BETA_EXTRACT_CLOSING)}</p>
        </div>
      </SubphaseDescriptionPanel>

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
