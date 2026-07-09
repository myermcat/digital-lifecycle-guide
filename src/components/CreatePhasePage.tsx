import { Link } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { WhereThisFits } from "@/components/WhereThisFits";
import { CREATE_PHASE } from "@/lib/create-phase-content";
import { guideDoorwayCardClassName } from "@/lib/guide-cards";
import { PHASES } from "@/lib/guide-strings";
import createToLiveVisual from "@/assets/lifecycle_create_to_live.svg?url";
import { whereThisFitsForCreateSubphase } from "@/lib/lifecycle-navigation";
import { renderLinkedProse, renderThreadWhoseJob } from "@/lib/thread-rich-content";
import {
  guideLink,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
  guideCardHeading,
  guideCalloutLabel,
} from "@/lib/guide-typography";

export function CreatePhasePage() {
  const { approvalPointer, team, workingThroughCreate, sources } = CREATE_PHASE;

  return (
    <GuideLayout id="create">
      <PhaseBreadcrumb
        lifecyclePhase={PHASES.create.title}
        lifecyclePhaseHref={PHASES.create.href}
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForCreateSubphase(null)} />
      </section>

      <blockquote className="mt-6 md:mt-8 border-l-4 border-l-primary/35 pl-4 md:pl-5 font-serif text-lg md:text-xl text-foreground/90 leading-snug">
        {CREATE_PHASE.oneLineDescription}
      </blockquote>

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        {CREATE_PHASE.lead.map((paragraph) => (
          <p key={paragraph.text}>{renderLinkedProse(paragraph)}</p>
        ))}
      </section>

      <section
        className="mt-10 md:mt-12 scroll-mt-24 text-center"
        id={approvalPointer.id}
      >
        <Link
          to={approvalPointer.href}
          className="inline-flex text-primary/55 hover:text-primary/75 transition-colors"
          aria-label="How a service gets approved and funded"
        >
          <HelpCircle className="size-32 md:size-40" strokeWidth={1.15} aria-hidden />
        </Link>
        <p className={`${guideCalloutLabel} mt-4 max-w-md mx-auto normal-case tracking-normal`}>
          {renderLinkedProse(approvalPointer.caption)}
        </p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={team.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>{team.title}</h2>
        {renderThreadWhoseJob(team)}
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

        <p className={`${guideProse} mt-5 text-foreground/70`}>
          Launch is the crossing into{" "}
          <Link to={PHASES.live.href} className={guideLink}>
            Live
          </Link>
          : the service goes live and becomes the real one people use, in place of whatever they did
          before.
        </p>

        <img
          src={createToLiveVisual}
          alt="Create to Live crossing"
          className="max-w-2xl mx-auto mt-4 w-full"
        />
      </section>

      <PageFoot sources={sources} />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <div className="h-24" />
    </GuideLayout>
  );
}
