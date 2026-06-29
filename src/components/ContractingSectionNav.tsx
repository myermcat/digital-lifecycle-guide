import { Link } from "@tanstack/react-router";
import {
  PROCUREMENT_GOOD_LOOKS_CARDS,
  PROCUREMENT_LANDING,
  PROCUREMENT_LANDING_PATH,
  procurementSubPath,
} from "@/lib/procurement-landing";
import { PROCUREMENT_SUBPAGES, isProcurementSubPageSlug } from "@/lib/contracting-subpages";
import { OPTIONS_ANALYSIS } from "@/lib/options-analysis-content";
import { OPTIONS_ANALYSIS_PATH, GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import { GOOD_CONTRACT } from "@/lib/good-contract-content";
import { guideLink } from "@/lib/guide-typography";

function slugFromHref(href: string) {
  return href.split("/").pop() ?? "";
}

function cardMatchesSlug(cardHref: string, slug: string) {
  return cardHref === procurementSubPath(slug) || slugFromHref(cardHref) === slug;
}

function navLabelForHref(href: string): string {
  if (href === PROCUREMENT_LANDING_PATH) {
    return PROCUREMENT_LANDING.title;
  }
  if (href === GOOD_CONTRACT_PATH) {
    return GOOD_CONTRACT.title;
  }
  if (href === OPTIONS_ANALYSIS_PATH) {
    return OPTIONS_ANALYSIS.title;
  }
  const slug = slugFromHref(href);
  if (isProcurementSubPageSlug(slug)) {
    return PROCUREMENT_SUBPAGES[slug].title;
  }
  return slug;
}

export function getContractingSectionNav(slug: string) {
  const index = PROCUREMENT_GOOD_LOOKS_CARDS.findIndex((card) =>
    cardMatchesSlug(card.href, slug),
  );

  if (index === -1) {
    return null;
  }

  const prev =
    index === 0
      ? { href: PROCUREMENT_LANDING_PATH, label: navLabelForHref(PROCUREMENT_LANDING_PATH) }
      : {
          href: PROCUREMENT_GOOD_LOOKS_CARDS[index - 1].href,
          label: navLabelForHref(PROCUREMENT_GOOD_LOOKS_CARDS[index - 1].href),
        };

  const next =
    index === PROCUREMENT_GOOD_LOOKS_CARDS.length - 1
      ? { href: PROCUREMENT_LANDING_PATH, label: navLabelForHref(PROCUREMENT_LANDING_PATH) }
      : {
          href: PROCUREMENT_GOOD_LOOKS_CARDS[index + 1].href,
          label: navLabelForHref(PROCUREMENT_GOOD_LOOKS_CARDS[index + 1].href),
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
        ← {nav.prev.label}
      </Link>
      <Link to={nav.next.href} className={`${linkClass} text-right`}>
        {nav.next.label} →
      </Link>
    </nav>
  );
}
