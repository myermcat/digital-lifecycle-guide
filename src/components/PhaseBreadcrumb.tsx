import { Link } from "@tanstack/react-router";
import { guidePageTitle } from "@/lib/guide-typography";

interface PhaseBreadcrumbProps {
  lifecyclePhase: string;
  lifecyclePhaseHref: string;
  subphase?: string;
  className?: string;
}

export function PhaseBreadcrumb({
  lifecyclePhase,
  lifecyclePhaseHref,
  subphase,
  className,
}: PhaseBreadcrumbProps) {
  const title = subphase ?? lifecyclePhase;

  return (
    <header className={className}>
      <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
          ›
        </span>
        {subphase ? (
          <>
            <Link to={lifecyclePhaseHref} className="hover:text-foreground transition-colors">
              {lifecyclePhase}
            </Link>
            <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
              ›
            </span>
            <span className="text-foreground/80">{subphase}</span>
          </>
        ) : (
          <span className="text-foreground/80">{lifecyclePhase}</span>
        )}
      </nav>
      <h1 className={`mt-4 ${guidePageTitle}`}>
        {title}
      </h1>
    </header>
  );
}
