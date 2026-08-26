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
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type EthicsAndBiasLinkedProse = ThreadLinkedProse;
export type EthicsAndBiasContentSection = ThreadContentSection;
export type EthicsAndBiasCloserLookBlock = ThreadCloserLookBlock;
export type EthicsAndBiasPhasePreviewBlock = ThreadPhasePreviewBlock;

export const ethicsAndBiasSectionsPlainText = threadSectionsPlainText;
export const ethicsAndBiasLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const ethicsAndBiasWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const ETHICS_AND_BIAS_THREAD = {
  title: "Éthique et biais",
  slug: "ethics-and-bias" as const,

  lead: {
    text:
      "Éthique et biais, c’est bâtir un service qui traite les gens équitablement et qui demeure responsable des décisions qu’il prend, surtout quand ces décisions sont automatisées ou font appel à l’IA. Le biais est un problème de conception avant d’être un problème de technologie : n’importe quel service peut avantager certaines personnes et en exclure d’autres sans que personne ne le remarque. Quand un service automatise ou appuie une décision au sujet d’une personne, le gouvernement du Canada exige qu’il soit transparent, responsable et équitable, et qu’on en évalue l’incidence avant sa mise en exploitation. Les décisions qui façonnent cela se prennent tôt et se réexaminent à mesure que le service apprend.",
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    {
      text: "Avant le lancement, on vérifie qui le service touche différemment et qui risque d’être laissé de côté, au moyen de l’ACS Plus.",
      externalLinks: [{ phrase: "ACS Plus", linkKey: "gba-plus" }] satisfies ExternalPhraseLink[],
    },
    {
      text: "Si le service automatise ou appuie une décision au sujet d’une personne, une évaluation de l’incidence algorithmique est réalisée avant le lancement, publiée, et refaite quand le système change.",
      externalLinks: [
        { phrase: "évaluation de l’incidence algorithmique", linkKey: "algorithmic-impact-assessment" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "La surveillance, les essais et l’examen correspondent au niveau d’incidence de la décision : plus l’incidence est grande, plus les exigences sont élevées.",
    },
    {
      text: "Les données et les résultats sont mis à l’essai pour détecter les biais, avant le lancement et pendant l’exploitation du service.",
    },
    {
      text: "Une personne peut obtenir une véritable solution de rechange humaine à une décision automatisée, et peut contester la décision ou en appeler.",
    },
    {
      text: "Les gens sont informés lorsqu’une décision est automatisée, et peuvent obtenir une explication claire de la façon dont elle a été prise.",
    },
    {
      text: "Une personne désignée demeure responsable des décisions ; jamais le système.",
    },
    {
      text: "Toute utilisation d’IA générative suit les principes « PRETES » : pertinente, responsable, équitable, transparente, éclairée, sécurisée.",
      externalLinks: [
        { phrase: "principes « PRETES »", linkKey: "generative-ai-faster" },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies EthicsAndBiasLinkedProse[],

  whyItMatters: {
    text:
      'Les décisions automatisées peuvent refuser une prestation, signaler une personne ou classer une demande, et quand le système est biaisé ou inexpliqué, de vraies personnes subissent un préjudice qui se répète à grande échelle. La confiance envers le service, et l’équité élémentaire due dans toute décision gouvernementale, sont en jeu. C’est aussi une obligation légale : la Directive sur la prise de décisions automatisée rend obligatoires, pour les décisions automatisées fédérales, l’évaluation de l’incidence, l’avis, l’explication, les tests de biais, la supervision humaine et les recours, et l’ACS Plus est exigée dans les présentations au Conseil du Trésor. Un piège mérite d’être nommé : des « données représentatives » ne règlent pas tout, parce que les systèmes jugent quand même mal les personnes éloignées de la moyenne : les tests et le jugement humain restent donc nécessaires.',
    externalLinks: [
      {
        phrase: "Directive sur la prise de décisions automatisée",
        linkKey: "directive-automated-decision-making",
      },
      { phrase: "ACS Plus", linkKey: "gba-plus" },
    ] satisfies ExternalPhraseLink[],
  },

  happenedAtScaleCallout: {
    title: "C’est déjà arrivé, à grande échelle",
    body: {
      text:
        "Des décisions automatisées ont très mal tourné ailleurs. En Australie, le programme Robodebt a utilisé une méthode automatisée grossière pour dire à tort à environ 381 000 personnes qu’elles devaient de l’argent qu’elles ne devaient pas, dont quelque 746 millions de dollars australiens, et l’affaire s’est terminée par une commission royale d’enquête. Aux Pays-Bas, un algorithme de détection de la fraude a accusé à tort environ 26 000 familles de fraude aux allocations de garde d’enfants, a traité la double nationalité comme un facteur de risque et a contribué à faire tomber le gouvernement. Le Canada n’a pas connu d’échec de cette ampleur, et la Directive sur la prise de décisions automatisée ainsi que son évaluation de l’incidence existent pour que cela reste le cas. Le biais se mesure aussi : une étude du NIST a constaté que des systèmes de reconnaissance faciale identifiaient mal les visages asiatiques et noirs de 10 à 100 fois plus souvent que les visages blancs.",
      externalLinks: [
        { phrase: "le programme Robodebt", linkKey: "robodebt-royal-commission-report" },
        {
          phrase: "un algorithme de détection de la fraude",
          linkKey: "netherlands-childcare-fraud-algorithm-ap",
        },
        {
          phrase: "Directive sur la prise de décisions automatisée",
          linkKey: "directive-automated-decision-making",
        },
        { phrase: "une étude du NIST", linkKey: "nist-face-recognition-demographics-study" },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

  whoseJob: {
    intro: "Le fil Éthique et biais est partagé au sein de l’équipe, chaque rôle en portant une partie différente :",
    roles: [
      {
        role: "Scientifiques des données et développeurs",
        text: "bâtissent et mettent à l’essai le système, et vérifient les données et les résultats pour détecter les biais.",
      },
      {
        role: "Les équipes des données, de la protection de la vie privée et des services juridiques du ministère",
        text: "conseillent dès l’étape du concept, mènent l’examen par les pairs et aident à l’évaluation de l’incidence et à l’ACS Plus.",
      },
      {
        role: "Le responsable opérationnel de l’application",
        text: "veille à ce que les évaluations soient faites, à ce que la supervision humaine et les recours existent, et répond de décisions équitables et licites.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    blocks: [
      {
        title: "Le biais est un problème de conception, pas seulement un problème d’IA.",
        sections: [
          {
            text:
              "Bien avant toute IA, un service peut avantager certaines personnes et en exclure d’autres, par la personne pour qui il est conçu, par ce qu’il demande et par qui il oublie. L’ACS Plus est la méthode du gouvernement du Canada pour repérer cela : avant de bâtir, demandez qui est touché différemment et qui risque d’être laissé de côté, selon des facteurs qui se croisent comme le handicap, la langue, le revenu, l’âge et la géographie. Elle s’applique à tous les services, avec ou sans IA, et elle est exigée dans les présentations au Conseil du Trésor. Le volet des renseignements personnels rejoint la protection de la vie privée, et bâtir pour tout le monde rejoint l’accessibilité.",
            bold: [{ phrase: "ACS Plus" }],
            externalLinks: [{ phrase: "ACS Plus", linkKey: "gba-plus" }] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "privacy", to: THREADS.privacy.path },
              { phrase: "accessibility", to: THREADS.accessibility.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Si le service prend une décision, la Directive s’applique.",
        sections: [
          {
            text:
              "Quand un service automatise ou appuie une décision administrative au sujet d’une personne, la Directive sur la prise de décisions automatisée est obligatoire, quelle que soit la technologie. La première étape est l’évaluation de l’incidence algorithmique, un questionnaire qui classe le système dans l’un de quatre niveaux d’incidence. Le niveau fixe l’ampleur de ce que vous devez faire :",
            bold: [{ phrase: "Directive sur la prise de décisions automatisée" }],
            externalLinks: [
              {
                phrase: "Directive sur la prise de décisions automatisée",
                linkKey: "directive-automated-decision-making",
              },
              {
                phrase: "évaluation de l’incidence algorithmique",
                linkKey: "algorithmic-impact-assessment",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              "un avis indiquant que la décision est automatisée",
              "une explication claire de la façon dont elle a été prise",
              "des essais pour détecter les biais, avant le lancement et pendant l’exploitation",
              "une supervision humaine, renforcée à mesure que l’incidence augmente",
              "un moyen de contester la décision ou d’en appeler",
            ],
          },
          {
            text: "Vous remplissez l’évaluation à la conception, puis de nouveau avant la production, et vous la publiez.",
          },
        ],
      },
      {
        title: "Gardez une personne responsable, et surveillez les cas limites.",
        sections: [
          {
            text:
              "La responsabilité appartient à l’institution, jamais au système : une personne doit donc toujours pouvoir accéder à une véritable solution de rechange humaine et contester un résultat. Deux mises en garde méritent d’être retenues. Les systèmes moyens jugent mal les personnes qui sortent de l’ordinaire ou s’éloignent de la norme, et des données représentatives à elles seules n’y remédient pas (c’est ce qu’on appelle la discrimination statistique) ; mettez donc à l’essai auprès de différents groupes et gardez une personne dans la boucle. Et pour l’IA générative, suivez les principes « PRETES » ; pour une IA qui agit d’elle-même, gardez des limites étroites et un moyen de l’arrêter.",
            externalLinks: [
              {
                phrase: "une véritable solution de rechange humaine",
                linkKey: "can-asc-62-equitable-ai",
              },
              { phrase: "principes « PRETES »", linkKey: "generative-ai-faster" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies EthicsAndBiasCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Deux façons d’automatiser une décision",
    risky: {
      heading: "Vell",
      framing:
        "Voici Vell, agent de prestations. L’équipe exploite un service qui trie les demandes de prestations et a ajouté un modèle d’IA pour les noter automatiquement et faire gagner du temps au personnel :",
      items: [
        "entraîné sur les décisions passées, sans évaluation de l’incidence algorithmique ni ACS Plus",
        "aucun avis aux demandeurs indiquant que c’était automatisé, et aucun moyen d’en appeler",
        "résultats jamais mis à l’essai auprès de différents groupes",
      ],
      closing:
        "Résultat : le modèle a reproduit d’anciens biais sans que personne ne le remarque, rejetant de solides demandes provenant de certaines régions ; personne ne pouvait expliquer pourquoi une demande donnée avait obtenu une note faible, et il n’y avait aucune personne vers qui se tourner.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Voici Pax, agent de prestations. L’équipe exploite un service qui trie les demandes de prestations et a traité la notation automatique comme une décision au sujet de personnes :",
      items: [
        "mené une ACS Plus et une évaluation de l’incidence algorithmique avant de bâtir, et l’a publiée",
        "gardé l’IA au rang de recommandation, une personne tranchant au final",
        "mis les résultats à l’essai pour détecter les biais auprès de différents groupes, avant le lancement et pendant l’exploitation",
        "dit aux demandeurs qu’un outil était utilisé, donné une explication claire et offert un appel à une personne",
      ],
      closing:
        "Résultat : des décisions que les gens pouvaient comprendre et contester, moins de biais, et un système qui résiste à l’examen.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble le fil Éthique et biais à chaque phase",
    intro: "Le travail d’équité change de forme au fil de la vie d’un service.",
    blocks: [
      {
        title: "Create.",
        preview: "Évaluer qui le service touche, avant de bâtir.",
        popup: [
          {
            text:
              "Le travail d’équité est le moins coûteux et le plus efficace avant le lancement. L’équipe mène une ACS Plus pour voir qui le service touche différemment et, s’il automatise une décision, remplit une évaluation de l’incidence algorithmique pour établir le niveau d’incidence et les mesures de protection. La supervision humaine, une explication claire et un moyen d’en appeler sont prévus dès la conception, et les données et les résultats sont mis à l’essai pour détecter les biais avant toute mise en exploitation.",
            externalLinks: [
              { phrase: "ACS Plus", linkKey: "gba-plus" },
              {
                phrase: "évaluation de l’incidence algorithmique",
                linkKey: "algorithmic-impact-assessment",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Surveiller les résultats réels pour détecter les biais.",
        popup: [
          {
            text:
              "Une fois le service en exploitation, les données réelles peuvent révéler des biais que les essais n’ont pas vus : les résultats sont donc suivis auprès des différents groupes, et le modèle est ajusté ou réentraîné au besoin. L’évaluation de l’incidence est tenue à jour, et la personne dans la boucle comme la voie d’appel restent ouvertes et dotées de personnel. Si le service utilise l’IA générative, les principes « PRETES » continuent d’en guider l’utilisation.",
            externalLinks: [
              { phrase: "principes « PRETES »", linkKey: "generative-ai-faster" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Garder la trace, reporter l’équité sur la suite.",
        popup: [
          {
            text:
              "Quand un système décisionnel automatisé est retiré ou remplacé, on conserve les dossiers montrant comment les décisions ont été prises, pour que les gens puissent encore contester ou auditer des décisions passées, et les exigences d’équité (évaluation, supervision, recours) se reportent sur ce qui le remplace. Une décision automatisée laissée en marche sans surveillance est un risque pour l’équité : la mettre hors service correctement fait donc partie du travail.",
          },
        ],
      },
    ] satisfies EthicsAndBiasPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Au-delà de la Directive contraignante, de l’évaluation de l’incidence algorithmique et de l’ACS Plus déjà liées ci-dessus, quelques sources vont plus loin. Les douze principes directeurs pour l’utilisation de l’IA au gouvernement énoncent les attentes en matière d’ouverture et de responsabilité, et les principes du Commissariat à la protection de la vie privée y ajoutent l’angle de la vie privée et de l’équité. Pour un énoncé clair des valeurs éthiques que votre service devrait respecter, la Déclaration de Montréal pour un développement responsable de l’IA, faite au Canada, donne dix principes auxquels confronter une conception, et les travaux « IA et société » du CIFAR, menés dans le cadre de la Stratégie pancanadienne en matière d’IA, rassemblent la recherche canadienne sur les effets de l’IA sur les personnes. Quand vous voulez une idée concrète de la façon de vérifier un système plutôt que des principes seulement, le guide Introduction to AI assurance du gouvernement du Royaume-Uni parcourt les techniques que les équipes emploient pour vérifier qu’un système d’IA est équitable et fonctionne comme prévu. Pour la façon dont d’autres endroits abordent la question, le AI Risk Management Framework du NIST aux États-Unis et le règlement européen sur l’IA sont d’utiles compléments.",
    externalLinks: [
      { phrase: "principes directeurs", linkKey: "ai-guiding-principles" },
      { phrase: "les principes du Commissariat à la protection de la vie privée", linkKey: "opc-generative-ai-principles" },
      {
        phrase: "Déclaration de Montréal pour un développement responsable de l’IA",
        linkKey: "montreal-declaration-responsible-ai",
      },
      { phrase: "IA et société", linkKey: "cifar-ai-and-society" },
      { phrase: "Introduction to AI assurance", linkKey: "uk-introduction-to-ai-assurance" },
      { phrase: "AI Risk Management Framework du NIST", linkKey: "nist-ai-rmf" },
      { phrase: "règlement européen sur l’IA", linkKey: "eu-ai-act-summary" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Instrument directeur",
      linkKey: "directive-automated-decision-making" satisfies ExternalLinkKey,
      description:
        "Directive sur la prise de décisions automatisée (SCT) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592",
    },
    {
      label: "Instrument directeur",
      linkKey: "algorithmic-impact-assessment" satisfies ExternalLinkKey,
      description:
        "Évaluation de l’incidence algorithmique (SCT ; outil à code source libre, résultats publiés) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/algorithmic-impact-assessment.html",
    },
    {
      label: "Instrument directeur",
      linkKey: "gba-plus" satisfies ExternalLinkKey,
      description:
        "Analyse comparative entre les sexes plus (Femmes et Égalité des genres Canada ; exigée dans les présentations au CT) — https://www.canada.ca/en/women-gender-equality/gender-based-analysis-plus.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "responsible-use-ai-hub" satisfies ExternalLinkKey,
      description:
        "Utilisation responsable de l’intelligence artificielle au gouvernement (carrefour, SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "ai-guiding-principles" satisfies ExternalLinkKey,
      description:
        "Principes directeurs pour l’utilisation de l’IA au gouvernement (SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/principles.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "generative-ai-faster" satisfies ExternalLinkKey,
      description:
        "Guide sur l’utilisation de l’intelligence artificielle générative, les principes « PRETES » (SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/guide-use-generative-ai.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "agentic-ai-guide" satisfies ExternalLinkKey,
      description:
        "Guide sur l’utilisation de l’intelligence artificielle agentive (SCT) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/guide-use-agentic-artificial-antelligence.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "can-asc-62-equitable-ai" satisfies ExternalLinkKey,
      description:
        "CAN-ASC-6.2 Systèmes d’intelligence artificielle accessibles et équitables (Normes d’accessibilité Canada) — https://accessible.canada.ca/creating-accessibility-standards/asc-62-accessible-equitable-artificial-intelligence-systems",
    },
    {
      label: "Référence complémentaire",
      linkKey: "opc-generative-ai-principles" satisfies ExternalLinkKey,
      description:
        "CPVP, Principes pour des technologies de l’intelligence artificielle (IA) générative responsables, dignes de confiance et respectueuses de la vie privée — https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "statcan-ai" satisfies ExternalLinkKey,
      description:
        "Utilisation de l’intelligence artificielle à Statistique Canada + Cadre pour l’apprentissage automatique responsable — https://www.statcan.gc.ca/en/trust/collecting-your-data/artificial-intelligence",
    },
    {
      label: "Référence complémentaire",
      linkKey: "nist-ai-rmf" satisfies ExternalLinkKey,
      description:
        "AI Risk Management Framework (AI RMF 1.0) du NIST, cadre de gestion des risques liés à l’IA (États-Unis) — https://www.nist.gov/itl/ai-risk-management-framework",
    },
    {
      label: "Référence complémentaire",
      linkKey: "oecd-ai-principles" satisfies ExternalLinkKey,
      description: "Principes de l’OCDE sur l’IA — https://oecd.ai/en/ai-principles",
    },
    {
      label: "Référence complémentaire",
      linkKey: "eu-ai-act-summary" satisfies ExternalLinkKey,
      description:
        "Règlement européen sur l’IA, résumé de haut niveau — https://artificialintelligenceact.eu/high-level-summary/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "montreal-declaration-responsible-ai" satisfies ExternalLinkKey,
      description:
        "Déclaration de Montréal pour un développement responsable de l’IA — https://montrealdeclaration-responsibleai.com/the-declaration/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cifar-ai-and-society" satisfies ExternalLinkKey,
      description:
        "CIFAR, IA et société (Stratégie pancanadienne en matière d’IA) — https://cifar.ca/ai/ai-and-society/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-introduction-to-ai-assurance" satisfies ExternalLinkKey,
      description:
        "DSIT du Royaume-Uni, Introduction to AI assurance, introduction à l’assurance de l’IA — https://www.gov.uk/government/publications/introduction-to-ai-assurance",
    },
    {
      label: "Instrument directeur",
      linkKey: "gc-ai-strategy",
      description:
        "Stratégie en matière d’intelligence artificielle pour la fonction publique fédérale 2025-2027 (SCT) : le cadre général de l’adoption responsable de l’IA.",
    },
    {
      label: "Modèles et outils",
      linkKey: "guide-peer-review-ads",
      description:
        "Guide sur l’examen par les pairs des systèmes décisionnels automatisés (SCT) : l’examen obligatoire à partir du niveau d’incidence 2, publié avant la production.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "guide-scope-dadm",
      description:
        "Guide sur la portée de la Directive sur la prise de décisions automatisée (SCT) : la première question, celle de savoir si la directive s’applique.",
    },
  ] satisfies SourceItem[],
} as const;
