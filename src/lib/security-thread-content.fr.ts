import { Gem, KeyRound, PencilRuler, RotateCw } from "lucide-react";
import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type {
  ExternalPhraseLink,
  InternalPhraseLink,
  PlaceholderGcNetworkPhraseLink,
} from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import {
  COMPONENT_END_OF_LIFE_GUIDANCE,
  placeholderSourceHref,
  SECURE_APPLICATION_DEVELOPMENT_GUIDELINE,
  SECURE_APPLICATION_DEVELOPMENT_GUIDELINE_SHORT,
  SECURITY_CATEGORIZATION_OF_SOURCE_CODE,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { ThreadCoreStripTile } from "@/lib/thread-core-strip";

export type SecurityLinkedProse = ThreadLinkedProse;

export type SecurityCloserLookBlock = {
  title: string;
  text?: string;
  sections?: readonly ThreadContentSection[];
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: InternalPhraseLink[];
  placeholderLinks?: PlaceholderPhraseLink[];
  placeholderGcNetworkLinks?: PlaceholderGcNetworkPhraseLink[];
  bold?: { phrase: string }[];
};

export type SecurityPhasePreviewBlock = {
  title: string;
  preview: string;
  popup: SecurityLinkedProse | readonly ThreadContentSection[];
};

export type SecurityLifecycleContent = {
  heading: string;
  tiles: readonly ThreadCoreStripTile[];
  framing: SecurityLinkedProse;
};

export const SECURITY_THREAD = {
  title: "Sécurité",
  slug: "security" as const,

  lead: "La sécurité traverse toute la vie d’un service, du premier croquis de conception au jour où il est éteint. Un service sûr au lancement se démode à mesure que les menaces autour de lui changent et que ses logiciels vieillissent : la sécurité est donc un travail qui ne s’arrête jamais tout à fait. Les cinq mêmes questions reviennent sans cesse : savoir ce qui est à risque, bâtir les défenses, repérer vite les ennuis, contenir l’incident, et restaurer et apprendre. Ces cinq questions forment le cycle de vie de la sécurité.",

  securityLifecycle: {
    heading: "LE CYCLE DE VIE DE LA SÉCURITÉ",
    tiles: [
      { label: "Repérer", gloss: "savoir ce qui est à risque" },
      { label: "Protéger", gloss: "bâtir les défenses" },
      { label: "Détecter", gloss: "repérer vite les ennuis" },
      { label: "Intervenir", gloss: "contenir l’incident" },
      { label: "Rétablir", gloss: "restaurer et apprendre" },
    ],
    framing: {
      text: "Ce sont les cinq fonctions du cycle de vie de la sécurité reconnu, le modèle dans lequel travaille le gouvernement du Canada : l’ITSG-33 du Canada expose le cycle de vie de gestion des risques de sécurité de la TI du GC, le Centre canadien pour la cybersécurité publie les orientations qui en découlent, et les mêmes cinq fonctions constituent le cadre international du NIST Cybersecurity Framework.",
      externalLinks: [
        { phrase: "ITSG-33", linkKey: "itsg-33" },
        { phrase: "NIST Cybersecurity Framework", linkKey: "nist-cyberframework" },
      ] satisfies ExternalPhraseLink[],
    },
  } satisfies SecurityLifecycleContent,

  keyPoints: {
    heading: "Résumé",
    items: [
      {
        lead: "La sécurité revient sans cesse.",
        icon: RotateCw,
        body: "Les cinq fonctions se répètent aussi longtemps que le service fonctionne. Un service qui était sécurisé le jour de son lancement, et qu’on n’a pas réexaminé depuis, a discrètement cessé de l’être.",
      },
      {
        lead: "Ce qui tourne mal est habituellement ordinaire.",
        icon: KeyRound,
        body: "Un composant non corrigé, un mot de passe par défaut, une permission laissée plus large que nécessaire. Les attaques spectaculaires font les manchettes, mais c’est de là que vient l’essentiel du préjudice.",
      },
      {
        lead: "Protéger le petit nombre de choses qui causeraient un préjudice réel.",
        icon: Gem,
        body: "Protéger tout au même niveau élevé coûte plus cher que ce que la plupart des ministères peuvent se permettre, et cela se termine généralement par une protection trop diluée pour aider où que ce soit. Déterminez quelles parties causeraient un préjudice réel si elles défaillaient, et protégez-les correctement.",
      },
      {
        lead: "Cela coûte bien moins cher à la conception qu’en production.",
        icon: PencilRuler,
        body: "Une faiblesse détectée pendant que quelqu’un dessine encore le service coûte une fraction de ce que coûte la même faiblesse une fois que des gens l’utilisent. Si un fournisseur le construit, c’est l’argument pour inscrire le travail de sécurité au contrat.",
      },
    ],
  },

  whatGoodLooksLike: [
    {
      text: "La sécurité est planifiée et financée dès le départ, les risques étant déterminés avant qu’une ligne de code soit écrite.",
    },
    {
      text: "L’accès suit le principe du moindre privilège, c’est-à-dire que chaque personne et chaque système n’obtient que l’accès nécessaire, et cet accès est vérifié.",
      externalLinks: [
        { phrase: "moindre privilège", linkKey: "least-privilege-itsap10094" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Les correctifs sont appliqués selon un calendrier et l’application est testée régulièrement pour déceler les vulnérabilités.",
      externalLinks: [
        {
          phrase: "testée régulièrement pour déceler les vulnérabilités",
          linkKey: "guideline-vulnerability-management",
        },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "La surveillance et les alertes signalent les activités inhabituelles, parce qu’on ne peut pas tout prévenir et que ce qui compte, c’est la vitesse à laquelle on s’en aperçoit.",
    },
    {
      text: "Un plan d’intervention en cas d’incident existe et a été répété, pour qu’un problème soit contenu rapidement plutôt que des semaines plus tard.",
      externalLinks: [
        { phrase: "plan d’intervention en cas d’incident", linkKey: "incident-response-plan-itsap40003" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Le service peut être rétabli après un incident, et la leçon est réintégrée à la conception.",
    },
    {
      text: "Le niveau de maturité en sécurité du service est connu, avec une prochaine étape claire pour l’améliorer.",
      externalLinks: [
        { phrase: "niveau de maturité en sécurité", linkKey: "owasp-dsomm" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Les composants tiers, c’est-à-dire les bibliothèques libres et achetées sur lesquelles repose le service, sont inventoriés et surveillés pour déceler les problèmes connus.",
      externalLinks: [
        { phrase: "Les composants tiers", linkKey: "cyber-supply-chain-itsap10070" },
      ] satisfies ExternalPhraseLink[],
      internalLinks: [
        {
          phrase: "inventoriés et surveillés pour déceler les problèmes connus",
          to: THREADS["dependencies-and-standards"].path,
        },
      ] satisfies InternalPhraseLink[],
    },
  ] satisfies SecurityLinkedProse[],

  whyItMatters: {
    paragraphs: [
      {
        text: "Quand la sécurité échoue, un service peut tomber hors ligne ou laisser fuir les renseignements personnels de gens, et la confiance du public est longue à rebâtir. Les causes sont habituellement banales : un composant non corrigé, un mot de passe par défaut, une permission laissée trop large.",
      },
      {
        text: "Chacune des cinq fonctions protège contre une défaillance différente, et le cycle ne tient que si aucune n’est sautée. Détecter une faille tôt coûte aussi moins cher, parce qu’une faille intégrée à la conception et trouvée tard est la plus coûteuse à défaire.",
      },
      {
        text: "Le mode d’emploi du gouvernement du Canada pour tout cela est la Ligne directrice sur le développement sécurisé d’applications, qui couvre l’intégration de la sécurité à chaque étape du développement, le codage sécurisé, le traitement des composants tiers, et la gestion des vulnérabilités.",
        placeholderGcNetworkLinks: [
          {
            phrase: "Ligne directrice sur le développement sécurisé d’applications",
            source: SECURE_APPLICATION_DEVELOPMENT_GUIDELINE_SHORT,
          },
        ] satisfies PlaceholderGcNetworkPhraseLink[],
      },
    ],
  },

  whoseJob: {
    intro: "La sécurité est partagée au sein de l’équipe, chaque rôle en portant une partie différente :",
    roles: [
      {
        role: "Développeurs",
        text: "écrivent du code sécurisé et corrigent ce que les analyses révèlent.",
      },
      {
        role: "Spécialistes de la sécurité",
        text: "déterminent contre quelles menaces se défendre et examinent la conception.",
      },
      {
        role: "Exploitation",
        text: "exploitent et surveillent le service une fois qu’il est en fonction.",
      },
      {
        role: "Le responsable opérationnel de l’application",
        text: "veille à ce que la sécurité soit planifiée et payée dès le départ, approuve le plan de traitement des menaces, accepte le risque qui subsiste après les correctifs, et donne le feu vert au déploiement (l’approbation officielle qui permet la mise en service).",
      },
    ],
  },

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    blocks: [
      {
        title: "Identifier : déterminer ce qui est à risque.",
        sections: [
          {
            text: "Deux questions sous-tendent l’identification : ce qui pourrait mal tourner, et le degré de sensibilité de l’information.",
          },
          {
            type: "subheading",
            text: "Ce qui pourrait mal tourner : le modèle de menaces",
          },
          {
            text: "La modélisation des menaces vous dit ce qui pourrait mal tourner. La façon la plus claire d’y entrer à l’étape de la conception est de poser quatre questions simples :",
            bold: [{ phrase: "ce qui pourrait mal tourner" }],
          },
          {
            type: "orderedList",
            items: [
              "Que construisons-nous?",
              "Qu’est-ce qui peut mal tourner?",
              "Qu’allons-nous faire à ce sujet?",
              "Avons-nous fait un assez bon travail?",
            ],
          },
          {
            text: "C’est un modèle de menaces, et les quatre questions viennent du Threat Modeling Manifesto.",
            externalLinks: [
              { phrase: "modèle de menaces", linkKey: "threat-modelling-developers" },
              { phrase: "Threat Modeling Manifesto", linkKey: "threat-modeling-manifesto" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "subheading",
            text: "Le degré de sensibilité de l’information : la catégorisation de sécurité",
          },
          {
            text: "La catégorisation de sécurité vous dit à quel point l’information est sensible. Le gouvernement du Canada a son propre outil pour cela, une évaluation du préjudice qui cote le tort qu’une compromission causerait sur les plans économique, physique, du bien-être et de la réputation, et qui en tire le niveau de protection : Protégé B, Secret ou Très secret. Plus le préjudice est grand, plus la protection est élevée. La Norme sur la catégorisation de sécurité expose la façon dont cette décision se prend.",
            bold: [{ phrase: "à quel point l’information est sensible" }],
            externalLinks: [
              {
                phrase: "Norme sur la catégorisation de sécurité",
                linkKey: "standard-on-security-categorization",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "subheading",
            text: "Réunir les deux : l’Évaluation de la menace et des risques",
          },
          {
            text: "Vous cotez les menaces selon",
          },
          {
            type: "formula",
            text: "RISQUE = PROBABILITÉ × INCIDENCE",
          },
          {
            text: "Au gouvernement du Canada, l’outil qui fait cela est une Évaluation de la menace et des risques (EMR), l’approche de gestion des risques de l’ITSG-33. Une EMR prend trois éléments et classe les risques pour que vous sachiez quoi protéger le plus :",
            externalLinks: [
              {
                phrase: "Évaluation de la menace et des risques (EMR)",
                linkKey: "harmonized-tra-methodology",
              },
              { phrase: "ITSG-33", linkKey: "itsg-33" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              {
                text: "les menaces, tirées de votre modèle de menaces;",
                bold: [{ phrase: "threats" }],
              },
              {
                text: "la sensibilité de l’information, tirée de la catégorisation;",
                bold: [{ phrase: "sensitivity" }],
              },
              {
                text: "la probabilité que chaque menace se réalise.",
                bold: [{ phrase: "likelihood" }],
              },
            ],
          },
          {
            text: "Ce n’est pas un événement unique. L’ITSG-33 fait l’évaluation trois fois, et les pages de sous-phase condensent les deux premières en une seule par souci de lisibilité :",
            bold: [{ phrase: "Ce n’est pas un événement unique." }],
            externalLinks: [
              { phrase: "ITSG-33", linkKey: "itsg-33" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              { text: "une fois contre la conception de haut niveau;" },
              { text: "de nouveau contre la conception détaillée;" },
              { text: "et une troisième fois contre le système réellement construit." },
            ],
          },
          {
            type: "subheading",
            text: "Les attaquants ne sont qu’un danger parmi d’autres",
          },
          {
            text: "Par doctrine, l’évaluation vise tous les dangers. Elle couvre autant les actes délibérés que les accidents et les événements naturels : une inondation dans l’immeuble, une panne d’électricité, un fournisseur qui ferme ses portes et un employé bien intentionné qui supprime la mauvaise chose entrent donc tous dans sa portée, à côté de l’attaquant que tout le monde imagine d’abord.",
            bold: [{ phrase: "l’évaluation vise tous les dangers" }],
          },
          {
            text: "En pratique, l’évaluation en technologie de l’information est habituellement plus étroite, parce que les dangers naturels sont traités par la planification de la continuité, qui relève d’une autre équipe et d’un autre plan. C’est une façon raisonnable de répartir le travail. Elle cesse de l’être quand personne n’a demandé lequel des deux est responsable d’un danger : il vaut donc la peine de demander à votre équipe de sécurité ce que couvre son évaluation et ce qu’elle présume couvert par quelqu’un d’autre.",
          },
          {
            text: "Ce troisième passage produit l’évaluation du risque résiduel : le relevé du risque qui subsiste, et ce sur quoi l’autorité approbatrice appose sa signature. Rien ici n’est déposé à l’extérieur du ministère. Ce qui impose le travail, c’est l’autorisation d’exploiter, parce que sans évaluation l’autorité approbatrice n’a rien à accepter.",
          },
          {
            type: "subheading",
            text: "Protéger le petit nombre de choses qui feraient vraiment mal",
          },
          {
            text: "Protégez donc solidement le petit nombre de choses qui comptent le plus, plutôt que de tout protéger au même niveau élevé. Chercher à tout protéger également engendre des dépassements de coûts, des retards, ou une protection si diluée qu’elle n’aide nulle part. Trouvez d’abord les joyaux de la couronne, puis gardez-les bien.",
            bold: [{ phrase: "Protégez donc solidement le petit nombre de choses qui comptent le plus" }],
          },
          {
            type: "editorialNote",
            label: "Exemple",
            paragraphs: [
              {
                text: "L’application Alerte COVID fonctionnait en faisant échanger aux téléphones des codes aléatoires anonymes par Bluetooth; si quelqu’un obtenait ensuite un résultat positif, ces codes servaient à avertir les personnes dont il s’était récemment approché. La seule chose qui aurait causé un préjudice réel était le code capable de déclencher une alerte « vous avez été exposé » : l’effort de sécurité s’est donc concentré là, avec des mesures empêchant quiconque d’envoyer de fausses alertes.",
                externalLinks: [
                  { phrase: "L’application Alerte COVID", linkKey: "covid-alert-privacy-assessment" },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text: "L’autre extrême illustre le même point. Une salle Très secret est construite pour le travail le plus sensible : elle est donc petite, sans fenêtres, et coûte une fortune. Marquez tout Très secret et toute l’équipe devrait s’entasser dans cette seule salle pour accomplir quoi que ce soit. Circonscrivez donc ce qui exige véritablement ce niveau.",
              },
            ],
          },
        ],
      },
      {
        title: "Protéger : bâtir les défenses.",
        sections: [
          {
            text: "La protection transforme les constats de l’identification en défenses réelles. Utilisez une conception sécurisée et des réglages sécurisés par défaut, pour que l’option sûre soit celle par défaut. Trois défenses font l’essentiel du travail :",
            bold: [{ phrase: "protection" }, { phrase: "identification" }],
          },
          {
            type: "unorderedList",
            items: [
              "ne donner à chaque personne et à chaque système que l’accès nécessaire;",
              "chiffrer les données qui comptent;",
              "garder le service à jour en appliquant les correctifs selon un calendrier.",
            ],
          },
          {
            type: "subheading",
            text: "Si un fournisseur le construit, les défenses vont au contrat",
          },
          {
            text: "Les exigences de sécurité sont inscrites au contrat pour que le fournisseur y soit tenu plutôt que sollicité poliment plus tard.",
            internalLinks: [
              { phrase: "inscrites au contrat", to: GOOD_CONTRACT_PATH },
            ] satisfies InternalPhraseLink[],
          },
          {
            type: "subheading",
            text: "La plupart du code source n’est pas un secret, et le cacher protège peu",
          },
          {
            text: 'Le code du gouvernement du Canada est ouvert par défaut. Les équipes étiquettent souvent tout leur code « Protégé B » par habitude, mais la plupart du code source ne contient aucun secret, peut être non classifié, et une bonne part peut être publiée ouvertement. Un code ouvert attire plus de regards, et plus de regards attrapent plus de failles.',
            externalLinks: [
              { phrase: "ouvert par défaut", linkKey: "guide-open-source-software" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text: "La catégorisation du code source est une décision délibérée que le responsable opérationnel prend avec l’équipe, et il y a quatre réponses : public et ouvert aux contributions, public mais fermé à celles-ci, entièrement privé, ou véritablement Protégé B.",
            placeholderGcNetworkLinks: [
              {
                phrase: "La catégorisation du code source",
                source: SECURITY_CATEGORIZATION_OF_SOURCE_CODE,
              },
            ] satisfies PlaceholderGcNetworkPhraseLink[],
          },
          {
            type: "subheading",
            text: "Une échelle pour déterminer quoi améliorer ensuite",
          },
          {
            text: "Pour faire progresser ces défenses avec le temps, le modèle de maturité DevSecOps de l’OWASP est une échelle sur laquelle un service peut être placé sans lire une ligne de code. Elle va du niveau 0, aucune sécurité réelle en place, en passant par ponctuel, défini et intégré, jusqu’au niveau 4, où la sécurité est automatisée et mesurée. Connaître le niveau indique la seule chose qui vaut la peine d’être améliorée ensuite, au lieu d’essayer de tout corriger d’un coup.",
            externalLinks: [
              { phrase: "le modèle de maturité DevSecOps de l’OWASP", linkKey: "owasp-dsomm" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Détecter : repérer vite les ennuis.",
        sections: [
          {
            text: "On ne peut pas tout prévenir : la détection est donc la moitié qui attrape ce qui passe. La surveillance et les alertes signalent les activités inhabituelles, et ce qui compte, c’est la vitesse à laquelle on s’en aperçoit. La surveillance du service en production est là où cela se joue une fois le service en fonction.",
            internalLinks: [
              {
                phrase: "La surveillance du service en production",
                to: THREADS["monitoring-and-instrumentation"].path,
              },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Intervenir : contenir l’incident.",
        sections: [
          {
            text: "Quand quelque chose est repéré, l’intervention y met fin rapidement plutôt que des semaines plus tard. Un plan d’intervention en cas d’incident répété signifie que l’équipe a mis les étapes en pratique d’avance, de sorte qu’un problème est attrapé et contenu plutôt que laissé à se répandre.",
            externalLinks: [
              { phrase: "plan d’intervention en cas d’incident", linkKey: "incident-response-plan-itsap40003" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Rétablir : restaurer et apprendre.",
        sections: [
          {
            text: "Le rétablissement ramène le service et ses données après un incident, puis comble la brèche qui l’a permis. La leçon est réintégrée à l’identification et à la protection, pour que la même défaillance ne revienne pas. C’est ce qui fait du cycle de vie un cycle plutôt qu’une ligne.",
          },
          {
            type: "subheading",
            text: "Où vivent les chiffres de rétablissement",
          },
          {
            text: "Quatre chiffres décrivent ce que le rétablissement doit atteindre : combien de temps le service peut être indisponible avant qu’un préjudice réel commence, ce qui compte comme suffisant pendant qu’il est hors service, à quelle vitesse il devrait être rétabli, et quelle quantité de données récentes peut être perdue. L’équipe du service les détermine à la fin de l’Alpha, parce qu’ils changent ce qui est construit et ce qu’il en coûte d’exploiter.",
            internalLinks: [{ phrase: "la fin de l’Alpha", to: "/create-alpha" }],
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "Durée maximale d’interruption admissible (DMIA). Combien de temps le service peut être indisponible avant que quelqu’un subisse un préjudice grave. C’est un plafond plutôt qu’une cible : le plan de rétablissement devrait donc viser confortablement en deçà.",
                bold: [{ phrase: "Durée maximale d’interruption admissible (DMIA)." }],
              },
              {
                text: "Niveau de service minimal. Ce qui compte comme suffisant pendant que le service est hors service, ce qui est souvent un formulaire papier ou une ligne téléphonique. Quelqu’un doit l’avoir organisé d’avance pour qu’il existe le jour venu.",
                bold: [{ phrase: "Niveau de service minimal." }],
              },
              {
                text: "Objectif de temps de reprise (OTR). La vitesse à laquelle l’équipe vise à rétablir le service. Il est fixé à l’intérieur de la durée maximale d’interruption admissible : les deux ne sont donc délibérément pas le même chiffre.",
                bold: [{ phrase: "Objectif de temps de reprise (OTR)." }],
              },
              {
                text: "Objectif de point de reprise (OPR). La quantité de travail récent que le service peut se permettre de perdre, mesurée par l’ancienneté de la dernière copie utilisable des données. Une heure de demandes perdues, ce n’est pas la même chose qu’une semaine.",
                bold: [{ phrase: "Objectif de point de reprise (OPR)." }],
              },
            ],
          },
          {
            type: "subheading",
            text: "Les chiffres quittent l’équipe, le travail de rétablissement non",
          },
          {
            text: "Il y a un seul plan de continuité des activités pour tout le ministère, et aucun plan distinct par service. Le jugement sur les répercussions, les quatre chiffres, et la liste de ce sans quoi ce service tombe vont donc tous au coordonnateur de la continuité des activités du ministère.",
            bold: [{ phrase: "Il y a un seul plan de continuité des activités pour tout le ministère" }],
          },
          {
            text: "Ce qui reste à l’équipe, c’est le rétablissement de ce service en particulier, et les essais qui démontrent que le rétablissement fonctionne réellement dans le délai promis.",
          },
        ],
      },
    ] satisfies SecurityCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Deux façons de faire la sécurité",
    risky: {
      heading: "Vell",
      framing:
        "Voici Vell, gestionnaire de service. L’équipe a traité la sécurité du portail de subventions comme le problème de quelqu’un d’autre :",
      items: [
        "a sauté le modèle de menaces : personne n’a donc cartographié ce qui pouvait mal tourner",
        "a laissé un compte d’administration avec son mot de passe par défaut",
        "n’a jamais appliqué de correctifs aux composants tiers sur lesquels reposait le portail",
        "n’avait aucun plan d’intervention en cas d’incident",
      ],
      closing:
        "Le résultat : une vulnérabilité connue dans un composant non corrigé a été exploitée, les données personnelles des demandeurs ont fui, et l’atteinte n’a été remarquée que des semaines plus tard.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Voici Pax, gestionnaire de service. L’équipe a intégré la sécurité au portail de subventions dès la conception :",
      items: [
        "a bâti un modèle de menaces pour exposer ce qui pouvait mal tourner, et a choisi des réglages sécurisés par défaut",
        "n’a donné à chaque personne et à chaque système que l’accès nécessaire, et l’a vérifié",
        "a appliqué les correctifs selon un calendrier et surveillé les composants tiers pour déceler les problèmes connus",
        "tenait un plan d’intervention en cas d’incident répété",
      ],
      closing:
        "Le résultat : quand une tentative d’hameçonnage est survenue, elle a été attrapée et contenue rapidement, et les données sont restées en sécurité.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble la sécurité à chaque phase",
    intro:
      "Les cinq fonctions sont présentes tout au long, mais leur poids se déplace au fil de la vie d’un service.",
    blocks: [
      {
        title: "Create.",
        preview: "L’identification et la protection sont intégrées à la conception, avant qu’une ligne de code soit écrite.",
        popup: [
          {
            text: 'C’est ici que les fonctions Identifier et Protéger sont conçues, avant qu’une ligne de code soit écrite. L’équipe construit un modèle de menaces pour exposer ce qui pourrait mal tourner et qui pourrait attaquer le service (le modèle de menaces lui-même se trouve dans le bloc Identifier d’« Un regard de plus près »).',
          },
          {
            text: "L’équipe choisit ensuite des réglages sécurisés par défaut pour que l’option sûre soit celle par défaut, et détermine comment le service traitera l’identité et les accès. Les exigences de sécurité sont inscrites au contrat pour que le fournisseur y soit tenu. Une faiblesse corrigée à l’étape de la conception coûte bien moins cher qu’une faiblesse trouvée en production.",
            internalLinks: [
              { phrase: "inscrites au contrat", to: GOOD_CONTRACT_PATH },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "La protection, la détection, l’intervention et le rétablissement fonctionnent en continu.",
        popup: [
          {
            text: "Une fois le service en fonction, les fonctions de protection, de détection, d’intervention et de rétablissement fonctionnent toutes en même temps, et le travail est continu. Il se divise en deux moitiés :",
          },
          {
            type: "orderedList",
            items: [
              {
                text: "Prévention (protection). Gardez le service durci et à jour : appliquez les correctifs selon un calendrier, cherchez les nouvelles vulnérabilités, et vérifiez chaque mise en production pour déceler les problèmes de sécurité avant sa sortie, le responsable opérationnel donnant le feu vert final.",
                bold: [{ phrase: "Prévention (protection)." }],
                externalLinks: [
                  {
                    phrase: "cherchez les nouvelles vulnérabilités",
                    linkKey: "guideline-vulnerability-management",
                  },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text: "Détection et intervention (détecter, intervenir, rétablir). On ne peut pas tout prévenir : cette moitié compte donc tout autant. Surveillez le service en production pour attraper les activités inhabituelles, et gardez un plan d’intervention en cas d’incident, répété, pour qu’un problème soit contenu rapidement plutôt que découvert des semaines plus tard, et le service rétabli ensuite.",
                bold: [{ phrase: "Détection et intervention (détecter, intervenir, rétablir)." }],
                externalLinks: [
                  {
                    phrase: "plan d’intervention en cas d’incident",
                    linkKey: "incident-response-plan-itsap40003",
                  },
                ] satisfies ExternalPhraseLink[],
                internalLinks: [
                  {
                    phrase: "Surveillez le service en production",
                    to: THREADS["monitoring-and-instrumentation"].path,
                  },
                ] satisfies InternalPhraseLink[],
              },
            ],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Le service est fermé ou remplacé sans laisser de brèches ouvertes.",
        popup: [
          {
            text: "Un service finit par être retiré ou remplacé, et la sécurité a du travail jusqu’au bout. À mesure qu’il s’éteint, l’équipe révoque les accès et les justificatifs, transfère ou détruit les données selon leurs règles de conservation, et coupe les connexions aux autres systèmes pour que rien ne reste en suspens. Le code source est éliminé de la façon approuvée, avec un soin particulier pour tout ce qui est catégorisé Protégé B.",
            internalLinks: [
              { phrase: "retiré ou remplacé", to: PHASES.sunset.href },
              { phrase: "transfère ou détruit les données", to: THREADS["data-stewardship"].path },
            ] satisfies InternalPhraseLink[],
          },
          {
            text: "L’essentiel de cela est plus facile quand on planifie et finance d’avance le retrait d’un composant. Une technologie qui fonctionne au-delà de sa date de fin de soutien cesse de recevoir des correctifs : les vulnérabilités connues s’accumulent donc jusqu’à ce qu’elle soit trivialement exploitable. Le remplacement en fin de cycle de vie devrait être budgété dès le départ plutôt que mené à risque.",
            placeholderLinks: [
              {
                phrase: "le retrait d’un composant",
                source: COMPONENT_END_OF_LIFE_GUIDANCE,
              },
            ] satisfies PlaceholderPhraseLink[],
          },
          {
            text: "Quand du matériel est finalement démantelé ou donné, effacez d’abord de façon sécuritaire toutes les données qu’il contient, pour que rien ne sorte par la porte sur un disque éliminé.",
          },
        ],
      },
    ] satisfies SecurityPhasePreviewBlock[],
  },

  furtherReading: {
    paragraphs: [
      {
        text: "La sécurité au gouvernement du Canada relève de la Politique sur la sécurité du gouvernement, et de sa Directive sur la gestion de la sécurité, qui exige que la sécurité soit gérée sur toute la vie d’un système. Le ministère réunit le tout dans un plan de sécurité ministériel, un plan triennal réexaminé chaque année et approuvé par l’administrateur général, et la posture de sécurité d’un service, ses risques résiduels et ses exigences de continuité s’y intègrent tous.",
        externalLinks: [
          {
            phrase: "Politique sur la sécurité du gouvernement",
            linkKey: "policy-government-security",
          },
          {
            phrase: "Directive sur la gestion de la sécurité",
            linkKey: "directive-security-management",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Le compagnon le plus proche de cette page est la Ligne directrice sur le développement sécurisé d’applications, sur le réseau du GC, sur laquelle ce fil s’appuie tout du long. Il puise aussi dans l’ITSG-33 pour le catalogue de contrôles du GC, et dans l’OWASP Top 10 ouvert et le NIST Secure Software Development Framework, transposés en décisions de responsable opérationnel.",
        externalLinks: [
          { phrase: "ITSG-33", linkKey: "itsg-33" },
          { phrase: "OWASP Top 10", linkKey: "owasp-top-10" },
          {
            phrase: "NIST Secure Software Development Framework",
            linkKey: "nist-ssdf",
          },
        ] satisfies ExternalPhraseLink[],
        placeholderGcNetworkLinks: [
          {
            phrase: "Ligne directrice sur le développement sécurisé d’applications",
            source: SECURE_APPLICATION_DEVELOPMENT_GUIDELINE_SHORT,
          },
        ] satisfies PlaceholderGcNetworkPhraseLink[],
      },
      {
        text: "Pour déterminer où la dépense réduit le plus le risque, les 10 principales mesures de sécurité des TI du Centre pour la cybersécurité classent les défenses qui comptent le plus, et ses contrôles de base pour les petites et moyennes organisations constituent un point de départ plus simple pour un service de moindre envergure. Pour l’argument voulant que la sécurité coûte le moins cher quand elle est conçue dès le départ plutôt qu’ajoutée après coup, les principes de sécurité dès la conception de la CISA américaine le présentent en termes de responsable opérationnel.",
        externalLinks: [
          { phrase: "les 10 principales mesures de sécurité des TI", linkKey: "cccs-top-10-it-security-actions" },
          {
            phrase: "contrôles de base pour les petites et moyennes organisations",
            linkKey: "cccs-baseline-cyber-security-sme",
          },
          { phrase: "principes de sécurité dès la conception", linkKey: "cisa-secure-by-design" },
        ] satisfies ExternalPhraseLink[],
      },
    ],
  },

  sources: [
    {
      label: "Instrument directeur",
      href: placeholderSourceHref(SECURE_APPLICATION_DEVELOPMENT_GUIDELINE),
      description: `${SECURE_APPLICATION_DEVELOPMENT_GUIDELINE} — le mode d’emploi du GC vers lequel pointe cette page.`,
      comingSoon: true,
      gcNetworkOnly: true,
    },
    {
      label: "Instrument directeur",
      linkKey: "policy-government-security" satisfies ExternalLinkKey,
      description:
        "Politique sur la sécurité du gouvernement (SCT) — la politique parente : d’où viennent le plan de sécurité ministériel, la gestion de la continuité des activités et les services essentiels.",
    },
    {
      label: "Instrument directeur",
      linkKey: "directive-security-management-appendix-b" satisfies ExternalLinkKey,
      description:
        "Directive sur la gestion de la sécurité, annexe B (SCT) — l’exigence de gérer la sécurité sur tout le cycle de vie du système.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "guideline-vulnerability-management" satisfies ExternalLinkKey,
      description:
        'Lignes directrices sur la gestion des vulnérabilités (GC) — la boucle trouver, évaluer, corriger derrière « testée régulièrement ».',
    },
    {
      label: "Référence complémentaire",
      linkKey: "itsg-33" satisfies ExternalLinkKey,
      description:
        'ITSG-33, La gestion des risques liés à la sécurité des TI : une méthode axée sur le cycle de vie (CCC) — Le cycle de vie de la sécurité des TI du GC et ses contrôles.',
    },
    {
      label: "Référence complémentaire",
      linkKey: "nist-cyberframework" satisfies ExternalLinkKey,
      description:
        'NIST Cybersecurity Framework (NIST) — le cadre international des cinq fonctions Identifier, Protéger, Détecter, Intervenir et Rétablir, sur lequel Le cycle de vie de la sécurité s’appuie.',
    },
    {
      label: "Référence complémentaire",
      linkKey: "harmonized-tra-methodology" satisfies ExternalLinkKey,
      description:
        "Méthodologie harmonisée d’évaluation de la menace et des risques (EMR) (CCC) — https://www.cyber.gc.ca/en/tools-services/harmonized-tra-methodology — liée en ligne depuis le bloc Identifier.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "owasp-top-10" satisfies ExternalLinkKey,
      description:
        'OWASP Top 10 — les risques courants des applications Web derrière « les choses de base laissées de côté ».',
    },
    {
      label: "Référence complémentaire",
      linkKey: "owasp-dsomm" satisfies ExternalLinkKey,
      description:
        "Modèle de maturité DevSecOps de l’OWASP (DSOMM) — l’échelle de maturité du bloc Protéger.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "guide-open-source-software" satisfies ExternalLinkKey,
      description:
        "Guide pour l’utilisation de logiciels libres (GC) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/guide-for-using-open-source-software.html — la position du GC sur le libre derrière « ouvert par défaut »; liée en ligne depuis le bloc Protéger.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "secure-containers-microservices" satisfies ExternalLinkKey,
      description:
        "Conteneurs et microservices sécurisés (annexe de la ligne directrice, ouverte) — pour les équipes qui exploitent des conteneurs et Kubernetes.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "threat-modelling-developers" satisfies ExternalLinkKey,
      description:
        "CCC, Modélisation des menaces pour les développeurs — ce qu’est un modèle de menaces; liée en ligne depuis le bloc Identifier.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "threat-modeling-manifesto" satisfies ExternalLinkKey,
      description:
        "Threat Modeling Manifesto — les quatre questions simples derrière la modélisation des menaces; liée en ligne depuis le bloc Identifier.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "standard-on-security-categorization" satisfies ExternalLinkKey,
      description:
        "Norme sur la catégorisation de sécurité (Directive sur la gestion de la sécurité, annexe J, SCT) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32614 — liée en ligne depuis le bloc Identifier.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "covid-alert-privacy-assessment" satisfies ExternalLinkKey,
      description:
        "Évaluation de la protection de la vie privée d’Alerte COVID (Santé Canada / SNC) — l’exemple travaillé des joyaux de la couronne dans le bloc Identifier (sécurité concentrée sur les codes d’exposition aléatoires, avec des mesures antipourriel contre les fausses alertes).",
    },
    {
      label: "Référence complémentaire",
      linkKey: "incident-response-plan-itsap40003" satisfies ExternalLinkKey,
      description:
        "CCC, Élaborer un plan d’intervention en cas d’incident (ITSAP.40.003) — ce qu’est un plan d’intervention; lié en ligne depuis « À quoi ressemble la réussite », le bloc Intervenir, et la phase Exploitation.",
    },
    {
      label: "Référence complémentaire",
      href: placeholderSourceHref(SECURITY_CATEGORIZATION_OF_SOURCE_CODE),
      description:
        "Catégorisation de sécurité du code source (annexe de la ligne directrice, SCT) — la catégorisation du code source dans le bloc Protéger.",
      comingSoon: true,
      gcNetworkOnly: true,
    },
    {
      label: "Référence complémentaire",
      linkKey: "gcpedia-security-categorization-tool" satisfies ExternalLinkKey,
      description:
        "Outil de catégorisation de sécurité (GCpedia) — https://www.gcpedia.gc.ca/wiki/Security_Categorization_Tool",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gcpedia-esa-tools" satisfies ExternalLinkKey,
      description: "Outils ESA (GCpedia) — https://www.gcpedia.gc.ca/wiki/ESA_Tools",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cccs-top-10-it-security-actions" satisfies ExternalLinkKey,
      description:
        "CCC, 10 principales mesures de sécurité des TI (ITSM.10.089) — les défenses classées qui réduisent le plus le risque; lecture complémentaire.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cccs-baseline-cyber-security-sme" satisfies ExternalLinkKey,
      description:
        "CCC, Contrôles de cybersécurité de base pour les petites et moyennes organisations — un ensemble de contrôles plus simple pour un service de moindre envergure; lecture complémentaire.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cisa-secure-by-design" satisfies ExternalLinkKey,
      description:
        "CISA des États-Unis, Secure by Design — l’argument pour concevoir la sécurité dès le départ plutôt que de l’ajouter après coup; lecture complémentaire.",
    },
  ] satisfies SourceItem[],
} as const;
