import type { LucideIcon } from "lucide-react";
import {
  Archive,
  Briefcase,
  Code2,
  Coins,
  Eye,
  Flag,
  LifeBuoy,
  Server,
  Wrench,
} from "lucide-react";
import type { SubphaseExtract } from "@/components/SubphaseExtractCard";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import { LIFECYCLE_VISUALS, type LifecycleVisualAsset } from "@/lib/lifecycle-visuals";

export const STABILIZATION_EXTRACT: SubphaseExtract = {
  spine: "Stabilization exists to steady the service under real, full load.",
  opening: {
    text: "Stabilization is the first sub-phase of Live. It begins on launch day, and the team:",
    internalLinks: [{ phrase: "Live", to: "/live" }],
  },
  workOutItems: [
    "watches the service every day, because full load finds what testing missed",
    "fixes what breaks within days, with the people who built it still on call",
    "clears the launch leftovers: the registrations, the knowledge handover, the old way retired on its date",
  ],
  scoped: {
    text: "Stabilization is short: a few weeks to a couple of months. It comes once per launch, then briefly again after a major relaunch.",
  },
  whatsNew: {
    label: "New since Beta",
    text: "The invitation list is gone. Everyone the service is for can use it now, and every fault reaches real people at full volume.",
  },
  takeaway: {
    text: "Stabilization is finished when the service has become boring.",
    bold: [{ phrase: "Stabilization is finished when the service has become boring." }],
  },
};

export const STABILIZATION_LEAD: ThreadLinkedProse = {
  text: "The first weeks are firefighting. Real, full load sets off problems that testing could not, and the team puts each one out while the people who built the service are still close. Stabilization is the work of reaching the day when there is nothing left to put out.",
};

