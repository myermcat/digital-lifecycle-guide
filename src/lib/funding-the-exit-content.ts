import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalLinkKey } from "@/lib/external-links";
import { THREADS } from "@/lib/guide-strings";

export const FUNDING_THE_EXIT = {
  title: "Funding the exit",

  lead: [
    "Retiring or replacing a service is not free. The move costs money, and so does shutting the old service down cleanly. A department that has not budgeted for the exit can find itself stuck paying for a service it wants to leave.",
  ],

  whatCostsMoney: {
    id: "what-costs-money-at-the-end",
    title: "What costs money at the end",
    items: [
      {
        lead: "Moving the data and the service.",
        body: "Getting the data out, moving it to whatever comes next, and standing up the replacement all take effort and money. The data side of the move is its own piece of work.",
        internalLinks: [
          { phrase: "data side of the move", to: THREADS["data-stewardship"].path },
        ],
      },
      {
        lead: "Winding the old service down.",
        body: "Running two services in parallel during a transition, then decommissioning the old one, has a cost.",
      },
      {
        lead: "Closing the contracts.",
        body: "Ending a supplier contract cleanly, and any transition support in it, is part of the bill.",
      },
    ],
    closing:
      "The money for the exit is set aside before the current funding ends, so the move is planned rather than scrambled. An exit left unfunded tends to stall, and the old service runs on at cost long after it should have gone.",
  },

  sources: [
    {
      label: "Supporting reference",
      linkKey: "lop-funding-new-government-initiatives" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;
