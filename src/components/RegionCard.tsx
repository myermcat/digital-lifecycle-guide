import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

export function RegionCard({
  heading,
  expandedIntro,
  subItems,
  deepLink,
  visual,
}: RegionCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative aspect-[4/5] w-full rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring flex flex-col items-center justify-between p-6 overflow-hidden"
      >
        <span className="relative font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          {heading}
        </span>
        {visual && (
          <span
            aria-hidden="true"
            className="pointer-events-none flex items-end justify-center w-full flex-1 pt-4 opacity-25 group-hover:opacity-40 transition-opacity"
          >
            {visual}
          </span>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
              {heading}
            </DialogTitle>
          </DialogHeader>

          <p className="text-base text-foreground/90 leading-relaxed">
            {expandedIntro}
          </p>

          {subItems && (
            <div className="mt-2 border-t border-border pt-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Phases
              </p>
              <div className="flex flex-wrap gap-2">
                {subItems.map((s) => (
                  <a
                    key={s.title}
                    href={s.href}
                    title={s.description}
                    className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground hover:bg-muted hover:border-foreground/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          <a
            href={deepLink.href}
            className="inline-block mt-2 text-sm font-medium text-primary underline underline-offset-4 hover:opacity-80"
          >
            {deepLink.label} →
          </a>
        </DialogContent>
      </Dialog>
    </>
  );
}