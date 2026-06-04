export function DashedArrow({ direction }: { direction: "left" | "right" }) {
  const path =
    direction === "right" ? (
      <>
        <path d="M4 12 H44" />
        <path d="M34 7 L44 12 L34 17" strokeDasharray="0" />
      </>
    ) : (
      <>
        <path d="M44 12 H4" />
        <path d="M14 7 L4 12 L14 17" strokeDasharray="0" />
      </>
    );

  return (
    <svg
      viewBox="0 0 48 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="4 4"
      className="w-10 h-5 text-muted-foreground shrink-0"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

export { ArrowInVisual, InfinityVisual, ArrowOutVisual } from "./RegionVisuals.icons";
