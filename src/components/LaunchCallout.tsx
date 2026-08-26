import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/lib/ui-strings";

/**
 * The one moment in the lifecycle that is a door rather than a gradient.
 *
 * Everything before this is reversible at some price. After it, real people
 * depend on the service and the department owns it. The page said so in prose
 * and nobody saw it, so it is now the loudest thing between Beta and Live.
 */
export function LaunchCallout({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border-2 border-primary bg-primary text-primary-foreground px-6 py-7 text-center shadow-sm md:px-10 md:py-9",
        className,
      )}
    >
      <Rocket className="mx-auto mb-3 h-7 w-7 md:h-8 md:w-8" aria-hidden />
      <p className="font-serif text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
        {UI.launch2}
      </p>
      <p className="mx-auto mt-3 max-w-xl font-serif text-[0.95rem] leading-snug text-primary-foreground/90 md:text-base">
        {UI.betaEndsHereTheServiceBecomesTheOffici}
      </p>
    </div>
  );
}
