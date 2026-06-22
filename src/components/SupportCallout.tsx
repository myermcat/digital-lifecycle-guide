import { Link } from "@tanstack/react-router";
import { proseWithMixedLinks } from "@/components/ProseWithExternalLinks";
import { SUPPORT_CALLOUT_BLOCK } from "@/lib/guide-blocks";
import { SUPPORT_CALLOUT_BODIES, type SupportCalloutVariant } from "@/lib/support-callout";
import { SUPPORT_PATH } from "@/lib/support-path";
import {
  guideCalloutLabel,
  guideLink,
  guideProseTight,
  guideSupportCalloutTitle,
} from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

/**
 * **Support callout** — see `SUPPORT_CALLOUT_BLOCK` in `@/lib/guide-blocks`.
 *
 * Doorway-card anatomy: small-caps label, rust heading, prose line, arrow link.
 * Sits before Further reading and Sources on every page.
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
        "rounded-lg border border-primary/35 bg-background px-6 py-6 md:px-8 md:py-7",
        className,
      )}
    >
      <p className={guideCalloutLabel}>SUPPORT AND COMMUNITIES</p>
      <h2 className={`${guideSupportCalloutTitle} mt-2 mb-1.5`}>Need a hand with this?</h2>
      <div className="space-y-4">
        <p className={guideProseTight}>
          {proseWithMixedLinks(body.text, {
            external: body.externalLinks,
            mailto: body.mailtoLinks,
          })}
        </p>
        <p>
          <Link to={SUPPORT_PATH} className={`text-sm ${guideLink}`}>
            Browse the support communities →
          </Link>
        </p>
      </div>
    </aside>
  );
}
