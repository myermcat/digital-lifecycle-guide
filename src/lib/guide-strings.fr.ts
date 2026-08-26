/**
 * Central naming for the guide — lifecycle phases, threads, review levels, and shared copy.
 * Import from here when displaying labels or building routes.
 */

export const GUIDE_ASSUMPTIONS_TEXT =
  "Vous travaillez déjà selon les Normes relatives au numérique du gouvernement du Canada : concevoir avec les utilisateurs, itérer et améliorer fréquemment, travailler ouvertement, utiliser des normes et des solutions ouvertes, gérer les risques en matière de sécurité et de protection des renseignements personnels, intégrer l’accessibilité dès le début, permettre au personnel d’offrir de meilleurs services, être de bons gestionnaires de données, concevoir des services éthiques et collaborer largement, ainsi que selon la loi en matière de protection des renseignements personnels, de sécurité, de langues officielles et d’accessibilité. Les normes précisent comment le gouvernement travaille dans le monde numérique. Les six compétences numériques du gouvernement du Canada précisent ce que chaque fonctionnaire doit être capable de faire pour travailler ainsi, et la page sur l’équipe les présente. Le présent guide s’appuie sur elles.";

/**
 * Canonical Create / Live / Sunset descriptions — short paragraphs for readability.
 * Home and any other page that describes a phase should read from here.
 */
export type PhaseDescriptionParagraph =
  | string
  | {
      text: string;
      bold?: readonly string[];
    };

export function phaseDescriptionPlainText(
  paragraphs: readonly PhaseDescriptionParagraph[],
): string {
  return paragraphs
    .map((paragraph) => (typeof paragraph === "string" ? paragraph : paragraph.text))
    .join(" ");
}

export const PHASE_DESCRIPTIONS = {
  create: [
    "Tout commence par un problème à résoudre, bien avant qu’un système existe.",
    'De « nous avons un problème » à une solution qui fonctionne entre les mains de vrais utilisateurs, vous cherchez à comprendre quel est vraiment le problème, à décider comment le résoudre, et à mettre cette solution en place, que ce soit en réutilisant, en achetant, en construisant avec une équipe à contrat ou en construisant à l’interne.',
    "L’arrêt fait partie des résultats possibles, et c’est parfois le bon : le service le moins coûteux est celui dont vous avez découvert que vous n’aviez pas besoin.",
    "Les personnes à qui le service est destiné y participent dès le départ : on fait de la recherche avec elles, on prototype avec elles et on teste avec elles tout au long du parcours, et l’équipe les tient informées à mesure que le travail avance.",
    "Presque tout ce qui suit se décide ici.",
  ],
  live: [
    "De loin la phase la plus longue.",
    "La solution fonctionne, et vous la gardez utile : vous surveillez son rendement, vous l’améliorez et vous répondez aux nouveaux besoins à mesure qu’ils apparaissent, tout en pensant déjà au jour où elle sera mise hors service ou remplacée.",
    "L’attention ne s’interrompt jamais, et la conversation non plus : les utilisateurs continuent de façonner le service par leurs commentaires, les appels au soutien et la recherche, et on leur annonce les changements avant qu’ils surviennent.",
  ],
  sunset: [
    {
      text: "La solution arrive à son terme, et le travail consiste à déterminer comment la mettre hors service ou la remplacer proprement.",
      bold: ["mettre hors service ou la remplacer"],
    },
    "Vous planifiez la mise hors service, le transfert ou l’archivage des données, et vous amenez les utilisateurs en toute sécurité vers ce qui suit. Les utilisateurs sont informés tôt, souvent et en mots simples : ce qui ferme, quand, et où aller à la place.",
    "Vous sortez du Retrait quand le service est complètement fermé et que ses données et ses utilisateurs ont trouvé un foyer sûr. Au gouvernement, ce foyer est habituellement un service de remplacement, construit pendant que l’ancien service fonctionnait encore : sa Création a donc commencé bien avant.",
  ],
} as const satisfies Record<string, readonly PhaseDescriptionParagraph[]>;

