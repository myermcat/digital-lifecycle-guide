import type { ExternalLinkKey } from "@/lib/external-links";
import type { ExternalPhraseLink, MailtoPhraseLink, PlaceholderGcNetworkPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ThreadSlug } from "@/lib/guide-strings";
import { DIGITAL_SOLUTIONS_CHANGE_MANAGEMENT_PORTAL } from "@/lib/placeholder-sources";

export type SupportCalloutVariant =
  | "generic"
  | "security"
  | "procurement"
  | "privacy"
  | "accessibility"
  | "user-research"
  | "ethics-and-bias"
  | "backlog"
  | "joined-up-delivery"
  | "releasing-changes"
  | "dependencies-and-standards"
  | "data-stewardship"
  | "funding"
  | "team-capability"
  | "change-management"
  | "monitoring-and-instrumentation";

export type SupportCalloutBody = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  mailtoLinks?: MailtoPhraseLink[];
  placeholderGcNetworkLinks?: PlaceholderGcNetworkPhraseLink[];
};

export const SUPPORT_CALLOUT_BODIES = {
  generic: {
    text: "Vous n’êtes pas le premier à traverser cela. Il existe une équipe ou une collectivité pour presque chaque partie de ce travail.",
  },
  security: {
    text: "Pour les questions de sécurité, l’équipe de sécurité des TI ou l’agent de sécurité de votre ministère est le premier appel, et le Centre canadien pour la cybersécurité conseille les institutions gouvernementales.",
    externalLinks: [
      { phrase: "Centre canadien pour la cybersécurité", linkKey: "cyber-centre-contact" },
    ],
  },
  procurement: {
    text: "Pour les questions d’achat, commencez par le Portail des acheteurs d’AchatsCanada. Il existe une équipe ou une collectivité pour presque chaque partie de ce guide.",
    externalLinks: [{ phrase: "Portail des acheteurs d’AchatsCanada", linkKey: "buyers-portal" }],
  },
  privacy: {
    text: "Pour les questions de protection de la vie privée, le coordonnateur de l’AIPRP ou de la protection de la vie privée de votre ministère est le premier appel (trouvez le vôtre par le carrefour Accès à l’information et protection des renseignements personnels), et le Commissariat à la protection de la vie privée conseille les institutions fédérales.",
    externalLinks: [
      { phrase: "Accès à l’information et protection des renseignements personnels", linkKey: "atip-privacy-hub" },
      { phrase: "Commissariat à la protection de la vie privée", linkKey: "opc-federal-institutions" },
    ],
  },
  accessibility: {
    text: "Pour les questions d’accessibilité, la Boîte à outils de l’accessibilité numérique est le point de départ du gouvernement du Canada, et son répertoire communautaire vous met en lien avec la collectivité de l’accessibilité dans l’ensemble des ministères. Pour de l’aide concrète, de la formation, des essais de technologies adaptatives et des conseils en approvisionnement, écrivez au programme AATIA de Services partagés Canada.",
    externalLinks: [
      { phrase: "Boîte à outils de l’accessibilité numérique", linkKey: "digital-accessibility-toolkit" },
      { phrase: "répertoire communautaire", linkKey: "a11y-community-directory" },
      { phrase: "programme AATIA", linkKey: "aaact-program" },
    ],
  },
  "user-research": {
    text: "Pour de l’aide en recherche sur les utilisateurs, la collectivité de la conception centrée sur l’utilisateur et de la conception de services du gouvernement du Canada est l’endroit où poser vos questions, et les orientations « Concevoir avec les utilisateurs » ainsi que l’outil Rétroaction GC sont des points de départ pratiques.",
    externalLinks: [
      { phrase: "Concevoir avec les utilisateurs", linkKey: "design-with-users" },
      { phrase: "l’outil Rétroaction GC", linkKey: "gc-page-feedback" },
    ],
  },
  "dependencies-and-standards": {
    text: "Pour le volet chaîne d’approvisionnement et dépendances, le Centre canadien pour la cybersécurité conseille les institutions gouvernementales, et du côté du code source libre, le Guide pour l’utilisation de logiciels libres du GC et l’Échange de ressources ouvert sont les points de départ.",
    externalLinks: [
      { phrase: "Centre canadien pour la cybersécurité", linkKey: "cyber-centre-contact" },
    ],
  },
  "data-stewardship": {
    text: "Pour les questions de gestion des données et de disposition, le bureau de la gestion de l’information ou le dirigeant principal des données de votre ministère est le premier appel, et Bibliothèque et Archives Canada conseille les institutions sur la disposition et les transferts par son service de gestion de l’information et de disposition.",
    externalLinks: [
      {
        phrase: "gestion de l’information et de disposition",
        linkKey: "lac-information-disposition-hub",
      },
    ],
  },
  "ethics-and-bias": {
    text: "Pour les questions d’IA responsable et d’équité, le carrefour de l’utilisation responsable de l’IA au gouvernement est le point de départ du gouvernement du Canada ; le bureau des données ou de l’IA de votre ministère, le bureau de la protection de la vie privée ou de l’AIPRP, et les services juridiques sont les personnes à faire intervenir tôt, et le soutien en ACS Plus vient de Femmes et Égalité des genres Canada.",
    externalLinks: [
      { phrase: "utilisation responsable de l’IA au gouvernement", linkKey: "responsible-use-ai-hub" },
      { phrase: "ACS Plus", linkKey: "gba-plus" },
    ],
  },
  backlog: {
    text: "Pour de l’aide sur la tenue d’un carnet de produit agile, la collectivité de la conception du gouvernement du Canada est un endroit où poser vos questions, et la norme « itérer et améliorer fréquemment » est l’attente qu’elle soutient.",
    externalLinks: [
      { phrase: "collectivité de la conception", linkKey: "gc-design-community" },
      { phrase: "itérer et améliorer fréquemment", linkKey: "iterate-improve-frequently" },
    ],
  },
  "joined-up-delivery": {
    text: "Pour intégrer un service, la collectivité de la conception de services et de la conception centrée sur l’utilisateur du gouvernement du Canada est l’endroit où poser vos questions sur la cartographie d’un parcours complet, et la collectivité de l’architecture intégrée ainsi que les orientations « Favoriser l’interopérabilité » sont les points de départ pour connecter les systèmes.",
    externalLinks: [
      { phrase: "collectivité de l’architecture intégrée", linkKey: "gc-ea-application-architecture" },
      { phrase: "Favoriser l’interopérabilité", linkKey: "enabling-interoperability" },
    ],
  },
  "releasing-changes": {
    text: "Pour la mise en production des changements, l’équipe de plateforme ou de DevOps de votre ministère exploite la chaîne et les déploiements ; pour le socle de sécurité infonuagique, Services partagés Canada valide les Garde-fous infonuagiques du GC, et la norme « itérer et améliorer fréquemment » est l’attente derrière des mises en production fréquentes.",
    externalLinks: [
      { phrase: "Garde-fous infonuagiques du GC", linkKey: "gc-cloud-guardrails" },
      { phrase: "itérer et améliorer fréquemment", linkKey: "iterate-improve-frequently" },
    ],
  },
  funding: {
    text: "Pour les questions de financement, la direction des finances et le dirigeant principal des finances du ministère sont les premiers contacts.",
  },
  "team-capability": {
    text: "Pour les questions de capacité de l’équipe, les ressources humaines et la collectivité du talent numérique du ministère, ainsi que la plateforme Talents numériques du GC, sont les premiers contacts.",
    externalLinks: [
      { phrase: "plateforme Talents numériques du GC", linkKey: "gc-digital-talent-platform" },
    ],
  },
  "change-management": {
    text: "Pour de l’aide en gestion du changement, le Réseau interministériel du changement organisationnel et le Portail de gestion du changement des solutions numériques sont les premiers contacts.",
    externalLinks: [
      {
        phrase: "Réseau interministériel du changement organisationnel",
        linkKey: "iocn-change-network",
      },
    ],
    placeholderGcNetworkLinks: [
      {
        phrase: "Portail de gestion du changement des solutions numériques",
        source: DIGITAL_SOLUTIONS_CHANGE_MANAGEMENT_PORTAL,
      },
    ],
  },
  "monitoring-and-instrumentation": {
    text: "Pour la mesure du rendement et l’analytique Web, la collectivité de la mesure du rendement et de l’analytique Web du gouvernement du Canada, ainsi que l’outillage et les orientations d’analytique sur design.canada.ca et l’analytique de Canada.ca, sont des points de départ.",
    externalLinks: [
      { phrase: "design.canada.ca", linkKey: "monitoring-measuring-task-success" },
      { phrase: "l’analytique de Canada.ca", linkKey: "canada-ca-analytics" },
    ],
  },
} as const satisfies Record<SupportCalloutVariant, SupportCalloutBody>;

const THREAD_SUPPORT_CALLOUT: Partial<Record<ThreadSlug, SupportCalloutVariant>> = {
  security: "security",
  procurement: "procurement",
  privacy: "privacy",
  accessibility: "accessibility",
  "user-research": "user-research",
  "ethics-and-bias": "ethics-and-bias",
  backlog: "backlog",
  "joined-up-delivery": "joined-up-delivery",
  "releasing-changes": "releasing-changes",
  "dependencies-and-standards": "dependencies-and-standards",
  "data-stewardship": "data-stewardship",
  funding: "funding",
  "team-capability": "team-capability",
  "change-management": "change-management",
  "monitoring-and-instrumentation": "monitoring-and-instrumentation",
};

export function supportCalloutVariantForThread(slug: ThreadSlug): SupportCalloutVariant {
  return THREAD_SUPPORT_CALLOUT[slug] ?? "generic";
}

/** @deprecated Prefer SUPPORT_CALLOUT_BODIES */
export type SupportCalloutTopicContact = {
  topic: string;
  contactLabel: string;
  contactExternalKey: ExternalLinkKey;
};
