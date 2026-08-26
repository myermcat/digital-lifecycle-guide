import { ToggleBlock } from "@/components/ToggleBlock";
import { ContextNote } from "@/components/ContextNote";
import { SETUP_TOGGLE_SOURCING, SETUP_TOGGLE_SIZE } from "@/lib/setup-toggles";

export { SETUP_TOGGLE_SOURCING, SETUP_TOGGLE_SIZE };

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
