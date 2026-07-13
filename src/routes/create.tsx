import { createFileRoute } from "@tanstack/react-router";
import { CreatePhasePage } from "@/components/CreatePhasePage";
import { createPhaseLeadPlainText } from "@/lib/create-phase-content";
import { PHASES } from "@/lib/guide-strings";
import { phasePageDocumentTitle } from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: phasePageDocumentTitle(PHASES.create.pageHeading) },
      { name: "description", content: createPhaseLeadPlainText },
    ],
  }),
  component: CreatePhasePage,
});
