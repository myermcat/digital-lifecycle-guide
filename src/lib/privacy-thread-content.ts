import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PROCUREMENT_LANDING_PATH } from "@/lib/procurement-landing";
import { THREADS } from "@/lib/guide-strings";
import {
  threadSectionsPlainText,
  type ThreadCloserLookBlock,
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
} from "@/lib/thread-rich-content";

export type PrivacyLinkedProse = ThreadLinkedProse;
export type PrivacyOrderedListSection = Extract<ThreadContentSection, { type: "orderedList" }>;
export type PrivacyContentSection = ThreadContentSection;
export type PrivacyCloserLookBlock = ThreadCloserLookBlock;
export type PrivacyPhasePreviewBlock = ThreadPhasePreviewBlock;

export const privacySectionsPlainText = threadSectionsPlainText;

export const PRIVACY_THREAD = {
  title: "Privacy",
  slug: "privacy" as const,

  lead: {
    text:
      "Privacy runs through the whole life of a service that handles people's personal information, from the first design sketch to the day the data is destroyed. Personal information is anything that can identify a person: a name, a case number, an address, an IP address. Canada's Privacy Act sets the rules for how a federal institution may collect, use, and share it. The decisions that shape a service's privacy are made early and revisited as it changes: what personal information to collect, how to protect it, and when to reassess the risk. The business owner answers for those decisions; the team does the work.",
    externalLinks: [{ phrase: "Privacy Act", linkKey: "privacy-act" }] satisfies ExternalPhraseLink[],
  },

  whatGoodLooksLike: [
    { text: "Only the personal information the service genuinely needs is collected, and nothing more." },
    {
      text: "A Privacy Impact Assessment is done before launch and kept current as the service changes.",
      externalLinks: [
        { phrase: "Privacy Impact Assessment", linkKey: "digital-privacy-playbook-pia" },
      ] satisfies ExternalPhraseLink[],
    },
    { text: "Privacy is designed in from the start." },
    {
      text: "People are told what is collected and why, in a privacy notice.",
      externalLinks: [
        { phrase: "privacy notice", linkKey: "digital-privacy-playbook-privacy-notices" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Personal information is protected with safeguards matched to how sensitive it is.",
    },
    {
      text: "Personal information is kept only as long as it is needed (administrative information at least two years after its last use), then disposed of.",
    },
    { text: "Staff who handle personal information have privacy training." },
    {
      text: "A privacy breach has a rehearsed plan: contain, assess the harm, notify the people affected, report it.",
    },
  ] satisfies PrivacyLinkedProse[],

  whyItMatters: {
    text:
      "When privacy fails, real people are harmed: their information is exposed, used in ways they did not expect, or lost. Trust in the service, and in government, is slow to win back. Most privacy problems are avoidable and trace to the same causes: collecting more than is needed, holding it too long, or never assessing the risk. The Government of Canada's rules for this are the Privacy Act and the Treasury Board Directive on Privacy Practices, which since 2024 folds in the requirement to do a Privacy Impact Assessment. The Digital Privacy Playbook turns those rules into steps a team can follow.",
    externalLinks: [
      { phrase: "Privacy Act", linkKey: "privacy-act" },
      { phrase: "Directive on Privacy Practices", linkKey: "directive-privacy-practices" },
      { phrase: "Digital Privacy Playbook", linkKey: "digital-privacy-playbook" },
    ] satisfies ExternalPhraseLink[],
  },

  whoseJob:
    "Privacy is shared across the team, with each role holding a different part. The department's privacy or ATIP office reviews the Privacy Impact Assessment and advises on the Privacy Act. Developers build the safeguards and collect only what the design calls for. The business owner of the application decides what personal information the service needs, makes sure the assessment is done before launch, and accepts the privacy risk that remains. The day-to-day work belongs to the team. The decision about what to collect, and the sign-off, belong to the business owner.",

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "The Privacy Impact Assessment.",
        sections: [
          {
            text:
              "A Privacy Impact Assessment (PIA) is the formal check of what could go wrong with the personal information a service handles, done before it launches. It records:",
            bold: [{ phrase: "Privacy Impact Assessment" }],
            externalLinks: [
              { phrase: "Privacy Impact Assessment", linkKey: "digital-privacy-playbook-pia" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              "what is collected, and why",
              "the legal authority for collecting it",
              "how the data flows",
              "how it is protected, and how long it is kept",
              "the risks, and how they will be reduced",
            ],
          },
          {
            text:
              "It is triggered whenever a service uses personal information to make a decision about someone, or changes that use: when a paper benefits form moves online, for example, the PIA is updated before the new service goes live. Under the Directive on Privacy Practices a PIA is required, and the Digital Privacy Playbook walks through it step by step. The Office of the Privacy Commissioner reviews a PIA and advises, but does not approve it; the sign-off stays with the institution.",
            externalLinks: [
              { phrase: "Directive on Privacy Practices", linkKey: "directive-privacy-practices" },
              { phrase: "Digital Privacy Playbook", linkKey: "digital-privacy-playbook-pia" },
              { phrase: "Office of the Privacy Commissioner", linkKey: "opc-pia-expectations" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Build privacy in from the start.",
        sections: [
          {
            text:
              "Designing privacy in early costs far less than fixing it after launch. The idea has a name, privacy by design, and its seven principles were written in Canada and are now used worldwide: default to the most private setting, collect the least you can, be open about it. Shared Services Canada's Technology Assessment for Privacy Implications is one GC example of running this assessment early, at the technology level.",
            externalLinks: [
              { phrase: "seven principles", linkKey: "privacy-by-design-principles" },
              {
                phrase: "Technology Assessment for Privacy Implications",
                linkKey: "ssc-tapi",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Tell people what you collect.",
        sections: [
          {
            text:
              "People have a right to know what a service collects and why, before they hand it over. That is the job of the privacy notice, in plain words and in the right place. A complete notice says seven things:",
            bold: [{ phrase: "privacy notice" }],
            externalLinks: [
              { phrase: "privacy notice", linkKey: "digital-privacy-playbook-privacy-notices" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              "why the information is collected",
              "the legal authority for collecting it",
              "whether it will be shared",
              "what happens to someone who does not provide it",
              "their right to see and correct it",
              "the Personal Information Bank it is held in",
              "how to complain to the Office of the Privacy Commissioner",
            ],
          },
          {
            text: "It is easy to forget, and it is the part the public actually sees.",
          },
        ],
      },
    ] satisfies PrivacyCloserLookBlock[],
  },

  byPhase: {
    id: "by-phase",
    title: "What Privacy looks like in each phase",
    intro: "The privacy work changes shape across the life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "Decide what you collect, and assess it before launch.",
        popup: [
          {
            text:
              "Most privacy is decided before the service exists. The team lists the personal information the service will hold and works out the least it can collect (collecting more than you need is a liability), confirms it has the legal authority to collect it, chooses private defaults, and runs the Privacy Impact Assessment early, while changing the design is still cheap. The privacy notice is drafted, the safeguards and access controls are built, a retention and disposition plan is written, and the staff who will handle the data are trained. If a supplier will hold or handle the personal information, the privacy requirements are written into the contract so the supplier is bound by them. The Digital Privacy Playbook checklist lays out these plan and design steps.",
            externalLinks: [
              { phrase: "Privacy Impact Assessment", linkKey: "digital-privacy-playbook-pia" },
              {
                phrase: "Digital Privacy Playbook checklist",
                linkKey: "digital-privacy-playbook-checklist",
              },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "written into the contract", to: PROCUREMENT_LANDING_PATH },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Keep the assessment current and watch for breaches.",
        popup: [
          {
            text:
              "Once the service is running, the privacy work continues. The privacy notice is published before any collection begins and kept accurate, the Privacy Impact Assessment is updated whenever the service starts collecting or using personal information in a new way, and access to the data is limited and logged.",
          },
          {
            text: "If a privacy breach happens, a rehearsed plan kicks in:",
          },
          {
            type: "orderedList",
            items: [
              "contain it",
              "assess the harm",
              "notify the people affected",
              "report it",
            ],
          },
          {
            text:
              "The Office of the Privacy Commissioner is who a federal institution works with, and it provides a breach-reporting form. The safeguards that keep the data locked down are covered under keeping the service secure.",
            externalLinks: [
              { phrase: "Office of the Privacy Commissioner", linkKey: "opc-federal-institutions" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "keeping the service secure", to: THREADS.security.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Move or dispose of the personal information the right way.",
        popup: [
          {
            text:
              "A service is eventually replaced or retired, and the personal information has to be dealt with either way. If the service is replaced, the information moves to the new service, and the Privacy Impact Assessment and privacy notice are revisited for its new home. If the service is retired, the information is kept or destroyed under its retention and disposition schedule, archived where required, and securely destroyed so it cannot be recovered. A service that holds personal information past the point it is needed is a standing privacy risk.",
            internalLinks: [
              {
                phrase: "retention and disposition",
                to: THREADS["data-stewardship"].path,
              },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
    ] satisfies PrivacyPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Privacy in the Government of Canada comes under the Privacy Act, with the Treasury Board Directive on Privacy Practices setting the day-to-day obligations, including the Privacy Impact Assessment. The Digital Privacy Playbook is the closest companion, turning the rules into steps. It also draws on the made-in-Canada seven principles of privacy by design, and, for how other jurisdictions handle the same assessment, the UK ICO's guidance on data protection impact assessments and Article 25 of the GDPR.",
    externalLinks: [
      { phrase: "Privacy Act", linkKey: "privacy-act" },
      { phrase: "Directive on Privacy Practices", linkKey: "directive-privacy-practices" },
      { phrase: "Digital Privacy Playbook", linkKey: "digital-privacy-playbook" },
      {
        phrase: "seven principles of privacy by design",
        linkKey: "privacy-by-design-principles",
      },
      {
        phrase: "guidance on data protection impact assessments",
        linkKey: "uk-ico-dpia",
      },
      { phrase: "Article 25 of the GDPR", linkKey: "gdpr-article-25" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "privacy-act" satisfies ExternalLinkKey,
      description: "Privacy Act — https://laws-lois.justice.gc.ca/eng/acts/P-21/",
    },
    {
      label: "Governing instrument",
      linkKey: "directive-privacy-practices" satisfies ExternalLinkKey,
      description:
        "Directive on Privacy Practices (TBS, incorporates the Standard on Privacy Impact Assessment) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=18309",
    },
    {
      label: "Supporting reference",
      linkKey: "digital-privacy-playbook" satisfies ExternalLinkKey,
      description:
        "Digital Privacy Playbook (TBS) — Privacy Impact Assessments page, privacy guidance checklist, and privacy notices page.",
    },
    {
      label: "Supporting reference",
      linkKey: "opc-pia-expectations" satisfies ExternalLinkKey,
      description:
        "OPC, Guide to the Privacy Impact Assessment process (Expectations) — https://www.priv.gc.ca/en/privacy-topics/federal-government-privacy/privacy-impact-assessments/gd_exp_202003/",
    },
    {
      label: "Supporting reference",
      linkKey: "opc-federal-institutions" satisfies ExternalLinkKey,
      description: "OPC, For federal institutions — https://www.priv.gc.ca/en/for-federal-institutions/",
    },
    {
      label: "Supporting reference",
      linkKey: "privacy-by-design-principles" satisfies ExternalLinkKey,
      description:
        "Privacy by Design: The 7 Foundational Principles (Ann Cavoukian, Canada) — https://www.sfu.ca/~palys/Cavoukian-2011-PrivacyByDesign-7FoundationalPrinciples.pdf",
    },
    {
      label: "Supporting reference",
      linkKey: "ssc-tapi" satisfies ExternalLinkKey,
      description:
        "SSC, Technology Assessment for Privacy Implications (TAPI) — https://www.canada.ca/en/shared-services/campaigns/stories/tapi-ervpt.html",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-ico-dpia" satisfies ExternalLinkKey,
      description:
        "UK ICO, Data Protection Impact Assessments — https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/",
    },
    {
      label: "Supporting reference",
      linkKey: "gdpr-article-25" satisfies ExternalLinkKey,
      description:
        "GDPR Article 25 (data protection by design and by default) — https://gdpr-info.eu/art-25-gdpr/",
    },
  ] satisfies SourceItem[],
} as const;
