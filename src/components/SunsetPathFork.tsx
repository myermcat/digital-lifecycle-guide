import type { SunsetPath } from "@/lib/sunset-landing";
import { guideProseTight } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export type SunsetPathForkOption = {
  path: SunsetPath;
  description: string;
};

/** Matches PhaseFitCards compact variant (Options analysis by-phase section). */
export const sunsetJourneyCardSkin =
  "w-full rounded-md border border-border/45 bg-muted/20 px-3.5 py-3 md:px-4 md:py-3.5";

export const sunsetJourneyCardBox = `mt-6 ${sunsetJourneyCardSkin}`;

const forkTitle = "font-serif text-base font-semibold text-primary tracking-tight";
const forkBody = `${guideProseTight} text-foreground/60`;

export function SunsetPathFork({
  path,
  onPathChange,
  options,
  cardTitle,
  journeyId,
}: {
  path: SunsetPath;
  onPathChange: (path: SunsetPath) => void;
  options: SunsetPathForkOption[];
  cardTitle: string;
  journeyId: string;
}) {
  const selected = options.find((option) => option.path === path) ?? options[0];

  return (
    <div className={`mb-5 ${sunsetJourneyCardSkin}`}>
      <h3 className={forkTitle}>{cardTitle}</h3>

      <div
        role="radiogroup"
        aria-label="Replace or retire path"
        className="mt-4 inline-flex rounded-full border border-border bg-background p-1"
      >
        {(
          [
            { path: "replace" as const, label: "Replace" },
            { path: "retire" as const, label: "Retire" },
          ] as const
        ).map((option) => {
          const isSelected = path === option.path;

          return (
            <button
              key={option.path}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-controls={journeyId}
              onClick={() => onPathChange(option.path)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className={`mt-4 ${forkBody}`} aria-live="polite">
        {selected.description}
      </p>
    </div>
  );
}
