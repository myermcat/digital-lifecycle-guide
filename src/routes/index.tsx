import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  BadgeCheck,
  BookOpen,
  ShieldCheck,
  Building2,
  DoorClosed,
  FileWarning,
  Map,
  SearchX,
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
import { ReusablePieces } from "@/components/ReusablePieces";
import { PageFoot } from "@/components/PageFoot";
import {
  PhaseIconCreate,
  PhaseIconLive,
  PhaseIconSunset,
} from "@/components/PhaseLifecycleIcons";
import { PillarCallout } from "@/components/PillarCallout";
import {
  guideArrowList,
  guideBlockSubheading,
  guideCalloutLabel,
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

/** Document order. A nav that does not match the page reads as broken. */
const HOME_ON_THIS_PAGE = [
  { id: "who-this-is-for", label: "Who this is for" },
  { id: "see-the-whole-path", label: "The official checkpoints" },
  { id: "the-three-phases", label: "The three phases" },
  { id: "why-bother", label: "Why it matters" },
  { id: "your-setup", label: "Set the guide to your situation" },
  { id: "reusable-pieces", label: "Reuse before you buy or build" },
] as const;

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
    <GuideLayout onThisPageItems={HOME_ON_THIS_PAGE}>
        <header className="mb-14 md:mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Government of Canada
          </p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
            The 2026
            <br />
            Digital Lifecycle Guide
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
          <p className="first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-2 first-letter:-mt-5 first-letter:text-primary">
            This is a guide for people who work on digital services for the Government of
            Canada. You could be anyone: any role, any background, a small team or a large
            one.
          </p>
          <p>
            You might build in-house, contract a team to build, or buy from a supplier. Your
            budget might be generous or almost nothing. None of that changes what follows,
            because this guide is about the practices that matter for any digital work, at
            any size.
          </p>

          <p className={guideBlockSubheading}>What this guide is</p>
          <p>
            It describes{" "}
            <strong className="font-semibold text-foreground">
              a few ways of building a digital service
            </strong>
            , not the only correct way, because there is not one.
          </p>
          <p>
            Take a department with money for a service, no technical staff of its own, and a
            date somebody else set, because a minister announced it or the legislation names
            it. Going to a large supplier and paying them to work out most of the detail may
            genuinely be its best option. That skips almost everything described here, and it
            can still be the right decision.
          </p>
          <p>
            So the guide stops short of telling you exactly what to do. The right answer
            depends on things only you can see: your deadline, your budget, who you have, and
            what your department is already committed to.
          </p>
        </section>

        <section className="mt-8 md:mt-10 rounded-lg border border-border bg-card px-6 py-6 shadow-sm md:px-8 md:py-7">
          <p className={guideCalloutLabel}>What is here for you, whichever way you go</p>
          <ul className={`${guideArrowList} mt-4 !pl-0`}>
            <li className="flex items-start gap-3">
              <ShieldCheck
                aria-hidden="true"
                className="mt-1 h-[1.15rem] w-[1.15rem] shrink-0 text-primary/70"
                strokeWidth={1.6}
              />
              <p className={guideProse}>
                <strong className="font-semibold text-foreground">The security practices.</strong>{" "}
                Every service needs them, whether it was built in-house, bought whole, or
                assembled from something that already existed.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck
                aria-hidden="true"
                className="mt-1 h-[1.15rem] w-[1.15rem] shrink-0 text-primary/70"
                strokeWidth={1.6}
              />
              <p className={guideProse}>
                <strong className="font-semibold text-foreground">The official checkpoints.</strong>{" "}
                The assessments, approvals and authorizations a Government of Canada service
                has to clear. They will find you whichever route you take, and each one is
                cheaper to prepare for than to be surprised by.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <Map
                aria-hidden="true"
                className="mt-1 h-[1.15rem] w-[1.15rem] shrink-0 text-primary/70"
                strokeWidth={1.6}
              />
              <p className={guideProse}>
                <strong className="font-semibold text-foreground">A picture of what is coming.</strong>{" "}
                Which decisions arrive in roughly what order, who else has to be involved, and
                which of them are expensive to reverse later.
              </p>
            </li>
          </ul>
        </section>

        <section className={`${guideProseSpace} mt-8 md:mt-10`}>

          <p className={guideBlockSubheading}>
            One thing that catches people whichever route they take
          </p>
          <p>
            If the new service is replacing something, keep the old one running until the
            new one has carried real volume for a while and held. It is tempting to switch
            off early, because running two things is awkward and somebody is usually asking
            when it will stop. But nothing before launch tests real volume, people need time
            to move across, and once everyone has moved there is no way back. If the new
            service then struggles, the department finds itself negotiating changes with a
            supplier it can no longer walk away from, which is an expensive place to be
            standing.
          </p>
          <p>
            The same thing read backwards is a planning problem. If something is going to
            replace a service you already run, the replacement has to be funded, competed,
            built and steadied before the old one can be switched off. Counted backwards
            from the day you would like the old service gone, that is usually years, and for
            much of it a department pays for both.
          </p>

          <p className={guideBlockSubheading}>The one thing worth holding on to</p>
          <p>
            <strong className="font-semibold text-foreground">It stays your service.</strong>{" "}
            You can hand the building to a supplier, and much of the time that is the sensible
            thing to do. What does not transfer with it is the answering for it. When a
            service does not work, the person who cannot get their application in never
            hears about the procurement contract behind it, and would not care if they did.
            They experience it as the Government of Canada failing them, and it is the
            department that answers for that, publicly and afterwards.
          </p>
          <p>
            Which is why it is worth the effort to understand what you actually want, and
            what you are buying, well enough to say both plainly. A supplier given a vague description will build
            something roughly as vague, in much the way a vague prompt to an artificial
            intelligence tool returns something you did not quite ask for. Neither is anyone
            behaving badly. It is just what happens when the description was not clear
            enough to build from.
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
              benefit, an inspection regime. Each of those has a digital solution, and someone is
              accountable for that solution.
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
              <li>
                or in any of the other positions people find themselves in when a service
                becomes their responsibility. The list is not meant to be complete.
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
          title="The official checkpoints of a digital service"
          icon={Map}
          href="/gate-map"
          linkLabel="See the whole path →"
        >
          <p>
            Here is the entire lifecycle on one page: every
            official approval, review, and sign-off a service passes through, from the first
            problem to retiring or replacing it, who owns each one, and roughly how long it
            takes.
          </p>
        </PillarCallout>

        <LifecycleThreeRegionsFigure variant="featured" className="mt-12 md:mt-14" />

        <section id="the-three-phases" className="mt-10 md:mt-12 scroll-mt-24">
          <h2 className={`${guideSectionTitle} mb-3`}>The three phases</h2>
          <p>
            Every digital service, whatever it does, runs into the same handful of questions
            over its life. What problem are we solving, and for whom. Is the solution working
            for the people who use it. Is it still the right solution. When is it time to let
            it go. The questions repeat. What changes is where you are in the life of the
            service when you ask them.
          </p>
          <p>
            The lifecycle falls into three phases: Create, Live, and Sunset. A phase is a big chapter
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
            Each phase has smaller parts, called sub-phases. Create has Discovery, Alpha, and Beta. Live has Stabilization,
            Growth, and Maturity. The phase is like the chapter of a book; the sub-phase is the page you are on
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

        <section className="mt-16 md:mt-20 scroll-mt-24" id="why-bother">
          <h2 className={`${guideSectionTitle} mb-3`}>Why it matters</h2>
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
                        own, and the cost fits within the department&apos;s existing operating
                        budget. No Treasury Board submission, and no appearance before the
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
                        This is where the lifecycle starts mattering, and nobody told her. Among
                        many other things:
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
                          <SearchX
                            className="mt-0.5 size-5 shrink-0 text-primary/70"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <div className="min-w-0 space-y-1">
                            <p className="font-semibold text-foreground">
                              She never asked whether anyone else had already solved this
                              problem.
                            </p>
                            <p>
                              Another department may already run a grants system she could
                              reuse. Nobody looked before the money moved.
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
                          Nadia is not special: this happens more often than you would believe.
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

        <section id="your-setup" className="mt-16 md:mt-20 scroll-mt-24">
          <h2 className={`${guideSectionTitle} mb-3`}>Set the guide to your situation</h2>
          <p className={guideProse}>
            This guide has two settings that change what you see throughout. Pick what
            fits your situation. You can change your mind later.
          </p>

          <SetupToggles className="mt-6" />
        </section>

        <section id="next-guide" className="mt-16 md:mt-20 scroll-mt-24">
          <h2 className={`${guideSectionTitle} mb-3`}>A guide for the next guide</h2>
          <p className={guideProse}>
            This is a first attempt, written in a few months. If somebody picks the work up
            later, here is what would have been useful to know at the start.
          </p>

          <p className={guideBlockSubheading}>Why we could not simply follow the UK and Australia</p>
          <p className={guideProse}>
            The two guides we looked at most were the{" "}
            <ExternalLink linkKey="uk-service-manual">
              United Kingdom&apos;s Service Manual
            </ExternalLink>{" "}
            and{" "}
            <ExternalLink linkKey="australia-service-process">
              Australia&apos;s service design and delivery process
            </ExternalLink>
            . Both draw firm lines between phases, and both can, because each is written
            for one situation: a small team of public servants building a service
            themselves, on shared infrastructure and reusable components their government
            has already built for that purpose.
          </p>
          <p className={guideProse}>
            Most existing Government of Canada services were bought rather than built by the
            department itself, and how you buy changes when things happen. Three examples:
          </p>
          <ul className={`${guideProse} my-5 list-disc space-y-3 ${guideListIndent}`}>
            <li>
              <strong className="font-semibold text-foreground">
                A department that contracts a team.
              </strong>{" "}
              It runs the competition during Discovery and signs as Alpha begins, because
              the contracted team is who builds the prototypes.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                A department that buys a finished product.
              </strong>{" "}
              It competes during Alpha and signs as Beta begins, and never builds a
              prototype at all, because the product already exists.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                A department following the agile approach Public Services and Procurement
                Canada sets out.
              </strong>{" "}
              It competes during Discovery, signs with several suppliers at once as Alpha
              begins, and each of them builds a prototype under that contract. The winner is
              chosen by amending their contract rather than by running a second competition.
            </li>
          </ul>
          <p className={`${guideProse} mt-5`}>
            The competition, the signature and the first real build are the same three
            events in all three cases. Where they land moves by a whole sub-phase, and the
            only thing that moved them is how the department chose to buy. That is why this
            guide describes each sub-phase more loosely than the guides it learned from.
          </p>

          <p className={guideBlockSubheading}>And the part that is not really about the guide</p>
          <p className={guideProse}>
            No guide can tell a department how its particular service will go. What it can
            do is leave the reader harder to surprise. If the next version of this does one
            thing better, we would like it to be that: fewer people finding out about a
            decision at the point where it has already been made for them.
          </p>
        </section>


        <ReusablePieces />

        <PageFoot />

        <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

        <div className="h-24" />
    </GuideLayout>
  );
}
