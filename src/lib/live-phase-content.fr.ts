import type { SourceItem } from "@/components/SourcesBlock";
import type { PhaseQuoteContent } from "@/components/PhaseQuote";
import { phaseQuotePlainText } from "@/components/PhaseQuote";
import { PHASES, THREADS, type ThreadSlug } from "@/lib/guide-strings";

export type LiveSubphaseRow = {
  title: string;
  description: string;
  href: string;
};

export const LIVE_PHASE = {
  title: PHASES.live.pageHeading,

  quote: {
    lead: "La phase la plus longue. Le service est en fonction, et le travail consiste à le garder utile :",
    items: [
      "surveiller son rendement",
      "le corriger et l’améliorer",
      "ajouter des capacités à mesure que les utilisateurs affluent",
      "le garder sécurisé et financé, année après année",
      "et, bien avant le dernier jour, se préparer au Retrait",
    ],
  } satisfies PhaseQuoteContent,

  // Four separate points, and as one column of identical paragraphs a reader could not tell them
  // apart. Each carries the heading of the thing it is actually about.
  lead: [
    {
      heading: "Le lancement est le début du travail d’exploitation",
      text: "C’est ici que se termine le travail ponctuel de mise en place du service, et que le service devient une chose dont une équipe prend soin. Le lancement n’est pas la ligne d’arrivée. C’est le moment où le service commence à être utilisé, où ses coûts de fonctionnement démarrent, et où il a besoin de soins constants pour rester utile.",
    },
    {
      heading: "L’Exploitation est sans terme, et le travail est un cycle",
      text: "L’Exploitation est sans terme. Il n’y a pas de date de livraison unique à viser comme la Création a son lancement. Parfois une fin est déjà connue, quand un contrat court pour une durée fixe ou qu’une politique fixe une date de retrait, mais même alors le travail quotidien est un cycle. Ce cycle se répète aussi longtemps que le service est utilisé : surveiller son rendement, le corriger et l’améliorer, continuer d’écouter les personnes qui l’utilisent, le garder sécurisé, et renouveler son financement en temps voulu. Les trois sous-phases ci-dessous marquent comment le cycle change à mesure que le service mûrit.",
    },
    {
      heading: "Pensez au Retrait pendant que le service fonctionne",
      text: "Pensez au Retrait pendant que vous exploitez. Tout service se termine, et les équipes qui terminent bien sont celles qui l’ont vu venir : elles guettent les signaux qui annoncent le retrait ou le remplacement, gardent la sortie possible au fil des renouvellements de contrat, et mettent l’argent de côté avant la fin du financement actuel.",
    },
    {
      heading: "Un remplacement chevauche le service qu’il remplace",
      text: "Si quelque chose doit remplacer ce service, la planification commence des années avant le dernier jour, parce que l’ancien service reste disponible jusqu’à ce que le nouveau soit stable depuis un certain temps. Avant cela, le remplacement doit traverser sa propre Découverte, Alpha, Bêta et Stabilisation, ainsi que tout concours qui les accompagne. Pendant une bonne partie de ce temps, un ministère paie pour les deux, et l’équipe met un service hors service tout en en mettant un autre en place.",
    },
  ],

  costOfLate: {
    title: "Le coût de l’attente",
    lead: "Le travail récurrent est facile à reporter, et chaque report a un prix :",
    items: [
      {
        heading: "Le renouvellement commence tard.",
        line: "La seule option qui reste est une prolongation d’urgence aux conditions du fournisseur, et le verrouillage s’aggrave.",
      },
      {
        heading: "L’amélioration est reportée.",
        line: "Le service vieillit jusqu’à un remplacement forcé, mené en urgence à date fixe. Le dernier cas célèbre du genre s’appelait Phénix.",
      },
      {
        heading: "L’argent de la sortie n’est jamais mis de côté.",
        line: "Les signaux annoncent le Retrait, et il n’y a rien pour payer le passage.",
      },
      {
        heading: "Les évaluations deviennent périmées.",
        line: "Une nouvelle fonctionnalité attend une évaluation de la protection de la vie privée qui aurait dû être tenue à jour à mesure que le service changeait.",
      },
      {
        heading: "Le soutien est mis à l’échelle après la vague.",
        line: "Les utilisateurs arrivent avant l’aide, et des gens qui se débrouillent seuls deviennent la réputation du service.",
      },
    ],
  },

  subphases: {
    id: "live-in-three-sub-phases",
    title: "L’Exploitation en trois sous-phases",
    intro:
      "L’Exploitation se déroule en trois sous-phases. Elles marquent comment le travail change à mesure que le service mûrit : le stabiliser juste après le lancement, le faire croître à mesure que les utilisateurs affluent, et le garder en santé sur le long terme.",
    rows: [
      {
        title: "Stabilisation",
        description: "Tout juste lancé; le rendre fiable sous une charge réelle et complète.",
        href: "/live-stabilization",
      },
      {
        title: "Croissance",
        description: "Étendre la portée, les fonctionnalités et l’échelle.",
        href: "/live-growth",
      },
      {
        title: "Maturité",
        description: "Régime stable; le garder en santé sur le long terme.",
        href: "/live-maturity",
      },
    ] satisfies LiveSubphaseRow[],
    leavingLine:
      "Quitter l’Exploitation, c’est le passage vers le Retrait : le service est remplacé ou mis hors service, et la sortie doit être planifiée et financée avant que l’argent manque.",
  },

  workOfLive: {
    id: "the-work-of-live",
    title: "Le travail de l’Exploitation",
    introBold:
      "L’Exploitation, c’est trois types de travail menés en parallèle aussi longtemps que le service est utilisé.",
    blocks: [
      {
        heading: "1. Le garder en fonction.",
        lead: "Un service en exploitation doit rester fiable sous une charge réelle et complète.",
        bullets: [
          {
            text: "L’équipe l’observe au moyen de la surveillance et agit sur ce que montrent les signaux.",
            internalLinks: [{ phrase: "monitoring", to: "/thread/monitoring-and-instrumentation" }],
          },
          {
            text: "Les changements sont mis en production en petits lots et souvent, pour que les correctifs et les améliorations sortent en toute sécurité.",
            internalLinks: [{ phrase: "released", to: "/thread/releasing-changes" }],
          },
          {
            text: "Le travail de sécurité se poursuit : les problèmes sont repérés et contenus.",
            internalLinks: [{ phrase: "sécurité", to: "/thread/security" }],
          },
          {
            text: "Ses dépendances sont maintenues à jour et corrigées.",
            internalLinks: [{ phrase: "dependencies", to: "/thread/dependencies-and-standards" }],
          },
        ],
      },
      {
        heading: "2. Continuer à l’améliorer.",
        lead: "L’usage réel est l’une des meilleures preuves dont dispose une équipe pour décider quoi construire ensuite.",
        bullets: [
          {
            text: "Une nouvelle recherche sur les utilisateurs montre quoi corriger et quoi ajouter.",
            internalLinks: [
              { phrase: "recherche sur les utilisateurs", to: "/thread/user-research" },
            ],
          },
          {
            text: "Le carnet de produit est l’endroit où cela devient du travail priorisé.",
            internalLinks: [{ phrase: "backlog", to: "/thread/backlog" }],
          },
          {
            text: "La gestion du changement gagne l’adoption qui transforme un changement livré en un changement que les gens utilisent réellement.",
            internalLinks: [{ phrase: "gestion du changement", to: "/thread/change-management" }],
          },
        ],
      },
      {
        heading: "3. Le garder financé et conforme aux règles.",
        lead: "Un service en exploitation doit être entretenu pour continuer de bien fonctionner.",
        bullets: [
          {
            text: "Son financement est renouvelé avant que l’argent actuel s’épuise. Les points de contrôle qu’un service numérique du GC doit franchir indiquent quels points de contrôle s’appliquent encore une fois le service en fonction.",
            internalLinks: [
              { phrase: "funding", to: "/thread/funding" },
              {
                phrase: "Les points de contrôle qu’un service numérique du GC doit franchir",
                to: "/gate-map",
              },
            ],
          },
          {
            text: "S’il traite des renseignements personnels, son évaluation de la protection de la vie privée est tenue à jour à mesure que le service change.",
            internalLinks: [{ phrase: "privacy", to: "/thread/privacy" }],
          },
          {
            text: "Son accessibilité est maintenue à la norme.",
            internalLinks: [{ phrase: "accessibility", to: "/thread/accessibility" }],
          },
          {
            text: "Ses données sont conservées et éliminées selon le calendrier.",
            internalLinks: [{ phrase: "data", to: "/thread/data-stewardship" }],
          },
          {
            text: "L’équipe qui le comprend est maintenue en place.",
            internalLinks: [{ phrase: "team", to: "/thread/team-capability" }],
          },
        ],
      },
    ],
    closing: {
      leadIn: "Le travail revient.",
      text: "Les vérifications de l’Exploitation reviennent : une vérification de sécurité à chaque mise en production, l’évaluation de la protection de la vie privée renouvelée à mesure que le service change, le financement renouvelé avant qu’il s’épuise. L’Exploitation s’installe dans un rythme et continue.",
    },
  },

  whatRuns: {
    id: "what-runs-in-live",
    title: "Ce qui fonctionne pendant l’Exploitation",
    intro:
      "Chaque fil transversal continue de courir pendant l’Exploitation. Quelques-uns portent l’essentiel du poids ici :",
    coreThreads: [
      {
        slug: "monitoring-and-instrumentation",
        title: THREADS["monitoring-and-instrumentation"].title,
        note: "Guetter les signaux et les transformer en travail; l’essentiel de la surveillance se joue ici.",
      },
      {
        slug: "backlog",
        title: THREADS.backlog.title,
        note: "Décider quoi améliorer ensuite; c’est le plus long chapitre de l’amélioration continue.",
      },
      {
        slug: "releasing-changes",
        title: THREADS["releasing-changes"].title,
        note: "Mettre en production de petits changements souvent, et les déployer en toute sécurité.",
      },
      {
        slug: "change-management",
        title: THREADS["change-management"].title,
        note: "Gagner l’adoption, pour que le service soit réellement utilisé.",
      },
      {
        slug: "security",
        title: THREADS.security.title,
        note: "Détecter et intervenir, et garder le service corrigé et à jour.",
      },
    ] satisfies readonly { slug: ThreadSlug; title: string; note: string }[],
    obligations: {
      lead: "Et les obligations qui reviennent ici :",
      items: [
        "renouveler le financement avant que l’argent s’épuise",
        "tenir à jour l’évaluation de la protection de la vie privée",
        "maintenir le service à la norme d’accessibilité",
        "corriger les dépendances",
        "conserver et éliminer les données selon le calendrier",
        "vérifier de nouveau que le service peut réellement être rétabli dans le délai promis",
        "garder l’équipe en place",
      ],
    },
  },

  reviews: {
    id: "live-reviews-come-round-again",
    title: "Les vérifications de l’Exploitation reviennent",
    text: "La Création passe par des approbations ponctuelles. L’Exploitation fonctionne autrement : ses vérifications reviennent. Intégrez une vérification de sécurité à chaque mise en production, mettez à jour l’évaluation de la protection de la vie privée quand le service change de façon importante, et obtenez le financement de renouvellement avant la fin de l’argent actuel. On redemande aussi ici à quel point le service est essentiel et à quelle vitesse il doit revenir. La Stabilisation vérifie si les cibles de rétablissement fixées en Alpha sont atteignables. La Croissance les rouvre quand le service change, et la Maturité les repasse selon le propre cycle du ministère. Le travail ne se termine pas; il revient.",
  },

  sources: [
    {
      label: "Modèles et outils",
      linkKey: "gc-service-inventory",
      description:
        "Répertoire des services du GC (Gouvernement ouvert) : le jeu de données où le service en fonction est inscrit.",
    },
    {
      label: "Instrument directeur",
      linkKey: "guideline-service-digital",
      description: "Ligne directrice sur les services et le numérique (SCT).",
    },
    {
      label: "Référence complémentaire",
      linkKey: "apm-gcwiki",
      description:
        "Carrefour d’orientation sur la gestion du portefeuille d’applications (wiki GCcollab).",
    },
  ] satisfies SourceItem[],
} as const;

export const livePhaseLeadPlainText = [
  phaseQuotePlainText(LIVE_PHASE.quote),
  ...LIVE_PHASE.lead.map((paragraph) => paragraph.text),
].join(" ");
