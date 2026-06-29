import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import {
  threadLeadPlainText,
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  type ThreadCloserLookBlock,
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type ReleasingChangesLinkedProse = ThreadLinkedProse;
export type ReleasingChangesContentSection = ThreadContentSection;
export type ReleasingChangesCloserLookBlock = ThreadCloserLookBlock;
export type ReleasingChangesPhasePreviewBlock = ThreadPhasePreviewBlock;

export const releasingChangesSectionsPlainText = threadSectionsPlainText;
export const releasingChangesLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const releasingChangesWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const RELEASING_CHANGES_THREAD = {
  title: "Releasing changes",
  slug: "releasing-changes" as const,

  lead: {
    text:
      "Releasing changes means getting new features and fixes onto the live service, safely and often. The surprising part, for anyone who finds releases nerve-wracking, is that releasing small and often is safer than saving everything up for a big launch. Releasing changes pulls together four habits: release in small, frequent batches; run every change through an automated pipeline that tests it before it goes out; roll each change out gradually and watch how it behaves; and keep the ability to roll back quickly if something goes wrong.",
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    {
      text: "Changes go out in small, frequent batches, rather than being saved up for big, risky releases.",
      externalLinks: [
        { phrase: "small, frequent batches", linkKey: "iterate-improve-frequently" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Every change runs through an automated pipeline that builds and tests it before it can be released.",
      externalLinks: [
        { phrase: "automated pipeline", linkKey: "martin-fowler-deployment-pipeline" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Each release is tested before it reaches the public, and a person gives the final go-ahead on the releases that need one.",
    },
    {
      text: "New changes are rolled out gradually, to a small share of users first, watched, and continued only if they behave.",
      externalLinks: [
        { phrase: "rolled out gradually", linkKey: "google-sre-canarying-releases" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "A release can be rolled back quickly when something goes wrong, so a bad change is a short problem rather than a lasting one.",
    },
    {
      text: "Before deploying to the cloud, the Government of Canada's security guardrails are in place.",
      externalLinks: [
        { phrase: "security guardrails", linkKey: "gc-cloud-guardrails" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "The team tracks whether releasing is healthy: how often it releases, how long a change takes to reach users, how often a release breaks something, and how fast it recovers.",
      externalLinks: [{ phrase: "releasing is healthy", linkKey: "dora-metrics" }] satisfies ExternalPhraseLink[],
    },
  ] satisfies ReleasingChangesLinkedProse[],

  whyItMatters: {
    text:
      "Big, infrequent releases are where risk collects. When months of changes go out at once, there is more that can break, it is harder to tell which change caused a problem, and users wait a long time for fixes and improvements. Releasing in small batches turns that around: each change is small enough to test, to understand, and to undo, so a problem is caught early and contained. This is the Government of Canada's expectation, its standard is to iterate and improve frequently, releasing small batches and building in automated testing so new changes do not introduce new problems. The evidence backs it up: teams that release often and recover fast are also the ones that break things least, so speed and stability come together rather than trading off. For a service in the cloud, releasing also rides on a baseline of security: the GC Cloud Guardrails must be implemented, validated, and reported within the first 30 business days of getting a cloud account.",
  },

  whoseJob: {
    intro: "Releasing changes is shared across the team, with each role holding a different part:",
    roles: [
      {
        role: "Developers",
        text: "keep each change small, write the automated tests, and build and maintain the pipeline that delivers them.",
      },
      {
        role: "Operations and release engineers",
        text: "run the deployments, watch each rollout, and roll back when something misbehaves.",
      },
      {
        role: "Security specialists",
        text: "make sure the security checks and guardrails ride the pipeline and that patches go out promptly.",
        internalLinks: [
          { phrase: "security checks and guardrails", to: THREADS.security.path },
        ] satisfies InternalPhraseLink[],
      },
      {
        role: "The business owner of the application",
        text: "makes sure releasing is frequent and funded, accepts that small frequent releases are the safer path, and gives the go-ahead on releases that need a sign-off.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "Small, frequent releases beat big ones.",
        sections: [
          {
            text:
              "Two practices make small releases possible. Continuous integration means developers merge their work into the shared codebase often, where an automated build and test check it right away, so problems surface while they are small. Continuous delivery means each change is then carried through a deployment pipeline, a series of automated stages that each add confidence, until it is ready to release at the click of a button. Built on a single tested package moved through development, staging, and production, this is what lets a team release weekly, daily, or many times a day, with each release low-risk because so little has changed since the last one.",
            bold: [{ phrase: "Continuous integration" }, { phrase: "Continuous delivery" }],
            externalLinks: [
              { phrase: "automated build and test", linkKey: "atlassian-ci-cd" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Roll out gradually, and be ready to undo.",
        sections: [
          {
            text:
              "Even a tested change can behave unexpectedly with real users, so the safe pattern is to release it to a small share of them first. This is a canary release: the change goes to, say, 5% of users while the rest stay on the old version, the two are compared, and the rollout only continues if the change behaves. The math is the point, a fault that would fail one in five requests reaches only a fraction of users instead of everyone. Alongside that, a team needs a fast way back: an auditable, single-package deployment makes rolling back to the last good version straightforward, and a quick post-release check can trigger that rollback automatically. The ability to undo in minutes is what makes frequent releasing safe.",
            externalLinks: [
              {
                phrase: "auditable, single-package deployment",
                linkKey: "uk-deploying-software-regularly",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Know whether your releasing is healthy.",
        sections: [
          {
            text:
              "You can tell a healthy release process from an unhealthy one with a few plain measures, often called the DORA metrics: how often you release, how long a change takes to get from done to live, how often a release causes a problem, and how fast you recover when one does. The useful finding behind them is that these do not trade off, the teams that release most often are also the ones that break things least and recover fastest. Treat the numbers as a temperature check the team uses to improve. A metric chased as a target for its own sake stops being honest.",
          },
        ],
      },
    ] satisfies ReleasingChangesCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Two ways to release changes",
    risky: {
      heading: "Vell",
      framing: "Meet Vell. They ran the tax-filing service on one big release a quarter:",
      items: [
        "saved up months of changes for a single release night",
        "tested by hand at the end, then deployed everything to everyone at once",
        "had no quick way back when the release broke",
      ],
      closing:
        "The result: the big release took down filing at peak season, it took days to work out which of the many changes was to blame, and the call centre was buried while it was fixed.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Meet Pax. They ran the tax-filing service on small, frequent releases:",
      items: [
        "released small changes every week through an automated pipeline that tested each one",
        "rolled each change out to a small share of filers first, watched it, then expanded",
        "could roll back to the last good version in minutes",
      ],
      closing:
        "The result: the few problems that slipped through hit a handful of users, were spotted fast, and were undone before most people noticed, and filing stayed up through the busy season.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "What Releasing changes looks like in each phase",
    intro: "How a service releases changes shifts across its life.",
    blocks: [
      {
        title: "Create.",
        preview: "Set up how you will release.",
        popup: [
          {
            text:
              "The release habits are set before launch. The team builds the pipeline and the automated tests, decides how it will deploy and roll back, and, for a cloud service, puts the GC security guardrails in place and validates them within the first 30 business days. Choosing to release small and often from the start is far easier than retrofitting it onto a service built for big launches.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "Where most releasing happens.",
        popup: [
          {
            text:
              "Once the service is running, releasing is continuous. The team releases small changes often, rolls them out gradually and watches them through monitoring, rolls back the ones that misbehave, and applies security patches promptly. The work to release comes from the prioritized backlog, and the team keeps an eye on whether releasing stays healthy.",
            internalLinks: [
              { phrase: "monitoring", to: THREADS["monitoring-and-instrumentation"].path },
              { phrase: "the prioritized backlog", to: THREADS.backlog.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Releasing winds down, but still counts.",
        popup: [
          {
            text:
              "As a service is retired or replaced, changes slow to the essential ones: security fixes, and the steps that move data to a new home. These still go through the pipeline and testing, because a botched final change can strand the people still using the service. Keep the ability to fix and roll back until the service is fully off.",
            internalLinks: [
              { phrase: "retired or replaced", to: PHASES.sunset.href },
              { phrase: "move data", to: THREADS["data-stewardship"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
    ] satisfies ReleasingChangesPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "For deploying to the cloud without locking yourself in, the Government of Canada's guidance to use open standards and solutions adds the exit-strategy and portability expectations behind releasing. For a plain-language starting point on the first habit, GitHub's explainer on continuous integration shows why committing small changes often catches errors sooner. If you want to see how a cloud platform frames the whole practice, AWS's operational excellence guidance lays out the principles of making frequent, small, reversible changes and automating deployments safely. And for the bigger picture of treating releasing as a discipline to set up from the start, Google's chapter on release engineering explains why repeatable, automated builds and an audit trail make releases routine.",
    externalLinks: [
      { phrase: "use open standards and solutions", linkKey: "gc-use-open-standards-solutions" },
      { phrase: "continuous integration", linkKey: "github-continuous-integration" },
      {
        phrase: "operational excellence guidance",
        linkKey: "aws-well-architected-operational-excellence",
      },
      { phrase: "release engineering", linkKey: "google-sre-release-engineering" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "iterate-improve-frequently" satisfies ExternalLinkKey,
      description:
        'GC Digital Standards, "Iterate and improve frequently" (TBS) — https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/iterate-improve-frequently.html',
    },
    {
      label: "Governing instrument",
      linkKey: "gc-cloud-guardrails" satisfies ExternalLinkKey,
      description:
        "GC Cloud Guardrails (TBS / Shared Services Canada) — https://canada-ca.github.io/cloud-guardrails/ (canonical: https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32787)",
    },
    {
      label: "Supporting reference",
      linkKey: "gc-use-open-standards-solutions" satisfies ExternalLinkKey,
      description:
        'GC "Use open standards and solutions" (Guideline 4, TBS) — https://canada-ca.github.io/gcdigital-tools_outils-numeriquesgc/en/4-use-open-standards-solutions.html',
    },
    {
      label: "Supporting reference",
      linkKey: "uk-deploying-software-regularly" satisfies ExternalLinkKey,
      description:
        "UK Service Manual, Deploying software regularly — https://www.gov.uk/service-manual/technology/deploying-software-regularly",
    },
    {
      label: "Supporting reference",
      linkKey: "atlassian-ci-cd" satisfies ExternalLinkKey,
      description:
        "Atlassian, Continuous integration vs delivery vs deployment — https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment",
    },
    {
      label: "Supporting reference",
      linkKey: "martin-fowler-deployment-pipeline" satisfies ExternalLinkKey,
      description:
        "Martin Fowler, Deployment Pipeline — https://martinfowler.com/bliki/DeploymentPipeline.html",
    },
    {
      label: "Supporting reference",
      linkKey: "google-sre-canarying-releases" satisfies ExternalLinkKey,
      description:
        "Google SRE Workbook, Canarying Releases — https://sre.google/workbook/canarying-releases/",
    },
    {
      label: "Supporting reference",
      linkKey: "dora-metrics" satisfies ExternalLinkKey,
      description:
        "DORA, software delivery performance metrics — https://dora.dev/guides/dora-metrics/",
    },
    {
      label: "Supporting reference",
      linkKey: "github-continuous-integration" satisfies ExternalLinkKey,
      description:
        "GitHub Docs Continuous integration — https://docs.github.com/en/actions/get-started/continuous-integration",
    },
    {
      label: "Supporting reference",
      linkKey: "aws-well-architected-operational-excellence" satisfies ExternalLinkKey,
      description:
        "AWS Well-Architected Operational Excellence Pillar — https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/operational-excellence.html",
    },
    {
      label: "Supporting reference",
      linkKey: "google-sre-release-engineering" satisfies ExternalLinkKey,
      description:
        "Google SRE Book, Release Engineering (Ch. 8) — https://sre.google/sre-book/release-engineering/",
    },
  ] satisfies SourceItem[],
} as const;
