import { createFileRoute, redirect } from "@tanstack/react-router";
import { THREADS } from "@/lib/guide-strings";

export const Route = createFileRoute("/create-design-for-the-whole-journey")({
  beforeLoad: () => {
    throw redirect({ to: THREADS["joined-up-delivery"].path });
  },
});
