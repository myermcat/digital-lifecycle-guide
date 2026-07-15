/**
 * Central naming for the guide — lifecycle phases, threads, review levels, and shared copy.
 * Import from here when displaying labels or building routes.
 */

export const GUIDE_ASSUMPTIONS_TEXT =
  "You are already working to the Government of Canada Digital Standards, design with users, iterate and improve frequently, work in the open, use open standards, address security and privacy, build in accessibility, empower staff, be good data stewards, design ethical services, and collaborate widely, and to the law on privacy, security, official languages, and accessibility. This guide builds on those.";

/**
 * Canonical Create / Live / Sunset descriptions — short paragraphs for readability.
 * Home and any other page that describes a phase should read from here.
 */
export type PhaseDescriptionParagraph =
  | string
  | {
      text: string;
      bold?: readonly string[];
    };

export function phaseDescriptionPlainText(
  paragraphs: readonly PhaseDescriptionParagraph[],
): string {
  return paragraphs
    .map((paragraph) => (typeof paragraph === "string" ? paragraph : paragraph.text))
    .join(" ");
}

export const PHASE_DESCRIPTIONS = {
  create: [
    "It starts with a problem to solve, well before any system exists.",
    'From "we have a problem" to a working solution in real users\' hands, you are figuring out what the problem really is, deciding how to solve it, and standing up that solution, whether by reusing, buying, building with a contracted team, or building in-house.',
    "Stopping is one of the outcomes, and it is a good one: the cheapest service is the one you worked out you did not need.",
    "Almost everything that follows is shaped here.",
  ],
  live: [
    "The longest phase by far.",
    "The solution is running, and you are keeping it useful: watching how it performs, improving it, and meeting new needs as they arrive.",
  ],
  sunset: [
    {
      text: "The solution is reaching its end, and the work is figuring out how to retire or replace it cleanly.",
      bold: ["retire or replace"],
    },
    "You plan the decommission, move or archive the data, and bring users safely onto whatever comes next.",
    "You are out of Sunset when the old service is fully shut down and its data and people have a safe home. In government that home is usually a replacement, and the replacement was built while the old service was still running, so its Create began long before this.",
  ],
} as const satisfies Record<string, readonly PhaseDescriptionParagraph[]>;

export const PHASES = {
  create: {
    id: "create" as const,
    title: "Create",
    pageHeading: "How the Create phase works",
    href: "/create",
    subtitle:
      "Figure out what to build and deliver the first version that will go live.",
    expandedIntro: phaseDescriptionPlainText(PHASE_DESCRIPTIONS.create),
    deepLinkLabel: "Go to the Create phase",
  },
  live: {
    id: "live" as const,
    title: "Live",
    pageHeading: "How the Live phase works",
    href: "/live",
    subtitle: "Run the service after it goes live.",
    expandedIntro: phaseDescriptionPlainText(PHASE_DESCRIPTIONS.live),
    deepLinkLabel: "Go to the Live phase",
  },
  sunset: {
    id: "sunset" as const,
    title: "Sunset",
    pageHeading: "How the Sunset phase works",
    href: "/sunset",
    subtitle: "Shut down the service or move users to what comes next.",
    expandedIntro: phaseDescriptionPlainText(PHASE_DESCRIPTIONS.sunset),
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
  funding: {
    title: "Funding",
    slug: "funding",
    path: "/thread/funding",
  },
  "change-management": {
    title: "Change management",
    slug: "change-management",
    path: "/thread/change-management",
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
