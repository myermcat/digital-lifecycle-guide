import { createFileRoute } from "@tanstack/react-router";
import { LivePhasePage } from "@/components/LivePhasePage";
import { livePhaseLeadPlainText, LIVE_PHASE } from "@/lib/live-phase-content";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: `${LIVE_PHASE.title} — The Digital Lifecycle Guide` },
      { name: "description", content: livePhaseLeadPlainText },
    ],
  }),
  component: LivePhasePage,
});
