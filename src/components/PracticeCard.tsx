import { Link } from "@tanstack/react-router";
import { guideSubsectionTitle } from "@/lib/guide-typography";

export interface PracticeCardData {
  href: string;
  label: string;
  description: string;
}

export const practiceCardLinkClassName =
  "group flex h-full min-h-[7.5rem] flex-col rounded-lg border border-primary/20 border-l-2 border-l-primary/45 pl-3.5 pr-4 py-4 hover:border-primary/40 hover:border-l-primary/70 hover:shadow-sm transition-[border-color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export const practiceCardStaticClassName =
  "flex h-full min-h-[7.5rem] flex-col rounded-lg border border-primary/20 border-l-2 border-l-primary/45 pl-3.5 pr-4 py-4";

export function practiceCardGridCols(count: number) {
  return count >= 3
    ? "sm:grid-cols-2 lg:grid-cols-3"
    : count === 2
      ? "sm:grid-cols-2"
      : "grid-cols-1";
}

function PracticeCardContent({
  label,
  description,
  number,
  linked,
}: {
  label: string;
  description: string;
  number?: number;
  linked?: boolean;
}) {
  return (
    <>
      <h4 className="font-serif text-sm font-medium text-primary leading-tight">
        {number != null ? (
          <span className="tabular-nums text-primary/45 font-normal mr-1">{number}.</span>
        ) : null}
        {label}
      </h4>
      <p className="mt-1.5 flex-1 font-sans text-[10px] leading-[1.35] text-foreground/55">
        {description}
      </p>
      {linked ? <span className="sr-only"> — open practice page</span> : null}
    </>
  );
}

/** Same shell as linked practice cards, without navigation. */
export function PracticeCardStatic({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div
      className={practiceCardStaticClassName}
      style={{ backgroundColor: "var(--phase-group)" }}
    >
      <PracticeCardContent label={label} description={description} />
    </div>
  );
}

function PracticeCardLink({
  href,
  label,
  description,
  number,
}: PracticeCardData & { number?: number }) {
  const inner = (
    <PracticeCardContent
      label={label}
      description={description}
      number={number}
      linked
    />
  );

  if (href.startsWith("/")) {
    return (
      <Link
        to={href}
        className={practiceCardLinkClassName}
        style={{ backgroundColor: "var(--phase-group)" }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={practiceCardLinkClassName}
      style={{ backgroundColor: "var(--phase-group)" }}
    >
      {inner}
    </a>
  );
}

export function PracticeCard(props: PracticeCardData) {
  return <PracticeCardLink {...props} />;
}

export function PracticeCardGroup({
  heading,
  cards,
  numbered,
}: {
  heading?: string;
  cards: PracticeCardData[];
  numbered?: boolean;
}) {
  return (
    <div className={heading ? "mt-12 first:mt-6" : "mt-0"}>
      {heading ? <h3 className={guideSubsectionTitle}>{heading}</h3> : null}
      <ul
        className={`${heading ? "mt-2" : ""} grid gap-3 list-none pl-0 ${practiceCardGridCols(cards.length)}`}
      >
        {cards.map((card, index) => (
          <li key={card.href} className="min-h-0">
            <PracticeCardLink {...card} number={numbered ? index + 1 : undefined} />
          </li>
        ))}
      </ul>
    </div>
  );
}
