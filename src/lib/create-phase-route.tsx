import { createFileRoute } from "@tanstack/react-router";
import { PhasePlaceholderPage } from "@/components/PhasePlaceholderPage";
import { PHASE_META, REGION_META, type RegionId } from "@/lib/lifecycle-navigation";
import {
  whereThisFitsForBuildPhase,
  whereThisFitsForLivePhase,
  whereThisFitsForSunsetPhase,
  whereThisFitsForSunsetRegion,
} from "@/lib/lifecycle-navigation";

export function createPhaseRoute(slug: keyof typeof PHASE_META) {
  const meta = PHASE_META[slug];
  const regionTitle = meta.region.charAt(0).toUpperCase() + meta.region.slice(1);

  return createFileRoute(meta.path)({
    head: () => ({
      meta: [
        {
          title: `${meta.phase} — ${regionTitle} — The Digital Lifecycle Guide`,
        },
        { name: "description", content: meta.subtitle },
      ],
    }),
    component: () => (
      <PhasePlaceholderPage
        id={meta.path.slice(1)}
        region={regionTitle}
        regionHref={meta.regionHref}
        phase={meta.phase}
        intro={meta.subtitle}
        whereThisFits={meta.where()}
      />
    ),
  });
}

export function createRegionRoute(region: RegionId) {
  const meta = REGION_META[region];
  const where =
    region === "build"
      ? () => whereThisFitsForBuildPhase(null)
      : region === "live"
        ? () => whereThisFitsForLivePhase(null)
        : () => whereThisFitsForSunsetRegion();

  return createFileRoute(meta.href)({
    head: () => ({
      meta: [
        {
          title: `${meta.title} — The Digital Lifecycle Guide`,
        },
        { name: "description", content: meta.subtitle },
      ],
    }),
    component: () => (
      <PhasePlaceholderPage
        id={region}
        region={meta.title}
        regionHref={meta.href}
        intro={meta.subtitle}
        whereThisFits={where()}
      />
    ),
  });
}
