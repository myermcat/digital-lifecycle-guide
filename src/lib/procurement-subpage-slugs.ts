/** Route slugs for procurement sub-pages — kept separate so vite.config can import without @/ aliases. */
export const PROCUREMENT_SUBPAGE_SLUGS = [
  "you-looked-before-you-bought",
  "you-bought-small-in-pieces",
  "you-did-not-over-customise",
  "you-can-leave-when-you-need-to",
  "you-kept-enough-in-house",
  "the-contract-carries-the-practices",
] as const;

export type ProcurementSubPageSlug = (typeof PROCUREMENT_SUBPAGE_SLUGS)[number];

/** @deprecated Use PROCUREMENT_SUBPAGE_SLUGS */
export const CONTRACTING_SUBPAGE_SLUGS = PROCUREMENT_SUBPAGE_SLUGS;

/** @deprecated Use ProcurementSubPageSlug */
export type ContractingSubPageSlug = ProcurementSubPageSlug;
