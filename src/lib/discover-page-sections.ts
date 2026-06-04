import type { OnThisPageItem } from "@/lib/on-this-page";

/** Top-level sections: `section[id]` with an `h2` (not h3 practice group titles). */
export function discoverPageSections(root: HTMLElement): OnThisPageItem[] {
  const items: OnThisPageItem[] = [];
  const seen = new Set<string>();

  root.querySelectorAll("section[id]").forEach((section) => {
    if (!(section instanceof HTMLElement)) return;
    const { id } = section;
    if (!id || seen.has(id)) return;

    const h2 = section.querySelector("h2");
    if (!h2) return;

    const label = h2.textContent?.replace(/\s+/g, " ").trim();
    if (!label) return;

    seen.add(id);
    items.push({ id, label });
  });

  return items;
}
