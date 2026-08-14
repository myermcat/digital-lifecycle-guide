import { CautionBlock } from "@/components/CautionBlock";
import { GuideCallout } from "@/components/GuideCallout";
import { CheckpointMapSeeAlsoLink } from "@/components/CheckpointMapPointers";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import { LifecycleVisual, LifecycleVisualStack } from "@/components/LifecycleVisual";
import { RequirementTypesTable } from "@/components/RequirementTypesTable";
import { RequirementsNamingStrip } from "@/components/RequirementsNamingStrip";
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
import type { SourceItem } from "@/components/SourcesBlock";
import {
  ALPHA_ACCORDION,
  ALPHA_ACCORDION_STAGES,
  ALPHA_AI_CALLOUT,
  ALPHA_BUYER_BEWARE,
  ALPHA_CAUTION,
  ALPHA_EXERCISE,
  ALPHA_EXTRACT,
  ALPHA_EXTRACT_CLOSING,
  ALPHA_FINISH,
  ALPHA_ON_RAMP,
  ALPHA_PILLAR,
  ALPHA_PROTOTYPE_QUOTE,
  ALPHA_SECTION_NAV,
  ALPHA_TEAM,
} from "@/lib/create-alpha-content";
import { SUBPHASE_META } from "@/lib/lifecycle-navigation";
import { LIFECYCLE_VISUALS, subphaseFootVisuals } from "@/lib/lifecycle-visuals";
import {
  renderLinkedProse,
  renderThreadSections,
} from "@/lib/thread-rich-content";
import { guideBodySubheading, guideListIndent, guideProse } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const ALPHA_SOURCES: SourceItem[] = [
  {
    label: "Templates and tools",
    linkKey: "design-canada",
    description:
      "Canada.ca design system (design.canada.ca): user-tested styles, templates, and patterns to prototype with.",
  },
  {
    label: "Templates and tools",
    linkKey: "gc-design-system",
    description:
      "GC Design System (Canadian Digital Service): ready-made, accessible interface components.",
  },
  {
    label: "Templates and tools",
    linkKey: "gc-forms-assistance",
    description:
      "GC Forms (Canadian Digital Service): a form-building platform for prototyping forms without writing code.",
  },
  {
    label: "Templates and tools",
    linkKey: "digital-accessibility-toolkit",
    description:
      "Digital Accessibility Toolkit (a11y.canada.ca): how-tos for designing, building, and testing accessible services.",
  },
  {
    label: "Governing instrument",
    linkKey: "digital-standards",
    description:
      "Government of Canada Digital Standards (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "guideline-service-digital",
    description:
      "Guideline on Service and Digital (TBS).",
  },
  {
    label: "Governing instrument",
    linkKey: "gc-enterprise-architecture-framework",
    description:
      "GC Enterprise Architecture Framework (TBS): the criteria your departmental architecture review board assesses the build-or-buy direction against; the largest initiatives go to the GC-level board.",
  },
  {
    label: "Governing instrument",
    linkKey: "en-301-549",
    description:
      "CAN/ASC - EN 301 549:2024 (Accessibility Standards Canada): the accessibility standard new web pages and applications must conform to under the Accessible Canada Regulations.",
  },
  {
    label: "Supporting reference",
    linkKey: "design-research",
    description:
      "Canada.ca design system, research and testing how-to: methods for testing prototypes with users.",
  },
  {
    label: "Supporting reference",
    linkKey: "esdc-a11y-regulations-guidance",
    description:
      "Guidance on the Digital Technologies Accessibility Regulations (ESDC): what must conform, and by when.",
  },
  {
    label: "Supporting reference",
    linkKey: "harmonized-tra-methodology",
    description:
      "Harmonized Threat and Risk Assessment methodology (Canadian Centre for Cyber Security): how the threats to a service are listed and ranked.",
  },
  {
    label: "Communities",
    linkKey: "gc-ux-network",
    description:
      "Government of Canada UX Network: user research practitioners across government; also on GCXchange, search the name.",
  },
];

const alphaQuoteClassName =
  "mt-6 md:mt-8 border-l-4 border-l-primary/35 pl-4 md:pl-5 font-serif text-lg md:text-xl text-foreground/90 leading-snug";

