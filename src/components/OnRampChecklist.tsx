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
  items: readonly ReactNode[];
  className?: string;
  embedded?: boolean;
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const checklist = (
    <>
      {intro ? <div className={embedded ? "mb-4" : `${guideProse} mb-4`}>{intro}</div> : null}
      <div className="rounded-lg border border-border bg-card px-5 py-4 md:px-6 md:py-5">
        <ul className="list-none p-0 m-0 space-y-3">
          {items.map((content, idx) => {
            const id = `onramp-${embedded ? "embedded-" : ""}${idx}`;
            return (
              <li key={idx} className={`flex gap-3 ${guideProseTight}`}>
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

