import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
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

export type BacklogLinkedProse = ThreadLinkedProse;
export type BacklogContentSection = ThreadContentSection;
export type BacklogCloserLookBlock = ThreadCloserLookBlock;
export type BacklogPhasePreviewBlock = ThreadPhasePreviewBlock;

export const backlogSectionsPlainText = threadSectionsPlainText;
export const backlogLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const backlogWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const BACKLOG_THREAD = {
  title: "Backlog",
  slug: "backlog" as const,

  lead: {
    text:
      "A backlog is the single, prioritized list of work for a service: the features, fixes, and improvements still to do, ordered so the most valuable work comes first. The Government of Canada's digital standards put it plainly: keep a backlog and use it to set priorities. Every item traces back to a real user need, one person orders the list, and it is never finished, it is refined as the service learns and changes. The business owner answers for what gets prioritized; the team does the work.",
    externalLinks: [
      { phrase: "digital standards", linkKey: "iterate-improve-frequently" },
    ] satisfies ExternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    {
      text: "There is one backlog, a single ordered list of the work still to do, not the same work scattered across inboxes and spreadsheets.",
    },
    {
      text: "One person, the product or service owner, is accountable for the order.",
    },
    {
      text: "Every item traces back to a real user need, usually written as a short user story.",
    },
    {
      text: "Priorities are set by impact on users, fit with goals, and effort, and are revisited regularly, not set once.",
    },
    {
      text: "The backlog holds more than new features: support work and technical debt compete for the same slots.",
    },
    {
      text: "A clear definition of done decides when an item is finished, and unfinished work goes back on the list rather than out to the public.",
    },
    {
      text: "The backlog is kept in the open, where the team and users can see and shape what is prioritized.",
    },
    {
      text: "It is never complete: it keeps being refined across the whole life of the service.",
    },
  ] satisfies BacklogLinkedProse[],

  whyItMatters: {
    text:
      "Without one prioritized list, the work gets driven by whoever asks loudest, and the important but undramatic things, the security fix, the accessibility gap, the thing users keep struggling with, never rise to the top. A good backlog is how a service keeps improving steadily after launch instead of stalling, which matters because the live years are the longest part of its life. The Government of Canada's standards ask teams to iterate and improve frequently and to be open about what they prioritize.",
    externalLinks: [
      { phrase: "iterate and improve frequently", linkKey: "iterate-improve-frequently" },
      { phrase: "open about what they prioritize", linkKey: "work-open-default" },
    ] satisfies ExternalPhraseLink[],
  },

  whoseJob: {
    intro: "Running a backlog is shared across the team, with each role holding a different part:",
    roles: [
      {
        role: "The product or service owner",
        text: "keeps the single list, orders it, and refines it; they decide what comes next.",
      },
      {
        role: "The team",
        text: "(designers, developers, researchers) breaks items down, estimates them, and delivers them.",
      },
      {
        role: "The business owner of the application",
        text: "makes sure there is a clear owner and that the priorities serve users and the service's goals.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "Write the work as user stories.",
        sections: [
          {
            text:
              'The work in a backlog is usually written as short user stories, in a simple format that keeps the focus on the need rather than a spec: "As a [type of user], I need [something], so that [reason]." Each story carries acceptance criteria, a short "it is done when…" list that says when the work is finished. The GOV.UK guide to writing user stories and Ontario\'s Service Design Playbook both use this format. The needs themselves come from user research.',
            bold: [{ phrase: "user stories" }, { phrase: "acceptance criteria" }],
            externalLinks: [
              {
                phrase: "GOV.UK guide to writing user stories",
                linkKey: "uk-writing-user-stories",
              },
              { phrase: "Service Design Playbook", linkKey: "ontario-service-design-playbook" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "user research", to: THREADS["user-research"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Prioritize, and keep prioritizing.",
        sections: [
          {
            text:
              "Order the list by impact on users, fit with the service's goals, and the effort it takes. A simple, common method is MoSCoW: must have, should have, could have, and will not have (for now). Revisit the order regularly, weekly for the next sprint of work, and every few months for the roadmap, because what matters most changes as the service grows. And the backlog is not only new features: support requests and technical debt compete for the same slots. The GOV.UK guide to deciding on priorities walks through this.",
            bold: [{ phrase: "MoSCoW" }],
            externalLinks: [
              {
                phrase: "GOV.UK guide to deciding on priorities",
                linkKey: "uk-deciding-on-priorities",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Keep it healthy.",
        sections: [
          {
            text:
              "A backlog stays useful only if it is tended. Refinement is the ongoing work of breaking big items down and adding enough detail that the team can pick them up. One person, the product or service owner, owns the order; everyone else makes their case to that person rather than reordering the list themselves. And a definition of done, a shared bar for when something is truly finished, keeps quality steady: if an item does not meet it, it goes back on the backlog instead of out to the public. The Scrum Guide is the source of these terms.",
            bold: [{ phrase: "Refinement" }, { phrase: "definition of done" }],
            externalLinks: [{ phrase: "Scrum Guide", linkKey: "scrum-guide" }] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies BacklogCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Two ways to run a backlog",
    risky: {
      heading: "Vell",
      framing: "Meet Vell. They ran the permit renewal service off whatever came up:",
      items: [
        "kept the work in scattered email threads, chat messages, and personal lists",
        "built whatever the loudest stakeholder asked for next, with no agreed priorities",
        'treated "done" as "demoed in a meeting"',
      ],
      closing:
        "The result: half-finished features piled up, the accessibility and security fixes never reached the top, the team kept thrashing between requests, and no one could say what was coming next.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Meet Pax. They ran the permit renewal service from one backlog:",
      items: [
        "kept a single, ordered list, every item tied to a user need",
        "prioritized by impact and effort, using MoSCoW, and revisited the order each week",
        "set a clear definition of done, so unfinished work went back on the list, not out the door",
      ],
      closing:
        "The result: steady, visible improvement, the important fixes got done, and everyone, including users, could see what was next.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "What the backlog looks like in each phase",
    intro: "The backlog changes shape across the life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "The backlog is born from research.",
        popup: [
          {
            text:
              "The backlog starts in discovery as a prioritized list of user stories drawn from user research. As building begins, the team works the top items first, and the first release delivers the most critical needs rather than everything at once. The order is set by impact and effort, and it is already expected to change.",
            internalLinks: [
              { phrase: "user research", to: THREADS["user-research"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Where continuous improvement lives.",
        popup: [
          {
            text:
              "Live is the longest chapter, and the backlog is where its improvement happens. New feedback and analytics add items, support requests and technical debt compete with new features, and the order is revisited regularly. A healthy backlog here is the difference between a service that keeps getting better and one that quietly stalls.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "The backlog winds down.",
        popup: [
          {
            text:
              "When a service is retired or replaced, the backlog narrows to what still matters: essential fixes, and the work of moving off the service. If the service is being replaced, the backlog of unmet needs carries forward into the new one, so the research already done is not lost.",
          },
        ],
      },
    ] satisfies BacklogPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "The Government of Canada's digital standards to iterate and improve frequently and to work in the open set the expectation to keep and prioritize a backlog. Ontario's Service Design Playbook shows how it runs across a service's life, in a Canadian voice. For the formal terms, the Scrum Guide defines the product backlog, the product owner, refinement, and the definition of done, and the UK's Service Manual is the plainest how-to for user stories and priorities.",
    externalLinks: [
      { phrase: "iterate and improve frequently", linkKey: "iterate-improve-frequently" },
      { phrase: "work in the open", linkKey: "work-open-default" },
      { phrase: "Service Design Playbook", linkKey: "ontario-service-design-playbook" },
      { phrase: "Scrum Guide", linkKey: "scrum-guide" },
      { phrase: "Service Manual", linkKey: "uk-service-manual-agile-delivery" },
      { phrase: "user stories", linkKey: "uk-writing-user-stories" },
      { phrase: "priorities", linkKey: "uk-deciding-on-priorities" },
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
      linkKey: "work-open-default" satisfies ExternalLinkKey,
      description:
        'GC Digital Standards, "Work in the open by default" (TBS) — https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/work-open-default.html',
    },
    {
      label: "Supporting reference",
      linkKey: "ontario-service-design-playbook" satisfies ExternalLinkKey,
      description:
        "Ontario Service Design Playbook (Ontario Digital Service, CC-BY; provincial, reusable) — https://www.ontario.ca/page/service-design-playbook",
    },
    {
      label: "Supporting reference",
      linkKey: "scrum-guide" satisfies ExternalLinkKey,
      description: "The Scrum Guide (Schwaber & Sutherland, CC BY-SA) — https://scrumguides.org/scrum-guide.html",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-service-manual-agile-delivery" satisfies ExternalLinkKey,
      description:
        "GOV.UK Service Manual, agile delivery (writing user stories; deciding on priorities) — https://www.gov.uk/service-manual/agile-delivery",
    },
    {
      label: "Supporting reference",
      linkKey: "18f-derisking" satisfies ExternalLinkKey,
      description:
        "18F, De-risking Government Technology / Product Guide — https://guides.18f.gov/derisking/",
    },
  ] satisfies SourceItem[],
} as const;
