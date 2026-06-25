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
  type ThreadToggleBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type BacklogLinkedProse = ThreadLinkedProse;
export type BacklogContentSection = ThreadContentSection;
export type BacklogCloserLookBlock = ThreadCloserLookBlock;
export type BacklogPhasePreviewBlock = ThreadPhasePreviewBlock;
export type BacklogToggleBlock = ThreadToggleBlock;

const CLOSER_LOOK_PATH = `${THREADS.backlog.path}#a-closer-look`;

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

  insideABacklog: {
    id: "inside-a-backlog",
    title: "Inside a backlog",
    intro: {
      text:
        "A backlog item usually takes this shape, here using a grant application service as the example:",
    } satisfies ThreadLinkedProse,
    example: {
      story:
        "As an organization applying for funding, I want to save a partly finished application so that I can come back and complete it later.",
      doneWhen: [
        "the applicant can save a draft and return to it",
        "the applicant can see which sections are still incomplete",
        "a saved draft is stored securely and tied to the applicant's account",
      ],
    },
    closing: {
      text:
        "The first line is the user story (who, what, and why), and the \"it's done when…\" list is its acceptance criteria, the test for when the item is finished. For more detail on writing items this way, Ontario's Service Design Playbook and the GOV.UK guide to writing user stories both use this format.",
      externalLinks: [
        { phrase: "Service Design Playbook", linkKey: "ontario-service-design-playbook" },
        { phrase: "GOV.UK guide to writing user stories", linkKey: "uk-writing-user-stories" },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

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
              "Order the list by impact on users, fit with the service's goals, and the effort it takes. A simple, common method is MoSCoW, which sorts every item into four groups:",
            bold: [{ phrase: "MoSCoW" }],
          },
          {
            type: "unorderedList",
            items: [
              {
                bold: "Must have:",
                text: " the service does not work, or cannot launch, without it.",
              },
              {
                bold: "Should have:",
                text: " important, and painful to leave out, but the service can manage without it for now.",
              },
              {
                bold: "Could have:",
                text: " worth doing if time and capacity allow, and the first thing dropped when they run short.",
              },
              {
                bold: "Will not have (for now):",
                text: " deliberately out of scope this round, written down so it reads as a decision rather than an oversight.",
              },
            ],
          },
          {
            text:
              "Revisit the order regularly, weekly for the next sprint of work, and every few months for the roadmap, because what matters most changes as the service grows. The backlog also holds more than new features: support requests and technical debt compete for the same slots, and the signals from a live service are part of what tells you where the real problems are. The GOV.UK guide to deciding on priorities walks through this.",
            internalLinks: [
              {
                phrase: "signals from a live service",
                to: THREADS["monitoring-and-instrumentation"].path,
              },
            ] satisfies InternalPhraseLink[],
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
        title: "Review it on a schedule.",
        sections: [
          {
            text:
              "A backlog stays useful only if it is tended, and the single most important habit is a regular review (often called refinement or grooming). It is not a one-time clean-up: on a set cadence the team looks over the whole list and, in the same sitting, adds new items, breaks down the ones rising toward the top, drops what no longer serves the goal, and re-orders the rest. Booking that review in keeps the list honest, so deciding what to keep or cut is a recurring check-in rather than a decision made once and never revisited. One person, the product or service owner, owns the order; everyone else makes their case to that person rather than reordering the list themselves. And a definition of done, a shared bar for when something is truly finished, keeps quality steady: if an item does not meet it, it goes back on the backlog instead of out to the public. The Scrum Guide is the source of these terms.",
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
              "Live is the longest chapter, and the backlog is where its improvement happens. New feedback and analytics add items, support requests and technical debt compete with new features, and the order is revisited regularly. A healthy backlog here is the difference between a service that keeps getting better and one that stops improving.",
            internalLinks: [
              { phrase: "analytics", to: THREADS["monitoring-and-instrumentation"].path },
            ] satisfies InternalPhraseLink[],
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

  commonQuestions: {
    id: "common-questions",
    title: "Common questions",
    blocks: [
      {
        title: "My backlog keeps growing. It feels like an endless to-do list.",
        sections: [
          {
            text:
              "A backlog of work should hold action items the team has agreed to do, not raw ideas, and mixing the two is the usual reason it balloons. Keep ideas on a separate idea list, and go through that list on a schedule: promote the few worth doing into real, prioritized work, and accept that many ideas will never become tasks, which is fine. Ideas do not belong on the work backlog at all. Beyond that, the work backlog still needs a regular review to delete items that have gone stale. The plainest overview of keeping a backlog healthy is a good start.",
            internalLinks: [{ phrase: "regular review", to: CLOSER_LOOK_PATH }] satisfies InternalPhraseLink[],
            externalLinks: [
              { phrase: "keeping a backlog healthy", linkKey: "atlassian-scrum-backlogs" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Everything feels like a top priority. How do I choose?",
        sections: [
          {
            text:
              "If everything is top priority, nothing is. Force a single order, there is only ever one item that comes next, and rank by a few practical factors like risk, value against effort, and what depends on what. MoSCoW, above, is one simple way to begin.",
            bold: [{ phrase: "MoSCoW" }],
          },
        ],
      },
      {
        title: "The items are too big or too vague to start.",
        sections: [
          {
            text:
              'Break a big item, sometimes called an epic, into pieces small enough to finish in one short cycle, and write each one around a user and a goal. If you cannot state the goal, the "so that…" part, that is a sign to reconsider whether you need it. The GOV.UK guide to writing user stories shows how.',
            externalLinks: [
              { phrase: "GOV.UK guide to writing user stories", linkKey: "uk-writing-user-stories" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Old items pile up at the bottom and never get done.",
        sections: [
          {
            text:
              "Some were added to please someone and were never really going to be built; others were genuinely good ideas that got overtaken as priorities shifted. The cause does not change the fix: a backlog is not a place items live forever. At each regular review, drop what no longer serves the current goal, and keep the rest in honest priority order, so the list stays short enough to act on.",
            internalLinks: [{ phrase: "regular review", to: CLOSER_LOOK_PATH }] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "The boring technical fixes and bugs never rise to the top.",
        sections: [
          {
            text:
              "They get buried, especially when they live on a separate, hidden list. Keep new features, bug fixes, and technical debt on one ordered backlog, so the trade-offs are visible and the owner can weigh them together.",
            externalLinks: [{ phrase: "technical debt", linkKey: "atlassian-technical-debt" }] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies BacklogToggleBlock[],
  },

  furtherReading: {
    text:
      "The Government of Canada's digital standards to iterate and improve frequently and to work in the open set the expectation to keep and prioritize a backlog. Ontario's Service Design Playbook shows how it runs across a service's life. For the formal terms, the Scrum Guide defines the product backlog, the product owner, refinement, and the definition of done, and the UK's Service Manual is the plainest how-to for user stories and priorities.",
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
    {
      label: "Supporting reference",
      linkKey: "gc-design-community" satisfies ExternalLinkKey,
      description:
        "GC design community (GCcollab wiki) — https://wiki.gccollab.ca/GC_design_community",
    },
    {
      label: "Supporting reference",
      linkKey: "atlassian-scrum-backlogs" satisfies ExternalLinkKey,
      description: "Atlassian, Product backlog — https://www.atlassian.com/agile/scrum/backlogs",
    },
    {
      label: "Supporting reference",
      linkKey: "atlassian-technical-debt" satisfies ExternalLinkKey,
      description:
        "Atlassian, Technical debt — https://www.atlassian.com/agile/software-development/technical-debt",
    },
    {
      label: "Supporting reference",
      linkKey: "roman-pichler-backlog-mistakes" satisfies ExternalLinkKey,
      description:
        "Roman Pichler, Seven Product Backlog Mistakes to Avoid — https://www.romanpichler.com/blog/product-backlog-mistakes/",
    },
  ] satisfies SourceItem[],
} as const;
