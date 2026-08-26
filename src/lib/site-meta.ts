/**
 * The origin the guide is published on, with no trailing slash.
 *
 * The one part of a page's address that cannot be derived from the build.
 * import.meta.env.BASE_URL gives the path the site sits at
 * ("/digital-lifecycle-guide/" in English, "/digital-lifecycle-guide/fr/" in French)
 * and nothing above it, and the hreflang links in the document head have to be
 * absolute URLs, so the scheme and host are written down here.
 *
 * An origin is not translated: the French twin of this file carries the same string,
 * because both languages are served from the same host.
 */
export const SITE_ORIGIN = "https://myermcat.github.io";

export const SITE_NAME = "The 2026 Digital Lifecycle Guide";
export const SITE_FULL_TITLE = `${SITE_NAME} — Government of Canada`;
export const SITE_DESCRIPTION =
  "A guide for people working on digital services for the Government of Canada.";
