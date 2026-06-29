import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink, BoldPhrase } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import { GOOD_CONTRACT_PATH, SOO_VS_SOW_PATH } from "@/lib/reference-paths";

export { GOOD_CONTRACT_PATH };

export type GoodContractScheduleTag = "standard" | "tailored";

export type GoodContractLinkedProse = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
  internalLinks?: InternalPhraseLink[];
  anchorLinks?: { phrase: string; hash: string }[];
  bold?: BoldPhrase[];
};

export type GoodContractArticle = {
  number: number;
  title: string;
  text: string;
};

export type GoodContractClause = {
  label: string;
  text: string;
  externalLinks?: ExternalPhraseLink[];
};

export type GoodContractSchedule = {
  id: string;
  letter: string;
  title: string;
  heading: string;
  tag: GoodContractScheduleTag;
  purpose: string;
  clauses: readonly GoodContractClause[];
  whyHere: GoodContractLinkedProse;
};

export type GoodContractSimplificationNote = {
  lead: string;
  paragraphs: readonly GoodContractLinkedProse[];
  expansionList: readonly string[];
  closing: string;
};

export function goodContractSimplificationNoteText(note: GoodContractSimplificationNote) {
  return [
    note.lead,
    ...note.paragraphs.map((paragraph) => paragraph.text),
    ...note.expansionList,
    note.closing,
  ].join(" ");
}

