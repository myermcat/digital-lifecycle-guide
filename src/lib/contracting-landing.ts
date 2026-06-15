import type { PracticeCardData } from "@/components/PracticeCard";
import type { WeightedRegionNote } from "@/components/WeightedRegionBlock";
import type { ExternalPhraseLink } from "@/components/ProseWithExternalLinks";
import { PROCUREMENT_CONTRACTING_SOURCES } from "@/lib/procurement-sources";

export type LinkedProse = {
  text: string;
  externalLinks?: ExternalPhraseLink[];
};

export const CONTRACTING_LANDING_PATH = "/thread/contracting";

export function contractingSubPath(slug: string) {
  return `/thread/contracting/${slug}` as const;
}

export const CONTRACTING_GOOD_LOOKS_CARDS: PracticeCardData[] = [
  {
    label: "The contract carries the practices",
    href: contractingSubPath("the-contract-carries-the-practices"),
    description:
      "The contract names the work the supplier has to deliver, and says how you will see it being done.",
  },
  {
    label: "You bought small, in pieces",
    href: contractingSubPath("you-bought-small-in-pieces"),
    description:
      "You bought the work in small, separate pieces instead of one large block.",
  },
  {
    label: "You did not over-customise",
    href: contractingSubPath("you-did-not-over-customise"),
    description:
      "You changed your process to fit the software, rather than changing the software to fit your process.",
  },
  {
    label: "You can leave when you need to",
    href: contractingSubPath("you-can-leave-when-you-need-to"),
    description:
      "You can leave the supplier when you need to, with your data, your code, and the knowledge to move.",
  },
  {
    label: "You kept enough in-house",
    href: contractingSubPath("you-kept-enough-in-house"),
    description:
      "You held on to enough understanding to govern the work and to handle an exit.",
  },
];

export const CONTRACTING_LANDING = {
  title: "Contracting",
  opening:
    "Most government services are bought. Sometimes the whole thing, more often a part of it. When a supplier builds or runs your service, you manage it differently than one your own team made, and most of what decides how it goes is settled on the day you sign.",
  goodLooksIntro:
    "A handful of things, all of which you can check. Each one has its own page.",
  businessOwnerNote: {
    text: "Under Treasury Board's Directive on the Management of Procurement, your department is the “business owner.” A procurement specialist, the “contracting authority,” runs the buying. You own the result. That split is worth keeping in mind on every page here.",
    externalLinks: [
      {
        phrase: "Treasury Board's Directive on the Management of Procurement",
        linkKey: "directive-procurement",
      },
    ],
  } satisfies LinkedProse,
  whyItMatters:
    "The contract decides the future of your service. What it costs over its life, whether you can change it, whether you can ever move off it. Most of that is fixed when you sign, and undoing it later is slow and expensive. A good contract leaves your options open. A bad one closes them off, often without anyone noticing, for as long as the service runs.",
  whoseJob: {
    text: "Your department's. You can give the building to a supplier, but the responsibility stays with you. If the service lets a user down, “the contractor did it” is not an answer anyone will accept. The Directive says the same thing in plainer policy terms: the business owner is accountable for the outcomes, start to finish.",
    externalLinks: [{ phrase: "The Directive", linkKey: "directive-procurement" }],
  } satisfies LinkedProse,
  byRegionIntro:
    "Contracting runs through the whole life of a service, but it weighs more at some stages than others.",
  byRegion: [
    {
      region: "create" as const,
      weight: "heavy" as const,
      body: "This is where most of the contracting happens. You decide what to buy and how to buy it, and that sets up everything after. Heaviest.",
    },
    {
      region: "live" as const,
      weight: "medium" as const,
      body: "You have stopped buying. Now you hold the supplier to what was agreed, watch for the relationship drifting, and keep it working.",
    },
    {
      region: "sunset" as const,
      weight: "light" as const,
      body: "You are leaving. The contract ends, the data moves, and what you bought is retired or replaced. This is where the exit you planned for finally happens.",
    },
  ] satisfies WeightedRegionNote[],
  furtherReading: {
    text: "This thread sits under Treasury Board's Directive on the Management of Procurement, which takes an outcomes-based, lifecycle view of buying. It also draws on the Boots and Clarke guide to reforming IT procurement in Canada, the UK Service Manual, and Skylight's open agile procurement playbook. The outside sources are translated to Canadian rules.",
    externalLinks: [
      {
        phrase: "Treasury Board's Directive on the Management of Procurement",
        linkKey: "directive-procurement",
      },
    ],
  } satisfies LinkedProse,
  sources: PROCUREMENT_CONTRACTING_SOURCES,
};

export const PROCUREMENT_HELD_OPEN = {
  paragraphs: [
    {
      text: "Procurement is the process of buying: the competitions, the approvals, the paperwork that gets you to a signed contract. The PSPC Buyer's Portal is the official source for the federal acquisitions program.",
      externalLinks: [{ phrase: "Buyer's Portal", linkKey: "buyers-portal" }],
    },
    "Contracting is the agreement itself and how it is managed across the service's life — what the supplier must deliver, how you govern it, and whether you can leave when you need to.",
    "For now, this guide has its depth in the contracting thread. Fuller procurement content is still to come.",
  ] as const satisfies readonly (string | LinkedProse)[],
  linkTo: CONTRACTING_LANDING_PATH,
  linkLabel: "Go to the Contracting thread →",
};
