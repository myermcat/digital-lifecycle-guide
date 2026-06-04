import { useLayoutEffect, useState } from "react";
import type { OnThisPageItem } from "@/lib/on-this-page";
import { discoverPageSections } from "@/lib/discover-page-sections";

export function useOnThisPageSections(rootId: string | undefined) {
  const [items, setItems] = useState<OnThisPageItem[]>([]);

  useLayoutEffect(() => {
    if (!rootId) {
      setItems([]);
      return;
    }

    const root = document.getElementById(rootId);
    if (!root) {
      setItems([]);
      return;
    }

    setItems(discoverPageSections(root));
  }, [rootId]);

  return items;
}
