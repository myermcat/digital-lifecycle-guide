import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink, BoldPhrase } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import { GOOD_CONTRACT_PATH, SOO_VS_SOW_PATH } from "@/lib/reference-paths";

export { GOOD_CONTRACT_PATH };

export type GoodContractScheduleTag = "standard" | "tailored";

export type GoodContractLinkedProse = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: InternalPhraseLink[];
  anchorLinks?: { phrase: string; hash: string }[];
  bold?: BoldPhrase[];
};

export type GoodContractArticle = {
  number: number;
  title: string;
  text: string;
};

export type GoodContractClause = {
  label: string;
  text: string;
  externalLinks?: ExternalPhraseLink[];
};

export type GoodContractSchedule = {
  id: string;
  letter: string;
  title: string;
  heading: string;
  tag: GoodContractScheduleTag;
  purpose: string;
  clauses: readonly GoodContractClause[];
  whyHere: GoodContractLinkedProse;
};

export type GoodContractSimplificationNote = {
  lead: string;
  paragraphs: readonly GoodContractLinkedProse[];
  exampleBlock: string;
  closing: string;
};

export function goodContractSimplificationNoteText(note: GoodContractSimplificationNote) {
  return [
    note.lead,
    ...note.paragraphs.map((paragraph) => paragraph.text),
    note.exampleBlock,
    note.closing,
  ].join(" ");
}

