import { createFileRoute } from "@tanstack/react-router";
import { RegionCard } from "@/components/RegionCard";
import { ToggleBlock } from "@/components/ToggleBlock";
import { ContextNote } from "@/components/ContextNote";
import { ArrowInVisual, InfinityVisual, ArrowOutVisual } from "@/components/RegionVisuals";
import bear from "@/assets/animal-bear.png";
import moose from "@/assets/animal-moose.png";
import beaver from "@/assets/animal-beaver.png";
import fox from "@/assets/animal-fox.png";
import owl from "@/assets/animal-owl.png";
import rabbit from "@/assets/animal-rabbit.png";

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

function BgAnimal({
  src,
  className,
  rotate = 0,
}: {
  src: string;
  className: string;
  rotate?: number;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={512}
      height={512}
      className={`pointer-events-none select-none absolute opacity-50 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
}

function Index() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Background crayon animals — decorative only */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <BgAnimal src={bear} className="w-40 md:w-56 -top-6 -left-8" rotate={-12} />
        <BgAnimal src={moose} className="w-44 md:w-64 top-[18%] -right-10" rotate={8} />
        <BgAnimal src={beaver} className="w-36 md:w-48 top-[45%] -left-10" rotate={-6} />
        <BgAnimal src={owl} className="w-36 md:w-52 top-[62%] -right-6" rotate={6} />
        <BgAnimal src={fox} className="w-40 md:w-56 bottom-[8%] -left-6" rotate={4} />
        <BgAnimal src={rabbit} className="w-32 md:w-44 bottom-2 right-4 md:right-16" rotate={-8} />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 py-20 md:py-28">
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

        <section className="space-y-6 text-[1.1rem] md:text-lg leading-[1.75] text-foreground/90 font-serif">
          <p className="first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none first-letter:text-primary">
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
            situation to do that honestly. We will tell you what to think about, what to
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
              heading="Build"
              expandedIntro="The Build region has three sub-phases — Discovery, Alpha, and MVP — each with its own page."
              visual={<ArrowInVisual />}
              subItems={[
                {
                  title: "Discovery",
                  description: "Understand the problem before you commit to a solution.",
                  href: "#build-discovery",
                },
                {
                  title: "Alpha",
                  description: "Try things out cheaply before you build the real one.",
                  href: "#build-alpha",
                },
                {
                  title: "MVP",
                  description: "Build the first real version that will go live.",
                  href: "#build-mvp",
                },
              ]}
              deepLink={{ href: "#build", label: "Go to the Build region" }}
            />
            <RegionCard
              heading="Live"
              expandedIntro="The Live region has three phases — Stabilization, Growth, and Maturity — each with its own page."
              visual={<InfinityVisual />}
              subItems={[
                {
                  title: "Stabilization",
                  description: "Stabilize the service right after it goes live.",
                  href: "#live-stabilization",
                },
                {
                  title: "Growth",
                  description: "Add capability as more users arrive.",
                  href: "#live-growth",
                },
                {
                  title: "Maturity",
                  description: "Keep the service healthy over the long term.",
                  href: "#live-maturity",
                },
              ]}
              deepLink={{ href: "#live", label: "Go to the Live region" }}
            />
            <RegionCard
              heading="Sunset"
              expandedIntro="Sunset covers two patterns of work: shutdown, where the program ends and there is no successor, and transition, where a successor is taking over and users need to migrate. In Canadian government, transitions are far more common."
              visual={<ArrowOutVisual />}
              deepLink={{ href: "#sunset", label: "Go to the Sunset region" }}
            />
            </div>
          </div>
        </section>

        <section className="mt-16 md:mt-20">
          <p className="font-serif text-[1.1rem] md:text-lg leading-[1.75] text-foreground/90">
            This guide has two settings that change what you see throughout. Pick what
            fits your situation. You can change your mind later.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <ToggleBlock
              heading="Are you building this yourself, or buying it?"
              prose="The practices in this guide apply whether your team builds the service or a supplier builds it. What changes is who does the work. If you buy, the practices become things you write into the contract and oversee. The responsibility still belongs to the department."
              options={["In-house", "Bought", "Mix"]}
              storageKey="guide.setting.sourcing"
            />
            <ToggleBlock
              heading="How big is the thing you are working on?"
              prose="The practices in this guide apply at any size. What changes is how much weight each practice carries. A small page can do user research with a few conversations. A large system might need a research team. The practice exists either way."
              options={["Small", "Medium", "Large", "Enterprise"]}
              storageKey="guide.setting.size"
            />
          </div>

          <ContextNote />

          <p className="mt-6 font-serif text-base text-muted-foreground leading-relaxed italic">
            You do not have to know your answer yet to keep reading. Pick what fits today.
            You can change your mind later.
          </p>
        </section>

        <aside className="mt-14 md:mt-20 rounded-2xl border border-border bg-secondary/60 p-7 md:p-9">
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground tracking-tight">
            Two things we assume
          </h2>
          <p className="mt-3 font-serif text-base md:text-[1.05rem] leading-[1.75] text-foreground/90">
            This guide assumes two things about you. First, that you are already trying to
            follow the Government of Canada Digital Standards and the law on privacy,
            security, and accessibility. Second, that you are not trying to build
            something just for yourself. You are trying to build something others in
            government could use too. If that is not you, the guide still has useful
            things in it, but parts will fit a little less well.
          </p>
        </aside>

        <div className="h-24" />
      </div>
    </main>
  );
}
