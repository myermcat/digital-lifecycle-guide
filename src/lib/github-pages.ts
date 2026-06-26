import { PRACTICE_STUBS, REVIEW_STUBS } from "./practice-stubs";
import { PROCUREMENT_SUBPAGE_SLUGS } from "./procurement-subpage-slugs";
import {
  DESIGN_FOR_WHOLE_JOURNEY_FLAT_LEGACY_PATH,
  DESIGN_FOR_WHOLE_JOURNEY_LEGACY_PATH,
  DESIGN_FOR_WHOLE_JOURNEY_PATH,
  MANAGING_WHAT_YOU_BOUGHT_PATH,
  SOO_VS_SOW_PATH,
  OPTIONS_ANALYSIS_PATH,
} from "./reference-paths";
import { ALL_PAGES_PATH } from "./all-pages-path";
import { SOURCE_COMING_SOON_PATH } from "./placeholder-sources";
import { SUPPORT_PATH } from "./support-path";

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
] as const;

const PRACTICE_PATHS = Object.keys(PRACTICE_STUBS).map((slug) => `/practice/${slug}`);
const REVIEW_PATHS = Object.keys(REVIEW_STUBS).map((slug) => `/review/${slug}`);
const THREAD_PATHS = [
  "/thread/procurement",
  "/thread/security",
  "/thread/privacy",
  "/thread/data-stewardship",
  "/thread/cybersecurity",
  "/thread/releasing-changes",
  "/thread/dependencies-and-standards",
];
const PROCUREMENT_SUB_PATHS = PROCUREMENT_SUBPAGE_SLUGS.map(
  (slug) => `/thread/procurement/${slug}`,
);
const LEGACY_CONTRACTING_PATHS = PROCUREMENT_SUBPAGE_SLUGS.map(
  (slug) => `/thread/contracting/${slug}`,
);

/** All static app routes — used for prerender on GitHub Pages builds. */
export const STATIC_PRERENDER_PATHS = [
  ...CORE_PATHS,
  ...PRACTICE_PATHS,
  ...REVIEW_PATHS,
  ...THREAD_PATHS,
  ...PROCUREMENT_SUB_PATHS,
  "/thread/contracting",
  ...LEGACY_CONTRACTING_PATHS,
  SOO_VS_SOW_PATH,
  MANAGING_WHAT_YOU_BOUGHT_PATH,
  OPTIONS_ANALYSIS_PATH,
  DESIGN_FOR_WHOLE_JOURNEY_PATH,
  DESIGN_FOR_WHOLE_JOURNEY_FLAT_LEGACY_PATH,
  DESIGN_FOR_WHOLE_JOURNEY_LEGACY_PATH,
  ALL_PAGES_PATH,
  SUPPORT_PATH,
  SOURCE_COMING_SOON_PATH,
] as const;
