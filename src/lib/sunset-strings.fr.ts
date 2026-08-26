import type { CautionItem } from "@/components/CautionBlock";
import type { PhaseQuoteContent } from "@/components/PhaseQuote";
import type { BoldPhrase, ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import { PROCUREMENT_LANDING_PATH } from "@/lib/procurement-landing";
import { OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
import {
  EOL_OF_PARTS_SOURCE,
  GCCASE_MIGRATION_READINESS_GUIDE,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";

export type SunsetJourneyStepExample = {
  title: string;
  left: { heading: string; body: string };
  right: { heading: string; body: string };
  caption: string;
};

export type SunsetJourneyStepStrings = {
  label: string;
  title: string;
  leadIn: string;
  body: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: { phrase: string; to: string }[];
  placeholderLinks?: PlaceholderPhraseLink[];
  boldPhrases?: BoldPhrase[];
  example?: SunsetJourneyStepExample;
  /** Hidden on the retire path (step 4 Buy or build). */
  replaceOnly?: boolean;
};

const GCCASE = GCCASE_MIGRATION_READINESS_GUIDE;

/** Sunset phase landing copy — organized by page section. */
export const SUNSET_STRINGS = {
  quote: {
    lead: "Là où un service arrive à son terme et est mis hors service ou remplacé proprement. L’équipe :",
    leadBold: [{ phrase: "mis hors service ou remplacé" }],
    items: [
      "planifie la fermeture",
      "transfère ou archive les données",
      "amène les utilisateurs en toute sécurité vers ce qui suit",
    ],
    takeaway:
      "Au gouvernement du Canada, ni le remplacement ni la fermeture d’un service ne sont très courants, faute d’un engagement complet dans le cycle de vie numérique.",
    takeawayBold: false,
  } satisfies PhaseQuoteContent,

  intro: [
    {
      text: "Le Retrait, c’est l’histoire vue du côté de l’ancien service. Être remplacé reste une fin : le service dont vous êtes responsable est mis hors service, ses données et ses utilisateurs vont vers un endroit sûr, et ce qui prend le relais est un nouveau service avec sa propre Création.",
      bold: [{ phrase: "l’histoire vue du côté de l’ancien service" }],
    },
    {
      text: "Le Retrait se déroule souvent en parallèle avec la Création : pendant qu’un remplacement est acheté ou construit, le service qui se retire doit continuer de fonctionner. L’équipe planifie la sortie, la finance, et fait traverser le changement aux utilisateurs et aux documents sans laisser personne en plan.",
      bold: [{ phrase: "se déroule souvent en parallèle avec la Création" }],
    },
    {
      text: "Une transition, c’est plus qu’une migration technique. C’est le moment de réexaminer le processus, d’abandonner la dette technique accumulée, d’améliorer les données, et de reconfirmer à quoi sert vraiment le service, pour que la suite fasse mieux que l’ancien.",
      bold: [{ phrase: "plus qu’une migration technique" }],
    },
  ],

  scope: {
    text: "Cette page porte sur le retrait d’un service entier. S’il s’agit d’une seule partie qui arrive en fin de vie, une bibliothèque, une dépendance ou un produit acheté à l’intérieur d’un service plus vaste, voir Fin de vie des composants.",
    placeholderLinks: [{ phrase: "Fin de vie des composants", source: EOL_OF_PARTS_SOURCE }],
  },

  signals: {
    title: "Ce qui envoie un service au Retrait",
    intro: "Aucun de ces éléments ne devrait surprendre : les repérer tôt fait partie de l’exploitation du service, et la Maturité explique comment. Le Retrait commence quand l’un ou plusieurs de ces éléments sont vrais :",
    bullets: [
      {
        lead: "Le besoin a disparu, ou il est servi ailleurs.",
        body: "La politique derrière le service change, ou un autre service absorbe ce que celui-ci faisait.",
      },
      {
        lead: "Les utilisateurs s’en vont.",
        body: "La base rétrécit jusqu’à ce que le coût d’exploitation du service ne corresponde plus au nombre de personnes qu’il sert.",
      },
      {
        lead: "La technologie perd son soutien.",
        body: "Une plateforme ou un produit sur lequel repose le service met fin à son soutien, et le remplacer coûterait autant que de repartir à neuf.",
      },
      {
        lead: "Le service n’arrive plus à suivre.",
        body: "Les changements coûtent plus cher et prennent plus de temps chaque année, et l’arriéré de besoins croît plus vite que l’ancienne plateforme ne peut l’absorber.",
      },
    ],
  },

  fork: {
    title: "La première décision : remplacer ou mettre hors service ?",
    intro: "Avant tout, répondez à une question : le service est-il encore nécessaire ?",
    bullets: [
      {
        lead: "Le besoin a disparu : vous le mettez hors service.",
        body: "Vous planifiez tout de même la fermeture, vous archivez les documents et vous démantelez, mais vous ne mettez pas en place de remplacement.",
      },
      {
        lead: "Le besoin demeure : vous le remplacerez.",
        body: "Vous entamerez une nouvelle phase de Création.",
      },
    ],
    close:
      "L’essentiel de cette page suit le chemin du remplacement, le plus long des deux. Le chemin de la mise hors service est le même parcours, sans le milieu.",
    cardTitle: "Remplacer ou mettre hors service ?",
    pathOptions: [
      {
        path: "replace" as const,
        description:
          "Le besoin demeure : vous le remplacerez. Vous entamerez une nouvelle phase de Création.",
      },
      {
        path: "retire" as const,
        description:
          "Le besoin a disparu : vous le mettez hors service. Vous planifiez la fermeture, vous archivez les documents et vous démantelez, mais vous ne mettez pas en place de remplacement.",
      },
    ],
  },

  journey: {
    intro: "Vous n’exécuterez peut-être pas tout vous-même, mais vous devriez reconnaître chaque étape. Pour un remplacement, les étapes du milieu ne sont pas des inventions nouvelles : ce sont la Création du nouveau service, vue du côté de l’ancien. Décider est sa Découverte, Planifier est sa réflexion Alpha, et Acheter ou construire est sa Bêta.",
    footer:
      "Ces étapes sont présentées dans l’ordre, mais en pratique elles se chevauchent et certaines se répètent. Pendant que vous acquérez la nouvelle solution et y migrez, vous fermez encore l’ancienne : les étapes quatre et cinq se déroulent donc ensemble. Vous sortez du Retrait quand l’ancien service est complètement fermé et que ses données et ses utilisateurs ont un foyer sûr. Si vous l’avez remplacé, ce nouveau service a déjà commencé sa propre Création.",
    steps: [
      {
        label: "Évaluer",
        title: "Évaluer : faire l’inventaire de l’ancien service.",
        leadIn: "Dressez un portrait clair de ce que vous avez.",
        body: "Dressez un portrait clair de ce que vous avez avant de changer quoi que ce soit. Faites l’inventaire du service : ce qu’il fait, qui l’utilise et comment, ce à quoi il se connecte, ce qu’il coûte à exploiter, quelles données il détient, et à quel point il est essentiel. Posez ensuite la question plus difficile pour chaque application : est-elle encore nécessaire ? Certaines valent la peine d’être conservées et transférées, d’autres peuvent être mises hors service purement et simplement. Nommez les risques d’y toucher, en particulier tout ce qui perturberait les utilisateurs en plein cycle.",
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Step 1, Application Inventory Template — REPLACE WITH REAL LINK WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "inventaire",
            source: GCCASE,
            part: "Étape 1, Modèle d’inventaire des applications",
          },
        ],
      },
      {
        label: "Décider",
        title: "Décider : ce qui vient ensuite, et comment.",
        leadIn: "Déterminez ce dont vous avez besoin pour la suite, et comment l’obtenir.",
        body: "Déterminez ce dont vous avez réellement besoin pour la suite, et comment l’obtenir. Le piège est de recréer l’ancien service fonctionnalité par fonctionnalité. Séparez le besoin opérationnel des fonctionnalités actuelles, pour reporter ce qui crée de la valeur et abandonner ce qui n’existe qu’à cause des limites de l’ancienne plateforme. Jugez la complexité réelle du remplacement, cartographiez les intégrations (elles sont systématiquement sous-estimées), puis faites l’analyse des options. Pour un remplacement, cette étape est sa Découverte : comprendre le besoin avant de nommer la solution.",
        internalLinks: [{ phrase: "faites l’analyse des options", to: OPTIONS_ANALYSIS_PATH }],
        boldPhrases: [{ phrase: "Séparez le besoin opérationnel des fonctionnalités actuelles" }],
        example: {
          title: "Écrire le besoin, pas la fonctionnalité",
          left: {
            heading: "Le besoin",
            body: "Un organisme sans but lucratif demande du financement en ligne, un agent évalue la demande selon les critères publiés, et le demandeur reçoit une décision motivée dans le délai de service de 40 jours.",
          },
          right: {
            heading: "L’ancienne fonctionnalité",
            body: "Le formulaire d’accueil à 47 champs, l’acheminement d’approbation à trois onglets et les indicateurs d’état par code de couleur, reconstruits exactement comme dans l’ancien outil.",
          },
          caption:
            "Les fonctionnalités ne sont que la façon dont l’ancien outil répondait au besoin. Le nouveau peut y répondre mieux.",
        },
      },
      {
        label: "Plan",
        title: "Planifier : aligner les personnes, l’argent et le calendrier.",
        leadIn: "Transformez la décision en plan.",
        body: "Transformez la décision en un plan qui aligne les personnes, l’argent et le calendrier. Faites intervenir tôt les bonnes personnes : les utilisateurs qui vivent dans le service, la gestion de l’information pour la conservation des documents, la TI et la sécurité, et qui détient le budget et les approbations. Rédigez l’analyse de rentabilisation, planifiez le changement pour les utilisateurs (l’adoption fait ou défait une migration), précisez qui est responsable de quoi, et définissez à quoi ressemble le succès et comment vous le mesurerez. Pour un remplacement, c’est sa réflexion Alpha : le comment se travaille pendant qu’il est encore peu coûteux de changer de cap.",
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Step 3, Business Case and Roles and Responsibilities — REPLACE WITH REAL LINK WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "l’analyse de rentabilisation",
            source: GCCASE,
            part: "Étape 3, Analyse de rentabilisation et rôles et responsabilités",
          },
        ],
      },
      {
        label: "Buy/build",
        title: "Acheter ou construire : mettre en place la nouvelle solution.",
        leadIn: "Obtenez et préparez la nouvelle solution, en l’achetant ou en la construisant.",
        body: "Si vous achetez, menez le processus d’approvisionnement. Si vous construisez avec une équipe à contrat, mettez cette équipe en place et faites le travail de développement. Si vous construisez à l’interne, mettez en place l’équipe du ministère. Dans tous les cas, configurez la solution selon les exigences issues de l’étape Décider, choisissez votre approche de migration (d’un seul coup, ou par étapes avec des projets pilotes), nettoyez les données avant de les transférer, et formez les gens. L’achat peut prendre de 12 à 24 mois rien que pour l’approvisionnement : commencer tôt compte donc. Pour un remplacement, c’est sa Bêta : la vraie solution est mise en place et validée.",
        replaceOnly: true,
        internalLinks: [{ phrase: "le processus d’approvisionnement", to: PROCUREMENT_LANDING_PATH }],
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Risks of Delayed Planning — REPLACE WITH REAL LINK WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "de 12 à 24 mois",
            source: GCCASE,
            part: "Risques d’une planification tardive",
          },
        ],
      },
      {
        label: "Migrer",
        title: "Migrer : faire passer les données et les utilisateurs.",
        leadIn: "Faites le passage et fermez l’ancien.",
        body: "Faites le passage et fermez l’ancien. Transférez les données, archivez les documents historiques selon leur calendrier de conservation, et faites passer les utilisateurs.\\n\\nNe fermez pas l’ancien service trop tôt. Il continue de fonctionner pendant la bêta du nouveau service, pendant le lancement et pendant la Stabilisation, pour que quiconque n’a pas encore migré puisse toujours obtenir ce dont il a besoin. L’ancien service est démantelé au début de la Croissance du nouveau service, une fois que celui-ci a porté un volume réel et tenu.\\n\\nUne migration ne réussit que si les gens adoptent le remplacement, et c’est à cela que sert la gestion du changement. Une migration est aussi une occasion de simplifier : transférez ce qui crée encore de la valeur et laissez le reste derrière.",
        internalLinks: [{ phrase: "gestion du changement", to: "/thread/change-management" }],
        boldPhrases: [
          { phrase: "Faites le passage et fermez l’ancien." },
          { phrase: "Ne fermez pas l’ancien service trop tôt." },
          { phrase: "Une migration ne réussit que si les gens adoptent le remplacement," },
        ],
        // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Step 5, Migrate and Common Migration Approaches — REPLACE WITH REAL LINK WHEN PUBLISHED
        placeholderLinks: [
          {
            phrase: "archive",
            source: GCCASE,
            part: "Étape 5, Migrer et approches de migration courantes",
          },
          {
            phrase: "decommissioned",
            source: GCCASE,
            part: "Étape 5, Migrer et approches de migration courantes",
          },
        ],
      },
    ] satisfies SunsetJourneyStepStrings[],
    decommissionStep: {
      label: "Mettre hors service",
      title: "Démanteler : la fermeture propre.",
      leadIn: "Fermez le service pour de bon.",
      body: "Il n’y a pas de passage à un remplacement : le travail est donc une fermeture propre : archivez les documents selon leur calendrier de conservation, confirmez que plus rien ne dépend du service, et mettez-le hors service.",
    } satisfies SunsetJourneyStepStrings,
  },

  whereNext: {
    title: "Où aller ensuite",
    cards: [
      {
        label: "Analyse des options",
        href: OPTIONS_ANALYSIS_PATH,
        description:
          'La version complète de l’étape « évaluer les options », partagée avec la Création.',
      },
      {
        label: "Les points de contrôle officiels d’un service numérique",
        href: "/gate-map",
        description:
          "La carte des points de contrôle officiels de la Création, l’Exploitation et le Retrait, y compris le point de contrôle des documents à la sortie.",
      },
      {
        label: "Fil de l’approvisionnement",
        href: PROCUREMENT_LANDING_PATH,
        description: "Comment se déroule l’achat si vous acquérez un remplacement.",
      },
    ],
  },

  caution: {
    title: "Le coût de l’attente",
    lead: "Le Retrait se déroule beaucoup mieux quand il commence tôt. Les difficultés les plus courantes viennent toutes du fait de s’y prendre tard :",
    items: [
      {
        heading: "L’approvisionnement manque de temps.",
        line: "Acheter une solution infonuagique peut prendre de 12 à 24 mois. Commencez tard et vous risquez de ne pas avoir de remplacement avant la fin du soutien.",
      },
      {
        heading: "L’aide est déjà prise.",
        line: "Les partenaires de mise en œuvre qualifiés sont réservés par les équipes qui ont commencé plus tôt.",
      },
      {
        heading: "Les migrations précipitées coûtent plus cher.",
        line: "Des échéanciers comprimés signifient plus de défauts, moins de tests et une adoption plus faible.",
      },
      {
        heading: "Exposition en matière de sécurité.",
        line: "Fonctionner sur une plateforme non soutenue au-delà de sa date de fin vous laisse sans correctifs de sécurité.",
      },
      {
        heading: "Perturbation opérationnelle.",
        line: "Ratez l’échéance et les processus opérationnels qui dépendent du service peuvent s’arrêter.",
      },
    ] satisfies CautionItem[],
    // PLACEHOLDER SOURCE: GCcase Migration Readiness Guide — Risks of Delayed Planning — REPLACE WITH REAL LINK WHEN PUBLISHED
    closingCitation: {
      text: "Source : Guide de préparation à la migration GCcase — Risques d’une planification tardive.",
      placeholderLinks: [
        {
          phrase: "Guide de préparation à la migration GCcase — Risques d’une planification tardive",
          source: GCCASE,
          part: "Risques d’une planification tardive",
        },
      ],
    },
  },
};
