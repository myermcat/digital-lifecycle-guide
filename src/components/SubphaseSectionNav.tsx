import { Link } from "@tanstack/react-router";
import { ArrowDownToLine, Infinity as InfinityIcon } from "lucide-react";
import { guideLink } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export type SectionNavLink = {
  href: string;
  label: string;
  /** "phase" renders bolder and one size larger than "subphase". */
  level: "phase" | "subphase";
};

/**
 * Phase links carry the same icon the documents use for that phase.
 * Create's icon is an arrow, which reads as a second direction marker
 * next to the nav's own ← / →, so it is left out here.
 */
function phaseIconFor(href: string) {
  if (href.startsWith("/live")) return InfinityIcon;
  if (href.startsWith("/sunset")) return ArrowDownToLine;
  return null;
}

function sectionNavLinkClass(level: SectionNavLink["level"]) {
  return cn(
    guideLink,
    "font-sans",
    level === "phase" ? "text-base font-semibold" : "text-sm",
  );
}

function NavLinkContent({ link, side }: { link: SectionNavLink; side: "prev" | "next" }) {
  const PhaseIcon = link.level === "phase" ? phaseIconFor(link.href) : null;
  const icon = PhaseIcon ? (
    <PhaseIcon className="inline h-4 w-4 -translate-y-px" aria-hidden />
  ) : null;
  return (
    <span className="inline-flex items-center gap-1.5">
      {side === "prev" ? <span aria-hidden>←</span> : null}
      {icon}
      <span>{link.label}</span>
      {side === "next" ? <span aria-hidden>→</span> : null}
    </span>
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
          <NavLinkContent link={prev} side="prev" />
        </Link>
      ) : null}
      {next ? (
        <Link to={next.href} className={cn(sectionNavLinkClass(next.level), "text-right")}>
          <NavLinkContent link={next} side="next" />
        </Link>
      ) : null}
    </nav>
  );
}
