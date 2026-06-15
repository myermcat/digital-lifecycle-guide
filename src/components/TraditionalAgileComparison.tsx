import { useId, useState } from "react";
import type { ComparisonRow } from "@/lib/procurement-landing";
import {
  guideBlockTitle,
  guideCalloutLabel,
  guideProseTight,
} from "@/lib/guide-typography";

export function TraditionalAgileComparison({
  id = "traditional-vs-agile",
  rows,
  caption,
}: {
  id?: string;
  rows: ComparisonRow[];
  caption: string;
}) {
  const [view, setView] = useState<"traditional" | "agile">("agile");
  const groupId = useId();

  return (
    <section id={id} className="mt-8 scroll-mt-24 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-6 py-6 md:px-8 md:py-7 space-y-5">
        <div>
          <p className={guideCalloutLabel}>Comparison</p>
          <h3 className={`${guideBlockTitle} mt-1.5`}>Traditional and agile</h3>
        </div>

        <div
          role="radiogroup"
          aria-label="Traditional and agile comparison"
          className="inline-flex rounded-full border border-border bg-background p-1"
        >
          {(
            [
              { key: "traditional" as const, label: "Traditional" },
              { key: "agile" as const, label: "Agile" },
            ]
          ).map((opt) => {
            const selected = view === opt.key;
            return (
              <button
                key={opt.key}
                role="radio"
                aria-checked={selected}
                aria-controls={`${groupId}-panel`}
                onClick={() => setView(opt.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div
          id={`${groupId}-panel`}
          role="region"
          aria-live="polite"
          className="hidden md:block overflow-x-auto"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className={`${guideProseTight} py-2 pr-4 font-semibold text-foreground/90`}>
                  Topic
                </th>
                <th className={`${guideProseTight} py-2 pr-4 font-semibold text-foreground/90`}>
                  Traditional
                </th>
                <th className={`${guideProseTight} py-2 font-semibold text-foreground/90`}>
                  Agile
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.topic} className="border-b border-border/60 last:border-0">
                  <th
                    scope="row"
                    className={`${guideProseTight} py-2.5 pr-4 font-medium text-foreground/85 align-top`}
                  >
                    {row.topic}
                  </th>
                  <td
                    className={`${guideProseTight} py-2.5 pr-4 align-top ${
                      view === "traditional" ? "bg-primary/5" : ""
                    }`}
                  >
                    {row.traditional}
                  </td>
                  <td
                    className={`${guideProseTight} py-2.5 align-top ${
                      view === "agile" ? "bg-primary/5" : ""
                    }`}
                  >
                    {row.agile}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className={`md:hidden ${guideProseTight} space-y-3 list-none pl-0`}>
          {rows.map((row) => (
            <li key={row.topic} className="rounded-md border border-border/60 px-4 py-3">
              <p className="font-semibold text-foreground/90 mb-1">{row.topic}</p>
              <p>{view === "traditional" ? row.traditional : row.agile}</p>
            </li>
          ))}
        </ul>

        <p className={guideProseTight}>{caption}</p>
      </div>
    </section>
  );
}
