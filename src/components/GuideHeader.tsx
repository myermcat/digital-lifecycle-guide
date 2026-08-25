import { Link } from "@tanstack/react-router";
import { List, MessageCircleQuestion } from "lucide-react";
import { HeaderSearch } from "@/components/HeaderSearch";
import { OnThisPageNav } from "@/components/OnThisPageNav";
import { ALL_PAGES_PATH } from "@/lib/all-pages-path";
import { PHASES } from "@/lib/guide-strings";
import type { OnThisPageItem } from "@/lib/on-this-page";
import { cn } from "@/lib/utils";

/**
 * Site header — calm, editorial chrome that sits above the page content.
 * Carries the guide wordmark, a thin red Government-of-Canada accent,
 * the lifecycle phase links, and (when a `rootId` is provided) an inline
 * "On this page" nav drawn from the page's sections.
 */
export function GuideHeader({
  rootId,
  onThisPageItems,
}: {
  rootId?: string;
  onThisPageItems?: readonly OnThisPageItem[];
}) {
  const lifecyclePhases = [PHASES.create, PHASES.live, PHASES.sunset];

  return (
    <header className="w-full">
      <div className="bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-14 flex items-center gap-3 sm:gap-6">
          <Link
            to="/"
            className="group flex min-w-0 items-baseline gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 translate-y-[1px]"
              style={{ backgroundColor: "var(--gc-red)" }}
            />
            <span className="truncate font-serif text-base md:text-lg font-semibold tracking-tight text-foreground leading-none">
              <span className="sm:hidden">The 2026 Guide</span>
              <span className="hidden sm:inline">The 2026 Digital Lifecycle Guide</span>
            </span>
          </Link>

          <nav
            aria-label="Phases"
            className="hidden md:flex items-center gap-5 ml-2"
          >
            {lifecyclePhases.map((r) => (
              <Link
                key={r.id}
                to={r.href}
                className="text-[11px] uppercase tracking-[0.18em] text-foreground/65 hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}
              >
                {r.title}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5 md:gap-3">
            <div
              aria-hidden="true"
              className="hidden md:block h-4 w-px bg-border/60 mr-0.5"
            />
            <Link
              to={ALL_PAGES_PATH}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-1.5 py-1",
                "text-[11px] text-muted-foreground/75 hover:text-foreground/80 transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
              activeProps={{
                className: "text-foreground/75",
              }}
            >
              <List className="size-3.5 shrink-0 opacity-70" aria-hidden />
              <span className="hidden sm:inline">Index</span>
              <span className="sr-only sm:hidden">Index</span>
            </Link>
            {/* The assistant sits beside the index and the search box, because it is a
                third way into the same content rather than a feature of its own. */}
            <Link
              to="/assistant"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-1.5 py-1",
                "text-[11px] text-muted-foreground/75 hover:text-foreground/80 transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
              activeProps={{ className: "text-foreground/75" }}
            >
              <MessageCircleQuestion className="size-3.5 shrink-0 opacity-70" aria-hidden />
              <span className="hidden sm:inline">Ask</span>
              <span className="sr-only sm:hidden">Ask the guide</span>
            </Link>
            <HeaderSearch />
            {rootId || onThisPageItems?.length ? (
              <div className="lg:hidden">
                <OnThisPageNav rootId={rootId} items={onThisPageItems} />
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
