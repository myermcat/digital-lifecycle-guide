import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

export interface SubItem {
  title: string;
  description: string;
  href: string;
}

interface RegionCardProps {
  heading: string;
  shortDescription: string;
  expandedIntro: string;
  subItems?: SubItem[];
  deepLink: { href: string; label: string };
}

export function RegionCard({
  heading,
  shortDescription,
  expandedIntro,
  subItems,
  deepLink,
}: RegionCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative rounded-2xl border border-border bg-card/90 backdrop-blur-sm transition-all duration-300 ${
        open ? "shadow-lg" : "shadow-sm hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left p-6 md:p-8 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              {heading}
            </h3>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              {shortDescription}
            </p>
          </div>
          <ChevronDown
            className={`mt-1 h-5 w-5 text-muted-foreground shrink-0 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-2">
          <div className="border-t border-border pt-5 relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Collapse"
              className="absolute -top-1 right-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-base text-foreground/90 leading-relaxed">{expandedIntro}</p>

            {subItems && (
              <ul className="mt-5 space-y-3">
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
              className="inline-block mt-5 text-sm font-medium text-primary underline underline-offset-4 hover:opacity-80"
            >
              {deepLink.label} →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}