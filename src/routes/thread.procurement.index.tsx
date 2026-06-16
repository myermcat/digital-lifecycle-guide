import { createFileRoute } from "@tanstack/react-router";
import { ProcurementLandingPage } from "@/components/ProcurementLandingPage";
import { PROCUREMENT_LANDING } from "@/lib/procurement-landing";

export const Route = createFileRoute("/thread/procurement/")({
  head: () => ({
    meta: [
      { title: `${PROCUREMENT_LANDING.title} — The Digital Lifecycle Guide` },
      { name: "description", content: PROCUREMENT_LANDING.intro.paragraphs[0] },
    ],
  }),
  component: ProcurementLandingPage,
});
