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
import { PageFoot } from "@/components/PageFoot";
import {
  PhaseIconCreate,
  PhaseIconLive,
  PhaseIconSunset,
} from "@/components/PhaseLifecycleIcons";
import { PillarCallout } from "@/components/PillarCallout";
import {
  guideArrowList,
  guideCalloutLabel,
  guideListIndent,
  guideProse,
  guideProseSpace,
  guideSubsectionTitle,
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
import { UI } from "@/lib/ui-strings";
import { HOME } from "@/lib/home-page-content";

/** Hidden for now: phases read as distinct enough without this test. */
const SHOW_PHASE_TEST_CALLOUT = false;

/** Document order. A nav that does not match the page reads as broken. */
const HOME_ON_THIS_PAGE = [
  { id: "who-this-is-for", label: UI.whoThisIsFor },
  { id: "see-the-whole-path", label: UI.theOfficialCheckpointsPlain },
  { id: "the-three-phases", label: UI.theThreePhases },
  { id: "why-bother", label: UI.whyItMatters },
  { id: "your-setup", label: UI.setTheGuideToYourSituation },
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
            {UI.governmentOfCanada}
          </p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
            {UI.the2026}
            <br />
            {UI.digitalLifecycleGuide}
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-border" />
        </header>

        <EditorialNote className="mb-8 md:mb-10">
          {UI.noteAccurateForNow}{" "}
          <ExternalLink linkKey="github-issues">
            {UI.tellUsWhatIsMissing}
          </ExternalLink>
          .
        </EditorialNote>

        <section className={guideProseSpace}>
          <p className="first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-2 first-letter:-mt-5 first-letter:text-primary">
            {HOME.p1}
          </p>
          <p>
            {HOME.p2}
          </p>

          <h3 className={`${guideSubsectionTitle} !mt-8 !mb-2`}>{UI.whatThisGuideIs}</h3>
          <p>
            It describes{" "}
            <strong className="font-semibold text-foreground">
              a few ways of building a digital service
            </strong>
            , not the only correct way, because there is not one.
          </p>
          <p>
            {HOME.p3}
          </p>
          <p>
            {HOME.p4}
          </p>
        </section>

        <section className="mt-8 md:mt-10 rounded-lg border border-border bg-card px-6 py-6 shadow-sm md:px-8 md:py-7">
          <p className={guideCalloutLabel}>{UI.whatIsHereForYouWhicheverWayYouGo}</p>
          <ul className={`${guideArrowList} mt-4 !pl-0`}>
            <li className="flex items-start gap-3">
              <ShieldCheck
                aria-hidden="true"
                className="mt-1 h-[1.15rem] w-[1.15rem] shrink-0 text-primary/70"
                strokeWidth={1.6}
              />
              <p className={guideProse}>
                <strong className="font-semibold text-foreground">{UI.theSecurityPractices}</strong>{" "}
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
                <strong className="font-semibold text-foreground">{UI.theOfficialCheckpoints2}</strong>{" "}
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
                <strong className="font-semibold text-foreground">{UI.aPictureOfWhatIsComing}</strong>{" "}
                Which decisions arrive in roughly what order, who else has to be involved, and
                which of them are expensive to reverse later.
              </p>
            </li>
          </ul>
        </section>

        <section className={`${guideProseSpace} mt-8 md:mt-10`}>

          <h3 className={`${guideSubsectionTitle} !mt-8 !mb-2`}>
            {UI.oneThingThatCatchesPeopleWhicheverRout}
          </h3>
          <p>
            {HOME.p5}
          </p>
          <p>
            {HOME.p6}
          </p>

          <h3 className={`${guideSubsectionTitle} !mt-8 !mb-2`}>{UI.theOneThingWorthHoldingOnTo}</h3>
          <p>
            <strong className="font-semibold text-foreground">{UI.itStaysYourService}</strong>{" "}
            You can hand the building to a supplier, and much of the time that is the sensible
            thing to do. What does not transfer with it is the answering for it. When a
            service does not work, the person who cannot get their application in never
            hears about the procurement contract behind it, and would not care if they did.
            They experience it as the Government of Canada failing them, and it is the
            department that answers for that, publicly and afterwards.
          </p>
          <p>
            {HOME.p7}
          </p>
        </section>

        <PillarCallout
          id="who-this-is-for"
          className="scroll-mt-24 mt-8 md:mt-10 rounded-lg border border-primary/40 bg-background shadow-sm overflow-hidden"
          label={UI.whoThisIsFor}
          title={UI.thisGuideIsForYouWhateverBroughtYouHer}
          icon={BadgeCheck}
        >
          <div className="space-y-3 text-[0.8125rem] leading-[1.4]">
            <p>
              {HOME.p8}
            </p>
            <p>
              {HOME.p9}
            </p>
            <p>{UI.youMightBe}</p>
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
              {HOME.p10}
            </p>
            <p>
              {HOME.p11}
            </p>
          </div>
        </PillarCallout>

        <PillarCallout
          id="see-the-whole-path"
          className="scroll-mt-24 mt-8 md:mt-10 rounded-lg border border-primary/40 bg-[var(--phase-group)] shadow-sm overflow-hidden"
          label={UI.seeTheWholePath}
          title={UI.theOfficialCheckpointsOfADigitalServic}
          icon={Map}
          href="/gate-map"
          linkLabel="See the whole path →"
        >
          <p>
            {HOME.p12}
          </p>
        </PillarCallout>

        <LifecycleThreeRegionsFigure variant="featured" className="mt-12 md:mt-14" />

        <section id="the-three-phases" className="mt-10 md:mt-12 scroll-mt-24">
          <h2 className={`${guideSectionTitle} mb-3`}>{UI.theThreePhases}</h2>
          <p>
            {HOME.p13}
          </p>
          <p>
            {HOME.p14}
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
            {HOME.p15}
          </p>
          <img
            src={lifecycleIslands}
            alt="The service lifecycle as three islands — Create, Live, Sunset — joined by two bridges: Launch, and Plan the exit."
            className="mx-auto mt-8 md:mt-10 mb-6 md:mb-8 h-auto w-full max-w-3xl"
          />
          {/* Hidden for now: phases read as distinct enough without this test. */}
          {SHOW_PHASE_TEST_CALLOUT ? (
            <GuideCallout title={UI.notSureWhichPhaseYouAreIn} className="mb-10 md:mb-14">
              {HOME.p16}
            </GuideCallout>
          ) : null}
          <p>
            Whichever phase you are in, one idea runs under all of it: a government service is
            almost never the thing a person actually wants. It is one step in a much bigger journey
            of theirs, often spread across many departments and levels of government.{" "}
            <Link to={THREADS["joined-up-delivery"].path} className={guideLink}>
              {UI.joinedUpDelivery}
            </Link>{" "}
            is where that thinking starts.
          </p>
        </section>

        <section className="mt-16 md:mt-20 scroll-mt-24" id="why-bother">
          <h2 className={`${guideSectionTitle} mb-3`}>{UI.whyItMatters}</h2>
          <IconAccordionSection
            embedded
            stages={[
              {
                id: "nobody-told-her",
                icon: BookOpen,
                eyebrow: WORKED_EXAMPLE_LABELS.setup,
                title: UI.nobodyToldHer,
                titleClassName: "text-lg md:text-xl",
                triggerNote:
                  "Nadia is made up, and so is her program. Any resemblance to real persons or programs is coincidental.",
                children: (
                  <>
                    <div className="space-y-3">
                      <p>
                        {HOME.p17}
                      </p>
                      <p>
                        {HOME.p18}
                      </p>
                      <p>
                        {HOME.p19}
                      </p>
                    </div>

                    <div className="mt-4 space-y-3">
                      <p>
                        {HOME.p20}
                      </p>
                      <p>
                        {HOME.p21}
                      </p>
                      <p>{UI.noneOfThatIsWrongItIsACompetentPurchas}</p>
                    </div>

                    <div
                      className={`my-5 space-y-4 rounded-md border border-border px-4 py-3 ${guideStaticCardClassName}`}
                    >
                      <p className="font-semibold text-foreground">
                        {HOME.p22}
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
                              {HOME.p23}
                            </p>
                            <p>
                              {HOME.p24}
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
                              {HOME.p25}
                            </p>
                            <p>
                              {HOME.p26}
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
                              {HOME.p27}
                            </p>
                            <p>
                              {HOME.p28}
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
                              {HOME.p29}
                            </p>
                            <p>
                              {HOME.p30}
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
                              {UI.nobodyWasAssignedToManageTheSupplier}
                            </p>
                            <p>
                              {HOME.p31}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-4 space-y-3">
                      <p>
                        {HOME.p32}
                      </p>
                      <p>
                        <strong className="font-semibold text-foreground">
                          {UI.nadiaIsNotSpecialThisHappensMoreOftenT}
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
          <h2 className={`${guideSectionTitle} mb-3`}>{UI.setTheGuideToYourSituation}</h2>
          <p className={guideProse}>
            {HOME.p33}
          </p>

          <SetupToggles className="mt-6" />
        </section>

        <section id="next-guide" className="mt-16 md:mt-20 scroll-mt-24">
          <h2 className={`${guideSectionTitle} mb-3`}>{UI.aGuideForTheNextGuide}</h2>
          <p className={guideProse}>
            {HOME.p34}
          </p>

          <h3 className={`${guideSubsectionTitle} !mt-8 !mb-2`}>{UI.whyWeCouldNotSimplyFollowTheUkAndAustr}</h3>
          <p className={guideProse}>
            The two guides we looked at most were the{" "}
            <ExternalLink linkKey="uk-service-manual">
              {UI.unitedKingdomAposSServiceManual}
            </ExternalLink>{" "}
            and{" "}
            <ExternalLink linkKey="australia-service-process">
              {UI.australiaAposSServiceDesignAndDelivery}
            </ExternalLink>
            . Both draw firm lines between phases, and both can, because each is written
            for one situation: a small team of public servants building a service
            themselves, on shared infrastructure and reusable components their government
            has already built for that purpose.
          </p>
          <p className={guideProse}>
            {HOME.p35}
          </p>
          <ul className={`${guideProse} my-5 list-disc space-y-3 ${guideListIndent}`}>
            <li>
              <strong className="font-semibold text-foreground">
                {HOME.p36}         </strong>{" "}
              It runs the competition during Discovery and signs as Alpha begins, because
              the contracted team is who builds the prototypes.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                {HOME.p37}
              </strong>{" "}
              It competes during Alpha and signs as Beta begins, and never builds a
              prototype at all, because the product already exists.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                {HOME.p38}
              </strong>{" "}
              It competes during Discovery, signs with several suppliers at once as Alpha
              begins, and each of them builds a prototype under that contract. The winner is
              chosen by amending their contract rather than by running a second competition.
            </li>
          </ul>
          <p className={`${guideProse} mt-5`}>
            {HOME.p39}
          </p>

          <h3 className={`${guideSubsectionTitle} !mt-8 !mb-2`}>{UI.andThePartThatIsNotReallyAboutTheGuide}</h3>
          <p className={guideProse}>
            {HOME.p40}
          </p>
        </section>



        <PageFoot />

        <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />

        <div className="h-24" />
    </GuideLayout>
  );
}
