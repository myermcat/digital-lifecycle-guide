/**
 * Words for the three-kinds-of-requirement table.
 *
 * They used to sit inside `@/components/RequirementTypesTable`, where the
 * French build cannot reach them: the locale plugin swaps modules under
 * `src/lib`, never components, so English in a component ships untranslated on
 * the French site. This file is the French half of that swap.
 *
 * The examples are written the way a real Government of Canada requirement is
 * written. PSPC's statement-of-work guidance says to use "must", not "shall",
 * and the general conditions bear that out: GC 2035 uses "must" throughout and
 * "shall" nowhere. A business requirement takes no modal verb at all, because it
 * states a need and not an obligation on a system.
 */
export const REQUIREMENT_TYPES_TABLE_STRINGS = {
  /** Column headings, in render order. */
  columnHeadings: {
    kind: "Type",
    whatItSays: "Ce qu’elle dit",
    howItAges: "Comment elle vieillit",
  },
  /** Chip under each kind: whether a contract can safely hold a supplier to it. */
  toneLabels: {
    stable: "Sûr à inscrire au contrat",
    volatile: "À garder hors du contrat",
  },
  rows: {
    business: {
      kind: "Opérationnelles",
      says: "Ce dont l’organisation a besoin, et pourquoi, dans le langage du programme.",
      example: "Les demandeurs peuvent savoir où en est leur demande sans téléphoner à personne.",
      ages: "Lentement. Ce dont les gens ont besoin d’un service survit à n’importe quelle version particulière de celui-ci; on peut donc s’y engager sans risque.",
    },
    functional: {
      kind: "Fonctionnelles",
      says: "Ce que le système doit faire, écran par écran et étape par étape.",
      example: "Le service doit montrer au demandeur l’étape actuelle de sa demande et la date du dernier changement.",
      ages: "Vite. Elles changent dès que de vrais utilisateurs touchent au service, et c’est à cela que sert l’Alpha. Les figer dans un contrat, c’est ainsi qu’un ministère paie pour un service dont personne ne voulait.",
    },
    nonFunctional: {
      kind: "Non fonctionnelles",
      says: "Comment le service doit se comporter : à quelle vitesse, avec quelle disponibilité, pendant combien de temps il conserve les documents, quelle norme d’accessibilité il respecte, à quelle vitesse il se rétablit.",
      example: "Le service doit être disponible 99,5 pour cent de chaque mois, doit respecter la norme EN 301 549 et doit être rétabli dans les quatre heures suivant une panne.",
      ages: "Lentement, et cela peut être testé. C’est à cela qu’un contrat devrait tenir un fournisseur.",
    },
  },
};