/** Step headings inside the threat-and-continuity exercise, so it reads as three moves. */
const exerciseStepHeading =
  "mt-6 mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary/90";

export function CreateAlphaPage() {
  const meta = SUBPHASE_META.alpha;
  const PillarIcon = ALPHA_PILLAR.icon;
  const ExerciseIcon = ALPHA_EXERCISE.icon;

  return (
    <GuideLayout id="create-alpha">
      <PhaseBreadcrumb
        pageHeading={meta.pageHeading}
        lifecyclePhase="Create"
        lifecyclePhaseHref="/create"
        subphase="Alpha"
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...meta.where()} />
      </section>

      <SubphaseDescriptionPanel>
        <div className={`${guideProse} space-y-3`}>
          <p className={guideBodySubheading}>{ALPHA_EXTRACT.spine}</p>
          <p>{renderLinkedProse(ALPHA_EXTRACT.opening)}</p>
          <ul className={`list-disc space-y-1 ${guideListIndent}`}>
            {ALPHA_EXTRACT.workOutItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{renderLinkedProse(ALPHA_EXTRACT.closing)}</p>
          <p>
            <Sparkles
              className="mr-1.5 inline h-4 w-4 -translate-y-px text-primary/70"
              aria-hidden
            />
            <span className="mr-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {ALPHA_EXTRACT.whatsNew.label}
            </span>
            {ALPHA_EXTRACT.whatsNew.text}
          </p>
          <p>{renderLinkedProse(ALPHA_EXTRACT_CLOSING)}</p>
        </div>
      </SubphaseDescriptionPanel>

      <CheckpointMapSeeAlsoLink phaseLabel="Alpha" hash="alpha" />

      <blockquote className={cn(alphaQuoteClassName)}>
        <p>
          <strong className="font-semibold text-foreground">
            {ALPHA_PROTOTYPE_QUOTE.title}
          </strong>
        </p>
        <p className={`mt-2 ${guideProse}`}>{ALPHA_PROTOTYPE_QUOTE.body}</p>
      </blockquote>

      <LifecycleVisual visual={LIFECYCLE_VISUALS.subphaseKeyAlpha} />

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
        <p className="mt-4">{renderLinkedProse(ALPHA_PILLAR.killersIntro)}</p>
        <ul className={`mt-2 list-disc space-y-1 ${guideListIndent}`}>
          {ALPHA_PILLAR.killers.map((item) => (
            <li key={item.text}>{renderLinkedProse(item)}</li>
          ))}
        </ul>
        <LifecycleVisual
          visual={LIFECYCLE_VISUALS.whatKillsAService}
          className="mt-5"
        />
        <p className="mt-4">{renderLinkedProse(ALPHA_PILLAR.ratioNote)}</p>
        <p className="mt-4">{renderLinkedProse(ALPHA_PILLAR.technicalNote)}</p>
        <p className="mt-4 font-semibold">
          {renderLinkedProse(ALPHA_PILLAR.closingWarning)}
        </p>
      </PillarCallout>

      <IconAccordionSection
        id={ALPHA_ACCORDION.id}
        title={ALPHA_ACCORDION.title}
        stages={ALPHA_ACCORDION_STAGES.map((stage) => ({
          id: stage.id,
          icon: stage.icon,
          title: stage.title,
          headerContent: stage.headerVisual ? (
            <LifecycleVisual visual={stage.headerVisual} className="mt-0" />
          ) : undefined,
          children:
            // The table has to arrive between the sentence that sets it up and
            // the rule that reads off it, so this one stage renders in halves.
            stage.id === "write-the-requirements" ? (
              <>
                {renderThreadSections(stage.sections.slice(0, 1))}
                <RequirementTypesTable />
                {renderThreadSections(stage.sections.slice(1))}
                <RequirementsNamingStrip />
              </>
            ) : stage.id === "measure-success" ? (
              <>
                {renderThreadSections(stage.sections)}
                <LifecycleVisual visual={LIFECYCLE_VISUALS.serviceDashboard} className="mt-5" />
              </>
            ) : stage.id === "throwaway-prototypes" ? (
              // The AI warning has to land on the AI step, and the
              // buyer-beware warning after the whole ladder, so this stage
              // renders in halves too.
              <>
                {renderThreadSections(stage.sections.slice(0, 8))}
                <GuideCallout
                  compact
                  className="my-5 md:my-6"
                  label={ALPHA_AI_CALLOUT.label}
                  title={ALPHA_AI_CALLOUT.title}
                >
                  <p>
                    {ALPHA_AI_CALLOUT.body.split(ALPHA_AI_CALLOUT.bodyBold)[0]}
                    <strong>{ALPHA_AI_CALLOUT.bodyBold}</strong>
                    {ALPHA_AI_CALLOUT.body.split(ALPHA_AI_CALLOUT.bodyBold)[1]}
                  </p>
                </GuideCallout>
                {renderThreadSections(stage.sections.slice(8))}
                <GuideCallout
                  compact
                  className="mt-5 md:mt-6"
                  label={ALPHA_BUYER_BEWARE.label}
                  title={ALPHA_BUYER_BEWARE.title}
                >
                  <p>
                    {ALPHA_BUYER_BEWARE.body.split(ALPHA_BUYER_BEWARE.bodyBold)[0]}
                    <strong>{ALPHA_BUYER_BEWARE.bodyBold}</strong>
                  </p>
                </GuideCallout>
              </>
            ) : (
              renderThreadSections(stage.sections)
            ),
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

      <PillarCallout
        id={ALPHA_EXERCISE.sectionId}
        label={ALPHA_EXERCISE.label}
        title={ALPHA_EXERCISE.title}
        icon={ExerciseIcon}
        href={ALPHA_EXERCISE.href}
        linkLabel={ALPHA_EXERCISE.linkLabel}
      >
        <p>{renderLinkedProse(ALPHA_EXERCISE.bodyIntro)}</p>
        <ol className="mt-4 space-y-3">
          {ALPHA_EXERCISE.bodyQuestions.map((item, index) => (
            <li key={item.text} className="flex gap-3">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-sm font-semibold leading-none"
              >
                {index + 1}
              </span>
              <span className="font-semibold leading-6">
                {renderLinkedProse(item)}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4">{renderLinkedProse(ALPHA_EXERCISE.bodyAfterQuestions)}</p>

        <h3 className={exerciseStepHeading}>{ALPHA_EXERCISE.threatsHeading}</h3>
        <p>{renderLinkedProse(ALPHA_EXERCISE.threatsIntro)}</p>
        <ul className={`mt-2 list-disc space-y-1 ${guideListIndent}`}>
          {ALPHA_EXERCISE.threatItems.map((item) => (
            <li key={item.text}>{renderLinkedProse(item)}</li>
          ))}
        </ul>
        <p className="mt-3">{renderLinkedProse(ALPHA_EXERCISE.threatsClosing)}</p>

        <p className="mt-4">{renderLinkedProse(ALPHA_EXERCISE.numbersPointer)}</p>
        <p className="mt-3">{renderLinkedProse(ALPHA_EXERCISE.scaleNote)}</p>

        <h3 className={exerciseStepHeading}>{ALPHA_EXERCISE.handoverHeading}</h3>
        <p>{renderLinkedProse(ALPHA_EXERCISE.ownershipNote)}</p>
        <p className="mt-3">{renderLinkedProse(ALPHA_EXERCISE.confusionNote)}</p>
        <p className="mt-3">{renderLinkedProse(ALPHA_EXERCISE.closing)}</p>
      </PillarCallout>

      <SubphaseFinishSection
        title={ALPHA_FINISH.title}
        sectionId={ALPHA_FINISH.sectionId}
        intro={ALPHA_FINISH.intro}
        blocks={ALPHA_FINISH.blocks}
        exits={ALPHA_FINISH.exits}
        offRamp={ALPHA_FINISH.offRamp}
      />


      <LifecycleVisualStack
        visuals={subphaseFootVisuals("Create")}
        variant="subphaseFoot"
        className="mt-10 md:mt-12"
      />

      <SubphaseInstruments subPhase="alpha" />

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
