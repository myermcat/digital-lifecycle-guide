/**
 * TRANSITORY WORKING MATERIAL, home page only, sitting under the instrument table.
 *
 * The instrument table holds what a service MUST deal with. This holds what it MAY
 * reuse: platforms and components another part of the Government of Canada already
 * runs, so a team configures rather than builds.
 *
 * The distinction matters and the two must not be merged. Nothing here is an
 * obligation. Choosing not to use any of it breaks no rule, though the enterprise
 * architecture framework does ask teams to look at reuse before buying or building,
 * and an architecture review board will ask what was considered.
 */

import type { ExternalLinkKey } from "@/lib/external-links";

export type ReusableCategory =
  | "Talking to people"
  | "Collecting information"
  | "How it looks"
  | "Signing in"
  | "Publishing and sharing"
  | "Finding what exists";

export const REUSABLE_CATEGORIES: readonly ReusableCategory[] = [
  "Finding what exists",
  "Talking to people",
  "Collecting information",
  "How it looks",
  "Signing in",
  "Publishing and sharing",
];

export type ReusablePiece = {
  name: string;
  category: ReusableCategory;
  /** One line a non-specialist understands. */
  whatItIs: string;
  /** The thing a team would otherwise build or buy. */
  insteadOfBuilding: string;
  /** Phrases in insteadOfBuilding to bold, so the column can be skimmed. */
  insteadBold?: readonly string[];
  runBy: string;
  /** How a team actually gets it. */
  howToGetIt: string;
  /** Where in a service's life it is worth looking at this. */
  lookAtItIn: string;
  linkKey?: ExternalLinkKey;
  caveat?: string;
};

export const REUSABLE_PIECES: ReusablePiece[] = [
  {
    name: "Open Resource Exchange",
    category: "Finding what exists",
    whatItIs:
      "A catalogue of software, code and reusable components that Government of Canada organizations have published for others to use.",
    insteadOfBuilding:
      "Starting from nothing, or rebuilding what another department already wrote.",
    insteadBold: ["rebuilding what another department already wrote"],
    runBy: "Treasury Board of Canada Secretariat.",
    howToGetIt: "Public website. Search it before writing a requirement.",
    lookAtItIn: "Discovery, as part of the reuse scan an architecture review board will ask about.",
    linkKey: "gc-open-resource-exchange",
  },
  {
    name: "GC Notify",
    category: "Talking to people",
    whatItIs:
      "A notification service that sends email and text messages to the people using a service, with templates, delivery tracking and bilingual support built in.",
    insteadOfBuilding:
      "An email and text sending system, its templates, its retry logic, and its delivery reporting.",
    insteadBold: ["An email and text sending system"],
    runBy: "Canadian Digital Service.",
    howToGetIt: "Request an account. Free to Government of Canada teams.",
    lookAtItIn:
      "Alpha, because whether notifications are bought, built or reused changes the build estimate.",
    linkKey: "gc-notify-contact",
  },
  {
    name: "GC Forms",
    category: "Collecting information",
    whatItIs:
      "A form builder that produces accessible, bilingual online forms without writing code, and delivers the responses securely.",
    insteadOfBuilding:
      "A form, its validation, its accessibility work, and somewhere safe to put the answers.",
    insteadBold: ["A form, its validation"],
    runBy: "Canadian Digital Service.",
    howToGetIt: "Request access. Free to Government of Canada teams.",
    lookAtItIn:
      "Alpha for prototyping a form quickly, and Beta where the real one is a form rather than a system.",
    linkKey: "gc-forms-assistance",
  },
  {
    name: "GC Design System",
    category: "How it looks",
    whatItIs:
      "Ready-made interface components, buttons, inputs, error messages and the rest, already tested for accessibility and available in both official languages.",
    insteadOfBuilding: "Interface components, and the accessibility testing of each one.",
    insteadBold: ["Interface components"],
    runBy: "Canadian Digital Service.",
    howToGetIt: "Public. Use the components in the build.",
    lookAtItIn: "Alpha for the prototype, Beta for the real build.",
    linkKey: "gc-design-system",
  },
  {
    name: "Canada.ca design system",
    category: "How it looks",
    whatItIs:
      "The user-tested page templates, patterns and content styles for anything published under the canada.ca brand.",
    insteadOfBuilding: "Page layouts, navigation patterns, and the research behind them.",
    insteadBold: ["Page layouts, navigation patterns"],
    runBy: "Treasury Board of Canada Secretariat, with the canada.ca publishing team.",
    howToGetIt: "Public. The mandatory parts are covered by the publishing rules, not by choice.",
    lookAtItIn: "Alpha, before the first prototype fixes a look the web team will not accept.",
    linkKey: "design-canada",
    caveat:
      "Part of this one is not optional. The mandatory templates and information architecture are a standing duty, listed in the instrument table.",
  },
  {
    name: "Digital Accessibility Toolkit",
    category: "How it looks",
    whatItIs:
      "How-to guidance for designing, building, testing and buying accessible services, including the wording to put in a contract.",
    insteadOfBuilding:
      "Working out the accessibility requirements and testing approach from scratch.",
    insteadBold: ["Working out the accessibility requirements"],
    runBy: "The interdepartmental Access Working Group.",
    howToGetIt: "Public website.",
    lookAtItIn: "Alpha, where the accessibility clauses are written for the solicitation.",
    linkKey: "digital-accessibility-toolkit",
  },
  {
    name: "GCKey and Sign In Canada",
    category: "Signing in",
    whatItIs:
      "Shared sign-in services that identify the people using a service, so a department does not run its own username and password system.",
    insteadOfBuilding: "Accounts, passwords, multi-factor authentication, and account recovery.",
    insteadBold: ["Accounts, passwords, multi-factor authentication"],
    runBy: "Shared Services Canada and the Canadian Digital Service.",
    howToGetIt:
      "Onboard through the platform's own process, which includes testing and an attestation.",
    lookAtItIn: "Alpha, before a prototype hard-codes a sign-in of its own.",
    caveat:
      "Closer to expected than optional. Reusing a credential service rather than building sign-in is treated as the default, so this one also appears in the instrument table.",
  },
  {
    name: "Open Government Portal",
    category: "Publishing and sharing",
    whatItIs:
      "Where Government of Canada data and information are published openly, and where several things a service owes are filed.",
    insteadOfBuilding: "A publishing route for open data, and the licence terms that go with it.",
    insteadBold: ["A publishing route for open data"],
    runBy: "Treasury Board of Canada Secretariat.",
    howToGetIt: "Through the department's open government contact.",
    lookAtItIn: "Live, once the service is producing data worth releasing.",
    linkKey: "open-government-portal",
    caveat:
      "Some filings here are obligations. The algorithmic impact assessment and proactive publication are both published on this portal.",
  },
];
