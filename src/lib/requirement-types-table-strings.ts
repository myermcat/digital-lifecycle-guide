/**
 * Words for the three-kinds-of-requirement table.
 *
 * They used to sit inside `@/components/RequirementTypesTable`, where the
 * French build cannot reach them: the locale plugin swaps modules under
 * `src/lib`, never components, so English in a component ships untranslated on
 * the French site. They live here so `requirement-types-table-strings.fr.ts`
 * can stand in for this file.
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
    kind: "Kind",
    whatItSays: "What it says",
    howItAges: "How it ages",
  },
  /** Chip under each kind: whether a contract can safely hold a supplier to it. */
  toneLabels: {
    stable: "Safe to contract",
    volatile: "Keep out of the contract",
  },
  rows: {
    business: {
      kind: "Business",
      says: "What the organization needs, and why, in the language of the program.",
      example: "Applicants can find out where their application stands without phoning anyone.",
      ages: "Slowly. What people need from a service outlasts any particular version of it, so these are safe to commit to.",
    },
    functional: {
      kind: "Functional",
      says: "What the system must do, screen by screen and step by step.",
      example: "The service must show the applicant the current stage of their application and the date it last changed.",
      ages: "Fast. These change as soon as real users touch the service, which is what Alpha is for. Pinning them into a contract is how a department pays for a service nobody wanted.",
    },
    nonFunctional: {
      kind: "Non-functional",
      says: "How the service has to behave: how fast, how available, how long it holds records, which accessibility standard it meets, how quickly it recovers.",
      example: "The service must be available 99.5 per cent of each month, must meet EN 301 549, and must be restored within four hours of an outage.",
      ages: "Slowly, and it can be tested. This is what a contract should hold a supplier to.",
    },
  },
};
