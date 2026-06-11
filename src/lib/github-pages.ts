import { PRACTICE_STUBS, REVIEW_STUBS } from "./practice-stubs";
import { THREADS } from "./guide-strings";
import { CONTRACTING_SUBPAGE_SLUGS } from "./contracting-subpage-slugs";
import { SOO_VS_SOW_PATH } from "./reference-paths";

/** Repo name on GitHub Pages project sites (https://user.github.io/repo-name/). */
export const GITHUB_PAGES_BASE = "/digital-lifecycle-guide/";

const CORE_PATHS = [
  "/",
  "/create",
  "/create-discovery",
  "/create-alpha",
  "/create-mvp",
  "/live",
  "/live-stabilization",
  "/live-growth",
  "/live-maturity",
  "/sunset",
  "/sunset-shutdown",
  "/sunset-transition",
] as const;

const PRACTICE_PATHS = Object.keys(PRACTICE_STUBS).map((slug) => `/practice/${slug}`);
const REVIEW_PATHS = Object.keys(REVIEW_STUBS).map((slug) => `/review/${slug}`);
const THREAD_PATHS = Object.values(THREADS).map((thread) => thread.path);
const CONTRACTING_SUB_PATHS = CONTRACTING_SUBPAGE_SLUGS.map(
  (slug) => `/thread/contracting/${slug}`,
);

/** All static app routes — used for prerender on GitHub Pages builds. */
export const STATIC_PRERENDER_PATHS = [
  ...CORE_PATHS,
  ...PRACTICE_PATHS,
  ...REVIEW_PATHS,
  ...THREAD_PATHS,
  ...CONTRACTING_SUB_PATHS,
  SOO_VS_SOW_PATH,
] as const;
