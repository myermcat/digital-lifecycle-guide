import { useId, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  guideBlockTitle,
  guideCalloutLabel,
  guideLink,
  guideListIndent,
  guideProseTight,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export interface LookingAheadPill {
  /** Pill label. */
  label: string;
  /** Short intro line shown above the bullets. */
  intro: string;
  /** A few short bullet points. */
  items: string[];
  /** Optional in-guide link shown below the bullets. */
  href?: string;
  linkLabel?: string;
}

interface LookingAheadProps {
  id?: string;
  label?: string;
  title?: string;
  intro?: string;
  pills: LookingAheadPill[];
  className?: string;
}

function LookingAheadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className ?? "h-6 w-6 text-primary"}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
      <path
        fill="currentColor"
        d="M12 7.25a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      />
    </svg>
  );
}

/**
 * Light "Looking ahead" callout. A title, one-line intro, and a row of
 * pale pearl pills. Tapping a pill opens a quiet panel with that pill's
 * intro line and bullets. Tapping again closes it.
 */
export function LookingAhead({
  id,
  label = "Looking ahead",
  title = "Looking ahead",
  intro,
  pills,
  className,
}: LookingAheadProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const groupId = useId();
  const active = openIndex !== null ? pills[openIndex] : null;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 rounded-lg border border-primary/15 bg-primary/[0.04] px-6 py-6 md:px-8 md:py-7",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <LookingAheadIcon className="h-6 w-6 shrink-0 text-primary" />
        <p className={guideCalloutLabel}>{label}</p>
      </div>
      {title ? <h3 className={`${guideBlockTitle} mt-1.5`}>{title}</h3> : null}
      {intro ? <p className={`${guideProseTight} mt-2`}>{intro}</p> : null}

      <div
        role="tablist"
        aria-label="Looking ahead options"
        className="mt-4 flex flex-wrap gap-2"
      >
        {pills.map((pill, i) => {
          const selected = openIndex === i;
          return (
            <button
              key={pill.label}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${groupId}-panel`}
              onClick={() => setOpenIndex(selected ? null : i)}
              className={cn(
                "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
                selected
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground/80 hover:bg-card/70 hover:text-foreground",
              )}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          id={`${groupId}-panel`}
          role="tabpanel"
          aria-live="polite"
          className="mt-4 rounded-md border border-border bg-card/70 px-4 py-4 md:px-5 md:py-5"
        >
          <p
            className={`font-serif text-sm font-semibold tracking-tight text-primary mb-2`}
          >
            {active.label}
          </p>
          <p className={`${guideProseTight} mb-2`}>{active.intro}</p>
          <ul className={`${guideProseTight} space-y-1.5 list-disc ${guideListIndent}`}>
            {active.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          {active.href && active.linkLabel ? (
            <p className="mt-3">
              <Link to={active.href} className={`text-sm ${guideLink}`}>
                {active.linkLabel}
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}