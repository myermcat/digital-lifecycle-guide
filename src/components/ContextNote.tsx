import { useEffect, useState } from "react";

const SOURCING_KEY = "guide.setting.sourcing";
const SIZE_KEY = "guide.setting.size";

function noteFor(sourcing: string | null, size: string | null): string {
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

export function ContextNote() {
  const [sourcing, setSourcing] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    const read = () => {
      try {
        setSourcing(localStorage.getItem(SOURCING_KEY));
        setSize(localStorage.getItem(SIZE_KEY));
      } catch {}
    };
    read();
    const onSetting = () => read();
    window.addEventListener("guide:setting", onSetting);
    window.addEventListener("storage", onSetting);
    return () => {
      window.removeEventListener("guide:setting", onSetting);
      window.removeEventListener("storage", onSetting);
    };
  }, []);

  const message = noteFor(sourcing, size);

  return (
    <div
      aria-live="polite"
      className="mt-6 rounded-xl border border-dashed border-border bg-background/60 px-5 py-4 transition-colors"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
        For your setup
      </p>
      <p
        key={`${sourcing}|${size}`}
        className="font-serif text-[1.02rem] leading-[1.65] text-foreground/90 animate-in fade-in duration-300"
      >
        {message}
      </p>
    </div>
  );
}