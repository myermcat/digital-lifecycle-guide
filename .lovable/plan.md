
## What changes

In `src/components/WhereThisFits.tsx`, restructure the "Where this fits" card so the top row inside it becomes the full region-level navigation (prev ← current → next), and the bottom row stays as the current region's phase pills only.

### Top row (region nav) — new behavior
Single centered horizontal line, in this order:

```
[Prev region link]   ─→   [visual] Current region   ─→   [Next region link]
```

- The whole line is centered as a unit (current region is no longer forced to the visual center).
- Current region keeps its existing style exactly: small faded visual glyph + large serif bold label.
- Prev / next region links use the same style as today's existing "next region" link in the phase row: small, `text-primary`, underlined, `underline-offset-4`, `hover:opacity-80`. Label text: just the region name (e.g. "Build", "Sunset") — no extra "region" suffix here since context is obvious in this row.
- Separators between items: the existing `DashedArrow direction="right"`, same as the phase row uses.
- Prev or next is omitted when not applicable (Build has no prev, Sunset has no next). The arrow adjacent to a missing side is also omitted.

### Bottom row (phase pills) — simplified
Remove the `priorRegionLink` and `regionLink` rendering from the phase pills row. It becomes purely the current region's phases:

```
Phase → Phase → ▌Current phase▐
```

If `phases` is empty (Sunset region page today), hide the bottom row entirely instead of rendering an empty flex container.

### Props / data
No changes to `WhereThisFitsConfig` in `src/lib/lifecycle-navigation.tsx` — the existing `regionLink` (next region) and `priorRegionLink` (prev region) fields already carry what we need; we just consume them in the top row instead of the bottom row. All existing `whereThisFitsFor*` helpers keep working.

### Files touched
- `src/components/WhereThisFits.tsx` — only file edited.

### Visual / accessibility notes
- Top row uses `flex flex-nowrap items-center justify-center gap-2 sm:gap-3`, same arrow spacing as the phase row, so the dashed arrows match the lifecycle metaphor consistently.
- Current region label stays as the existing `<span class="font-serif text-2xl font-semibold ...">` so screen readers and visual hierarchy are unchanged; it just no longer has `aria-current` semantics added (it didn't have any before either).
- The phase row's `overflow-x-auto` stays, since phase pill rows can still get wide on mobile. The new region row is short (max 3 items + 2 arrows) and should fit without scrolling on the narrowest supported width.
