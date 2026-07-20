import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { GuideCallout } from "@/components/GuideCallout";
import {
  PhaseIconCreate,
  PhaseIconLive,
  PhaseIconSunset,
} from "@/components/PhaseLifecycleIcons";
import {
  GUIDE_CONTENTS,
  contentsLinkLabel,
  requirePageIndexEntry,
  type ContentsDocLink,
} from "@/lib/guide-contents";
import {
  guideLink,
  guideListIndent,
  guidePageTitle,
  guideProse,
  guideProseTight,
  guideSectionTitle,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

function boldPhrases(text: string, phrases: readonly string[] = []): ReactNode {
  if (!phrases.length) return text;
  type Hit = { start: number; end: number; phrase: string };
  const hits: Hit[] = [];
  for (const phrase of phrases) {
    let from = 0;
    while (from < text.length) {
      const index = text.indexOf(phrase, from);
      if (index === -1) break;
      hits.push({ start: index, end: index + phrase.length, phrase });
      from = index + phrase.length;
    }
  }
  hits.sort((a, b) => a.start - b.start || b.end - a.end);
  const chosen: Hit[] = [];
  let cursor = 0;
  for (const hit of hits) {
    if (hit.start < cursor) continue;
    chosen.push(hit);
    cursor = hit.end;
  }
  if (!chosen.length) return text;
  const parts: ReactNode[] = [];
  let at = 0;
  for (const hit of chosen) {
    if (hit.start > at) parts.push(text.slice(at, hit.start));
    parts.push(
      <strong key={`${hit.start}-${hit.phrase}`} className="font-semibold text-foreground">
        {hit.phrase}
      </strong>,
    );
    at = hit.end;
  }
  if (at < text.length) parts.push(text.slice(at));
  return parts;
}

function DocLinkRow({ item }: { item: ContentsDocLink }) {
  const { title, path } = contentsLinkLabel(item.path);
  const Icon = item.icon;
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-2.5 border-b border-border/70 py-2 text-[0.9375rem] text-primary/75",
        "hover:text-primary hover:underline transition-colors last:border-b-0",
      )}
    >
      <Icon className="size-[1.15rem] shrink-0 opacity-80" strokeWidth={1.8} aria-hidden />
      <span>{title}</span>
    </Link>
  );
}

function PhaseIcon({ phase }: { phase: "create" | "live" | "sunset" }) {
  const className = "size-6 shrink-0 text-primary";
  if (phase === "create") return <PhaseIconCreate className={className} />;
  if (phase === "live") return <PhaseIconLive className={className} />;
  return <PhaseIconSunset className={className} />;
}

