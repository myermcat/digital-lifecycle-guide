import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import { CHECKPOINT_MAP_PATH } from "@/lib/reference-paths";
import {
  threadWhoseJobPlainText,
  type ThreadLinkedProse,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export const fundingLeadPlainText = (lead: readonly ThreadLinkedProse[]) =>
  lead.map((paragraph) => paragraph.text).join(" ");
export const fundingWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const FUNDING_HERO_ALT =
  "Le ministère est au centre. Pour presque tous les services, environ 95 %, le ministère les finance et les approuve à même des fonds qu’il détient déjà. Pour l’exception, environ 5 %, quand un service exige de nouveaux fonds ou qu’il est vaste ou complexe, le ministère s’adresse au Conseil du Trésor, qui débloque les fonds et accorde l’autorisation.";

export type FundingDetailIcon = "coins" | "refresh" | "logout";

export type FundingDetailItem = {
  id: string;
  icon: FundingDetailIcon;
  title: string;
  paragraphs: readonly ThreadLinkedProse[];
  formula?: string;
  afterFormula?: ThreadLinkedProse;
};

export const FUNDING_THREAD = {
  title: "Financement",
  slug: "funding" as const,

  lead: [
    {
      text:
        "Chaque service gouvernemental coûte de l’argent, et quelqu’un doit approuver cette dépense. Le financement, c’est la façon dont un service obtient cet argent et l’autorisation de le dépenser, sur toute sa vie : le faire construire, le maintenir en fonction, et payer pour le retirer à la fin.",
    },
    {
      text:
        "C’est l’autre moitié de l’achat. L’approvisionnement, c’est la façon dont un service est acheté; le financement, c’est la façon dont il est payé et approuvé. Un service peut avoir un fournisseur prêt à commencer et n’aller nulle part tant que l’argent et l’autorisation ne sont pas en place.",
      internalLinks: [{ phrase: "approvisionnement", to: THREADS.procurement.path }],
    },
    {
      text:
        "Pour la plupart des services, c’est plus routinier qu’on ne le pense. Environ dix-neuf services sur vingt sont assez petits pour que le ministère les finance et les approuve lui-même, à même des fonds qu’il détient déjà, et ils ne vont jamais au Conseil du Trésor. Cette page traite d’abord de ce parcours courant. L’exception, un service qui exige de nouveaux fonds ou qui est assez vaste ou complexe pour exiger l’approbation du Conseil du Trésor, vient à la fin.",
    },
  ] satisfies ThreadLinkedProse[],

  whereMoneyComesFrom: {
    id: "where-the-money-comes-from",
    title: "D’où vient l’argent",
    intro:
      "Un ministère ne détient pas une seule cagnotte. Un service est habituellement payé à partir d’une ou de plusieurs de ces sources :",
    items: [
      {
        heading: "Des fonds que le ministère détient déjà.",
        text: "Le budget continu qu’un ministère reçoit chaque année pour exécuter ses programmes, appelé ses niveaux de référence, ou services votés. Un service financé à même cette source, à l’intérieur de la limite du ministère, est approuvé à l’interne et n’exige rien du Conseil du Trésor.",
      },
      {
        heading: "De nouveaux fonds d’un budget fédéral.",
        text: "Quand le gouvernement décide de payer quelque chose de nouveau, il réserve les fonds dans un budget fédéral. Ces fonds sont promis, pas encore entre les mains du ministère. Le Conseil du Trésor doit les débloquer avant que le ministère puisse les dépenser.",
      },
      {
        heading: "Des fonds déplacés d’une autre priorité.",
        text: "Le ministère transfère vers celui-ci des fonds qu’il détient déjà.",
      },
    ],
    closing:
      "Un budget réserve des fonds; il ne les remet pas. Cela ressemble davantage à une reconnaissance de dette (une promesse écrite de payer). Pour transformer la promesse en argent dépensable, un ministère doit produire un plan et le porter au Conseil du Trésor. Les nouveaux fonds arrivent donc toujours en deux temps : ils sont réservés, puis ils sont débloqués.",
  },

  commonPath: {
    id: "the-common-path",
    title: "Le parcours courant : presque tous les services",
    paragraphs: [
      {
        text:
          "La plupart des services restent à l’intérieur du ministère. Quand un service fonctionne à même des fonds que le ministère détient déjà, et qu’il n’est pas trop vaste ou complexe pour qu’il le gère seul, le ministère en établit le coût, le finance et l’approuve. Il n’y a ni présentation au Conseil du Trésor ni approbation centrale.",
      },
      {
        text:
          "Le premier interlocuteur est le secteur des services ministériels, c’est-à-dire les personnes des finances et de la planification qui s’occupent du volet financier. Sur toute la vie d’un service, l’histoire de l’argent se déroule ainsi, surtout entre leurs mains :",
      },
    ] satisfies ThreadLinkedProse[],
    stepGroups: [
      {
        phase: "CREATE",
        steps: [
          {
            text:
              "Un coût pour toute la durée de vie. L’équipe des finances bâtit l’estimation, y compris ce qu’il en coûtera pour l’exploiter année après année, et pas seulement pour le construire.",
            bold: [{ phrase: "Un coût pour toute la durée de vie." }],
          },
          {
            text:
              "Une source de fonds confirmée. Budget existant, ou fonds déplacés d’une autre priorité.",
            bold: [{ phrase: "Une source de fonds confirmée." }],
          },
          {
            text:
              "Une place au plan d’investissement du ministère. La gouvernance du ministère approuve le service et engage le budget.",
            bold: [{ phrase: "Une place au plan d’investissement du ministère." }],
          },
        ],
      },
      {
        phase: "LIVE",
        steps: [
          {
            text:
              "Un financement qui tient une fois le service en fonction. Le service continue de fonctionner sur le budget obtenu pour lui, et tout financement à durée limitée est renouvelé avant son expiration.",
            bold: [{ phrase: "Un financement qui tient une fois le service en fonction." }],
          },
        ],
      },
      {
        phase: "SUNSET",
        steps: [
          {
            text:
              "Des fonds réservés pour la sortie. Avant la fin du financement actuel, le ministère budgète le transfert ou le retrait du service.",
            bold: [{ phrase: "Des fonds réservés pour la sortie." }],
          },
        ],
      },
    ] satisfies ReadonlyArray<{
      phase: string;
      steps: readonly ThreadLinkedProse[];
    }>,
    planAheadCallout: {
      label: "PLANIFIER À L’AVANCE",
      title: "Engager tôt les fonds d’exploitation",
      body: {
        text:
          "Le budget pour exploiter un service année après année est établi séparément des fonds pour le construire. Le ministère signale le coût d’exploitation prévu dès le départ et s’y engage en principe avant que la construction commence (la sous-phase Bêta); un service lancé sans cela peut entrer en service sans aucun plan pour le maintenir en fonction.",
        internalLinks: [
          {
            phrase: "sous-phase Bêta",
            to: "/create-beta",
          },
        ],
      } satisfies ThreadLinkedProse,
    },
    keyCallout:
      "Dix-neuf services sur vingt ne vont jamais au Conseil du Trésor. Pour la plupart des équipes, le financement se règle à l’intérieur de leur propre ministère.",
  },

  treasuryBoardException: {
    id: "when-a-service-goes-to-the-treasury-board",
    title: "Quand un service va au Conseil du Trésor",
    thresholdFigure: {
      alt: "Diagramme en colonnes : un petit projet reste sous la limite et est approuvé à l’intérieur du ministère; un plus grand franchit la limite et exige le Conseil du Trésor.",
      caption:
        "La limite n’est pas un montant fixe. Elle dépend du ministère et du type de projet.",
    },
    paragraphs: [
      {
        text:
          "Un service passe dans l’exception quand il exige de nouveaux fonds que le ministère n’a pas, un nouveau pouvoir (comme celui d’exécuter un nouveau programme de subventions), ou quand il est trop vaste ou complexe pour que le ministère l’approuve seul.",
      },
      {
        text:
          "Ce qui est « trop vaste » n’est pas un chiffre national unique. Chaque ministère se voit reconnaître un niveau de projet qu’il peut gérer seul, établi par son Évaluation de la capacité organisationnelle de gestion de projet (ECOGP). Chaque projet est dimensionné par une Évaluation de la complexité et des risques des projets (ECRP). Quand l’ECRP d’un projet dépasse le niveau du ministère, il va au Conseil du Trésor; en deçà, le ministère décide seul.",
      },
      {
        text:
          "Les deux ont un seuil publié, exprimé en fonction du montant que le ministère est prêt à investir. Une analyse de rentabilisation conceptuelle est obligatoire à partir de 2,5 millions de dollars lorsque le ministère n’a pas de classe de capacité approuvée ou est en classe 1, et le seuil monte avec la classe : 5 millions en classe 2, 10 millions en classe 3, 25 millions en classe 4, et 15 millions pour la Défense nationale.",
        bold: [{ phrase: "un seuil publié" }],
      },
      {
        text:
          "L’ECRP suit une échelle qui lui est propre, du même seuil jusqu’à 50 millions en classe 4, taxes comprises. Les deux échelles ne concordent pas, de sorte qu’un projet peut devoir l’une sans devoir l’autre, et chaque chiffre a sa source dans le cycle de vie d’un service numérique.",
        bold: [{ phrase: "Les deux échelles ne concordent pas" }],
        internalLinks: [
          {
            phrase: "le cycle de vie d’un service numérique",
            to: CHECKPOINT_MAP_PATH,
          },
        ],
      },
      {
        text:
          "Obtenir les fonds signifie alors produire un plan, et ce plan est une présentation au Conseil du Trésor. Un grand service franchit aussi en chemin une série d’autres vérifications, d’une analyse de rentabilisation conceptuelle précoce à un examen de l’architecture, et l’argent n’arrive qu’à la fin, selon un cycle annuel fixe : une grande demande entamée tard attend donc le cycle suivant. La séquence complète, dans l’ordre, avec qui approuve à chaque étape, est exposée dans le cycle de vie d’un service numérique. Le financement en est une partie.",
        internalLinks: [
          {
            phrase: "le cycle de vie d’un service numérique",
            to: CHECKPOINT_MAP_PATH,
          },
        ],
      },
    ] satisfies ThreadLinkedProse[],
  },

  detailWork: {
    id: "the-funding-work-in-detail",
    title: "Le travail de financement, en détail",
    items: [
      {
        id: "costing-a-service",
        icon: "coins",
        title: "Établir le coût d’un service",
        paragraphs: [
          {
            text:
              "Avant qu’un ministère puisse demander des fonds, ou engager les siens, il doit savoir combien le service coûtera. Une estimation des coûts est ce chiffre, produit par l’équipe des finances, qui en répond. Le chiffre qui compte est le coût pour toute la durée de vie : construire le service, l’exploiter, le soutenir, le garder sécurisé, et le retirer à la fin. Un chiffre limité à la construction paraît moins élevé, et il prépare le service à manquer de fonds plus tard.",
          },
          {
            text:
              "Une estimation précoce a le droit d’être approximative, pourvu qu’elle dise à quel point. Une estimation d’ordre de grandeur (EOG) peut s’écarter jusqu’à 40 % du coût réel; une estimation indicative ramène cet écart à environ 25 %; une estimation définitive, à environ 15 %. Chaque estimation devrait préciser de quel type elle est, pour qu’un chiffre précoce ne soit pas lu comme un prix ferme.",
          },
        ],
        formula: "EOG ± 40 %  →  indicative ± 25 %  →  définitive ± 15 %",
        afterFormula: {
          text:
            "Le Guide d’établissement des coûts du GC expose une méthode en sept étapes pour bâtir une estimation qui tient la route.",
          externalLinks: [
            { phrase: "Guide d’établissement des coûts du GC", linkKey: "tbs-guide-costing" },
          ] satisfies ExternalPhraseLink[],
        },
      },
      {
        id: "staying-funded",
        icon: "refresh",
        title: "Rester financé une fois en fonction",
        paragraphs: [
          {
            text:
              "Faire financer un service n’est que le début. Un service en fonction doit rester financé, année après année, et cela demande de l’attention.",
          },
          {
            text:
              "Fonctionner à l’intérieur du budget : un service en fonction tourne sur les fonds obtenus pour lui, suivis pour qu’il ne se retrouve pas à court en cours d’année.",
            bold: [{ phrase: "Fonctionner à l’intérieur du budget :" }],
          },
          {
            text:
              "Planifier les renouvellements tôt : certains financements sont à durée limitée et expirent à une date fixée, et la décision suivante, renouvellement ou expansion, doit s’amorcer bien avant la fin des fonds, parce que l’approbation prend des mois.",
            bold: [{ phrase: "Planifier les renouvellements tôt :" }],
          },
          {
            text:
              "S’ajuster quand les priorités changent : un ministère peut déplacer vers le service des fonds qu’il détient déjà, ou faire une nouvelle demande pour en obtenir davantage.",
            bold: [{ phrase: "S’ajuster quand les priorités changent :" }],
          },
        ],
      },
      {
        id: "funding-the-exit",
        icon: "logout",
        title: "Financer la sortie",
        paragraphs: [
          {
            text:
              "Retirer ou remplacer un service n’est pas gratuit, et un ministère qui n’a pas budgété la sortie peut se retrouver coincé à payer pour un service qu’il veut quitter.",
          },
          {
            text:
              "La sortie coûte de l’argent à trois endroits : transférer les données et mettre en place le remplacement (le volet données du transfert est un travail en soi), mettre l’ancien service hors service et en exploiter deux en parallèle pendant le basculement, et clore proprement les contrats de fournisseurs. Les fonds de la sortie sont réservés avant la fin du financement actuel, pour que le passage soit planifié plutôt que bâclé.",
            internalLinks: [
              { phrase: "le volet données du transfert", to: THREADS["data-stewardship"].path },
            ],
          },
        ],
      },
    ] satisfies FundingDetailItem[],
  },

  whoseJob: {
    intro: "Le financement est partagé dans tout le ministère :",
    roles: [
      {
        role: "Les services ministériels",
        text: "sont la première porte : ils guident une équipe dans l’établissement des coûts, la source des fonds et le plan d’investissement.",
      },
      {
        role: "L’équipe des finances et le dirigeant principal des finances (DPF)",
        text: "produisent l’estimation des coûts et répondent des chiffres.",
      },
      {
        role: "Le responsable opérationnel de l’application",
        text: "assume l’analyse de rentabilisation et les décisions sur ce dont le service a besoin et sur ce qu’il devrait coûter.",
      },
    ],
    closing: {
      text: "(L’ensemble plus large des intervenants pour l’exception, quand un service vaste ou complexe va au Conseil du Trésor, y compris les services juridiques, l’analyste du Secrétariat du Conseil du Trésor et le ministre, est présenté dans l’ordre dans le cycle de vie d’un service numérique.)",
    },
  } satisfies ThreadWhoseJobSection,

  twoWaysComparison: {
    id: "two-ways",
    title: "Deux façons de financer un service",
    risky: {
      heading: "Vell",
      framing: "Voici Vell, gestionnaire de programme. L’équipe a laissé la question de l’argent à la fin :",
      items: [
        "n’a chiffré que la construction, avec un seul chiffre à l’air assuré",
        "est allée de l’avant avant que la source des fonds soit confirmée",
        "a ajouté l’Analyse comparative entre les sexes plus vers la fin pour remplir le gabarit",
      ],
      closing:
        "Le résultat : la demande a été retournée pour être refaite, les coûts d’exploitation se sont révélés bien plus élevés que le chiffre unique, et le service a dû retrancher des fonctionnalités pour rester dans son budget.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Voici Pax, gestionnaire de programme. L’équipe a traité le financement comme faisant partie du travail dès le départ :",
      items: [
        "a chiffré toute la durée de vie du service et précisé à quel point les premiers chiffres étaient approximatifs",
        "a confirmé d’abord la source des fonds, avec l’équipe des finances associée tôt",
        "s’est servie de l’Analyse comparative entre les sexes plus pour façonner la conception, afin qu’elle serve les personnes qui l’utiliseraient",
      ],
      closing:
        "Le résultat : la demande a été acceptée du premier coup, le budget correspondait au coût réel, et le financement de l’année suivante était connu d’avance.",
    } satisfies CaseStudySide,
  },

  furtherReading: [
    {
      text: "Introduction à la planification et à la gestion des investissements, COR433 (École de la fonction publique du Canada)",
      externalLinks: [
        {
          phrase: "Introduction à la planification et à la gestion des investissements, COR433",
          linkKey: "csps-cor433",
        },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies ThreadLinkedProse[],

  sources: [
    {
      label: "Référence complémentaire",
      linkKey: "csps-cor433" satisfies ExternalLinkKey,
    },
    {
      label: "Instrument directeur",
      linkKey: "tbs-directive-management-projects-programmes" satisfies ExternalLinkKey,
    },
    {
      label: "Référence complémentaire",
      linkKey: "tbs-guide-costing" satisfies ExternalLinkKey,
    },
    {
      label: "Instrument directeur",
      linkKey: "concept-case-procedures",
      description:
        "Procédures obligatoires sur les analyses de rentabilisation conceptuelles pour les projets habilités par le numérique (SCT) : là où commence le financement d’un projet numérique.",
    },
    {
      label: "Instrument directeur",
      linkKey: "charging-directive",
      description:
        "Directive sur l’imputation et les autorisations financières spéciales (SCT) : comment les frais de service sont établis, rajustés et remis.",
    },
    {
      label: "Instrument directeur",
      linkKey: "service-fees-act",
      description:
        "Loi sur les frais de service : les obligations légales d’un service qui perçoit des frais.",
    },
    {
      label: "Modèles et outils",
      linkKey: "pcra-tool",
      description:
        "Outil d’évaluation de la complexité et des risques des projets (ECRP) (SCT) : le questionnaire qui évalue l’ampleur et le risque du projet; le résultat, comparé à la classe de capacité approuvée du ministère, détermine qui peut l’approuver.",
    },
  ] satisfies SourceItem[],
} as const;
