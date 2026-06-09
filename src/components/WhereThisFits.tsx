import { Link } from "@tanstack/react-router";
import { DashedArrow } from "@/components/RegionVisuals";
import { regionVisual, type RegionId, type WhereThisFitsConfig } from "@/lib/lifecycle-navigation";

export type WhereThisFitsProps = WhereThisFitsConfig;

const REGION_ORDER: { id: RegionId; label: string; href: string }[] = [
  { id: "build", label: "Build", href: "/build" },
  { id: "live", label: "Live", href: "/live" },
  { id: "sunset", label: "Sunset", href: "/sunset" },
];

export function WhereThisFits({
  regionVisual: regionId,
  phases,
}: WhereThisFitsProps) {
  return (
    <div
      className="rounded-3xl p-5 md:p-7 shadow-inner"
      style={{ backgroundColor: "var(--region-group)" }}
    >
      <p className="text-xs uppercase tracking-[0.22em] text-foreground/60 mb-4 text-center">
        Where this fits
      </p>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-3 w-full overflow-x-auto pb-0.5">
          {REGION_ORDER.map((region, i) => (
            <span key={region.id} className="inline-flex shrink-0 items-center gap-2 sm:gap-3">
              {i > 0 && <DashedArrow direction="right" />}
              {region.id === regionId ? (
                <span className="inline-flex shrink-0 items-center" aria-current="page">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none opacity-25 w-10 h-9 flex shrink-0 items-center justify-center -mr-1.5"
                  >
                    {regionVisual(region.id)}
                  </span>
                  <span className="font-serif text-2xl font-semibold tracking-tight text-foreground -ml-0.5">
                    {region.label}
                  </span>
                </span>
              ) : (
                <Link
                  to={region.href}
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-primary underline underline-offset-4 hover:opacity-80"
                >
                  {region.label}
                </Link>
              )}
            </span>
          ))}
        </div>
        {phases.length > 0 && (
          <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-3 w-full overflow-x-auto pb-0.5">
            {phases.map((phase, i) => (
              <span
                key={phase.href}
                className="inline-flex shrink-0 items-center gap-2 sm:gap-3"
              >
                {i > 0 && <DashedArrow direction="right" />}
                {phase.current ? (
                  <span
                    className="inline-flex shrink-0 items-center rounded-full border-2 border-foreground/50 bg-card px-4 py-1.5 text-sm font-semibold text-foreground whitespace-nowrap"
                    aria-current="page"
                  >
                    {phase.title}
                  </span>
                ) : (
                  <Link
                    to={phase.href}
                    className="inline-flex shrink-0 items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground whitespace-nowrap hover:bg-muted hover:border-foreground/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {phase.title}
                  </Link>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
