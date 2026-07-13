import { createFileRoute } from "@tanstack/react-router";
import { CreateAlphaPage } from "@/components/CreateAlphaPage";
import { LIFECYCLE_PHASE_META, SUBPHASE_META, subphasePageDocumentTitle } from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/create-alpha")({
  head: () => ({
    meta: [
      {
        title: subphasePageDocumentTitle(
          SUBPHASE_META.alpha.pageHeading,
          LIFECYCLE_PHASE_META.create.title,
        ),
      },
      { name: "description", content: SUBPHASE_META.alpha.subtitle },
    ],
  }),
  component: CreateAlphaPage,
});
