import { useEffect, useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@tanstack/react-router";
import { EditorialNote } from "@/components/EditorialNote";
import { InstrumentMatrix } from "@/components/InstrumentMatrix";
import { ExternalLink } from "@/components/ExternalLink";
import { CheckpointMapTimeline } from "@/components/CheckpointMapTimeline";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import {
  CHECKPOINT_MAP_COLKEY,
  CHECKPOINT_MAP_EYEBROW,
  CHECKPOINT_MAP_FOOTER_DISCLAIMER,
  CHECKPOINT_MAP_LAUNCH,
  CHECKPOINT_MAP_ANNEX_ONE,
  CHECKPOINT_MAP_ANNEX_TWO,
  CHECKPOINT_MAP_NADIA,
  CHECKPOINT_MAP_PHASES,
  CHECKPOINT_MAP_SUBTITLE,
  CHECKPOINT_MAP_TITLE,
  CHECKPOINT_MAP_WHAT_TABLE,
  CHECKPOINT_MAP_WHO,
  CHECKPOINT_MAP_WHO_TITLE,
  CHECKPOINT_MAP_TERMS,
  CHECKPOINT_MAP_TERMS_TITLE,
  CHECKPOINT_MAP_TERMS_CAPTION,
  CHECKPOINT_MAP_WHO_CAPTION,
  CHECKPOINT_MAP_WHY_CREATE,
  CHECKPOINT_MAP_WHY_GCS,
  CHECKPOINT_MAP_STATUS_BANNER,
  CHECKPOINT_MAP_HOW_TO_USE,
  CHECKPOINT_MAP_VARIES,
  type CheckpointMapBodyPart,
  type CheckpointMapCell,
  type CheckpointMapFork,
  type CheckpointMapPhaseBlock,
  type CheckpointMapResponse,
  type CheckpointMapStep,
  type CheckpointMapWhoTag,
} from "@/lib/checkpoint-map-content";
import {
  guideCalloutLabel,
  guideListIndent,
  guidePageTitle,
  guideProse,
  guideProseTight,
  guideSectionTitle,
  guideSubsectionTitle,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

const CHECKPOINT_MAP_PHASE_IDS = CHECKPOINT_MAP_PHASES.map((phase) => phase.id);

function boldPhrases(text: string, phrases: readonly string[] = []): ReactNode {
  if (!phrases.length) return text;
  type Piece = { start: number; end: number; phrase: string };
  const hits: Piece[] = [];
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
  const chosen: Piece[] = [];
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

function checkpointStyledText(
  text: string,
  opts: { bold?: readonly string[]; checkpointPhrases?: readonly string[] } = {},
): ReactNode {
  const markers = [
    ...(opts.checkpointPhrases ?? []).map((phrase) => ({ phrase, kind: "checkpoint" as const })),
    ...(opts.bold ?? []).map((phrase) => ({ phrase, kind: "bold" as const })),
  ];
  if (!markers.length) return text;

  type Hit = { start: number; end: number; phrase: string; kind: "checkpoint" | "bold" };
  const hits: Hit[] = [];
  for (const marker of markers) {
    let from = 0;
    while (from < text.length) {
      const index = text.indexOf(marker.phrase, from);
      if (index === -1) break;
      hits.push({
        start: index,
        end: index + marker.phrase.length,
        phrase: marker.phrase,
        kind: marker.kind,
      });
      from = index + marker.phrase.length;
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
      hit.kind === "checkpoint" ? (
        <span key={`${hit.start}-g`} className="font-semibold text-primary">
          {hit.phrase}
        </span>
      ) : (
        <strong key={`${hit.start}-b`} className="font-semibold text-foreground">
          {hit.phrase}
        </strong>
      ),
    );
    at = hit.end;
  }
  if (at < text.length) parts.push(text.slice(at));
  return parts;
}

function WhoTag({ tag }: { tag: CheckpointMapWhoTag }) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground align-baseline mr-1.5",
        tag === "dept" ? "bg-primary/75" : "bg-amber-800/80",
      )}
    >
      {tag === "dept" ? "her department" : "central"}
    </span>
  );
}

