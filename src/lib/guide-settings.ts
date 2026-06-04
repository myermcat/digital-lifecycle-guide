export const SOURCING_KEY = "guide.setting.sourcing";
export const SIZE_KEY = "guide.setting.size";

export function readGuideSettings(): {
  sourcing: string | null;
  size: string | null;
} {
  try {
    return {
      sourcing: localStorage.getItem(SOURCING_KEY),
      size: localStorage.getItem(SIZE_KEY),
    };
  } catch {
    return { sourcing: null, size: null };
  }
}

export function introNoteFor(sourcing: string | null, size: string | null): string {
  if (!sourcing && !size) {
    return "Pick either setting above and this note will change to match.";
  }

  const sourcingBit =
    sourcing === "In-house"
      ? "Your team is doing the work, so the practices are jobs on your backlog."
      : sourcing === "Bought"
        ? "A supplier is doing the work, so the practices become things you write into the contract and oversee."
        : sourcing === "Mix"
          ? "Some work is in-house and some is bought, so each practice has an owner on either side."
          : "";

  const sizeBit =
    size === "Small"
      ? "At small size, each practice can be light — a few conversations, a short doc."
      : size === "Medium"
        ? "At medium size, practices need a named owner and a regular cadence."
        : size === "Large"
          ? "At large size, practices need dedicated people and written agreements between teams."
          : size === "Enterprise"
            ? "At enterprise size, practices become programs with their own governance."
            : "";

  return [sourcingBit, sizeBit].filter(Boolean).join(" ");
}

export function maturityNoteFor(sourcing: string | null, size: string | null): string {
  if (!sourcing && !size) {
    return "Pick your Buy-vs-build and Size choices above and this note will change.";
  }

  const sourcingBit =
    sourcing === "In-house"
      ? "Your team does this work directly. The practices below are jobs on your backlog."
      : sourcing === "Bought"
        ? "Most of this work sits with a supplier. The practices below become things you write into the contract and check."
        : sourcing === "Mix"
          ? "Some practices sit in-house and some with a supplier — be clear who owns each one."
          : "";

  const sizeBit =
    size === "Small"
      ? "At a small size, one person may hold several of them."
      : size === "Medium"
        ? "At medium size, name owners and meet on a steady rhythm."
        : size === "Large"
          ? "At large size, you need named people watching each one."
          : size === "Enterprise"
            ? "At enterprise size, practices become programs with their own governance."
            : "";

  return [sourcingBit, sizeBit].filter(Boolean).join(" ");
}
