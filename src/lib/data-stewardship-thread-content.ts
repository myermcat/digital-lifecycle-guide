import type { CaseStudySide } from "@/components/CaseStudyBlock";
import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";
import { GOOD_CONTRACT_PATH } from "@/lib/reference-paths";
import {
  threadLeadPlainText,
  threadSectionsPlainText,
  threadWhoseJobPlainText,
  type ThreadCloserLookBlock,
  type ThreadLinkedProse,
  type ThreadLead,
  type ThreadPhasePreviewBlock,
  type ThreadWhoseJobSection,
} from "@/lib/thread-rich-content";

export const DATA_STEWARDSHIP_THREAD = {
  title: "Data stewardship",
  slug: "data-stewardship" as const,

  lead: {
    text:
      "Data stewardship is the care of the data a service holds across its whole life, from the first record it collects to the day that record is destroyed. The Government of Canada treats information and data as a public trust, managed as a strategic asset, under the Policy on Service and Digital and its directive. For the data inside one service, that comes down to four things: knowing who is accountable for it, keeping it fit to use, keeping it only as long as it is needed, and moving it safely when the service changes. These decisions are made early and revisited as the service grows.",
    externalLinks: [
      { phrase: "Policy on Service and Digital", linkKey: "policy-on-service-and-digital" },
      { phrase: "directive", linkKey: "directive-on-service-and-digital" },
    ] satisfies ExternalPhraseLink[],
  } satisfies ThreadLinkedProse,

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

  retentionQuestionCallout: {
    title: "Common question: how long do I keep data?",
    body: {
      text:
        "There is no single number. Each kind of record has its own retention period. Library and Archives Canada's Generic Valuation Tools give the standard starting periods by activity, and your department's retention schedule sets the specifics. Once you have the period, record it as a length, a trigger that starts the clock, and a reason, then dispose on schedule.",
      externalLinks: [
        { phrase: "Generic Valuation Tools", linkKey: "lac-gvt-overview" },
      ] satisfies ExternalPhraseLink[],
    } satisfies ThreadLinkedProse,
  },

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
    intro: "Data stewardship is shared across the team, with each role holding a different part:",
    roles: [
      {
        role: "The department's information management office",
        text: "sets the standards and holds the disposition authorities; some departments name a Chief Data Officer to lead this.",
        externalLinks: [
          { phrase: "disposition authorities", linkKey: "lac-information-disposition-hub" },
        ] satisfies ExternalPhraseLink[],
      },
      {
        role: "Developers",
        text: "build the service so it captures data cleanly, applies the retention rules, and can export the data without losing its meaning.",
      },
      {
        role: "The business owner",
        text: "of the application decides what data the service needs, makes sure retention and disposition are set before launch, and answers for the data's quality and its lawful disposal.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

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
              { bold: "Access", text: ", how easily the data can be found, retrieved, and used" },
              { bold: "Accuracy", text: ", how correctly it describes what it is about" },
              { bold: "Coherence", text: ", how well it fits with related data" },
              { bold: "Completeness", text: ", how fully the values are filled in" },
              { bold: "Consistency", text: ", whether it is free of internal contradictions" },
              {
                bold: "Interpretability",
                text: ", whether there is enough supporting information to understand it",
              },
              { bold: "Relevance", text: ", how well it meets the actual need" },
              {
                bold: "Reliability",
                text: ", how well differences in the data can be explained",
              },
              { bold: "Timeliness", text: ", how current it is for the decision at hand" },
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

  decidingWhatHappens: {
    id: "deciding-what-happens-to-the-data",
    title: "Deciding what happens to the data",
    intro: [
      {
        text:
          "Working out what happens to a service's data is one of the most-missed jobs in government. The rule itself is simple. The process behind it is rarely laid out, so a service can reach its end with no one sure who to ask, what to ask, or when. The work then starts as the service is being switched off, which is the hardest time to do it.",
      },
      {
        text:
          "It turns on timing: the data decisions are made early, and the clean-up and the move come later. Settle during the build and the running years what will be kept, moved, or destroyed, and retiring or replacing the service becomes a task to work through rather than a scramble at the end.",
      },
    ] satisfies ThreadLinkedProse[],
    lifecycleFigure: {
      caption:
        "Set it up in Create, keep it clean through Live, move it or end it at Sunset.",
      alt: "Three stages of the data lifecycle across Create, Live, and Sunset.",
    },
    trapCallout: {
      title: "The trap is leaving it to the end.",
      body:
        "By the time a service is being switched off, the authority to destroy its records may not exist yet, and obtaining one can take months to years. The data decisions belong in the build and the running years.",
    },
    oneRule: {
      id: "the-one-rule-that-governs-all-of-it",
      title: "1. The one rule that governs all of it",
      paragraphs: [
        {
          text:
            "Under the Library and Archives of Canada Act, no government record may be destroyed without the written consent of the Librarian and Archivist. That consent is a disposition authority: the standing permission that lets a record be destroyed. Without one that covers the record, nothing is deleted, and a service cannot be cleaned up or shut down on its own schedule. The authority has to exist first, or be requested and granted.",
          bold: [{ phrase: "disposition authority" }],
          externalLinks: [
            { phrase: "Library and Archives of Canada Act", linkKey: "laca" },
          ] satisfies ExternalPhraseLink[],
        },
      ] satisfies ThreadLinkedProse[],
    },
    authorityCheck: {
      id: "is-an-authority-already-in-place",
      title: "2. Is an authority already in place?",
      intro: {
        text:
          "An authority attaches to a department and a kind of record, not to a single project, so one may already be in place. Either way, the Information Management (IM) office confirms it.",
        bold: [{ phrase: "department and a kind of record" }],
      } satisfies ThreadLinkedProse,
      figure: {
        caption:
          "Ask the IM office first. Usually the records are already covered; sometimes a new authority has to be requested.",
        alt: "Ask the IM office first: usually the records are already covered; sometimes a new authority has to be requested.",
      },
      bullets: [
        {
          text:
            "Usually, it is already covered. Common admin records (human resources, finance) sit under government-wide authorities every department already holds. The program's own records may be covered too, if the department obtained an authority for that kind of record before, or if they fall under a shared authority for operational case files. Then there is nothing to request, only to confirm.",
          bold: [{ phrase: "Usually, it is already covered." }],
        },
        {
          text:
            "Sometimes, it is not. If the records are genuinely uncovered, the department requests a new authority for them, through the IM office. This is where to act early: there is no set timeline, and it can take months, sometimes years.",
          bold: [{ phrase: "Sometimes, it is not." }],
        },
      ] satisfies ThreadLinkedProse[],
    },
    howToSort: {
      id: "how-to-sort-it-out",
      title: "3. How to sort it out: when, who, and what to ask",
      intro: "Three things settle it.",
      points: [
        {
          lead: "When.",
          body: {
            text:
              " Early, in Beta, before the service launches. An authority is never refused, so this is not a pass-or-fail gate; the only risk is how long a new one takes, which is why it starts early.",
            bold: [{ phrase: "Beta" }],
          } satisfies ThreadLinkedProse,
        },
        {
          lead: "Who.",
          body: {
            text:
              " The Information Management (IM) office. They hold the authorities, know what covers the records, and request new ones from Library and Archives Canada through its Liaison Centre.",
            bold: [{ phrase: "Information Management (IM) office" }],
          } satisfies ThreadLinkedProse,
        },
        {
          lead: "What to ask them.",
          body: {
            text: " Two questions:",
          } satisfies ThreadLinkedProse,
        },
      ],
      askList: [
        "Is an authority already in place for these records, and if not, how is one requested and how long will it take?",
        "What can be cleaned up on an ongoing basis once the service is live, and under which authority?",
      ],
      waitNote: {
        bold: "Why a new authority can take so long.",
        text:
          " There is a process, but no published timeline for issuing one, and the system is backlogged: a 2014 Auditor General audit found most federal institutions were still working from disposition authorities that had not been renewed in years. Plan for months, sometimes longer.",
      },
    },
    whileRunning: {
      id: "while-the-service-runs",
      title: "4. While the service runs: keep it cleaned up",
      intro: {
        text:
          "A running service should not simply pile up data until it closes. Clearing records on schedule is allowed, and it uses the same authority each time: a disposition authority is standing permission, not a one-time ticket. As each record reaches the end of its retention period (how long it must be kept), it can be destroyed under the authority that already covers it.",
        bold: [
          { phrase: "same authority" },
          { phrase: "retention period" },
        ],
      } satisfies ThreadLinkedProse,
      disposalRoutes: [
        {
          icon: "fileX" as const,
          lead: "Transitory records.",
          text:
            " Drafts, duplicates, and working notes with no lasting value can be destroyed at any time, under a standing government-wide authority made for them.",
        },
        {
          icon: "clock" as const,
          lead: "Records past their retention period.",
          text:
            " Once the period ends, the existing authority is the consent to destroy them.",
        },
        {
          icon: "user" as const,
          lead: "Personal information.",
          text:
            " The Privacy Act requires it to be disposed of once it is no longer needed, and at the latest two years after it was last used to decide about a person.",
        },
      ],
      irbv: {
        term: "Information Resource of Business Value (IRBV)",
        definition:
          "a record that documents a decision, a transaction, or an obligation. In a grants system: the application and assessment files, the funding agreements, payment and reconciliation records, and decision, approval, and monitoring records. All have retention periods and need an authority to destroy. Only genuine throwaways, like duplicate copies and superseded drafts, fall outside it.",
      },
      sharedWorkIntro:
        "Deciding a record is no longer needed is not the same as being allowed to delete it.",
      cleanupRolesLead: "Three parties share the work, in order:",
      cleanupRoles: [
        {
          lead: "The records' owner",
          text: " approves that a set of records is no longer needed.",
        },
        {
          lead: "The IM office",
          text:
            " confirms an authority covers it, checks for legal holds or open access-to-information requests, destroys it securely, and records what was done.",
        },
        {
          lead: "The supplier",
          text: " carries out the technical deletion, where the contract requires it.",
        },
      ],
      contractDuty: {
        text:
          "For a small team running a bought product, the disposal does not happen on its own; it happens only where the contract requires it. So these duties belong in the contract from the start: dispose on schedule, return the data, destroy copies securely, and show it was done. They form the data schedule of a good contract, set when the service is bought.",
        internalLinks: [
          {
            phrase: "data schedule of a good contract",
            to: GOOD_CONTRACT_PATH,
          },
        ] satisfies InternalPhraseLink[],
      },
      reasonsLead: {
        text: "Why clear records as you go? Three reasons.",
        bold: [{ phrase: "Why clear records as you go?" }],
      } satisfies ThreadLinkedProse,
    },
    reasonCards: [
      {
        icon: "minimize" as const,
        heading: "A smaller, safer Sunset.",
        line:
          "Less data at the end means less to migrate, less to dispose of, and less to work out whether an authority exists.",
      },
      {
        icon: "shield" as const,
        heading: "Privacy compliance.",
        line:
          "Holding personal information past its retention period is a Privacy Act problem in its own right.",
      },
      {
        icon: "lock" as const,
        heading: "A smaller target.",
        line:
          "Data kept is data to protect. (Storage cost can matter too, but only where the contract charges by usage; under a fixed fee the saving is mostly risk.)",
      },
    ],
    inPractice: {
      label: "In practice",
      body: {
        text:
          "Once a year, organisations and individuals take part in Digital Cleanup Days, deleting data they no longer need. It was founded by the Estonian non-profit Let's Do It World, mainly for the carbon cost of storing unused data, and now runs in more than 170 countries. It is a voluntary campaign, not a records process, but it shows routine clean-up treated as a deliberate practice. Digital Cleanup Day",
        bold: [{ phrase: "Digital Cleanup Days" }],
        externalLinks: [
          {
            phrase: "Digital Cleanup Day",
            linkKey: "digital-cleanup-day",
          },
        ] satisfies ExternalPhraseLink[],
      } satisfies ThreadLinkedProse,
    },
    whenReplaced: {
      id: "when-the-service-is-replaced-or-retired",
      title: "5. When the service is replaced or retired",
      intro: {
        text:
          "Retiring or replacing a service runs through its own steps: assess, decide, plan, then move. The data work splits across them.",
      },
      decisionPoints: [
        {
          text:
            "The decision comes at the planning step, near the start. For each set of records, choose whether it is migrated to the new system, transferred to Library and Archives Canada, or destroyed under an existing authority. The migration plan depends on this, because the plan cannot be made without knowing what may be destroyed and what must be kept.",
          bold: [
            {
              phrase:
                "The decision comes at the planning step, near the start.",
            },
          ],
        },
        {
          text:
            "The move comes later, as the old service winds down, finishing only once the new service is live.",
          bold: [{ phrase: "The move comes later" }],
        },
      ] satisfies ThreadLinkedProse[],
      figure: {
        caption:
          "The records decision sits at the planning step, early. The move happens as the old service winds down.",
        alt: "Annotated diagram: the records decision at planning, while the old and new services overlap as the old service winds down.",
      },
      practices: [
        {
          icon: "split" as const,
          lead: "Run the data migration as its own project, ahead of decommission.",
          text:
            " Departmental decommissioning guides start the migration separately and hold the shutdown until it has finished.",
        },
        {
          icon: "coins" as const,
          lead: "Decide early.",
          text:
            " Data kept past need costs storage and effort, so the sooner what leaves is decided, the less is carried into the move.",
        },
      ],
      closing: {
        text:
          "Records that are kept are cleaned first, because fixing quality before a migration costs less than after, and moved with their meaning intact. Records that are destroyed are destroyed securely. Nothing is destroyed without the authority that covers it.",
      },
      copyrightNote: {
        bold: "Who owns the software matters too.",
        text:
          " Whether the application and its data can be disposed of can depend on who holds the copyright, set in the procurement contract: the Crown owns it when public servants built it; otherwise the contract decides.",
      },
    },
    whoYouTalkTo: {
      id: "who-you-talk-to",
      title: "6. Who you talk to",
      bullets: [
        {
          text:
            "Information Management (IM) office — holds the authorities, knows what covers the records, requests new ones, tracks the schedule, and does and documents the disposal. First call.",
          bold: [{ phrase: "Information Management (IM) office" }],
        },
        {
          text:
            "ATIP / privacy office — for the Privacy Act duty to dispose of personal information on time.",
          bold: [{ phrase: "ATIP / privacy office" }],
        },
        {
          text:
            "Library and Archives Canada, through its Liaison Centre — where the department requests a new authority, reached through the IM office.",
          bold: [
            {
              phrase: "Library and Archives Canada, through its Liaison Centre",
            },
          ],
        },
      ] satisfies ThreadLinkedProse[],
    },
  },

  twoWaysComparison: {
    id: "two-ways",
    title: "Two ways to look after data",
    risky: {
      heading: "Vell",
      framing:
        "Meet Vell, a service manager. They let the grant portal's data look after itself:",
      items: [
        "no one owned the data, so no one set a retention period",
        'kept every record forever, "just in case", and let duplicates and errors pile up',
        "when the portal was replaced, dumped the old database to save time",
      ],
      closing:
        "The result: caseworkers made decisions on stale, duplicated data, and records were destroyed with no disposition authority, which breaks the law.",
    } satisfies CaseStudySide,
    safe: {
      heading: "Pax",
      framing:
        "Meet Pax, a service manager. They treated the grant portal's data as something owned and cared for:",
      items: [
        "named one person accountable for it",
        "set a retention period for each kind of record (a length, a trigger, a reason), using Library and Archives Canada's Generic Valuation Tools as a starting point",
        "kept the data clean, fixing duplicates and errors as they appeared",
        "when the portal was replaced, migrated the data with its meaning intact and disposed of the rest on schedule",
      ],
      closing:
        "The result: trustworthy records, decisions made on good data, and lawful disposal.",
    } satisfies CaseStudySide,
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
            text: "When the service is retired or replaced, every record is migrated, archived, or destroyed.",
          },
          {
            text:
              "If the service is replaced, the data is cleaned, moved with its meaning intact, and checked before the old system is switched off.",
            bold: [{ phrase: "replaced" }],
            externalLinks: [
              {
                phrase: "moved with its meaning intact",
                linkKey: "uk-national-archives-migration",
              },
            ] satisfies ExternalPhraseLink[],
          },
          {
            text:
              "If the service is retired, records are kept or destroyed under their retention schedule, and what is destroyed is destroyed securely so it cannot be recovered.",
            bold: [{ phrase: "retired" }],
          },
          {
            text: "Nothing is destroyed without a disposition authority.",
          },
        ],
      },
    ] satisfies ThreadPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Every source behind this page is listed with links in the Sources block below. To see how this single service fits the government-wide picture, the 2023–2026 Data Strategy for the Federal Public Service lays out where the federal government is taking data governance and the expectations that flow down to your department. For a short plain-language primer on the idea itself, Statistics Canada's Data stewardship: An introduction explains the difference between data governance and stewardship and what a data steward actually does day to day. And if you want the source of the FAIR ideas the page touches on, the GO FAIR initiative's FAIR Principles sets out each principle so your data stays findable and reusable when it is shared.",
    externalLinks: [
      {
        phrase: "2023–2026 Data Strategy for the Federal Public Service",
        linkKey: "tbs-2023-2026-data-strategy",
      },
      {
        phrase: "Data stewardship: An introduction",
        linkKey: "statcan-data-stewardship-intro",
      },
      { phrase: "FAIR Principles", linkKey: "go-fair-principles" },
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
        "Directive on Service and Digital s.4.4.8 (TBS) — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32601",
    },
    {
      label: "Governing instrument",
      linkKey: "laca" satisfies ExternalLinkKey,
      description:
        "Library and Archives of Canada Act s.12(1) — https://laws-lois.justice.gc.ca/eng/acts/l-7.7/FullText.html",
    },
    {
      label: "Supporting reference",
      linkKey: "lac-documented-disposition" satisfies ExternalLinkKey,
      description:
        "LAC, Guidelines on Documented Disposition of Records (includes a sample disposition form)",
    },
    {
      label: "Supporting reference",
      linkKey: "lac-da-2016-001" satisfies ExternalLinkKey,
      description: "Disposition Authorization 2016/001 (transitory records)",
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
    {
      label: "Supporting reference",
      linkKey: "oag-2014-ch7-documentary-heritage" satisfies ExternalLinkKey,
      description:
        "2014 OAG audit ch.7 — Documentary Heritage of the Government of Canada",
    },
    {
      label: "Supporting reference",
      linkKey: "cccs-itsm-50-104" satisfies ExternalLinkKey,
      description: "CCCS ITSM.50.104 (contract clauses)",
    },
    {
      label: "Supporting reference",
      linkKey: "digital-cleanup-day" satisfies ExternalLinkKey,
      description: "Let's Do It World Digital Cleanup Day",
    },
    {
      label: "Supporting reference",
      linkKey: "tbs-2023-2026-data-strategy" satisfies ExternalLinkKey,
      description:
        "TBS 2023–2026 Data Strategy for the Federal Public Service — https://www.canada.ca/en/treasury-board-secretariat/corporate/reports/2023-2026-data-strategy.html",
    },
    {
      label: "Supporting reference",
      linkKey: "statcan-data-stewardship-intro" satisfies ExternalLinkKey,
      description:
        "StatCan Data stewardship: An introduction — https://www.statcan.gc.ca/en/wtc/data-literacy/catalogue/892000062020013",
    },
    {
      label: "Supporting reference",
      linkKey: "go-fair-principles" satisfies ExternalLinkKey,
      description: "GO FAIR FAIR Principles — https://www.go-fair.org/fair-principles/",
    },
  ] satisfies SourceItem[],
} as const;

export const dataStewardshipSectionsPlainText = threadSectionsPlainText;
export const dataStewardshipLeadPlainText = (lead: ThreadLead) => threadLeadPlainText(lead);
export const dataStewardshipWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);
