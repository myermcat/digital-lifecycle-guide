/** Route slugs for procurement sub-pages — kept separate so vite.config can import without @/ aliases. */
export const PROCUREMENT_SUBPAGE_SLUGS = [
  "buy-in-small-pieces",
  "avoid-over-customising",
  "avoid-lock-in",
  "keep-capability-in-house",
  "put-the-practices-in-the-contract",
] as const;

export type ProcurementSubPageSlug = (typeof PROCUREMENT_SUBPAGE_SLUGS)[number];

/** Old procurement sub-page slugs → current slug or external path. */
export const PROCUREMENT_SUBPAGE_REDIRECTS: Record<string, string> = {
  "you-looked-before-you-bought": "/reference/options-analysis",
  "you-bought-small-in-pieces": "/thread/procurement/buy-in-small-pieces",
  "you-did-not-over-customise": "/thread/procurement/avoid-over-customising",
  "you-can-leave-when-you-need-to": "/thread/procurement/avoid-lock-in",
  "you-kept-enough-in-house": "/thread/procurement/keep-capability-in-house",
  "the-contract-carries-the-practices":
    "/thread/procurement/put-the-practices-in-the-contract",
};

/** @deprecated Use PROCUREMENT_SUBPAGE_SLUGS */
export const CONTRACTING_SUBPAGE_SLUGS = PROCUREMENT_SUBPAGE_SLUGS;

/** @deprecated Use ProcurementSubPageSlug */
export type ContractingSubPageSlug = ProcurementSubPageSlug;
