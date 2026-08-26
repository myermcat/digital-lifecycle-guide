import createSubphasesVisual from "@/assets/create_subphases.svg?url";
import liveSubphasesVisual from "@/assets/live_subphases.svg?url";
import phasesAndSubphasesVisual from "@/assets/phases_and_subphases.svg?url";
import serviceDashboardVisual from "@/assets/service_dashboard.svg?url";
import bothOfficialLanguagesVisual from "@/assets/both_official_languages.svg?url";
import whatKillsAServiceVisual from "@/assets/what_kills_a_service.svg?url";
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
    alt: "Création, Exploitation et Retrait, la Création étant divisée en Découverte, Alpha et Bêta, et l’Exploitation en Stabilisation, Croissance et Maturité.",
  },
  createSubphases: {
    src: createSubphasesVisual,
    alt: "Découverte, Alpha et Bêta : les trois sous-phases de la Création, de la compréhension du problème à un vrai service prêt à être lancé.",
  },
  liveSubphases: {
    src: liveSubphasesVisual,
    alt: "Stabilisation, Croissance et Maturité : les trois sous-phases de l’Exploitation, d’un service tout juste lancé à un service maintenu en santé sur le long terme.",
  },
  subphaseKeyDiscovery: {
    src: subphaseKeyDiscoveryVisual,
    alt: "Comprendre le problème auprès des personnes qui le vivent. Décider s’il faut réutiliser, acheter ou construire. S’arrêter ici est un bon résultat.",
  },
  subphaseKeyAlpha: {
    src: subphaseKeyAlphaVisual,
    alt: "Éprouver d’abord l’idée la plus risquée. Prototyper à peu de frais et essayer plus d’une approche. Le jeter, le code et la plupart des idées.",
  },
  alphaPrototypeLadder: {
    src: alphaPrototypeLadderVisual,
    alt: "L’échelle des prototypes : une esquisse sur papier que vous dessinez vous-même ou avec un collègue, puis une maquette des écrans, puis un prototype cliquable qu’un outil d’IA construit en quelques minutes, puis un prototype codé qu’un développeur construit à partir de celui-ci.",
  },
  subphaseKeyBeta: {
    src: subphaseKeyBetaVisual,
    alt: "Le construire pour de vrai, à la qualité de production. Signer le contrat, votre sortie se gagne ici. Le prouver, bêta privée puis bêta publique.",
  },
  subphaseKeyStabilization: {
    src: subphaseKeyStabilizationVisual,
    alt: "L’observer chaque jour, la pleine charge révèle ce que les tests ont manqué. Le corriger vite, le constructeur est encore joignable. Régler les restes : inscriptions, transfert, l’ancienne façon encore en marche.",
  },
  subphaseKeyGrowth: {
    src: subphaseKeyGrowthVisual,
    alt: "Construire par petits cycles de vie : chaque ajout obtient sa propre Découverte, son Alpha, sa Bêta. Les points de contrôle reviennent : vie privée, automatisation, architecture, approvisionnement. Faire croître les utilisateurs aussi : adoption, soutien et échelle montent ensemble.",
  },
  subphaseKeyMaturity: {
    src: subphaseKeyMaturityVisual,
    alt: "Garder le cycle en marche : surveillance, correctifs, recherche, déclarations. Renouveler avant la fin : financement et contrats, des mois de marge. Guetter la sortie : les signaux qui pointent vers le Retrait.",
  },
  whatKillsAService: {
    src: whatKillsAServiceVisual,
    alt: "Où se trouve habituellement le risque : la politique ne le permet pas, personne n’a le pouvoir légal, les données n’existent pas, les gens n’utiliseront pas ce canal, un autre ministère détient une étape. Aucun de ces risques n’est dans le logiciel. Où les équipes passent habituellement leur Alpha : à construire et à tester le prototype, parce que c’est la partie qu’on peut voir. Une flèche entre les deux porte l’étiquette « le décalage ».",
  },
  bothOfficialLanguages: {
    src: bothOfficialLanguagesVisual,
    alt: "Le même écran en anglais et en français, côte à côte, marqués égaux : même jour, même qualité. Les étiquettes et le bouton français sont visiblement plus longs que les anglais, et une note dit que le français est environ un cinquième plus long, de sorte qu’une mise en page construite autour des chaînes anglaises doit céder.",
  },
  serviceDashboard: {
    src: serviceDashboardVisual,
    alt: "Exemple de tableau de bord de service montrant la disponibilité, la satisfaction de la clientèle, le taux d’erreur et des courbes de tendance.",
  },
} satisfies Record<string, LifecycleVisualAsset>;

/** Full lifecycle map + phase sub-phase map, stacked at the foot of sub-phase pages. */
export function subphaseFootVisuals(lifecyclePhase: string): LifecycleVisualAsset[] {
  const phaseVisual =
    lifecyclePhase === "Exploitation"
      ? LIFECYCLE_VISUALS.liveSubphases
      : LIFECYCLE_VISUALS.createSubphases;
  return [LIFECYCLE_VISUALS.phasesAndSubphases, phaseVisual];
}
