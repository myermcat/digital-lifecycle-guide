import { SITE_NAME } from "@/lib/site-meta";

/**
 * The navigation module's own words.
 *
 * lifecycle-navigation.tsx is .tsx and mixes prose with layout and a set of
 * deprecated aliases, so a whole French twin would duplicate its logic to translate
 * about twenty strings. Only the words live here, where the build can swap them.
 *
 * The document-title suffix reads SITE_NAME rather than repeating it, so it follows
 * the language on its own; the English value is unchanged.
 */
export const NAV_STRINGS = {
  howThePhaseWorks: (phaseName: string) => `How the ${phaseName} phase works`,
  howTheSubphaseWorks: (subphaseName: string) => `How the ${subphaseName} sub-phase works`,

  documentTitleSuffix: SITE_NAME,

  subphase: {
    discovery: "Discovery",
    alpha: "Alpha",
    beta: "Beta",
    stabilization: "Stabilization",
    growth: "Growth",
    maturity: "Maturity",
  },

  subtitle: {
    discovery:
      "Before anything is designed or built, there is a period of structured listening. The team talks to the people who currently live with the problem, the applicants, the officers, the people caught in the middle, and maps what is actually happening, not what the process document says should happen. The goal is to understand the problem clearly enough that the right solution becomes obvious. The output is a problem statement the whole team agrees on, and enough evidence to justify spending public money on a new service.",
    alpha:
      "With a real problem to solve, the team starts making things cheaply and quickly, on purpose. Rough sketches, mock-ups of the screens, and clickable prototypes get put in front of people to test whether the team's assumptions are right. Most of them will not be. Each round of testing replaces a guess with a fact, and the concept gets sharper. The team might try several completely different approaches before one earns enough confidence to build for real. Nothing made in this sub-phase is meant to last. It is meant to teach.",
    beta:
      "The first version built to last does only the essential thing, and goes live to a limited audience or for a narrow use case. The point is to replace test conditions with real ones: real users, real data, real failure modes. The team watches what happens, measures it, and uses what they learn to decide what to build next. A version that teaches the team what users actually need is doing exactly what it is supposed to do.",
    stabilization: "Stabilize the service right after it goes live.",
    growth: "Add capability as more users arrive.",
    maturity:
      "The mature life of a digital service in the Live phase — operating and improving an existing service.",
  },

  navLabel: {
    livePhase: "Live phase",
    sunsetPhase: "Sunset phase",
    stabilizationSubphase: "Stabilization sub-phase",
    growthSubphase: "Growth sub-phase",
    maturitySubphase: "Maturity sub-phase",
  },
} as const;
