import { guideProseTight, guideLink } from "@/lib/guide-typography";

export function DashboardBlock({
  href = "#practice-build-dashboard",
}: {
  href?: string;
}) {
  return (
    <div
      className="mt-5 rounded-2xl border border-border overflow-hidden shadow-sm"
      style={{ backgroundColor: "var(--region-group)" }}
      aria-label="Example service dashboard"
    >
      <div className="px-4 py-3 border-b border-border/80 flex items-center justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-sans">
          Dashboard
        </span>
        <span className="text-[10px] text-foreground/40 font-sans">Live · Maturity</span>
      </div>
      <div className="p-4 md:p-5 grid grid-cols-3 gap-3 md:gap-4">
        {[
          { label: "Availability", value: "99.2%", bar: 82 },
          { label: "Latency p95", value: "240ms", bar: 58 },
          { label: "Error rate", value: "0.04%", bar: 22 },
        ].map((m) => (
          <div key={m.label} className="rounded-lg bg-background/60 border border-border/60 p-3">
            <p className="text-[10px] uppercase tracking-wide text-foreground/45 font-sans">
              {m.label}
            </p>
            <p className="mt-1 font-sans text-sm font-medium text-foreground/80">{m.value}</p>
            <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-primary/70"
                style={{ width: `${m.bar}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 md:px-5 md:pb-5">
        <div className="h-16 md:h-20 rounded-lg bg-background/50 border border-border/60 flex items-end gap-1 px-2 pb-2">
          {[40, 55, 48, 62, 58, 70, 65, 72, 68, 75, 71, 78].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-primary/25 min-w-0"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <p className={`${guideProseTight} px-4 pb-5 md:px-5 md:pb-6 border-t border-border/60 pt-4`}>
        <a href={href} className={`font-semibold text-foreground/85 ${guideLink}`}>
          Build a dashboard from instrumentation.
        </a>{" "}
        Its signals should be measured by the service and its infrastructure, not entered by
        hand. Keep it readable, and make it visible to the bodies that review you.
      </p>
    </div>
  );
}
