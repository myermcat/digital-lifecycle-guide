import type { CaseStudySide } from "@/components/CaseStudyBlock";
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
  COMPONENT_END_OF_LIFE_GUIDANCE,
  GC_SECURITY_CATEGORIZATION_INJURY_ASSESSMENT,
  placeholderSourceHref,
  SECURE_APPLICATION_DEVELOPMENT_GUIDELINE,
  SECURE_APPLICATION_DEVELOPMENT_GUIDELINE_SHORT,
  SECURITY_CATEGORIZATION_OF_SOURCE_CODE,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";

export type SecurityLinkedProse = ThreadLinkedProse;

export type SecurityCloserLookBlock = {
  title: string;
  text?: string;
  sections?: readonly ThreadContentSection[];
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: InternalPhraseLink[];
  placeholderLinks?: PlaceholderPhraseLink[];
  placeholderGcNetworkLinks?: PlaceholderGcNetworkPhraseLink[];
  bold?: { phrase: string }[];
};

export type SecurityPhasePreviewBlock = {
  title: string;
  preview: string;
  popup: SecurityLinkedProse | readonly ThreadContentSection[];
};

export const SECURITY_THREAD = {
  title: "Security",
  slug: "security" as const,

  lead:
    "Security runs through the whole life of a service, from the first design sketch to the day it is turned off. A service that was safe at launch drifts out of date as the threats around it change and its software ages, so security is work that never quite stops. The decisions that shape a service's security are made early and revisited as it changes: which threats to defend against, how to control access, and when to reassess the risk. The business owner answers for those decisions; the team does the work.",

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
      text: "Monitoring and alerting flag unusual activity, because you cannot prevent everything and what counts is how fast you notice.",
    },
    {
      text: "An incident response plan exists and has been rehearsed, so a problem is contained quickly rather than weeks later.",
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
        { phrase: "Third-party components", linkKey: "cyber-supply-chain-itsap10070" },
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

  whoseJob: {
    intro: "Security is shared across the team, with each role holding a different part:",
    roles: [
      {
        role: "Developers",
        text: "write secure code and fix what the scans find.",
      },
      {
        role: "Security specialists",
        text: "decide which threats to defend against and review the design.",
      },
      {
        role: "Operations",
        text: "run and monitor the service once it is live.",
      },
      {
        role: "The business owner",
        text: "of the application makes sure security is planned and paid for from the start, approves the service for release, and accepts the risk that comes with it.",
      },
    ],
    closing:
      "The day-to-day work belongs to the team. The sign-off, the formal approval that lets a service go live, belongs to the business owner.",
  },

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
          "Even when specialists do the work, certain decisions belong to the business owner of the application: approving the plan for handling threats, accepting the risks that remain after the fixes, and giving the final go-ahead to put the service in front of the public. Approval to deploy and acceptance of the remaining risk both belong to the business owner, and putting a name to a release means that risk has been understood and accepted.",
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
      {
        title: "Work out what could go wrong, then protect what matters most.",
        sections: [
          {
            text:
              "The clearest way into security at the design stage is to ask four plain questions:",
          },
          {
            type: "orderedList",
            items: [
              "What are we building?",
              "What can go wrong?",
              "What are we going to do about it?",
              "Did we do a good enough job?",
            ],
          },
          {
            text:
              "That is a threat model, and the four questions come from the Threat Modeling Manifesto. Threat modeling is an industry practice rather than Government of Canada policy. The GC equivalent is security categorization, an injury assessment that asks how much harm a compromise would cause across economic, physical, well-being, and reputation, and sets the level from that: Protected B, Secret, or Top Secret.",
            externalLinks: [
              { phrase: "threat model", linkKey: "threat-modelling-developers" },
              { phrase: "Threat Modeling Manifesto", linkKey: "threat-modeling-manifesto" },
            ] satisfies ExternalPhraseLink[],
            placeholderLinks: [
              {
                phrase: "security categorization",
                source: GC_SECURITY_CATEGORIZATION_INJURY_ASSESSMENT,
              },
            ] satisfies PlaceholderPhraseLink[],
          },
          {
            text:
              "Once you know what could go wrong, protect the few things that matter most, robustly, rather than protecting everything to the same high standard. Trying to protect everything equally runs up cost overruns, delays, or protection so watered down it helps nowhere. Find the crown jewels first, then guard them well.",
            bold: [{ phrase: "protect the few things that matter most" }],
          },
          {
            type: "editorialNote",
            label: "Example",
            prose: {
              text:
                "The COVID Alert app worked by having phones swap anonymous random codes over Bluetooth; if someone later tested positive, those codes were used to warn the people they had recently been near. The one sensitive thing was the code that could trigger a 'you were exposed' alert, so the security effort was concentrated there, with safeguards that stopped anyone sending fake alerts. The opposite extreme makes the same point: a Top Secret room is built for the most sensitive work, so it is small, windowless, and costs a fortune. Mark everything Top Secret and the whole team would have to crowd into that one room to get anything done. So scope what genuinely needs that level.",
              externalLinks: [
                { phrase: "COVID Alert app", linkKey: "covid-alert-privacy-assessment" },
              ] satisfies ExternalPhraseLink[],
            },
          },
        ],
      },
    ] satisfies SecurityCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Two ways to do security",
    risky: {
      heading: "Vell",
      framing:
        "Meet Vell, a service manager. They treated security as someone else's problem on the grant portal:",
      items: [
        "skipped the threat model, so no one mapped what could go wrong",
        "left an admin account on its default password",
        "never patched the third-party components the portal was built on",
        "had no incident response plan",
      ],
      closing:
        "The result: a known vulnerability in an unpatched component was exploited, applicants' personal data leaked, and the breach was only noticed weeks later.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Meet Pax, a service manager. They built security into the grant portal from the design:",
      items: [
        "built a threat model to set out what could go wrong, and chose secure defaults",
        "gave each person and system only the access they needed, and audited it",
        "patched on a schedule and watched the third-party components for known problems",
        "kept a rehearsed incident response plan",
      ],
      closing:
        "The result: when a phishing attempt came, it was caught and contained quickly, and the data stayed safe.",
    } satisfies CaseStudySide,
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
          internalLinks: [
            { phrase: "written into the contract", to: PROCUREMENT_LANDING_PATH },
          ] satisfies InternalPhraseLink[],
        },
      },
      {
        title: "Live.",
        preview: "The service is patched, watched, and ready to respond fast.",
        popup: [
          {
            text:
              "Once the service is running, security work is continuous, and it has two halves:",
          },
          {
            type: "orderedList",
            items: [
              {
                text:
                  "Prevention. Keep the service hardened and current: apply patches on a schedule, scan for new vulnerabilities, and check each release for security problems before it goes out, with the business owner giving the final go-ahead.",
                bold: [{ phrase: "Prevention." }],
                externalLinks: [
                  {
                    phrase: "scan for new vulnerabilities",
                    linkKey: "guideline-vulnerability-management",
                  },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text:
                  "Detection and response. You cannot prevent everything, so this half matters just as much: monitor the service in production to catch unusual activity, and keep a rehearsed incident response plan so a problem is contained quickly instead of found weeks later.",
                bold: [{ phrase: "Detection and response." }],
                externalLinks: [
                  {
                    phrase: "incident response plan",
                    linkKey: "incident-response-plan-itsap40003",
                  },
                ] satisfies ExternalPhraseLink[],
                internalLinks: [
                  {
                    phrase: "monitor the service in production",
                    to: THREADS["monitoring-and-instrumentation"].path,
                  },
                ] satisfies InternalPhraseLink[],
              },
            ],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "The service is shut down or replaced without leaving holes open.",
        popup: {
          text:
            "A service is eventually retired or replaced, and security has work right to the end. As it is wound down, the team revokes access and credentials, moves or destroys data under its retention rules, and shuts off the connections to other systems so nothing is left hanging. Source code is disposed of the approved way, with extra care for anything categorized Protected B. Most of this is easier when you plan and fund retiring a component up front: technology that runs past its end-of-support date stops getting patches, so known vulnerabilities pile up until it is trivially exploitable. Lifecycle replacement should be budgeted from the start rather than run at risk. When hardware is finally decommissioned or donated, securely erase all the data on it first, so nothing walks out the door on a disposed drive.",
          internalLinks: [
            { phrase: "retired or replaced", to: PHASES.sunset.href },
            { phrase: "moves or destroys data", to: THREADS["data-stewardship"].path },
          ] satisfies InternalPhraseLink[],
          placeholderLinks: [
            {
              phrase: "retiring a component",
              source: COMPONENT_END_OF_LIFE_GUIDANCE,
            },
          ] satisfies PlaceholderPhraseLink[],
        },
      },
    ] satisfies SecurityPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Security in the Government of Canada comes under the Directive on Security Management, which requires security to be managed across a system's whole life. Its closest companion is the Guideline on Secure Application Development, on the GC network, which this thread leans on throughout. It also draws on ITSG-33 for the GC control catalogue, and the open OWASP Top 10 and NIST Secure Software Development Framework, translated to a business owner's decisions. To see where your spending buys down the most risk, the Cyber Centre's top 10 IT security actions ranks the defences that matter most, and its baseline controls for small and medium organizations is a plainer starting point for a smaller service. For the case that security is cheapest when designed in rather than bolted on, the US Cyber Defense Agency's secure-by-design principles make the argument in a business owner's terms.",
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
      { phrase: "top 10 IT security actions", linkKey: "cccs-top-10-it-security-actions" },
      {
        phrase: "baseline controls for small and medium organizations",
        linkKey: "cccs-baseline-cyber-security-sme",
      },
      { phrase: "secure-by-design principles", linkKey: "cisa-secure-by-design" },
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
      description:
        "ITSG-33, IT security risk management, a lifecycle approach (CCCS) — the GC security control catalogue and lifecycle approach.",
    },
    {
      label: "Supporting reference",
      linkKey: "owasp-top-10" satisfies ExternalLinkKey,
      description: "OWASP Top 10 — the common web-application risks behind \"basic things left undone.\"",
    },
    {
      label: "Supporting reference",
      linkKey: "owasp-dsomm" satisfies ExternalLinkKey,
      description: "OWASP DevSecOps Maturity Model (DSOMM) — the maturity ladder in Block 1.",
    },
    {
      label: "Supporting reference",
      linkKey: "guide-open-source-software" satisfies ExternalLinkKey,
      description: "Guide for Using Open Source Software (GC) — the open-by-default call in Block 3.",
    },
    {
      label: "Supporting reference",
      linkKey: "secure-containers-microservices" satisfies ExternalLinkKey,
      description:
        "Secure Containers and Microservices (Guideline annex, open) — for teams running containers and Kubernetes.",
    },
    {
      label: "Supporting reference",
      linkKey: "covid-alert-privacy-assessment" satisfies ExternalLinkKey,
      description:
        "COVID Alert privacy assessment (Health Canada / CDS) — https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19/covid-alert/privacy-policy/assessment.html",
    },
    {
      label: "Supporting reference",
      linkKey: "threat-modelling-developers" satisfies ExternalLinkKey,
      description:
        "CCCS, Threat Modelling for Developers — what a threat model is; linked inline from A closer look (Block 4).",
    },
    {
      label: "Supporting reference",
      linkKey: "threat-modeling-manifesto" satisfies ExternalLinkKey,
      description:
        "Threat Modeling Manifesto — https://www.threatmodelingmanifesto.org/",
    },
    {
      label: "Supporting reference",
      href: placeholderSourceHref(GC_SECURITY_CATEGORIZATION_INJURY_ASSESSMENT),
      description:
        "GC security categorization (injury assessment) (TBS) — placeholder /source-coming-soon (real link pending).",
      comingSoon: true,
    },
    {
      label: "Supporting reference",
      linkKey: "incident-response-plan-itsap40003" satisfies ExternalLinkKey,
      description:
        "CCCS, Developing your incident response plan (ITSAP.40.003) — what an incident response plan is; linked inline from What good looks like and the Live phase.",
    },
    {
      label: "Supporting reference",
      href: placeholderSourceHref(SECURITY_CATEGORIZATION_OF_SOURCE_CODE),
      description:
        "Security Categorization of Source Code (Guideline annex, TBS) — the open-by-default categorization in Block 3.",
      comingSoon: true,
      gcNetworkOnly: true,
    },
    {
      label: "Supporting reference",
      linkKey: "cccs-top-10-it-security-actions" satisfies ExternalLinkKey,
      description:
        "CCCS Top 10 IT security actions (ITSM.10.089) — https://www.cyber.gc.ca/en/guidance/top-10-it-security-actions-protect-internet-connected-networks-and-information-itsm10089",
    },
    {
      label: "Supporting reference",
      linkKey: "cccs-baseline-cyber-security-sme" satisfies ExternalLinkKey,
      description:
        "CCCS Baseline cyber security controls for small and medium organizations — https://www.cyber.gc.ca/en/guidance/baseline-cyber-security-controls-small-and-medium-organizations",
    },
    {
      label: "Supporting reference",
      linkKey: "cisa-secure-by-design" satisfies ExternalLinkKey,
      description: "US CISA Secure by Design — https://www.cisa.gov/securebydesign",
    },
  ] satisfies SourceItem[],
} as const;
