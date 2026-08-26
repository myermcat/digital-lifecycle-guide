/**
 * TRANSITORY WORKING MATERIAL, home page only, sitting under the instrument table.
 *
 * The instrument table holds what a service MUST deal with. This holds what it MAY
 * reuse: platforms and components another part of the Government of Canada already
 * runs, so a team configures rather than builds.
 *
 * The distinction matters and the two must not be merged. Nothing here is an
 * obligation. Choosing not to use any of it breaks no rule, though the enterprise
 * architecture framework does ask teams to look at reuse before buying or building,
 * and an architecture review board will ask what was considered.
 */

import type { ExternalLinkKey } from "@/lib/external-links";

export type ReusableCategory =
  | "Parler aux gens"
  | "Recueillir de l’information"
  | "L’apparence"
  | "L’ouverture de session"
  | "Publier et partager"
  | "Trouver ce qui existe";

export const REUSABLE_CATEGORIES: readonly ReusableCategory[] = [
  "Trouver ce qui existe",
  "Parler aux gens",
  "Recueillir de l’information",
  "L’apparence",
  "L’ouverture de session",
  "Publier et partager",
];

export type ReusablePiece = {
  name: string;
  category: ReusableCategory;
  /** One line a non-specialist understands. */
  whatItIs: string;
  /** The thing a team would otherwise build or buy. */
  insteadOfBuilding: string;
  /** Phrases in insteadOfBuilding to bold, so the column can be skimmed. */
  insteadBold?: readonly string[];
  runBy: string;
  /** How a team actually gets it. */
  howToGetIt: string;
  /** Where in a service's life it is worth looking at this. */
  lookAtItIn: string;
  linkKey?: ExternalLinkKey;
  caveat?: string;
};

