/**
 * The prose the three phase pages still held inline.
 *
 * A page component is never swapped for a French twin -- only modules under
 * src/lib are -- so any sentence written directly in CreatePhasePage,
 * LivePhasePage or SunsetLandingPage rendered in English on the French site.
 * The phase-crossing sentences at the foot of Create and Live were the visible
 * ones; the checkpoint-map leads and the two sub-phase nav labels had the same
 * problem.
 *
 * The crossing sentences are split around the link they contain: the lead-in
 * runs up to the phase name, the link carries the phase name itself, and the
 * rest picks up after it. In French the rest opens with a space, because the
 * colon takes one.
 */
export const PHASE_CROSSING = {
  createToLiveLeadIn: "Launch is the crossing into",
  createToLiveRest:
    ": the service goes live and becomes the real one people use, in place of whatever they did before.",

  liveToSunsetLeadIn: "Leaving Live is the crossing into",
  liveToSunsetRest:
    ": the service is being replaced or retired, and the exit has to be planned and funded before the money runs out.",

  liveCheckpointsLead: "See where Live sits in the whole lifecycle.",
  sunsetCheckpointsLead: "See where Sunset sits in the whole lifecycle.",

  nextDiscoverySubphase: "Discovery sub-phase",
  nextStabilizationSubphase: "Stabilization sub-phase",
} as const;
