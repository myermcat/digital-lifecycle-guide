/**
 * The origin the guide is published on, with no trailing slash.
 *
 * The one part of a page's address that cannot be derived from the build.
 * import.meta.env.BASE_URL gives the path the site sits at
 * ("/digital-lifecycle-guide/" in English, "/digital-lifecycle-guide/fr/" in French)
 * and nothing above it, and the hreflang links in the document head have to be
 * absolute URLs, so the scheme and host are written down here.
 *
 * An origin is not translated: this is the same string as in the English twin of this
 * file, because both languages are served from the same host. If one changes, both
 * change.
 */
export const SITE_ORIGIN = "https://myermcat.github.io";

export const SITE_NAME = "Le Guide du cycle de vie numérique 2026";
export const SITE_FULL_TITLE = `${SITE_NAME} — Gouvernement du Canada`;
export const SITE_DESCRIPTION =
  "Un guide pour les personnes qui travaillent sur les services numériques du gouvernement du Canada.";
