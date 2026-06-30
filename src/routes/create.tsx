import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreatePhasePage } from "@/components/CreatePhasePage";
import { createPhaseLeadPlainText, CREATE_PHASE } from "@/lib/create-phase-content";
import { DESIGN_FOR_WHOLE_JOURNEY_LEGACY_PATH, DESIGN_FOR_WHOLE_JOURNEY_PATH } from "@/lib/reference-paths";

export const Route = createFileRoute("/create")({
  beforeLoad: ({ location }) => {
    if (location.pathname.endsWith(DESIGN_FOR_WHOLE_JOURNEY_LEGACY_PATH)) {
      throw redirect({ to: DESIGN_FOR_WHOLE_JOURNEY_PATH });
    }
  },
  head: () => ({
    meta: [
      { title: `${CREATE_PHASE.title} — The Digital Lifecycle Guide` },
      { name: "description", content: createPhaseLeadPlainText },
    ],
  }),
  component: CreatePhasePage,
});
