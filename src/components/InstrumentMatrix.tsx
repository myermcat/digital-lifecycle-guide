import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { checkpointMapSectionNumber } from "@/lib/checkpoint-map-content";
import { ExpandableTable } from "@/components/ExpandableTable";
import { ExternalLink } from "@/components/ExternalLink";
import {
  INSTRUMENT_MATRIX,
  MATRIX_ACTIONS,
  MATRIX_FAMILY_SECTIONS,
  MATRIX_KINDS,
  MATRIX_SUBPHASES,
  type MatrixAction,
  type MatrixInstrument,
} from "@/lib/instrument-matrix";
import { guideProse, guideSectionTitle, guideSubsectionTitle } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";
import { UI } from "@/lib/ui-strings";

/**
 * TRANSITORY WORKING MATERIAL, home page only.
 *
 * Every official instrument a Government of Canada digital service meets, by
 * sub-phase, with what has to be done to it, what the business owner personally
 * does, who does the work, and where it ends up. Remove once the content has been folded
 * into the sub-phase pages.
 */

const CELL_BASE = "align-top border-b border-border px-3 py-2.5 text-[0.82rem] leading-snug";

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
        {UI.whatTheTagsMean}
      </p>
      <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(MATRIX_ACTIONS) as MatrixAction[]).map((key) => (
          <li key={key} className="flex gap-2.5 text-[0.8rem] leading-snug">
            <span className="pt-[0.1rem]">
              <ActionChip action={key} />
            </span>
            <span className="text-muted-foreground">{MATRIX_ACTIONS[key].gloss}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {UI.theOneTagThatChangesWhetherARowApplies}
      </p>
      <ul className="grid gap-2.5">
        <li className="flex gap-2.5 text-[0.8rem] leading-snug">
          <span className="pt-[0.1rem]">
            <OnlyIfChip />
          </span>
          <span className="text-muted-foreground">
            {UI.thisInstrumentDoesNotApplyToEveryServi}
          </span>
        </li>
      </ul>
      <p className="mt-4 mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {UI.whatKindOfThingEachOneIs}
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

/**
 * The scope tag, and the brightest mark in any table.
 *
 * It used to be the same pale amber as the Check action tag, which made the one
 * tag that changes whether a row applies to you look like one of seven action
 * tags. Solid fill and white text, so it reads as a different kind of thing.
 */
function OnlyIfChip() {
  return (
    <span className="whitespace-nowrap rounded-full border border-amber-700 bg-amber-600 px-2 py-[0.1rem] text-[0.62rem] font-bold uppercase tracking-wide text-white shadow-sm dark:border-amber-500 dark:bg-amber-600">
      {UI.onlyIf}
    </span>
  );
}

function InstrumentName({ row }: { row: MatrixInstrument }) {
  return (
    <>
      <span className="font-semibold text-foreground">{row.name}</span>
      {row.acronym ? <span className="text-muted-foreground"> ({row.acronym})</span> : null}
      {row.everyService ? null : (
        <>
          {" "}
          <OnlyIfChip />
        </>
      )}{" "}
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
      {row.moreLinks?.map((linkKey) => (
        <span key={linkKey}>
          {" "}
          <ExternalLink
            linkKey={linkKey}
            className="text-[0.7rem] underline underline-offset-2 text-muted-foreground/80 hover:text-foreground"
          >
            also
          </ExternalLink>
        </span>
      ))}
    </>
  );
}

export function InstrumentMatrix({ embedded = false }: { embedded?: boolean } = {}) {
  return (
    <section className={embedded ? "" : "mt-14 md:mt-16"} id="instrument-matrix">
      {embedded ? null : (
        <>
          <h2 className={guideSectionTitle}>
            {UI.everyOfficialThingAServiceHasToDoBySub}
          </h2>
          <div className={cn(guideProse, "mt-3 max-w-3xl space-y-3")}>
            <p>
              {UI.gettingAServiceLiveMeansPassingOfficia}
            </p>
          </div>
        </>
      )}
      <div className={cn(guideProse, "mt-3 max-w-3xl space-y-3")}>
        <p>
          {UI.oneTablePerTopicBelowAndEveryInstrumen}
        </p>
        <p className="text-muted-foreground">
          {UI.oneCautionWhichSubPhaseAnInstrumentBel}
        </p>
      </div>

      <Legend />

      {MATRIX_FAMILY_SECTIONS.map((section) => {
        const rows = INSTRUMENT_MATRIX.filter((r) => r.family === section.family);
        if (rows.length === 0) return null;
        return (
          <section key={section.family} id={section.id} className="mt-10 scroll-mt-24 md:mt-12">
            <h3 className={cn(guideSubsectionTitle, "flex items-center gap-2.5 text-foreground")}>
              <section.icon
                className="h-[1.15em] w-[1.15em] shrink-0 text-primary"
                strokeWidth={1.75}
                aria-hidden
              />
              <span>
                <span className="mr-2 font-normal text-muted-foreground/70 tabular-nums">
                  {checkpointMapSectionNumber(section.id)}
                </span>
                {section.family}
              </span>
            </h3>
            <p className={cn(guideProse, "mt-2 mb-1 max-w-[80ch]")}>
              {section.introLink
                ? (() => {
                    const at = section.intro.indexOf(section.introLink.phrase);
                    if (at === -1) return section.intro;
                    return (
                      <>
                        {section.intro.slice(0, at)}
                        <Link
                          to={section.introLink.to}
                          className="underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
                        >
                          {section.introLink.phrase}
                        </Link>
                        {section.intro.slice(at + section.introLink.phrase.length)}
                      </>
                    );
                  })()
                : section.intro}
            </p>
            <TopicTable family={section.family} rows={rows} />
          </section>
        );
      })}
    </section>
  );
}

/** One topic's instruments. Same four columns in every table, so they read as one. */
function TopicTable({ family, rows }: { family: string; rows: MatrixInstrument[] }) {
  return (
    <ExpandableTable title={family} className="mt-4" maxHeight="70vh">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <thead className="sticky top-0 z-30 shadow-[0_1px_0_0_var(--border),0_4px_10px_-6px_rgb(0_0_0/0.25)]">
          <tr className="bg-muted/60">
            <th className="sm:sticky sm:left-0 z-40 min-w-[13rem] sm:min-w-[16rem] bg-muted border-b border-r border-border px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
              {UI.instrument}
            </th>
            <th className="min-w-[15rem] border-b border-border bg-muted px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
              {UI.whatBringsItIntoScope}
            </th>
            <th className="min-w-[17rem] border-b border-border bg-[color-mix(in_oklch,var(--muted),var(--primary)_8%)] px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-foreground/80">
              {UI.whatTheBusinessOwnerDoes}
            </th>
            <th className="min-w-[13rem] border-b border-border bg-muted px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
              {UI.whoDoesTheWork}
            </th>
          </tr>
        </thead>
        <tbody>
          <InstrumentRows rows={rows} />
        </tbody>
      </table>
    </ExpandableTable>
  );
}

/**
 * Picks the given phrases out in bold, so a column can be skimmed.
 *
 * Every match is found first and then the earliest non-overlapping ones are
 * kept, so the phrases do not have to be listed in the order they appear. An
 * earlier version walked the string once per phrase and silently dropped any
 * phrase that came before the one already matched.
 */
function boldPhrases(text: string, phrases: readonly string[] = []): ReactNode {
  const hits: { start: number; end: number; phrase: string }[] = [];
  for (const phrase of phrases) {
    const at = text.indexOf(phrase);
    if (at !== -1) hits.push({ start: at, end: at + phrase.length, phrase });
  }
  if (hits.length === 0) return text;
  hits.sort((a, b) => a.start - b.start || b.end - a.end);

  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const hit of hits) {
    if (hit.start < cursor) continue;
    if (hit.start > cursor) parts.push(text.slice(cursor, hit.start));
    parts.push(
      <strong key={`${hit.start}-${hit.phrase}`} className="font-semibold text-foreground">
        {hit.phrase}
      </strong>,
    );
    cursor = hit.end;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

/** When in a service's life it comes up, on the definition row rather than in a column. */
function WhenItComesUp({ row }: { row: MatrixInstrument }) {
  const active = MATRIX_SUBPHASES.filter((s) => row.cells[s.key]);
  if (active.length === 0) return null;
  return (
    <span className="mt-1.5 block">
      <span className="mr-2 align-[0.08rem] text-[0.66rem] font-semibold uppercase tracking-wide text-foreground/55">
        {UI.whenItComesUp}
      </span>
      {active.map((s, index) => (
        <span key={s.key}>
          {index > 0 ? <span className="text-muted-foreground/50"> · </span> : null}
          <span className="text-foreground/70">{s.label}</span>{" "}
          <span className="font-semibold text-primary">
            {row.cells[s.key]!.tags.map((t) => MATRIX_ACTIONS[t].label).join(", ")}
          </span>
        </span>
      ))}
    </span>
  );
}

/** The topic heading above each table replaced the in-table family header row. */
function InstrumentRows({ rows }: { rows: MatrixInstrument[] }) {
  return (
    <>
      {rows.map((row) => (
        <Fragment key={row.name}>
          <tr className="hover:bg-muted/30">
            <td
              className={cn(
                CELL_BASE,
                "sm:sticky sm:left-0 z-10 border-r border-b-0 bg-background",
              )}
            >
              <InstrumentName row={row} />
            </td>
            <td className={cn(CELL_BASE, "border-b-0 text-muted-foreground")}>{row.scope}</td>
            <td className={cn(CELL_BASE, "border-b-0 bg-primary/5 text-foreground/90")}>
              {boldPhrases(row.ownerDoes, row.ownerBold)}
            </td>
            <td className={cn(CELL_BASE, "border-b-0 text-muted-foreground")}>
              {boldPhrases(row.whoDoes, row.whoBold)}
            </td>
          </tr>
          {/* The definition, on its own row under the one it belongs to. */}
          <tr>
            <td
              colSpan={4}
              className="border-b border-border bg-muted/20 px-3.5 pb-2.5 pt-1 text-[0.8rem] leading-snug text-muted-foreground"
            >
              <span className="mr-2 align-[0.08rem] text-[0.66rem] font-semibold uppercase tracking-wide text-foreground/55">
                {UI.whatItIs}
              </span>
              {row.whatItIs}
              <WhenItComesUp row={row} />
              {row.caveat ? (
                <span className="mt-1.5 block border-l-2 border-destructive/50 pl-2.5">
                  {row.caveat}
                </span>
              ) : null}
            </td>
          </tr>
        </Fragment>
      ))}
    </>
  );
}
