import { useId, useState } from "react";
import {
  guideBlockTitle,
  guideCalloutLabel,
  guideProseTight,
} from "@/lib/guide-typography";

export interface CaseStudySide {
  /** Heading shown above the list (e.g. "What happened"). */
  heading: string;
  /** Short bullet list. */
  items: string[];
}

interface CaseStudyBlockProps {
  id?: string;
  label?: string;
  title: string;
  intro: string;
  /** The cautionary / historical side. */
  actual: CaseStudySide;
  /** The better-way / alternative side. */
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

/**
 * Case study comparison: same situation, two ways. A toggle swaps between
 * how it was done and how it could have been.
 */
export function CaseStudyBlock({
  id,
  label = "Case study",
  title,
  intro,
  actual,
  alternative,
  actualLabel = "How it was done",
  alternativeLabel = "How it could have been",
  className,
}: CaseStudyBlockProps) {
  const [view, setView] = useState<"actual" | "alternative">("actual");
  const groupId = useId();

  const active = view === "actual" ? actual : alternative;
  const isActual = view === "actual";

  return (
    <section
      id={id}
      className={
        className ??
        "scroll-mt-24 rounded-lg border border-border bg-card overflow-hidden"
      }
    >
      <div className="px-6 py-6 md:px-8 md:py-7 space-y-5">
        <div className="flex items-start gap-3">
          <CaseStudyIcon className="h-5 w-5 mt-1 shrink-0 text-primary" />
          <div>
            <p className={guideCalloutLabel}>{label}</p>
            <h3 className={`${guideBlockTitle} mt-1.5`}>{title}</h3>
            <p className={`${guideProseTight} mt-2`}>{intro}</p>
          </div>
        </div>

        <div
          role="radiogroup"
          aria-label={`${title} — comparison`}
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

        <div
          id={`${groupId}-panel`}
          role="region"
          aria-live="polite"
          className={`rounded-md border px-4 py-4 md:px-5 md:py-5 ${
            isActual
              ? "border-destructive/25 bg-destructive/5"
              : "border-primary/25 bg-primary/5"
          }`}
        >
          <p
            className={`font-serif text-sm font-semibold tracking-tight mb-2 ${
              isActual ? "text-destructive/90" : "text-primary"
            }`}
          >
            {active.heading}
          </p>
          <ul className={`${guideProseTight} space-y-1.5 list-disc pl-5`}>
            {active.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
