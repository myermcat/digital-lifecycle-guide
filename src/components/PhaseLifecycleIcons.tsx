import type { SVGProps } from "react";

/** Exact path set from `src/assets/phase_icon_*.svg` — same icons as the documents. */

type PhaseIconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/** Create: arrow planting into a line. */
export function PhaseIconCreate({ className, ...props }: PhaseIconProps) {
  return (
    <svg {...props} {...baseProps} className={className}>
      <path d="M12 3v14" />
      <path d="m6 11 6 6 6-6" />
      <path d="M5 21h14" />
    </svg>
  );
}

/** Live: infinity loop. */
export function PhaseIconLive({ className, ...props }: PhaseIconProps) {
  return (
    <svg {...props} {...baseProps} className={className}>
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
    </svg>
  );
}

/** Sunset: arrow dropping below a horizon. */
export function PhaseIconSunset({ className, ...props }: PhaseIconProps) {
  return (
    <svg {...props} {...baseProps} className={className}>
      <path d="M12 10V3" />
      <path d="m8 7 4 4 4-4" />
      <path d="M2 16h20" />
      <path d="M4 20h16" />
    </svg>
  );
}
