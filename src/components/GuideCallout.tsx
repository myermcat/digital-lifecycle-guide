import type { ReactNode } from "react";
import { guideCalloutLabel, guideProse, guideProseTight } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

/**
 * In-page callout: rounded primary-tint box for practical tips, tests, and orientation.
 *
 * Use for content that helps the reader act or decide within the page (e.g. "Not sure
 * which phase you are in?"). For editorial context about audience or framing, use
 * {@link EditorialNote} instead — see `guideBlockTypes` in `@/lib/guide-article`.
 */
export function GuideCallout({
  label,
  title,
  children,
  compact = false,
  className,
}: {
  /** Small uppercase label (e.g. "Scope"). */
  label?: string;
  /** Serif lead line inside the box (e.g. a question). */
  title?: string;
  children: ReactNode;
  /** Tighter sans body — for short scope-style notes. */
  compact?: boolean;
  className?: string;
}) {
  const bodyClass = compact ? guideProseTight : guideProse;

  return (
    <aside
      className={cn(
        "rounded-lg border border-primary/25 bg-primary/[0.04] px-5 py-4 md:px-6 md:py-5",
        className,
      )}
    >
      {label ? <p className={guideCalloutLabel}>{label}</p> : null}
      {title ? (
        <p
          className={cn(
            "font-serif text-base font-semibold text-primary leading-snug",
            label ? "mt-2" : undefined,
          )}
        >
          {title}
        </p>
      ) : null}
      <div className={cn(bodyClass, label || title ? "mt-2" : undefined)}>{children}</div>
    </aside>
  );
}
