import type { PracticeCardData } from "@/components/PracticeCard";
import { PHASES } from "@/lib/guide-strings";
import { SUNSET_SOURCES } from "@/lib/sunset-sources";
import { SUNSET_STRINGS } from "@/lib/sunset-strings";

export type SunsetJourneyStep = (typeof SUNSET_STRINGS.journey.steps)[number];

export type SunsetPath = "replace" | "retire";

export const SUNSET_LANDING = {
  title: PHASES.sunset.title,
  intro: SUNSET_STRINGS.intro,
  scope: SUNSET_STRINGS.scope,
  fork: SUNSET_STRINGS.fork,
  journeyIntro: SUNSET_STRINGS.journey.intro,
  journeyFooter: SUNSET_STRINGS.journey.footer,
  journeySteps: SUNSET_STRINGS.journey.steps,
  whereNext: SUNSET_STRINGS.whereNext,
  caution: SUNSET_STRINGS.caution,
  sources: SUNSET_SOURCES,
};

export const SUNSET_WHERE_NEXT_CARDS: PracticeCardData[] =
  SUNSET_STRINGS.whereNext.cards;

export function sunsetJourneyStepsForPath(path: SunsetPath): SunsetJourneyStep[] {
  return SUNSET_LANDING.journeySteps.filter(
    (step) => !step.replaceOnly || path === "replace",
  );
}
