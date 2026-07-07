import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { guideKeyCallout } from "@/lib/guide-typography";

type KeyCalloutProps = {
  children: ReactNode;
  className?: string;
};

/** One modest pull-quote after the lead — slightly above body size. */
export function KeyCallout({ children, className }: KeyCalloutProps) {
  return (
    <figure
      data-guide-block="key-callout"
      className={cn("my-5 md:my-6 text-center", className)}
    >
      <blockquote className={guideKeyCallout}>{children}</blockquote>
    </figure>
  );
}
