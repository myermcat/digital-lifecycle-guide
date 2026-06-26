import type { ReactNode } from "react";
import { useId } from "react";
import { guideClickableCardFillStyle } from "@/lib/guide-cards";
import { guideProseTight } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export type GuideFolderTabOption<T extends string> = {
  value: T;
  label: string;
};

const folderTabShellClassName =
  "rounded-xl border border-primary/20 bg-primary/[0.05] p-1.5 shadow-sm";

const folderTabBaseClassName =
  "font-serif text-base leading-tight border border-transparent";

const folderTabInactiveClassName = "font-medium text-primary/45 hover:text-primary/65";

const folderTabActiveClassName =
  "font-semibold text-primary shadow-sm border-primary/15";

/**
 * Full-width folder tabs on the cream phase-group surface — inactive tabs recede;
 * the selected tab lifts forward and opens the panel below.
 */
export function GuideFolderTabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  panelId,
  children,
  className,
}: {
  options: readonly GuideFolderTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  panelId?: string;
  children: ReactNode;
  className?: string;
}) {
  const groupId = useId();
  const contentId = panelId ?? `${groupId}-panel`;
  const activeTabId = `${groupId}-tab-${value}`;

  return (
    <div className={cn(folderTabShellClassName, className)}>
      <div role="tablist" aria-label={ariaLabel} className="flex w-full gap-1">
        {options.map((opt) => {
          const selected = value === opt.value;
          const tabLabel = opt.label.endsWith(".") ? opt.label : `${opt.label}.`;

          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              id={`${groupId}-tab-${opt.value}`}
              aria-selected={selected}
              aria-controls={contentId}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(opt.value)}
              className={cn(
                "flex-1 min-w-0 rounded-lg px-3 py-3.5 text-center",
                folderTabBaseClassName,
                "transition-[color,background-color,box-shadow,border-color] duration-200 ease-out",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
                selected ? folderTabActiveClassName : folderTabInactiveClassName,
              )}
              style={selected ? guideClickableCardFillStyle : undefined}
            >
              {tabLabel}
            </button>
          );
        })}
      </div>
      <div
        id={contentId}
        role="tabpanel"
        aria-labelledby={activeTabId}
        className="mt-1 rounded-lg px-5 py-5 md:px-7 md:py-6"
        style={guideClickableCardFillStyle}
      >
        <div className={guideProseTight}>{children}</div>
      </div>
    </div>
  );
}
