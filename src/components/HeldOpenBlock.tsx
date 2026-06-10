import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { guideProse, guideLink } from "@/lib/guide-typography";

export function HeldOpenBlock({
  children,
  linkTo,
  linkLabel,
  className,
}: {
  children: ReactNode;
  linkTo?: string;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <aside
      className={
        className ??
        "mt-8 rounded-xl border border-dashed border-primary/30 bg-background px-5 py-5 md:px-6 md:py-6"
      }
    >
      <div className={`${guideProse} space-y-3`}>{children}</div>
      {linkTo && linkLabel ? (
        <p className="mt-4">
          <Link to={linkTo} className={guideLink}>
            {linkLabel}
          </Link>
        </p>
      ) : null}
    </aside>
  );
}
