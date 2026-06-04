export interface PracticeCardData {
  href: string;
  label: string;
  description: string;
}

export function PracticeCard({ href, label, description }: PracticeCardData) {
  return (
    <div
      className="flex flex-col sm:flex-row rounded-xl overflow-hidden border border-border shadow-sm"
      style={{ backgroundColor: "var(--region-group)" }}
    >
      <p className="flex-[1.35] p-5 text-xs md:text-sm leading-relaxed text-foreground/85">
        {description}
      </p>
      <a
        href={href}
        className="group/link flex sm:flex-[0.65] min-h-[3.5rem] items-center border-t sm:border-t-0 sm:border-l border-border bg-primary/10 px-5 py-4 text-sm font-semibold leading-snug text-primary hover:bg-primary/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="group-hover/link:underline underline-offset-4">{label}</span>
        <span className="sr-only"> — open practice page</span>
      </a>
    </div>
  );
}

export function PracticeCardGroup({
  heading,
  cards,
}: {
  heading: string;
  cards: PracticeCardData[];
}) {
  return (
    <div className="mt-8 first:mt-6">
      <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground tracking-tight mb-4">
        {heading}
      </h3>
      <div className="space-y-3">
        {cards.map((card) => (
          <PracticeCard key={card.href} {...card} />
        ))}
      </div>
    </div>
  );
}
