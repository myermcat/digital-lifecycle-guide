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

/** Cross-cutting threads (Accessibility, Cybersecurity, etc.). */
export const THREADS = {
  accessibility: {
    title: "Accessibility",
    slug: "accessibility",
    path: "/thread/accessibility",
  },
} as const;

export function practicePath(slug: string) {
  return `/practice/${slug}` as const;
}

export function reviewPath(slug: keyof typeof REVIEW_LEVELS) {
  return REVIEW_LEVELS[slug].path;
}

export function threadPath(slug: keyof typeof THREADS) {
  return THREADS[slug].path;
}
