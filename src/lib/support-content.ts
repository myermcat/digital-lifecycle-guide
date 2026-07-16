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
        text: "The CIOB-ITD mailbox is the standing contact for the Government of Canada IT lifecycle program (application portfolio, IT expenditure, and the departmental IT plan).",
        mailtoLinks: [{ phrase: "CIOB-ITD mailbox", href: CIOB_MAILBOX }],
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
        text: "Data. The GC Data Community (ask through the CIOB mailbox for the current home).",
        bold: [{ phrase: "Data." }],
        mailtoLinks: [{ phrase: "CIOB mailbox", href: CIOB_MAILBOX }],
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
