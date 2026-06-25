import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import { OPTIONS_ANALYSIS_PATH } from "@/lib/reference-paths";
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

export type UserResearchLinkedProse = ThreadLinkedProse;
export type UserResearchContentSection = ThreadContentSection;
export type UserResearchCloserLookBlock = ThreadCloserLookBlock;
export type UserResearchPhasePreviewBlock = ThreadPhasePreviewBlock;

export const userResearchSectionsPlainText = threadSectionsPlainText;
export const userResearchLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const userResearchWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const USER_RESEARCH_THREAD = {
  title: "User research",
  slug: "user-research" as const,

  lead: {
    text:
      "User research means learning what the people who will use a service actually need, by studying and testing with them, instead of guessing. The Government of Canada puts this first among its digital standards: research with users to understand their needs, and test with them to guide what gets built. A service built on what a few people assume users want is the most common way services fail. The decisions about who to learn from and what to find out are made early and repeated as the service changes. The business owner answers for them; the team does the work.",
    externalLinks: [
      { phrase: "digital standards", linkKey: "design-with-users" },
    ] satisfies ExternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    {
      text: "Real users are studied before the design is set, so the service solves a need they actually have.",
    },
    {
      text: "The service is tested with real people throughout, including before launch and as it changes.",
      externalLinks: [
        { phrase: "tested with real people", linkKey: "nng-usability-testing-101" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "The people researched reflect who actually uses the service, including people who use assistive technology and people who face barriers of language, literacy, or distance.",
      internalLinks: [
        {
          phrase: "people who use assistive technology",
          to: THREADS.accessibility.path,
        },
      ] satisfies InternalPhraseLink[],
    },
    { text: "Findings are shared with the team and acted on." },
    {
      text: "Research runs across the whole life: discovery, build, testing, and after launch.",
    },
    {
      text: "After launch, client feedback and analytics keep showing what to improve.",
      externalLinks: [{ phrase: "client feedback", linkKey: "gc-page-feedback" }] satisfies ExternalPhraseLink[],
    },
    {
      text: 'A "stop" is a valid result: if research shows the service is not needed, that counts as success.',
    },
    {
      text: "Research is planned and funded, with consent, privacy, and fair compensation for participants.",
    },
  ] satisfies UserResearchLinkedProse[],

  whyItMatters: {
    text:
      "Most government software that fails, fails because it was built on what a few people assumed users wanted, not on what users actually need. Research is the cheapest way to avoid building the wrong thing, which is why it is framed as risk reduction for the people who fund and own services. It is also required: the Design with users standard sets the expectation, and the Directive on Service and Digital makes the designated official responsible for ensuring client feedback and user-experience testing are collected and used to improve the service. The usual causes of failure are ordinary: guessing at needs, testing too late, and hearing only from stakeholders.",
    externalLinks: [
      { phrase: "Design with users", linkKey: "design-with-users" },
      { phrase: "Directive on Service and Digital", linkKey: "guideline-service-digital" },
    ] satisfies ExternalPhraseLink[],
  },

  whoseJob: {
    intro: "User research is shared across the team, with each role holding a different part:",
    roles: [
      {
        role: "User researchers and service designers",
        text: "plan and run the research and turn it into findings the team can act on.",
      },
      {
        role: "Designers and content authors",
        text: "turn those findings into the design and plain-language content.",
      },
      {
        role: "Developers",
        text: "build what is tested and iterate on what the research finds.",
      },
      {
        role: "The business owner of the application",
        text: 'makes sure research is planned, funded, and acted on, and accepts a "stop" as a valid result.',
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "Research is more than testing.",
        sections: [
          {
            text:
              "User research is the umbrella: understanding who your users are and what they need across the whole service. Usability testing, watching real people attempt real tasks with your design, is one method inside it, the one you reach for to find and fix problems in something you have built or prototyped. The field of methods is wide, and the simplest way to choose is by the question: qualitative methods (interviews, usability testing) answer \"why\", and quantitative methods (analytics, A/B testing) answer \"how many\". Use the one that fits the decision in front of you.",
            bold: [{ phrase: "User research" }, { phrase: "Usability testing" }],
            externalLinks: [
              { phrase: "field of methods", linkKey: "nng-ux-research-methods" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Test with real people, and few are enough.",
        sections: [
          {
            text:
              "You do not need a big study. Testing with about five users in a group surfaces most of the common problems, and a small round can run in a few days. Tests can be moderated (someone guides the session) or unmoderated (a tool runs it), in person or remote. The point is to watch real people, including people who use assistive technology, try real tasks, because a service can look right to the team and still defeat the person using it. Usability testing is the plainest place to start.",
            bold: [{ phrase: "five users" }],
            internalLinks: [
              {
                phrase: "people who use assistive technology",
                to: THREADS.accessibility.path,
              },
            ] satisfies InternalPhraseLink[],
            externalLinks: [
              { phrase: "Usability testing", linkKey: "nng-usability-testing-101" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Include everyone.",
        sections: [
          {
            text:
              "Research is only as good as who is in it. Recruit a sample that reflects real users across disability, language, literacy, age, and distance, not just the easy-to-reach. Accommodations that help disabled participants take part, accessible materials, a tech check, flexible timing, tend to help everyone. Tie what you learn to people's needs and goals, not to any one person's disability. This is shared ground with accessibility, where building for everyone is the law.",
            internalLinks: [
              { phrase: "accessibility", to: THREADS.accessibility.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
    ] satisfies UserResearchCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Two ways to do user research",
    risky: {
      heading: "Vell",
      framing: "Meet Vell. They built the grant portal on what the team assumed applicants wanted:",
      items: [
        "talked only to a couple of managers, never to a real applicant",
        "tested the finished service once, the week before launch",
        "shared no findings, because there were none to share",
      ],
      closing:
        "The result: applicants could not work out how to start a claim, the call centre was swamped in the first week, and the fixes meant rebuilding screens that were already live.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Meet Pax. They researched the grant portal with the people who would use it:",
      items: [
        "interviewed real applicants in discovery to learn what they actually needed",
        "tested prototypes with about five users each round, including someone using a screen reader, and fixed what they found",
        "shared findings with the team and kept a feedback channel open after launch",
      ],
      closing:
        "The result: applicants could complete a claim on their own, calls dropped, and changes were small because the big problems were caught early.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "What User research looks like in each phase",
    intro: "The research changes shape across the life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "Learn what people need before you build.",
        popup: [
          {
            text:
              'The most valuable research happens before much is built. The team works out who the users are, interviews and observes them to find the real need, and tests early prototypes with a handful of people each round. This is also where a "stop" can be the right answer: if the research shows the service is not needed, that is a result worth having before money is spent. The Design with users guidance walks through the Discover and Build stages.',
            externalLinks: [
              { phrase: "Design with users", linkKey: "design-with-users" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "the right answer", to: OPTIONS_ANALYSIS_PATH },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Keep testing, and keep listening.",
        popup: [
          {
            text:
              "Once the service is running, research does not stop. The team keeps testing as the service changes, and watches how people actually use it through client feedback and analytics, then improves in small steps. Acting on what comes back is the part that is required and the part most often skipped.",
            externalLinks: [
              { phrase: "client feedback", linkKey: "gc-page-feedback" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Research the move, or the ending.",
        popup: [
          {
            text:
              "When a service is retired or replaced, research still helps. If it is replaced, the same understanding of user needs shapes the new service, and the move is tested with real people so no one is stranded. If it is retired, research tells you whether the need has truly gone and how people will do the task another way.",
          },
        ],
      },
    ] satisfies UserResearchPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Researching with users is the first of the Government of Canada's digital standards, and the Directive on Service and Digital makes collecting and acting on client feedback and user-experience testing a responsibility, not an option. For how to actually do it, Ontario's User Research Guide and Service Design Playbook are reusable Canadian references on what to plan, fund, and expect. For methods and testing, the Nielsen Norman Group's map of research methods and Usability Testing 101 are the plainest starts, 18F's De-risking Government Technology makes the case to funders, and the UK Service Manual's user research is the fullest how-to.",
    externalLinks: [
      { phrase: "digital standards", linkKey: "design-with-users" },
      { phrase: "Directive on Service and Digital", linkKey: "guideline-service-digital" },
      { phrase: "User Research Guide", linkKey: "ontario-user-research-guide" },
      { phrase: "Service Design Playbook", linkKey: "ontario-service-design-playbook" },
      { phrase: "map of research methods", linkKey: "nng-ux-research-methods" },
      { phrase: "Usability Testing 101", linkKey: "nng-usability-testing-101" },
      { phrase: "De-risking Government Technology", linkKey: "18f-derisking" },
      { phrase: "user research", linkKey: "uk-service-manual-user-research" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "design-with-users" satisfies ExternalLinkKey,
      description:
        'GC Digital Standards, "Design with users" (TBS) — https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/design-with-users.html',
    },
    {
      label: "Governing instrument",
      linkKey: "guideline-service-digital" satisfies ExternalLinkKey,
      description:
        "Directive on Service and Digital (TBS), s.4.2.1.1 on client feedback and UX testing, via the Guideline on Service and Digital — https://www.canada.ca/en/government/system/digital-government/guideline-service-digital.html",
    },
    {
      label: "Supporting reference",
      linkKey: "ontario-user-research-guide" satisfies ExternalLinkKey,
      description:
        "Ontario User Research Guide (Ontario Digital Service, CC-BY; reusable, provincial) — https://www.ontario.ca/page/user-research-guide",
    },
    {
      label: "Supporting reference",
      linkKey: "ontario-service-design-playbook" satisfies ExternalLinkKey,
      description:
        "Ontario Service Design Playbook (ODS, CC-BY; reusable, provincial) — https://www.ontario.ca/page/service-design-playbook",
    },
    {
      label: "Supporting reference",
      linkKey: "cds-build-first-users-first" satisfies ExternalLinkKey,
      description:
        "Canadian Digital Service, From build first to users first — https://digital.canada.ca/2018/11/29/from-build-first-to-users-first/",
    },
    {
      label: "Supporting reference",
      linkKey: "gc-page-feedback" satisfies ExternalLinkKey,
      description:
        "Canada.ca GC Feedback / Page Feedback Tool (ESDC) — https://design.canada.ca/feedback/index.html",
    },
    {
      label: "Supporting reference",
      linkKey: "nng-ux-research-methods" satisfies ExternalLinkKey,
      description:
        "Nielsen Norman Group, Which UX research methods to use when — https://www.nngroup.com/articles/which-ux-research-methods/",
    },
    {
      label: "Supporting reference",
      linkKey: "nng-usability-testing-101" satisfies ExternalLinkKey,
      description:
        "Nielsen Norman Group, Usability Testing 101 — https://www.nngroup.com/articles/usability-testing-101/",
    },
    {
      label: "Supporting reference",
      linkKey: "18f-derisking" satisfies ExternalLinkKey,
      description:
        "18F, De-risking Government Technology — https://guides.18f.gov/derisking/",
    },
    {
      label: "Supporting reference",
      linkKey: "18f-accessibility-in-research" satisfies ExternalLinkKey,
      description:
        "18F, Accessibility in research — https://guides.18f.gov/ux-guide/research/accessibility/",
    },
    {
      label: "Supporting reference",
      linkKey: "australia-dta-understand-user-needs" satisfies ExternalLinkKey,
      description:
        "DTA (Australia), Digital Service Standard, Criterion 1: Understand user needs — https://www.dta.gov.au/help-and-advice/digital-service-standard/digital-service-standard-criteria/1-understand-user-needs",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-service-manual-user-research" satisfies ExternalLinkKey,
      description:
        "UK Service Manual, User research — https://www.gov.uk/service-manual/user-research",
    },
  ] satisfies SourceItem[],
} as const;
