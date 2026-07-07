import { useLayoutEffect, useState } from "react";
import type { OnThisPageItem } from "@/lib/on-this-page";
import { discoverPageSections } from "@/lib/discover-page-sections";

function sectionsEqual(a: OnThisPageItem[], b: OnThisPageItem[]) {
  return (
    a.length === b.length &&
    a.every((item, index) => item.id === b[index]?.id && item.label === b[index]?.label)
  );
}

export function useOnThisPageSections(rootId: string | undefined) {
  const [items, setItems] = useState<OnThisPageItem[]>([]);

  useLayoutEffect(() => {
    if (!rootId) {
      setItems([]);
      return;
    }

    let cancelled = false;

    const refresh = () => {
      if (cancelled) return;

      const root = document.getElementById(rootId);
      if (!root) {
        setItems([]);
        return;
      }

      const next = discoverPageSections(root);
      setItems((current) => (sectionsEqual(current, next) ? current : next));
    };

    refresh();

    const root = document.getElementById(rootId);
    const observer =
      root &&
      new MutationObserver(() => {
        refresh();
      });

    if (observer && root) {
      observer.observe(root, { childList: true, subtree: true });
    }

    const raf = requestAnimationFrame(refresh);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [rootId]);

  return items;
}
