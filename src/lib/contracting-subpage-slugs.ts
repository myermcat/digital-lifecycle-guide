/** Route slugs for contracting sub-pages — kept separate so vite.config can import without @/ aliases. */
export const CONTRACTING_SUBPAGE_SLUGS = [
  "the-contract-carries-the-practices",
  "you-bought-small-in-pieces",
  "you-did-not-over-customise",
  "you-can-leave-when-you-need-to",
  "you-kept-enough-in-house",
] as const;

export type ContractingSubPageSlug = (typeof CONTRACTING_SUBPAGE_SLUGS)[number];
