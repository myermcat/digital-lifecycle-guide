import { Radar, RotateCcw, Search, ShieldCheck, Siren, type LucideIcon } from "lucide-react";

/**
 * The lookup is keyed on the label the page shows, so the French page needs French
 * keys. Without them every one of the five icons fell back to the search glyph.
 */
export const SECURITY_LIFECYCLE_ICONS: Record<string, LucideIcon> = {
  Identifier: Search,
  Protéger: ShieldCheck,
  Détecter: Radar,
  Intervenir: Siren,
  Rétablir: RotateCcw,
};

export function securityLifecycleIconForLabel(label: string): LucideIcon {
  return SECURITY_LIFECYCLE_ICONS[label] ?? Search;
}
