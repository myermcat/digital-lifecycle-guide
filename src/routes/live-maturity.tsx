import { createFileRoute } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PracticeCardGroup } from "@/components/PracticeCard";
import { PracticeActivitiesPanel } from "@/components/PracticeActivitiesPanel";
import { WhereThisFits } from "@/components/WhereThisFits";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { PageFoot } from "@/components/PageFoot";
import { whereThisFitsForLiveSubphase } from "@/lib/lifecycle-navigation";
import {
  COMPONENT_END_OF_LIFE_GUIDANCE,
  placeholderSourceHref,
} from "@/lib/placeholder-sources";
import { PhaseSection } from "@/components/PhaseSection";
import { DashboardBlock } from "@/components/DashboardBlock";
import { PhaseLeavingSection } from "@/components/PhaseLeavingSection";
import { ThreeReviewLevelsBlock } from "@/components/ThreeReviewLevelsBlock";
import { DoorwayBlock } from "@/components/DoorwayBlock";
import { CautionBlock } from "@/components/CautionBlock";
import { ProcurementCallout } from "@/components/ProcurementCallout";
import { guideProseSpace } from "@/lib/guide-typography";
import { getPhaseLeavingContent } from "@/lib/phase-leaving-content";
import { practicePath, reviewPath, threadPath } from "@/lib/guide-strings";
export const Route = createFileRoute("/live-maturity")({
  head: () => ({
    meta: [
      { title: "Maturity — Live — The Digital Lifecycle Guide" },
      {
        name: "description",
        content:
          "The mature life of a digital service in the Live phase — operating and improving an existing service.",
      },
    ],
  }),
  component: LiveMaturityPage,
});

function LiveMaturityPage() {
  return (
    <GuideLayout id="live-maturity">
      <PhaseBreadcrumb lifecyclePhase="Live" lifecyclePhaseHref="/live" subphase="Maturity" />

      <section className="mt-5 md:mt-6">
        <WhereThisFits {...whereThisFitsForLiveSubphase("maturity")} />
      </section>

      <section className={`${guideProseSpace} mt-8 md:mt-10`}>
        <p>
          Maturity is about keeping a working service alive and well. The big build is behind
          you, and most of the effort now goes to keeping the service healthy, secure,
          affordable, and useful to the people who rely on it.
        </p>
        <p>
          Maturity is not maintenance only. You still improve it: you fix what users flag, tune
          performance, patch dependencies, and replace ageing parts over time, and you still
          deliver some new features, usually smaller ones. What sets Maturity apart from the
          earlier sub-phases is that you are caring for an existing service rather than building
          a new one.
        </p>
      </section>

      <DoorwayBlock
        id="doorway"
        heading="New to Maturity? Start here."
        href={practicePath("maturity-orientation")}
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
              href: threadPath("monitoring-and-instrumentation"),
              description:
                "Track how the service actually behaves in production. The signals you watch should come from instrumentation, not from impressions.",
            },
            {
              label: "Deliver changes safely",
              href: threadPath("releasing-changes"),
              description:
                "Keep changes small, tested, and reversible, with zero-downtime releases and a rollback you have actually tested.",
            },
            {
              label: "Manage your dependencies and open standards",
              href: threadPath("dependencies-and-standards"),
              description:
                "Track what your service relies on upstream, and adopt the updates that matter.",
            },
            {
              label: "Manage component end of life",
              href: placeholderSourceHref(COMPONENT_END_OF_LIFE_GUIDANCE),
              description:
                "Track when libraries, services, and bought products will reach end of supplier support, and plan replacements before risk and cost compound.",
            },
          ]}
        />

        <PracticeCardGroup
          heading="Keep the service good for users"
          cards={[
            {
              label: "Continue user research",
              href: threadPath("user-research"),
              description:
                "Stay in contact with the people who use your service, and act on what they tell you.",
            },
            {
              label: "Maintain accessibility",
              href: threadPath("accessibility"),
              description:
                "Standards and assistive technologies change. Test on a cadence and with disabled users, not only with automated checks.",
            },
          ]}
        />

        <PracticeCardGroup
          heading="Keep the service safe and well-governed"
          cards={[
            {
              label: "Maintain security",
              href: threadPath("security"),
              description:
                "Patch on schedule, audit access, test for vulnerabilities, and keep your incident response plan current.",
            },
            {
              label: "Maintain privacy",
              href: threadPath("privacy"),
              description:
                "Keep personal data protected and handled lawfully, with assessments and retention kept current.",
            },
            {
              label: "Steward the data",
              href: threadPath("data-stewardship"),
              description:
                "Hold only the data you still need, dispose of what you should, and open what you can.",
            },
            {
              label: "Review ethics and bias",
              href: threadPath("ethics-and-bias"),
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
              href: threadPath("team-capability"),
              description:
                "Document knowledge so it survives staff changes, run retrospectives, and manage any vendor relationships against the contract.",
            },
            {
              label: "Run the backlog",
              href: threadPath("backlog"),
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
              href: threadPath("joined-up-delivery"),
              description:
                "Keep working with the teams responsible for the services on either side of yours, so the user's whole journey keeps working and not just your part of it.",
            },
            {
              label: "Keep all channels in step",
              href: threadPath("joined-up-delivery"),
              description:
                "As the online service changes, keep the other channels in sync: update call centre scripts, retrain operations staff, and make sure the people who support users understand the current service.",
            },
          ]}
        />
        </PracticeActivitiesPanel>
      </PhaseSection>

      <ProcurementCallout subphaseId="live-maturity" />

      <PhaseSection title="Watching the right signals" sectionId="watching-signals">
        <DashboardBlock />
      </PhaseSection>

      <PhaseSection title="Three levels of review" sectionId="reviewing-three-levels">
        <ThreeReviewLevelsBlock
          subtitle="A service in Maturity is looked at in three different ways. Each one sees something the others cannot."
          items={[
            {
              tag: "FREQUENT · INTERNAL",
              title: "Internal team review",
              body: "Internal and frequent. The team turns the signals into decisions. It is maintenance, not an exam.",
              href: reviewPath("internal-team-review"),
            },
            {
              tag: "OCCASIONAL · EXTERNAL",
              title: "External peer review",
              body: "External and occasional. If no one from outside looks, you never see your own gaps.",
              href: reviewPath("external-peer-review"),
            },
            {
              tag: "RARE · CENTRAL",
              title: "Institutional review",
              body: "External and rare. A central body looks at the service when its scope or impact warrants it.",
              href: reviewPath("institutional-review"),
            },
          ]}
        />
      </PhaseSection>

      <PhaseLeavingSection content={getPhaseLeavingContent("maturity")} />

      <CautionBlock
        id="when-this-does-not-work"
        className="mt-10 md:mt-12"
        title="When this does not work"
          lead="Doing these activities is not the same as doing them well. A service can run every one of them on the surface and still be failing."
          items={[
            {
              heading: "Only going through the motions.",
              line: "The internal team review can happen, the dashboard can exist, the boxes can be ticked, and nothing improves.",
            },
            {
              heading: "Dashboard by impression",
              line: "A dashboard built from impressions instead of instrumentation drifts from reality and can be gamed.",
            },
            {
              heading: "Reviews that change nothing",
              line: "An internal team review that produces no decisions leaves scores unchanged cycle after cycle.",
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

      <PageFoot />

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />
    </GuideLayout>
  );
}
