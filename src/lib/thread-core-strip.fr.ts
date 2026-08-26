export type ThreadCoreStripTile = {
  label: string;
  gloss: string;
};

export type ThreadCoreStripContent = {
  heading: string;
  tiles: readonly ThreadCoreStripTile[];
  /** When true, show arrows between tiles (a genuine sequence). */
  sequenced?: boolean;
};

export const SECURITY_CORE_STRIP = {
  heading: "LE CYCLE DE VIE DE LA SÉCURITÉ",
  tiles: [
    { label: "Repérer", gloss: "savoir ce qui est à risque" },
    { label: "Protéger", gloss: "bâtir les défenses" },
    { label: "Détecter", gloss: "repérer vite les ennuis" },
    { label: "Intervenir", gloss: "le contenir" },
    { label: "Rétablir", gloss: "rétablir et apprendre" },
  ],
} as const satisfies ThreadCoreStripContent;

export const PRIVACY_CORE_STRIP = {
  heading: "LE CŒUR DE LA PROTECTION DE LA VIE PRIVÉE",
  tiles: [
    { label: "Recueillir le minimum", gloss: "seulement ce qui est nécessaire" },
    { label: "Informer les gens", gloss: "un avis clair" },
    { label: "Les protéger", gloss: "des mesures de protection dès la conception" },
    { label: "Réévaluer et disposer", gloss: "une ÉFVP, puis supprimer" },
  ],
} as const satisfies ThreadCoreStripContent;

export const ACCESSIBILITY_CORE_STRIP = {
  heading: "LE CŒUR DE L’ACCESSIBILITÉ",
  tiles: [
    { label: "La loi s’applique", gloss: "c’est une obligation légale" },
    { label: "Bâtir selon la norme", gloss: "EN 301 549, WCAG 2.1 AA" },
    { label: "Acheter accessible", gloss: "une condition d’achat" },
    { label: "Tester avec de vraies personnes", gloss: "pas seulement des outils" },
  ],
} as const satisfies ThreadCoreStripContent;

export const USER_RESEARCH_CORE_STRIP = {
  heading: "LE CŒUR DE LA RECHERCHE SUR LES UTILISATEURS",
  tiles: [
    { label: "Comprendre les besoins", gloss: "avant de bâtir" },
    { label: "Tester avec de vraies personnes", gloss: "pas seulement à la fin" },
    { label: "Inclure tout le monde", gloss: "un échantillon diversifié" },
    { label: "Continuer d’écouter", gloss: "après le lancement aussi" },
  ],
} as const satisfies ThreadCoreStripContent;

export const BACKLOG_CORE_STRIP = {
  heading: "LE CŒUR D’UN CARNET DE PRODUIT",
  tiles: [
    { label: "Une liste priorisée", gloss: "le travail, ordonné" },
    { label: "Ancré dans les besoins des utilisateurs", gloss: "chaque élément" },
    { label: "Un seul responsable", gloss: "en fixe l’ordre" },
    { label: "Jamais terminé", gloss: "affiné au fur et à mesure" },
  ],
} as const satisfies ThreadCoreStripContent;

export const ETHICS_AND_BIAS_CORE_STRIP = {
  heading: "LE CŒUR DE L’ÉTHIQUE ET DES BIAIS",
  tiles: [
    { label: "Vérifier qui il touche", gloss: "même sans IA" },
    { label: "Évaluer l’incidence", gloss: "l’ÉIA" },
    { label: "Garder une personne responsable", gloss: "supervision et recours" },
    { label: "Être transparent à ce sujet", gloss: "expliquer et publier" },
  ],
} as const satisfies ThreadCoreStripContent;

