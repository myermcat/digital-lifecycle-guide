import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { guideArrowLeadGroup, guideArrowLeadList, guideArrowListIcon } from "@/lib/guide-typography";
import { guideProse, guideProseTight, guideLink } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export type CompactLinkedItem = {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
};

export type ArrowLeadItem = {
  lead: string;
  body: ReactNode;
  /** Optional extra lines below the body, with looser spacing between them. */
  bodyLines?: string[];
  href?: string;
};

/** Small arrow marker for guide bullet lists. Use with your own text layout. */
export function GuideArrowBullet({ className }: { className?: string }) {
  return (
    <ArrowRight
      className={cn(guideArrowListIcon, className)}
      strokeWidth={1.5}
      aria-hidden
    />
  );
}

/** Arrow + primary lead + body. Prefer importing from @/lib/guide-lists. */
export function ArrowLeadList({
  items,
  className,
}: {
  items: ArrowLeadItem[];
  className?: string;
}) {
  return (
    <ul className={cn(guideArrowLeadList, className)}>
      {items.map((item) => (
        <li key={item.lead} className="flex gap-2.5">
          <GuideArrowBullet />
          <div className={cn("min-w-0 flex-1", guideArrowLeadGroup)}>
            <p className="mb-0">
              {item.href ? (
                <a
                  href={item.href}
                  className={`font-serif text-base md:text-[1.05rem] leading-snug ${guideLink}`}
                >
                  {item.lead}
                </a>
              ) : (
                <span className={`${guideProse} font-medium text-primary leading-snug`}>
                  {item.lead}
                </span>
              )}
            </p>
            <p className={`${guideProseTight} text-foreground/65 leading-snug`}>{item.body}</p>
            {item.bodyLines && item.bodyLines.length > 0 ? (
              <div className="mt-2 space-y-1.5">
                {item.bodyLines.map((line) => (
                  <p key={line} className={`${guideProseTight} text-foreground/65`}>
                    {line}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CompactLinkedList({ items }: { items: CompactLinkedItem[] }) {
  return (
    <ul className="mt-5 space-y-3 list-none pl-0">
      {items.map((item) => (
        <li
          key={item.href}
          className={`${guideProseTight} rounded-xl border border-border/80 px-4 py-3.5`}
          style={{ backgroundColor: "var(--phase-group)" }}
        >
          <span className="font-semibold text-foreground/90">{item.title}</span> {item.body}{" "}
          <a href={item.href} className={guideLink}>
            {item.linkLabel}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function CompactExitList({
  items,
}: {
  items: { lead: string; rest: string; href?: string }[];
}) {
  return (
    <ArrowLeadList
      className="mt-4"
      items={items.map((item) => ({
        lead: item.lead,
        body: item.rest,
        href: item.href,
      }))}
    />
  );
}
