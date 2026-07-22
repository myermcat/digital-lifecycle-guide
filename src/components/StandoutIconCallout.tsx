import type { LucideIcon } from "lucide-react";
import type { ElementType, ReactNode } from "react";
import {
  guideBlockTitle,
  guideCalloutLabel,
  guideProseTight,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

/**
 * Standout callout — icon chip, small-caps eyebrow, rust heading, body.
 * Same shell as {@link GoodContractCallout} on Procurement.
 */
export function StandoutIconCallout({
  id,
  className,
  icon: Icon,
  label,
  title,
  titleAs: TitleTag = "h2",
  as: Root = "section",
  children,
  footer,
}: {
  id?: string;
  className?: string;
  icon: LucideIcon;
  label: string;
  title: string;
  /** Use a non-heading when nested under an existing section. */
  titleAs?: "h2" | "h3" | "p";
  /** `section` when this block should appear in On this page nav. */
  as?: "section" | "aside";
  children: ReactNode;
  footer?: ReactNode;
}) {
  const RootTag = Root as ElementType;

  return (
    <RootTag
      id={id}
      className={cn(
        "scroll-mt-24 rounded-lg border border-primary/40 bg-background shadow-sm overflow-hidden",
        className,
      )}
    >
      <div className="border-l-[5px] border-l-primary px-6 py-6 md:px-8 md:py-7">
        <div className="flex gap-4 md:gap-5">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/8 text-primary/80 md:size-11"
            aria-hidden="true"
          >
            <Icon className="size-5 md:size-[1.35rem]" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 space-y-4">
            <div>
              <p className={guideCalloutLabel}>{label}</p>
              <TitleTag className={`${guideBlockTitle} mt-1`}>{title}</TitleTag>
            </div>
            <div className={`${guideProseTight} space-y-3`}>{children}</div>
            {footer ? <div>{footer}</div> : null}
          </div>
        </div>
      </div>
    </RootTag>
  );
}
