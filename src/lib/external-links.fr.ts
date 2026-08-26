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
      "Directive sur la gestion de l’approvisionnement du Conseil du Trésor (l’instrument contraignant)",
    accessibility: "public",
  },
  "pcra-tool": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/information-technology-project-management/project-management/project-complexity-risk-assessment-tool.html",
    description: "Outil d’évaluation de la complexité et des risques des projets (EPCP) (SCT)",
    accessibility: "public",
  },
  "tbs-tb-submissions": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions.html",
    description: "Présentations au Conseil du Trésor (SCT)",
    accessibility: "public",
  },
  "gc-enterprise-architecture-framework": {
    url: "https://www.canada.ca/en/government/system/digital-government/policies-standards/government-canada-enterprise-architecture-framework.html",
    description: "Cadre de l’architecture intégrée du gouvernement du Canada (comprend le CEAI GC)",
    accessibility: "public",
  },
  "buyers-portal": {
    url: "https://canadabuys.canada.ca/en/buyer-s-portal",
    description: "Portail des acheteurs de SPAC, la source officielle du programme fédéral des acquisitions",
    accessibility: "public",
  },
  canadabuys: {
    url: "https://canadabuys.canada.ca/en",
    description: "AchatsCanada — occasions fédérales et orientations sur l’approvisionnement",
    accessibility: "public",
  },
  "procurement-policies": {
    url: "https://www.canada.ca/en/services/business/doing-business/how-to-sell/procurement-policies.html",
    description: "Aperçu en langage clair des politiques fédérales d’approvisionnement",
    accessibility: "public",
  },
  "procura-chatbot": {
    url: "https://canadabuys.canada.ca/en/procura-chatbot-beta",
    description: "Robot conversationnel Procura (bêta), pour poser des questions d’approvisionnement",
    accessibility: "public",
  },
  "professional-services-policy": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32775",
    description:
      "Politique du SCT sur l’approvisionnement en services professionnels (extraits d’orientations plus générales)",
    accessibility: "public",
  },
  "task-based-professional-services": {
    url: "https://www.tpsgc-pwgsc.gc.ca/app-acq/spc-cps/spcts-tsps-eng.html",
    description: "Services professionnels en informatique centrés sur les tâches et les livrables de SPAC (SPICT/SPCS)",
    accessibility: "public",
  },
  "oag-phoenix-build": {
    url: "https://publications.gc.ca/site/eng/9.864945/publication.html",
    description:
      "Rapports du printemps 2018 du BVG, rapport 1 — Construction et mise en œuvre du système de paye Phoenix (fiche des Publications du gouvernement du Canada)",
    accessibility: "public",
  },
  "oag-it-shared-services": {
    url: "https://publications.gc.ca/site/eng/9.804430/publication.html",
    description:
      "Rapports de l’automne 2015 du BVG, rapport 4 — Les services partagés en technologie de l’information (fiche des Publications du gouvernement du Canada)",
    accessibility: "public",
  },
  "oag-arrivecan": {
    url: "https://www.canada.ca/en/auditor-general/our-work/audit-reports/parl-oag-202402-01-e.html",
    description: "Rapports de 2024 du BVG, rapport 1 — ArriveCAN",
    accessibility: "public",
  },
  "aaact-program": {
    url: "https://www.canada.ca/en/shared-services/services/employees-accessibility/aaact-program.html",
    description:
      "Programme AATIA (Services partagés Canada) — formation, essais de technologies adaptatives et conseils en approvisionnement pour construire des produits et services accessibles",
    accessibility: "public",
  },
  "design-canada": {
    url: "https://design.canada.ca/",
    description: "Système de design de Canada.ca : styles, gabarits et modèles testés auprès des utilisateurs",
    accessibility: "public",
  },
  "design-research": {
    url: "https://design.canada.ca/continuous-improvement/research.html",
    description: "Système de design de Canada.ca : comment faire de la recherche et tester le contenu avec les utilisateurs",
    accessibility: "public",
  },
  "charging-directive": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32502",
    description: "Directive sur l’imputation et les autorisations financières spéciales (SCT)",
    accessibility: "public",
  },
  "apm-gcwiki": {
    url: "https://wiki.gccollab.ca/Application_Portfolio_Management_(APM)",
    description: "Carrefour d’orientation sur la gestion du portefeuille d’applications (wiki GCcollab)",
    accessibility: "public",
  },
  "apm-dataset": {
    url: "https://open.canada.ca/data/en/dataset/46fc3f0a-1b34-4585-b993-dfb600805d24",
    description: "Jeu de données sur les détails du portefeuille d’applications du GC (Portail du gouvernement ouvert)",
    accessibility: "public",
  },
  "modify-contract": {
    url: "https://canadabuys.canada.ca/en/buyer-s-portal/buyer-s-guide/manage/modify-contract/procedural-elements-amending-contracts",
    description: "Guide de l’acheteur d’AchatsCanada : modifier un contrat, éléments de procédure",
    accessibility: "public",
  },
  "gcdigital-community": {
    url: "https://www.canada.ca/en/government/system/digital-government/gcdigital-community/gcdigital-community-about-us.html",
    description: "Collectivité GCNumérique (SCT, BDPI) : la collectivité des praticiens du numérique du GC",
    accessibility: "public",
  },
  "directive-projects-programmes": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32594",
    description: "Directive sur la gestion des projets et des programmes (SCT)",
    accessibility: "public",
  },
  "a11y-community-terms": {
    url: "https://a11y.canada.ca/en/terms-of-reference/index.html",
    description: "Mandat du Groupe de travail sur l’accès (Boîte à outils de l’accessibilité numérique)",
    accessibility: "public",
  },
  "policy-privacy-protection": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=12510",
    description: "Politique sur la protection de la vie privée (SCT)",
    accessibility: "public",
  },
  "miro-mockup-vs-prototype": {
    url: "https://miro.com/mockup/mockup-vs-prototype/",
    description:
      "Mockups vs Prototypes : Clarifying Design Terms, maquettes et prototypes (Miro). Un fournisseur d’outils de conception, cité ici comme énoncé clair de l’usage que l’industrie du design fait de ces mots, non comme une autorité.",
    accessibility: "public",
  },
  "en-301-549": {
    url: "https://accessible.canada.ca/standards-and-technical-guides/standards-and-technical-guides-database/can-asc-en-301-5492024-accessibility-requirements-ict-products-and-services-en-301-5492021-idt",
    description:
      "CAN/ASC - EN 301 549:2024, Exigences d’accessibilité pour les produits et services des TIC (Normes d’accessibilité Canada)",
    accessibility: "public",
  },
  "esdc-a11y-regulations-guidance": {
    url: "https://www.canada.ca/en/employment-social-development/programs/accessible-canada-regulations-guidance/category-digital-technologies.html",
    description: "Lignes directrices sur la règlementation sur l’accessibilité des technologies numériques (EDSC)",
    accessibility: "public",
  },
  "cio-direction-ict-accessibility": {
    url: "https://www.canada.ca/en/government/system/digital-government/policies-standards/policy-service-digital-announcements/direction-information-communication-technologies-accessibility-towards-regulatory-implementation.html",
    description:
      "Direction relative à l’accessibilité des TIC : vers la mise en œuvre réglementaire (DPI du Canada, mars 2026)",
    accessibility: "public",
  },
  "esdc-a11y-training-guidance": {
    url: "https://www.canada.ca/en/employment-social-development/programs/accessible-canada-regulations-guidance/training.html",
    description: "Lignes directrices pour offrir une formation sur les notions fondamentales de l’accessibilité numérique (EDSC)",
    accessibility: "public",
  },
  "a11y-remediation-roadmap": {
    url: "https://a11y.canada.ca/en/accessibility-remediation-roadmap-template/",
    description: "Le modèle de feuille de route pour la correction des problèmes d’accessibilité (SPC)",
    accessibility: "public",
  },
  "guide-publishing-open-source": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/guide-for-publishing-open-source-code.html",
    description: "Guide pour la publication du code source libre (SCT)",
    accessibility: "public",
  },
  "policy-communications-federal-identity": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=30683",
    description: "Politique sur les communications et l’image de marque (SCT)",
    accessibility: "public",
  },
  "directive-procurement-indigenous-appendix-e": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32692&section=procedure&p=E",
    description:
      "Directive sur la gestion de l’approvisionnement, annexe E : Procédures obligatoires pour les marchés attribués aux entreprises autochtones. En vigueur le 1er avril 2022. Établit la cible minimale obligatoire de 5 % et la déclaration qui l’accompagne.",
    accessibility: "public",
  },
  "directive-identity-management": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=16577",
    description:
      "Directive sur la gestion de l’identité (SCT). En vigueur le 1er juillet 2019. Son annexe A est la Norme sur l’assurance de l’identité et des justificatifs, qui a remplacé la norme autonome de 2013 lorsque celle-ci a été archivée le 28 juin 2019.",
    accessibility: "public",
  },
  "guideline-authentication-requirements": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=26262",
    description:
      "Ligne directrice sur la définition des exigences en matière d’authentification (SCT). Expose les quatre niveaux d’assurance et la façon de déterminer celui dont un service a besoin.",
    accessibility: "public",
  },
  "gc-cloud-security-control-profile": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/cloud-services/government-canada-security-control-profile-cloud-based-it-services.html",
    description:
      "Profil des mesures de sécurité pour les services du GC fondés sur l’informatique en nuage. Les contrôles de base pour Protégé B, intégrité moyenne, disponibilité moyenne, et lesquels sont mis en œuvre par le fournisseur infonuagique par rapport à ceux mis en œuvre par le ministère.",
    accessibility: "public",
  },
  "access-to-information-act": {
    url: "https://laws-lois.justice.gc.ca/eng/acts/A-1/FullText.html",
    description:
      "Loi sur l’accès à l’information. La partie 2 établit les obligations de publication proactive, y compris les contrats de plus de 10 000 $ et les subventions et contributions de plus de 25 000 $.",
    accessibility: "public",
  },
  "directive-communications-federal-identity": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=30682",
    description:
      "Directive sur la gestion des communications et de l’image de marque (SCT). En vigueur le 27 mars 2025, remplaçant la directive de 2016 et les Procédures de publication de 2013. L’annexe D est la Norme sur les sites Web et les applications mobiles destinés au public.",
    accessibility: "public",
  },
  "iocn-cm-tools-compendium": {
    url: "https://wiki.gccollab.ca/IOCN_-_CM_Tools_Compendium_/_Recueil_d'outils_de_GdC_-_RICO",
    description: "Recueil d’outils de gestion du changement du RICO (wiki GCcollab)",
    accessibility: "public",
  },
  "directive-open-government": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=28108",
    description: "Directive sur le gouvernement ouvert (SCT)",
    accessibility: "public",
  },
  "standard-systems-manage-information": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32716",
    description: "Annexe J : Norme relative aux systèmes de gestion de l’information et des données (SCT)",
    accessibility: "public",
  },
  "standard-managing-metadata": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32786",
    description: "Annexe L : Norme sur la gestion des métadonnées (SCT)",
    accessibility: "public",
  },
  "open-government-licence": {
    url: "https://open.canada.ca/en/open-government-licence-canada",
    description: "Licence du gouvernement ouvert – Canada",
    accessibility: "public",
  },
  "open-government-guidebook": {
    url: "https://open.canada.ca/data/en/info/cf9ba695-59dc-4cc0-8a52-94ff6d9db665",
    description: "Guide du gouvernement ouvert (SCT)",
    accessibility: "public",
  },
  "im-basics-guidance": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=16557",
    description: "Orientation à l’intention des employés : les bases de la gestion de l’information (SCT)",
    accessibility: "public",
  },
  "guide-peer-review-ads": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/guide-peer-review-automated-decision-systems.html",
    description: "Guide sur l’examen par les pairs des systèmes décisionnels automatisés (SCT)",
    accessibility: "public",
  },
  "guide-scope-dadm": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/guide-scope-directive-automated-decision-making.html",
    description: "Guide sur la portée de la Directive sur la prise de décisions automatisée (SCT)",
    accessibility: "public",
  },
  "gc-ai-strategy": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/gc-ai-strategy-overview.html",
    description: "Stratégie en matière d’intelligence artificielle pour la fonction publique fédérale 2025-2027 (SCT)",
    accessibility: "public",
  },
  "concept-case-procedures": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32593&section=procedure&p=B",
    description:
      "Annexe B : Procédures obligatoires sur les analyses de rentabilisation conceptuelles pour les projets habilités par le numérique (Politique sur la planification et la gestion des investissements)",
    accessibility: "public",
  },
  "standard-at-risk-it": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32714",
    description:
      "Norme sur la technologie de l’information à risque (SCT) — garder les applications à jour ; les technologies non soutenues sont interdites",
    accessibility: "public",
  },
  "task-authorizations": {
    url: "https://canadabuys.canada.ca/en/buyer-s-portal/buyer-s-guide/manage/manage-contract/task-authorizations",
    description:
      "Guide de l’acheteur d’AchatsCanada — autorisations de tâches (travaux autorisés tâche par tâche au titre d’un contrat existant)",
    accessibility: "public",
  },
  "agile-challenge-based-procurement": {
    url: "https://www.canada.ca/en/public-services-procurement/services/acquisitions/better-buying/simplifying-procurement-process/agile.html",
    description: "Simplifier le processus d’approvisionnement par l’approvisionnement agile (SPAC)",
    accessibility: "public",
  },
  "agile-procurement-guide": {
    url: "https://www.gcpedia.gc.ca/gcwiki/images/f/fa/PSPC_Agile_Procurement_Guide_v1_EN.pdf",
    description: "Guide de l’approvisionnement agile de SPAC",
    accessibility: "gc-network-only",
  },
  "gc-reference-architectures": {
    url: "https://gcxgce.sharepoint.com/teams/1000913/SitePages/GC-Reference-Architectures.aspx",
    description: "Dépôt des architectures de référence du GC",
    accessibility: "gc-network-only",
  },
  "gc-enterprise-solutions-catalog": {
    url: "https://gcxgce.sharepoint.com/teams/1000913/Lists/DRAFT%20Product%20Catalog/Main%20View%201.aspx",
    description: "Catalogue des solutions intégrées du GC (ébauche)",
    accessibility: "gc-network-only",
  },
  "policy-planning-investments": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32593",
    description: "Politique sur la planification et la gestion des investissements du Conseil du Trésor",
    accessibility: "public",
  },
  "digital-standards": {
    url: "https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards.html",
    description: "Normes relatives au numérique du gouvernement du Canada",
    accessibility: "public",
  },
  "design-with-users": {
    url: "https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/design-with-users.html",
    description: 'Normes relatives au numérique du GC, « Concevoir avec les utilisateurs » (SCT)',
    accessibility: "public",
  },
  "guideline-service-digital": {
    url: "https://www.canada.ca/en/government/system/digital-government/guideline-service-digital.html",
    description: "Ligne directrice sur les services et le numérique (SCT)",
    accessibility: "public",
  },
  "gc-page-feedback": {
    url: "https://design.canada.ca/feedback/index.html",
    description: "Rétroaction GC de Canada.ca / outil de rétroaction sur les pages (EDSC)",
    accessibility: "public",
  },
  "nng-usability-testing-101": {
    url: "https://www.nngroup.com/articles/usability-testing-101/",
    description: "Nielsen Norman Group, Usability Testing 101, les bases du test d’utilisabilité",
    accessibility: "public",
  },
  "nng-ux-research-methods": {
    url: "https://www.nngroup.com/articles/which-ux-research-methods/",
    description: "Nielsen Norman Group, Which UX research methods to use when, quelle méthode de recherche employer et quand",
    accessibility: "public",
  },
  "ontario-user-research-guide": {
    url: "https://www.ontario.ca/page/user-research-guide",
    description: "Guide de recherche sur les utilisateurs de l’Ontario (Service numérique de l’Ontario, CC-BY)",
    accessibility: "public",
  },
  "ontario-service-design-playbook": {
    url: "https://www.ontario.ca/page/service-design-playbook",
    description: "Guide de conception de services de l’Ontario (SNO, CC-BY)",
    accessibility: "public",
  },
  "cds-build-first-users-first": {
    url: "https://digital.canada.ca/2018/11/29/from-build-first-to-users-first/",
    description: "Service numérique canadien, From build first to users first, de la construction d’abord aux utilisateurs d’abord",
    accessibility: "public",
  },
  "18f-derisking": {
    url: "https://guides.18f.gov/derisking/",
    description: "18F, De-risking Government Technology, réduire le risque des technologies gouvernementales",
    accessibility: "public",
  },
  "18f-accessibility-in-research": {
    url: "https://guides.18f.gov/ux-guide/research/accessibility/",
    description: "18F, Accessibility in research, l’accessibilité dans la recherche",
    accessibility: "public",
  },
  "australia-dta-understand-user-needs": {
    url: "https://www.digital.gov.au/policy/digital-experience/digital-service-standard/criterion-2",
    description: "Digital Service Standard, critère 2 : Connaître son utilisateur (Australie)",
    accessibility: "public",
  },
  "uk-service-manual": {
    url: "https://www.gov.uk/service-manual",
    description:
      "Service Manual (Royaume-Uni, Government Digital Service) : le guide britannique pour concevoir et exploiter des services gouvernementaux.",
    accessibility: "public",
  },
  "australia-service-process": {
    url: "https://www.digital.gov.au/policy/digital-experience/toolkit/service-design-and-delivery-process",
    description:
      "Processus de conception et de prestation de services (Australie, Digital Transformation Agency) : le modèle de phases australien pour construire des services gouvernementaux.",
    accessibility: "public",
  },
  "uk-service-manual-user-research": {
    url: "https://www.gov.uk/service-manual/user-research",
    description: "Service Manual du Royaume-Uni, recherche sur les utilisateurs",
    accessibility: "public",
  },
  "uk-home-office-service-design": {
    url: "https://hodigital.blog.gov.uk/2016/04/27/service-design-at-the-home-office/",
    description:
      "UK Home Office, Service design at the Home Office, la conception de services au ministère de l’Intérieur (Kate Tarling, 2016), Open Government Licence",
    accessibility: "public",
  },
  "uk-gov-testable-requirements": {
    url: "https://technology.blog.gov.uk/2015/03/04/creating-better-acceptance-criteria-for-user-stories/",
    description:
      "Blogue Technology in Government de GOV.UK, Creating better acceptance criteria for user stories, rédiger de meilleurs critères d’acceptation",
    accessibility: "public",
  },
  "uk-service-manual-whole-problem": {
    url: "https://www.gov.uk/service-manual/design/map-a-users-whole-problem",
    description: "Service Manual du Royaume-Uni, cartographier et comprendre le problème entier d’un utilisateur",
    accessibility: "public",
  },
  "uk-technology-code-of-practice": {
    url: "https://www.gov.uk/guidance/the-technology-code-of-practice",
    description: "Technology Code of Practice du Royaume-Uni",
    accessibility: "public",
  },
  "uk-share-and-reuse-technology": {
    url: "https://www.gov.uk/guidance/share-and-reuse-technology",
    description: "Orientations du Royaume-Uni sur le partage et la réutilisation des technologies",
    accessibility: "public",
  },
  "australia-digital-architecture-reuse": {
    url: "https://architecture.digital.gov.au/standard/reuse",
    description: "Digital Architecture Standard de l’Australie — réutilisation",
    accessibility: "public",
  },
  "supply-manual-chapter-6": {
    url: "https://canadabuys.canada.ca/en/how-procurement-works/policies-and-guidelines/supply-manual/chapter-6",
    description:
      "Guide des approvisionnements, chapitre 6, Approbations et pouvoirs (approbation des contrats, pouvoirs de signature et fractionnement de contrat). Archivé le 30 janvier 2026 ; le Portail des acheteurs d’AchatsCanada est la source actuelle.",
    accessibility: "public",
  },
  "contract-approval-authorities": {
    url: "https://canadabuys.canada.ca/en/buyer-s-portal/buyer-s-guide/approve/delegation-procurement-authority/contract-approval-and-signing-authorities",
    description:
      "Approbation des contrats et pouvoirs de signature, guide de l’acheteur en langage clair sur AchatsCanada",
    accessibility: "public",
  },
  "directive-security-management-appendix-b": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32611",
    description: "Directive sur la gestion de la sécurité, annexe B (SCT)",
    accessibility: "public",
  },
  "guideline-vulnerability-management": {
    url: "https://www.canada.ca/en/government/system/digital-government/online-security-privacy/cyber-security-guidance-policy/guideline-vulnerability-management.html",
    description: "Lignes directrices sur la gestion des vulnérabilités (GC)",
    accessibility: "public",
  },
  "itsg-33": {
    url: "https://www.cyber.gc.ca/en/guidance/it-security-risk-management-lifecycle-approach-itsg-33",
    description: "ITSG-33, La gestion des risques liés à la sécurité des TI : une méthode axée sur le cycle de vie (CCC)",
    accessibility: "public",
  },
  "nist-cyberframework": {
    url: "https://www.nist.gov/cyberframework",
    description: "NIST Cybersecurity Framework, cadre de cybersécurité",
    accessibility: "public",
  },
  "owasp-top-10": {
    url: "https://owasp.org/www-project-developer-guide/release/foundations/owasp_top_ten/",
    description: "OWASP Top 10",
    accessibility: "public",
  },
  "owasp-dsomm": {
    url: "https://dsomm.owasp.org/usage/",
    description: "Modèle de maturité DevSecOps de l’OWASP (DSOMM)",
    accessibility: "public",
  },
  "guide-open-source-software": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/guide-for-using-open-source-software.html",
    description: "Guide pour l’utilisation de logiciels libres (GC)",
    accessibility: "public",
  },
  "standard-on-security-categorization": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32614",
    description:
      "Norme sur la catégorisation de sécurité (Directive sur la gestion de la sécurité, annexe J, SCT)",
    accessibility: "public",
  },
  "harmonized-tra-methodology": {
    url: "https://www.cyber.gc.ca/en/tools-services/harmonized-tra-methodology",
    description: "Méthodologie harmonisée d’évaluation de la menace et des risques (EMR) (CCC)",
    accessibility: "public",
  },
  "gcpedia-security-categorization-tool": {
    url: "https://www.gcpedia.gc.ca/wiki/Security_Categorization_Tool",
    description: "Outil de catégorisation de sécurité (GCpedia)",
    accessibility: "public",
  },
  "gcpedia-esa-tools": {
    url: "https://www.gcpedia.gc.ca/wiki/ESA_Tools",
    description: "Outils ESA (GCpedia)",
    accessibility: "public",
  },
  "secure-containers-microservices": {
    url: "https://canada-ca.github.io/platform-security_securite-de-plateforme/",
    description: "Conteneurs et microservices sécurisés (annexe de la ligne directrice, ouverte)",
    accessibility: "public",
  },
  "threat-modelling-developers": {
    url: "https://www.cyber.gc.ca/en/education-community/learning-hub/courses/threat-modelling-developers",
    description: "CCC, La modélisation des menaces pour les développeurs",
    accessibility: "public",
  },
  "incident-response-plan-itsap40003": {
    url: "https://www.cyber.gc.ca/en/guidance/developing-your-incident-response-plan-itsap40003",
    description: "CCC, Élaborer un plan d’intervention en cas d’incident (ITSAP.40.003)",
    accessibility: "public",
  },
  "least-privilege-itsap10094": {
    url: "https://www.cyber.gc.ca/en/guidance/managing-and-controlling-administrative-privileges-itsap10094",
    description: "CCC, Gestion et contrôle des privilèges administratifs (ITSAP.10.094)",
    accessibility: "public",
  },
  "cyber-supply-chain-itsap10070": {
    url: "https://www.cyber.gc.ca/en/guidance/cyber-supply-chain-approach-assessing-risk-itsap10070",
    description: "CCC, La cybersécurité et la chaîne d’approvisionnement : évaluation des risques (ITSAP.10.070)",
    accessibility: "public",
  },
  "directive-security-management": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32611&section=html",
    description: "Directive sur la gestion de la sécurité (SCT)",
    accessibility: "public",
  },
  "nist-ssdf": {
    url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf",
    description: "NIST Secure Software Development Framework, cadre de développement logiciel sécurisé (NIST SP 800-218)",
    accessibility: "public",
  },
  "application-portfolio-management-community": {
    url: "https://wiki.gccollab.ca/Application_Portfolio_Management_(APM)",
    description: "Collectivité de la gestion du portefeuille d’applications (wiki GCcollab)",
    accessibility: "public",
  },
  "it-plan-space": {
    url: "https://wiki.gccollab.ca/IT_Plan",
    description: "Espace Plan de TI (GCcollab)",
    accessibility: "public",
  },
  "enterprise-architecture-cop": {
    url: "https://gccollab.ca/groups/profile/1896301/",
    description: "communauté de pratique de l’architecture intégrée",
    accessibility: "public",
  },
  "gc-cloud-information-centre": {
    url: "https://wiki.gccollab.ca/About_Cloud_Information_Centre",
    description: "Centre d’information sur l’infonuagique du GC",
    accessibility: "public",
  },
  "cyber-centre-contact": {
    url: "https://www.cyber.gc.ca/en/about-cyber-centre/contact-cyber-centre",
    description: "Centre canadien pour la cybersécurité — pour nous joindre",
    accessibility: "public",
  },
  "atip-privacy-hub": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/access-information-privacy.html",
    description: "Accès à l’information et protection des renseignements personnels (carrefour du SCT)",
    accessibility: "public",
  },
  "privacy-commissioner": {
    url: "https://www.priv.gc.ca/en/",
    description: "Commissariat à la protection de la vie privée du Canada",
    accessibility: "public",
  },
  "privacy-act": {
    url: "https://laws-lois.justice.gc.ca/eng/acts/P-21/",
    description: "Loi sur la protection des renseignements personnels (L.R.C. 1985, ch. P-21)",
    accessibility: "public",
  },
  "directive-privacy-practices": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=18309",
    description: "Directive sur les pratiques relatives à la protection de la vie privée (SCT)",
    accessibility: "public",
  },
  "tbs-privacy-before-contracting": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/access-information-privacy/privacy/guidance-document-taking-privacy-into-account-before-making-contracting-decisions.html",
    description: "Prendre en compte la protection de la vie privée avant de prendre des décisions contractuelles (SCT)",
    accessibility: "public",
  },
  "digital-privacy-playbook": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-privacy-playbook.html",
    description: "Guide sur les pratiques relatives à la vie privée numérique (SCT)",
    accessibility: "public",
  },
  "digital-privacy-playbook-pia": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-privacy-playbook/privacy-impact-assessments.html",
    description: "Guide sur les pratiques relatives à la vie privée numérique — évaluations des facteurs relatifs à la vie privée",
    accessibility: "public",
  },
  "digital-privacy-playbook-privacy-notices": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-privacy-playbook/privacy-notices.html",
    description: "Guide sur les pratiques relatives à la vie privée numérique — avis de confidentialité",
    accessibility: "public",
  },
  "digital-privacy-playbook-checklist": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-privacy-playbook/privacy-guidance-checklist.html",
    description: "Guide sur les pratiques relatives à la vie privée numérique — liste de vérification",
    accessibility: "public",
  },
  "opc-pia-expectations": {
    url: "https://www.priv.gc.ca/en/privacy-topics/federal-government-privacy/privacy-impact-assessments/gd_exp_202003/",
    description: "CPVP, Guide du Commissariat au sujet du processus d’évaluation des facteurs relatifs à la vie privée (Attentes)",
    accessibility: "public",
  },
  "opc-federal-institutions": {
    url: "https://www.priv.gc.ca/en/for-federal-institutions/",
    description: "CPVP, Pour les institutions fédérales",
    accessibility: "public",
  },
  "privacy-by-design-principles": {
    url: "https://www.sfu.ca/~palys/Cavoukian-2011-PrivacyByDesign-7FoundationalPrinciples.pdf",
    description: "Privacy by Design : les 7 principes fondamentaux (Ann Cavoukian)",
    accessibility: "public",
  },
  "ssc-tapi": {
    url: "https://www.canada.ca/en/shared-services/campaigns/stories/tapi-ervpt.html",
    description: "SPC, Évaluation technologique des répercussions sur la vie privée (ETRVP)",
    accessibility: "public",
  },
  "uk-ico-dpia": {
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/",
    description: "ICO du Royaume-Uni, évaluations des incidences relatives à la protection des données",
    accessibility: "public",
  },
  "gdpr-article-25": {
    url: "https://gdpr-info.eu/art-25-gdpr/",
    description: "RGPD article 25 (protection des données dès la conception et par défaut)",
    accessibility: "public",
  },
  "policy-on-service-and-digital": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32603",
    description: "Politique sur les services et le numérique (SCT)",
    accessibility: "public",
  },
  "directive-on-service-and-digital": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32601",
    description: "Directive sur les services et le numérique (SCT)",
    accessibility: "public",
  },
  "service-fees-act": {
    url: "https://laws-lois.justice.gc.ca/eng/acts/s-8.4/",
    description: "Loi sur les frais de service (Lois du ministère de la Justice)",
    accessibility: "public",
  },
  laca: {
    url: "https://laws-lois.justice.gc.ca/eng/acts/l-7.7/FullText.html",
    description: "Loi sur la Bibliothèque et les Archives du Canada (L.C. 2004, ch. 11)",
    accessibility: "public",
  },
  "lac-documented-disposition": {
    url: "https://www.canada.ca/en/library-archives/services/government/information-disposition/management/guidelines/documented-disposition-records.html",
    description: "BAC, Lignes directrices sur la documentation de la disposition des documents",
    accessibility: "public",
  },
  "lac-gvt-overview": {
    url: "https://www.canada.ca/en/library-archives/services/government/information-disposition/management/generic-valuation-tools/overview.html",
    description: "BAC, Outils générique d’évaluation (aperçu)",
    accessibility: "public",
  },
  "lac-information-disposition-hub": {
    url: "https://www.canada.ca/en/library-archives/services/government/information-disposition.html",
    description: "BAC, Gestion de l’information et disposition des documents fédéraux (carrefour)",
    accessibility: "public",
  },
  "tbs-data-quality-guidance": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/information-management/guidance-data-quality.html",
    description: "SCT, Orientations sur la qualité des données (neuf dimensions)",
    accessibility: "public",
  },
  "statcan-quality-guidelines": {
    url: "https://www150.statcan.gc.ca/n1/pub/12-539-x/12-539-x2019001-eng.htm",
    description: "Statistique Canada, Lignes directrices sur la qualité (6e éd., 12-539-X)",
    accessibility: "public",
  },
  "tbs-fair-principles": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/information-management/guidance-assessing-readiness-manage-data-according-findable-accessible-interoperable-reusable-principles.html",
    description: "SCT, Orientations sur la préparation à gérer les données selon les principes FAIR",
    accessibility: "public",
  },
  "uk-national-archives-migration": {
    url: "https://cdn.nationalarchives.gov.uk/documents/information-management/edrms.pdf",
    description:
      "The National Archives (Royaume-Uni), migration de l’information entre systèmes de gestion des documents",
    accessibility: "public",
  },
  "aws-app-retirement": {
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-app-retirement-best-practices/welcome.html",
    description:
      "AWS Prescriptive Guidance, retirer les applications avant de démanteler l’infrastructure",
    accessibility: "public",
  },
  "accessible-canada-act-summary": {
    url: "https://www.canada.ca/en/employment-social-development/programs/accessible-canada/act-summary.html",
    description: "Loi canadienne sur l’accessibilité (résumé d’EDSC)",
    accessibility: "public",
  },
  "accessible-canada-regulations-digital-technologies": {
    url: "https://www.canada.ca/en/employment-social-development/programs/accessible-canada-regulations-guidance/category-digital-technologies.html",
    description: "Règlement canadien sur l’accessibilité, technologies numériques (EDSC)",
    accessibility: "public",
  },
  "can-asc-en-301-549": {
    url: "https://accessible.canada.ca/creating-accessibility-standards/canasc-en-301-5492024-accessibility-requirements-ict-products-and-services",
    description: "CAN/ASC-EN 301 549:2024, Exigences d’accessibilité pour les TIC",
    accessibility: "public",
  },
  "wcag-22-quickref": {
    url: "https://www.w3.org/WAI/WCAG22/quickref/",
    description: "Référence rapide WCAG 2.2 (W3C WAI)",
    accessibility: "public",
  },
  "a11y-toolkit-procurement": {
    url: "https://a11y.canada.ca/en/procurement/",
    description: "Boîte à outils de l’accessibilité numérique — approvisionnement",
    accessibility: "public",
  },
  "a11y-ict-procurement-guide": {
    url: "https://a11y.canada.ca/en/guide-for-including-accessibility-in-information-and-communication-technology-ict-related-procurement/",
    description:
      "Guide pour l’inclusion de l’accessibilité dans l’approvisionnement lié aux TIC (Boîte à outils de l’accessibilité numérique)",
    accessibility: "public",
  },
  "gccatalogue-accessibility-procurement": {
    url: "https://gccatalogue.alpha.canada.ca/patterns/accessibilityprocurement-EN.html",
    description: "Libellé d’approvisionnement en matière d’accessibilité (catalogue du GC)",
    accessibility: "public",
  },
  "a11y-toolkit-test-products": {
    url: "https://a11y.canada.ca/en/test-your-products/",
    description: "Boîte à outils de l’accessibilité numérique — tester vos produits",
    accessibility: "public",
  },
  "a11y-toolkit-standards": {
    url: "https://a11y.canada.ca/en/accessibility-standards/",
    description: "Boîte à outils de l’accessibilité numérique — normes d’accessibilité",
    accessibility: "public",
  },
  "w3c-wai-accessibility-intro": {
    url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
    description: "Introduction du W3C à l’accessibilité du Web",
    accessibility: "public",
  },
  "webaim-wave": {
    url: "https://wave.webaim.org/",
    description: "WebAIM WAVE (vérificateur automatisé gratuit)",
    accessibility: "public",
  },
  "section508-gov": {
    url: "https://www.section508.gov/",
    description: "Section508.gov (États-Unis)",
    accessibility: "public",
  },
  "nz-web-accessibility-standard": {
    url: "https://www.digital.govt.nz/standards-and-guidance/nz-government-web-standards/web-accessibility-standard-1-2",
    description: "Norme d’accessibilité Web du gouvernement de la Nouvelle-Zélande 1.2",
    accessibility: "public",
  },
  "australia-dta-leave-no-one-behind": {
    url: "https://www.digital.gov.au/policy/digital-experience/digital-service-standard/criterion-3",
    description: 'DTA de l’Australie, « Ne laisser personne derrière » (anciennement critère 9)',
    accessibility: "public",
  },
  "uk-service-manual-assisted-digital": {
    url: "https://www.gov.uk/service-manual/helping-people-to-use-your-service",
    description: "Service Manual du Royaume-Uni, accessibilité et numérique assisté",
    accessibility: "public",
  },
  "nng-accessible-web-design": {
    url: "https://www.nngroup.com/reports/usability-guidelines-accessible-web-design/",
    description: "Nielsen Norman Group, Usability Guidelines for Accessible Web Design, lignes directrices d’utilisabilité pour une conception Web accessible",
    accessibility: "public",
  },
  "digital-accessibility-toolkit": {
    url: "https://a11y.canada.ca/en/",
    description: "Boîte à outils de l’accessibilité numérique",
    accessibility: "public",
  },
  "a11y-community-directory": {
    url: "https://a11y.canada.ca/en/community-directory/",
    description: "Répertoire communautaire de la Boîte à outils de l’accessibilité numérique",
    accessibility: "public",
  },
  "gc-notify-contact": {
    url: "https://notification.canada.ca/",
    description: "Notification GC — pour nous joindre",
    accessibility: "public",
  },
  "gc-forms-assistance": {
    url: "https://articles.alpha.canada.ca/forms-formulaires/",
    description: "Formulaires GC",
    accessibility: "public",
  },
  "gc-design-system": {
    url: "https://design-system.canada.ca/",
    description: "Système de design GC",
    accessibility: "public",
  },
  "gc-open-source-community": {
    url: "https://github.com/canada-ca",
    description: "Collectivité du code source libre du GC (GitHub)",
    accessibility: "public",
  },
  "open-government-portal": {
    url: "https://open.canada.ca/en",
    description: "Portail du gouvernement ouvert (Canada)",
    accessibility: "public",
  },
  "directive-automated-decision-making": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592",
    description: "Directive sur la prise de décisions automatisée (SCT)",
    accessibility: "public",
  },
  "algorithmic-impact-assessment": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/algorithmic-impact-assessment.html",
    description: "évaluation de l’incidence algorithmique (SCT)",
    accessibility: "public",
  },
  "gba-plus": {
    url: "https://www.canada.ca/en/women-gender-equality/gender-based-analysis-plus.html",
    description: "Analyse comparative entre les sexes plus (Femmes et Égalité des genres Canada)",
    accessibility: "public",
  },
  "gc-information-management-community": {
    url: "https://www.tbs-sct.canada.ca/im-gi/imc-cgi/imc-cgi-eng.asp",
    description: "Collectivité de la gestion de l’information du GC et liste de diffusion GI (SCT)",
    accessibility: "public",
  },
  "community-of-official-languages": {
    url: "https://wiki.gccollab.ca/Community_of_Official_Languages",
    description: "Collectivité des langues officielles (wiki GCcollab)",
    accessibility: "public",
  },
  "tbs-official-languages": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/topics/values-ethics/official-languages.html",
    description: "Langues officielles (Secrétariat du Conseil du Trésor du Canada)",
    accessibility: "public",
  },
  "csps-inc101": {
    url: "https://catalogue.csps-efpc.gc.ca/product?catalog=INC101&cm_locale=en",
    description: "Introduction à l’analyse comparative entre les sexes plus, INC101 (EFPC)",
    accessibility: "public",
  },
  "online-security-privacy-hub": {
    url: "https://www.canada.ca/en/government/system/digital-government/online-security-privacy.html",
    description: "Sécurité et protection de la vie privée en ligne (gouvernement du Canada)",
    accessibility: "public",
  },
  "responsible-use-ai-hub": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai.html",
    description: "Utilisation responsable de l’IA au gouvernement (carrefour, SCT)",
    accessibility: "public",
  },
  "ai-guiding-principles": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/principles.html",
    description: "Principes directeurs pour l’utilisation de l’IA au gouvernement (SCT)",
    accessibility: "public",
  },
  "generative-ai-faster": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/guide-use-generative-ai.html",
    description: "Guide sur l’utilisation de l’intelligence artificielle générative, les principes « PRETES » (SCT)",
    accessibility: "public",
  },
  "agentic-ai-guide": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/guide-use-agentic-artificial-antelligence.html",
    description: "Guide sur l’utilisation de l’intelligence artificielle agentive (SCT)",
    accessibility: "public",
  },
  "can-asc-62-equitable-ai": {
    url: "https://accessible.canada.ca/creating-accessibility-standards/asc-62-accessible-equitable-artificial-intelligence-systems",
    description: "CAN-ASC-6.2 Systèmes d’intelligence artificielle accessibles et équitables (Normes d’accessibilité Canada)",
    accessibility: "public",
  },
  "opc-generative-ai-principles": {
    url: "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/",
    description:
      "CPVP, Principes pour des technologies de l’IA générative responsables, dignes de confiance et respectueuses de la vie privée",
    accessibility: "public",
  },
  "statcan-ai": {
    url: "https://www.statcan.gc.ca/en/trust/collecting-your-data/artificial-intelligence",
    description: "Utilisation de l’intelligence artificielle à Statistique Canada",
    accessibility: "public",
  },
  "nist-ai-rmf": {
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
    description: "AI Risk Management Framework du NIST (AI RMF 1.0), cadre de gestion des risques liés à l’IA (États-Unis)",
    accessibility: "public",
  },
  "oecd-ai-principles": {
    url: "https://oecd.ai/en/ai-principles",
    description: "Principes de l’OCDE sur l’IA",
    accessibility: "public",
  },
  "eu-ai-act-summary": {
    url: "https://artificialintelligenceact.eu/high-level-summary/",
    description: "Règlement européen sur l’IA, résumé de haut niveau",
    accessibility: "public",
  },
  "iterate-improve-frequently": {
    url: "https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/iterate-improve-frequently.html",
    description: 'Normes relatives au numérique du GC, « Itérer et améliorer fréquemment » (SCT)',
    accessibility: "public",
  },
  "work-open-default": {
    url: "https://www.canada.ca/en/government/system/digital-government/government-canada-digital-standards/work-open-default.html",
    description: 'Normes relatives au numérique du GC, « Travailler ouvertement par défaut » (SCT)',
    accessibility: "public",
  },
  "scrum-guide": {
    url: "https://scrumguides.org/scrum-guide.html",
    description: "Le Guide Scrum (Schwaber et Sutherland, CC BY-SA)",
    accessibility: "public",
  },
  "uk-service-manual-agile-delivery": {
    url: "https://www.gov.uk/service-manual/agile-delivery",
    description: "Service Manual de GOV.UK, la livraison agile",
    accessibility: "public",
  },
  "uk-writing-user-stories": {
    url: "https://www.gov.uk/service-manual/agile-delivery/writing-user-stories",
    description: "Service Manual de GOV.UK, rédiger des histoires d’utilisateur",
    accessibility: "public",
  },
  "uk-deciding-on-priorities": {
    url: "https://www.gov.uk/service-manual/agile-delivery/deciding-on-priorities",
    description: "Service Manual de GOV.UK, établir les priorités",
    accessibility: "public",
  },
  "robodebt-royal-commission-report": {
    url: "https://robodebt.royalcommission.gov.au/publications/report",
    description: "Rapport de la commission royale d’enquête sur Robodebt",
    accessibility: "public",
  },
  "netherlands-childcare-fraud-algorithm-ap": {
    url: "https://www.autoriteitpersoonsgegevens.nl/en/current/tax-administration-fined-for-discriminatory-and-unlawful-data-processing",
    description:
      "Autorité néerlandaise de protection des données, l’administration fiscale sanctionnée pour un algorithme discriminatoire",
    accessibility: "public",
  },
  "github-issues": {
    url: "https://github.com/myermcat/digital-lifecycle-guide/issues",
    description: "Tickets GitHub du Guide du cycle de vie numérique",
    accessibility: "public",
  },
  "nist-face-recognition-demographics-study": {
    url: "https://www.nist.gov/news-events/news/2019/12/nist-study-evaluates-effects-race-age-sex-face-recognition-software",
    description: "Étude du NIST sur les effets démographiques dans les logiciels de reconnaissance faciale",
    accessibility: "public",
  },
  "uk-assisted-digital-introduction": {
    url: "https://www.gov.uk/service-manual/helping-people-to-use-your-service/assisted-digital-support-introduction",
    description: "Service Manual de GOV.UK, le soutien numérique assisté : une introduction",
    accessibility: "public",
  },
  "gc-standards-on-apis": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/government-canada-standards-apis.html",
    description: "Normes du gouvernement du Canada sur les API (SCT)",
    accessibility: "public",
  },
  "enabling-interoperability": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/enabling-interoperability.html",
    description: "Carrefour Favoriser l’interopérabilité du GC (SCT)",
    accessibility: "public",
  },
  "gc-ea-application-architecture": {
    url: "https://wiki.gccollab.ca/GC_Enterprise_Architecture/Standards/Application_Architecture",
    description: "Architecture intégrée du GC, architecture applicative (CEAI GC, GCcollab)",
    accessibility: "public",
  },
  "uk-service-standard-point-2": {
    url: "https://www.gov.uk/service-manual/service-standard/point-2-solve-a-whole-problem",
    description: "Service Standard de GOV.UK, point 2 : Résoudre un problème entier pour les utilisateurs",
    accessibility: "public",
  },
  "uk-service-standard-point-3-join-channels": {
    url: "https://www.gov.uk/service-manual/service-standard/point-3-join-up-across-channels",
    description:
      "Service Standard de GOV.UK, point 3 : Offrir une expérience intégrée sur tous les canaux",
    accessibility: "public",
  },
  "uk-creating-experience-map": {
    url: "https://www.gov.uk/service-manual/user-research/creating-an-experience-map",
    description: "Service Manual du Royaume-Uni, créer une carte d’expérience",
    accessibility: "public",
  },
  "nng-journey-mapping-101": {
    url: "https://www.nngroup.com/articles/journey-mapping-101/",
    description: "Nielsen Norman Group, Journey Mapping 101, les bases de la cartographie de parcours",
    accessibility: "public",
  },
  "european-interoperability-framework": {
    url: "https://interoperable-europe.ec.europa.eu/collection/iopeu-monitoring/european-interoperability-framework-detail",
    description: "Cadre d’interopérabilité européen, les quatre couches (Commission européenne)",
    accessibility: "public",
  },
  "gc-functional-communities-directory": {
    url: "https://wiki.gccollab.ca/GCOnboard/Functional_Communities",
    description: "Répertoire des collectivités fonctionnelles du GC",
    accessibility: "public",
  },
  "gc-enterprise-it-portfolio": {
    url: "https://wiki.gccollab.ca/GC_Enterprise_IT_Portfolio",
    description: "Portefeuille de la TI intégrée du GC (GCcollab)",
    accessibility: "public",
  },
  "gc-design-community": {
    url: "https://wiki.gccollab.ca/GC_design_community",
    description: "Collectivité de la conception du GC (wiki GCcollab)",
    accessibility: "public",
  },
  "gc-ux-network": {
    url: "https://wiki.gccollab.ca/Government_of_Canada_UX_Network",
    description: "Réseau UX du gouvernement du Canada (wiki GCcollab)",
    accessibility: "public",
  },
  "atlassian-scrum-backlogs": {
    url: "https://www.atlassian.com/agile/scrum/backlogs",
    description: "Atlassian, carnet de produit",
    accessibility: "public",
  },
  "atlassian-technical-debt": {
    url: "https://www.atlassian.com/agile/software-development/technical-debt",
    description: "Atlassian, dette technique",
    accessibility: "public",
  },
  "roman-pichler-backlog-mistakes": {
    url: "https://www.romanpichler.com/blog/product-backlog-mistakes/",
    description: "Roman Pichler, Seven Product Backlog Mistakes to Avoid, sept erreurs de carnet de produit à éviter",
    accessibility: "public",
  },
  "gc-cloud-guardrails": {
    url: "https://canada-ca.github.io/cloud-guardrails/",
    description: "Garde-fous infonuagiques du GC (SCT et Services partagés Canada)",
    accessibility: "public",
  },
  "gc-data-sovereignty-white-paper": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/cloud-services/digital-sovereignty/gc-white-paper-data-sovereignty-public-cloud.html",
    description: "Gouvernement du Canada Livre blanc : Souveraineté des données et nuage public (SCT)",
    accessibility: "public",
  },
  "tbs-digital-sovereignty-residency": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/cloud-services/digital-sovereignty.html",
    description: "Souveraineté numérique, y compris l’Orientation sur la résidence des données électroniques (SCT)",
    accessibility: "public",
  },
  "gc-use-open-standards-solutions": {
    url: "https://canada-ca.github.io/gcdigital-tools_outils-numeriquesgc/en/4-use-open-standards-solutions.html",
    description: 'GC, « Utiliser des normes et des solutions ouvertes » (ligne directrice 4, SCT)',
    accessibility: "public",
  },
  "isc2-cloud-exit-strategies": {
    url: "https://www.isc2.org/Insights/2024/04/Cloud-Exit-Strategies-Avoiding-Vendor-Lock-in",
    description: "ISC2, Cloud Exit Strategies, stratégies de sortie infonuagique et comment éviter le verrouillage",
    accessibility: "public",
  },
  "uk-deploying-software-regularly": {
    url: "https://www.gov.uk/service-manual/technology/deploying-software-regularly",
    description: "Service Manual du Royaume-Uni, déployer les logiciels régulièrement",
    accessibility: "public",
  },
  "atlassian-ci-cd": {
    url: "https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment",
    description: "Atlassian, intégration continue, livraison continue et déploiement continu",
    accessibility: "public",
  },
  "martin-fowler-deployment-pipeline": {
    url: "https://martinfowler.com/bliki/DeploymentPipeline.html",
    description: "Martin Fowler, Deployment Pipeline, la chaîne de déploiement",
    accessibility: "public",
  },
  "google-sre-canarying-releases": {
    url: "https://sre.google/workbook/canarying-releases/",
    description: "Google SRE Workbook, déploiements canari",
    accessibility: "public",
  },
  "dora-metrics": {
    url: "https://dora.dev/guides/dora-metrics/",
    description: "DORA, indicateurs de performance de la livraison logicielle",
    accessibility: "public",
  },
  "cccs-top-10-it-security-actions": {
    url: "https://www.cyber.gc.ca/en/guidance/top-10-it-security-actions-protect-internet-connected-networks-and-information-itsm10089",
    description: "CCC, Les 10 principales mesures de sécurité des TI (ITSM.10.089)",
    accessibility: "public",
  },
  "cccs-baseline-cyber-security-sme": {
    url: "https://www.cyber.gc.ca/en/guidance/baseline-cyber-security-controls-small-and-medium-organizations",
    description: "CCC, Contrôles de cybersécurité de base pour les petites et moyennes organisations",
    accessibility: "public",
  },
  "cisa-secure-by-design": {
    url: "https://www.cisa.gov/securebydesign",
    description: "CISA (États-Unis), Secure by Design, la sécurité dès la conception",
    accessibility: "public",
  },
  "opc-privacy-act-in-brief": {
    url: "https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-privacy-act/pa_brief/",
    description: "CPVP, Survol de la Loi sur la protection des renseignements personnels",
    accessibility: "public",
  },
  "ontario-ipc-privacy-by-design": {
    url: "https://www.ipc.on.ca/en/resources-and-decisions/privacy-design",
    description: "CIPVP de l’Ontario, Privacy by Design",
    accessibility: "public",
  },
  "nist-privacy-framework": {
    url: "https://www.nist.gov/privacy-framework",
    description: "NIST Privacy Framework, cadre de protection de la vie privée",
    accessibility: "public",
  },
  "asc-creating-accessibility-standards": {
    url: "https://accessible.canada.ca/creating-accessibility-standards",
    description: "Normes d’accessibilité Canada (Élaboration de normes d’accessibilité)",
    accessibility: "public",
  },
  "w3c-wai-tutorials": {
    url: "https://www.w3.org/WAI/tutorials/",
    description: "Tutoriels du W3C WAI",
    accessibility: "public",
  },
  "webaim-keyboard-accessibility": {
    url: "https://webaim.org/techniques/keyboard/",
    description: "WebAIM, accessibilité au clavier",
    accessibility: "public",
  },
  "tbs-2023-2026-data-strategy": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/corporate/reports/2023-2026-data-strategy.html",
    description: "SCT, Stratégie relative aux données de 2023-2026 pour la fonction publique fédérale",
    accessibility: "public",
  },
  "statcan-data-stewardship-intro": {
    url: "https://www.statcan.gc.ca/en/wtc/data-literacy/catalogue/892000062020013",
    description: "Statistique Canada, Intendance des données : introduction",
    accessibility: "public",
  },
  "go-fair-principles": {
    url: "https://www.go-fair.org/fair-principles/",
    description: "GO FAIR, les principes FAIR",
    accessibility: "public",
  },
  "montreal-declaration-responsible-ai": {
    url: "https://montrealdeclaration-responsibleai.com/the-declaration/",
    description: "Déclaration de Montréal pour un développement responsable de l’IA",
    accessibility: "public",
  },
  "cifar-ai-and-society": {
    url: "https://cifar.ca/ai/ai-and-society/",
    description: "CIFAR, IA et société (Stratégie pancanadienne en matière d’IA)",
    accessibility: "public",
  },
  "uk-introduction-to-ai-assurance": {
    url: "https://www.gov.uk/government/publications/introduction-to-ai-assurance",
    description: "DSIT du Royaume-Uni, Introduction to AI assurance, introduction à l’assurance de l’IA",
    accessibility: "public",
  },
  "cds-service-design-at-cds": {
    url: "https://digital.canada.ca/service-digital-toolkit/user-centred-design/service-design-at-cds/",
    description: "Service numérique canadien, la conception de services au SNC",
    accessibility: "public",
  },
  "uk-working-across-organisational-boundaries": {
    url: "https://www.gov.uk/service-manual/design/working-across-organisational-boundaries",
    description: "GOV.UK, le travail interorganisationnel avec les collectivités de service",
    accessibility: "public",
  },
  "dta-service-design-delivery-process": {
    url: "https://www.digital.gov.au/policy/digital-experience/toolkit/service-design-and-delivery-process",
    description: "Processus de conception et de prestation de services (Australie, Digital Experience Toolkit)",
    accessibility: "public",
  },
  "design-canada-continuous-improvement": {
    url: "https://design.canada.ca/continuous-improvement.html",
    description: "design.canada.ca, amélioration continue",
    accessibility: "public",
  },
  "mountaingoat-user-stories": {
    url: "https://www.mountaingoatsoftware.com/agile/user-stories",
    description: "Mike Cohn (Mountain Goat), les histoires d’utilisateur",
    accessibility: "public",
  },
  "svpg-product-vs-feature-teams": {
    url: "https://www.svpg.com/product-vs-feature-teams/",
    description: "Marty Cagan (SVPG), Product vs Feature Teams, équipes produit et équipes fonctionnalité",
    accessibility: "public",
  },
  "github-continuous-integration": {
    url: "https://docs.github.com/en/actions/get-started/continuous-integration",
    description: "Documentation GitHub, l’intégration continue",
    accessibility: "public",
  },
  "aws-well-architected-operational-excellence": {
    url: "https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/operational-excellence.html",
    description: "AWS Well-Architected, pilier de l’excellence opérationnelle",
    accessibility: "public",
  },
  "google-sre-release-engineering": {
    url: "https://sre.google/sre-book/release-engineering/",
    description: "Google SRE Book, Release Engineering, l’ingénierie de la mise en production (ch. 8)",
    accessibility: "public",
  },
  "design-canada-research-summaries": {
    url: "https://design.canada.ca/research-summaries/",
    description: "Résumés de recherche de Canada.ca",
    accessibility: "public",
  },
  "uk-start-by-learning-user-needs": {
    url: "https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs",
    description: "Service Manual du Royaume-Uni, apprendre à connaître les utilisateurs et leurs besoins",
    accessibility: "public",
  },
  "ixdf-user-research": {
    url: "https://www.interaction-design.org/literature/topics/user-research",
    description: "Interaction Design Foundation, What is User Research ?, qu’est-ce que la recherche sur les utilisateurs",
    accessibility: "public",
  },
  "threat-modeling-manifesto": {
    url: "https://www.threatmodelingmanifesto.org/",
    description: "Threat Modeling Manifesto, manifeste de la modélisation des menaces",
    accessibility: "public",
  },
  "covid-alert-privacy-assessment": {
    url: "https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19/covid-alert/privacy-policy/assessment.html",
    description: "Évaluation de la protection de la vie privée d’Alerte COVID (Santé Canada et SNC)",
    accessibility: "public",
  },
  "open-first-whitepaper-standards": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/open-first-whitepaper/open-first-whitepaper-standards.html",
    description: "Livre blanc Ouvert en premier : Normes ouvertes (SCT)",
    accessibility: "public",
  },
  "cccs-software-supply-chain-itsm10071": {
    url: "https://www.cyber.gc.ca/en/guidance/protecting-your-organization-software-supply-chain-threats-itsm10071",
    description:
      "CCC, Protéger votre organisation contre les menaces de la chaîne d’approvisionnement des logiciels (ITSM.10.071)",
    accessibility: "public",
  },
  "cccs-cyber-supply-chain-smb-itsap00070": {
    url: "https://www.cyber.gc.ca/en/guidance/cyber-supply-chain-security-small-medium-sized-organizations-itsap00070",
    description:
      "CCC, Cybersécurité de la chaîne d’approvisionnement pour les petites et moyennes organisations (ITSAP.00.070)",
    accessibility: "public",
  },
  "cccs-log4j-alert": {
    url: "https://www.cyber.gc.ca/en/alerts/active-exploitation-apache-log4j-vulnerability",
    description: "CCC, Exploitation active de la vulnérabilité Apache Log4j",
    accessibility: "public",
  },
  "pspc-security-requirements-contracting": {
    url: "https://www.canada.ca/en/public-services-procurement/services/industrial-security/security-requirements-contracting.html",
    description: "Exigences de sécurité des contrats du gouvernement du Canada (SPAC)",
    accessibility: "public",
  },
  "psc-general-conditions-service-contract": {
    url: "https://www.canada.ca/en/public-service-commission/corporate/about-us/doing-business-public-service-commission/general-conditions-service-contract.html",
    description: "Conditions générales d’un contrat de services (SPC)",
    accessibility: "public",
  },
  "tbs-service-agreements-essential-elements": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=25761",
    description: "Ligne directrice sur les ententes de service : éléments essentiels (SCT)",
    accessibility: "public",
  },
  "pspc-contract-security-manual": {
    url: "https://www.canada.ca/en/public-services-procurement/services/industrial-security/security-requirements-contracting/contract-security-manual-contracting-government-canada/contract-security-manual.html",
    description: "Manuel de la sécurité des contrats (SPAC)",
    accessibility: "public",
  },
  "tbs-srcl-350-103": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/corporate/forms/350-103.html",
    description: "Liste de vérification des exigences relatives à la sécurité, LVERS (SCT 350-103)",
    accessibility: "public",
  },
  "open-first-whitepaper-oss-use": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/open-first-whitepaper/open-first-whitepaper-use.html",
    description: "Livre blanc Ouvert en premier : Logiciels libres - Utilisation (SCT)",
    accessibility: "public",
  },
  "uk-make-use-of-open-standards": {
    url: "https://www.gov.uk/guidance/make-use-of-open-standards",
    description: "GOV.UK, Make use of open standards, utiliser les normes ouvertes",
    accessibility: "public",
  },
  "cisa-sbom": {
    url: "https://www.cisa.gov/sbom",
    description: "CISA, Software Bill of Materials (SBOM), nomenclature logicielle",
    accessibility: "public",
  },
  "openssf-scorecard": {
    url: "https://openssf.org/projects/scorecard/",
    description: "OpenSSF Scorecard, note de santé du code source libre",
    accessibility: "public",
  },
  slsa: {
    url: "https://slsa.dev/",
    description: "SLSA, Supply-chain Levels for Software Artifacts, niveaux de sûreté de la chaîne d’approvisionnement logicielle",
    accessibility: "public",
  },
  "gc-open-resource-exchange": {
    url: "https://code.open.canada.ca/en/index.html",
    description: "Échange de ressources ouvert du GC (SCT)",
    accessibility: "public",
  },
  "nist-sp-800-161-cscrm": {
    url: "https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
    description: "NIST SP 800-161 rév. 1, pratiques de gestion des risques liés à la cybersécurité de la chaîne d’approvisionnement",
    accessibility: "public",
  },
  "tbs-tb-submissions-overview": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/treasury-board-submissions-overview.html",
    description: "Processus de présentation au Conseil du Trésor et pratiques exemplaires (SCT)",
    accessibility: "public",
  },
  "tbs-guidance-drafters-tb-submissions": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/guidance-for-drafters-of-treasury-board-submissions.html",
    description: "Guide à l’intention des rédacteurs de présentations au Conseil du Trésor (SCT)",
    accessibility: "public",
  },
  "tbs-tb-submission-template-form": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/guidance/treasury-board-submission-template-form.html",
    description: "Gabarit de présentation au Conseil du Trésor et ses annexes (SCT)",
    accessibility: "public",
  },
  "tbs-tb-submission-roles": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/roles-responsibilities-treasury-board-submission-process.html",
    description: "Rôles et responsabilités dans le processus de présentation au CT (SCT)",
    accessibility: "public",
  },
  "tbs-three-phases-submission-process": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/three-phases-submission-process.html",
    description: "Les trois étapes du processus de présentation (SCT)",
    accessibility: "public",
  },
  "tbs-submission-service-quality-standards": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/treasury-board-submissions/service-quality-standards-support-submission-reviews.html",
    description: "Normes de service et de qualité à l’appui de l’examen des présentations (SCT)",
    accessibility: "public",
  },
  "tbs-cfo-attestation-cabinet-submissions": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=27256",
    description: "Ligne directrice sur l’attestation du DPF pour les présentations au Cabinet (SCT)",
    accessibility: "public",
  },
  "tbs-guide-costing": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/services/guidance-government-spending/guide-costing.html",
    description: "Guide d’établissement des coûts du GC (SCT)",
    accessibility: "public",
  },
  "tbs-guide-assessing-cost-estimates": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32818",
    description: "Guide d’évaluation des estimations de coûts (SCT)",
    accessibility: "public",
  },
  "tbs-directive-management-projects-programmes": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32594",
    description: "Directive sur la gestion des projets et des programmes (SCT)",
    accessibility: "public",
  },
  "gba-plus-what-is": {
    url: "https://www.canada.ca/en/women-gender-equality/gender-based-analysis-plus/what-gender-based-analysis-plus.html",
    description: "ACS Plus, Qu’est-ce que l’ACS Plus (Femmes et Égalité des genres Canada)",
    accessibility: "public",
  },
  "gba-plus-course": {
    url: "https://www.canada.ca/en/women-gender-equality/gender-based-analysis-plus/take-course.html",
    description: "ACS Plus, Suivre le cours (FEGC et EFPC)",
    accessibility: "public",
  },
  "lop-funding-new-government-initiatives": {
    url: "https://lop.parl.ca/sites/PublicWebsite/default/en_CA/ResearchPublications/202132E",
    description:
      "Financer les nouvelles initiatives gouvernementales : de l’annonce à l’affectation des fonds (Bibliothèque du Parlement)",
    accessibility: "public",
  },
  "csps-cor433": {
    url: "https://catalogue.csps-efpc.gc.ca/product?catalog=COR433&cm_locale=en",
    description: "Introduction à la planification et à la gestion des investissements, COR433 (EFPC)",
    accessibility: "public",
  },
  "directive-digital-talent": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32749",
    description: "Directive sur les talents numériques (SCT)",
    accessibility: "public",
  },
  "gc-digital-talent-strategy": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-talent-strategy.html",
    description: "Stratégie en matière de talents numériques du GC (SCT, BDPI)",
    accessibility: "public",
  },
  "gc-digital-talent-platform": {
    url: "https://talent.canada.ca/en",
    description: "Plateforme Talents numériques du GC (SCT)",
    accessibility: "public",
  },
  "csps-digital-academy": {
    url: "https://www.csps-efpc.gc.ca/digital-academy/index-eng.aspx",
    description: "Académie du numérique de l’EFPC (École de la fonction publique du Canada)",
    accessibility: "public",
  },
  "gc-data-community": {
    url: "https://www.csps-efpc.gc.ca/partnerships/data-community-eng.aspx",
    description: "Collectivité des données du GC (École de la fonction publique du Canada)",
    accessibility: "public",
  },
  "uk-service-manual-what-each-role": {
    url: "https://www.gov.uk/service-manual/the-team/what-each-role-does-in-a-service-team",
    description: "Le rôle de chacun dans une équipe de service (Service Manual du Royaume-Uni)",
    accessibility: "public",
  },
  "uk-service-manual-the-team": {
    url: "https://www.gov.uk/service-manual/the-team",
    description: "The team, l’équipe (Service Manual du Royaume-Uni)",
    accessibility: "public",
  },
  "dta-multidisciplinary-team": {
    url: "https://www.digital.gov.au/policy/digital-experience/toolkit/managing-teams",
    description: "La gestion des équipes (Australie, Digital Experience Toolkit)",
    accessibility: "public",
  },
  "atlassian-team-health-monitor": {
    url: "https://www.atlassian.com/team-playbook/health-monitor",
    description: "Team Health Monitor, moniteur de santé d’équipe (Atlassian)",
    accessibility: "public",
  },
  "gc-information-management-strategy-storyline": {
    url: "https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/information-management/information-management-strategy/storyline.html",
    description: "Stratégie de gestion de l’information du GC, fil narratif (SCT)",
    accessibility: "public",
  },
  "csps-project-management-learning-path": {
    url: "https://www.csps-efpc.gc.ca/learning-paths/project-management-eng.aspx",
    description: "Parcours d’apprentissage sur la gestion de projet de l’EFPC, volet changement",
    accessibility: "public",
  },
  "prosci-adkar": {
    url: "https://www.prosci.com/methodology/adkar",
    description: "Le modèle ADKAR (Prosci)",
    accessibility: "public",
  },
  "kotter-8-steps": {
    url: "https://www.kotterinc.com/methodology/8-steps/",
    description: "8 Steps for Leading Change, huit étapes pour mener le changement (Kotter Inc.)",
    accessibility: "public",
  },
  "gsa-m3-change-management-approach": {
    url: "https://ussm.gsa.gov/1.7/",
    description: "Définir l’approche de gestion du changement, tâche 1.7 (M3 Playbook de la GSA, États-Unis)",
    accessibility: "public",
  },
  "iocn-change-network": {
    url: "https://wiki.gccollab.ca/IOCN-RICO",
    description: "Réseau interministériel du changement organisationnel (RICO, GCcollab)",
    accessibility: "public",
  },
  "monitoring-measuring-task-success": {
    url: "https://design.canada.ca/continuous-improvement/monitoring.html",
    description: "Surveiller et mesurer la réussite des tâches (EDSC, design.canada.ca)",
    accessibility: "public",
  },
  "gc-task-success-survey": {
    url: "https://design.canada.ca/survey/",
    description: "Sondage sur la réussite des tâches du GC (EDSC)",
    accessibility: "public",
  },
  "gc-service-inventory": {
    url: "https://open.canada.ca/data/en/dataset/3ac0d080-6149-499a-8b06-7ce5f00ec56c",
    description: "Répertoire des services du GC (Gouvernement ouvert)",
    accessibility: "public",
  },
  "canada-ca-analytics": {
    url: "https://www.canada.ca/en/analytics.html",
    description: "Analytique de Canada.ca (SCT et EDSC)",
    accessibility: "public",
  },
  "uk-service-manual-performance-metrics": {
    url: "https://www.gov.uk/service-manual/measuring-success/how-to-set-performance-metrics-for-your-service",
    description: "Comment établir les indicateurs de rendement de votre service (Service Manual du Royaume-Uni)",
    accessibility: "public",
  },
  opentelemetry: {
    url: "https://opentelemetry.io/docs/what-is-opentelemetry/",
    description: "Qu’est-ce qu’OpenTelemetry ? (CNCF)",
    accessibility: "public",
  },
  "google-sre-service-level-objectives": {
    url: "https://sre.google/sre-book/service-level-objectives/",
    description: "Service Level Objectives, objectifs de niveau de service (Google SRE Book)",
    accessibility: "public",
  },
  "dta-digital-performance-standard": {
    url: "https://www.digital.gov.au/policy/digital-experience/digital-performance-standard",
    description: "Digital Performance Standard, norme de rendement numérique (Australie, DTA)",
    accessibility: "public",
  },
  "cccs-network-security-logging-monitoring": {
    url: "https://www.cyber.gc.ca/en/guidance/network-security-logging-monitoring-itsap80085",
    description: "Journalisation et surveillance de la sécurité des réseaux, ITSAP.80.085 (CCC)",
    accessibility: "public",
  },
  "lac-da-2016-001": {
    url: "https://www.canada.ca/en/library-archives/services/government/information-disposition/records/multi-institution-disposition-authorizations/2016-001-da-transitory-records.html",
    description: "Autorisation de disposition 2016/001 (documents éphémères)",
    accessibility: "public",
  },
  "oag-2014-ch7-documentary-heritage": {
    url: "https://www.oag-bvg.gc.ca/internet/English/parl_oag_201411_07_e_39965.html",
    description:
      "Rapport de l’automne 2014 du vérificateur général du Canada, chapitre 7 — Le patrimoine documentaire du gouvernement du Canada",
    accessibility: "public",
  },
  "cccs-itsm-50-104": {
    url: "https://www.cyber.gc.ca/en/guidance/recommended-cyber-security-contract-clauses-cloud-services-itsm50104",
    description: "CCC ITSM.50.104 (clauses contractuelles recommandées en matière de cybersécurité)",
    accessibility: "public",
  },
  "digital-cleanup-day": {
    url: "https://www.digitalcleanupday.org/",
    description: "Journée du nettoyage numérique (Let’s Do It World)",
    accessibility: "public",
  },
  "policy-government-security": {
    url: "https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=16578",
    description:
      "Politique sur la sécurité du gouvernement (SCT) : la politique mère derrière la Directive sur la gestion de la sécurité",
    accessibility: "public",
  },
  "gc-digital-competencies": {
    url: "https://www.canada.ca/en/treasury-board-secretariat/topics/professional-development/gc-digital-competencies-all-public-servants.html",
    description: "Compétences en matière de numérique au sein du GC pour tous les fonctionnaires (SCT)",
    accessibility: "public",
  },
  "csps-digital-competencies-learning-path": {
    url: "https://www.csps-efpc.gc.ca/learning-paths/digital-competencies-eng.aspx",
    description: "Parcours d’apprentissage sur les compétences numériques (École de la fonction publique du Canada)",
    accessibility: "public",
  },
  "gc-digital-competencies-playbook": {
    url: "https://gcxgce.sharepoint.com/teams/10001173/SitePages/Digital-Competencies-for-All-Playbook.aspx",
    description: "Guide des compétences numériques du GC pour tous les fonctionnaires (SCT, sur GCXchange)",
    accessibility: "gc-network-only",
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
