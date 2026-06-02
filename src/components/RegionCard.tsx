import { useState } from "react";
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
}

export function RegionCard({
  heading,
  expandedIntro,
  subItems,
  deepLink,
}: RegionCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative aspect-[4/5] w-full rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center justify-center p-6"
      >
        <span className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          {heading}
        </span>
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
            <ul className="mt-2 space-y-2 border-t border-border pt-4">
              {subItems.map((s) => (
                <li key={s.title}>
                  <a
                    href={s.href}
                    className="block rounded-lg p-3 -mx-3 hover:bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="font-medium text-foreground underline decoration-dotted underline-offset-4">
                      {s.title}
                    </span>
                    <span className="text-muted-foreground">: {s.description}</span>
                  </a>
                </li>
              ))}
            </ul>
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