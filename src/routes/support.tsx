import { createFileRoute } from "@tanstack/react-router";
import { SupportCommunitiesPage } from "@/components/SupportCommunitiesPage";
import { SUPPORT_PAGE } from "@/lib/support-content";
import { SITE_NAME } from "@/lib/site-meta";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: `${SUPPORT_PAGE.title} — ${SITE_NAME}` },
      { name: "description", content: SUPPORT_PAGE.lead },
    ],
  }),
  component: SupportCommunitiesPage,
});
