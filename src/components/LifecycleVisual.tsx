import type { LifecycleVisualAsset } from "@/lib/lifecycle-visuals";
import { cn } from "@/lib/utils";

export function LifecycleVisual({
  visual,
  className,
}: {
  visual: LifecycleVisualAsset;
  className?: string;
}) {
  return (
    <img
      src={visual.src}
      alt={visual.alt}
      className={cn("mx-auto mt-5 w-full max-w-3xl md:mt-6", className)}
    />
  );
}

/** Same 900px coordinate space — brace in the lower visual aligns under the phase box above. */
export const subphaseFootVisualStackClassName =
  "mx-auto w-full max-w-[900px] space-y-1 md:space-y-1.5";

export function LifecycleVisualStack({
  visuals,
  className,
  variant = "default",
}: {
  visuals: LifecycleVisualAsset[];
  className?: string;
  variant?: "default" | "subphaseFoot";
}) {
  if (variant === "subphaseFoot") {
    return (
      <div className={cn(subphaseFootVisualStackClassName, className)}>
        {visuals.map((visual) => (
          <img
            key={visual.src}
            src={visual.src}
            alt={visual.alt}
            className="block w-full"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2 md:space-y-3", className)}>
      {visuals.map((visual) => (
        <LifecycleVisual key={visual.src} visual={visual} className="mt-0" />
      ))}
    </div>
  );
}
