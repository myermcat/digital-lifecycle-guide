import { guideProseTight } from "@/lib/guide-typography";
import { ROUTE_TIMING_TABLE_STRINGS } from "@/lib/route-timing-table-strings";
import { UI } from "@/lib/ui-strings";

/**
 * Where the competition runs and where the contract is signed, per route.
 *
 * It is a table because the two columns only mean anything read against each
 * other: the point is that they move together, one sub-phase apart, and that is
 * invisible when the routes are described one at a time in prose.
 *
 * Below the small breakpoint it stacks into labelled cards, because a
 * three-column table at 375px is unreadable and the guide is read on phones.
 *
 * The words are in `@/lib/route-timing-table-strings`, not here: nothing in
 * src/components is source-swapped for the French build.
 */

const { columnHeadings, rows } = ROUTE_TIMING_TABLE_STRINGS;

const ROW_ORDER = [
  "buyATeam",
  "agileProcurementModel",
  "buyASolution",
  "buyAFinishedProduct",
  "buildInHouseOrReuse",
] as const;

const ROWS = ROW_ORDER.map((key) => rows[key]);

const HEADINGS = [
  columnHeadings.route,
  columnHeadings.competition,
  columnHeadings.contractSigned,
  columnHeadings.why,
];

export function RouteTimingTable() {
  return (
    <div className="mt-5">
      <table className="hidden w-full border-collapse text-left sm:table">
        <caption className="sr-only">
          {UI.aFewOfTheRoutesShowingWhereTheCompetit}
        </caption>
        <thead>
          <tr className="border-b border-border">
            {HEADINGS.map((heading) => (
              <th
                key={heading}
                scope="col"
                className="pb-2 pr-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground last:pr-0"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.route} className="border-b border-border/60 align-top last:border-0">
              <th scope="row" className="w-[11rem] py-3 pr-4 font-sans">
                <span className="block text-sm font-semibold text-foreground">
                  {row.route}
                </span>
              </th>
              <td className={`${guideProseTight} w-[7.5rem] py-3 pr-4 text-foreground/80`}>
                {row.competition}
              </td>
              <td className={`${guideProseTight} w-[8.5rem] py-3 pr-4 text-foreground/80`}>
                {row.signature}
              </td>
              <td className={`${guideProseTight} py-3 text-muted-foreground`}>
                {row.why}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="list-none space-y-3 p-0 sm:hidden">
        {ROWS.map((row) => (
          <li
            key={row.route}
            className="rounded-lg border border-border bg-card px-4 py-3"
          >
            <p className="mb-1.5 text-sm font-semibold text-foreground">
              {row.route}
            </p>
            <p className={`${guideProseTight} text-foreground/80`}>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {UI.competition}
              </span>{" "}
              {row.competition}
            </p>
            <p className={`${guideProseTight} text-foreground/80`}>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {UI.signed}
              </span>{" "}
              {row.signature}
            </p>
            <p className={`${guideProseTight} mt-1 text-muted-foreground`}>{row.why}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
