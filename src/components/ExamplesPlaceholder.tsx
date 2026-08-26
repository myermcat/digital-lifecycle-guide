import { UI } from "@/lib/ui-strings";

export function ExamplesPlaceholder({ note }: { note?: string }) {
  return (
    <p className="font-serif text-base md:text-[1.05rem] leading-[1.7] text-muted-foreground italic">
      {note ?? UI.examplesComingLater}
    </p>
  );
}
