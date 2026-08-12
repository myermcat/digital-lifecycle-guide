import { CircleDollarSign } from "lucide-react";
import { ExternalLink } from "@/components/ExternalLink";
import {
  INSTRUMENT_MATRIX,
  MATRIX_ACTIONS,
  MATRIX_KINDS,
  MATRIX_SUBPHASES,
  type MatrixAction,
  type MatrixSubPhase,
} from "@/lib/instrument-matrix";
import { guideProse, guideSectionTitle } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

/** The opening sentence of the registry definition, so the block never assumes the name is known. */
function firstSentence(text: string) {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
}

/**
 * The official instruments active in one sub-phase, rendered from the same
 * registry the home-page table reads. Because both surfaces read
 * `INSTRUMENT_MATRIX`, a sub-phase page cannot drift from the table: adding a
 * cell to the registry makes it appear here, and removing one makes it vanish.
 *
 * Prose about an individual instrument still belongs in the page's own copy.
 * This block is the register, not the explanation.
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

/**
 * Does this instrument turn on because of how much the project costs?
 *
 * A reader can tell straight away whether their service automates a decision or
 * touches personal information. Whether it crosses a dollar threshold depends on
 * a number and a departmental capacity class they may not have yet, so those
 * entries go last and carry a coin so the eye can skip them.
 */
function moneyGated(row: { scope: string }) {
  return /\$[\d,.]+\s?(million|M\b)|capacity class|approved capacity/i.test(row.scope)
    ? 1
    : 0;
}

export function SubphaseInstruments({
  subPhase,
  className,
}: {
  subPhase: MatrixSubPhase;
  className?: string;
}) {
  const label =
    MATRIX_SUBPHASES.find((s) => s.key === subPhase)?.label ?? subPhase;

  const rows = INSTRUMENT_MATRIX.filter((row) => row.cells[subPhase]).map(
    (row) => ({ row, cell: row.cells[subPhase]! }),
  );

  if (rows.length === 0) return null;

  const universal = rows.filter(({ row }) => row.everyService);
  const conditional = rows
    .filter(({ row }) => !row.everyService)
    .sort((a, b) => moneyGated(a.row) - moneyGated(b.row));

  // Only the tags that actually appear in this sub-phase, so the legend never
  // explains a tag the reader cannot see on the page.
  const usedActions = (Object.keys(MATRIX_ACTIONS) as MatrixAction[]).filter(
    (action) => rows.some(({ cell }) => cell.tags.includes(action)),
  );

  return (
    <section
      id="official-instruments"
      className={cn("mt-10 md:mt-12 scroll-mt-24", className)}
    >
      <h2 className={`${guideSectionTitle} mb-3`}>
        The official instruments in {label}
      </h2>
      <div className={cn(guideProse, "mb-5 max-w-3xl space-y-2")}>
        <p>
          Everything official that has something happening to it during {label},
          and what that something is. The tag says what stage the instrument
          reaches here, not that it is finished.
        </p>
        <p className="text-muted-foreground">
          Placing an instrument in a sub-phase is this guide&apos;s own editorial
          choice, anchored where possible on a real deadline in the instrument
          itself. The full detail, including who does the work and what the
          business owner personally does, is in the full instruments table.
        </p>
      </div>

      <dl className="mb-5 max-w-3xl space-y-2 rounded-md border border-border bg-muted/30 p-4">
        <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          What the tags mean
        </p>
        {usedActions.map((action) => (
          <div key={action} className="flex flex-wrap items-baseline gap-x-2">
            <dt>
              <ActionChip action={action} />
            </dt>
            <dd className="text-[0.85rem] leading-snug text-foreground/75">
              {MATRIX_ACTIONS[action].gloss}
            </dd>
          </div>
        ))}
      </dl>

      {[
        { title: "Every service", items: universal },
        { title: "Only if it applies", items: conditional },
      ].map((group) =>
        group.items.length === 0 ? null : (
          <div key={group.title} className="mb-6 last:mb-0">
            <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {group.title}
            </p>
            <ul className="list-none space-y-3 border-l border-border pl-4">
              {group.items.map(({ row, cell }) => (
                <li key={row.name} className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-semibold text-foreground">
                      {row.name}
                      {row.acronym ? (
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          ({row.acronym})
                        </span>
                      ) : null}
                    </span>
                    <span className="rounded-sm border border-border bg-muted/60 px-1.5 py-[0.05rem] text-[0.62rem] font-medium uppercase tracking-wide text-muted-foreground">
                      {MATRIX_KINDS[row.kind].label}
                    </span>
                    {cell.tags.map((tag) => (
                      <ActionChip key={tag} action={tag} />
                    ))}
                    {row.linkKey ? (
                      <ExternalLink
                        linkKey={row.linkKey}
                        className="text-[0.7rem] underline underline-offset-2 text-muted-foreground/80 hover:text-foreground"
                      >
                        source
                      </ExternalLink>
                    ) : null}
                  </div>
                  <p className="mt-1 text-[0.85rem] leading-snug text-foreground/75">
                    {firstSentence(row.whatItIs)}
                  </p>
                  <p className="mt-1 text-[0.85rem] leading-snug text-muted-foreground">
                    {cell.note}
                  </p>
                  {!row.everyService ? (
                    <p className="mt-1.5 text-[0.75rem] leading-snug text-muted-foreground/75">
                      <span className="font-semibold uppercase tracking-[0.08em] text-[0.68rem] text-primary/90">
                        {moneyGated(row) ? (
                          <CircleDollarSign
                            className="mr-1 inline-block h-3.5 w-3.5 align-[-0.15em]"
                            aria-hidden
                          />
                        ) : null}
                        {moneyGated(row) ? "Applies above" : "Applies when"}
                      </span>{" "}
                      {row.scope}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ),
      )}
    </section>
  );
}
