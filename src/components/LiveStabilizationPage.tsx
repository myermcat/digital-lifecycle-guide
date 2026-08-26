import { UI } from "@/lib/ui-strings";
import { CautionBlock } from "@/components/CautionBlock";
import { RealExampleCallout } from "@/components/RealExampleCallout";
import { REAL_EXAMPLES } from "@/lib/real-examples";
import { CheckpointMapSeeAlsoLink } from "@/components/CheckpointMapPointers";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import { LifecycleVisual, LifecycleVisualStack } from "@/components/LifecycleVisual";
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
import {
  STABILIZATION_ACCORDION,
  STABILIZATION_ACCORDION_STAGES,
  STABILIZATION_CAUTION,
  STABILIZATION_EXTRACT,
  STABILIZATION_FINISH,
  STABILIZATION_LEAD,
  STABILIZATION_WHAT_CHANGED,
  STABILIZATION_WHOLE_SERVICE,
  STABILIZATION_ON_RAMP,
  STABILIZATION_PILLAR,
  STABILIZATION_SOURCES,
  STABILIZATION_TEAM,
} from "@/lib/live-stabilization-content";
import { SUBPHASE_META } from "@/lib/lifecycle-navigation";
import { LIFECYCLE_VISUALS, subphaseFootVisuals } from "@/lib/lifecycle-visuals";
import stabilizationFireVisual from "@/assets/stabilization_fire.svg?url";
import {
  renderLinkedProse,
  renderThreadSections,
} from "@/lib/thread-rich-content";
import { guideProse } from "@/lib/guide-typography";

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

      <CheckpointMapSeeAlsoLink phaseLabel="Stabilization" hash="live" />

      <section className="mt-8 md:mt-10 flex items-center gap-4 md:gap-6">
        <img
          src={stabilizationFireVisual}
          alt={UI.stabilizationFireAlt}
          className="w-36 shrink-0 md:w-44"
        />
        <p className={guideProse}>{renderLinkedProse(STABILIZATION_LEAD)}</p>
      </section>

      <div className="mt-6 rounded-lg border border-border bg-card px-5 py-4">
        <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary/90">
          {STABILIZATION_WHAT_CHANGED.heading}
        </p>
        <ul className="list-none space-y-3 p-0 m-0">
          {STABILIZATION_WHAT_CHANGED.items.map((item) => (
            <li key={item.lead} className={guideProse}>
              <strong className="font-semibold text-foreground">{item.lead}</strong>{" "}
              {item.body}
            </li>
          ))}
        </ul>
      </div>

      <p className={`${guideProse} mt-5`}>
        {renderLinkedProse(STABILIZATION_WHOLE_SERVICE)}
      </p>

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
        blocks={STABILIZATION_FINISH.blocks}
        aside={STABILIZATION_FINISH.aside}
        exits={STABILIZATION_FINISH.exits}
        offRamp={STABILIZATION_FINISH.offRamp}
      />


      <LifecycleVisualStack
        visuals={subphaseFootVisuals("Live")}
        variant="subphaseFoot"
        className="mt-10 md:mt-12"
      />

      <SubphaseInstruments subPhase="stabilization" />

      <PageFoot sources={STABILIZATION_SOURCES} />

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <SubphaseSectionNav
        prev={meta.sectionNav?.prev}
        next={meta.sectionNav?.next}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
