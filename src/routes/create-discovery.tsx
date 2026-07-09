import { createFileRoute } from "@tanstack/react-router";
import { CreateDiscoveryPage } from "@/components/CreateDiscoveryPage";
import { SUBPHASE_META } from "@/lib/lifecycle-navigation";
import { PHASES } from "@/lib/guide-strings";

export const Route = createFileRoute("/create-discovery")({
  head: () => ({
    meta: [
      {
        title: `${SUBPHASE_META.discovery.subphase} — ${PHASES.create.title} — The Digital Lifecycle Guide`,
      },
      { name: "description", content: SUBPHASE_META.discovery.subtitle },
    ],
  }),
  component: CreateDiscoveryPage,
});
