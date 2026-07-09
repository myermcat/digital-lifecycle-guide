import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { guideDoorwayCardClassName } from "@/lib/guide-cards";
import { guideProseTight, guideBlockTitle, guideLink, guideCalloutLabel } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

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
        cn(
          "mt-10 md:mt-12 scroll-mt-24 px-6 py-6 md:px-8 md:py-7",
          guideDoorwayCardClassName,
        )
      }
    >
      <p className={guideCalloutLabel}>{label}</p>
      <h2 className={`${guideBlockTitle} mt-2 mb-1.5`}>{heading}</h2>
      <div className="space-y-4">
        <div className={guideProseTight}>{children}</div>
        <p>
          {href.startsWith("/") ? (
            <Link to={href} className={`text-sm ${guideLink}`}>
              {linkLabel}
            </Link>
          ) : (
            <a href={href} className={`text-sm ${guideLink}`}>
              {linkLabel}
            </a>
          )}
        </p>
      </div>
    </section>
  );
}
