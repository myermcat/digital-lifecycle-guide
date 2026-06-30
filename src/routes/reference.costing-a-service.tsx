import { createFileRoute, redirect } from "@tanstack/react-router";
import { COSTING_A_SERVICE_PATH } from "@/lib/reference-paths";

export const Route = createFileRoute("/reference/costing-a-service")({
  beforeLoad: () => {
    throw redirect({ to: COSTING_A_SERVICE_PATH });
  },
});
