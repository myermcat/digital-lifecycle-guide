import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PHASES, THREADS } from "@/lib/guide-strings";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import {
  threadLeadPlainText,
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  type ThreadCloserLookBlock,
  type ThreadContentSection,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export type DependenciesAndStandardsLinkedProse = ThreadLinkedProse;
export type DependenciesAndStandardsContentSection = ThreadContentSection;
export type DependenciesAndStandardsWhyItMatters = readonly DependenciesAndStandardsContentSection[];
export type DependenciesAndStandardsCloserLookBlock = ThreadCloserLookBlock;
export type DependenciesAndStandardsPhasePreviewBlock = ThreadPhasePreviewBlock;

export const dependenciesAndStandardsSectionsPlainText = threadSectionsPlainText;
export const dependenciesAndStandardsLeadPlainText = (lead: ThreadLinkedProse) =>
  threadLeadPlainText(lead);
export const dependenciesAndStandardsWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const DEPENDENCIES_AND_STANDARDS_THREAD = {
  title: "Dependencies and standards",
  slug: "dependencies-and-standards" as const,

  lead: {
    text:
      "Almost no service is built from scratch. It is assembled from parts: open-source libraries, third-party services, vendor products, and the formats and protocols that let those parts talk to each other. Dependencies and standards is about choosing and looking after those parts well. It pulls together four habits: build on open standards so the pieces can connect and be swapped; know everything the service depends on; vet a component before you adopt it; and keep what you depend on patched and watched.",
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    {
      text: "The service is built on open standards, so it can connect to other systems and is not tied to one vendor.",
      externalLinks: [
        { phrase: "open standards", linkKey: "open-first-whitepaper-standards" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "A component or provider can be swapped without rebuilding the service, because the pieces are substitutable and there is an exit plan set before going to the cloud.",
      externalLinks: [
        { phrase: "exit plan", linkKey: "isc2-cloud-exit-strategies" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "The team knows everything the service depends on, kept as a current inventory, a software bill of materials, the list of ingredients that make up the software.",
      externalLinks: [
        { phrase: "software bill of materials", linkKey: "cccs-software-supply-chain-itsm10071" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "New components and suppliers are vetted before they are adopted: is it still maintained, is it secure, is it well supported.",
      externalLinks: [
        {
          phrase: "vetted before they are adopted",
          linkKey: "guide-open-source-software",
        },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Dependencies are kept patched, and a known vulnerability is fixed promptly rather than left in place.",
    },
    {
      text: "Contracts set minimum security requirements and require a supplier to report a security incident within a set time.",
      externalLinks: [
        {
          phrase: "minimum security requirements",
          linkKey: "cccs-cyber-supply-chain-smb-itsap00070",
        },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Open-source options are considered first, in line with the Government of Canada's open-first position.",
      externalLinks: [
        { phrase: "open-first position", linkKey: "open-first-whitepaper-oss-use" },
      ] satisfies ExternalPhraseLink[],
    },
  ] satisfies DependenciesAndStandardsLinkedProse[],

  whyItMatters: [
    {
      text:
        "The parts a service is built from are also the ways it can go wrong. There are two risks.",
    },
    {
      type: "orderedList",
      items: [
        {
          bold: "Lock-in.",
          text:
            "When a service is tied to one vendor's proprietary formats, that vendor controls the features, the fixes, and the price, and moving away later costs a great deal. Open standards keep the pieces substitutable, so a service can change one part without rebuilding the rest.",
        },
        {
          text:
            "The supply chain. A flaw or a tampering in a component you did not write becomes your problem. As the Canadian Centre for Cyber Security puts it, an organization is legally responsible for protecting its information even when using third-party services.",
          bold: [{ phrase: "The supply chain." }],
        },
      ],
    },
    {
      text:
        "The Log4j flaw shows why this matters. When it appeared in a logging library used by millions of applications in 2021, the teams who came through it well were the ones who knew exactly where they used it and could patch fast. That is what knowing, vetting, and patching your dependencies buys you.",
      externalLinks: [
        { phrase: "Log4j", linkKey: "cccs-log4j-alert" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text:
        "The Government of Canada's position is to use open source and open standards first, for exactly these reasons.",
    },
  ] satisfies DependenciesAndStandardsWhyItMatters,

  whoseJob: {
    intro: "Dependencies and standards is shared across the team, with each role holding a different part:",
    roles: [
      {
        role: "Developers and architects",
        text: "choose open standards, select and integrate the components, keep the inventory of what the service depends on, and apply patches.",
      },
      {
        role: "Security specialists",
        text: "assess supply-chain risk, watch for new vulnerabilities, and judge whether a component is safe to rely on.",
      },
      {
        role: "Procurement and contracting specialists",
        text: "write the minimum security requirements and notify-on-incident clauses into the contract.",
        internalLinks: [
          {
            phrase: "minimum security requirements and notify-on-incident clauses into the contract",
            to: GOOD_CONTRACT_PATH,
          },
        ] satisfies InternalPhraseLink[],
      },
      {
        role: "The business owner of the application",
        text: "makes sure open options and the cost of lock-in are weighed, funds keeping dependencies current, and accepts that the service is responsible for its parts.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "Open standards keep you free to change.",
        sections: [
          { text: "Two ideas are easy to confuse:" },
          {
            type: "unorderedList",
            items: [
              {
                text: "Open source is a way of building and sharing software, where the code can be used and changed by anyone.",
                bold: [{ phrase: "Open source" }],
                externalLinks: [
                  { phrase: "used and changed by anyone", linkKey: "uk-make-use-of-open-standards" },
                ] satisfies ExternalPhraseLink[],
              },
              {
                text: "Open standards are the common rules, the file formats, protocols, and interfaces, that any product can follow so it works with others.",
                bold: [{ phrase: "Open standards" }],
              },
            ],
          },
          {
            text:
              "Building on open standards keeps a service's parts substitutable: each piece can be swapped for another that does the same job without breaking the rest. That is the practical meaning of avoiding vendor lock-in.",
            bold: [{ phrase: "open standards" }, { phrase: "substitutable" }],
          },
          {
            text:
              "The cost of lock-in is concrete: a vendor you cannot leave controls your features, your fixes, and your price. So the Government of Canada's open-first position asks teams to factor exit and transition costs into the total cost of ownership, and to set an exit strategy before committing to a cloud service.",
            bold: [{ phrase: "set an exit strategy before committing to a cloud service" }],
          },
        ],
      },
      {
        title: "Know and vet what you depend on.",
        sections: [
          {
            text:
              "You cannot look after what you cannot see. So the starting point is an inventory of everything the service depends on, a software bill of materials, which is a list of ingredients that make up the software.",
            bold: [{ phrase: "software bill of materials" }],
          },
          {
            text: "Before adopting a new component, give it a quick health check. The GC guide to using open source software suggests looking at:",
            externalLinks: [
              { phrase: "GC guide to using open source software", linkKey: "guide-open-source-software" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "unorderedList",
            items: [
              {
                text: "whether the project is still actively maintained;",
                bold: [{ phrase: "actively maintained" }],
              },
              { text: "who develops it;", bold: [{ phrase: "who develops" }] },
              { text: "how well it is documented;", bold: [{ phrase: "documented" }] },
              {
                text: "how quickly it patches security flaws.",
                bold: [{ phrase: "patches" }],
              },
            ],
          },
          {
            text:
              "Tools can do much of this for you. An open-source health score rates a project out of ten on checks like whether it is still maintained and whether it keeps its own dependencies up to date, so a team can judge the risk of adding it.",
            externalLinks: [
              { phrase: "open-source health score", linkKey: "openssf-scorecard" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Keep the supply chain safe.",
        sections: [
          {
            text: "A weak link anywhere in the chain is a risk to the whole service, so a few habits matter.",
          },
          {
            text:
              "Patch your dependencies. A known vulnerability left in place is an open door, and your inventory is what lets you find every place a flawed component is used the moment a flaw is announced.",
            bold: [{ phrase: "Patch your dependencies." }],
          },
          {
            text:
              "Hold your suppliers to a standard. For the parts that come from vendors, the Canadian Centre for Cyber Security advises:",
            bold: [{ phrase: "Hold your suppliers to a standard." }],
          },
          {
            type: "unorderedList",
            items: [
              "know your vendors;",
              "set minimum security requirements;",
              "put a clause in the contract that the supplier must report a security incident within a set time.",
            ],
          },
          {
            text:
              "Three questions turn vague trust into something you can check: does the vendor keep a software bill of materials, how fast do they patch, and how would they notify you?",
          },
        ],
      },
    ] satisfies DependenciesAndStandardsCloserLookBlock[],
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Two ways to handle dependencies",
    risky: {
      heading: "Vell",
      framing: "Meet Vell, a service manager. They built the case-management system on whatever was quickest:",
      items: [
        "built it on one vendor's proprietary formats, with no exit plan",
        "never tracked what the service depended on",
        "pulled in open-source components without checking them, and rarely patched",
      ],
      closing:
        "The result: when a widely used library turned out to have a critical flaw, they could not tell whether they were affected or where, and the vendor quoted a fortune to make a change they could not make themselves.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing: "Meet Pax, a service manager. They treated the parts as something to look after:",
      items: [
        "built on open standards and kept an exit plan, so a vendor could be changed",
        "kept a current inventory of every component and where it came from",
        "vetted new components for being maintained and secure, patched promptly, and required suppliers to report incidents fast",
      ],
      closing:
        "The result: when the same flaw appeared, they knew within hours exactly where the library was used and patched it, and no vendor could hold the service hostage.",
    } satisfies CaseStudySide,
  },

  byPhase: {
    id: "by-phase",
    title: "What Dependencies and standards looks like in each phase",
    intro: "Choosing and tending the parts is work across the whole life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "Choose open standards and pick parts deliberately.",
        popup: [
          {
            text:
              "The choices that matter most are made before the service is built. The team builds on open standards so the pieces stay substitutable, picks each dependency deliberately and starts the inventory, sets an exit strategy before committing to a cloud provider, and works with procurement to put security and notify-on-incident requirements in the contract. Designing to connect through open interfaces from the start is far easier than retrofitting it.",
            internalLinks: [
              { phrase: "procurement", to: THREADS.procurement.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Keep the inventory current and patch.",
        popup: [
          {
            text:
              "Once the service is running, this work is continuous. The team keeps the inventory of dependencies up to date, watches for newly discovered vulnerabilities and patches them promptly, and re-evaluates suppliers from time to time. A patch only protects users once it is released, so keeping dependencies current and getting the fix out go together.",
            internalLinks: [
              { phrase: "patches them promptly", to: THREADS.security.path },
              { phrase: "released", to: THREADS["releasing-changes"].path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Standards make the move possible.",
        popup: [
          {
            text:
              "When a service is retired or replaced, the earlier choices pay off. Open standards make the data and components portable to whatever comes next, so the move is not a rebuild, vendor contracts are ended cleanly, and the exit strategy set back at the start is what makes leaving possible without losing the data.",
            internalLinks: [
              { phrase: "retired or replaced", to: PHASES.sunset.href },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
    ] satisfies DependenciesAndStandardsPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Beyond the sources already linked above, the Government of Canada's Open Resource Exchange lets you browse the open standards and open-source software other Canadian public administrations already use, so you can reuse a vetted solution rather than start from nothing. For the supply-chain side, NIST's cybersecurity supply chain risk management practices set out how a large organization identifies, assesses, and manages the risk in the products and services it buys, and the Secure Software Development Framework gives you a shared checklist of secure-build practices to ask a supplier about during procurement.",
    externalLinks: [
      { phrase: "Open Resource Exchange", linkKey: "gc-open-resource-exchange" },
      {
        phrase: "cybersecurity supply chain risk management practices",
        linkKey: "nist-sp-800-161-cscrm",
      },
      {
        phrase: "Secure Software Development Framework",
        linkKey: "nist-ssdf",
      },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "guide-open-source-software" satisfies ExternalLinkKey,
      description:
        "GC Guide for Using Open Source Software (TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/guide-for-using-open-source-software.html",
    },
    {
      label: "Governing instrument",
      linkKey: "open-first-whitepaper-standards" satisfies ExternalLinkKey,
      description:
        "Open First Whitepaper: Open Standards (TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/open-first-whitepaper/open-first-whitepaper-standards.html",
    },
    {
      label: "Governing instrument",
      linkKey: "cccs-software-supply-chain-itsm10071" satisfies ExternalLinkKey,
      description:
        "CCCS, Protecting your organization from software supply chain threats (ITSM.10.071) — https://www.cyber.gc.ca/en/guidance/protecting-your-organization-software-supply-chain-threats-itsm10071",
    },
    {
      label: "Supporting reference",
      linkKey: "cccs-cyber-supply-chain-smb-itsap00070" satisfies ExternalLinkKey,
      description:
        "CCCS, Cyber supply chain security for small and medium organizations (ITSAP.00.070) — https://www.cyber.gc.ca/en/guidance/cyber-supply-chain-security-small-medium-sized-organizations-itsap00070",
    },
    {
      label: "Supporting reference",
      linkKey: "cccs-log4j-alert" satisfies ExternalLinkKey,
      description:
        "CCCS, Active exploitation of Apache Log4j vulnerability — the Cyber Centre's Log4j (Log4Shell) alert. — https://www.cyber.gc.ca/en/alerts/active-exploitation-apache-log4j-vulnerability",
    },
    {
      label: "Supporting reference",
      linkKey: "gc-use-open-standards-solutions" satisfies ExternalLinkKey,
      description:
        'GC "Use open standards and solutions" (Guideline 4, TBS) — https://canada-ca.github.io/gcdigital-tools_outils-numeriquesgc/en/4-use-open-standards-solutions.html',
    },
    {
      label: "Supporting reference",
      linkKey: "open-first-whitepaper-oss-use" satisfies ExternalLinkKey,
      description:
        "Open First Whitepaper: Open Source Software Use (TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/open-source-software/open-first-whitepaper/open-first-whitepaper-use.html",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-make-use-of-open-standards" satisfies ExternalLinkKey,
      description: "GOV.UK, Make use of open standards — https://www.gov.uk/guidance/make-use-of-open-standards",
    },
    {
      label: "Supporting reference",
      linkKey: "cisa-sbom" satisfies ExternalLinkKey,
      description: "CISA, Software Bill of Materials (SBOM) — https://www.cisa.gov/sbom",
    },
    {
      label: "Supporting reference",
      linkKey: "openssf-scorecard" satisfies ExternalLinkKey,
      description: "OpenSSF Scorecard — https://openssf.org/projects/scorecard/",
    },
    {
      label: "Supporting reference",
      linkKey: "slsa" satisfies ExternalLinkKey,
      description: "SLSA, Supply-chain Levels for Software Artifacts — https://slsa.dev/",
    },
    {
      label: "Supporting reference",
      linkKey: "gc-open-resource-exchange" satisfies ExternalLinkKey,
      description: "GC Open Resource Exchange (TBS) — https://code.open.canada.ca/en/index.html",
    },
    {
      label: "Supporting reference",
      linkKey: "nist-sp-800-161-cscrm" satisfies ExternalLinkKey,
      description:
        "NIST SP 800-161 Rev. 1, Cybersecurity Supply Chain Risk Management Practices for Systems and Organizations — https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
    },
    {
      label: "Supporting reference",
      linkKey: "nist-ssdf" satisfies ExternalLinkKey,
      description:
        "NIST SP 800-218, Secure Software Development Framework (SSDF) Version 1.1 — https://csrc.nist.gov/pubs/sp/800/218/final",
    },
  ] satisfies SourceItem[],
} as const;
