import type { SourceItem } from "@/components/SourcesBlock";
import type {
  BoldPhrase,
  ExternalPhraseLink,
  MailtoPhraseLink,
} from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";

export type SupportLinkedBullet = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  mailtoLinks?: MailtoPhraseLink[];
  bold?: BoldPhrase[];
};

export const SUPPORT_PAGE = {
  title: "Soutien et collectivités",
  id: "support",

  lead:
    "Quand une partie de ce guide vous laisse coincé, il existe presque toujours une équipe, une collectivité ou une ressource en ligne qui peut aider. Cette page les rassemble au même endroit. La plupart sont ouvertes à quiconque travaille au gouvernement ; quelques-unes se trouvent sur le réseau du gouvernement du Canada. Certaines de ces collectivités changent de plateforme en ce moment (GCconnex est en voie de retrait) : un lien peut donc avoir changé depuis la rédaction.",

  byTopic: {
    id: "by-topic",
    title: "Par sujet",
    bullets: [
      {
        text: "Architecture. La communauté de pratique de l’architecture intégrée pour les questions d’architecture et d’examen.",
        bold: [{ phrase: "Architecture." }],
        externalLinks: [
          {
            phrase: "communauté de pratique de l’architecture intégrée",
            linkKey: "enterprise-architecture-cop",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Infonuagique. Le Centre d’information sur l’infonuagique du GC est le guichet unique pour l’aide à l’adoption et à la migration vers le nuage.",
        bold: [{ phrase: "Cloud." }],
        externalLinks: [
          { phrase: "Centre d’information sur l’infonuagique du GC", linkKey: "gc-cloud-information-centre" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Approvisionnement. Commencez par le Portail des acheteurs d’AchatsCanada, et demandez l’aide d’un gestionnaire de comptes clients de SPAC pour un achat précis.",
        bold: [{ phrase: "Procurement." }],
        externalLinks: [{ phrase: "Portail des acheteurs d’AchatsCanada", linkKey: "buyers-portal" }] satisfies ExternalPhraseLink[],
      },
      {
        text: "Sécurité. Le Centre canadien pour la cybersécurité répond aux questions de sécurité.",
        bold: [{ phrase: "Security." }],
        externalLinks: [
          {
            phrase: "Centre canadien pour la cybersécurité",
            linkKey: "cyber-centre-contact",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Protection de la vie privée. Parlez d’abord au coordonnateur de l’AIPRP ou de la protection de la vie privée de votre propre ministère (trouvez le vôtre par le carrefour Accès à l’information et protection des renseignements personnels) ; le Commissariat à la protection de la vie privée est l’organisme de réglementation.",
        bold: [{ phrase: "Privacy." }],
        externalLinks: [
          {
            phrase: "Accès à l’information et protection des renseignements personnels",
            linkKey: "atip-privacy-hub",
          },
          { phrase: "Commissariat à la protection de la vie privée", linkKey: "privacy-commissioner" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Accessibilité. La Boîte à outils de l’accessibilité numérique et son répertoire communautaire, et une équipe à qui écrire : le programme AATIA de Services partagés Canada offre de la formation, des essais de technologies adaptatives et des conseils en approvisionnement (aaact-aatia@ssc-spc.gc.ca).",
        bold: [{ phrase: "Accessibility." }],
        externalLinks: [
          { phrase: "Boîte à outils de l’accessibilité numérique", linkKey: "digital-accessibility-toolkit" },
          { phrase: "répertoire communautaire", linkKey: "a11y-community-directory" },
          { phrase: "programme AATIA", linkKey: "aaact-program" },
        ] satisfies ExternalPhraseLink[],
        mailtoLinks: [
          { phrase: "aaact-aatia@ssc-spc.gc.ca", href: "mailto:aaact-aatia@ssc-spc.gc.ca" },
        ],
      },
      {
        text: "Construction et plateformes. Le Service numérique canadien exploite des plateformes communes, Notification GC et Formulaires GC, et le Système de design GC pour un ensemble de composants éprouvés.",
        bold: [{ phrase: "Construction et plateformes." }],
        externalLinks: [
          { phrase: "Notification GC", linkKey: "gc-notify-contact" },
          { phrase: "Formulaires GC", linkKey: "gc-forms-assistance" },
          { phrase: "Système de design GC", linkKey: "gc-design-system" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Données. Le bureau des données ou du dirigeant principal des données de votre ministère, d’abord. À l’échelle du gouvernement, la Collectivité des données du GC (École de la fonction publique du Canada) est le réseau de praticiens des données auquel vous pouvez adhérer.",
        bold: [{ phrase: "Data." }],
        externalLinks: [
          { phrase: "Collectivité des données du GC", linkKey: "gc-data-community" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Documents et disposition. Le bureau de la gestion de l’information ou des documents de votre ministère, d’abord. Il s’occupe de la disposition des documents gouvernementaux, le point de contrôle du Retrait, avec Bibliothèque et Archives Canada.",
        bold: [{ phrase: "Documents et disposition." }],
        externalLinks: [
          {
            phrase: "Bibliothèque et Archives Canada",
            linkKey: "lac-information-disposition-hub",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Conception de services et recherche sur les utilisateurs. Le réseau UX du GC met en relation les concepteurs et les chercheurs de l’ensemble du gouvernement, et l’Académie du numérique de l’EFPC offre de la formation en conception de services et en recherche sur les utilisateurs.",
        bold: [{ phrase: "Conception de services et recherche sur les utilisateurs." }],
        externalLinks: [
          { phrase: "réseau UX du GC", linkKey: "gc-ux-network" },
          { phrase: "Académie du numérique de l’EFPC", linkKey: "csps-digital-academy" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Politique de service et répertoire des services. Le bureau du service ou du DPI de votre ministère, d’abord. Il travaille avec l’équipe de la Politique sur les services du SCT sur la façon dont votre service figure dans le Répertoire des services du GC.",
        bold: [{ phrase: "Politique de service et répertoire des services." }],
      },
      {
        text: "IA responsable et décisions automatisées. Les équipes de la protection de la vie privée, des données et des services juridiques de votre ministère, d’abord, si votre service automatise une décision. Les orientations pangouvernementales se trouvent au carrefour de l’utilisation responsable de l’IA au gouvernement.",
        bold: [{ phrase: "IA responsable et décisions automatisées." }],
        externalLinks: [
          {
            phrase: "carrefour de l’utilisation responsable de l’IA au gouvernement",
            linkKey: "responsible-use-ai-hub",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Gouvernement ouvert et données ouvertes. Le responsable de la gestion de l’information ou des données ouvertes de votre ministère publie les jeux de données sur le Portail du gouvernement ouvert.",
        bold: [{ phrase: "Gouvernement ouvert et données ouvertes." }],
        externalLinks: [
          { phrase: "Portail du gouvernement ouvert", linkKey: "open-government-portal" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Gestion de l’information. Le bureau de la gestion de l’information de votre ministère, d’abord. À l’échelle du gouvernement, la Collectivité de la gestion de l’information du GC met en relation les professionnels de la GI.",
        bold: [{ phrase: "Gestion de l’information." }],
        externalLinks: [
          {
            phrase: "Collectivité de la gestion de l’information du GC",
            linkKey: "gc-information-management-community",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Langues officielles. Le coordonnateur des langues officielles de votre ministère d’abord ; la Collectivité des langues officielles et les pages du SCT sur les langues officielles.",
        bold: [{ phrase: "Langues officielles." }],
        externalLinks: [
          {
            phrase: "Collectivité des langues officielles",
            linkKey: "community-of-official-languages",
          },
          { phrase: "les pages du SCT sur les langues officielles", linkKey: "tbs-official-languages" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "ACS Plus et inclusion. Le point focal ACS Plus de votre ministère d’abord ; le carrefour ACS Plus et le cours INC101 de l’EFPC.",
        bold: [{ phrase: "ACS Plus et inclusion." }],
        externalLinks: [
          { phrase: "carrefour ACS Plus", linkKey: "gba-plus" },
          { phrase: "INC101", linkKey: "csps-inc101" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Identité et ouverture de session. Le DPI ou le responsable de la sécurité de votre ministère (ils font intervenir les équipes de gestion de l’identité et des accès) ; le carrefour sur la sécurité et la protection de la vie privée en ligne.",
        bold: [{ phrase: "Identité et ouverture de session." }],
        externalLinks: [
          {
            phrase: "carrefour sur la sécurité et la protection de la vie privée en ligne",
            linkKey: "online-security-privacy-hub",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Talent numérique et embauche. Talents numériques du GC, la plateforme de recrutement pangouvernementale pour les rôles numériques.",
        bold: [{ phrase: "Talent numérique et embauche." }],
        externalLinks: [
          { phrase: "Talents numériques du GC", linkKey: "gc-digital-talent-platform" },
        ] satisfies ExternalPhraseLink[],
      },
    ] satisfies SupportLinkedBullet[],
    closing: {
      text: "Si votre sujet ne figure pas ici, le répertoire des collectivités fonctionnelles du GC énumère les collectivités professionnelles de l’ensemble du gouvernement ; l’une d’elles le couvre probablement.",
      externalLinks: [
        {
          phrase: "répertoire des collectivités fonctionnelles du GC",
          linkKey: "gc-functional-communities-directory",
        },
      ] satisfies ExternalPhraseLink[],
    },
  },

  furtherReading: {
    text: "Le wiki du Portefeuille de la TI intégrée du GC est le carrefour des rapports sur le cycle de vie de la TI du gouvernement du Canada, reliant les dépenses en TI, la gestion du portefeuille d’applications et le plan de TI ministériel.",
    externalLinks: [
      { phrase: "Portefeuille de la TI intégrée du GC", linkKey: "gc-enterprise-it-portfolio" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Référence complémentaire",
      linkKey: "gc-functional-communities-directory" satisfies ExternalLinkKey,
    },
    {
      label: "Référence complémentaire",
      linkKey: "gc-enterprise-it-portfolio" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;
