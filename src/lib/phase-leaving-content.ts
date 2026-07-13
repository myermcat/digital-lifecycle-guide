import type { LookingAheadPill } from "@/components/LookingAhead";
import { eolOfPartsComingSoonHref } from "@/lib/placeholder-sources";

export const LOOKING_AHEAD_INTRO =
  "Some things take a long time to prepare. Start before you are forced to. Here is what to keep an eye on from this sub-phase, and roughly when to begin.";

export type PhaseLeavingExit = {
  lead: string;
  rest: string;
  href?: string;
};

export type PhaseLeavingContent = {
  phaseName: string;
  sectionId: string;
  /** Override default "When you need to leave [phase]". */
  sectionTitle?: string;
  intro: string;
  /** Override default looking-ahead callout intro. */
  lookingAheadIntro?: string;
  exits: PhaseLeavingExit[];
  pills: LookingAheadPill[];
};

export type PhaseLeavingSlug =
  | "discovery"
  | "alpha"
  | "beta"
  | "stabilization"
  | "growth"
  | "maturity"
  | "sunset";

const BUILD_IN_YOUR_EXIT_PILL: LookingAheadPill = {
  label: "Build in your exit",
  intro: "The easiest time to keep your options open is now, before anything is signed.",
  items: [
    "Negotiate exit rights and data portability into any future contract from the start.",
    "Plan to keep the code in a repository your department controls from day one.",
  ],
};

