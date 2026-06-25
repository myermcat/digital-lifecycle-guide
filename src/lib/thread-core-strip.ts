export type ThreadCoreStripTile = {
  label: string;
  gloss: string;
};

export type ThreadCoreStripContent = {
  heading: string;
  tiles: readonly ThreadCoreStripTile[];
};

export const SECURITY_CORE_STRIP = {
  heading: "THE CORE OF SECURITY",
  tiles: [
    { label: "Design it in", gloss: "before code exists" },
    { label: "Control access", gloss: "least privilege, audited" },
    { label: "Keep it current", gloss: "patch, scan, monitor" },
    { label: "Respond and recover", gloss: "a rehearsed plan" },
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

export const ETHICS_AND_BIAS_CORE_STRIP = {
  heading: "THE CORE OF ETHICS AND BIAS",
  tiles: [
    { label: "Check who it affects", gloss: "even without AI" },
    { label: "Assess the impact", gloss: "the AIA" },
    { label: "Keep a human accountable", gloss: "oversight and recourse" },
    { label: "Be open about it", gloss: "explain and publish" },
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

function threadCoreStripAltText(content: ThreadCoreStripContent): string {
  const pillars = content.tiles
    .map((tile) => `${tile.label}, ${tile.gloss}`)
    .join("; ");
  return `${content.heading}: ${pillars}.`;
}

export { threadCoreStripAltText };
