import { createFileRoute } from "@tanstack/react-router";
import { SupportCommunitiesPage } from "@/components/SupportCommunitiesPage";
import { SUPPORT_PAGE } from "@/lib/support-content";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: `${SUPPORT_PAGE.title} — The Digital Lifecycle Guide` },
      { name: "description", content: SUPPORT_PAGE.lead },
    ],
  }),
  component: SupportCommunitiesPage,
});
