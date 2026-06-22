import type { ReactNode } from "react";
import { CALLOUT_BLOCK } from "@/lib/guide-blocks";
import { guideCalloutLabel, guideCalloutTitle, guideProse, guideProseTight } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

/**
 * **Callout** block — see `CALLOUT_BLOCK` in `@/lib/guide-blocks`.
 *
 * Say "callout" (not "editorial note"). For audience framing, use {@link EditorialNote}.
 */
export function GuideCallout({
  label,
  title,
  children,
  compact = false,
  className,
}: {
  /** Small uppercase label (e.g. "Scope") — same style as {@link EditorialNote} label. */
  label?: string;
  /** Callout heading (e.g. a question) — editorial label size and face, primary colour. */
  title?: string;
  children: ReactNode;
  /** Tighter sans body — for short scope-style notes. */
  compact?: boolean;
  className?: string;
}) {
  const bodyClass = compact ? guideProseTight : guideProse;
  const labelClass = `${guideCalloutLabel} text-muted-foreground`;
  const titleClass = guideCalloutTitle;

  return (
    <aside
      data-guide-block={CALLOUT_BLOCK.blockId}
      className={cn(
        "rounded-md border border-l-4 border-primary/25 border-l-primary bg-primary/[0.04] px-4 py-3 md:px-5 md:py-3.5",
        className,
      )}
    >
      {label ? <p className={labelClass}>{label}</p> : null}
      {title ? (
        <p className={cn(titleClass, label ? "mt-2" : undefined)}>{title}</p>
      ) : null}
      <div className={cn(bodyClass, label || title ? "mt-1" : undefined)}>{children}</div>
    </aside>
  );
}
