import { UI } from "@/lib/ui-strings";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { SITE_NAME } from "@/lib/site-meta";

/**
 * The assistant route.
 *
 * lazyRouteComponent keeps the page and its corpus loader out of the main bundle, so
 * a reader who never opens the assistant downloads none of it and the guide's own
 * pages are unchanged. The corpus itself (about 176 KB gzipped) is fetched only when
 * this page mounts.
 */
export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: `Ask the guide — ${SITE_NAME}` },
      {
        name: "description",
        content:
          UI.assistantMetaDescription,
      },
    ],
  }),
  component: lazyRouteComponent(
    () => import("@/components/AssistantPage"),
    "AssistantPage",
  ),
});
