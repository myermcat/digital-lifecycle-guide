import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/thread/contracting/")({
  beforeLoad: () => {
    throw redirect({ to: "/thread/procurement" });
  },
});
