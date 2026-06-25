import lifecycleVisual from "@/assets/lifecycle_three_regions_bow.svg?url";
import { cn } from "@/lib/utils";

export const LIFECYCLE_THREE_REGIONS_ALT =
  "A solid arrow labelled Create points into a large infinity loop labelled Live, then a dashed fading arrow labelled Sunset points out of it.";

type LifecycleThreeRegionsFigureProps = {
  className?: string;
  /** Featured: home page. Inline: by-phase sections above phase cards. */
  variant?: "featured" | "inline";
};

export function LifecycleThreeRegionsFigure({
  className,
  variant = "inline",
}: LifecycleThreeRegionsFigureProps) {
  const isFeatured = variant === "featured";

  return (
    <figure
      className={cn(
        "mx-auto",
        isFeatured ? "max-w-3xl" : "max-w-md -mt-1 mb-3 opacity-45",
        className,
      )}
    >
      <img
        src={lifecycleVisual}
        alt={LIFECYCLE_THREE_REGIONS_ALT}
        className="w-full h-auto"
        width={760}
        height={250}
      />
    </figure>
  );
}
