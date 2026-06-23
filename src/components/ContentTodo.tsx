import { guideListIndent, guideProseTight } from "@/lib/guide-typography";

export function ContentTodo({
  title,
  items,
  note,
}: {
  title: string;
  items: string[];
  note?: string;
}) {
  return (
    <div
      className="rounded-md border border-dashed border-amber-500/40 bg-amber-500/5 px-4 py-3 not-prose"
      role="note"
      aria-label="Content placeholder"
    >
      <p className="font-sans text-xs font-semibold uppercase tracking-wide text-amber-800/80 dark:text-amber-400/80 mb-2">
        TODO
      </p>
      <p className={`${guideProseTight} font-medium text-foreground/90 mb-2`}>{title}</p>
      <ul className={`${guideProseTight} list-disc ${guideListIndent} space-y-1`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {note ? <p className={`${guideProseTight} mt-2 text-foreground/70`}>{note}</p> : null}
    </div>
  );
}
