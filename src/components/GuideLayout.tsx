import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BgAnimalField } from "@/components/BgAnimalField";
import { OnThisPageNav } from "@/components/OnThisPageNav";

function readPageHeight(main: HTMLElement, content: HTMLElement | null): number {
  const fromMain = Math.max(main.offsetHeight, main.scrollHeight);
  const fromContent = content
    ? content.offsetHeight +
      // py-20 md:py-28 on the content column
      (typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches
        ? 224
        : 160)
    : 0;
  const viewport =
    typeof window !== "undefined" ? window.innerHeight : 0;
  return Math.max(fromMain, fromContent, viewport);
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
    setPageHeight(readPageHeight(main, contentRef.current));
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
      className="relative isolate min-h-screen bg-background"
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{ minHeight: pageHeight }}
      >
        <BgAnimalField pageHeight={pageHeight} />
      </div>
      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-2xl px-6 py-20 md:py-28 pointer-events-auto"
      >
        {children}
      </div>
      {id ? <OnThisPageNav rootId={id} /> : null}
    </main>
  );
}
