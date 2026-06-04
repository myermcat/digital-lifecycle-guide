import { useEffect, useState } from "react";
import { readGuideSettings, introNoteFor } from "@/lib/guide-settings";

interface ContextNoteProps {
  label?: string;
  getMessage?: (sourcing: string | null, size: string | null) => string;
  className?: string;
}

export function ContextNote({
  label = "For your setup",
  getMessage = introNoteFor,
  className,
}: ContextNoteProps) {
  const [sourcing, setSourcing] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    const read = () => {
      const { sourcing: s, size: z } = readGuideSettings();
      setSourcing(s);
      setSize(z);
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

  const message = getMessage(sourcing, size);

  return (
    <div
      aria-live="polite"
      className={
        className ??
        "mt-6 rounded-xl border border-dashed border-border bg-background/60 px-5 py-4 transition-colors"
      }
    >
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
        {label}
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
