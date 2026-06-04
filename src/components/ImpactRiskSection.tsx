import type { ReactNode } from "react";

export function ImpactRiskTag({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.2em] text-foreground/70 mb-4 font-medium">
      {children}
    </p>
  );
}

export function ImpactRiskSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={
        className ??
        "mt-14 md:mt-16 rounded-xl border border-chart-4/35 bg-chart-4/12 px-5 py-6 md:px-7 md:py-7"
      }
    >
      <div className="font-serif text-[1.1rem] md:text-lg leading-[1.75] text-foreground/90 space-y-6">
        {children}
      </div>
    </section>
  );
}
