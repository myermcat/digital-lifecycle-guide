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
