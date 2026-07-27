import { Link } from "@tanstack/react-router";
import { guideLink } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export type SectionNavLink = {
  href: string;
  label: string;
  /** "phase" renders bolder and one size larger than "subphase". */
  level: "phase" | "subphase";
};

function sectionNavLinkClass(level: SectionNavLink["level"]) {
  return cn(
    guideLink,
    "font-sans",
    level === "phase" ? "text-base font-semibold" : "text-sm",
  );
}

export function SubphaseSectionNav({
  prev,
  next,
  className,
}: {
  prev?: SectionNavLink;
  next?: SectionNavLink;
  className?: string;
}) {
  return (
    <nav
      aria-label="Phases and sub-phases"
      className={cn(
        className ?? "mt-8 flex items-center gap-4 border-t border-border/60 pt-6",
        prev ? "justify-between" : "justify-end",
      )}
    >
      {prev ? (
        <Link to={prev.href} className={sectionNavLinkClass(prev.level)}>
          ← {prev.label}
        </Link>
      ) : null}
      {next ? (
        <Link to={next.href} className={cn(sectionNavLinkClass(next.level), "text-right")}>
          {next.label} →
        </Link>
      ) : null}
    </nav>
  );
}
