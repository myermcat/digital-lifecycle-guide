import { CautionBlock } from "@/components/CautionBlock";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import { OnRampChecklist } from "@/components/OnRampChecklist";
import { PageFoot } from "@/components/PageFoot";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PillarCallout } from "@/components/PillarCallout";
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
import {
  renderLinkedProse,
  renderThreadSections,
} from "@/lib/thread-rich-content";
import { guideListIndent, guideProse } from "@/lib/guide-typography";

const DISCOVERY_SOURCES: SourceItem[] = [
  { label: "Government of Canada digital standards (TBS)", linkKey: "digital-standards" },
  { label: "Guideline on Service and Digital (TBS)", linkKey: "guideline-service-digital" },
];

export function CreateDiscoveryPage() {
  const meta = SUBPHASE_META.discovery;
  const PillarIcon = DISCOVERY_PILLAR.icon;

  return (
    <GuideLayout id="create-discovery">
      <PhaseBreadcrumb
        lifecyclePhase="Create"
        lifecyclePhaseHref="/create"
        subphase="Discovery"
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...meta.where()} />
      </section>

      <aside className="mt-5 md:mt-6 rounded-xl border-2 border-dashed border-primary/40 bg-background px-5 py-5 md:px-6 md:py-6">
        <div className={`${guideProse} space-y-3`}>
          <p>{renderLinkedProse(DISCOVERY_EXTRACT.opening)}</p>
          <ul className={`list-disc space-y-1 ${guideListIndent}`}>
            {DISCOVERY_EXTRACT.workOutItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{renderLinkedProse(DISCOVERY_EXTRACT.closing)}</p>
          <p>{renderLinkedProse(DISCOVERY_EXTRACT_CLOSING)}</p>
        </div>
      </aside>

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
        <p>{renderLinkedProse(DISCOVERY_PILLAR.body)}</p>
      </PillarCallout>

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

      <SubphaseFinishSection
        title={DISCOVERY_FINISH.title}
        sectionId={DISCOVERY_FINISH.sectionId}
        intro={DISCOVERY_FINISH.intro}
        exits={DISCOVERY_FINISH.exits}
        offRamp={DISCOVERY_FINISH.offRamp}
      />

      <PageFoot sources={DISCOVERY_SOURCES} />

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <SubphaseSectionNav next={DISCOVERY_SECTION_NAV.next} />

      <div className="h-24" />
    </GuideLayout>
  );
}
