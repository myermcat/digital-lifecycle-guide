import { createFileRoute } from "@tanstack/react-router";
import { ApprovalJourneyPage } from "@/components/ApprovalJourneyPage";
import { APPROVAL_JOURNEY } from "@/lib/approval-journey-content";

export const Route = createFileRoute("/reference/approval-journey")({
  head: () => ({
    meta: [
      { title: `${APPROVAL_JOURNEY.title} — The Digital Lifecycle Guide` },
      { name: "description", content: APPROVAL_JOURNEY.intro[0] },
    ],
  }),
  component: ApprovalJourneyPage,
});
