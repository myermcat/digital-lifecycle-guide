import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import {
  threadSectionsPlainText,
  type ThreadCloserLookBlock,
  type ThreadLinkedProse,
  type ThreadPhasePreviewBlock,
} from "@/lib/thread-rich-content";

export const DATA_STEWARDSHIP_THREAD = {
  title: "Data stewardship",
  slug: "data-stewardship" as const,

  lead: {
    text:
      "Data stewardship is the care of the data a service holds across its whole life, from the first record it collects to the day that record is destroyed. The Government of Canada treats information and data as a public trust, managed as a strategic asset, under the Policy on Service and Digital and its directive. For the data inside one service that comes down to four things: knowing who is accountable for it, keeping it fit to use, keeping it only as long as it is needed, and moving it safely when the service changes. These decisions are made early and revisited as the service grows. The business owner answers for them; the team does the work.",
    externalLinks: [
      { phrase: "Policy on Service and Digital", linkKey: "policy-on-service-and-digital" },
      { phrase: "directive", linkKey: "directive-on-service-and-digital" },
    ] satisfies ExternalPhraseLink[],
  },

  whatGoodLooksLike: [
    {
      text: "One person is accountable for the data the service holds, and the rules for managing it are written down.",
    },
    {
      text: "The data is fit for its purpose: accurate, complete, and current enough for the decisions it supports.",
    },
    {
      text: "Only the data the service needs is collected, and it is kept only as long as it is needed.",
    },
    {
      text: "Every retention period has three parts: a length, a trigger that starts the clock, and a reason.",
    },
    {
      text: "Nothing is destroyed without the disposition authority that covers it.",
      externalLinks: [
        { phrase: "disposition authority", linkKey: "lac-documented-disposition" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Personal information follows the extra rules that protect it.",
      internalLinks: [{ phrase: "protect it", to: THREADS.privacy.path }] satisfies InternalPhraseLink[],
    },
    {
      text: "When the service moves to a new system, the data is cleaned first, moved with its meaning intact, and checked before the old system is switched off.",
    },
    {
      text: "Data is open by default where it can be, and protected where it must be.",
    },
  ] satisfies ThreadLinkedProse[],

  whyItMatters: {
    text:
      "Data is the part of a service that outlives the software. A team can replace the system and keep the records, so the records are worth more care than the code. When data quality slips, decisions get made on wrong information, and the error spreads to everyone downstream who trusts it. Holding data longer than allowed, or destroying it without authority, both break the rules: the Policy on Service and Digital and its directive require an institution to manage data quality, set retention periods, and run a documented disposition process, and under the Library and Archives of Canada Act no government record may be destroyed without the written consent of the Librarian and Archivist.",
    externalLinks: [
      { phrase: "Policy on Service and Digital", linkKey: "policy-on-service-and-digital" },
      { phrase: "directive", linkKey: "directive-on-service-and-digital" },
      { phrase: "Library and Archives of Canada Act", linkKey: "laca" },
    ] satisfies ExternalPhraseLink[],
  },

  whoseJob: {
    text:
      "Data stewardship is shared across the team, with each role holding a different part. The department's information management office sets the standards and holds the disposition authorities; some departments name a Chief Data Officer to lead this. Developers build the service so it captures data cleanly, applies the retention rules, and can export the data without losing its meaning. The business owner of the application decides what data the service needs, makes sure retention and disposition are set before launch, and answers for the data's quality and its lawful disposal. The day-to-day work belongs to the team. The decision about what data to hold, and the accountability for it, belong to the business owner.",
    externalLinks: [
      { phrase: "disposition authorities", linkKey: "lac-information-disposition-hub" },
    ] satisfies ExternalPhraseLink[],
  },

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "Keep the data fit to use.",
        sections: [
          {
            text:
              "Data quality is how well data serves the decisions it supports. The Government of Canada's Guidance on Data Quality describes it in nine dimensions:",
            bold: [{ phrase: "Data quality" }],
            externalLinks: [
              { phrase: "Guidance on Data Quality", linkKey: "tbs-data-quality-guidance" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              "access, how easily the data can be found, retrieved, and used",
              "accuracy, how correctly it describes what it is about",
              "coherence, how well it fits with related data",
              "completeness, how fully the values are filled in",
              "consistency, whether it is free of internal contradictions",
              "interpretability, whether there is enough supporting information to understand it",
              "relevance, how well it meets the actual need",
              "reliability, how well differences in the data can be explained",
              "timeliness, how current it is for the decision at hand",
            ],
          },
          {
            text:
              "No dataset scores perfectly on all nine. The test is whether the data is fit for purpose, good enough for the use it is put to, which varies by decision and by stage of the service. These dimensions grew out of Statistics Canada's older six in its Quality Guidelines, and they pair with the FAIR principles, findable, accessible, interoperable, reusable, when data is shared or reused.",
            bold: [{ phrase: "fit for purpose" }],
            externalLinks: [
              { phrase: "Quality Guidelines", linkKey: "statcan-quality-guidelines" },
              { phrase: "FAIR principles", linkKey: "tbs-fair-principles" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
      {
        title: "Keep data only as long as it is needed.",
        sections: [
          {
            text:
              "Two linked practices keep data from piling up. Retention is how long data is kept, and every retention period has three parts: a length, a trigger that starts the clock (a file is closed, a fiscal year ends), and a reason. Disposition is what happens at the end. Under the Library and Archives of Canada Act a government record cannot be destroyed without the written consent of the Librarian and Archivist, and disposition is one of three actions: destroy the record, transfer it to Library and Archives Canada, or alienate it (remove it from government control). Before disposing of anything, the documented disposition process runs a few checks:",
            bold: [{ phrase: "Retention" }, { phrase: "Disposition" }],
            externalLinks: [
              { phrase: "Library and Archives of Canada Act", linkKey: "laca" },
              { phrase: "documented disposition process", linkKey: "lac-documented-disposition" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              "confirm a disposition authority covers the records",
              "check the security classification",
              "check for legal holds or open access-to-information requests",
              "get sign-off from the office that owns the records",
              "complete the action and record what was done",
            ],
          },
          {
            text:
              "Setting the retention period is not guesswork: Library and Archives Canada's Generic Valuation Tools give ready-made starting points for common government activities, and the disposition guideline includes a sample disposition form to record each decision. Where the records hold personal information, the extra rules on keeping and disposing of it apply as well.",
            externalLinks: [
              { phrase: "Generic Valuation Tools", linkKey: "lac-gvt-overview" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "keeping and disposing of it", to: THREADS.privacy.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Move data safely when the service changes.",
        sections: [
          {
            text:
              "When a service is replaced, or its data moves to a new system, the data has to arrive intact and still make sense. The first decision is whether to move the data at all: for each set of records the choice is to migrate it, archive it, or dispose of it. What moves is then cleaned first, because fixing data quality before a migration costs far less than after, and it is moved with its meaning intact, the metadata that lets someone find, open, and trust it later. A pilot migration and a roll-back plan guard against surprises, and the data is checked before the old system is switched off. For the end-of-life case, preserving data before a system is decommissioned, the same rule holds: capture and archive the data while the system is still running, then destroy what is left securely.",
            externalLinks: [
              {
                phrase: "migrate it, archive it, or dispose of it",
                linkKey: "uk-national-archives-migration",
              },
              { phrase: "decommissioned", linkKey: "aws-app-retirement" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies ThreadCloserLookBlock[],
  },

  byPhase: {
    id: "by-phase",
    title: "What Data stewardship looks like in each phase",
    intro: "The data work changes shape across the life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "Decide what data you hold, and how it will be kept.",
        popup: [
          {
            text:
              "Most data decisions are cheapest at the start. The team decides what data the service needs and collects no more, names who is accountable for it, and sets a retention period for each kind of data (a length, a trigger, a reason), using Library and Archives Canada's Generic Valuation Tools as a starting point. The service is designed so data is captured cleanly and can be exported later, and the quality rules and metadata standards are chosen now. If the data includes personal information, the privacy requirements apply on top.",
            externalLinks: [
              { phrase: "Generic Valuation Tools", linkKey: "lac-gvt-overview" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "privacy requirements", to: THREADS.privacy.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Keep the data fit to use, and dispose on schedule.",
        popup: [
          {
            text:
              "Once the service is running, the data is kept fit for purpose, checked against trusted sources and watched for errors. Retention periods are applied, and disposition runs on schedule: records past their retention are disposed of through the documented process, and nothing is destroyed without the authority that covers it. Data is opened by default where it can be and restricted where it must be. Keeping the data secure is part of this.",
            externalLinks: [
              { phrase: "fit for purpose", linkKey: "tbs-data-quality-guidance" },
              { phrase: "documented process", linkKey: "lac-documented-disposition" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "Keeping the data secure", to: THREADS.security.path },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Migrate or dispose of the data, lawfully.",
        popup: [
          {
            text:
              "When the service is retired or replaced, every record is migrated, archived, or destroyed. If the service is replaced, the data is cleaned, moved with its meaning intact, and checked before the old system is switched off. If the service is retired, records are kept or destroyed under their retention schedule, and what is destroyed is destroyed securely so it cannot be recovered. Nothing is destroyed without a disposition authority.",
            externalLinks: [
              {
                phrase: "moved with its meaning intact",
                linkKey: "uk-national-archives-migration",
              },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies ThreadPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Managing data in the Government of Canada comes under the Policy on Service and Digital and its directive, which set the duties for data quality, retention, disposition, and openness. Disposing of records is governed by the Library and Archives of Canada Act, with Library and Archives Canada's guideline on documented disposition and Generic Valuation Tools showing how it is done. For data quality, the Guidance on Data Quality sets out the nine dimensions, with Statistics Canada's Quality Guidelines behind them and the FAIR principles as a further lens for sharing and reuse. For moving data between systems, The National Archives' guide to migrating records and the checklist for retiring applications before decommissioning infrastructure are practical companions.",
    externalLinks: [
      { phrase: "Policy on Service and Digital", linkKey: "policy-on-service-and-digital" },
      { phrase: "directive", linkKey: "directive-on-service-and-digital" },
      { phrase: "Library and Archives of Canada Act", linkKey: "laca" },
      { phrase: "guideline on documented disposition", linkKey: "lac-documented-disposition" },
      { phrase: "Generic Valuation Tools", linkKey: "lac-gvt-overview" },
      { phrase: "Guidance on Data Quality", linkKey: "tbs-data-quality-guidance" },
      { phrase: "Quality Guidelines", linkKey: "statcan-quality-guidelines" },
      { phrase: "FAIR principles", linkKey: "tbs-fair-principles" },
      { phrase: "guide to migrating records", linkKey: "uk-national-archives-migration" },
      {
        phrase: "checklist for retiring applications before decommissioning infrastructure",
        linkKey: "aws-app-retirement",
      },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "policy-on-service-and-digital" satisfies ExternalLinkKey,
      description:
        "Policy on Service and Digital (TBS) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32603",
    },
    {
      label: "Governing instrument",
      linkKey: "directive-on-service-and-digital" satisfies ExternalLinkKey,
      description:
        "Directive on Service and Digital (TBS) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32601",
    },
    {
      label: "Governing instrument",
      linkKey: "laca" satisfies ExternalLinkKey,
      description:
        "Library and Archives of Canada Act (S.C. 2004, c. 11) — https://laws-lois.justice.gc.ca/eng/acts/l-7.7/FullText.html",
    },
    {
      label: "Supporting reference",
      linkKey: "lac-documented-disposition" satisfies ExternalLinkKey,
      description:
        "LAC, Guidelines on Documented Disposition of Records (includes a sample disposition form)",
    },
    {
      label: "Supporting reference",
      linkKey: "lac-gvt-overview" satisfies ExternalLinkKey,
      description: "LAC, Generic Valuation Tools (overview)",
    },
    {
      label: "Supporting reference",
      linkKey: "lac-information-disposition-hub" satisfies ExternalLinkKey,
      description:
        "LAC, Information management and disposition of government records (hub)",
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-data-quality-guidance" satisfies ExternalLinkKey,
      description: "TBS, Guidance on Data Quality (nine dimensions)",
    },
    {
      label: "Supporting reference",
      linkKey: "statcan-quality-guidelines" satisfies ExternalLinkKey,
      description: "Statistics Canada, Quality Guidelines (6th ed., 12-539-X)",
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-fair-principles" satisfies ExternalLinkKey,
      description: "TBS, Guidance on readiness to manage data according to the FAIR principles",
    },
    {
      label: "Supporting reference",
      linkKey: "uk-national-archives-migration" satisfies ExternalLinkKey,
      description:
        "The National Archives (UK), Migrating information between records management systems",
    },
    {
      label: "Supporting reference",
      linkKey: "aws-app-retirement" satisfies ExternalLinkKey,
      description:
        "AWS Prescriptive Guidance, Retiring applications before decommissioning infrastructure",
    },
  ] satisfies SourceItem[],
} as const;

export const dataStewardshipSectionsPlainText = threadSectionsPlainText;
