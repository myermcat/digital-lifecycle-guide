import type { ThreadCoreStripContent } from "@/lib/thread-core-strip";
import { threadCoreStripAltText } from "@/lib/thread-core-strip";
import { guideStaticCardClassName } from "@/lib/guide-cards";
import { cn } from "@/lib/utils";

const coreStripAccentText = "text-primary/70";
const coreStripAccentBar = "bg-primary/70";

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
          <div
            key={tile.label}
            className={cn(
              "flex min-w-0 flex-col overflow-hidden rounded-md border border-border/75",
              guideStaticCardClassName,
            )}
          >
            <div className={cn("h-1 shrink-0", coreStripAccentBar)} aria-hidden="true" />
            <div className="flex flex-1 flex-col gap-1 px-3.5 py-3">
              <p
                className={cn(
                  "font-serif text-sm font-semibold leading-snug",
                  coreStripAccentText,
                )}
              >
                {tile.label}
              </p>
              <p className="font-sans text-xs leading-snug text-muted-foreground/75">
                {tile.gloss}
              </p>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
