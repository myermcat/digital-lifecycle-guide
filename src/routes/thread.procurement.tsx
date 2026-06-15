import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/thread/procurement")({
  component: ProcurementLayout,
});

function ProcurementLayout() {
  return <Outlet />;
}
