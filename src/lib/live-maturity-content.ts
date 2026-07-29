import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Briefcase,
  CalendarClock,
  ClipboardList,
  Code2,
  Coins,
  LifeBuoy,
  Server,
  ShieldCheck,
  Telescope,
  Users,
} from "lucide-react";
import type { SubphaseTeamRole } from "@/components/SubphaseTeamRoles";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import { LIFECYCLE_VISUALS, type LifecycleVisualAsset } from "@/lib/lifecycle-visuals";

export const MATURITY_LEAD: ThreadLinkedProse = {
  text: "A mature service runs every day because a team keeps it running. Parts age out of support, people change jobs, and the funding and the contract move toward their end dates, and none of it pauses because the service seems fine. The team stays ahead of it all on a cycle: watching, patching, researching, filing, renewing. Most of a service's life is spent in Maturity, and so is most of its work.",
};

export const MATURITY_ON_RAMP = {
  title: "Before you start Maturity",
  intro:
    "Maturity is entered from Stabilization when a service already has the scope it needs, or from Growth when the scope settles. Have these ready:",
  items: [
    {
      text: "A steady service. Incidents are rare and routine, performance holds, and support volume has settled.",
      bold: [{ phrase: "A steady service." }],
    },
    {
      text: "The running team named, with a steady slice of developer time for fixes and small improvements.",
      bold: [{ phrase: "The running team named," }],
    },
    {
      text: "A dashboard the team trusts, read on a cadence, with a named owner.",
      bold: [{ phrase: "A dashboard the team trusts," }],
    },
    {
      text: "The renewal dates written down: when the contract ends, when the funding envelope ends, and the lead time each renewal needs.",
      bold: [{ phrase: "The renewal dates written down:" }],
    },
    {
      text: "The knowledge owned by the running team: runbooks, known errors, and the decisions that shaped the service.",
      bold: [{ phrase: "The knowledge owned by the running team:" }],
    },
  ] satisfies readonly ThreadLinkedProse[],
};

export const MATURITY_PILLAR = {
  label: "THE MAKE-OR-BREAK QUESTION",
  title: "Start every renewal before it feels urgent",
  body: {
    text: "Nothing in Maturity fails as predictably as a renewal started late. Funding envelopes end on a date, contracts end on a date, and both need months of lead time: a new funding decision moves at the speed of approvals, and re-competing a contract takes longer still. A renewal begun late leaves one option, extending with the current supplier on the current terms, and every emergency extension deepens the lock-in. Put every end date on a calendar the team actually looks at, with the start-by date beside it.",
    bold: [
      { phrase: "Put every end date on a calendar the team actually looks at" },
    ],
    internalLinks: [
      { phrase: "a new funding decision", to: "/thread/funding" },
    ],
  } satisfies ThreadLinkedProse,
  href: "/thread/procurement",
  linkLabel: "See how contract renewals are planned →",
  icon: CalendarClock,
};

export type MaturityAccordionStage = {
  id: string;
  icon: LucideIcon;
  title: string;
  headerVisual?: LifecycleVisualAsset;
  sections: readonly ThreadContentSection[];
};

export const MATURITY_ACCORDION = {
  id: "running-your-service",
  title: "Running your service in Maturity",
} as const;

