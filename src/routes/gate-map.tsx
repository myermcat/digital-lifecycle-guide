import { createFileRoute } from "@tanstack/react-router";
import { GateMapPage } from "@/components/GateMapPage";
import { GATE_MAP_SUBTITLE, GATE_MAP_TITLE } from "@/lib/gate-map-content";

export const Route = createFileRoute("/gate-map")({
  head: () => ({
    meta: [
      {
        title: `${GATE_MAP_TITLE} — The Digital Lifecycle Guide`,
      },
      {
        name: "description",
        content: GATE_MAP_SUBTITLE.text,
      },
    ],
  }),
  component: GateMapPage,
});
