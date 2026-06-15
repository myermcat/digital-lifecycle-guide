import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/thread/contracting/$page")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/thread/procurement/$page",
      params: { page: params.page },
    });
  },
});
