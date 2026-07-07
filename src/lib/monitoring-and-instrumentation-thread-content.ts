import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import { procurementSubPath } from "@/lib/procurement-landing";
import {
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  threadWhyItMattersPitchPlainText,
  type ThreadCloserLookBlock,
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type MonitoringLinkedProse = ThreadLinkedProse;
export type MonitoringContentSection = ThreadContentSection;
export type MonitoringCloserLookBlock = ThreadCloserLookBlock;
export type MonitoringPhasePreviewBlock = ThreadPhasePreviewBlock;

export const monitoringLeadPlainText = (
  lead: readonly ThreadLinkedProse[],
  keyCallout?: string,
) => [lead.map((paragraph) => paragraph.text).join(" "), keyCallout].filter(Boolean).join(" ");
export const monitoringSectionsPlainText = threadSectionsPlainText;
export const monitoringWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);
export const monitoringWhyItMattersPlainText = threadWhyItMattersPitchPlainText;

export const MONITORING_INSTRUMENT_SEE_ACT_DIAGRAM_ALT =
  "Diagram: Instrument it, See it, and Act on it in a loop. The signals only matter once they turn into work.";

export const MONITORING_BLIND_VS_SEEING_DIAGRAM_ALT =
  "Diagram: Not instrumented — no signals, so the team guesses — versus instrumented — signals show how it is doing. The same service; the difference is whether it was built to show what it is doing.";

