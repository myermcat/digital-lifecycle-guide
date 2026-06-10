/**
 * Central naming for the guide — regions, threads, review levels, and shared copy.
 * Import from here when displaying labels or building routes.
 */

export const GUIDE_ASSUMPTIONS_TEXT =
  "You are already working to the Government of Canada Digital Standards, design with users, iterate and improve frequently, work in the open, use open standards, address security and privacy, build in accessibility, empower staff, be good data stewards, design ethical services, and collaborate widely, and to the law on privacy, security, official languages, and accessibility. This guide builds on those.";

export const REGIONS = {
  create: {
    id: "create" as const,
    title: "Create",
    href: "/create",
    subtitle:
      "Figure out what to build and deliver the first version that will go live.",
    expandedIntro:
      "The Create region covers figuring out what to build and delivering the first version that will go live. Each phase has its own page.",
    deepLinkLabel: "Go to the Create region",
  },
  live: {
    id: "live" as const,
    title: "Live",
    href: "/live",
    subtitle: "Run the service after it goes live.",
    expandedIntro:
      "The Live region covers running a service after it goes live. Each phase has its own page.",
    deepLinkLabel: "Go to the Live region",
  },
  sunset: {
    id: "sunset" as const,
    title: "Sunset",
    href: "/sunset",
    subtitle: "Shut down the service or move users to what comes next.",
    expandedIntro:
      "The Sunset region covers ending a service or moving users to what comes next. In Canadian government, transitions are far more common than shutdowns.",
    deepLinkLabel: "Go to the Sunset region",
  },
} as const;

export type RegionId = keyof typeof REGIONS;

export const REGION_ORDER: RegionId[] = ["create", "live", "sunset"];

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
  "component-eol": {
    title: "Component end of life",
    slug: "component-eol",
    path: "/thread/component-eol",
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
  cybersecurity: {
    title: "Cybersecurity",
    slug: "cybersecurity",
    path: "/thread/cybersecurity",
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
  contracting: {
    title: "Contracting",
    slug: "contracting",
    path: "/thread/contracting",
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
