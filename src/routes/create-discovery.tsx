import { createFileRoute } from "@tanstack/react-router";
import { CreateDiscoveryPage } from "@/components/CreateDiscoveryPage";
import { LIFECYCLE_PHASE_META, SUBPHASE_META, subphasePageDocumentTitle } from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/create-discovery")({
  head: () => ({
    meta: [
      {
        title: subphasePageDocumentTitle(
          SUBPHASE_META.discovery.pageHeading,
          LIFECYCLE_PHASE_META.create.title,
        ),
      },
      { name: "description", content: SUBPHASE_META.discovery.subtitle },
    ],
  }),
  component: CreateDiscoveryPage,
});