export const STABILIZATION_ON_RAMP = {
  title: "Before you start Stabilization",
  intro:
    "Stabilization starts the moment Beta ends, so its on-ramp is Beta's off-ramp. Have these ready on launch day:",
  items: [
    {
      text: "The dashboard live, with a named owner, built in Beta.",
      bold: [{ phrase: "The dashboard live," }],
      internalLinks: [{ phrase: "Beta", to: "/create-beta" }],
    },
    {
      text: "The support model staffed, reachable, and walked through the service before launch day.",
      bold: [{ phrase: "The support model staffed," }],
    },
    {
      text: "The running team named, with enough of it in-house to govern the work.",
      bold: [{ phrase: "The running team named," }],
    },
    {
      text: "The people who built it reachable. For a supplier build, the warranty, the after-launch period when the supplier fixes defects at no extra charge, pinned down in the contract with its response times; for an in-house build, the developers still assigned.",
      bold: [{ phrase: "The people who built it reachable." }],
    },
    {
      text: "The exit test agreed: what steady will look like, in numbers, decided before launch.",
      bold: [{ phrase: "The exit test agreed:" }],
    },
    {
      text: "If the service replaces an existing one, the old way still running, with its dated retirement plan. If the service is new, this does not apply.",
      bold: [{ phrase: "the old way still running," }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const STABILIZATION_PILLAR = {
  label: "THE MAKE-OR-BREAK QUESTION",
  title: "Agree how Stabilization ends before it begins",
  body: {
    text: "Heightened support feels safe, and that is its danger: a window with no exit test never closes, and the constant patching hides the weaknesses it should be fixing. Before launch day, agree what steady will look like in numbers, who decides the window is over, and what happens to anything still open when it closes. The decision belongs to the business owner of the application, made on the dashboard's evidence.",
    bold: [{ phrase: "agree what steady will look like in numbers" }],
  } satisfies ThreadLinkedProse,
  href: "/thread/monitoring-and-instrumentation",
  linkLabel: "See how to pick the numbers →",
  icon: Flag,
};

export type StabilizationAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  headerVisual?: LifecycleVisualAsset;
  sections: readonly ThreadContentSection[];
};

export const STABILIZATION_ACCORDION = {
  id: "running-your-service",
  title: "Running your service in Stabilization",
} as const;

export const STABILIZATION_ACCORDION_STAGES: readonly StabilizationAccordionStage[] = [
  {
    id: "watch-it-every-day",
    icon: Eye,
    title: "Watch it every day.",
    headerVisual: LIFECYCLE_VISUALS.serviceDashboard,
    sections: [
      {
        text: "The dashboard built in Beta is read every day now, because the first weeks under full load surface the faults that testing could not.",
        bold: [{ phrase: "read every day" }],
      },
      {
        text: "Support is a signal too. What people phone about, and where they give up, points at the next fix before the dashboard shows it.",
        bold: [{ phrase: "Support is a signal too." }],
      },
      {
        text: "The first real incidents are also the first test of the recovery targets set in Alpha. How long the service can be down and how much data it can afford to lose were a judgement then. Now they are a measurement, and if the restore takes twice as long as promised, that is worth knowing before anyone depends on the number.",
        bold: [{ phrase: "the first test of the recovery targets set in Alpha" }],
      },
      {
        text: "If the service charges fees, a rough first quarter has a statutory bill: under the Service Fees Act, a missed performance standard means remitting part of the fee the following year.",
        bold: [{ phrase: "If the service charges fees," }],
        externalLinks: [{ phrase: "Service Fees Act", linkKey: "service-fees-act" }],
      },
    ],
  },
  {
    id: "fix-fast",
    icon: Wrench,
    title: "Fix fast, in small releases.",
    sections: [
      {
        text: "The release pipeline built in Beta runs from day one: small changes, released often, each easy to reverse. Releasing changes covers the practice.",
        bold: [{ phrase: "small changes, released often" }],
        internalLinks: [{ phrase: "Releasing changes", to: "/thread/releasing-changes" }],
      },
      {
        text: "Not every early problem is code. Many are people finding their way: a confusing step, a letter that reads wrong, a process that needs a tweak. Those fixes belong on the same list and move just as fast.",
        bold: [{ phrase: "Not every early problem is code." }],
      },
    ],
  },
  {
    id: "keep-support-close",
    icon: LifeBuoy,
    title: "Keep support close.",
    sections: [
      {
        text: "Support answers for the service before the team hears anything, so keep the two close: what support hears on Monday should reach the team the same week.",
        bold: [{ phrase: "keep the two close" }],
      },
      {
        text: "Watch who is struggling. The first weeks show which people the service shuts out in practice, and the help for people who cannot use it on their own gets real use now.",
        bold: [{ phrase: "Watch who is struggling." }],
      },
    ],
  },
  {
    id: "taper-the-builder",
    icon: Code2,
    title: "Taper the build team out, and write the knowledge down.",
    sections: [
      {
        text: "Most existing services were bought, so the build team is usually a supplier: it stays reachable through the warranty, and the taper is agreed in the contract. A service built in-house tapers by assignment instead, with the developers partly assigned until the running team stands on its own.",
        bold: [{ phrase: "warranty" }],
      },
      {
        text: "The end of the warranty changes who pays for defect fixes. Support carries on under the contract's support terms, and the same supplier often returns in Growth, building new capability as new, paid work.",
        bold: [{ phrase: "The end of the warranty changes who pays for defect fixes." }],
      },
      {
        text: "What must not taper is the knowledge. Runbooks, known errors, and workarounds are written down as they are learned, so the running team keeps what the builders know. The test: if the build team disappeared tomorrow, the running team would cope. The service team covers keeping that capability.",
        bold: [{ phrase: "What must not taper is the knowledge." }],
        internalLinks: [{ phrase: "The service team", to: "/thread/team-capability" }],
      },
    ],
  },
  {
    id: "clear-the-leftovers",
    icon: Archive,
    title: "Clear the launch leftovers.",
    sections: [
      {
        text: "A few one-time duties follow launch, and they are easy to forget:",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "Register the service.",
            text: " Into the GC Service Inventory at the next annual update, and the application rated in Application Portfolio Management. The team supplies the details; the CIO office registers.",
          },
          {
            bold: "Retire the old way,",
            text: " if the service replaced one, on the dated plan made in Beta, once the new service holds. If the service is new, this does not apply.",
          },
          {
            bold: "Close out the handover.",
            text: " Training finished, documentation current, and an owner named for every fix still open, including who pays for it.",
          },
        ],
      },
      {
        text: "Both registrations come from the Directive on Service and Digital.",
        externalLinks: [
          {
            phrase: "Directive on Service and Digital",
            linkKey: "directive-on-service-and-digital",
          },
        ],
      },
    ],
  },
  {
    id: "watch-the-money",
    icon: Coins,
    title: "Watch the money, and the clock.",
    sections: [
      {
        text: "The first months produce the first real numbers for what the service costs to run. Usage-based costs settle only under real load, so compare them with the estimates early and flag surprises to funding before they compound.",
        bold: [{ phrase: "first real numbers" }],
        internalLinks: [{ phrase: "funding", to: "/thread/funding" }],
      },
      {
        text: "The contract clock is already running. Know the end date and the renewal lead time now, because renewals arrive faster than they feel.",
        bold: [{ phrase: "The contract clock is already running." }],
      },
    ],
  },
];

export const STABILIZATION_TEAM = {
  title: "The team you need",
  intro: {
    text: "Beta's team shrinks into the running shape. The minimum roles (one person can hold more than one):",
    bold: [{ phrase: "minimum roles" }],
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "Operations",
      icon: Server,
      body: { text: "keeps the service up and patched, and releases the fixes." },
    },
    {
      role: "Support lead",
      icon: LifeBuoy,
      body: { text: "helps people through, and reports what the calls are saying." },
    },
    {
      role: "Supplier or in-house developers",
      icon: Code2,
      body: { text: "fix defects while the warranty or the assignment lasts, and hand the knowledge over." },
    },
    {
      role: "Business owner of the application",
      icon: Briefcase,
      body: { text: "owns the decision that Stabilization is over." },
    },
  ] satisfies readonly SubphaseTeamRole[],
  closing: {
    text: "Keep the knowledge as the people change: runbooks, known errors, and decisions written down as they are learned. Stabilization is short: a few weeks to a couple of months is typical.",
    bold: [{ phrase: "a few weeks to a couple of months" }],
  } satisfies ThreadLinkedProse,
};

