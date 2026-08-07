import type { ReactNode } from "react";
import { GuideFooter } from "@/components/GuideFooter";
import { GuideHeader } from "@/components/GuideHeader";
import { OnThisPageRail } from "@/components/OnThisPageRail";
import type { OnThisPageItem } from "@/lib/on-this-page";

/**
 * Width of the main column + gap + usual on-this-page rail (max-w-3xl + gap-14 + 15rem).
 * Wide-rail pages grow past this; no-nav pages stay on the usual footprint.
 */
const GUIDE_FULL_MEASURE =
  "w-full max-w-[calc(48rem+3.5rem+15rem)]";

/** Prose column on pages with the vertical on-this-page rail. */
const GUIDE_PROSE_MEASURE = "min-w-0 w-full max-w-3xl";

export function GuideLayout({
  children,
  id,
  onThisPageItems,
}: {
  children: ReactNode;
  id?: string;
  /** Explicit on-this-page nav (skips auto-discovery from section headings). */
  onThisPageItems?: readonly OnThisPageItem[];
}) {
  const showSideNav = Boolean(id || onThisPageItems?.length);

  return (
    <main
      id={id}
      className="relative isolate flex min-h-screen flex-col bg-background"
    >
      <div className="sticky top-0 z-40 w-full pointer-events-auto">
        <GuideHeader rootId={id} onThisPageItems={onThisPageItems} />
      </div>
      <div className="relative z-10 w-full flex-1 px-6 pt-12 md:pt-16 pointer-events-auto">
        {!showSideNav ? (
          <div className="flex justify-center">
            <div className={GUIDE_FULL_MEASURE}>{children}</div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-3xl lg:max-w-none">
            <div className="lg:flex lg:justify-center">
              <div className="w-full lg:flex lg:gap-14 lg:w-auto">
                <div className={GUIDE_PROSE_MEASURE}>{children}</div>
                <OnThisPageRail rootId={id} items={onThisPageItems} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative z-10 w-full pointer-events-auto">
        <GuideFooter />
      </div>
    </main>
  );
}
