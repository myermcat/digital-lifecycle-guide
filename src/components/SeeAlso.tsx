import { Link } from "@tanstack/react-router";
import { guideStaticCardClassName } from "@/lib/guide-cards";
import { guideCalloutLabel, guideProseTight } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export type SeeAlsoItem = { label: string; to: string; gloss: string };

const seeAlsoCardClassName = cn(
  "group flex flex-col rounded-md border border-border/70 border-l-2 border-l-primary/35 px-3.5 py-2.5",
  guideStaticCardClassName,
  "hover:border-primary/45 hover:bg-muted/25 transition-colors",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
);

export function SeeAlso({ items, className }: { items: SeeAlsoItem[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <section className={cn("mt-14 md:mt-16", className)}>
      <p className={cn(guideCalloutLabel, "text-muted-foreground/70 mb-3")}>See also</p>
      <ul className="flex list-none gap-2 pl-0">
        {items.map((it) => (
          <li key={it.to} className="min-w-0 flex-1">
            <Link to={it.to} className={cn(seeAlsoCardClassName, "h-full")}>
              <span className="font-serif text-sm font-medium text-primary leading-tight group-hover:text-primary/85">
                {it.label}
              </span>
              <span className={cn(guideProseTight, "mt-0.5 text-muted-foreground")}>
                {it.gloss}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
