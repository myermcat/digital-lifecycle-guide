/**
 * Prose for the requirements naming strip.
 *
 * These words used to live inside src/components/RequirementsNamingStrip.tsx.
 * The French build swaps modules under src/lib, never components, so anything
 * written in the component stayed English on the French site. Keeping the
 * strings here gives requirements-naming-strip-strings.fr.ts something to
 * replace.
 */

export type RequirementsNamingStripEntry = {
  /** Where this document sits relative to the requirements. */
  when: string;
  /** What the document is called. */
  name: string;
  /** What the document contains. */
  what: string;
  /** Who has to produce it, and from what point. */
  who: string;
  /** Why it is worth writing even when nobody demands it. */
  alsoUseful: string;
};

export const REQUIREMENTS_NAMING_STRIP_STRINGS: {
  conceptCase: RequirementsNamingStripEntry;
  requirements: RequirementsNamingStripEntry;
  statementOfWork: RequirementsNamingStripEntry;
} = {
  conceptCase: {
    when: "Avant, à l’étape de la Découverte",
    name: "Analyse de rentabilisation conceptuelle",
    what: "Un produit de la Découverte, rédigé avant le début de l’Alpha. Elle énonce le problème, l’ordre de grandeur de l’investissement et l’orientation envisagée, et s’arrête avant de choisir une solution.",
    who: "Obligatoire pour les projets habilités par le numérique à partir de 2,5 millions de dollars sans classe de capacité approuvée ou en classe 1, un seuil qui monte à 25 millions en classe 4.",
    alsoUseful: "Sous le seuil, personne n’en demande, et le gabarit vaut quand même la peine d’être utilisé.",
  },
  requirements: {
    when: "Entre les deux",
    name: "Les exigences",
    what: "Ce que le service doit faire, ce dont l’organisation a besoin, et comment le service doit se comporter.",
    who: "Le responsable opérationnel, pour chaque achat, sans aucun seuil monétaire.",
    alsoUseful: "Tout aussi nécessaires quand personne n’achète quoi que ce soit, puisque c’est ainsi que l’équipe sait quoi construire.",
  },
  statementOfWork: {
    when: "Après",
    name: "Énoncé des travaux",
    what: "La description des travaux achetés, rédigée à partir des exigences.",
    who: "Exigé seulement lorsque le ministère achète, parce qu’il appartient au contrat.",
    alsoUseful: "Une équipe interne peut très bien en rédiger un quand même. Il vient avec un gabarit, et un gabarit est plus facile comme point de départ qu’une page blanche.",
  },
};
