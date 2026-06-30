import { createFileRoute, redirect } from "@tanstack/react-router";
import { STAYING_FUNDED_PATH } from "@/lib/reference-paths";

export const Route = createFileRoute("/reference/staying-funded")({
  beforeLoad: () => {
    throw redirect({ to: STAYING_FUNDED_PATH });
  },
});
