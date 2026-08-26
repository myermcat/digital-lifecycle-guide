import { type ReactNode } from "react";
import { ExpandableTable } from "@/components/ExpandableTable";
import { ExternalLink } from "@/components/ExternalLink";
import { REUSABLE_CATEGORIES, REUSABLE_PIECES } from "@/lib/reusable-pieces";
import { guideProse, guideSectionTitle } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";
import { UI } from "@/lib/ui-strings";

/** The phase and sub-phase names, bolded wherever they appear in "Worth a look in". */
const PHASE_WORDS = [
  "Discovery",
  "Alpha",
  "Beta",
  "Stabilization",
  "Growth",
  "Maturity",
  "Create",
  "Live",
  "Sunset",
];

/** Picks the given phrases out in bold, so the column can be skimmed. */
function boldPhrases(text: string, phrases: readonly string[] = []): ReactNode {
  const hits: { start: number; end: number; phrase: string }[] = [];
  for (const phrase of phrases) {
    let from = 0;
    for (;;) {
      const at = text.indexOf(phrase, from);
      if (at === -1) break;
      hits.push({ start: at, end: at + phrase.length, phrase });
      from = at + phrase.length;
    }
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

/**
 * TRANSITORY WORKING MATERIAL, home page only, under the instrument table.
 *
 * The instrument table holds what a service must deal with. This holds what it may
 * reuse. Keeping them as two tables is the point: merging them would make optional
 * things look mandatory, which is the more expensive mistake of the two.
 */

const CELL = "align-top border-b border-border/60 px-3 py-3 text-[0.8rem] leading-snug";

export function ReusablePieces({ embedded = false }: { embedded?: boolean } = {}) {
  return (
    <section className={embedded ? "" : "mt-12 md:mt-14"} id="reusable-pieces">
      {embedded ? null : <h2 className={guideSectionTitle}>{UI.reuseBeforeYouBuyOrBuild}</h2>}
      <div className={cn(guideProse, "mt-3 max-w-3xl space-y-3")}>
        <p>
          {UI.lookForSomethingToReuseBeforeMakingYou}
        </p>
        <p className="text-muted-foreground">
          {UI.choosingToMakeYourOwnInsteadBreaksNoRu}
        </p>
      </div>

      <ExpandableTable title={UI.reuseBeforeYouBuyOrBuild} className="mt-6" maxHeight="75vh">
        <table className="w-full min-w-[52rem] border-collapse text-left">
          <thead className="sticky top-0 z-30 shadow-[0_1px_0_0_var(--border),0_4px_10px_-6px_rgb(0_0_0/0.25)]">
            <tr className="bg-muted/60">
              {[
                ["Piece", "min-w-[13rem]"],
                ["What you would otherwise build", "min-w-[15rem]"],
                ["Who runs it, and how to get it", "min-w-[14rem]"],
                ["Worth a look in", "min-w-[12rem]"],
              ].map(([label, width]) => (
                <th
                  key={label}
                  className={cn(
                    "border-b border-border bg-muted px-3 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground",
                    width,
                  )}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REUSABLE_CATEGORIES.flatMap((category) => {
              const rows = REUSABLE_PIECES.filter((p) => p.category === category);
              if (rows.length === 0) return [];
              return [
                <tr key={`h-${category}`}>
                  <td
                    colSpan={4}
                    className="border-y border-border bg-[var(--phase-group)]/70 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground/80"
                  >
                    {category}
                  </td>
                </tr>,
                ...rows.flatMap((p) => [
                  <tr key={p.name} className="hover:bg-muted/20">
                    <td className={cn(CELL, "border-b-0")}>
                      <span className="font-semibold text-foreground">{p.name}</span>
                      {p.linkKey ? (
                        <>
                          {" "}
                          <ExternalLink
                            linkKey={p.linkKey}
                            className="text-[0.7rem] underline underline-offset-2 text-muted-foreground/80 hover:text-foreground"
                          >
                            site
                          </ExternalLink>
                        </>
                      ) : null}
                    </td>
                    <td className={cn(CELL, "border-b-0 text-muted-foreground")}>
                      {boldPhrases(p.insteadOfBuilding, p.insteadBold)}
                    </td>
                    <td className={cn(CELL, "border-b-0 text-muted-foreground")}>
                      <span className="text-foreground/80">{p.runBy}</span> {p.howToGetIt}
                    </td>
                    <td className={cn(CELL, "border-b-0 text-muted-foreground")}>
                      {boldPhrases(p.lookAtItIn, PHASE_WORDS)}
                    </td>
                  </tr>,
                  /* The definition on its own row, the same shape the topic tables use. */
                  <tr key={`${p.name}-what`}>
                    <td
                      colSpan={4}
                      className="border-b border-border bg-muted/20 px-3 pb-2.5 pt-1 text-[0.78rem] leading-snug text-muted-foreground"
                    >
                      <span className="mr-2 align-[0.08rem] text-[0.66rem] font-semibold uppercase tracking-wide text-foreground/55">
                        {UI.whatItIs}
                      </span>
                      {p.whatItIs}
                      {p.caveat ? (
                        <span className="mt-1.5 block border-l-2 border-primary/40 pl-2.5">
                          {p.caveat}
                        </span>
                      ) : null}
                    </td>
                  </tr>,
                ]),
              ];
            })}
          </tbody>
        </table>
      </ExpandableTable>
    </section>
  );
}
