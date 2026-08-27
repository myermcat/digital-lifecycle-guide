import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import { OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
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

export type UserResearchLinkedProse = ThreadLinkedProse;
export type UserResearchContentSection = ThreadContentSection;
export type UserResearchCloserLookBlock = ThreadCloserLookBlock;
export type UserResearchPhasePreviewBlock = ThreadPhasePreviewBlock;

export const userResearchSectionsPlainText = threadSectionsPlainText;
export const userResearchLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const userResearchWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const USER_RESEARCH_THREAD = {
  title: "Recherche sur les utilisateurs",
  slug: "user-research" as const,

  lead: {
    text:
      "La recherche sur les utilisateurs consiste à apprendre ce dont les personnes qui utiliseront un service ont réellement besoin, en les étudiant et en testant avec elles, plutôt qu’en devinant. Le gouvernement du Canada place cela en tête de ses normes relatives au numérique : faire de la recherche avec les utilisateurs pour comprendre leurs besoins, et tester avec eux pour orienter ce qui est construit. Un service bâti sur ce que quelques personnes supposent que les utilisateurs veulent est la façon la plus courante dont les services échouent. Les décisions sur les personnes à écouter et sur ce qu’il faut découvrir se prennent tôt et se répètent à mesure que le service change.",
    externalLinks: [
      { phrase: "normes relatives au numérique", linkKey: "design-with-users" },
    ] satisfies ExternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    {
      text: "De vrais utilisateurs sont étudiés avant que la conception soit arrêtée, pour que le service réponde à un besoin qu’ils ont vraiment.",
    },
    {
      text: "Le service est testé avec de vraies personnes tout au long, y compris avant le lancement et à mesure qu’il change.",
      externalLinks: [
        { phrase: "testé avec de vraies personnes", linkKey: "nng-usability-testing-101" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Les personnes visées par la recherche reflètent qui utilise réellement le service, y compris les personnes qui se servent de technologies d’assistance et celles qui font face à des obstacles de langue, de littératie ou de distance.",
      internalLinks: [
        {
          phrase: "technologies d’assistance",
          to: THREADS.accessibility.path,
        },
      ] satisfies InternalPhraseLink[],
    },
    {
      text: "Les constats sont partagés avec l’équipe et transformés en travail priorisé.",
      internalLinks: [{ phrase: "travail priorisé", to: THREADS.backlog.path }] satisfies InternalPhraseLink[],
    },
    {
      text: "La recherche se poursuit sur toute la vie du service : découverte, construction, tests, et après le lancement.",
    },
    {
      text: "Après le lancement, les commentaires des clients et l’analytique continuent de montrer quoi améliorer.",
      externalLinks: [{ phrase: "commentaires des clients", linkKey: "gc-page-feedback" }] satisfies ExternalPhraseLink[],
    },
    {
      text: 'Un « arrêt » est un résultat valable : si la recherche montre que le service n’est pas nécessaire, cela compte comme une réussite.',
    },
    {
      text: "La recherche est planifiée et financée, avec consentement, protection de la vie privée et compensation équitable des participants.",
    },
  ] satisfies UserResearchLinkedProse[],

  whyItMatters: {
    text:
      "La plupart des logiciels gouvernementaux qui échouent échouent parce qu’ils ont été bâtis sur ce que quelques personnes supposaient que les utilisateurs voulaient, plutôt que sur ce dont les utilisateurs ont besoin. La recherche est la façon la moins coûteuse d’éviter de construire la mauvaise chose, et c’est pourquoi on la présente comme une réduction du risque à ceux qui financent et possèdent les services. Elle est aussi exigée : la norme « Concevoir avec les utilisateurs » établit l’attente, et la Directive sur les services et le numérique rend le cadre désigné responsable de veiller à ce que les commentaires des clients et les tests d’expérience utilisateur soient recueillis et utilisés pour améliorer le service. Les causes d’échec habituelles sont ordinaires : deviner les besoins, tester trop tard, et n’entendre que les intervenants.",
    externalLinks: [
      { phrase: "Concevoir avec les utilisateurs", linkKey: "design-with-users" },
      { phrase: "Directive sur les services et le numérique", linkKey: "guideline-service-digital" },
    ] satisfies ExternalPhraseLink[],
  },

  whoseJob: {
    intro: "La recherche sur les utilisateurs est partagée au sein de l’équipe, chaque rôle en portant une partie différente :",
    roles: [
      {
        role: "Chercheurs en expérience utilisateur et concepteurs de services",
        text: "planifient et mènent la recherche et la transforment en constats sur lesquels l’équipe peut agir.",
      },
      {
        role: "Concepteurs et rédacteurs de contenu",
        text: "transforment ces constats en conception et en contenu en langage clair.",
      },
      {
        role: "Développeurs",
        text: "construisent ce qui est testé et itèrent sur ce que la recherche révèle.",
      },
      {
        role: "Le responsable opérationnel de l’application",
        text: 'veille à ce que la recherche soit planifiée, financée et suivie d’effet, et accepte un « arrêt » comme un résultat valable.',
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    blocks: [
      {
        title: "La recherche, c’est plus que des tests.",
        sections: [
          {
            text:
              "La recherche sur les utilisateurs est le terme général : comprendre qui sont vos utilisateurs et ce dont ils ont besoin dans l’ensemble du service. Le test d’utilisabilité, qui consiste à observer de vraies personnes tenter de vraies tâches avec votre conception, est une méthode parmi d’autres, celle vers laquelle on se tourne pour trouver et corriger les problèmes d’une chose construite ou prototypée. Le champ des méthodes est vaste, et la façon la plus simple de choisir est de partir de la question : les méthodes qualitatives (entretiens, tests d’utilisabilité) répondent au « pourquoi », et les méthodes quantitatives (analytique, tests A/B) répondent au « combien ». Utilisez celle qui convient à la décision devant vous.",
            bold: [{ phrase: "recherche sur les utilisateurs" }, { phrase: "test d’utilisabilité" }],
            externalLinks: [
              { phrase: "Le champ des méthodes", linkKey: "nng-ux-research-methods" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Tester avec de vraies personnes, et peu suffisent.",
        sections: [
          {
            text:
              "Vous n’avez pas besoin d’une grande étude. Tester avec environ cinq utilisateurs par groupe fait ressortir la plupart des problèmes courants, et une petite ronde peut se dérouler en quelques jours. Les tests peuvent être modérés (quelqu’un guide la séance) ou non modérés (un outil la mène), en personne ou à distance. Le but est d’observer de vraies personnes, y compris des personnes qui se servent de technologies d’assistance, tenter de vraies tâches, parce qu’un service peut paraître correct à l’équipe et déjouer quand même la personne qui l’utilise. Le test d’utilisabilité est le point de départ le plus simple.",
            bold: [{ phrase: "cinq utilisateurs" }],
            internalLinks: [
              {
                phrase: "technologies d’assistance",
                to: THREADS.accessibility.path,
              },
            ] satisfies InternalPhraseLink[],
            externalLinks: [
              { phrase: "test d’utilisabilité", linkKey: "nng-usability-testing-101" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Inclure tout le monde.",
        sections: [
          {
            text:
              "La recherche ne vaut que par les personnes qui y participent. Recrutez un échantillon qui reflète les utilisateurs réels sur les plans du handicap, de la langue, de la littératie, de l’âge et de la distance, en allant au-delà des personnes faciles à joindre. Les accommodements qui aident les participants handicapés à prendre part — documents accessibles, vérification technique, horaire souple — tendent à aider tout le monde. Rattachez ce que vous apprenez aux besoins et aux objectifs des personnes, plutôt qu’au handicap de l’une d’elles. C’est un terrain commun avec l’accessibilité, où construire pour tous est la loi.",
            internalLinks: [
              { phrase: "accessibility", to: THREADS.accessibility.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
    ] satisfies UserResearchCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Deux façons de faire de la recherche sur les utilisateurs",
    risky: {
      heading: "Vell",
      framing: "Voici Vell, agent de programme. L’équipe a construit le portail de subventions sur ce qu’elle supposait que les demandeurs voulaient :",
      items: [
        "n’a parlé qu’à quelques gestionnaires, jamais à un vrai demandeur",
        "a testé le service fini une seule fois, la semaine avant le lancement",
        "n’a partagé aucun constat, parce qu’il n’y en avait aucun à partager",
      ],
      closing:
        "Le résultat : les demandeurs n’arrivaient pas à comprendre comment amorcer une demande, le centre d’appels a été submergé dès la première semaine, et les correctifs ont exigé de refaire des écrans déjà en service.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Voici Pax, agent de programme. L’équipe a fait de la recherche sur le portail de subventions avec les personnes qui l’utiliseraient :",
      items: [
        "a interviewé de vrais demandeurs pendant la découverte pour apprendre ce dont ils avaient réellement besoin",
        "a testé des prototypes avec environ cinq utilisateurs par ronde, dont une personne se servant d’un lecteur d’écran, et a corrigé ce qu’ils ont trouvé",
        "a partagé les constats avec l’équipe et gardé un canal de rétroaction ouvert après le lancement",
      ],
      closing:
        "Le résultat : les demandeurs pouvaient remplir une demande seuls, les appels ont chuté, et les changements ont été petits parce que les gros problèmes avaient été détectés tôt.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble la recherche sur les utilisateurs à chaque phase",
    intro: "La recherche change de forme au fil de la vie d’un service.",
    blocks: [
      {
        title: "Create.",
        preview: "Apprendre ce dont les gens ont besoin avant de construire.",
        popup: [
          {
            text:
              'La recherche la plus utile se fait avant qu’on ait beaucoup construit. L’équipe détermine qui sont les utilisateurs, les interroge et les observe pour trouver le vrai besoin, et met à l’essai de premiers prototypes avec une poignée de personnes à chaque ronde. C’est aussi là qu’un « arrêt » peut être la bonne réponse : si la recherche montre que le service n’est pas nécessaire, c’est un résultat qui vaut la peine d’être obtenu avant que de l’argent soit dépensé. Les orientations « Concevoir avec les utilisateurs » parcourent les étapes Découvrir et Construire.',
            externalLinks: [
              { phrase: "Concevoir avec les utilisateurs", linkKey: "design-with-users" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "la bonne réponse", to: OPTIONS_ANALYSIS_PATH },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Continuer de tester, et continuer d’écouter.",
        popup: [
          {
            text:
              "Une fois le service en fonction, la recherche ne s’arrête pas. L’équipe continue de tester à mesure que le service change, et observe comment les gens l’utilisent réellement au moyen des commentaires des clients et de l’analytique, puis améliore par petites touches. Agir sur ce qui revient est la partie qui est exigée et celle qu’on omet le plus souvent.",
            externalLinks: [
              { phrase: "commentaires des clients", linkKey: "gc-page-feedback" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Faire de la recherche sur le passage, ou sur la fin.",
        popup: [
          {
            text:
              "Quand un service est mis hors service ou remplacé, la recherche aide encore. S’il est remplacé, la même compréhension des besoins des utilisateurs façonne le nouveau service, et le passage est testé avec de vraies personnes pour que personne ne reste en plan. S’il est mis hors service, la recherche vous dit si le besoin a vraiment disparu et comment les gens accompliront la tâche autrement.",
          },
        ],
      },
    ] satisfies UserResearchPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Pour savoir comment s’y prendre concrètement, le Guide de recherche sur les utilisateurs et le Guide de conception de services de l’Ontario sont des références canadiennes réutilisables sur ce qu’il faut planifier, financer et attendre. Pour voir la recherche fédérale en pratique, les résumés de recherche de Canada.ca montrent comment le gouvernement du Canada a testé de vrais services et ce qu’il a changé en conséquence. Pour les bases de l’apprentissage sur les utilisateurs et leurs besoins, le Service Manual du Royaume-Uni parcourt la rédaction et la validation des besoins, et l’introduction en langage clair de l’Interaction Design Foundation sur la recherche sur les utilisateurs est une bonne première lecture si la discipline vous est nouvelle.",
    externalLinks: [
      { phrase: "Guide de recherche sur les utilisateurs", linkKey: "ontario-user-research-guide" },
      { phrase: "Guide de conception de services de l’Ontario", linkKey: "ontario-service-design-playbook" },
      { phrase: "les résumés de recherche de Canada.ca", linkKey: "design-canada-research-summaries" },
      {
        phrase: "l’apprentissage sur les utilisateurs et leurs besoins",
        linkKey: "uk-start-by-learning-user-needs",
      },
      { phrase: "recherche sur les utilisateurs", linkKey: "ixdf-user-research" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Instrument directeur",
      linkKey: "design-with-users" satisfies ExternalLinkKey,
      description:
        'Normes relatives au numérique du GC, « Concevoir avec les utilisateurs » (SCT) — https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/design-with-users.html',
    },
    {
      label: "Instrument directeur",
      linkKey: "guideline-service-digital" satisfies ExternalLinkKey,
      description:
        "Directive sur les services et le numérique (SCT), art. 4.2.1.1 sur les commentaires des clients et les tests d’expérience utilisateur, par la Ligne directrice sur les services et le numérique — https://www.canada.ca/en/government/system/digital-government/guideline-service-digital.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "ontario-user-research-guide" satisfies ExternalLinkKey,
      description:
        "Guide de recherche sur les utilisateurs de l’Ontario (Service numérique de l’Ontario, CC-BY; réutilisable, provincial) — https://www.ontario.ca/page/user-research-guide",
    },
    {
      label: "Référence complémentaire",
      linkKey: "ontario-service-design-playbook" satisfies ExternalLinkKey,
      description:
        "Guide de conception de services de l’Ontario (SNO, CC-BY; réutilisable, provincial) — https://www.ontario.ca/page/service-design-playbook",
    },
    {
      label: "Référence complémentaire",
      linkKey: "cds-build-first-users-first" satisfies ExternalLinkKey,
      description:
        "Service numérique canadien, « From build first to users first » — https://digital.canada.ca/2018/11/29/from-build-first-to-users-first/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-page-feedback" satisfies ExternalLinkKey,
      description:
        "Outil de rétroaction sur les pages de Canada.ca (EDSC) — https://design.canada.ca/feedback/index.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "nng-ux-research-methods" satisfies ExternalLinkKey,
      description:
        "Nielsen Norman Group, « Which UX research methods to use when » — https://www.nngroup.com/articles/which-ux-research-methods/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "nng-usability-testing-101" satisfies ExternalLinkKey,
      description:
        "Nielsen Norman Group, « Usability Testing 101 » — https://www.nngroup.com/articles/usability-testing-101/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "18f-derisking" satisfies ExternalLinkKey,
      description:
        "18F, « De-risking Government Technology » — https://guides.18f.gov/derisking/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "18f-accessibility-in-research" satisfies ExternalLinkKey,
      description:
        "18F, accessibilité dans la recherche — https://guides.18f.gov/ux-guide/research/accessibility/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "australia-dta-understand-user-needs" satisfies ExternalLinkKey,
      description:
        "Digital Service Standard, critère 2 : connaître son utilisateur (Australie) — https://www.digital.gov.au/policy/digital-experience/digital-service-standard/criterion-2",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-service-manual-user-research" satisfies ExternalLinkKey,
      description:
        "Service Manual du Royaume-Uni, recherche sur les utilisateurs — https://www.gov.uk/service-manual/user-research",
    },
    {
      label: "Référence complémentaire",
      linkKey: "design-canada-research-summaries" satisfies ExternalLinkKey,
      description:
        "Résumés de recherche de Canada.ca — https://design.canada.ca/research-summaries/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-start-by-learning-user-needs" satisfies ExternalLinkKey,
      description:
        "Service Manual du Royaume-Uni, apprendre à connaître les utilisateurs et leurs besoins — https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs",
    },
    {
      label: "Référence complémentaire",
      linkKey: "ixdf-user-research" satisfies ExternalLinkKey,
      description:
        "Interaction Design Foundation, « What is User Research? » — https://www.interaction-design.org/literature/topics/user-research",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gba-plus",
      description:
        "Analyse comparative entre les sexes plus (Femmes et Égalité des genres Canada) : qui un service touche différemment; exigée dans les présentations au Conseil du Trésor.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "design-research",
      description:
        "Système de design de Canada.ca, mode d’emploi de la recherche et des tests : méthodes pour tester avec les utilisateurs.",
    },
    {
      label: "Collectivités",
      linkKey: "gc-ux-network",
      description:
        "Réseau UX du gouvernement du Canada : praticiens de la recherche sur les utilisateurs dans l’ensemble du gouvernement; aussi sur GCXchange, cherchez le nom.",
    },
  ] satisfies SourceItem[],
} as const;
