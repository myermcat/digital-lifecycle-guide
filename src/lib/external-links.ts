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
  "gc-reference-architectures": {
    url: "https://gcxgce.sharepoint.com/teams/1000913/SitePages/GC-Reference-Architectures.aspx",
    description: "GC Reference Architectures repository",
    accessibility: "gc-network-only",
  },
  "gc-enterprise-solutions-catalog": {
    url: "https://gcxgce.sharepoint.com/teams/1000913/Lists/DRAFT%20Product%20Catalog/Main%20View%201.aspx",
    description: "GC enterprise solutions catalog (draft)",
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
  "design-with-users": {
    url: "https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/design-with-users.html",
    description: 'GC Digital Standards, "Design with users" (TBS)',
    accessibility: "public",
  },
  "guideline-service-digital": {
    url: "https://www.canada.ca/en/government/system/digital-government/guideline-service-digital.html",
    description: "Guideline on Service and Digital (TBS)",
    accessibility: "public",
  },
  "gc-page-feedback": {
    url: "https://design.canada.ca/feedback/index.html",
    description: "Canada.ca GC Feedback / Page Feedback Tool (ESDC)",
    accessibility: "public",
  },
  "nng-usability-testing-101": {
    url: "https://www.nngroup.com/articles/usability-testing-101/",
    description: "Nielsen Norman Group, Usability Testing 101",
    accessibility: "public",
  },
  "nng-ux-research-methods": {
    url: "https://www.nngroup.com/articles/which-ux-research-methods/",
    description: "Nielsen Norman Group, Which UX research methods to use when",
    accessibility: "public",
  },
  "ontario-user-research-guide": {
    url: "https://www.ontario.ca/page/user-research-guide",
    description: "Ontario User Research Guide (Ontario Digital Service, CC-BY)",
    accessibility: "public",
  },
  "ontario-service-design-playbook": {
    url: "https://www.ontario.ca/page/service-design-playbook",
    description: "Ontario Service Design Playbook (ODS, CC-BY)",
    accessibility: "public",
  },
  "cds-build-first-users-first": {
    url: "https://digital.canada.ca/2018/11/29/from-build-first-to-users-first/",
    description: "Canadian Digital Service, From build first to users first",
    accessibility: "public",
  },
  "18f-derisking": {
    url: "https://guides.18f.gov/derisking/",
    description: "18F, De-risking Government Technology",
    accessibility: "public",
  },
  "18f-accessibility-in-research": {
    url: "https://guides.18f.gov/ux-guide/research/accessibility/",
    description: "18F, Accessibility in research",
    accessibility: "public",
  },
  "australia-dta-understand-user-needs": {
    url: "https://www.dta.gov.au/help-and-advice/digital-service-standard/digital-service-standard-criteria/1-understand-user-needs",
    description: "DTA (Australia), Digital Service Standard, Criterion 1: Understand user needs",
    accessibility: "public",
  },
  "uk-service-manual-user-research": {
    url: "https://www.gov.uk/service-manual/user-research",
    description: "UK Service Manual, User research",
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
  "uk-technology-code-of-practice": {
    url: "https://www.gov.uk/guidance/the-technology-code-of-practice",
    description: "UK Technology Code of Practice",
    accessibility: "public",
  },
  "uk-share-and-reuse-technology": {
    url: "https://www.gov.uk/guidance/share-and-reuse-technology",
    description: "UK guidance on sharing and reusing technology",
    accessibility: "public",
  },
  "australia-digital-architecture-reuse": {
    url: "https://architecture.digital.gov.au/standard/reuse",
    description: "Australia Digital Architecture Standard — reuse",
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
    url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf",
    description: "NIST Secure Software Development Framework (NIST SP 800-218)",
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
  "policy-on-service-and-digital": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32603",
    description: "Policy on Service and Digital (TBS)",
    accessibility: "public",
  },
  "directive-on-service-and-digital": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32601",
    description: "Directive on Service and Digital (TBS)",
    accessibility: "public",
  },
  laca: {
    url: "https://laws-lois.justice.gc.ca/eng/acts/l-7.7/FullText.html",
    description: "Library and Archives of Canada Act (S.C. 2004, c. 11)",
    accessibility: "public",
  },
  "lac-documented-disposition": {
    url: "https://www.canada.ca/en/library-archives/services/government/information-disposition/management/guidelines/documented-disposition-records.html",
    description: "LAC, Guidelines on Documented Disposition of Records",
    accessibility: "public",
  },
  "lac-gvt-overview": {
    url: "https://www.canada.ca/en/library-archives/services/government/information-disposition/management/generic-valuation-tools/overview.html",
    description: "LAC, Generic Valuation Tools (overview)",
    accessibility: "public",
  },
  "lac-information-disposition-hub": {
    url: "https://www.canada.ca/en/library-archives/services/government/information-disposition.html",
    description: "LAC, Information management and disposition of government records (hub)",
    accessibility: "public",
  },
  "tbs-data-quality-guidance": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/information-management/guidance-data-quality.html",
    description: "TBS, Guidance on Data Quality (nine dimensions)",
    accessibility: "public",
  },
  "statcan-quality-guidelines": {
    url: "https://www150.statcan.gc.ca/n1/pub/12-539-x/12-539-x2019001-eng.htm",
    description: "Statistics Canada, Quality Guidelines (6th ed., 12-539-X)",
    accessibility: "public",
  },
  "tbs-fair-principles": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/information-management/guidance-assessing-readiness-manage-data-according-findable-accessible-interoperable-reusable-principles.html",
    description: "TBS, Guidance on readiness to manage data according to the FAIR principles",
    accessibility: "public",
  },
  "uk-national-archives-migration": {
    url: "https://cdn.nationalarchives.gov.uk/documents/information-management/edrms.pdf",
    description:
      "The National Archives (UK), Migrating information between records management systems",
    accessibility: "public",
  },
  "aws-app-retirement": {
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-app-retirement-best-practices/welcome.html",
    description:
      "AWS Prescriptive Guidance, Retiring applications before decommissioning infrastructure",
    accessibility: "public",
  },
  "accessible-canada-act-summary": {
    url: "https://www.canada.ca/en/employment-social-development/programs/accessible-canada/act-summary.html",
    description: "Accessible Canada Act (ESDC summary)",
    accessibility: "public",
  },
  "accessible-canada-regulations-digital-technologies": {
    url: "https://www.canada.ca/en/employment-social-development/programs/accessible-canada-regulations-guidance/category-digital-technologies.html",
    description: "Accessible Canada Regulations, digital technologies (ESDC)",
    accessibility: "public",
  },
  "can-asc-en-301-549": {
    url: "https://accessible.canada.ca/",
    description: "CAN/ASC-EN 301 549:2024, Accessibility requirements for ICT",
    accessibility: "public",
  },
  "wcag-22-quickref": {
    url: "https://www.w3.org/WAI/WCAG22/quickref/",
    description: "WCAG 2.2 Quick Reference (W3C WAI)",
    accessibility: "public",
  },
  "a11y-toolkit-procurement": {
    url: "https://a11y.canada.ca/en/procurement/",
    description: "Digital Accessibility Toolkit — procurement",
    accessibility: "public",
  },
  "a11y-toolkit-test-products": {
    url: "https://a11y.canada.ca/en/test-your-products/",
    description: "Digital Accessibility Toolkit — test your products",
    accessibility: "public",
  },
  "a11y-toolkit-standards": {
    url: "https://a11y.canada.ca/en/accessibility-standards/",
    description: "Digital Accessibility Toolkit — accessibility standards",
    accessibility: "public",
  },
  "w3c-wai-accessibility-intro": {
    url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
    description: "W3C Introduction to Web Accessibility",
    accessibility: "public",
  },
  "webaim-wave": {
    url: "https://wave.webaim.org/",
    description: "WebAIM WAVE (free automated checker)",
    accessibility: "public",
  },
  "section508-gov": {
    url: "https://www.section508.gov/",
    description: "Section508.gov (US)",
    accessibility: "public",
  },
  "nz-web-accessibility-standard": {
    url: "https://www.digital.govt.nz/standards-and-guidance/nz-government-web-standards/web-accessibility-standard-1-2",
    description: "NZ Government Web Accessibility Standard 1.2",
    accessibility: "public",
  },
  "australia-dta-leave-no-one-behind": {
    url: "https://www.digital.gov.au/policy/digital-experience/digital-service-standard/criterion-3",
    description: 'Australia DTA, "Leave no one behind" (formerly Criterion 9)',
    accessibility: "public",
  },
  "uk-service-manual-assisted-digital": {
    url: "https://www.gov.uk/service-manual/helping-people-to-use-your-service",
    description: "UK Service Manual, accessibility and assisted digital",
    accessibility: "public",
  },
  "nng-accessible-web-design": {
    url: "https://www.nngroup.com/reports/usability-guidelines-accessible-web-design/",
    description: "Nielsen Norman Group, Usability Guidelines for Accessible Web Design",
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
  "directive-automated-decision-making": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592",
    description: "Directive on Automated Decision-Making (TBS)",
    accessibility: "public",
  },
  "algorithmic-impact-assessment": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/algorithmic-impact-assessment.html",
    description: "Algorithmic Impact Assessment (TBS)",
    accessibility: "public",
  },
  "gba-plus": {
    url: "https://www.canada.ca/en/women-gender-equality/gender-based-analysis-plus.html",
    description: "Gender-based Analysis Plus (Women and Gender Equality Canada)",
    accessibility: "public",
  },
  "responsible-use-ai-hub": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai.html",
    description: "Responsible use of AI in government (hub, TBS)",
    accessibility: "public",
  },
  "ai-guiding-principles": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/principles.html",
    description: "Guiding principles for the use of AI in government (TBS)",
    accessibility: "public",
  },
  "generative-ai-faster": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/guide-use-generative-ai.html",
    description: "Guide on the Use of Generative AI, the FASTER principles (TBS)",
    accessibility: "public",
  },
  "agentic-ai-guide": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/guide-use-agentic-artificial-antelligence.html",
    description: "Guide on the Use of Agentic AI (TBS)",
    accessibility: "public",
  },
  "can-asc-62-equitable-ai": {
    url: "https://accessible.canada.ca/creating-accessibility-standards/asc-62-accessible-equitable-artificial-intelligence-systems",
    description: "CAN-ASC-6.2 Accessible and Equitable AI Systems (Accessibility Standards Canada)",
    accessibility: "public",
  },
  "opc-generative-ai-principles": {
    url: "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/",
    description: "OPC, Principles for responsible, trustworthy and privacy-protective generative AI",
    accessibility: "public",
  },
  "statcan-ai": {
    url: "https://www.statcan.gc.ca/en/trust/collecting-your-data/artificial-intelligence",
    description: "Artificial intelligence at Statistics Canada",
    accessibility: "public",
  },
  "nist-ai-rmf": {
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
    description: "US NIST AI Risk Management Framework (AI RMF 1.0)",
    accessibility: "public",
  },
  "oecd-ai-principles": {
    url: "https://oecd.ai/en/ai-principles",
    description: "OECD AI Principles",
    accessibility: "public",
  },
  "eu-ai-act-summary": {
    url: "https://artificialintelligenceact.eu/high-level-summary/",
    description: "EU AI Act, high-level summary",
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
