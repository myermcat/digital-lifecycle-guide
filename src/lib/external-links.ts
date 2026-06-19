export type ExternalLinkAccessibility = "public" | "gc-network-only";

export type ExternalLinkEntry = {
  url: string;
  description: string;
  accessibility: ExternalLinkAccessibility;
};

export const EXTERNAL_LINKS = {
  "directive-procurement": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32692",
    description:
      "Treasury Board Directive on the Management of Procurement (the binding instrument)",
    accessibility: "public",
  },
  "buyers-portal": {
    url: "https://canadabuys.canada.ca/en/buyer-s-portal",
    description:
      "PSPC Buyer's Portal, the official source for the federal acquisitions program",
    accessibility: "public",
  },
  "procurement-policies": {
    url: "https://www.canada.ca/en/services/business/doing-business/how-to-sell/procurement-policies.html",
    description: "Plain-language overview of federal procurement policies",
    accessibility: "public",
  },
  "procura-chatbot": {
    url: "https://canadabuys.canada.ca/en/procura-chatbot-beta",
    description: "Procura Chatbot (Beta), ask procurement questions",
    accessibility: "public",
  },
  "professional-services-policy": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32775",
    description:
      "TBS policy on professional services procurement (guidance extracts more generally)",
    accessibility: "public",
  },
  "agile-procurement-guide": {
    url: "https://www.gcpedia.gc.ca/gcwiki/images/f/fa/PSPC_Agile_Procurement_Guide_v1_EN.pdf",
    description: "PSPC Agile Procurement Guide",
    accessibility: "gc-network-only",
  },
  "policy-planning-investments": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32593",
    description: "Treasury Board Policy on the Planning and Management of Investments",
    accessibility: "public",
  },
  "digital-standards": {
    url: "https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards.html",
    description: "Government of Canada Digital Standards",
    accessibility: "public",
  },
  "uk-home-office-service-design": {
    url: "https://hodigital.blog.gov.uk/2016/04/27/service-design-at-the-home-office/",
    description:
      "UK Home Office, Service design at the Home Office (Kate Tarling, 2016), Open Government Licence",
    accessibility: "public",
  },
  "uk-service-manual-whole-problem": {
    url: "https://www.gov.uk/service-manual/design/map-a-users-whole-problem",
    description: "UK Service Manual, Map and understand a user's whole problem",
    accessibility: "public",
  },
  "supply-manual-chapter-6": {
    url: "https://canadabuys.canada.ca/en/how-procurement-works/policies-and-guidelines/supply-manual/chapter-6",
    description:
      "Supply Manual, Chapter 6, Approvals and authorities (contract approval, signing authorities, and contract splitting)",
    accessibility: "public",
  },
  "contract-approval-authorities": {
    url: "https://canadabuys.canada.ca/en/buyer-s-portal/buyer-s-guide/approve/delegation-procurement-authority/contract-approval-and-signing-authorities",
    description:
      "Contract approval and signing authorities, plain-language Buyer's Guide on CanadaBuys",
    accessibility: "public",
  },
} as const satisfies Record<string, ExternalLinkEntry>;

export type ExternalLinkKey = keyof typeof EXTERNAL_LINKS;

export function getExternalLink(key: ExternalLinkKey): ExternalLinkEntry {
  return EXTERNAL_LINKS[key];
}

export function externalLinkUrl(key: ExternalLinkKey): string {
  return EXTERNAL_LINKS[key].url;
}

export function isGcNetworkOnly(key: ExternalLinkKey): boolean {
  return EXTERNAL_LINKS[key].accessibility === "gc-network-only";
}
