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
  "canadabuys": {
    url: "https://canadabuys.canada.ca/en",
    description: "CanadaBuys — federal opportunities and procurement guidance",
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
  "task-based-professional-services": {
    url: "https://www.tpsgc-pwgsc.gc.ca/app-acq/spc-cps/spcts-tsps-eng.html",
    description: "PSPC Task and Statement Professional Services (TSPS/SPCS)",
    accessibility: "public",
  },
  "agile-challenge-based-procurement": {
    url: "https://www.canada.ca/en/public-services-procurement/services/acquisitions/better-buying/simplifying-procurement-process/agile.html",
    description: "Simplifying the procurement process through agile procurement (PSPC)",
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
  "uk-gov-testable-requirements": {
    url: "https://technology.blog.gov.uk/2015/03/04/creating-better-acceptance-criteria-for-user-stories/",
    description:
      "GOV.UK Technology in Government blog, Creating better acceptance criteria for user stories",
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
  "nist-cyberframework": {
    url: "https://www.nist.gov/cyberframework",
    description: "NIST Cybersecurity Framework",
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
  "standard-on-security-categorization": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32614",
    description: "Standard on Security Categorization (Directive on Security Management, Appendix J, TBS)",
    accessibility: "public",
  },
  "harmonized-tra-methodology": {
    url: "https://www.cyber.gc.ca/en/tools-services/harmonized-tra-methodology",
    description: "Harmonized Threat and Risk Assessment (TRA) methodology (CCCS)",
    accessibility: "public",
  },
  "gcpedia-security-categorization-tool": {
    url: "https://www.gcpedia.gc.ca/wiki/Security_Categorization_Tool",
    description: "Security Categorization Tool (GCpedia)",
    accessibility: "public",
  },
  "gcpedia-esa-tools": {
    url: "https://www.gcpedia.gc.ca/wiki/ESA_Tools",
    description: "ESA Tools (GCpedia)",
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
  "tbs-privacy-before-contracting": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/access-information-privacy/privacy/guidance-document-taking-privacy-into-account-before-making-contracting-decisions.html",
    description: "Taking Privacy into Account Before Making Contracting Decisions (TBS)",
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
    url: "https://accessible.canada.ca/creating-accessibility-standards/canasc-en-301-5492024-accessibility-requirements-ict-products-and-services",
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
  "a11y-ict-procurement-guide": {
    url: "https://a11y.canada.ca/en/guide-for-including-accessibility-in-information-and-communication-technology-ict-related-procurement/",
    description:
      "Guide for Including Accessibility in ICT-Related Procurement (Digital Accessibility Toolkit)",
    accessibility: "public",
  },
  "gccatalogue-accessibility-procurement": {
    url: "https://gccatalogue.alpha.canada.ca/patterns/accessibilityprocurement-EN.html",
    description: "Accessibility procurement language (GC Catalogue)",
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
  "iterate-improve-frequently": {
    url: "https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/iterate-improve-frequently.html",
    description: 'GC Digital Standards, "Iterate and improve frequently" (TBS)',
    accessibility: "public",
  },
  "work-open-default": {
    url: "https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/work-open-default.html",
    description: 'GC Digital Standards, "Work in the open by default" (TBS)',
    accessibility: "public",
  },
  "scrum-guide": {
    url: "https://scrumguides.org/scrum-guide.html",
    description: "The Scrum Guide (Schwaber & Sutherland, CC BY-SA)",
    accessibility: "public",
  },
  "uk-service-manual-agile-delivery": {
    url: "https://www.gov.uk/service-manual/agile-delivery",
    description: "GOV.UK Service Manual, agile delivery",
    accessibility: "public",
  },
  "uk-writing-user-stories": {
    url: "https://www.gov.uk/service-manual/agile-delivery/writing-user-stories",
    description: "GOV.UK Service Manual, writing user stories",
    accessibility: "public",
  },
  "uk-deciding-on-priorities": {
    url: "https://www.gov.uk/service-manual/agile-delivery/deciding-on-priorities",
    description: "GOV.UK Service Manual, deciding on priorities",
    accessibility: "public",
  },
  "robodebt-royal-commission-report": {
    url: "https://robodebt.royalcommission.gov.au/publications/report",
    description: "Robodebt Royal Commission report",
    accessibility: "public",
  },
  "netherlands-childcare-fraud-algorithm-ap": {
    url: "https://www.autoriteitpersoonsgegevens.nl/en/current/tax-administration-fined-for-discriminatory-and-unlawful-data-processing",
    description:
      "Dutch Data Protection Authority, tax administration fined for discriminatory algorithm",
    accessibility: "public",
  },
  "github-issues": {
    url: "https://github.com/myermcat/digital-lifecycle-guide/issues",
    description: "GitHub issues for The Digital Lifecycle Guide",
    accessibility: "public",
  },
  "nist-face-recognition-demographics-study": {
    url: "https://www.nist.gov/news-events/news/2019/12/nist-study-evaluates-effects-race-age-sex-face-recognition-software",
    description: "NIST study on demographic effects in face-recognition software",
    accessibility: "public",
  },
  "uk-assisted-digital-introduction": {
    url: "https://www.gov.uk/service-manual/helping-people-to-use-your-service/assisted-digital-support-introduction",
    description: "GOV.UK Service Manual, Assisted digital support: an introduction",
    accessibility: "public",
  },
  "gc-standards-on-apis": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/government-canada-standards-apis.html",
    description: "Government of Canada Standards on APIs (TBS)",
    accessibility: "public",
  },
  "enabling-interoperability": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/enabling-interoperability.html",
    description: "GC Enabling Interoperability hub (TBS)",
    accessibility: "public",
  },
  "gc-ea-application-architecture": {
    url: "https://wiki.gccollab.ca/GC_Enterprise_Architecture/Standards/Application_Architecture",
    description: "GC Enterprise Architecture, Application Architecture (GC EARB, GCcollab)",
    accessibility: "public",
  },
  "uk-service-standard-point-2": {
    url: "https://www.gov.uk/service-manual/service-standard/point-2-solve-a-whole-problem",
    description: "GOV.UK Service Standard, Point 2: Solve a whole problem for users",
    accessibility: "public",
  },
  "uk-service-standard-point-3-join-channels": {
    url: "https://www.gov.uk/service-manual/service-standard/point-3-join-up-across-channels",
    description:
      "GOV.UK Service Standard, Point 3: Provide a joined up experience across all channels",
    accessibility: "public",
  },
  "uk-creating-experience-map": {
    url: "https://www.gov.uk/service-manual/user-research/creating-an-experience-map",
    description: "UK Service Manual, Creating an experience map",
    accessibility: "public",
  },
  "nng-journey-mapping-101": {
    url: "https://www.nngroup.com/articles/journey-mapping-101/",
    description: "Nielsen Norman Group, Journey Mapping 101",
    accessibility: "public",
  },
  "european-interoperability-framework": {
    url: "https://interoperable-europe.ec.europa.eu/collection/iopeu-monitoring/european-interoperability-framework-detail",
    description: "European Interoperability Framework, the four layers (European Commission)",
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
  "gc-design-community": {
    url: "https://wiki.gccollab.ca/GC_design_community",
    description: "GC design community (GCcollab wiki)",
    accessibility: "public",
  },
  "atlassian-scrum-backlogs": {
    url: "https://www.atlassian.com/agile/scrum/backlogs",
    description: "Atlassian, Product backlog",
    accessibility: "public",
  },
  "atlassian-technical-debt": {
    url: "https://www.atlassian.com/agile/software-development/technical-debt",
    description: "Atlassian, Technical debt",
    accessibility: "public",
  },
  "roman-pichler-backlog-mistakes": {
    url: "https://www.romanpichler.com/blog/product-backlog-mistakes/",
    description: "Roman Pichler, Seven Product Backlog Mistakes to Avoid",
    accessibility: "public",
  },
  "gc-cloud-guardrails": {
    url: "https://canada-ca.github.io/cloud-guardrails/",
    description: "GC Cloud Guardrails (TBS / Shared Services Canada)",
    accessibility: "public",
  },
  "gc-data-sovereignty-white-paper": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/cloud-services/digital-sovereignty/gc-white-paper-data-sovereignty-public-cloud.html",
    description: "Government of Canada White Paper: Data Sovereignty and Public Cloud (TBS)",
    accessibility: "public",
  },
  "tbs-digital-sovereignty-residency": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/cloud-services/digital-sovereignty.html",
    description: "Digital sovereignty, including the Direction for Electronic Data Residency (TBS)",
    accessibility: "public",
  },
  "gc-use-open-standards-solutions": {
    url: "https://canada-ca.github.io/gcdigital-tools_outils-numeriquesgc/en/4-use-open-standards-solutions.html",
    description: 'GC "Use open standards and solutions" (Guideline 4, TBS)',
    accessibility: "public",
  },
  "isc2-cloud-exit-strategies": {
    url: "https://www.isc2.org/Insights/2024/04/Cloud-Exit-Strategies-Avoiding-Vendor-Lock-in",
    description: "ISC2, Cloud Exit Strategies: Why and How to Avoid Vendor Lock-in",
    accessibility: "public",
  },
  "uk-deploying-software-regularly": {
    url: "https://www.gov.uk/service-manual/technology/deploying-software-regularly",
    description: "UK Service Manual, Deploying software regularly",
    accessibility: "public",
  },
  "atlassian-ci-cd": {
    url: "https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment",
    description: "Atlassian, Continuous integration vs delivery vs deployment",
    accessibility: "public",
  },
  "martin-fowler-deployment-pipeline": {
    url: "https://martinfowler.com/bliki/DeploymentPipeline.html",
    description: "Martin Fowler, Deployment Pipeline",
    accessibility: "public",
  },
  "google-sre-canarying-releases": {
    url: "https://sre.google/workbook/canarying-releases/",
    description: "Google SRE Workbook, Canarying Releases",
    accessibility: "public",
  },
  "dora-metrics": {
    url: "https://dora.dev/guides/dora-metrics/",
    description: "DORA, software delivery performance metrics",
    accessibility: "public",
  },
  "cccs-top-10-it-security-actions": {
    url: "https://www.cyber.gc.ca/en/guidance/top-10-it-security-actions-protect-internet-connected-networks-and-information-itsm10089",
    description: "CCCS Top 10 IT security actions (ITSM.10.089)",
    accessibility: "public",
  },
  "cccs-baseline-cyber-security-sme": {
    url: "https://www.cyber.gc.ca/en/guidance/baseline-cyber-security-controls-small-and-medium-organizations",
    description: "CCCS Baseline cyber security controls for small and medium organizations",
    accessibility: "public",
  },
  "cisa-secure-by-design": {
    url: "https://www.cisa.gov/securebydesign",
    description: "US CISA Secure by Design",
    accessibility: "public",
  },
  "opc-privacy-act-in-brief": {
    url: "https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-privacy-act/pa_brief/",
    description: "OPC The Privacy Act in brief",
    accessibility: "public",
  },
  "ontario-ipc-privacy-by-design": {
    url: "https://www.ipc.on.ca/en/resources-and-decisions/privacy-design",
    description: "Ontario IPC Privacy by Design",
    accessibility: "public",
  },
  "nist-privacy-framework": {
    url: "https://www.nist.gov/privacy-framework",
    description: "NIST Privacy Framework",
    accessibility: "public",
  },
  "asc-creating-accessibility-standards": {
    url: "https://accessible.canada.ca/creating-accessibility-standards",
    description: "Accessibility Standards Canada (Creating accessibility standards)",
    accessibility: "public",
  },
  "w3c-wai-tutorials": {
    url: "https://www.w3.org/WAI/tutorials/",
    description: "W3C WAI Tutorials",
    accessibility: "public",
  },
  "webaim-keyboard-accessibility": {
    url: "https://webaim.org/techniques/keyboard/",
    description: "WebAIM Keyboard Accessibility",
    accessibility: "public",
  },
  "tbs-2023-2026-data-strategy": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/corporate/reports/2023-2026-data-strategy.html",
    description: "TBS 2023–2026 Data Strategy for the Federal Public Service",
    accessibility: "public",
  },
  "statcan-data-stewardship-intro": {
    url: "https://www.statcan.gc.ca/en/wtc/data-literacy/catalogue/892000062020013",
    description: "StatCan Data stewardship: An introduction",
    accessibility: "public",
  },
  "go-fair-principles": {
    url: "https://www.go-fair.org/fair-principles/",
    description: "GO FAIR FAIR Principles",
    accessibility: "public",
  },
  "montreal-declaration-responsible-ai": {
    url: "https://montrealdeclaration-responsibleai.com/the-declaration/",
    description: "Montréal Declaration on Responsible AI",
    accessibility: "public",
  },
  "cifar-ai-and-society": {
    url: "https://cifar.ca/ai/ai-and-society/",
    description: "CIFAR AI & Society (Pan-Canadian AI Strategy)",
    accessibility: "public",
  },
  "uk-introduction-to-ai-assurance": {
    url: "https://www.gov.uk/government/publications/introduction-to-ai-assurance",
    description: "UK DSIT Introduction to AI assurance",
    accessibility: "public",
  },
  "cds-service-design-at-cds": {
    url: "https://digital.canada.ca/service-digital-toolkit/user-centred-design/service-design-at-cds/",
    description: "Canadian Digital Service, Service design at CDS",
    accessibility: "public",
  },
  "uk-working-across-organisational-boundaries": {
    url: "https://www.gov.uk/service-manual/design/working-across-organisational-boundaries",
    description: "GOV.UK Working across organisational boundaries with service communities",
    accessibility: "public",
  },
  "dta-service-design-delivery-process": {
    url: "https://www.dta.gov.au/help-and-advice/build-and-improve-services/service-design-and-delivery-process",
    description: "Australia DTA Service design and delivery process",
    accessibility: "public",
  },
  "design-canada-continuous-improvement": {
    url: "https://design.canada.ca/continuous-improvement.html",
    description: "design.canada.ca Continuous improvement",
    accessibility: "public",
  },
  "mountaingoat-user-stories": {
    url: "https://www.mountaingoatsoftware.com/agile/user-stories",
    description: "Mike Cohn (Mountain Goat) User Stories",
    accessibility: "public",
  },
  "svpg-product-vs-feature-teams": {
    url: "https://www.svpg.com/product-vs-feature-teams/",
    description: "Marty Cagan (SVPG) Product vs Feature Teams",
    accessibility: "public",
  },
  "github-continuous-integration": {
    url: "https://docs.github.com/en/actions/get-started/continuous-integration",
    description: "GitHub Docs Continuous integration",
    accessibility: "public",
  },
  "aws-well-architected-operational-excellence": {
    url: "https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/operational-excellence.html",
    description: "AWS Well-Architected Operational Excellence Pillar",
    accessibility: "public",
  },
  "google-sre-release-engineering": {
    url: "https://sre.google/sre-book/release-engineering/",
    description: "Google SRE Book, Release Engineering (Ch. 8)",
    accessibility: "public",
  },
  "design-canada-research-summaries": {
    url: "https://design.canada.ca/research-summaries/",
    description: "Canada.ca research summaries",
    accessibility: "public",
  },
  "uk-start-by-learning-user-needs": {
    url: "https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs",
    description: "UK Service Manual, Learning about users and their needs",
    accessibility: "public",
  },
  "ixdf-user-research": {
    url: "https://www.interaction-design.org/literature/topics/user-research",
    description: "Interaction Design Foundation, What is User Research?",
    accessibility: "public",
  },
  "threat-modeling-manifesto": {
    url: "https://www.threatmodelingmanifesto.org/",
    description: "Threat Modeling Manifesto",
    accessibility: "public",
  },
  "covid-alert-privacy-assessment": {
    url: "https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19/covid-alert/privacy-policy/assessment.html",
    description: "COVID Alert privacy assessment (Health Canada / CDS)",
    accessibility: "public",
  },
  "open-first-whitepaper-standards": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/open-first-whitepaper/open-first-whitepaper-standards.html",
    description: "Open First Whitepaper: Open Standards (TBS)",
    accessibility: "public",
  },
  "cccs-software-supply-chain-itsm10071": {
    url: "https://www.cyber.gc.ca/en/guidance/protecting-your-organization-software-supply-chain-threats-itsm10071",
    description: "CCCS, Protecting your organization from software supply chain threats (ITSM.10.071)",
    accessibility: "public",
  },
  "cccs-cyber-supply-chain-smb-itsap00070": {
    url: "https://www.cyber.gc.ca/en/guidance/cyber-supply-chain-security-small-medium-sized-organizations-itsap00070",
    description: "CCCS, Cyber supply chain security for small and medium organizations (ITSAP.00.070)",
    accessibility: "public",
  },
  "cccs-log4j-alert": {
    url: "https://www.cyber.gc.ca/en/alerts/active-exploitation-apache-log4j-vulnerability",
    description: "CCCS, Active exploitation of Apache Log4j vulnerability",
    accessibility: "public",
  },
  "pspc-security-requirements-contracting": {
    url: "https://www.canada.ca/en/public-services-procurement/services/industrial-security/security-requirements-contracting.html",
    description: "Security requirements for contracting with the Government of Canada (PSPC)",
    accessibility: "public",
  },
  "psc-general-conditions-service-contract": {
    url: "https://www.canada.ca/en/public-service-commission/corporate/about-us/doing-business-public-service-commission/general-conditions-service-contract.html",
    description: "General Conditions of a Service Contract (PSC)",
    accessibility: "public",
  },
  "tbs-service-agreements-essential-elements": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=25761",
    description: "Guideline on Service Agreements: Essential Elements (TBS)",
    accessibility: "public",
  },
  "pspc-contract-security-manual": {
    url: "https://www.canada.ca/en/public-services-procurement/services/industrial-security/security-requirements-contracting/contract-security-manual-contracting-government-canada/contract-security-manual.html",
    description: "Contract Security Manual (PSPC)",
    accessibility: "public",
  },
  "tbs-srcl-350-103": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/corporate/forms/350-103.html",
    description: "Security Requirements Check List, SRCL (TBS/SCT 350-103)",
    accessibility: "public",
  },
  "open-first-whitepaper-oss-use": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/open-first-whitepaper/open-first-whitepaper-use.html",
    description: "Open First Whitepaper: Open Source Software Use (TBS)",
    accessibility: "public",
  },
  "uk-make-use-of-open-standards": {
    url: "https://www.gov.uk/guidance/make-use-of-open-standards",
    description: "GOV.UK, Make use of open standards",
    accessibility: "public",
  },
  "cisa-sbom": {
    url: "https://www.cisa.gov/sbom",
    description: "CISA, Software Bill of Materials (SBOM)",
    accessibility: "public",
  },
  "openssf-scorecard": {
    url: "https://openssf.org/projects/scorecard/",
    description: "OpenSSF Scorecard",
    accessibility: "public",
  },
  slsa: {
    url: "https://slsa.dev/",
    description: "SLSA, Supply-chain Levels for Software Artifacts",
    accessibility: "public",
  },
  "gc-open-resource-exchange": {
    url: "https://code.open.canada.ca/en/index.html",
    description: "GC Open Resource Exchange (TBS)",
    accessibility: "public",
  },
  "nist-sp-800-161-cscrm": {
    url: "https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
    description: "NIST SP 800-161 Rev. 1, Cybersecurity Supply Chain Risk Management Practices",
    accessibility: "public",
  },
  "tbs-tb-submissions-overview": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/treasury-board-submissions-overview.html",
    description: "The Treasury Board Submission Process and Best Practices (TBS)",
    accessibility: "public",
  },
  "tbs-guidance-drafters-tb-submissions": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/guidance-for-drafters-of-treasury-board-submissions.html",
    description: "Guidance for Drafters of Treasury Board Submissions (TBS)",
    accessibility: "public",
  },
  "tbs-tb-submission-template-form": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/guidance/treasury-board-submission-template-form.html",
    description: "Treasury Board submission template and appendices (TBS)",
    accessibility: "public",
  },
  "tbs-tb-submission-roles": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/roles-responsibilities-treasury-board-submission-process.html",
    description: "Roles and Responsibilities in the TB Submission Process (TBS)",
    accessibility: "public",
  },
  "tbs-three-phases-submission-process": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/three-phases-submission-process.html",
    description: "Three Phases of the Submission Process (TBS)",
    accessibility: "public",
  },
  "tbs-submission-service-quality-standards": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/service-quality-standards-support-submission-reviews.html",
    description: "Service and Quality Standards to Support Submission Reviews (TBS)",
    accessibility: "public",
  },
  "tbs-cfo-attestation-cabinet-submissions": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=27256",
    description: "Guideline on CFO Attestation for Cabinet Submissions (TBS)",
    accessibility: "public",
  },
  "tbs-guide-costing": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/guidance-government-spending/guide-costing.html",
    description: "GC Guide to Costing (TBS)",
    accessibility: "public",
  },
  "tbs-guide-assessing-cost-estimates": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32818",
    description: "Guide to Assessing Cost Estimates (TBS)",
    accessibility: "public",
  },
  "tbs-directive-management-projects-programmes": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32594",
    description: "Directive on the Management of Projects and Programmes (TBS)",
    accessibility: "public",
  },
  "gba-plus-what-is": {
    url: "https://www.canada.ca/en/women-gender-equality/gender-based-analysis-plus/what-gender-based-analysis-plus.html",
    description: "GBA Plus, What is GBA Plus (Women and Gender Equality Canada)",
    accessibility: "public",
  },
  "gba-plus-course": {
    url: "https://www.canada.ca/en/women-gender-equality/gender-based-analysis-plus/take-course.html",
    description: "GBA Plus, Take the course (WAGE / CSPS)",
    accessibility: "public",
  },
  "lop-funding-new-government-initiatives": {
    url: "https://lop.parl.ca/sites/PublicWebsite/default/en_CA/ResearchPublications/202132E",
    description: "Funding New Government Initiatives: From Announcement to Money Allocation (Library of Parliament)",
    accessibility: "public",
  },
  "csps-cor433": {
    url: "https://catalogue.csps-efpc.gc.ca/product?catalog=COR433&cm_locale=en",
    description: "Introduction to the Planning and Management of Investments, COR433 (CSPS)",
    accessibility: "public",
  },
  "directive-digital-talent": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32749",
    description: "Directive on Digital Talent (TBS)",
    accessibility: "public",
  },
  "gc-digital-talent-strategy": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-talent-strategy.html",
    description: "GC Digital Talent Strategy (TBS OCIO)",
    accessibility: "public",
  },
  "gc-digital-talent-platform": {
    url: "https://talent.canada.ca/",
    description: "GC Digital Talent platform (TBS)",
    accessibility: "public",
  },
  "csps-digital-academy": {
    url: "https://www.csps-efpc.gc.ca/digital-academy/index-eng.aspx",
    description: "CSPS Digital Academy (Canada School of Public Service)",
    accessibility: "public",
  },
  "uk-service-manual-what-each-role": {
    url: "https://www.gov.uk/service-manual/the-team/what-each-role-does-in-a-service-team",
    description: "What each role does in a service team (UK Service Manual)",
    accessibility: "public",
  },
  "uk-service-manual-the-team": {
    url: "https://www.gov.uk/service-manual/the-team",
    description: "The team (UK Service Manual)",
    accessibility: "public",
  },
  "dta-multidisciplinary-team": {
    url: "https://www.dta.gov.au/help-and-advice/digital-service-standard/digital-service-standard-criteria/2-have-multidisciplinary-team",
    description: "Have a multidisciplinary team (Australia DTA)",
    accessibility: "public",
  },
  "atlassian-team-health-monitor": {
    url: "https://www.atlassian.com/team-playbook/health-monitor",
    description: "Team Health Monitor (Atlassian)",
    accessibility: "public",
  },
  "gc-information-management-strategy-storyline": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/information-management/information-management-strategy/storyline.html",
    description: "GC Information Management Strategy, Storyline (TBS)",
    accessibility: "public",
  },
  "csps-project-management-learning-path": {
    url: "https://www.csps-efpc.gc.ca/learning-paths/project-management-eng.aspx",
    description: "CSPS Project Management Learning Path, change strand",
    accessibility: "public",
  },
  "prosci-adkar": {
    url: "https://www.prosci.com/methodology/adkar",
    description: "The ADKAR Model (Prosci)",
    accessibility: "public",
  },
  "kotter-8-steps": {
    url: "https://www.kotterinc.com/methodology/8-steps/",
    description: "8 Steps for Leading Change (Kotter Inc.)",
    accessibility: "public",
  },
  "gsa-m3-change-management-approach": {
    url: "https://ussm.gsa.gov/1.7/",
    description: "Define Change Management Approach, task 1.7 (US GSA M3 Playbook)",
    accessibility: "public",
  },
  "iocn-change-network": {
    url: "https://wiki.gccollab.ca/IOCN-RICO",
    description: "Interdepartmental Organizational Change Network (IOCN, GCcollab)",
    accessibility: "public",
  },
  "monitoring-measuring-task-success": {
    url: "https://design.canada.ca/continuous-improvement/monitoring.html",
    description: "Monitoring and measuring task success (ESDC, design.canada.ca)",
    accessibility: "public",
  },
  "gc-task-success-survey": {
    url: "https://design.canada.ca/survey/",
    description: "GC Task Success Survey (ESDC)",
    accessibility: "public",
  },
  "gc-service-inventory": {
    url: "https://open.canada.ca/data/en/dataset/3ac0d080-6149-499a-8b06-7ce5f00ec56c",
    description: "GC service inventory (Open Government)",
    accessibility: "public",
  },
  "canada-ca-analytics": {
    url: "https://www.canada.ca/en/analytics.html",
    description: "Canada.ca analytics (TBS/ESDC)",
    accessibility: "public",
  },
  "uk-service-manual-performance-metrics": {
    url: "https://www.gov.uk/service-manual/measuring-success/how-to-set-performance-metrics-for-your-service",
    description: "How to set performance metrics for your service (UK Service Manual)",
    accessibility: "public",
  },
  "opentelemetry": {
    url: "https://opentelemetry.io/docs/what-is-opentelemetry/",
    description: "What is OpenTelemetry? (CNCF)",
    accessibility: "public",
  },
  "google-sre-service-level-objectives": {
    url: "https://sre.google/sre-book/service-level-objectives/",
    description: "Service Level Objectives (Google SRE Book)",
    accessibility: "public",
  },
  "dta-digital-performance-standard": {
    url: "https://www.digital.gov.au/policy/digital-experience/digital-performance-standard",
    description: "Digital Performance Standard (Australia, DTA)",
    accessibility: "public",
  },
  "cccs-network-security-logging-monitoring": {
    url: "https://www.cyber.gc.ca/en/guidance/network-security-logging-monitoring-itsap80085",
    description: "Network security logging and monitoring, ITSAP.80.085 (CCCS)",
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
