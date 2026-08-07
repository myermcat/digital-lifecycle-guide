import { ExpandableTable } from "@/components/ExpandableTable";
import { ExternalLink } from "@/components/ExternalLink";
import {
  REUSABLE_CATEGORIES,
  REUSABLE_PIECES,
} from "@/lib/reusable-pieces";
import { guideProse, guideSectionTitle } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

/**
 * TRANSITORY WORKING MATERIAL, home page only, under the instrument table.
 *
 * The instrument table holds what a service must deal with. This holds what it may
 * reuse. Keeping them as two tables is the point: merging them would make optional
 * things look mandatory, which is the more expensive mistake of the two.
 */

const CELL = "align-top border-b border-border/60 px-3 py-3 text-[0.8rem] leading-snug";

export function ReusablePieces() {
  return (
    <section className="mt-12 md:mt-14" id="reusable-pieces">
      <h2 className={guideSectionTitle}>Reuse before you buy or build</h2>
      <div className={cn(guideProse, "mt-3 max-w-3xl space-y-3")}>
        <p>
          The Government of Canada asks teams to look for something to reuse before
          buying, and to buy before building their own. These are the pieces already
          built and maintained by another part of government, so a team can configure
          rather than make. The table above is what a service has to deal with. This
          is what it can avoid having to make.
        </p>
        <p className="text-muted-foreground">
          Choosing to build your own instead breaks no rule. The enterprise
          architecture framework does ask teams to look at reuse before buying or
          building, so an architecture review board will ask what was considered and
          why it was not used. Having an answer is easier than having a reason.
        </p>
      </div>

      <ExpandableTable
        title="Reuse before you buy or build"
        className="mt-6"
        maxHeight="75vh"
      >
        <table className="w-full min-w-[62rem] border-collapse text-left">
          <thead className="sticky top-0 z-30 shadow-[0_1px_0_0_var(--border),0_4px_10px_-6px_rgb(0_0_0/0.25)]">
            <tr className="bg-muted/60">
              {[
                ["Piece", "min-w-[12rem]"],
                ["What it is", "min-w-[18rem]"],
                ["Instead of building", "min-w-[14rem]"],
                ["Who runs it", "min-w-[11rem]"],
                ["How to get it", "min-w-[12rem]"],
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
                    colSpan={6}
                    className="border-y border-border bg-[var(--phase-group)]/70 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground/80"
                  >
                    {category}
                  </td>
                </tr>,
                ...rows.map((p) => (
                  <tr key={p.name} className="hover:bg-muted/20">
                    <td className={CELL}>
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
                      {p.caveat ? (
                        <p className="mt-1.5 border-l-2 border-primary/40 pl-2 text-[0.75rem] leading-snug text-muted-foreground">
                          {p.caveat}
                        </p>
                      ) : null}
                    </td>
                    <td className={CELL}>{p.whatItIs}</td>
                    <td className={cn(CELL, "text-muted-foreground")}>
                      {p.insteadOfBuilding}
                    </td>
                    <td className={cn(CELL, "text-muted-foreground")}>{p.runBy}</td>
                    <td className={cn(CELL, "text-muted-foreground")}>{p.howToGetIt}</td>
                    <td className={cn(CELL, "text-muted-foreground")}>{p.lookAtItIn}</td>
                  </tr>
                )),
              ];
            })}
          </tbody>
        </table>
      </ExpandableTable>
    </section>
  );
}
