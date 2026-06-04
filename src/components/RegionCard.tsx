import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHydrated } from "@/hooks/use-hydrated";
import { guideProse } from "@/lib/guide-typography";

export interface SubItem {
  title: string;
  description: string;
  href: string;
}

interface RegionCardProps {
  heading: string;
  expandedIntro: string;
  subItems?: SubItem[];
  deepLink: { href: string; label: string };
  visual?: ReactNode;
}

function isInternalHref(href: string) {
  return href.startsWith("/");
}

export function RegionCard({
  heading,
  expandedIntro,
  subItems,
  deepLink,
  visual,
}: RegionCardProps) {
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);

  // Radix can leave body { pointer-events: none } if a dialog unmounts abruptly.
  useEffect(() => {
    if (!open) {
      document.body.style.pointerEvents = "";
    }
    return () => {
      document.body.style.pointerEvents = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative aspect-[4/5] w-full rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring flex flex-col items-center justify-center gap-3 p-6 overflow-hidden cursor-pointer"
      >
        <span className="relative font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          {heading}
        </span>
        {visual && (
          <span
            aria-hidden="true"
            className="pointer-events-none flex items-center justify-center w-full opacity-25 group-hover:opacity-40 transition-opacity"
          >
            {visual}
          </span>
        )}
      </button>

      {hydrated && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg bg-card">
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
                {heading}
              </DialogTitle>
            </DialogHeader>

            <p className={guideProse}>{expandedIntro}</p>

            {subItems && (
              <div className="mt-2 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  {subItems.length === 3
                    ? "Three phases:"
                    : `${subItems.length} phases:`}
                </p>
                <div className="flex flex-wrap gap-2">
                  {subItems.map((s) =>
                    isInternalHref(s.href) ? (
                      <Link
                        key={s.title}
                        to={s.href}
                        title={s.description}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground hover:bg-muted hover:border-foreground/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {s.title}
                      </Link>
                    ) : (
                      <a
                        key={s.title}
                        href={s.href}
                        title={s.description}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground hover:bg-muted hover:border-foreground/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {s.title}
                      </a>
                    ),
                  )}
                </div>
              </div>
            )}

            {isInternalHref(deepLink.href) ? (
              <Link
                to={deepLink.href}
                onClick={() => setOpen(false)}
                className="inline-block mt-2 text-sm font-medium text-primary underline underline-offset-4 hover:opacity-80"
              >
                {deepLink.label} →
              </Link>
            ) : (
              <a
                href={deepLink.href}
                onClick={() => setOpen(false)}
                className="inline-block mt-2 text-sm font-medium text-primary underline underline-offset-4 hover:opacity-80"
              >
                {deepLink.label} →
              </a>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
