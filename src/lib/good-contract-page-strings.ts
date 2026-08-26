/**
 * The good contract page's own words.
 *
 * Most of that page's prose already comes from `src/lib/good-contract-content.ts`,
 * which has a French twin. These last few strings were hard-coded inside
 * `src/components/GoodContractPage.tsx`, and nothing in `src/components` is ever
 * source-swapped by the locale plugin, so the French build could not reach them
 * and rendered them in English. They live here, in `src/lib`, where
 * `good-contract-page-strings.fr.ts` takes their place.
 *
 * The tag legend wraps around two rendered tags, so it is stored as the run of
 * text that follows each one. The leading and trailing spaces in those two
 * strings are deliberate: they are the spaces on either side of the tags in the
 * sentence, and the component no longer supplies them.
 */

export const GOOD_CONTRACT_PAGE_STRINGS = {
  /** The two tags carried by each schedule in the accordion. */
  scheduleTags: {
    standard: "Standard, in every contract",
    tailored: "Added for this service",
  },

  /** Badge on the one part of a contract that is not required. */
  optionalBadge: "optional",

  /**
   * The sentence that explains the two tags. It reads:
   *
   *   <lead from GOOD_CONTRACT.howToRead.intro> [standard tag]{afterStandardTag}[tailored tag]{afterTailoredTag}
   */
  tagLegend: {
    afterStandardTag: " means it is conventional, in nearly every service contract; ",
    afterTailoredTag:
      " means we wrote it in because of what the grant portal is and the information it holds.",
  },
};
