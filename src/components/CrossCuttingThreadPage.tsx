import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { PHASES, type LifecyclePhaseId } from "@/lib/guide-strings";
import type { ThreadContent } from "@/lib/thread-content";
import {
  guideLink,
  guidePageTitle,
  guideProse,
  guideProseSpace,
  guideSectionTitle,
} from "@/lib/guide-typography";

export function CrossCuttingThreadPage({
  content,
  children,
}: {
  content: ThreadContent;
  children?: ReactNode;
}) {
  const phaseNotes = new Map(
    content.byPhase.map((note) => [note.lifecyclePhase, note.body] as const),
  );

  return (
    <GuideLayout id={`thread-${content.slug}`}>
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <span className="text-foreground/80">{content.title}</span>
        </nav>
        <h1 className={`mt-4 ${guidePageTitle}`}>
          {content.title}
        </h1>
        <div className="mt-4 h-px w-16 bg-border" />
      </header>

      <section className={guideProseSpace}>
        <p>{content.stakes}</p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="what-good-looks-like">
        <h2 className={`${guideSectionTitle} mb-3`}>What good looks like</h2>
        <ul className={`${guideProse} space-y-2 list-disc pl-5`}>
          {content.whatGoodLooksLike.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="why-it-matters">
        <h2 className={`${guideSectionTitle} mb-3`}>Why it matters</h2>
        <p className={guideProse}>{content.whyItMatters}</p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="whose-job">
        <h2 className={`${guideSectionTitle} mb-3`}>Whose job it is</h2>
        <p className={guideProse}>{content.whoseJob}</p>
      </section>

      <section className="mt-10 md:mt-12 scroll-mt-24" id="by-phase">
        <h2 className={`${guideSectionTitle} mb-3`}>What {content.title} looks like in each phase</h2>
        <div className={`${guideProseSpace} mt-4`}>
          {(["create", "live", "sunset"] as LifecyclePhaseId[]).map((phaseId) => (
            <div key={phaseId}>
              <h3 className="font-serif text-lg font-semibold text-primary/80 tracking-tight">
                {PHASES[phaseId].title}
              </h3>
              <p className="mt-1">
                {phaseNotes.get(phaseId) ??
                  "This page will describe how this thread applies during this phase."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {content.topicSections && content.topicSections.length > 0 ? (
        <section className="mt-10 md:mt-12 scroll-mt-24" id="focus-areas">
          <h2 className={`${guideSectionTitle} mb-3`}>Focus areas</h2>
          <div className={`${guideProseSpace} mt-4`}>
            {content.topicSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-serif text-lg font-semibold text-primary/80 tracking-tight">
                  {section.title}
                </h3>
                <p className="mt-1">{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {content.furtherReading.length > 0 ? (
        <section className="mt-10 md:mt-12 scroll-mt-24" id="further-reading">
          <h2 className={`${guideSectionTitle} mb-3`}>Further reading</h2>
          <ul className={`${guideProse} space-y-2 list-none pl-0`}>
            {content.furtherReading.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={guideLink} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {children}

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
    </GuideLayout>
  );
}
