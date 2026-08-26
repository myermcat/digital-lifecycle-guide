import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import {
  threadLeadPlainText,
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  type ThreadCloserLookBlock,
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadToggleBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type BacklogLinkedProse = ThreadLinkedProse;
export type BacklogContentSection = ThreadContentSection;
export type BacklogCloserLookBlock = ThreadCloserLookBlock;
export type BacklogPhasePreviewBlock = ThreadPhasePreviewBlock;
export type BacklogToggleBlock = ThreadToggleBlock;

const CLOSER_LOOK_PATH = `${THREADS.backlog.path}#a-closer-look`;

export const backlogSectionsPlainText = threadSectionsPlainText;
export const backlogLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const backlogWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const BACKLOG_THREAD = {
  title: "Carnet de produit",
  slug: "backlog" as const,

  lead: {
    text:
      "Un carnet de produit est la liste unique et priorisée des travaux d’un service : les fonctionnalités, les correctifs et les améliorations qui restent à faire, ordonnés pour que le travail le plus utile vienne en premier. Les normes relatives au numérique du gouvernement du Canada le disent simplement : tenez un carnet de produit et servez-vous-en pour établir les priorités. Chaque élément se rattache à un besoin réel d’utilisateur, une seule personne en fixe l’ordre, et il n’est jamais terminé : il est affiné à mesure que le service apprend et change.",
    externalLinks: [
      { phrase: "Les normes relatives au numérique", linkKey: "iterate-improve-frequently" },
    ] satisfies ExternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    {
      text: "Il y a un seul carnet de produit, une seule liste ordonnée des travaux à faire, et non les mêmes travaux éparpillés entre boîtes de réception et tableurs.",
    },
    {
      text: "Une seule personne, le responsable de produit ou de service, répond de l’ordre.",
    },
    {
      text: "Chaque élément se rattache à un besoin réel d’utilisateur, habituellement rédigé sous forme de courte histoire d’utilisateur.",
    },
    {
      text: "Les priorités sont établies selon l’incidence sur les utilisateurs, la concordance avec les objectifs, et l’effort, et elles sont réexaminées régulièrement, non fixées une fois pour toutes.",
    },
    {
      text: "Le carnet de produit contient plus que de nouvelles fonctionnalités : le travail de soutien et la dette technique se disputent les mêmes places.",
    },
    {
      text: "Une définition claire de « terminé » détermine quand un élément est achevé, et le travail inachevé retourne sur la liste plutôt que d’aller au public.",
    },
    {
      text: "Le carnet de produit est tenu à découvert, là où l’équipe et les utilisateurs peuvent voir et influencer ce qui est priorisé.",
    },
    {
      text: "Il n’est jamais complet : il continue d’être affiné sur toute la vie du service.",
    },
  ] satisfies BacklogLinkedProse[],

  insideABacklog: {
    id: "inside-a-backlog",
    title: "À l’intérieur d’un carnet de produit",
    intro: {
      text:
        "Un élément de carnet de produit prend habituellement cette forme, ici avec un service de demande de subvention comme exemple :",
    } satisfies ThreadLinkedProse,
    example: {
      story:
        "En tant qu’organisme qui demande du financement, je veux pouvoir enregistrer une demande partiellement remplie afin de pouvoir y revenir et la terminer plus tard.",
      doneWhen: [
        "le demandeur peut enregistrer une version provisoire et y revenir",
        "le demandeur peut voir quelles sections sont encore incomplètes",
        "une version provisoire enregistrée est stockée de façon sécuritaire et rattachée au compte du demandeur",
      ],
    },
    closing: {
      text:
        "La première ligne est l’histoire d’utilisateur (qui, quoi et pourquoi), et la liste « c’est terminé quand… » en constitue les critères d’acceptation, le test qui dit quand l’élément est achevé. Pour plus de détails sur la rédaction des éléments sous cette forme, le Guide de conception de services de l’Ontario et le guide de GOV.UK sur la rédaction d’histoires d’utilisateur emploient tous deux ce format.",
      externalLinks: [
        { phrase: "Guide de conception de services de l’Ontario", linkKey: "ontario-service-design-playbook" },
        { phrase: "guide de GOV.UK sur la rédaction d’histoires d’utilisateur", linkKey: "uk-writing-user-stories" },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

  whyItMatters: {
    text:
      "Sans une seule liste priorisée, les travaux sont menés par qui demande le plus fort, et les choses importantes mais peu spectaculaires — le correctif de sécurité, la lacune d’accessibilité, ce sur quoi les utilisateurs butent sans cesse — ne remontent jamais au sommet. Un bon carnet de produit est ce qui permet à un service de continuer de s’améliorer régulièrement après le lancement plutôt que de stagner, ce qui compte parce que les années d’exploitation sont la plus longue partie de sa vie. Les normes du gouvernement du Canada demandent aux équipes d’itérer et d’améliorer fréquemment et d’être transparentes sur ce qu’elles priorisent.",
    externalLinks: [
      { phrase: "itérer et d’améliorer fréquemment", linkKey: "iterate-improve-frequently" },
      { phrase: "transparentes sur ce qu’elles priorisent", linkKey: "work-open-default" },
    ] satisfies ExternalPhraseLink[],
  },

  whoseJob: {
    intro: "La tenue d’un carnet de produit est partagée au sein de l’équipe, chaque rôle en portant une partie différente :",
    roles: [
      {
        role: "Le responsable de produit ou de service",
        text: "tient la liste unique, l’ordonne et l’affine ; c’est lui qui décide de ce qui vient ensuite.",
      },
      {
        role: "L’équipe",
        text: "(concepteurs, développeurs, chercheurs) décompose les éléments, les estime, et les livre.",
      },
      {
        role: "Le responsable opérationnel de l’application",
        text: "veille à ce qu’il y ait un responsable clair et à ce que les priorités servent les utilisateurs et les objectifs du service.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    blocks: [
      {
        title: "Rédiger les travaux sous forme d’histoires d’utilisateur.",
        sections: [
          {
            text:
              'Le travail d’un carnet de produit s’écrit habituellement en courtes histoires d’utilisateur, dans un format simple qui garde l’attention sur le besoin plutôt que sur une spécification : « En tant que [type d’utilisateur], j’ai besoin de [quelque chose], afin de [raison]. » Chaque histoire porte des critères d’acceptation, une courte liste « c’est terminé quand… » qui dit quand le travail est achevé. Le guide de GOV.UK sur la rédaction d’histoires d’utilisateur et le Guide de conception de services de l’Ontario emploient tous deux ce format. Les besoins eux-mêmes viennent de la recherche sur les utilisateurs.',
            bold: [{ phrase: "histoires d’utilisateur" }, { phrase: "critères d’acceptation" }],
            externalLinks: [
              {
                phrase: "guide de GOV.UK sur la rédaction d’histoires d’utilisateur",
                linkKey: "uk-writing-user-stories",
              },
              { phrase: "Guide de conception de services de l’Ontario", linkKey: "ontario-service-design-playbook" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "recherche sur les utilisateurs", to: THREADS["user-research"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Prioriser, et continuer de prioriser.",
        sections: [
          {
            text:
              "Ordonnez la liste selon l’incidence sur les utilisateurs, la concordance avec les objectifs du service, et l’effort exigé. Une méthode simple et courante est MoSCoW, qui range chaque élément dans quatre groupes :",
            bold: [{ phrase: "MoSCoW" }],
          },
          {
            type: "unorderedList",
            items: [
              {
                bold: "Doit avoir :",
                text: " le service ne fonctionne pas, ou ne peut pas être lancé, sans cela.",
              },
              {
                bold: "Devrait avoir :",
                text: " important, et pénible à omettre, mais le service peut s’en passer pour l’instant.",
              },
              {
                bold: "Pourrait avoir :",
                text: " à faire si le temps et la capacité le permettent, et la première chose abandonnée quand ils manquent.",
              },
              {
                bold: "N’aura pas (pour l’instant) :",
                text: " délibérément hors de portée cette fois-ci, consigné pour que cela se lise comme une décision plutôt que comme un oubli.",
              },
            ],
          },
          {
            text:
              "Revoyez l’ordre régulièrement — chaque semaine pour le prochain cycle de travail, et tous les quelques mois pour la feuille de route — parce que ce qui compte le plus change à mesure que le service grandit. Le carnet de produit contient aussi plus que de nouvelles fonctionnalités : les demandes de soutien et la dette technique se disputent les mêmes places, et les signaux d’un service en fonction font partie de ce qui vous dit où sont les vrais problèmes. Le guide de GOV.UK sur l’établissement des priorités parcourt cette démarche.",
            internalLinks: [
              {
                phrase: "les signaux d’un service en fonction",
                to: THREADS["monitoring-and-instrumentation"].path,
              },
            ] satisfies InternalPhraseLink[],
            externalLinks: [
              {
                phrase: "guide de GOV.UK sur l’établissement des priorités",
                linkKey: "uk-deciding-on-priorities",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "L’examiner selon un calendrier.",
        sections: [
          {
            text:
              "Un carnet de produit ne reste utile que s’il est entretenu, et l’habitude la plus importante est un examen régulier (souvent appelé affinage) à une cadence fixée. C’est un rendez-vous récurrent, non un ménage ponctuel. À chaque examen, l’équipe parcourt toute la liste et fait cinq choses :",
          },
          {
            type: "unorderedList",
            items: [
              {
                bold: "Ajouter",
                text: " les nouveaux éléments apparus, issus des commentaires, de la recherche sur les utilisateurs, des signaux du service en fonction, des demandes de soutien, et des idées que vous avez promues depuis une liste d’idées distincte.",
              },
              {
                bold: "Décomposer",
                text: " les gros éléments qui remontent vers le sommet en morceaux assez petits pour être terminés en un court cycle.",
              },
              {
                bold: "Clarifier",
                text: ' ces éléments du haut pour qu’ils soient prêts à être pris, avec assez de détail et un critère clair de « c’est terminé ».',
              },
              {
                bold: "Réordonner",
                text: " la liste selon la priorité actuelle, parce que ce qui compte le plus change à mesure que le service grandit.",
              },
              {
                bold: "Retirer",
                text: " les éléments qui ne servent plus l’objectif, qu’ils soient devenus périmés ou dépassés par les événements.",
              },
            ],
          },
          {
            text:
              "Une seule personne, le responsable de produit ou de service, est responsable de l’ordre ; tous les autres lui présentent leurs arguments plutôt que de réordonner la liste eux-mêmes. Et une définition de « terminé », c’est-à-dire une barre commune indiquant quand quelque chose est véritablement achevé, maintient la qualité : si un élément ne l’atteint pas, il retourne au carnet de produit au lieu d’aller au public. Le Guide Scrum est la source de ces termes.",
            externalLinks: [{ phrase: "Guide Scrum", linkKey: "scrum-guide" }] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies BacklogCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Deux façons de tenir un carnet de produit",
    risky: {
      heading: "Vell",
      framing: "Voici Vell, gestionnaire de service. L’équipe menait le service de renouvellement de permis au gré de ce qui se présentait :",
      items: [
        "gardait les travaux dans des fils de courriel éparpillés, des messages de clavardage et des listes personnelles",
        "construisait ce que l’intervenant le plus insistant demandait ensuite, sans priorités convenues",
        'traité « terminé » comme « présenté en démonstration dans une réunion »',
      ],
      closing:
        "Le résultat : des fonctionnalités à moitié terminées se sont accumulées, les correctifs d’accessibilité et de sécurité n’ont jamais atteint le sommet, l’équipe passait d’une demande à l’autre, et personne ne pouvait dire ce qui s’en venait.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Voici Pax, gestionnaire de service. L’équipe menait le service de renouvellement de permis à partir d’un seul carnet de produit :",
      items: [
        "tenait une liste unique et ordonnée, chaque élément rattaché à un besoin d’utilisateur",
        "priorisait selon l’incidence et l’effort, à l’aide de MoSCoW, et revoyait l’ordre chaque semaine",
        "avait fixé une définition claire de « terminé », de sorte que le travail inachevé retournait sur la liste plutôt que de sortir",
      ],
      closing:
        "Le résultat : une amélioration régulière et visible, les correctifs importants ont été faits, et tout le monde, y compris les utilisateurs, pouvait voir ce qui s’en venait.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble le carnet de produit à chaque phase",
    intro: "Le carnet de produit change de forme au fil de la vie d’un service.",
    blocks: [
      {
        title: "Create.",
        preview: "Le carnet de produit naît de la recherche.",
        popup: [
          {
            text:
              "Le carnet de produit commence à la découverte comme une liste priorisée d’histoires d’utilisateur tirées de la recherche sur les utilisateurs. Quand la construction commence, l’équipe traite d’abord les éléments du haut, et la première mise en production livre les besoins les plus essentiels plutôt que tout d’un coup. L’ordre est fixé selon l’incidence et l’effort, et on s’attend déjà à ce qu’il change.",
            internalLinks: [
              { phrase: "recherche sur les utilisateurs", to: THREADS["user-research"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Là où vit l’amélioration continue.",
        popup: [
          {
            text:
              "L’Exploitation est le plus long chapitre, et le carnet de produit est là où se fait son amélioration. De nouveaux commentaires et de nouvelles analyses ajoutent des éléments, les demandes de soutien et la dette technique concurrencent les nouvelles fonctionnalités, et l’ordre est revu régulièrement. Un carnet de produit en santé ici fait la différence entre un service qui continue de s’améliorer et un service qui cesse de progresser.",
            internalLinks: [
              { phrase: "analytics", to: THREADS["monitoring-and-instrumentation"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Le carnet de produit se réduit.",
        popup: [
          {
            text:
              "Quand un service est retiré ou remplacé, le carnet de produit se resserre sur ce qui compte encore : les correctifs essentiels, et le travail de départ du service. Si le service est remplacé, le carnet des besoins non comblés est reporté dans le nouveau, pour que la recherche déjà faite ne soit pas perdue.",
          },
        ],
      },
    ] satisfies BacklogPhasePreviewBlock[],
  },

  commonQuestions: {
    id: "common-questions",
    title: "Questions courantes",
    blocks: [
      {
        title: "Mon carnet de produit ne cesse de grossir. On dirait une liste de tâches sans fin.",
        sections: [
          {
            text:
              "Un carnet de travaux devrait contenir les éléments d’action que l’équipe s’est engagée à faire, non des idées brutes, et mélanger les deux est la raison habituelle de son gonflement. Gardez les idées sur une liste d’idées distincte, et parcourez cette liste selon un calendrier : promouvez les quelques-unes qui valent la peine en travaux réels et priorisés, et acceptez que beaucoup d’idées ne deviendront jamais des tâches, ce qui est très bien. Les idées n’ont pas leur place dans le carnet de travaux. Au-delà de cela, le carnet de travaux a quand même besoin d’un examen régulier pour supprimer les éléments devenus périmés. L’aperçu le plus simple du maintien d’un carnet en santé est un bon point de départ.",
            internalLinks: [{ phrase: "examen régulier", to: CLOSER_LOOK_PATH }] satisfies InternalPhraseLink[],
            externalLinks: [
              { phrase: "maintien d’un carnet en santé", linkKey: "atlassian-scrum-backlogs" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Tout semble prioritaire. Comment choisir ?",
        sections: [
          {
            text:
              "Si tout est prioritaire, rien ne l’est. Imposez un ordre unique — il n’y a jamais qu’un seul élément qui vient ensuite — et classez selon quelques facteurs pratiques comme le risque, la valeur par rapport à l’effort, et ce qui dépend de quoi. MoSCoW, ci-dessus, est une façon simple de commencer.",
            bold: [{ phrase: "MoSCoW" }],
          },
        ],
      },
      {
        title: "Les éléments sont trop gros ou trop vagues pour commencer.",
        sections: [
          {
            text:
              'Décomposez un gros élément, parfois appelé une épopée, en morceaux assez petits pour être achevés en un court cycle, et rédigez chacun autour d’un utilisateur et d’un objectif. Si vous ne pouvez pas énoncer l’objectif, la partie « afin de… », c’est un signe qu’il faut se demander si vous en avez besoin. Le guide de GOV.UK sur la rédaction d’histoires d’utilisateur montre comment faire.',
            externalLinks: [
              { phrase: "guide de GOV.UK sur la rédaction d’histoires d’utilisateur", linkKey: "uk-writing-user-stories" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "De vieux éléments s’empilent au bas et ne sont jamais faits.",
        sections: [
          {
            text:
              "Certains ont été ajoutés pour faire plaisir à quelqu’un et n’allaient jamais vraiment être construits ; d’autres étaient de bonnes idées dépassées par le changement des priorités. La cause ne change pas le remède : un carnet de produit n’est pas un endroit où les éléments vivent pour toujours. À chaque examen régulier, abandonnez ce qui ne sert plus l’objectif actuel, et gardez le reste dans un ordre de priorité honnête, pour que la liste reste assez courte pour qu’on puisse agir dessus.",
            internalLinks: [{ phrase: "examen régulier", to: CLOSER_LOOK_PATH }] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Les correctifs techniques ennuyeux et les défauts ne remontent jamais au sommet.",
        sections: [
          {
            text:
              "Ils sont enterrés, surtout quand ils vivent sur une liste distincte et cachée. Gardez les nouvelles fonctionnalités, les corrections de défauts et la dette technique sur un seul carnet ordonné, pour que les arbitrages soient visibles et que le responsable puisse les peser ensemble.",
            externalLinks: [{ phrase: "dette technique", linkKey: "atlassian-technical-debt" }] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies BacklogToggleBlock[],
  },

  furtherReading: {
    text:
      "Pour un mode d’emploi général qui relie le tout, le Service Manual du Royaume-Uni sur la livraison agile est l’aperçu le plus simple. Pour voir comment une équipe du gouvernement du Canada décide de la suite, les orientations sur l’amélioration continue de design.canada.ca parcourent le choix de ce qu’il faut améliorer et la mesure de son effet. Pour rédiger les éléments eux-mêmes, le guide de Mike Cohn sur les histoires d’utilisateur donne le modèle, des exemples travaillés, et la façon de décomposer une épopée. Et pour comprendre pourquoi un carnet de produit devrait être mené comme un produit plutôt que comme un projet, « Product vs Feature Teams » de Marty Cagan explique pourquoi il faut confier au responsable des problèmes à résoudre plutôt qu’une liste fixe à livrer.",
    externalLinks: [
      { phrase: "la livraison agile", linkKey: "uk-service-manual-agile-delivery" },
      {
        phrase: "orientations sur l’amélioration continue",
        linkKey: "design-canada-continuous-improvement",
      },
      { phrase: "guide de Mike Cohn sur les histoires d’utilisateur", linkKey: "mountaingoat-user-stories" },
      { phrase: "Product vs Feature Teams", linkKey: "svpg-product-vs-feature-teams" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Instrument directeur",
      linkKey: "iterate-improve-frequently" satisfies ExternalLinkKey,
      description:
        'Normes relatives au numérique du GC, « Itérer et améliorer fréquemment » (SCT) — https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/iterate-improve-frequently.html',
    },
    {
      label: "Instrument directeur",
      linkKey: "work-open-default" satisfies ExternalLinkKey,
      description:
        'Normes relatives au numérique du GC, « Travailler ouvertement par défaut » (SCT) — https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/work-open-default.html',
    },
    {
      label: "Référence complémentaire",
      linkKey: "ontario-service-design-playbook" satisfies ExternalLinkKey,
      description:
        "Guide de conception de services de l’Ontario (Service numérique de l’Ontario, CC-BY ; provincial, réutilisable) — https://www.ontario.ca/page/service-design-playbook",
    },
    {
      label: "Référence complémentaire",
      linkKey: "scrum-guide" satisfies ExternalLinkKey,
      description: "Le Guide Scrum (Schwaber et Sutherland, CC BY-SA) — https://scrumguides.org/scrum-guide.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-service-manual-agile-delivery" satisfies ExternalLinkKey,
      description:
        "Service Manual de GOV.UK, livraison agile (rédiger des histoires d’utilisateur ; établir les priorités) — https://www.gov.uk/service-manual/agile-delivery",
    },
    {
      label: "Référence complémentaire",
      linkKey: "18f-derisking" satisfies ExternalLinkKey,
      description:
        "18F, « De-risking Government Technology » / Guide du produit — https://guides.18f.gov/derisking/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-design-community" satisfies ExternalLinkKey,
      description:
        "Collectivité de la conception du GC (wiki GCcollab) — https://wiki.gccollab.ca/GC_design_community",
    },
    {
      label: "Référence complémentaire",
      linkKey: "atlassian-scrum-backlogs" satisfies ExternalLinkKey,
      description: "Atlassian, carnet de produit — https://www.atlassian.com/agile/scrum/backlogs",
    },
    {
      label: "Référence complémentaire",
      linkKey: "atlassian-technical-debt" satisfies ExternalLinkKey,
      description:
        "Atlassian, dette technique — https://www.atlassian.com/agile/software-development/technical-debt",
    },
    {
      label: "Référence complémentaire",
      linkKey: "roman-pichler-backlog-mistakes" satisfies ExternalLinkKey,
      description:
        "Roman Pichler, sept erreurs de carnet de produit à éviter — https://www.romanpichler.com/blog/product-backlog-mistakes/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "design-canada-continuous-improvement" satisfies ExternalLinkKey,
      description:
        "Amélioration continue sur design.canada.ca — https://design.canada.ca/continuous-improvement.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "mountaingoat-user-stories" satisfies ExternalLinkKey,
      description:
        "Mike Cohn (Mountain Goat), histoires d’utilisateur — https://www.mountaingoatsoftware.com/agile/user-stories",
    },
    {
      label: "Référence complémentaire",
      linkKey: "svpg-product-vs-feature-teams" satisfies ExternalLinkKey,
      description:
        "Marty Cagan (SVPG), « Product vs Feature Teams » — https://www.svpg.com/product-vs-feature-teams/",
    },
    {
      label: "Modèles et outils",
      linkKey: "gc-open-resource-exchange",
      description:
        "Échange de ressources ouvertes : là où le code libre du GC est inscrit et trouvé.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "guide-publishing-open-source",
      description:
        "Guide pour la publication du code source libre (SCT) : le mode d’emploi du GC pour diffuser du code ouvertement.",
    },
  ] satisfies SourceItem[],
} as const;
