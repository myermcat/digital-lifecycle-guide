import { createFileRoute } from "@tanstack/react-router";
import { CreateAlphaPage } from "@/components/CreateAlphaPage";
import { SUBPHASE_META } from "@/lib/lifecycle-navigation";
import { PHASES } from "@/lib/guide-strings";

export const Route = createFileRoute("/create-alpha")({
  head: () => ({
    meta: [
      {
        title: `${SUBPHASE_META.alpha.subphase} — ${PHASES.create.title} — The Digital Lifecycle Guide`,
      },
      { name: "description", content: SUBPHASE_META.alpha.subtitle },
    ],
  }),
  component: CreateAlphaPage,
});
