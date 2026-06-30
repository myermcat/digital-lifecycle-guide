import { createFileRoute } from "@tanstack/react-router";
import { StayingFundedPage } from "@/components/StayingFundedPage";
import { STAYING_FUNDED } from "@/lib/staying-funded-content";
import { THREADS } from "@/lib/guide-strings";

export const Route = createFileRoute("/thread/funding/staying-funded")({
  head: () => ({
    meta: [
      {
        title: `${STAYING_FUNDED.title} — ${THREADS.funding.title} — The Digital Lifecycle Guide`,
      },
      { name: "description", content: STAYING_FUNDED.lead[0] },
    ],
  }),
  component: StayingFundedPage,
});
