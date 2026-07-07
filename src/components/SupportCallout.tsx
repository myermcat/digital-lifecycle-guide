import { Link } from "@tanstack/react-router";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import { SUPPORT_CALLOUT_BLOCK } from "@/lib/guide-blocks";
import { SUPPORT_CALLOUT_BODIES, type SupportCalloutVariant } from "@/lib/support-callout";
import { SUPPORT_PATH } from "@/lib/support-path";
import {
  guideProseTight,
  guideSupportCalloutTitle,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

const supportCalloutLink =
  "text-sm font-medium text-primary/65 underline underline-offset-4 transition-colors hover:text-primary/85";

/**
 * **Support callout** — see `SUPPORT_CALLOUT_BLOCK` in `@/lib/guide-blocks`.
 *
 * Doorway-card anatomy: small-caps label, rust heading, prose line, arrow link.
 * Sits after main content and before Further reading and Sources on every page.
 */
export function SupportCallout({
  variant = "generic",
  className,
}: {
  variant?: SupportCalloutVariant;
  className?: string;
}) {
  const body = SUPPORT_CALLOUT_BODIES[variant];

  return (
    <aside
      data-guide-block={SUPPORT_CALLOUT_BLOCK.blockId}
      className={cn(
        "rounded-lg border border-primary/15 bg-muted/20 px-6 py-5 md:px-7 md:py-6",
        className,
      )}
    >
      <p className="text-[10px] uppercase tracking-[0.22em] text-primary/50 font-sans">
        SUPPORT AND COMMUNITIES
      </p>
      <h2
        className={`${guideSupportCalloutTitle} mt-2 mb-1.5 text-primary/70`}
      >
        Need a hand with this?
      </h2>
      <div className="space-y-4">
        <p className={`${guideProseTight} text-foreground/60`}>
          {proseWithMixedLinks(body.text, {
            external: body.externalLinks,
            mailto: body.mailtoLinks,
            placeholderGcNetwork: body.placeholderGcNetworkLinks,
            linkClassName: supportCalloutLink,
          })}
        </p>
        <p>
          <Link to={SUPPORT_PATH} className={supportCalloutLink}>
            Browse the support communities →
          </Link>
        </p>
      </div>
    </aside>
  );
}
