import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
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
              <div className="min-h-0 flex-1 overflow-auto">{children}</div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
