import type { LifecyclePhaseId } from "@/lib/guide-strings";
import { THREADS, type ThreadSlug } from "@/lib/guide-strings";

export interface ThreadPhaseNote {
  lifecyclePhase: LifecyclePhaseId;
  body: string;
}

/** @deprecated Use ThreadPhaseNote */
export interface ThreadRegionNote {
  lifecyclePhase: LifecyclePhaseId;
  body: string;
}

export interface ThreadTopicSection {
  title: string;
  body: string;
}

export interface ThreadContent {
  slug: ThreadSlug;
  title: string;
  stakes: string;
  whatGoodLooksLike: string[];
  whyItMatters: string;
  whoseJob: string;
  byPhase: ThreadPhaseNote[];
  /** Optional thematic sections (e.g. Joined-up delivery). */
  topicSections?: ThreadTopicSection[];
  furtherReading: { label: string; href: string }[];
}

function placeholderThread(
  slug: ThreadSlug,
  stakesTopic: string,
): ThreadContent {
  const title = THREADS[slug].title;
  return {
    slug,
    title,
    stakes: `Cette page expliquera ce que signifie ${stakesTopic} tout au long du cycle de vie et pourquoi cela compte pour les services numériques fédéraux.`,
    whatGoodLooksLike: [
      `Cette page décrira la barre concrète à franchir pour ${title.toLowerCase()} pendant la Création.`,
      `Cette page décrira à quoi ressemble la réussite pour ${title.toLowerCase()} pendant l’Exploitation.`,
      `Cette page décrira à quoi ressemble la réussite pour ${title.toLowerCase()} pendant le Retrait.`,
    ],
    whyItMatters: `Cette page couvrira le principe et les enjeux humains derrière ${title.toLowerCase()}.`,
    whoseJob: `Cette page expliquera comment ${title.toLowerCase()} se partage au sein de l’équipe, sans appartenir à une seule personne.`,
    byPhase: [
      {
        lifecyclePhase: "create",
        body: `Cette page décrira comment ${title.toLowerCase()} se manifeste pendant la Création.`,
      },
      {
        lifecyclePhase: "live",
        body: `Cette page décrira comment ${title.toLowerCase()} se manifeste pendant l’Exploitation.`,
      },
      {
        lifecyclePhase: "sunset",
        body: `Cette page décrira comment ${title.toLowerCase()} se manifeste pendant le Retrait.`,
      },
    ],
    furtherReading: [],
  };
}

