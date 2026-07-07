export type ThreadCoreStripTile = {
  label: string;
  gloss: string;
};

export type ThreadCoreStripContent = {
  heading: string;
  tiles: readonly ThreadCoreStripTile[];
  /** When true, show arrows between tiles (a genuine sequence). */
  sequenced?: boolean;
};

export const SECURITY_CORE_STRIP = {
  heading: "THE SECURITY LIFECYCLE",
  tiles: [
    { label: "Identify", gloss: "know what is at risk" },
    { label: "Protect", gloss: "build the defenses" },
    { label: "Detect", gloss: "spot trouble fast" },
    { label: "Respond", gloss: "contain it" },
    { label: "Recover", gloss: "restore and learn" },
  ],
} as const satisfies ThreadCoreStripContent;

export const PRIVACY_CORE_STRIP = {
  heading: "THE CORE OF PRIVACY",
  tiles: [
    { label: "Collect the minimum", gloss: "only what's needed" },
    { label: "Tell people", gloss: "a clear notice" },
    { label: "Protect it", gloss: "safeguards by design" },
    { label: "Reassess and dispose", gloss: "a PIA, then delete" },
  ],
} as const satisfies ThreadCoreStripContent;

export const ACCESSIBILITY_CORE_STRIP = {
  heading: "THE CORE OF ACCESSIBILITY",
  tiles: [
    { label: "The law applies", gloss: "it is a legal duty" },
    { label: "Build to the standard", gloss: "EN 301 549, WCAG 2.1 AA" },
    { label: "Buy it accessible", gloss: "a condition of purchase" },
    { label: "Test with real people", gloss: "not only tools" },
  ],
} as const satisfies ThreadCoreStripContent;

export const USER_RESEARCH_CORE_STRIP = {
  heading: "THE CORE OF USER RESEARCH",
  tiles: [
    { label: "Understand needs", gloss: "before you build" },
    { label: "Test with real people", gloss: "not just at the end" },
    { label: "Include everyone", gloss: "a diverse sample" },
    { label: "Keep listening", gloss: "after launch too" },
  ],
} as const satisfies ThreadCoreStripContent;

export const BACKLOG_CORE_STRIP = {
  heading: "THE CORE OF A BACKLOG",
  tiles: [
    { label: "A prioritized list", gloss: "the work, ordered" },
    { label: "Rooted in user needs", gloss: "every item" },
    { label: "One owner", gloss: "orders it" },
    { label: "Never finished", gloss: "refined as you go" },
  ],
} as const satisfies ThreadCoreStripContent;

export const ETHICS_AND_BIAS_CORE_STRIP = {
  heading: "THE CORE OF ETHICS AND BIAS",
  tiles: [
    { label: "Check who it affects", gloss: "even without AI" },
    { label: "Assess the impact", gloss: "the AIA" },
    { label: "Keep a human accountable", gloss: "oversight and recourse" },
    { label: "Be open about it", gloss: "explain and publish" },
  ],
} as const satisfies ThreadCoreStripContent;

export const JOINED_UP_DELIVERY_CORE_STRIP = {
  heading: "THE CORE OF JOINED-UP DELIVERY",
  tiles: [
    { label: "Map the whole journey", gloss: "see the user's whole task" },
    { label: "Work across boundaries", gloss: "agree how the journey runs" },
    { label: "Connect the systems", gloss: "so they exchange information" },
    { label: "Keep channels in step", gloss: "online, phone, in person" },
  ],
} as const satisfies ThreadCoreStripContent;

export const DATA_STEWARDSHIP_CORE_STRIP = {
  heading: "THE CORE OF DATA STEWARDSHIP",
  tiles: [
    { label: "Accountability", gloss: "one named owner" },
    { label: "Quality", gloss: "fit for purpose" },
    { label: "Retention and disposition", gloss: "keep, then dispose" },
    { label: "Safe migration", gloss: "move it intact" },
  ],
} as const satisfies ThreadCoreStripContent;

export const RELEASING_CHANGES_CORE_STRIP = {
  heading: "THE CORE OF RELEASING CHANGES",
  tiles: [
    { label: "Small and often", gloss: "not big-bang" },
    { label: "Automated pipeline", gloss: "tested before it goes out" },
    { label: "Roll out gradually", gloss: "a slice first, then watch" },
    { label: "Roll back fast", gloss: "undo a bad change" },
  ],
} as const satisfies ThreadCoreStripContent;

export const DEPENDENCIES_AND_STANDARDS_CORE_STRIP = {
  heading: "THE CORE OF DEPENDENCIES AND STANDARDS",
  tiles: [
    { label: "Build on open standards", gloss: "so parts connect and swap" },
    { label: "Know what you depend on", gloss: "a current inventory" },
    { label: "Vet before you adopt", gloss: "maintained and secure" },
    { label: "Keep it patched", gloss: "and watched" },
  ],
} as const satisfies ThreadCoreStripContent;

export const TEAM_CAPABILITY_CORE_STRIP = {
  heading: "THE CORE OF TEAM CAPABILITY",
  tiles: [
    { label: "The right roles", gloss: "the mix of skills a service needs, in one team" },
    { label: "Who you need, kept close", gloss: "a small in-house core, plus a clear map of who else to call" },
    { label: "Kept current", gloss: "skills renewed as the work changes" },
  ],
} as const satisfies ThreadCoreStripContent;

export const CHANGE_MANAGEMENT_CORE_STRIP = {
  heading: "THE CORE OF CHANGE MANAGEMENT",
  tiles: [
    { label: "Ready", gloss: "people know about the change and want to make it" },
    { label: "Able", gloss: "people know how, and can actually do it" },
    { label: "Kept going", gloss: "the change is reinforced until it sticks" },
  ],
} as const satisfies ThreadCoreStripContent;

export const MONITORING_CORE_STRIP = {
  heading: "INSTRUMENT, SEE, ACT",
  tiles: [
    { label: "Instrument it", gloss: "build in the signals" },
    { label: "See it", gloss: "a few signals that matter" },
    { label: "Act on it", gloss: "signals become work" },
  ],
  sequenced: true,
} as const satisfies ThreadCoreStripContent;

function threadCoreStripAltText(content: ThreadCoreStripContent): string {
  const pillars = content.tiles
    .map((tile) => `${tile.label}, ${tile.gloss}`)
    .join("; ");
  return `${content.heading}: ${pillars}.`;
}

export { threadCoreStripAltText };