export const REUSABLE_PIECES: ReusablePiece[] = [
  {
    name: "Échange de ressources ouvert",
    category: "Trouver ce qui existe",
    whatItIs:
      "Un catalogue de logiciels, de code et de composants réutilisables que des organisations du gouvernement du Canada ont publiés pour que d’autres s’en servent.",
    insteadOfBuilding:
      "Partir de rien, ou reconstruire ce qu’un autre ministère a déjà écrit.",
    insteadBold: ["reconstruire ce qu’un autre ministère a déjà écrit"],
    runBy: "Secrétariat du Conseil du Trésor du Canada.",
    howToGetIt: "Site Web public. Cherchez-y avant de rédiger une exigence.",
    lookAtItIn: "En Découverte, dans le cadre du balayage de réutilisation qu’un comité d’examen de l’architecture demandera.",
    linkKey: "gc-open-resource-exchange",
  },
  {
    name: "Notification GC",
    category: "Parler aux gens",
    whatItIs:
      "Un service de notification qui envoie des courriels et des messages texte aux personnes qui utilisent un service, avec gabarits, suivi de la livraison et soutien bilingue intégrés.",
    insteadOfBuilding:
      "Un système d’envoi de courriels et de textos, ses gabarits, sa logique de reprise et ses rapports de livraison.",
    insteadBold: ["Un système d’envoi de courriels et de textos"],
    runBy: "Service numérique canadien.",
    howToGetIt: "Demandez un compte. Gratuit pour les équipes du gouvernement du Canada.",
    lookAtItIn:
      "En Alpha, parce que le fait d’acheter, de construire ou de réutiliser les notifications change l’estimation de construction.",
    linkKey: "gc-notify-contact",
  },
  {
    name: "Formulaires GC",
    category: "Recueillir de l’information",
    whatItIs:
      "Un générateur de formulaires qui produit des formulaires en ligne accessibles et bilingues sans écrire de code, et qui livre les réponses de façon sécuritaire.",
    insteadOfBuilding:
      "Un formulaire, sa validation, son travail d’accessibilité, et un endroit sûr où mettre les réponses.",
    insteadBold: ["Un formulaire, sa validation"],
    runBy: "Service numérique canadien.",
    howToGetIt: "Demandez l’accès. Gratuit pour les équipes du gouvernement du Canada.",
    lookAtItIn:
      "En Alpha pour prototyper rapidement un formulaire, et en Bêta quand le vrai produit est un formulaire plutôt qu’un système.",
    linkKey: "gc-forms-assistance",
  },
  {
    name: "Système de design GC",
    category: "L’apparence",
    whatItIs:
      "Des composants d’interface prêts à l’emploi — boutons, champs, messages d’erreur et le reste — déjà testés pour l’accessibilité et offerts dans les deux langues officielles.",
    insteadOfBuilding: "Des composants d’interface, et les tests d’accessibilité de chacun.",
    insteadBold: ["Des composants d’interface"],
    runBy: "Service numérique canadien.",
    howToGetIt: "Public. Utilisez les composants dans la construction.",
    lookAtItIn: "En Alpha pour le prototype, en Bêta pour la vraie construction.",
    linkKey: "gc-design-system",
  },
  {
    name: "Système de design de Canada.ca",
    category: "L’apparence",
    whatItIs:
      "Les gabarits de page, les modèles et les styles de contenu testés auprès des utilisateurs, pour tout ce qui est publié sous la marque canada.ca.",
    insteadOfBuilding: "Les mises en page, les modèles de navigation, et la recherche qui les sous-tend.",
    insteadBold: ["Les mises en page, les modèles de navigation"],
    runBy: "Secrétariat du Conseil du Trésor du Canada, avec l’équipe de publication de canada.ca.",
    howToGetIt: "Public. Les parties obligatoires relèvent des règles de publication, non d’un choix.",
    lookAtItIn: "En Alpha, avant que le premier prototype fixe une apparence que l’équipe Web n’acceptera pas.",
    linkKey: "design-canada",
    caveat:
      "Une partie de celui-ci n’est pas facultative. Les gabarits obligatoires et l’architecture de l’information sont une obligation permanente, énumérée dans le tableau des instruments.",
  },
  {
    name: "Boîte à outils de l’accessibilité numérique",
    category: "L’apparence",
    whatItIs:
      "Des orientations pratiques pour concevoir, construire, tester et acheter des services accessibles, y compris le libellé à inscrire dans un contrat.",
    insteadOfBuilding:
      "Établir les exigences d’accessibilité et l’approche de test à partir de rien.",
    insteadBold: ["Établir les exigences d’accessibilité"],
    runBy: "Le Groupe de travail interministériel sur l’accès.",
    howToGetIt: "Site Web public.",
    lookAtItIn: "En Alpha, au moment où les clauses d’accessibilité sont rédigées pour la demande de soumissions.",
    linkKey: "digital-accessibility-toolkit",
  },
  {
    name: "CléGC et Connexion Canada",
    category: "L’ouverture de session",
    whatItIs:
      "Des services d’ouverture de session partagés qui identifient les personnes utilisant un service, pour qu’un ministère n’exploite pas son propre système de noms d’utilisateur et de mots de passe.",
    insteadOfBuilding: "Les comptes, les mots de passe, l’authentification multifacteur et la récupération de compte.",
    insteadBold: ["Les comptes, les mots de passe, l’authentification multifacteur"],
    runBy: "Services partagés Canada et le Service numérique canadien.",
    howToGetIt:
      "Intégration par le processus propre à la plateforme, qui comprend des essais et une attestation.",
    lookAtItIn: "En Alpha, avant qu’un prototype code en dur sa propre ouverture de session.",
    caveat:
      "Plus proche de l’attendu que du facultatif. Réutiliser un service de justificatifs plutôt que de construire l’ouverture de session est traité comme la valeur par défaut : celui-ci figure donc aussi dans le tableau des instruments.",
  },
  {
    name: "Portail du gouvernement ouvert",
    category: "Publier et partager",
    whatItIs:
      "L’endroit où les données et l’information du gouvernement du Canada sont publiées ouvertement, et où plusieurs éléments qu’un service doit fournir sont déposés.",
    insteadOfBuilding: "Une voie de publication pour les données ouvertes, et les conditions de licence qui vont avec.",
    insteadBold: ["Une voie de publication pour les données ouvertes"],
    runBy: "Secrétariat du Conseil du Trésor du Canada.",
    howToGetIt: "Par la personne-ressource du ministère en matière de gouvernement ouvert.",
    lookAtItIn: "En Exploitation, une fois que le service produit des données qui valent la peine d’être publiées.",
    linkKey: "open-government-portal",
    caveat:
      "Certains dépôts ici sont des obligations. L’évaluation de l’incidence algorithmique et la publication proactive sont toutes deux publiées sur ce portail.",
  },
];
