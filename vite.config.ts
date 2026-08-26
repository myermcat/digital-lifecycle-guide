// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { GITHUB_PAGES_BASE, STATIC_PRERENDER_PATHS } from "./src/lib/github-pages";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

/**
 * The French guide is the same application reading French content.
 *
 * Every page's prose lives in src/lib/*-content.ts, and the components import those
 * modules directly, so the language cannot be a prop threaded through the tree --
 * it has to be decided where the import resolves. With DLG_LOCALE=fr, an import of
 * "@/lib/x-content" resolves to "@/lib/x-content.fr.ts" instead. Nothing in the
 * components or the English modules changes, and a module with no French twin
 * (routing, config, helpers) resolves normally.
 */
/**
 * Every module with a French twin, keyed by its path under src/lib.
 *
 * Walks the tree rather than one directory, and keeps the extension, because the
 * first version matched only "src/lib/<name>.ts": a .tsx twin could not be written
 * at all, and nothing under src/lib/assistant/ was reachable. The navigation module
 * is .tsx, so every sub-phase title and every prev/next label stayed English.
 */
const FRENCH_MODULES = new Map<string, string>();
(function collect(dir: string, prefix = "") {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) collect(resolve(dir, entry.name), rel);
    else {
      const m = /^(.*)\.fr\.(ts|tsx)$/.exec(rel);
      if (m) FRENCH_MODULES.set(`${m[1]}.${m[2]}`, rel);
    }
  }
})(resolve(__dirname, "src/lib"));

const FRENCH_FIGURES = new Set(
  readdirSync(resolve(__dirname, "src/assets/fr")).filter((f) => f.endsWith(".svg")),
);

function frenchContent() {
  return {
    name: "dlg-french-content",
    enforce: "pre" as const,
    configResolved() {
      console.log(`[dlg] French content active: ${FRENCH_MODULES.size} modules`);
    },
    /**
     * Swap the module's SOURCE, not its specifier.
     *
     * Rewriting "@/lib/x" to "@/lib/x.fr" looks simpler and does not work: Vite's own
     * alias resolution runs ahead of user plugins, so the specifier is already an
     * absolute path by the time a plugin sees it -- and when it did land, a module
     * imported under both names became two instances. Loading the French file's text
     * under the English module id keeps one instance and one import graph.
     */
    /**
     * The figures are translated too, and they live beside their English twins.
     *
     * The specifiers carry a query -- "@/assets/x.svg?url" -- so an endsWith(".svg")
     * check never matched and every figure stayed English. Split the query off before
     * looking, and put it back on the way out.
     */
    resolveId(source: string) {
      const [path, query] = source.split("?");
      if (!path.endsWith(".svg") || path.includes("/assets/fr/")) return null;
      const name = path.split("/").pop() as string;
      if (!FRENCH_FIGURES.has(name)) return null;
      const fr = resolve(__dirname, "src/assets/fr", name);
      return query ? `${fr}?${query}` : fr;
    },
    load(id: string) {
      const m = /^(.*[\\/]src[\\/]lib[\\/])(.+\.tsx?)$/.exec(id.split("?")[0]);
      if (!m) return null;
      const rel = m[2].split(/[\\/]/).join("/");
      if (/\.fr\.tsx?$/.test(rel)) return null;
      const twin = FRENCH_MODULES.get(rel);
      if (!twin) return null;
      return readFileSync(resolve(m[1], twin), "utf8");
    },
  };
}

const FRENCH_BASE = `${GITHUB_PAGES_BASE}fr/`;

const isFrench = process.env.DLG_LOCALE === "fr";
/* the header's language switch needs to know which build it is in */
if (isFrench) process.env.VITE_DLG_LOCALE = "fr";

export default defineConfig({
  vite: {
    base: isGitHubPages ? (isFrench ? `${GITHUB_PAGES_BASE}fr/` : GITHUB_PAGES_BASE) : "/",
    plugins: isFrench ? [frenchContent()] : [],
    server: {
      port: Number(process.env.PORT ?? 8080),
      strictPort: true,
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    prerender: isGitHubPages
      ? {
          enabled: true,
          crawlLinks: true,
          pages: STATIC_PRERENDER_PATHS.map((path) => ({ path })),
          /*
           * Do not walk into the other language.
           *
           * The header's switch links to the other build, which this build does not
           * contain, and the crawler follows every anchor it finds. Left alone it
           * fetches /fr/... during the English build, gets a 404, and kills the whole
           * build over a link that is correct. The seeded paths are base-relative
           * ("/create"); only crawled hrefs carry the base, so matching on the base
           * rejects the foreign language without touching the seeds.
           */
          filter: ({ path }: { path: string }) =>
            isFrench
              ? !(path.startsWith(GITHUB_PAGES_BASE) && !path.startsWith(FRENCH_BASE))
              : !path.startsWith(FRENCH_BASE),
        }
      : undefined,
  },
});
