import type { ReactNode } from "react";
import {
  ArrowInVisual,
  ArrowOutVisual,
  InfinityVisual,
} from "@/components/RegionVisuals";

export type RegionId = "build" | "live" | "sunset";

export interface PhaseNavItem {
  title: string;
  href: string;
  slug: string;
}

export const BUILD_PHASES: PhaseNavItem[] = [
  { title: "Discovery", href: "/build-discovery", slug: "discovery" },
  { title: "Alpha", href: "/build-alpha", slug: "alpha" },
  { title: "MVP", href: "/build-mvp", slug: "mvp" },
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

export function regionVisual(region: RegionId): ReactNode {
  switch (region) {
    case "build":
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

export function whereThisFitsForBuildPhase(
  currentSlug: string | null,
): WhereThisFitsConfig {
  return {
    regionLabel: "Build",
    regionVisual: "build",
    phases: BUILD_PHASES.map((p) => ({
      title: p.title,
      href: p.href,
      current: p.slug === currentSlug,
    })),
    regionLink: { title: "Live", href: "/live" },
  };
}

export function whereThisFitsForLivePhase(
  currentSlug: string | null,
): WhereThisFitsConfig {
  return {
    regionLabel: "Live",
    regionVisual: "live",
    phases: LIVE_PHASES.map((p) => ({
      title: p.title,
      href: p.href,
      current: p.slug === currentSlug,
    })),
    regionLink: { title: "Sunset", href: "/sunset" },
  };
}

export function whereThisFitsForSunsetRegion(): WhereThisFitsConfig {
  return {
    regionLabel: "Sunset",
    regionVisual: "sunset",
    priorRegionLink: { title: "Live", href: "/live" },
    phases: [],
  };
}

export function whereThisFitsForSunsetPhase(
  currentSlug: string | null,
): WhereThisFitsConfig {
  return {
    regionLabel: "Sunset",
    regionVisual: "sunset",
    priorRegionLink: { title: "Live", href: "/live" },
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
  build: {
    title: "Build",
    href: "/build",
    subtitle: "Figure out what to build and deliver the first version that will go live.",
  },
  live: {
    title: "Live",
    href: "/live",
    subtitle: "Run the service after it goes live.",
  },
  sunset: {
    title: "Sunset",
    href: "/sunset",
    subtitle: "Shut down the service or move users to what comes next.",
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
    region: "build",
    regionHref: "/build",
    phase: "Discovery",
    subtitle: "Understand the problem before you commit to a solution.",
    path: "/build-discovery",
    where: () => whereThisFitsForBuildPhase("discovery"),
  },
  alpha: {
    region: "build",
    regionHref: "/build",
    phase: "Alpha",
    subtitle: "Try things out cheaply before you build the real one.",
    path: "/build-alpha",
    where: () => whereThisFitsForBuildPhase("alpha"),
  },
  mvp: {
    region: "build",
    regionHref: "/build",
    phase: "MVP",
    subtitle: "Build the first real version that will go live.",
    path: "/build-mvp",
    where: () => whereThisFitsForBuildPhase("mvp"),
  },
  stabilization: {
    region: "live",
    regionHref: "/live",
    phase: "Stabilization",
    subtitle: "Stabilize the service right after it goes live.",
    path: "/live-stabilization",
    where: () => whereThisFitsForLivePhase("stabilization"),
  },
  growth: {
    region: "live",
    regionHref: "/live",
    phase: "Growth",
    subtitle: "Add capability as more users arrive.",
    path: "/live-growth",
    where: () => whereThisFitsForLivePhase("growth"),
  },
  shutdown: {
    region: "sunset",
    regionHref: "/sunset",
    phase: "Shutdown",
    subtitle: "End the program when there is no successor.",
    path: "/sunset-shutdown",
    where: () => whereThisFitsForSunsetPhase("shutdown"),
  },
  transition: {
    region: "sunset",
    regionHref: "/sunset",
    phase: "Transition",
    subtitle: "Move users to a successor when one is taking over.",
    path: "/sunset-transition",
    where: () => whereThisFitsForSunsetPhase("transition"),
  },
};
