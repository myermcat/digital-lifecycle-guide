import { CautionBlock } from "@/components/CautionBlock";
import { RealExampleCallout } from "@/components/RealExampleCallout";
import { REAL_EXAMPLES } from "@/lib/real-examples";
import { EditorialNote } from "@/components/EditorialNote";
import { CheckpointMapSeeAlsoLink } from "@/components/CheckpointMapPointers";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideCallout } from "@/components/GuideCallout";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import { LifecycleVisualStack } from "@/components/LifecycleVisual";
import { OnRampChecklist } from "@/components/OnRampChecklist";
import { PageFoot } from "@/components/PageFoot";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PillarCallout } from "@/components/PillarCallout";
import { SubphaseDescriptionPanel } from "@/components/SubphaseDescriptionPanel";
import { SubphaseInstruments } from "@/components/SubphaseInstruments";
import { SubphaseFinishSection } from "@/components/SubphaseFinishSection";
import { SubphaseSectionNav } from "@/components/SubphaseSectionNav";
import { SubphaseTeamRoles } from "@/components/SubphaseTeamRoles";
import { WhereThisFits } from "@/components/WhereThisFits";
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
  DISCOVERY_SOURCES,
  DISCOVERY_TEAM,
} from "@/lib/create-discovery-content";
import { SUBPHASE_META } from "@/lib/lifecycle-navigation";
import { LIFECYCLE_VISUALS, subphaseFootVisuals } from "@/lib/lifecycle-visuals";
import {
  renderLinkedProse,
  renderThreadSections,
} from "@/lib/thread-rich-content";
import { guideBodySubheading, guideListIndent, guideProse } from "@/lib/guide-typography";
import { UI } from "@/lib/ui-strings";

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

      <CheckpointMapSeeAlsoLink phaseLabel="Discovery" hash="discovery" />

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

      <EditorialNote className="mt-5 md:mt-6" label={UI.note}>
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

      <GuideCallout
        compact
        className="mt-5 md:mt-6"
        title={DISCOVERY_TEAM.buyATeamNote.heading}
      >
        {DISCOVERY_TEAM.buyATeamNote.body.map((para, i) => (
          <p key={para.text} className={i === 0 ? undefined : "mt-2"}>
            {renderLinkedProse(para)}
          </p>
        ))}
      </GuideCallout>

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
        blocks={DISCOVERY_FINISH.blocks}
        aside={DISCOVERY_FINISH.aside}
        exits={DISCOVERY_FINISH.exits}
        offRamp={DISCOVERY_FINISH.offRamp}
      />


      <LifecycleVisualStack
        visuals={subphaseFootVisuals("Create")}
        variant="subphaseFoot"
        className="mt-10 md:mt-12"
      />

      <SubphaseInstruments subPhase="discovery" />

      <PageFoot sources={DISCOVERY_SOURCES} />

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <SubphaseSectionNav
        prev={DISCOVERY_SECTION_NAV.prev}
        next={DISCOVERY_SECTION_NAV.next}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