export const GOOD_CONTRACT = {
  title: "What a good contract looks like",

  lead: [
    {
      text:
        "When you buy or build a service with a supplier, the contract is where the promises live. The rest of the playbook keeps telling you to put things in the contract. This page puts them all in one place and shows them as a real contract would look, for our example service, the grant portal.",
    },
    {
      text:
        "This is a tour of a sample contract, not a legal template and not the authority. The rules that govern federal contracts sit with PSPC, the Directive on the Management of Procurement, and CanadaBuys. For how to run the buying itself, see the Procurement thread. This page is only about what a good agreement should contain.",
      externalLinks: [
        { phrase: "Directive on the Management of Procurement", linkKey: "directive-procurement" },
        { phrase: "CanadaBuys", linkKey: "canadabuys" },
      ] satisfies ExternalPhraseLink[],
      internalLinks: [
        { phrase: "Procurement thread", to: THREADS.procurement.path },
      ] satisfies InternalPhraseLink[],
    },
  ],

  exampleNote:
    "Everything below is written for the grant portal. The clauses, and the bracketed details like dates and percentages, are things you set for your own service. Treat this as a worked example to adapt, not text to copy.",

  simplificationNote: {
    lead: "These clauses are shortened.",
    paragraphs: [
      {
        text:
          "We boiled each promise down to a line or two so you can see the whole contract on one page. A real one spells each out in full.",
      },
      {
        text:
          "As written, they would also make poor requirements. 'Hand over the service in good order' is vague: you could not hold a supplier to it, or check whether they had done it.",
        bold: [{ phrase: "poor requirements" }],
      },
      {
        text:
          "A good requirement is specific, measurable, and testable. Schedule I's 'good order' would become a list you can check off:",
        bold: [{ phrase: "specific, measurable, and testable" }],
      },
    ],
    expansionList: [
      "a complete copy of the data in an agreed open format",
      "the source code and configuration",
      "current documentation and a runbook",
      "a register of every third-party component and its licence",
      "a set number of days of support while a new team takes over",
    ],
    closing:
      "Read each clause below as the short version of something a real contract spells out, and makes testable, in full.",
  } satisfies GoodContractSimplificationNote,

  howToRead: {
    intro: [
      {
        text:
          "A real contract is built from parts. There is a short main agreement, the Articles of Agreement, and then the detail is attached at the back in numbered sections called schedules (a contract word, some lawyers say annexes or appendices). We use the contract's own words here so the page reads like the real thing you would sign. It is shortened and plain, but laid out the way a real one is.",
        bold: [{ phrase: "schedules" }],
      },
      {
        text:
          "Some schedules are in almost every service contract, the standard backbone: the statement of work, the price, the service levels, and how the supplier hands the service back at the end. Others are added to fit the particular service. The grant portal holds people's personal and financial information, so it carries schedules for security, privacy, accessibility, the parts it is built from, and the data it keeps.",
      },
      {
        text: "So each schedule below carries a tag:",
      },
    ] satisfies GoodContractLinkedProse[],
  },

  contractTitle: "Contract for the grant portal",

  parties:
    "This Agreement is between His Majesty the King in right of Canada, represented by the department (Canada), and the Supplier.",

  articlesHeading: "Articles of Agreement",

  articles: [
    {
      number: 1,
      title: "The work.",
      text:
        "The Supplier shall deliver and operate the grant portal, the online service people use to apply for and manage grants and contributions, as set out in Schedule A.",
    },
    {
      number: 2,
      title: "Term.",
      text:
        "This Agreement runs for three years from the start date, with two optional one-year extensions at Canada's choice.",
    },
    {
      number: 3,
      title: "Price.",
      text: "Canada shall pay the Supplier as set out in Schedule B.",
    },
    {
      number: 4,
      title: "The Supplier's obligations.",
      text: "The Supplier shall meet the requirements in Schedules C through I.",
    },
    {
      number: 5,
      title: "Oversight.",
      text:
        "Canada may verify the Supplier's compliance with this Agreement at any time, and the Supplier shall give Canada the access and evidence needed to do so.",
    },
    {
      number: 6,
      title: "Order of precedence.",
      text: "If a Schedule conflicts with these Articles, the Articles prevail.",
    },
  ] satisfies GoodContractArticle[],

  schedulesClosing: "The Schedules attached form part of this Agreement.",

  schedules: [
    {
      id: "schedule-a",
      letter: "A",
      title: "Statement of Work",
      heading: "Schedule A — Statement of Work",
      tag: "standard",
      purpose: "What the supplier is hired to build and run.",
      clauses: [
        {
          label: "A.1",
          text: "The Supplier shall design, build, and operate the grant portal so an applicant can create an account, apply for a grant, upload documents, and track a decision.",
        },
        {
          label: "A.2",
          text: "The Supplier shall meet the delivery dates set out in this Schedule.",
        },
        {
          label: "A.3",
          text: "The Supplier shall provide the people and skills needed to run the service for the Term.",
        },
      ],
      whyHere: {
        text:
          "every contract names the work it is buying (the General Conditions of a Service Contract). More on this: statement of objectives vs statement of work.",
        externalLinks: [
          {
            phrase: "General Conditions of a Service Contract",
            linkKey: "psc-general-conditions-service-contract",
          },
        ] satisfies ExternalPhraseLink[],
        internalLinks: [
          {
            phrase: "statement of objectives vs statement of work",
            to: SOO_VS_SOW_PATH,
          },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-b",
      letter: "B",
      title: "Basis of Payment",
      heading: "Schedule B — Basis of Payment",
      tag: "standard",
      purpose: "The price, and what triggers each payment.",
      clauses: [
        {
          label: "B.1",
          text: "Canada shall pay the Supplier a fixed monthly fee to operate the service, and milestone payments on delivery, as set out in this Schedule.",
        },
        {
          label: "B.2",
          text: "The Supplier shall invoice monthly, and Canada shall pay within thirty days of accepting a correct invoice.",
        },
        {
          label: "B.3",
          text: "Paying an invoice does not waive Canada's right to later reject work that does not meet this Agreement.",
        },
      ],
      whyHere: {
        text:
          "Why this is here: every contract sets out what is paid and when (the General Conditions of a Service Contract, linked under Schedule A).",
        anchorLinks: [
          {
            phrase: "General Conditions of a Service Contract",
            hash: "schedule-a",
          },
        ],
      },
    },
    {
      id: "schedule-c",
      letter: "C",
      title: "Service Levels",
      heading: "Schedule C — Service Levels",
      tag: "standard",
      purpose: "How well the service must run, not only that it exists.",
      clauses: [
        {
          label: "C.1",
          text: "The Supplier shall keep the service available at least 99.5 percent of the time each month.",
        },
        {
          label: "C.2",
          text: "The Supplier shall respond to a critical fault within one hour and resolve it within the time set in this Schedule.",
        },
        {
          label: "C.3",
          text: "The Supplier shall report on these service levels each month, so Canada can see them being met.",
        },
        {
          label: "C.4",
          text: "If the Supplier misses a service level, service credits apply as set out in this Schedule.",
        },
      ],
      whyHere: {
        text:
          "Why this is here: service levels are an essential element of a service agreement (TBS Guideline on Service Agreements).",
        externalLinks: [
          {
            phrase: "Guideline on Service Agreements",
            linkKey: "tbs-service-agreements-essential-elements",
          },
        ] satisfies ExternalPhraseLink[],
      },
    },
    {
      id: "schedule-d",
      letter: "D",
      title: "Security",
      heading: "Schedule D — Security",
      tag: "tailored",
      purpose:
        "Security is not automatic in every contract. It is triggered when the service handles sensitive information, and the grant portal holds personal and financial data, so it is written in here.",
      clauses: [
        {
          label: "D.1",
          text: "The Supplier shall meet the security requirements set out in the Security Requirements Check List for this contract.",
          externalLinks: [
            {
              phrase: "Security Requirements Check List",
              linkKey: "tbs-srcl-350-103",
            },
          ] satisfies ExternalPhraseLink[],
        },
        {
          label: "D.2",
          text: "The Supplier shall report a security incident to Canada within 24 hours of detecting it.",
        },
        {
          label: "D.3",
          text: "The Supplier shall allow Canada to assess its security controls before go-live and during the Term.",
        },
      ],
      whyHere: {
        text:
          "Why this is here: required through the GC Contract Security Program. More in the Security thread.",
        externalLinks: [
          {
            phrase: "Contract Security Program",
            linkKey: "pspc-security-requirements-contracting",
          },
        ] satisfies ExternalPhraseLink[],
        internalLinks: [
          { phrase: "Security thread", to: THREADS.security.path },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-e",
      letter: "E",
      title: "Privacy",
      heading: "Schedule E — Privacy",
      tag: "tailored",
      purpose: "A supplier handling personal information is bound to protect it.",
      clauses: [
        {
          label: "E.1",
          text: "The Supplier shall use personal information only to deliver the service, and only as this Agreement allows.",
        },
        {
          label: "E.2",
          text: "The Supplier shall apply the safeguards and access controls set out in Canada's Privacy Impact Assessment.",
        },
        {
          label: "E.3",
          text: "The Supplier shall keep and dispose of personal information as Canada's retention and disposition plan directs.",
        },
        {
          label: "E.4",
          text: "The Supplier shall accept responsibility for a breach it causes, notify Canada without delay, and bind any subcontractor to these same terms.",
        },
      ],
      whyHere: {
        text:
          "Why this is here: the TBS guidance on taking privacy into account before contracting. More in the Privacy thread.",
        externalLinks: [
          {
            phrase: "taking privacy into account before contracting",
            linkKey: "tbs-privacy-before-contracting",
          },
        ] satisfies ExternalPhraseLink[],
        internalLinks: [
          { phrase: "Privacy thread", to: THREADS.privacy.path },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-f",
      letter: "F",
      title: "Accessibility",
      heading: "Schedule F — Accessibility",
      tag: "tailored",
      purpose: "So everyone, including people with disabilities, can use the service.",
      clauses: [
        {
          label: "F.1",
          text: "The product shall meet EN 301 549, which includes WCAG 2.1 AA for the web.",
          externalLinks: [
            { phrase: "EN 301 549", linkKey: "can-asc-en-301-549" },
          ] satisfies ExternalPhraseLink[],
        },
        {
          label: "F.2",
          text: "The Supplier shall provide an Accessibility Conformance Report and update it on each significant release, or at least once a year.",
        },
        {
          label: "F.3",
          text: "Accessibility applies to documents and any mobile app, not only the website.",
        },
      ],
      whyHere: {
        text:
          "Why this is here: the GC guide to including accessibility in ICT procurement. More in the Accessibility thread.",
        externalLinks: [
          {
            phrase: "guide to including accessibility in ICT procurement",
            linkKey: "a11y-ict-procurement-guide",
          },
        ] satisfies ExternalPhraseLink[],
        internalLinks: [
          { phrase: "Accessibility thread", to: THREADS.accessibility.path },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-g",
      letter: "G",
      title: "Dependencies and supply chain",
      heading: "Schedule G — Dependencies and supply chain",
      tag: "tailored",
      purpose: "So the parts the service is built from stay safe, known, and replaceable.",
      clauses: [
        {
          label: "G.1",
          text: "The Supplier shall keep a software bill of materials, the list of components in the product, and share it with Canada on request.",
          externalLinks: [
            {
              phrase: "software bill of materials",
              linkKey: "cccs-software-supply-chain-itsm10071",
            },
          ] satisfies ExternalPhraseLink[],
        },
        {
          label: "G.2",
          text: "The Supplier shall patch known vulnerabilities within the time set in this Schedule.",
        },
        {
          label: "G.3",
          text: "The Supplier shall keep the service portable, so its data and components can move without a rebuild.",
        },
        {
          label: "G.4",
          text: "The Supplier shall hold its own suppliers to minimum security requirements.",
        },
      ],
      whyHere: {
        text:
          "Why this is here: the Cyber Centre's guidance on software supply chain threats (linked under G.1). More in the Dependencies and standards thread.",
        internalLinks: [
          {
            phrase: "Dependencies and standards thread",
            to: THREADS["dependencies-and-standards"].path,
          },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-h",
      letter: "H",
      title: "Data stewardship",
      heading: "Schedule H — Data stewardship",
      tag: "tailored",
      purpose: "The data stays Canada's, stays in the right place, and comes back at the end.",
      clauses: [
        {
          label: "H.1",
          text: "The data is Canada's. The Supplier holds it on Canada's behalf and shall return it on request in a usable form.",
        },
        {
          label: "H.2",
          text: "The Supplier shall store the data in Canada where the rules require it.",
        },
        {
          label: "H.3",
          text: "The Supplier shall tell Canada of any unauthorized access to the data, including access compelled by a court order, unless prohibited by law from saying so.",
        },
        {
          label: "H.4",
          text: "At the end of this Agreement, the Supplier shall return the data and securely destroy its own copies.",
        },
      ],
      whyHere: {
        text:
          "Why this is here: the GC white paper on data sovereignty and the public cloud. More in the Data stewardship thread.",
        externalLinks: [
          {
            phrase: "white paper on data sovereignty and the public cloud",
            linkKey: "gc-data-sovereignty-white-paper",
          },
        ] satisfies ExternalPhraseLink[],
        internalLinks: [
          { phrase: "Data stewardship thread", to: THREADS["data-stewardship"].path },
        ] satisfies InternalPhraseLink[],
      },
    },
    {
      id: "schedule-i",
      letter: "I",
      title: "Exit and Transition",
      heading: "Schedule I — Exit and Transition",
      tag: "standard",
      purpose: "So Canada can leave at the end without the service stopping.",
      clauses: [
        {
          label: "I.1",
          text: "The Supplier shall hand over the service in good order at the end: the data, the documentation, and the knowledge needed to run or move it.",
        },
        {
          label: "I.2",
          text: "The Supplier shall support a transition period so a new supplier or an in-house team can take over without a gap in service.",
        },
        {
          label: "I.3",
          text: "The Supplier shall not block a clean exit with fees or steps that trap the service.",
        },
      ],
      whyHere: {
        text:
          "Why this is here: transition is part of a well-managed service agreement (the Guideline on Service Agreements, linked under Schedule C).",
        anchorLinks: [
          { phrase: "Guideline on Service Agreements", hash: "schedule-c" },
        ],
      },
    },
  ] satisfies GoodContractSchedule[],

  sources: [
    {
      label: "Governing instrument",
      linkKey: "directive-procurement" satisfies ExternalLinkKey,
      description:
        "Directive on the Management of Procurement (TBS) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32692",
    },
    {
      label: "Supporting reference",
      linkKey: "psc-general-conditions-service-contract" satisfies ExternalLinkKey,
      description:
        "General Conditions of a Service Contract (PSC) — https://www.canada.ca/en/public-service-commission/corporate/about-us/doing-business-public-service-commission/general-conditions-service-contract.html — the conventional backbone of a service contract (work, payment, term).",
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-service-agreements-essential-elements" satisfies ExternalLinkKey,
      description:
        "Guideline on Service Agreements: Essential Elements (TBS) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=25761 — service levels and transition as essential parts of a service agreement.",
    },
    {
      label: "Supporting reference",
      linkKey: "pspc-security-requirements-contracting" satisfies ExternalLinkKey,
      description:
        "Security requirements for contracting with the Government of Canada (PSPC) — https://www.canada.ca/en/public-services-procurement/services/industrial-security/security-requirements-contracting.html",
    },
    {
      label: "Supporting reference",
      linkKey: "pspc-contract-security-manual" satisfies ExternalLinkKey,
      description:
        "Contract Security Manual (PSPC) — https://www.canada.ca/en/public-services-procurement/services/industrial-security/security-requirements-contracting/contract-security-manual-contracting-government-canada/contract-security-manual.html",
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-srcl-350-103" satisfies ExternalLinkKey,
      description:
        "Security Requirements Check List, SRCL (TBS/SCT 350-103) — https://www.canada.ca/en/treasury-board-secretariat/corporate/forms/350-103.html",
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-privacy-before-contracting" satisfies ExternalLinkKey,
      description:
        "Taking Privacy into Account Before Making Contracting Decisions (TBS) — https://www.canada.ca/en/treasury-board-secretariat/services/access-information-privacy/privacy/guidance-document-taking-privacy-into-account-before-making-contracting-decisions.html",
    },
    {
      label: "Supporting reference",
      linkKey: "directive-privacy-practices" satisfies ExternalLinkKey,
      description:
        "Directive on Privacy Practices (TBS) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=18309",
    },
    {
      label: "Supporting reference",
      linkKey: "a11y-ict-procurement-guide" satisfies ExternalLinkKey,
      description:
        "Guide for Including Accessibility in ICT-Related Procurement (Digital Accessibility Toolkit) — https://a11y.canada.ca/en/guide-for-including-accessibility-in-information-and-communication-technology-ict-related-procurement/",
    },
    {
      label: "Supporting reference",
      linkKey: "gccatalogue-accessibility-procurement" satisfies ExternalLinkKey,
      description:
        "Accessibility procurement language (GC Catalogue) — https://gccatalogue.alpha.canada.ca/patterns/accessibilityprocurement-EN.html",
    },
    {
      label: "Supporting reference",
      linkKey: "can-asc-en-301-549" satisfies ExternalLinkKey,
      description:
        "EN 301 549 (CAN/ASC, Accessibility Standards Canada) — https://accessible.canada.ca/creating-accessibility-standards/canasc-en-301-5492024-accessibility-requirements-ict-products-and-services",
    },
    {
      label: "Supporting reference",
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
      linkKey: "gc-data-sovereignty-white-paper" satisfies ExternalLinkKey,
      description:
        "Government of Canada White Paper: Data Sovereignty and Public Cloud (TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/cloud-services/digital-sovereignty/gc-white-paper-data-sovereignty-public-cloud.html",
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-digital-sovereignty-residency" satisfies ExternalLinkKey,
      description:
        "Digital sovereignty, including the Direction for Electronic Data Residency (TBS) — https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/cloud-services/digital-sovereignty.html",
    },
  ] satisfies SourceItem[],
} as const;
