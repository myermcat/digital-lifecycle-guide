import { createFileRoute } from "@tanstack/react-router";
import { PhaseCard } from "@/components/PhaseCard";
import { SetupToggles } from "@/components/SetupToggles";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { guideProse, guideProseSpace, guideArrowList } from "@/lib/guide-typography";
import { guideAsideNote } from "@/lib/guide-article";
import { GuideArrowBullet } from "@/lib/guide-lists";
import { ArrowInVisual, InfinityVisual, ArrowOutVisual } from "@/components/PhaseVisuals";
import { PHASES } from "@/lib/guide-strings";
import { CREATE_SUBPHASES, LIVE_SUBPHASES } from "@/lib/lifecycle-navigation";
import { SITE_DESCRIPTION, SITE_FULL_TITLE, SITE_NAME } from "@/lib/site-meta";
import lifecycleVisual from "@/assets/lifecycle_three_regions_bow.svg?url";

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

        <section className={guideProseSpace}>
          <p className="first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-2 first-letter:-mt-5 first-letter:leading-none first-letter:text-primary">
            This is a guide for people who work on digital services for the Government of
            Canada. We do not know who you are. You might be in a small team or a big one.
            You might build things yourselves or buy them from suppliers. You might have a
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

        <figure className="mt-12 md:mt-14 mx-auto max-w-3xl">
          <img
            src={lifecycleVisual}
            alt="The three phases of a digital service: a small loop labelled Create, an arrow into a large infinity loop labelled Live, then a fading arrow to a small pale loop labelled Sunset."
            className="w-full h-auto"
            width={760}
            height={250}
          />
        </figure>

        <section className={`mt-10 md:mt-12 max-w-xl ${guideProseSpace}`}>
          <p>
            Every digital service, whatever it does, runs into the same handful of questions
            over its life. What problem are we solving, and for whom. Is the solution working
            for the people who use it. Is it still the right solution. When is it time to let
            it go. The questions repeat. What changes is where you are in the life of the
            service when you ask them.
          </p>
          <p>That life falls into three phases.</p>
          <ul className={guideArrowList}>
            <li className="flex gap-2.5">
              <GuideArrowBullet />
              <p>
                <span className="font-semibold text-foreground/90">Create.</span> It starts with
                a problem to solve, well before any system exists. From &ldquo;we have a
                problem&rdquo; to a working solution in real users&rsquo; hands, you are
                figuring out what the problem really is, deciding how to solve it, and building
                or buying that solution. Almost everything that follows is shaped here.
              </p>
            </li>
            <li className="flex gap-2.5">
              <GuideArrowBullet />
              <p>
                <span className="font-semibold text-foreground/90">Live.</span> The longest phase
                by far. The solution is running, and you are keeping it useful: watching how it
                performs, improving it, and meeting new needs as they arrive.
              </p>
            </li>
            <li className="flex gap-2.5">
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
          <p className={guideAsideNote}>
            Not sure which phase you are in? The quickest test is where your feedback comes from.
            In Create it comes from sketches, prototypes, and conversations about what you might
            build. In Live it comes from the running system: real users, real data, real bugs.
            In Sunset you have mostly stopped gathering feedback and started closing things down.
          </p>
        </section>

        <section className="mt-12 md:mt-16">
          <h2 className="sr-only">The three phases of a digital service&apos;s life</h2>
          <div
            className="rounded-3xl p-5 md:p-7 shadow-inner"
            style={{ backgroundColor: "var(--phase-group)" }}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-foreground/60 mb-4 text-center">
              The three phases
            </p>
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

        <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

        <div className="h-24" />
    </GuideLayout>
  );
}
