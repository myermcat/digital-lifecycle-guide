import { PRACTICE_STUBS, REVIEW_STUBS } from "./practice-stubs";
import { PROCUREMENT_SUBPAGE_SLUGS } from "./procurement-subpage-slugs";
import {
  DESIGN_FOR_WHOLE_JOURNEY_FLAT_LEGACY_PATH,
  DESIGN_FOR_WHOLE_JOURNEY_LEGACY_PATH,
  DESIGN_FOR_WHOLE_JOURNEY_PATH,
  GOOD_CONTRACT_PATH,
  SOO_VS_SOW_PATH,
  OPTIONS_ANALYSIS_PATH,
  APPROVAL_JOURNEY_PATH,
} from "./reference-paths";
import { ALL_PAGES_PATH } from "./all-pages-path";
import { BUILD_STATUS_PATH } from "./build-status-path";
import { SOURCE_COMING_SOON_PATH } from "./placeholder-sources";
import { SUPPORT_PATH } from "./support-path";

/** Repo name on GitHub Pages project sites (https://user.github.io/repo-name/). */
export const GITHUB_PAGES_BASE = "/digital-lifecycle-guide/";

/** Path segments to keep before the SPA redirect query (one for project Pages sites). */
export const GITHUB_PAGES_PATH_SEGMENTS = 1;

const CORE_PATHS = [
  "/",
  "/gate-map",
  "/create",
  "/create-discovery",
  "/create-alpha",
  "/create-beta",
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
  "/thread/funding",
  "/thread/team-capability",
  "/thread/change-management",
  "/thread/monitoring-and-instrumentation",
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
  OPTIONS_ANALYSIS_PATH,
  APPROVAL_JOURNEY_PATH,
  GOOD_CONTRACT_PATH,
  DESIGN_FOR_WHOLE_JOURNEY_PATH,
  DESIGN_FOR_WHOLE_JOURNEY_FLAT_LEGACY_PATH,
  DESIGN_FOR_WHOLE_JOURNEY_LEGACY_PATH,
  ALL_PAGES_PATH,
  BUILD_STATUS_PATH,
  SUPPORT_PATH,
  SOURCE_COMING_SOON_PATH,
] as const;
