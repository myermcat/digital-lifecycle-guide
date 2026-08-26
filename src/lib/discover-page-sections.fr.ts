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

/** How many ancestor sections (with their own h2) sit between this section and root. */
function sectionDepth(section: HTMLElement, root: HTMLElement): number {
  let depth = 0;
  let parent = section.parentElement;
  while (parent && parent !== root) {
    if (
      parent instanceof HTMLElement &&
      parent.tagName === "SECTION" &&
      getSectionHeading(parent)
    ) {
      depth += 1;
    }
    parent = parent.parentElement;
  }
  return depth;
}

/** Sections with an `h2` that belongs to them; nested sections get depth > 0. */
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
    const depth = sectionDepth(section, root);
    items.push(depth > 0 ? { id, label, depth } : { id, label });
  });

  return items;
}
