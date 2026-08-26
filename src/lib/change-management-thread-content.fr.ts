import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import {
  DIGITAL_SOLUTIONS_CHANGE_MANAGEMENT_PORTAL,
  placeholderSourceHref,
} from "@/lib/placeholder-sources";
import { THREADS } from "@/lib/guide-strings";
import {
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  threadWhyItMattersPitchPlainText,
  type ThreadCloserLookBlock,
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type ChangeManagementLinkedProse = ThreadLinkedProse;
export type ChangeManagementContentSection = ThreadContentSection;
export type ChangeManagementCloserLookBlock = ThreadCloserLookBlock;
export type ChangeManagementPhasePreviewBlock = ThreadPhasePreviewBlock;

export const changeManagementLeadPlainText = (lead: readonly ThreadLinkedProse[]) =>
  lead.map((paragraph) => paragraph.text).join(" ");
export const changeManagementSectionsPlainText = threadSectionsPlainText;
export const changeManagementWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);
export const changeManagementWhyItMattersPlainText = threadWhyItMattersPitchPlainText;

export const CHANGE_MANAGEMENT_CONVERGE_DIAGRAM_ALT =
  "Diagramme : la mise en production du changement et la gestion du changement convergent vers les personnes qui l’utilisent ; quand les deux les atteignent, le changement est adopté.";

