import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ContentTodo } from "@/components/ContentTodo";
import { guideStaticCardClassName } from "@/lib/guide-cards";
import { PHASES, type LifecyclePhaseId } from "@/lib/guide-strings";
import { guideLink, guideProse, guideProseSpace, guideProseTight } from "@/lib/guide-typography";

export type WeightedPhaseNote = {
  lifecyclePhase: LifecyclePhaseId;
  body: string;
  weight: "heavy" | "medium" | "light";
};

/** @deprecated Use WeightedPhaseNote */
export type WeightedRegionNote = WeightedPhaseNote;

const weightStyles: Record<
  WeightedPhaseNote["weight"],
  { box: string; title: string; body: string }
> = {
  heavy: {
    box: `rounded-xl border border-primary/30 px-5 py-5 md:px-6 md:py-6 ${guideStaticCardClassName}`,
    title: "font-serif text-xl md:text-2xl font-semibold text-primary tracking-tight",
    body: guideProse,
  },
  medium: {
    box: `rounded-lg border border-border/80 px-4 py-4 md:px-5 md:py-5 ${guideStaticCardClassName}`,
    title: "font-serif text-lg font-semibold text-primary/85 tracking-tight",
    body: `${guideProse} text-foreground/80`,
  },
  light: {
    box: `rounded-lg border border-border/60 px-4 py-3.5 md:px-5 md:py-4 ${guideStaticCardClassName}`,
    title: "font-serif text-base font-semibold text-primary/75 tracking-tight",
    body: `${guideProse} text-foreground/70`,
  },
};

export function WeightedPhaseBlock({ phases }: { phases: WeightedPhaseNote[] }) {
  return (
    <PhaseFitCards
      cards={phases.map((note) => ({
        lifecyclePhase: note.lifecyclePhase,
        body: note.body,
        weight: note.weight,
      }))}
    />
  );
}

const compactCardStyles = {
  box: `rounded-md border border-border/45 px-3.5 py-3 md:px-4 md:py-3.5 ${guideStaticCardClassName}`,
  title: "font-serif text-sm font-semibold text-primary/65 tracking-tight",
  body: `${guideProseTight} text-foreground/60`,
};

export type PhaseFitCard = {
  lifecyclePhase?: LifecyclePhaseId;
  /** When set, used instead of the lifecycle phase title (e.g. thread names on "Where to go next"). */
  title?: string;
  body: string;
  /** When set, rendered instead of the plain body string (e.g. inline links in phase notes). */
  bodyContent?: ReactNode;
  weight: WeightedPhaseNote["weight"];
  /** Smaller, lighter cards — for reference pages and secondary phase callouts. */
  compact?: boolean;
  linkTo?: string;
  linkLabel?: string;
  todo?: { title: string; items: string[] };
};

export function PhaseFitCards({ cards }: { cards: PhaseFitCard[] }) {
  return (
    <div className={`${guideProseSpace} mt-4`}>
      {cards.map((card) => {
        const styles = card.compact ? compactCardStyles : weightStyles[card.weight];
        const cardTitle =
          card.title ??
          (card.lifecyclePhase ? `${PHASES[card.lifecyclePhase].title}.` : "");
        const cardKey = card.title ?? card.lifecyclePhase ?? card.body;
        return (
          <div key={cardKey} className={styles.box}>
            <h3 className={styles.title}>{cardTitle}</h3>
            <p className={`mt-1.5 ${styles.body}`}>{card.bodyContent ?? card.body}</p>
            {card.linkTo && card.linkLabel ? (
              <p className="mt-2">
                <Link to={card.linkTo} className={`text-xs ${guideLink}`}>
                  {card.linkLabel}
                </Link>
              </p>
            ) : null}
            {card.todo ? (
              <div className="mt-3">
                <ContentTodo title={card.todo.title} items={card.todo.items} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/** @deprecated Use WeightedPhaseBlock */
export function WeightedRegionBlock({
  regions,
}: {
  regions: Array<WeightedPhaseNote & { region?: LifecyclePhaseId }>;
}) {
  return (
    <WeightedPhaseBlock
      phases={regions.map((note) => ({
        lifecyclePhase: note.lifecyclePhase ?? note.region!,
        body: note.body,
        weight: note.weight,
      }))}
    />
  );
}
