import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PhaseCard } from "@/components/PhaseCard";
import { SetupToggles } from "@/components/SetupToggles";
import { GuideCallout } from "@/components/GuideCallout";
import { EditorialNote } from "@/components/EditorialNote";
import { ExternalLink } from "@/components/ExternalLink";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import { guideProse, guideProseSpace, guideArrowList, guideLink } from "@/lib/guide-typography";
import { GuideArrowBullet } from "@/lib/guide-lists";
import { ArrowInVisual, InfinityVisual, ArrowOutVisual } from "@/components/PhaseVisuals";
import { PHASES, THREADS } from "@/lib/guide-strings";
import { CREATE_SUBPHASES, LIVE_SUBPHASES } from "@/lib/lifecycle-navigation";
import { SITE_DESCRIPTION, SITE_FULL_TITLE, SITE_NAME } from "@/lib/site-meta";
import { LifecycleThreeRegionsFigure } from "@/components/LifecycleThreeRegionsFigure";
import lifecycleIslands from "@/assets/lifecycle_islands.svg?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_FULL_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: SITE_NAME },
      { property: "og:description", content: SITE_DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <GuideLayout>
        <header className="mb-14 md:mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Government of Canada
          </p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
            The Digital
            <br />
            Lifecycle Guide
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-border" />
        </header>

        <EditorialNote className="mb-8 md:mb-10">
          This is an early version, built in the open. We&apos;re looking for feedback,{" "}
          <ExternalLink linkKey="github-issues">
            tell us what&apos;s missing, wrong, or unclear
          </ExternalLink>
          .
        </EditorialNote>

        <section className={guideProseSpace}>
          <p className="first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-2 first-letter:-mt-5 first-letter:leading-none first-letter:text-primary">
            This is a guide for people who work on digital services for the Government of
            Canada. We do not know who you are. You might be in a small team or a big one.
            You might build in-house, contract a team to build, or buy from suppliers. You might have a
            lot of money or very little.
          </p>
          <p>
            That is fine. This guide is not about who you are. It is about the practices
            that matter for any digital work, at any size.
          </p>
          <p>
            We will not tell you exactly what to do. We do not know enough about your
            situation to do that for you. We will tell you what to think about, what to
            watch for, and what to do regardless of the rest. The shape of your work will
            be different from someone else's. The questions are the same.
          </p>
        </section>

        <LifecycleThreeRegionsFigure variant="featured" className="mt-12 md:mt-14" />

        <section className={`mt-10 md:mt-12 ${guideProseSpace}`}>
          <p>
            Every digital service, whatever it does, runs into the same handful of questions
            over its life. What problem are we solving, and for whom. Is the solution working
            for the people who use it. Is it still the right solution. When is it time to let
            it go. The questions repeat. What changes is where you are in the life of the
            service when you ask them.
          </p>
          <p>
            That life falls into three phases: Create, Live, and Sunset. A phase is a big chapter
            in the life of a service.
          </p>
          <ul className={guideArrowList}>
            <li className="flex items-start gap-2.5">
              <GuideArrowBullet />
              <p>
                <span className="font-semibold text-foreground/90">Create.</span> It starts with
                a problem to solve, well before any system exists. From &ldquo;we have a
                problem&rdquo; to a working solution in real users&rsquo; hands, you are
                figuring out what the problem really is, deciding how to solve it, and standing up
                that solution, whether by reusing, buying, building with a contracted team, or
                building in-house. Almost everything that follows is shaped here.
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <GuideArrowBullet />
              <p>
                <span className="font-semibold text-foreground/90">Live.</span> The longest phase
                by far. The solution is running, and you are keeping it useful: watching how it
                performs, improving it, and meeting new needs as they arrive.
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <GuideArrowBullet />
              <p>
                <span className="font-semibold text-foreground/90">Sunset.</span> The solution is
                reaching its end, and the work is figuring out how to retire or replace it
                cleanly. You plan the decommission, move or archive the data, and bring users
                safely onto whatever comes next. You are out of Sunset when the old service is
                fully shut down and its data and people have a safe home, often a new service
                that begins its own Create.
              </p>
            </li>
          </ul>
          <p>
            Each phase breaks into subphases, so you can find the part that
            matches where you are. Create has Discovery, Alpha, and Beta. Live has Stabilization,
            Growth, and Maturity. The phase is the chapter; the subphase is the page you are on
            within it.
          </p>
          <img
            src={lifecycleIslands}
            alt="The service lifecycle as three islands — Create, Live, Sunset — joined by two bridges: Launch, and Plan the exit."
            className="mx-auto mt-8 md:mt-10 mb-6 md:mb-8 h-auto w-full max-w-3xl"
          />
          <GuideCallout title="Not sure which phase you are in?" className="mb-10 md:mb-14">
            The quickest test is where your feedback comes from. In Create it comes from
            sketches, prototypes, and conversations about what you might build. In Live it
            comes from the running system: real users, real data, real bugs. In Sunset you
            have mostly stopped gathering feedback and started closing things down.
          </GuideCallout>
          <p>
            Whichever phase you are in, one idea runs under all of it: a government service is
            almost never the thing a person actually wants. It is one step in a much bigger journey
            of theirs, often spread across many departments and levels of government.{" "}
            <Link to={THREADS["joined-up-delivery"].path} className={guideLink}>
              Joined-up delivery
            </Link>{" "}
            is where that thinking starts.
          </p>
        </section>

        <section className="mt-6 md:mt-8">
          <div className="rounded-3xl border border-border/60 p-5 md:p-7 shadow-inner">
            <div className="grid gap-5 sm:grid-cols-3">
            <PhaseCard
              heading={PHASES.create.title}
              expandedIntro={PHASES.create.expandedIntro}
              visual={<ArrowInVisual />}
              subItems={CREATE_SUBPHASES.map((subphase) => ({
                title: subphase.title,
                description:
                  subphase.slug === "discovery"
                    ? "Understand the problem before you commit to a solution."
                    : subphase.slug === "alpha"
                      ? "Try things out cheaply before you build the real one."
                      : "Build the first real version that will go live.",
                href: subphase.href,
              }))}
              deepLink={{ href: PHASES.create.href, label: PHASES.create.deepLinkLabel }}
            />
            <PhaseCard
              heading={PHASES.live.title}
              expandedIntro={PHASES.live.expandedIntro}
              visual={<InfinityVisual />}
              subItems={LIVE_SUBPHASES.map((subphase) => ({
                title: subphase.title,
                description:
                  subphase.slug === "stabilization"
                    ? "Stabilize the service right after it goes live."
                    : subphase.slug === "growth"
                      ? "Add capability as more users arrive."
                      : "Keep the service healthy over the long term.",
                href: subphase.href,
              }))}
              deepLink={{ href: PHASES.live.href, label: PHASES.live.deepLinkLabel }}
            />
            <PhaseCard
              heading={PHASES.sunset.title}
              expandedIntro={PHASES.sunset.expandedIntro}
              visual={<ArrowOutVisual />}
              deepLink={{ href: PHASES.sunset.href, label: PHASES.sunset.deepLinkLabel }}
            />
            </div>
          </div>
        </section>

        <section className="mt-16 md:mt-20">
          <p className={guideProse}>
            This guide has two settings that change what you see throughout. Pick what
            fits your situation. You can change your mind later.
          </p>

          <SetupToggles className="mt-6" />
        </section>

        <PageFoot />

        <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

        <div className="h-24" />
    </GuideLayout>
  );
}
