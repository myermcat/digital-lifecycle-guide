import type { ReactNode } from "react";

const proseClass =
  "font-serif text-[1.1rem] md:text-lg leading-[1.75] text-foreground/90 space-y-6";

export function PhaseSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className ?? "mt-14 md:mt-16"}>
      <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6">
        {title}
      </h2>
      <div className={proseClass}>{children}</div>
    </section>
  );
}

export function MutedNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={
        className ??
        "text-sm leading-relaxed text-muted-foreground font-serif"
      }
    >
      {children}
    </p>
  );
}

export function ProseList({ children }: { children: ReactNode }) {
  return <ul className="space-y-5 list-none pl-0">{children}</ul>;
}

export function ProseListItem({
  lead,
  children,
}: {
  lead: string;
  children?: ReactNode;
}) {
  return (
    <li className="font-serif text-[1.1rem] md:text-lg leading-[1.75] text-foreground/90">
      <strong className="font-semibold text-foreground">{lead}</strong>
      {children ? <> {children}</> : null}
    </li>
  );
}

export function LinkedLeadSentence({
  href,
  lead,
  rest,
}: {
  href: string;
  lead: string;
  rest: string;
}) {
  return (
    <p className="font-serif text-[1.1rem] md:text-lg leading-[1.75] text-foreground/90">
      <a
        href={href}
        className="font-semibold text-primary underline underline-offset-4 hover:opacity-80"
      >
        {lead}
      </a>{" "}
      {rest}
    </p>
  );
}
