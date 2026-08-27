/**
 * The good contract page's own words, in French.
 *
 * The French twin of `good-contract-page-strings.ts`. The locale plugin swaps
 * this file in when DLG_LOCALE=fr, so the keys and their shape have to match the
 * English twin exactly.
 *
 * The leading and trailing spaces in the tag legend are deliberate: they are the
 * spaces on either side of the tags in the sentence, and the component does not
 * supply them.
 */

export const GOOD_CONTRACT_PAGE_STRINGS = {
  /** The two tags carried by each schedule in the accordion. */
  scheduleTags: {
    standard: "Normalisée, dans tout contrat",
    tailored: "Ajoutée pour ce service",
  },

  /** Badge on the one part of a contract that is not required. */
  optionalBadge: "facultatif",

  /**
   * The sentence that explains the two tags. It reads:
   *
   *   <lead from GOOD_CONTRACT.howToRead.intro> [standard tag]{afterStandardTag}[tailored tag]{afterTailoredTag}
   */
  tagLegend: {
    afterStandardTag:
      " signifie qu’elle est conventionnelle, présente dans presque tout contrat de service; ",
    afterTailoredTag:
      " signifie que nous l’avons inscrite en raison de ce qu’est le portail de subventions et de l’information qu’il détient.",
  },
};
