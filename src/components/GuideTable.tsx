import type { ReactNode } from "react";
import { guideProseTight } from "@/lib/guide-typography";

export type GuideTableRow = {
  /** First cell. Doubles as the row key and as the heading on narrow screens. */
  term: string;
  /** Optional abbreviation shown beside the term. */
  short?: string;
  /** One cell per remaining column, in column order. */
  cells: readonly ReactNode[];
};

/**
 * A plain reference table: a real table on wide screens, a stack of labelled
 * cards on narrow ones, because a three-column table is unreadable on a phone.
 */
export function GuideTable({
  columns,
  rows,
  className = "",
}: {
  /** Column headings, including the heading for the term column. */
  columns: readonly string[];
  rows: readonly GuideTableRow[];
  className?: string;
}) {
  const [termColumn, ...valueColumns] = columns;

  return (
    <div className={className}>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className={`${guideProseTight} py-2 pr-4 font-semibold text-foreground/90`}
              >
                {termColumn}
              </th>
              {valueColumns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  className={`${guideProseTight} py-2 font-semibold text-foreground/90 ${
                    index < valueColumns.length - 1 ? "pr-4" : ""
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.term} className="border-b border-border/60 last:border-0">
                <th
                  scope="row"
                  className={`${guideProseTight} w-[13rem] py-2.5 pr-4 align-top font-medium text-foreground/85`}
                >
                  {row.term}
                  {row.short ? (
                    <span className="ml-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                      {row.short}
                    </span>
                  ) : null}
                </th>
                {row.cells.map((cell, index) => (
                  <td
                    key={`${row.term}-${index}`}
                    className={`${guideProseTight} py-2.5 align-top text-foreground/80 ${
                      index < row.cells.length - 1 ? "pr-4" : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className={`md:hidden ${guideProseTight} space-y-2.5 list-none pl-0`}>
        {rows.map((row) => (
          <li
            key={row.term}
            className="rounded-md border border-border/70 bg-background/50 px-3.5 py-3"
          >
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-semibold text-foreground">{row.term}</span>
              {row.short ? (
                <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                  {row.short}
                </span>
              ) : null}
            </p>
            {row.cells.map((cell, index) => (
              <p key={`${row.term}-m-${index}`} className="mt-1 text-foreground/80">
                {valueColumns.length > 1 ? (
                  <span className="font-medium text-foreground/70">
                    {valueColumns[index]}:{" "}
                  </span>
                ) : null}
                {cell}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
