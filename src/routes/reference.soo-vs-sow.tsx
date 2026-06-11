import { createFileRoute } from "@tanstack/react-router";
import { SooVsSowPage } from "@/components/SooVsSowPage";
import { SOO_VS_SOW } from "@/lib/soo-vs-sow-content";

export const Route = createFileRoute("/reference/soo-vs-sow")({
  head: () => ({
    meta: [
      { title: `${SOO_VS_SOW.title} — The Digital Lifecycle Guide` },
      { name: "description", content: SOO_VS_SOW.opening },
    ],
  }),
  component: SooVsSowPage,
});
