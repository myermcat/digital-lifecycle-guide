export type OnThisPageItem = {
  id: string;
  label: string;
};

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
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  const nextHash = `#${id}`;
  if (window.location.hash !== nextHash) {
    history.replaceState(null, "", nextHash);
    window.dispatchEvent(new Event("hashchange"));
  } else {
    window.dispatchEvent(new Event("hashchange"));
  }
}
