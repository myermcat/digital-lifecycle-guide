import { Link } from "@tanstack/react-router";
import { GuideLayout } from "@/components/GuideLayout";
import { GuideAssumptions } from "@/components/GuideAssumptions";
import { HeldOpenBlock } from "@/components/HeldOpenBlock";
import { PROCUREMENT_HELD_OPEN } from "@/lib/contracting-landing";
import { THREADS } from "@/lib/guide-strings";

export function ProcurementThreadPage() {
  const title = THREADS.procurement.title;

  return (
    <GuideLayout id="thread-procurement">
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
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

      <HeldOpenBlock
        linkTo={PROCUREMENT_HELD_OPEN.linkTo}
        linkLabel={PROCUREMENT_HELD_OPEN.linkLabel}
      >
        {PROCUREMENT_HELD_OPEN.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </HeldOpenBlock>

      <GuideAssumptions className="mt-14 md:mt-16 max-w-xl" />
      <div className="h-16" />
    </GuideLayout>
  );
}
