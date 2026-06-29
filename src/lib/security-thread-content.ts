import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type {
  ExternalPhraseLink,
  InternalPhraseLink,
  PlaceholderGcNetworkPhraseLink,
} from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import {
  COMPONENT_END_OF_LIFE_GUIDANCE,
  placeholderSourceHref,
  SECURE_APPLICATION_DEVELOPMENT_GUIDELINE,
  SECURE_APPLICATION_DEVELOPMENT_GUIDELINE_SHORT,
  SECURITY_CATEGORIZATION_OF_SOURCE_CODE,
  type PlaceholderPhraseLink,
} from "@/lib/placeholder-sources";
import type { ThreadContentSection, ThreadLinkedProse } from "@/lib/thread-rich-content";
import type { ThreadCoreStripTile } from "@/lib/thread-core-strip";

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

export type SecurityLifecycleContent = {
  heading: string;
  tiles: readonly ThreadCoreStripTile[];
  framing: SecurityLinkedProse;
};

export const SECURITY_THREAD = {
  title: "Security",
  slug: "security" as const,

  lead:
    "Security runs through the whole life of a service, from the first design sketch to the day it is turned off. A service that was safe at launch drifts out of date as the threats around it change and its software ages, so security is work that never quite stops. The same five questions come round again and again: what is at risk, how do we defend it, how do we spot trouble, how do we contain it, and how do we recover. Those five make up the security lifecycle.",

  securityLifecycle: {
    heading: "THE SECURITY LIFECYCLE",
    tiles: [
      { label: "Identify", gloss: "know what is at risk" },
      { label: "Protect", gloss: "build the defenses" },
      { label: "Detect", gloss: "spot trouble fast" },
      { label: "Respond", gloss: "contain it" },
      { label: "Recover", gloss: "restore and learn" },
    ],
    framing: {
      text:
        "These are the five functions of the recognizable security lifecycle, the model the Government of Canada works in: Canada's ITSG-33 sets out the GC IT-security risk-management lifecycle, the Canadian Centre for Cyber Security publishes the guidance under it, and the same five functions are the international frame of the NIST Cybersecurity Framework.",
      externalLinks: [
        { phrase: "ITSG-33", linkKey: "itsg-33" },
        { phrase: "NIST Cybersecurity Framework", linkKey: "nist-cyberframework" },
      ] satisfies ExternalPhraseLink[],
    },
  } satisfies SecurityLifecycleContent,

  whatGoodLooksLike: [
    {
      text: "Security is planned and funded from the start, with the risks worked out before any code is written.",
    },
    {
      text: "Access follows least privilege, meaning each person and system gets only the access they need, and that access is audited.",
      externalLinks: [
        { phrase: "least privilege", linkKey: "least-privilege-itsap10094" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Patches are applied on a schedule and the application is tested for vulnerabilities on a regular basis.",
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
      text: "The service can be brought back after an incident, and the lesson is fed back into the design.",
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
      internalLinks: [
        { phrase: "inventoried and watched for known problems", to: THREADS["dependencies-and-standards"].path },
      ] satisfies InternalPhraseLink[],
    },
  ] satisfies SecurityLinkedProse[],

  whyItMatters: {
    text:
      "When security fails, a service can go offline or leak people's personal information, and public trust is slow to rebuild. The most common causes are mundane: an unpatched component, a default password, a permission left too wide. Each of the five functions is a guard against a different failure, and the cycle only holds if none of them is skipped. Catching a flaw early also costs less, because one designed in and found late is the most expensive kind to undo. The Government of Canada's guide for all of this is the Guideline on Secure Application Development, which covers building security into each stage of development, secure coding, handling third-party components, and managing vulnerabilities. It is where the team goes for the how-to.",
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
        text: "of the application makes sure security is planned and paid for from the start, approves the plan for handling threats, accepts the risk that remains after the fixes, and gives the deploy go-ahead (the formal approval that lets a service go live).",
      },
    ],
  },

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "Identify, work out what is at risk.",
        sections: [
          {
            text:
              "Two questions sit under Identify: what could go wrong, and how sensitive is the information.",
          },
          {
            text:
              "Threat modeling tells you what could go wrong. The clearest way in at the design stage is to ask four plain questions:",
            bold: [{ phrase: "what could go wrong" }],
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
            text: "That is a threat model, and the four questions come from the Threat Modeling Manifesto.",
            externalLinks: [
              { phrase: "threat model", linkKey: "threat-modelling-developers" },
              { phrase: "Threat Modeling Manifesto", linkKey: "threat-modeling-manifesto" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text:
              "Security categorization tells you how sensitive the information is. The Government of Canada has its own tool for this, an injury assessment that rates the harm a compromise would cause across economic, physical, well-being, and reputation, and sets the protection level from it: Protected B, Secret, or Top Secret. The greater the harm, the more protection it earns. The Standard on Security Categorization sets out how that call is made.",
            bold: [{ phrase: "how sensitive the information is" }],
            externalLinks: [
              {
                phrase: "Standard on Security Categorization",
                linkKey: "standard-on-security-categorization",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text: "You rate threats by",
          },
          {
            type: "formula",
            text: "RISK = LIKELIHOOD x IMPACT",
          },
          {
            text:
              "In the Government of Canada, the tool that does this is a Threat and Risk Assessment (TRA), the risk-management approach in ITSG-33. A TRA takes three things and ranks the risks so you know what to protect most:",
            externalLinks: [
              {
                phrase: "Threat and Risk Assessment (TRA)",
                linkKey: "harmonized-tra-methodology",
              },
              { phrase: "ITSG-33", linkKey: "itsg-33" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              {
                text: "the threats, from your threat model;",
                bold: [{ phrase: "threats" }],
              },
              {
                text: "the sensitivity of the information, from categorization;",
                bold: [{ phrase: "sensitivity" }],
              },
              {
                text: "the likelihood that each threat actually happens.",
                bold: [{ phrase: "likelihood" }],
              },
            ],
          },
          {
            text:
              "So protect the few things that matter most, robustly, rather than protecting everything to the same high standard. Trying to protect everything equally runs up cost overruns, delays, or protection so watered down it helps nowhere. Find the crown jewels first, then guard them well.",
            bold: [{ phrase: "protect the few things that matter most" }],
          },
          {
            type: "editorialNote",
            label: "Example",
            paragraphs: [
              {
                text:
                  "The COVID Alert app worked by having phones swap anonymous random codes over Bluetooth; if someone later tested positive, those codes were used to warn the people they had recently been near. The one thing that would cause real harm was the code that could trigger a 'you were exposed' alert, so the security effort was concentrated there, with safeguards that stopped anyone sending fake alerts.",
                externalLinks: [
                  { phrase: "COVID Alert app", linkKey: "covid-alert-privacy-assessment" },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text:
                  "The opposite extreme makes the same point. A Top Secret room is built for the most sensitive work, so it is small, windowless, and costs a fortune. Mark everything Top Secret and the whole team would have to crowd into that one room to get anything done. So scope what genuinely needs that level.",
              },
            ],
          },
        ],
      },
      {
        title: "Protect, build the defenses.",
        sections: [
          {
            text:
              "Protect turns what Identify found into the actual defenses. Use secure design and secure defaults, so the safe option is the default one. Three defenses do most of the work:",
            bold: [{ phrase: "Protect" }, { phrase: "Identify" }],
          },
          {
            type: "unorderedList",
            items: [
              "give each person and system only the access they need;",
              "encrypt the data that matters;",
              "keep the service current by patching on a schedule.",
            ],
          },
          {
            text: "Security requirements are written into the contract so the supplier is held to them rather than asked nicely later.",
            internalLinks: [
              { phrase: "written into the contract", to: GOOD_CONTRACT_PATH },
            ] satisfies InternalPhraseLink[],
          },
          {
            text:
              'Open by default. Government of Canada code is open by default. Teams often label all of their code "Protected B" out of habit, but most source code holds no secrets and can be unclassified, and a good deal of it can be published openly. Open code invites more eyes, and more eyes catch more flaws, so hiding code is a weak way to keep it safe. The source-code categorization is a deliberate decision the business owner makes with the team: public and open to contributions, public but closed to them, fully private, or genuinely Protected B.',
            bold: [{ phrase: "Open by default." }],
            placeholderGcNetworkLinks: [
              {
                phrase: "source-code categorization",
                source: SECURITY_CATEGORIZATION_OF_SOURCE_CODE,
              },
            ] satisfies PlaceholderGcNetworkPhraseLink[],
            externalLinks: [
              { phrase: "open by default", linkKey: "guide-open-source-software" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text:
              "To level up these defenses over time, the OWASP DevSecOps Maturity Model is a ladder a service can be placed on without reading a line of code. It runs from Level 0, no real security in place, up through ad hoc, defined, and integrated, to Level 4, where security is automated and measured. Knowing the level points to the one thing worth improving next, instead of trying to fix everything at once.",
            externalLinks: [
              { phrase: "OWASP DevSecOps Maturity Model", linkKey: "owasp-dsomm" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Detect, spot trouble fast.",
        sections: [
          {
            text:
              "You cannot prevent everything, so Detect is the half that catches what gets through. Monitoring and alerting flag unusual activity, and what counts is how fast you notice. Monitoring the service in production is where this lives once the service is running.",
            internalLinks: [
              {
                phrase: "Monitoring the service in production",
                to: THREADS["monitoring-and-instrumentation"].path,
              },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Respond, contain it.",
        sections: [
          {
            text:
              "When something is spotted, Respond shuts it down quickly instead of weeks later. A rehearsed incident response plan means the team has practised the steps in advance, so a problem is caught and contained rather than left to spread.",
            externalLinks: [
              { phrase: "incident response plan", linkKey: "incident-response-plan-itsap40003" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Recover, restore and learn.",
        sections: [
          {
            text:
              "Recover brings the service and its data back after an incident, then closes the gap that let it happen. The lesson feeds back into Identify and Protect, so the same failure does not return. That is what makes the lifecycle a cycle rather than a line.",
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
    intro:
      "The five functions are present throughout, but their weight shifts across the life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "Identify and Protect are designed in, before any code is written.",
        popup: [
          {
            text:
              'This is where Identify and Protect are designed in, before any code is written. The team builds a threat model to set out what could go wrong and who might attack the service (the threat model itself lives in the Identify block of "A closer look").',
          },
          {
            text:
              "The team then chooses secure defaults so the safe option is the default one, and sets how the service will handle identity and access. Security requirements are written into the contract so the supplier is held to them. A weakness fixed at the design stage costs far less than one found in production.",
            internalLinks: [
              { phrase: "written into the contract", to: GOOD_CONTRACT_PATH },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Protect, Detect, Respond, and Recover run continuously.",
        popup: [
          {
            text:
              "Once the service is running, the Protect, Detect, Respond, and Recover functions are all running at once, and the work is continuous. It splits into two halves:",
          },
          {
            type: "orderedList",
            items: [
              {
                text:
                  "Prevention (Protect). Keep the service hardened and current: apply patches on a schedule, scan for new vulnerabilities, and check each release for security problems before it goes out, with the business owner giving the final go-ahead.",
                bold: [{ phrase: "Prevention (Protect)." }],
                externalLinks: [
                  {
                    phrase: "scan for new vulnerabilities",
                    linkKey: "guideline-vulnerability-management",
                  },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text:
                  "Detection and response (Detect, Respond, Recover). You cannot prevent everything, so this half matters just as much: monitor the service in production to catch unusual activity, and keep a rehearsed incident response plan so a problem is contained quickly instead of found weeks later, and the service brought back after.",
                bold: [{ phrase: "Detection and response (Detect, Respond, Recover)." }],
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
        popup: [
          {
            text:
              "A service is eventually retired or replaced, and security has work right to the end. As it is wound down, the team revokes access and credentials, moves or destroys data under its retention rules, and shuts off the connections to other systems so nothing is left hanging. Source code is disposed of the approved way, with extra care for anything categorized Protected B.",
            internalLinks: [
              { phrase: "retired or replaced", to: PHASES.sunset.href },
              { phrase: "moves or destroys data", to: THREADS["data-stewardship"].path },
            ] satisfies InternalPhraseLink[],
          },
          {
            text:
              "Most of this is easier when you plan and fund retiring a component up front. Technology that runs past its end-of-support date stops getting patches, so known vulnerabilities pile up until it is trivially exploitable. Lifecycle replacement should be budgeted from the start rather than run at risk.",
            placeholderLinks: [
              {
                phrase: "retiring a component",
                source: COMPONENT_END_OF_LIFE_GUIDANCE,
              },
            ] satisfies PlaceholderPhraseLink[],
          },
          {
            text:
              "When hardware is finally decommissioned or donated, securely erase all the data on it first, so nothing walks out the door on a disposed drive.",
          },
        ],
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
        "ITSG-33, IT security risk management, a lifecycle approach (CCCS) — the GC IT-security risk-management lifecycle and control catalogue; the Canadian-first frame for the five functions, linked inline from \"The security lifecycle\" and the Identify block (the TRA).",
    },
    {
      label: "Supporting reference",
      linkKey: "nist-cyberframework" satisfies ExternalLinkKey,
      description:
        "NIST Cybersecurity Framework (NIST) — the international frame for the five functions Identify, Protect, Detect, Respond, Recover; linked inline from \"The security lifecycle.\"",
    },
    {
      label: "Supporting reference",
      linkKey: "harmonized-tra-methodology" satisfies ExternalLinkKey,
      description:
        "Harmonized Threat and Risk Assessment (TRA) methodology (CCCS) — https://www.cyber.gc.ca/en/tools-services/harmonized-tra-methodology — linked inline from the Identify block.",
    },
    {
      label: "Supporting reference",
      linkKey: "owasp-top-10" satisfies ExternalLinkKey,
      description: "OWASP Top 10 — the common web-application risks behind \"basic things left undone.\"",
    },
    {
      label: "Supporting reference",
      linkKey: "owasp-dsomm" satisfies ExternalLinkKey,
      description: "OWASP DevSecOps Maturity Model (DSOMM) — the maturity ladder in the Protect block.",
    },
    {
      label: "Supporting reference",
      linkKey: "guide-open-source-software" satisfies ExternalLinkKey,
      description:
        "Guide for Using Open Source Software (GC) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/guide-for-using-open-source-software.html — the GC open-source position behind 'open by default'; linked inline from the Protect block.",
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
        "CCCS, Threat Modelling for Developers — what a threat model is; linked inline from the Identify block.",
    },
    {
      label: "Supporting reference",
      linkKey: "threat-modeling-manifesto" satisfies ExternalLinkKey,
      description:
        "Threat Modeling Manifesto — the four plain questions behind threat modeling; linked inline from the Identify block.",
    },
    {
      label: "Supporting reference",
      linkKey: "standard-on-security-categorization" satisfies ExternalLinkKey,
      description:
        "Standard on Security Categorization (Directive on Security Management, Appendix J, TBS) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32614 — linked inline from the Identify block.",
    },
    {
      label: "Supporting reference",
      linkKey: "covid-alert-privacy-assessment" satisfies ExternalLinkKey,
      description:
        "COVID Alert privacy assessment (Health Canada / CDS) — the crown-jewels worked example in the Identify block (security concentrated on the random exposure codes, with anti-spam safeguards against fake alerts).",
    },
    {
      label: "Supporting reference",
      linkKey: "incident-response-plan-itsap40003" satisfies ExternalLinkKey,
      description:
        "CCCS, Developing your incident response plan (ITSAP.40.003) — what an incident response plan is; linked inline from What good looks like, the Respond block, and the Live phase.",
    },
    {
      label: "Supporting reference",
      href: placeholderSourceHref(SECURITY_CATEGORIZATION_OF_SOURCE_CODE),
      description:
        "Security Categorization of Source Code (Guideline annex, TBS) — source-code categorization in the Protect block.",
      comingSoon: true,
      gcNetworkOnly: true,
    },
    {
      label: "Supporting reference",
      linkKey: "gcpedia-security-categorization-tool" satisfies ExternalLinkKey,
      description:
        "Security Categorization Tool (GCpedia) — https://www.gcpedia.gc.ca/wiki/Security_Categorization_Tool",
    },
    {
      label: "Supporting reference",
      linkKey: "gcpedia-esa-tools" satisfies ExternalLinkKey,
      description: "ESA Tools (GCpedia) — https://www.gcpedia.gc.ca/wiki/ESA_Tools",
    },
    {
      label: "Supporting reference",
      linkKey: "cccs-top-10-it-security-actions" satisfies ExternalLinkKey,
      description:
        "CCCS Top 10 IT security actions (ITSM.10.089) — the ranked defences that buy down the most risk; further reading.",
    },
    {
      label: "Supporting reference",
      linkKey: "cccs-baseline-cyber-security-sme" satisfies ExternalLinkKey,
      description:
        "CCCS Baseline cyber security controls for small and medium organizations — a plainer starting set of controls for a smaller service; further reading.",
    },
    {
      label: "Supporting reference",
      linkKey: "cisa-secure-by-design" satisfies ExternalLinkKey,
      description: "US CISA Secure by Design — the case for designing security in rather than bolting it on; further reading.",
    },
  ] satisfies SourceItem[],
} as const;
