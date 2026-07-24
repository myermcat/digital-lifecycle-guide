import { useEffect, useMemo, useState } from "react";
import { useOnThisPageSections } from "@/hooks/use-on-this-page-sections";
import {
  ON_THIS_PAGE_RAIL_WIDTH,
  onThisPageRailWidth,
  scrollToOnThisPageSection,
  type OnThisPageItem,
} from "@/lib/on-this-page";
import { cn } from "@/lib/utils";

export function OnThisPageRail({
  rootId,
  items: itemsProp,
}: {
  rootId?: string;
  /** When set, used instead of auto-discovered section headings. */
  items?: readonly OnThisPageItem[];
}) {
  const discovered = useOnThisPageSections(itemsProp ? undefined : rootId);
  const items = itemsProp ?? discovered;
  const [activeId, setActiveId] = useState<string | null>(null);

  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const railWidth = onThisPageRailWidth(items);

  useEffect(() => {
    if (ids.length === 0) {
      setActiveId(null);
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) {
      setActiveId(null);
      return;
    }

    const order = new Map<string, number>();
    ids.forEach((id, index) => order.set(id, index));

    const visible = new Set<string>();

    const pickActive = () => {
      if (visible.size === 0) return null;
      const candidates = [...visible].sort(
        (a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0),
      );
      return candidates[candidates.length - 1] ?? null;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          if (!id) return;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        });
        const next = pickActive();
        if (next) setActiveId(next);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-112px 0px -70% 0px`,
      },
    );

    elements.forEach((el) => observer.observe(el));

    const hash = window.location.hash.replace(/^#/, "");
    if (hash && ids.includes(hash)) setActiveId(hash);

    return () => observer.disconnect();
  }, [ids]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="hidden lg:block shrink-0 self-stretch"
      style={{ width: ON_THIS_PAGE_RAIL_WIDTH[railWidth] }}
      data-rail-width={railWidth}
    >
      <div className="sticky top-24">
        <div className="rounded-xl border border-border/35 bg-background/30 px-3 py-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-sans mb-2.5">
            On this page
          </p>
          <ol className="list-none pl-0 space-y-1.5">
            {items.map((item) => {
              const active = item.id === activeId;
              const depth = item.depth ?? 0;
              const isSub = depth > 0;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToOnThisPageSection(item.id)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "w-full text-left leading-snug transition-colors border-l -ml-px",
                      isSub
                        ? "pl-2.5 ml-3 text-[11px] leading-snug"
                        : "pl-2.5 text-[13px] leading-relaxed",
                      active
                        ? isSub
                          ? "border-primary/60 text-primary/80 font-medium"
                          : "border-primary/80 text-primary/90 font-medium"
                        : isSub
                          ? "border-transparent text-foreground/40 hover:text-foreground/60 hover:border-foreground/15"
                          : "border-transparent text-foreground/50 hover:text-foreground/70 hover:border-foreground/20",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}
