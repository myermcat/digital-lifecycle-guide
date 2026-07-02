import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
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

export type JoinedUpDeliveryLinkedProse = ThreadLinkedProse;
export type JoinedUpDeliveryContentSection = ThreadContentSection;
export type JoinedUpDeliveryCloserLookBlock = ThreadCloserLookBlock;
export type JoinedUpDeliveryPhasePreviewBlock = ThreadPhasePreviewBlock;

export const joinedUpDeliverySectionsPlainText = threadSectionsPlainText;
export const joinedUpDeliveryLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const joinedUpDeliveryWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const JOINED_UP_DELIVERY_THREAD = {
  title: "Joined-up delivery",
  slug: "joined-up-delivery" as const,

  lead: {
    text:
      "Joined-up delivery means making a person's whole task work from end to end, including the steps handled by other services that come before and after yours in the person's journey. A person rarely sets out to use one service; they set out to move house, start a business, or recover after a death, and that task usually crosses several services and several ways of getting help. Joined-up delivery pulls together four things: seeing the user's whole journey across every service and channel it touches, working with the teams responsible for the services on either side of yours, connecting the systems so they exchange information instead of asking the user for it twice, and keeping every channel in step so the phone line and the counter give the same answers as the website.",
  } satisfies ThreadLinkedProse,

  wholeJourney: {
    id: "your-service-is-one-box-in-a-bigger-journey",
    title: "Your service is one box in a bigger journey",
    paragraphs: [
      {
        text: "Most of the time, people do not want to use a government service. What they want is to move to a new country, start a job, raise a child, retire. The service is the thing they have to do to get to what they actually want. As Louise Downe, who led design for the UK government, put it: good services are verbs, and bad services are nouns.",
        externalLinks: [
          {
            phrase: "good services are verbs, and bad services are nouns",
            linkKey: "uk-home-office-service-design",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Government touches those big moments, but the services for any one of them are split into fragments, spread across departments and across federal, provincial, and municipal government. A person has to work out, on their own, what to do and when.",
        bold: [{ phrase: "split into fragments" }],
      },
    ] satisfies ThreadLinkedProse[],
    example: {
      title: "Building a life in Canada.",
      text: "Take Amara, a nurse moving to Canada for work. Her goal is simple: live and work here, with her kids in school. To get there she has to get permission to come (permanent residence, IRCC; if her job requires it, her employer first gets a labour market assessment, ESDC), be admitted at the border (CBSA), get a Social Insurance Number before she can be paid (Service Canada), open a bank account, apply for a provincial health card and in some provinces wait three months for coverage, get a driver's licence, have her nursing credentials recognised by the provincial regulator, enrol her kids in school, and file taxes to receive the Canada Child Benefit and the GST credit (CRA). Months later she has to track when her permanent residence card needs renewing and when she can apply for citizenship. No single office sees Amara's whole journey. Each sees its own form. She is the only one who lives the whole thing, and she has to work out the order, the timing, and which office to call.",
    },
    closingLeads: [
      {
        text: "Your service is one box in that larger journey. The part your team owns, the visa, the health card, the tax account, can be flawless on its own and the journey can still fall apart if the boxes do not join up.",
        bold: [{ phrase: "Your service is one box in that larger journey." }],
      },
      {
        text: "Map the journey first, then design your box to fit it. Mapping the whole journey shows where it breaks between offices, which is where people get lost, scared, or stuck, and it shows the steps that repeat and the parts that could be reused.",
        bold: [{ phrase: "Map the journey first, then design your box to fit it." }],
      },
    ] satisfies ThreadLinkedProse[],
  },

  whatGoodLooksLike: [
    {
      text: "The user's whole journey is mapped end to end, across every service and channel it touches, including the steps that happen before and after your own part.",
      externalLinks: [
        { phrase: "mapped end to end", linkKey: "uk-service-manual-whole-problem" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "The teams responsible for the services on either side have agreed how the journey works across organizational lines.",
    },
    {
      text: "Systems exchange information so a person gives the same information to government once, rather than repeating it to each service.",
      externalLinks: [
        { phrase: "exchange information", linkKey: "gc-standards-on-apis" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Existing solutions are reused and functionality is exposed as a service, so the next team can connect to yours instead of rebuilding it.",
      internalLinks: [{ phrase: "reused", to: OPTIONS_ANALYSIS_PATH }] satisfies InternalPhraseLink[],
    },
    {
      text: "Every channel gives a consistent experience, and a change to the online service updates the phone scripts, letters, and in-person steps at the same time.",
      externalLinks: [
        { phrase: "consistent experience", linkKey: "guideline-service-digital" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Front-line and operations staff who help users know how the current service works, and there is a process to keep them up to date when it changes.",
    },
    {
      text: "People who cannot or will not use the online service on their own can get help by phone or in person, and the non-digital channels stay easy to find.",
    },
  ] satisfies JoinedUpDeliveryLinkedProse[],

  whyItMatters: {
    lead:
      "A person does not experience your service on its own. They experience the whole task, and that task usually runs across departments and across channels.",
    failureIntro: "When the parts do not join up, the person is left to:",
    failureModes: [
      "work out how government is organized just to get something done;",
      "give the same details to one service after another;",
      "or fall into the gap between an online form and a phone line that knows nothing about it.",
    ],
    closing: {
      text: "The Government of Canada sets the expectation in its digital standards, to design around user needs and collaborate widely, and the Policy on Service and Digital makes it firmer: services should take an omni-channel approach that gives an integrated client experience, with service standards for every channel and non-digital channels kept open so people have a choice. Joining a service up is also how someone who needs the phone or the counter is not left behind as more of the service moves online.",
      externalLinks: [
        { phrase: "digital standards", linkKey: "digital-standards" },
        { phrase: "Policy on Service and Digital", linkKey: "policy-on-service-and-digital" },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

  whoseJob: {
    intro:
      "Joined-up delivery is shared across the team and the organizations around it, with each role holding a different part:",
    roles: [
      {
        role: "Service designers and user researchers",
        text: "map the whole journey, run the cross-organization mapping, and find where the journey breaks between services and channels.",
      },
      {
        role: "Developers and architects",
        text: "build the connections, expose the service's functionality through an API, and reuse what already exists so systems interoperate.",
        externalLinks: [{ phrase: "API", linkKey: "gc-standards-on-apis" }] satisfies ExternalPhraseLink[],
      },
      {
        role: "Operations and front-line staff",
        text: "deliver the phone and in-person channels and the help people need, and keep their scripts and knowledge current as the service changes.",
      },
      {
        role: "The business owner of the application",
        text: "takes responsibility for agreeing how the journey works with the other organizations, and funds the non-digital channels and the support that go with it.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "Map the whole journey first.",
        sections: [
          {
            text: "Before you can join a service up, you have to see the whole task the way the person does, the way Amara does above. Two maps help:",
          },
          {
            type: "unorderedList",
            items: [
              {
                bold: "A service landscape",
                text: " shows the task from government's side: every touchpoint, the back-office steps, and which organizations are involved.",
              },
              {
                text: "An experience map shows it from the user's side, where they wait, repeat themselves, or hit a dead end.",
                externalLinks: [
                  { phrase: "experience map", linkKey: "nng-journey-mapping-101" },
                ] satisfies ExternalPhraseLink[],
              },
            ],
          },
          {
            text: "Mapping starts by working out who else delivers the journey, then bringing those teams together so everyone shares one picture. The map shows the quick wins, often content fixes, and the bigger changes worth making.",
          },
        ] satisfies ThreadContentSection[],
      },
      {
        title: "Connect the systems so people enter details once.",
        sections: [
          {
            text: "Services join up technically when they can exchange information. The Government of Canada's standards on APIs describe how a service exposes its functionality so other systems can use it, on the principle of build once and serve every channel. The enterprise architecture expectation is to reuse what exists and expose functionality as services rather than rebuild.",
            externalLinks: [
              { phrase: "standards on APIs", linkKey: "gc-standards-on-apis" },
              {
                phrase: "reuse what exists and expose functionality as services",
                linkKey: "gc-ea-application-architecture",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text: "The European model sets out four layers: legal, organizational, semantic, and technical. A useful test for the semantic layer is that what one service sends is what the next service understands.",
            bold: [{ phrase: "Interoperability is more than technical." }],
            externalLinks: [
              { phrase: "European model", linkKey: "european-interoperability-framework" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text: "The payoff for the user is plain: they give their information to government once.",
          },
        ] satisfies ThreadContentSection[],
      },
      {
        title: "Keep every channel in step.",
        sections: [
          {
            text: "Most services run across more than one channel: online, phone, letter, in person. Keeping them in step means a change to the online service reaches the others at the same time. The call-centre scripts are updated, the letters are revised, and the front-line staff who answer questions know how the current service works.",
            externalLinks: [
              {
                phrase: "front-line staff who answer questions",
                linkKey: "uk-service-standard-point-3-join-channels",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text: "It also means looking after the people who cannot or will not use the online service on their own. That help, by phone or in person, is called assisted digital support, and people may need it for reasons of trust, confidence, internet access, digital skills, or motivation.",
            externalLinks: [
              { phrase: "assisted digital support", linkKey: "uk-assisted-digital-introduction" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text: "As more of a service moves online, the phone and the counter stay easy to find. Pushing digital take-up should never make the other channels harder to reach.",
          },
        ] satisfies ThreadContentSection[],
      },
    ] satisfies JoinedUpDeliveryCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Two ways to join up a service",
    risky: {
      heading: "Vell",
      framing:
        "Meet Vell, a service manager. They built a change-of-address form for one program and stopped there:",
      items: [
        "never spoke to the other programs a person who moves also has to tell",
        "built no connection to other systems, so the person had to enter the same new address again with each department",
        "changed the online form but never told the call centre, so phone staff walked people through steps that no longer existed",
      ],
      closing:
        "The result: people thought one update had reached everyone and it had not, calls climbed, and the website and the phone line contradicted each other.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Meet Pax, a service manager. They treated moving as one journey across the services it touches:",
      items: [
        "mapped the journey with the other programs and agreed how the address change would flow between them",
        "exposed the change through an API so the downstream services updated, and the person entered the new address once",
        "updated the call-centre scripts and trained front-line staff in the same week the online form changed, and kept the phone option easy to find",
      ],
      closing:
        "The result: a person could update their address once and have it reach the programs that needed it, and the phone line gave the same answers as the website.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "What Joined-up delivery looks like in each phase",
    intro: "Joining a service up is work in every phase, not a one-time launch task.",
    blocks: [
      {
        title: "Create.",
        preview: "Map the whole journey before you build.",
        popup: [
          {
            text:
              "The cheapest time to join a service up is before it is built. The team maps the whole task the way the user experiences it, works out which other services it touches, and decides what to reuse or connect to rather than rebuild. Designing the service to expose its functionality as an API from the start is far easier than retrofitting it later. The research that maps the journey is the same research that tells you who relies on the channels around it.",
            externalLinks: [
              {
                phrase: "expose its functionality as an API",
                linkKey: "gc-standards-on-apis",
              },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "reuse or connect to", to: OPTIONS_ANALYSIS_PATH },
              { phrase: "research", to: THREADS["user-research"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Coordinate with adjacent services, and keep all channels in step.",
        popup: [
          {
            text:
              "Once a service is running, joined-up delivery is two ongoing jobs. The first is to coordinate with adjacent services: keep working with the teams responsible for the services on either side of yours, so the user's whole journey keeps working and not just your part of it. The second is to keep all channels in step: as the online service changes, update the call-centre scripts, retrain operations staff, and make sure the people who support users understand the current service.",
            bold: [
              { phrase: "coordinate with adjacent services" },
              { phrase: "keep all channels in step" },
            ],
            externalLinks: [
              { phrase: "support users", linkKey: "uk-service-standard-point-3-join-channels" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Retire or replace without breaking the journey.",
        popup: [
          {
            text:
              "When a service is retired or replaced, the connections it has to other services matter most. The team works with the adjacent services and the systems that depend on its data so nothing downstream breaks, redirects people to wherever the task now lives, and tells the call centre and in-person staff before the change reaches users. A person who relies on the phone or the counter should never be the last to find out a service has moved.",
            internalLinks: [
              { phrase: "retired or replaced", to: PHASES.sunset.href },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
    ] satisfies JoinedUpDeliveryPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "The UK Service Standard on solving a whole problem for users sets out the principle behind facet 1 and reads across cleanly. To see how the Canadian Digital Service frames the end-to-end craft, its service design practice lays out the principles and methods a designer uses to plan a service across digital and offline channels. For the working-across-boundaries part, GOV.UK's guide to working across organisational boundaries with service communities gives you a practical way to set up and run a cross-organization group around a shared user journey. And if you want the whole journey expressed as named stages, Australia's service design and delivery process walks a service from discovery through to live so you understand the problem before building the solution.",
    externalLinks: [
      { phrase: "solving a whole problem for users", linkKey: "uk-service-standard-point-2" },
      { phrase: "service design practice", linkKey: "cds-service-design-at-cds" },
      {
        phrase: "working across organisational boundaries with service communities",
        linkKey: "uk-working-across-organisational-boundaries",
      },
      {
        phrase: "service design and delivery process",
        linkKey: "dta-service-design-delivery-process",
      },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Inspiration and source",
      linkKey: "uk-home-office-service-design" satisfies ExternalLinkKey,
      description:
        'UK Home Office, Service design at the Home Office (Louise Downe, "good services are verbs") — https://hodigital.blog.gov.uk/2016/04/27/service-design-at-the-home-office/',
    },
    {
      label: "Governing instrument",
      linkKey: "policy-on-service-and-digital" satisfies ExternalLinkKey,
      description:
        "Policy on Service and Digital (TBS) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32603",
    },
    {
      label: "Governing instrument",
      linkKey: "directive-on-service-and-digital" satisfies ExternalLinkKey,
      description:
        "Directive on Service and Digital (TBS) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32601",
    },
    {
      label: "Governing instrument",
      linkKey: "guideline-service-digital" satisfies ExternalLinkKey,
      description:
        "Guideline on Service and Digital (TBS), omni-channel / Access — https://www.canada.ca/en/government/system/digital-government/guideline-service-digital.html",
    },
    {
      label: "Governing instrument",
      linkKey: "digital-standards" satisfies ExternalLinkKey,
      description:
        'GC Digital Standards (TBS), "Collaborate widely" and "Design with users" — https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards.html',
    },
    {
      label: "Supporting reference",
      linkKey: "gc-standards-on-apis" satisfies ExternalLinkKey,
      description:
        "Government of Canada Standards on APIs (TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/government-canada-standards-apis.html",
    },
    {
      label: "Supporting reference",
      linkKey: "enabling-interoperability" satisfies ExternalLinkKey,
      description:
        "GC Enabling Interoperability hub (TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/enabling-interoperability.html",
    },
    {
      label: "Supporting reference",
      linkKey: "gc-ea-application-architecture" satisfies ExternalLinkKey,
      description:
        "GC Enterprise Architecture, Application Architecture (GC EARB, GCcollab; open) — https://wiki.gccollab.ca/GC_Enterprise_Architecture/Standards/Application_Architecture",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-service-standard-point-2" satisfies ExternalLinkKey,
      description:
        "GOV.UK Service Standard, Point 2: Solve a whole problem for users — https://www.gov.uk/service-manual/service-standard/point-2-solve-a-whole-problem",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-service-standard-point-3-join-channels" satisfies ExternalLinkKey,
      description:
        "GOV.UK Service Standard, Point 3: Provide a joined up experience across all channels — https://www.gov.uk/service-manual/service-standard/point-3-join-up-across-channels",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-service-manual-whole-problem" satisfies ExternalLinkKey,
      description:
        "UK Service Manual, Map and understand a user's whole problem — https://www.gov.uk/service-manual/design/map-a-users-whole-problem",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-creating-experience-map" satisfies ExternalLinkKey,
      description:
        "UK Service Manual, Creating an experience map — https://www.gov.uk/service-manual/user-research/creating-an-experience-map",
    },
    {
      label: "Supporting reference",
      linkKey: "nng-journey-mapping-101" satisfies ExternalLinkKey,
      description:
        "Nielsen Norman Group, Journey Mapping 101 — https://www.nngroup.com/articles/journey-mapping-101/",
    },
    {
      label: "Supporting reference",
      linkKey: "european-interoperability-framework" satisfies ExternalLinkKey,
      description:
        "European Interoperability Framework, the four layers (European Commission) — https://interoperable-europe.ec.europa.eu/collection/iopeu-monitoring/european-interoperability-framework-detail",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-assisted-digital-introduction" satisfies ExternalLinkKey,
      description:
        "GOV.UK Service Manual, Assisted digital support: an introduction — https://www.gov.uk/service-manual/helping-people-to-use-your-service/assisted-digital-support-introduction",
    },
    {
      label: "Supporting reference",
      linkKey: "cds-service-design-at-cds" satisfies ExternalLinkKey,
      description:
        "Canadian Digital Service, Service design at CDS — https://digital.canada.ca/service-digital-toolkit/user-centred-design/service-design-at-cds/",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-working-across-organisational-boundaries" satisfies ExternalLinkKey,
      description:
        "GOV.UK Working across organisational boundaries with service communities — https://www.gov.uk/service-manual/design/working-across-organisational-boundaries",
    },
    {
      label: "Supporting reference",
      linkKey: "dta-service-design-delivery-process" satisfies ExternalLinkKey,
      description:
        "Digital Transformation Agency (Australia), Service design and delivery process — https://www.dta.gov.au/help-and-advice/build-and-improve-services/service-design-and-delivery-process",
    },
  ] satisfies SourceItem[],
} as const;
