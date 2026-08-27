import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PROCUREMENT_LANDING_PATH } from "@/lib/procurement-landing";
import {
  GCCASE_MIGRATION_READINESS_GUIDE,
  gccaseComingSoonSourceItem,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";

export const OPTIONS_ANALYSIS = {
  title: "Analyse des options",

  intro: [
    "L’analyse des options est l’étape où vous déterminez les différentes façons de répondre à un besoin, et où vous les pesez, avant de vous engager envers l’une d’elles. Elle se fait tôt, avant que quoi que ce soit ait été acheté ou construit, et elle s’applique que vous résolviez un nouveau problème ou que vous remplaciez un service qui arrive à son terme.",
    "Pourquoi la faire? Parce que l’instinct est de sauter directement à une solution, habituellement celle qu’on a déjà en tête, et c’est ainsi que des ministères finissent par acheter quelque chose dont ils n’avaient pas besoin, ou une moins bonne réponse que celle qu’ils auraient pu avoir. La valeur de cette étape, c’est la pause : nommez clairement le problème, puis regardez les vraies options d’un œil clair avant d’en choisir une. Un après-midi ici peut épargner un approvisionnement de deux ans.",
  ],

  startWithProblem: {
    id: "start-with-the-problem",
    title: "Commencer par le problème",
    paragraphs: [
      "Avant de comparer des options, assurez-vous de savoir ce que vous résolvez. Nommez le problème et les résultats dont vous avez besoin, et séparez le besoin opérationnel des fonctionnalités de ce que vous avez maintenant. Un besoin clair est ce à quoi chaque option est mesurée, et il vous empêche de reconstruire les bizarreries d’un vieil outil dans un nouveau.",
      "Les orientations du SCT sur la migration GCcase le disent de la même façon : distinguez les besoins opérationnels des fonctionnalités du système, pour ne pas recréer par défaut une solution patrimoniale.",
    ],
    // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Step 2, Business Requirements Discovery Workbook — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
    placeholderParagraphLinks: [
      {
        index: 1,
        phrase: "Les orientations du SCT sur la migration GCcase",
        source: GCCASE_MIGRATION_READINESS_GUIDE,
        part: "Étape 2, Cahier de découverte des exigences opérationnelles",
      },
    ],
  },

  fieldOfOptions: {
    id: "the-field-of-options",
    title: "L’éventail des options",
    intro:
      "La réponse pourrait ne pas être un achat du tout. Parfois un petit changement de processus, ou un outil qu’une autre équipe exploite déjà, résout le problème sans rien acheter. Voici les options, grosso modo de la moins coûteuse à la plus coûteuse :",
    ladder: [
      {
        lead: "Utilisez ce que vous avez déjà.",
        body: "Possédez-vous un outil qui fait déjà cela, ou presque? La solution la moins coûteuse est celle que vous n’avez pas à acheter.",
      },
      {
        lead: "Réutilisez ou adaptez ce que quelqu’un d’autre exploite.",
        body: "Une autre équipe, un autre ministère ou une plateforme pangouvernementale résout peut-être déjà votre problème. Vous pourriez utiliser quelque chose d’inutilisé chez quelqu’un d’autre, ou profiter d’un contrat intégré existant pour obtenir la même chose à moindre coût, puisque l’achat en volume coûte moins cher à l’unité. Emprunter vaut mieux qu’acheter.",
      },
      {
        lead: "Faites équipe avec un autre ministère.",
        body: "Si quelqu’un d’autre a besoin de la même chose, construisez-la ou achetez-la ensemble pour que le problème soit résolu une seule fois pour vous deux. Si la chose n’existe pas encore, informez-vous avant de monter votre propre achat.",
      },
      {
        lead: "Résolvez-le autrement.",
        body: "Parfois la réponse n’est pas du logiciel du tout. Un changement de processus, une correction de politique ou une petite étape manuelle peut rendre tout l’achat inutile.",
      },
      {
        lead: "Achetez du neuf.",
        body: "Si rien de ce qui précède ne convient, vous acquérez une solution, par un cadre existant ou par votre propre approvisionnement. Et vous pouvez expliquer pourquoi quand on vous le demande.",
      },
      {
        lead: "Construisez-le.",
        body: "Rarement avec le personnel du ministère, parce que la capacité interne de construire et d’exploiter du logiciel est mince dans la plupart des ministères. Cela veut presque toujours dire engager une équipe à contrat pour le construire, ce qui reste un approvisionnement. Construire est une vraie option, mais elle laisse au ministère le plus à porter, et le plus longtemps : traitez-la donc comme un choix délibéré plutôt que comme un défaut.",
        internalLinks: [{ phrase: "engager une équipe à contrat", to: "/thread/procurement" }],
      },
      {
        lead: "Mettez hors service sans remplacer.",
        body: "Si le besoin a véritablement disparu, la bonne option peut être d’arrêter. Celle-ci se présente surtout au Retrait.",
      },
    ],
  },

  howToWeigh: {
    id: "how-to-weigh-them",
    title: "Comment les peser",
    intro:
      "Aucune option n’est la meilleure dans l’abstrait. La bonne dépend de votre situation. Quelques éléments à peser pour chacune :",
    criteria: [
      { lead: "Dans combien de temps vous en avez besoin", body: "et combien de temps chaque parcours prend à mettre en place." },
      {
        lead: "S’il faut un approvisionnement",
        body: "et combien de temps il dure. Pour une solution infonuagique, cela peut aller de 12 à 24 mois du début à l’adjudication du contrat, selon la valeur et la complexité.",
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Migration Decision Checklist; Risks of Delayed Planning — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "de 12 à 24 mois",
            source: GCCASE_MIGRATION_READINESS_GUIDE,
            part: "Liste de vérification des décisions de migration; Risques d’une planification tardive",
          },
        ] satisfies PlaceholderPhraseLink[],
      },
      {
        lead: "Le degré de complexité de votre service",
        body: "et si l’option correspond à cette complexité.",
      },
      {
        lead: "Intégrations et dépendances",
        body: "qui sont faciles à sous-estimer et qui déterminent souvent l’effort.",
      },
      {
        lead: "L’ampleur de la personnalisation nécessaire",
        body: "et si elle en vaut la peine.",
      },
      {
        lead: "Le coût sur toute sa durée de vie",
        body: "et pas seulement pour la mise en place.",
      },
      {
        lead: "Qui le soutient et l’entretient",
        body: "une fois en fonction.",
      },
      {
        lead: "La marge de croissance",
        body: "et dans quelle mesure l’option correspond à la direction que vous prenez.",
      },
    ],
  },

  // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Migration Decision Checklist; Risks of Delayed Planning — REPLACE WITH REAL LINK (AND ANCHOR IF AVAILABLE) WHEN PUBLISHED
  howToWeighClosing:
    "Les orientations du SCT sur la migration GCcase comprennent une liste de vérification structurée qui compare les principales options selon des critères comme ceux-ci. C’est l’outil approfondi quand vous êtes prêt à les coter.",
  howToWeighClosingPlaceholderLinks: [
    {
      phrase: "une liste de vérification structurée",
      source: GCCASE_MIGRATION_READINESS_GUIDE,
      part: "Liste de vérification des décisions de migration; Risques d’une planification tardive",
    },
  ] satisfies PlaceholderPhraseLink[],

  homework: {
    id: "do-the-homework-first",
    title: "Faites d’abord vos devoirs",
    paragraphs: [
      {
        text:
          "Vous n’êtes presque jamais le premier à affronter cela. Avant de vous engager, regardez comment d’autres ministères ont résolu le même problème et ce que cela leur a coûté. Un bon point de départ est le rayon du gouvernement du Canada lui-même. Le dépôt des architectures de référence du GC contient des conceptions de départ approuvées pour des types de systèmes courants, dont la gestion des cas et les subventions et contributions, pour qu’une équipe parte d’un modèle éprouvé plutôt que d’une page blanche. Un catalogue provisoire des solutions intégrées énumère ce que d’autres équipes exploitent déjà. Les deux se trouvent sur le réseau du gouvernement du Canada.",
        externalLinks: [
          { phrase: "Le dépôt des architectures de référence du GC", linkKey: "gc-reference-architectures" },
          { phrase: "catalogue provisoire des solutions intégrées", linkKey: "gc-enterprise-solutions-catalog" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text:
          "D’autres gouvernements ont déjà résolu des versions de ce problème, et beaucoup publient comment : vous pouvez donc reprendre une approche éprouvée au lieu de la reconstruire. La norme de réutilisation de l’Australie et le Technology Code of Practice du Royaume-Uni transforment « vérifiez la réutilisation avant de dépenser » en une liste de vérification concrète que vous pouvez suivre, et les orientations du Royaume-Uni sur le partage et la réutilisation des technologies montrent les plateformes et composants communs que leurs équipes réutilisent. Emprunter une réponse éprouvée vaut mieux que partir d’une page blanche.",
        externalLinks: [
          { phrase: "La norme de réutilisation de l’Australie", linkKey: "australia-digital-architecture-reuse" },
          { phrase: "Technology Code of Practice", linkKey: "uk-technology-code-of-practice" },
          {
            phrase: "le partage et la réutilisation des technologies",
            linkKey: "uk-share-and-reuse-technology",
          },
        ] satisfies ExternalPhraseLink[],
      },
    ],
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble l’analyse des options à chaque phase",
    cards: [
      {
        lifecyclePhase: "create" as const,
        weight: "light" as const,
        compact: true,
        body: 'En Création, c’est votre étape « regarder avant d’acheter », faite avant qu’un contrat existe.',
        linkTo: PROCUREMENT_LANDING_PATH,
        linkLabel: "Fil de l’approvisionnement",
      },
      {
        lifecyclePhase: "sunset" as const,
        weight: "light" as const,
        compact: true,
        body: "Au Retrait, c’est ainsi que vous évaluez les options de remplacement, ou que vous arrivez à la décision de mettre hors service sans remplacer.",
        linkTo: "/sunset",
        linkLabel: "Phase Retrait",
      },
    ],
  },

  whyThisMatters: {
    id: "why-this-matters",
    title: "Pourquoi cela compte",
    body: "Les orientations d’approvisionnement de SPAC commencent après la décision d’acheter. Cette étape-ci vous revient, et c’est elle qui détermine où atterrissent les plus grandes économies et les plus grands regrets.",
    externalLinks: [
      { phrase: "Les orientations d’approvisionnement de SPAC", linkKey: "agile-procurement-guide" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Instrument directeur",
      linkKey: "policy-planning-investments" satisfies ExternalLinkKey,
    },
    {
      label: "Référence complémentaire",
      linkKey: "buyers-portal" satisfies ExternalLinkKey,
    },
    {
      label: "Référence complémentaire",
      linkKey: "agile-procurement-guide" satisfies ExternalLinkKey,
    },
    {
      label: "Référence complémentaire (réseau du GC)",
      linkKey: "gc-reference-architectures" satisfies ExternalLinkKey,
    },
    {
      label: "Référence complémentaire (réseau du GC)",
      linkKey: "gc-enterprise-solutions-catalog" satisfies ExternalLinkKey,
      note: "Catalogue provisoire; l’URL peut changer.",
    },
    gccaseComingSoonSourceItem(),
  ] satisfies SourceItem[],
};
