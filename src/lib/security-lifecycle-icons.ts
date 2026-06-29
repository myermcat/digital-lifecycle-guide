import { Radar, RotateCcw, Search, ShieldCheck, Siren, type LucideIcon } from "lucide-react";

export const SECURITY_LIFECYCLE_ICONS: Record<string, LucideIcon> = {
  Identify: Search,
  Protect: ShieldCheck,
  Detect: Radar,
  Respond: Siren,
  Recover: RotateCcw,
};

export function securityLifecycleIconForLabel(label: string): LucideIcon {
  return SECURITY_LIFECYCLE_ICONS[label] ?? Search;
}
