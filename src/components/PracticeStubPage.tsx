import { Link } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { guideProse } from "@/lib/guide-typography";

export function PracticeStubPage({
  id,
  title,
  body,
  backHref = "/live-maturity",
  backLabel = "Back to Maturity",
}: {
  id: string;
  title: string;
  body: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <GuideLayout id={id}>
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <Link to={backHref} className="hover:text-foreground transition-colors">
            {backLabel}
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <span className="text-foreground/80">{title}</span>
        </nav>
        <h1 className="mt-4 font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.1]">
          {title}
        </h1>
        <div className="mt-4 h-px w-16 bg-border" />
      </header>

      <p className={guideProse}>{body}</p>

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
      <div className="h-16" />
    </GuideLayout>
  );
}
