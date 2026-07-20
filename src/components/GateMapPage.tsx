import { useEffect, useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorialNote } from "@/components/EditorialNote";
import { ExternalLink } from "@/components/ExternalLink";
import { GateMapTimeline } from "@/components/GateMapTimeline";
import { GuideLayout } from "@/components/GuideLayout";
import { PageFoot } from "@/components/PageFoot";
import {
  GATE_MAP_COLKEY,
  GATE_MAP_EYEBROW,
  GATE_MAP_FOOTER_DISCLAIMER,
  GATE_MAP_GATES,
  GATE_MAP_LAUNCH,
  GATE_MAP_NADIA,
  GATE_MAP_PHASES,
  GATE_MAP_SUBTITLE,
  GATE_MAP_TITLE,
  GATE_MAP_VARY_NOTE,
  GATE_MAP_WHAT_TABLE,
  GATE_MAP_WHO,
  GATE_MAP_WHO_TITLE,
  GATE_MAP_GATES_TITLE,
  GATE_MAP_GATES_CAPTION,
  GATE_MAP_WHO_CAPTION,
  GATE_MAP_WHY_CREATE,
  GATE_MAP_WHY_GCS,
  GATE_MAP_WORKING_NOTE,
  type GateMapBodyPart,
  type GateMapCell,
  type GateMapFork,
  type GateMapPhaseBlock,
  type GateMapResponse,
  type GateMapStep,
  type GateMapWhoTag,
} from "@/lib/gate-map-content";
import {
  guideCalloutLabel,
  guideListIndent,
  guidePageTitle,
  guideProse,
  guideProseTight,
  guideSubsectionTitle,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

const GATE_MAP_PHASE_IDS = GATE_MAP_PHASES.map((phase) => phase.id);

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

function gateStyledText(
  text: string,
  opts: { bold?: readonly string[]; gatePhrases?: readonly string[] } = {},
): ReactNode {
  const markers = [
    ...(opts.gatePhrases ?? []).map((phrase) => ({ phrase, kind: "gate" as const })),
    ...(opts.bold ?? []).map((phrase) => ({ phrase, kind: "bold" as const })),
  ];
  if (!markers.length) return text;

  type Hit = { start: number; end: number; phrase: string; kind: "gate" | "bold" };
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
      hit.kind === "gate" ? (
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

function WhoTag({ tag }: { tag: GateMapWhoTag }) {
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

function BodyParts({ parts }: { parts: readonly GateMapBodyPart[] }) {
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

function ActionCell({ cell }: { cell: GateMapCell }) {
  return (
    <div className="bg-primary/[0.06] px-3.5 py-2.5 md:px-4 border-t border-border">
      <p className={`${guideProseTight}`}>
        <strong className="font-semibold text-primary">{cell.lead}</strong>
      </p>
      {cell.body ? <BodyParts parts={cell.body} /> : null}
    </div>
  );
}

function ResponseCell({ cell }: { cell: GateMapResponse }) {
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

function StepGrid({ steps }: { steps: readonly GateMapStep[] }) {
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

function ForkCallout({ fork }: { fork: GateMapFork }) {
  return (
    <aside className="my-3 rounded-md border border-amber-600/35 border-l-[5px] border-l-amber-600/70 bg-amber-500/10 px-4 py-3 md:px-5 text-[0.8125rem] leading-snug text-foreground/90">
      <p>
        <strong className="font-semibold text-amber-950/80">{fork.title}</strong>{" "}
        {gateStyledText(fork.text, { bold: fork.bold, gatePhrases: fork.gatePhrases })}
      </p>
    </aside>
  );
}

function LaunchBar() {
  return (
    <div className="my-5 flex flex-col gap-2 rounded-lg border border-primary/40 bg-primary/[0.07] px-4 py-3 md:flex-row md:items-center md:gap-3 md:px-5">
      <span className="inline-flex w-fit shrink-0 rounded bg-primary px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-primary-foreground">
        {GATE_MAP_LAUNCH.tag}
      </span>
      <p className="font-serif text-[0.9375rem] leading-snug text-primary">{GATE_MAP_LAUNCH.text}</p>
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

function PhaseAccordionBody({ phase }: { phase: GateMapPhaseBlock }) {
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

function PhaseAccordionItem({ phase }: { phase: GateMapPhaseBlock }) {
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

function GateMapPhaseAccordions() {
  const [openPhase, setOpenPhase] = useState<string | undefined>(undefined);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!GATE_MAP_PHASE_IDS.includes(hash as (typeof GATE_MAP_PHASE_IDS)[number])) {
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
      {GATE_MAP_PHASES.flatMap((phase) => {
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

export function GateMapPage() {
  return (
    <GuideLayout>
      <EditorialNote className="mb-6 md:mb-8">
        <p>
          <strong className="font-semibold text-foreground">{GATE_MAP_WORKING_NOTE.lead}</strong>{" "}
          {GATE_MAP_WORKING_NOTE.body}
        </p>
        <p className="mt-2 italic text-muted-foreground">{GATE_MAP_WORKING_NOTE.disclaimer}</p>
      </EditorialNote>

      <header className="mb-6 md:mb-8">
        <p className={guideCalloutLabel}>{GATE_MAP_EYEBROW}</p>
        <h1 className={`${guidePageTitle} mt-2`}>{GATE_MAP_TITLE}</h1>
        <div className="mt-5 h-px w-16 bg-border" />
        <p className={`${guideProse} mt-5 max-w-[84ch] text-muted-foreground`}>
          {boldPhrases(GATE_MAP_SUBTITLE.text, GATE_MAP_SUBTITLE.bold)}
        </p>
      </header>

      <GateMapTimeline />

      <section className="mb-6 md:mb-8">
        <h2 className={`${guideSubsectionTitle} mb-3`}>{GATE_MAP_NADIA.heading}</h2>
        <div className="flex items-start gap-4 md:gap-5">
          <NadiaFigure />
          <p className={`${guideProseTight} flex-1`}>
            {(() => {
              const text = GATE_MAP_NADIA.body;
              const phrase = GATE_MAP_NADIA.amber[0];
              const index = text.indexOf(phrase);
              if (index === -1) return boldPhrases(text, GATE_MAP_NADIA.bold);
              return (
                <>
                  {boldPhrases(text.slice(0, index), GATE_MAP_NADIA.bold)}
                  <span className="rounded-sm border border-amber-600/40 bg-amber-500/15 px-1.5 py-0.5 font-semibold text-amber-950/80">
                    {phrase}
                  </span>
                  {boldPhrases(text.slice(index + phrase.length), GATE_MAP_NADIA.bold)}
                </>
              );
            })()}
          </p>
        </div>
      </section>

      <section className="mb-5">
        <h3 className={`${guideSubsectionTitle} mb-2`}>{GATE_MAP_WHY_GCS.heading}</h3>
        <p className={guideProseTight}>{GATE_MAP_WHY_GCS.body}</p>
        <div className="mt-3 overflow-hidden rounded-md border border-border max-w-[84ch]">
          <div className="grid sm:grid-cols-[30%_1fr]">
            <p className={`${guideProseTight} border-b sm:border-b-0 sm:border-r border-border bg-muted/40 px-3.5 py-2.5 font-semibold`}>
              {GATE_MAP_COLKEY.left}
            </p>
            <p className={`${guideProseTight} px-3.5 py-2.5 text-muted-foreground`}>
              Right is who answers, and how. The tag on each response says whether the responder is{" "}
              <WhoTag tag="dept" /> or a <WhoTag tag="central" />.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h3 className={`${guideSubsectionTitle} mb-2`}>{GATE_MAP_WHY_CREATE.heading}</h3>
        <p className={guideProseTight}>{GATE_MAP_WHY_CREATE.body}</p>
      </section>

      <section className="mb-8 md:mb-10">
        <h3 className={`${guideSubsectionTitle} mb-2`}>{GATE_MAP_WHAT_TABLE.heading}</h3>
        <p className={guideProseTight}>
          {boldPhrases(GATE_MAP_WHAT_TABLE.body, GATE_MAP_WHAT_TABLE.bold)}
        </p>
      </section>

      <GateMapPhaseAccordions />

      <DefinitionBlock
        id="whoswho"
        title={GATE_MAP_WHO_TITLE}
        cap={GATE_MAP_WHO_CAPTION}
        entries={GATE_MAP_WHO}
      />

      <section
        id="thegates"
        className="mt-8 md:mt-10 scroll-mt-24 rounded-lg border border-border bg-[var(--phase-group)]/50 px-5 py-5 md:px-6 md:py-6"
      >
        <h2 className={`${guideSubsectionTitle} text-foreground`}>{GATE_MAP_GATES_TITLE}</h2>
        <p className={`${guideProseTight} mt-1 mb-1 text-muted-foreground`}>
          {GATE_MAP_GATES_CAPTION}
        </p>
        <Accordion type="single" collapsible className="bg-transparent">
          {GATE_MAP_GATES.map((group) => {
            const value = group.phaseLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <AccordionItem
                key={group.phaseLabel}
                value={value}
                className="border-border bg-transparent shadow-none"
              >
                <AccordionTrigger
                  className={cn(
                    "gap-3 px-0 py-3.5 text-left hover:no-underline",
                    "bg-transparent hover:bg-transparent data-[state=open]:bg-transparent",
                    "[&>svg]:text-primary/70",
                  )}
                >
                  <span className={guideCalloutLabel}>{group.phaseLabel}</span>
                </AccordionTrigger>
                <AccordionContent className="bg-transparent px-0 pb-4">
                  {group.links.length ? (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {group.links.map((link) => {
                        const Icon = link.icon;
                        return (
                          <ExternalLink
                            key={link.linkKey}
                            linkKey={link.linkKey}
                            className="inline-flex items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-1.5 text-sm font-semibold no-underline hover:border-primary/40 hover:bg-muted/40"
                          >
                            <Icon
                              className="size-[15px] shrink-0 opacity-80"
                              strokeWidth={1.8}
                              aria-hidden
                            />
                            {link.label}
                          </ExternalLink>
                        );
                      })}
                    </div>
                  ) : null}
                  <dl className="grid gap-x-4 gap-y-2.5 md:grid-cols-[minmax(12rem,14rem)_1fr]">
                    {group.entries.map((entry) => (
                      <div key={entry.term} className="contents">
                        <dt className={`${guideProseTight} font-semibold text-primary`}>
                          {entry.term}
                        </dt>
                        <dd className={guideProseTight}>{entry.def}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>

      <p className={`${guideProseTight} mt-5 text-muted-foreground`}>{GATE_MAP_VARY_NOTE}</p>
      <p className={`${guideProseTight} mt-4 text-muted-foreground`}>
        {GATE_MAP_FOOTER_DISCLAIMER}
      </p>

      <PageFoot className="mt-10 md:mt-12" />
    </GuideLayout>
  );
}
