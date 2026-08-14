import { Fragment, useState } from "react";
import { ExpandableTable } from "@/components/ExpandableTable";
import { ExternalLink } from "@/components/ExternalLink";
import {
  INSTRUMENT_MATRIX,
  MATRIX_ACTIONS,
  MATRIX_FAMILIES,
  MATRIX_KINDS,
  MATRIX_SUBPHASES,
  type MatrixAction,
  type MatrixInstrument,
} from "@/lib/instrument-matrix";
import { guideProse, guideSectionTitle } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

/**
 * TRANSITORY WORKING MATERIAL, home page only.
 *
 * Every official instrument a Government of Canada digital service meets, by
 * sub-phase, with what has to be done to it, what the business owner personally
 * does, who does the work, and where it ends up. Remove once the content has been folded
 * into the sub-phase pages.
 */

const PHASE_SPANS = [
  { phase: "Create", count: 3 },
  { phase: "Live", count: 3 },
  { phase: "Sunset", count: 1 },
] as const;

const CELL_BASE =
  "align-top border-b border-border/60 px-3 py-3 text-[0.8rem] leading-snug";

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

function Legend() {
  return (
    <div className="mt-5 rounded-lg border border-border bg-muted/30 p-4">
      <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        What the tags mean
      </p>
      <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(MATRIX_ACTIONS) as MatrixAction[]).map((key) => (
          <li key={key} className="flex gap-2.5 text-[0.8rem] leading-snug">
            <span className="pt-[0.1rem]">
              <ActionChip action={key} />
            </span>
            <span className="text-muted-foreground">
              {MATRIX_ACTIONS[key].gloss}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        What kind of thing each one is
      </p>
      <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(MATRIX_KINDS) as (keyof typeof MATRIX_KINDS)[]).map((key) => (
          <li key={key} className="flex gap-2.5 text-[0.8rem] leading-snug">
            <span className="pt-[0.1rem]">
              <span className="whitespace-nowrap rounded-sm border border-border bg-muted/60 px-1.5 py-[0.05rem] text-[0.62rem] font-medium uppercase tracking-wide text-muted-foreground">
                {MATRIX_KINDS[key].label}
              </span>
            </span>
            <span className="text-muted-foreground">{MATRIX_KINDS[key].gloss}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InstrumentName({ row }: { row: MatrixInstrument }) {
  return (
    <>
      <span className="font-semibold text-foreground">{row.name}</span>
      {row.acronym ? (
        <span className="text-muted-foreground"> ({row.acronym})</span>
      ) : null}
      {" "}
      <span className="whitespace-nowrap rounded-sm border border-border bg-muted/60 px-1.5 py-[0.05rem] text-[0.62rem] font-medium uppercase tracking-wide text-muted-foreground">
        {MATRIX_KINDS[row.kind].label}
      </span>
      {row.linkKey ? (
        <>
          {" "}
          <ExternalLink
            linkKey={row.linkKey}
            className="text-[0.7rem] underline underline-offset-2 text-muted-foreground/80 hover:text-foreground"
          >
            source
          </ExternalLink>
        </>
      ) : null}
    </>
  );
}

export function InstrumentMatrix({ embedded = false }: { embedded?: boolean } = {}) {
  const [openRow, setOpenRow] = useState<string | null>(null);

  return (
    <section className={embedded ? "" : "mt-14 md:mt-16"} id="instrument-matrix">
      {embedded ? null : (
        <>
          <h2 className={guideSectionTitle}>
            Every official thing a service has to do, by sub-phase
          </h2>
          <div className={cn(guideProse, "mt-3 max-w-3xl space-y-3")}>
            <p>
              Getting a service live means passing official checkpoints:
              assessments to run, boards to attend, registers to appear in, and
              duties that carry on for as long as the service does. Which ones
              apply depends on what the service does and how much is being spent,
              so no two services take the same path.
            </p>
          </div>
        </>
      )}
      <div className={cn(guideProse, "mt-3 max-w-3xl space-y-3")}>
        <p>
          Read a row across: what it is, whether it applies to you, what you have
          to do about it, and what happens to it in each sub-phase of the
          service&apos;s life. Click a row for the full definition.
        </p>
        <p className="text-muted-foreground">
          One caution. Which sub-phase an instrument belongs to is this
          guide&apos;s own judgement, because no Government of Canada source uses
          these phase names. Where a placement follows a real deadline in the
          instrument, the row says so. Where it does not, the row says that too.
        </p>
      </div>

      <Legend />

      <ExpandableTable
        title="Every official thing a service has to do, by sub-phase"
        className="mt-6"
        maxHeight="80vh"
      >
        <table className="w-full min-w-[94rem] border-collapse text-left">
          <thead className="sticky top-0 z-30 shadow-[0_1px_0_0_var(--border),0_4px_10px_-6px_rgb(0_0_0/0.25)]">
            <tr className="bg-muted/60">
              <th
                rowSpan={2}
                className="sm:sticky sm:left-0 z-40 min-w-[11rem] sm:min-w-[15rem] bg-muted border-b border-r border-border px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Instrument
              </th>
              <th
                rowSpan={2}
                className="min-w-[7rem] border-b border-border bg-muted px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Every service?
              </th>
              <th
                rowSpan={2}
                className="min-w-[16rem] border-b border-border bg-muted px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                What brings it into scope
              </th>
              <th
                rowSpan={2}
                className="min-w-[18rem] border-b border-border bg-[color-mix(in_oklch,var(--muted),var(--primary)_8%)] px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-foreground/80"
              >
                What the business owner does
              </th>
              <th
                rowSpan={2}
                className="min-w-[14rem] border-b border-border bg-muted px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Who does the work
              </th>
              <th
                rowSpan={2}
                className="min-w-[13rem] border-b border-r border-border bg-muted px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Where it ends up
              </th>
              {PHASE_SPANS.map((span) => (
                <th
                  key={span.phase}
                  colSpan={span.count}
                  className="border-b border-l border-border bg-muted px-3 py-1.5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {span.phase}
                </th>
              ))}
            </tr>
            <tr className="bg-muted/40">
              {MATRIX_SUBPHASES.map((sub, i) => (
                <th
                  key={sub.key}
                  className={cn(
                    "min-w-[7.5rem] border-b border-border bg-muted px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground",
                    (i === 0 || i === 3 || i === 6) && "border-l",
                  )}
                >
                  {sub.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIX_FAMILIES.map((family) => {
              const rows = INSTRUMENT_MATRIX.filter((r) => r.family === family);
              if (rows.length === 0) return null;
              return (
                <FamilyGroup
                  key={family}
                  family={family}
                  rows={rows}
                  openRow={openRow}
                  setOpenRow={setOpenRow}
                />
              );
            })}
          </tbody>
        </table>
      </ExpandableTable>
    </section>
  );
}

function FamilyGroup({
  family,
  rows,
  openRow,
  setOpenRow,
}: {
  family: string;
  rows: MatrixInstrument[];
  openRow: string | null;
  setOpenRow: (v: string | null) => void;
}) {
  return (
    <>
      <tr>
        <td
          colSpan={13}
          className="sticky left-0 bg-[var(--phase-group)]/70 border-y border-border px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground/80"
        >
          {family}
        </td>
      </tr>
      {rows.map((row) => {
        const isOpen = openRow === row.name;
        return (
          <Fragment key={row.name}>
            <tr
              className="cursor-pointer hover:bg-muted/30"
              onClick={() => setOpenRow(isOpen ? null : row.name)}
            >
              <td
                className={cn(
                  CELL_BASE,
                  "sm:sticky sm:left-0 z-10 border-r bg-background",
                )}
              >
                <InstrumentName row={row} />
              </td>
              <td className={CELL_BASE}>
                {row.everyService ? (
                  <span className="[box-decoration-break:clone] [-webkit-box-decoration-break:clone] rounded-full border border-emerald-300 bg-emerald-100 px-2 py-[0.1rem] text-[0.68rem] font-semibold uppercase tracking-wide text-emerald-900 dark:border-emerald-800/70 dark:bg-emerald-950 dark:text-emerald-200">
                    Every service
                  </span>
                ) : (
                  <span className="[box-decoration-break:clone] [-webkit-box-decoration-break:clone] rounded-full border border-amber-300 bg-amber-100 px-2 py-[0.1rem] text-[0.68rem] font-semibold uppercase tracking-wide text-amber-900 dark:border-amber-800/70 dark:bg-amber-950 dark:text-amber-200">
                    Only if
                  </span>
                )}
              </td>
              <td className={cn(CELL_BASE, "text-muted-foreground")}>
                {row.scope}
              </td>
              <td className={cn(CELL_BASE, "bg-primary/5 text-foreground/90")}>
                {row.ownerDoes}
              </td>
              <td className={cn(CELL_BASE, "text-muted-foreground")}>
                {row.whoDoes}
              </td>
              <td className={cn(CELL_BASE, "border-r text-muted-foreground")}>
                {row.whereItEndsUp}
              </td>
              {MATRIX_SUBPHASES.map((sub, i) => {
                const cell = row.cells[sub.key];
                return (
                  <td
                    key={sub.key}
                    className={cn(
                      CELL_BASE,
                      (i === 0 || i === 3 || i === 6) && "border-l",
                    )}
                  >
                    {cell ? (
                      <span className="flex flex-wrap gap-1">
                        {cell.tags.map((t) => (
                          <ActionChip key={t} action={t} />
                        ))}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/30">·</span>
                    )}
                  </td>
                );
              })}
            </tr>
            {isOpen ? (
              <tr className="bg-muted/25">
                <td
                  colSpan={13}
                  className="border-b border-border px-4 py-4 text-[0.82rem] leading-relaxed"
                >
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                    <div>
                      <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                        What it is
                      </p>
                      <p>{row.whatItIs}</p>
                      <p className="mt-3 mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                        Where it ends up
                      </p>
                      <p className="text-muted-foreground">{row.whereItEndsUp}</p>
                      {row.caveat ? (
                        <p className="mt-3 border-l-2 border-destructive/50 pl-3 text-muted-foreground">
                          {row.caveat}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                        Sub-phase by sub-phase
                      </p>
                      <ul className="space-y-2">
                        {MATRIX_SUBPHASES.filter((s) => row.cells[s.key]).map(
                          (s) => (
                            <li key={s.key} className="flex flex-wrap gap-2">
                              <span className="min-w-[6.5rem] font-semibold">
                                {s.label}
                              </span>
                              <span className="flex flex-wrap gap-1">
                                {row.cells[s.key]!.tags.map((t) => (
                                  <ActionChip key={t} action={t} />
                                ))}
                              </span>
                              <span className="w-full text-muted-foreground sm:w-auto sm:flex-1">
                                {row.cells[s.key]!.note}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            ) : null}
          </Fragment>
        );
      })}
    </>
  );
}