export const PHASES = {
  create: {
    id: "create" as const,
    title: "Création",
    pageHeading: "Comment fonctionne la phase Création",
    href: "/create",
    subtitle:
      "Déterminer quoi construire et livrer la première version qui sera mise en service.",
    expandedIntro: phaseDescriptionPlainText(PHASE_DESCRIPTIONS.create),
    deepLinkLabel: "Aller à la phase Création",
  },
  live: {
    id: "live" as const,
    title: "Exploitation",
    pageHeading: "Comment fonctionne la phase Exploitation",
    href: "/live",
    subtitle: "Exploiter le service après sa mise en service.",
    expandedIntro: phaseDescriptionPlainText(PHASE_DESCRIPTIONS.live),
    deepLinkLabel: "Aller à la phase Exploitation",
  },
  sunset: {
    id: "sunset" as const,
    title: "Retrait",
    pageHeading: "Comment fonctionne la phase Retrait",
    href: "/sunset",
    subtitle: "Fermer le service ou amener les utilisateurs vers ce qui suit.",
    expandedIntro: phaseDescriptionPlainText(PHASE_DESCRIPTIONS.sunset),
    deepLinkLabel: "Aller à la phase Retrait",
  },
} as const;

export type LifecyclePhaseId = keyof typeof PHASES;

/** @deprecated Use LifecyclePhaseId */
export type RegionId = LifecyclePhaseId;

export const PHASE_ORDER: LifecyclePhaseId[] = ["create", "live", "sunset"];

/** @deprecated Use PHASES */
export const REGIONS = PHASES;

/** @deprecated Use PHASE_ORDER */
export const REGION_ORDER = PHASE_ORDER;

/** Cross-cutting threads — each covers a practice across the whole lifecycle. */
export const THREADS = {
  "monitoring-and-instrumentation": {
    title: "Surveillance et instrumentation",
    slug: "monitoring-and-instrumentation",
    path: "/thread/monitoring-and-instrumentation",
  },
  "releasing-changes": {
    title: "Mise en production des changements",
    slug: "releasing-changes",
    path: "/thread/releasing-changes",
  },
  "dependencies-and-standards": {
    title: "Dépendances et normes",
    slug: "dependencies-and-standards",
    path: "/thread/dependencies-and-standards",
  },
  "user-research": {
    title: "Recherche sur les utilisateurs",
    slug: "user-research",
    path: "/thread/user-research",
  },
  accessibility: {
    title: "Accessibilité",
    slug: "accessibility",
    path: "/thread/accessibility",
  },
  security: {
    title: "Sécurité",
    slug: "security",
    path: "/thread/security",
  },
  privacy: {
    title: "Protection de la vie privée",
    slug: "privacy",
    path: "/thread/privacy",
  },
  procurement: {
    title: "Approvisionnement",
    slug: "procurement",
    path: "/thread/procurement",
  },
  "data-stewardship": {
    title: "Intendance des données",
    slug: "data-stewardship",
    path: "/thread/data-stewardship",
  },
  "ethics-and-bias": {
    title: "Éthique et biais",
    slug: "ethics-and-bias",
    path: "/thread/ethics-and-bias",
  },
  "team-capability": {
    title: "Capacité de l’équipe",
    slug: "team-capability",
    path: "/thread/team-capability",
  },
  backlog: {
    title: "Carnet de produit",
    slug: "backlog",
    path: "/thread/backlog",
  },
  "joined-up-delivery": {
    title: "Prestation intégrée",
    slug: "joined-up-delivery",
    path: "/thread/joined-up-delivery",
  },
  funding: {
    title: "Financement",
    slug: "funding",
    path: "/thread/funding",
  },
  "change-management": {
    title: "Gestion du changement",
    slug: "change-management",
    path: "/thread/change-management",
  },
} as const;

export type ThreadSlug = keyof typeof THREADS;

export function threadPath(slug: ThreadSlug) {
  return THREADS[slug].path;
}
