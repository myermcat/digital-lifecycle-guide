import { Link } from "@tanstack/react-router";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { WhereThisFits } from "@/components/WhereThisFits";
import { guideDoorwayCardClassName } from "@/lib/guide-cards";
import { PHASES } from "@/lib/guide-strings";
import createToSunsetVisual from "@/assets/lifecycle_live_to_sunset.svg?url";
import { whereThisFitsForLiveSubphase } from "@/lib/lifecycle-navigation";
import { LIVE_PHASE } from "@/lib/live-phase-content";
import type { SourceItem } from "@/components/SourcesBlock";
import {
  guideCardHeading,
  guideLink,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";

export function LivePhasePage() {
  const { subphases } = LIVE_PHASE;

  const sources: SourceItem[] = [
    { label: "Guideline on Service and Digital (TBS)", linkKey: "guideline-service-digital" },
  ];

  return (
    <GuideLayout id="live">
      <PhaseBreadcrumb lifecyclePhase={PHASES.live.title} lifecyclePhaseHref={PHASES.live.href} />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForLiveSubphase(null)} />
      </section>

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        <p>
          Live is the longest stretch of a service&apos;s life, and where most of its time and
          money go. Once the service launches, the work turns from getting it ready to running it
          well and making it better, year after year.
        </p>
        <p>
          This is where the idea that a service is a project that ends at launch falls apart. From
          the day it goes live until the day it is replaced or retired, a live service has to be
          kept running, kept improving, and kept funded and within the rules.
        </p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="the-work-of-live">
        <h2 className={`${guideSectionTitle} mb-3`}>The work of Live</h2>
        <div className={guideProseSpace}>
          <p>
            Live is three kinds of work running side by side, for as long as the service is used.
          </p>
          <p>
            <strong>Keep it running.</strong> A live service has to stay reliable under real, full
            load. The team watches it through{" "}
            <Link to={"/thread/monitoring-and-instrumentation" as string} className={guideLink}>
              monitoring
            </Link>{" "}
            and acts on what the signals show, releases changes{" "}
            <Link to={"/thread/releasing-changes" as string} className={guideLink}>
              small and often
            </Link>{" "}
            so fixes and improvements go out safely, and keeps it secure by detecting and
            responding{" "}
            <Link to={"/thread/security" as string} className={guideLink}>
              to trouble
            </Link>{" "}
            and keeping its{" "}
            <Link to={"/thread/dependencies-and-standards" as string} className={guideLink}>
              dependencies
            </Link>{" "}
            patched and current.
          </p>
          <p>
            <strong>Keep making it better.</strong> Live is the longest chapter of continuous
            improvement. Real use and fresh{" "}
            <Link to={"/thread/user-research" as string} className={guideLink}>
              user research
            </Link>{" "}
            show what to fix and add next; the{" "}
            <Link to={"/thread/backlog" as string} className={guideLink}>
              backlog
            </Link>{" "}
            is where those become prioritized work; and{" "}
            <Link to={"/thread/change-management" as string} className={guideLink}>
              change management
            </Link>{" "}
            wins the adoption that turns a delivered change into one people actually use.
          </p>
          <p>
            <strong>Keep it funded and within the rules.</strong> A live service does not run
            itself. Its{" "}
            <Link to={"/thread/funding" as string} className={guideLink}>
              funding
            </Link>{" "}
            has to be renewed before the current money runs out, its{" "}
            <Link to={"/thread/privacy" as string} className={guideLink}>
              privacy
            </Link>{" "}
            assessment kept current as it changes, its{" "}
            <Link to={"/thread/accessibility" as string} className={guideLink}>
              accessibility
            </Link>{" "}
            held to standard, its{" "}
            <Link to={"/thread/data-stewardship" as string} className={guideLink}>
              data
            </Link>{" "}
            retained and disposed of on schedule, and the{" "}
            <Link to={"/thread/team-capability" as string} className={guideLink}>
              team
            </Link>{" "}
            that understands it kept together.
          </p>
          <p>
            <strong>The work comes round again.</strong> Create runs through one-time approvals.
            Live&apos;s checks recur instead: a security review on every release, the privacy
            assessment refreshed as the service changes, funding renewed before it runs out. Live
            settles into a rhythm and keeps going.
          </p>
        </div>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id={subphases.id}>
        <h2 className={`${guideSectionTitle} mb-3`}>The three sub-phases of Live</h2>
        <p className={`${guideProse} mb-5`}>
          Across its life, Live moves through three sub-phases, each with its own page.
        </p>

        <div className={guideDoorwayCardClassName}>
          <div className="divide-y divide-primary/20">
            {subphases.rows.map((row) => (
              <div key={row.href} className="px-5 py-2.5 md:px-6 md:py-3">
                <Link
                  to={row.href as string}
                  className={`${guideCardHeading} ${guideLink} inline-flex items-center gap-1 text-primary`}
                >
                  {row.title} <span aria-hidden>→</span>
                </Link>
                <p className={`${guideProse} mt-1 text-foreground/70`}>{row.description}</p>
              </div>
            ))}
          </div>
        </div>

        <p className={`${guideProse} mt-5 text-foreground/70`}>
          Leaving Live is the crossing into{" "}
          <Link to={PHASES.sunset.href} className={guideLink}>
            Sunset
          </Link>
          : the service is being replaced or retired, and the exit has to be planned and funded
          before the money runs out.
        </p>

        <img
          src={createToSunsetVisual}
          alt="Live to Sunset crossing"
          className="max-w-2xl mx-auto mt-4 w-full"
        />
      </section>

      <PageFoot sources={sources} />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

      <div className="h-24" />
    </GuideLayout>
  );
}

