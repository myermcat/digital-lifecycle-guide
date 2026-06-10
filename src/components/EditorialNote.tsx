import type { ReactNode } from "react";
import { guideCalloutLabel, guideProseTight } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export type EditorialNoteTone = "quiet" | "caution";

interface EditorialNoteProps {
  tone?: EditorialNoteTone;
  label?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Small editorial callout: thick left accent, soft tint, tiny label,
 * one or two lines of body. Two tones: quiet (neutral) and caution (red).
 */
export function EditorialNote({
  tone = "quiet",
  label,
  children,
  className,
}: EditorialNoteProps) {
  const isCaution = tone === "caution";
  const defaultLabel = isCaution ? "Caution" : "Note";

  const toneClasses = isCaution
    ? "border-destructive/30 border-l-destructive bg-destructive/8"
    : "border-border border-l-muted-foreground/60 bg-muted/40";

  const labelClasses = isCaution
    ? `${guideCalloutLabel} text-destructive`
    : `${guideCalloutLabel} text-muted-foreground`;

  return (
    <aside
      className={cn(
        `rounded-md border border-l-4 ${toneClasses} px-4 py-3 md:px-5 md:py-3.5`,
        className,
      )}
      style={isCaution ? { backgroundColor: "color-mix(in oklab, var(--destructive) 8%, var(--background))" } : undefined}
    >
      <p className={labelClasses}>{label ?? defaultLabel}</p>
      <div className={`${guideProseTight} mt-1`}>{children}</div>
    </aside>
  );
}
