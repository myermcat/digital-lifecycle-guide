/**
 * The route timing table's own words.
 *
 * They were hard-coded inside `src/components/RouteTimingTable.tsx`, and nothing
 * in `src/components` is ever source-swapped by the locale plugin, so the French
 * build could not reach them and rendered them in English. They live here, in
 * `src/lib`, where `route-timing-table-strings.fr.ts` takes their place.
 *
 * Row order is code and stays in the component; these are keyed by meaning.
 */

export const ROUTE_TIMING_TABLE_STRINGS = {
  columnHeadings: {
    route: "Route",
    competition: "Competition runs",
    contractSigned: "Contract signed",
    why: "Why",
  },

  rows: {
    buyATeam: {
      route: "Buy a Team",
      competition: "Discovery",
      signature: "As Alpha opens",
      why: "The team is what does Alpha, so it has to be there on the first day.",
    },
    agileProcurementModel: {
      route: "The agile procurement model",
      competition: "Discovery",
      signature: "As Alpha opens",
      why: "This is the shape PSPC sets out. The prototypes are built under contract, so the contracts come first, with several suppliers signed at once. The build is an option inside the winner's contract, exercised by amendment.",
    },
    buyASolution: {
      route: "Buy a Solution (traditional)",
      competition: "Alpha",
      signature: "As Beta opens",
      why: "The department prototypes first, so it can say what it wants before asking anyone to price it.",
    },
    buyAFinishedProduct: {
      route: "Buy a Finished Product (traditional)",
      competition: "Alpha",
      signature: "As Beta opens",
      why: "Nothing is prototyped, because the product exists. Alpha is spent evaluating real products.",
    },
    buildInHouseOrReuse: {
      route: "Build in-house, or reuse",
      competition: "None",
      signature: "None",
      why: "There is no supplier, so there is nothing to compete and nothing to sign.",
    },
  },
};
