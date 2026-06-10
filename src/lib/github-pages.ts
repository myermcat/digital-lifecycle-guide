import { PRACTICE_STUBS, REVIEW_STUBS } from "./practice-stubs";
import { THREAD_CONTENT } from "./thread-content";

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
const THREAD_PATHS = Object.keys(THREAD_CONTENT).map((slug) => `/thread/${slug}`);

/** All static app routes — used for prerender on GitHub Pages builds. */
export const STATIC_PRERENDER_PATHS = [
  ...CORE_PATHS,
  ...PRACTICE_PATHS,
  ...REVIEW_PATHS,
  ...THREAD_PATHS,
] as const;
