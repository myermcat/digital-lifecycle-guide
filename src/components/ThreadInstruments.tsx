import { ExternalLink } from "@/components/ExternalLink";
import {
  INSTRUMENT_MATRIX,
  MATRIX_ACTIONS,
  MATRIX_KINDS,
  MATRIX_SUBPHASES,
  type MatrixAction,
} from "@/lib/instrument-matrix";
import { guideProse, guideSectionTitle } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";
import { UI } from "@/lib/ui-strings";

/** The opening sentence of the registry definition, so the block never assumes the name is known. */
function firstSentence(text: string) {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

/**
 * The official instruments this thread's subject owns, rendered from the same
 * registry the home-page table and the sub-phase pages read. The mapping lives
 * in the registry's `threads` field, which is never shown in the table itself.
 *
 * A thread runs across the whole lifecycle, so each instrument shows the
 * sub-phases it touches rather than a single stage.
 */

function ActionChip({ action }: { action: MatrixAction }) {
  const meta = MATRIX_ACTIONS[action];
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2 py-[0.1rem] text-[0.68rem] font-semibold uppercase tracking-wide whitespace-nowrap",
        meta.className,
      )}
    >
      {meta.label}
    </span>
  );
}

export function ThreadInstruments({
  thread,
  threadTitle,
  className,
}: {
  thread: string;
  threadTitle: string;
  className?: string;
}) {
  const rows = INSTRUMENT_MATRIX.filter((row) => row.threads?.includes(thread));
  if (rows.length === 0) return null;

  return (
    <section
      id="official-instruments"
      className={cn("mt-10 md:mt-12 scroll-mt-24", className)}
    >
      <h2 className={`${guideSectionTitle} mb-3`}>
        {UI.theOfficialInstrumentsBehind} {threadTitle.toLowerCase()}
      </h2>
      <div className={cn(guideProse, "mb-5 max-w-3xl space-y-2")}>
        <p>
          {UI.everythingOfficialThisSubjectBringsWit}
        </p>
      </div>

      <ul className="list-none space-y-4 border-l border-border pl-4">
        {rows.map((row) => {
          const stages = MATRIX_SUBPHASES.filter((s) => row.cells[s.key]);
          return (
            <li key={row.name} className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-semibold text-foreground">
                  {row.name}
                  {row.acronym ? (
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      ({row.acronym})
                    </span>
                  ) : null}
                </span>
                <span
                  className={cn(
                    "rounded-full border px-2 py-[0.1rem] text-[0.68rem] font-semibold uppercase tracking-wide",
                    row.everyService
                      ? "border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-800/70 dark:bg-emerald-950 dark:text-emerald-200"
                      : "border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-800/70 dark:bg-amber-950 dark:text-amber-200",
                  )}
                >
                  {row.everyService ? "Every service" : "Only if"}
                </span>
                {row.linkKey ? (
                  <ExternalLink
                    linkKey={row.linkKey}
                    className="text-[0.7rem] underline underline-offset-2 text-muted-foreground/80 hover:text-foreground"
                  >
                    source
                  </ExternalLink>
                ) : null}
                <span className="rounded-sm border border-border bg-muted/60 px-1.5 py-[0.05rem] text-[0.62rem] font-medium uppercase tracking-wide text-muted-foreground">
                  {MATRIX_KINDS[row.kind].label}
                </span>
              </div>
              <p className="mt-1 text-[0.85rem] leading-snug text-muted-foreground">
                {row.whatItIs}
              </p>
              <ul className="mt-2 list-none space-y-1">
                {stages.map((s) => (
                  <li
                    key={s.key}
                    className="flex flex-wrap items-baseline gap-x-2 text-[0.8rem] leading-snug"
                  >
                    <span className="min-w-[6.5rem] font-medium text-foreground/80">
                      {s.label}
                    </span>
                    {row.cells[s.key]!.tags.map((t) => (
                      <ActionChip key={t} action={t} />
                    ))}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
