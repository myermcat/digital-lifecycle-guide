import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  externalLinkUrl,
  getExternalLink,
  isGcNetworkOnly,
  type ExternalLinkKey,
} from "@/lib/external-links";
import { cn } from "@/lib/utils";

const GOVERNING_INSTRUMENT_LABEL = "Governing instrument";
const SUPPORTING_REFERENCE_LABEL = "Supporting reference";

export type SourceItem = {
  label: string;
  href?: string;
  linkKey?: ExternalLinkKey;
  description?: string;
  /** Lower-emphasis note shown below the link, in the right column. */
  note?: string;
  comingSoon?: boolean;
  /** GC-network-only source (placeholder or registry link). */
  gcNetworkOnly?: boolean;
  /** Optional styling hint for low-emphasis citations. */
  tone?: "default" | "very-light";
};

type SourceSection = {
  label: string;
  items: SourceItem[];
};

const sourceLinkByTone: Record<NonNullable<SourceItem["tone"]>, string> = {
  default:
    "text-muted-foreground/40 underline underline-offset-4 hover:text-muted-foreground/55 transition-colors",
  "very-light":
    "text-muted-foreground/25 underline underline-offset-4 hover:text-muted-foreground/40 transition-colors",
};

const sourceLinkGcNetwork =
  "text-muted-foreground/30 underline decoration-dotted decoration-muted-foreground/25 underline-offset-4 hover:text-muted-foreground/45 transition-colors";

const sourceSectionHeading =
  "text-xs uppercase tracking-[0.18em] font-normal text-muted-foreground/35";

function sourceLinkText(item: SourceItem, href: string | undefined): string {
  if (item.description) {
    return item.description;
  }
  if (item.linkKey) {
    return getExternalLink(item.linkKey).description;
  }
  return href ?? "";
}

function groupSourceSections(items: SourceItem[]): SourceSection[] {
  const governing = items.filter((item) => item.label === GOVERNING_INSTRUMENT_LABEL);
  const supporting = items.filter((item) => item.label === SUPPORTING_REFERENCE_LABEL);
  const otherLabels: string[] = [];

  for (const item of items) {
    if (
      item.label !== GOVERNING_INSTRUMENT_LABEL &&
      item.label !== SUPPORTING_REFERENCE_LABEL &&
      !otherLabels.includes(item.label)
    ) {
      otherLabels.push(item.label);
    }
  }

  const sections: SourceSection[] = [];

  if (governing.length > 0) {
    sections.push({ label: GOVERNING_INSTRUMENT_LABEL, items: governing });
  }
  if (supporting.length > 0) {
    sections.push({ label: SUPPORTING_REFERENCE_LABEL, items: supporting });
  }
  for (const label of otherLabels) {
    sections.push({
      label,
      items: items.filter((item) => item.label === label),
    });
  }

  return sections;
}

function SourceLinkItem({ item }: { item: SourceItem }) {
  const href = item.linkKey ? externalLinkUrl(item.linkKey) : item.href;
  const gcNetworkOnly =
    item.gcNetworkOnly ?? (item.linkKey ? isGcNetworkOnly(item.linkKey) : false);
  const isInternal = href?.startsWith("/") ?? false;
  const tone = item.tone ?? "default";
  const linkText = sourceLinkText(item, href);

  return (
    <li className="min-w-0">
      {href ? (
        <>
          <a
            href={href}
            className={gcNetworkOnly ? sourceLinkGcNetwork : sourceLinkByTone[tone]}
            title={
              gcNetworkOnly ? "Only available on the Government of Canada network." : undefined
            }
            {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          >
            {linkText}
          </a>
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
    </li>
  );
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
  const sections = groupSourceSections(items);

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
          <div
            id={panelId}
            className="mt-3 border-t border-border/40 pt-3 text-sm leading-[1.7] text-muted-foreground/50 space-y-4"
          >
            {sections.map((section, sectionIndex) => (
              <section
                key={section.label}
                className={cn(sectionIndex > 0 && "border-t border-border/40 pt-4")}
              >
                <h3 className={sourceSectionHeading}>{section.label}</h3>
                <ul className="mt-2 list-none space-y-2 pl-0">
                  {section.items.map((item) => {
                    const key = item.linkKey ?? item.href ?? item.description ?? item.label;
                    return <SourceLinkItem key={key} item={item} />;
                  })}
                </ul>
              </section>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
