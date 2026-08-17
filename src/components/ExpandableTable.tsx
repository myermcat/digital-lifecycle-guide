import { useCallback, useRef, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Wraps a wide table in a scroll box that keeps its sticky header and sticky
 * first column.
 *
 * There was a full-screen mode here. It went on 17 August: the tables are split
 * by topic now, so each one is short enough to read in the column, and a button
 * on every table was more furniture than help.
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
  const cleanupRef = useRef<(() => void) | null>(null);

  return useCallback((el: T | null) => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let axis: "x" | "y" | null = null;
    let glideId: number | null = null;
    // last few samples, so the throw speed comes from the end of the gesture
    // rather than its average
    let samples: { pos: number; at: number }[] = [];

    const stopGlide = () => {
      if (glideId !== null) cancelAnimationFrame(glideId);
      glideId = null;
    };

    const onStart = (event: TouchEvent) => {
      stopGlide();
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      startLeft = el.scrollLeft;
      startTop = el.scrollTop;
      axis = null;
      samples = [];
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

      if (axis === "y") {
        const next = startTop + dy;
        // at either end, let the page take the gesture
        if (next < 0 || next > el.scrollHeight - el.clientHeight) return;
        event.preventDefault();
        el.scrollTop = next;
      } else {
        event.preventDefault();
        el.scrollLeft = startLeft + dx;
      }

      const pos = axis === "x" ? el.scrollLeft : el.scrollTop;
      samples.push({ pos, at: event.timeStamp });
      if (samples.length > 5) samples.shift();
    };

    // A finger lift should throw the table, the way native scrolling does.
    // Driving the scroll by hand costs us the browser's momentum, so it is
    // measured from the last few samples and replayed with friction.
    const onEnd = () => {
      if (axis === null || samples.length < 2) return;
      const first = samples[0];
      const last = samples[samples.length - 1];
      const elapsed = last.at - first.at;
      if (elapsed <= 0) return;

      let velocity = ((last.pos - first.pos) / elapsed) * 16; // pixels per frame
      if (Math.abs(velocity) < 0.6) return;
      velocity = Math.max(-90, Math.min(90, velocity));

      const horizontal = axis === "x";
      const max = horizontal ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight;

      const step = () => {
        velocity *= 0.95;
        const current = horizontal ? el.scrollLeft : el.scrollTop;
        const next = Math.max(0, Math.min(max, current + velocity));
        if (horizontal) el.scrollLeft = next;
        else el.scrollTop = next;
        const stuck = next === 0 || next === max;
        if (Math.abs(velocity) < 0.4 || stuck) {
          glideId = null;
          return;
        }
        glideId = requestAnimationFrame(step);
      };
      glideId = requestAnimationFrame(step);
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("touchcancel", stopGlide, { passive: true });
    cleanupRef.current = () => {
      stopGlide();
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", stopGlide);
    };
  }, []);
}

export function ExpandableTable({
  title,
  children,
  className,
  maxHeight = "80vh",
}: {
  /** Names the scroll region for anyone reading with a screen reader. */
  title: string;
  children: ReactNode;
  className?: string;
  /** Height of the scroll box. */
  maxHeight?: string;
}) {
  const inlineScrollRef = useAxisLockedScroll<HTMLDivElement>();

  return (
    <div className={cn("relative", className)}>
      <p className="mb-2 flex items-start gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-[0.78rem] leading-snug text-muted-foreground sm:hidden">
        <RotateCcw className="mt-[0.15rem] h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>
          This table is wide. Turn the phone sideways to read it, and scroll sideways inside the
          table to reach the later columns.
        </span>
      </p>

      <div
        ref={inlineScrollRef}
        role="region"
        aria-label={title}
        tabIndex={0}
        className="overflow-auto rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ maxHeight }}
      >
        {children}
      </div>
    </div>
  );
}
