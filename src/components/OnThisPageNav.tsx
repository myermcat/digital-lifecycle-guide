import { useState } from "react";
import { AlignLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useOnThisPageSections } from "@/hooks/use-on-this-page-sections";
import {
  onThisPageRailWidth,
  scrollToOnThisPageSection,
  type OnThisPageItem,
} from "@/lib/on-this-page";
import { UI } from "@/lib/ui-strings";

export type { OnThisPageItem } from "@/lib/on-this-page";

export function OnThisPageNav({
  rootId,
  items: itemsProp,
}: {
  /** Page `main` id — nav links are built from `section[id]` + `h2` inside it. */
  rootId?: string;
  /** When set, used instead of auto-discovered section headings. */
  items?: readonly OnThisPageItem[];
}) {
  const discovered = useOnThisPageSections(itemsProp ? undefined : rootId);
  const items = itemsProp ?? discovered;
  const [open, setOpen] = useState(false);
  const wide = onThisPageRailWidth(items) === "wide";

  if (items.length === 0) return null;

  let topLevelCount = 0;
  const displayItems = items.map((item) => {
    const isSub = (item.depth ?? 0) > 0;
    if (!isSub) topLevelCount += 1;
    return { item, isSub, number: topLevelCount };
  });

  return (
    <div className="relative" aria-label={UI.onThisPage}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={UI.onThisPage}
        title={UI.onThisPage}
        className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-sans text-foreground/70 hover:bg-muted/60 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <AlignLeft className="size-3.5 shrink-0 opacity-70" aria-hidden />
        <span className="hidden sm:inline">{UI.onThisPage}</span>
        {open ? (
          <ChevronUp className="size-3.5 shrink-0 opacity-60" aria-hidden />
        ) : (
          <ChevronDown className="size-3.5 shrink-0 opacity-60" aria-hidden />
        )}
      </button>
      {open ? (
        <nav
          className={
            wide
              ? "absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-border bg-card/95 backdrop-blur-sm shadow-lg p-3 animate-in fade-in slide-in-from-top-2 duration-200"
              : "absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-border bg-card/95 backdrop-blur-sm shadow-lg p-3 animate-in fade-in slide-in-from-top-2 duration-200"
          }
          aria-labelledby="on-this-page-heading"
        >
          <p
            id="on-this-page-heading"
            className="text-[10px] uppercase tracking-[0.2em] text-foreground/55 font-sans px-1 mb-2"
          >
            {UI.onThisPage}
          </p>
          <ol className="list-none pl-0 space-y-1">
            {displayItems.map(({ item, isSub, number }) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    scrollToOnThisPageSection(item.id);
                    setOpen(false);
                  }}
                  className={
                    isSub
                      ? "w-full flex gap-2 rounded-md pl-5 pr-2 py-1 text-left text-[11px] leading-snug text-foreground/60 hover:bg-muted/80 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      : "w-full flex gap-2 rounded-md px-2 py-1.5 text-left text-xs leading-snug text-foreground/75 hover:bg-muted/80 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  }
                >
                  {!isSub ? (
                    <span className="tabular-nums text-foreground/45 shrink-0 w-4">
                      {number}.
                    </span>
                  ) : (
                    <span className="shrink-0 w-3 text-foreground/35" aria-hidden>
                      ·
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
    </div>
  );
}
