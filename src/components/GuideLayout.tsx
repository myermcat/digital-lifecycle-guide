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

/** In-flow height only — avoid scrollHeight / minHeight on decorations (scroll feedback loop). */
function readPageHeight(main: HTMLElement): number {
  return main.offsetHeight;
}

export function GuideLayout({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
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

  return (
    <main
      ref={mainRef}
      id={id}
      className="relative isolate flex min-h-screen flex-col bg-background"
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <BgAnimalField pageHeight={pageHeight} />
      </div>
      <div className="relative z-30 w-full pointer-events-auto">
        <GuideHeader rootId={id} />
      </div>
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-2xl flex-1 px-6 pt-12 md:pt-16 pointer-events-auto"
      >
        {children}
      </div>
      <div className="relative z-10 w-full pointer-events-auto">
        <GuideFooter />
      </div>
    </main>
  );
}
