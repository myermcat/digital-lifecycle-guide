import type { ReactNode } from "react";
import {
  ArrowInVisual,
  ArrowOutVisual,
  InfinityVisual,
} from "@/components/RegionVisuals";
import { REGIONS, type RegionId } from "@/lib/guide-strings";

export type { RegionId };

export interface PhaseNavItem {
  title: string;
  href: string;
  slug: string;
}

export const CREATE_PHASES: PhaseNavItem[] = [
  { title: "Discovery", href: "/create-discovery", slug: "discovery" },
  { title: "Alpha", href: "/create-alpha", slug: "alpha" },
  { title: "MVP", href: "/create-mvp", slug: "mvp" },
];

export const LIVE_PHASES: PhaseNavItem[] = [
  { title: "Stabilization", href: "/live-stabilization", slug: "stabilization" },
  { title: "Growth", href: "/live-growth", slug: "growth" },
  { title: "Maturity", href: "/live-maturity", slug: "maturity" },
];

export const SUNSET_PHASES: PhaseNavItem[] = [
  { title: "Shutdown", href: "/sunset-shutdown", slug: "shutdown" },
  { title: "Transition", href: "/sunset-transition", slug: "transition" },
];

/** @deprecated Use CREATE_PHASES */
export const BUILD_PHASES = CREATE_PHASES;

export function regionVisual(region: RegionId): ReactNode {
  switch (region) {
    case "create":
      return <ArrowInVisual />;
    case "live":
      return <InfinityVisual />;
    case "sunset":
      return <ArrowOutVisual />;
  }
}

export interface WhereThisFitsConfig {
  regionLabel: string;
  regionVisual: RegionId;
  phases: { title: string; href: string; current?: boolean }[];
  regionLink?: { title: string; href: string };
  priorRegionLink?: { title: string; href: string };
}

export function whereThisFitsForCreatePhase(
  currentSlug: string | null,
): WhereThisFitsConfig {
  return {
    regionLabel: REGIONS.create.title,
    regionVisual: "create",
    phases: CREATE_PHASES.map((p) => ({
      title: p.title,
      href: p.href,
      current: p.slug === currentSlug,
    })),
    regionLink: { title: REGIONS.live.title, href: REGIONS.live.href },
  };
}

/** @deprecated Use whereThisFitsForCreatePhase */
export const whereThisFitsForBuildPhase = whereThisFitsForCreatePhase;

export function whereThisFitsForLivePhase(
  currentSlug: string | null,
): WhereThisFitsConfig {
  return {
    regionLabel: REGIONS.live.title,
    regionVisual: "live",
    phases: LIVE_PHASES.map((p) => ({
      title: p.title,
      href: p.href,
      current: p.slug === currentSlug,
    })),
    regionLink: { title: REGIONS.sunset.title, href: REGIONS.sunset.href },
  };
}

export function whereThisFitsForSunsetRegion(): WhereThisFitsConfig {
  return {
    regionLabel: REGIONS.sunset.title,
    regionVisual: "sunset",
    priorRegionLink: { title: REGIONS.live.title, href: REGIONS.live.href },
    phases: [],
  };
}

export function whereThisFitsForSunsetPhase(
  currentSlug: string | null,
): WhereThisFitsConfig {
  return {
    regionLabel: REGIONS.sunset.title,
    regionVisual: "sunset",
    priorRegionLink: { title: REGIONS.live.title, href: REGIONS.live.href },
    phases: SUNSET_PHASES.map((p) => ({
      title: p.title,
      href: p.href,
      current: p.slug === currentSlug,
    })),
  };
}

export const REGION_META: Record<
  RegionId,
  { title: string; href: string; subtitle: string }
> = {
  create: {
    title: REGIONS.create.title,
    href: REGIONS.create.href,
    subtitle: REGIONS.create.subtitle,
  },
  live: {
    title: REGIONS.live.title,
    href: REGIONS.live.href,
    subtitle: REGIONS.live.subtitle,
  },
  sunset: {
    title: REGIONS.sunset.title,
    href: REGIONS.sunset.href,
    subtitle: REGIONS.sunset.subtitle,
  },
};

export const PHASE_META: Record<
  string,
  {
    region: RegionId;
    regionHref: string;
    phase: string;
    subtitle: string;
    path: string;
    where: () => WhereThisFitsConfig;
  }
> = {
  discovery: {
    region: "create",
    regionHref: REGIONS.create.href,
    phase: "Discovery",
    subtitle: "Understand the problem before you commit to a solution.",
    path: "/create-discovery",
    where: () => whereThisFitsForCreatePhase("discovery"),
  },
  alpha: {
    region: "create",
    regionHref: REGIONS.create.href,
    phase: "Alpha",
    subtitle: "Try things out cheaply before you build the real one.",
    path: "/create-alpha",
    where: () => whereThisFitsForCreatePhase("alpha"),
  },
  mvp: {
    region: "create",
    regionHref: REGIONS.create.href,
    phase: "MVP",
    subtitle: "Build the first real version that will go live.",
    path: "/create-mvp",
    where: () => whereThisFitsForCreatePhase("mvp"),
  },
  stabilization: {
    region: "live",
    regionHref: REGIONS.live.href,
    phase: "Stabilization",
    subtitle: "Stabilize the service right after it goes live.",
    path: "/live-stabilization",
    where: () => whereThisFitsForLivePhase("stabilization"),
  },
  growth: {
    region: "live",
    regionHref: REGIONS.live.href,
    phase: "Growth",
    subtitle: "Add capability as more users arrive.",
    path: "/live-growth",
    where: () => whereThisFitsForLivePhase("growth"),
  },
  shutdown: {
    region: "sunset",
    regionHref: REGIONS.sunset.href,
    phase: "Shutdown",
    subtitle: "End the program when there is no successor.",
    path: "/sunset-shutdown",
    where: () => whereThisFitsForSunsetPhase("shutdown"),
  },
  transition: {
    region: "sunset",
    regionHref: REGIONS.sunset.href,
    phase: "Transition",
    subtitle: "Move users to a successor when one is taking over.",
    path: "/sunset-transition",
    where: () => whereThisFitsForSunsetPhase("transition"),
  },
};
