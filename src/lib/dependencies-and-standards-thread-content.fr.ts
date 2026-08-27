import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import {
  threadLeadPlainText,
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  type ThreadCloserLookBlock,
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type DependenciesAndStandardsLinkedProse = ThreadLinkedProse;
export type DependenciesAndStandardsContentSection = ThreadContentSection;
export type DependenciesAndStandardsWhyItMatters = readonly DependenciesAndStandardsContentSection[];
export type DependenciesAndStandardsCloserLookBlock = ThreadCloserLookBlock;
export type DependenciesAndStandardsPhasePreviewBlock = ThreadPhasePreviewBlock;

export const dependenciesAndStandardsSectionsPlainText = threadSectionsPlainText;
export const dependenciesAndStandardsLeadPlainText = (lead: ThreadLinkedProse) =>
  threadLeadPlainText(lead);
export const dependenciesAndStandardsWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const DEPENDENCIES_AND_STANDARDS_THREAD = {
  title: "Dépendances et normes",
  slug: "dependencies-and-standards" as const,

  lead: {
    text:
      "Presque aucun service n’est bâti à partir de rien. Il est assemblé à partir de pièces : bibliothèques à code source libre, services de tiers, produits de fournisseurs, et les formats et protocoles qui permettent à ces pièces de communiquer entre elles. Les dépendances et normes, c’est bien choisir ces pièces et en prendre soin. Cela réunit quatre habitudes : bâtir sur des normes ouvertes pour que les pièces puissent se connecter et être remplacées; connaître tout ce dont le service dépend; évaluer un composant avant de l’adopter; et garder ce dont on dépend à jour et sous surveillance.",
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    {
      text: "Le service est bâti sur des normes ouvertes : il peut donc se connecter à d’autres systèmes et n’est pas lié à un seul fournisseur.",
      externalLinks: [
        { phrase: "normes ouvertes", linkKey: "open-first-whitepaper-standards" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Un composant ou un fournisseur peut être remplacé sans refaire le service, parce que les pièces sont interchangeables et qu’une stratégie de sortie est établie avant le passage à l’infonuagique.",
      externalLinks: [
        { phrase: "une stratégie de sortie", linkKey: "isc2-cloud-exit-strategies" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "L’équipe connaît tout ce dont le service dépend, tenu sous forme d’inventaire à jour, une nomenclature logicielle, c’est-à-dire la liste des ingrédients qui composent le logiciel.",
      externalLinks: [
        { phrase: "une nomenclature logicielle", linkKey: "cccs-software-supply-chain-itsm10071" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Les nouveaux composants et fournisseurs sont évalués avant d’être adoptés : est-ce encore entretenu, est-ce sécuritaire, est-ce bien soutenu.",
      externalLinks: [
        {
          phrase: "évalués avant d’être adoptés",
          linkKey: "guide-open-source-software",
        },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Les dépendances sont tenues à jour, et une vulnérabilité connue est corrigée sans tarder plutôt que laissée en place.",
    },
    {
      text: "Les contrats fixent des exigences minimales de sécurité et obligent le fournisseur à signaler un incident de sécurité dans un délai déterminé.",
      externalLinks: [
        {
          phrase: "des exigences minimales de sécurité",
          linkKey: "cccs-cyber-supply-chain-smb-itsap00070",
        },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Les options à code source libre sont envisagées en premier, conformément à la position « ouvert en premier » du gouvernement du Canada.",
      externalLinks: [
        { phrase: "la position « ouvert en premier »", linkKey: "open-first-whitepaper-oss-use" },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies DependenciesAndStandardsLinkedProse[],

  whyItMatters: [
    {
      text:
        "Les pièces qui composent un service sont aussi les façons dont il peut mal tourner. Il y a deux risques.",
    },
    {
      type: "orderedList",
      items: [
        {
          bold: "Lock-in.",
          text:
            "Quand un service est lié aux formats exclusifs d’un seul fournisseur, ce fournisseur contrôle les fonctions, les correctifs et le prix, et s’en éloigner plus tard coûte très cher. Les normes ouvertes gardent les pièces interchangeables : un service peut ainsi changer une pièce sans refaire le reste.",
        },
        {
          text:
            "La chaîne d’approvisionnement. Une faille ou une altération dans un composant que vous n’avez pas écrit devient votre problème. Comme le dit le Centre canadien pour la cybersécurité, une organisation est légalement responsable de protéger ses renseignements, même lorsqu’elle recourt à des services de tiers.",
          bold: [{ phrase: "La chaîne d’approvisionnement." }],
        },
      ],
    },
    {
      text:
        "La faille Log4j montre pourquoi cela compte. Quand elle est apparue en 2021 dans une bibliothèque de journalisation utilisée par des millions d’applications, les équipes qui s’en sont bien sorties sont celles qui savaient exactement où elles s’en servaient et qui pouvaient corriger vite. Voilà ce que vous rapporte le fait de connaître, d’évaluer et de corriger vos dépendances.",
      externalLinks: [
        { phrase: "Log4j", linkKey: "cccs-log4j-alert" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text:
        "La position du gouvernement du Canada est d’utiliser le code source libre et les normes ouvertes en premier, précisément pour ces raisons.",
    },
  ] satisfies DependenciesAndStandardsWhyItMatters,

  whoseJob: {
    intro: "Le fil Dépendances et normes est partagé au sein de l’équipe, chaque rôle en portant une partie différente :",
    roles: [
      {
        role: "Développeurs et architectes",
        text: "choisissent les normes ouvertes, sélectionnent et intègrent les composants, tiennent l’inventaire de ce dont le service dépend et appliquent les correctifs.",
      },
      {
        role: "Spécialistes de la sécurité",
        text: "évaluent le risque lié à la chaîne d’approvisionnement, surveillent les nouvelles vulnérabilités et jugent si l’on peut se fier à un composant en toute sécurité.",
      },
      {
        role: "Spécialistes de l’approvisionnement et des contrats",
        text: "inscrivent au contrat les exigences minimales de sécurité et les clauses de signalement des incidents.",
        internalLinks: [
          {
            phrase: "au contrat les exigences minimales de sécurité et les clauses de signalement des incidents",
            to: GOOD_CONTRACT_PATH,
          },
        ] satisfies InternalPhraseLink[],
      },
      {
        role: "Le responsable opérationnel de l’application",
        text: "veille à ce que les options ouvertes et le coût du verrouillage soient soupesés, finance la mise à jour des dépendances et accepte que le service soit responsable de ses pièces.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    blocks: [
      {
        title: "Les normes ouvertes vous laissent libre de changer.",
        sections: [
          { text: "Deux idées sont faciles à confondre :" },
          {
            type: "unorderedList",
            items: [
              {
                text: "Le code source libre est une façon de bâtir et de partager des logiciels, où le code peut être utilisé et modifié par quiconque.",
                bold: [{ phrase: "Le code source libre" }],
                externalLinks: [
                  { phrase: "utilisé et modifié par quiconque", linkKey: "uk-make-use-of-open-standards" },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text: "Les normes ouvertes sont les règles communes, les formats de fichiers, protocoles et interfaces, que tout produit peut suivre pour fonctionner avec les autres.",
                bold: [{ phrase: "normes ouvertes" }],
              },
            ],
          },
          {
            text:
              "Bâtir sur des normes ouvertes garde les pièces d’un service interchangeables : chacune peut être remplacée par une autre qui fait le même travail, sans casser le reste. C’est le sens concret de l’évitement du verrouillage chez un fournisseur.",
            bold: [{ phrase: "normes ouvertes" }, { phrase: "substitutable" }],
          },
          {
            text:
              "Le coût du verrouillage est concret : un fournisseur que vous ne pouvez pas quitter contrôle vos fonctions, vos correctifs et votre prix. La position « ouvert en premier » du gouvernement du Canada demande donc aux équipes de tenir compte des coûts de sortie et de transition dans le coût total de possession, et d’établir une stratégie de sortie avant de s’engager envers un service infonuagique.",
            bold: [{ phrase: "établir une stratégie de sortie avant de s’engager envers un service infonuagique" }],
          },
        ],
      },
      {
        title: "Connaissez et évaluez ce dont vous dépendez.",
        sections: [
          {
            text:
              "On ne peut pas prendre soin de ce qu’on ne voit pas. Le point de départ est donc un inventaire de tout ce dont le service dépend, une nomenclature logicielle, c’est-à-dire la liste des ingrédients qui composent le logiciel.",
            bold: [{ phrase: "une nomenclature logicielle" }],
          },
          {
            text: "Avant d’adopter un nouveau composant, faites-lui un bref bilan de santé. Le Guide pour l’utilisation de logiciels libres du GC propose de regarder :",
            externalLinks: [
              { phrase: "Guide pour l’utilisation de logiciels libres du GC", linkKey: "guide-open-source-software" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "si le projet est encore activement entretenu;",
                bold: [{ phrase: "activement entretenu" }],
              },
              { text: "qui le développe;", bold: [{ phrase: "qui le développe" }] },
              { text: "à quel point il est bien documenté;", bold: [{ phrase: "documented" }] },
              {
                text: "à quelle vitesse il corrige les failles de sécurité.",
                bold: [{ phrase: "patches" }],
              },
            ],
          },
          {
            text:
              "Des outils peuvent faire une bonne partie de ce travail pour vous. Une note de santé du code source libre évalue un projet sur dix selon des critères comme le fait qu’il soit encore entretenu et qu’il garde ses propres dépendances à jour; une équipe peut ainsi juger du risque de l’ajouter.",
            externalLinks: [
              { phrase: "Une note de santé du code source libre", linkKey: "openssf-scorecard" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Gardez la chaîne d’approvisionnement sûre.",
        sections: [
          {
            text: "Un maillon faible n’importe où dans la chaîne est un risque pour tout le service; quelques habitudes comptent donc.",
          },
          {
            text:
              "Corrigez vos dépendances. Une vulnérabilité connue laissée en place est une porte ouverte, et votre inventaire est ce qui vous permet de trouver chaque endroit où un composant vulnérable est utilisé, dès l’annonce d’une faille.",
            bold: [{ phrase: "Corrigez vos dépendances." }],
          },
          {
            text:
              "Tenez vos fournisseurs à un niveau d’exigence. Pour les pièces qui viennent de fournisseurs, le Centre canadien pour la cybersécurité conseille de :",
            bold: [{ phrase: "Tenez vos fournisseurs à un niveau d’exigence." }],
          },
          {
            type: "unorderedList",
            items: [
              "connaître vos fournisseurs;",
              "fixer des exigences minimales de sécurité;",
              "inscrire au contrat une clause obligeant le fournisseur à signaler un incident de sécurité dans un délai déterminé.",
            ],
          },
          {
            text:
              "Trois questions transforment une confiance vague en quelque chose de vérifiable : le fournisseur tient-il une nomenclature logicielle, à quelle vitesse corrige-t-il, et comment vous préviendrait-il?",
          },
        ],
      },
    ] satisfies DependenciesAndStandardsCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Deux façons de gérer les dépendances",
    risky: {
      heading: "Vell",
      framing: "Voici Vell, gestionnaire de service. L’équipe a bâti le système de gestion des dossiers avec ce qui allait le plus vite :",
      items: [
        "bâti sur les formats exclusifs d’un seul fournisseur, sans stratégie de sortie",
        "jamais fait le suivi de ce dont le service dépendait",
        "intégré des composants à code source libre sans les vérifier, et rarement appliqué de correctifs",
      ],
      closing:
        "Résultat : quand une bibliothèque largement utilisée s’est révélée avoir une faille critique, l’équipe n’a pas pu dire si elle était touchée ni où, et le fournisseur a demandé une fortune pour faire un changement qu’elle ne pouvait pas faire elle-même.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Voici Pax, gestionnaire de service. L’équipe a traité les pièces comme quelque chose dont il faut prendre soin :",
      items: [
        "bâti sur des normes ouvertes et gardé une stratégie de sortie, pour pouvoir changer de fournisseur",
        "tenu un inventaire à jour de chaque composant et de sa provenance",
        "évalué les nouveaux composants pour vérifier qu’ils étaient entretenus et sécuritaires, appliqué les correctifs sans tarder et exigé des fournisseurs qu’ils signalent vite les incidents",
      ],
      closing:
        "Résultat : quand la même faille est apparue, l’équipe savait en quelques heures exactement où la bibliothèque était utilisée et l’a corrigée, et aucun fournisseur ne pouvait prendre le service en otage.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble le fil Dépendances et normes à chaque phase",
    intro: "Choisir les pièces et en prendre soin est un travail qui traverse toute la vie d’un service.",
    blocks: [
      {
        title: "Create.",
        preview: "Choisir des normes ouvertes et retenir les pièces de façon délibérée.",
        popup: [
          {
            text:
              "Les choix qui comptent le plus se font avant que le service ne soit bâti. L’équipe bâtit sur des normes ouvertes pour que les pièces restent interchangeables, retient chaque dépendance de façon délibérée et commence l’inventaire, établit une stratégie de sortie avant de s’engager envers un fournisseur infonuagique, et travaille avec l’approvisionnement pour inscrire au contrat les exigences de sécurité et de signalement des incidents. Concevoir dès le départ pour se connecter par des interfaces ouvertes est bien plus facile que de l’ajouter après coup.",
            internalLinks: [
              { phrase: "procurement", to: THREADS.procurement.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Garder l’inventaire à jour et appliquer les correctifs.",
        popup: [
          {
            text:
              "Une fois le service en exploitation, ce travail est continu. L’équipe garde à jour l’inventaire des dépendances, surveille les vulnérabilités nouvellement découvertes et les corrige sans tarder, et réévalue les fournisseurs de temps à autre. Un correctif ne protège les utilisateurs qu’une fois publié : garder les dépendances à jour et diffuser le correctif vont donc de pair.",
            internalLinks: [
              { phrase: "les corrige sans tarder", to: THREADS.security.path },
              { phrase: "released", to: THREADS["releasing-changes"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Les normes rendent le déplacement possible.",
        popup: [
          {
            text:
              "Quand un service est retiré ou remplacé, les choix faits plus tôt portent leurs fruits. Les normes ouvertes rendent les données et les composants transférables vers ce qui vient ensuite, si bien que le déplacement n’est pas une reconstruction, les contrats de fournisseurs prennent fin proprement, et la stratégie de sortie établie au tout début est ce qui permet de partir sans perdre les données.",
            internalLinks: [
              { phrase: "retiré ou remplacé", to: PHASES.sunset.href },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
    ] satisfies DependenciesAndStandardsPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Au-delà des sources déjà liées ci-dessus, l’Échange de ressources ouvert du gouvernement du Canada vous permet de parcourir les normes ouvertes et les logiciels libres que d’autres administrations publiques canadiennes utilisent déjà, pour réutiliser une solution éprouvée plutôt que de partir de rien. Du côté de la chaîne d’approvisionnement, les pratiques de gestion des risques liés à la cybersécurité de la chaîne d’approvisionnement du NIST exposent comment une grande organisation repère, évalue et gère le risque dans les produits et services qu’elle achète, et le Secure Software Development Framework vous donne une liste de contrôle commune des pratiques de développement sécurisé à propos desquelles interroger un fournisseur pendant l’approvisionnement.",
    externalLinks: [
      { phrase: "Échange de ressources ouvert", linkKey: "gc-open-resource-exchange" },
      {
        phrase: "pratiques de gestion des risques liés à la cybersécurité de la chaîne d’approvisionnement",
        linkKey: "nist-sp-800-161-cscrm",
      },
      {
        phrase: "Secure Software Development Framework",
        linkKey: "nist-ssdf",
      },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Instrument directeur",
      linkKey: "guide-open-source-software" satisfies ExternalLinkKey,
      description:
        "Guide pour l’utilisation de logiciels libres du GC (SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/guide-for-using-open-source-software.html",
    },
    {
      label: "Instrument directeur",
      linkKey: "open-first-whitepaper-standards" satisfies ExternalLinkKey,
      description:
        "Livre blanc Ouvert en premier : Normes ouvertes (SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/open-first-whitepaper/open-first-whitepaper-standards.html",
    },
    {
      label: "Instrument directeur",
      linkKey: "cccs-software-supply-chain-itsm10071" satisfies ExternalLinkKey,
      description:
        "CCC, Protéger votre organisation contre les menaces de la chaîne d’approvisionnement des logiciels (ITSM.10.071) — https://www.cyber.gc.ca/en/guidance/protecting-your-organization-software-supply-chain-threats-itsm10071",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cccs-cyber-supply-chain-smb-itsap00070" satisfies ExternalLinkKey,
      description:
        "CCC, Cybersécurité de la chaîne d’approvisionnement pour les petites et moyennes organisations (ITSAP.00.070) — https://www.cyber.gc.ca/en/guidance/cyber-supply-chain-security-small-medium-sized-organizations-itsap00070",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cccs-log4j-alert" satisfies ExternalLinkKey,
      description:
        "CCC, Exploitation active de la vulnérabilité Apache Log4j — l’alerte du Centre pour la cybersécurité sur Log4j (Log4Shell). — https://www.cyber.gc.ca/en/alerts/active-exploitation-apache-log4j-vulnerability",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-use-open-standards-solutions" satisfies ExternalLinkKey,
      description:
        'GC, « Utiliser des normes et des solutions ouvertes » (ligne directrice 4, SCT) — https://canada-ca.github.io/gcdigital-tools_outils-numeriquesgc/en/4-use-open-standards-solutions.html',
    },
    {
      label: "Référence complémentaire",
      linkKey: "open-first-whitepaper-oss-use" satisfies ExternalLinkKey,
      description:
        "Livre blanc Ouvert en premier : Logiciels libres - Utilisation (SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/open-first-whitepaper/open-first-whitepaper-use.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-make-use-of-open-standards" satisfies ExternalLinkKey,
      description: "GOV.UK, Make use of open standards, utiliser les normes ouvertes — https://www.gov.uk/guidance/make-use-of-open-standards",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cisa-sbom" satisfies ExternalLinkKey,
      description: "CISA, Software Bill of Materials (SBOM), nomenclature logicielle — https://www.cisa.gov/sbom",
    },
    {
      label: "Référence complémentaire",
      linkKey: "openssf-scorecard" satisfies ExternalLinkKey,
      description: "OpenSSF Scorecard, note de santé du code source libre — https://openssf.org/projects/scorecard/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "slsa" satisfies ExternalLinkKey,
      description: "SLSA, Supply-chain Levels for Software Artifacts, niveaux de sûreté de la chaîne d’approvisionnement logicielle — https://slsa.dev/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-open-resource-exchange" satisfies ExternalLinkKey,
      description: "Échange de ressources ouvert du GC (SCT) — https://code.open.canada.ca/en/index.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "nist-sp-800-161-cscrm" satisfies ExternalLinkKey,
      description:
        "NIST SP 800-161 rév. 1, Cybersecurity Supply Chain Risk Management Practices for Systems and Organizations, pratiques de gestion des risques liés à la cybersécurité de la chaîne d’approvisionnement pour les systèmes et les organisations — https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
    },
    {
      label: "Référence complémentaire",
      linkKey: "nist-ssdf" satisfies ExternalLinkKey,
      description:
        "NIST SP 800-218, Secure Software Development Framework (SSDF) version 1.1, cadre de développement logiciel sécurisé — https://csrc.nist.gov/pubs/sp/800/218/final",
    },
    {
      label: "Instrument directeur",
      linkKey: "standard-at-risk-it",
      description:
        "Norme sur la technologie de l’information à risque (SCT) : garder les applications à jour; la technologie non soutenue est interdite.",
    },
    {
      label: "Instrument directeur",
      linkKey: "directive-on-service-and-digital",
      description:
        "Directive sur les services et le numérique (SCT) : les obligations en matière de normes ouvertes et de code source libre dans les procédures d’architecture intégrée.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "apm-gcwiki",
      description:
        "Carrefour d’orientation sur la gestion du portefeuille d’applications (wiki GCcollab) : comment est tenu le dossier de portefeuille derrière le portrait des technologies à risque.",
    },
  ] satisfies SourceItem[],
} as const;
