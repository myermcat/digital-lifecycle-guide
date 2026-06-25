import { cn } from "@/lib/utils";

export const BACKLOG_PRIORITY_FIGURE_ALT =
  "A vertical backlog column with ready items at the top and larger rough items below, beside a downward arrow labelled higher priority at the top and lower priority at the bottom.";

type BacklogItemType = "Feature" | "Fix" | "Tech debt";

type BacklogRow = {
  type: BacklogItemType;
  title: string;
  state: "ready" | "rough";
};

const readyRows: BacklogRow[] = [
  { type: "Feature", title: "Register to vote online", state: "ready" },
  { type: "Fix", title: "Correct postcode lookup", state: "ready" },
  { type: "Tech debt", title: "Upgrade session storage", state: "ready" },
];

const roughRows: BacklogRow[] = [
  { type: "Feature", title: "Cross-service address sync across departments", state: "rough" },
  { type: "Feature", title: "Annual renewal reminders and notifications", state: "rough" },
];

const typeTagClass: Record<BacklogItemType, string> = {
  Feature: "bg-primary/15 text-primary/80 border-primary/25",
  Fix: "bg-amber-900/10 text-amber-950/75 border-amber-900/20",
  "Tech debt": "bg-stone-600/10 text-stone-800/75 border-stone-600/20",
};

function BacklogRowCard({ row }: { row: BacklogRow }) {
  const isReady = row.state === "ready";

  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-md border border-border/80 bg-card/90 px-2.5",
        isReady ? "py-2" : "py-3",
      )}
    >
      <span
        className={cn(
          "mt-0.5 shrink-0 rounded border px-1.5 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-wide",
          typeTagClass[row.type],
        )}
      >
        {row.type}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-sans leading-snug text-foreground/75",
            isReady ? "text-xs" : "text-sm",
          )}
        >
          {row.title}
        </p>
      </div>
      <span
        className={cn(
          "shrink-0 rounded border px-1.5 py-0.5 font-sans text-[9px] uppercase tracking-wide",
          isReady
            ? "border-primary/20 bg-primary/[0.06] text-primary/65"
            : "border-border bg-muted/50 text-muted-foreground/70",
        )}
      >
        {isReady ? "ready" : "needs breaking down"}
      </span>
    </div>
  );
}

export function BacklogPriorityFigure({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label={BACKLOG_PRIORITY_FIGURE_ALT}
      className={cn(
        "not-prose my-6 rounded-lg border border-primary/15 bg-secondary/30 px-4 py-5 md:px-5 md:py-6",
        className,
      )}
    >
      <div aria-hidden="true" className="flex gap-3 md:gap-4">
        <div className="flex w-8 shrink-0 flex-col items-center md:w-9">
          <p className="mb-2 max-w-[4.5rem] text-center font-sans text-[9px] leading-tight text-primary/60">
            higher priority, do next
          </p>
          <div className="flex min-h-0 flex-1 flex-col items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
            <span className="w-px flex-1 bg-primary/35" />
            <span className="text-primary/55">↓</span>
          </div>
          <p className="mt-2 max-w-[4.5rem] text-center font-sans text-[9px] leading-tight text-muted-foreground/65">
            lower priority, later
          </p>
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          {readyRows.map((row) => (
            <BacklogRowCard key={row.title} row={row} />
          ))}
          {roughRows.map((row) => (
            <BacklogRowCard key={row.title} row={row} />
          ))}
        </div>
      </div>
    </figure>
  );
}
