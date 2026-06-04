import type { ReactNode } from "react";
import { guideProseTight, guideBlockTitle, guideLink, guideCalloutLabel } from "@/lib/guide-typography";

export function DoorwayBlock({
  id,
  className,
  label = "DOORWAY",
  heading,
  children,
  href,
  linkLabel,
}: {
  id?: string;
  className?: string;
  label?: string;
  heading: string;
  children: ReactNode;
  href: string;
  linkLabel: string;
}) {
  return (
    <section
      id={id}
      className={
        className ??
        "mt-10 md:mt-12 scroll-mt-24 rounded-lg border border-primary/35 bg-background px-6 py-6 md:px-8 md:py-7"
      }
    >
      <p className={guideCalloutLabel}>{label}</p>
      <h2 className={`${guideBlockTitle} mt-2 mb-1.5`}>{heading}</h2>
      <div className="space-y-4">
        <div className={guideProseTight}>{children}</div>
        <p>
          <a href={href} className={`text-sm ${guideLink}`}>
            {linkLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
