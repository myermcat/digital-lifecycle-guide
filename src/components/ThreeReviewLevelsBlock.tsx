import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { interactivePanelCardClassName } from "@/components/PracticeCard";
import { guideClickableCardFillStyle } from "@/lib/guide-cards";
import { guideProseTight, guideCardHeading, guideCalloutLabel } from "@/lib/guide-typography";

export type ReviewLevelItem = {
  tag: string;
  title: string;
  body: string;
  href: string;
};

export function ThreeReviewLevelsBlock({
  subtitle,
  items,
}: {
  subtitle: string;
  items: ReviewLevelItem[];
}) {
  return (
    <div className="space-y-5">
      <p className={guideProseTight}>{subtitle}</p>
      <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-1">
        {items.map((item, index) => (
          <Fragment key={item.href}>
            {item.href.startsWith("/") ? (
              <Link
                to={item.href}
                className={interactivePanelCardClassName}
                style={guideClickableCardFillStyle}
              >
                <p className={`${guideCalloutLabel} normal-case tracking-[0.14em] text-[9px]`}>
                  {item.tag}
                </p>
                <h3 className={`${guideCardHeading} mt-2 text-lg group-hover:text-primary transition-colors`}>
                  {item.title}
                </h3>
                <p className={`mt-2 flex-1 ${guideProseTight}`}>{item.body}</p>
                <span className="sr-only"> — open review page</span>
              </Link>
            ) : (
              <a
                href={item.href}
                className={interactivePanelCardClassName}
                style={guideClickableCardFillStyle}
              >
                <p className={`${guideCalloutLabel} normal-case tracking-[0.14em] text-[9px]`}>
                  {item.tag}
                </p>
                <h3 className={`${guideCardHeading} mt-2 text-lg group-hover:text-primary transition-colors`}>
                  {item.title}
                </h3>
                <p className={`mt-2 flex-1 ${guideProseTight}`}>{item.body}</p>
                <span className="sr-only"> — open review page</span>
              </a>
            )}
            {index < items.length - 1 && (
              <div
                className="flex shrink-0 items-center justify-center py-0.5 md:px-1 md:py-0"
                aria-hidden
              >
                <ArrowRight className="size-5 text-primary/35 md:size-4" strokeWidth={1.5} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
