import type { ReactNode } from "react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { guideProse, guideProseTight, guideSectionTitle } from "@/lib/guide-typography";

/**
 * A checklist item that only some services owe.
 *
 * The condition goes on a badge, not into the sentence. The full explanation of
 * what brings the thing into scope already exists on the page that owns it, and
 * repeating it here turns a quick check into another paragraph to read.
 */
export type ChecklistItem =
  | ReactNode
  | {
      content: ReactNode;
      subItems?: readonly ReactNode[];
      onlyIf?: string;
    };

/**
 * A named run of items set apart below the main list.
 *
 * The official checkpoints are a different kind of thing from the rest of an
 * off-ramp: they are owed to someone outside the team, and missing one stops
 * the service. Mixing them into the same flat list hid that.
 */
export type ChecklistGroup = {
  label: string;
  items: readonly ChecklistItem[];
};

function itemParts(item: ChecklistItem) {
  const grouped =
    item !== null && typeof item === "object" && !("type" in (item as object)) &&
    ("content" in (item as Record<string, unknown>));
  if (!grouped) return { content: item as ReactNode, subItems: null, onlyIf: undefined };
  const o = item as { content: ReactNode; subItems?: readonly ReactNode[]; onlyIf?: string };
  return { content: o.content, subItems: o.subItems ?? null, onlyIf: o.onlyIf };
}

export function OnRampChecklist({
  title,
  intro,
  items,
  group,
  className,
  embedded = false,
}: {
  title?: string;
  intro?: ReactNode;
  items: readonly ChecklistItem[];
  /** Set apart under its own label, below the main list. */
  group?: ChecklistGroup;
  className?: string;
  embedded?: boolean;
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const renderItem = (item: ChecklistItem, idx: number) => {
    const id = `onramp-${embedded ? "embedded-" : ""}${idx}`;
    const { content, subItems, onlyIf } = itemParts(item);
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
            className="min-w-0 flex-1 cursor-pointer text-foreground/75"
          >
            {content}
            {onlyIf ? (
              <span className="ml-2 inline-block rounded-full border border-amber-300 bg-amber-100 px-1.5 py-[0.05rem] align-[0.08em] text-[0.6rem] font-semibold uppercase tracking-wide text-amber-900 dark:border-amber-800/70 dark:bg-amber-950 dark:text-amber-200">
                Only if {onlyIf}
              </span>
            ) : null}
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
  };

  const checklist = (
    <>
      {intro ? <div className={embedded ? "mb-4" : `${guideProse} mb-4`}>{intro}</div> : null}
      <div className="rounded-lg border border-border bg-card px-5 py-4 md:px-6 md:py-5">
        <ul className="list-none p-0 m-0 space-y-3">
          {items.map((item, idx) => renderItem(item, idx))}
        </ul>
        {group ? (
          <div className="mt-5 border-t border-border pt-4">
            <p className="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {group.label}
            </p>
            <ul className="ml-[0.35rem] list-none border-l border-border/70 p-0 pl-4 m-0 space-y-3">
              {group.items.map((item, idx) => renderItem(item, items.length + idx))}
            </ul>
          </div>
        ) : null}
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

