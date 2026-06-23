import type { ExternalLinkKey } from "@/lib/external-links";
import type { ExternalPhraseLink, MailtoPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ThreadSlug } from "@/lib/guide-strings";

const CIOB_MAILBOX = "mailto:zzciobdp@tbs-sct.gc.ca";

export type SupportCalloutVariant =
  | "generic"
  | "security"
  | "procurement"
  | "privacy"
  | "accessibility"
  | "user-research"
  | "dependencies-and-standards"
  | "data-stewardship";

export type SupportCalloutBody = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  mailtoLinks?: MailtoPhraseLink[];
};

export const SUPPORT_CALLOUT_BODIES = {
  generic: {
    text: "You are not the first to work through this. There is a team, a community, or a mailbox for almost every part of it.",
  },
  security: {
    text: "For security questions, the Canadian Centre for Cyber Security can help. There is a team or community for almost every part of this guide.",
    externalLinks: [
      { phrase: "Canadian Centre for Cyber Security", linkKey: "cyber-centre-contact" },
    ],
  },
  procurement: {
    text: "For buying questions, start at the CanadaBuys Buyer's Portal. There is a team or community for almost every part of this guide.",
    externalLinks: [{ phrase: "CanadaBuys Buyer's Portal", linkKey: "buyers-portal" }],
  },
  privacy: {
    text: "For privacy questions, your department's ATIP or Privacy Coordinator is the first call (find yours through the Access to information and privacy hub), and the Office of the Privacy Commissioner advises federal institutions.",
    externalLinks: [
      { phrase: "Access to information and privacy", linkKey: "atip-privacy-hub" },
      { phrase: "Office of the Privacy Commissioner", linkKey: "opc-federal-institutions" },
    ],
  },
  accessibility: {
    text: "For accessibility questions, the Digital Accessibility Toolkit can help. There is a team or community for almost every part of this guide.",
    externalLinks: [
      { phrase: "Digital Accessibility Toolkit", linkKey: "digital-accessibility-toolkit" },
    ],
  },
  "user-research": {
    text: "For user research questions, the Canadian Digital Service user-centred design community can help. There is a team or community for almost every part of this guide.",
  },
  "dependencies-and-standards": {
    text: "For dependencies and standards questions, the GC Open Source community and the GC Design System are good starting points. There is a team or community for almost every part of this guide.",
    externalLinks: [
      { phrase: "GC Open Source community", linkKey: "gc-open-source-community" },
      { phrase: "GC Design System", linkKey: "gc-design-system" },
    ],
  },
  "data-stewardship": {
    text: "For data stewardship questions, the GC Data Community can help (ask through the CIOB mailbox for the current home). There is a team or community for almost every part of this guide.",
    mailtoLinks: [{ phrase: "CIOB mailbox", href: CIOB_MAILBOX }],
  },
} as const satisfies Record<SupportCalloutVariant, SupportCalloutBody>;

const THREAD_SUPPORT_CALLOUT: Partial<Record<ThreadSlug, SupportCalloutVariant>> = {
  security: "security",
  procurement: "procurement",
  privacy: "privacy",
  accessibility: "accessibility",
  "user-research": "user-research",
  "dependencies-and-standards": "dependencies-and-standards",
  "data-stewardship": "data-stewardship",
};

export function supportCalloutVariantForThread(slug: ThreadSlug): SupportCalloutVariant {
  return THREAD_SUPPORT_CALLOUT[slug] ?? "generic";
}

/** @deprecated Prefer SUPPORT_CALLOUT_BODIES */
export type SupportCalloutTopicContact = {
  topic: string;
  contactLabel: string;
  contactExternalKey: ExternalLinkKey;
};
