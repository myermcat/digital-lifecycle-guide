import { useState } from "react";
import { ChevronDown, ChevronUp, List } from "lucide-react";
import { useOnThisPageSections } from "@/hooks/use-on-this-page-sections";

export type { OnThisPageItem } from "@/lib/on-this-page";
import type { OnThisPageItem } from "@/lib/on-this-page";

/** Matches section `scroll-mt-24` (6rem). */
const SCROLL_OFFSET_PX = 96;

function getTargetScrollTop(element: HTMLElement) {
  return element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
}

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const top = Math.max(0, getTargetScrollTop(target));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

export function OnThisPageNav({
  rootId,
  items: itemsProp,
}: {
  /** Page `main` id — nav links are built from `section[id]` + `h2` inside it. */
  rootId?: string;
  /** Optional override; default is auto-discovery from the page. */
  items?: OnThisPageItem[];
}) {
  const discovered = useOnThisPageSections(rootId);
  const items = itemsProp ?? discovered;
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

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
                <button
                  type="button"
                  onClick={() => {
                    scrollToSection(item.id);
                    setOpen(false);
                  }}
                  className="w-full flex gap-2 rounded-md px-2 py-1.5 text-left text-xs leading-snug text-foreground/75 hover:bg-muted/80 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="tabular-nums text-foreground/45 shrink-0 w-4">
                    {index + 1}.
                  </span>
                  <span>{item.label}</span>
                </button>
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
