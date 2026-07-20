import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  BadgeCheck,
  BookOpen,
  DoorClosed,
  FileWarning,
  Map,
  UserX,
  Wrench,
} from "lucide-react";
import { guideStaticCardClassName } from "@/lib/guide-cards";
import { SetupToggles } from "@/components/SetupToggles";
import { GuideCallout } from "@/components/GuideCallout";
import { EditorialNote } from "@/components/EditorialNote";
import { ExternalLink } from "@/components/ExternalLink";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { GuideLayout } from "@/components/GuideLayout";
import { IconAccordionSection } from "@/components/IconAccordionSection";
import { PageFoot } from "@/components/PageFoot";
import {
  PhaseIconCreate,
  PhaseIconLive,
  PhaseIconSunset,
} from "@/components/PhaseLifecycleIcons";
import { PillarCallout } from "@/components/PillarCallout";
import {
  guideListIndent,
  guideProse,
  guideProseSpace,
  guideLink,
  guideSectionTitle,
} from "@/lib/guide-typography";
import {
  PHASE_DESCRIPTIONS,
  PHASES,
  THREADS,
  type PhaseDescriptionParagraph,
} from "@/lib/guide-strings";
import { CREATE_SUBPHASES, LIVE_SUBPHASES } from "@/lib/lifecycle-navigation";
import { WORKED_EXAMPLE_LABELS } from "@/lib/guide-blocks";
import { SITE_DESCRIPTION, SITE_FULL_TITLE, SITE_NAME } from "@/lib/site-meta";
import { LifecycleThreeRegionsFigure } from "@/components/LifecycleThreeRegionsFigure";
import lifecycleIslands from "@/assets/lifecycle_islands.svg?url";

/** Hidden for now: phases read as distinct enough without this test. */
const SHOW_PHASE_TEST_CALLOUT = false;

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

const subphasePillClassName =
  "inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground hover:bg-muted hover:border-foreground/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function renderPhaseDescriptionParagraph(paragraph: PhaseDescriptionParagraph) {
  if (typeof paragraph === "string") {
    return paragraph;
  }

  let remaining = paragraph.text;
  const parts: ReactNode[] = [];
  for (const phrase of paragraph.bold ?? []) {
    const index = remaining.indexOf(phrase);
    if (index === -1) continue;
    if (index > 0) {
      parts.push(remaining.slice(0, index));
    }
    parts.push(
      <strong key={`${phrase}-${index}`} className="font-semibold text-foreground">
        {phrase}
      </strong>,
    );
    remaining = remaining.slice(index + phrase.length);
  }
  if (remaining) {
    parts.push(remaining);
  }
  return parts;
}

function PhaseDescriptionBody({
  paragraphs,
}: {
  paragraphs: readonly PhaseDescriptionParagraph[];
}) {
  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph) => {
        const key = typeof paragraph === "string" ? paragraph : paragraph.text;
        return <p key={key}>{renderPhaseDescriptionParagraph(paragraph)}</p>;
      })}
    </div>
  );
}

