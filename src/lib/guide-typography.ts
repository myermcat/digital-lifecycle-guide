/** Body and headings — match Home feel; running text is lighter than headings. */
export const guideProse =
  "font-serif text-base md:text-[1.05rem] leading-[1.45] text-foreground/75";

/** Tighter leading inside bordered blocks and cards (block spacing unchanged). */
export const guideProseTight =
  "font-sans text-sm leading-[1.35] text-foreground/75";

export const guideProseSpace = `${guideProse} space-y-3`;

/** Page title (h1) — large display scale relative to body copy. */
export const guidePageTitle =
  "font-serif text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]";

/** Major section heading (h2) on phase and thread landing pages. */
export const guideSectionTitle =
  "font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.1]";

export const guideBlockTitle =
  "font-serif text-xl md:text-2xl font-semibold text-primary tracking-tight leading-tight";

export const guideSubsectionTitle =
  "font-serif text-lg md:text-xl font-semibold text-primary/75 tracking-tight leading-tight";

export const guideCardHeading =
  "font-serif text-base font-semibold text-primary leading-tight";

export const guideLead = `${guideProse}`;

export const guideLink =
  "font-medium text-primary underline underline-offset-4 hover:opacity-80";

/** External links reachable only on the GC network — paler, dotted underline. */
export const guideLinkGcNetwork =
  "font-medium text-muted-foreground/50 underline decoration-dotted decoration-muted-foreground/35 underline-offset-4 hover:text-muted-foreground/65 transition-colors";

/** Small uppercase labels on callout blocks (WCAG AA on cream). */
export const guideCalloutLabel =
  "text-[10px] uppercase tracking-[0.22em] text-primary/80 font-sans";

/** Wrapper classes for arrow-bullet lists. */
export const guideArrowList = "space-y-4 list-none pl-0";

/** Between arrow-lead items (heading + subtext groups). Default bullet list style. */
export const guideArrowLeadList = "list-none pl-0 space-y-5";

/** Within one arrow-lead item: gap between heading and subtext. */
export const guideArrowLeadGroup = "space-y-0.5";

/** Classes for GuideArrowBullet — colour only; alignment is handled in the component. */
export const guideArrowListIcon = "text-primary/45";

/** @deprecated Alignment handled in GuideArrowBullet */
export const guideArrowListIconInline = "text-primary/45";
