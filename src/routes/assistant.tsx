import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

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
      { title: "Ask the guide — The 2026 Digital Lifecycle Guide" },
      {
        name: "description",
        content:
          "Ask a question and find the parts of the Digital Lifecycle Guide that answer it, with a link to each one.",
      },
    ],
  }),
  component: lazyRouteComponent(
    () => import("@/components/AssistantPage"),
    "AssistantPage",
  ),
});
