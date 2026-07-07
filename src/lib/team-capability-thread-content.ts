import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
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

export type TeamCapabilityLinkedProse = ThreadLinkedProse;
export type TeamCapabilityContentSection = ThreadContentSection;
export type TeamCapabilityCloserLookBlock = ThreadCloserLookBlock;
export type TeamCapabilityPhasePreviewBlock = ThreadPhasePreviewBlock;

export const teamCapabilityLeadPlainText = (lead: readonly ThreadLinkedProse[]) =>
  lead.map((paragraph) => paragraph.text).join(" ");
export const teamCapabilitySectionsPlainText = threadSectionsPlainText;
export const teamCapabilityWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);
export const teamCapabilityWhyItMattersPlainText = threadWhyItMattersPitchPlainText;

const KEEP_CAPABILITY_IN_HOUSE_PATH = "/thread/procurement/keep-capability-in-house";
const AVOID_LOCK_IN_PATH = "/thread/procurement/avoid-lock-in";

export const TEAM_CAPABILITY_THREAD = {
  title: "Team capability",
  slug: "team-capability" as const,

  lead: [
    {
      text:
        "Every government service needs people to build it and keep it running: to work out what users need, design it, write the code, test it, watch it in production, and fix it when it breaks. Team capability is having the right mix of those skills, and holding enough of them inside the department so the service can be governed and moved even when a supplier does the building.",
    },
    {
      text:
        "Most digital work runs best as one multidisciplinary team, a single group that covers the skills a service needs from start to finish. The Government of Canada builds this capability in-house under the Directive on Digital Talent and the GC Digital Talent Strategy.",
      externalLinks: [
        { phrase: "Directive on Digital Talent", linkKey: "directive-digital-talent" },
        { phrase: "GC Digital Talent Strategy", linkKey: "gc-digital-talent-strategy" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text:
        "In practice, most departments do not have deep digital teams of their own, and across the Government of Canada in-house capability is thin. Much of the building is done by suppliers. That makes the in-house side matter even more. Even a small service needs enough people, on the team or a short call away, who understand it well enough to steer it, judge the work, and step in if a supplier leaves.",
    },
    {
      text:
        "A capable team comes down to the right roles, knowing who else you need and keeping them close, and skills kept current.",
    },
  ] satisfies ThreadLinkedProse[],

  whatGoodLooksLike: [
    {
      text: "A named product owner is empowered to set priorities and make decisions for the service.",
    },
    {
      text: "The team covers the roles a digital service needs: product and delivery management, user research, design, development, and operations.",
    },
    {
      text: "Enough people in the department understand the service to govern it, judge a supplier's work, and run a move if one is needed.",
    },
    {
      text: "The team has the authority and the access to do the work, and the standing to make decisions.",
    },
    {
      text: "The department knows who it needs for the service, on the team or a call away, and can reach them.",
    },
    {
      text: "Skills are kept current, with time and budget set aside for training.",
    },
    {
      text: "More than one person understands each important part of the service, so no single departure leaves a gap.",
    },
  ] satisfies TeamCapabilityLinkedProse[],

  whyItMatters: {
    lead:
      "Team capability is easy to skip. A supplier can be hired to do the work, and the service still launches.",
    failureIntro: "The cost shows up later, and it is steep:",
    failureModes: [
      {
        text: "You get locked in. With no one inside who understands the service, the supplier holds every answer and sets the price at each renewal. This is the trap avoiding lock-in is about.",
        bold: [{ phrase: "You get locked in." }],
        internalLinks: [{ phrase: "avoiding lock-in", to: AVOID_LOCK_IN_PATH }] satisfies InternalPhraseLink[],
      },
      {
        text: "You cannot govern the work. To judge whether a supplier's research, security, or design is any good, someone on the department's side has to know what good looks like. Without that, the department signs off on work it cannot check.",
        bold: [{ phrase: "You cannot govern the work." }],
      },
      {
        text: "You cannot leave. Moving a service to a new supplier, or bringing it back in-house, needs people who understand it. A department that kept no one loses that option.",
        bold: [{ phrase: "You cannot leave." }],
      },
      {
        text: "The department falls behind its own service. Knowledge fades, the service ages, and the department ends up unable to safely change the thing it is accountable for.",
        bold: [{ phrase: "The department falls behind its own service." }],
      },
    ] satisfies ThreadLinkedProse[],
    closing: {
      text: "The Government of Canada makes this a requirement in the Directive on Digital Talent, because a department that keeps no capability cannot govern its services, cannot leave a supplier, and cannot improve what it runs.",
      externalLinks: [
        { phrase: "Directive on Digital Talent", linkKey: "directive-digital-talent" },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "The roles a service needs.",
        sections: [
          {
            text: "A digital service is built and run by a handful of roles working together:",
          },
          {
            type: "unorderedList",
            items: [
              { bold: "product manager", text: ", who decides what to build and why;" },
              { bold: "delivery manager", text: ", who keeps the work moving;" },
              { bold: "user researchers", text: ", who find out what people need;" },
              { bold: "designers", text: ", who shape the service;" },
              { bold: "developers", text: ", who build it;" },
              { bold: "operations", text: ", who run it once it is live." },
            ],
          },
          {
            text:
              "On a small service one person may hold two roles, and that is fine as long as the skills are covered.",
          },
          {
            text:
              "The UK's guide to what each role does sets out each role and offers job descriptions to reuse.",
            externalLinks: [
              {
                phrase: "guide to what each role does",
                linkKey: "uk-service-manual-what-each-role",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Core team and extended team.",
        sections: [
          {
            text: "Think of the team in two rings.",
          },
          {
            text:
              "The core team lives the work day to day and stays together across the life of the service.",
            bold: [{ phrase: "core team" }],
          },
          {
            text: "The extended team is the wider group of specialists brought in when the work calls for them:",
            bold: [{ phrase: "extended team" }],
          },
          {
            type: "unorderedList",
            items: [
              "a security specialist,",
              "an accessibility expert,",
              "a lawyer,",
              "a data architect.",
            ],
          },
          {
            text:
              "Australia's multidisciplinary-team guidance covers how to staff both rings, from discovery through to a running service.",
            externalLinks: [
              {
                phrase: "multidisciplinary-team guidance",
                linkKey: "dta-multidisciplinary-team",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Know who you need, and keep them close.",
        sections: [
          {
            text:
              "Most departments cannot staff every digital role themselves, and across the Government of Canada in-house capability is thin. The realistic aim is a small core the department holds, plus a clear map of who else the service needs.",
            bold: [
              { phrase: "a small core the department holds" },
              { phrase: "a clear map of who else the service needs" },
            ],
          },
          {
            text:
              "The department needs enough people who understand how the service works to govern it, question a bad change, judge a renewal, and, if it comes to it, move the service to someone else. Those people can be on the team, in another team, or in a shared community, as long as they are close enough to call on.",
          },
          {
            text:
              "Keeping them close is what stops a department falling behind its own service and getting locked in to one supplier. It is the same capability the buying side depends on, set out in keeping enough in-house when you buy.",
            bold: [{ phrase: "Keeping them close" }],
            internalLinks: [
              {
                phrase: "keeping enough in-house when you buy",
                to: KEEP_CAPABILITY_IN_HOUSE_PATH,
              },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Keeping skills current.",
        sections: [
          {
            text:
              "Skills fade when they are not used, and digital work changes fast. Government builds and renews this capability in three ways:",
          },
          {
            type: "orderedList",
            items: [
              {
                text: "the GC Digital Talent platform for finding and classifying digital roles;",
                externalLinks: [
                  { phrase: "GC Digital Talent platform", linkKey: "gc-digital-talent-platform" },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text: "the CSPS Digital Academy for product, design, data, and operations training;",
                externalLinks: [
                  { phrase: "CSPS Digital Academy", linkKey: "csps-digital-academy" },
                ] satisfies ExternalPhraseLink[],
              },
              "hiring routes made for digital work.",
            ],
          },
          {
            text:
              "Set aside time and budget for this, the way the Government of Canada Digital Standards ask departments to empower and invest in their staff.",
            externalLinks: [
              {
                phrase: "Government of Canada Digital Standards",
                linkKey: "digital-standards",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies TeamCapabilityCloserLookBlock[],
  },

  whoseJob: {
    intro: "Team capability is shared across a department.",
    roles: [
      {
        role: "The product owner or delivery lead",
        text: "runs the team day to day and sets what it works on next.",
      },
      {
        role: "Human resources and hiring managers",
        text: "recruit, classify, and staff the digital roles.",
      },
      {
        role: "The team members",
        text: "researchers, designers, developers, operations, do the work and keep their own skills current.",
      },
      {
        role: "The department's digital talent community",
        text: "is a shared resource the team draws on for recruitment routes and specialist skills.",
      },
      {
        role: "The business owner of the application",
        text: "makes sure the service has the people and skills it needs, holds enough capability in-house, and funds the training to keep it.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  twoWaysComparison: {
    id: "two-ways-comparison",
    title: "Two ways to build a team",
    risky: {
      heading: "Vell",
      framing:
        "Meet Vell. They handed the whole permit system to one supplier and kept no one in-house who understood it:",
      items: [
        "gave the build and the running of the service to a single supplier",
        "kept no product owner with the authority to set priorities",
        "let one contractor hold all the knowledge of how it worked",
        "put no time or budget into the department's own skills",
      ],
      closing:
        "The result: at renewal the supplier held every answer and set the price, a small change took months, and no one inside could judge whether the work was any good.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Meet Pax. They built a small multidisciplinary team around the permit system:",
      items: [
        "kept a product owner, a developer, and a service designer in-house, and brought in specialists as needed",
        "wrote down the decisions that mattered and kept the documentation current",
        "rotated people through the work so more than one person understood each part",
        "set aside time for training through the CSPS Digital Academy",
      ],
      closing:
        "The result: when the supplier changed, the service kept running, the team could read the new work and push back on a weak change, and a move stayed possible.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "What Team capability looks like in each phase",
    intro: "Team capability changes shape across the life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "Assemble the team.",
        popupHeading: "Assemble the team.",
        popup: [
          {
            text: "The department works out which roles the service needs, and decides which capability to keep in-house and which to bring in.",
          },
          {
            text: "It gets a product owner in place with the authority to make decisions.",
          },
          {
            text: "Capability planned in now sets what the service can do for years.",
          },
        ],
      },
      {
        title: "Live.",
        preview: "Keep the team together.",
        popupHeading: "Keep the team together.",
        popup: [
          {
            text: "Skills are kept current, and knowledge is spread across more than one person so a departure does not leave a gap.",
          },
          {
            text: "The team watches its own health and workload.",
          },
          {
            text: "A team that loses its people ages into one that cannot safely change the service.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Hold on to the people who understand it.",
        popupHeading: "Hold on to the people who understand it.",
        popup: [
          {
            text: "Enough of the team is kept to run the move or the retirement, and the knowledge is transferred before people leave.",
          },
          {
            text: "The service is not left with no one who remembers how it works.",
          },
        ],
      },
    ] satisfies TeamCapabilityPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "For setting up and running a multidisciplinary service team, with roles, contractors, and training, The team in the UK Service Manual is a full guide. Australia's Have a multidisciplinary team guidance covers how to staff a service across its life and which roles to keep in-house. For a runnable self-assessment a team can use to check its own health, Atlassian's Team Health Monitor walks through eight attributes.",
    externalLinks: [
      { phrase: "The team", linkKey: "uk-service-manual-the-team" },
      { phrase: "Have a multidisciplinary team", linkKey: "dta-multidisciplinary-team" },
      { phrase: "Team Health Monitor", linkKey: "atlassian-team-health-monitor" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "directive-digital-talent" satisfies ExternalLinkKey,
      description:
        "Directive on Digital Talent (TBS) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32749",
    },
    {
      label: "Supporting reference",
      linkKey: "gc-digital-talent-strategy" satisfies ExternalLinkKey,
      description:
        "GC Digital Talent Strategy (TBS OCIO) — https://www.canada.ca/en/government/system/digital-government/digital-talent-strategy.html",
    },
    {
      label: "Supporting reference",
      linkKey: "gc-digital-talent-platform" satisfies ExternalLinkKey,
      description: "GC Digital Talent platform (TBS) — https://talent.canada.ca/",
    },
    {
      label: "Supporting reference",
      linkKey: "csps-digital-academy" satisfies ExternalLinkKey,
      description:
        "CSPS Digital Academy (Canada School of Public Service) — https://www.csps-efpc.gc.ca/digital-academy/index-eng.aspx",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-service-manual-what-each-role" satisfies ExternalLinkKey,
      description:
        "What each role does in a service team (UK Service Manual) — https://www.gov.uk/service-manual/the-team/what-each-role-does-in-a-service-team",
    },
    {
      label: "Supporting reference",
      linkKey: "dta-multidisciplinary-team" satisfies ExternalLinkKey,
      description:
        "Have a multidisciplinary team (Australia DTA) — https://www.dta.gov.au/help-and-advice/digital-service-standard/digital-service-standard-criteria/2-have-multidisciplinary-team",
    },
    {
      label: "Supporting reference",
      linkKey: "digital-standards" satisfies ExternalLinkKey,
      description:
        "Government of Canada Digital Standards (TBS) — https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards.html",
    },
    {
      label: "Supporting reference",
      linkKey: "atlassian-team-health-monitor" satisfies ExternalLinkKey,
      description:
        "Team Health Monitor (Atlassian) — https://www.atlassian.com/team-playbook/health-monitor",
    },
  ] satisfies SourceItem[],
} as const;
