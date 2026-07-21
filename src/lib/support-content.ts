import type { SourceItem } from "@/components/SourcesBlock";
import type {
  BoldPhrase,
  ExternalPhraseLink,
  MailtoPhraseLink,
} from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";

const CIOB_MAILBOX = "mailto:zzciobdp@tbs-sct.gc.ca";

export type SupportLinkedBullet = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  mailtoLinks?: MailtoPhraseLink[];
  bold?: BoldPhrase[];
};

export const SUPPORT_PAGE = {
  title: "Support and communities",
  id: "support",

  lead:
    "When part of this guide leaves you stuck, there is almost always a team, a community, or a mailbox that can help. This page gathers them in one place. Most are open to anyone working in government; a few sit on the Government of Canada network. Some of these communities are moving between platforms right now (GCconnex is being retired), so a link may have changed since this was written.",

  acrossLifecycle: {
    id: "across-the-whole-lifecycle",
    title: "Across the whole lifecycle",
    bullets: [
      {
        text: "The GC Enterprise IT Portfolio team (CIOB IT Division) is the standing contact for the Government of Canada IT lifecycle program (application portfolio, IT expenditure, and the departmental IT plan).",
        mailtoLinks: [
          { phrase: "GC Enterprise IT Portfolio team (CIOB IT Division)", href: CIOB_MAILBOX },
        ],
      },
      {
        text: "The Application Portfolio Management community (on the GC network) is where the application-portfolio work is run and shared.",
        externalLinks: [
          {
            phrase: "Application Portfolio Management community",
            linkKey: "application-portfolio-management-community",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "For questions about a department's IT plan, start at the IT Plan space.",
        externalLinks: [{ phrase: "IT Plan space", linkKey: "it-plan-space" }] satisfies ExternalPhraseLink[],
      },
    ] satisfies SupportLinkedBullet[],
  },

  byTopic: {
    id: "by-topic",
    title: "By topic",
    bullets: [
      {
        text: "Architecture. The Enterprise Architecture Community of Practice for architecture and review questions.",
        bold: [{ phrase: "Architecture." }],
        externalLinks: [
          {
            phrase: "Enterprise Architecture Community of Practice",
            linkKey: "enterprise-architecture-cop",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Cloud. The GC Cloud Information Centre is the one stop for cloud adoption and migration help.",
        bold: [{ phrase: "Cloud." }],
        externalLinks: [
          { phrase: "GC Cloud Information Centre", linkKey: "gc-cloud-information-centre" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Procurement. Start at the CanadaBuys Buyer's Portal, and ask a PSPC client account manager for help with a specific buy.",
        bold: [{ phrase: "Procurement." }],
        externalLinks: [{ phrase: "CanadaBuys Buyer's Portal", linkKey: "buyers-portal" }] satisfies ExternalPhraseLink[],
      },
      {
        text: "Security. The Canadian Centre for Cyber Security answers security questions.",
        bold: [{ phrase: "Security." }],
        externalLinks: [
          {
            phrase: "Canadian Centre for Cyber Security",
            linkKey: "cyber-centre-contact",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Privacy. Talk to your own department's ATIP or Privacy Coordinator first (find yours through the Access to information and privacy hub); the Office of the Privacy Commissioner is the regulator.",
        bold: [{ phrase: "Privacy." }],
        externalLinks: [
          {
            phrase: "Access to information and privacy",
            linkKey: "atip-privacy-hub",
          },
          { phrase: "Office of the Privacy Commissioner", linkKey: "privacy-commissioner" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Accessibility. The Digital Accessibility Toolkit and its community directory.",
        bold: [{ phrase: "Accessibility." }],
        externalLinks: [
          { phrase: "Digital Accessibility Toolkit", linkKey: "digital-accessibility-toolkit" },
          { phrase: "community directory", linkKey: "a11y-community-directory" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Building and platforms. The Canadian Digital Service runs shared platforms, GC Notify and GC Forms, and the GC Design System for a tested set of components.",
        bold: [{ phrase: "Building and platforms." }],
        externalLinks: [
          { phrase: "GC Notify", linkKey: "gc-notify-contact" },
          { phrase: "GC Forms", linkKey: "gc-forms-assistance" },
          { phrase: "GC Design System", linkKey: "gc-design-system" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Data. Your department's data or Chief Data Officer office, first. Government-wide, the GC Data Community (Canada School of Public Service) is the network of data practitioners you can join.",
        bold: [{ phrase: "Data." }],
        externalLinks: [
          { phrase: "GC Data Community", linkKey: "gc-data-community" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Records and disposition. Your department's information-management or records office, first. They handle disposition of government records, the Sunset gate, with Library and Archives Canada.",
        bold: [{ phrase: "Records and disposition." }],
        externalLinks: [
          {
            phrase: "Library and Archives Canada",
            linkKey: "lac-information-disposition-hub",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Service design and user research. The GC UX Network connects designers and researchers across government, and the CSPS Digital Academy runs service-design and user-research training.",
        bold: [{ phrase: "Service design and user research." }],
        externalLinks: [
          { phrase: "GC UX Network", linkKey: "gc-ux-network" },
          { phrase: "CSPS Digital Academy", linkKey: "csps-digital-academy" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Service policy and the service inventory. Your department's service or CIO office, first. They work with the TBS Service Policy team on how your service appears in the GC Service Inventory.",
        bold: [{ phrase: "Service policy and the service inventory." }],
      },
      {
        text: "Responsible AI and automated decisions. Your department's privacy, data, and legal teams, first, if your service automates a decision. Government-wide guidance is the Responsible use of AI in government hub.",
        bold: [{ phrase: "Responsible AI and automated decisions." }],
        externalLinks: [
          {
            phrase: "Responsible use of AI in government hub",
            linkKey: "responsible-use-ai-hub",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Open government and open data. Your department's information-management or open-data lead publishes datasets to the Open Government Portal.",
        bold: [{ phrase: "Open government and open data." }],
        externalLinks: [
          { phrase: "Open Government Portal", linkKey: "open-government-portal" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Information management. Your department's information-management office, first. Government-wide, the GC Information Management Community connects IM professionals.",
        bold: [{ phrase: "Information management." }],
        externalLinks: [
          {
            phrase: "GC Information Management Community",
            linkKey: "gc-information-management-community",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Official languages. Your departmental Official Languages coordinator first; the Community of Official Languages and the TBS official languages pages.",
        bold: [{ phrase: "Official languages." }],
        externalLinks: [
          {
            phrase: "Community of Official Languages",
            linkKey: "community-of-official-languages",
          },
          { phrase: "TBS official languages pages", linkKey: "tbs-official-languages" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "GBA Plus and inclusion. Your department's GBA Plus focal point first; the GBA Plus hub and CSPS course INC101.",
        bold: [{ phrase: "GBA Plus and inclusion." }],
        externalLinks: [
          { phrase: "GBA Plus hub", linkKey: "gba-plus" },
          { phrase: "INC101", linkKey: "csps-inc101" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Identity and sign-in. Your departmental CIO or security lead (they bring in the identity and access-management teams); the online security and privacy hub.",
        bold: [{ phrase: "Identity and sign-in." }],
        externalLinks: [
          {
            phrase: "online security and privacy hub",
            linkKey: "online-security-privacy-hub",
          },
        ] satisfies ExternalPhraseLink[],
      },
      {
        text: "Digital talent and hiring. GC Digital Talent, the government-wide recruitment platform for digital roles.",
        bold: [{ phrase: "Digital talent and hiring." }],
        externalLinks: [
          { phrase: "GC Digital Talent", linkKey: "gc-digital-talent-platform" },
        ] satisfies ExternalPhraseLink[],
      },
    ] satisfies SupportLinkedBullet[],
    closing: {
      text: "If your topic is not here, the GC Functional Communities directory lists the professional communities across government; one of them likely covers it.",
      externalLinks: [
        {
          phrase: "GC Functional Communities directory",
          linkKey: "gc-functional-communities-directory",
        },
      ] satisfies ExternalPhraseLink[],
    },
  },

  furtherReading: {
    text: "The GC Enterprise IT Portfolio wiki is the hub for the Government of Canada IT lifecycle reporting, tying together IT Expenditure, Application Portfolio Management, and the departmental IT Plan.",
    externalLinks: [
      { phrase: "GC Enterprise IT Portfolio", linkKey: "gc-enterprise-it-portfolio" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Supporting reference",
      linkKey: "gc-functional-communities-directory" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "gc-enterprise-it-portfolio" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;
