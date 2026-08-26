/**
 * Where the other language lives.
 *
 * The two languages are two builds of the same application, because every page's
 * prose is imported directly by its component -- the language is decided where the
 * import resolves, not at runtime. On GitHub Pages they are one site: English at the
 * base path, French under /fr/. In dev they are two servers, so the switch crosses
 * ports instead. Either way the reader sees one button.
 */
/**
 * Which build this is.
 *
 * Deliberately a plain constant with a hand-written French twin
 * (language-switch.fr.ts), not an env variable: the build already swaps module
 * source, and that swap applies to the server render and the browser bundle
 * alike. Reading an env var got this right in the browser and wrong on the
 * server, which is a hydration mismatch and a wrong link for anyone with
 * JavaScript off.
 */
export const IS_FRENCH = false;

/** Dev ports, matching .claude/launch.json. */
const DEV_PORT = { en: "8081", fr: "8082" } as const;

export function otherLanguageHref(pathname: string): string {
  const base = import.meta.env.BASE_URL || "/";
  // Branch on the base path, not on import.meta.env.DEV and not on window: DEV is
  // false inside the SSR render even while the dev server is running, so that check
  // produced one href on the server and another in the browser. BASE_URL is the same
  // in both. "/" means the two local dev servers; anything else is the deployed site.
  if (base === "/") {
    const port = IS_FRENCH ? DEV_PORT.en : DEV_PORT.fr;
    return `http://localhost:${port}${pathname}`;
  }
  // "/guide/fr/x" <-> "/guide/x"
  if (IS_FRENCH) return `${base.replace(/fr\/$/, "")}${pathname.replace(/^\/+/, "")}`;
  return `${base}fr/${pathname.replace(/^\/+/, "")}`;
}

export const LANGUAGE_SWITCH_LABEL = IS_FRENCH ? "EN" : "FR";
export const LANGUAGE_SWITCH_TITLE = IS_FRENCH
  ? "English version of this page"
  : "Version française de cette page";
