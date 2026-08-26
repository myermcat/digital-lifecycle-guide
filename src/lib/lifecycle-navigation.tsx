import type { ReactNode } from "react";
import {
  ArrowInVisual,
  ArrowOutVisual,
  InfinityVisual,
} from "@/components/PhaseVisuals";
import { PHASES, type LifecyclePhaseId } from "@/lib/guide-strings";
import type { SectionNavLink } from "@/components/SubphaseSectionNav";
import { SUBPHASE_PAGE_HEADINGS } from "@/lib/subphase-content";
import { NAV_STRINGS } from "@/lib/lifecycle-navigation-strings";

/** @deprecated Prefer PHASES[id].pageHeading */
export function howThePhaseWorksTitle(phaseName: string): string {
  return NAV_STRINGS.howThePhaseWorks(phaseName);
}

/** @deprecated Prefer SUBPHASE_PAGE_HEADINGS or SUBPHASE_META[slug].pageHeading */
export function howTheSubphaseWorksTitle(subphaseName: string): string {
  return NAV_STRINGS.howTheSubphaseWorks(subphaseName);
}

export function phasePageDocumentTitle(pageHeading: string): string {
  return `${pageHeading} — ${NAV_STRINGS.documentTitleSuffix}`;
}

export function subphasePageDocumentTitle(
  pageHeading: string,
  lifecyclePhaseTitle: string,
): string {
  return `${pageHeading} — ${lifecyclePhaseTitle} — ${NAV_STRINGS.documentTitleSuffix}`;
}

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
  { title: NAV_STRINGS.subphase.discovery, href: "/create-discovery", slug: "discovery" },
  { title: NAV_STRINGS.subphase.alpha, href: "/create-alpha", slug: "alpha" },
  { title: NAV_STRINGS.subphase.beta, href: "/create-beta", slug: "beta" },
];

export const LIVE_SUBPHASES: SubphaseNavItem[] = [
  { title: NAV_STRINGS.subphase.stabilization, href: "/live-stabilization", slug: "stabilization" },
  { title: NAV_STRINGS.subphase.growth, href: "/live-growth", slug: "growth" },
  { title: NAV_STRINGS.subphase.maturity, href: "/live-maturity", slug: "maturity" },
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
    pageHeading: string;
    subtitle: string;
    path: string;
    where: () => WhereThisFitsConfig;
    showComingSoon?: boolean;
    sectionNav?: { prev?: SectionNavLink; next?: SectionNavLink };
  }
> = {
  discovery: {
    lifecyclePhase: "create",
    lifecyclePhaseHref: PHASES.create.href,
    subphase: NAV_STRINGS.subphase.discovery,
    pageHeading: SUBPHASE_PAGE_HEADINGS.discovery,
    subtitle: NAV_STRINGS.subtitle.discovery,
    path: "/create-discovery",
    where: () => whereThisFitsForCreateSubphase("discovery"),
    showComingSoon: false,
  },
  alpha: {
    lifecyclePhase: "create",
    lifecyclePhaseHref: PHASES.create.href,
    subphase: NAV_STRINGS.subphase.alpha,
    pageHeading: SUBPHASE_PAGE_HEADINGS.alpha,
    subtitle: NAV_STRINGS.subtitle.alpha,
    path: "/create-alpha",
    where: () => whereThisFitsForCreateSubphase("alpha"),
    showComingSoon: false,
  },
  beta: {
    lifecyclePhase: "create",
    lifecyclePhaseHref: PHASES.create.href,
    subphase: NAV_STRINGS.subphase.beta,
    pageHeading: SUBPHASE_PAGE_HEADINGS.beta,
    subtitle: NAV_STRINGS.subtitle.beta,
    path: "/create-beta",
    where: () => whereThisFitsForCreateSubphase("beta"),
    showComingSoon: false,
  },
  stabilization: {
    lifecyclePhase: "live",
    lifecyclePhaseHref: PHASES.live.href,
    subphase: NAV_STRINGS.subphase.stabilization,
    pageHeading: SUBPHASE_PAGE_HEADINGS.stabilization,
    subtitle: NAV_STRINGS.subtitle.stabilization,
    path: "/live-stabilization",
    where: () => whereThisFitsForLiveSubphase("stabilization"),
    sectionNav: {
      prev: { href: "/live", label: NAV_STRINGS.navLabel.livePhase, level: "phase" },
      next: { href: "/live-growth", label: NAV_STRINGS.navLabel.growthSubphase, level: "subphase" },
    },
  },
  growth: {
    lifecyclePhase: "live",
    lifecyclePhaseHref: PHASES.live.href,
    subphase: NAV_STRINGS.subphase.growth,
    pageHeading: SUBPHASE_PAGE_HEADINGS.growth,
    subtitle: NAV_STRINGS.subtitle.growth,
    path: "/live-growth",
    where: () => whereThisFitsForLiveSubphase("growth"),
    sectionNav: {
      prev: { href: "/live-stabilization", label: NAV_STRINGS.navLabel.stabilizationSubphase, level: "subphase" },
      next: { href: "/live-maturity", label: NAV_STRINGS.navLabel.maturitySubphase, level: "subphase" },
    },
  },
  maturity: {
    lifecyclePhase: "live",
    lifecyclePhaseHref: PHASES.live.href,
    subphase: NAV_STRINGS.subphase.maturity,
    pageHeading: SUBPHASE_PAGE_HEADINGS.maturity,
    subtitle: NAV_STRINGS.subtitle.maturity,
    path: "/live-maturity",
    where: () => whereThisFitsForLiveSubphase("maturity"),
    showComingSoon: false,
    sectionNav: {
      prev: { href: "/live-growth", label: NAV_STRINGS.navLabel.growthSubphase, level: "subphase" },
      next: { href: "/sunset", label: NAV_STRINGS.navLabel.sunsetPhase, level: "phase" },
    },
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
