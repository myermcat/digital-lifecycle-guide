import { createFileRoute } from "@tanstack/react-router";
import { FundingTheExitPage } from "@/components/FundingTheExitPage";
import { FUNDING_THE_EXIT } from "@/lib/funding-the-exit-content";
import { THREADS } from "@/lib/guide-strings";

export const Route = createFileRoute("/thread/funding/funding-the-exit")({
  head: () => ({
    meta: [
      {
        title: `${FUNDING_THE_EXIT.title} — ${THREADS.funding.title} — The Digital Lifecycle Guide`,
      },
      { name: "description", content: FUNDING_THE_EXIT.lead[0] },
    ],
  }),
  component: FundingTheExitPage,
});
