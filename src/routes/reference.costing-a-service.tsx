import { createFileRoute, redirect } from "@tanstack/react-router";

/** Former Funding sub-page; content now lives on the Funding overview. */
export const Route = createFileRoute("/reference/costing-a-service")({
  beforeLoad: () => {
    throw redirect({ to: "/thread/$slug", params: { slug: "funding" } });
  },
});
