import type { ReactNode } from "react";
import { useId } from "react";
import { guideProseTight } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

export type GuideFolderTabOption<T extends string> = {
  value: T;
  label: string;
};

const folderTabBaseClassName = "font-serif text-base leading-tight";

const folderTabInactiveClassName = "font-medium text-primary/40 hover:text-primary/60";

const folderTabActiveClassName = "font-semibold text-primary";

const innerTopRadius = "rounded-t-[calc(var(--radius)-1px)]";
const innerTopLeftRadius = "rounded-tl-[calc(var(--radius)-1px)]";
const innerTopRightRadius = "rounded-tr-[calc(var(--radius)-1px)]";

/** Thin-outline card — tab strip and panel share one border, no fill. */
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
  const lastIndex = options.length - 1;

  return (
    <div className={cn("rounded-lg border border-border/60", className)}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex w-full border-b border-border/60"
      >
        {options.map((opt, index) => {
          const selected = value === opt.value;
          const tabLabel = opt.label.endsWith(".") ? opt.label : `${opt.label}.`;
          const isFirst = index === 0;
          const isLast = index === lastIndex;

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
                "relative flex-1 min-w-0 px-3 py-2.5 text-center",
                folderTabBaseClassName,
                "transition-colors duration-150 ease-out",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-1",
                selected
                  ? cn(
                      folderTabActiveClassName,
                      "z-10 -mb-px border-b-2 border-primary",
                      isFirst && innerTopLeftRadius,
                      isLast && innerTopRightRadius,
                      !isFirst && !isLast && innerTopRadius,
                    )
                  : cn(
                      folderTabInactiveClassName,
                      isFirst && innerTopLeftRadius,
                      isLast && innerTopRightRadius,
                    ),
              )}
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
        className="px-5 py-4 md:px-6 md:py-5"
      >
        <div className={guideProseTight}>{children}</div>
      </div>
    </div>
  );
}
