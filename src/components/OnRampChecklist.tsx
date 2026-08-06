import type { ReactNode } from "react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { guideProse, guideProseTight, guideSectionTitle } from "@/lib/guide-typography";

export function OnRampChecklist({
  title,
  intro,
  items,
  className,
  embedded = false,
}: {
  title?: string;
  intro?: ReactNode;
  items: readonly (ReactNode | { content: ReactNode; subItems: readonly ReactNode[] })[];
  className?: string;
  embedded?: boolean;
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const checklist = (
    <>
      {intro ? <div className={embedded ? "mb-4" : `${guideProse} mb-4`}>{intro}</div> : null}
      <div className="rounded-lg border border-border bg-card px-5 py-4 md:px-6 md:py-5">
        <ul className="list-none p-0 m-0 space-y-3">
          {items.map((item, idx) => {
            const id = `onramp-${embedded ? "embedded-" : ""}${idx}`;
            const grouped =
              item !== null &&
              typeof item === "object" &&
              "subItems" in (item as Record<string, unknown>);
            const content = grouped
              ? (item as { content: ReactNode }).content
              : (item as ReactNode);
            const subItems = grouped
              ? (item as { subItems: readonly ReactNode[] }).subItems
              : null;
            return (
              <li key={idx} className={guideProseTight}>
                <div className="flex gap-3">
                  <span className="flex h-[1.35em] shrink-0 items-center">
                    <Checkbox
                      id={id}
                      checked={checked[idx] ?? false}
                      onCheckedChange={(value) =>
                        setChecked((prev) => ({ ...prev, [idx]: Boolean(value) }))
                      }
                    />
                  </span>
                  <label
                    htmlFor={id}
                    className="min-w-0 flex-1 text-foreground/75 cursor-pointer"
                  >
                    {content}
                  </label>
                </div>
                {subItems ? (
                  <ul className="mt-2 mb-1 ml-[1.9rem] list-none space-y-1.5 border-l border-border/70 pl-4">
                    {subItems.map((sub, subIdx) => (
                      <li key={subIdx} className="text-foreground/70">
                        {sub}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );

  if (embedded) {
    return <div className={cn(className)}>{checklist}</div>;
  }

  return (
    <section className={cn("mt-10 md:mt-12 scroll-mt-24", className)}>
      {title ? <h2 className={`${guideSectionTitle} mb-4`}>{title}</h2> : null}
      {checklist}
    </section>
  );
}

