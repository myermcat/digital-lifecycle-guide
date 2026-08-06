import { createFileRoute } from "@tanstack/react-router";
import { CheckpointMapPage } from "@/components/CheckpointMapPage";
import { CHECKPOINT_MAP_SUBTITLE, CHECKPOINT_MAP_TITLE } from "@/lib/checkpoint-map-content";

export const Route = createFileRoute("/gate-map")({
  head: () => ({
    meta: [
      {
        title: `${CHECKPOINT_MAP_TITLE} — The 2026 Digital Lifecycle Guide`,
      },
      {
        name: "description",
        content: CHECKPOINT_MAP_SUBTITLE.text,
      },
    ],
  }),
  component: CheckpointMapPage,
});
