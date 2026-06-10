import { createFileRoute } from "@tanstack/react-router";
import { ContractingLandingPage } from "@/components/ContractingLandingPage";
import { CONTRACTING_LANDING } from "@/lib/contracting-landing";

export const Route = createFileRoute("/thread/contracting/")({
  head: () => ({
    meta: [
      { title: `${CONTRACTING_LANDING.title} — The Digital Lifecycle Guide` },
      { name: "description", content: CONTRACTING_LANDING.opening },
    ],
  }),
  component: ContractingLandingPage,
});
