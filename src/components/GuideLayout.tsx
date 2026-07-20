import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BgAnimalField } from "@/components/BgAnimalField";
import { GuideFooter } from "@/components/GuideFooter";
import { GuideHeader } from "@/components/GuideHeader";
import { OnThisPageRail } from "@/components/OnThisPageRail";
import type { OnThisPageItem } from "@/lib/on-this-page";

/** In-flow height only — avoid scrollHeight / minHeight on decorations (scroll feedback loop). */
function readPageHeight(main: HTMLElement): number {
  return main.offsetHeight;
}

/**
 * Width of the main column + gap + on-this-page rail (max-w-2xl + gap-14 + 240px).
 * Used when a page has no side nav, so home and other full-width pages match pages with a rail.
 */
const GUIDE_FULL_MEASURE =
  "w-full max-w-[calc(42rem+3.5rem+15rem)]";

export function GuideLayout({
  children,
  id,
  bare,
  onThisPageItems,
}: {
  children: ReactNode;
  id?: string;
  /** No scattered edge animals — for short utility pages with their own illustration. */
  bare?: boolean;
  /** Explicit on-this-page nav (skips auto-discovery from section headings). */
  onThisPageItems?: readonly OnThisPageItem[];
}) {
  const mainRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [pageHeight, setPageHeight] = useState(0);

  const measure = useCallback(() => {
    const main = mainRef.current;
    if (!main) return;
    setPageHeight(readPageHeight(main));
  }, []);

  useLayoutEffect(() => {
    measure();
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [measure, children]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    observerRef.current?.disconnect();
    const ro = new ResizeObserver(() => measure());
    ro.observe(main);
    if (contentRef.current) ro.observe(contentRef.current);
    observerRef.current = ro;

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, children]);

  const showSideNav = Boolean(id || onThisPageItems?.length);

  return (
    <main
      ref={mainRef}
      id={id}
      className="relative isolate flex min-h-screen flex-col bg-background"
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        {!bare ? <BgAnimalField pageHeight={pageHeight} /> : null}
      </div>
      <div className="relative z-30 w-full pointer-events-auto">
        <GuideHeader rootId={id} onThisPageItems={onThisPageItems} />
      </div>
      <div
        ref={contentRef}
        className="relative z-10 w-full flex-1 px-6 pt-12 md:pt-16 pointer-events-auto"
      >
        {!showSideNav ? (
          <div className="flex justify-center">
            <div className={GUIDE_FULL_MEASURE}>{children}</div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="lg:flex lg:justify-center">
              <div className="w-full lg:flex lg:gap-14 lg:w-auto">
                <div className="min-w-0 w-full max-w-2xl">{children}</div>
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
