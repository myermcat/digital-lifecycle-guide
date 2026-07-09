import { Link } from "@tanstack/react-router";
import { guideLink } from "@/lib/guide-typography";

export function SubphaseSectionNav({
  prev,
  next,
  className,
}: {
  prev: { href: string; label: string };
  next: { href: string; label: string };
  className?: string;
}) {
  const linkClass = `${guideLink} text-sm font-sans`;

  return (
    <nav
      aria-label="Subphases"
      className={className ?? "mt-8 flex items-center justify-between gap-4 border-t border-border/60 pt-6"}
    >
      <Link to={prev.href} className={linkClass}>
        ← {prev.label}
      </Link>
      <Link to={next.href} className={`${linkClass} text-right`}>
        {next.label} →
      </Link>
    </nav>
  );
}
