import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
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

export type TeamCapabilityLinkedProse = ThreadLinkedProse;
export type TeamCapabilityContentSection = ThreadContentSection;
export type TeamCapabilityCloserLookBlock = ThreadCloserLookBlock;
export type TeamCapabilityPhasePreviewBlock = ThreadPhasePreviewBlock;

export const teamCapabilityLeadPlainText = (lead: readonly ThreadLinkedProse[]) =>
  lead.map((paragraph) => paragraph.text).join(" ");
export const teamCapabilitySectionsPlainText = threadSectionsPlainText;
export const teamCapabilityWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);
export const teamCapabilityWhyItMattersPlainText = threadWhyItMattersPitchPlainText;

const KEEP_CAPABILITY_IN_HOUSE_PATH = "/thread/procurement/keep-capability-in-house";
const AVOID_LOCK_IN_PATH = "/thread/procurement/avoid-lock-in";

export const TEAM_CAPABILITY_THREAD = {
  title: "Capacité de l’équipe",
  slug: "team-capability" as const,

  lead: [
    {
      text:
        "Chaque service gouvernemental a besoin de personnes pour le construire et le maintenir en fonction : déterminer ce dont les utilisateurs ont besoin, le concevoir, écrire le code, le tester, le surveiller en production, et le corriger quand il casse. La capacité de l’équipe, c’est disposer du bon mélange de ces compétences, et en garder assez à l’intérieur du ministère pour que le service puisse être gouverné et déplacé même quand c’est un fournisseur qui construit.",
    },
    {
      text:
        "L’essentiel du travail numérique fonctionne mieux en une seule équipe multidisciplinaire, un groupe unique qui couvre les compétences dont un service a besoin du début à la fin. Le gouvernement du Canada bâtit cette capacité à l’interne au titre de la Directive sur les talents numériques et de la Stratégie en matière de talents numériques du GC.",
      externalLinks: [
        { phrase: "Directive sur les talents numériques", linkKey: "directive-digital-talent" },
        { phrase: "Stratégie en matière de talents numériques du GC", linkKey: "gc-digital-talent-strategy" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text:
        "En pratique, la plupart des ministères n’ont pas d’équipes numériques étoffées, et à l’échelle du gouvernement du Canada la capacité interne est mince. Une bonne partie de la construction est faite par des fournisseurs. Cela rend le volet interne encore plus important. Même un petit service a besoin d’assez de personnes, dans l’équipe ou à un appel de distance, qui le comprennent assez bien pour l’orienter, juger le travail, et intervenir si un fournisseur s’en va.",
    },
    {
      text:
        "Une équipe capable, cela tient aux bons rôles, au fait de savoir de qui d’autre on a besoin et de les garder proches, et à des compétences tenues à jour.",
    },
  ] satisfies ThreadLinkedProse[],

  whatGoodLooksLike: [
    {
      text: "Un responsable de produit nommé a le pouvoir d’établir les priorités et de prendre les décisions pour le service.",
    },
    {
      text: "L’équipe couvre les rôles dont un service numérique a besoin : gestion de produit et de livraison, recherche sur les utilisateurs, conception, développement et exploitation.",
    },
    {
      text: "Assez de personnes au ministère comprennent le service pour le gouverner, juger le travail d’un fournisseur, et mener un déplacement s’il le faut.",
    },
    {
      text: "L’équipe a le pouvoir et l’accès nécessaires pour faire le travail, et la légitimité pour prendre des décisions.",
    },
    {
      text: "Le ministère sait de qui il a besoin pour le service, dans l’équipe ou à un appel de distance, et peut les joindre.",
    },
    {
      text: "Les compétences sont tenues à jour, avec du temps et un budget réservés à la formation.",
    },
    {
      text: "Plus d’une personne comprend chaque partie importante du service, pour qu’aucun départ ne laisse un trou.",
    },
  ] satisfies TeamCapabilityLinkedProse[],

  whyItMatters: {
    lead:
      "La capacité de l’équipe est facile à omettre. On peut engager un fournisseur pour faire le travail, et le service est lancé quand même.",
    failureIntro: "Le coût apparaît plus tard, et il est élevé :",
    failureModes: [
      {
        text: "Vous vous retrouvez verrouillé. Sans personne à l’interne qui comprend le service, le fournisseur détient toutes les réponses et fixe le prix à chaque renouvellement. C’est le piège dont traite « éviter le verrouillage ».",
        bold: [{ phrase: "Vous vous retrouvez verrouillé." }],
        internalLinks: [{ phrase: "éviter le verrouillage", to: AVOID_LOCK_IN_PATH }] satisfies InternalPhraseLink[],
      },
      {
        text: "Vous ne pouvez pas gouverner le travail. Pour juger si la recherche, la sécurité ou la conception d’un fournisseur valent quelque chose, il faut que quelqu’un du côté du ministère sache à quoi ressemble la réussite. Sans cela, le ministère approuve un travail qu’il ne peut pas vérifier.",
        bold: [{ phrase: "Vous ne pouvez pas gouverner le travail." }],
      },
      {
        text: "Vous ne pouvez pas partir. Déplacer un service vers un nouveau fournisseur, ou le ramener à l’interne, exige des gens qui le comprennent. Un ministère qui n’a gardé personne perd cette option.",
        bold: [{ phrase: "Vous ne pouvez pas partir." }],
      },
      {
        text: "Le ministère prend du retard sur son propre service. La connaissance s’estompe, le service vieillit, et le ministère finit incapable de modifier en toute sécurité la chose dont il répond.",
        bold: [{ phrase: "Le ministère prend du retard sur son propre service." }],
      },
    ] satisfies ThreadLinkedProse[],
    closing: {
      text: "Le gouvernement du Canada en fait une exigence dans la Directive sur les talents numériques, parce qu’un ministère qui ne garde aucune capacité ne peut ni gouverner ses services, ni quitter un fournisseur, ni améliorer ce qu’il exploite.",
      externalLinks: [
        { phrase: "Directive sur les talents numériques", linkKey: "directive-digital-talent" },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

  closerLook: {
    id: "a-closer-look",
    title: "Un regard de plus près",
    blocks: [
      {
        title: "Les rôles dont un service a besoin.",
        sections: [
          {
            text: "Un service numérique est construit et exploité par une poignée de rôles qui travaillent ensemble :",
          },
          {
            type: "unorderedList",
            items: [
              { bold: "gestionnaire de produit", text: ", qui décide quoi construire et pourquoi ;" },
              { bold: "gestionnaire de livraison", text: ", qui garde le travail en mouvement ;" },
              { bold: "chercheurs en expérience utilisateur", text: ", qui découvrent ce dont les gens ont besoin ;" },
              { bold: "designers", text: ", qui façonnent le service ;" },
              { bold: "developers", text: ", qui le construisent ;" },
              { bold: "operations", text: ", qui l’exploitent une fois en fonction." },
            ],
          },
          {
            text:
              "Dans un petit service, une même personne peut cumuler deux rôles, et c’est très bien tant que les compétences sont couvertes.",
          },
          {
            text:
              "Le guide du Royaume-Uni sur le rôle de chacun expose chaque rôle et offre des descriptions de poste réutilisables.",
            externalLinks: [
              {
                phrase: "guide du Royaume-Uni sur le rôle de chacun",
                linkKey: "uk-service-manual-what-each-role",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Équipe de base et équipe élargie.",
        sections: [
          {
            text: "Voyez l’équipe en deux cercles.",
          },
          {
            text:
              "L’équipe de base vit le travail au quotidien et reste ensemble sur toute la vie du service.",
            bold: [{ phrase: "L’équipe de base" }],
          },
          {
            text: "L’équipe élargie est le groupe plus vaste de spécialistes appelés quand le travail l’exige :",
            bold: [{ phrase: "L’équipe élargie" }],
          },
          {
            type: "unorderedList",
            items: [
              "un spécialiste de la sécurité,",
              "un expert en accessibilité,",
              "un juriste,",
              "un architecte de données.",
            ],
          },
          {
            text:
              "Les orientations australiennes sur les équipes multidisciplinaires couvrent la façon de doter les deux cercles, de la découverte jusqu’au service en fonction.",
            externalLinks: [
              {
                phrase: "orientations australiennes sur les équipes multidisciplinaires",
                linkKey: "dta-multidisciplinary-team",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Savoir de qui vous avez besoin, et les garder proches.",
        sections: [
          {
            text:
              "La plupart des ministères ne peuvent pas doter eux-mêmes chaque rôle numérique, et à l’échelle du gouvernement du Canada la capacité interne est mince. L’objectif réaliste est un petit noyau que le ministère conserve, plus une carte claire de qui d’autre le service exige.",
            bold: [
              { phrase: "un petit noyau que le ministère conserve" },
              { phrase: "une carte claire de qui d’autre le service exige" },
            ],
          },
          {
            text:
              "Le ministère a besoin d’assez de personnes qui comprennent le fonctionnement du service pour le gouverner, contester un mauvais changement, juger un renouvellement, et, le cas échéant, déplacer le service ailleurs. Ces personnes peuvent être dans l’équipe, dans une autre équipe, ou dans une collectivité commune, pourvu qu’elles soient assez proches pour être sollicitées.",
          },
          {
            text:
              "Les garder proches est ce qui empêche un ministère de prendre du retard sur son propre service et de se verrouiller auprès d’un seul fournisseur. C’est la même capacité dont dépend le volet achat, exposée dans « garder assez de capacité à l’interne quand vous achetez ».",
            bold: [{ phrase: "Les garder proches" }],
            internalLinks: [
              {
                phrase: "garder assez de capacité à l’interne quand vous achetez",
                to: KEEP_CAPABILITY_IN_HOUSE_PATH,
              },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Tenir les compétences à jour.",
        sections: [
          {
            text:
              "Les compétences s’estompent quand elles ne servent pas, et le travail numérique change vite. Le gouvernement bâtit et renouvelle cette capacité de trois façons :",
          },
          {
            type: "orderedList",
            items: [
              {
                text: "la plateforme Talents numériques du GC pour trouver et classifier les rôles numériques ;",
                externalLinks: [
                  { phrase: "la plateforme Talents numériques du GC", linkKey: "gc-digital-talent-platform" },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text: "l’Académie du numérique de l’EFPC pour la formation en produit, conception, données et exploitation ;",
                externalLinks: [
                  { phrase: "l’Académie du numérique de l’EFPC", linkKey: "csps-digital-academy" },
                ] satisfies ExternalPhraseLink[],
              },
              "des voies d’embauche conçues pour le travail numérique.",
            ],
          },
          {
            text:
              "Il existe un ensemble nommé de ces compétences. Le Secrétariat du Conseil du Trésor du Canada a publié en 2025 six compétences numériques du GC pour tous les fonctionnaires :",
            externalLinks: [
              {
                phrase: "six compétences numériques du GC pour tous les fonctionnaires",
                linkKey: "gc-digital-competencies",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "unorderedList",
            items: [
              "la littératie numérique,",
              "l’amélioration continue,",
              "la vigilance en cybersécurité,",
              "l’intendance de l’information et des données,",
              "la responsabilité numérique,",
              "les interactions inclusives.",
            ],
          },
          {
            text:
              "Les Normes relatives au numérique du gouvernement du Canada disent comment le gouvernement devrait travailler dans le monde numérique. Les compétences disent ce qu’une personne doit être capable de faire pour travailler ainsi. Elles servent au perfectionnement : personne n’est coté à leur égard. Cela en fait une liste de vérification simple pour déterminer ce qui manque à une équipe.",
            bold: [{ phrase: "Les compétences disent ce qu’une personne doit être capable de faire pour travailler ainsi." }],
            externalLinks: [
              {
                phrase: "Normes relatives au numérique du gouvernement du Canada",
                linkKey: "digital-standards",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text:
              "L’École de la fonction publique du Canada tient un parcours d’apprentissage organisé sous les mêmes six rubriques. Un compagnon plus long, le Guide des compétences numériques du GC pour tous les fonctionnaires, se trouve sur GCXchange, à l’intérieur du réseau du gouvernement du Canada. La page des compétences y renvoie. Un outil d’autoévaluation est en cours de construction à côté du guide. Il cote une personne au regard des six compétences et renvoie une liste de lectures. Cherchez l’outil sur le même site GCXchange plutôt qu’à une adresse fixe.",
            externalLinks: [
              {
                phrase: "parcours d’apprentissage",
                linkKey: "csps-digital-competencies-learning-path",
              },
              {
                phrase: "Guide des compétences numériques du GC pour tous les fonctionnaires",
                linkKey: "gc-digital-competencies-playbook",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text:
              "Réservez du temps et un budget à cela, comme les Normes relatives au numérique demandent aux ministères d’habiliter leur personnel et d’investir en lui.",
          },
        ],
      },
    ] satisfies TeamCapabilityCloserLookBlock[],
  },

  whoseJob: {
    intro: "La capacité de l’équipe est partagée dans tout le ministère.",
    roles: [
      {
        role: "Le responsable de produit ou le chef de la livraison",
        text: "dirige l’équipe au quotidien et détermine ce sur quoi elle travaille ensuite.",
      },
      {
        role: "Les ressources humaines et les gestionnaires d’embauche",
        text: "recrutent, classifient et dotent les rôles numériques.",
      },
      {
        role: "Les membres de l’équipe",
        text: "chercheurs, concepteurs, développeurs, exploitation : ils font le travail et tiennent leurs propres compétences à jour.",
      },
      {
        role: "La collectivité des talents numériques du ministère",
        text: "est une ressource commune où l’équipe puise des voies de recrutement et des compétences spécialisées.",
      },
      {
        role: "Le responsable opérationnel de l’application",
        text: "veille à ce que le service dispose des personnes et des compétences nécessaires, garde assez de capacité à l’interne, et finance la formation qui la maintient.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  twoWaysComparison: {
    id: "two-ways-comparison",
    title: "Deux façons de bâtir une équipe",
    risky: {
      heading: "Vell",
      framing:
        "Voici Vell. L’équipe a confié tout le système de permis à un seul fournisseur sans garder personne à l’interne qui le comprenne :",
      items: [
        "a confié la construction et l’exploitation du service à un seul fournisseur",
        "n’a gardé aucun responsable de produit ayant le pouvoir d’établir les priorités",
        "a laissé un seul entrepreneur détenir toute la connaissance de son fonctionnement",
        "n’a consacré ni temps ni budget aux compétences du ministère",
      ],
      closing:
        "Le résultat : au renouvellement, le fournisseur détenait toutes les réponses et fixait le prix, un petit changement prenait des mois, et personne à l’interne ne pouvait juger si le travail valait quelque chose.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Voici Pax. L’équipe a bâti une petite équipe multidisciplinaire autour du système de permis :",
      items: [
        "a gardé à l’interne un responsable de produit, un développeur et un concepteur de services, et a fait appel à des spécialistes au besoin",
        "a consigné les décisions importantes et tenu la documentation à jour",
        "a fait tourner les gens dans le travail pour que plus d’une personne comprenne chaque partie",
        "a réservé du temps pour la formation par l’Académie du numérique de l’EFPC",
      ],
      closing:
        "Le résultat : quand le fournisseur a changé, le service a continué de fonctionner, l’équipe pouvait lire le nouveau travail et contester un changement faible, et un déplacement restait possible.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "À quoi ressemble la capacité de l’équipe à chaque phase",
    intro: "La capacité de l’équipe change de forme au fil de la vie d’un service.",
    blocks: [
      {
        title: "Create.",
        preview: "Constituer l’équipe.",
        popupHeading: "Constituer l’équipe.",
        popup: [
          {
            text: "Le ministère détermine quels rôles le service exige, et décide quelle capacité garder à l’interne et laquelle faire venir de l’extérieur.",
          },
          {
            text: "Il met en place un responsable de produit ayant le pouvoir de décider.",
          },
          {
            text: "La capacité planifiée maintenant détermine ce que le service pourra faire pendant des années.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "Garder l’équipe ensemble.",
        popupHeading: "Garder l’équipe ensemble.",
        popup: [
          {
            text: "Les compétences sont tenues à jour, et la connaissance est répartie entre plus d’une personne pour qu’un départ ne laisse pas de trou.",
          },
          {
            text: "L’équipe surveille sa propre santé et sa charge de travail.",
          },
          {
            text: "Une équipe qui perd ses gens vieillit jusqu’à ne plus pouvoir modifier le service en toute sécurité.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Retenir les personnes qui le comprennent.",
        popupHeading: "Retenir les personnes qui le comprennent.",
        popup: [
          {
            text: "Assez de membres de l’équipe sont gardés pour mener le déplacement ou le retrait, et la connaissance est transmise avant les départs.",
          },
          {
            text: "Le service ne se retrouve pas sans personne qui se souvienne de son fonctionnement.",
          },
        ],
      },
    ] satisfies TeamCapabilityPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Pour mettre sur pied et animer une équipe de service multidisciplinaire, avec les rôles, les entrepreneurs et la formation, la section « The team » du Service Manual du Royaume-Uni est un guide complet. Les orientations australiennes sur la gestion des équipes couvrent la façon de doter un service tout au long de sa vie et les rôles à garder à l’interne. Pour une autoévaluation qu’une équipe peut faire tourner pour vérifier sa propre santé, le Team Health Monitor d’Atlassian parcourt huit attributs.",
    externalLinks: [
      { phrase: "The team", linkKey: "uk-service-manual-the-team" },
      { phrase: "gestion des équipes", linkKey: "dta-multidisciplinary-team" },
      { phrase: "Team Health Monitor", linkKey: "atlassian-team-health-monitor" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Instrument directeur",
      linkKey: "directive-digital-talent" satisfies ExternalLinkKey,
      description:
        "Directive sur les talents numériques (SCT) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32749",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-digital-talent-strategy" satisfies ExternalLinkKey,
      description:
        "Stratégie en matière de talents numériques du GC (BDPI du SCT) — https://www.canada.ca/en/government/system/digital-government/digital-talent-strategy.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-digital-talent-platform" satisfies ExternalLinkKey,
      description: "Plateforme Talents numériques du GC (SCT) — https://talent.canada.ca/",
    },
    {
      label: "Référence complémentaire",
      linkKey: "csps-digital-academy" satisfies ExternalLinkKey,
      description:
        "CSPS Digital Academy (Canada School of Public Service) — https://www.csps-efpc.gc.ca/digital-academy/index-eng.aspx",
    },
    {
      label: "Référence complémentaire",
      linkKey: "uk-service-manual-what-each-role" satisfies ExternalLinkKey,
      description:
        "Le rôle de chacun dans une équipe de service (Service Manual du Royaume-Uni) — https://www.gov.uk/service-manual/the-team/what-each-role-does-in-a-service-team",
    },
    {
      label: "Référence complémentaire",
      linkKey: "dta-multidisciplinary-team" satisfies ExternalLinkKey,
      description:
        "Gestion des équipes (Australie, Digital Experience Toolkit) — https://www.digital.gov.au/policy/digital-experience/toolkit/managing-teams",
    },
    {
      label: "Référence complémentaire",
      linkKey: "digital-standards" satisfies ExternalLinkKey,
      description:
        "Normes relatives au numérique du gouvernement du Canada (SCT) — https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards.html",
    },
    {
      label: "Référence complémentaire",
      linkKey: "atlassian-team-health-monitor" satisfies ExternalLinkKey,
      description:
        "Team Health Monitor, moniteur de santé d’équipe (Atlassian) — https://www.atlassian.com/team-playbook/health-monitor",
    },
    {
      label: "Instrument directeur",
      linkKey: "gc-digital-competencies" satisfies ExternalLinkKey,
      description:
        "Compétences en matière de numérique au sein du GC pour tous les fonctionnaires (SCT) : les six compétences, avec une page pour chacune — https://www.canada.ca/en/treasury-board-secretariat/topics/professional-development/gc-digital-competencies-all-public-servants.html",
    },
    {
      label: "Modèles et outils",
      linkKey: "csps-digital-competencies-learning-path" satisfies ExternalLinkKey,
      description:
        "Digital competencies learning path (Canada School of Public Service): courses organised under the same six headings — https://www.csps-efpc.gc.ca/learning-paths/digital-competencies-eng.aspx",
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-digital-competencies-playbook" satisfies ExternalLinkKey,
      description:
        "Guide des compétences numériques du GC pour tous les fonctionnaires (SCT, sur GCXchange) : le compagnon plus long de la page publique, et le site où l’outil d’autoévaluation est en construction.",
    },
    {
      label: "Collectivités",
      linkKey: "gcdigital-community",
      description:
        "Collectivité GCNumérique (BDPI du SCT) : la communauté des praticiens du numérique dans l’ensemble du gouvernement.",
    },
  ] satisfies SourceItem[],
} as const;
