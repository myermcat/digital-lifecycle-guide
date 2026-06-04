import { Link } from "@tanstack/react-router";
import { guideProse } from "@/lib/guide-typography";

interface PhaseBreadcrumbProps {
  region: string;
  regionHref: string;
  phase?: string;
  subtitle: string;
}

export function PhaseBreadcrumb({
  region,
  regionHref,
  phase,
  subtitle,
}: PhaseBreadcrumbProps) {
  const title = phase ?? region;

  return (
    <header className="mb-10 md:mb-14">
      <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
          ›
        </span>
        {phase ? (
          <>
            <Link to={regionHref} className="hover:text-foreground transition-colors">
              {region}
            </Link>
            <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
              ›
            </span>
            <span className="text-foreground/80">{phase}</span>
          </>
        ) : (
          <span className="text-foreground/80">{region}</span>
        )}
      </nav>
      <h1 className="mt-4 font-serif text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
        {title}
      </h1>
      <p className={`mt-2 text-lg md:text-xl leading-snug ${guideProse}`}>
        {subtitle}
      </p>
      <div className="mt-6 h-px w-16 bg-border" />
    </header>
  );
}
