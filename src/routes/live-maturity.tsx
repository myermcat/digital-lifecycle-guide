import { createFileRoute } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { PhaseBreadcrumb } from "@/components/PhaseBreadcrumb";
import { PracticeCardGroup } from "@/components/PracticeCard";
import { WhereThisFits } from "@/components/WhereThisFits";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { whereThisFitsForLivePhase } from "@/lib/lifecycle-navigation";
import {
  PhaseSection,
  MutedNote,
  ProseList,
  ProseListItem,
  LinkedLeadSentence,
} from "@/components/PhaseSection";
import { ImpactRiskSection, ImpactRiskTag } from "@/components/ImpactRiskSection";

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
      <PhaseBreadcrumb
        region="Live"
        regionHref="/live"
        phase="Maturity"
        subtitle="The mature life of a digital service."
      />

      <section className="mt-8 md:mt-10">
        <WhereThisFits {...whereThisFitsForLivePhase("maturity")} />
      </section>

      <PhaseSection title="What Maturity is">
        <p>
          Maturity is the phase of Live where your service is mature. You are no longer
          shipping major new features. Most of the work is keeping the service healthy,
          secure, affordable, and useful to the people who rely on it.
        </p>
        <p>
          Maturity is not maintenance only. You will continue to make improvements,
          respond to what users tell you, and replace parts of the service over time. The
          difference from earlier phases is that you are operating and improving an
          existing service rather than building a new one.
        </p>
        <p>
          Most of a service&apos;s life is spent in Maturity. A service that is well
          sustained keeps delivering value and stays secure. A service that is not well
          sustained accumulates risk, loses users, and becomes expensive to keep running.
        </p>
      </PhaseSection>

      <PhaseSection title="Before you move into Maturity">
        <p>
          Before a service settles into Maturity, make sure the things that keep it healthy
          are in place. If you are taking over a service that is already in Maturity, treat
          this as your first month&apos;s checklist.
        </p>
        <ProseList>
          <ProseListItem lead="Know who is on the team and right-size it.">
            A service in Maturity does not always need a full delivery team. Work out the
            level of continuous improvement your service needs and who you need to support
            it.
          </ProseListItem>
          <ProseListItem lead="Know what you hold and who can reach it.">
            Take an inventory of access to the production service, code, data, and
            infrastructure, and remove access that is no longer needed.
          </ProseListItem>
          <ProseListItem lead="Find the monitoring that already exists, even if it is incomplete, and confirm you can measure the success of the service." />
          <ProseListItem lead="Read the most recent security and privacy assessments and note anything unresolved." />
          <ProseListItem lead="Find the backlog.">
            If there is no single prioritised list, that is the first thing to put in
            place.
          </ProseListItem>
          <ProseListItem lead="Schedule the first check-in within the first few weeks, and confirm the cadence from there." />
        </ProseList>
      </PhaseSection>

      <PhaseSection title="Running your service in Maturity">
        <p>
          Running your service in Maturity means doing a set of recurring activities at a
          sensible frequency. You do not need to do all of them every time. The point is
          that across a reasonable period, each one is being done. Pick what fits where
          your service is and how it is changing.
        </p>

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
                "As the online service changes, keep the other channels in sync: update call centre scripts, retrain operations staff, and make sure the people who support users understand the current service. A change online that the phone line does not know about breaks the experience.",
            },
          ]}
        />
      </PhaseSection>

      <PhaseSection title="Reviewing your service: three levels">
        <p>
          A service in Maturity is looked at in three different ways. They are not the
          same, and they are not interchangeable. Each one sees something the others
          cannot.
        </p>
        <ul className="space-y-6 list-none pl-0 font-serif text-[1.1rem] md:text-lg leading-[1.75] text-foreground/90">
          <li>
            <strong className="font-semibold text-foreground">The check-in.</strong>{" "}
            Internal and frequent. The team looks at its own service, usually every two
            weeks to a month. It turns the signals into decisions. It is maintenance, not an
            exam.{" "}
            <a
              href="#review-check-in"
              className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
            >
              See how the check-in works
            </a>
          </li>
          <li>
            <strong className="font-semibold text-foreground">The peer review.</strong>{" "}
            External and occasional. People from outside the team, often from another
            department working in a similar area, look at the service perhaps once or twice
            a year. They are unbiased and they see what you have stopped noticing. It is
            developmental: colleagues helping colleagues, not a gate.{" "}
            <a
              href="#review-peer-review"
              className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
            >
              See how the peer review works
            </a>
          </li>
          <li>
            <strong className="font-semibold text-foreground">The institutional review.</strong>{" "}
            External and rare. A central body such as Treasury Board or an enterprise
            architecture board looks at the service when its scope or impact is significant
            enough to warrant it. By the time you reach this review, you have already run
            the other two, so you arrive knowing your service well.{" "}
            <a
              href="#review-institutional-review"
              className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
            >
              See how the institutional review works
            </a>
          </li>
        </ul>
        <MutedNote>
          <strong className="font-semibold text-foreground/80">Why all three:</strong> The
          check-in is frequent but blind to its own gaps. The peer review is rare but sees
          the gaps, because it comes from outside the bubble. The institutional review is
          rarer still but carries the authority the others do not. Each covers what the one
          before it cannot.
        </MutedNote>
      </PhaseSection>

      <PhaseSection title="Watching the right signals">
        <p>
          The check-in needs real numbers, and the numbers come from a dashboard. The
          dashboard and the check-in work as a pair: a dashboard needs to be acted on, and
          a check-in needs real numbers.
        </p>
        <LinkedLeadSentence
          href="#practice-build-dashboard"
          lead="Build a dashboard from instrumentation."
          rest="Its signals should be measured by the service and its infrastructure, not entered by hand. Keep it readable, and make it visible to the bodies that review you."
        />
        <p>
          Moving from human-reported status to measured signals is a journey, not a
          switch. Most services start mostly human-reported. Each time you replace or
          improve a part of the service, adding instrumentation to that part is one of the
          changes to prioritise. See the impact and risk section below for the questions
          instrumentation cannot answer.
        </p>
      </PhaseSection>

      <ImpactRiskSection>
        <ImpactRiskTag>Impact and risk: Shown in this colour throughout the playbook.</ImpactRiskTag>
        <p>
          Every change you make has an effect on the people who use your service, and those
          effects can fall unevenly across different groups. Asking what a change does to
          people, and whether it could harm or exclude some of them, is continuous
          judgement. It runs through every activity on this page, not only the ones with the
          word security or privacy in them.
        </p>
        <p>
          Some of this judgement can be measured, and some cannot. Instrumentation can tell
          you that one path through a form is faster for most people. It cannot tell you
          whether making a smaller group&apos;s path slower is fair. That takes research
          and talking to the people affected. This is why people are never removed from the
          work: as more of the routine is measured and automated, the human role moves from
          processing transactions to making the judgements that only people can make.
        </p>
        <p>
          Government formalises part of this thinking into specific assessments produced
          when the service was designed. In Maturity you keep them current and feed them what
          you learn.
        </p>
        <LinkedLeadSentence
          href="#practice-impact-risk-assessments"
          lead="Keep the impact and risk assessments current."
          rest="This includes the privacy (PIA), algorithmic (AIA), security (SA&A and TRA), and population (GBA Plus) assessments. You do not write these yourself; specialists do. You keep the service matching what they describe, and you tell the specialists when something has changed."
        />
        <p>
          At each check-in, ask the two-sided question: has anything changed in the service
          that the assessments should reflect, and is the service still doing what the
          assessments commit it to?
        </p>
      </ImpactRiskSection>

      <PhaseSection title="When you need to leave Maturity">
        <p>
          Maturity is the longest phase, but not permanent. Three things can move a service
          out of it.
        </p>
        <ProseList>
          <ProseListItem lead="Back to Growth,">
            when a new mandate or expanding scope means you are shipping substantial new
            features again.
          </ProseListItem>
          <ProseListItem lead="Forward to Sunset,">
            when a sunset signal appears: support ending, a replacement coming, the user
            base shrinking, the policy basis going away.
          </ProseListItem>
          <ProseListItem lead="Back to a Stabilization-like mode,">
            when a critical failure or major replatforming forces a period of rapid
            stabilisation.
          </ProseListItem>
        </ProseList>
        <p>
          Deciding whether to keep sustaining or to replatform is a question of total cost
          of ownership over the long term. Good Maturity practice already replaces parts of
          the service over time. When the multi-year cost of continuing to maintain the
          service is greater than the multi-year cost of moving to a new platform, that is
          the signal to move, not a single failure or a single appealing new technology.
        </p>
      </PhaseSection>

      <PhaseSection title="When this does not work">
        <p>
          Doing these activities is not the same as doing them well. A service can run every
          one of them on the surface and still be failing. The common ways that happens:
        </p>
        <ul className="space-y-5 list-none pl-0 font-serif text-[1.1rem] md:text-lg leading-[1.75] text-foreground/90">
          <li>
            You follow the practices without thinking. The check-in happens, the dashboard
            exists, the boxes are ticked, and nothing improves. The point of each activity
            is the judgement it provokes, not the activity itself.
          </li>
          <li>
            The dashboard is built from impressions when instrumentation needed to be
            involved. If the numbers are typed in by hand, they drift from reality and can
            be gamed, and the service looks healthier than it is.
          </li>
          <li>
            The check-in does not produce any decisions. Scores stay the same across cycles
            and decisions are deferred to the next one.
          </li>
          <li>
            Knowledge leaves with people. When staff go and nothing was documented, the team
            can still operate the service but no longer understands it.
          </li>
        </ul>
        <p>
          This playbook is not enough on its own. It describes what to do; it cannot supply
          the judgement, the team, or the will to do it well. It assumes you bring those.
        </p>
      </PhaseSection>

      <GuideAssumptions className="mt-10 md:mt-12 max-w-xl" />

      <div className="h-24" />
    </GuideLayout>
  );
}
