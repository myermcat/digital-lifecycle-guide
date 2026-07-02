import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreatePhasePage } from "@/components/CreatePhasePage";
import { createPhaseLeadPlainText, CREATE_PHASE } from "@/lib/create-phase-content";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: `${CREATE_PHASE.title} — The Digital Lifecycle Guide` },
      { name: "description", content: createPhaseLeadPlainText },
    ],
  }),
  component: CreatePhasePage,
});
