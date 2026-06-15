import { Link } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { PracticeCardGroup } from "@/components/PracticeCard";
import { proseWithExternalLinks } from "@/components/ProseWithExternalLinks";
import { SourcesBlock } from "@/components/SourcesBlock";
import { WeightedRegionBlock } from "@/components/WeightedRegionBlock";
import {
  CONTRACTING_GOOD_LOOKS_CARDS,
  CONTRACTING_LANDING,
} from "@/lib/contracting-landing";
import { THREADS } from "@/lib/guide-strings";
import {
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";

export function ContractingLandingPage() {
  return (
    <GuideLayout id="thread-contracting">
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <Link to={THREADS.procurement.path} className="hover:text-foreground transition-colors">
            {THREADS.procurement.title}
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <span className="text-foreground/80">{CONTRACTING_LANDING.title}</span>
        </nav>
        <h1 className="mt-4 font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.1]">
          {CONTRACTING_LANDING.title}
        </h1>
        <div className="mt-4 h-px w-16 bg-border" />
      </header>

      <section className={guideProseSpace}>
        {CONTRACTING_LANDING.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="what-good-looks-like">
        <h2 className={`${guideSectionTitle} mb-2`}>What good looks like</h2>
        <p className={`${guideProse} mb-4`}>{CONTRACTING_LANDING.goodLooksIntro}</p>
        <PracticeCardGroup cards={CONTRACTING_GOOD_LOOKS_CARDS} numbered />
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="why-it-matters">
        <h2 className={`${guideSectionTitle} mb-3`}>Why it matters</h2>
        <p className={guideProse}>{CONTRACTING_LANDING.whyItMatters}</p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="whose-job">
        <h2 className={`${guideSectionTitle} mb-3`}>Whose job it is</h2>
        <p className={guideProse}>
          {proseWithExternalLinks(
            CONTRACTING_LANDING.whoseJob.text,
            CONTRACTING_LANDING.whoseJob.externalLinks ?? [],
          )}
        </p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="by-region">
        <h2 className={`${guideSectionTitle} mb-3`}>What it looks like in each region</h2>
        <p className={`${guideProse} mb-2`}>{CONTRACTING_LANDING.byRegionIntro}</p>
        <WeightedRegionBlock regions={CONTRACTING_LANDING.byRegion} />
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="further-reading">
        <h2 className={`${guideSectionTitle} mb-3`}>Further reading</h2>
        <p className={guideProse}>
          {proseWithExternalLinks(
            CONTRACTING_LANDING.furtherReading.text,
            CONTRACTING_LANDING.furtherReading.externalLinks ?? [],
          )}
        </p>
      </section>

      <SourcesBlock items={CONTRACTING_LANDING.sources} />

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
      <div className="h-16" />
    </GuideLayout>
  );
}
