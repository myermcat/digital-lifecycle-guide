import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  externalLinkUrl,
  getExternalLink,
  isGcNetworkOnly,
  type ExternalLinkKey,
} from "@/lib/external-links";
import { cn } from "@/lib/utils";

export type SourceItem = {
  label: string;
  href?: string;
  linkKey?: ExternalLinkKey;
  description?: string;
  /** Lower-emphasis note shown below the link, in the right column. */
  note?: string;
  comingSoon?: boolean;
  /** Optional styling hint for low-emphasis citations. */
  tone?: "default" | "very-light";
};

const sourceLinkByTone: Record<NonNullable<SourceItem["tone"]>, string> = {
  default:
    "text-muted-foreground/40 underline underline-offset-4 hover:text-muted-foreground/55 transition-colors",
  "very-light":
    "text-muted-foreground/25 underline underline-offset-4 hover:text-muted-foreground/40 transition-colors",
};

const sourceLinkGcNetwork =
  "text-muted-foreground/30 underline decoration-dotted decoration-muted-foreground/25 underline-offset-4 hover:text-muted-foreground/45 transition-colors";

function sourceLinkText(item: SourceItem, href: string | undefined): string {
  if (item.description) {
    return item.description;
  }
  if (item.linkKey) {
    return getExternalLink(item.linkKey).description;
  }
  return href ?? "";
}

export function SourcesBlock({
  items,
  className,
}: {
  items: SourceItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section
      id="sources"
      className={cn("scroll-mt-24 w-full", className ?? "mt-10 md:mt-12")}
    >
      <div className="rounded-lg border border-border/55 bg-background/50 px-4 py-3.5 md:px-5 md:py-4">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
          className="group flex w-full items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          <ChevronDown
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground/40 transition-transform duration-200",
              open && "rotate-180",
            )}
            strokeWidth={1.75}
            aria-hidden
          />
          <span className="text-xs uppercase tracking-[0.18em] font-normal text-muted-foreground/35 group-hover:text-muted-foreground/50 transition-colors">
            Sources
          </span>
        </button>
        {open ? (
          <ul
            id={panelId}
            className="mt-3 list-none pl-0 border-t border-border/40 pt-3 text-sm leading-[1.7] text-muted-foreground/50 space-y-2 sm:space-y-0 sm:grid sm:grid-cols-[max-content_1fr] sm:gap-x-[0.6rem] sm:gap-y-2 sm:items-baseline"
          >
            {items.map((item) => {
              const href = item.linkKey ? externalLinkUrl(item.linkKey) : item.href;
              const gcNetworkOnly = item.linkKey ? isGcNetworkOnly(item.linkKey) : false;
              const key = item.linkKey ?? item.href ?? item.label;
              const isInternal = href?.startsWith("/") ?? false;
              const tone = item.tone ?? "default";
              const linkText = sourceLinkText(item, href);

              return (
                <li key={key} className="flex flex-col gap-0.5 sm:contents">
                  <span className="text-muted-foreground/35 shrink-0">{item.label}:</span>
                  <span className="min-w-0">
                    {href ? (
                      <>
                        <a
                          href={href}
                          className={
                            gcNetworkOnly ? sourceLinkGcNetwork : sourceLinkByTone[tone]
                          }
                          title={gcNetworkOnly ? "GC network only" : undefined}
                          {...(isInternal
                            ? {}
                            : { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          {linkText}
                        </a>
                        {gcNetworkOnly ? (
                          <span className="text-muted-foreground/35"> (GC network only)</span>
                        ) : null}
                        {item.comingSoon ? (
                          <span className="text-muted-foreground/35"> (coming soon)</span>
                        ) : null}
                        {item.note ? (
                          <p className="mt-0.5 font-sans text-[10px] leading-[1.35] text-muted-foreground/25">
                            {item.note}
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <span className="text-muted-foreground/40">{item.description}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
