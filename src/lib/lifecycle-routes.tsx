import { createFileRoute, type FileRoutesByPath } from "@tanstack/react-router";
import { PhasePlaceholderPage } from "@/components/PhasePlaceholderPage";
import {
  LIFECYCLE_PHASE_META,
  SUBPHASE_META,
  whereThisFitsForCreateSubphase,
  whereThisFitsForLiveSubphase,
  whereThisFitsForSunsetPhaseLanding,
  type LifecyclePhaseId,
} from "@/lib/lifecycle-navigation";
import { phaseLeavingSlugOrNull } from "@/lib/phase-leaving-content";

export function createSubphaseRoute(slug: keyof typeof SUBPHASE_META) {
  const meta = SUBPHASE_META[slug];
  const lifecyclePhaseTitle = LIFECYCLE_PHASE_META[meta.lifecyclePhase].title;

  return createFileRoute(meta.path as keyof FileRoutesByPath)({
    head: () => ({
      meta: [
        {
          title: `${meta.subphase} — ${lifecyclePhaseTitle} — The Digital Lifecycle Guide`,
        },
        { name: "description", content: meta.subtitle },
      ],
    }),
    component: () => (
      <PhasePlaceholderPage
        id={meta.path.slice(1)}
        lifecyclePhase={lifecyclePhaseTitle}
        lifecyclePhaseHref={meta.lifecyclePhaseHref}
        subphase={meta.subphase}
        intro={meta.subtitle}
        whereThisFits={meta.where()}
        subphaseLeavingSlug={phaseLeavingSlugOrNull(slug)}
        showComingSoon={meta.showComingSoon}
      />
    ),
  });
}

/** @deprecated Use createSubphaseRoute */
export const createPhaseRoute = createSubphaseRoute;

export function createLifecyclePhaseRoute(lifecyclePhase: LifecyclePhaseId) {
  const meta = LIFECYCLE_PHASE_META[lifecyclePhase];
  const where =
    lifecyclePhase === "create"
      ? () => whereThisFitsForCreateSubphase(null)
      : lifecyclePhase === "live"
        ? () => whereThisFitsForLiveSubphase(null)
        : () => whereThisFitsForSunsetPhaseLanding();

  return createFileRoute(meta.href as keyof FileRoutesByPath)({
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
        id={lifecyclePhase}
        lifecyclePhase={meta.title}
        lifecyclePhaseHref={meta.href}
        intro={meta.subtitle}
        whereThisFits={where()}
      />
    ),
  });
}

/** @deprecated Use createLifecyclePhaseRoute */
export const createRegionRoute = createLifecyclePhaseRoute;
