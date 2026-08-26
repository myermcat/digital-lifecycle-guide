import { Activity, Gauge, ListChecks, Target } from "lucide-react";
import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import { procurementSubPath } from "@/lib/procurement-landing";
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

export type MonitoringLinkedProse = ThreadLinkedProse;
export type MonitoringContentSection = ThreadContentSection;
export type MonitoringCloserLookBlock = ThreadCloserLookBlock;
export type MonitoringPhasePreviewBlock = ThreadPhasePreviewBlock;

export const monitoringLeadPlainText = (
  lead: readonly ThreadLinkedProse[],
  keyCallout?: string,
) => [lead.map((paragraph) => paragraph.text).join(" "), keyCallout].filter(Boolean).join(" ");
export const monitoringSectionsPlainText = threadSectionsPlainText;
export const monitoringWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);
export const monitoringWhyItMattersPlainText = threadWhyItMattersPitchPlainText;

export const MONITORING_INSTRUMENT_SEE_ACT_DIAGRAM_ALT =
  "Diagramme : L’instrumenter, Le voir et Agir, en boucle. Les signaux ne comptent que lorsqu’ils se transforment en travail.";

export const MONITORING_BLIND_VS_SEEING_DIAGRAM_ALT =
  "Diagramme : sans instrumentation — aucun signal, l’équipe devine — par rapport à avec instrumentation — les signaux montrent son état. Le même service ; la différence est de savoir s’il a été conçu pour montrer ce qu’il fait.";

