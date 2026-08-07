import type { ReactNode } from "react";
import { EDITORIAL_NOTE_BLOCK } from "@/lib/guide-blocks";
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
 * **Editorial note** block — see `EDITORIAL_NOTE_BLOCK` in `@/lib/guide-blocks`.
 *
 * Say "editorial note" (not "callout"). For practical in-page tips, use {@link GuideCallout}.
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
    : "border-border border-l-primary/70 bg-muted/70";

  const labelClasses = isCaution
    ? `${guideCalloutLabel} text-destructive`
    : `${guideCalloutLabel} text-primary/85`;

  return (
    <aside
      data-guide-block={EDITORIAL_NOTE_BLOCK.blockId}
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
