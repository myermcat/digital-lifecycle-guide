import { createFileRoute } from "@tanstack/react-router";
import { RegionCard } from "@/components/RegionCard";
import { SetupToggles } from "@/components/SetupToggles";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { guideProse, guideProseSpace } from "@/lib/guide-typography";
import { ArrowInVisual, InfinityVisual, ArrowOutVisual } from "@/components/RegionVisuals";
import { REGIONS } from "@/lib/guide-strings";
import { CREATE_PHASES, LIVE_PHASES } from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Digital Lifecycle Guide — Government of Canada" },
      {
        name: "description",
        content:
          "A plain-language guide for people working on digital services for the Government of Canada.",
      },
      { property: "og:title", content: "The Digital Lifecycle Guide" },
      {
        property: "og:description",
        content:
          "A plain-language guide for people working on digital services for the Government of Canada.",
      },
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

        <section className="mt-14 md:mt-20">
          <h2 className="sr-only">The three regions of a digital service's life</h2>
          <div
            className="rounded-3xl p-5 md:p-7 shadow-inner"
            style={{ backgroundColor: "var(--region-group)" }}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-foreground/60 mb-4 text-center">
              The three regions
            </p>
            <div className="grid gap-5 sm:grid-cols-3">
            <RegionCard
              heading={REGIONS.create.title}
              expandedIntro={REGIONS.create.expandedIntro}
              visual={<ArrowInVisual />}
              subItems={CREATE_PHASES.map((phase) => ({
                title: phase.title,
                description:
                  phase.slug === "discovery"
                    ? "Understand the problem before you commit to a solution."
                    : phase.slug === "alpha"
                      ? "Try things out cheaply before you build the real one."
                      : "Build the first real version that will go live.",
                href: phase.href,
              }))}
              deepLink={{ href: REGIONS.create.href, label: REGIONS.create.deepLinkLabel }}
            />
            <RegionCard
              heading={REGIONS.live.title}
              expandedIntro={REGIONS.live.expandedIntro}
              visual={<InfinityVisual />}
              subItems={LIVE_PHASES.map((phase) => ({
                title: phase.title,
                description:
                  phase.slug === "stabilization"
                    ? "Stabilize the service right after it goes live."
                    : phase.slug === "growth"
                      ? "Add capability as more users arrive."
                      : "Keep the service healthy over the long term.",
                href: phase.href,
              }))}
              deepLink={{ href: REGIONS.live.href, label: REGIONS.live.deepLinkLabel }}
            />
            <RegionCard
              heading={REGIONS.sunset.title}
              expandedIntro={REGIONS.sunset.expandedIntro}
              visual={<ArrowOutVisual />}
              deepLink={{ href: REGIONS.sunset.href, label: REGIONS.sunset.deepLinkLabel }}
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
