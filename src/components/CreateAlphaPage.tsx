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
  ALPHA_ACCORDION,
  ALPHA_ACCORDION_STAGES,
  ALPHA_CAUTION,
  ALPHA_EXTRACT,
  ALPHA_EXTRACT_CLOSING,
  ALPHA_FINISH,
  ALPHA_ON_RAMP,
  ALPHA_PILLAR,
  ALPHA_SECTION_NAV,
  ALPHA_TEAM,
} from "@/lib/create-alpha-content";
import { SUBPHASE_META } from "@/lib/lifecycle-navigation";
import {
  renderLinkedProse,
  renderThreadSections,
} from "@/lib/thread-rich-content";
import { guideListIndent, guideProse } from "@/lib/guide-typography";

const ALPHA_SOURCES: SourceItem[] = [
  { label: "Government of Canada digital standards (TBS)", linkKey: "digital-standards" },
  { label: "Guideline on Service and Digital (TBS)", linkKey: "guideline-service-digital" },
];

export function CreateAlphaPage() {
  const meta = SUBPHASE_META.alpha;
  const PillarIcon = ALPHA_PILLAR.icon;

  return (
    <GuideLayout id="create-alpha">
      <PhaseBreadcrumb
        lifecyclePhase="Create"
        lifecyclePhaseHref="/create"
        subphase="Alpha"
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...meta.where()} />
      </section>

      <aside className="mt-5 md:mt-6 rounded-xl border-2 border-dashed border-primary/40 bg-background px-5 py-5 md:px-6 md:py-6">
        <div className={`${guideProse} space-y-3`}>
          <p>{renderLinkedProse(ALPHA_EXTRACT.opening)}</p>
          <ul className={`list-disc space-y-1 ${guideListIndent}`}>
            {ALPHA_EXTRACT.workOutItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{renderLinkedProse(ALPHA_EXTRACT.closing)}</p>
          <p>{renderLinkedProse(ALPHA_EXTRACT_CLOSING)}</p>
        </div>
      </aside>

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
        exits={ALPHA_FINISH.exits}
        offRamp={ALPHA_FINISH.offRamp}
      />

      <PageFoot sources={ALPHA_SOURCES} />

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <SubphaseSectionNav
        prev={ALPHA_SECTION_NAV.prev}
        next={ALPHA_SECTION_NAV.next}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
