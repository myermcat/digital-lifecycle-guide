import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Maximize2, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Wraps a wide table so it can be opened over the whole window.
 *
 * The tables in this guide are wider than the prose measure and taller than a
 * screen, which makes them awkward to read in the column. Expanding gives the
 * table the whole viewport, and the table keeps its own sticky header and sticky
 * first column inside.
 *
 * Escape closes it, as does the button. Page scrolling is held while it is open,
 * so closing returns the reader to the same place on the page.
 */

/**
 * Locks a touch gesture to one axis.
 *
 * A touch scroll container pans freely in two dimensions, so on a phone a wide
 * table drifts diagonally and the reader loses their row and their column at the
 * same time. A trackpad does not behave that way. This decides the axis from the
 * first few pixels of movement and drives that axis only, releasing to the page
 * when the container reaches its vertical end so the page can carry on scrolling.
 */
function useAxisLockedScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let axis: "x" | "y" | null = null;

    const onStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      startLeft = el.scrollLeft;
      startTop = el.scrollTop;
      axis = null;
    };

    const onMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const dx = startX - touch.clientX;
      const dy = startY - touch.clientY;

      if (axis === null) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }

      if (axis === "x") {
        event.preventDefault();
        el.scrollLeft = startLeft + dx;
        return;
      }

      const next = startTop + dy;
      const atEnd = next < 0 || next > el.scrollHeight - el.clientHeight;
      if (atEnd) return; // let the page take over at the ends
      event.preventDefault();
      el.scrollTop = next;
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
    };
  }, []);

  return ref;
}

export function ExpandableTable({
  title,
  children,
  className,
  maxHeight = "80vh",
}: {
  /** Named on the bar while expanded, so the reader knows what they opened. */
  title: string;
  children: ReactNode;
  className?: string;
  /** Height of the scroll box when not expanded. */
  maxHeight?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const inlineScrollRef = useAxisLockedScroll<HTMLDivElement>();
  const expandedScrollRef = useAxisLockedScroll<HTMLDivElement>();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [expanded]);

  const scrollBox = (
    <div
      ref={inlineScrollRef}
      className={cn(
        "overflow-auto rounded-lg border border-border",
        expanded ? "h-full rounded-none border-0" : null,
      )}
      style={expanded ? undefined : { maxHeight }}
    >
      {children}
    </div>
  );

  return (
    <div className={cn("relative", className)}>
      <p className="mb-2 flex items-start gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-[0.78rem] leading-snug text-muted-foreground sm:hidden">
        <RotateCcw className="mt-[0.15rem] h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>
          This table is wide. Turn the phone sideways to read it, or open it full
          screen. Scroll sideways inside the table to reach the later columns.
        </span>
      </p>

      <div className="mb-2 flex justify-end">
        <button
          ref={openerRef}
          type="button"
          onClick={() => setExpanded(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-[0.72rem] font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Maximize2 className="h-3.5 w-3.5" aria-hidden />
          Open full screen
        </button>
      </div>

      {scrollBox}

      {expanded && mounted
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className="fixed inset-0 z-[9999] flex flex-col bg-background"
            >
              <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 py-3 md:px-6">
                <p className="truncate text-sm font-semibold text-foreground">
                  {title}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-[0.78rem] font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-4 w-4" aria-hidden />
                  Close
                  <span className="ml-1 rounded border border-border px-1 text-[0.62rem] uppercase tracking-wide text-muted-foreground/80">
                    esc
                  </span>
                </button>
              </div>
              <div ref={expandedScrollRef} className="min-h-0 flex-1 overflow-auto">
                {children}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
