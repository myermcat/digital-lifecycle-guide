/**
 * Central naming for the guide — lifecycle phases, threads, review levels, and shared copy.
 * Import from here when displaying labels or building routes.
 */

export const GUIDE_ASSUMPTIONS_TEXT =
  "You are already working to the Government of Canada Digital Standards, design with users, iterate and improve frequently, work in the open, use open standards, address security and privacy, build in accessibility, empower staff, be good data stewards, design ethical services, and collaborate widely, and to the law on privacy, security, official languages, and accessibility. This guide builds on those.";

export const PHASES = {
  create: {
    id: "create" as const,
    title: "Create",
    href: "/create",
    subtitle:
      "Figure out what to build and deliver the first version that will go live.",
    expandedIntro:
      "The Create phase covers figuring out what to build and delivering the first version that will go live. Each subphase has its own page.",
    deepLinkLabel: "Go to the Create phase",
  },
  live: {
    id: "live" as const,
    title: "Live",
    href: "/live",
    subtitle: "Run the service after it goes live.",
    expandedIntro:
      "The Live phase covers running a service after it goes live. Each subphase has its own page.",
    deepLinkLabel: "Go to the Live phase",
  },
  sunset: {
    id: "sunset" as const,
    title: "Sunset",
    href: "/sunset",
    subtitle: "Shut down the service or move users to what comes next.",
    expandedIntro:
      "The Sunset phase covers ending a service or moving users to what comes next. In Canadian government, transitions are far more common than shutdowns.",
    deepLinkLabel: "Go to the Sunset phase",
  },
} as const;

export type LifecyclePhaseId = keyof typeof PHASES;

/** @deprecated Use LifecyclePhaseId */
export type RegionId = LifecyclePhaseId;

export const PHASE_ORDER: LifecyclePhaseId[] = ["create", "live", "sunset"];

/** @deprecated Use PHASES */
export const REGIONS = PHASES;

/** @deprecated Use PHASE_ORDER */
export const REGION_ORDER = PHASE_ORDER;

export const REVIEW_LEVELS = {
  "internal-team-review": {
    title: "Internal team review",
    tag: "FREQUENT · INTERNAL",
    path: "/review/internal-team-review",
  },
  "external-peer-review": {
    title: "External peer review",
    tag: "OCCASIONAL · EXTERNAL",
    path: "/review/external-peer-review",
  },
  "institutional-review": {
    title: "Institutional review",
    tag: "RARE · CENTRAL",
    path: "/review/institutional-review",
  },
} as const;

/** Cross-cutting threads — each covers a practice across the whole lifecycle. */
export const THREADS = {
  "monitoring-and-instrumentation": {
    title: "Monitoring and instrumentation",
    slug: "monitoring-and-instrumentation",
    path: "/thread/monitoring-and-instrumentation",
  },
  "releasing-changes": {
    title: "Releasing changes",
    slug: "releasing-changes",
    path: "/thread/releasing-changes",
  },
  "dependencies-and-standards": {
    title: "Dependencies and standards",
    slug: "dependencies-and-standards",
    path: "/thread/dependencies-and-standards",
  },
  "user-research": {
    title: "User research",
    slug: "user-research",
    path: "/thread/user-research",
  },
  accessibility: {
    title: "Accessibility",
    slug: "accessibility",
    path: "/thread/accessibility",
  },
  security: {
    title: "Security",
    slug: "security",
    path: "/thread/security",
  },
  privacy: {
    title: "Privacy",
    slug: "privacy",
    path: "/thread/privacy",
  },
  procurement: {
    title: "Procurement",
    slug: "procurement",
    path: "/thread/procurement",
  },
  "data-stewardship": {
    title: "Data stewardship",
    slug: "data-stewardship",
    path: "/thread/data-stewardship",
  },
  "ethics-and-bias": {
    title: "Ethics and bias",
    slug: "ethics-and-bias",
    path: "/thread/ethics-and-bias",
  },
  "team-capability": {
    title: "Team capability",
    slug: "team-capability",
    path: "/thread/team-capability",
  },
  backlog: {
    title: "Backlog",
    slug: "backlog",
    path: "/thread/backlog",
  },
  "joined-up-delivery": {
    title: "Joined-up delivery",
    slug: "joined-up-delivery",
    path: "/thread/joined-up-delivery",
  },
} as const;

export type ThreadSlug = keyof typeof THREADS;

export function practicePath(slug: string) {
  return `/practice/${slug}` as const;
}

export function reviewPath(slug: keyof typeof REVIEW_LEVELS) {
  return REVIEW_LEVELS[slug].path;
}

export function threadPath(slug: ThreadSlug) {
  return THREADS[slug].path;
}