export const CHANGE_MANAGEMENT_THREAD = {
  title: "Gestion du changement",
  slug: "change-management" as const,

  lead: [
    {
      text:
        "Quand un service est nouveau ou change, les personnes qui l’utilisent, et le personnel qui travaille avec, doivent changer leur façon de faire. La gestion du changement, c’est le travail qui les aide à opérer ce virage, pour que le service soit adopté et utilisé, et qu’il ne cale pas parce que les gens continuent à l’ancienne.",
    },
    {
      text:
        "C’est le volet humain d’un changement. Le volet technique, amener un changement en production en toute sécurité, c’est la mise en production des changements. La gestion du changement consiste à rendre les gens conscients du changement, désireux de l’opérer, capables de le faire, et soutenus pour le maintenir.",
      internalLinks: [
        { phrase: "la mise en production des changements", to: THREADS["releasing-changes"].path },
      ] satisfies InternalPhraseLink[],
    },
    {
      text:
        "Le gouvernement du Canada considère l’adoption comme ce qui fait ou défait un virage numérique, comme l’énonce la Stratégie de gestion de l’information du GC.",
      externalLinks: [
        {
          phrase: "Stratégie de gestion de l’information du GC",
          linkKey: "gc-information-management-strategy-storyline",
        },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies ThreadLinkedProse[],

  twoTracksOneOutcome: {
    id: "two-tracks-one-outcome",
    title: "Deux voies, un même résultat",
    sections: [
      {
        text:
          "Mettre en production un changement et gérer un changement sont deux tâches différentes visant les mêmes personnes :",
      },
      {
        type: "orderedList",
        items: [
          {
            bold: "Mise en production du changement",
            text:
              " : le volet technique, faire construire la nouveauté et la faire fonctionner en production.",
          },
          {
            bold: "Gestion du changement",
            text: " : le volet humain, rendre les utilisateurs prêts et disposés à travailler de la nouvelle façon.",
          },
        ],
      },
      {
        text: "Les deux avancent en parallèle.",
      },
      {
        type: "subheading",
        text: "Les deux doivent atteindre les mêmes utilisateurs, sinon le changement ne prend pas :",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "Mis en production, mais non géré.",
            text:
              " Le nouvel écran entre en service le mercredi, mais les personnes qui l’utilisent n’ont jamais été prévenues ni formées, et elles poursuivent avec leur ancien contournement. Le changement existe et personne ne s’en sert.",
          },
          {
            bold: "Géré, mais non mis en production.",
            text:
              " Les gens sont formés et prêts pour quelque chose qui n’est jamais entré en service : il n’y a donc rien à utiliser.",
          },
        ],
      },
      {
        text: "Le changement n’est utilisé que lorsque les deux volets atteignent les mêmes personnes.",
      },
    ] satisfies ChangeManagementContentSection[],
  },

  whatGoodLooksLike: [
    {
      text: "Il existe une stratégie de changement avec un objectif clair : ce qui change, et pourquoi.",
    },
    {
      text: "Les personnes touchées participent tôt, avant que le changement les atteigne.",
    },
    {
      text: "Les utilisateurs et le personnel savent ce que le changement signifie pour eux, en termes concrets.",
    },
    {
      text:
        "La formation et le soutien sont en place pour que les gens puissent réellement utiliser la nouvelle façon, avec de la pratique et de l’aide à portée de main.",
    },
    {
      text: "L’adoption est mesurée, et le changement est renforcé jusqu’à ce que l’ancienne façon ait disparu.",
    },
    {
      text: "Quelqu’un est responsable du changement, avec des rôles nommés et un échéancier.",
    },
  ] satisfies ChangeManagementLinkedProse[],

  whyItMatters: {
    lead:
      "Un changement peut être livré parfaitement et échouer quand même, parce que les personnes pour qui il a été construit continuent à l’ancienne.",
    failureIntro: "Quand on saute le volet humain, le coût est réel :",
    failureModes: [
      {
        text: "L’ancienne façon s’attarde. Les gens continuent d’utiliser le système ou le processus qu’ils connaissent, et le changement ne s’installe jamais.",
        bold: [{ phrase: "L’ancienne façon s’attarde." }],
      },
      {
        text: "Deux systèmes fonctionnent en même temps. L’ancien et le nouveau tournent en parallèle, au double du coût et de l’effort, parfois pendant des années.",
        bold: [{ phrase: "Deux systèmes fonctionnent en même temps." }],
      },
      {
        text: "Les bénéfices n’arrivent jamais. Le service a été financé pour produire un résultat ; sans adoption, l’argent est dépensé et le résultat ne vient pas.",
        bold: [{ phrase: "Les bénéfices n’arrivent jamais." }],
      },
      {
        text: "La confiance s’érode. Un déploiement raté rend le prochain changement plus difficile, parce que les gens ont appris que changement rime avec perturbation sans contrepartie.",
        bold: [{ phrase: "La confiance s’érode." }],
      },
    ] satisfies ThreadLinkedProse[],
    closing: {
      text: "Le gouvernement du Canada considère l’adoption comme ce qui fait ou défait un virage numérique, dans la Stratégie de gestion de l’information du GC.",
      externalLinks: [
        {
          phrase: "Stratégie de gestion de l’information du GC",
          linkKey: "gc-information-management-strategy-storyline",
        },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    intro: {
      text:
        "Un changement réussit une personne à la fois. Le modèle ADKAR, largement utilisé, nomme les cinq étapes que chaque personne franchit, et un changement cale à celle qu’on a sautée.",
      externalLinks: [{ phrase: "ADKAR", linkKey: "prosci-adkar" }] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
    exampleNote: {
      title: "Un nouvel écran de dossier pour les agents de subventions",
      sections: [
        {
          text:
            "Un programme de subventions et contributions remplace l’ancien écran de dossier que ses agents utilisent chaque jour. Trois groupes sont en cause :",
        },
        {
          type: "orderedList",
          items: [
            {
              text:
                "L’équipe d’exécution construit le nouvel écran et le met en production un mardi soir.",
              bold: [{ phrase: "équipe d’exécution" }],
            },
            {
              text:
                "Les agents de subventions sont les utilisateurs : le nouvel écran est ce qu’ils ouvrent le mercredi matin.",
              bold: [{ phrase: "Les agents de subventions" }],
            },
            {
              text: "Leur gestionnaire, un responsable du changement et l’équipe d’exécution les préparent.",
              bold: [{ phrase: "manager" }, { phrase: "un responsable du changement" }],
            },
          ],
        },
        {
          text: "Les cinq étapes ci-dessous suivent ces agents.",
        },
      ] satisfies ChangeManagementContentSection[],
    },
    blocks: [
      {
        title: "Awareness.",
        sections: [
          {
            text:
              "Les gens ont besoin de savoir qu’un changement s’en vient et pourquoi. Énoncez la raison en termes simples, du point de vue des personnes touchées, avant qu’il arrive.",
            bold: [{ phrase: "savoir qu’un changement s’en vient et pourquoi" }],
          },
          {
            text:
              "Un changement imposé sans préavis se heurte à la résistance avant même que quiconque le comprenne.",
          },
          {
            type: "editorialNote",
            label: "Dans l’exemple",
            paragraphs: [
              {
                text:
                  "les agents apprennent pourquoi l’ancien écran disparaît, de la bouche de leur propre gestionnaire, trois semaines avant le basculement.",
              },
            ],
          },
        ],
      },
      {
        title: "Desire.",
        sections: [
          {
            text:
              "Savoir qu’un changement s’en vient ne donne pas envie de l’adopter. Montrez ce qu’il leur apporte, faites-les participer tôt pour qu’ils contribuent à le façonner, et soyez franc sur ce qui est difficile.",
            bold: [{ phrase: "envie de l’adopter" }],
          },
          {
            text: "Les personnes qui ont aidé à construire un changement sont celles qui le portent.",
          },
          {
            type: "editorialNote",
            label: "Dans l’exemple",
            paragraphs: [
              {
                text:
                  "quelques agents aident à tester le nouvel écran, de sorte que leurs collègues apprennent qu’il est meilleur de la bouche de personnes en qui ils ont confiance.",
              },
            ],
          },
        ],
      },
      {
        title: "Knowledge.",
        sections: [
          {
            text:
              "Les gens ont besoin de savoir comment travailler de la nouvelle façon : quoi faire différemment, et où obtenir de l’aide.",
            bold: [{ phrase: "comment travailler de la nouvelle façon" }],
          },
          {
            text:
              "C’est la formation, les conseils et une documentation claire, prêts avant que le changement entre en service.",
          },
          {
            type: "editorialNote",
            label: "Dans l’exemple",
            paragraphs: [
              {
                text:
                  "les agents reçoivent une séance de formation pratique et un guide d’une page avant que le nouvel écran entre en service.",
              },
            ],
          },
        ],
      },
      {
        title: "Ability.",
        sections: [
          {
            text:
              "Savoir comment n’est pas la même chose qu’être capable. Les gens ont besoin de temps pour s’exercer, de soutien à portée de main pendant qu’ils trouvent leurs repères, et que les anciens obstacles soient retirés pour que la nouvelle façon soit la plus facile.",
            bold: [{ phrase: "la nouvelle façon soit la plus facile" }],
          },
          {
            type: "editorialNote",
            label: "Dans l’exemple",
            paragraphs: [
              {
                text:
                  "les agents disposent de quelques jours pour s’exercer avec quelqu’un pour les aider, et leur tâche la plus courante est configurée pour être plus rapide dans le nouvel écran.",
              },
            ],
          },
        ],
      },
      {
        title: "Reinforcement.",
        sections: [
          {
            text:
              "Un changement qui n’est pas renforcé retombe vers l’ancienne façon. Mesurez si les gens l’ont réellement adopté, continuez de les soutenir, retirez l’ancien chemin pour qu’il n’y ait rien vers quoi retomber, et soulignez le mérite des équipes qui ont opéré le virage.",
            bold: [{ phrase: "Mesurez si les gens l’ont réellement adopté" }],
          },
          {
            type: "editorialNote",
            label: "Dans l’exemple",
            paragraphs: [
              {
                text:
                  "après la mise en service, l’ancien écran est éteint à une date fixée, l’utilisation est vérifiée, et la première équipe à migrer est remerciée.",
              },
            ],
          },
        ],
      },
    ] satisfies ChangeManagementCloserLookBlock[],
  },

  whoseJob: {
    intro: "Un changement est livré par plusieurs personnes, et il échoue quand personne n’est responsable de l’adoption.",
    roles: [
      {
        role: "Le responsable ou le parrain du changement",
        text: "planifie l’adoption, la communique, et la mène à terme.",
      },
      {
        role: "Les gestionnaires des équipes touchées",
        text: "accompagnent leurs propres gens à travers le changement au quotidien.",
      },
      {
        role: "L’équipe du service",
        text: "construit le changement et les appuis autour : la formation, les conseils, le chemin facilité.",
      },
      {
        role: "La collectivité de gestion du changement du ministère",
        text: "est une ressource commune où l’équipe puise des gabarits et des leçons apprises.",
      },
      {
        role: "Le responsable opérationnel de l’application",
        text: "assume le résultat, finance le travail de changement, et l’appuie visiblement pour que les gens le prennent au sérieux.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  twoWaysComparison: {
    id: "two-ways-comparison",
    title: "Deux façons de gérer un changement",
    risky: {
      heading: "Vell",
      framing:
        "Voici Vell. L’équipe a activé un nouveau système de gestion des dossiers en s’attendant à ce que les gens suivent :",
      items: [
        "a annoncé le changement par courriel une semaine avant la mise en service",
        "n’a offert aucune formation et n’a laissé aux gens aucun temps pour s’exercer",
        "a laissé l’ancien système en marche comme solution de repli",
        "n’a jamais vérifié si quiconque avait réellement migré",
      ],
      closing:
        "Le résultat : le personnel a continué d’utiliser l’ancien système et ses propres contournements, les deux ont tourné en parallèle pendant un an au double du coût, et les bénéfices promis ne sont jamais arrivés.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Voici Pax. L’équipe a planifié le volet humain du changement dès le départ :",
      items: [
        "a fixé un objectif clair et fait participer les équipes touchées pendant que le système se façonnait encore",
        "a montré à chaque équipe ce qui changeait pour elle, et l’a formée avant la mise en service",
        "a mesuré combien de personnes avaient migré, et gardé du soutien à portée de main",
        "a retiré l’ancien système à une date fixée une fois les gens prêts",
      ],
      closing:
        "Le résultat : les équipes ont migré, l’ancienne façon a disparu, et le service a produit ce qu’il devait produire.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble la gestion du changement à chaque phase",
    intro: "La gestion du changement change de forme au fil de la vie d’un service.",
    blocks: [
      {
        title: "Create.",
        preview: "Planifier le changement tôt.",
        popupHeading: "Planifier le changement tôt.",
        popup: [
          {
            text: "Déterminez qui le changement touche et ce qu’il signifie pour eux.",
          },
          {
            text: "Rédigez une stratégie de changement avec un objectif clair et des rôles nommés, et faites participer les personnes touchées pendant qu’il est encore temps de la façonner.",
          },
          {
            text: "Un changement planifié dès le départ est un changement auquel les gens sont prêts.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "Gagner l’adoption.",
        popupHeading: "Gagner l’adoption.",
        popup: [
          {
            text: "Communiquez le changement, formez les gens, et soutenez-les pendant qu’ils trouvent leurs repères.",
          },
          {
            text: "Mesurez combien de personnes ont réellement migré, et renforcez le changement jusqu’à ce que l’ancienne façon ait disparu.",
          },
          {
            text: "C’est ici qu’un changement livré devient un changement utilisé.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Un retrait est aussi un changement.",
        popupHeading: "Un retrait est aussi un changement.",
        popup: [
          {
            text: "Les personnes qui comptaient sur l’ancien service doivent passer à ce qui suit, et ce passage exige le même soin.",
          },
          {
            text: "Prévenez-les tôt, aidez-les à traverser, et gérez la perte de ce qui leur était familier.",
          },
          {
            text: "Une migration réussit ou échoue selon que les gens adoptent ou non le remplacement.",
          },
        ],
      },
    ] satisfies ChangeManagementPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Pour savoir si les gens adopteront réellement un changement, étape par étape, le modèle ADKAR de Prosci est la lentille de l’adoption individuelle. « 8 Steps for Leading Change » de Kotter en est le pendant à l’échelle de l’organisation : créer l’urgence, une coalition directrice, et des gains à court terme. Pour un gabarit gouvernemental au niveau des activités, la tâche du M3 Playbook de la GSA américaine sur la définition d’une approche de gestion du changement met le travail en place dans un projet.",
    externalLinks: [
      { phrase: "modèle ADKAR", linkKey: "prosci-adkar" },
      { phrase: "8 Steps for Leading Change", linkKey: "kotter-8-steps" },
      {
        phrase: "la définition d’une approche de gestion du changement",
        linkKey: "gsa-m3-change-management-approach",
      },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Référence complémentaire",
      linkKey: "gc-information-management-strategy-storyline" satisfies ExternalLinkKey,
      description:
        "Stratégie de gestion de l’information du GC, fil conducteur (SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/information-management/information-management-strategy/storyline.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "csps-project-management-learning-path" satisfies ExternalLinkKey,
      description:
        "CSPS Project Management Learning Path, change strand (Canada School of Public Service) — https://www.csps-efpc.gc.ca/learning-paths/project-management-eng.aspx",
    },
    {
      label: "Référence complémentaire",
      linkKey: "prosci-adkar" satisfies ExternalLinkKey,
      description: "Le modèle ADKAR (Prosci) — https://www.prosci.com/methodology/adkar",
    },
    {
      label: "Référence complémentaire",
      linkKey: "kotter-8-steps" satisfies ExternalLinkKey,
      description:
        "« 8 Steps for Leading Change » (Kotter Inc.) — https://www.kotterinc.com/methodology/8-steps/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gsa-m3-change-management-approach" satisfies ExternalLinkKey,
      description:
        "Définir l’approche de gestion du changement, tâche 1.7 (M3 Playbook, GSA des États-Unis) — https://ussm.gsa.gov/1.7/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "iocn-change-network" satisfies ExternalLinkKey,
      description:
        "Réseau interministériel sur le changement organisationnel (RICO, GCcollab) — https://wiki.gccollab.ca/IOCN-RICO",
    },
    {
      label: "Référence complémentaire",
      href: placeholderSourceHref(DIGITAL_SOLUTIONS_CHANGE_MANAGEMENT_PORTAL),
      description: `${DIGITAL_SOLUTIONS_CHANGE_MANAGEMENT_PORTAL} — réseau du GC.`,
      comingSoon: true,
      gcNetworkOnly: true,
    },
    {
      label: "Instrument directeur",
      linkKey: "policy-communications-federal-identity",
      description:
        "Politique sur les communications et l’image de marque (SCT) : les communications sur le changement passent par le chef des communications du ministère.",
    },
    {
      label: "Modèles et outils",
      linkKey: "iocn-cm-tools-compendium",
      description:
        "Recueil d’outils de gestion du changement du RICO (wiki GCcollab) : cadres, guides et gabarits produits par le GC.",
    },
  ] satisfies SourceItem[],
} as const;
