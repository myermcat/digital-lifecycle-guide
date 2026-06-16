import { useEffect, useMemo, useState } from "react";
import { useOnThisPageSections } from "@/hooks/use-on-this-page-sections";
import { cn } from "@/lib/utils";

/** Matches section `scroll-mt-24` (6rem) + a little air. */
const HEADER_OFFSET_PX = 96 + 16;

function getTargetScrollTop(element: HTMLElement) {
  return element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
}

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const top = Math.max(0, getTargetScrollTop(target));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

export function OnThisPageRail({ rootId }: { rootId?: string }) {
  const items = useOnThisPageSections(rootId);
  const [activeId, setActiveId] = useState<string | null>(null);

  const ids = useMemo(() => items.map((i) => i.id), [items]);

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
        rootMargin: `-${HEADER_OFFSET_PX}px 0px -70% 0px`,
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
      className="hidden lg:block w-[240px] shrink-0 self-stretch"
    >
      <div className="sticky top-24">
        <div className="rounded-xl border border-border/35 bg-background/30 px-3 py-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-sans mb-2.5">
            On this page
          </p>
          <ol className="list-none pl-0 space-y-1.5">
            {items.map((item) => {
              const active = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "w-full text-left text-[13px] leading-relaxed transition-colors border-l pl-2.5 -ml-px",
                      active
                        ? "border-primary/80 text-primary/90 font-medium"
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
