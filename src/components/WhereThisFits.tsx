import { Link } from "@tanstack/react-router";
import { DashedArrow } from "@/components/PhaseVisuals";
import { guideLink } from "@/lib/guide-typography";
import { phaseVisual, type LifecyclePhaseId, type WhereThisFitsConfig } from "@/lib/lifecycle-navigation";
import { PHASES, PHASE_ORDER } from "@/lib/guide-strings";

export type WhereThisFitsProps = WhereThisFitsConfig;

export function WhereThisFits({
  phaseVisual: lifecyclePhaseId,
  subphases,
}: WhereThisFitsProps) {
  return (
    <div
      className="rounded-3xl p-5 md:p-7 shadow-inner"
      style={{ backgroundColor: "var(--phase-group)" }}
    >
      <p className="text-xs uppercase tracking-[0.22em] text-foreground/60 mb-4 text-center">
        Where this fits
      </p>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-3 w-full overflow-x-auto pb-0.5">
          {PHASE_ORDER.map((id, i) => (
            <span key={id} className="inline-flex shrink-0 items-center gap-2 sm:gap-3">
              {i > 0 && <DashedArrow direction="right" />}
              {id === lifecyclePhaseId ? (
                <span className="inline-flex shrink-0 items-center" aria-current="page">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none opacity-25 w-10 h-9 flex shrink-0 items-center justify-center -mr-1.5"
                  >
                    {phaseVisual(id as LifecyclePhaseId)}
                  </span>
                  <span className="font-serif text-2xl font-semibold tracking-tight text-foreground -ml-0.5">
                    {PHASES[id].title}
                  </span>
                </span>
              ) : (
                <Link
                  to={PHASES[id].href}
                  className={`shrink-0 whitespace-nowrap text-sm ${guideLink}`}
                >
                  {PHASES[id].title}
                </Link>
              )}
            </span>
          ))}
        </div>
        {subphases.length > 0 && (
          <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-3 w-full overflow-x-auto pb-0.5">
            {subphases.map((subphase, i) => (
              <span
                key={subphase.href}
                className="inline-flex shrink-0 items-center gap-2 sm:gap-3"
              >
                {i > 0 && <DashedArrow direction="right" />}
                {subphase.current ? (
                  <span
                    className="inline-flex shrink-0 items-center rounded-full border-2 border-foreground/50 bg-card px-4 py-1.5 text-sm font-semibold text-foreground whitespace-nowrap"
                    aria-current="page"
                  >
                    {subphase.title}
                  </span>
                ) : (
                  <Link
                    to={subphase.href}
                    className="inline-flex shrink-0 items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground whitespace-nowrap hover:bg-muted hover:border-foreground/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {subphase.title}
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