export const MATURITY_ACCORDION_STAGES: readonly MaturityAccordionStage[] = [
  {
    id: "keep-it-working",
    icon: Activity,
    title: "Keep the service working.",
    headerVisual: LIFECYCLE_VISUALS.serviceDashboard,
    sections: [
      {
        text: "The health cycle from the earlier sub-phases keeps turning, at a steadier pace. The dashboard is read on a cadence, small changes go out through the same pipeline, and updates are applied as they arrive. Monitoring and instrumentation and releasing changes carry the practice.",
        bold: [{ phrase: "The health cycle" }],
        internalLinks: [
          { phrase: "Monitoring and instrumentation", to: "/thread/monitoring-and-instrumentation" },
          { phrase: "releasing changes", to: "/thread/releasing-changes" },
        ],
      },
      {
        text: "Parts age on their own schedule. The libraries, platforms, and bought products the service is built on each have an end-of-support date, and a part past that date stops receiving security fixes. Track the dates, and plan each replacement before its support ends. Dependencies and standards covers the watch.",
        bold: [{ phrase: "Parts age on their own schedule." }],
        internalLinks: [
          { phrase: "Dependencies and standards", to: "/thread/dependencies-and-standards" },
        ],
      },
      {
        text: "The Government of Canada tracks this too: each application's health is recorded in the department's Application Portfolio Management tool, and running unsupported technology is prohibited under the Standard on At-Risk Information Technology. The CIO office reports; the team keeps its application's record true.",
        bold: [{ phrase: "running unsupported technology is prohibited" }],
        externalLinks: [
          { phrase: "Standard on At-Risk Information Technology", linkKey: "standard-at-risk-it" },
        ],
      },
    ],
  },
  {
    id: "keep-it-good-for-users",
    icon: Users,
    title: "Keep it good for the people who use it.",
    sections: [
      {
        text: "The dashboard shows where people struggle; research with the people themselves shows why. A round of user research once a year is a common floor, and the findings go into the backlog like any other work.",
        bold: [{ phrase: "research with the people themselves shows why" }],
        internalLinks: [
          { phrase: "user research", to: "/thread/user-research" },
          { phrase: "backlog", to: "/thread/backlog" },
        ],
      },
      {
        text: "Accessibility drifts when nobody tests it. Standards move, assistive technologies update, and small releases add small barriers. Test on a cadence, with assistive technology and with the people most likely to be excluded, and fix what the testing finds. From December 2027 each service's results also feed the department's accessibility statement.",
        bold: [{ phrase: "Accessibility drifts when nobody tests it." }],
        internalLinks: [{ phrase: "Accessibility", to: "/thread/accessibility" }],
      },
      {
        text: "The service is one step in a longer journey. As it changes, keep the services on either side and the other channels in step: call centre scripts updated, operations staff retrained, partner teams told. Joined-up delivery covers the craft.",
        bold: [{ phrase: "one step in a longer journey" }],
        internalLinks: [
          { phrase: "Joined-up delivery", to: "/thread/joined-up-delivery" },
        ],
      },
    ],
  },
  {
    id: "keep-it-safe-and-lawful",
    icon: ShieldCheck,
    title: "Keep it safe and lawful.",
    sections: [
      {
        text: "None of the protective work pauses because nothing has gone wrong:",
      },
      {
        type: "unorderedList",
        items: [
          {
            text: "Kept secure. Patching on schedule, access audited, vulnerabilities tested for, and the incident plan kept current. Security carries the practice.",
            bold: [{ phrase: "Kept secure." }],
            internalLinks: [{ phrase: "Security", to: "/thread/security" }],
          },
          {
            text: "Kept private. The privacy assessment matches the service as it runs today, and it is updated when the service changes what personal information it uses to make decisions about people. Privacy covers how.",
            bold: [{ phrase: "Kept private." }],
            internalLinks: [{ phrase: "Privacy", to: "/thread/privacy" }],
          },
          {
            text: "The data looked after. Retention periods are applied and disposition runs on its schedule: nothing destroyed without the authority that covers it. Data stewardship holds the full picture.",
            bold: [{ phrase: "The data looked after." }],
            internalLinks: [
              { phrase: "Data stewardship", to: "/thread/data-stewardship" },
            ],
          },
          {
            text: "Automated decisions re-tested. If the service makes them, the bias testing recurs and the Algorithmic Impact Assessment is reviewed as the system changes. Ethics and bias covers the schedule.",
            bold: [{ phrase: "Automated decisions re-tested." }],
            internalLinks: [
              { phrase: "Ethics and bias", to: "/thread/ethics-and-bias" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "make-the-yearly-filings",
    icon: ClipboardList,
    title: "Make the yearly filings.",
    sections: [
      {
        text: "A running service has registry duties that recur:",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "The GC Service Inventory,",
            text: " updated every year through the department's data call. The team supplies its service's numbers; the designated official files them.",
          },
          {
            bold: "The Application Portfolio Management record,",
            text: " kept current, so the department's picture of its applications stays true.",
          },
          {
            bold: "The service standards, reviewed regularly.",
            text: " The directive requires regular review; reviewing them each year, against that year's performance, is the common advice.",
          },
          {
            text: "If the service charges fees, the Service Fees Act adds statutory duties: a fees report tabled in Parliament each fiscal year, fees adjusted yearly by inflation, and part of the fee remitted when the performance standard was missed.",
            bold: [{ phrase: "If the service charges fees," }],
            externalLinks: [
              { phrase: "Service Fees Act", linkKey: "service-fees-act" },
            ],
          },
        ],
      },
      {
        text: "The first three come from the Directive on Service and Digital.",
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
    id: "renew-before-it-runs-out",
    icon: Coins,
    title: "Renew before anything runs out.",
    sections: [
      {
        text: "Two clocks run through Maturity, and each renewal has its own runway:",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "The funding.",
            text: " A time-limited envelope ends on its date and is renewed by a new funding decision, and approvals move in months. The running money itself comes through the Estimates each year.",
          },
          {
            bold: "The contract.",
            text: " Renewing means choosing early: exercise the option years, re-compete, or move to something else. Each path needs a different runway, and re-competing needs the longest. The room the contract left for new work, its options and its task-authorization ceiling, is also being consumed as the years pass, so check what remains.",
          },
        ],
      },
      {
        text: "Between renewals, hold the supplier to the contract: the service levels reported, the exit obligations kept real, the lock-in watched. What a good contract looks like shows the clauses this relies on.",
        bold: [{ phrase: "hold the supplier to the contract" }],
        internalLinks: [
          { phrase: "What a good contract looks like", to: GOOD_CONTRACT_PATH },
        ],
      },
    ],
  },
  {
    id: "watch-for-the-exit",
    icon: Telescope,
    title: "Watch for the signals that point to Sunset.",
    sections: [
      {
        text: "Every service ends eventually, and watching for the end is part of running one well. Canada builds in a checkpoint: the Directive on Service and Digital requires each service to be reviewed with its clients, partners, and stakeholders at least once every five years, looking at redesign, online uptake, efficiency, and alternate ways of delivering it.",
        bold: [{ phrase: "at least once every five years" }],
      },
      {
        text: "Five years is the floor. Teams that review more often see the signals earlier, and a light pass over the same questions once a year is enough. The signals worth watching:",
        bold: [{ phrase: "Five years is the floor." }],
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "The need moves.",
            text: " The policy behind the service changes, or another service absorbs what this one did.",
          },
          {
            bold: "The users leave.",
            text: " The base shrinks until the cost of running the service stops matching the number it serves.",
          },
          {
            bold: "The ground shifts.",
            text: " A platform or product the service stands on is ending its support, and replacing it would cost as much as starting fresh.",
          },
        ],
      },
      {
        text: "When the signals hold, the crossing into Sunset is planned and paid for while the current money is still there. An exit is real work, moving the data, running in parallel, closing the contracts cleanly, and it is measured in months, so the first number to learn is how long an exit would actually take. From that point on, avoid new customisations that deepen the lock-in: they only make the exit longer.",
        bold: [{ phrase: "planned and paid for while the current money is still there" }],
        internalLinks: [{ phrase: "Sunset", to: "/sunset" }],
      },
    ],
  },
];

export const MATURITY_TEAM = {
  title: "The team you need",
  intro: {
    text: "A mature service runs on a smaller team than a build, and the shape holds for years (one person can hold more than one role):",
    bold: [{ phrase: "smaller team than a build" }],
  } satisfies ThreadLinkedProse,
  roles: [
    {
      role: "Operations",
      icon: Server,
      body: { text: "keep the service up, patched, and monitored, and release the fixes." },
    },
    {
      role: "Support lead",
      icon: LifeBuoy,
      body: { text: "helps people through, and reports what the calls are saying." },
    },
    {
      role: "Developers, supplier or in-house",
      icon: Code2,
      body: {
        text: "a steady slice of capacity for fixes and small improvements. The slice can be small; a service that stops improving ages toward a forced replacement.",
      },
    },
    {
      role: "Business owner of the application",
      icon: Briefcase,
      body: {
        text: "owns the renewal calendar, the yearly filings, and the decision that Maturity is ending.",
      },
    },
  ] satisfies readonly SubphaseTeamRole[],
  closing: {
    text: "Maturity is measured in years, so everyone on this list will eventually move on. What carries across the changes is what was written down: the runbooks, the known errors, and the reasons behind the decisions. Treat the writing as part of the job. The service team covers keeping the capability.",
    bold: [{ phrase: "What carries across the changes is what was written down:" }],
    internalLinks: [{ phrase: "The service team", to: "/thread/team-capability" }],
  } satisfies ThreadLinkedProse,
};

export const MATURITY_CAUTION = {
  title: "When Maturity goes wrong",
  items: [
    "Improvement stops: the service is patched but never made better, and it ages toward a forced replacement.",
    "A renewal starts late, and the only option left is an emergency extension on the supplier's terms.",
    "The health cycle turns on paper: the boxes tick, the dashboard is read, and nothing changes as a result.",
    "Nobody from outside ever looks at the service, so the team stops seeing its own gaps.",
    "The knowledge leaves with the people: the team can still operate the service but no longer understands it.",
  ],
};

export const MATURITY_FINISH = {
  title: "How you know Maturity is finished",
  sectionId: "how-you-know-maturity-is-finished",
  intro: {
    text: "Maturity has no finish line of its own. It ends when something outside the routine changes: a new mandate arrives, or the signals say the service's time is ending.",
    bold: [{ phrase: "Maturity has no finish line of its own." }],
  } satisfies ThreadLinkedProse,
  followUp: [] satisfies ThreadLinkedProse[],
  exits: [
    {
      lead: "Back to Growth,",
      rest: {
        text: "when a new mandate or a significant new capability needs building. The earlier checkpoints come back with it.",
      },
      href: "/live-growth",
    },
    {
      lead: "Forward to Sunset,",
      rest: {
        text: "when the signals hold: the need met elsewhere, the users leaving, the policy basis gone, or the platform ending. Retiring a service well is its own project, and it starts while the money is still there.",
      },
      href: "/sunset",
    },
    {
      lead: "Back into a Stabilization-like window,",
      rest: {
        text: "after a major replatform or a serious failure, while the service steadies again. This is rare.",
      },
      href: "/live-stabilization",
    },
  ],
  offRamp: {
    intro: {
      text: "Whichever exit, leave in good order. Before you move on, have ready:",
      bold: [{ phrase: "leave in good order" }],
    } satisfies ThreadLinkedProse,
    items: [
      {
        text: "The decision made on evidence: the review findings, the dashboard, and the costs, written down as the reason for the exit.",
        bold: [{ phrase: "The decision made on evidence:" }],
      },
      {
        text: "The money for what comes next set aside before the current funding ends.",
        bold: [{ phrase: "The money for what comes next set aside" }],
      },
      {
        text: "The knowledge current: runbooks, decisions, and the contract's end-of-term obligations, so whoever comes next inherits a service they can understand.",
        bold: [{ phrase: "The knowledge current:" }],
      },
      {
        text: "The registrations true: the service's inventory entry and its application record match reality, ready for whoever follows to close or transfer.",
        bold: [{ phrase: "The registrations true:" }],
      },
    ] satisfies readonly ThreadLinkedProse[],
  },
};
