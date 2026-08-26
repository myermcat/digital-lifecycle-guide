import { guideProseTight } from "@/lib/guide-typography";
import { REQUIREMENT_TYPES_TABLE_STRINGS } from "@/lib/requirement-types-table-strings";
import { UI } from "@/lib/ui-strings";

/**
 * The three kinds of requirement, and how fast each one goes out of date.
 *
 * It is a table because the third column only means anything read against the
 * other two: the point is that the kinds age at different speeds, and that the
 * ones which age slowly are the ones a contract can safely hold a supplier to.
 * As three paragraphs that comparison has to be held in the reader's head.
 *
 * Below the small breakpoint it stacks into three labelled cards, because a
 * three-column table at 375px is unreadable and the guide is read on phones.
 *
 * Every word rendered here comes from `@/lib/requirement-types-table-strings`,
 * so the French build can swap it.
 */

const S = REQUIREMENT_TYPES_TABLE_STRINGS;

const HEADINGS = [
  S.columnHeadings.kind,
  S.columnHeadings.whatItSays,
  S.columnHeadings.howItAges,
];

const ROWS = [
  { ...S.rows.business, tone: "stable" as const },
  { ...S.rows.functional, tone: "volatile" as const },
  { ...S.rows.nonFunctional, tone: "stable" as const },
];

const toneChip: Record<"stable" | "volatile", string> = {
  stable:
    "border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-800/70 dark:bg-emerald-950 dark:text-emerald-200",
  volatile:
    "border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-800/70 dark:bg-amber-950 dark:text-amber-200",
};

const toneLabel: Record<"stable" | "volatile", string> = {
  stable: S.toneLabels.stable,
  volatile: S.toneLabels.volatile,
};

export function RequirementTypesTable() {
  return (
    <div className="mt-5">
      <table className="hidden w-full border-collapse text-left sm:table">
        <caption className="sr-only">
          {UI.theThreeKindsOfRequirementWhatEachOneS}
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
            <tr key={row.kind} className="border-b border-border/60 align-top last:border-0">
              <th scope="row" className="w-[8.5rem] py-3 pr-4 font-sans">
                <span className="block text-sm font-semibold text-foreground">
                  {row.kind}
                </span>
                <span
                  className={`mt-1.5 inline-block rounded-full border px-1.5 py-[0.05rem] text-[0.6rem] font-semibold uppercase tracking-wide ${toneChip[row.tone]}`}
                >
                  {toneLabel[row.tone]}
                </span>
              </th>
              <td className={`${guideProseTight} w-[38%] py-3 pr-4 text-foreground/80`}>
                {row.says}
                <span className="mt-1.5 block text-[0.78rem] italic leading-snug text-muted-foreground/70">
                  {row.example}
                </span>
              </td>
              <td className={`${guideProseTight} py-3 text-foreground/80`}>
                {row.ages}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="list-none space-y-3 p-0 sm:hidden">
        {ROWS.map((row) => (
          <li
            key={row.kind}
            className="rounded-lg border border-border bg-card px-4 py-3"
          >
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {row.kind}
              </span>
              <span
                className={`rounded-full border px-1.5 py-[0.05rem] text-[0.6rem] font-semibold uppercase tracking-wide ${toneChip[row.tone]}`}
              >
                {toneLabel[row.tone]}
              </span>
            </div>
            <p className={`${guideProseTight} text-foreground/80`}>{row.says}</p>
            <p className="mt-1 text-[0.78rem] italic leading-snug text-muted-foreground/70">
              {row.example}
            </p>
            <p className={`${guideProseTight} mt-1.5 text-muted-foreground`}>
              <span className="font-semibold uppercase tracking-[0.1em] text-[0.6rem]">
                {UI.howItAges}
              </span>{" "}
              {row.ages}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
