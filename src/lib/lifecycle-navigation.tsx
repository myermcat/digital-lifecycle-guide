import type { ReactNode } from "react";
import {
  ArrowInVisual,
  ArrowOutVisual,
  InfinityVisual,
} from "@/components/PhaseVisuals";
import { PHASES, type LifecyclePhaseId } from "@/lib/guide-strings";

export type { LifecyclePhaseId };

/** @deprecated Use LifecyclePhaseId */
export type RegionId = LifecyclePhaseId;

export interface SubphaseNavItem {
  title: string;
  href: string;
  slug: string;
}

/** @deprecated Use SubphaseNavItem */
export type PhaseNavItem = SubphaseNavItem;

export const CREATE_SUBPHASES: SubphaseNavItem[] = [
  { title: "Discovery", href: "/create-discovery", slug: "discovery" },
  { title: "Alpha", href: "/create-alpha", slug: "alpha" },
  { title: "MVP", href: "/create-mvp", slug: "mvp" },
];

export const LIVE_SUBPHASES: SubphaseNavItem[] = [
  { title: "Stabilization", href: "/live-stabilization", slug: "stabilization" },
  { title: "Growth", href: "/live-growth", slug: "growth" },
  { title: "Maturity", href: "/live-maturity", slug: "maturity" },
];

/** @deprecated Use CREATE_SUBPHASES */
export const CREATE_PHASES = CREATE_SUBPHASES;

/** @deprecated Use LIVE_SUBPHASES */
export const LIVE_PHASES = LIVE_SUBPHASES;

/** @deprecated Use CREATE_SUBPHASES */
export const BUILD_PHASES = CREATE_SUBPHASES;

export function phaseVisual(phaseId: LifecyclePhaseId): ReactNode {
  switch (phaseId) {
    case "create":
      return <ArrowInVisual />;
    case "live":
      return <InfinityVisual />;
    case "sunset":
      return <ArrowOutVisual />;
  }
}

/** @deprecated Use phaseVisual */
export const regionVisual = phaseVisual;

export interface WhereThisFitsConfig {
  phaseLabel: string;
  phaseVisual: LifecyclePhaseId;
  subphases: { title: string; href: string; current?: boolean }[];
  nextPhaseLink?: { title: string; href: string };
  priorPhaseLink?: { title: string; href: string };
}

export function whereThisFitsForCreateSubphase(
  currentSlug: string | null,
): WhereThisFitsConfig {
  return {
    phaseLabel: PHASES.create.title,
    phaseVisual: "create",
    subphases: CREATE_SUBPHASES.map((p) => ({
      title: p.title,
      href: p.href,
      current: p.slug === currentSlug,
    })),
    nextPhaseLink: { title: PHASES.live.title, href: PHASES.live.href },
  };
}

/** @deprecated Use whereThisFitsForCreateSubphase */
export const whereThisFitsForCreatePhase = whereThisFitsForCreateSubphase;

/** @deprecated Use whereThisFitsForCreateSubphase */
export const whereThisFitsForBuildPhase = whereThisFitsForCreateSubphase;

export function whereThisFitsForLiveSubphase(
  currentSlug: string | null,
): WhereThisFitsConfig {
  return {
    phaseLabel: PHASES.live.title,
    phaseVisual: "live",
    subphases: LIVE_SUBPHASES.map((p) => ({
      title: p.title,
      href: p.href,
      current: p.slug === currentSlug,
    })),
    nextPhaseLink: { title: PHASES.sunset.title, href: PHASES.sunset.href },
  };
}

/** @deprecated Use whereThisFitsForLiveSubphase */
export const whereThisFitsForLivePhase = whereThisFitsForLiveSubphase;

export function whereThisFitsForSunsetPhaseLanding(): WhereThisFitsConfig {
  return {
    phaseLabel: PHASES.sunset.title,
    phaseVisual: "sunset",
    priorPhaseLink: { title: PHASES.live.title, href: PHASES.live.href },
    subphases: [],
  };
}

/** @deprecated Use whereThisFitsForSunsetPhaseLanding */
export const whereThisFitsForSunsetRegion = whereThisFitsForSunsetPhaseLanding;

