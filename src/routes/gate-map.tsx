import { createFileRoute } from "@tanstack/react-router";
import { CheckpointMapPage } from "@/components/CheckpointMapPage";
import { CHECKPOINT_MAP_SUBTITLE, CHECKPOINT_MAP_TITLE } from "@/lib/checkpoint-map-content";
import { SITE_NAME } from "@/lib/site-meta";

export const Route = createFileRoute("/gate-map")({
  head: () => ({
    meta: [
      {
        title: `${CHECKPOINT_MAP_TITLE} — ${SITE_NAME}`,
      },
      {
        name: "description",
        content: CHECKPOINT_MAP_SUBTITLE.text,
      },
    ],
  }),
  component: CheckpointMapPage,
});
