import { Link } from "@tanstack/react-router";
import { HeaderSearch } from "@/components/HeaderSearch";
import { OnThisPageNav } from "@/components/OnThisPageNav";
import { ALL_PAGES_PATH } from "@/lib/all-pages-path";
import { REGIONS } from "@/lib/guide-strings";

/**
 * Site header — calm, editorial chrome that sits above the page content.
 * Carries the guide wordmark, a thin red Government-of-Canada accent,
 * the region links, and (when a `rootId` is provided) an inline
 * "On this page" nav drawn from the page's sections.
 */
export function GuideHeader({ rootId }: { rootId?: string }) {
  const regions = [REGIONS.create, REGIONS.live, REGIONS.sunset];

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center gap-6">
          {/* Wordmark — links home */}
          <Link
            to="/"
            className="group flex items-baseline gap-2 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 translate-y-[1px]"
              style={{ backgroundColor: "var(--gc-red)" }}
            />
            <span className="font-serif text-base md:text-lg font-semibold tracking-tight text-foreground leading-none">
              The Digital Lifecycle Guide
            </span>
          </Link>

          {/* Region nav — hides labels on small screens, keeps tappable */}
          <nav
            aria-label="Regions"
            className="hidden md:flex items-center gap-5 ml-2"
          >
            {regions.map((r) => (
              <Link
                key={r.id}
                to={r.href}
                className="text-[11px] uppercase tracking-[0.18em] text-foreground/65 hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}
              >
                {r.title}
              </Link>
            ))}
            <Link
              to={ALL_PAGES_PATH}
              className="text-[11px] uppercase tracking-[0.18em] text-foreground/55 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              All pages
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <HeaderSearch />
            {rootId ? (
              <div className="lg:hidden">
                <OnThisPageNav rootId={rootId} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* Thin GoC-red accent under the header */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--gc-red) 25%, var(--gc-red) 75%, transparent)",
          opacity: 0.4,
        }}
      />
    </header>
  );
}