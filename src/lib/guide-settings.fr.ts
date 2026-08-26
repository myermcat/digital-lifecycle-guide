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
    return "Choisissez l’un ou l’autre réglage ci-dessus et cette note changera en conséquence.";
  }

  const sourcingBit =
    sourcing === "À l’interne"
      ? "Votre équipe fait le travail : les pratiques sont donc des tâches dans votre carnet de produit."
      : sourcing === "Acheté"
        ? "Un fournisseur fait le travail : les pratiques deviennent donc des choses que vous inscrivez au contrat et que vous surveillez."
        : sourcing === "Mixte"
          ? "Une partie du travail est à l’interne et une partie est achetée : chaque pratique a donc un responsable de chaque côté."
          : "";

  const sizeBit =
    size === "Petite"
      ? "À petite échelle, chaque pratique peut être légère — quelques conversations, un court document."
      : size === "Moyenne"
        ? "À moyenne échelle, les pratiques ont besoin d’un responsable nommé et d’une cadence régulière."
        : size === "Grande"
          ? "À grande échelle, les pratiques ont besoin de personnes dédiées et d’ententes écrites entre les équipes."
          : size === "Entreprise"
            ? "À l’échelle de l’entreprise, les pratiques deviennent des programmes avec leur propre gouvernance."
            : "";

  return [sourcingBit, sizeBit].filter(Boolean).join(" ");
}

export function maturityNoteFor(sourcing: string | null, size: string | null): string {
  if (!sourcing && !size) {
    return "Choisissez vos réglages Acheter ou construire et Taille ci-dessus et cette note changera.";
  }

  const sourcingBit =
    sourcing === "À l’interne"
      ? "Votre équipe fait ce travail directement. Les pratiques ci-dessous sont des tâches dans votre carnet de produit."
      : sourcing === "Acheté"
        ? "L’essentiel de ce travail revient à un fournisseur. Les pratiques ci-dessous deviennent des choses que vous inscrivez au contrat et que vous vérifiez."
        : sourcing === "Mixte"
          ? "Certaines pratiques sont à l’interne et d’autres chez un fournisseur — soyez clair sur qui détient chacune."
          : "";

  const sizeBit =
    size === "Petite"
      ? "À petite échelle, une seule personne peut en porter plusieurs."
      : size === "Moyenne"
        ? "À moyenne échelle, nommez des responsables et rencontrez-vous à un rythme régulier."
        : size === "Grande"
          ? "À grande échelle, il vous faut des personnes nommées qui veillent sur chacune."
          : size === "Entreprise"
            ? "À l’échelle de l’entreprise, les pratiques deviennent des programmes avec leur propre gouvernance."
            : "";

  return [sourcingBit, sizeBit].filter(Boolean).join(" ");
}