export const MONITORING_THREAD = {
  title: "Monitoring and instrumentation",
  slug: "monitoring-and-instrumentation" as const,

  keyCallout: "A team cannot improve what it cannot see.",

  lead: [
    {
      text:
        "A live service is sending signals about how it is doing all the time: which tasks people finish, where they get stuck, what breaks, how long things take. Monitoring is the work of collecting those signals and looking at the few that matter, so the team can see whether the service is actually working for the people who use it.",
    },
    {
      text:
        "Two things make that possible, in order. First, instrument the service: build it so it records what happens as people use it. Then watch a small set of signals and act on them. The instrumentation comes first, because a beautiful dashboard built on signals the service never emitted shows nothing real.",
      bold: [
        { phrase: "instrument" },
        { phrase: "watch" },
        { phrase: "act" },
      ],
    },
    {
      text:
        "This is not optional for a Government of Canada service. The Guideline on Service and Digital requires departments to measure service performance and to collect and use client feedback to improve. Monitoring is how a team meets that obligation, and how it notices a problem before it becomes a crisis.",
      externalLinks: [
        {
          phrase: "Guideline on Service and Digital",
          linkKey: "guideline-service-digital",
        },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies ThreadLinkedProse[],

  whatGoodLooksLike: [
    {
      text: "Signals come from the service itself, generated as people use it, rather than typed into a spreadsheet by hand.",
    },
    {
      text: "The team watches a small set of signals tied to real user experience and system health.",
    },
    {
      text:
        "Every signal that matters has a target set in advance, so the team can tell whether a number is good or bad.",
    },
    {
      text: "Dashboards are readable, trusted, and visible to the bodies that review the service.",
    },
    {
      text:
        "Every signal that matters has an owner who acts on it, and an all-green dashboard is allowed to generate nothing.",
    },
    {
      text: "Instrumentation is built into the service before go-live, while it is still cheap to add.",
    },
  ] satisfies MonitoringLinkedProse[],

  whatGoodLooksLikeFooter: {
    text: "The Canadian how-to for this, at a business-owner level, is Monitoring and measuring task success on design.canada.ca.",
    externalLinks: [
      {
        phrase: "Monitoring and measuring task success",
        linkKey: "monitoring-measuring-task-success",
      },
    ] satisfies ExternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  whyItMatters: {
    lead:
      "Collecting data is easy. Acting on it is the part that gets skipped, and a dashboard no one acts on is just decoration.",
    failureIntro: "When monitoring is missing or ignored, the cost is real:",
    failureModes: [
      {
        text: "The first news of a problem comes from complaints. Without its own signals, a team hears about a broken service from users, from the minister's office, or from the media, long after it started.",
        bold: [{ phrase: "The first news of a problem comes from complaints." }],
      },
      {
        text: "No one can tell whether a change helped. With nothing measured before and after, every release is a guess and arguments get settled by whoever is most senior.",
        bold: [{ phrase: "No one can tell whether a change helped." }],
      },
      {
        text: "Vanity metrics hide the truth. A dashboard full of big green numbers no one chose can look healthy while people fail at the one task that matters.",
        bold: [{ phrase: "Vanity metrics hide the truth." }],
      },
      {
        text: "Reports pile up and nothing changes. Data that is collected but never turned into work is a cost with no return.",
        bold: [{ phrase: "Reports pile up and nothing changes." }],
      },
    ] satisfies ThreadLinkedProse[],
  },

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    intro: {
      text:
        "Monitoring works as a loop with three stages. Skip the first and there is nothing real to see; skip the last and nothing changes.",
    } satisfies ThreadLinkedProse,
    blocks: [
      {
        title: "Instrument it.",
        sections: [
          {
            text:
              "Instrumentation is building the service so it records what happens as people use it: each key step attempted and completed, each error, how long each step takes. Done as the service is built, this is cheap and accurate. Added afterward, it is expensive and full of gaps.",
            bold: [{ phrase: "records what happens" }],
          },
          {
            text:
              "Instrument in an open, standard way so the signals are not locked to one vendor's monitoring product. OpenTelemetry is the common open standard for this, and naming it in a contract keeps the option to change tools later.",
            bold: [{ phrase: "open, standard way" }],
            externalLinks: [
              { phrase: "OpenTelemetry", linkKey: "opentelemetry" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              {
                phrase: "naming it in a contract",
                to: procurementSubPath("put-the-practices-in-the-contract"),
              },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "See it.",
        sections: [
          {
            text:
              "Put the signals on a dashboard, and watch only a few that matter. A good dashboard shows a small set of signals tied to real user experience and system health, each with a target set in advance, so a number means something. For a Government of Canada service, the few worth watching are:",
            bold: [{ phrase: "dashboard" }, { phrase: "target" }],
          },
          {
            type: "orderedList",
            items: [
              {
                text:
                  "Task success — are people completing what they came to do? The GC Task Success Survey is the mandatory GC method, measuring task completion, ease, and satisfaction.",
                bold: [{ phrase: "Task success" }],
                externalLinks: [
                  { phrase: "GC Task Success Survey", linkKey: "gc-task-success-survey" },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text: "Errors and failed transactions — where the service is breaking, and how often.",
                bold: [{ phrase: "Errors and failed transactions" }],
              },
              {
                text: "Performance — speed and availability, the plumbing working.",
                bold: [{ phrase: "Performance" }],
              },
              {
                text:
                  "Satisfaction and feedback — what people say in their own words, which the Guideline on Service and Digital requires a team to collect and use.",
                bold: [{ phrase: "Satisfaction and feedback" }],
                externalLinks: [
                  {
                    phrase: "Guideline on Service and Digital",
                    linkKey: "guideline-service-digital",
                  },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text:
                  "Release health — after a change goes out, is the service still holding up? The DORA metrics track this, and so does releasing changes.",
                bold: [{ phrase: "Release health" }],
                externalLinks: [
                  { phrase: "DORA metrics", linkKey: "dora-metrics" },
                ] satisfies ExternalPhraseLink[],
                internalLinks: [
                  { phrase: "releasing changes", to: THREADS["releasing-changes"].path },
                ] satisfies InternalPhraseLink[],
              },
            ],
          },
          {
            text:
              "A signal also needs a target beside it, or the number cannot be judged. GC services publish these as service standards, a public promise of the performance a client can expect, with the results reported each year in the GC service inventory. For the shape of a small target set, the clearest example is the United Kingdom's four key performance indicators, or KPIs (how to set performance metrics for your service): completion rate, digital take-up, user satisfaction, and cost per transaction. A lot of the GC web signal already sits in Canada.ca analytics.",
            externalLinks: [
              { phrase: "GC service inventory", linkKey: "gc-service-inventory" },
              {
                phrase: "how to set performance metrics for your service",
                linkKey: "uk-service-manual-performance-metrics",
              },
              { phrase: "Canada.ca analytics", linkKey: "canada-ca-analytics" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "dashboardMock",
            variant: "monitoring",
          },
        ],
      },
      {
        title: "Act on it.",
        sections: [
          {
            text:
              "A dashboard is worth nothing unless someone acts on what it shows. The signals become work at the backlog review, where a reading turns into a specific item:",
            bold: [{ phrase: "acts on what it shows" }],
            internalLinks: [{ phrase: "backlog", to: THREADS.backlog.path }] satisfies InternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              {
                text: "A task with a low completion rate becomes a fix.",
                bold: [{ phrase: "fix" }],
              },
              {
                text: "A spike in errors or failed transactions becomes a bug.",
                bold: [{ phrase: "bug" }],
              },
              {
                text: "A step with high drop-off becomes a user-experience improvement.",
                bold: [{ phrase: "user-experience improvement" }],
              },
              {
                text: "A rising volume of support calls about one thing becomes a root-cause fix.",
                bold: [{ phrase: "root-cause fix" }],
              },
              {
                text: "Slow or worsening performance becomes a performance or tech-debt item.",
                bold: [{ phrase: "performance or tech-debt item" }],
              },
              {
                text: "A feature almost no one uses becomes a question: improve it, promote it, or retire it.",
                bold: [{ phrase: "question" }],
              },
            ],
          },
          {
            text:
              "Healthy numbers and vanity metrics become nothing, and that is correct: an all-green dashboard generates no work. One kind of signal goes elsewhere. Unusual or suspicious activity is a security signal, handled through detection and response on the security thread.",
            internalLinks: [{ phrase: "security", to: THREADS.security.path }] satisfies InternalPhraseLink[],
          },
        ],
      },
    ] satisfies MonitoringCloserLookBlock[],
  },

  whoseJob: {
    intro:
      "Monitoring is a team activity, and it fails when the dashboard is someone's side project that no one reads.",
    roles: [
      {
        role: "The service team",
        text: "builds the instrumentation into the service and stands up the dashboards.",
      },
      {
        role: "The product manager",
        text:
          "chooses the few signals that matter, sets their targets, and brings the readings to the backlog review.",
      },
      {
        role: "Whoever runs the service in production",
        text: "watches it live and responds when a signal crosses a line.",
      },
      {
        role: "The business owner of the application",
        text:
          "owns the targets, answers for the service's performance to the bodies that review it, and makes sure signals turn into work rather than reports.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  twoWaysComparison: {
    id: "two-ways-comparison",
    title: "Two ways to monitor a service",
    risky: {
      heading: "Vell",
      framing:
        "Meet Vell, a service manager. They launched the licensing service and planned to sort out measurement later:",
      items: [
        "released the first version with no instrumentation built in",
        "added a dashboard months later, filled with server-uptime numbers because those were easy to get",
        "never set a target for anything, so every number was green by default",
        "found out the payment step had been failing for weeks from a pile of complaints",
      ],
      closing:
        "The result: a real problem ran unseen for weeks, and the dashboard that existed measured everything except whether people could get a licence.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Meet Pax, a service manager. They treated measurement as part of building the service:",
      items: [
        "instrumented the service before launch, so it recorded each step people attempted and completed",
        "picked five signals tied to getting a licence, each with a target",
        "reviewed the signals at every backlog session and turned the weak ones into work",
        "caught an early drop-off on one step and fixed it before it grew",
      ],
      closing:
        "The result: the team saw the service the way its users experienced it, and fixed the real problems while they were still small.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "What Monitoring and instrumentation looks like in each phase",
    intro: "Monitoring and instrumentation changes shape across the life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "Decide what to measure before go-live.",
        popupHeading: "Decide what to measure before go-live.",
        popup: [
          {
            text:
              "Choose the few signals that matter and build the instrumentation into the first real version from the start.",
          },
          {
            text:
              "Set a target for each one, so that from the first day live the team can tell a good number from a bad one.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "Watch, and turn signals into work.",
        popupHeading: "Watch, and turn signals into work.",
        popup: [
          {
            text:
              "Most monitoring lives here: dashboards, alerts, performance tracking, and the backlog review that turns readings into fixes, bugs, and improvements.",
          },
          {
            text: "This is where a measured service becomes a better one.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Keep watching until the last user has moved.",
        popupHeading: "Keep watching until the last user has moved.",
        popup: [
          {
            text:
              "A service that is being retired still needs its signals. Watch for stragglers and for failures during the move to whatever comes next, and keep the instrumentation on until the service is switched off for good.",
          },
        ],
      },
    ] satisfies MonitoringPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "For the deeper version of setting a target, Service Level Objectives in the Google SRE Book covers service level indicators, objectives, and error budgets in plain language. DORA software delivery metrics are the four delivery-health metrics for judging whether releases are going well, service by service. The Digital Performance Standard from Australia's DTA is a peer government's monitoring framework in five plain criteria.",
    externalLinks: [
      {
        phrase: "Service Level Objectives",
        linkKey: "google-sre-service-level-objectives",
      },
      { phrase: "DORA software delivery metrics", linkKey: "dora-metrics" },
      {
        phrase: "Digital Performance Standard",
        linkKey: "dta-digital-performance-standard",
      },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "guideline-service-digital" satisfies ExternalLinkKey,
      description:
        "Guideline on Service and Digital (TBS), the requirement to measure performance and use client feedback — https://www.canada.ca/en/government/system/digital-government/guideline-service-digital.html",
    },
    {
      label: "Supporting reference",
      linkKey: "monitoring-measuring-task-success" satisfies ExternalLinkKey,
      description:
        "Monitoring and measuring task success (ESDC, design.canada.ca) — https://design.canada.ca/continuous-improvement/monitoring.html",
    },
    {
      label: "Supporting reference",
      linkKey: "gc-task-success-survey" satisfies ExternalLinkKey,
      description: "GC Task Success Survey (ESDC) — https://design.canada.ca/survey/",
    },
    {
      label: "Supporting reference",
      linkKey: "canada-ca-analytics" satisfies ExternalLinkKey,
      description: "Canada.ca analytics (TBS/ESDC) — https://www.canada.ca/en/analytics.html",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-service-manual-performance-metrics" satisfies ExternalLinkKey,
      description:
        "How to set performance metrics for your service (UK Service Manual) — https://www.gov.uk/service-manual/measuring-success/how-to-set-performance-metrics-for-your-service",
    },
    {
      label: "Supporting reference",
      linkKey: "opentelemetry" satisfies ExternalLinkKey,
      description: "What is OpenTelemetry? (CNCF) — https://opentelemetry.io/docs/what-is-opentelemetry/",
    },
    {
      label: "Supporting reference",
      linkKey: "google-sre-service-level-objectives" satisfies ExternalLinkKey,
      description:
        "Service Level Objectives (Google SRE Book) — https://sre.google/sre-book/service-level-objectives/",
    },
    {
      label: "Supporting reference",
      linkKey: "dora-metrics" satisfies ExternalLinkKey,
      description:
        "DORA software delivery performance metrics (Google Cloud) — https://dora.dev/guides/dora-metrics/",
    },
    {
      label: "Supporting reference",
      linkKey: "dta-digital-performance-standard" satisfies ExternalLinkKey,
      description:
        "Digital Performance Standard (Australia, DTA) — https://www.digital.gov.au/policy/digital-experience/digital-performance-standard",
    },
    {
      label: "Supporting reference",
      linkKey: "cccs-network-security-logging-monitoring" satisfies ExternalLinkKey,
      description:
        "Network security logging and monitoring, ITSAP.80.085 (Canadian Centre for Cyber Security) — https://www.cyber.gc.ca/en/guidance/network-security-logging-monitoring-itsap80085",
    },
  ] satisfies SourceItem[],
} as const;
