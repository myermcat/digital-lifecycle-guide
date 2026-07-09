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
}: {
  title: string;
  intro?: string;
  items: readonly ReactNode[];
  className?: string;
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <section className={cn("mt-10 md:mt-12 scroll-mt-24", className)}>
      <h2 className={`${guideSectionTitle} mb-4`}>{title}</h2>
      {intro ? <p className={`${guideProse} mb-4`}>{intro}</p> : null}
      <div className="rounded-lg border border-border bg-card px-5 py-4 md:px-6 md:py-5">
        <ul className="list-none p-0 m-0 space-y-3">
          {items.map((content, idx) => {
            const id = `onramp-${idx}`;
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
    </section>
  );
}

