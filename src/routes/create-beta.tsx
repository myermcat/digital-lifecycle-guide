import { createFileRoute } from "@tanstack/react-router";
import { CreateBetaPage } from "@/components/CreateBetaPage";
import { LIFECYCLE_PHASE_META, SUBPHASE_META, subphasePageDocumentTitle } from "@/lib/lifecycle-navigation";

export const Route = createFileRoute("/create-beta")({
  head: () => ({
    meta: [
      {
        title: subphasePageDocumentTitle(
          SUBPHASE_META.beta.pageHeading,
          LIFECYCLE_PHASE_META.create.title,
        ),
      },
      { name: "description", content: SUBPHASE_META.beta.subtitle },
    ],
  }),
  component: CreateBetaPage,
});
