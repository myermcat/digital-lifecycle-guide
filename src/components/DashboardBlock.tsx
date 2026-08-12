import { LifecycleVisual } from "@/components/LifecycleVisual";
import { LIFECYCLE_VISUALS } from "@/lib/lifecycle-visuals";

/**
 * Kept only so content-driven `type: "dashboard"` sections keep working.
 *
 * There is one dashboard picture in the guide, `service_dashboard.svg`, and
 * every page that shows a dashboard shows that one. This used to build its own
 * dashboard out of divs, which meant the guide had two different dashboards
 * depending on which code path rendered it. The variant prop is accepted and
 * ignored on purpose, so no caller can reintroduce a second look.
 */
export type DashboardBlockVariant =
  | "alpha"
  | "beta"
  | "stabilization"
  | "maturity"
  | "monitoring";

export function DashboardBlock(_props: { variant?: DashboardBlockVariant; href?: string }) {
  return <LifecycleVisual visual={LIFECYCLE_VISUALS.serviceDashboard} className="mt-5" />;
}
