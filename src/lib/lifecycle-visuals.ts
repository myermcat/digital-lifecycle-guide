import createSubphasesVisual from "@/assets/create_subphases.svg?url";
import liveSubphasesVisual from "@/assets/live_subphases.svg?url";
import phasesAndSubphasesVisual from "@/assets/phases_and_subphases.svg?url";
import serviceDashboardVisual from "@/assets/service_dashboard.svg?url";
import subphaseKeyAlphaVisual from "@/assets/subphase_key_alpha.svg?url";
import subphaseKeyBetaVisual from "@/assets/subphase_key_beta.svg?url";
import subphaseKeyDiscoveryVisual from "@/assets/subphase_key_discovery.svg?url";

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
  subphaseKeyDiscovery: {
    src: subphaseKeyDiscoveryVisual,
    alt: "Understand the problem from the people living with it. Decide whether to reuse, buy, or build. Stopping here is a good outcome.",
  },
  subphaseKeyAlpha: {
    src: subphaseKeyAlphaVisual,
    alt: "Test the riskiest idea first. Prototype cheaply and try more than one approach. Throw it away, the code and most of the ideas.",
  },
  subphaseKeyBeta: {
    src: subphaseKeyBetaVisual,
    alt: "Build it for real at production quality. Sign the contract, your exit is won here. Prove it, private beta then public beta.",
  },
  serviceDashboard: {
    src: serviceDashboardVisual,
    alt: "Example service dashboard showing availability, customer satisfaction, error rate, and trend charts.",
  },
} satisfies Record<string, LifecycleVisualAsset>;

/** Full lifecycle map + phase sub-phase map, stacked at the foot of sub-phase pages. */
export function subphaseFootVisuals(lifecyclePhase: string): LifecycleVisualAsset[] {
  const phaseVisual =
    lifecyclePhase === "Live"
      ? LIFECYCLE_VISUALS.liveSubphases
      : LIFECYCLE_VISUALS.createSubphases;
  return [LIFECYCLE_VISUALS.phasesAndSubphases, phaseVisual];
}