function CautionPill({ lead, text }: { lead: string; text: string }) {
  return (
    <span
      className="mt-2.5 block rounded-xl border border-destructive/25 bg-destructive/8 px-2.5 py-1.5 text-[12.5px] leading-snug text-destructive"
      style={{
        backgroundColor: "color-mix(in oklab, var(--destructive) 10%, var(--background))",
      }}
    >
      <strong className="font-semibold text-destructive">{lead}</strong> {text}
    </span>
  );
}

function BodyParts({ parts }: { parts: readonly CheckpointMapBodyPart[] }) {
  return (
    <>
      {parts.map((part, index) => {
        if (part.type === "ul") {
          return (
            <ul
              key={index}
              className={`mt-1.5 list-disc space-y-0.5 ${guideListIndent} ${guideProseTight}`}
            >
              {part.items.map((item) => (
                <li key={item}>{boldPhrases(item, part.itemBold)}</li>
              ))}
            </ul>
          );
        }
        if (part.type === "caution") {
          return <CautionPill key={index} lead={part.lead} text={part.text} />;
        }
        return (
          <p key={index} className={`${guideProseTight} mt-1`}>
            {boldPhrases(part.text, part.bold)}
          </p>
        );
      })}
    </>
  );
}

function ActionCell({ cell }: { cell: CheckpointMapCell }) {
  return (
    <div className="bg-primary/[0.06] px-3.5 py-2.5 md:px-4 border-t border-border">
      <p className={`${guideProseTight}`}>
        <strong className="font-semibold text-primary">{cell.lead}</strong>
      </p>
      {cell.body ? <BodyParts parts={cell.body} /> : null}
    </div>
  );
}

function ResponseCell({ cell }: { cell: CheckpointMapResponse }) {
  return (
    <div className="bg-muted/25 px-3.5 py-2.5 md:px-4 border-t border-border">
      <div className={`${guideProseTight}`}>
        {cell.tags.map((tag) => (
          <WhoTag key={tag} tag={tag} />
        ))}
        <strong className="mt-1 block font-semibold text-primary">{cell.lead}</strong>
      </div>
      {cell.body ? <BodyParts parts={cell.body} /> : null}
    </div>
  );
}

