import { createFileRoute } from "@tanstack/react-router";
import { LivePhasePage } from "@/components/LivePhasePage";
import { livePhaseLeadPlainText } from "@/lib/live-phase-content";
import { PHASES } from "@/lib/guide-strings";
import { phasePageDocumentTitle } from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: phasePageDocumentTitle(PHASES.live.pageHeading) },
      { name: "description", content: livePhaseLeadPlainText },
    ],
  }),
  component: LivePhasePage,
});
