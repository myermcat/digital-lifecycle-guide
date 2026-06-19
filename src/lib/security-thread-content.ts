import type { SourceItem } from "@/components/SourcesBlock";
import type {
  ExternalPhraseLink,
  InternalPhraseLink,
  PlaceholderGcNetworkPhraseLink,
} from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import { PROCUREMENT_LANDING_PATH } from "@/lib/procurement-landing";
import {
  placeholderSourceHref,
  SECURE_APPLICATION_DEVELOPMENT_GUIDELINE,
  SECURE_APPLICATION_DEVELOPMENT_GUIDELINE_SHORT,
  SECURITY_CATEGORIZATION_OF_SOURCE_CODE,
} from "@/lib/placeholder-sources";

export type SecurityLinkedProse = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: InternalPhraseLink[];
  placeholderGcNetworkLinks?: PlaceholderGcNetworkPhraseLink[];
};

export type SecurityCloserLookBlock = SecurityLinkedProse & {
  title: string;
};

export type SecurityPhasePreviewBlock = {
  title: string;
  preview: string;
  popup: SecurityLinkedProse;
};

export const SECURITY_THREAD = {
  title: "Security",
  slug: "security" as const,

  lead:
    "Security runs through the whole life of a service, from the first design sketch to the day it is turned off. A service that was safe at launch drifts out of date as the threats around it change and its software ages, so security is work that never quite stops. The business owner of the application does not write the code or run the scans. Their job is the security decisions: making sure security is planned and funded, approving the service for release, and accepting the risk that comes with it.",

  whatGoodLooksLike: [
    { text: "Security is planned and funded from the start." },
    { text: "Patches are applied on a schedule." },
    {
      text: "Access follows least privilege, meaning each person and system gets only the access they need, and that access is audited.",
      externalLinks: [
        { phrase: "least privilege", linkKey: "least-privilege-itsap10094" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "The application is tested for vulnerabilities on a regular basis.",
      externalLinks: [
        {
          phrase: "tested for vulnerabilities",
          linkKey: "guideline-vulnerability-management",
        },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "An incident response plan exists and has been rehearsed.",
      externalLinks: [
        { phrase: "incident response plan", linkKey: "incident-response-plan-itsap40003" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "The service's security maturity level is known, with a clear next step to improve it.",
      externalLinks: [{ phrase: "security maturity level", linkKey: "owasp-dsomm" }] satisfies ExternalPhraseLink[],
    },
    {
      text: "Third-party components, the open-source and bought libraries the service is built on, are inventoried and watched for known problems.",
      externalLinks: [
        { phrase: "third-party components", linkKey: "cyber-supply-chain-itsap10070" },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies SecurityLinkedProse[],

  whyItMatters: {
    text:
      "When security fails, a service can go offline or leak people's personal information, and public trust is slow to rebuild. The most common causes are mundane: an unpatched component, a default password, a permission left too wide. Catching these early also costs less, because a flaw designed in and found late is the most expensive kind to undo. The Government of Canada's guide for all of this is the Guideline on Secure Application Development, which covers building security into each stage of development, secure coding, handling third-party components, and managing vulnerabilities. It is where the team goes for the how-to.",
    placeholderGcNetworkLinks: [
      {
        phrase: "Guideline on Secure Application Development",
        source: SECURE_APPLICATION_DEVELOPMENT_GUIDELINE_SHORT,
      },
    ] satisfies PlaceholderGcNetworkPhraseLink[],
  },

  whoseJob:
    "Security is shared across the team, with each role holding a different part. Developers write secure code and fix what the scans find. Security specialists decide which threats to defend against and review the design. Operations run and monitor the service once it is live. The business owner of the application makes sure security is planned and paid for from the start, approves the service for release, and accepts the risk that comes with it. The day-to-day work belongs to the team. The sign-off, the formal approval that lets a service go live, belongs to the business owner.",

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "Know where the service stands.",
        text:
          "Security maturity is a ladder a service can be placed on without reading a line of code. The model, the OWASP DevSecOps Maturity Model, runs from Level 0, no real security in place, up through ad hoc, defined, and integrated, to Level 4, where security is automated and measured. Knowing the level points to the one thing worth improving next, instead of trying to fix everything at once. Security maturity is one part of a service's overall maturity.",
        externalLinks: [
          { phrase: "OWASP DevSecOps Maturity Model", linkKey: "owasp-dsomm" },
        ] satisfies ExternalPhraseLink[],
        internalLinks: [{ phrase: "overall maturity", to: "/live-maturity" }] satisfies InternalPhraseLink[],
      },
      {
        title: "What the business owner signs off on.",
        text:
          "Even when specialists do the work, certain decisions belong to the business owner of the application: approving the plan for handling threats, accepting the risks that remain after the fixes, and giving the final go-ahead to put the service in front of the public. The last two matter most. Approval to deploy and acceptance of the remaining risk both belong to the business owner, and putting a name to a release means that risk has been understood and accepted.",
      },
      {
        title: "Open by default.",
        text:
          'Government of Canada code is open by default. Teams often label all of their code "Protected B" out of habit, but most source code holds no secrets and can be unclassified, and a good deal of it can be published openly. Open code invites more eyes, and more eyes catch more flaws, so hiding code is a weak way to keep it safe. The categorization is a deliberate decision the business owner makes with the team: public and open to contributions, public but closed to them, fully private, or genuinely Protected B. The Guide for Using Open Source Software sets out how to make that call.',
        placeholderGcNetworkLinks: [
          {
            phrase: "categorization",
            source: SECURITY_CATEGORIZATION_OF_SOURCE_CODE,
          },
        ] satisfies PlaceholderGcNetworkPhraseLink[],
        externalLinks: [
          {
            phrase: "Guide for Using Open Source Software",
            linkKey: "guide-open-source-software",
          },
        ] satisfies ExternalPhraseLink[],
      },
    ] satisfies SecurityCloserLookBlock[],
  },

  byPhase: {
    id: "by-phase",
    title: "What Security looks like in each phase",
    intro: "The security work changes shape across the life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "Security is built into the design, before any code is written.",
        popup: {
          text:
            "Most of the security that matters is decided before code exists. The team builds a threat model to set out what could go wrong and who might attack the service, chooses secure defaults so the safe option is the default one, and sets how the service will handle identity and access. Security requirements are written into the contract so the supplier is held to them. A weakness fixed at the design stage costs far less than one found in production.",
          externalLinks: [
            { phrase: "threat model", linkKey: "threat-modelling-developers" },
          ] satisfies ExternalPhraseLink[],
          internalLinks: [
            { phrase: "written into the contract", to: PROCUREMENT_LANDING_PATH },
          ] satisfies InternalPhraseLink[],
        },
      },
      {
        title: "Live.",
        preview: "The service is patched, watched, and ready to respond.",
        popup: {
          text:
            "Once the service is running, security work is continuous. The team applies patches on a schedule, scans for new vulnerabilities, and checks each release for security problems before it goes out, with the business owner giving the final go-ahead. Unusual activity is caught by monitoring the service in production, and a rehearsed incident response plan means a breach is caught and contained quickly.",
          externalLinks: [
            {
              phrase: "scans for new vulnerabilities",
              linkKey: "guideline-vulnerability-management",
            },
            {
              phrase: "incident response plan",
              linkKey: "incident-response-plan-itsap40003",
            },
          ] satisfies ExternalPhraseLink[],
          internalLinks: [
            {
              phrase: "monitoring the service in production",
              to: THREADS["monitoring-and-instrumentation"].path,
            },
          ] satisfies InternalPhraseLink[],
        },
      },
      {
        title: "Sunset.",
        preview: "The service is shut down or replaced without leaving holes open.",
        popup: {
          text:
            "A service is eventually retired or replaced, and security has work right to the end. As it is wound down, the team revokes access and credentials, moves or destroys data under its retention rules, and shuts off the connections to other systems so nothing is left hanging. Source code is disposed of the approved way, with extra care for anything categorized Protected B. A service left running unpatched past its end-of-support date is a standing risk, so finishing on time is part of the security work.",
          internalLinks: [
            { phrase: "retired or replaced", to: PHASES.sunset.href },
            { phrase: "moves or destroys data", to: THREADS["data-stewardship"].path },
          ] satisfies InternalPhraseLink[],
        },
      },
    ] satisfies SecurityPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "This thread comes under the Directive on Security Management, which requires security to be managed across a system's whole life. Its closest companion is the Guideline on Secure Application Development, on the GC network, which this thread leans on throughout. It also draws on ITSG-33 for the GC control catalogue, and the open OWASP Top 10 and NIST Secure Software Development Framework, translated to a business owner's decisions.",
    externalLinks: [
      {
        phrase: "Directive on Security Management",
        linkKey: "directive-security-management",
      },
      { phrase: "ITSG-33", linkKey: "itsg-33" },
      { phrase: "OWASP Top 10", linkKey: "owasp-top-10" },
      {
        phrase: "NIST Secure Software Development Framework",
        linkKey: "nist-ssdf",
      },
    ] satisfies ExternalPhraseLink[],
    placeholderGcNetworkLinks: [
      {
        phrase: "Guideline on Secure Application Development",
        source: SECURE_APPLICATION_DEVELOPMENT_GUIDELINE_SHORT,
      },
    ] satisfies PlaceholderGcNetworkPhraseLink[],
  },

  sources: [
    {
      label: "Governing instrument",
      href: placeholderSourceHref(SECURE_APPLICATION_DEVELOPMENT_GUIDELINE),
      description: `${SECURE_APPLICATION_DEVELOPMENT_GUIDELINE} — the GC how-to this page points to.`,
      comingSoon: true,
      gcNetworkOnly: true,
    },
    {
      label: "Governing instrument",
      linkKey: "directive-security-management-appendix-b" satisfies ExternalLinkKey,
      description:
        "Directive on Security Management, Appendix B (TBS) — the requirement to manage security across the whole system life cycle.",
    },
    {
      label: "Supporting reference",
      linkKey: "guideline-vulnerability-management" satisfies ExternalLinkKey,
      description:
        "Guideline on Vulnerability Management (GC) — the find, assess, fix loop behind \"tested regularly.\"",
    },
    {
      label: "Supporting reference",
      linkKey: "itsg-33" satisfies ExternalLinkKey,
    },
    {
      label: "Supporting reference",
      linkKey: "owasp-top-10" satisfies ExternalLinkKey,
      description: "OWASP Top 10 — the common web-application risks behind \"basic things left undone.\"",
    },
    {
      label: "Supporting reference",
      linkKey: "owasp-dsomm" satisfies ExternalLinkKey,
      description: "OWASP DevSecOps Maturity Model (DSOMM) — the maturity ladder in Card 1.",
    },
    {
      label: "Supporting reference",
      linkKey: "guide-open-source-software" satisfies ExternalLinkKey,
      description: "Guide for Using Open Source Software (GC) — the open-by-default call in Card 3.",
    },
    {
      label: "Supporting reference",
      linkKey: "secure-containers-microservices" satisfies ExternalLinkKey,
      description:
        "Secure Containers and Microservices (Guideline annex, open) — for teams running containers and Kubernetes.",
    },
    {
      label: "Supporting reference",
      linkKey: "threat-modelling-developers" satisfies ExternalLinkKey,
      description:
        "CCCS, Threat Modelling for Developers — what a threat model is; linked inline from the Create phase.",
    },
    {
      label: "Supporting reference",
      linkKey: "incident-response-plan-itsap40003" satisfies ExternalLinkKey,
      description:
        "CCCS, Developing your incident response plan (ITSAP.40.003) — what an incident response plan is; linked inline from the Live phase.",
    },
    {
      label: "Supporting reference",
      href: placeholderSourceHref(SECURITY_CATEGORIZATION_OF_SOURCE_CODE),
      description:
        "Security Categorization of Source Code (Guideline annex, TBS) — the open-by-default categorization in Card 3.",
      comingSoon: true,
      gcNetworkOnly: true,
    },
  ] satisfies SourceItem[],
} as const;
