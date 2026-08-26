import type { SubphaseExtract } from "@/components/SubphaseExtractCard";
import type { ThreadLinkedProse } from "@/lib/thread-rich-content";

export type SubphaseWhatHappensPoint = ThreadLinkedProse & {
  lead: string;
};

export type SubphaseOnRampChecklist = {
  title: string;
  intro?: string;
  items: readonly (string)[]; // discovery uses plain strings; some pages may render richer nodes in dedicated components
};

export type SubphaseBodyContent = {
  lead: string;
  whatHappens: {
    intro: string;
    points: readonly SubphaseWhatHappensPoint[];
    closing: string;
  };
  onRamp: SubphaseOnRampChecklist;
};

/** Reader-facing H1 on sub-phase pages only; nav and breadcrumbs keep the short title. */
export const SUBPHASE_PAGE_HEADINGS = {
  discovery: "Comment fonctionne la sous-phase Découverte",
  alpha: "Comment fonctionne la sous-phase Alpha",
  beta: "Comment fonctionne la sous-phase Bêta",
  stabilization: "Comment fonctionne la sous-phase Stabilisation",
  growth: "Comment fonctionne la sous-phase Croissance",
  maturity: "Comment fonctionne la sous-phase Maturité",
} as const;

export type SubphaseSlug = keyof typeof SUBPHASE_PAGE_HEADINGS;

/**
 * The dashed extract cards for sub-phases whose full pages are not built yet
 * (rendered on the placeholder), plus Maturity's card on its built page.
 * Stabilization's card lives with its full page content in live-stabilization-content.ts.
 */
export const SUBPHASE_EXTRACTS: Partial<Record<SubphaseSlug, SubphaseExtract>> = {
  growth: {
    spine: "La Croissance sert à étendre ce que le service fait et les personnes qu’il sert, pendant qu’il fonctionne.",
    opening: {
      text: "La Croissance est la deuxième sous-phase de l’Exploitation. Le service étant stable, l’équipe :",
      internalLinks: [{ phrase: "Exploitation", to: "/live" }],
    },
    workOutItems: [
      "ajoute des capacités, en faisant passer chaque fonctionnalité importante par sa propre petite Découverte, Alpha et Bêta",
      "travaille l’adoption jusqu’à ce que les personnes visées utilisent réellement le service",
      "fait croître le service, le soutien et le contrat à mesure que les utilisateurs affluent",
    ],
    scoped: {
      text: "La Croissance est un mode. Un service en sort quand sa portée se stabilise, et y revient avec le prochain ajout important.",
    },
    whatsNew: {
      label: "Nouveau depuis la Stabilisation",
      text: "Le changement redevient délibéré. L’équipe construit du nouveau à l’intérieur d’un service en fonctionnement.",
    },
    takeaway: {
      text: "Une nouvelle fonctionnalité importante ramène les points de contrôle antérieurs : protection des renseignements personnels, automatisation, architecture, approvisionnement.",
      bold: [
        {
          phrase:
            "Une nouvelle fonctionnalité importante ramène les points de contrôle antérieurs : protection des renseignements personnels, automatisation, architecture, approvisionnement.",
        },
      ],
    },
  },
  maturity: {
    spine: "La Maturité sert à garder en santé un service stable, année après année.",
    opening: {
      text: "La Maturité est la troisième sous-phase de l’Exploitation, et la plus longue. Année après année, l’équipe :",
      internalLinks: [{ phrase: "Exploitation", to: "/live" }],
    },
    workOutItems: [
      "maintient le cycle de santé : surveillance, correctifs, recherche sur les utilisateurs et déclarations annuelles",
      "renouvelle le financement et le contrat avant que l’un ou l’autre n’expire",
      "guette les signaux qui annoncent le Retrait",
    ],
    scoped: {
      text: "La Maturité ne se termine que par une sortie : un retour à la Croissance sur un nouveau mandat, ou le passage au Retrait.",
    },
    whatsNew: {
      label: "Nouveau depuis la Croissance",
      text: "La portée s’est stabilisée. Le travail passe de l’extension du service à son maintien.",
    },
    takeaway: {
      text: "Les renouvellements sont le piège : le financement et les contrats expirent selon leur propre calendrier, et le délai nécessaire est facile à sous-estimer.",
      bold: [
        {
          phrase:
            "Les renouvellements sont le piège : le financement et les contrats expirent selon leur propre calendrier, et le délai nécessaire est facile à sous-estimer.",
        },
      ],
    },
  },
};

export const SUBPHASE_CONTENT: Partial<Record<string, SubphaseBodyContent>> = {
  discovery: {
    lead:
      "La Découverte est la première sous-phase de la Création, et rien n’y est construit. C’est une période d’écoute structurée : l’équipe parle aux personnes qui vivent le problème aujourd’hui, les demandeurs, les agents, les personnes prises entre les deux, et cartographie ce qui se passe réellement sur le terrain, au-delà de ce que prétend le document de processus. Le travail consiste à comprendre le problème assez bien pour que la bonne réponse devienne évidente, et à déterminer si un nouveau service est même la réponse. La Découverte peut se terminer par la décision de ne rien construire, et c’est un bon résultat.",
    whatHappens: {
      intro: "La Découverte, c’est quelques activités menées ensemble :",
      points: [
        {
          lead: "Trouver le besoin réel.",
          text: "Par la recherche sur les utilisateurs, l’équipe parle aux personnes qui utilisent ou exploitent le service aujourd’hui et les observe, afin d’apprendre ce dont elles ont réellement besoin plutôt que ce que l’on suppose.",
          internalLinks: [{ phrase: "recherche sur les utilisateurs", to: "/thread/user-research" }],
        },
        {
          lead: "Cartographier la tâche entière.",
          text: "L’équipe suit la tâche telle qu’une personne la vit, à travers chaque canal et tout autre service touché, pour que le problème soit compris de bout en bout. C’est le point de départ de la prestation intégrée.",
          internalLinks: [{ phrase: "prestation intégrée", to: "/thread/joined-up-delivery" }],
        },
        {
          lead: "Peser la réutilisation, l’achat ou la construction.",
          text: "Avant que la moindre solution soit nommée, l’équipe vérifie si quelque chose existe déjà à réutiliser ou à acheter, puisque c’est ainsi que la plupart des services gouvernementaux existants ont été mis en place. L’analyse des options explique comment comparer les choix, et l’approvisionnement couvre l’étape du regard avant l’achat.",
          internalLinks: [
            { phrase: "analyse des options", to: "/reference/options-analysis" },
            { phrase: "procurement", to: "/thread/procurement" },
          ],
        },
      ],
      closing:
        "Le résultat de la Découverte, c’est un problème sur lequel toute l’équipe s’entend, la preuve qu’il est réel et qu’il vaut la peine d’être résolu, et une première idée de la façon d’y répondre. Cette preuve est ce qui justifie de dépenser des fonds publics pour la sous-phase suivante, ou de décider d’arrêter.",
    },
    onRamp: {
      title: "Avant de commencer la Découverte.",
      intro: "Vous arrivez sur un service déjà en Découverte ? Vérifiez que ceci est vrai :",
      items: [
        "Il y a un problème réel et nommé, et non simplement une solution que quelqu’un veut construire.",
        "Les personnes qui vivent le problème, les utilisateurs et le personnel qui les sert, ont été identifiées.",
        "Quelqu’un est responsable de la découverte et peut agir sur ce qu’elle révèle.",
        "L’équipe est libre de conclure que le service ne devrait pas être construit.",
      ],
    },
  },
} as const;

