import type { ReactNode } from "react";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import type { BoldPhrase } from "@/components/ProseWithExternalLinks";
import { guideListIndent } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

const phaseQuoteClassName =
  "mt-6 md:mt-8 border-l-4 border-l-primary/35 pl-4 md:pl-5 font-serif text-lg md:text-xl text-foreground/90 leading-snug";

export type PhaseQuoteContent = {
  lead: string;
  leadBold?: readonly BoldPhrase[];
  items: readonly string[];
  takeaway?: string;
  /** Defaults to true; set false when the takeaway is plain prose. */
  takeawayBold?: boolean;
};

export function phaseQuotePlainText(quote: PhaseQuoteContent): string {
  return [quote.lead, ...quote.items, ...(quote.takeaway ? [quote.takeaway] : [])].join(" ");
}

export function PhaseQuote({
  quote,
  children,
  className,
  placeholder = "One-line description coming soon.",
}: {
  quote?: PhaseQuoteContent;
  children?: ReactNode;
  className?: string;
  placeholder?: string;
}) {
  return (
    <blockquote className={cn(phaseQuoteClassName, className)}>
      {quote ? (
        <>
          <p>
            {quote.leadBold?.length
              ? proseWithMixedLinks(quote.lead, { bold: [...quote.leadBold] })
              : quote.lead}
          </p>
          <ul className={`mt-2 list-disc space-y-0.5 ${guideListIndent}`}>
            {quote.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {quote.takeaway ? (
            <p
              className={cn(
                "mt-3",
                quote.takeawayBold !== false && "font-semibold text-foreground",
              )}
            >
              {quote.takeaway}
            </p>
          ) : null}
        </>
      ) : (
        (children ?? (
          <span className="text-foreground/45 italic">{placeholder}</span>
        ))
      )}
    </blockquote>
  );
}
