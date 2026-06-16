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

export const SUNSET_SUBPHASES: SubphaseNavItem[] = [
  { title: "Shutdown", href: "/sunset-shutdown", slug: "shutdown" },
  { title: "Transition", href: "/sunset-transition", slug: "transition" },
];

/** @deprecated Use CREATE_SUBPHASES */
export const CREATE_PHASES = CREATE_SUBPHASES;

/** @deprecated Use LIVE_SUBPHASES */
export const LIVE_PHASES = LIVE_SUBPHASES;

/** @deprecated Use SUNSET_SUBPHASES */
export const SUNSET_PHASES = SUNSET_SUBPHASES;

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

export function whereThisFitsForSunsetSubphase(
  currentSlug: string | null,
): WhereThisFitsConfig {
  return {
    phaseLabel: PHASES.sunset.title,
    phaseVisual: "sunset",
    priorPhaseLink: { title: PHASES.live.title, href: PHASES.live.href },
    subphases: SUNSET_SUBPHASES.map((p) => ({
      title: p.title,
      href: p.href,
      current: p.slug === currentSlug,
    })),
  };
}

/** @deprecated Use whereThisFitsForSunsetSubphase */
export const whereThisFitsForSunsetPhase = whereThisFitsForSunsetSubphase;

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
  }
> = {
  discovery: {
    lifecyclePhase: "create",
    lifecyclePhaseHref: PHASES.create.href,
    subphase: "Discovery",
    subtitle: "Understand the problem before you commit to a solution.",
    path: "/create-discovery",
    where: () => whereThisFitsForCreateSubphase("discovery"),
  },
  alpha: {
    lifecyclePhase: "create",
    lifecyclePhaseHref: PHASES.create.href,
    subphase: "Alpha",
    subtitle: "Try things out cheaply before you build the real one.",
    path: "/create-alpha",
    where: () => whereThisFitsForCreateSubphase("alpha"),
  },
  mvp: {
    lifecyclePhase: "create",
    lifecyclePhaseHref: PHASES.create.href,
    subphase: "MVP",
    subtitle: "Build the first real version that will go live.",
    path: "/create-mvp",
    where: () => whereThisFitsForCreateSubphase("mvp"),
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
  shutdown: {
    lifecyclePhase: "sunset",
    lifecyclePhaseHref: PHASES.sunset.href,
    subphase: "Shutdown",
    subtitle: "End the program when there is no successor.",
    path: "/sunset-shutdown",
    where: () => whereThisFitsForSunsetSubphase("shutdown"),
  },
  transition: {
    lifecyclePhase: "sunset",
    lifecyclePhaseHref: PHASES.sunset.href,
    subphase: "Transition",
    subtitle: "Move users to a successor when one is taking over.",
    path: "/sunset-transition",
    where: () => whereThisFitsForSunsetSubphase("transition"),
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
