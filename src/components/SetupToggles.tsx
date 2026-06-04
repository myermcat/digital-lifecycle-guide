import { ToggleBlock } from "@/components/ToggleBlock";
import { ContextNote } from "@/components/ContextNote";
import { SOURCING_KEY, SIZE_KEY } from "@/lib/guide-settings";

export const SETUP_TOGGLE_SOURCING = {
  heading: "Buy vs build",
  prose:
    "The practices stay the same. What changes is who does the work — your team, a supplier, or both.",
  options: ["In-house", "Bought", "Mix"],
  storageKey: SOURCING_KEY,
} as const;

export const SETUP_TOGGLE_SIZE = {
  heading: "Size",
  prose: "The practices apply at any size. What changes is how heavy each one is.",
  options: ["Small", "Medium", "Large", "Enterprise"],
  storageKey: SIZE_KEY,
} as const;

interface SetupTogglesProps {
  getMessage?: (sourcing: string | null, size: string | null) => string;
  className?: string;
}

export function SetupToggles({ getMessage, className }: SetupTogglesProps) {
  return (
    <div className={className}>
      <div className="grid gap-5 md:grid-cols-2">
        <ToggleBlock {...SETUP_TOGGLE_SOURCING} />
        <ToggleBlock {...SETUP_TOGGLE_SIZE} />
      </div>
      <ContextNote getMessage={getMessage} />
    </div>
  );
}
