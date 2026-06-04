import { createFileRoute } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PracticeCardGroup } from "@/components/PracticeCard";
import { PracticeActivitiesPanel } from "@/components/PracticeActivitiesPanel";
import { WhereThisFits } from "@/components/WhereThisFits";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { whereThisFitsForLivePhase } from "@/lib/lifecycle-navigation";
import { PhaseSection } from "@/components/PhaseSection";
import { DashboardBlock } from "@/components/DashboardBlock";
import { CompactExitList } from "@/components/CompactLinkedList";
import { ThreeReviewLevelsBlock } from "@/components/ThreeReviewLevelsBlock";
import { DoorwayBlock } from "@/components/DoorwayBlock";
import { CautionBlock } from "@/components/CautionBlock";
import { guideProseSpace } from "@/lib/guide-typography";
export const Route = createFileRoute("/live-maturity")({
  head: () => ({
    meta: [
      { title: "Maturity — Live — The Digital Lifecycle Guide" },
      {
        name: "description",
        content:
          "The mature life of a digital service in the Live region — operating and improving an existing service.",
      },
    ],
  }),
  component: LiveMaturityPage,
});

function LiveMaturityPage() {
  return (
    <GuideLayout id="live-maturity">
      <PhaseBreadcrumb region="Live" regionHref="/live" phase="Maturity" />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForLivePhase("maturity")} />
      </section>

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        <p>
          You are no longer shipping major new features. Most of the work is keeping the
          service healthy, secure, affordable, and useful to the people who rely on it.
        </p>
        <p>
          Maturity is not maintenance only. You will continue to make improvements,
          respond to what users tell you, and replace parts of the service over time. The
          difference from earlier phases is that you are operating and improving an
          existing service rather than building a new one.
        </p>
      </section>

      <DoorwayBlock
        id="doorway"
        heading="New to Maturity? Start here."
        href="#maturity-orientation"
        linkLabel="Begin the orientation →"
      >
        <p>
          The first thing to do is understand the service as it currently is before changing
          anything. Then find your monitoring, your backlog, your latest security and privacy
          assessments, and schedule your first check-in.
        </p>
      </DoorwayBlock>

      <PhaseSection title="Running your service in Maturity" sectionId="running-your-service">
        <p>
          Running your service in Maturity means doing a set of recurring activities at a
          sensible frequency. You do not need to do all of them every time. The point is
          that across a reasonable period, each one is being done. Pick what fits where
          your service is and how it is changing.
        </p>

        <PracticeActivitiesPanel>
        <PracticeCardGroup
          heading="Keep the service working well"
          cards={[
            {
              label: "Monitor and improve performance",
              href: "#practice-monitor-performance",
              description:
                "Track how the service actually behaves in production. The signals you watch should come from instrumentation, not from impressions.",
            },
            {
              label: "Ship changes safely",
              href: "#practice-ship-changes-safely",
              description:
                "Keep changes small, tested, and reversible, with zero-downtime releases and a rollback you have actually tested.",
            },
            {
              label: "Manage your dependencies and open standards",
              href: "#practice-manage-dependencies-standards",
              description:
                "Track what your service relies on upstream, and adopt the updates that matter.",
            },
          ]}
        />

        <PracticeCardGroup
          heading="Keep the service good for users"
          cards={[
            {
              label: "Continue user research",
              href: "#practice-continue-user-research",
              description:
                "Stay in contact with the people who use your service, and act on what they tell you.",
            },
            {
              label: "Maintain accessibility",
              href: "#practice-maintain-accessibility",
              description:
                "Standards and assistive technologies change. Test on a cadence and with disabled users, not only with automated checks.",
            },
          ]}
        />

        <PracticeCardGroup
          heading="Keep the service safe and well-governed"
          cards={[
            {
              label: "Maintain security and privacy",
              href: "#practice-maintain-security-privacy",
              description:
                "Patch on schedule, audit access, test for vulnerabilities, and keep your incident response plan current.",
            },
            {
              label: "Steward the data",
              href: "#practice-steward-data",
              description:
                "Hold only the data you still need, dispose of what you should, and open what you can.",
            },
            {
              label: "Review ethics and bias",
              href: "#practice-review-ethics-bias",
              description:
                "If the service makes automated decisions, test for bias on a schedule and keep the assessment current.",
            },
          ]}
        />

        <PracticeCardGroup
          heading="Keep the team able to do the work"
          cards={[
            {
              label: "Maintain team capability",
              href: "#practice-maintain-team-capability",
              description:
                "Document knowledge so it survives staff changes, run retrospectives, and manage any vendor relationships against the contract.",
            },
            {
              label: "Run the backlog",
              href: "#practice-run-backlog",
              description:
                "Keep one prioritised list, reorder it at every check-in, and record what you decide not to do.",
            },
          ]}
        />

        <PracticeCardGroup
          heading="Keeping the whole service joined up"
          cards={[
            {
              label: "Coordinate with adjacent services",
              href: "#practice-coordinate-adjacent-services",
              description:
                "Keep working with the teams responsible for the services on either side of yours, so the user's whole journey keeps working and not just your part of it.",
            },
            {
              label: "Keep all channels in step",
              href: "#practice-keep-channels-in-step",
              description:
                "As the online service changes, keep the other channels in sync: update call centre scripts, retrain operations staff, and make sure the people who support users understand the current service.",
            },
          ]}
        />
        </PracticeActivitiesPanel>
      </PhaseSection>

      <PhaseSection title="Watching the right signals" sectionId="watching-signals">
        <DashboardBlock href="#practice-build-dashboard" />
      </PhaseSection>

      <PhaseSection title="Three levels of review" sectionId="reviewing-three-levels">
        <ThreeReviewLevelsBlock
          subtitle="A service in Maturity is looked at in three different ways. Each one sees something the others cannot."
          items={[
            {
              tag: "FREQUENT · INTERNAL",
              title: "The check-in",
              body: "Internal and frequent. The team turns the signals into decisions. It is maintenance, not an exam.",
              href: "#review-check-in",
            },
            {
              tag: "OCCASIONAL · EXTERNAL",
              title: "The peer review",
              body: "External and occasional. If no one from outside looks, you never see your own gaps.",
              href: "#review-peer-review",
            },
            {
              tag: "RARE · CENTRAL",
              title: "The institutional review",
              body: "External and rare. A central body looks at the service when its scope or impact warrants it.",
              href: "#review-institutional-review",
            },
          ]}
        />
      </PhaseSection>

      <PhaseSection title="When you need to leave Maturity" sectionId="leaving-maturity">
        <p>
          Maturity is the longest phase, but not permanent. Three things can move a service
          out of it.
        </p>
        <CompactExitList
          items={[
            {
              lead: "Back to Growth,",
              rest: "when a new mandate or expanding scope means you are shipping substantial new features again.",
              href: "/live-growth",
            },
            {
              lead: "Forward to Sunset,",
              rest: "when a sunset signal appears: support ending, a replacement coming, the user base shrinking, the policy basis going away.",
              href: "/sunset",
            },
            {
              lead: "Back to a Stabilization-like mode,",
              rest: "when a critical failure or major replatforming forces a period of rapid stabilisation.",
              href: "/live-stabilization",
            },
          ]}
        />
      </PhaseSection>

      <section className="mt-10 md:mt-12">
        <CautionBlock
          id="when-this-does-not-work"
          title="When this does not work"
          lead="Doing these activities is not the same as doing them well. A service can run every one of them on the surface and still be failing."
          items={[
            {
              heading: "Going through the motions",
              line: "The check-in can happen, the dashboard can exist, the boxes can be ticked, and nothing improves.",
            },
            {
              heading: "Dashboard by impression",
              line: "A dashboard built from impressions instead of instrumentation drifts from reality and can be gamed.",
            },
            {
              heading: "Check-ins that change nothing",
              line: "A check-in that produces no decisions leaves scores unchanged cycle after cycle.",
            },
            {
              heading: "Inside your own bubble",
              line: "If no one from outside looks, you never see your own gaps.",
            },
            {
              heading: "Knowledge leaves with people",
              line: "When staff go and nothing was documented, the team can still operate the service but no longer understands it.",
            },
          ]}
          closing="This playbook is not enough on its own. It describes what to do; it cannot supply the judgement, the team, or the will to do it well. It assumes you bring those."
        />
      </section>

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <div className="h-16" />
    </GuideLayout>
  );
}
