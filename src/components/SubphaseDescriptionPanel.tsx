import type { ReactNode } from "react";
import { LifecycleVisual } from "@/components/LifecycleVisual";
import { subphaseVisualForLifecyclePhase } from "@/lib/lifecycle-visuals";
import { cn } from "@/lib/utils";

export const subphaseDescriptionBoxClassName =
  "mt-5 md:mt-6 rounded-xl border-2 border-dashed border-primary/40 bg-background px-5 py-5 md:px-6 md:py-6";

/** Dashed sub-phase description box with the phase-specific sub-phase visual directly beneath. */
export function SubphaseDescriptionPanel({
  lifecyclePhase,
  children,
  className,
}: {
  lifecyclePhase: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <>
      <aside
        className={cn(
          subphaseDescriptionBoxClassName,
          !children && "min-h-16",
          className,
        )}
      >
        {children}
      </aside>
      <LifecycleVisual visual={subphaseVisualForLifecyclePhase(lifecyclePhase)} />
    </>
  );
}