export const MONITORING_THREAD = {
  title: "Surveillance et instrumentation",
  slug: "monitoring-and-instrumentation" as const,

  keyCallout: "Une équipe ne peut pas améliorer ce qu’elle ne voit pas.",

  lead: [
    {
      text:
        "Un service en fonction émet en permanence des signaux sur son état : quelles tâches les gens terminent, où ils bloquent, ce qui casse, combien de temps les choses prennent. La surveillance, c’est le travail qui consiste à recueillir ces signaux et à examiner les quelques-uns qui comptent, pour que l’équipe puisse voir si le service fonctionne réellement pour les personnes qui l’utilisent.",
    },
    {
      text:
        "Deux choses rendent cela possible, dans l’ordre. D’abord, instrumenter le service : le construire de façon qu’il consigne ce qui se passe à mesure que les gens l’utilisent. Ensuite, surveiller un petit ensemble de signaux et agir dessus. L’instrumentation vient en premier, parce qu’un beau tableau de bord bâti sur des signaux que le service n’a jamais émis ne montre rien de réel.",
      bold: [
        { phrase: "instrument" },
        { phrase: "watch" },
        { phrase: "act" },
      ],
    },
    {
      text:
        "Ce n’est pas facultatif pour un service du gouvernement du Canada. La Ligne directrice sur les services et le numérique exige des ministères qu’ils mesurent le rendement des services et qu’ils recueillent et utilisent les commentaires des clients pour s’améliorer. La surveillance est la façon dont une équipe satisfait à cette obligation, et dont elle remarque un problème avant qu’il devienne une crise.",
      externalLinks: [
        {
          phrase: "Ligne directrice sur les services et le numérique",
          linkKey: "guideline-service-digital",
        },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies ThreadLinkedProse[],

  keyPoints: {
    heading: "Résumé",
    items: [
      {
        lead: "Intégrer la consignation avant le lancement.",
        icon: Activity,
        body: "Un service ne peut déclarer que ce qu’il a été construit pour consigner. L’ajouter après coup coûte cher, et ce qu’on obtient est plein de trous : c’est donc l’une des rares choses qui doivent véritablement se faire tôt.",
      },
      {
        lead: "Quelques chiffres, choisis à dessein.",
        icon: Gauge,
        body: "Un chiffre utile est un chiffre qui changerait ce que quelqu’un fait. Si personne ne peut dire qui agirait dessus, il a sa place dans un rapport plutôt que sur le tableau de bord.",
      },
      {
        lead: "Convenir de la cible avant de pouvoir voir le résultat.",
        icon: Target,
        body: "Un chiffre seul ne peut pas être jugé. Quatre-vingt-deux pour cent est bon ou mauvais selon ce qui avait été promis : la cible est donc convenue en Alpha ou en Bêta et consignée avec sa provenance.",
      },
      {
        lead: "Recueillir est la moitié facile.",
        icon: ListChecks,
        body: "Les signaux doivent se transformer en travail à la revue du carnet de produit, sans quoi le tableau de bord est décoratif. Un tableau de bord tout vert a le droit de ne rien produire, et c’est justement à cela que servent les cibles.",
      },
    ],
  },

  whatGoodLooksLike: [
    {
      text: "Les signaux viennent du service lui-même, générés à mesure que les gens l’utilisent, plutôt que saisis à la main dans un tableur.",
    },
    {
      text: "L’équipe surveille un petit ensemble de signaux liés à l’expérience réelle des utilisateurs et à l’état du système.",
    },
    {
      text:
        "Chaque signal qui compte a une cible fixée d’avance, pour que l’équipe puisse dire si un chiffre est bon ou mauvais.",
    },
    {
      text: "Les tableaux de bord sont lisibles, dignes de confiance et visibles pour les organes qui examinent le service.",
    },
    {
      text:
        "Chaque signal qui compte a un responsable qui agit dessus, et un tableau de bord tout vert a le droit de ne rien générer.",
    },
    {
      text: "L’instrumentation est intégrée au service avant la mise en service, pendant qu’elle est encore peu coûteuse à ajouter.",
    },
  ] satisfies MonitoringLinkedProse[],

  whatGoodLooksLikeFooter: {
    text: "Le mode d’emploi canadien pour cela, au niveau d’un responsable opérationnel, est « Surveiller et mesurer la réussite des tâches » sur design.canada.ca.",
    externalLinks: [
      {
        phrase: "Surveiller et mesurer la réussite des tâches",
        linkKey: "monitoring-measuring-task-success",
      },
    ] satisfies ExternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  whyItMatters: {
    lead:
      "Recueillir des données est facile. Agir dessus est la partie qu’on saute, et un tableau de bord sur lequel personne n’agit n’est que décoration.",
    failureIntro: "Quand la surveillance manque ou est ignorée, le coût est réel :",
    failureModes: [
      {
        text: "La première nouvelle d’un problème vient des plaintes. Sans ses propres signaux, une équipe apprend qu’un service est brisé par les utilisateurs, par le cabinet du ministre, ou par les médias, longtemps après le début.",
        bold: [{ phrase: "La première nouvelle d’un problème vient des plaintes." }],
      },
      {
        text: "Personne ne peut dire si un changement a aidé. Sans rien de mesuré avant et après, chaque mise en production est une supposition et les débats se tranchent selon l’ancienneté.",
        bold: [{ phrase: "Personne ne peut dire si un changement a aidé." }],
      },
      {
        text: "Les indicateurs de vanité masquent la vérité. Un tableau de bord rempli de grands chiffres verts que personne n’a choisis peut paraître en santé pendant que les gens échouent à la seule tâche qui compte.",
        bold: [{ phrase: "Les indicateurs de vanité masquent la vérité." }],
      },
      {
        text: "Les rapports s’empilent et rien ne change. Des données recueillies mais jamais transformées en travail sont un coût sans rendement.",
        bold: [{ phrase: "Les rapports s’empilent et rien ne change." }],
      },
    ] satisfies ThreadLinkedProse[],
  },

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    intro: {
      text:
        "La surveillance fonctionne en boucle à trois étapes. Sautez la première et il n’y a rien de réel à voir ; sautez la dernière et rien ne change.",
    } satisfies ThreadLinkedProse,
    blocks: [
      {
        title: "L’instrumenter.",
        sections: [
          {
            type: "subheading",
            text: "Ce qu’est l’instrumentation, et pourquoi la faire plus tard coûte davantage",
          },
          {
            text:
              "L’instrumentation consiste à construire le service de façon qu’il consigne ce qui se passe à mesure que les gens l’utilisent : chaque étape clé tentée et terminée, chaque erreur, le temps que prend chaque étape. Faite pendant la construction du service, elle est peu coûteuse et exacte. Ajoutée après coup, elle est coûteuse et pleine de trous.",
            bold: [{ phrase: "consigne ce qui se passe" }],
          },
          {
            type: "subheading",
            text: "Instrumenter de façon normalisée, sinon les signaux appartiennent à l’outil",
          },
          {
            text:
              "Instrumentez de façon ouverte et normalisée pour que les signaux ne soient pas liés au produit de surveillance d’un seul fournisseur. OpenTelemetry est la norme ouverte courante pour cela, et la nommer dans un contrat préserve la possibilité de changer d’outil plus tard.",
            bold: [{ phrase: "de façon ouverte et normalisée" }],
            externalLinks: [
              { phrase: "OpenTelemetry", linkKey: "opentelemetry" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              {
                phrase: "la nommer dans un contrat",
                to: procurementSubPath("put-the-practices-in-the-contract"),
              },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Le voir.",
        sections: [
          {
            text:
              "Mettez les signaux sur un tableau de bord, et n’en surveillez que quelques-uns qui comptent. Un bon tableau de bord montre un petit ensemble de signaux liés à l’expérience réelle des utilisateurs et à l’état du système, chacun avec une cible fixée d’avance, pour qu’un chiffre veuille dire quelque chose. Pour un service du gouvernement du Canada, ceux qui valent la peine d’être surveillés sont :",
            bold: [{ phrase: "dashboard" }, { phrase: "target" }],
          },
          {
            type: "orderedList",
            items: [
              {
                text:
                  "Réussite des tâches — les gens terminent-ils ce qu’ils étaient venus faire ? Le Sondage sur la réussite des tâches du GC est la méthode obligatoire du GC, mesurant l’achèvement, la facilité et la satisfaction.",
                bold: [{ phrase: "Réussite des tâches" }],
                externalLinks: [
                  { phrase: "Sondage sur la réussite des tâches du GC", linkKey: "gc-task-success-survey" },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text: "Erreurs et transactions échouées — où le service casse, et à quelle fréquence.",
                bold: [{ phrase: "Erreurs et transactions échouées" }],
              },
              {
                text: "Rendement — vitesse et disponibilité, la plomberie qui fonctionne.",
                bold: [{ phrase: "Rendement" }],
              },
              {
                text:
                  "Satisfaction et commentaires — ce que les gens disent dans leurs propres mots, ce que la Ligne directrice sur les services et le numérique exige d’une équipe qu’elle recueille et utilise.",
                bold: [{ phrase: "Satisfaction et commentaires" }],
                externalLinks: [
                  {
                    phrase: "Ligne directrice sur les services et le numérique",
                    linkKey: "guideline-service-digital",
                  },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text:
                  "Santé des mises en production — après la sortie d’un changement, le service tient-il toujours ? Les indicateurs DORA en font le suivi, tout comme la mise en production des changements.",
                bold: [{ phrase: "Santé des mises en production" }],
                externalLinks: [
                  { phrase: "Les indicateurs DORA", linkKey: "dora-metrics" },
                ] satisfies ExternalPhraseLink[],
                internalLinks: [
                  { phrase: "la mise en production des changements", to: THREADS["releasing-changes"].path },
                ] satisfies InternalPhraseLink[],
              },
            ],
          },
          {
            type: "subheading",
            text: "Chaque signal a besoin d’une cible, sinon le chiffre ne peut pas être jugé",
          },
          {
            text:
              "Un chiffre seul ne dit rien : 82 % est bon ou mauvais selon ce que vous aviez promis. Les services du gouvernement du Canada publient leurs cibles sous forme de normes de service, qui sont une promesse publique du rendement auquel un client peut s’attendre, et les résultats sont déclarés chaque année dans le répertoire des services du GC.",
            externalLinks: [
              { phrase: "répertoire des services du GC", linkKey: "gc-service-inventory" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text:
              "Pour la forme d’un petit ensemble de cibles, l’exemple publié le plus clair est celui des quatre indicateurs clés de rendement du Royaume-Uni, exposés dans « comment établir les indicateurs de rendement de votre service » :",
            externalLinks: [
              {
                phrase: "comment établir les indicateurs de rendement de votre service",
                linkKey: "uk-service-manual-performance-metrics",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "unorderedList",
            items: [
              { text: "taux d’achèvement" },
              { text: "adoption du numérique" },
              { text: "satisfaction des utilisateurs" },
              { text: "coût par transaction" },
            ],
          },
          {
            text:
              "Une bonne partie du signal Web d’un service du gouvernement du Canada est déjà recueillie dans l’analytique de Canada.ca : vérifiez donc là avant de commander quoi que ce soit de nouveau.",
            externalLinks: [
              { phrase: "l’analytique de Canada.ca", linkKey: "canada-ca-analytics" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Choisir les chiffres.",
        sections: [
          {
            text: "La plupart des tableaux de bord portent trop de chiffres, parce qu’il est plus facile d’en ajouter un que de plaider pour l’omettre. Une mesure utile est une mesure qui changerait ce que quelqu’un fait.",
            bold: [{ phrase: "une mesure qui changerait ce que quelqu’un fait" }],
          },
          {
            text: "Le test est court. Si ce chiffre bougeait, qui agirait, et que ferait-il ? Si personne ne peut répondre, il a sa place dans un rapport plutôt que sur le tableau de bord.",
          },
          {
            type: "subheading",
            text: "Quatre questions, et habituellement un chiffre chacune suffit",
          },
          {
            text: "Ce sont les questions selon lesquelles choisir. Les signaux nommés sous « Le voir » sont ce que les réponses donnent habituellement pour un service du gouvernement du Canada.",
          },
          {
            type: "orderedList",
            items: [
              {
                bold: "Est-ce que cela fonctionne ?",
                text: " La proportion de gens qui terminent ce qu’ils étaient venus faire. C’est celui qui compte le plus et celui qui manque le plus souvent, parce qu’il est plus difficile à recueillir que les pages vues.",
              },
              {
                bold: "Est-ce assez rapide pour la personne qui l’utilise ?",
                text: " Mesuré depuis sa position, sur la connexion et l’appareil qu’elle a réellement, non depuis l’intérieur du centre de données.",
              },
              {
                bold: "À quelle fréquence cela échoue-t-il, et à quoi ressemble l’échec vu de l’extérieur ?",
                text: " Un taux d’erreur, plus au moins une mesure de ce qui se passe ensuite : les personnes qui abandonnent, ou qui finissent par téléphoner.",
              },
              {
                bold: "Combien cela coûte-t-il à exploiter ?",
                text: " Par transaction, ou par mois en fonction du volume. Personne ne le demande avant la conversation sur le financement, moment où il est en retard d’un an.",
              },
            ],
          },
          {
            type: "subheading",
            text: "Fixer la cible avant de pouvoir voir le résultat",
          },
          {
            text: "Une cible choisie après le premier mois est ce que le premier mois a produit. Convenez de chacune en Alpha ou en Bêta, pendant qu’il s’agit encore d’un jugement sur ce à quoi ressemblerait la réussite, et consignez la provenance de la référence : l’ancien service, un service comparable ailleurs, ou une supposition honnête étiquetée comme telle.",
            bold: [{ phrase: "consignez la provenance de la référence" }],
          },
          {
            type: "subheading",
            text: "Nommer qui la lit, et à quelle fréquence",
          },
          {
            text: "Un chiffre que personne ne lit n’est pas une mesure, c’est un graphique. Dites qui regarde, à quelle fréquence, et ce qui se passe quand un chiffre va dans le mauvais sens deux relevés de suite. En Stabilisation, c’est quotidien ; rendu à la Maturité, c’est habituellement mensuel.",
            bold: [{ phrase: "Un chiffre que personne ne lit n’est pas une mesure, c’est un graphique." }],
          },
        ],
      },
      {
        title: "Agir.",
        sections: [
          {
            text:
              "Un tableau de bord ne vaut rien à moins que quelqu’un agisse sur ce qu’il montre. Les signaux deviennent du travail à la revue du carnet de produit, où un relevé se transforme en élément précis :",
            bold: [{ phrase: "agisse sur ce qu’il montre" }],
            internalLinks: [{ phrase: "backlog", to: THREADS.backlog.path }] satisfies InternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              {
                text: "Une tâche au faible taux d’achèvement devient un correctif.",
                bold: [{ phrase: "fix" }],
              },
              {
                text: "Une pointe d’erreurs ou de transactions échouées devient un défaut à corriger.",
                bold: [{ phrase: "bug" }],
              },
              {
                text: "Une étape à fort taux d’abandon devient une amélioration de l’expérience utilisateur.",
                bold: [{ phrase: "une amélioration de l’expérience utilisateur" }],
              },
              {
                text: "Un volume croissant d’appels au soutien sur un même sujet devient une correction de la cause profonde.",
                bold: [{ phrase: "une correction de la cause profonde" }],
              },
              {
                text: "Un rendement lent ou en dégradation devient un élément de rendement ou de dette technique.",
                bold: [{ phrase: "un élément de rendement ou de dette technique" }],
              },
              {
                text: "Une fonctionnalité que presque personne n’utilise devient une question : l’améliorer, la promouvoir, ou la retirer.",
                bold: [{ phrase: "question" }],
              },
            ],
          },
          {
            text:
              "Les chiffres en santé ne deviennent rien, et c’est correct. Un tableau de bord tout vert a le droit de ne générer aucun travail.",
            bold: [{ phrase: "Un tableau de bord tout vert a le droit de ne générer aucun travail." }],
          },
          {
            type: "subheading",
            text: "Un type de signal va ailleurs",
          },
          {
            text:
              "Une activité inhabituelle ou suspecte n’est pas un élément du carnet de produit. C’est un signal de sécurité, et il est traité par la détection et l’intervention dans le fil sur la sécurité.",
            internalLinks: [{ phrase: "security", to: THREADS.security.path }] satisfies InternalPhraseLink[],
          },
        ],
      },
    ] satisfies MonitoringCloserLookBlock[],
  },

  whoseJob: {
    intro:
      "La surveillance est une activité d’équipe, et elle échoue quand le tableau de bord est le projet parallèle de quelqu’un que personne ne lit.",
    roles: [
      {
        role: "L’équipe du service",
        text: "intègre l’instrumentation au service et met en place les tableaux de bord.",
      },
      {
        role: "Le gestionnaire de produit",
        text:
          "choisit les quelques signaux qui comptent, fixe leurs cibles, et apporte les relevés à la revue du carnet de produit.",
      },
      {
        role: "Quiconque exploite le service en production",
        text: "le surveille en direct et intervient quand un signal franchit une limite.",
      },
      {
        role: "Le responsable opérationnel de l’application",
        text:
          "assume les cibles, répond du rendement du service devant les organes qui l’examinent, et veille à ce que les signaux se transforment en travail plutôt qu’en rapports.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  twoWaysComparison: {
    id: "two-ways-comparison",
    title: "Deux façons de surveiller un service",
    risky: {
      heading: "Vell",
      framing:
        "Voici Vell, gestionnaire de service. L’équipe a lancé le service de permis en prévoyant régler la mesure plus tard :",
      items: [
        "a mis en production la première version sans instrumentation intégrée",
        "a ajouté un tableau de bord des mois plus tard, rempli de chiffres de disponibilité des serveurs parce qu’ils étaient faciles à obtenir",
        "n’a fixé de cible pour rien : chaque chiffre était donc vert par défaut",
        "a découvert par un amas de plaintes que l’étape de paiement échouait depuis des semaines",
      ],
      closing:
        "Le résultat : un vrai problème est passé inaperçu pendant des semaines, et le tableau de bord qui existait mesurait tout sauf la capacité des gens à obtenir un permis.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Voici Pax, gestionnaire de service. L’équipe a traité la mesure comme faisant partie de la construction du service :",
      items: [
        "a instrumenté le service avant le lancement, pour qu’il consigne chaque étape tentée et terminée",
        "a retenu cinq signaux liés à l’obtention d’un permis, chacun avec une cible",
        "a examiné les signaux à chaque séance sur le carnet de produit et a transformé les faibles en travail",
        "a détecté tôt un abandon à une étape et l’a corrigé avant qu’il s’aggrave",
      ],
      closing:
        "Le résultat : l’équipe a vu le service comme ses utilisateurs le vivaient, et a corrigé les vrais problèmes pendant qu’ils étaient encore petits.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble le fil Surveillance et instrumentation à chaque phase",
    intro: "Le fil Surveillance et instrumentation change de forme au fil de la vie d’un service.",
    blocks: [
      {
        title: "Create.",
        preview: "Décider quoi mesurer avant la mise en service.",
        popupHeading: "Décider quoi mesurer avant la mise en service.",
        popup: [
          {
            text:
              "Choisissez les quelques signaux qui comptent et intégrez l’instrumentation à la première version réelle dès le départ.",
          },
          {
            text:
              "Fixez une cible pour chacun, pour que dès le premier jour en fonction l’équipe puisse distinguer un bon chiffre d’un mauvais.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "Surveiller, et transformer les signaux en travail.",
        popupHeading: "Surveiller, et transformer les signaux en travail.",
        popup: [
          {
            text:
              "L’essentiel de la surveillance se joue ici : tableaux de bord, alertes, suivi du rendement, et la revue du carnet de produit qui transforme les relevés en correctifs, en défauts à corriger et en améliorations.",
          },
          {
            text: "C’est ici qu’un service mesuré devient un meilleur service.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Continuer de surveiller jusqu’au départ du dernier utilisateur.",
        popupHeading: "Continuer de surveiller jusqu’au départ du dernier utilisateur.",
        popup: [
          {
            text:
              "Un service en cours de retrait a encore besoin de ses signaux. Guettez les retardataires et les défaillances pendant le passage vers ce qui suit, et gardez l’instrumentation active jusqu’à ce que le service soit éteint pour de bon.",
          },
        ],
      },
    ] satisfies MonitoringPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Pour la version approfondie de la fixation d’une cible, « Service Level Objectives » dans le Google SRE Book couvre en langage clair les indicateurs de niveau de service, les objectifs et les budgets d’erreur. Les indicateurs de livraison logicielle DORA sont les quatre indicateurs de santé de la livraison permettant de juger si les mises en production se passent bien, service par service. Le Digital Performance Standard de la DTA australienne est le cadre de surveillance d’un gouvernement pair, en cinq critères simples.",
    externalLinks: [
      {
        phrase: "Service Level Objectives",
        linkKey: "google-sre-service-level-objectives",
      },
      { phrase: "Les indicateurs de livraison logicielle DORA", linkKey: "dora-metrics" },
      {
        phrase: "Digital Performance Standard",
        linkKey: "dta-digital-performance-standard",
      },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Instrument directeur",
      linkKey: "guideline-service-digital" satisfies ExternalLinkKey,
      description:
        "Ligne directrice sur les services et le numérique (SCT), l’exigence de mesurer le rendement et d’utiliser les commentaires des clients — https://www.canada.ca/en/government/system/digital-government/guideline-service-digital.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "monitoring-measuring-task-success" satisfies ExternalLinkKey,
      description:
        "Surveiller et mesurer la réussite des tâches (EDSC, design.canada.ca) — https://design.canada.ca/continuous-improvement/monitoring.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-task-success-survey" satisfies ExternalLinkKey,
      description: "Sondage sur la réussite des tâches du GC (EDSC) — https://design.canada.ca/survey/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "canada-ca-analytics" satisfies ExternalLinkKey,
      description: "Analytique de Canada.ca (SCT/EDSC) — https://www.canada.ca/en/analytics.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-service-manual-performance-metrics" satisfies ExternalLinkKey,
      description:
        "Comment établir les indicateurs de rendement de votre service (Service Manual du Royaume-Uni) — https://www.gov.uk/service-manual/measuring-success/how-to-set-performance-metrics-for-your-service",
    },
    {
      label: "Référence complémentaire",
      linkKey: "opentelemetry" satisfies ExternalLinkKey,
      description: "Qu’est-ce qu’OpenTelemetry ? (CNCF) — https://opentelemetry.io/docs/what-is-opentelemetry/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "google-sre-service-level-objectives" satisfies ExternalLinkKey,
      description:
        "Service Level Objectives, objectifs de niveau de service (Google SRE Book) — https://sre.google/sre-book/service-level-objectives/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "dora-metrics" satisfies ExternalLinkKey,
      description:
        "Indicateurs de performance de livraison logicielle DORA (Google Cloud) — https://dora.dev/guides/dora-metrics/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "dta-digital-performance-standard" satisfies ExternalLinkKey,
      description:
        "Digital Performance Standard (Australie, DTA) — https://www.digital.gov.au/policy/digital-experience/digital-performance-standard",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cccs-network-security-logging-monitoring" satisfies ExternalLinkKey,
      description:
        "Journalisation et surveillance de la sécurité des réseaux, ITSAP.80.085 (Centre canadien pour la cybersécurité) — https://www.cyber.gc.ca/en/guidance/network-security-logging-monitoring-itsap80085",
    },
  ] satisfies SourceItem[],
} as const;
