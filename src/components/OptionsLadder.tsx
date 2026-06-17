import { guideProseTight } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export type OptionsRungItem = {
  lead: string;
  body: string;
};

const rungCardClass =
  "rounded-lg border border-border bg-card px-4 py-3.5 md:px-5 md:py-4";

function OptionsRungCardContent({ lead, body }: OptionsRungItem) {
  return (
    <>
      <p className={`${guideProseTight} font-semibold text-foreground/90`}>{lead}</p>
      <p className={`${guideProseTight} mt-1 text-foreground/70`}>{body}</p>
    </>
  );
}

/** Single option card — shared by the numbered ladder and the alternatives grid. */
export function OptionsRungCard({
  item,
  number,
  className,
}: {
  item: OptionsRungItem;
  number?: number;
  className?: string;
}) {
  return (
    <div className={cn(rungCardClass, className)}>
      {number !== undefined ? (
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-semibold text-primary">
            {number}
          </span>
          <div className="min-w-0 flex-1">
            <OptionsRungCardContent {...item} />
          </div>
        </div>
      ) : (
        <OptionsRungCardContent {...item} />
      )}
    </div>
  );
}

/** Ordered options from cheapest to most costly — styled as ladder rungs. */
export function OptionsLadder({ items }: { items: OptionsRungItem[] }) {
  return (
    <ol className="mt-4 list-none pl-0">
      {items.map((item, index) => (
        <li key={item.lead} className="relative">
          <OptionsRungCard
            item={item}
            number={index + 1}
            className={index < items.length - 1 ? "mb-2" : undefined}
          />
          {index < items.length - 1 ? (
            <div aria-hidden="true" className="flex justify-center py-1">
              <span className="h-3 w-px bg-border" />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
