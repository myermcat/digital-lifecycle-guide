import { createFileRoute } from "@tanstack/react-router";
import { ManagingWhatYouBoughtPage } from "@/components/ManagingWhatYouBoughtPage";
import { MANAGING_WHAT_YOU_BOUGHT } from "@/lib/managing-what-you-bought-content";

export const Route = createFileRoute("/reference/managing-what-you-bought")({
  head: () => ({
    meta: [
      { title: `${MANAGING_WHAT_YOU_BOUGHT.title} — The Digital Lifecycle Guide` },
      {
        name: "description",
        content: MANAGING_WHAT_YOU_BOUGHT.intro[0],
      },
    ],
  }),
  component: ManagingWhatYouBoughtPage,
});
