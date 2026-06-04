import { guideSubsectionTitle } from "@/lib/guide-typography";

export interface PracticeCardData {
  href: string;
  label: string;
  description: string;
}

export function PracticeCard({ href, label, description }: PracticeCardData) {
  return (
    <a
      href={href}
      className="group flex h-full min-h-[7.5rem] flex-col rounded-lg border border-primary/20 border-l-2 border-l-primary/45 pl-3.5 pr-4 py-4 hover:border-primary/40 hover:border-l-primary/70 hover:shadow-sm transition-[border-color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ backgroundColor: "var(--region-group)" }}
    >
      <h4 className="font-serif text-sm font-medium text-primary leading-tight">
        {label}
      </h4>
      <p className="mt-1.5 flex-1 font-sans text-[10px] leading-[1.35] text-foreground/55">
        {description}
      </p>
      <span className="sr-only"> — open practice page</span>
    </a>
  );
}

export function PracticeCardGroup({
  heading,
  cards,
}: {
  heading: string;
  cards: PracticeCardData[];
}) {
  const cols =
    cards.length >= 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : cards.length === 2
        ? "sm:grid-cols-2"
        : "grid-cols-1";

  return (
    <div className="mt-12 first:mt-6">
      <h3 className={guideSubsectionTitle}>{heading}</h3>
      <ul
        className={`mt-2 grid gap-3 list-none pl-0 ${cols}`}
      >
        {cards.map((card) => (
          <li key={card.href} className="min-h-0">
            <PracticeCard {...card} />
          </li>
        ))}
      </ul>
    </div>
  );
}
