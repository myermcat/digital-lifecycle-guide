import { createFileRoute } from "@tanstack/react-router";
import { ProcurementLandingPage } from "@/components/ProcurementLandingPage";
import { PROCUREMENT_LANDING } from "@/lib/procurement-landing";
import { SITE_NAME } from "@/lib/site-meta";

export const Route = createFileRoute("/thread/procurement/")({
  head: () => ({
    meta: [
      { title: `${PROCUREMENT_LANDING.title} — ${SITE_NAME}` },
      { name: "description", content: PROCUREMENT_LANDING.intro.paragraphs[0] },
    ],
  }),
  component: ProcurementLandingPage,
});
