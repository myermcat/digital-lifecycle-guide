import type { OnThisPageItem } from "@/lib/on-this-page";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Heading for this section only — ignore h2 inside nested sections. */
function getSectionHeading(section: HTMLElement): HTMLHeadingElement | null {
  const direct = section.querySelector(":scope > h2");
  if (direct instanceof HTMLHeadingElement) return direct;

  for (const h2 of section.querySelectorAll("h2")) {
    if (h2.closest("section") === section) return h2;
  }

  return null;
}

/** Top-level sections: `section` with an `h2` that belongs to it (not h3 practice group titles). */
export function discoverPageSections(root: HTMLElement): OnThisPageItem[] {
  const items: OnThisPageItem[] = [];
  const seen = new Set<string>();

  root.querySelectorAll("section").forEach((section) => {
    if (!(section instanceof HTMLElement)) return;

    const h2 = getSectionHeading(section);
    if (!h2) return;

    const label = h2.textContent?.replace(/\s+/g, " ").trim();
    if (!label) return;

    let id = section.id;
    if (!id) {
      const base = slugify(label);
      if (!base) return;

      id = base;
      let suffix = 2;
      while (document.getElementById(id)) {
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
