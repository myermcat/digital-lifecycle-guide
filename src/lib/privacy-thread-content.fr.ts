import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import { THREADS } from "@/lib/guide-strings";
import {
  threadLeadPlainText,
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  type ThreadCloserLookBlock,
  type ThreadContentSection,
  type ThreadLead,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type PrivacyLinkedProse = ThreadLinkedProse;
export type PrivacyOrderedListSection = Extract<ThreadContentSection, { type: "orderedList" }>;
export type PrivacyContentSection = ThreadContentSection;
export type PrivacyCloserLookBlock = ThreadCloserLookBlock;
export type PrivacyPhasePreviewBlock = ThreadPhasePreviewBlock;

export const privacySectionsPlainText = threadSectionsPlainText;
export const privacyLeadPlainText = (lead: ThreadLead) => threadLeadPlainText(lead);
export const privacyWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const PRIVACY_THREAD = {
  title: "Protection de la vie privée",
  slug: "privacy" as const,

  lead: {
    text:
      "La protection de la vie privée traverse toute la vie d’un service qui traite des renseignements personnels, du premier croquis de conception au jour où les données sont détruites. Un renseignement personnel est tout ce qui peut identifier une personne : un nom, un numéro de dossier, une adresse, une adresse IP. La Loi sur la protection des renseignements personnels du Canada fixe les règles régissant la façon dont une institution fédérale peut les recueillir, les utiliser et les communiquer. Les décisions qui façonnent la protection de la vie privée d’un service se prennent tôt et sont réexaminées à mesure qu’il change : quels renseignements personnels recueillir, comment les protéger, et quand réévaluer le risque.",
    externalLinks: [{ phrase: "Loi sur la protection des renseignements personnels", linkKey: "privacy-act" }] satisfies ExternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    { text: "Seuls les renseignements personnels dont le service a véritablement besoin sont recueillis, et rien de plus." },
    {
      text: "Une évaluation des facteurs relatifs à la vie privée est faite avant le lancement et tenue à jour à mesure que le service change.",
      externalLinks: [
        { phrase: "évaluation des facteurs relatifs à la vie privée", linkKey: "digital-privacy-playbook-pia" },
      ] satisfies ExternalPhraseLink[],
    },
    { text: "La protection de la vie privée est intégrée à la conception dès le départ." },
    {
      text: "Les gens sont informés de ce qui est recueilli et pourquoi, dans un avis de confidentialité.",
      externalLinks: [
        { phrase: "avis de confidentialité", linkKey: "digital-privacy-playbook-privacy-notices" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Les renseignements personnels sont protégés par des mesures adaptées à leur sensibilité.",
    },
    {
      text: "Les renseignements personnels ne sont conservés qu’aussi longtemps qu’ils sont nécessaires (les renseignements administratifs au moins deux ans après leur dernière utilisation), puis font l’objet d’une disposition.",
    },
    { text: "Le personnel qui traite des renseignements personnels a reçu une formation sur la protection de la vie privée." },
    {
      text: "Une atteinte à la vie privée a un plan répété : contenir, évaluer le préjudice, aviser les personnes touchées, la signaler.",
    },
  ] satisfies PrivacyLinkedProse[],

  whyItMatters: {
    text:
      "Quand la protection de la vie privée échoue, de vraies personnes subissent un préjudice : leurs renseignements sont exposés, utilisés d’une façon qu’elles n’attendaient pas, ou perdus. La confiance envers le service, et envers le gouvernement, est longue à regagner. La plupart des problèmes de protection de la vie privée sont évitables et remontent aux mêmes causes : recueillir plus que nécessaire, conserver trop longtemps, ou ne jamais évaluer le risque. Les règles du gouvernement du Canada en la matière sont la Loi sur la protection des renseignements personnels et la Directive sur les pratiques relatives à la protection de la vie privée du Conseil du Trésor, qui depuis 2024 intègre l’obligation de faire une évaluation des facteurs relatifs à la vie privée. Le Guide sur les pratiques relatives à la vie privée numérique transforme ces règles en étapes qu’une équipe peut suivre.",
    externalLinks: [
      { phrase: "Loi sur la protection des renseignements personnels", linkKey: "privacy-act" },
      { phrase: "Directive sur les pratiques relatives à la protection de la vie privée", linkKey: "directive-privacy-practices" },
      { phrase: "Guide sur les pratiques relatives à la vie privée numérique", linkKey: "digital-privacy-playbook" },
    ] satisfies ExternalPhraseLink[],
  },

  whoseJob: {
    intro: "La protection de la vie privée est partagée au sein de l’équipe, chaque rôle en portant une partie différente :",
    roles: [
      {
        role: "Le bureau de la protection de la vie privée ou de l’AIPRP du ministère",
        text: "examine l’évaluation des facteurs relatifs à la vie privée et conseille sur la Loi sur la protection des renseignements personnels.",
      },
      {
        role: "Développeurs",
        text: "construisent les mesures de protection et ne recueillent que ce que la conception exige.",
      },
      {
        role: "Le responsable opérationnel",
        text: "de l’application décide quels renseignements personnels le service exige, veille à ce que l’évaluation soit faite avant le lancement, et accepte le risque résiduel en matière de vie privée.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    blocks: [
      {
        title: "L’évaluation des facteurs relatifs à la vie privée.",
        sections: [
          {
            text:
              "Une évaluation des facteurs relatifs à la vie privée (ÉFVP) est la vérification officielle de ce qui pourrait mal tourner avec les renseignements personnels qu’un service traite, faite avant son lancement. Elle consigne :",
            bold: [{ phrase: "évaluation des facteurs relatifs à la vie privée" }],
            externalLinks: [
              { phrase: "évaluation des facteurs relatifs à la vie privée", linkKey: "digital-privacy-playbook-pia" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              "ce qui est recueilli, et pourquoi",
              "le pouvoir légal de les recueillir",
              "la circulation des données",
              "la façon dont elles sont protégées, et combien de temps elles sont conservées",
              "les risques, et la façon dont ils seront réduits",
            ],
          },
          {
            text:
              "Elle est déclenchée chaque fois qu’un service utilise des renseignements personnels pour prendre une décision au sujet de quelqu’un, ou modifie cette utilisation : quand un formulaire de prestations papier passe en ligne, par exemple, l’ÉFVP est mise à jour avant que le nouveau service soit mis en service. En vertu de la Directive sur les pratiques relatives à la protection de la vie privée, une ÉFVP est exigée, et le Guide sur les pratiques relatives à la vie privée numérique la parcourt étape par étape. Le Commissariat à la protection de la vie privée examine une ÉFVP et donne des conseils, mais ne l’approuve pas; l’approbation demeure celle de l’institution.",
            externalLinks: [
              { phrase: "Directive sur les pratiques relatives à la protection de la vie privée", linkKey: "directive-privacy-practices" },
              { phrase: "Guide sur les pratiques relatives à la vie privée numérique", linkKey: "digital-privacy-playbook-pia" },
              { phrase: "Commissariat à la protection de la vie privée", linkKey: "opc-pia-expectations" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text:
              "Si votre service utilise ces renseignements pour prendre des décisions automatisées au sujet de personnes, voir Éthique et biais.",
            internalLinks: [
              { phrase: "Éthique et biais", to: THREADS["ethics-and-bias"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Intégrer la protection de la vie privée dès le départ.",
        sections: [
          {
            text:
              "Concevoir la protection de la vie privée tôt coûte bien moins cher que de la corriger après le lancement. L’idée a un nom, la protection de la vie privée dès la conception, et ses sept principes ont été rédigés au Canada et sont aujourd’hui utilisés dans le monde entier : opter par défaut pour le réglage le plus privé, recueillir le moins possible, être transparent à ce sujet. L’Évaluation technologique des répercussions sur la vie privée de Services partagés Canada est un exemple au GC de cette évaluation menée tôt, au niveau de la technologie.",
            externalLinks: [
              { phrase: "sept principes", linkKey: "privacy-by-design-principles" },
              {
                phrase: "Évaluation technologique des répercussions sur la vie privée",
                linkKey: "ssc-tapi",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Dire aux gens ce que vous recueillez.",
        sections: [
          {
            text:
              "Les gens ont le droit de savoir ce qu’un service recueille et pourquoi, avant de le remettre. C’est le rôle de l’avis de confidentialité, en mots simples et au bon endroit. Un avis complet dit sept choses :",
            bold: [{ phrase: "avis de confidentialité" }, { phrase: "sept choses" }],
            externalLinks: [
              { phrase: "avis de confidentialité", linkKey: "digital-privacy-playbook-privacy-notices" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              "pourquoi les renseignements sont recueillis",
              "le pouvoir légal de les recueillir",
              "s’ils seront communiqués",
              "ce qui arrive à quelqu’un qui ne les fournit pas",
              "son droit de les consulter et de les corriger",
              "le fichier de renseignements personnels dans lequel ils sont conservés",
              "comment porter plainte au Commissariat à la protection de la vie privée",
            ],
          },
          {
            text: "Il est facile à oublier, et c’est la partie que le public voit réellement.",
          },
        ],
      },
    ] satisfies PrivacyCloserLookBlock[],
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble la protection de la vie privée à chaque phase",
    intro: "Le travail de protection de la vie privée change de forme au fil de la vie d’un service.",
    blocks: [
      {
        title: "Create.",
        preview: "Décider ce que vous recueillez, et l’évaluer avant le lancement.",
        popup: [
          {
            text:
              "L’essentiel de la protection de la vie privée se décide avant que le service existe. L’équipe énumère les renseignements personnels que le service détiendra et détermine le minimum qu’elle peut recueillir (en recueillir plus que nécessaire est un passif), confirme qu’elle a le pouvoir légal de les recueillir, choisit des réglages privés par défaut, et mène l’évaluation des facteurs relatifs à la vie privée tôt, pendant qu’il est encore peu coûteux de changer la conception. L’avis de confidentialité est rédigé, les mesures de protection et les contrôles d’accès sont construits, un plan de conservation et de disposition est écrit, et le personnel qui traitera les données est formé. Si un fournisseur détient ou traite les renseignements personnels, les exigences de protection de la vie privée sont inscrites au contrat pour qu’il y soit tenu. La liste de vérification du Guide sur les pratiques relatives à la vie privée numérique expose ces étapes de planification et de conception.",
            externalLinks: [
              { phrase: "évaluation des facteurs relatifs à la vie privée", linkKey: "digital-privacy-playbook-pia" },
              {
                phrase: "liste de vérification du Guide sur les pratiques relatives à la vie privée numérique",
                linkKey: "digital-privacy-playbook-checklist",
              },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "inscrites au contrat", to: GOOD_CONTRACT_PATH },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Tenir l’évaluation à jour et guetter les atteintes.",
        popup: [
          {
            text:
              "Une fois le service en fonction, le travail de protection de la vie privée se poursuit. L’avis de confidentialité est publié avant que toute collecte commence et tenu exact, l’évaluation des facteurs relatifs à la vie privée est mise à jour chaque fois que le service commence à recueillir ou à utiliser des renseignements personnels d’une nouvelle façon, et l’accès aux données est limité et journalisé.",
          },
          {
            text: "Si une atteinte à la vie privée survient, un plan répété se déclenche :",
          },
          {
            type: "orderedList",
            items: [
              "la contenir",
              "évaluer le préjudice",
              "aviser les personnes touchées",
              "la signaler",
            ],
          },
          {
            text:
              "Le Commissariat à la protection de la vie privée est l’interlocuteur d’une institution fédérale, et il fournit un formulaire de déclaration d’atteinte. Les mesures qui gardent les données verrouillées sont traitées sous « garder le service sécurisé ».",
            externalLinks: [
              { phrase: "Commissariat à la protection de la vie privée", linkKey: "opc-federal-institutions" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "garder le service sécurisé", to: THREADS.security.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Transférer ou éliminer les renseignements personnels de la bonne façon.",
        popup: [
          {
            text: "Un service est éventuellement remplacé ou mis hors service, et les renseignements personnels doivent être traités dans les deux cas.",
          },
          {
            text:
              "Si le service est remplacé, les renseignements passent au nouveau service, et l’évaluation des facteurs relatifs à la vie privée et l’avis de confidentialité sont réexaminés pour leur nouveau foyer.",
            bold: [{ phrase: "replaced" }],
          },
          {
            text:
              "Si le service est mis hors service, les renseignements sont conservés ou détruits selon leur calendrier de conservation et de disposition, archivés au besoin, et détruits de façon sécuritaire pour qu’ils ne puissent pas être récupérés.",
            bold: [{ phrase: "retired" }],
            internalLinks: [
              {
                phrase: "calendrier de conservation et de disposition",
                to: THREADS["data-stewardship"].path,
              },
            ] satisfies InternalPhraseLink[],
          },
          {
            text: "Un service qui détient des renseignements personnels au-delà du moment où ils sont nécessaires constitue un risque permanent pour la vie privée.",
          },
        ],
      },
    ] satisfies PrivacyPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Pour un tour d’horizon en langage clair de vos obligations sous la Loi sur la protection des renseignements personnels, le document « La Loi sur la protection des renseignements personnels en bref » du Commissariat à la protection de la vie privée parcourt ce qui constitue un renseignement personnel et les règles de collecte, d’utilisation, de conservation et de communication. Pour voir l’idée canadienne de la protection de la vie privée dès la conception expliquée par l’organisme de réglementation provincial qui l’a formulée, la ressource « Privacy by Design » du Commissaire à l’information et à la protection de la vie privée de l’Ontario réunit les sept principes au même endroit. Et pour une façon structurée d’évaluer et de gérer le risque en matière de vie privée dans tout un service, le NIST Privacy Framework des États-Unis offre un outil volontaire que beaucoup d’organisations utilisent pour organiser ce travail. Pour la façon dont d’autres administrations abordent la même évaluation, les orientations de l’ICO du Royaume-Uni sur les évaluations des incidences relatives à la protection des données exposent un processus clair en sept étapes, et l’article 25 du RGPD montre comment la protection de la vie privée dès la conception est devenue une loi contraignante dans l’Union européenne.",
    externalLinks: [
      { phrase: "La Loi sur la protection des renseignements personnels en bref", linkKey: "opc-privacy-act-in-brief" },
      { phrase: "Privacy by Design", linkKey: "ontario-ipc-privacy-by-design" },
      { phrase: "NIST Privacy Framework", linkKey: "nist-privacy-framework" },
      {
        phrase: "orientations de l’ICO du Royaume-Uni sur les évaluations des incidences relatives à la protection des données",
        linkKey: "uk-ico-dpia",
      },
      { phrase: "l’article 25 du RGPD", linkKey: "gdpr-article-25" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Instrument directeur",
      linkKey: "privacy-act" satisfies ExternalLinkKey,
      description: "Loi sur la protection des renseignements personnels — https://laws-lois.justice.gc.ca/eng/acts/P-21/",
    },
    {
      label: "Instrument directeur",
      linkKey: "directive-privacy-practices" satisfies ExternalLinkKey,
      description:
        "Directive sur les pratiques relatives à la protection de la vie privée (SCT, intègre la Norme sur l’évaluation des facteurs relatifs à la vie privée) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=18309",
    },
    {
      label: "Référence complémentaire",
      linkKey: "digital-privacy-playbook" satisfies ExternalLinkKey,
      description:
        "Guide sur les pratiques relatives à la vie privée numérique (SCT) — page des évaluations des facteurs relatifs à la vie privée, liste de vérification sur la protection de la vie privée, et page des avis de confidentialité.",
    },
    {
      label: "Référence complémentaire",
      linkKey: "opc-pia-expectations" satisfies ExternalLinkKey,
      description:
        "CPVP, Guide sur le processus d’évaluation des facteurs relatifs à la vie privée (Attentes) — https://www.priv.gc.ca/en/privacy-topics/federal-government-privacy/privacy-impact-assessments/gd_exp_202003/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "opc-federal-institutions" satisfies ExternalLinkKey,
      description: "CPVP, Pour les institutions fédérales — https://www.priv.gc.ca/en/for-federal-institutions/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "privacy-by-design-principles" satisfies ExternalLinkKey,
      description:
        "Privacy by Design : les 7 principes fondamentaux (Ann Cavoukian, Canada) — https://www.sfu.ca/~palys/Cavoukian-2011-PrivacyByDesign-7FoundationalPrinciples.pdf",
    },
    {
      label: "Référence complémentaire",
      linkKey: "ssc-tapi" satisfies ExternalLinkKey,
      description:
        "SPC, Évaluation technologique des répercussions sur la vie privée (ETRVP) — https://www.canada.ca/en/shared-services/campaigns/stories/tapi-ervpt.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-ico-dpia" satisfies ExternalLinkKey,
      description:
        "ICO du Royaume-Uni, Évaluations des incidences relatives à la protection des données — https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gdpr-article-25" satisfies ExternalLinkKey,
      description:
        "Article 25 du RGPD (protection des données dès la conception et par défaut) — https://gdpr-info.eu/art-25-gdpr/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "opc-privacy-act-in-brief" satisfies ExternalLinkKey,
      description:
        "CPVP, Survol de la Loi sur la protection des renseignements personnels — https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-privacy-act/pa_brief/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "ontario-ipc-privacy-by-design" satisfies ExternalLinkKey,
      description:
        "CIPVP de l’Ontario, Privacy by Design (protection de la vie privée dès la conception) — https://www.ipc.on.ca/en/resources-and-decisions/privacy-design",
    },
    {
      label: "Référence complémentaire",
      linkKey: "nist-privacy-framework" satisfies ExternalLinkKey,
      description: "NIST Privacy Framework, cadre de protection de la vie privée (États-Unis) — https://www.nist.gov/privacy-framework",
    },
    {
      label: "Instrument directeur",
      linkKey: "policy-privacy-protection",
      description:
        "Politique sur la protection de la vie privée (SCT) : l’instrument parent de l’obligation d’évaluation des facteurs relatifs à la vie privée depuis l’abrogation de la directive sur les ÉFVP en 2024.",
    },
  ] satisfies SourceItem[],
} as const;
