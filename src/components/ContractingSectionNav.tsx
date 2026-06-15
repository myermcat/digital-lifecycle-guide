import { Link } from "@tanstack/react-router";
import {
  PROCUREMENT_GOOD_LOOKS_CARDS,
  PROCUREMENT_LANDING,
  PROCUREMENT_LANDING_PATH,
} from "@/lib/procurement-landing";
import { guideLink } from "@/lib/guide-typography";

function slugFromCardHref(href: string) {
  return href.split("/").pop() ?? "";
}

export function getContractingSectionNav(slug: string) {
  const index = PROCUREMENT_GOOD_LOOKS_CARDS.findIndex(
    (card) => slugFromCardHref(card.href) === slug,
  );

  if (index === -1) {
    return null;
  }

  const prev =
    index === 0
      ? { href: PROCUREMENT_LANDING_PATH, label: PROCUREMENT_LANDING.title }
      : {
          href: PROCUREMENT_GOOD_LOOKS_CARDS[index - 1].href,
          label: PROCUREMENT_GOOD_LOOKS_CARDS[index - 1].label,
        };

  const next =
    index === PROCUREMENT_GOOD_LOOKS_CARDS.length - 1
      ? { href: PROCUREMENT_LANDING_PATH, label: PROCUREMENT_LANDING.title }
      : {
          href: PROCUREMENT_GOOD_LOOKS_CARDS[index + 1].href,
          label: PROCUREMENT_GOOD_LOOKS_CARDS[index + 1].label,
        };

  return { prev, next };
}

export function ContractingSectionNav({ slug }: { slug: string }) {
  const nav = getContractingSectionNav(slug);
  if (!nav) return null;

  const linkClass = `${guideLink} text-sm font-sans`;

  return (
    <nav
      aria-label="Procurement sections"
      className="mt-8 flex items-center justify-between gap-4 border-t border-border/60 pt-6"
    >
      <Link to={nav.prev.href} className={linkClass}>
        ← Previous section
      </Link>
      <Link to={nav.next.href} className={`${linkClass} text-right`}>
        Next section →
      </Link>
    </nav>
  );
}
