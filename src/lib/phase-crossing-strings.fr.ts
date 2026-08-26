/**
 * La prose que les trois pages de phase gardaient encore en dur.
 *
 * Un composant de page n’est jamais remplacé par un jumeau français -- seuls
 * les modules sous src/lib le sont -- de sorte que toute phrase écrite
 * directement dans CreatePhasePage, LivePhasePage ou SunsetLandingPage
 * s’affichait en anglais sur le site français.
 *
 * Les phrases de passage sont coupées autour du lien qu’elles contiennent :
 * l’amorce va jusqu’au nom de la phase, le lien porte le nom de la phase, et
 * la suite reprend après. La suite s’ouvre par une espace, parce que le
 * deux-points en prend une.
 */
export const PHASE_CROSSING = {
  createToLiveLeadIn: "Le lancement est le passage vers la phase",
  createToLiveRest:
    " : le service entre en fonction et devient le vrai service que les gens utilisent, à la place de ce qu’ils faisaient avant.",

  liveToSunsetLeadIn: "Sortir de l’Exploitation, c’est le passage vers la phase",
  liveToSunsetRest:
    " : le service est remplacé ou mis hors service, et la sortie doit être planifiée et financée avant que l’argent s’épuise.",

  liveCheckpointsLead: "Voyez où l’Exploitation s’inscrit dans l’ensemble du cycle de vie.",
  sunsetCheckpointsLead: "Voyez où le Retrait s’inscrit dans l’ensemble du cycle de vie.",

  nextDiscoverySubphase: "Sous-phase Découverte",
  nextStabilizationSubphase: "Sous-phase Stabilisation",
} as const;
