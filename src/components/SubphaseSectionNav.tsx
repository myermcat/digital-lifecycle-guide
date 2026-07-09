import { Link } from "@tanstack/react-router";
import { guideLink } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export function SubphaseSectionNav({
  prev,
  next,
  className,
}: {
  prev?: { href: string; label: string };
  next: { href: string; label: string };
  className?: string;
}) {
  const linkClass = `${guideLink} text-sm font-sans`;

  return (
    <nav
      aria-label="Subphases"
      className={cn(
        className ?? "mt-8 flex items-center gap-4 border-t border-border/60 pt-6",
        prev ? "justify-between" : "justify-end",
      )}
    >
      {prev ? (
        <Link to={prev.href} className={linkClass}>
          ← {prev.label}
        </Link>
      ) : null}
      <Link to={next.href} className={`${linkClass} text-right`}>
        {next.label} →
      </Link>
    </nav>
  );
}
