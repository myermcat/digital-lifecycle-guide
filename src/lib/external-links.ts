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
  "directive-security-management-appendix-b": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32611",
    description: "Directive on Security Management, Appendix B (TBS)",
    accessibility: "public",
  },
  "guideline-vulnerability-management": {
    url: "https://www.canada.ca/en/government/system/digital-government/online-security-privacy/cyber-security-guidance-policy/guideline-vulnerability-management.html",
    description: "Guideline on Vulnerability Management (GC)",
    accessibility: "public",
  },
  "itsg-33": {
    url: "https://www.cyber.gc.ca/en/guidance/it-security-risk-management-lifecycle-approach-itsg-33",
    description: "ITSG-33, IT security risk management, a lifecycle approach (CCCS)",
    accessibility: "public",
  },
  "owasp-top-10": {
    url: "https://owasp.org/www-project-developer-guide/release/foundations/owasp_top_ten/",
    description: "OWASP Top 10",
    accessibility: "public",
  },
  "owasp-dsomm": {
    url: "https://dsomm.owasp.org/usage/",
    description: "OWASP DevSecOps Maturity Model (DSOMM)",
    accessibility: "public",
  },
  "guide-open-source-software": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/guide-for-using-open-source-software.html",
    description: "Guide for Using Open Source Software (GC)",
    accessibility: "public",
  },
  "secure-containers-microservices": {
    url: "https://canada-ca.github.io/platform-security_securite-de-plateforme/",
    description: "Secure Containers and Microservices (Guideline annex, open)",
    accessibility: "public",
  },
  "threat-modelling-developers": {
    url: "https://www.cyber.gc.ca/en/education-community/learning-hub/courses/threat-modelling-developers",
    description: "CCCS, Threat Modelling for Developers",
    accessibility: "public",
  },
  "incident-response-plan-itsap40003": {
    url: "https://www.cyber.gc.ca/en/guidance/developing-your-incident-response-plan-itsap40003",
    description: "CCCS, Developing your incident response plan (ITSAP.40.003)",
    accessibility: "public",
  },
  "least-privilege-itsap10094": {
    url: "https://www.cyber.gc.ca/en/guidance/managing-and-controlling-administrative-privileges-itsap10094",
    description: "CCCS, Managing and controlling administrative privileges (ITSAP.10.094)",
    accessibility: "public",
  },
  "cyber-supply-chain-itsap10070": {
    url: "https://www.cyber.gc.ca/en/guidance/cyber-supply-chain-approach-assessing-risk-itsap10070",
    description: "CCCS, Cyber supply chain: An approach to assessing risk (ITSAP.10.070)",
    accessibility: "public",
  },
  "directive-security-management": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32611&section=html",
    description: "Directive on Security Management (TBS)",
    accessibility: "public",
  },
  "nist-ssdf": {
    url: "https://csrc.nist.gov/projects/ssdf",
    description: "NIST Secure Software Development Framework (SSDF)",
    accessibility: "public",
  },
  "application-portfolio-management-community": {
    url: "https://gcxgce.sharepoint.com/teams/0318",
    description: "Application Portfolio Management community (GC network)",
    accessibility: "gc-network-only",
  },
  "it-plan-space": {
    url: "https://wiki.gccollab.ca/IT_Plan",
    description: "IT Plan space (GCcollab)",
    accessibility: "public",
  },
  "enterprise-architecture-cop": {
    url: "https://gccollab.ca/groups/profile/1896301/",
    description: "Enterprise Architecture Community of Practice",
    accessibility: "public",
  },
  "gc-cloud-information-centre": {
    url: "https://wiki.gccollab.ca/About_Cloud_Information_Centre",
    description: "GC Cloud Information Centre",
    accessibility: "public",
  },
  "cyber-centre-contact": {
    url: "https://www.cyber.gc.ca/en/about-cyber-centre/contact-cyber-centre",
    description: "Canadian Centre for Cyber Security — contact",
    accessibility: "public",
  },
  "atip-privacy-hub": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/access-information-privacy.html",
    description: "Access to information and privacy (TBS hub)",
    accessibility: "public",
  },
  "privacy-commissioner": {
    url: "https://www.priv.gc.ca/en/",
    description: "Office of the Privacy Commissioner of Canada",
    accessibility: "public",
  },
  "privacy-act": {
    url: "https://laws-lois.justice.gc.ca/eng/acts/P-21/",
    description: "Privacy Act (R.S.C. 1985, c. P-21)",
    accessibility: "public",
  },
  "directive-privacy-practices": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=18309",
    description: "Directive on Privacy Practices (TBS)",
    accessibility: "public",
  },
  "digital-privacy-playbook": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-privacy-playbook.html",
    description: "Digital Privacy Playbook (TBS)",
    accessibility: "public",
  },
  "digital-privacy-playbook-pia": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-privacy-playbook/privacy-impact-assessments.html",
    description: "Digital Privacy Playbook — Privacy Impact Assessments",
    accessibility: "public",
  },
  "digital-privacy-playbook-privacy-notices": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-privacy-playbook/privacy-notices.html",
    description: "Digital Privacy Playbook — privacy notices",
    accessibility: "public",
  },
  "digital-privacy-playbook-checklist": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-privacy-playbook/privacy-guidance-checklist.html",
    description: "Digital Privacy Playbook — privacy guidance checklist",
    accessibility: "public",
  },
  "opc-pia-expectations": {
    url: "https://www.priv.gc.ca/en/privacy-topics/federal-government-privacy/privacy-impact-assessments/gd_exp_202003/",
    description: "OPC, Guide to the Privacy Impact Assessment process (Expectations)",
    accessibility: "public",
  },
  "opc-federal-institutions": {
    url: "https://www.priv.gc.ca/en/for-federal-institutions/",
    description: "OPC, For federal institutions",
    accessibility: "public",
  },
  "privacy-by-design-principles": {
    url: "https://www.sfu.ca/~palys/Cavoukian-2011-PrivacyByDesign-7FoundationalPrinciples.pdf",
    description: "Privacy by Design: The 7 Foundational Principles (Ann Cavoukian)",
    accessibility: "public",
  },
  "ssc-tapi": {
    url: "https://www.canada.ca/en/shared-services/campaigns/stories/tapi-ervpt.html",
    description: "SSC, Technology Assessment for Privacy Implications (TAPI)",
    accessibility: "public",
  },
  "uk-ico-dpia": {
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/",
    description: "UK ICO, Data Protection Impact Assessments",
    accessibility: "public",
  },
  "gdpr-article-25": {
    url: "https://gdpr-info.eu/art-25-gdpr/",
    description: "GDPR Article 25 (data protection by design and by default)",
    accessibility: "public",
  },
  "digital-accessibility-toolkit": {
    url: "https://a11y.canada.ca/en/",
    description: "Digital Accessibility Toolkit",
    accessibility: "public",
  },
  "a11y-community-directory": {
    url: "https://a11y.canada.ca/en/community-directory/",
    description: "Digital Accessibility Toolkit community directory",
    accessibility: "public",
  },
  "gc-notify-contact": {
    url: "https://notification.canada.ca/en/contact",
    description: "GC Notify contact",
    accessibility: "public",
  },
  "gc-forms-assistance": {
    url: "https://assistance.cds-snc.ca",
    description: "GC Forms assistance",
    accessibility: "public",
  },
  "gc-design-system": {
    url: "https://wiki.gccollab.ca/GCDigital_design_system",
    description: "GC Design System",
    accessibility: "public",
  },
  "gc-open-source-community": {
    url: "https://github.com/canada-ca",
    description: "GC Open Source community (GitHub)",
    accessibility: "public",
  },
  "gc-functional-communities-directory": {
    url: "https://wiki.gccollab.ca/GCOnboard/Functional_Communities",
    description: "GC Functional Communities directory",
    accessibility: "public",
  },
  "gc-enterprise-it-portfolio": {
    url: "https://wiki.gccollab.ca/GC_Enterprise_IT_Portfolio",
    description: "GC Enterprise IT Portfolio (GCcollab)",
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
