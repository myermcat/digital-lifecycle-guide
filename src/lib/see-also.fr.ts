import type { SeeAlsoItem } from "@/components/SeeAlso";

export const SEE_ALSO: Record<string, SeeAlsoItem[]> = {
  "monitoring-and-instrumentation": [
    {
      label: "Mise en production des changements",
      to: "/thread/releasing-changes",
      gloss: "mettre en production des changements en toute sécurité une fois le service visible",
    },
    { label: "Sécurité", to: "/thread/security", gloss: "la détection et l’intervention reposent sur la surveillance" },
    { label: "Carnet de produit", to: "/thread/backlog", gloss: "ce que les signaux alimentent ensuite" },
  ],
  "releasing-changes": [
    {
      label: "Surveillance et instrumentation",
      to: "/thread/monitoring-and-instrumentation",
      gloss: "comment voir si une mise en production s’est bien passée",
    },
    {
      label: "Dépendances et normes",
      to: "/thread/dependencies-and-standards",
      gloss: "ce avec quoi une mise en production doit rester à jour",
    },
    {
      label: "Gestion du changement",
      to: "/thread/change-management",
      gloss: "aider les gens à adopter le changement",
    },
    { label: "Carnet de produit", to: "/thread/backlog", gloss: "décider quoi mettre en production ensuite" },
  ],
  "dependencies-and-standards": [
    {
      label: "Sécurité",
      to: "/thread/security",
      gloss: "les composants tiers font partie de la surface d’attaque",
    },
    {
      label: "Mise en production des changements",
      to: "/thread/releasing-changes",
      gloss: "garder les dépendances à jour, mise en production après mise en production",
    },
    {
      label: "Approvisionnement",
      to: "/thread/procurement",
      gloss: "ce sur quoi vous bâtissez est souvent ce que vous avez acheté",
    },
  ],
  "user-research": [
    {
      label: "Accessibilité",
      to: "/thread/accessibility",
      gloss: "la recherche inclut les personnes qui utilisent des technologies d’assistance",
    },
    {
      label: "Prestation intégrée",
      to: "/thread/joined-up-delivery",
      gloss: "le parcours complet de l’utilisateur, pas seulement votre case",
    },
    {
      label: "Éthique et biais",
      to: "/thread/ethics-and-bias",
      gloss: "qui le service touche, et comment",
    },
  ],
  accessibility: [
    {
      label: "Recherche sur les utilisateurs",
      to: "/thread/user-research",
      gloss: "tester avec de vrais utilisateurs, technologies d’assistance comprises",
    },
    {
      label: "Prestation intégrée",
      to: "/thread/joined-up-delivery",
      gloss: "une étape accessible dans un parcours inaccessible échoue quand même",
    },
    {
      label: "Approvisionnement",
      to: "/thread/procurement",
      gloss: "l’accessibilité inscrite dans ce que vous achetez",
    },
  ],
  security: [
    { label: "Protection de la vie privée", to: "/thread/privacy", gloss: "protéger les personnes derrière les données" },
    {
      label: "Approvisionnement",
      to: "/thread/procurement",
      gloss: "les exigences de sécurité inscrites au contrat",
    },
    {
      label: "Surveillance et instrumentation",
      to: "/thread/monitoring-and-instrumentation",
      gloss: "où vit la détection une fois le service en fonction",
    },
    {
      label: "Intendance des données",
      to: "/thread/data-stewardship",
      gloss: "manipuler et retirer les données en toute sécurité",
    },
  ],
  privacy: [
    {
      label: "Sécurité",
      to: "/thread/security",
      gloss: "les défenses qui gardent les renseignements personnels en sûreté",
    },
    {
      label: "Intendance des données",
      to: "/thread/data-stewardship",
      gloss: "comment les données sont détenues, transférées et retirées",
    },
    {
      label: "Éthique et biais",
      to: "/thread/ethics-and-bias",
      gloss: "les préjudices plus larges à surveiller",
    },
  ],
  procurement: [
    { label: "Financement", to: "/thread/funding", gloss: "comment l’achat est payé et approuvé" },
    {
      label: "Sécurité",
      to: "/thread/security",
      gloss: "les exigences auxquelles le fournisseur est tenu",
    },
    {
      label: "Intendance des données",
      to: "/thread/data-stewardship",
      gloss: "qui détient les données que vous avez achetées",
    },
  ],
  "data-stewardship": [
    { label: "Protection de la vie privée", to: "/thread/privacy", gloss: "les personnes derrière les données" },
    {
      label: "Sécurité",
      to: "/thread/security",
      gloss: "protéger les données et en disposer en toute sécurité",
    },
    { label: "Financement", to: "/thread/funding", gloss: "le transfert des données à la fin coûte de l’argent" },
  ],
  "ethics-and-bias": [
    { label: "Protection de la vie privée", to: "/thread/privacy", gloss: "des préjudices étroitement liés" },
    {
      label: "Recherche sur les utilisateurs",
      to: "/thread/user-research",
      gloss: "entendre les personnes touchées",
    },
    {
      label: "Accessibilité",
      to: "/thread/accessibility",
      gloss: "ne pas exclure des gens",
    },
  ],
  "team-capability": [
    {
      label: "Prestation intégrée",
      to: "/thread/joined-up-delivery",
      gloss: "l’équipe autour du parcours complet",
    },
    {
      label: "Approvisionnement",
      to: "/thread/procurement",
      gloss: "garder assez de capacité à l’interne",
    },
    { label: "Carnet de produit", to: "/thread/backlog", gloss: "adapter le travail à l’équipe dont vous disposez" },
  ],
  backlog: [
    {
      label: "Mise en production des changements",
      to: "/thread/releasing-changes",
      gloss: "transformer le carnet de produit en travail livré",
    },
    {
      label: "Surveillance et instrumentation",
      to: "/thread/monitoring-and-instrumentation",
      gloss: "les signaux qui remodèlent le carnet de produit",
    },
    {
      label: "Capacité de l’équipe",
      to: "/thread/team-capability",
      gloss: "ce que l’équipe peut réellement prendre en charge",
    },
  ],
  "joined-up-delivery": [
    {
      label: "Recherche sur les utilisateurs",
      to: "/thread/user-research",
      gloss: "comprendre le parcours complet",
    },
    {
      label: "Accessibilité",
      to: "/thread/accessibility",
      gloss: "chaque étape utilisable par tout le monde",
    },
    {
      label: "Capacité de l’équipe",
      to: "/thread/team-capability",
      gloss: "les personnes qui font le lien",
    },
    {
      label: "Gestion du changement",
      to: "/thread/change-management",
      gloss: "aider les gens à adopter un changement sur tout le parcours",
    },
  ],
  funding: [
    { label: "Approvisionnement", to: "/thread/procurement", gloss: "l’autre moitié de l’achat" },
    {
      label: "Prestation intégrée",
      to: "/thread/joined-up-delivery",
      gloss: "le financement d’un service, non d’un projet",
    },
  ],
  "change-management": [
    {
      label: "Prestation intégrée",
      to: "/thread/joined-up-delivery",
      gloss: "un changement traverse tout le parcours",
    },
    {
      label: "Capacité de l’équipe",
      to: "/thread/team-capability",
      gloss: "les personnes qui absorbent le changement",
    },
    {
      label: "Mise en production des changements",
      to: "/thread/releasing-changes",
      gloss: "le volet technique de la mise en production d’un changement",
    },
  ],
};
