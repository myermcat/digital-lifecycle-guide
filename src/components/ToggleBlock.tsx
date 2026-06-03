import { useEffect, useState } from "react";

interface ToggleBlockProps {
  heading: string;
  prose: string;
  options: string[];
  storageKey: string;
}

export function ToggleBlock({ heading, prose, options, storageKey }: ToggleBlockProps) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(storageKey);
      if (v) setSelected(v);
    } catch {}
  }, [storageKey]);

  const choose = (opt: string) => {
    setSelected(opt);
    try {
      localStorage.setItem(storageKey, opt);
      window.dispatchEvent(
        new CustomEvent("guide:setting", { detail: { key: storageKey, value: opt } }),
      );
    } catch {}
  };

  return (
    <div className="rounded-2xl border border-border bg-card/90 backdrop-blur-sm p-6 md:p-8 shadow-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
        {heading}
      </h3>
      <p className="mt-3 text-base text-muted-foreground leading-relaxed">{prose}</p>
      <div
        role="radiogroup"
        aria-label={heading}
        className="mt-5 flex flex-wrap gap-2"
      >
        {options.map((opt) => {
          const active = selected === opt;
          return (
            <button
              key={opt}
              role="radio"
              aria-checked={active}
              onClick={() => choose(opt)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}