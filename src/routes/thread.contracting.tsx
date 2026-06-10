import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/thread/contracting")({
  component: ContractingLayout,
});

function ContractingLayout() {
  return <Outlet />;
}
