import { guideSubsectionTitle } from "@/lib/guide-typography";

export interface PracticeCardData {
  href: string;
  label: string;
  description: string;
}

export function PracticeCard({ href, label, description }: PracticeCardData) {
  return (
    <div className="flex flex-row rounded-lg overflow-hidden bg-foreground text-primary-foreground shadow-sm">
      <p className="flex-[1.4] px-4 py-2.5 text-xs md:text-sm leading-snug text-primary-foreground/80">
        {description}
      </p>
      <a
        href={href}
        className="group/link flex flex-[0.6] shrink-0 items-center border-l border-primary-foreground/15 bg-primary px-3.5 py-2.5 text-xs md:text-sm font-medium leading-snug text-primary-foreground hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="group-hover/link:underline">{label}</span>
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
    <div className="mt-6 first:mt-5">
      <h3 className={`${guideSubsectionTitle} mb-2.5`}>{heading}</h3>
      <div className="space-y-2">
        {cards.map((card) => (
          <PracticeCard key={card.href} {...card} />
        ))}
      </div>
    </div>
  );
}
