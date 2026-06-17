import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  externalLinkUrl,
  isGcNetworkOnly,
  type ExternalLinkKey,
} from "@/lib/external-links";
import { cn } from "@/lib/utils";

export type SourceItem = {
  label: string;
  href?: string;
  linkKey?: ExternalLinkKey;
  description?: string;
  comingSoon?: boolean;
};

const sourceLink =
  "text-muted-foreground/40 underline underline-offset-4 hover:text-muted-foreground/55 transition-colors";

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
            className="mt-3 space-y-2 list-none pl-0 text-sm leading-[1.7] text-muted-foreground/50 border-t border-border/40 pt-3"
          >
            {items.map((item) => {
              const href = item.linkKey ? externalLinkUrl(item.linkKey) : item.href;
              const gcNetworkOnly = item.linkKey ? isGcNetworkOnly(item.linkKey) : false;
              const key = item.linkKey ?? item.href ?? item.label;
              const isInternal = href?.startsWith("/") ?? false;

              return (
                <li key={key}>
                  <span className="text-muted-foreground/35">{item.label}: </span>
                  {href ? (
                    <>
                      <a
                        href={href}
                        className={sourceLink}
                        {...(isInternal
                          ? {}
                          : { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {item.description ?? href}
                      </a>
                      {gcNetworkOnly ? (
                        <span className="text-muted-foreground/35"> (GC network only)</span>
                      ) : null}
                      {item.comingSoon ? (
                        <span className="text-muted-foreground/35"> (coming soon)</span>
                      ) : null}
                    </>
                  ) : (
                    <span className="text-muted-foreground/40">{item.description}</span>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
