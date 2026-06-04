import type { ReactNode } from "react";

/** Groups practice headings and cards under one left rule inside a phase section. */
export function PracticeActivitiesPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        className ??
        "mt-6 border-l-2 border-primary/30 pl-5 md:pl-6"
      }
    >
      {children}
    </div>
  );
}