export const STABILIZATION_CAUTION = {
  title: "When Stabilization goes wrong",
  items: [
    "Launch was treated as the finish line, so nobody owns the running service.",
    "The old way is switched off before the new service holds.",
    "Support is overwhelmed, and what it hears never reaches the team.",
    "The people who built it were gone on launch day: no warranty, no handover.",
    "The heightened support never ends, and constant patching hides the weaknesses it should fix.",
  ],
};

export const STABILIZATION_FINISH = {
  title: "How you know Stabilization is finished",
  sectionId: "how-you-know-stabilization-is-finished",
  intro: {
    text: "Stabilization is finished when the exit test agreed before launch is met, and the service has become boring: incidents are rare and routine, support volume has settled while use keeps growing, performance holds at full load, and the running team resolves and escalates without the people who built it.",
    bold: [{ phrase: "the exit test agreed before launch is met" }],
  } satisfies ThreadLinkedProse,
  followUp: [
    {
      text: "Boring does not mean perfect. What remains broken is understood, owned, and consciously accepted.",
    },
  ] satisfies ThreadLinkedProse[],
  exits: [
    {
      lead: "Forward to Growth,",
      rest: {
        text: "when there is real new capability waiting to be built.",
      },
      href: "/live-growth",
    },
    {
      lead: "Onward to Maturity,",
      rest: {
        text: "when the service already has the scope it needs. Not every service grows, and going straight to the long steady state is a normal path.",
      },
      href: "/live-maturity",
    },
    {
      lead: "Back toward a rebuild,",
      rest: {
        text: "when weeks of fixing cannot settle the service and the fault is deeper than patches. This is rare, and it is a Create-sized decision.",
        internalLinks: [{ phrase: "Create", to: "/create" }],
      },
    },
  ],
  offRamp: {
    intro: {
      text: "The window closes on evidence. Before you move on, have ready:",
      bold: [{ phrase: "The window closes on evidence." }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "The exit test met, with the numbers that show it.",
        bold: [{ phrase: "The exit test met," }],
      },
      {
        text: "The runbook and the known-errors list, owned by the running team.",
        bold: [{ phrase: "The runbook and the known-errors list," }],
      },
      {
        text: "The warranty closed out, for a supplier build: open defects fixed or consciously accepted, each with a named owner. Closing it settles who pays for fixes; the contract's support terms carry on.",
        bold: [{ phrase: "The warranty closed out:" }],
      },
      {
        text: "The registrations done: the service in the GC Service Inventory, the application rated in Application Portfolio Management.",
        bold: [{ phrase: "The registrations done:" }],
      },
      {
        text: "The old way retired, if there was one.",
        bold: [{ phrase: "The old way retired," }],
      },
      {
        text: "A dashboard the team trusts, showing the numbers it actually runs the service by.",
        bold: [{ phrase: "A dashboard the team trusts," }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};
