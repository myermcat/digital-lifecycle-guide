import { useId, useState } from "react";
import { ChevronDown, PersonStanding, UserRound, type LucideIcon } from "lucide-react";
import { GuideArrowBullet } from "@/lib/guide-lists";
import {
  guideBlockTitle,
  guideCalloutLabel,
  guideListIndent,
  guideProseTight,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export interface CaseStudyTradeoff {
  lead: string;
  body: string;
}

export interface CaseStudySide {
  heading: string;
  /** Legacy bullet list. */
  items?: string[];
  framing?: string;
  /** Closing line after bullets (e.g. "The result: …"). */
  closing?: string;
  good?: CaseStudyTradeoff[];
  bad?: CaseStudyTradeoff[];
}

interface CaseStudyBlockProps {
  id?: string;
  label?: string;
  title?: string;
  intro?: string;
  actual: CaseStudySide;
  alternative: CaseStudySide;
  actualLabel?: string;
  alternativeLabel?: string;
  className?: string;
}

function CaseStudyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className ?? "h-5 w-5 text-primary"}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.25" />
      <path d="M12 2 a10 10 0 0 1 0 20 z" fill="currentColor" />
    </svg>
  );
}

function isTradeoffMode(side: CaseStudySide) {
  return Boolean(side.good?.length && side.bad?.length);
}

function TradeoffGroup({
  label,
  items,
  panelId,
  open,
  onToggle,
}: {
  label: string;
  items: CaseStudyTradeoff[];
  panelId: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-md border border-border/60 bg-background/50">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <span className="font-sans text-xs font-semibold uppercase tracking-wide text-foreground/60">
          {label}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={panelId} className="px-3.5 pb-3.5">
          <ul className={`${guideProseTight} space-y-2 list-none ${guideListIndent}`}>
            {items.map((item) => (
              <li key={item.lead} className="flex items-start gap-2.5">
                <GuideArrowBullet inline />
                <span>
                  <span className="font-semibold text-foreground/90">{item.lead}</span> {item.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function TradeoffPanel({
  side,
  tone,
  groupId,
}: {
  side: CaseStudySide;
  tone: "risky" | "safer";
  groupId: string;
}) {
  const [openGroups, setOpenGroups] = useState<Set<"good" | "bad">>(() => new Set());

  const toggleGroup = (key: "good" | "bad") => {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const isRisky = tone === "risky";
  return (
    <div
      className={`rounded-md border px-4 py-4 md:px-5 md:py-5 ${
        isRisky
          ? "border-destructive/25 bg-destructive/5"
          : "border-primary/25 bg-primary/5"
      }`}
    >
      <p
        className={`font-serif text-sm font-semibold tracking-tight mb-2 ${
          isRisky ? "text-destructive/90" : "text-primary"
        }`}
      >
        {side.heading}
      </p>
      {side.framing ? <p className={`${guideProseTight} mb-4`}>{side.framing}</p> : null}
      <div className="space-y-2">
        <TradeoffGroup
          label="Good"
          items={side.good ?? []}
          panelId={`${groupId}-good`}
          open={openGroups.has("good")}
          onToggle={() => toggleGroup("good")}
        />
        <TradeoffGroup
          label="Bad"
          items={side.bad ?? []}
          panelId={`${groupId}-bad`}
          open={openGroups.has("bad")}
          onToggle={() => toggleGroup("bad")}
        />
      </div>
    </div>
  );
}

function characterIconForHeading(heading: string): LucideIcon | null {
  if (heading === "Vell") return UserRound;
  if (heading === "Pax") return PersonStanding;
  return null;
}

function LegacyPanel({ side, isRisky }: { side: CaseStudySide; isRisky: boolean }) {
  const CharacterIcon = characterIconForHeading(side.heading);
  const headingColor = isRisky ? "text-destructive/90" : "text-primary";

  return (
    <div
      className={`rounded-md border px-4 py-4 md:px-5 md:py-5 ${
        isRisky
          ? "border-destructive/25 bg-destructive/5"
          : "border-primary/25 bg-primary/5"
      }`}
    >
      <div className={`flex items-center gap-2 mb-2 ${headingColor}`}>
        {CharacterIcon ? (
          <CharacterIcon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
        ) : null}
        <p className={`font-serif text-sm font-semibold tracking-tight ${headingColor}`}>
          {side.heading}
        </p>
      </div>
      {side.framing ? <p className={`${guideProseTight} mb-3`}>{side.framing}</p> : null}
      {side.items && side.items.length > 0 ? (
        <ul className={`${guideProseTight} space-y-1.5 list-disc ${guideListIndent}`}>
          {side.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : null}
      {side.closing ? <p className={`${guideProseTight} mt-3`}>{side.closing}</p> : null}
    </div>
  );
}

export function CaseStudyBlock({
  id,
  label = "Case study",
  title,
  intro,
  actual,
  alternative,
  actualLabel = "The risky way",
  alternativeLabel = "The safe way",
  className,
}: CaseStudyBlockProps) {
  const [view, setView] = useState<"actual" | "alternative">("alternative");
  const groupId = useId();
  const tradeoffMode = isTradeoffMode(actual) && isTradeoffMode(alternative);
  const active = view === "actual" ? actual : alternative;
  const isActual = view === "actual";
  const hasHeader = Boolean(label || title || intro);
  const comparisonLabel = title ?? `${actualLabel} and ${alternativeLabel}`;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 rounded-lg border border-border bg-card shadow-sm overflow-hidden",
        className,
      )}
    >
      <div className="px-6 py-6 md:px-8 md:py-7 space-y-5">
        {hasHeader ? (
          <div className="flex items-start gap-3">
            <CaseStudyIcon className="h-5 w-5 mt-1 shrink-0 text-primary" />
            <div>
              {label ? <p className={guideCalloutLabel}>{label}</p> : null}
              {title ? <h3 className={`${guideBlockTitle} mt-1.5`}>{title}</h3> : null}
              {intro ? <p className={`${guideProseTight} mt-2`}>{intro}</p> : null}
            </div>
          </div>
        ) : null}

        <div
          role="radiogroup"
          aria-label={`${comparisonLabel} — comparison`}
          className="inline-flex rounded-full border border-border bg-background p-1"
        >
          {(
            [
              { key: "actual" as const, label: actualLabel },
              { key: "alternative" as const, label: alternativeLabel },
            ]
          ).map((opt) => {
            const selected = view === opt.key;
            return (
              <button
                key={opt.key}
                role="radio"
                aria-checked={selected}
                aria-controls={`${groupId}-panel`}
                onClick={() => setView(opt.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {tradeoffMode ? (
          <div id={`${groupId}-panel`} role="region" aria-live="polite">
            <TradeoffPanel
              side={active}
              tone={isActual ? "risky" : "safer"}
              groupId={groupId}
            />
          </div>
        ) : (
          <div id={`${groupId}-panel`} role="region" aria-live="polite">
            <LegacyPanel side={active} isRisky={isActual} />
          </div>
        )}
      </div>
    </section>
  );
}
