import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import type { ThreadCoreStripContent } from "@/lib/thread-core-strip";
import { threadCoreStripAltText } from "@/lib/thread-core-strip";
import { guideStaticCardClassName } from "@/lib/guide-cards";
import { cn } from "@/lib/utils";

const coreStripAccentText = "text-primary/70";
const coreStripAccentBar = "bg-primary/70";

function CoreStripTile({ label, gloss }: { label: string; gloss: string }) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col overflow-hidden rounded-md border border-border/75",
        guideStaticCardClassName,
      )}
    >
      <div className={cn("h-1 shrink-0", coreStripAccentBar)} aria-hidden="true" />
      <div className="flex flex-1 flex-col gap-1 px-3.5 py-3">
        <p className={cn("font-serif text-sm font-semibold leading-snug", coreStripAccentText)}>
          {label}
        </p>
        <p className="font-sans text-xs leading-snug text-muted-foreground/75">{gloss}</p>
      </div>
    </div>
  );
}

/**
 * Static pillar illustration for thread landing pages — not interactive.
 */
export function ThreadCoreStrip({
  content,
  className,
}: {
  content: ThreadCoreStripContent;
  className?: string;
}) {
  const tileCount = content.tiles.length;
  const sequenced = content.sequenced === true;

  return (
    <figure
      role="img"
      aria-label={threadCoreStripAltText(content)}
      className={cn(
        "mt-8 md:mt-10 cursor-default pointer-events-none select-none not-prose",
        className,
      )}
    >
      <p className={cn("font-sans text-[10px] uppercase tracking-[0.22em]", coreStripAccentText)}>
        {content.heading}
      </p>
      {sequenced ? (
        <div
          aria-hidden="true"
          className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2"
        >
          {content.tiles.map((tile, index) => (
            <Fragment key={tile.label}>
              {index > 0 ? (
                <ChevronRight
                  className="mx-auto size-5 shrink-0 text-primary/45 sm:mx-0 sm:self-center"
                  aria-hidden
                />
              ) : null}
              <CoreStripTile label={tile.label} gloss={tile.gloss} />
            </Fragment>
          ))}
        </div>
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "mt-3 grid gap-3",
            tileCount === 3 && "grid-cols-1 sm:grid-cols-3",
            tileCount === 4 && "grid-cols-1 min-[28rem]:grid-cols-2 lg:grid-cols-4",
            tileCount !== 3 && tileCount !== 4 && "grid-cols-1 sm:grid-cols-2",
          )}
        >
          {content.tiles.map((tile) => (
            <CoreStripTile key={tile.label} label={tile.label} gloss={tile.gloss} />
          ))}
        </div>
      )}
    </figure>
  );
}