export const JOINED_UP_DELIVERY_CORE_STRIP = {
  heading: "LE CŒUR DE LA PRESTATION INTÉGRÉE",
  tiles: [
    { label: "Cartographier le parcours complet", gloss: "voir la tâche entière de l’utilisateur" },
    { label: "Travailler par-delà les frontières", gloss: "convenir du déroulement du parcours" },
    { label: "Connecter les systèmes", gloss: "pour qu’ils échangent l’information" },
    { label: "Garder les canaux au diapason", gloss: "en ligne, par téléphone, en personne" },
  ],
} as const satisfies ThreadCoreStripContent;

export const DATA_STEWARDSHIP_CORE_STRIP = {
  heading: "LE CŒUR DE L’INTENDANCE DES DONNÉES",
  tiles: [
    { label: "Responsabilité", gloss: "un seul responsable nommé" },
    { label: "Qualité", gloss: "aptes à l’usage" },
    { label: "Conservation et disposition", gloss: "conserver, puis disposer" },
    { label: "Migration sûre", gloss: "les transférer intactes" },
  ],
} as const satisfies ThreadCoreStripContent;

export const RELEASING_CHANGES_CORE_STRIP = {
  heading: "LE CŒUR DE LA MISE EN PRODUCTION DES CHANGEMENTS",
  tiles: [
    { label: "Petit et fréquent", gloss: "pas d’un seul coup" },
    { label: "Chaîne automatisée", gloss: "testé avant de sortir" },
    { label: "Déployer progressivement", gloss: "une tranche d’abord, puis observer" },
    { label: "Revenir en arrière vite", gloss: "annuler un mauvais changement" },
  ],
} as const satisfies ThreadCoreStripContent;

export const DEPENDENCIES_AND_STANDARDS_CORE_STRIP = {
  heading: "LE CŒUR DES DÉPENDANCES ET DES NORMES",
  tiles: [
    { label: "Bâtir sur des normes ouvertes", gloss: "pour que les pièces se connectent et se remplacent" },
    { label: "Savoir ce dont vous dépendez", gloss: "un inventaire à jour" },
    { label: "Évaluer avant d’adopter", gloss: "entretenu et sécuritaire" },
    { label: "Le garder à jour", gloss: "et sous surveillance" },
  ],
} as const satisfies ThreadCoreStripContent;

export const TEAM_CAPABILITY_CORE_STRIP = {
  heading: "LE CŒUR DE LA CAPACITÉ DE L’ÉQUIPE",
  tiles: [
    { label: "Les bons rôles", gloss: "l’ensemble des compétences dont un service a besoin, dans une seule équipe" },
    { label: "Ceux qu’il vous faut, gardés proches", gloss: "un petit noyau interne, plus une carte claire de qui d’autre appeler" },
    { label: "Tenue à jour", gloss: "des compétences renouvelées à mesure que le travail change" },
  ],
} as const satisfies ThreadCoreStripContent;

export const CHANGE_MANAGEMENT_CORE_STRIP = {
  heading: "LE CŒUR DE LA GESTION DU CHANGEMENT",
  tiles: [
    { label: "Prêt", gloss: "les gens connaissent le changement et veulent l’opérer" },
    { label: "Capable", gloss: "les gens savent comment, et peuvent réellement le faire" },
    { label: "Maintenu", gloss: "le changement est renforcé jusqu’à ce qu’il tienne" },
  ],
} as const satisfies ThreadCoreStripContent;

export const MONITORING_CORE_STRIP = {
  heading: "INSTRUMENTER, VOIR, AGIR",
  tiles: [
    { label: "L’instrumenter", gloss: "intégrer les signaux" },
    { label: "Le voir", gloss: "quelques signaux qui comptent" },
    { label: "Agir dessus", gloss: "les signaux deviennent du travail" },
  ],
  sequenced: true,
} as const satisfies ThreadCoreStripContent;

function threadCoreStripAltText(content: ThreadCoreStripContent): string {
  const pillars = content.tiles
    .map((tile) => `${tile.label}, ${tile.gloss}`)
    .join("; ");
  return `${content.heading} : ${pillars}.`;
}

export { threadCoreStripAltText };
