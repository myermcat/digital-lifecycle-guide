/**
 * La version française de `route-timing-table-strings.ts`.
 *
 * Les mots étaient codés en dur dans `src/components/RouteTimingTable.tsx`, et
 * rien dans `src/components` n’est permuté par le module de langue : la version
 * française ne pouvait donc pas les atteindre. Ils vivent ici, dans `src/lib`,
 * où le build français substitue ce fichier à l’anglais.
 *
 * L’ordre des lignes est du code et reste dans le composant ; les clés portent
 * le sens.
 */

export const ROUTE_TIMING_TABLE_STRINGS = {
  columnHeadings: {
    route: "Voie",
    competition: "Concours",
    contractSigned: "Contrat signé",
    why: "Pourquoi",
  },

  rows: {
    buyATeam: {
      route: "Acheter une Équipe",
      competition: "Découverte",
      signature: "À l’ouverture de l’Alpha",
      why: "C’est l’équipe qui réalise l’Alpha : elle doit donc être là dès le premier jour.",
    },
    agileProcurementModel: {
      route: "Le modèle d’approvisionnement agile",
      competition: "Découverte",
      signature: "À l’ouverture de l’Alpha",
      why: "C’est la forme que SPAC expose. Les prototypes sont construits sous contrat : les contrats viennent donc en premier, avec plusieurs fournisseurs signés à la fois. La construction est une option à l’intérieur du contrat du gagnant, exercée par modification.",
    },
    buyASolution: {
      route: "Acheter une Solution (traditionnel)",
      competition: "Alpha",
      signature: "À l’ouverture de la Bêta",
      why: "Le ministère prototype d’abord, pour pouvoir dire ce qu’il veut avant de demander à quiconque de le chiffrer.",
    },
    buyAFinishedProduct: {
      route: "Acheter un Produit fini (traditionnel)",
      competition: "Alpha",
      signature: "À l’ouverture de la Bêta",
      why: "Rien n’est prototypé, parce que le produit existe. L’Alpha sert à évaluer de vrais produits.",
    },
    buildInHouseOrReuse: {
      route: "Construire à l’interne, ou réutiliser",
      competition: "Aucun",
      signature: "Aucun",
      why: "Il n’y a pas de fournisseur : il n’y a donc rien à mettre en concours et rien à signer.",
    },
  },
};
