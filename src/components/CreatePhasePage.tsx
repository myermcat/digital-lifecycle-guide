import { Link } from "@tanstack/react-router";
import { CheckpointMapPhaseCallout } from "@/components/CheckpointMapPointers";
import { CautionBlock } from "@/components/CautionBlock";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import { LifecycleVisualStack } from "@/components/LifecycleVisual";
import { PageFoot } from "@/components/PageFoot";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PhaseQuote } from "@/components/PhaseQuote";
import { SubphaseSectionNav } from "@/components/SubphaseSectionNav";
import { WhereThisFits } from "@/components/WhereThisFits";
import { CREATE_PHASE } from "@/lib/create-phase-content";
import { guideDoorwayCardClassName } from "@/lib/guide-cards";
import { PHASES } from "@/lib/guide-strings";
import createToLiveVisual from "@/assets/lifecycle_create_to_live.svg?url";
import { whereThisFitsForCreateSubphase } from "@/lib/lifecycle-navigation";
import { PHASE_CROSSING } from "@/lib/phase-crossing-strings";
import { subphaseFootVisuals } from "@/lib/lifecycle-visuals";
import { renderLinkedProse } from "@/lib/thread-rich-content";
import {
  guideLink,
  guideListIndent,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
  guideCardHeading,
  guideCalloutLabel,
} from "@/lib/guide-typography";
import { UI } from "@/lib/ui-strings";

export function CreatePhasePage() {
  const { workOfCreate, workingThroughCreate, sources } = CREATE_PHASE;

  return (
    <GuideLayout id="create">
      <PhaseBreadcrumb
        pageHeading={PHASES.create.pageHeading}
        lifecyclePhase={PHASES.create.title}
        lifecyclePhaseHref={PHASES.create.href}
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForCreateSubphase(null)} />
      </section>

      <PhaseQuote quote={CREATE_PHASE.quote} />

      <LifecycleVisualStack
        visuals={subphaseFootVisuals("Create")}
        variant="subphaseFoot"
        className="mt-5 md:mt-6"
      />

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        {CREATE_PHASE.lead.map((paragraph) => (
          <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
        ))}
      </section>

      <CheckpointMapPhaseCallout
        text={UI.createCheckpointsLead}
        hash="discovery"
        linkLabel={UI.seeCheckpointsInCreate}
      />

      <section className="mt-10 md:mt-12 scroll-mt-24" id={workOfCreate.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{workOfCreate.title}</h2>
        <div className={guideProseSpace}>
          <p>
            <strong>{workOfCreate.introBold}</strong>
          </p>
          <div className="mt-5">
            <IconAccordionSection
              embedded
              stages={workOfCreate.blocks.map((block) => ({
                id: block.heading,
                title: block.heading,
                children: (
                  <>
                    <p>{block.lead}</p>
                    {"afterLead" in block && block.afterLead ? (
                      <p className="mt-2">{renderLinkedProse({ ...block.afterLead })}</p>
                    ) : null}
                    <ul className={`mt-2 list-disc space-y-2 ${guideListIndent}`}>
                      {block.bullets.map((bullet) => (
                        <li key={bullet.text}>{renderLinkedProse(bullet)}</li>
                      ))}
                    </ul>
                  </>
                ),
              }))}
            />
          </div>
          <p className="mt-6">
            <strong>{workOfCreate.closing.leadIn}</strong> {workOfCreate.closing.text}
          </p>
        </div>
      </section>

      <section
        className="mt-10 md:mt-12 scroll-mt-24"
        id={workingThroughCreate.id}
      >
        <h2 className={`${guideSectionTitle} mb-3`}>{workingThroughCreate.title}</h2>
        <p className={`${guideProse} mb-5`}>{workingThroughCreate.intro}</p>

        <div className={guideDoorwayCardClassName}>
          <div className="divide-y divide-primary/20">
            {workingThroughCreate.subphases.map((row) => (
              <div key={row.href} className="px-5 py-2.5 md:px-6 md:py-3">
                <Link
                  to={row.href as string}
                  className={`${guideCardHeading} ${guideLink} inline-flex items-center gap-1 text-primary`}
                >
                  {row.title} <span aria-hidden>→</span>
                </Link>
                <p className={`${guideCalloutLabel} mt-1`}>{row.description}</p>
              </div>
            ))}
          </div>
        </div>

        <p className={`${guideProse} mt-5`}>
          {PHASE_CROSSING.createToLiveLeadIn}{" "}
          <Link to={PHASES.live.href} className={guideLink}>
            {UI.live}
          </Link>
          {PHASE_CROSSING.createToLiveRest}
        </p>

        <img
          src={createToLiveVisual}
          alt={UI.createToLiveCrossingAlt}
          className="max-w-2xl mx-auto mt-4 w-full"
        />
      </section>

      <CautionBlock
        id="cost-of-leaving-it-late"
        className="mt-10 md:mt-12"
        title={CREATE_PHASE.costOfLate.title}
        lead={CREATE_PHASE.costOfLate.lead}
        items={[...CREATE_PHASE.costOfLate.items]}
      />

      <PageFoot
        sources={sources}
        sourcesIntro={UI.phaseLevelReferencesNote}
      />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <SubphaseSectionNav
        next={{
          href: "/create-discovery",
          label: PHASE_CROSSING.nextDiscoverySubphase,
          level: "subphase",
        }}
      />

      <div className="h-24" />
    </GuideLayout>
  );
}