export const LIFECYCLE_PHASE_META: Record<
  LifecyclePhaseId,
  { title: string; href: string; subtitle: string }
> = {
  create: {
    title: PHASES.create.title,
    href: PHASES.create.href,
    subtitle: PHASES.create.subtitle,
  },
  live: {
    title: PHASES.live.title,
    href: PHASES.live.href,
    subtitle: PHASES.live.subtitle,
  },
  sunset: {
    title: PHASES.sunset.title,
    href: PHASES.sunset.href,
    subtitle: PHASES.sunset.subtitle,
  },
};

/** @deprecated Use LIFECYCLE_PHASE_META */
export const REGION_META = LIFECYCLE_PHASE_META;

export const SUBPHASE_META: Record<
  string,
  {
    lifecyclePhase: LifecyclePhaseId;
    lifecyclePhaseHref: string;
    subphase: string;
    subtitle: string;
    path: string;
    where: () => WhereThisFitsConfig;
    showComingSoon?: boolean;
  }
> = {
  discovery: {
    lifecyclePhase: "create",
    lifecyclePhaseHref: PHASES.create.href,
    subphase: "Discovery",
    subtitle:
      "Before anything is designed or built, there is a period of structured listening. The team talks to the people who currently live with the problem, the applicants, the officers, the people caught in the middle, and maps what is actually happening, not what the process document says should happen. The goal is to understand the problem clearly enough that the right solution becomes obvious. The output is a problem statement the whole team agrees on, and enough evidence to justify spending public money on a new service.",
    path: "/create-discovery",
    where: () => whereThisFitsForCreateSubphase("discovery"),
    showComingSoon: false,
  },
  alpha: {
    lifecyclePhase: "create",
    lifecyclePhaseHref: PHASES.create.href,
    subphase: "Alpha",
    subtitle:
      "With a real problem to solve, the team starts making things cheaply and quickly, on purpose. Rough sketches, clickable mockups, and simple prototypes get put in front of real users to test whether the team's assumptions are right. Most of them will not be. Each round of testing replaces a guess with a fact, and the concept gets sharper. The team might try several completely different approaches before one earns enough confidence to build for real. Nothing made in this subphase is meant to last. It is meant to teach.",
    path: "/create-alpha",
    where: () => whereThisFitsForCreateSubphase("alpha"),
    showComingSoon: false,
  },
  mvp: {
    lifecyclePhase: "create",
    lifecyclePhaseHref: PHASES.create.href,
    subphase: "MVP",
    subtitle:
      "The first version built to last does only the essential thing, and goes live to a limited audience or for a narrow use case. The point is to replace test conditions with real ones: real users, real data, real failure modes. The team watches what happens, measures it, and uses what they learn to decide what to build next. A version that teaches the team what users actually need is doing exactly what it is supposed to do.",
    path: "/create-mvp",
    where: () => whereThisFitsForCreateSubphase("mvp"),
    showComingSoon: false,
  },
  stabilization: {
    lifecyclePhase: "live",
    lifecyclePhaseHref: PHASES.live.href,
    subphase: "Stabilization",
    subtitle: "Stabilize the service right after it goes live.",
    path: "/live-stabilization",
    where: () => whereThisFitsForLiveSubphase("stabilization"),
  },
  growth: {
    lifecyclePhase: "live",
    lifecyclePhaseHref: PHASES.live.href,
    subphase: "Growth",
    subtitle: "Add capability as more users arrive.",
    path: "/live-growth",
    where: () => whereThisFitsForLiveSubphase("growth"),
  },
};

/** @deprecated Use SUBPHASE_META */
export const PHASE_META = Object.fromEntries(
  Object.entries(SUBPHASE_META).map(([slug, meta]) => [
    slug,
    {
      region: meta.lifecyclePhase,
      regionHref: meta.lifecyclePhaseHref,
      phase: meta.subphase,
      subtitle: meta.subtitle,
      path: meta.path,
      where: meta.where,
    },
  ]),
) as Record<
  string,
  {
    region: LifecyclePhaseId;
    regionHref: string;
    phase: string;
    subtitle: string;
    path: string;
    where: () => WhereThisFitsConfig;
  }
>;
