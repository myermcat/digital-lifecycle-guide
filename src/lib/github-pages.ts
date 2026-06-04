/** Repo name on GitHub Pages project sites (https://user.github.io/repo-name/). */
export const GITHUB_PAGES_BASE = "/simple-gov-guide/";

/** All static app routes — used for prerender on GitHub Pages builds. */
export const STATIC_PRERENDER_PATHS = [
  "/",
  "/build",
  "/build-discovery",
  "/build-alpha",
  "/build-mvp",
  "/live",
  "/live-stabilization",
  "/live-growth",
  "/live-maturity",
  "/sunset",
  "/sunset-shutdown",
  "/sunset-transition",
] as const;
