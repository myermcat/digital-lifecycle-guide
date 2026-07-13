import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  guideBlockTitle,
  guideCalloutLabel,
  guideLink,
  guideProseTight,
} from "@/lib/guide-typography";

export function PillarCallout({
  id,
  label,
  title,
  icon: Icon,
  children,
  href,
  linkLabel,
  footerNote,
  className,
}: {
  id?: string;
  label: string;
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  href?: string;
  linkLabel?: string;
  footerNote?: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={
        className ??
        "scroll-mt-24 mt-10 md:mt-12 rounded-lg border border-primary/40 bg-background shadow-sm overflow-hidden"
      }
    >
      <div className="border-l-[5px] border-l-primary px-6 py-6 md:px-8 md:py-7">
        <div className="flex gap-4 md:gap-5">
          <div
            className="flex size-12 shrink-0 items-center justify-center text-primary/75 md:size-14"
            aria-hidden="true"
          >
            <Icon className="size-7 md:size-8" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 space-y-4">
            <div>
              <p className={guideCalloutLabel}>{label}</p>
              <h2 className={`${guideBlockTitle} mt-1`}>{title}</h2>
            </div>
            <div className={guideProseTight}>{children}</div>
            {href && linkLabel ? (
              <p>
                <Link to={href} className={`text-sm ${guideLink}`}>
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
