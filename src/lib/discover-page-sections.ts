import type { OnThisPageItem } from "@/lib/on-this-page";

/** Top-level sections: `section[id]` with an `h2` (not h3 practice group titles). */
export function discoverPageSections(root: HTMLElement): OnThisPageItem[] {
  const items: OnThisPageItem[] = [];
  const seen = new Set<string>();

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  root.querySelectorAll("section").forEach((section) => {
    if (!(section instanceof HTMLElement)) return;

    const h2 = section.querySelector("h2");
    if (!h2) return;

    const label = h2.textContent?.replace(/\s+/g, " ").trim();
    if (!label) return;

    let id = section.id;
    if (!id) {
      const base = slugify(label);
      if (!base) return;

      id = base;
      let suffix = 2;
      while (root.querySelector(`#${CSS.escape(id)}`)) {
        id = `${base}-${suffix}`;
        suffix += 1;
      }
      section.id = id;
    }

    if (seen.has(id)) return;

    seen.add(id);
    items.push({ id, label });
  });

  return items;
}
