import type { ReactNode } from "react";
import {
  guideProseTight,
  guideCalloutLabel,
  guideBlockTitle,
} from "@/lib/guide-typography";

export type CautionItem = {
  heading: string;
  line: string;
};

export function CautionBlock({
  id,
  className,
  label = "CAUTION",
  title,
  lead,
  items,
  closing,
}: {
  id?: string;
  className?: string;
  label?: string;
  title: string;
  lead: string;
  items: CautionItem[];
  closing: ReactNode;
}) {
  return (
    <section
      id={id}
      className={
        className ??
        "scroll-mt-24 rounded-lg border border-primary/30 bg-background overflow-hidden"
      }
    >
      <div className="border-l-4 border-l-primary px-6 py-6 md:px-8 md:py-7 space-y-5">
        <p className={guideCalloutLabel}>{label}</p>
        <div>
          <h2 className={`${guideBlockTitle} mt-2 mb-1.5`}>{title}</h2>
          <p className={guideProseTight}>{lead}</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 list-none pl-0">
          {items.map((item) => (
            <li
              key={item.heading}
              className="rounded-lg border border-primary/20 bg-transparent px-4 py-4"
            >
              <p className="font-serif text-sm font-medium text-foreground leading-tight">
                {item.heading}
              </p>
              <p className="mt-1.5 font-sans text-[10px] leading-[1.35] text-foreground/55">
                {item.line}
              </p>
            </li>
          ))}
        </ul>
        <div className={guideProseTight}>{closing}</div>
      </div>
    </section>
  );
}