export const PHASE_LEAVING_CONTENT: Record<PhaseLeavingSlug, PhaseLeavingContent> = {
  discovery: {
    phaseName: "Discovery",
    sectionId: "how-you-know-discovery-is-finished",
    sectionTitle: "How you know Discovery is finished",
    intro:
      "Discovery is finished when you have decided whether or not to move on to Alpha. That decision weighs two things: whether there is a viable service worth building, and whether it is cost-effective to pursue.",
    exits: [
      {
        lead: "Forward to Alpha,",
        rest: "when the problem is real and worth solving.",
        href: "/create-alpha",
      },
      {
        lead: "Stop or pause,",
        rest: "when the evidence says it is not worth building. Stopping here is a success, and it saves the money a wrong build would have cost.",
      },
    ],
    pills: [],
  },
  alpha: {
    phaseName: "Alpha",
    sectionId: "leaving-alpha",
    intro:
      "Alpha ends when the risky parts have been tested. Two things can move a service out of it.",
    exits: [
      {
        lead: "Forward to Beta,",
        rest: "when the riskiest parts have been tried and they hold, and you are ready to build the first real version.",
        href: "/create-beta",
      },
      {
        lead: "Back to Discovery,",
        rest: "when alpha shows the problem was not understood well enough, and you need to re-learn before building.",
        href: "/create-discovery",
      },
    ],
    pills: [BUILD_IN_YOUR_EXIT_PILL],
  },
  beta: {
    phaseName: "Beta",
    sectionId: "leaving-beta",
    intro: "First delivery ends when the service is real and running. Two things can move it on.",
    exits: [
      {
        lead: "Forward to Stabilisation,",
        rest: "when the first real version is in users' hands and the work shifts from building to steadying.",
        href: "/live-stabilization",
      },
      {
        lead: "Back to Alpha,",
        rest: "when first delivery shows the approach does not work and needs rethinking before going further.",
        href: "/create-alpha",
      },
    ],
  },
  stabilization: {
    phaseName: "Stabilization",
    sectionId: "leaving-stabilization",
    intro: "Stabilisation ends when the service is steady. Two things can move it on.",
    exits: [
      {
        lead: "Forward to Growth,",
        rest: "when the service is steady and the work turns to extending it.",
        href: "/live-growth",
      },
      {
        lead: "Back to a rebuild,",
        rest: "when stabilisation cannot settle the service and a deeper fix or replatforming is needed.",
      },
    ],
    pills: [
      {
        label: "The next contract renewal",
        intro: "Even early, the contract clock is already running.",
        items: [
          "Know the contract end date and the lead time to renew or re-compete.",
        ],
      },
    ],
  },
  growth: {
    phaseName: "Growth",
    sectionId: "leaving-growth",
    intro: "Growth ends when the service has the scope it needs. Two things can move it on.",
    exits: [
      {
        lead: "Forward to Maturity,",
        rest: "when the service has the scope it needs and the work turns to running it well over the long term.",
        href: "/live-maturity",
      },
      {
        lead: "Back to Stabilisation,",
        rest: "when growth destabilises the service and it needs steadying again.",
        href: "/live-stabilization",
      },
    ],
    pills: [
      {
        label: "The scaling ceiling",
        intro: "Growth meets limits, and raising them takes time to plan.",
        items: [
          "Watch for the capacity or licence limits you are heading toward.",
          "Plan the next step before you hit the wall, not after.",
        ],
      },
      {
        label: "The next contract renewal",
        intro: "Renewals arrive faster than they feel.",
        items: [
          "Know when the current contract ends and how long a re-competition takes.",
          "Decide early whether you are renewing, re-competing, or moving.",
        ],
      },
    ],
  },
  maturity: {
    phaseName: "Maturity",
    sectionId: "leaving-maturity",
    intro:
      "Maturity is the longest sub-phase, but not permanent. Three things can move a service out of it.",
    exits: [
      {
        lead: "Back to Growth,",
        rest: "when a new mandate or expanding scope means you are delivering substantial new features again.",
        href: "/live-growth",
      },
      {
        lead: "Forward to Sunset,",
        rest: "when a sunset signal appears: support ending, a replacement coming, the user base shrinking, the policy basis going away.",
        href: "/sunset",
      },
      {
        lead: "Back to a Stabilization-like mode,",
        rest: "when a critical failure or major replatforming forces a period of rapid stabilisation.",
        href: "/live-stabilization",
      },
    ],
    pills: [
      {
        label: "Preparing for sunset",
        intro:
          "The end of this application will take longer to handle than you expect. Begin before the signals get loud.",
        items: [
          "Know your contract end date, and work backwards from it. Moving your data and workload out is often months of work, not weeks.",
          "If you do not know how long an exit would actually take, that is the first thing to find out.",
          "Watch the sunset signals your dashboard already tracks: support ending, a replacement arriving, the user base shrinking, the policy basis going away.",
          "Do not deepen lock-in this late with new customisations you will only have to unwind.",
        ],
      },
      {
        label: "The next contract renewal",
        intro:
          "Renewals arrive faster than they feel, and re-competing has its own lead time.",
        items: [
          "Know when the current contract ends and how long a re-competition takes in practice.",
          "Decide early whether you are renewing, re-competing, or moving. Each needs a different runway.",
        ],
      },
      {
        label: "Components reaching end of life",
        intro:
          "The bought and borrowed parts of your service age on their own schedule, not yours.",
        items: [
          "Track the support timelines of the major components you depend on.",
          "A component going end of life can force a move before you planned one. Spot it early.",
        ],
        href: eolOfPartsComingSoonHref(),
        linkLabel: "EoL of parts →",
      },
    ],
  },
  sunset: {
    phaseName: "Sunset",
    sectionId: "leaving-sunset",
    intro:
      "Sunset is the end of the line. Leaving it means the service is gone and what replaces it has taken over.",
    exits: [
      {
        lead: "Out of the lifecycle,",
        rest: "when the service is retired or fully replaced, the data is moved, and the contract is closed. There is no next sub-phase.",
      },
    ],
    pills: [
      {
        label: "Handing over cleanly",
        intro: "Switching off is the last step, not the first.",
        items: [
          "Know what the replacement is and that it is ready before you switch off.",
          "Plan the data move and the contract close with their real lead times.",
        ],
      },
    ],
  },
};

export function getPhaseLeavingContent(
  slug: PhaseLeavingSlug,
): PhaseLeavingContent {
  return PHASE_LEAVING_CONTENT[slug];
}

export function phaseLeavingSlugOrNull(
  slug: string,
): PhaseLeavingSlug | undefined {
  if (slug in PHASE_LEAVING_CONTENT) {
    return slug as PhaseLeavingSlug;
  }
  return undefined;
}
