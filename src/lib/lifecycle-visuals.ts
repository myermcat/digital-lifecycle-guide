import createSubphasesVisual from "@/assets/create_subphases.svg?url";
import liveSubphasesVisual from "@/assets/live_subphases.svg?url";
import phasesAndSubphasesVisual from "@/assets/phases_and_subphases.svg?url";
import serviceDashboardVisual from "@/assets/service_dashboard.svg?url";
import bothOfficialLanguagesVisual from "@/assets/both_official_languages.svg?url";
import alphaPrototypeLadderVisual from "@/assets/alpha_prototype_ladder.svg?url";
import subphaseKeyAlphaVisual from "@/assets/subphase_key_alpha.svg?url";
import subphaseKeyBetaVisual from "@/assets/subphase_key_beta.svg?url";
import subphaseKeyDiscoveryVisual from "@/assets/subphase_key_discovery.svg?url";
import subphaseKeyStabilizationVisual from "@/assets/subphase_key_stabilization.svg?url";
import subphaseKeyMaturityVisual from "@/assets/subphase_key_maturity.svg?url";
import subphaseKeyGrowthVisual from "@/assets/subphase_key_growth.svg?url";

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
  alphaPrototypeLadder: {
    src: alphaPrototypeLadderVisual,
    alt: "The prototype ladder: a paper sketch you draw yourself or with a friend, then a mock-up of the screens, then a clickable prototype an AI tool builds in minutes, then a coded prototype a developer builds from it.",
  },
  subphaseKeyBeta: {
    src: subphaseKeyBetaVisual,
    alt: "Build it for real at production quality. Sign the contract, your exit is won here. Prove it, private beta then public beta.",
  },
  subphaseKeyStabilization: {
    src: subphaseKeyStabilizationVisual,
    alt: "Watch it daily, full load finds what testing missed. Fix it fast, the builder is still on call. Clear the leftovers: registrations, handover, the old way retired.",
  },
  subphaseKeyGrowth: {
    src: subphaseKeyGrowthVisual,
    alt: "Build in small lifecycles: each addition gets its own Discovery, Alpha, Beta. The checkpoints return: privacy, automation, architecture, procurement. Grow the users too: adoption, support, and scale rise together.",
  },
  subphaseKeyMaturity: {
    src: subphaseKeyMaturityVisual,
    alt: "Keep the cycle turning: monitoring, patching, research, filings. Renew before it ends: funding and contracts, months of runway. Watch for the exit: the signals that point to Sunset.",
  },
  bothOfficialLanguages: {
    src: bothOfficialLanguagesVisual,
    alt: "The same screen in English and in French, side by side, marked equal: same day, same quality. The French labels and the French button are visibly longer than the English ones, and a note says French runs roughly a fifth longer, so a layout built around English strings has to give.",
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
