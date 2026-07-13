import createSubphasesVisual from "@/assets/create_subphases.svg?url";
import liveSubphasesVisual from "@/assets/live_subphases.svg?url";
import phasesAndSubphasesVisual from "@/assets/phases_and_subphases.svg?url";

export type LifecycleVisualAsset = {
  src: string;
  alt: string;
};

export const LIFECYCLE_VISUALS = {
  phasesAndSubphases: {
    src: phasesAndSubphasesVisual,
    alt: "Create, Live, and Sunset, with Create split into Discovery, Alpha, and Beta, and Live split into Stabilization, Growth, and Maturity.",
  },
  createSubphases: {
    src: createSubphasesVisual,
    alt: "Discovery, Alpha, and Beta: the three sub-phases of Create, from understanding the problem to a real service ready to launch.",
  },
  liveSubphases: {
    src: liveSubphasesVisual,
    alt: "Stabilization, Growth, and Maturity: the three sub-phases of Live, from a just-launched service to one kept healthy over the long term.",
  },
} satisfies Record<string, LifecycleVisualAsset>;

export function subphaseVisualForLifecyclePhase(lifecyclePhase: string): LifecycleVisualAsset {
  return lifecyclePhase === "Live"
    ? LIFECYCLE_VISUALS.liveSubphases
    : LIFECYCLE_VISUALS.createSubphases;
}
