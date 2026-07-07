import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import {
  DIGITAL_SOLUTIONS_CHANGE_MANAGEMENT_PORTAL,
  placeholderSourceHref,
} from "@/lib/placeholder-sources";
import { THREADS } from "@/lib/guide-strings";
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

export type ChangeManagementLinkedProse = ThreadLinkedProse;
export type ChangeManagementContentSection = ThreadContentSection;
export type ChangeManagementCloserLookBlock = ThreadCloserLookBlock;
export type ChangeManagementPhasePreviewBlock = ThreadPhasePreviewBlock;

export const changeManagementLeadPlainText = (lead: readonly ThreadLinkedProse[]) =>
  lead.map((paragraph) => paragraph.text).join(" ");
export const changeManagementSectionsPlainText = threadSectionsPlainText;
export const changeManagementWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);
export const changeManagementWhyItMattersPlainText = threadWhyItMattersPitchPlainText;

export const CHANGE_MANAGEMENT_CONVERGE_DIAGRAM_ALT =
  "Diagram: Releasing the change and Change management converge on the people who use it; when both reach them, the change gets used.";

export const CHANGE_MANAGEMENT_THREAD = {
  title: "Change management",
  slug: "change-management" as const,

  lead: [
    {
      text:
        "When a service is new or changes, the people who use it, and the staff who work with it, have to change how they do things. Change management is the work of helping them make that shift, so the service is taken up and used, and does not stall because people carry on the old way.",
    },
    {
      text:
        "This is the people side of a change. The technical side, getting a change safely into production, is releasing changes. Change management is about making people aware of the change, willing to make it, able to do it, and supported to keep it going.",
      internalLinks: [
        { phrase: "releasing changes", to: THREADS["releasing-changes"].path },
      ] satisfies InternalPhraseLink[],
    },
    {
      text:
        "The Government of Canada treats adoption as what makes or breaks a digital shift, set out in the GC Information Management Strategy.",
      externalLinks: [
        {
          phrase: "GC Information Management Strategy",
          linkKey: "gc-information-management-strategy-storyline",
        },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies ThreadLinkedProse[],

  twoTracksOneOutcome: {
    id: "two-tracks-one-outcome",
    title: "Two tracks, one outcome",
    sections: [
      {
        text:
          "Releasing a change and managing a change are two different jobs aimed at the same people:",
      },
      {
        type: "orderedList",
        items: [
          {
            bold: "Releasing the change",
            text:
              " is the technical side: getting the new thing built and running in production.",
          },
          {
            bold: "Change management",
            text: " is the people side: getting the users ready and willing to work the new way.",
          },
        ],
      },
      {
        text: "The two run alongside each other, not one after the other.",
      },
      {
        type: "subheading",
        text: "Both have to reach the same users, or the change does not take:",
      },
      {
        type: "unorderedList",
        items: [
          {
            bold: "Released, but not managed.",
            text:
              " The new screen goes live on the Wednesday, but the people who use it were never told, never trained, and carry on with their old workaround. The change exists and no one uses it.",
          },
          {
            bold: "Managed, but not released.",
            text:
              " People are trained and ready for something that never went live, so there is nothing there to use.",
          },
        ],
      },
      {
        text: "The change is only used when both sides reach the same people.",
      },
    ] satisfies ChangeManagementContentSection[],
  },

  whatGoodLooksLike: [
    {
      text: "There is a change strategy with a clear purpose: what is changing, and why.",
    },
    {
      text: "The people affected are involved early, before the change reaches them.",
    },
    {
      text: "Users and staff know what the change means for them, in concrete terms.",
    },
    {
      text:
        "Training and support are in place so people can actually use the new way, with practice and help at hand.",
    },
    {
      text: "Adoption is measured, and the change is reinforced until the old way is gone.",
    },
    {
      text: "Someone owns the change, with named roles and a timeline.",
    },
  ] satisfies ChangeManagementLinkedProse[],

  whyItMatters: {
    lead:
      "A change can be delivered perfectly and still fail, because the people it was built for carry on the old way.",
    failureIntro: "When the people side is skipped, the cost is real:",
    failureModes: [
      {
        text: "The old way lingers. People keep using the system or process they know, and the change never takes hold.",
        bold: [{ phrase: "The old way lingers." }],
      },
      {
        text: "Two systems run at once. The old and the new run in parallel, at double the cost and effort, sometimes for years.",
        bold: [{ phrase: "Two systems run at once." }],
      },
      {
        text: "The benefits never arrive. The service was funded to deliver an outcome; without adoption, the money is spent and the outcome does not come.",
        bold: [{ phrase: "The benefits never arrive." }],
      },
      {
        text: "Trust erodes. A botched rollout makes the next change harder, because people learned that change means disruption with no payoff.",
        bold: [{ phrase: "Trust erodes." }],
      },
    ] satisfies ThreadLinkedProse[],
    closing: {
      text: "The Government of Canada treats adoption as what makes or breaks a digital shift, in the GC Information Management Strategy.",
      externalLinks: [
        {
          phrase: "GC Information Management Strategy",
          linkKey: "gc-information-management-strategy-storyline",
        },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    intro: {
      text:
        "A change succeeds one person at a time. The widely used ADKAR model names the five stages each person moves through, and a change stalls at whichever one is skipped.",
      externalLinks: [{ phrase: "ADKAR", linkKey: "prosci-adkar" }] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
    exampleNote: {
      title: "A new case screen for grants officers",
      sections: [
        {
          text:
            "A grants-and-contributions program is replacing the old case screen its officers use every day. Three groups are involved:",
        },
        {
          type: "orderedList",
          items: [
            {
              text:
                "The delivery team builds the new screen and releases it to production one Tuesday night.",
              bold: [{ phrase: "delivery team" }],
            },
            {
              text:
                "The grants officers are the users: the new screen is what they open on the Wednesday morning.",
              bold: [{ phrase: "grants officers" }],
            },
            {
              text: "Their manager, a change lead, and the delivery team get them ready.",
              bold: [{ phrase: "manager" }, { phrase: "change lead" }],
            },
          ],
        },
        {
          text: "The five stages below follow those officers.",
        },
      ] satisfies ChangeManagementContentSection[],
    },
    blocks: [
      {
        title: "Awareness.",
        sections: [
          {
            text:
              "People need to know a change is coming and why. State the reason in plain terms, from the point of view of the people it affects, before it arrives.",
            bold: [{ phrase: "know a change is coming and why" }],
          },
          {
            text:
              "A change sprung on people with no warning meets resistance before anyone understands it.",
          },
          {
            type: "editorialNote",
            label: "In the example",
            paragraphs: [
              {
                text:
                  "the officers hear why the old screen is going, from their own manager, three weeks before the switch.",
              },
            ],
          },
        ],
      },
      {
        title: "Desire.",
        sections: [
          {
            text:
              "Knowing about a change does not make people want it. Show what it does for them, involve them early so they help shape it, and be straight about what is hard.",
            bold: [{ phrase: "want it" }],
          },
          {
            text: "People who helped build a change are the ones who carry it.",
          },
          {
            type: "editorialNote",
            label: "In the example",
            paragraphs: [
              {
                text:
                  "a few officers help test the new screen, so their colleagues hear it is better from people they trust.",
              },
            ],
          },
        ],
      },
      {
        title: "Knowledge.",
        sections: [
          {
            text:
              "People need to know how to work the new way: what to do differently, and where to get help.",
            bold: [{ phrase: "how to work the new way" }],
          },
          {
            text:
              "This is training, guidance, and clear documentation, ready before the change goes live.",
          },
          {
            type: "editorialNote",
            label: "In the example",
            paragraphs: [
              {
                text:
                  "the officers get a hands-on training session and a one-page guide before the new screen goes live.",
              },
            ],
          },
        ],
      },
      {
        title: "Ability.",
        sections: [
          {
            text:
              "Knowing how is not the same as being able to. People need time to practise, support on hand while they find their feet, and the old obstacles removed so the new way is the easy one.",
            bold: [{ phrase: "the new way is the easy one" }],
          },
          {
            type: "editorialNote",
            label: "In the example",
            paragraphs: [
              {
                text:
                  "the officers get a few days to practise with someone on hand to help, and their most common task is set up to be quicker in the new screen.",
              },
            ],
          },
        ],
      },
      {
        title: "Reinforcement.",
        sections: [
          {
            text:
              "A change that is not reinforced slides back to the old way. Measure whether people have actually adopted it, keep supporting them, retire the old path so there is nothing to slip back to, and recognise the teams that made the switch.",
            bold: [{ phrase: "Measure whether people have actually adopted it" }],
          },
          {
            type: "editorialNote",
            label: "In the example",
            paragraphs: [
              {
                text:
                  "after go-live the old screen is switched off on a set date, usage is checked, and the first team to move across is thanked.",
              },
            ],
          },
        ],
      },
    ] satisfies ChangeManagementCloserLookBlock[],
  },

  whoseJob: {
    intro: "A change is delivered by several people, and it fails when no one owns the adoption.",
    roles: [
      {
        role: "The change lead or sponsor",
        text: "plans the adoption, communicates it, and drives it through.",
      },
      {
        role: "Managers of the affected teams",
        text: "carry their own people through the change day to day.",
      },
      {
        role: "The service team",
        text: "builds the change and the supports around it: the training, the guidance, the smoother path.",
      },
      {
        role: "The department's change management community",
        text: "is a shared resource the team draws on for templates and lessons learned.",
      },
      {
        role: "The business owner of the application",
        text: "owns the outcome, funds the change work, and backs it visibly so people take it seriously.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  twoWaysComparison: {
    id: "two-ways-comparison",
    title: "Two ways to manage a change",
    risky: {
      heading: "Vell",
      framing:
        "Meet Vell. They switched on a new case-management system and expected people to follow:",
      items: [
        "announced the change by email a week before go-live",
        "ran no training and gave people no time to practise",
        "left the old system running as a fallback",
        "never checked whether anyone had actually moved across",
      ],
      closing:
        "The result: staff kept using the old system and their own workarounds, the two ran in parallel for a year at double the cost, and the promised benefits never arrived.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Meet Pax. They planned the people side of the change from the start:",
      items: [
        "set a clear purpose and involved the affected teams while the system was still being shaped",
        "showed each team what changed for them, and trained them before go-live",
        "measured how many had moved across, and kept support on hand",
        "retired the old system on a set date once people were ready",
      ],
      closing:
        "The result: the teams switched, the old way was gone, and the service delivered what it was meant to.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "What Change management looks like in each phase",
    intro: "Change management changes shape across the life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "Plan the change early.",
        popupHeading: "Plan the change early.",
        popup: [
          {
            text: "Work out who the change affects and what it means for them.",
          },
          {
            text: "Write a change strategy with a clear purpose and named roles, and involve the affected people while there is still time to shape it.",
          },
          {
            text: "A change planned in from the start is one people are ready for.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "Win adoption.",
        popupHeading: "Win adoption.",
        popup: [
          {
            text: "Communicate the change, train people, and support them while they find their feet.",
          },
          {
            text: "Measure how many have actually moved across, and reinforce it until the old way is gone.",
          },
          {
            text: "This is where a delivered change becomes a used one.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "A retirement is a change too.",
        popupHeading: "A retirement is a change too.",
        popup: [
          {
            text: "People who relied on the old service have to move to whatever comes next, and that move needs the same care.",
          },
          {
            text: "Tell them early, help them across, and manage the loss of the familiar.",
          },
          {
            text: "A migration succeeds or fails on whether people adopt the replacement.",
          },
        ],
      },
    ] satisfies ChangeManagementPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "For whether people will actually take up a change, stage by stage, Prosci's ADKAR model is the individual-adoption lens. Kotter's 8 Steps for Leading Change is the organisation-level companion: building urgency, a guiding coalition, and short-term wins. For a government, activity-level template, the US GSA M3 Playbook's task on defining a change-management approach sets up the work on a project.",
    externalLinks: [
      { phrase: "ADKAR model", linkKey: "prosci-adkar" },
      { phrase: "8 Steps for Leading Change", linkKey: "kotter-8-steps" },
      {
        phrase: "defining a change-management approach",
        linkKey: "gsa-m3-change-management-approach",
      },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Supporting reference",
      linkKey: "gc-information-management-strategy-storyline" satisfies ExternalLinkKey,
      description:
        "GC Information Management Strategy, Storyline (TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/information-management/information-management-strategy/storyline.html",
    },
    {
      label: "Supporting reference",
      linkKey: "csps-project-management-learning-path" satisfies ExternalLinkKey,
      description:
        "CSPS Project Management Learning Path, change strand (Canada School of Public Service) — https://www.csps-efpc.gc.ca/learning-paths/project-management-eng.aspx",
    },
    {
      label: "Supporting reference",
      linkKey: "prosci-adkar" satisfies ExternalLinkKey,
      description: "The ADKAR Model (Prosci) — https://www.prosci.com/methodology/adkar",
    },
    {
      label: "Supporting reference",
      linkKey: "kotter-8-steps" satisfies ExternalLinkKey,
      description:
        "8 Steps for Leading Change (Kotter Inc.) — https://www.kotterinc.com/methodology/8-steps/",
    },
    {
      label: "Supporting reference",
      linkKey: "gsa-m3-change-management-approach" satisfies ExternalLinkKey,
      description:
        "Define Change Management Approach, task 1.7 (US GSA M3 Playbook) — https://ussm.gsa.gov/1.7/",
    },
    {
      label: "Supporting reference",
      linkKey: "iocn-change-network" satisfies ExternalLinkKey,
      description:
        "Interdepartmental Organizational Change Network (IOCN, GCcollab) — https://wiki.gccollab.ca/IOCN-RICO",
    },
    {
      label: "Supporting reference",
      href: placeholderSourceHref(DIGITAL_SOLUTIONS_CHANGE_MANAGEMENT_PORTAL),
      description: `${DIGITAL_SOLUTIONS_CHANGE_MANAGEMENT_PORTAL} — GC network.`,
      comingSoon: true,
      gcNetworkOnly: true,
    },
  ] satisfies SourceItem[],
} as const;