export const GOOD_CONTRACT = {
  title: "À quoi ressemble un bon contrat",

  lead: [
    {
      text:
        "Quand un fournisseur construit ou exploite votre service, ou quand vous confiez à contrat la construction d’un service à une équipe, le contrat est l’endroit où vivent les promesses. Le reste du guide vous répète d’inscrire des choses au contrat. Cette page les réunit au même endroit et les présente telles qu’un vrai contrat les présenterait, pour notre service exemple, le portail de subventions.",
    },
    {
      text:
        "Ceci est une visite guidée d’un exemple de contrat. Ce n’est pas un gabarit juridique, et cela n’établit pas les règles. Les règles qui régissent les contrats fédéraux relèvent de SPAC, de la Directive sur la gestion de l’approvisionnement, et d’AchatsCanada. Pour la conduite de l’achat lui-même, voir le fil de l’approvisionnement. Cette page ne porte que sur ce qu’une bonne entente devrait contenir.",
      externalLinks: [
        { phrase: "Directive sur la gestion de l’approvisionnement", linkKey: "directive-procurement" },
        { phrase: "AchatsCanada", linkKey: "canadabuys" },
      ] satisfies ExternalPhraseLink[],
      internalLinks: [
        { phrase: "fil de l’approvisionnement", to: THREADS.procurement.path },
      ] satisfies InternalPhraseLink[],
    },
  ],

  contractParts: {
    id: "the-parts",
    heading: "Les parties dont un contrat est assemblé",
    intro:
      "Avant la visite, il est utile de savoir qu’un contrat du gouvernement du Canada n’est pas un seul document. C’est un empilement, assemblé à partir de parties normalisées et de celles que le ministère rédige lui-même.",
    parts: [
      {
        term: "Les articles de l’entente",
        text: "La partie liminaire : qui contracte avec qui, pour quoi, pour combien de temps, et pour combien. Courte, et la partie que tout le monde lit.",
      },
      {
        term: "Les conditions générales",
        text: "Des clauses normalisées qui s’appliquent à des catégories entières de contrats, intégrées par renvoi numéroté plutôt que rédigées au long. Elles couvrent des sujets comme la responsabilité, la résiliation et la propriété intellectuelle.",
      },
      {
        term: "Les conditions générales supplémentaires",
        text: "Des ensembles normalisés additionnels qui s’ajoutent quand l’objet l’exige, comme ceux visant les logiciels ou le traitement de l’information protégée.",
      },
      {
        term: "L’énoncé des travaux",
        text: "La description des travaux, rédigée à partir de vos exigences. C’est la partie que le ministère rédige réellement, et celle à laquelle un fournisseur est tenu au quotidien.",
      },
      {
        term: "La base de paiement",
        text: "Ce qui est payé, quand, et en contrepartie de quoi. Prix ferme, prix plafond, taux par catégorie de main-d’œuvre, ou un mélange.",
      },
      {
        term: "Les annexes",
        text: "Tout ce qui est joint : la liste de vérification des exigences relatives à la sécurité, les clauses d’accessibilité, et les niveaux de service.",
      },
      {
        term: "Une maquette ou une conception, si vous en joignez une",
        optional: true,
        text: "Ce n’est pas une partie obligatoire, et cela mérite réflexion avant d’être ajouté. Tout ce qui est annexé fait partie de l’entente : une conception jointe sans réserve est donc quelque chose à quoi le fournisseur peut être tenu, et quelque chose dont la modification vous coûtera une modification de contrat. Si elle est là pour montrer l’intention plutôt que pour être construite telle quelle, dites-le dans l’annexe elle-même.",
      },
      {
        term: "Les options",
        text: "Des travaux décrits et chiffrés maintenant que le Canada peut exercer plus tard, y compris la construction qui peut suivre un prototype.",
      },
    ],
    order:
      "Lorsque deux parties se contredisent, l’ordre de préséance établi dans le contrat détermine laquelle l’emporte, et les articles de l’entente se situent normalement au sommet. Il vaut la peine de lire cette clause une fois, parce qu’elle vous dit si l’énoncé des travaux que vous avez rédigé peut être écarté par une condition normalisée que vous n’avez jamais lue.",
    close:
      "Le ministère rédige l’énoncé des travaux, les exigences qui le sous-tendent, et les annexes qui portent les niveaux de service ainsi que les clauses de sécurité et d’accessibilité. L’autorité contractante assemble le reste.",
  },

  exampleNote:
    "Tout ce qui suit est rédigé pour le portail de subventions. Les clauses, et les détails entre crochets comme les dates et les pourcentages, sont des éléments que vous fixez pour votre propre service. Traitez ceci comme un exemple travaillé à adapter, non comme un texte à copier.",

  simplificationNote: {
    lead: "Ces clauses sont abrégées.",
    paragraphs: [
      {
        text:
          "Nous avons réduit chaque promesse à une ligne ou deux pour que vous puissiez voir tout le contrat sur une page. Un vrai contrat expose chacune au long.",
      },
      {
        text:
          "Telles qu’elles sont rédigées, elles feraient aussi de mauvaises exigences. « Remettre le service en bon état » est vague : vous ne pourriez pas y tenir un fournisseur, ni vérifier s’il l’a fait.",
        bold: [{ phrase: "de mauvaises exigences" }],
      },
      {
        text:
          "Une bonne exigence est précise, mesurable et vérifiable. Rédigé au long, le « bon état » de l’annexe I se lirait davantage ainsi :",
        bold: [{ phrase: "précise, mesurable et vérifiable" }],
        externalLinks: [
          {
            phrase: "précise, mesurable et vérifiable",
            linkKey: "uk-gov-testable-requirements",
          },
        ] satisfies ExternalPhraseLink[],
      },
    ],
    exampleBlock: `Dans les 30 jours suivant la fin de l’Entente, le Fournisseur doit remettre au Canada :\\n  - une exportation complète de toutes les données du service en CSV et en JSON,\\n  - le code source et la configuration dans le dépôt du Canada,\\n  - la documentation d’exploitation à jour et un guide d’exploitation,\\n  - un registre de chaque composant tiers et de sa licence,\\n  - jusqu’à 20 jours ouvrables de soutien à la transition.\\nLe transfert est achevé quand le Canada confirme que l’exportation se restaure dans un environnement d’essai.`,
    closing:
      "Lisez chaque clause ci-dessous comme la version courte de quelque chose qu’un vrai contrat expose, et rend vérifiable, au long.",
  } satisfies GoodContractSimplificationNote,

  howToRead: {
    intro: [
      {
        text:
          "Un vrai contrat est bâti à partir de parties. Il y a une courte entente principale, les articles de l’entente, puis le détail est joint à la fin dans des sections numérotées appelées annexes. Nous employons ici les mots du contrat lui-même pour que la page se lise comme la chose réelle que vous signeriez. Elle est abrégée et simple, mais disposée comme l’est une vraie.",
        bold: [{ phrase: "schedules" }],
      },
      {
        text:
          "Certaines annexes figurent dans presque tout contrat de service, la colonne vertébrale normalisée : l’énoncé des travaux, le prix, les niveaux de service, et la façon dont le fournisseur restitue le service à la fin. D’autres s’ajoutent selon le service en cause. Le portail de subventions détient des renseignements personnels et financiers : il porte donc des annexes sur la sécurité, la protection de la vie privée, l’accessibilité, les composants dont il est fait, et les données qu’il conserve.",
      },
      {
        text: "Chaque annexe ci-dessous porte donc une étiquette :",
      },
    ] satisfies GoodContractLinkedProse[],
  },

  contractTitle: "Contrat pour le portail de subventions",

  parties:
    "La présente entente est conclue entre Sa Majesté le Roi du chef du Canada, représenté par le ministère (le Canada), et le Fournisseur.",

  articlesHeading: "Articles de l’entente",

  articles: [
    {
      number: 1,
      title: "Les travaux.",
      text:
        "Le Fournisseur doit livrer et exploiter le portail de subventions, le service en ligne que les gens utilisent pour demander et gérer des subventions et contributions, comme le prévoit l’annexe A.",
    },
    {
      number: 2,
      title: "Term.",
      text:
        "La présente entente court sur trois ans à compter de la date de début, avec deux prolongations facultatives d’un an au choix du Canada.",
    },
    {
      number: 3,
      title: "Price.",
      text: "Le Canada verse au Fournisseur les sommes prévues à l’annexe B.",
    },
    {
      number: 4,
      title: "Les obligations du Fournisseur.",
      text: "Le Fournisseur doit satisfaire aux exigences des annexes C à I.",
    },
    {
      number: 5,
      title: "Oversight.",
      text:
        "Le Canada peut vérifier à tout moment la conformité du Fournisseur à la présente entente, et le Fournisseur doit lui donner l’accès et les preuves nécessaires pour ce faire.",
    },
    {
      number: 6,
      title: "Ordre de préséance.",
      text: "En cas de conflit entre une annexe et les présents articles, les articles l’emportent.",
    },
  ] satisfies GoodContractArticle[],

  schedulesClosing: "Les annexes jointes font partie de la présente entente.",

  articlesNote: {
    heading: "Pourquoi la durée comporte des années d’option",
    paragraphs: [
      {
        text:
          "Trois ans avec deux prolongations facultatives d’un an est une forme courante, et chaque partie y joue un rôle. Les trois ans sont ce à quoi le Canada s’engage. Les deux années de prolongation appartiennent au Canada, à prendre ou à laisser, une à la fois. En prendre une est une modification au contrat qui existe déjà : cela peut donc se faire en quelques semaines.",
      },
      {
        text:
          "C’est ce qui rend ces années dignes d’être inscrites. Mener un nouveau concours prend la meilleure partie d’une année une fois comptés l’exigence, la demande de soumissions, l’évaluation et les approbations. Si le contrat prend simplement fin sans que rien ait été amorcé, la seule façon rapide de garder le service en fonction est une prolongation d’urgence négociée en position de faiblesse. Une année d’option achète le temps de mener le prochain concours correctement, ou de déplacer le service ailleurs.",
      },
    ] satisfies readonly GoodContractLinkedProse[],
    checksHeading: "Deux choses à vérifier avant de compter dessus",
    checks: [
      {
        text:
          "Le choix doit appartenir au Canada seul. Une clause où le fournisseur peut refuser la prolongation, ou en revoir le prix, n’est pas la protection qu’elle paraît être. Les taux des années d’option ont leur place à l’annexe B, avec le reste du prix.",
        anchorLinks: [{ phrase: "l’annexe B", hash: "schedule-b" }],
      },
      {
        text:
          "Une année d’option achète du temps, non de la marge pour de nouveaux travaux. Les nouveaux travaux arrivent par autorisations de tâches (A.4), payées aux taux du contrat et plafonnées par leur propre limite (B.4). La Croissance et la Maturité puisent toutes deux dans ce plafond : vérifiez donc ce qu’il en reste avant de promettre une date à quiconque.",
        internalLinks: [
          { phrase: "Croissance", to: "/live-growth" },
          { phrase: "Maturité", to: "/live-maturity" },
        ] satisfies InternalPhraseLink[],
      },
    ] satisfies readonly GoodContractLinkedProse[],
  },

  schedules: [
    {
      id: "schedule-a",
      letter: "A",
      title: "Énoncé des travaux",
      heading: "Annexe A — Énoncé des travaux",
      tag: "standard",
      purpose: "Ce que le fournisseur est engagé à construire et à exploiter.",
      clauses: [
        {
          label: "A.1",
          text: "Le Fournisseur doit concevoir, construire et exploiter le portail de subventions de façon qu’un demandeur puisse créer un compte, demander une subvention, téléverser des documents et suivre une décision.",
        },
        {
          label: "A.2",
          text: "Le Fournisseur doit respecter les dates de livraison prévues à la présente annexe.",
        },
        {
          label: "A.3",
          text: "Le Fournisseur doit fournir les personnes et les compétences nécessaires à l’exploitation du service pendant la durée.",
        },
        {
          label: "A.4",
          text:
            "Le Canada peut ajouter des travaux non nommés à la présente annexe en émettant une autorisation de tâches : une description écrite de la tâche, chiffrée aux taux de l’annexe B, approuvée avant le début des travaux. Chaque tâche doit s’inscrire dans la portée de la présente entente.",
        },
      ],
      whyHere: {
        text:
          "chaque contrat nomme les travaux qu’il achète (les conditions générales d’un contrat de services). L’article A.4 laisse de la place aux travaux que personne ne peut encore nommer : SPAC signe des contrats avec autorisations de tâches lorsqu’il existe un besoin certain de services mais que les tâches exactes et leur calendrier ne seront connus qu’en cours de contrat. Les nouvelles fonctionnalités en Exploitation arrivent habituellement ainsi, chiffrées tâche par tâche plutôt que par un nouvel approvisionnement. Pour en savoir plus : énoncé des besoins et énoncé des travaux.",
        externalLinks: [
          {
            phrase: "les conditions générales d’un contrat de services",
            linkKey: "psc-general-conditions-service-contract",
          },
          {
            phrase: "contrats avec autorisations de tâches",
            linkKey: "task-authorizations",
          },
        ] satisfies ExternalPhraseLink[],
        internalLinks: [
          {
            phrase: "énoncé des besoins et énoncé des travaux",
            to: SOO_VS_SOW_PATH,
          },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-b",
      letter: "B",
      title: "Base de paiement",
      heading: "Annexe B — Base de paiement",
      tag: "standard",
      purpose: "Le prix, et ce qui déclenche chaque paiement.",
      clauses: [
        {
          label: "B.1",
          text: "Le Canada verse au Fournisseur des frais mensuels fixes pour exploiter le service, et des paiements d’étape à la livraison, comme le prévoit la présente annexe.",
        },
        {
          label: "B.2",
          text: "Le Fournisseur facture mensuellement, et le Canada paie dans les trente jours suivant l’acceptation d’une facture exacte.",
        },
        {
          label: "B.3",
          text: "Le paiement d’une facture n’emporte pas renonciation au droit du Canada de rejeter ultérieurement des travaux non conformes à la présente entente.",
        },
        {
          label: "B.4",
          text: "Les travaux ajoutés par autorisation de tâches sont payés aux taux journaliers de la présente annexe, et le total de toutes les autorisations de tâches ne doit pas dépasser le plafond qu’elle fixe à cet égard.",
        },
      ],
      whyHere: {
        text:
          "Pourquoi c’est ici : chaque contrat précise ce qui est payé et quand (les conditions générales d’un contrat de services, liées sous l’annexe A).",
        anchorLinks: [
          {
            phrase: "les conditions générales d’un contrat de services",
            hash: "schedule-a",
          },
        ],
      },
    },
    {
      id: "schedule-c",
      letter: "C",
      title: "Niveaux de service",
      heading: "Annexe C — Niveaux de service",
      tag: "standard",
      purpose: "Le niveau de fonctionnement exigé du service, et pas seulement son existence.",
      clauses: [
        {
          label: "C.1",
          text: "Le Fournisseur doit maintenir le service disponible au moins 99,5 pour cent du temps chaque mois.",
        },
        {
          label: "C.2",
          text: "Le Fournisseur doit intervenir sur une défaillance critique dans l’heure et la régler dans le délai fixé à la présente annexe.",
        },
        {
          label: "C.3",
          text: "Le Fournisseur doit rendre compte de ces niveaux de service chaque mois, pour que le Canada puisse constater qu’ils sont atteints.",
        },
        {
          label: "C.4",
          text: "Si le Fournisseur n’atteint pas un niveau de service, des crédits de service s’appliquent comme le prévoit la présente annexe.",
        },
      ],
      whyHere: {
        text:
          "Pourquoi c’est ici : les niveaux de service sont un élément essentiel d’une entente de service (Ligne directrice sur les ententes de service du SCT).",
        externalLinks: [
          {
            phrase: "Ligne directrice sur les ententes de service",
            linkKey: "tbs-service-agreements-essential-elements",
          },
        ] satisfies ExternalPhraseLink[],
      },
    },
    {
      id: "schedule-d",
      letter: "D",
      title: "Sécurité",
      heading: "Annexe D — Sécurité",
      tag: "tailored",
      purpose:
        "La sécurité n’est pas automatique dans tout contrat. Elle est déclenchée quand le service traite de l’information sensible, et le portail de subventions détient des données personnelles et financières : elle est donc inscrite ici.",
      clauses: [
        {
          label: "D.1",
          text: "Le Fournisseur doit satisfaire aux exigences de sécurité énoncées dans la Liste de vérification des exigences relatives à la sécurité du présent contrat.",
          externalLinks: [
            {
              phrase: "Liste de vérification des exigences relatives à la sécurité",
              linkKey: "tbs-srcl-350-103",
            },
          ] satisfies ExternalPhraseLink[],
        },
        {
          label: "D.2",
          text: "Le Fournisseur doit signaler au Canada tout incident de sécurité dans les 24 heures suivant sa détection.",
        },
        {
          label: "D.3",
          text: "Le Fournisseur doit permettre au Canada d’évaluer ses contrôles de sécurité avant la mise en service et pendant la durée.",
        },
      ],
      whyHere: {
        text:
          "Pourquoi c’est ici : exigé par le Programme de sécurité des contrats du GC. Plus de détails dans le fil sur la sécurité.",
        externalLinks: [
          {
            phrase: "Programme de sécurité des contrats",
            linkKey: "pspc-security-requirements-contracting",
          },
        ] satisfies ExternalPhraseLink[],
        internalLinks: [
          { phrase: "le fil sur la sécurité", to: THREADS.security.path },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-e",
      letter: "E",
      title: "Protection de la vie privée",
      heading: "Annexe E — Protection de la vie privée",
      tag: "tailored",
      purpose: "Un fournisseur qui traite des renseignements personnels est tenu de les protéger.",
      clauses: [
        {
          label: "E.1",
          text: "Le Fournisseur ne doit utiliser les renseignements personnels que pour fournir le service, et uniquement dans la mesure permise par la présente entente.",
        },
        {
          label: "E.2",
          text: "Le Fournisseur doit appliquer les mesures de protection et les contrôles d’accès énoncés dans l’évaluation des facteurs relatifs à la vie privée du Canada.",
        },
        {
          label: "E.3",
          text: "Le Fournisseur doit conserver et éliminer les renseignements personnels selon le plan de conservation et de disposition du Canada.",
        },
        {
          label: "E.4",
          text: "Le Fournisseur doit assumer la responsabilité de toute atteinte qu’il cause, en aviser le Canada sans délai, et lier tout sous-traitant aux mêmes conditions.",
        },
      ],
      whyHere: {
        text:
          "Pourquoi c’est ici : les orientations du SCT sur la prise en compte de la vie privée avant de contracter. Plus de détails dans le fil sur la protection de la vie privée.",
        externalLinks: [
          {
            phrase: "la prise en compte de la vie privée avant de contracter",
            linkKey: "tbs-privacy-before-contracting",
          },
        ] satisfies ExternalPhraseLink[],
        internalLinks: [
          { phrase: "le fil sur la protection de la vie privée", to: THREADS.privacy.path },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-f",
      letter: "F",
      title: "Accessibilité",
      heading: "Annexe F — Accessibilité",
      tag: "tailored",
      purpose: "Pour que tout le monde, y compris les personnes handicapées, puisse utiliser le service.",
      clauses: [
        {
          label: "F.1",
          text: "Le produit doit respecter la norme EN 301 549, qui comprend le niveau AA des WCAG 2.1 pour le Web.",
          externalLinks: [
            { phrase: "EN 301 549", linkKey: "can-asc-en-301-549" },
          ] satisfies ExternalPhraseLink[],
        },
        {
          label: "F.2",
          text: "Le Fournisseur doit fournir un rapport de conformité en matière d’accessibilité et le mettre à jour à chaque mise en production importante, ou au moins une fois par année.",
        },
        {
          label: "F.3",
          text: "L’accessibilité s’applique aux documents et à toute application mobile, non seulement au site Web.",
        },
      ],
      whyHere: {
        text:
          "Pourquoi c’est ici : le guide du GC sur l’inclusion de l’accessibilité dans l’approvisionnement en TIC. Plus de détails dans le fil sur l’accessibilité.",
        externalLinks: [
          {
            phrase: "guide du GC sur l’inclusion de l’accessibilité dans l’approvisionnement en TIC",
            linkKey: "a11y-ict-procurement-guide",
          },
        ] satisfies ExternalPhraseLink[],
        internalLinks: [
          { phrase: "le fil sur l’accessibilité", to: THREADS.accessibility.path },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-g",
      letter: "G",
      title: "Dépendances et chaîne d’approvisionnement",
      heading: "Annexe G — Dépendances et chaîne d’approvisionnement",
      tag: "tailored",
      purpose: "Pour que les composants dont le service est fait restent sûrs, connus et remplaçables.",
      clauses: [
        {
          label: "G.1",
          text: "Le Fournisseur doit tenir une nomenclature logicielle, c’est-à-dire la liste des composants du produit, et la communiquer au Canada sur demande.",
          externalLinks: [
            {
              phrase: "une nomenclature logicielle",
              linkKey: "cccs-software-supply-chain-itsm10071",
            },
          ] satisfies ExternalPhraseLink[],
        },
        {
          label: "G.2",
          text: "Le Fournisseur doit corriger les vulnérabilités connues dans le délai fixé à la présente annexe.",
        },
        {
          label: "G.3",
          text: "Le Fournisseur doit garder le service portable, pour que ses données et ses composants puissent être déplacés sans reconstruction.",
        },
        {
          label: "G.4",
          text: "Le Fournisseur doit tenir ses propres fournisseurs à des exigences minimales de sécurité.",
        },
      ],
      whyHere: {
        text:
          "Pourquoi c’est ici : les orientations du Centre pour la cybersécurité sur les menaces visant la chaîne d’approvisionnement logicielle (liées sous G.1). Plus de détails dans le fil sur les dépendances et les normes.",
        internalLinks: [
          {
            phrase: "le fil sur les dépendances et les normes",
            to: THREADS["dependencies-and-standards"].path,
          },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-h",
      letter: "H",
      title: "Intendance des données",
      heading: "Annexe H — Intendance des données",
      tag: "tailored",
      purpose: "Les données demeurent celles du Canada, restent au bon endroit, et reviennent à la fin.",
      clauses: [
        {
          label: "H.1",
          text: "Les données appartiennent au Canada. Le Fournisseur les détient pour le compte du Canada et doit les restituer sur demande sous une forme utilisable.",
        },
        {
          label: "H.2",
          text: "Le Fournisseur doit conserver les données au Canada là où les règles l’exigent.",
        },
        {
          label: "H.3",
          text: "Le Fournisseur doit informer le Canada de tout accès non autorisé aux données, y compris un accès imposé par une ordonnance judiciaire, sauf si la loi lui interdit de le dire.",
        },
        {
          label: "H.4",
          text: "Pendant toute la durée de l’entente, le Fournisseur doit éliminer les documents selon le calendrier de conservation du Canada, et ne doit pas conserver les données plus longtemps que le Canada ne l’indique.",
        },
        {
          label: "H.5",
          text: "À la fin de la présente entente, le Fournisseur doit restituer les données et détruire de façon sécuritaire ses propres copies.",
        },
        {
          label: "H.6",
          text: "Lorsque des données sont éliminées ou restituées, le Fournisseur doit fournir au Canada la preuve que toutes les copies, y compris les sauvegardes, ont été détruites de façon sécuritaire.",
        },
      ],
      whyHere: {
        text:
          "Pourquoi c’est ici : le livre blanc du GC sur la souveraineté des données et le nuage public. Inscrire au contrat la conservation, la destruction sécuritaire et la preuve de celle-ci suit les clauses contractuelles infonuagiques recommandées par le Centre pour la cybersécurité. Plus de détails dans le fil sur l’intendance des données.",
        externalLinks: [
          {
            phrase: "livre blanc du GC sur la souveraineté des données et le nuage public",
            linkKey: "gc-data-sovereignty-white-paper",
          },
          {
            phrase: "clauses contractuelles infonuagiques recommandées par le Centre pour la cybersécurité",
            linkKey: "cccs-itsm-50-104",
          },
        ] satisfies ExternalPhraseLink[],
        internalLinks: [
          { phrase: "le fil sur l’intendance des données", to: THREADS["data-stewardship"].path },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-i",
      letter: "I",
      title: "Sortie et transition",
      heading: "Annexe I — Sortie et transition",
      tag: "standard",
      purpose: "Pour que le Canada puisse partir à la fin sans que le service s’arrête.",
      clauses: [
        {
          label: "I.1",
          text: "Le Fournisseur doit remettre le service en bon état à la fin : les données, la documentation, et les connaissances nécessaires pour l’exploiter ou le déplacer.",
        },
        {
          label: "I.2",
          text: "Le Fournisseur doit soutenir une période de transition pour qu’un nouveau fournisseur ou une équipe interne puisse prendre le relais sans interruption de service.",
        },
        {
          label: "I.3",
          text: "Le Fournisseur ne doit pas entraver une sortie nette par des frais ou des étapes qui retiennent le service.",
        },
      ],
      whyHere: {
        text:
          "Pourquoi c’est ici : la transition fait partie d’une entente de service bien gérée (la Ligne directrice sur les ententes de service, liée sous l’annexe C).",
        anchorLinks: [
          { phrase: "Ligne directrice sur les ententes de service", hash: "schedule-c" },
        ],
      },
    },
  ] satisfies GoodContractSchedule[],

  sources: [
    {
      label: "Instrument directeur",
      linkKey: "directive-procurement" satisfies ExternalLinkKey,
      description:
        "Directive sur la gestion de l’approvisionnement (SCT) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32692",
    },
    {
      label: "Référence complémentaire",
      linkKey: "psc-general-conditions-service-contract" satisfies ExternalLinkKey,
      description:
        "Conditions générales d’un contrat de services (CFP) — https://www.canada.ca/en/public-service-commission/corporate/about-us/doing-business-public-service-commission/general-conditions-service-contract.html — la colonne vertébrale habituelle d’un contrat de services (travaux, paiement, durée).",
    },
    {
      label: "Référence complémentaire",
      linkKey: "tbs-service-agreements-essential-elements" satisfies ExternalLinkKey,
      description:
        "Ligne directrice sur les ententes de service : éléments essentiels (SCT) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=25761 — les niveaux de service et la transition comme parties essentielles d’une entente de service.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "pspc-security-requirements-contracting" satisfies ExternalLinkKey,
      description:
        "Exigences de sécurité des contrats du gouvernement du Canada (SPAC) — https://www.canada.ca/en/public-services-procurement/services/industrial-security/security-requirements-contracting.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "pspc-contract-security-manual" satisfies ExternalLinkKey,
      description:
        "Manuel de la sécurité des contrats (SPAC) — https://www.canada.ca/en/public-services-procurement/services/industrial-security/security-requirements-contracting/contract-security-manual-contracting-government-canada/contract-security-manual.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "tbs-srcl-350-103" satisfies ExternalLinkKey,
      description:
        "Liste de vérification des exigences relatives à la sécurité, LVERS (TBS/SCT 350-103) — https://www.canada.ca/en/treasury-board-secretariat/corporate/forms/350-103.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "tbs-privacy-before-contracting" satisfies ExternalLinkKey,
      description:
        "Prise en compte de la protection de la vie privée avant les décisions contractuelles (SCT) — https://www.canada.ca/en/treasury-board-secretariat/services/access-information-privacy/privacy/guidance-document-taking-privacy-into-account-before-making-contracting-decisions.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "directive-privacy-practices" satisfies ExternalLinkKey,
      description:
        "Directive sur les pratiques relatives à la protection de la vie privée (SCT) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=18309",
    },
    {
      label: "Référence complémentaire",
      linkKey: "a11y-ict-procurement-guide" satisfies ExternalLinkKey,
      description:
        "Guide pour l’inclusion de l’accessibilité dans l’approvisionnement lié aux TIC (Boîte à outils de l’accessibilité numérique) — https://a11y.canada.ca/en/guide-for-including-accessibility-in-information-and-communication-technology-ict-related-procurement/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gccatalogue-accessibility-procurement" satisfies ExternalLinkKey,
      description:
        "Formulations d’approvisionnement en accessibilité (catalogue du GC) — https://gccatalogue.alpha.canada.ca/patterns/accessibilityprocurement-EN.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "can-asc-en-301-549" satisfies ExternalLinkKey,
      description:
        "EN 301 549 (CAN/ASC, Normes d’accessibilité Canada) — https://accessible.canada.ca/creating-accessibility-standards/canasc-en-301-5492024-accessibility-requirements-ict-products-and-services",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cccs-software-supply-chain-itsm10071" satisfies ExternalLinkKey,
      description:
        "CCC, Protéger votre organisation contre les menaces visant la chaîne d’approvisionnement logicielle (ITSM.10.071) — https://www.cyber.gc.ca/en/guidance/protecting-your-organization-software-supply-chain-threats-itsm10071",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cccs-cyber-supply-chain-smb-itsap00070" satisfies ExternalLinkKey,
      description:
        "CCC, Sécurité de la chaîne d’approvisionnement cybernétique pour les petites et moyennes organisations (ITSAP.00.070) — https://www.cyber.gc.ca/en/guidance/cyber-supply-chain-security-small-medium-sized-organizations-itsap00070",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-data-sovereignty-white-paper" satisfies ExternalLinkKey,
      description:
        "Gouvernement du Canada Livre blanc : Souveraineté des données et nuage public (SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/cloud-services/digital-sovereignty/gc-white-paper-data-sovereignty-public-cloud.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "tbs-digital-sovereignty-residency" satisfies ExternalLinkKey,
      description:
        "Souveraineté numérique, y compris l’Orientation sur la résidence des données électroniques (SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/cloud-services/digital-sovereignty.html",
    },
  ] satisfies SourceItem[],
} as const;