export const THREAD_CONTENT: Record<ThreadSlug, ThreadContent> = {
  accessibility: {
    slug: "accessibility",
    title: "Accessibilité",
    stakes:
      "L’accessibilité est une exigence légale pour les services fédéraux et une exigence pratique pour tous ceux qui les utilisent. Quand des obstacles subsistent, des personnes sont exclues et le service manque à son mandat.",
    whatGoodLooksLike: [
      "Le service respecte au minimum le niveau AA des WCAG 2.1.",
      "Les utilisateurs handicapés sont inclus dans la recherche et les tests, et non seulement dans les analyses automatisées.",
      "L’accessibilité est vérifiée avant la mise en production et selon un calendrier récurrent pendant l’Exploitation.",
      "Les problèmes trouvés sont suivis, priorisés et corrigés comme tout autre défaut.",
    ],
    whyItMatters:
      "Un service qui fonctionne pour certaines personnes mais pas pour d’autres n’est pas terminé. L’accessibilité est une question de dignité et d’accès égal — et de construire quelque chose qui fonctionne encore quand les circonstances, les appareils ou les capacités changent.",
    whoseJob:
      "L’accessibilité est un travail partagé. Les concepteurs, les développeurs, les rédacteurs de contenu et les responsables de produit en portent chacun une part. Aucun rôle ne peut la porter seul.",
    byPhase: [
      {
        lifecyclePhase: "create",
        body: "Intégrez l’accessibilité dès le départ : recherche inclusive, prototypes accessibles, et normes dans les critères d’acceptation avant toute mise en service.",
      },
      {
        lifecyclePhase: "live",
        body: "L’essentiel du travail continu se joue ici : tests de régression, surveillance des dérives, correction des problèmes signalés par les utilisateurs, et maintien de la compatibilité avec les technologies d’assistance.",
      },
      {
        lifecyclePhase: "sunset",
        body: "Gardez les parcours accessibles ouverts jusqu’à ce que le dernier utilisateur soit parti. Ne retirez pas les canaux de soutien ni la documentation sur lesquels des gens comptent encore.",
      },
    ],
    furtherReading: [
      {
        label: "Système de design du gouvernement du Canada — Accessibilité",
        href: "https://design-system.canada.ca/",
      },
      {
        label: "Loi canadienne sur l’accessibilité",
        href: "https://www.canada.ca/en/employment-social-development/programs/accessible-canada.html",
      },
    ],
  },
  "monitoring-and-instrumentation": {
    ...placeholderThread(
      "monitoring-and-instrumentation",
      "surveillance et instrumentation",
    ),
    stakes:
      "On ne peut pas améliorer ce qu’on ne mesure pas. L’instrumentation transforme les impressions en preuves — et les tableaux de bord sont une façon de rendre ces preuves visibles.",
    whatGoodLooksLike: [
      "Les signaux viennent du service et de son infrastructure, non d’une saisie manuelle.",
      "L’équipe surveille un petit ensemble d’indicateurs qui reflètent l’expérience réelle des utilisateurs et l’état du système.",
      "Les tableaux de bord sont lisibles, dignes de confiance et visibles pour les organes qui vous examinent.",
      "Ce que la surveillance vous apprend mène à des décisions, non seulement à des rapports.",
    ],
    whyItMatters:
      "Sans instrumentation, vous devinez. Un service peut sembler correct tout en desservant mal les utilisateurs sans que vous le remarquiez. La surveillance est ce qui vous permet de remarquer les problèmes avant qu’ils deviennent des crises.",
    whoseJob:
      "Les développeurs instrumentent le service. Toute l’équipe choisit quoi surveiller et agit sur ce qu’elle voit. Les tableaux de bord sont un outil d’équipe, non une vitrine.",
    byPhase: [
      {
        lifecyclePhase: "create",
        body: "Décidez quoi mesurer avant la mise en service. Intégrez l’instrumentation à la première version réelle, non après coup.",
      },
      {
        lifecyclePhase: "live",
        body: "L’essentiel du travail de surveillance se joue ici : tableaux de bord, alertes, suivi du rendement, et transformation des signaux en éléments du carnet de produit.",
      },
      {
        lifecyclePhase: "sunset",
        body: "Poursuivez la surveillance jusqu’à ce que le dernier utilisateur soit parti. Guettez les retardataires et les défaillances pendant la transition.",
      },
    ],
  },
  "releasing-changes": placeholderThread("releasing-changes", "mettre en production les changements en toute sécurité"),
  "dependencies-and-standards": placeholderThread(
    "dependencies-and-standards",
    "dépendances et normes ouvertes",
  ),
  "user-research": placeholderThread("user-research", "recherche sur les utilisateurs"),
  privacy: {
    ...placeholderThread("privacy", "privacy"),
    stakes:
      "Les données personnelles doivent être protégées et traitées licitement. Les manquements à la protection de la vie privée entraînent des conséquences juridiques et de réputation.",
    whatGoodLooksLike: [
      "Les évaluations de la protection de la vie privée sont à jour.",
      "Les règles de consentement et de conservation sont respectées.",
      "Seules les données nécessaires sont recueillies et conservées.",
      "Des procédures d’intervention en cas d’atteinte sont en place.",
    ],
  },
  procurement: placeholderThread(
    "procurement",
    "approvisionnement et contrats",
  ),
  "data-stewardship": placeholderThread("data-stewardship", "intendance des données"),
  "ethics-and-bias": placeholderThread("ethics-and-bias", "éthique et biais"),
  "team-capability": placeholderThread("team-capability", "capacité de l’équipe"),
  backlog: placeholderThread("backlog", "gestion du carnet de produit"),
  "joined-up-delivery": {
    slug: "joined-up-delivery",
    title: "Prestation intégrée",
    stakes:
      "Les utilisateurs vivent un parcours complet, non des services ou des canaux isolés. Quand les parties s’éloignent les unes des autres, le service échoue même si chaque équipe fait son travail.",
    whatGoodLooksLike: [
      "Les services adjacents sont coordonnés pour que les transferts fonctionnent de bout en bout.",
      "Tous les canaux racontent la même histoire sur ce que le service fait aujourd’hui.",
      "Le personnel des opérations et les centres d’appels restent au diapason quand le service en ligne change.",
      "Quelqu’un est responsable de la vue transversale, même quand la prestation est répartie entre plusieurs équipes.",
    ],
    whyItMatters:
      "Un utilisateur se moque de savoir quelle équipe possède quel système. Ce qui lui importe, c’est de pouvoir terminer ce qu’il est venu faire.",
    whoseJob:
      "La prestation intégrée est partagée. Les responsables de produit, les responsables de service et les responsables de canal en portent chacun une part pour garder le parcours complet cohérent.",
    byPhase: [
      {
        lifecyclePhase: "create",
        body: "Cartographiez tôt le parcours de l’utilisateur entre les services. Concevez les transferts avant de construire en vase clos.",
      },
      {
        lifecyclePhase: "live",
        body: "L’essentiel du travail de coordination se joue ici : garder les services adjacents alignés et tous les canaux à jour à mesure que le service évolue.",
      },
      {
        lifecyclePhase: "sunset",
        body: "Coordonnez la sortie entre les services et les canaux pour que les utilisateurs ne restent pas coincés entre l’ancien et le nouveau.",
      },
    ],
    topicSections: [
      {
        title: "Coordination entre services",
        body: "Cette page couvrira le travail avec les équipes responsables des services de part et d’autre du vôtre, pour que le parcours complet de l’utilisateur continue de fonctionner et pas seulement votre partie.",
      },
      {
        title: "Cohérence entre les canaux",
        body: "Cette page couvrira le maintien de la synchronisation des scripts de centre d’appels, du personnel des opérations et des autres canaux quand le service en ligne change.",
      },
    ],
    furtherReading: [],
  },
  "change-management": placeholderThread("change-management", "gestion du changement"),
};
