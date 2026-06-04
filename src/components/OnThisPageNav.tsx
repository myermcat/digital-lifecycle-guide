import { useState } from "react";
import { ChevronDown, ChevronUp, List } from "lucide-react";

export type OnThisPageItem = {
  id: string;
  label: string;
};

export function OnThisPageNav({ items }: { items: OnThisPageItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed z-50 bottom-5 right-4 md:bottom-8 md:right-6 flex flex-col items-end gap-2 pointer-events-auto"
      aria-label="On this page"
    >
      {open && (
        <nav
          className="w-[min(15rem,calc(100vw-2rem))] rounded-xl border border-border bg-card/95 backdrop-blur-sm shadow-lg p-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
          aria-labelledby="on-this-page-heading"
        >
          <p
            id="on-this-page-heading"
            className="text-[10px] uppercase tracking-[0.2em] text-foreground/55 font-sans px-1 mb-2"
          >
            On this page
          </p>
          <ol className="list-none pl-0 space-y-1">
            {items.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex gap-2 rounded-md px-2 py-1.5 text-xs leading-snug text-foreground/75 hover:bg-muted/80 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="tabular-nums text-foreground/45 shrink-0 w-4">
                    {index + 1}.
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/95 backdrop-blur-sm px-3 py-2 text-[10px] uppercase tracking-[0.18em] font-sans text-foreground/70 shadow-md hover:bg-muted/60 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <List className="size-3.5 shrink-0 opacity-70" aria-hidden />
        On this page
        {open ? (
          <ChevronDown className="size-3.5 shrink-0 opacity-60" aria-hidden />
        ) : (
          <ChevronUp className="size-3.5 shrink-0 opacity-60" aria-hidden />
        )}
      </button>
    </div>
  );
}