function SubphasePills({
  intro,
  items,
}: {
  intro: string;
  items: readonly { title: string; href: string; description?: string }[];
}) {
  return (
    <div className="mt-5 border-t border-border/70 pt-4">
      <p className="mb-3 text-foreground/80">{intro}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            title={item.description}
            className={subphasePillClassName}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

function PhaseDeepLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <p className="mt-4">
      <Link to={href} className={`text-sm ${guideLink}`}>
        {label} →
      </Link>
    </p>
  );
}

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
            be different from someone else&apos;s. The questions are the same.
          </p>
        </section>

        <PillarCallout
          id="who-this-is-for"
          className="scroll-mt-24 mt-8 md:mt-10 rounded-lg border border-primary/40 bg-background shadow-sm overflow-hidden"
          label="Who this is for"
          title="This guide is for you, whatever brought you here"
          icon={BadgeCheck}
        >
          <div className="space-y-3 text-[0.8125rem] leading-[1.4]">
            <p>
              Some people reading this know exactly what they own. Their department&apos;s
              application register has their name against a system, and once a year somebody asks
              them to rate its health.
            </p>
            <p>
              Most do not. They think of themselves as running a program. A grant, a licence, a
              benefit, an inspection regime. Each of those now runs on software, and someone is
              accountable for the software.
            </p>
            <p>You might be:</p>
            <ul className={`list-disc space-y-1.5 ${guideListIndent}`}>
              <li>
                a <strong className="font-semibold text-foreground">business owner</strong>{" "}
                already named against a system in your department&apos;s application register
              </li>
              <li>
                a <strong className="font-semibold text-foreground">program manager</strong>{" "}
                whose process has stopped coping with the volume
              </li>
              <li>
                a <strong className="font-semibold text-foreground">policy lead</strong> who
                has been told to deliver something by a date
              </li>
              <li>
                a <strong className="font-semibold text-foreground">director general</strong>{" "}
                who has inherited a system nobody can fully explain
              </li>
              <li>
                a <strong className="font-semibold text-foreground">project manager</strong>{" "}
                handed a service that is already live
              </li>
              <li>
                someone who has just been told there is money to buy a system
              </li>
            </ul>
            <p>
              You may never have chosen any of this. It does not matter how you arrived.
            </p>
            <p>
              If a digital service delivers your program, or one is about to, you are its
              business owner. You are accountable for it from before it exists until after it
              is switched off. This guide is for you.
            </p>
          </div>
        </PillarCallout>

        <PillarCallout
          id="see-the-whole-path"
          className="scroll-mt-24 mt-8 md:mt-10 rounded-lg border border-primary/40 bg-[var(--phase-group)] shadow-sm overflow-hidden"
          label="See the whole path"
          title="Who signs off on a new digital service, and when"
          icon={Map}
          href="/gate-map"
          linkLabel="See the whole path →"
        >
          <p>
            Before you open any one document, here is the whole journey on one page: every
            official approval, review, and sign-off a service passes through, from the first
            problem to retiring or replacing it, who owns each one, and roughly how long it
            takes.
          </p>
        </PillarCallout>

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

          <IconAccordionSection
            embedded
            stages={[
              {
                id: "phase-create",
                icon: PhaseIconCreate,
                title: PHASES.create.title,
                children: (
                  <>
                    <PhaseDescriptionBody paragraphs={PHASE_DESCRIPTIONS.create} />
                    <SubphasePills
                      intro="The three sub-phases of Create:"
                      items={CREATE_SUBPHASES.map((subphase) => ({
                        title: subphase.title,
                        href: subphase.href,
                        description:
                          subphase.slug === "discovery"
                            ? "Understand the problem before you commit to a solution."
                            : subphase.slug === "alpha"
                              ? "Try things out cheaply before you build the real one."
                              : "Build the first real version that will go live.",
                      }))}
                    />
                    <PhaseDeepLink
                      href={PHASES.create.href}
                      label={PHASES.create.deepLinkLabel}
                    />
                  </>
                ),
              },
              {
                id: "phase-live",
                icon: PhaseIconLive,
                title: PHASES.live.title,
                children: (
                  <>
                    <PhaseDescriptionBody paragraphs={PHASE_DESCRIPTIONS.live} />
                    <SubphasePills
                      intro="The three sub-phases of Live:"
                      items={LIVE_SUBPHASES.map((subphase) => ({
                        title: subphase.title,
                        href: subphase.href,
                        description:
                          subphase.slug === "stabilization"
                            ? "Stabilize the service right after it goes live."
                            : subphase.slug === "growth"
                              ? "Add capability as more users arrive."
                              : "Keep the service healthy over the long term.",
                      }))}
                    />
                    <PhaseDeepLink
                      href={PHASES.live.href}
                      label={PHASES.live.deepLinkLabel}
                    />
                  </>
                ),
              },
              {
                id: "phase-sunset",
                icon: PhaseIconSunset,
                title: PHASES.sunset.title,
                children: (
                  <>
                    <PhaseDescriptionBody paragraphs={PHASE_DESCRIPTIONS.sunset} />
                    <PhaseDeepLink
                      href={PHASES.sunset.href}
                      label={PHASES.sunset.deepLinkLabel}
                    />
                  </>
                ),
              },
            ]}
          />

          <p>
            Each phase breaks into smaller parts, called sub-phases, so you can find the part that
            matches where you are. Create has Discovery, Alpha, and Beta. Live has Stabilization,
            Growth, and Maturity. The phase is the chapter; the sub-phase is the page you are on
            within it.
          </p>
          <img
            src={lifecycleIslands}
            alt="The service lifecycle as three islands — Create, Live, Sunset — joined by two bridges: Launch, and Plan the exit."
            className="mx-auto mt-8 md:mt-10 mb-6 md:mb-8 h-auto w-full max-w-3xl"
          />
          {/* Hidden for now: phases read as distinct enough without this test. */}
          {SHOW_PHASE_TEST_CALLOUT ? (
            <GuideCallout title="Not sure which phase you are in?" className="mb-10 md:mb-14">
              The quickest test is where your feedback comes from. In Create it comes from
              sketches, prototypes, and conversations about what you might build. In Live it
              comes from the running system: real users, real data, real bugs. In Sunset you
              have mostly stopped gathering feedback and started closing things down.
            </GuideCallout>
          ) : null}
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

        <section className="mt-16 md:mt-20" id="why-bother">
          <h2 className={`${guideSectionTitle} mb-3`}>Why bother</h2>
          <IconAccordionSection
            embedded
            stages={[
              {
                id: "nobody-told-her",
                icon: BookOpen,
                eyebrow: WORKED_EXAMPLE_LABELS.setup,
                title: "Nobody told her",
                titleClassName: "text-lg md:text-xl",
                triggerNote:
                  "Nadia is made up, and so is her program. Any resemblance to real persons or programs is coincidental.",
                children: (
                  <>
                    <div className="space-y-3">
                      <p>
                        Nadia is a director general. She runs a grants program that funds
                        renewable energy projects. It has existed for years, and it has always
                        been run on spreadsheets, email threads, and a shared drive.
                      </p>
                      <p>
                        Then the volume of applications doubles. Her team cannot process them
                        fast enough. Applicants cannot find out what is happening to their
                        submission. Auditors cannot easily verify how any decision was made.
                      </p>
                      <p>
                        Nadia does not think of herself as owning a digital service. She thinks
                        of herself as running an energy program.
                      </p>
                    </div>

                    <div className="mt-4 space-y-3">
                      <p>
                        Her corporate services team tells her she can buy a grants management
                        system or build one. The project is scored for complexity and risk, and
                        the score comes in under what her department is trusted to approve on its
                        own. No Treasury Board submission, and no appearance before the
                        Government of Canada Enterprise Architecture Review Board. Her own
                        director approves the budget.
                      </p>
                      <p>
                        Her contracting authority runs the competition. It goes out as a request
                        for proposal (RFP) against an existing standing offer, and three
                        suppliers answer. Procurement writes the document, but the requirements
                        inside it come from Nadia&apos;s team, and they are sensible ones:
                        applicants need a portal, adjudicators need a queue, finance needs an
                        audit trail, and the system has to produce reports for Parliament.
                      </p>
                      <p>None of that is wrong. It is a competent purchase.</p>
                    </div>

                    <div
                      className={`my-5 space-y-4 rounded-md border border-border px-4 py-3 ${guideStaticCardClassName}`}
                    >
                      <p className="font-semibold text-foreground">
                        This is where the lifecycle starts mattering, and nobody told her.
                      </p>

                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <DoorClosed
                            className="mt-0.5 size-5 shrink-0 text-primary/70"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <div className="min-w-0 space-y-1">
                            <p className="font-semibold text-foreground">
                              She signs a three-year contract with no exit rights and no data
                              portability.
                            </p>
                            <p>
                              Nobody thought to ask for them at signature. When the supplier
                              raises the price in year two, she has nothing to push back with.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Wrench
                            className="mt-0.5 size-5 shrink-0 text-primary/70"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <div className="min-w-0 space-y-1">
                            <p className="font-semibold text-foreground">
                              The system was configured to her current process rather than
                              designed to adapt.
                            </p>
                            <p>
                              Program rules always change. Hers change. Each change request costs
                              forty thousand dollars.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <FileWarning
                            className="mt-0.5 size-5 shrink-0 text-primary/70"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <div className="min-w-0 space-y-1">
                            <p className="font-semibold text-foreground">
                              The accessibility conformance report was for an older version of
                              the product.
                            </p>
                            <p>
                              The version actually deployed was never reassessed. In year one an
                              employee using a screen reader files a complaint.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <UserX
                            className="mt-0.5 size-5 shrink-0 text-primary/70"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <div className="min-w-0 space-y-1">
                            <p className="font-semibold text-foreground">
                              Nobody was assigned to manage the supplier.
                            </p>
                            <p>
                              Nobody is measuring whether an applicant can finish an application
                              without phoning the help desk. There is no plan for year three, when
                              the contract ends.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-4 space-y-3">
                      <p>
                        Nadia did nothing reckless. She bought a system the way it is normally
                        bought. Every cost in that list was settled in the few weeks before she
                        signed, and paid for over the following three years.
                      </p>
                      <p>
                        <strong className="font-semibold text-foreground">
                          This is the ordinary case, and it is most of them.
                        </strong>{" "}
                        The point of this guide is that the next Nadia knows all of it while she
                        can still do something about it.
                      </p>
                    </div>
                  </>
                ),
              },
            ]}
          />
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
