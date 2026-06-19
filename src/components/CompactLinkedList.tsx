import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import type { PlaceholderPhraseLink } from "@/lib/placeholder-sources";
import { guideArrowLeadGroup, guideArrowLeadList, guideArrowListIcon } from "@/lib/guide-typography";
import { guideProse, guideProseTight, guideLink } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export type CompactLinkedItem = {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
};

export type ArrowLeadItem = {
  lead: string;
  body: ReactNode;
  /** Optional extra lines below the body, with looser spacing between them. */
  bodyLines?: string[];
  href?: string;
};

export type InlineArrowLeadItem = {
  lead: string;
  body: ReactNode;
  placeholderLinks?: PlaceholderPhraseLink[];
};

/**
 * Arrow bullet with bold lead and body on one line — as in "What work stays yours".
 * Use variant="primary" for a brown bold lead; body stays neutral foreground.
 */
export function InlineArrowLeadList({
  items,
  className,
  variant = "default",
}: {
  items: InlineArrowLeadItem[];
  className?: string;
  variant?: "default" | "primary";
}) {
  const leadClass =
    variant === "primary"
      ? "font-semibold text-primary"
      : "font-semibold text-foreground/90";

  return (
    <ul className={cn(`${guideProseTight} space-y-3 list-none pl-0`, className)}>
      {items.map((item) => {
        const body =
          typeof item.body === "string" && item.placeholderLinks?.length
            ? proseWithMixedLinks(item.body, { placeholder: item.placeholderLinks })
            : item.body;

        return (
          <li key={item.lead} className="flex items-start gap-2.5">
            <GuideArrowBullet inline />
            <span className="min-w-0 flex-1">
              <span className={leadClass}>{item.lead}</span> {body}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Small arrow marker for guide bullet lists. Use with your own text layout. */
export function GuideArrowBullet({
  className,
  inline = false,
}: {
  className?: string;
  /** Tighter line box for guideProseTight inline lists. */
  inline?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center",
        inline ? "h-[1.35em]" : "h-[1.45em]",
        guideArrowListIcon,
        className,
      )}
      aria-hidden
    >
      <ArrowRight className="size-[0.85em] shrink-0" strokeWidth={2} />
    </span>
  );
}

/** Arrow + primary lead + body. Prefer importing from @/lib/guide-lists. */
export function ArrowLeadList({
  items,
  className,
}: {
  items: ArrowLeadItem[];
  className?: string;
}) {
  return (
    <ul className={cn(guideArrowLeadList, className)}>
      {items.map((item) => (
        <li key={item.lead} className="flex items-start gap-2.5">
          <GuideArrowBullet />
          <div className={cn("min-w-0 flex-1", guideArrowLeadGroup)}>
            <p className="mb-0">
              {item.href ? (
                <a
                  href={item.href}
                  className={`font-serif text-base md:text-[1.05rem] leading-snug ${guideLink}`}
                >
                  {item.lead}
                </a>
              ) : (
                <span className={`${guideProse} font-medium text-primary leading-snug`}>
                  {item.lead}
                </span>
              )}
            </p>
            <p className={`${guideProseTight} text-foreground/65 leading-snug`}>{item.body}</p>
            {item.bodyLines && item.bodyLines.length > 0 ? (
              <div className="mt-2 space-y-1.5">
                {item.bodyLines.map((line) => (
                  <p key={line} className={`${guideProseTight} text-foreground/65`}>
                    {line}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CompactLinkedList({ items }: { items: CompactLinkedItem[] }) {
  return (
    <ul className="mt-5 space-y-3 list-none pl-0">
      {items.map((item) => (
        <li
          key={item.href}
          className={`${guideProseTight} rounded-xl border border-border/80 px-4 py-3.5`}
          style={{ backgroundColor: "var(--phase-group)" }}
        >
          <span className="font-semibold text-foreground/90">{item.title}</span> {item.body}{" "}
          <a href={item.href} className={guideLink}>
            {item.linkLabel}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function CompactExitList({
  items,
}: {
  items: { lead: string; rest: string; href?: string }[];
}) {
  return (
    <ArrowLeadList
      className="mt-4"
      items={items.map((item) => ({
        lead: item.lead,
        body: item.rest,
        href: item.href,
      }))}
    />
  );
}
