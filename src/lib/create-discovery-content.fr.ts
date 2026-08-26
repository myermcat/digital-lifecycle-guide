import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Activity,
  Briefcase,
  Eye,
  Map,
  PenTool,
  Scale,
  Shield,
  Target,
  Users,
} from "lucide-react";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { FinishBlock } from "@/components/SubphaseFinishSection";
import type { SectionNavLink } from "@/components/SubphaseSectionNav";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";

export const DISCOVERY_EXTRACT = {
  spine: "La Découverte sert à comprendre le problème avant que quoi que ce soit soit engagé.",
  opening: {
    text: "La Découverte est la première sous-phase de la Création, et rien n’y est construit. L’équipe détermine :",
    internalLinks: [{ phrase: "Création", to: "/create" }],
  } satisfies ThreadLinkedProse,
  workOutItems: [
    "quel est le vrai problème",
    "qui le vit",
    "si un nouveau service est même la bonne réponse",
  ],
  closing: {
    text: "Fixez un objectif au départ : nommez ce que la découverte doit permettre d’apprendre. C’est ainsi que l’équipe sait qu’elle a terminé.",
  } satisfies ThreadLinkedProse,
};

export const DISCOVERY_EXTRACT_CLOSING: ThreadLinkedProse = {
  text: "La Découverte peut se terminer par la décision de ne rien construire, et c’est une réussite.",
  bold: [{ phrase: "La Découverte peut se terminer par la décision de ne rien construire, et c’est une réussite." }],
};

