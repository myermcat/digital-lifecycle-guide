import { createFileRoute } from "@tanstack/react-router";
import { CostingAServicePage } from "@/components/CostingAServicePage";
import { COSTING_A_SERVICE } from "@/lib/costing-a-service-content";
import { THREADS } from "@/lib/guide-strings";

export const Route = createFileRoute("/thread/funding/costing-a-service")({
  head: () => ({
    meta: [
      {
        title: `${COSTING_A_SERVICE.title} — ${THREADS.funding.title} — The Digital Lifecycle Guide`,
      },
      { name: "description", content: COSTING_A_SERVICE.lead[0] },
    ],
  }),
  component: CostingAServicePage,
});
