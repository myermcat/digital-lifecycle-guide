export type OnThisPageItem = {
  id: string;
  label: string;
  /** 0 = top-level section (default); 1+ = nested subsection. */
  depth?: number;
};

/** Rail column widths — usual for short labels, wide when any label is long. */
export const ON_THIS_PAGE_RAIL_WIDTH = {
  usual: "15rem",
  wide: "20rem",
} as const;

export type OnThisPageRailWidth = keyof typeof ON_THIS_PAGE_RAIL_WIDTH;

/** Labels longer than this switch the rail to the wide measure. */
export const ON_THIS_PAGE_WIDE_LABEL_CHARS = 40;

export function onThisPageRailWidth(
  items: readonly OnThisPageItem[],
): OnThisPageRailWidth {
  const longest = items.reduce(
    (max, item) => Math.max(max, item.label.length),
    0,
  );
  return longest > ON_THIS_PAGE_WIDE_LABEL_CHARS ? "wide" : "usual";
}

/** Matches section `scroll-mt-24` (6rem) + a little air. */
export const ON_THIS_PAGE_HEADER_OFFSET_PX = 96 + 16;

function getTargetScrollTop(element: HTMLElement) {
  return (
    element.getBoundingClientRect().top + window.scrollY - ON_THIS_PAGE_HEADER_OFFSET_PX
  );
}

/** Scroll to a section id and update the hash (fires `hashchange` for listeners). */
export function scrollToOnThisPageSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const top = Math.max(0, getTargetScrollTop(target));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion : reduce)").matches;

  window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  const nextHash = `#${id}`;
  if (window.location.hash !== nextHash) {
    history.replaceState(null, "", nextHash);
    window.dispatchEvent(new Event("hashchange"));
  } else {
    window.dispatchEvent(new Event("hashchange"));
  }
}
