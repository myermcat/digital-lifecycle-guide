import { Link } from "@tanstack/react-router";
import {
  guideClickableCardFillStyle,
  guideStaticCardClassName,
} from "@/lib/guide-cards";
import { guideSubsectionTitle } from "@/lib/guide-typography";

export {
  guideClickableCardFillStyle,
  guideStaticCardClassName,
} from "@/lib/guide-cards";

export interface PracticeCardData {
  href: string;
  label: string;
  description: string;
}

export const interactiveCardFocus =
  "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export const interactiveCardHover =
  "hover:border-primary/55 hover:bg-primary/[0.06] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200";

/** Linked practice cards and popup phase preview cards (Security, etc.). */
export const practiceCardLinkClassName = `group flex h-full min-h-[7.5rem] flex-col rounded-lg border border-primary/20 border-l-2 border-l-primary/45 pl-3.5 pr-4 py-4 ${interactiveCardFocus} ${interactiveCardHover} hover:border-l-primary`;

/** Review-level and similar panel cards that navigate on click. */
export const interactivePanelCardClassName = `group flex flex-1 flex-col rounded-lg border border-primary/25 px-4 py-4 md:min-w-0 md:px-5 md:py-5 ${interactiveCardFocus} ${interactiveCardHover}`;

/** Homepage phase cards that open a dialog on click. */
export const phaseDialogTriggerClassName = `group relative aspect-[4/5] w-full rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-sm ${interactiveCardFocus} hover:border-primary/40 hover:bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-3 p-6 overflow-hidden`;

export const practiceCardStaticClassName = `flex h-full min-h-[7.5rem] flex-col rounded-lg border border-primary/20 border-l-2 border-l-primary/45 pl-3.5 pr-4 py-4 ${guideStaticCardClassName}`;

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
    <div className={practiceCardStaticClassName}>
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
        style={guideClickableCardFillStyle}
      >
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={practiceCardLinkClassName}
      style={guideClickableCardFillStyle}
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
