/**
 * The "this source is on its way" placeholder page, in words.
 *
 * They were hard-coded in `src/routes/source-coming-soon.tsx` and
 * `src/components/SourceComingSoonPage.tsx`. Nothing under `src/routes` or
 * `src/components` is ever source-swapped by the locale plugin, so the French
 * build could not reach them and rendered them in English. They live here, in
 * `src/lib`, where `source-coming-soon-strings.fr.ts` takes their place.
 *
 * Every sentence wraps around the source's name, so each one is split into the
 * run of text before the name and the run after it. French can move the name by
 * moving text between the two halves; it does not have to sit at the front.
 * Where a half is empty the page renders nothing there.
 */

export const SOURCE_COMING_SOON_STRINGS = {
  /** Stands in for the name on the page itself when no source was passed. */
  fallbackSourceName: "This source",

  /** Stands in for the name in the document head when no source was passed. */
  metaFallbackSourceName: "Source",

  /** The one line of body prose, around the source's name. */
  body: {
    before: "",
    after: " is still being written. We'll add the link the moment it goes live.",
  },

  /** The browser tab and search result title, around the source's name. */
  metaTitle: {
    before: "",
    after: " — coming soon — The 2026 Digital Lifecycle Guide",
  },

  /** The meta description, around the source's name. */
  metaDescription: {
    before: "",
    after: " is still being written. We will add the link when it goes live.",
  },
};
