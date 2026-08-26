import type { SourceItem } from "@/components/SourcesBlock";
import type { PhaseQuoteContent } from "@/components/PhaseQuote";
import { phaseQuotePlainText } from "@/components/PhaseQuote";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import type { ThreadLinkedProse } from "@/lib/thread-rich-content";

export type CreateSubphaseRow = {
  title: string;
  description: string;
  href: string;
};

export const CREATE_PHASE = {
  title: PHASES.create.pageHeading,

  quote: {
    lead:
      "Là où un service passe d’un problème à une première version fonctionnelle entre les mains des utilisateurs. L’équipe :",
    items: [
      "détermine quel est réellement le problème",
      "décide s’il faut réutiliser, acheter ou construire",
      "fait financer et approuver le service",
      "livre la première version",
    ],
    takeaway: "L’essentiel de ce qui façonne le service se décide ici.",
  } satisfies PhaseQuoteContent,

  /** @deprecated Use CREATE_PHASE.quote.text */
  oneLineDescription:
    "Là où un service passe d’un problème à une première version fonctionnelle entre les mains des utilisateurs. L’équipe détermine quel est réellement le problème, décide s’il faut réutiliser, acheter ou construire, fait financer et approuver le service, et livre la première version. L’essentiel de ce qui façonne le service se décide ici.",

  lead: [
    {
      text: "La Création est la partie de la vie d’un service qui a une ligne d’arrivée claire. Cette arrivée, c’est le lancement, le jour où le service est mis en service.",
      bold: [{ phrase: "une ligne d’arrivée claire" }],
    },
    {
      text: "Elle va de la première idée au lancement. Entre les deux, une équipe détermine si le service devrait exister, ce qu’il devrait être, et comment le payer et le mettre en place. La Création se déroule en trois sous-phases, Découverte, Alpha et Bêta, de l’apprentissage du besoin à un vrai service prêt à être lancé.",
      internalLinks: [
        { phrase: "Découverte", to: "/create-discovery" },
        { phrase: "Alpha", to: "/create-alpha" },
        { phrase: "Bêta", to: "/create-beta" },
      ],
    },
    {
      text: "Après le lancement, le travail ne s’arrête pas. Il change : le travail ponctuel de mise en place du service devient le travail de longue haleine consistant à l’exploiter et à l’améliorer, c’est-à-dire l’Exploitation.",
      internalLinks: [{ phrase: "Exploitation", to: PHASES.live.href }],
    },
    {
      text: "Pensez à l’Exploitation pendant que vous créez. Quatre éléments déterminent si le service pourra être maintenu pendant des années : l’équipe qui l’exploite, les fonds de fonctionnement, le soutien qui en répond, et la marge pour continuer à l’améliorer. Chacun coûte le moins cher maintenant, avant la signature du contrat et avant que la conception se fige.",
      bold: [{ phrase: "Pensez à l’Exploitation pendant que vous créez." }],
    },
  ] satisfies ThreadLinkedProse[],

  costOfLate: {
    title: "Le coût de l’attente",
    lead: "Tout ce qui se trouve dans la Création coûte le moins cher la première fois qu’il se présente, et le prix monte ensuite :",
    items: [
      {
        heading: "Droits de sortie oubliés à la signature.",
        line: "Le seul moment de rapport de force passe, et le ministère loue son propre service pendant dix ans.",
      },
      {
        heading: "Accessibilité ajoutée après la construction.",
        line: "Au Canada, la vérification de l’accessibilité se fait au moment de l’achat : un produit acheté sans les clauses est donc payé deux fois.",
      },
      {
        heading: "Autorisations entamées trop tard.",
        line: "L’autorisation de sécurité et l’évaluation de la protection de la vie privée prennent chacune des mois, et le lancement attend la plus lente.",
      },
      {
        heading: "Équipe d’exploitation trouvée après le lancement.",
        line: "Personne n’est affecté à l’exploitation du service, et il se dégrade pendant que l’embauche rattrape le retard.",
      },
      {
        heading: "Fonds de fonctionnement découverts trop tard.",
        line: "La construction était financée, mais pas l’exploitation, et la première année devient une demande d’urgence.",
      },
    ],
  },

  approvalPointer: {
    id: "how-a-service-gets-approved-and-funded",
    href: THREADS.funding.path,
    caption: {
      text: "La façon dont un service est approuvé et financé constitue un parcours à part entière, présenté sur la page Financement.",
      internalLinks: [{ phrase: "la page Financement", to: THREADS.funding.path }],
    } satisfies ThreadLinkedProse,
  },

  workOfCreate: {
    id: "the-work-of-create",
    title: "Le travail de la Création",
    introBold: "La Création, c’est trois types de travail, et elle se termine le jour où le service est mis en service.",
    blocks: [
      {
        heading: "1. Déterminer ce qui est nécessaire.",
        lead: "La Création consiste surtout à décider, et la décision la moins coûteuse est celle d’arrêter.",
        afterLead: {
          text: "Un remplacement profite lui aussi de chaque sous-phase. Remplacer un service existant peut donner l’impression que le gros du travail est fait, parce que l’ancien montre ce qu’il faisait. Ce qu’il ne peut pas montrer, c’est ce dont les gens ont besoin aujourd’hui : le problème a pu se déplacer, les utilisateurs ont pu changer, les règles peuvent être différentes. Traverser la Découverte, l’Alpha et la Bêta avec le même soin qu’un nouveau service, c’est ce qui permet à une équipe de s’en apercevoir.",
          bold: [
            { phrase: "Un remplacement profite lui aussi de chaque sous-phase." },
            { phrase: "besoin aujourd’hui" },
          ],
        },
        bullets: [
          {
            text: "La recherche sur les utilisateurs révèle ce dont les gens ont réellement besoin, avant que quoi que ce soit soit construit.",
            internalLinks: [{ phrase: "recherche sur les utilisateurs", to: "/thread/user-research" }],
          },
          {
            text: "Une analyse des options détermine s’il faut réutiliser, acheter ou construire.",
            internalLinks: [{ phrase: "Une analyse des options", to: "/reference/options-analysis" }],
          },
          {
            text: "La prestation intégrée confronte le service au parcours complet d’une personne, pour qu’il ne soit pas conçu comme une île.",
            internalLinks: [
              { phrase: "prestation intégrée", to: "/thread/joined-up-delivery" },
            ],
          },
        ],
      },
      {
        heading: "2. Le faire financer et approuver.",
        lead:
          "Le vrai service n’est construit que lorsque les fonds et les autorisations sont en place, et pour la plupart des services cela se passe à l’intérieur du ministère.",
        bullets: [
          {
            text: "Les projets dépassant les seuils du Conseil du Trésor sont évalués en coûts et en risques au moyen de l’Évaluation de la complexité et des risques des projets, et cette évaluation détermine le parcours d’approbation du service.",
          },
          {
            text: "Pour la plupart des services, l’évaluation les garde à l’intérieur du ministère : ajoutés au plan d’investissement du ministère, financés à même son propre budget, et examinés par ses propres organes de gouvernance et son propre comité d’examen de l’architecture.",
          },
          {
            text: "Seuls les services les plus vastes ou les plus complexes vont plus loin, jusqu’au Comité d’examen de l’architecture intégrée du gouvernement du Canada et à une présentation au Conseil du Trésor. La plupart n’y vont pas.",
          },
          {
            text: "Le Financement présente le parcours complet, et lequel un service donné emprunte. Les points de contrôle officiels d’un service numérique présentent chaque point de contrôle officiel sur une seule page.",
            internalLinks: [
              { phrase: "Financement", to: "/thread/funding" },
              {
                phrase: "Les points de contrôle officiels d’un service numérique",
                to: "/gate-map",
              },
            ],
          },
          {
            text: "Obtenir les approbations applicables, avant la construction, c’est ce qui donne à la Création sa ligne d’arrivée.",
          },
        ],
      },
      {
        heading: "3. Le construire pour qu’il puisse être exploité, puis remplacé ou mis hors service.",
        lead: "Ce qui se décide ici, le service devra vivre avec pendant des années : il vaut donc la peine de bien faire pendant que c’est encore facile à changer.",
        bullets: [
          {
            text: "La sécurité et la protection de la vie privée sont intégrées à la conception pendant qu’il est encore peu coûteux de la modifier. Si le service traite des renseignements personnels servant à prendre des décisions concernant des personnes, une évaluation des facteurs relatifs à la vie privée est réalisée ici.",
            internalLinks: [
              { phrase: "sécurité", to: "/thread/security" },
              { phrase: "privacy", to: "/thread/privacy" },
            ],
          },
          {
            text: "L’accessibilité est intégrée dès le départ.",
            internalLinks: [{ phrase: "accessibilité", to: "/thread/accessibility" }],
          },
          {
            text: "Quand la technologie est achetée, l’approvisionnement inscrit les exigences, et la sortie, dans le contrat.",
            internalLinks: [{ phrase: "procurement", to: "/thread/procurement" }],
          },
          {
            text: "L’équipe qui exploitera le service est constituée.",
            internalLinks: [{ phrase: "team", to: "/thread/team-capability" }],
          },
        ],
      },
    ],
    closing: {
      leadIn: "Ce sont des décisions ponctuelles, prises pour faire construire le service.",
      text: "L’analyse de rentabilisation est faite, les fonds pour construire et exploiter le service sont engagés, et la conception est approuvée. La plupart de ces décisions reviennent après le lancement, chacune selon son propre cycle : certaines à chaque mise en production, certaines une fois par année, certaines seulement quand quelque chose change dans le service. C’est ce rythme récurrent qui rend l’Exploitation différente.",
    },
  },

  workingThroughCreate: {
    id: "create-in-three-sub-phases",
    title: "La Création en trois sous-phases",
    intro:
      "La Création se déroule en trois sous-phases, chacune avec sa propre page. L’approbation et le financement ne se règlent pas d’un seul coup avant qu’elles commencent. Ils s’accumulent au fil des sous-phases, et le grand engagement, les fonds et les autorisations pour la construction, arrive avant la Bêta.",
    subphases: [
      {
        title: "Découverte",
        description:
          "comprendre le problème, déterminer si un service est nécessaire, et s’il faut réutiliser, acheter ou construire. S’arrêter ici peut être un bon résultat.",
        href: "/create-discovery",
      },
      {
        title: "Alpha",
        description:
          "éprouver les idées les plus risquées avec des prototypes jetables, avant de s’engager.",
        href: "/create-alpha",
      },
      {
        title: "Bêta",
        description:
          "mettre en place le vrai service et le valider avec de vrais utilisateurs, avant le lancement.",
        href: "/create-beta",
      },
    ],
    launchNote:
      "Le lancement est le passage vers l’Exploitation : le service est mis en service et devient celui que les gens utilisent réellement, à la place de ce qu’ils faisaient avant.",
  },

  sources: [
    {
      label: "Modèles et outils",
      linkKey: "pcra-tool" satisfies ExternalLinkKey,
      description:
        "Outil d’évaluation de la complexité et des risques des projets (ECRP) (SCT) : le questionnaire qui évalue l’ampleur et le risque du projet ; le résultat, comparé à la classe de capacité approuvée du ministère, détermine qui peut l’approuver.",
    },
    {
      label: "Instrument directeur",
      linkKey: "guideline-service-digital" satisfies ExternalLinkKey,
      description: "Ligne directrice sur les services et le numérique (SCT).",
    },
    {
      label: "Instrument directeur",
      linkKey: "concept-case-procedures" satisfies ExternalLinkKey,
      description: "Procédures obligatoires sur les analyses de rentabilisation conceptuelles pour les projets habilités par le numérique (SCT).",
    },
    {
      label: "Instrument directeur",
      linkKey: "directive-projects-programmes" satisfies ExternalLinkKey,
      description: "Directive sur la gestion des projets et des programmes (SCT).",
    },
    {
      label: "Collectivités",
      linkKey: "gcdigital-community" satisfies ExternalLinkKey,
      description:
        "Collectivité GCNumérique (BDPI du SCT) : la communauté des praticiens du numérique dans l’ensemble du gouvernement.",
    },
  ] satisfies SourceItem[],
} as const;

export const createPhaseLeadPlainText = [
  phaseQuotePlainText(CREATE_PHASE.quote),
  ...CREATE_PHASE.lead.map((paragraph) => paragraph.text),
].join(" ");
