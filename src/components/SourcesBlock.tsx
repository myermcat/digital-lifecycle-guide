import {
  externalLinkUrl,
  isGcNetworkOnly,
  type ExternalLinkKey,
} from "@/lib/external-links";

export type SourceItem = {
  label: string;
  href?: string;
  linkKey?: ExternalLinkKey;
  description?: string;
};

const sourceLink =
  "text-muted-foreground/40 underline underline-offset-4 hover:text-muted-foreground/55 transition-colors";

export function SourcesBlock({
  items,
  className,
}: {
  items: SourceItem[];
  className?: string;
}) {
  return (
    <section
      id="sources"
      className={`scroll-mt-24 ${className ?? "mt-10 md:mt-12 max-w-xl"}`}
    >
      <h2 className="text-xs uppercase tracking-[0.18em] font-normal text-muted-foreground/35 mb-2">
        Sources
      </h2>
      <ul className="space-y-2 list-none pl-0 text-sm leading-[1.7] text-muted-foreground/50">
        {items.map((item) => {
          const href = item.linkKey ? externalLinkUrl(item.linkKey) : item.href;
          const gcNetworkOnly = item.linkKey ? isGcNetworkOnly(item.linkKey) : false;
          const key = item.linkKey ?? item.href ?? item.label;

          return (
            <li key={key}>
              <span className="text-muted-foreground/35">{item.label}: </span>
              {href ? (
                <>
                  <a
                    href={href}
                    className={sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.description ?? href}
                  </a>
                  {gcNetworkOnly ? (
                    <span className="text-muted-foreground/35"> (GC network only)</span>
                  ) : null}
                </>
              ) : (
                <span className="text-muted-foreground/40">{item.description}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
