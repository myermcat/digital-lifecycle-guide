import { Link } from "@tanstack/react-router";
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
import { renderThreadWhoseJob } from "@/lib/thread-rich-content";
import {
  guideLink,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
  guideCardHeading,
  guideCalloutLabel,
} from "@/lib/guide-typography";

export function CreatePhasePage() {
  const { approvalPointer, whoseJob, workingThroughCreate, sources } = CREATE_PHASE;

  return (
    <GuideLayout id="create">
      <PhaseBreadcrumb
        lifecyclePhase={PHASES.create.title}
        lifecyclePhaseHref={PHASES.create.href}
      />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForCreateSubphase(null)} />
      </section>

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        <p>{CREATE_PHASE.lead[0]}</p>
        <p>
          Two kinds of work fill Create, side by side. The service is{" "}
          <strong>approved and funded</strong>, a set order of steps owned by different people. And
          it is delivered in three sub-phases,{" "}
          <Link to={"/create-discovery" as string} className={guideLink}>
            Discovery
          </Link>
          ,{" "}
          <Link to={"/create-alpha" as string} className={guideLink}>
            Alpha
          </Link>
          , and{" "}
          <Link to={"/create-beta" as string} className={guideLink}>
            Beta
          </Link>
          , from learning the need to a real service ready to launch.
        </p>
      </section>

      <section
        className="mt-10 md:mt-12 scroll-mt-24"
        id={approvalPointer.id}
      >
        <h2 className={`${guideSectionTitle} mb-3`}>{approvalPointer.title}</h2>
        <p className={guideProse}>
          {approvalPointer.text}{" "}
          <Link to={approvalPointer.linkTo as string} className={guideLink}>
            {approvalPointer.linkText} →
          </Link>
        </p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="who-runs-the-steps">
        <h2 className={`${guideSectionTitle} mb-3`}>Who runs the steps</h2>
        {renderThreadWhoseJob(whoseJob)}
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
