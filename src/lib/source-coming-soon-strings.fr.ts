/**
 * The "this source is on its way" placeholder page, in words, in French.
 *
 * The French twin of `source-coming-soon-strings.ts`. The locale plugin swaps
 * this file in when DLG_LOCALE=fr, so the keys and their shape have to match the
 * English twin exactly.
 *
 * Each sentence is split into the run of text before the source's name and the
 * run after it. In French the name still comes first, so the "before" halves are
 * empty, and the page renders nothing there.
 */

export const SOURCE_COMING_SOON_STRINGS = {
  /** Stands in for the name on the page itself when no source was passed. */
  fallbackSourceName: "Cette source",

  /** Stands in for the name in the document head when no source was passed. */
  metaFallbackSourceName: "Cette source",

  /** The one line of body prose, around the source's name. */
  body: {
    before: "",
    after: " est en cours de rédaction. Nous ajouterons le lien dès sa mise en ligne.",
  },

  /** The browser tab and search result title, around the source's name. */
  metaTitle: {
    before: "",
    after: " — bientôt disponible — Le Guide du cycle de vie numérique 2026",
  },

  /** The meta description, around the source's name. */
  metaDescription: {
    before: "",
    after: " est en cours de rédaction. Nous ajouterons le lien dès sa mise en ligne.",
  },
};
