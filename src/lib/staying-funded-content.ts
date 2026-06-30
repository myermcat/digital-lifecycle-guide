import type { SourceItem } from "@/components/SourcesBlock";
import type { ExternalLinkKey } from "@/lib/external-links";

export const STAYING_FUNDED = {
  title: "Staying funded once a service is live",

  lead: [
    "Getting a service funded is only the beginning. A running service has to stay funded, year after year, and that takes attention.",
  ],

  whatThisTakes: {
    id: "what-this-takes",
    title: "What this takes",
    items: [
      {
        lead: "Run within the budget.",
        body: "A live service runs on the money secured for it. Spending is tracked against that budget so the service does not run short partway through the year.",
      },
      {
        lead: "Plan renewals early.",
        body: "Some funding is time-limited and runs out on a set date. The next funding decision, a renewal or an expansion, has to be started well before the current money ends, because approval takes months.",
      },
      {
        lead: "Adjust when priorities shift.",
        body: "If the work changes, a department can move money it already holds toward the service, or has to make a fresh request for more.",
      },
    ],
    closing:
      "A service that watches its funding stays ahead of the moment the money runs out. A service that does not often finds out too late, and has to cut features or pause work to get through the year.",
  },

  sources: [
    {
      label: "Supporting reference",
      linkKey: "lop-funding-new-government-initiatives" satisfies ExternalLinkKey,
    },
  ] satisfies SourceItem[],
} as const;
