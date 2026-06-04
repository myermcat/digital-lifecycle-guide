import type { ReactNode } from "react";
import {
  guideProse,
  guideProseSpace,
  guideSectionTitle,
  guideLink,
} from "@/lib/guide-typography";

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
    <section className={className ?? "mt-10 md:mt-12"}>
      <h2 className={`${guideSectionTitle} mb-5`}>{title}</h2>
      <div className={guideProseSpace}>{children}</div>
    </section>
  );
}

export function MutedNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={className ?? `${guideProse} text-foreground/60`}>{children}</p>
  );
}

export function ProseList({ children }: { children: ReactNode }) {
  return <ul className="space-y-3.5 list-none pl-0">{children}</ul>;
}

export function ProseListItem({
  lead,
  children,
}: {
  lead: string;
  children?: ReactNode;
}) {
  return (
    <li className={guideProse}>
      {children ? (
        <>
          {lead} {children}
        </>
      ) : (
        lead
      )}
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
    <p className={guideProse}>
      <a href={href} className={`font-semibold text-foreground/90 ${guideLink}`}>
        {lead}
      </a>{" "}
      {rest}
    </p>
  );
}