function StepGrid({ steps }: { steps: readonly CheckpointMapStep[] }) {
  return (
    <div className="mb-3 overflow-hidden rounded-md border border-border">
      <div className="hidden sm:grid sm:grid-cols-[2.25rem_1fr_1.3fr]">
        <div className="bg-primary px-2 py-2 text-center font-sans text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
          #
        </div>
        <div className="bg-foreground px-3 py-2 font-sans text-[11px] font-semibold uppercase tracking-wide text-background">
          What Nadia does
        </div>
        <div className="bg-foreground px-3 py-2 font-sans text-[11px] font-semibold uppercase tracking-wide text-background">
          Who responds, and how
        </div>
      </div>
      {steps.map((step) => (
        <div
          key={step.n}
          className="grid grid-cols-[2.25rem_1fr] sm:grid-cols-[2.25rem_1fr_1.3fr]"
        >
          <div className="flex items-start justify-center bg-primary px-1 py-3 font-sans text-sm font-semibold text-primary-foreground border-t border-primary/40">
            {step.n}
          </div>
          <ActionCell cell={step.action} />
          <div className="col-span-2 sm:col-span-1">
            <ResponseCell cell={step.response} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ForkCallout({ fork }: { fork: CheckpointMapFork }) {
  return (
    <aside className="my-3 rounded-md border border-amber-600/35 border-l-[5px] border-l-amber-600/70 bg-amber-500/10 px-4 py-3 md:px-5 text-[0.8125rem] leading-snug text-foreground/90">
      <p>
        <strong className="font-semibold text-amber-950/80">{fork.title}</strong>{" "}
        {checkpointStyledText(fork.text, { bold: fork.bold, checkpointPhrases: fork.checkpointPhrases })}
      </p>
    </aside>
  );
}

function LaunchBar() {
  return (
    <div className="my-5 flex flex-col gap-2 rounded-lg border border-primary/40 bg-primary/[0.07] px-4 py-3 md:flex-row md:items-center md:gap-3 md:px-5">
      <span className="inline-flex w-fit shrink-0 rounded bg-primary px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-primary-foreground">
        {CHECKPOINT_MAP_LAUNCH.tag}
      </span>
      <p className="font-serif text-[0.9375rem] leading-snug text-primary">{CHECKPOINT_MAP_LAUNCH.text}</p>
    </div>
  );
}

function NadiaFigure() {
  return (
    <svg
      viewBox="0 0 98 118"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-[90px] shrink-0 text-primary"
    >
      <circle cx="44" cy="19" r="14" className="fill-accent" />
      <rect x="30" y="36" width="28" height="36" rx="10" className="fill-primary" />
      <line
        x1="30"
        y1="48"
        x2="16"
        y2="64"
        className="stroke-primary"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <line
        x1="58"
        y1="44"
        x2="77"
        y2="26"
        className="stroke-primary"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="81" cy="23" r="8" className="fill-accent" />
      <line
        x1="38"
        y1="72"
        x2="34"
        y2="112"
        className="stroke-primary"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.85"
      />
      <line
        x1="50"
        y1="72"
        x2="54"
        y2="112"
        className="stroke-primary"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

function PhaseAccordionBody({ phase }: { phase: CheckpointMapPhaseBlock }) {
  return (
    <div className="space-y-3">
      <p className={`${guideProseTight} text-muted-foreground`}>{phase.phaseNote}</p>
      <StepGrid steps={phase.steps} />
      {phase.forkAfter ? <ForkCallout fork={phase.forkAfter} /> : null}
      {phase.stepsAfterFork ? <StepGrid steps={phase.stepsAfterFork} /> : null}
      {phase.forkEnd ? <ForkCallout fork={phase.forkEnd} /> : null}
    </div>
  );
}

function PhaseAccordionItem({ phase }: { phase: CheckpointMapPhaseBlock }) {
  return (
    <AccordionItem value={phase.id} id={phase.id} className="scroll-mt-24">
      <AccordionTrigger className="gap-3 px-5 py-4 text-left hover:no-underline">
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-base md:text-lg font-semibold text-primary leading-snug">
            {phase.heading}
          </span>
          <span className="mt-1.5 inline-block rounded-full bg-muted px-2.5 py-0.5 font-sans text-[11.5px] font-semibold text-primary">
            {phase.durationLabel}
          </span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5">
        <PhaseAccordionBody phase={phase} />
      </AccordionContent>
    </AccordionItem>
  );
}

function CheckpointMapPhaseAccordions() {
  const [openPhase, setOpenPhase] = useState<string | undefined>(
    CHECKPOINT_MAP_PHASE_IDS[0],
  );

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!CHECKPOINT_MAP_PHASE_IDS.includes(hash as (typeof CHECKPOINT_MAP_PHASE_IDS)[number])) {
        return;
      }
      setOpenPhase(hash);
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      }, 50);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <Accordion
      type="single"
      collapsible
      value={openPhase}
      onValueChange={(value) => setOpenPhase(value || undefined)}
      className="mb-8 md:mb-10 rounded-lg border border-border bg-card"
    >
      {CHECKPOINT_MAP_PHASES.flatMap((phase) => {
        const item = <PhaseAccordionItem key={phase.id} phase={phase} />;
        if (!phase.showLaunchAfter) return [item];
        return [
          item,
          <div key={`${phase.id}-launch`} className="border-b border-border px-4 py-1 md:px-5">
            <LaunchBar />
          </div>,
        ];
      })}
    </Accordion>
  );
}

function DefinitionBlock({
  id,
  title,
  cap,
  entries,
}: {
  id: string;
  title: string;
  cap: string;
  entries: readonly { term: string; def: string }[];
}) {
  return (
    <section
      id={id}
      className="mt-8 md:mt-10 scroll-mt-24 rounded-lg border border-border bg-[var(--phase-group)]/50 px-5 py-5 md:px-6 md:py-6"
    >
      <h2 className={`${guideSubsectionTitle} text-foreground`}>{title}</h2>
      <p className={`${guideProseTight} mt-1 mb-4 text-muted-foreground`}>{cap}</p>
      <dl className="mt-3 grid gap-x-4 gap-y-2.5 md:grid-cols-[minmax(12rem,14rem)_1fr]">
        {entries.map((entry) => (
          <div key={entry.term} className="contents">
            <dt className={`${guideProseTight} font-semibold text-primary`}>{entry.term}</dt>
            <dd className={guideProseTight}>{entry.def}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function CheckpointMapPage() {
  return (
    <GuideLayout>
      <header className="mb-6 md:mb-8">
        <p className={guideCalloutLabel}>{CHECKPOINT_MAP_EYEBROW}</p>
        <h1 className={`${guidePageTitle} mt-2`}>{CHECKPOINT_MAP_TITLE}</h1>
        <div className="mt-5 h-px w-16 bg-border" />
        <p className={`${guideProse} mt-5 max-w-[84ch] text-muted-foreground`}>
          {boldPhrases(CHECKPOINT_MAP_SUBTITLE.text, CHECKPOINT_MAP_SUBTITLE.bold)}
        </p>
      </header>

      <section id="what-this-covers" className="mb-5 scroll-mt-24">
        <h3 className={`${guideSubsectionTitle} mb-2`}>{CHECKPOINT_MAP_WHAT_TABLE.heading}</h3>
        <p className={guideProseTight}>
          {boldPhrases(CHECKPOINT_MAP_WHAT_TABLE.body, CHECKPOINT_MAP_WHAT_TABLE.bold)}
        </p>
      </section>

      <section className="mb-8 md:mb-10">
        <h3 className={`${guideSubsectionTitle} mb-2`}>{CHECKPOINT_MAP_WHY_CREATE.heading}</h3>
        <p className={guideProseTight}>{CHECKPOINT_MAP_WHY_CREATE.body}</p>
      </section>

      <section className="mb-8 md:mb-10">
        <h3 className={`${guideSubsectionTitle} mb-3`}>{CHECKPOINT_MAP_HOW_TO_USE.heading}</h3>
        <ul className={`${guideProseTight} list-disc space-y-2 ${guideListIndent}`}>
          {CHECKPOINT_MAP_HOW_TO_USE.items.map((item) => (
            <li key={item.lead}>
              <strong className="font-semibold text-foreground">{item.lead}</strong>{" "}
              {item.body}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8 md:mb-10 rounded-lg border border-border bg-card px-5 py-5 md:px-6 md:py-6">
        <h3 className={`${guideSubsectionTitle} mb-2`}>{CHECKPOINT_MAP_VARIES.heading}</h3>
        <div className={`${guideProseTight} space-y-2.5`}>
          {CHECKPOINT_MAP_VARIES.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <DefinitionBlock
        id="thecheckpoints"
        title={CHECKPOINT_MAP_TERMS_TITLE}
        cap={CHECKPOINT_MAP_TERMS_CAPTION}
        entries={CHECKPOINT_MAP_TERMS}
      />

      <section id={CHECKPOINT_MAP_ANNEX_ONE.id} className="mt-14 scroll-mt-24 md:mt-20">
        <div className="border-t border-border pt-8 md:pt-10">
          <p className={guideCalloutLabel}>{CHECKPOINT_MAP_ANNEX_ONE.label}</p>
          <h2 className={`${guideSectionTitle} mt-1.5 mb-3`}>
            {CHECKPOINT_MAP_ANNEX_ONE.heading}
          </h2>
          <p className={`${guideProse} mb-5 max-w-[84ch]`}>{CHECKPOINT_MAP_ANNEX_ONE.intro}</p>
        </div>
        <InstrumentMatrix embedded />
      </section>

      <section id={CHECKPOINT_MAP_ANNEX_TWO.id} className="mt-14 scroll-mt-24 md:mt-20">
        <div className="border-t border-border pt-8 md:pt-10">
          <p className={guideCalloutLabel}>{CHECKPOINT_MAP_ANNEX_TWO.label}</p>
          <h2 className={`${guideSectionTitle} mt-1.5 mb-3`}>
            {CHECKPOINT_MAP_ANNEX_TWO.heading}
          </h2>
          <p className={`${guideProse} max-w-[84ch]`}>{CHECKPOINT_MAP_ANNEX_TWO.intro}</p>
          <p className="mt-4 max-w-[84ch] border-l-2 border-border pl-4 font-sans text-[0.85rem] leading-relaxed text-muted-foreground">
            {CHECKPOINT_MAP_ANNEX_TWO.pathNote}
          </p>
        </div>
        <DefinitionBlock
        id="whoswho"
        title={CHECKPOINT_MAP_WHO_TITLE}
        cap={CHECKPOINT_MAP_WHO_CAPTION}
        entries={CHECKPOINT_MAP_WHO}
      />
        <div className="mt-6">
          <CheckpointMapTimeline />
          <p className={`${guideProseTight} -mt-4 mb-6 text-muted-foreground md:mb-8`}>
            {CHECKPOINT_MAP_ANNEX_TWO.timelineNote}
          </p>
      <section id="what-this-covers" className="mb-6 scroll-mt-24 md:mb-8">
        <h2 className={`${guideSubsectionTitle} mb-3`}>{CHECKPOINT_MAP_NADIA.heading}</h2>
        <div className="flex items-start gap-4 md:gap-5">
          <NadiaFigure />
          <p className={`${guideProseTight} flex-1`}>
            {(() => {
              const text = CHECKPOINT_MAP_NADIA.body;
              const phrase = CHECKPOINT_MAP_NADIA.amber[0];
              const index = text.indexOf(phrase);
              if (index === -1) return boldPhrases(text, CHECKPOINT_MAP_NADIA.bold);
              return (
                <>
                  {boldPhrases(text.slice(0, index), CHECKPOINT_MAP_NADIA.bold)}
                  <span className="rounded-sm border border-amber-600/40 bg-amber-500/15 px-1.5 py-0.5 font-semibold text-amber-950/80">
                    {phrase}
                  </span>
                  {boldPhrases(text.slice(index + phrase.length), CHECKPOINT_MAP_NADIA.bold)}
                </>
              );
            })()}
          </p>
        </div>
      </section>

      <section className="mb-5">
        <h3 className={`${guideSubsectionTitle} mb-2`}>{CHECKPOINT_MAP_WHY_GCS.heading}</h3>
        <p className={guideProseTight}>{CHECKPOINT_MAP_WHY_GCS.body}</p>
        <div className="mt-3 overflow-hidden rounded-md border border-border max-w-[84ch]">
          <div className="grid sm:grid-cols-[30%_1fr]">
            <p className={`${guideProseTight} border-b sm:border-b-0 sm:border-r border-border bg-muted/40 px-3.5 py-2.5 font-semibold`}>
              {CHECKPOINT_MAP_COLKEY.left}
            </p>
            <p className={`${guideProseTight} px-3.5 py-2.5 text-muted-foreground`}>
              Right is who answers, and how. The tag on each response says whether the responder is{" "}
              <WhoTag tag="dept" /> or a <WhoTag tag="central" />.
            </p>
          </div>
        </div>
      </section>
          <CheckpointMapPhaseAccordions />
        </div>
      </section>

      <p className={`${guideProseTight} mt-8 text-muted-foreground`}>
        {CHECKPOINT_MAP_FOOTER_DISCLAIMER}
      </p>

      <PageFoot className="mt-10 md:mt-12" />
    </GuideLayout>
  );
}
