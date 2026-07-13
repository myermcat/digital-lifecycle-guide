/** Body and headings. */
export const guideProse =
  "font-serif text-base md:text-[1.05rem] leading-[1.45] text-foreground";

/** Tighter leading inside bordered blocks and cards (block spacing unchanged). */
export const guideProseTight =
  "font-sans text-sm leading-[1.35] text-foreground";

/** Subheading within thread body blocks — one step above guideProseTight, full foreground. */
export const guideBodySubheading =
  "font-sans text-[0.9375rem] md:text-[15px] font-semibold text-foreground leading-snug";

/** Monospace formula — same size and leading as guideProseTight. */
export const guideFormulaLine =
  "font-mono text-sm leading-[1.35] text-foreground/75 uppercase tracking-[0.05em]";

export const guideProseSpace = `${guideProse} space-y-3`;

/** Page title (h1) — large display scale relative to body copy. */
export const guidePageTitle =
  "font-serif text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]";

/** Major section heading (h2) on phase and thread landing pages. */
export const guideSectionTitle =
  "font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.1]";

/** Hero pull-quote (keyCallout) — modest step above body, not display scale. */
export const guideKeyCallout =
  "font-serif text-lg md:text-xl font-semibold text-primary/90 tracking-tight leading-snug";

export const guideBlockTitle =
  "font-serif text-xl md:text-2xl font-semibold text-primary tracking-tight leading-tight";

/** Support callout heading — Doorway anatomy, slightly smaller than guideBlockTitle. */
export const guideSupportCalloutTitle =
  "font-serif text-lg md:text-xl font-semibold text-primary tracking-tight leading-tight";

export const guideSubsectionTitle =
  "font-serif text-lg md:text-xl font-semibold text-primary/75 tracking-tight leading-tight";

export const guideCardHeading =
  "font-serif text-base font-semibold text-primary leading-tight";

export const guideLead = `${guideProse}`;

export const guideLink =
  "font-medium text-primary/80 underline decoration-primary/35 underline-offset-4 hover:text-primary/65 hover:decoration-primary/50 transition-colors";

/** External links reachable only on the GC network — paler, dotted underline. */
export const guideLinkGcNetwork =
  "font-medium text-muted-foreground/50 underline decoration-dotted decoration-muted-foreground/35 underline-offset-4 hover:text-muted-foreground/65 transition-colors";

/** Small uppercase labels on callout blocks (WCAG AA on cream). */
export const guideCalloutLabel =
  "text-[10px] uppercase tracking-[0.22em] text-primary/80 font-sans";

/** Callout title — editorial label size and face, primary colour. */
export const guideCalloutTitle =
  "font-sans text-[10px] uppercase tracking-[0.22em] text-primary leading-snug";

/** Left indent for body lists (bullets and numbers) relative to section prose. */
export const guideListIndent = "pl-6 md:pl-8";

/** Wrapper classes for arrow-bullet lists. */
export const guideArrowList = `space-y-4 list-none ${guideListIndent}`;

/** Between arrow-lead items (heading + subtext groups). Default bullet list style. */
export const guideArrowLeadList = `list-none space-y-5 ${guideListIndent}`;

/** Inline arrow + bold lead + body on one line (Sunset fork, whose job, what stays yours). */
export const guideInlineArrowLeadList = `${guideProseTight} space-y-3 list-none ${guideListIndent}`;

/** Within one arrow-lead item: gap between heading and subtext. */
export const guideArrowLeadGroup = "space-y-0.5";

/** Classes for GuideArrowBullet — colour only; alignment is handled in the component. */
export const guideArrowListIcon = "text-primary/45";

/** @deprecated Alignment handled in GuideArrowBullet */
export const guideArrowListIconInline = "text-primary/45";
