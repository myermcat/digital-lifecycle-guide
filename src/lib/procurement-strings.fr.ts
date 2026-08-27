import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  BookOpen,
  Boxes,
  CalendarClock,
  Coins,
  CreditCard,
  Hammer,
  Signpost,
  UserCheck,
} from "lucide-react";
import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { ThreadByPhaseContent } from "@/components/ThreadByPhaseSection";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type {
  ChoosingWhatToBuyContent,
  CombiningRoutesParagraph,
} from "@/components/WhatYouAreBuyingBlock";
import { GOOD_CONTRACT_PATH, OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
import {
  GCCASE_MIGRATION_READINESS_GUIDE,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";

export type ProcurementJourneyBodyBlock =
  | {
      type: "p";
      text: string;
      bold?: { phrase: string }[];
    }
  | {
      type: "ul";
      items: readonly string[];
      bold?: { phrase: string }[];
    }
  | {
      type: "subheading";
      text: string;
    }
  | {
      type: "table";
      columns: readonly string[];
      rows: readonly { term: string; cells: readonly string[] }[];
    };

export type ProcurementJourneyStepStrings = {
  label: string;
  title: string;
  /** Body under the accordion title: paragraphs and bullet lists. */
  blocks: ProcurementJourneyBodyBlock[];
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: { phrase: string; to: string }[];
  anchorLinks?: { phrase: string; hash: string }[];
  placeholderLinks?: PlaceholderPhraseLink[];
  reviewNotice?: string;
};

export type WhatStaysYoursItemStrings = {
  lead: string;
  body: string;
  placeholderLinks?: PlaceholderPhraseLink[];
};

export type ComparisonRowStrings = {
  topic: string;
  traditional: string;
  agile: string;
};

export type LinkedProseStrings = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  placeholderLinks?: PlaceholderPhraseLink[];
};

/** @deprecated Prefer ChoosingWhatToBuyContent */
export type WhatYouAreBuyingRouteStrings = {
  lead: string;
  body: string;
  externalLinks?: ExternalPhraseLink[];
  boldPhrases?: { phrase: string }[];
};

/** @deprecated Prefer ChoosingWhatToBuyContent */
export type WhatYouAreBuyingStrings = ChoosingWhatToBuyContent;

type BuyingRouteDraft = {
  id: string;
  icon: LucideIcon;
  title: string;
  sections: readonly ThreadContentSection[];
  contractSigned: ThreadLinkedProse;
};

/** Procurement thread copy — organized by page section. */
export const PROCUREMENT_STRINGS = {
  title: "Approvisionnement",

  intro: {
    paragraphs: [
      "La plupart des applications gouvernementales existantes sont achetées plutôt que construites. Parfois le tout, plus souvent une partie. L’approvisionnement, c’est cet achat : tout le parcours, de la détermination de ce dont vous avez besoin au choix d’un fournisseur, jusqu’à la vie avec le contrat aussi longtemps que le service fonctionne. Le contrat n’en est qu’une partie.",
    ],
    keyPointsHeading: "Résumé",
    keyPoints: [
      {
        lead: "L’achat survit au contrat.",
        icon: CalendarClock,
        body: "Ce qui est signé détermine ce que le service coûte à exploiter, s’il peut être modifié, et si le ministère pourra un jour s’en éloigner. Ces conséquences durent aussi longtemps que le service.",
      },
      {
        lead: "Vous restez responsable du résultat.",
        icon: UserCheck,
        body: "Un fournisseur peut construire le service et l’exploiter. Quand cela ne fonctionne pas pour quelqu’un, c’est toujours le ministère qui en répond, et cette partie ne peut pas être confiée à contrat.",
      },
      {
        lead: "La voie détermine le moment où vous êtes engagé.",
        icon: Signpost,
        body: "Acheter une équipe, acheter une solution et acheter un produit fini signent chacun à un point différent de la Création. Avant la signature, vous avez de la marge pour changer d’avis. Après, les changements se négocient avec un seul fournisseur.",
      },
      {
        lead: "De petits morceaux sont plus faciles à rattraper qu’un seul gros contrat.",
        icon: Boxes,
        body: "Si un morceau tourne mal, vous remplacez le morceau. Si un seul gros contrat tourne mal, des années de travail et l’essentiel de l’argent partent avec.",
      },
      {
        lead: "Vous pouvez suivre la conversation une fois que vous connaissez les mots.",
        icon: BookOpen,
        body: "Demande de soumissions, énoncé des travaux, option, autorisation de tâches : du vocabulaire d’approvisionnement ordinaire, rarement expliqué à la personne dont le service est acheté. Le glossaire de l’approvisionnement, plus bas, les présente.",
        anchorLinks: [{ phrase: "glossaire de l’approvisionnement", hash: "the-words" }],
      },
    ],
  },

  whatWorkStaysYours: {
    heading: "Les parties que vous ne pouvez pas confier à un fournisseur",
    intro: "Quels que soient les autres intervenants, une partie de ce travail vous reste. Voici ce qui vous revient habituellement.",
    items: [
      {
        lead: "Le temps que cela prend.",
        body: "L’approvisionnement suit sa propre horloge, souvent plusieurs mois de la première idée au contrat signé. Planifiez vos échéanciers autour de lui dès le départ, pour qu’il ne vous prenne pas de court.",
      },
      {
        lead: "Les décisions que vous seul pouvez prendre.",
        body: "Quel problème vous résolvez, à quoi ressemblent de bons résultats, s’il faut réutiliser ou acheter, et comment découper le travail en morceaux. Personne ne peut trancher cela à votre place.",
      },
      {
        lead: "Ce que vous apportez à chaque approbation.",
        body: "Chaque point de contrôle en chemin attend quelque chose de vous — un document, un chiffre, une signature — et le travail attend de l’avoir.",
      },
      {
        lead: "En répondre.",
        body: "Vous pouvez confier le travail à un fournisseur. Vous ne pouvez pas lui confier le fait d’en répondre. Quand le service trébuche, c’est votre ministère qui explique pourquoi, et la question vous revient.",
      },
      {
        lead: "Ce que vous signez aujourd’hui vous lie encore dans dix ans.",
        body: "Le contrat façonne toute la vie ultérieure du service : ce qu’il coûte, la possibilité de le modifier, et la possibilité de s’en éloigner un jour. Rien de tout cela n’est facile à revoir une fois signé.",
      },
    ],
    close:
      "Vous n’avez pas besoin d’être un expert. Vous devez rester aux commandes, et demander quand vous n’êtes pas sûr.",
  },

  whatYouAreBuying: {
    heading: "Choisir quoi acheter",
    lead: [
      {
        text: "Acheter n’est pas une seule chose. Il existe plusieurs voies, et le ministère en choisit une dès la Découverte, bien avant que le moindre montant bouge. La voie choisie détermine le moment de la signature du contrat, qui construit les prototypes, et la marge qu’il reste au ministère pour changer d’avis à ce moment-là.",
        internalLinks: [{ phrase: "Découverte", to: "/create-discovery" }],
      },
      {
        text: "Voici quelques-unes des voies. Ce sont celles qu’un service numérique emprunte le plus souvent, et un ministère peut aboutir ailleurs et avoir raison de le faire.",
        bold: [{ phrase: "quelques-unes des voies" }],
      },
      {
        text: "Un mot mérite d’être réglé avant que les voies aient du sens. Une demande de soumissions est l’ensemble de documents que le Canada publie pour inviter les fournisseurs à concourir; ce n’est pas le contrat, qui vient plus tard et seulement pour le gagnant. Ainsi, quand cette page dit que la demande de soumissions s’ouvre sur l’énoncé du problème, cela veut dire que le document de concours commence par le problème plutôt que par une spécification de la réponse. Le reste du vocabulaire se trouve dans le glossaire de l’approvisionnement, plus bas.",
        anchorLinks: [{ phrase: "glossaire de l’approvisionnement", hash: "the-words" }],
      },
    ] satisfies ThreadLinkedProse[],
    routesHeading: "Ce qu’est chaque voie, et comment elle se déroule",
    routes: [
      {
        id: "buy-a-team",
        icon: Banknote,
        title: "Acheter une Équipe",
        sections: [
          {
            text: "Le ministère met sous contrat des personnes plutôt qu’un produit, par des services professionnels fondés sur les tâches. L’équipe travaille selon la direction du ministère, et elle prototype et construit à ses côtés.",
            externalLinks: [
              {
                phrase: "services professionnels fondés sur les tâches",
                linkKey: "task-based-professional-services",
              },
            ],
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "C’est la réponse habituelle pour un ministère sans développeurs à lui, ce qui est le cas de la plupart des ministères.",
                bold: [
                  {
                    phrase:
                      "C’est la réponse habituelle pour un ministère sans développeurs à lui,",
                  },
                ],
              },
              {
                text: "Il y a quand même un concours, habituellement dans le cadre d’une liste de fournisseurs approuvés déjà mis en concurrence : c’est donc plus rapide qu’un appel d’offres ouvert, mais pas instantané.",
                bold: [{ phrase: "Il y a quand même un concours." }],
              },
              {
                text: "C’est l’équipe qui réalise l’Alpha : elle doit donc être là dès le premier jour. Le concours se déroule pendant la Découverte et l’adjudication attend la décision de continuer.",
                bold: [{ phrase: "C’est l’équipe qui réalise l’Alpha :" }],
              },
              {
                text: "Même forme d’échéancier que l’achat d’une Solution. Ce qui diffère, c’est que le contrat achète des personnes plutôt qu’un résultat : une plus grande part de la direction reste donc au ministère.",
                bold: [{ phrase: "L’échéancier a la même forme que l’achat d’une Solution" }],
              },
            ],
          },
          {
            text: "À noter que SPAC s’oriente vers des marchés axés sur les résultats et restreint les outils fondés sur les tâches au travail courant de moindre valeur : vérifiez donc ce qui vous est actuellement ouvert.",
          },
        ],
        contractSigned: {
          text: "à l’ouverture de l’Alpha, une fois la décision de continuer prise.",
        },
      },
      {
        id: "buy-a-solution",
        icon: Coins,
        title: "Acheter une Solution",
        sections: [
          {
            type: "unorderedList",
            items: [
              {
                text: 'La voie que la plupart des gens imaginent quand ils entendent « approvisionnement ».',
              },
              {
                text: "Le ministère décrit le problème et le résultat dont il a besoin. Les fournisseurs proposent comment le résoudre.",
              },
              {
                text: "Plus le ministère est clair tôt, moins il paiera de changements plus tard.",
              },
              {
                text: "Cela se déroule de deux façons, traditionnelle ou agile, et les deux signent à des moments différents.",
              },
            ],
          },
          {
            type: "subheading",
            text: "Deux façons de procéder",
          },
          {
            text: "De façon traditionnelle, le ministère rédige d’abord l’exigence et demande aux fournisseurs de la chiffrer. De façon agile, les fournisseurs sont mobilisés tôt et plus d’un est payé pour construire quelque chose avant que l’un d’eux soit choisi. C’est pourquoi « Acheter une Solution » figure deux fois dans le tableau ci-dessous, signant à un moment différent dans chaque forme. L’annexe A expose le déroulement de la forme agile et ce qu’elle coûte.",
            anchorLinks: [{ phrase: "L’annexe A", hash: "appendix-agile-procurement" }],
          },
        ],
        contractSigned: {
          text: "dépend de la forme. De façon traditionnelle, le ministère prototype d’abord et signe à l’ouverture de la Bêta, une fois qu’il peut dire ce qu’il veut. De façon agile, les contrats sont signés une sous-phase plus tôt, à l’ouverture de l’Alpha, parce que les prototypes sont construits sous leur régime.",
          internalLinks: [{ phrase: "Alpha", to: "/create-alpha" }],
        },
      },
      {
        id: "buy-a-finished-product",
        icon: CreditCard,
        title: "Acheter un Produit fini",
        sections: [
          {
            text: "Un outil existant, acheté au titre d’une offre à commandes ou d’un arrangement en matière d’approvisionnement, c’est-à-dire des listes de fournisseurs et de produits approuvés déjà mis en concurrence.",
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "L’évaluation des produits réels se déroule pendant l’Alpha, de façon comprimée, dans le cadre d’une offre à commandes ou d’un arrangement en matière d’approvisionnement, et le contrat est signé au début de la Bêta. Ce à quoi le ministère les compare, ce sont les constats de la Découverte et de l’Alpha.",
                bold: [{ phrase: "L’évaluation" }],
              },
              {
                text: "C’est la voie la plus rapide et la moins souple. Le risque passe de construire la mauvaise chose à la configurer jusqu’à en faire quelque chose que le ministère ne pourra jamais quitter.",
                bold: [{ phrase: "C’est la voie la plus rapide et la moins souple." }],
              },
            ],
          },
        ],
        contractSigned: {
          text: "au début de la Bêta, avant que la configuration commence.",
        },
      },
      {
        id: "build-in-house-or-reuse",
        icon: Hammer,
        title: "Construire à l’interne, ou réutiliser ce que le gouvernement du Canada exploite déjà",
        sections: [
          {
            text: "Il n’y a aucun contrat de construction.",
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "C’est plus rare qu’il n’y paraît. Construire avec le personnel du ministère exige une capacité que la plupart des ministères n’ont pas.",
                bold: [{ phrase: "C’est plus rare qu’il n’y paraît." }],
              },
              {
                text: "Une construction livrée par une équipe à contrat, c’est « Acheter une Équipe ». Cette voie ne vise qu’une construction faite par le personnel du ministère.",
                bold: [
                  {
                    phrase: "Une construction livrée par une équipe à contrat, c’est « Acheter une Équipe ».",
                  },
                ],
              },
              {
                text: "Réutiliser signifie une plateforme que le gouvernement du Canada exploite déjà : il n’y a donc aucun contrat de construction. Quelque chose est quand même acheté : hébergement, licences et outillage pour une construction interne, et habituellement une équipe pour configurer l’une ou l’autre. Réutiliser la plateforme d’un autre ministère se met normalement en place par une entente de service interministérielle.",
                bold: [
                  {
                    phrase: "Réutiliser signifie une plateforme que le gouvernement du Canada exploite déjà",
                  },
                ],
              },
            ],
          },
        ],
        contractSigned: {
          text: "jamais. Il n’y a aucun contrat de construction.",
        },
      },
    ] satisfies BuyingRouteDraft[],
    combiningRoutes: {
      heading: "La plupart des services combinent plus d’une voie",
      intro: "",
      paragraphs: [
        {
          lead: "Une forme courante est un Produit fini plus une Équipe.",
          pillPhrase: "Produit fini plus une Équipe",
          body: {
            text: "Le ministère achète le produit pour le cœur du service, et achète une équipe pour le configurer, l’intégrer à ce que le ministère exploite déjà, et le garder fonctionnel. La réutilisation se comporte de la même façon : une plateforme du gouvernement du Canada ne coûte rien à réutiliser et exige quand même quelqu’un pour la configurer.",
          },
        },
        {
          lead: "Chaque contrat garde son propre calendrier.",
          body: {
            text: "Un ministère qui achète une Équipe et un Produit fini signe deux fois : une fois à la fin de la Découverte pour l’équipe, et une fois au début de la Bêta pour le produit.",
          },
        },
      ] satisfies CombiningRoutesParagraph[],
    },
    takeaway: {
      text: "La voie détermine le moment où le ministère signe, et la signature est le moment qui compte. Jusque-là, rien n’est engagé et le ministère peut encore demander ce dont il a besoin. Après, tout est une négociation avec un seul fournisseur.",
      bold: [
        {
          phrase:
            "La voie détermine le moment où le ministère signe, et la signature est le moment qui compte.",
        },
      ],
    } satisfies ThreadLinkedProse,
    closingNote: {
      heading: "Le concours se déroule dans la sous-phase qui précède la signature",
      body: {
        text: "Lisez le tableau une rangée à la fois et le même écart apparaît dans chaque voie : quelle que soit la sous-phase où se déroule le concours, la signature tombe au début de la suivante. La voie qu’un ministère choisit dès la Découverte choisit donc aussi le moment où il cesse de pouvoir changer d’avis à peu de frais. Cela mérite d’être décidé délibérément. Il est facile d’hériter de ce qui a été fait la dernière fois sans s’apercevoir qu’une décision a été prise.",
      },
    },
    closingNoteSecond: {
      text: "Autrement, les étapes ci-dessous se déroulent dans toutes ces voies. Dans « Acheter un Produit fini », elles se déroulent de façon comprimée, dans le cadre d’une offre à commandes ou d’un arrangement en matière d’approvisionnement existant plutôt que d’un appel d’offres ouvert.",
    },
  } satisfies ChoosingWhatToBuyContent,

  agileAppendix: {
    id: "appendix-agile-procurement",
    label: "ANNEXE A",
    heading: "Approvisionnement agile",
    intro: [
      {
        text: "Le développement agile fonctionne en construisant un peu, en le montrant à des gens, et en changeant le plan quand ils vous apprennent quelque chose que vous ne saviez pas. Puis la question arrive : comment cela fonctionne-t-il quand c’est un fournisseur qui construit? Un contrat fixe ce qui est livré et quand, et il est signé avant que quiconque ait appris grand-chose. Apprendre en chemin et être lié par un document rédigé d’avance semblent opposés.",
      },
      {
        text: "Il y a une réponse, et SPAC l’a mise par écrit. Le Guide de l’approvisionnement agile expose comment mener un achat qui s’attend à apprendre en chemin. Ce qui suit en est la version courte, limitée à ce qu’un responsable opérationnel doit savoir pour suivre la conversation. Si vous en menez un, le guide de SPAC lui-même vaut la lecture.",
        externalLinks: [
          { phrase: "Guide de l’approvisionnement agile", linkKey: "agile-procurement-guide" },
        ] satisfies ExternalPhraseLink[],
      },
    ] satisfies ThreadLinkedProse[],
    introNote: {
      text: "Deux choses au sujet du guide de SPAC méritent d’être connues avant de l’ouvrir. Il est rédigé pour les agents d’approvisionnement de SPAC plutôt que pour les ministères, et il précise lui-même qu’il est informatif et non prescriptif : les agents peuvent employer d’autres approches. Il décrit donc des formes qui ont fonctionné, non une méthode à suivre.",
    } satisfies ThreadLinkedProse,
    whatItIsHeading: "Ce que SPAC entend par approvisionnement agile",
    whatItIs: {
      text: "Sa définition repose sur quatre éléments, et aucun ne porte sur le logiciel :",
    },
    pillars: [
      {
        lead: "Des équipes interfonctionnelles.",
        body: "Des agents d’approvisionnement, le responsable opérationnel et son personnel technique, des représentants parmi les personnes qui utiliseront le service, et les spécialistes que l’achat exige.",
      },
      {
        lead: "Une mobilisation précoce et continue.",
        body: "Avec les fournisseurs, les utilisateurs finaux et les intervenants, commençant bien avant la rédaction d’une demande de soumissions plutôt qu’après l’achèvement de l’exigence.",
      },
      {
        lead: "Une approche souple.",
        body: "Des exigences qui peuvent évoluer, des modalités contractuelles rédigées pour cet achat plutôt que reprises d’un gabarit, et des mécanismes de changement de cap intégrés dès le départ.",
      },
      {
        lead: "Un processus itératif.",
        body: "Une progression par incréments, souvent par plusieurs contrats menés en parallèle ou en série plutôt qu’un seul gros.",
      },
    ],
    exampleHeading: "Comment cela se déroule en pratique",
    exampleIntro: {
      text: "Le portrait le plus clair en est l’exemple que SPAC développe, qui est un exemple et non une méthode prescrite. Il se déroule ainsi :",
    },
    exampleSteps: [
      {
        bold: "Une demande de soumissions paraît.",
        text: " Elle porte l’énoncé du problème, les résultats attendus, les critères selon lesquels les prototypes seront jugés, et les modalités de construction de la chose réelle par la suite. Tout cela doit y figurer d’emblée, parce que les critères appliqués après l’adjudication doivent avoir été dans la demande de soumissions.",
      },
      {
        bold: "Les fournisseurs soumissionnent sur papier.",
        text: " Des propositions écrites, non des prototypes. Dans l’exemple, neuf soumissions sont arrivées.",
      },
      {
        bold: "Plusieurs contrats de prototype sont adjugés en même temps,",
        text: " aux soumissionnaires les mieux classés. Chacun achète un prototype et comporte une option pour construire la chose réelle plus tard : personne n’est donc encore sous contrat pour livrer le service lui-même. Dans l’exemple, quatre des neuf soumissionnaires en ont obtenu un.",
      },
      {
        bold: "Chaque fournisseur construit un prototype au titre de son contrat,",
        text: " et les prototypes sont évalués au regard des critères qui figuraient dans la demande de soumissions. C’est là que se fait le vrai choix, et il se fait après la signature.",
      },
      {
        bold: "Le contrat du gagnant est modifié",
        text: " pour exercer une option de construction de la solution de production. Il n’y a ni deuxième concours ni deuxième contrat. Dans l’exemple, le premier choix n’a finalement pas satisfait aux exigences, et le Canada est passé au prototype suivant, parce que ces contrats étaient encore vivants.",
      },
    ],
    exampleClose: {
      text: "C’est une forme parmi plusieurs que décrit le guide. D’autres découpent le travail en étapes avec des points de décision entre elles, ou le libèrent tâche par tâche au titre des contrats avec autorisations de tâches, ou mènent une série de concours qui se chevauchent, un par partie du problème, chacun ouvert une fois que la partie précédente avait trouvé sa direction.",
      externalLinks: [
        { phrase: "autorisations de tâches", linkKey: "task-authorizations" },
      ] satisfies ExternalPhraseLink[],
    },
    earlierHeading: "Les prototypes peuvent aussi venir avant que quiconque soit sous contrat",
    earlierIntro: {
      text: "Dans cet exemple, personne ne construit quoi que ce soit avant la signature des contrats. Le guide permet aussi deux moments plus précoces :",
    },
    earlierItems: [
      {
        lead: "À la présélection.",
        body: "On peut demander à un fournisseur de faire la démonstration d’une solution potentielle, ou d’une partie de celle-ci, pour aider à déterminer quelles approches répondent conceptuellement au besoin avant la parution de la demande de soumissions.",
      },
      {
        lead: "À la demande de soumissions.",
        body: "On peut demander aux fournisseurs des démonstrations, des validations de principe, des prototypes ou des échantillons en plus de leurs propositions écrites, pour que le choix repose sur quelque chose de tangible.",
      },
    ],
    paysNote: {
      text: "Le moment détermine qui paie. Un prototype construit après l’adjudication est du travail payé au titre d’un contrat. Une démonstration demandée pendant un concours ne l’est pas, et en préparer une représente un coût réel pour chaque fournisseur qui y participe, y compris tous ceux qui perdront. Le conseil de SPAC lui-même est de rendre la participation valable et de ne pas brûler une bonne volonté dont vous aurez besoin plus tard.",
      bold: [{ phrase: "Le moment détermine qui paie." }],
    },
    comparisonHeading: "En quoi cela diffère de la façon traditionnelle",
    comparisonIntro:
      "Les deux formes diffèrent dans presque chaque partie du processus, et pas seulement quant au moment de la signature. Plus bas, le même programme acheté de chaque façon, avec ce que chacune vous procure et ce qu’elle coûte.",
    cautionsHeading: "Ce que cela vous coûte",
    cautions: [
      {
        lead: "Ce n’est pas une façon plus rapide d’acheter.",
        body: "SPAC le dit lui-même : la mobilisation supplémentaire prend du temps, et une stratégie itérative peut allonger l’ensemble de l’approvisionnement. Planifiez l’échéancier en partant du principe que ce ne sera pas plus rapide.",
      },
      {
        lead: "C’est exigeant en ressources.",
        body: "Cela exige des personnes dédiées, du ministère comme de l’approvisionnement, et une structure de gouvernance décidée pour cet achat. C’est une décision de la haute direction, non quelque chose qu’une équipe de projet peut adopter discrètement.",
      },
      {
        lead: "La souplesse doit être écrite d’avance.",
        body: "Les demandes de changement, les portes de sortie, la clause qui permet au Canada de passer au fournisseur suivant au classement, et les critères de choix ultérieur doivent tous figurer dans la demande de soumissions. Rien de cela ne peut être ajouté une fois le contrat signé, et c’est toute la raison pour laquelle la forme compte.",
      },
    ],
    worthItHeading: "Si c’est tant de travail, pourquoi le faire?",
    worthIt: [
      {
        lead: "Vous choisissez à partir de quelque chose de construit, non d’une promesse écrite.",
        body: "Les prototypes et les démonstrations vous montrent ce qu’un fournisseur peut réellement faire, ce qu’un document de proposition ne peut pas.",
      },
      {
        lead: "Un mauvais virage coûte un morceau plutôt que le programme.",
        body: "De plus petits contrats menés côte à côte font qu’un fournisseur incapable de livrer est remplacé plutôt que sauvé, et il n’y a pas de reprise catastrophique au bout de deux ans.",
      },
      {
        lead: "Le prix se précise à mesure que la conception se précise.",
        body: "Les coûts sont affinés pendant que le travail avance plutôt que devinés à l’étape de la proposition, moment où personne n’en sait encore assez pour bien deviner.",
      },
      {
        lead: "Les problèmes apparaissent pendant qu’ils sont encore peu coûteux.",
        body: "C’est le troc pour le temps supplémentaire : les retards que l’approvisionnement agile évite sont ceux causés par l’échec, c’est-à-dire les coûteux.",
      },
    ],
    partialNote: {
      text: "Vous n’êtes pas obligé de tout prendre. SPAC dit que la plupart des approvisionnements peuvent adopter certains éléments agiles, et mobiliser le marché tôt, ou garder l’énoncé des travaux de haut niveau, valent la peine en soi.",
      bold: [{ phrase: "Vous n’êtes pas obligé de tout prendre." }],
    } satisfies ThreadLinkedProse,
    close: {
      text: "L’ensemble de la forme convient à un achat où la solution est véritablement inconnue, où les options changent rapidement, ou où les besoins des gens risquent de bouger pendant que le travail avance. Là où la chose achetée est bien comprise, la voie ordinaire est la bonne.",
    } satisfies ThreadLinkedProse,
  },

  glossary: {
    id: "the-words",
    heading: "Glossaire de l’approvisionnement",
    intro:
      "L’approvisionnement a son propre vocabulaire, et l’essentiel n’est jamais expliqué à la personne dont le service est acheté. Voici les mots qu’un responsable opérationnel rencontre, dans l’ordre où ils ont tendance à apparaître.",
    columns: ["Word", "Quand cela se présente", "Ce que cela signifie"],
    terms: [
      {
        term: "Demande de renseignements",
        when: "Avant le concours",
        short: "RFI",
        text: "Une question posée au marché sans contrat au bout. Vous décrivez ce que vous cherchez à faire et demandez aux fournisseurs ce qui est possible. Personne n’est payé et personne n’est engagé.",
      },
      {
        term: "Examen et amélioration des exigences",
        when: "Avant le concours",
        short: "RRR",
        text: "La même idée, une étape plus loin : vous communiquez vos exigences provisoires et demandez aux fournisseurs de vous dire où elles sont floues ou impossibles à construire, avant l’ouverture du concours.",
      },
      {
        term: "Invitation à se qualifier",
        when: "Ouverture du concours",
        short: "ITQ",
        text: "Un premier tour qui présélectionne qui peut soumissionner, sur des éléments comme l’attestation de sécurité, la capacité et l’expérience pertinente. Ce n’est pas le concours lui-même.",
      },
      {
        term: "Demande de soumissions",
        when: "Le concours lui-même",
        text: 'L’ensemble de documents que le Canada publie pour inviter les fournisseurs à concourir. Il porte la demande de propositions, les instructions aux soumissionnaires, l’énoncé des travaux, les critères d’évaluation, et les conditions que le contrat éventuel retiendra. Les gens disent souvent « la demande de soumissions » en parlant du concours lui-même.',
      },
      {
        term: "Demande de propositions",
        when: "À l’intérieur de la demande de soumissions",
        short: "RFP",
        text: "Le document à l’intérieur de la demande de soumissions qui expose le problème et demande aux fournisseurs de proposer comment ils le résoudraient.",
      },
      {
        term: "Soumission",
        when: "Ce qui revient",
        text: "Une proposition qu’un fournisseur renvoie en réponse à la demande de soumissions. La plupart des soumissions sont perdantes.",
      },
      {
        term: "Énoncé des besoins",
        when: "Rédigé avant la parution de la demande de soumissions",
        short: "SOR",
        text: "Ce que le service doit accomplir, à qui il s’adresse, et à quel niveau il doit être performant, sans dire comment le construire.",
      },
      {
        term: "Énoncé des travaux",
        when: "Entre dans la demande de soumissions, annexé au contrat",
        short: "SOW",
        text: "La description des travaux achetés. Le Canada le rédige, il fait partie de la demande de soumissions, et il finit annexé au contrat, ce qui en fait la chose à laquelle le fournisseur est tenu. Dans un achat agile, il est gardé de haut niveau et affiné avec les commentaires des fournisseurs avant la parution de la demande de soumissions.",
      },
      {
        term: "Option",
        when: "Convenue à la signature, exercée plus tard",
        text: "Des travaux décrits et chiffrés au contrat à la signature, que le Canada peut ou non exercer plus tard. La construction qui suit un prototype est souvent une option, et c’est pourquoi l’exercer n’exige aucun nouveau concours.",
      },
      {
        term: "Modification",
        when: "À tout moment après la signature",
        text: "Une modification officielle d’un contrat signé, convenue par les deux parties. L’exercice d’une option se fait par modification. De même pour tout ce que vous avez omis de demander au départ, et c’est pourquoi une modification est habituellement chiffrée par le seul fournisseur dans la salle.",
      },
      {
        term: "Autorisation de tâches",
        when: "Pendant la durée du contrat",
        short: "TA",
        text: "Une façon de libérer le travail par morceaux au titre d’un contrat déjà signé. Chaque morceau est autorisé séparément, de sorte que le ministère peut cesser d’en émettre sans rien résilier.",
      },
      {
        term: "Porte de sortie",
        when: "Tout point où le travail peut s’arrêter",
        text: "Tout point où le Canada peut décider que les travaux ne vont pas plus loin : refuser d’exercer une option, cesser les autorisations de tâches, ou retenir les travaux à un point de contrôle.",
      },
    ],
    close:
      "Aucun de ces termes ne décrit un processus agile particulier. Ils sont la machinerie ordinaire des achats fédéraux, et connaître les noms représente l’essentiel de ce qu’il faut pour suivre une conversation sur votre propre service.",
  },

  journey: {
    intro: "Vous n’exécuterez peut-être pas tout vous-même, mais vous devriez reconnaître chaque étape.",
    steps: [
      {
        label: "Regarder",
        title: "Regarder avant d’acheter.",
        blocks: [
          {
            type: "p",
            text: "Avant de vous tourner vers un contrat, déterminez quel est le vrai problème et si l’achat en est la réponse. Deux questions règlent l’essentiel :",
          },
          {
            type: "ul",
            items: [
              "Possédez-vous déjà quelque chose qui le résout?",
              "Pourriez-vous plutôt réutiliser, adapter ou construire?",
            ],
          },
          {
            type: "p",
            text: "Les orientations gouvernementales sur l’approvisionnement commencent habituellement après la décision d’acheter : elles ne vous aideront donc pas ici. Déterminer s’il faut acheter est votre propre étape, et les règles se trouvent dans la Politique sur la planification et la gestion des investissements.",
          },
        ],
        externalLinks: [
          {
            phrase: "Politique sur la planification et la gestion des investissements",
            linkKey: "policy-planning-investments",
          },
        ],
        internalLinks: [{ phrase: "réutiliser, adapter ou construire", to: OPTIONS_ANALYSIS_PATH }],
      },
      {
        label: "Personnes",
        title: "Réunir les personnes qui mèneront l’achat.",
        blocks: [
          {
            type: "p",
            text: "Ce n’est pas la même chose qu’acheter une Équipe. Il s’agit des personnes à l’intérieur du gouvernement qui mènent l’achat :",
          },
          {
            type: "ul",
            items: [
              "vous, à titre de responsable opérationnel du service",
              "l’autorité contractante, qui mène l’achat",
              "les personnes qui utiliseront le service",
              "des experts en la matière, pour tout ce que le service touche",
            ],
          },
          {
            type: "p",
            text: "Acheter une Équipe signifie confier les travaux à un fournisseur par contrat, ce qui est une voie et non une étape. Un bon approvisionnement garde cette équipe interfonctionnelle dans la salle tout du long, plutôt que de céder l’achat.",
          },
        ],
      },
      {
        label: "Demander",
        title: "Dire le problème, non la solution.",
        blocks: [
          {
            type: "subheading",
            text: "Commencer par un énoncé du problème",
          },
          {
            type: "p",
            text: "Un énoncé du problème est une courte description de haut niveau du problème à résoudre, ou du but de l’ensemble de l’achat, et il évite délibérément de décrire ou de présumer une solution. L’exemple de SPAC pour un achat réel se lit : acquérir des solutions de repas individuels pour le personnel déployé des Forces armées canadiennes. Couvrez le quoi, le qui, le quand, le où et le pourquoi, et arrêtez-vous avant de nommer la réponse. Puis exposez deux autres choses :",
          },
          {
            type: "ul",
            items: ["les résultats que vous souhaitez", "le minimum dont vous avez besoin"],
          },
          {
            type: "p",
            text: "La raison de décrire le problème plutôt que la réponse, c’est que les fournisseurs font ce travail toute la journée. Devant le problème, l’un d’eux peut proposer quelque chose de mieux que ce que vous aviez en tête. Devant une spécification, ils construiront la spécification, y compris les parties qui se révéleront mauvaises.",
          },
          {
            type: "subheading",
            text: "Trois types d’exigences, et pourquoi la différence coûte de l’argent",
          },
          {
            type: "p",
            text: "L’énoncé du problème dit ce que vous voulez. Les exigences disent ce que cela doit faire, et elles se présentent en trois types. Le type d’une exigence détermine où elle va, et l’endroit où elle va détermine ce que coûtera son changement ultérieur. Changez-en une qui est encore dans un prototype et quelqu’un la redessine en un après-midi. Changez-en une inscrite dans un contrat signé et cela devient une modification, chiffrée par le seul fournisseur dans la salle.",
          },
          {
            type: "table",
            columns: ["Type", "Ce qu’elle couvre", "Où elle va"],
            rows: [
              {
                term: "Opérationnelles",
                cells: [
                  "Ce que le service doit accomplir, et pourquoi.",
                  "Dans le contrat, comme objectif et contexte de l’énoncé des travaux.",
                ],
              },
              {
                term: "Non fonctionnelles",
                cells: [
                  "À quel niveau il doit être performant, à quel point il doit être disponible, à quel point sécurisé.",
                  "Dans le contrat, comme niveaux de service. C’est aussi en fonction de cela que les soumissions sont cotées.",
                ],
              },
              {
                term: "Fonctionnelles",
                cells: [
                  "Comment un écran ou une étape en particulier devrait fonctionner.",
                  "Hors du contrat. Le prototype et la conception les portent, et elles changent dès que quelqu’un les teste.",
                ],
              },
            ],
          },
          {
            type: "p",
            text: "À un fournisseur tenu au besoin opérationnel et aux niveaux de service, on peut dire en cours de route qu’une page ne va pas, et la corriger fait partie du travail. Un fournisseur tenu à une conception de page convenue avant que quiconque l’ait testée construira cette conception, et chaque changement coûte une modification.",
          },
        ],
      },
      {
        label: "Stratégie",
        title: "Choisir la stratégie.",
        blocks: [
          {
            type: "p",
            text: 'C’est ici que la voie est choisie. Que le ministère achète une Équipe, une Solution ou un Produit fini, ou qu’il construise à l’interne, cela se règle ici, et cela règle tout ce qui vient ensuite (voir « Choisir quoi acheter » ci-dessus).',
          },
          {
            type: "p",
            text: "L’autre décision prise ici est la forme de l’achat : un seul gros contrat, ou plusieurs morceaux plus petits qui s’appuient les uns sur les autres. Pour le travail numérique, les morceaux plus petits sont la valeur par défaut recommandée, et il y a deux façons éprouvées de le faire :",
          },
          {
            type: "ul",
            items: [
              "des livraisons par étapes avec des points de décision, ou",
              "des contrats avec autorisations de tâches",
            ],
          },
          {
            type: "p",
            text: "« Traditionnel et agile » expose ce qui change entre les deux formes, et l’étude de cas juste en dessous montre le même programme acheté de chaque façon.",
          },
          {
            type: "p",
            text: "Une chose à clarifier : acheter par morceaux n’est pas du fractionnement de contrat. Le fractionnement consiste à découper les mêmes travaux pour passer sous un seuil ou éviter une approbation, et c’est contraire aux règles. Découper un gros achat en morceaux plus petits et bien circonscrits est quelque chose que SPAC recommande. La règle qui demeure en vigueur est que les contrats ne doivent pas être fractionnés pour éviter l’approbation que l’ensemble exigerait.",
          },
        ],
        anchorLinks: [
          { phrase: "Choisir quoi acheter", hash: "choosing-what-to-buy" },
          { phrase: "Traditionnel et agile", hash: "traditional-vs-agile" },
          { phrase: "l’étude de cas juste en dessous", hash: "case-study" },
        ],
      },
      {
        label: "Approuver",
        title: "Viser le bon niveau d’approbation, et faire le point au bon moment.",
        blocks: [
          {
            type: "p",
            text: "La plupart des services sont approuvés et financés à l’intérieur du ministère, et environ 95 % des projets ne montent jamais plus haut.",
          },
          {
            type: "subheading",
            text: "Deux choses déterminent jusqu’où monte l’approbation",
          },
          {
            type: "ul",
            items: [
              "La classe de capacité de gestion de projet approuvée du ministère, c’est-à-dire l’ampleur de projet que le ministère est autorisé à mener de son propre pouvoir.",
              "La cote du projet à l’Évaluation de la complexité et des risques des projets, c’est-à-dire l’ampleur de celui-ci.",
            ],
          },
          {
            type: "p",
            text: "Une cote à l’intérieur de la capacité du ministère et c’est la gouvernance du ministère qui l’approuve. Une cote au-dessus et le projet monte jusqu’au Comité d’examen de l’architecture intégrée du gouvernement du Canada et à une présentation au Conseil du Trésor. Dans les deux cas, une analyse de rentabilisation conceptuelle et le comité d’examen de l’architecture du ministère viennent d’abord.",
          },
          {
            type: "subheading",
            text: "Si vous êtes sur la voie du CEAI, commencez tôt",
          },
          {
            type: "p",
            text: "Soulevez-le à l’étape de la stratégie, pendant qu’il reste de la marge pour changer le plan. Il en va de même si l’achat est une série de contrats plus petits dont le total risque de dépasser ce que le ministère peut approuver : c’est le total qui compte, non les contrats individuels. La page Financement expose quelle voie emprunte un projet donné.",
          },
        ],
        internalLinks: [
          { phrase: "présentation au Conseil du Trésor", to: "/thread/funding" },
          { phrase: "Financement", to: "/thread/funding" },
        ],
      },
      {
        label: "Mobiliser",
        title: "Mobiliser l’industrie tôt, selon des règles claires.",
        blocks: [
          {
            type: "p",
            text: "Parler aux fournisseurs tôt affine votre exigence et éclaircit votre marché. Faites-le avec les règles du jeu écrites d’avance, pour que cela reste équitable pour tous.",
          },
          {
            type: "subheading",
            text: "Deux façons de poser une question à l’industrie sans rien acheter",
          },
          {
            type: "p",
            text: "Si vous voulez savoir si quelque chose est même faisable avant de vous engager à acheter, il y a deux façons nommées de le demander :",
          },
          {
            type: "ul",
            items: [
              "Une demande de renseignements, que le Guide des approvisionnements archivé définissait et que AchatsCanada porte maintenant.",
              "Un processus « Examen et amélioration des exigences », qui n’est officiellement défini nulle part mais qui est largement utilisé. Le Canada communique des versions provisoires de ses exigences et demande aux fournisseurs des commentaires pour les affiner avant la demande de soumissions.",
            ],
          },
          {
            type: "p",
            text: "Ni l’un ni l’autre ne se termine par un contrat, et vous pouvez en mener plusieurs de chaque. SPAC les décrit comme des vagues, et chaque vague porte sur quelque chose de plus arrêté que la précédente :",
          },
          {
            type: "ul",
            bold: [
              { phrase: "Vague 1." },
              { phrase: "Vague 2." },
              { phrase: "Vague 3." },
              { phrase: "Vague 4." },
            ],
            items: [
              "Vague 1. Réfléchir librement à l’énoncé du problème et aux résultats attendus, pendant que rien n’est encore écrit.",
              "Vague 2. Recueillir les commentaires du marché sur le minimum dont vous avez besoin.",
              "Vague 3. Puis sur l’ébauche d’énoncé des travaux et la grille d’évaluation.",
              "Vague 4. Puis sur l’ébauche de prix et le document de la demande de soumissions lui-même.",
            ],
          },
          {
            type: "p",
            text: "La mobilisation est facultative partout, sauf aux étapes officielles de présélection et de demande de soumissions.",
          },
          {
            type: "subheading",
            text: "Cela vous coûte du temps, et cela coûte de l’argent aux fournisseurs",
          },
          {
            type: "p",
            text: "Personne n’est payé pour tout cela. Pour le ministère, cela signifie du temps de personnel et des semaines au calendrier. Pour les fournisseurs qui répondent, cela signifie du vrai travail sans contrat au bout, et la plupart ne gagneront jamais rien. Le conseil de SPAC lui-même est de rendre la participation valable et de ne pas brûler une bonne volonté dont vous aurez besoin plus tard : menez donc autant de rondes que l’exigence en a véritablement besoin, et pas davantage.",
          },
          {
            type: "subheading",
            text: "Si les commentaires changent votre ébauche, retournez voir tout le monde",
          },
          {
            type: "p",
            text: "Si les commentaires des fournisseurs vous amènent à modifier des exigences provisoires ou des critères d’évaluation provisoires, retournez voir tous les fournisseurs avant de le faire, pour que personne ne paraisse avantagé.",
          },
        ],
      },
      {
        label: "Adjuger",
        title: "Solliciter, évaluer et adjuger.",
        blocks: [
          {
            type: "p",
            text: "Publiez la demande de soumissions, évaluez ce qui revient, et choisissez. Ce que l’approvisionnement agile ajoute ici, c’est que vous pouvez juger des choses réelles — prototypes, démonstrations, incréments éprouvés — plutôt qu’une promesse écrite seule.",
          },
        ],
      },
      {
        label: "Gérer",
        title: "Gérer le contrat.",
        blocks: [
          {
            type: "p",
            text: "La signature est la ligne de départ, non l’arrivée. Tenir le fournisseur à ce que le contrat a promis dure aussi longtemps que le service, et ce à quoi cela ressemble se trouve dans les phases Exploitation et Retrait.",
          },
          {
            type: "p",
            text: "Un contrat prend fin aussi, et la date d’expiration détermine le moment où le travail de remplacement doit commencer. Trois voies de sortie d’un contrat, et chacune exige des mois de préavis :",
            bold: [{ phrase: "la date d’expiration" }],
          },
          {
            type: "ul",
            items: [
              "Le remettre en concurrence. Un nouveau concours, selon les mêmes échéanciers que le premier.",
              "Exercer une option, lorsque le contrat signé en prévoit une.",
              "Prolonger avec le fournisseur actuel aux conditions actuelles, ce qui est la voie qui reste quand les deux autres sont amorcées trop tard.",
            ],
            bold: [
              { phrase: "Le remettre en concurrence." },
              { phrase: "Exercer une option" },
              { phrase: "Prolonger avec le fournisseur actuel" },
            ],
          },
          {
            type: "p",
            text: "La Maturité expose quand amorcer chacune d’elles, et ce qu’une prolongation d’urgence coûte au ministère.",
          },
        ],
        internalLinks: [
          { phrase: "Exploitation", to: "/live" },
          { phrase: "Retrait", to: "/sunset" },
          { phrase: "Maturité", to: "/live-maturity" },
        ],
      },
    ] satisfies ProcurementJourneyStepStrings[],
  },

  comparison: {
    rows: [
      {
        topic: "Exigences",
        traditional: "Fixées d’avance, puis envoyées au marché",
        agile: "Partir d’un problème et de vos besoins minimaux, affiner avec les fournisseurs",
      },
      {
        topic: "Forme de l’achat",
        traditional: "Un ou deux gros contrats",
        agile: "Plusieurs contrats plus petits, en série ou en parallèle",
      },
      {
        topic: "Dialogue avec l’industrie",
        traditional: "Par des documents officiels",
        agile: "Tôt et souvent, en ateliers et en séances de travail",
      },
      {
        topic: "Gestion du changement",
        traditional: "Stratégie pratiquement figée une fois approuvée",
        agile: "La stratégie évolue à mesure que vous apprenez",
      },
      {
        topic: "Moment de la planification",
        traditional: "Surtout au départ",
        agile: "Tout au long",
      },
      {
        topic: "Moment où vous savez que cela a fonctionné",
        traditional: "Après l’adjudication et la livraison",
        agile: "À chaque incrément en cours de route",
      },
    ] satisfies ComparisonRowStrings[],
    caption:
      "Ce que la forme agile achète, c’est de la confiance : les problèmes apparaissent tôt, pendant qu’ils sont encore peu coûteux à corriger, et comme le travail arrive en plus petits morceaux, sa valeur aussi. Ce n’est pas une façon plus rapide d’acheter, et l’annexe A expose ce qu’elle coûte. À noter aussi que traditionnel et agile décrivent la forme d’un achat, ce qui est une question différente de ce qui est acheté. Un ministère peut acheter une équipe de façon traditionnelle, ou un produit de façon agile.",
  },

  caseStudy: {
    title: "Le même programme, acheté de deux façons",
    risky: {
      heading: "La façon risquée",
      framing:
        "Acheter tout le programme comme un seul contrat, adjugé à un seul fournisseur, livré sur des années. C’est ainsi que l’essentiel des achats gouvernementaux s’est fait.",
      good: [
        {
          lead: "Simple à mettre en place et à mener.",
          body: "Un concours, un contrat, un fournisseur, une relation. Pour une petite équipe ayant peu de capacité en approvisionnement, cette simplicité vaut beaucoup.",
        },
        {
          lead: "La responsabilité est à un seul endroit.",
          body: "Quand quelque chose tourne mal, il y a un seul fournisseur pour en répondre et un seul contrat pour l’y tenir.",
        },
        {
          lead: "Moins de coordination.",
          body: "Vous n’assemblez pas le travail de plusieurs fournisseurs et ne veillez pas à ce que les morceaux s’ajustent aux jointures.",
        },
      ],
      bad: [
        {
          lead: "Le risque arrive entièrement à la fin.",
          body: "Vous dépensez des mois, souvent des années, avant de voir quoi que ce soit fonctionner, et vous n’apprenez qu’à ce moment-là si cela répond au besoin. Rendu là, l’argent est en grande partie dépensé.",
        },
        {
          lead: "Vous vous retrouvez verrouillé.",
          body: "Une fois le fournisseur bien engagé dans la construction, s’en éloigner est lent et coûteux : les ministères continuent donc de payer même quand le travail va mal.",
        },
        {
          lead: "Le changement coûte cher.",
          body: "Le contrat est rédigé autour du plan initial. Quand le besoin change, chaque ajustement devient une négociation.",
        },
        {
          lead: "Une seule défaillance peut couler tout le programme.",
          body: "Tout repose sur un seul fournisseur et une seule livraison : une seule mauvaise décision met donc le tout en péril.",
        },
      ],
    } satisfies CaseStudySide,
    safer: {
      heading: "La façon sûre",
      framing:
        "Découper le programme en contrats plus petits et bien circonscrits qui s’appuient les uns sur les autres, souvent auprès de plusieurs fournisseurs. C’est la valeur par défaut agile.",
      good: [
        {
          lead: "La valeur apparaît tôt.",
          body: "Chaque morceau livre quelque chose d’utilisable en quelques semaines ou quelques mois : le service commence donc à aider les gens plus tôt et vous apprenez de l’usage réel en cours de route.",
        },
        {
          lead: "Vous pouvez corriger le tir.",
          body: "Un fournisseur faible ou un mauvais virage vous coûte un petit morceau remplaçable, plutôt que tout le programme.",
        },
        {
          lead: "Le changement coûte moins cher.",
          body: "Le morceau suivant absorbe le nouveau besoin : le travail plie donc avec la réalité.",
        },
        {
          lead: "Le risque est réparti.",
          body: "Aucune livraison ni aucun fournisseur ne peut faire tomber l’ensemble.",
        },
        {
          lead: "Plus de fournisseurs peuvent concourir.",
          body: "De plus petits morceaux permettent à des entreprises plus petites et plus spécialisées de soumissionner, ce qui élargit le champ et peut faire baisser le coût.",
        },
      ],
      bad: [
        {
          lead: "Plus de coordination vous revient.",
          body: "Plusieurs contrats et fournisseurs signifient plus de relations à gérer et plus de jointures à garder alignées.",
        },
        {
          lead: "Garder les morceaux petits exige de la discipline.",
          body: 'Un morceau « petit » redevient un monolithe si personne ne tient la ligne.',
        },
        {
          lead: "Cela exige plus d’attention en approvisionnement au départ.",
          body: "Concevoir les morceaux et la façon dont ils s’emboîtent est un vrai travail, et la capacité interne pour le faire est souvent mince.",
        },
        {
          lead: "L’intégration devient votre problème.",
          body: "Quand différents fournisseurs construisent différentes parties, les faire fonctionner ensemble retombe de votre côté.",
        },
      ],
    } satisfies CaseStudySide,
  },

  goodLooksIntro: "Une poignée d’éléments, que vous pouvez tous vérifier. Chacun a sa propre page.",

  whyItMatters: [
    "Le contrat décide de l’avenir de votre service. Ce qu’il coûte sur sa durée de vie. La possibilité de le modifier. La possibilité de s’en éloigner un jour. L’essentiel se règle le jour de la signature, et le défaire ensuite est lent et coûteux.",
    "Un bon achat vous laisse vos options ouvertes. Un mauvais les referme avec le temps, aussi longtemps que le service fonctionne, souvent sans que personne s’en aperçoive avant qu’il soit trop tard.",
    'Acheter à la manière agile réduit le pire risque de tous : l’effort de deux ans qui se termine par « on recommence ». Quand vous pouvez corriger le cap en chemin, vous n’êtes jamais loin d’un terrain solide.',
  ],

  whoseJob: {
    text: 'Celle de votre ministère. Vous pouvez confier la construction à un fournisseur, mais la responsabilité reste la vôtre, et si le service laisse quelqu’un tomber, « l’entrepreneur l’a fait » n’est une réponse que personne n’acceptera. La Directive sur la gestion de l’approvisionnement du Conseil du Trésor dit la même chose en termes de politique.',
    externalLinks: [
      {
        phrase: "Directive sur la gestion de l’approvisionnement du Conseil du Trésor",
        linkKey: "directive-procurement",
      },
    ],
  } satisfies LinkedProseStrings,

  whoseJobSplit: {
    intro: "Quatre parties, et le partage entre elles tient pour tout l’achat :",
    roles: [
      {
        who: "Votre ministère",
        does: "Le responsable opérationnel. Comptable de la décision et des résultats, de la première idée au dernier jour d’exploitation du service.",
      },
      {
        who: "L’autorité contractante",
        does: "Un spécialiste de l’approvisionnement qui mène l’achat lui-même : la demande de soumissions, l’évaluation, l’adjudication, et les modifications par la suite.",
      },
      {
        who: "TBS",
        does: "Établit l’orientation et les normes intégrées, et examine l’architecture par le comité d’examen de l’architecture intégrée.",
      },
      {
        who: "PSPC",
        does: "Exploite les services communs d’approvisionnement et les outils intégrés que les ministères achètent par leur entremise.",
      },
    ],
    // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Roles and Responsibilities — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
    close: "Les orientations du SCT sur la migration GCcase exposent le même partage.",
    placeholderLinks: [
      {
        phrase: "Les orientations du SCT sur la migration GCcase",
        source: GCCASE_MIGRATION_READINESS_GUIDE,
        part: "Rôles et responsabilités",
      },
    ],
  },

  goodContractCallout: {
    label: "UN BON CONTRAT",
    title: "À quoi ressemble un bon contrat",
    paragraphs: [
      "Quand un fournisseur construit ou exploite votre service, le contrat est l’endroit où vit chaque promesse : ce qu’il doit livrer, comment vous verrez le travail se faire, et si vous pourrez un jour partir.",
      "Nous avons rédigé un court exemple de contrat réaliste pour le portail de subventions, avec chaque clause que le reste du guide vous dit d’y mettre.",
    ],
    linkLabel: "Voir à quoi ressemble un bon contrat →",
    href: GOOD_CONTRACT_PATH,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble l’approvisionnement à chaque phase",
    intro:
      "L’approvisionnement traverse toute la vie d’un service, mais il pèse plus lourd à certaines étapes qu’à d’autres.",
    blocks: [
      {
        title: "Create.",
        preview: "C’est ici que l’approvisionnement pèse le plus lourd.",
        popup: [
          {
            text: "C’est ici que l’approvisionnement pèse le plus lourd.",
            bold: [{ phrase: "C’est ici que l’approvisionnement pèse le plus lourd." }],
          },
          {
            text: "Vous déterminez le vrai problème, choisissez entre réutiliser et acheter, arrêtez la stratégie, allez au marché, et adjugez le contrat.",
          },
          {
            text: "Presque chaque décision qui liera le service pendant des années se prend ici : il vaut donc la peine de ralentir pour bien faire.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "L’achat s’est arrêté, mais pas le travail.",
        popup: [
          {
            text: "L’achat s’est arrêté, mais pas le travail.",
            bold: [{ phrase: "L’achat s’est arrêté, mais pas le travail." }],
          },
          {
            text: "Vous tenez le fournisseur à ce que le contrat a promis, et vous surveillez les niveaux de service et la relation pour déceler toute dérive.",
          },
          {
            text: "Continuez aussi d’améliorer le service, pour qu’il ne vieillisse pas vers un remplacement forcé, et commencez à préparer le prochain contrat bien avant la fin de celui-ci.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Partir prend plus de temps qu’on ne le pense.",
        popup: [
          {
            text: "Partir prend plus de temps qu’on ne le pense.",
            bold: [{ phrase: "Partir prend plus de temps qu’on ne le pense." }],
          },
          {
            text: "Planifiez la remise en concurrence ou le retrait bien avant la fin du contrat, parce que le passage lui-même prend du temps réel.",
          },
          {
            text: "Les données doivent être transférées, la connaissance doit être transmise, et ce que vous avez acheté est retiré ou remplacé.",
          },
        ],
      },
    ],
  } satisfies ThreadByPhaseContent,

  furtherReading: {
    text: "Ce fil relève de la Directive sur la gestion de l’approvisionnement du Conseil du Trésor, qui adopte une vision de l’achat axée sur les résultats et sur le cycle de vie. Son compagnon interne le plus proche est le Guide de l’approvisionnement agile de SPAC, sur le réseau du GC, sur lequel ce fil s’appuie pour les schémas agiles. Il puise aussi dans le guide de Boots et Clarke sur la réforme de l’approvisionnement en TI au Canada, le Service Manual du Royaume-Uni, et le guide ouvert d’approvisionnement agile de Skylight, le tout transposé aux règles canadiennes.",
    externalLinks: [
      {
        phrase: "Directive sur la gestion de l’approvisionnement du Conseil du Trésor",
        linkKey: "directive-procurement",
      },
      {
        phrase: "Guide de l’approvisionnement agile de SPAC",
        linkKey: "agile-procurement-guide",
      },
    ],
  } satisfies LinkedProseStrings,
};
