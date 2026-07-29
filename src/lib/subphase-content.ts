import type { SubphaseExtract } from "@/components/SubphaseExtractCard";
import type { ThreadLinkedProse } from "@/lib/thread-rich-content";

export type SubphaseWhatHappensPoint = ThreadLinkedProse & {
  lead: string;
};

export type SubphaseOnRampChecklist = {
  title: string;
  intro?: string;
  items: readonly (string)[]; // discovery uses plain strings; some pages may render richer nodes in dedicated components
};

export type SubphaseBodyContent = {
  lead: string;
  whatHappens: {
    intro: string;
    points: readonly SubphaseWhatHappensPoint[];
    closing: string;
  };
  onRamp: SubphaseOnRampChecklist;
};

/** Reader-facing H1 on sub-phase pages only; nav and breadcrumbs keep the short title. */
export const SUBPHASE_PAGE_HEADINGS = {
  discovery: "How the Discovery sub-phase works",
  alpha: "How the Alpha sub-phase works",
  beta: "How the Beta sub-phase works",
  stabilization: "How the Stabilization sub-phase works",
  growth: "How the Growth sub-phase works",
  maturity: "How the Maturity sub-phase works",
} as const;

export type SubphaseSlug = keyof typeof SUBPHASE_PAGE_HEADINGS;

/**
 * The dashed extract cards for sub-phases whose full pages are not built yet
 * (rendered on the placeholder), plus Maturity's card on its built page.
 * Stabilization's card lives with its full page content in live-stabilization-content.ts.
 */
export const SUBPHASE_EXTRACTS: Partial<Record<SubphaseSlug, SubphaseExtract>> = {
  growth: {
    spine: "Growth exists to extend what the service does and who it serves, while it runs.",
    opening: {
      text: "Growth is the second sub-phase of Live. With the service steady, the team:",
      internalLinks: [{ phrase: "Live", to: "/live" }],
    },
    workOutItems: [
      "adds capability, running each significant feature through its own small Discovery, Alpha, and Beta",
      "works on adoption until the people the service is for actually use it",
      "scales the service, the support, and the contract as more people arrive",
    ],
    scoped: {
      text: "Growth is a mode. A service leaves it when its scope settles, and returns to it with the next big addition.",
    },
    whatsNew: {
      label: "New since Stabilization",
      text: "Change is deliberate again. The team builds new things inside a running service.",
    },
    takeaway: {
      text: "A significant new feature brings the earlier checkpoints back: privacy, automation, architecture, procurement.",
      bold: [
        {
          phrase:
            "A significant new feature brings the earlier checkpoints back: privacy, automation, architecture, procurement.",
        },
      ],
    },
  },
  maturity: {
    spine: "Maturity exists to keep a steady service healthy, year after year.",
    opening: {
      text: "Maturity is the third sub-phase of Live, and the longest. Year after year, the team:",
      internalLinks: [{ phrase: "Live", to: "/live" }],
    },
    workOutItems: [
      "keeps the health cycle turning: monitoring, patching, research, and the yearly filings",
      "renews the funding and the contract before either runs out",
      "watches for the signals that point to Sunset",
    ],
    scoped: {
      text: "Maturity ends only by exit: back into Growth on a new mandate, or on to Sunset.",
    },
    whatsNew: {
      label: "New since Growth",
      text: "The scope has settled. The work turns from extending the service to sustaining it.",
    },
    takeaway: {
      text: "The renewals are the trap: funding and contracts end on their own schedule, and the lead time is easy to underestimate.",
      bold: [
        {
          phrase:
            "The renewals are the trap: funding and contracts end on their own schedule, and the lead time is easy to underestimate.",
        },
      ],
    },
  },
};

export const SUBPHASE_CONTENT: Partial<Record<string, SubphaseBodyContent>> = {
  discovery: {
    lead:
      "Discovery is the first sub-phase of Create, and nothing is built in it. It is a stretch of structured listening: the team talks to the people who live with the problem now, the applicants, the officers, the people caught in the middle, and maps what actually happens on the ground, beyond what the process document claims. The job is to understand the problem well enough that the right response becomes clear, and to work out whether a new service is even the answer. Discovery can end in a decision not to build, and that is a good outcome.",
    whatHappens: {
      intro: "Discovery is a handful of things done together:",
      points: [
        {
          lead: "Find the real need.",
          text: "Through user research, the team talks to and watches the people who use or run the service today, to learn what they actually need rather than what anyone assumes.",
          internalLinks: [{ phrase: "user research", to: "/thread/user-research" }],
        },
        {
          lead: "Map the whole task.",
          text: "The team follows the task the way a person experiences it, across every channel and any other service it touches, so the problem is understood end to end. This is the start of joined-up delivery.",
          internalLinks: [{ phrase: "joined-up delivery", to: "/thread/joined-up-delivery" }],
        },
        {
          lead: "Weigh reuse, buy, or build.",
          text: "Before any solution is named, the team checks whether something already exists to reuse or buy, since most existing government services were met that way. Options analysis sets out how to compare the choices, and procurement covers the look-before-you-buy step.",
          internalLinks: [
            { phrase: "Options analysis", to: "/reference/options-analysis" },
            { phrase: "procurement", to: "/thread/procurement" },
          ],
        },
      ],
      closing:
        "Discovery's output is a problem the whole team agrees on, evidence that it is real and worth solving, and a first view of how it might be met. That evidence is what justifies spending public money on the next sub-phase, or deciding to stop.",
    },
    onRamp: {
      title: "Before you start Discovery.",
      intro: "Arriving on a service already in Discovery? Check these are true:",
      items: [
        "There is a real, named problem, not just a solution someone wants to build.",
        "The people who live with the problem, users and the staff who serve them, have been identified.",
        "Someone owns the discovery and can act on what it finds.",
        "The team is free to conclude the service should not be built.",
      ],
    },
  },
} as const;