export const DISCOVERY_ON_RAMP = {
  title: "Avant de commencer la Découverte",
  intro:
    "Une découverte se passe mal quand les bases ne sont pas en place d’abord. Voici ce qu’il faut avoir avant de commencer :",
  items: [
    {
      text: "Un problème nommé. Quelque chose dans le programme dessert mal les personnes visées : plaintes, arriérés, contournements, système vieillissant, changement de politique. Consigné en une ou deux phrases. Il n’est pas nécessaire d’avoir choisi une solution ; remarquer la douleur suffit pour commencer.",
      bold: [{ phrase: "Un problème nommé." }],
    },
    {
      text: "Un responsable opérationnel parraine le travail et peut agir sur ce qu’il révèle.",
      bold: [{ phrase: "responsable opérationnel" }],
    },
    {
      text: "Une petite équipe dédiée est disponible, et ses membres ne sont pas partagés avec d’autres travaux.",
      bold: [{ phrase: "Une petite équipe dédiée" }],
    },
    {
      text: "Il y a un budget pour mener la recherche. Il est habituellement couvert par le budget de fonctionnement existant du ministère : aucune présentation au Conseil du Trésor n’est donc nécessaire ; la demande de nouveaux fonds pour construire vient plus tard. Le Financement explique d’où vient l’argent.",
      bold: [{ phrase: "un budget pour mener la recherche" }],
      internalLinks: [{ phrase: "Financement", to: "/thread/funding" }],
    },
    {
      text: "L’équipe est véritablement libre d’arrêter, si ce qu’elle trouve va dans ce sens.",
      bold: [{ phrase: "véritablement libre d’arrêter" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const DISCOVERY_PILLAR = {
  label: "LA QUESTION DÉCISIVE",
  title: "Réutiliser, acheter ou construire",
  opening: {
    text: "Les besoins derrière la plupart des services existants du gouvernement du Canada ont été comblés par quelque chose qui existait déjà :",
    bold: [{ phrase: "existing" }],
  } satisfies ThreadLinkedProse,
  options: [
    {
      text: "acheté auprès d’un fournisseur",
      bold: [{ phrase: "bought" }],
    },
    {
      text: "réutilisé d’un autre ministère",
      bold: [{ phrase: "reused" }],
    },
    {
      text: "configuré à partir d’une plateforme que le gouvernement exploite déjà",
      bold: [{ phrase: "configured" }],
    },
  ] satisfies ThreadLinkedProse[],
  weigh: {
    text: "Avant que la moindre solution soit nommée, la Découverte pèse ces options et s’assure que le service ne fera pas double emploi avec un service existant. Trois registres publics rendent le balayage concret : le Répertoire des services du GC énumère les services existants, l’Échange de ressources ouvertes énumère les solutions ouvertes publiées par d’autres équipes, et le Portail du gouvernement ouvert contient les données publiées par le gouvernement.",
    externalLinks: [
      { phrase: "Répertoire des services du GC", linkKey: "gc-service-inventory" },
      { phrase: "Échange de ressources ouvert", linkKey: "gc-open-resource-exchange" },
      { phrase: "Portail du gouvernement ouvert", linkKey: "open-government-portal" },
    ],
  } satisfies ThreadLinkedProse,
  sometimes: {
    text: "Parfois la réponse n’est pas un service du tout. Une information plus claire, ou une modification à un formulaire, peut suffire à elle seule.",
    bold: [{ phrase: "Parfois la réponse n’est pas un service du tout." }],
  } satisfies ThreadLinkedProse,
  teamNote: {
    title: {
      text: "Si le ministère achète une Équipe, le concours a lieu à la fin de la Découverte.",
      bold: [
        {
          phrase: "Si le ministère achète une Équipe, le concours a lieu à la fin de la Découverte.",
        },
      ],
    } satisfies ThreadLinkedProse,
    routes: {
      text: "Parmi les voies possibles : Équipe, Solution, Produit fini, et Interne ou Réutilisation ; il en existe d’autres, et un ministère peut avoir raison d’en emprunter une. Rien n’est acheté pendant la Découverte. Seule la voie Équipe est même préparée aussi tôt, parce que c’est l’équipe qui réalise l’Alpha : menez le concours pendant la Découverte, et adjugez une fois la décision de continuer prise, pour que l’équipe soit en place dès le premier jour de l’Alpha.",
      internalLinks: [
        { phrase: "Parmi les voies possibles", to: "/thread/procurement" },
        { phrase: "Alpha", to: "/create-alpha" },
      ],
    } satisfies ThreadLinkedProse,
    competition: {
      text: "Le concours se déroule habituellement dans le cadre d’un arrangement en matière d’approvisionnement existant, c’est-à-dire une liste de fournisseurs approuvés déjà mis en concurrence : il est donc plus rapide qu’un appel d’offres ouvert. Prévoyez que le contrat soit signé à la fin de la Découverte.",
    } satisfies ThreadLinkedProse,
  },
  href: "/reference/options-analysis",
  linkLabel: "Voir comment peser les options →",
  icon: Scale,
};

export type DiscoveryAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  sections: readonly ThreadContentSection[];
};

export const DISCOVERY_ACCORDION = {
  id: "what-to-find-out",
  title: "Ce qu’il faut découvrir pendant la Découverte",
} as const;

export const DISCOVERY_ACCORDION_STAGES: readonly DiscoveryAccordionStage[] = [
  {
    id: "goal-and-problem",
    icon: Target,
    title: "Fixer un objectif et définir le problème.",
    sections: [
      {
        text: "Commencez par fixer un objectif clair pour la découverte. Il garde le travail circonscrit et vous dit quand vous avez terminé.",
        bold: [{ phrase: "un objectif clair" }],
      },
      {
        text: "Au départ, on vous remet souvent une solution : quelqu’un a décidé que la réponse est un nouveau portail, une application ou un système. Retransformez cela en problème. Interrogez la solution, décomposez les hypothèses, et convenez de ce qui ne fait pas partie du problème.",
        bold: [{ phrase: "Retransformez cela en problème." }],
      },
      {
        text: "Il est aussi utile d’y mettre un chiffre : ce que le problème coûte aujourd’hui en temps de personnel, en retards et en demandes échouées. Cela alimentera l’analyse de rentabilisation plus tard.",
        bold: [{ phrase: "y mettre un chiffre" }],
      },
      {
        text: "Pour un projet d’assez grande envergure, l’énoncé du problème a une forme officielle : l’analyse de rentabilisation conceptuelle. Elle est obligatoire lorsqu’un ministère est prêt à investir au moins 2,5 millions de dollars, un seuil qui monte avec la classe de capacité de gestion de projet du ministère, jusqu’à 25 millions de dollars.",
        bold: [{ phrase: "l’analyse de rentabilisation conceptuelle" }],
      },
      {
        text: "L’analyse de rentabilisation conceptuelle décrit le problème ou l’occasion avant qu’une solution soit choisie. Elle est approuvée au niveau du sous-ministre adjoint ou plus haut, et est transmise au Secrétariat du Conseil du Trésor du Canada pour examen par le dirigeant principal de l’information du gouvernement du Canada. Le travail de la Découverte sur le problème est ce qui la remplit ; les Procédures obligatoires sur les analyses de rentabilisation conceptuelles pour les projets habilités par le numérique énoncent le reste.",
        bold: [{ phrase: "avant qu’une solution soit choisie" }],
        externalLinks: [
          {
            phrase: "Procédures obligatoires sur les analyses de rentabilisation conceptuelles pour les projets habilités par le numérique",
            linkKey: "concept-case-procedures",
          },
        ],
      },
      {
        type: "editorialNote",
        label: "Exemple",
        paragraphs: [
          {
            text: 'Une équipe de programme demande « un nouveau portail en ligne pour que les organisations puissent demander notre subvention ». Reformulé, le problème devient : « Comment une organisation peut-elle demander cette subvention, et rendre compte de l’utilisation des fonds, sans téléphoner trois fois à son agent de programme et sans ressaisir des renseignements qu’elle nous a déjà donnés ? » La seconde version est quelque chose que l’équipe peut étudier, et elle pointe vers des correctifs que l’idée du portail manquerait.',
          },
        ],
      },
    ],
  },
  {
    id: "users-and-context",
    icon: Users,
    title: "Comprendre vos utilisateurs et leur contexte.",
    sections: [
      {
        text: "Par la recherche sur les utilisateurs, apprenez ce que les utilisateurs cherchent à accomplir et comment ils s’y prennent aujourd’hui. Par exemple, pour un service de subventions et contributions, parlez à :",
        internalLinks: [{ phrase: "recherche sur les utilisateurs", to: "/thread/user-research" }],
      },
      {
        type: "unorderedList",
        items: [
          "les demandeurs et les organismes qui reçoivent les fonds",
          "les agents de programme et toute personne qui aide un demandeur",
          "les collègues des opérations et du centre d’appels, puisque le parcours passe aussi par des canaux hors ligne",
        ],
      },
      {
        text: "Ce que l’utilisateur cherche à faire n’est presque toujours qu’une étape d’un parcours plus long : cartographiez donc ce parcours complet, à travers chaque canal et chaque service touché, à partir des parcours réels que les gens décrivent. C’est le point de départ de la prestation intégrée. La carte du parcours est l’artefact clé de la Découverte ; regroupez les points de douleur entendus et convenez du ou des deux qui valent la peine d’être résolus.",
        bold: [{ phrase: "une étape d’un parcours plus long" }],
        internalLinks: [{ phrase: "prestation intégrée", to: "/thread/joined-up-delivery" }],
      },
    ],
  },
  {
    id: "accessibility",
    icon: Accessibility,
    title: "Apprendre qui le service pourrait exclure.",
    sections: [
      {
        text: "Rien n’est conçu pendant la Découverte : le travail d’accessibilité y est donc de la recherche : incluez les personnes les plus susceptibles d’être exclues, et apprenez où la façon de faire actuelle les écarte.",
        bold: [{ phrase: "incluez les personnes les plus susceptibles d’être exclues" }],
      },
      {
        text: "Cela veut dire parler avec des personnes ayant des déficiences visuelles, auditives, motrices ou cognitives, et avec des personnes qui ont peu d’accès au numérique ou peu de confiance. Ce que la recherche révèle devient les obstacles que les conceptions de l’Alpha devront franchir. Respecter la norme est une obligation légale pour un service du gouvernement du Canada, et il est bien moins coûteux de le prévoir maintenant que de le corriger plus tard. L’accessibilité couvre l’obligation et la façon d’y répondre.",
        bold: [{ phrase: "une obligation légale" }],
        internalLinks: [{ phrase: "accessibilité", to: "/thread/accessibility" }],
      },
      {
        text: "Pour l’exclusion au-delà du handicap, l’Analyse comparative entre les sexes plus est le processus du gouvernement du Canada : elle demande qui un service touche différemment, et la présentation au Conseil du Trésor qui finance la construction en exige une.",
        externalLinks: [{ phrase: "Analyse comparative entre les sexes plus", linkKey: "gba-plus" }],
      },
    ],
  },
  {
    id: "constraints",
    icon: Shield,
    title: "Comprendre les contraintes.",
    sections: [
      {
        text: "Déterminez les contraintes que vous rencontreriez en passant à la sous-phase Alpha : lois, contrats existants, technologies patrimoniales et processus établis, entre autres. Classez-les en deux catégories :",
      },
      {
        type: "orderedList",
        items: [
          {
            bold: "Contraintes fermes",
            text: " qui ne bougeront pas, comme la loi sous laquelle un programme fonctionne. Le service doit fonctionner à l’intérieur de celles-ci.",
          },
          {
            bold: "Contraintes souples",
            text: " qui semblent fixes mais peuvent changer, comme un processus interne qui empire les choses. Travaillez directement sur celles-ci.",
          },
        ],
      },
      {
        text: "Apprenez en même temps les besoins intrinsèques, parce qu’ils déterminent quelles options sont même possibles : à quel point l’information est sensible, pour que la sécurité soit intégrée dès le départ ; combien de personnes auront besoin du service en même temps, pour qu’il tienne sous une charge réelle ; et ce qu’il peut se permettre de coûter à exploiter, pour rester efficient pendant des années. Trouvés pendant la Découverte, ce sont des exigences. Trouvés après la construction, c’est du retravail.",
        bold: [{ phrase: "Apprenez en même temps les besoins intrinsèques" }],
      },
      {
        text: "Une contrainte a sa propre question précoce : les renseignements personnels. Si le service doit en utiliser, demandez dès maintenant au bureau de l’AIPRP de votre ministère si une évaluation des facteurs relatifs à la vie privée est nécessaire. La Politique sur la protection de la vie privée en exige une pour les nouveaux programmes qui utilisent des renseignements personnels pour prendre des décisions concernant des personnes, et l’évaluation est plus facile pendant que la conception peut encore bouger.",
        bold: [{ phrase: "évaluation des facteurs relatifs à la vie privée" }],
        externalLinks: [{ phrase: "Politique sur la protection de la vie privée", linkKey: "policy-privacy-protection" }],
      },
      {
        text: "Si une contrainte ferme signifie que le service ne pourrait jamais faire mieux que ce qui existe déjà, c’est un signal fort pour arrêter à la fin de la Découverte.",
        bold: [{ phrase: "stop" }],
      },
    ],
  },
  {
    id: "measure-success",
    icon: Activity,
    title: "Consigner les chiffres d’aujourd’hui, et à quoi ressemblerait mieux.",
    sections: [
      {
        text: "Consignez les références d’aujourd’hui maintenant, avant que quoi que ce soit change, parce qu’elles ne peuvent pas être reconstituées plus tard. Des chiffres qui valent la peine d’être notés :",
        bold: [{ phrase: "baselines" }],
      },
      {
        type: "unorderedList",
        items: [
          "combien de temps la tâche prend aujourd’hui, de bout en bout",
          "combien de personnes abandonnent, échouent ou téléphonent pour de l’aide",
          "ce que coûte une transaction en temps de personnel",
        ],
      },
      {
        text: "Esquissez ensuite à quoi ressemblerait mieux : les deux ou trois chiffres qui devraient bouger si le problème était résolu, et d’environ combien. Ceux-là deviennent les premières mesures de réussite du service, et la décision de continuer ou d’arrêter s’appuie sur eux à chaque étape à partir d’ici. Le fil Surveillance et instrumentation couvre les signaux et les cibles.",
        bold: [{ phrase: "à quoi ressemblerait mieux" }],
        internalLinks: [
          {
            phrase: "Surveillance et instrumentation",
            to: "/thread/monitoring-and-instrumentation",
          },
        ],
      },
    ],
  },
  {
    id: "work-in-the-open",
    icon: Eye,
    title: "Travailler ouvertement.",
    sections: [
      {
        text: "À moins que la confidentialité l’empêche, partagez ce que l’équipe apprend pendant qu’elle l’apprend. Deux habitudes suffisent :",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "Une courte démonstration",
            text: " toutes les quelques semaines, avec les directions habilitantes et les équipes de part et d’autre du problème invitées.",
          },
          {
            bold: "De courts billets là où d’autres fonctionnaires peuvent les trouver,",
            text: " sur les canaux internes du ministère ou dans les collectivités à l’échelle du GC.",
          },
        ],
      },
      {
        text: "Travailler ouvertement est l’une des normes relatives au numérique du gouvernement du Canada, et cela rapporte vite : quelqu’un qui a déjà résolu une partie du problème vous trouve, et le travail en double apparaît avant qu’on y consacre de l’argent. La page Soutien énumère les collectivités avec qui partager.",
        externalLinks: [{ phrase: "normes relatives au numérique", linkKey: "digital-standards" }],
        internalLinks: [{ phrase: "La page Soutien", to: "/support" }],
      },
    ],
  },
];

export const DISCOVERY_TEAM = {
  title: "L’équipe qu’il vous faut",
  intro: {
    text: "La Découverte a besoin d’une petite équipe multidisciplinaire qui lui est dédiée. Les rôles minimaux (une personne peut en cumuler plusieurs) :",
    bold: [{ phrase: "Les rôles minimaux" }],
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "Chercheur en expérience utilisateur",
      icon: Map,
      body: { text: "mène la recherche et les entretiens." },
    },
    {
      role: "Concepteur",
      icon: PenTool,
      body: { text: "cartographie le parcours et façonne la réflexion initiale." },
    },
    {
      role: "Responsable des activités et des politiques",
      icon: Briefcase,
      body: { text: "connaît le programme, les règles et les contraintes." },
    },
    {
      role: "Responsable opérationnel",
      icon: Users,
      body: { text: "oriente le travail et assume la décision de continuer ou d’arrêter." },
    },
  ] satisfies readonly SubphaseTeamRole[],
  closing: {
    text: "Au gouvernement du Canada, l’équipe est habituellement un mélange de fonctionnaires et de fournisseurs. Une découverte est courte : quatre à huit semaines est typique.",
    bold: [{ phrase: "quatre à huit semaines" }],
  } satisfies ThreadLinkedProse,
  buyATeamNote: {
    heading: "Sauf si vous achetez l’équipe",
    body: [
      {
        text: "Un concours prend des mois, et il ne peut pas commencer le premier jour, parce que la Découverte s’ouvre en établissant qu’il y a un problème méritant une équipe. Lancez-le dès que cela est clair. Ensuite, l’une de deux choses se produit, et les deux conviennent :",
      },
      {
        text: "cette Découverte s’étire, ou l’adjudication arrive au début de l’Alpha.",
      },
      {
        text: "Adjuger est sans risque même si l’Alpha peut se terminer par une décision d’arrêter. Le contrat couvre le lot de travail de l’Alpha : arrêter là ne dépense que ce que l’Alpha a coûté.",
        bold: [{ phrase: "Adjuger est sans risque même si l’Alpha peut se terminer par une décision d’arrêter." }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};

export const DISCOVERY_CAUTION = {
  title: "Quand la Découverte tourne mal",
  items: [
    "L’équipe part avec la solution qu’on lui a remise et ne demande jamais quel est le vrai problème.",
    "Aucun objectif n’a été fixé : le travail dérive et ne se termine jamais.",
    "On ne parle jamais aux personnes qui vivent réellement le problème.",
    "Quelqu’un commence à construire, ou choisit un fournisseur, avant que le problème soit compris.",
    "Une contrainte qui tuerait l’idée apparaît tard, après des mois de travail.",
  ],
};

export const DISCOVERY_FINISH = {
  title: "Comment savoir que la Découverte est terminée",
  sectionId: "how-you-know-discovery-is-finished",
  intro: {
    text: "La Découverte est terminée quand vous avez décidé de passer ou non à l’Alpha. Cette décision pèse deux choses : s’il existe un service viable qui vaut la peine d’être construit, et s’il est rentable de le poursuivre.",
    bold: [{ phrase: "décidé de passer ou non à l’Alpha" }],
  } satisfies ThreadLinkedProse,
  blocks: [
    {
      heading: "L’objectif fixé au départ a sa réponse",
      paragraphs: [
        {
          text: "L’objectif que la Découverte s’est fixé est l’étalon. Confrontez-y les constats : le problème est-il compris et chiffré, la recherche a-t-elle rejoint les personnes qui le vivent, les contraintes fermes sont-elles connues, et le balayage de réutilisation a-t-il trouvé quelque chose qui répond déjà au besoin.",
        },
        {
          text: "Le responsable opérationnel décide, à partir de ces constats plutôt que de l’enthousiasme. Répondez d’abord à tout ce qui reste ouvert, en prolongeant la recherche ou en laissant l’écart nourrir l’argument en faveur de l’arrêt.",
        },
      ],
    },
    {
      heading: "L’analyse de rentabilisation conceptuelle est envoyée",
      onlyIf: "Seulement à partir de 2,5 millions de dollars",
      paragraphs: [
        {
          text: "Envoyez-la avant la fin de la sous-phase. Elle est bâtie à partir des preuves de la Découverte : une Découverte mince produit donc une analyse de rentabilisation conceptuelle mince. Ce qu’elle est, et le seuil d’investissement qui la rend obligatoire, se trouvent sous Fixer un objectif et définir le problème ci-dessus.",
        },
        {
          text: "L’échéance vient de ce qui fait la file derrière elle. La présentation au comité d’examen de l’architecture du ministère et toute présentation au Conseil du Trésor ont lieu pendant l’Alpha, et l’analyse de rentabilisation conceptuelle vient en premier : une analyse non envoyée bloque donc les deux.",
        },
      ],
    },
    {
      heading: "L’équipe de l’Alpha est prête",
      paragraphs: [
        {
          text: "L’Alpha a besoin de personnes capables de fabriquer, et la Découverte se termine avec ces personnes alignées. D’où elles viennent est le choix du ministère : l’équipe de la Découverte qui continue, des collègues empruntés ailleurs, des développeurs que le ministère emploie déjà, ou une équipe amenée par contrat. N’importe laquelle de ces options convient. Ce qui compte, c’est que quelqu’un puisse commencer à fabriquer dès le premier jour de l’Alpha.",
          bold: [{ phrase: "quelqu’un puisse commencer à fabriquer dès le premier jour de l’Alpha" }],
        },
        {
          text: "Les esquisses et les prototypes construits par l’IA n’exigent personne de technique : une équipe sans développeur peut donc quand même ouvrir l’Alpha. Un développeur devient nécessaire au moment où un prototype codé l’est, ce qui arrive habituellement quelques semaines plus tard.",
        },
        {
          text: "Si l’équipe est achetée, c’est ce qui prend le plus de temps et c’est ce qu’il faut lancer tôt. Menez le concours à l’intérieur de la Découverte pour que l’adjudication ne dépende plus que d’une seule chose à la fin : la décision de continuer. N’adjugez qu’après cette décision, puisqu’un contrat signé plus tôt engage de l’argent pour un Alpha qui pourrait ne jamais avoir lieu. Si le concours ne peut pas se terminer à temps, le repli accepté se trouve sous L’équipe qu’il vous faut ci-dessus : la Découverte s’étire, ou l’adjudication arrive au début de l’Alpha.",
          bold: [{ phrase: "Si l’équipe est achetée, c’est ce qui prend le plus de temps" }],
        },
      ],
    },
  ] satisfies FinishBlock[],
  aside: {
    heading: "Qui atteste que la Découverte est terminée",
    paragraphs: [
        {
          text: "Cette note existe parce que les équipes, rendues là, demandent qui, à l’extérieur de l’équipe, certifie la fin de la Découverte. La réponse est personne, et c’est pourquoi le test ci-dessus est la décision de l’équipe elle-même.",
        },
        {
          text: "Aucun instrument du gouvernement du Canada n’emploie les noms Découverte, Alpha ou Bêta ; ce sont les noms que ce guide donne aux sous-phases, et aucun point de contrôle officiel n’est défini comme la fin de la Découverte. Les instruments qui exigent quelque chose pendant la Découverte figurent dans le tableau ci-dessous, avec ce qui doit se passer pour chacun, et qui fait le travail se trouve dans le tableau complet des instruments.",
        },
    ],
  },
  exits: [
    {
      lead: "En avant vers l’Alpha,",
      rest: {
        text: "quand le problème est réel et vaut la peine d’être résolu.",
      },
      href: "/create-alpha",
    },
    {
      lead: "Arrêter ou suspendre,",
      rest: {
        text: "quand les preuves disent que cela ne vaut pas la peine d’être construit. S’arrêter ici est un succès, et cela économise l’argent qu’une mauvaise construction aurait coûté.",
        bold: [{ phrase: "success" }],
      },
    },
  ],
  offRamp: {
    intro: {
      text: "Tout ce que produit la Découverte est de la connaissance, et tout cela traverse. Avant de passer à l’Alpha, ayez sous la main :",
      bold: [{ phrase: "Tout ce que produit la Découverte est de la connaissance," }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "Le problème, consigné. Une ou deux phrases sur lesquelles toute l’équipe s’entend, avec les preuves derrière.",
        bold: [{ phrase: "Le problème, consigné." }],
      },
      {
        text: "La carte du parcours. Le portrait de la situation actuelle, de la façon dont les gens accomplissent cela aujourd’hui, avec les points de douleur marqués. C’est l’artefact clé de la Découverte, et l’Alpha y confronte ses idées.",
        bold: [{ phrase: "La carte du parcours." }],
      },
      {
        text: "Le contexte plus large. Les autres services et équipes dans l’espace du problème.",
        bold: [{ phrase: "Le contexte plus large." }],
      },
      {
        text: "Une liste classée d’idées à éprouver en Alpha, et laquelle en premier.",
        bold: [{ phrase: "Une liste classée d’idées" }],
      },
      {
        text: "Une équipe approximative pour l’Alpha.",
        bold: [{ phrase: "Une équipe approximative" }],
      },
      {
        text: "Les références et les premières mesures de réussite. Ce que le problème coûte aujourd’hui, et à quoi ressemblerait mieux en chiffres. À la fin de l’Alpha, la décision de l’équipe elle-même de continuer ou d’arrêter se prend avec celles-ci.",
        bold: [{ phrase: "Les références et les premières mesures de réussite." }],
      },
      {
        text: "Le parcours de financement de l’Alpha, aligné tôt, puisqu’il faut du temps pour l’organiser.",
        bold: [{ phrase: "Le parcours de financement de l’Alpha," }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};

export const DISCOVERY_SECTION_NAV = {
  prev: { href: "/create", label: "Phase Création", level: "phase" },
  next: { href: "/create-alpha", label: "Sous-phase Alpha", level: "subphase" },
} satisfies { prev: SectionNavLink; next: SectionNavLink };
