import { Link } from "@tanstack/react-router";
import { guideLink } from "@/lib/guide-typography";
import { ALL_PAGES_PATH } from "@/lib/all-pages-path";

/** Quiet site footer — reachable from every page without shaping the reader journey. */
export function GuideFooter() {
  return (
    <footer className="mt-14 md:mt-16 pt-5 border-t border-border/40">
      <Link
        to={ALL_PAGES_PATH}
        className={`text-xs tracking-wide text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors ${guideLink}`}
      >
        All pages
      </Link>
    </footer>
  );
}
