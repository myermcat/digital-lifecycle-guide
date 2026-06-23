import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalPhraseLink, InternalPhraseLink } from "@/components/ProseWithExternalLinks";
import type { ExternalLinkKey } from "@/lib/external-links";
import { PROCUREMENT_LANDING_PATH } from "@/lib/procurement-landing";
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

export type AccessibilityLinkedProse = ThreadLinkedProse;
export type AccessibilityContentSection = ThreadContentSection;
export type AccessibilityCloserLookBlock = ThreadCloserLookBlock;
export type AccessibilityPhasePreviewBlock = ThreadPhasePreviewBlock;

export const accessibilitySectionsPlainText = threadSectionsPlainText;
export const accessibilityLeadPlainText = (lead: ThreadLinkedProse) => threadLeadPlainText(lead);
export const accessibilityWhoseJobPlainText = (whoseJob: ThreadWhoseJobSection) =>
  threadWhoseJobPlainText(whoseJob);

export const ACCESSIBILITY_THREAD = {
  title: "Accessibility",
  slug: "accessibility" as const,

  lead: {
    text:
      "Accessibility means building a service everyone can use, including people with a disability, whether that disability is permanent, temporary, or situational. In Canada it is the law: the Accessible Canada Act sets a goal of a barrier-free Canada by 2040 and names information and communication technology as one of the areas that has to be made accessible. A service that cannot be used with a keyboard, a screen reader, captions, or clear language shuts people out of something government often makes the only option. The decisions that make a service accessible are taken early and revisited as it changes. The business owner answers for them; the team does the work.",
    externalLinks: [
      { phrase: "Accessible Canada Act", linkKey: "accessible-canada-act-summary" },
    ] satisfies ExternalPhraseLink[],
  } satisfies ThreadLinkedProse,

  whatGoodLooksLike: [
    { text: "Accessibility is designed in from the start, not retrofitted before launch." },
    {
      text: "The service meets the standard the law requires, CAN/ASC-EN 301 549, which for the web means WCAG 2.1 Level AA.",
      externalLinks: [
        { phrase: "CAN/ASC-EN 301 549", linkKey: "can-asc-en-301-549" },
        { phrase: "WCAG 2.1 Level AA", linkKey: "wcag-22-quickref" },
      ] satisfies ExternalPhraseLink[],
    },
    {
      text: "Digital documents and any mobile app meet the standard too, not only the website.",
    },
    {
      text: "Accessibility requirements are written into the contract when technology is bought, and the supplier provides an Accessibility Conformance Report.",
      internalLinks: [
        { phrase: "written into the contract", to: PROCUREMENT_LANDING_PATH },
      ] satisfies InternalPhraseLink[],
    },
    {
      text: "The service is tested with real people, including people who use assistive technology, not only with automated tools.",
    },
    {
      text: "A published accessibility statement says what is and is not accessible, and how to get help or an alternative.",
    },
    {
      text: "People who cannot use the service on their own can still get it done, by phone, in person, or with support.",
    },
    { text: "Staff who build, maintain, or buy digital technology have accessibility training." },
  ] satisfies AccessibilityLinkedProse[],

  whyItMatters: {
    text:
      "When a service is not accessible, people are shut out of things they have a right to use, a benefit, a tax filing, a health service, and there is often no other way to get them. It is also a legal duty: under the Accessible Canada Act and the Accessible Canada Regulations a federal digital service must meet the accessibility standard, with deadlines phased in across 2027 and 2028, and the Accessibility Commissioner can impose penalties. Building accessibility in early costs far less than fixing it under deadline, and an accessible service is easier for everyone, on a phone, on a slow connection, in bright sun. Most barriers are ordinary and avoidable: an image with no text alternative, a form that needs a mouse, contrast too low to read.",
    externalLinks: [
      { phrase: "Accessible Canada Act", linkKey: "accessible-canada-act-summary" },
      {
        phrase: "Accessible Canada Regulations",
        linkKey: "accessible-canada-regulations-digital-technologies",
      },
    ] satisfies ExternalPhraseLink[],
  },

  whoseJob: {
    intro: "Accessibility is shared across the team, with each role holding a different part:",
    roles: [
      {
        role: "Designers and content authors",
        text: "write in plain language, structure content properly, and design for keyboard and screen-reader use.",
      },
      {
        role: "Developers",
        text: "build to the standard and fix what testing finds.",
      },
      {
        role: "The department's accessibility or IT team",
        text: "advises, runs testing with assistive technology, and helps publish the accessibility statement.",
      },
      {
        role: "The business owner",
        text: "of the application makes sure accessibility is planned and funded, is built to the standard before launch, and answers for meeting the legal requirements.",
      },
    ],
  } satisfies ThreadWhoseJobSection,

  closerLook: {
    id: "a-closer-look",
    title: "A closer look",
    blocks: [
      {
        title: "Build to the standard.",
        sections: [
          {
            text:
              "The law points to one technical standard, CAN/ASC-EN 301 549, Canada's accessibility standard for information and communication technology. For a website, meeting it means meeting WCAG 2.1 Level AA, the international web content accessibility guidelines, which are organised around four ideas:",
            externalLinks: [
              { phrase: "CAN/ASC-EN 301 549", linkKey: "can-asc-en-301-549" },
              { phrase: "WCAG 2.1 Level AA", linkKey: "wcag-22-quickref" },
            ] satisfies ExternalPhraseLink[],
          },
          {
            type: "orderedList",
            items: [
              { bold: "Perceivable", text: ", people can see or hear the content" },
              { bold: "Operable", text: ", it works by keyboard, not only a mouse" },
              { bold: "Understandable", text: ", it reads clearly and behaves predictably" },
              {
                bold: "Robust",
                text: ", it works with assistive technology such as screen readers",
              },
            ],
          },
          {
            text: "The standard reaches past the website: digital documents like PDFs and Word files, and any mobile app, have to meet it too. WCAG has three levels, A, AA, and AAA; AA is the bar a government service builds to.",
            bold: [{ phrase: "AA" }],
          },
        ],
      },
      {
        title: "Buy it accessible.",
        sections: [
          {
            text:
              "Most services run on technology the team buys rather than builds, so accessibility has to be a condition of the purchase. The Digital Accessibility Toolkit has a requirements generator that turns a description of what you are buying into the exact accessibility clauses to put in the contract, and the supplier provides an Accessibility Conformance Report stating how their product measures up. Where a product is not fully accessible, a remediation roadmap records what will be fixed and when. Getting the accessibility requirements written into the contract is where a business owner has the most leverage.",
            bold: [{ phrase: "Accessibility Conformance Report" }],
            externalLinks: [
              { phrase: "Digital Accessibility Toolkit", linkKey: "a11y-toolkit-procurement" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "written into the contract", to: PROCUREMENT_LANDING_PATH },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Test with real people.",
        sections: [
          {
            text:
              "Automated checkers like a browser accessibility scanner catch only a portion of the problems, and they cannot tell whether the service actually works for someone. The Digital Accessibility Toolkit provides a web accessibility checklist and testing guidance, but the test that matters is people: someone navigating by keyboard, listening with a screen reader, or reading with the text enlarged. Meeting the standard is only the floor. A service can pass every automated check and still be hard to use, so testing with people who have disabilities is part of the work.",
            externalLinks: [
              { phrase: "Digital Accessibility Toolkit", linkKey: "a11y-toolkit-test-products" },
            ] satisfies ExternalPhraseLink[],
          },
        ],
      },
    ] satisfies AccessibilityCloserLookBlock[],
  },

  byPhase: {
    id: "by-phase",
    title: "What Accessibility looks like in each phase",
    intro: "The accessibility work changes shape across the life of a service.",
    blocks: [
      {
        title: "Create.",
        preview: "Design it in and set the standard.",
        popup: [
          {
            text:
              "Accessibility is cheapest to build in at the start. The team designs for keyboard and screen-reader use, writes in plain language, and sets EN 301 549 (WCAG 2.1 AA for the web) as the bar the service is built to. If technology is bought, the accessibility requirements are written into the contract and the supplier's Accessibility Conformance Report is checked. Testing with people who have disabilities is planned now, not left to the end.",
            externalLinks: [
              { phrase: "EN 301 549", linkKey: "can-asc-en-301-549" },
            ] satisfies ExternalPhraseLink[],
            internalLinks: [
              { phrase: "written into the contract", to: PROCUREMENT_LANDING_PATH },
            ] satisfies InternalPhraseLink[],
          },
        ],
      },
      {
        title: "Live.",
        preview: "Keep it accessible and tell people where it stands.",
        popup: [
          {
            text:
              "Once the service is running, every new page, document, and feature is kept to the standard, and the service is tested regularly, including with assistive technology. A published accessibility statement says what is and is not accessible and how to ask for help or an alternative, and a feedback channel lets people report barriers. People who cannot use the service on their own are supported by phone or in person. Staff who build or buy digital technology keep their accessibility training current.",
          },
        ],
      },
      {
        title: "Sunset.",
        preview: "Keep the replacement accessible, and strand no one.",
        popup: [
          {
            text:
              "When a service is retired or replaced, accessibility carries into what comes next: a replacement is built to the standard from the start, and content that moves keeps its accessible structure. While the old service is still running, its accessibility statement and feedback channel stay live. No one should be left without an accessible way to do the task during the change.",
          },
        ],
      },
    ] satisfies AccessibilityPhasePreviewBlock[],
  },

  furtherReading: {
    text:
      "Accessibility in Canada comes under the Accessible Canada Act and the Accessible Canada Regulations, which require federal digital services to meet CAN/ASC-EN 301 549, the standard that adopts WCAG 2.1 Level AA for the web. The Digital Accessibility Toolkit is the closest companion for doing the work, from procurement to testing. For why accessibility matters, the W3C Introduction to Web Accessibility is the plainest start, and other governments' guidance is worth a look for ideas Canada frames less crisply, the UK Service Manual on assisted digital and the United States' Section 508 procurement resources.",
    externalLinks: [
      { phrase: "Accessible Canada Act", linkKey: "accessible-canada-act-summary" },
      {
        phrase: "Accessible Canada Regulations",
        linkKey: "accessible-canada-regulations-digital-technologies",
      },
      { phrase: "CAN/ASC-EN 301 549", linkKey: "can-asc-en-301-549" },
      { phrase: "WCAG 2.1 Level AA", linkKey: "wcag-22-quickref" },
      { phrase: "Digital Accessibility Toolkit", linkKey: "digital-accessibility-toolkit" },
      { phrase: "procurement", linkKey: "a11y-toolkit-procurement" },
      { phrase: "testing", linkKey: "a11y-toolkit-test-products" },
      { phrase: "W3C Introduction to Web Accessibility", linkKey: "w3c-wai-accessibility-intro" },
      { phrase: "assisted digital", linkKey: "uk-service-manual-assisted-digital" },
      { phrase: "Section 508 procurement resources", linkKey: "section508-gov" },
    ] satisfies ExternalPhraseLink[],
  },

  sources: [
    {
      label: "Governing instrument",
      linkKey: "accessible-canada-act-summary" satisfies ExternalLinkKey,
      description:
        "Accessible Canada Act (ESDC summary; binding text at Justice) — https://www.canada.ca/en/employment-social-development/programs/accessible-canada/act-summary.html",
    },
    {
      label: "Governing instrument",
      linkKey: "accessible-canada-regulations-digital-technologies" satisfies ExternalLinkKey,
      description:
        "Accessible Canada Regulations, digital technologies (ESDC) — https://www.canada.ca/en/employment-social-development/programs/accessible-canada-regulations-guidance/category-digital-technologies.html",
    },
    {
      label: "Governing instrument",
      linkKey: "can-asc-en-301-549" satisfies ExternalLinkKey,
      description:
        "CAN/ASC-EN 301 549:2024, Accessibility requirements for ICT (Accessibility Standards Canada; free PDF) — https://accessible.canada.ca/",
    },
    {
      label: "Supporting reference",
      linkKey: "policy-on-service-and-digital" satisfies ExternalLinkKey,
      description:
        "TBS Direction on ICT accessibility (2026-03-02), under the Policy on Service and Digital (s.4.4.11); it rescinded the old Standard on Web Accessibility and sets the transition rule — https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32603",
    },
    {
      label: "Supporting reference",
      linkKey: "digital-accessibility-toolkit" satisfies ExternalLinkKey,
      description:
        "GC Digital Accessibility Toolkit (procurement, test your products, standards) — https://a11y.canada.ca/en/",
    },
    {
      label: "Supporting reference",
      linkKey: "wcag-22-quickref" satisfies ExternalLinkKey,
      description: "WCAG 2.2 Quick Reference (W3C WAI) — https://www.w3.org/WAI/WCAG22/quickref/",
    },
    {
      label: "Supporting reference",
      linkKey: "w3c-wai-accessibility-intro" satisfies ExternalLinkKey,
      description:
        "W3C Introduction to Web Accessibility (W3C WAI) — https://www.w3.org/WAI/fundamentals/accessibility-intro/",
    },
    {
      label: "Supporting reference",
      linkKey: "webaim-wave" satisfies ExternalLinkKey,
      description: "WebAIM WAVE (free automated checker) — https://wave.webaim.org/",
    },
    {
      label: "Supporting reference",
      linkKey: "section508-gov" satisfies ExternalLinkKey,
      description:
        "Section508.gov (US) — accessibility as a procurement gate — https://www.section508.gov/",
    },
    {
      label: "Supporting reference",
      linkKey: "nz-web-accessibility-standard" satisfies ExternalLinkKey,
      description:
        'NZ Government Web Accessibility Standard 1.2 — "high-stakes" prioritisation — https://www.digital.govt.nz/standards-and-guidance/nz-government-web-standards/web-accessibility-standard-1-2',
    },
    {
      label: "Supporting reference",
      linkKey: "australia-dta-leave-no-one-behind" satisfies ExternalLinkKey,
      description:
        'Australia DTA, "Leave no one behind" (formerly Criterion 9) — phase-gated accessibility evidence — https://www.digital.gov.au/policy/digital-experience/digital-service-standard/criterion-3',
    },
    {
      label: "Supporting reference",
      linkKey: "uk-service-manual-assisted-digital" satisfies ExternalLinkKey,
      description:
        "UK Service Manual, accessibility and assisted digital — https://www.gov.uk/service-manual/helping-people-to-use-your-service",
    },
    {
      label: "Supporting reference",
      linkKey: "nng-accessible-web-design" satisfies ExternalLinkKey,
      description:
        "Nielsen Norman Group, Usability Guidelines for Accessible Web Design — accessibility is usability — https://www.nngroup.com/reports/usability-guidelines-accessible-web-design/",
    },
  ] satisfies SourceItem[],
} as const;
