import type { ExternalLinkKey } from "@/lib/external-links";
import type { ExternalPhraseLink, MailtoPhraseLink, PlaceholderGcNetworkPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ThreadSlug } from "@/lib/guide-strings";
import { DIGITAL_SOLUTIONS_CHANGE_MANAGEMENT_PORTAL } from "@/lib/placeholder-sources";

const CIOB_MAILBOX = "mailto:zzciobdp@tbs-sct.gc.ca";

export type SupportCalloutVariant =
  | "generic"
  | "security"
  | "procurement"
  | "privacy"
  | "accessibility"
  | "user-research"
  | "ethics-and-bias"
  | "backlog"
  | "joined-up-delivery"
  | "releasing-changes"
  | "dependencies-and-standards"
  | "data-stewardship"
  | "funding"
  | "team-capability"
  | "change-management"
  | "treasury-board-submission";

export type SupportCalloutBody = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  mailtoLinks?: MailtoPhraseLink[];
  placeholderGcNetworkLinks?: PlaceholderGcNetworkPhraseLink[];
};

export const SUPPORT_CALLOUT_BODIES = {
  generic: {
    text: "You are not the first to work through this. There is a team, a community, or a mailbox for almost every part of it.",
  },
  security: {
    text: "For security questions, your department's IT security team or departmental security officer is the first call, and the Canadian Centre for Cyber Security advises government institutions.",
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
    text: "For accessibility questions, the Digital Accessibility Toolkit is the Government of Canada starting point, and its community directory connects you to the accessibility community across departments.",
    externalLinks: [
      { phrase: "Digital Accessibility Toolkit", linkKey: "digital-accessibility-toolkit" },
      { phrase: "community directory", linkKey: "a11y-community-directory" },
    ],
  },
  "user-research": {
    text: "For user research help, the Government of Canada's user-centred design and service-design community is the place to ask, and the Design with users guidance and the GC Feedback tool are practical starting points.",
    externalLinks: [
      { phrase: "Design with users", linkKey: "design-with-users" },
      { phrase: "GC Feedback tool", linkKey: "gc-page-feedback" },
    ],
  },
  "dependencies-and-standards": {
    text: "For the supply-chain and dependency side, the Canadian Centre for Cyber Security advises government institutions, and for open source the GC guide to using open source software and the Open Resource Exchange are the starting points.",
    externalLinks: [
      { phrase: "Canadian Centre for Cyber Security", linkKey: "cyber-centre-contact" },
    ],
  },
  "data-stewardship": {
    text: "For data management and disposition questions, your department's information management office or Chief Data Officer is the first call, and Library and Archives Canada advises institutions on disposition and transfers through its information management and disposition service.",
    externalLinks: [
      {
        phrase: "information management and disposition",
        linkKey: "lac-information-disposition-hub",
      },
    ],
  },
  "ethics-and-bias": {
    text: "For responsible-AI and fairness questions, the Responsible use of AI in government hub is the Government of Canada starting point; your department's data or AI office, privacy or ATIP office, and legal services are the people to involve early, and GBA Plus support comes from Women and Gender Equality Canada.",
    externalLinks: [
      { phrase: "Responsible use of AI in government", linkKey: "responsible-use-ai-hub" },
      { phrase: "GBA Plus", linkKey: "gba-plus" },
    ],
  },
  backlog: {
    text: "For help running an agile backlog, the Government of Canada's design community is a place to ask, and the standard to iterate and improve frequently is the expectation it supports.",
    externalLinks: [
      { phrase: "design community", linkKey: "gc-design-community" },
      { phrase: "iterate and improve frequently", linkKey: "iterate-improve-frequently" },
    ],
  },
  "joined-up-delivery": {
    text: "For joining a service up, the Government of Canada's service-design and user-centred design community is the place to ask about mapping a whole journey, and the enterprise architecture community and the Enabling Interoperability guidance are the starting points for connecting systems.",
    externalLinks: [
      { phrase: "enterprise architecture community", linkKey: "gc-ea-application-architecture" },
      { phrase: "Enabling Interoperability", linkKey: "enabling-interoperability" },
    ],
  },
  "releasing-changes": {
    text: "For releasing changes, your department's platform or DevOps team runs the pipeline and deployments; for the cloud security baseline, Shared Services Canada validates the GC Cloud Guardrails, and the standard to iterate and improve frequently is the expectation behind releasing often.",
    externalLinks: [
      { phrase: "GC Cloud Guardrails", linkKey: "gc-cloud-guardrails" },
      { phrase: "iterate and improve frequently", linkKey: "iterate-improve-frequently" },
    ],
  },
  funding: {
    text: "For funding questions, the department's finance branch and Chief Financial Officer are the starting contacts.",
  },
  "team-capability": {
    text: "For team capability questions, the department's human resources and digital talent community, and the GC Digital Talent platform, are the starting contacts.",
    externalLinks: [
      { phrase: "GC Digital Talent platform", linkKey: "gc-digital-talent-platform" },
    ],
  },
  "change-management": {
    text: "For change management help, the Interdepartmental Organizational Change Network and the Digital Solutions Change Management Portal are the starting contacts.",
    externalLinks: [
      {
        phrase: "Interdepartmental Organizational Change Network",
        linkKey: "iocn-change-network",
      },
    ],
    placeholderGcNetworkLinks: [
      {
        phrase: "Digital Solutions Change Management Portal",
        source: DIGITAL_SOLUTIONS_CHANGE_MANAGEMENT_PORTAL,
      },
    ],
  },
  "treasury-board-submission": {
    text: "For funding and Treasury Board submission questions, the department's finance branch and Chief Financial Officer, and the Treasury Board Secretariat analyst assigned to the submission, are the starting contacts.",
  },
} as const satisfies Record<SupportCalloutVariant, SupportCalloutBody>;

const THREAD_SUPPORT_CALLOUT: Partial<Record<ThreadSlug, SupportCalloutVariant>> = {
  security: "security",
  procurement: "procurement",
  privacy: "privacy",
  accessibility: "accessibility",
  "user-research": "user-research",
  "ethics-and-bias": "ethics-and-bias",
  backlog: "backlog",
  "joined-up-delivery": "joined-up-delivery",
  "releasing-changes": "releasing-changes",
  "dependencies-and-standards": "dependencies-and-standards",
  "data-stewardship": "data-stewardship",
  funding: "funding",
  "team-capability": "team-capability",
  "change-management": "change-management",
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
