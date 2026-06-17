/** Body and headings — match Home feel; running text is lighter than headings. */
export const guideProse =
  "font-serif text-base md:text-[1.05rem] leading-[1.45] text-foreground/75";

/** Tighter leading inside bordered blocks and cards (block spacing unchanged). */
export const guideProseTight =
  "font-sans text-sm leading-[1.35] text-foreground/75";

export const guideProseSpace = `${guideProse} space-y-3`;

export const guideSectionTitle =
  "font-serif text-xl md:text-2xl font-semibold text-foreground tracking-tight";

export const guideBlockTitle =
  "font-serif text-xl md:text-2xl font-semibold text-primary tracking-tight leading-tight";

export const guideSubsectionTitle =
  "font-serif text-lg md:text-xl font-semibold text-primary/75 tracking-tight leading-tight";

export const guideCardHeading =
  "font-serif text-base font-semibold text-primary leading-tight";

export const guideLead = `${guideProse}`;

export const guideLink =
  "font-medium text-primary underline underline-offset-4 hover:opacity-80";

/** Small uppercase labels on callout blocks (WCAG AA on cream). */
export const guideCalloutLabel =
  "text-[10px] uppercase tracking-[0.22em] text-primary/80 font-sans";

/** Wrapper classes for arrow-bullet lists. */
export const guideArrowList = "space-y-4 list-none pl-0";

/** Between arrow-lead items (heading + subtext groups). Default bullet list style. */
export const guideArrowLeadList = "list-none pl-0 space-y-5";

/** Within one arrow-lead item: gap between heading and subtext. */
export const guideArrowLeadGroup = "space-y-0.5";

/** Classes for GuideArrowBullet — the reusable list arrow marker. */
export const guideArrowListIcon = "mt-[0.4rem] size-4 shrink-0 text-primary/35";

/** Arrow marker for inline tight lists (guideProseTight, lead + body on one line). */
export const guideArrowListIconInline = "mt-[0.15rem] size-4 shrink-0 text-primary/35";
