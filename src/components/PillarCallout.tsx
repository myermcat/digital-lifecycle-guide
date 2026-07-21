import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  guideBlockTitle,
  guideCalloutLabel,
  guideLink,
  guideProseTight,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export function PillarCallout({
  id,
  label,
  title,
  icon: Icon,
  children,
  href,
  hash,
  linkLabel,
  footerNote,
  className,
  compact = false,
}: {
  id?: string;
  label: string;
  title?: string;
  icon: LucideIcon;
  children?: ReactNode;
  href?: string;
  /** In-page hash when `href` is a route path (e.g. gate-map `#discovery`). */
  hash?: string;
  linkLabel?: string;
  footerNote?: ReactNode;
  className?: string;
  /** Eyebrow + short body + link; tighter padding and icon. */
  compact?: boolean;
}) {
  return (
    <section
      id={id}
      className={
        className ??
        "scroll-mt-24 mt-10 md:mt-12 rounded-lg border border-primary/40 bg-background shadow-sm overflow-hidden"
      }
    >
      <div
        className={cn(
          "border-l-[5px] border-l-primary",
          compact ? "px-4 py-4 md:px-5 md:py-4" : "px-6 py-6 md:px-8 md:py-7",
        )}
      >
        <div className={cn("flex", compact ? "gap-3" : "gap-4 md:gap-5")}>
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/8 text-primary/80",
              compact ? "size-8" : "size-10 md:size-11",
            )}
            aria-hidden="true"
          >
            <Icon
              className={compact ? "size-4" : "size-5 md:size-[1.35rem]"}
              strokeWidth={1.5}
            />
          </div>
          <div className={cn("min-w-0", compact ? "space-y-2" : "space-y-4")}>
            <div>
              <p className={guideCalloutLabel}>{label}</p>
              {title ? (
                <h2 className={`${guideBlockTitle} mt-1`}>{title}</h2>
              ) : null}
            </div>
            {children ? <div className={guideProseTight}>{children}</div> : null}
            {href && linkLabel ? (
              <p>
                <Link to={href} hash={hash} className={`text-sm ${guideLink}`}>
                  {linkLabel}
                </Link>
              </p>
            ) : null}
            {footerNote ? <p className={guideProseTight}>{footerNote}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