export function GuideContentsPage() {
  const { startHere, lifeOfAService, topics, references, newToThis } = GUIDE_CONTENTS;

  return (
    <div>
      <header className="mb-8 md:mb-10">
        <h1 className={guidePageTitle}>{GUIDE_CONTENTS.title}</h1>
        <p className={`${guideProse} mt-3 text-muted-foreground`}>{GUIDE_CONTENTS.subtitle}</p>
        <div className="mt-5 h-px w-16 bg-border" />
      </header>

      <p className={`${guideProse} mb-8 md:mb-10 max-w-[74ch]`}>
        {boldPhrases(GUIDE_CONTENTS.intro.text, GUIDE_CONTENTS.intro.bold)}
      </p>

      <section className="scroll-mt-24 mb-10 md:mb-12" id="start-here">
        <h2 className={`${guideSectionTitle} mb-4 border-b border-border pb-2`}>
          {startHere.heading}
        </h2>
        <div className="mb-4 flex flex-wrap gap-2.5">
          {startHere.links.map((link) => {
            const resolved = contentsLinkLabel(
              link.path,
              "label" in link ? link.label : undefined,
            );
            return (
              <Link
                key={link.path}
                to={resolved.path}
                className={cn(
                  "inline-flex items-center rounded-md border border-border bg-[var(--phase-group)]",
                  "px-4 py-2.5 text-[0.9375rem] font-semibold text-primary",
                  "hover:bg-muted hover:underline transition-colors",
                )}
              >
                {resolved.title}
              </Link>
            );
          })}
        </div>
        <p className={`${guideProseTight} max-w-[74ch] text-muted-foreground`}>{startHere.lede}</p>
      </section>

      <section className="scroll-mt-24 mb-10 md:mb-12" id="the-life-of-a-service">
        <h2 className={`${guideSectionTitle} mb-2 border-b border-border pb-2`}>
          {lifeOfAService.heading}
        </h2>
        <p className={`${guideProseTight} mb-5 max-w-[74ch] text-muted-foreground`}>
          {lifeOfAService.lede}
        </p>

        <div className="space-y-3.5">
          {lifeOfAService.phases.map((phase) => {
            requirePageIndexEntry(phase.path);
            return (
              <article
                key={phase.path}
                className="rounded-md border border-border border-l-[5px] border-l-primary bg-card px-5 py-4 md:px-6 md:py-5"
              >
                <div className="flex flex-wrap items-center gap-2.5 md:gap-3">
                  <PhaseIcon phase={phase.phase} />
                  <Link
                    to={phase.path}
                    className={`font-serif text-xl md:text-[1.4rem] font-bold text-primary ${guideLink}`}
                  >
                    {phase.shortTitle}
                  </Link>
                  <span className={`${guideProseTight} text-muted-foreground`}>{phase.when}</span>
                </div>
                {phase.subphasePaths.length > 0 ? (
                  <div className="mt-3.5 ml-1 border-l-2 border-dotted border-border pl-5">
                    <p className="mb-2 font-sans text-[11.5px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                      {phase.subphaseLabel}
                    </p>
                    <ul className="list-none space-y-0.5 pl-0">
                      {phase.subphasePaths.map((subPath) => {
                        const sub = requirePageIndexEntry(subPath);
                        return (
                          <li key={subPath}>
                            <Link
                              to={sub.path}
                              className={cn(
                                "block py-1 text-[0.9375rem] font-medium text-foreground",
                                "hover:text-primary hover:underline",
                              )}
                            >
                              <span className="mr-1 text-muted-foreground/60" aria-hidden>
                                ›
                              </span>
                              {sub.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="scroll-mt-24 mb-10 md:mb-12" id="topic-documents">
        <h2 className={`${guideSectionTitle} mb-2 border-b border-border pb-2`}>
          {topics.heading}
        </h2>
        <p className={`${guideProseTight} mb-5 max-w-[74ch] text-muted-foreground`}>
          {boldPhrases(topics.lede.text, topics.lede.bold)}
        </p>

        <div className="space-y-4">
          {topics.groups.map((group, groupIndex) => (
            <article
              key={group.title}
              className="rounded-md border border-border bg-card/80 px-5 py-4 md:px-6 md:py-5"
            >
              <h3 className="font-sans text-lg md:text-[1.15rem] font-bold text-foreground leading-snug">
                <span className="text-primary/60">{groupIndex + 1}. </span>
                {group.title}
              </h3>
              <p className={`${guideProseTight} mt-1 mb-2 max-w-[74ch] text-muted-foreground`}>
                {group.lede}
              </p>
              <div className="grid gap-x-7 sm:grid-cols-2">
                {group.items.map((item) => (
                  <DocLinkRow key={item.path} item={item} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="scroll-mt-24 mb-10 md:mb-12" id="reference-documents">
        <h2 className={`${guideSectionTitle} mb-2 border-b border-border pb-2`}>
          {references.heading}
        </h2>
        <p className={`${guideProseTight} mb-4 max-w-[74ch] text-muted-foreground`}>
          {references.lede}
        </p>
        <div className="grid gap-x-7 sm:grid-cols-2 max-w-3xl">
          {references.items.map((item) => (
            <DocLinkRow key={item.path} item={item} />
          ))}
        </div>
      </section>

      <GuideCallout title={newToThis.title} className="mt-8 md:mt-10">
        <ol className={`list-decimal space-y-1.5 ${guideListIndent}`}>
          {newToThis.steps.map((step) => {
            if (typeof step === "string") {
              return <li key={step}>{step}</li>;
            }
            return <li key={step.text}>{boldPhrases(step.text, step.bold)}</li>;
          })}
        </ol>
      </GuideCallout>
    </div>
  );
}
