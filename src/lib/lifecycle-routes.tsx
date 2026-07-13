import { createFileRoute, type FileRoutesByPath } from "@tanstack/react-router";
import { PhasePlaceholderPage } from "@/components/PhasePlaceholderPage";
import {
  LIFECYCLE_PHASE_META,
  SUBPHASE_META,
  phasePageDocumentTitle,
  subphasePageDocumentTitle,
  whereThisFitsForCreateSubphase,
  whereThisFitsForLiveSubphase,
  whereThisFitsForSunsetPhaseLanding,
  type LifecyclePhaseId,
} from "@/lib/lifecycle-navigation";
import { PHASES } from "@/lib/guide-strings";
import { phaseLeavingSlugOrNull } from "@/lib/phase-leaving-content";

export function createSubphaseRoute(slug: keyof typeof SUBPHASE_META) {
  const meta = SUBPHASE_META[slug];
  const lifecyclePhaseTitle = LIFECYCLE_PHASE_META[meta.lifecyclePhase].title;

  return createFileRoute(meta.path as keyof FileRoutesByPath)({
    head: () => ({
      meta: [
        {
          title: subphasePageDocumentTitle(meta.pageHeading, lifecyclePhaseTitle),
        },
        { name: "description", content: meta.subtitle },
      ],
    }),
    component: () => (
      <PhasePlaceholderPage
        id={meta.path.slice(1)}
        pageHeading={meta.pageHeading}
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
          title: phasePageDocumentTitle(PHASES[lifecyclePhase].pageHeading),
        },
        { name: "description", content: meta.subtitle },
      ],
    }),
    component: () => (
      <PhasePlaceholderPage
        id={lifecyclePhase}
        pageHeading={PHASES[lifecyclePhase].pageHeading}
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
