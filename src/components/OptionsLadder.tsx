import { guideProseTight } from "@/lib/guide-typography";

type OptionsLadderItem = {
  lead: string;
  body: string;
};

/** Ordered options from cheapest to most costly — styled as ladder rungs. */
export function OptionsLadder({ items }: { items: OptionsLadderItem[] }) {
  return (
    <ol className="mt-4 list-none pl-0">
      {items.map((item, index) => (
        <li key={item.lead} className="relative">
          <div
            className={`rounded-lg border border-border bg-card px-4 py-3.5 md:px-5 md:py-4 ${
              index < items.length - 1 ? "mb-2" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-semibold text-primary">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`${guideProseTight} font-semibold text-foreground/90`}>
                  {item.lead}
                </p>
                <p className={`${guideProseTight} mt-1 text-foreground/70`}>{item.body}</p>
              </div>
            </div>
          </div>
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
