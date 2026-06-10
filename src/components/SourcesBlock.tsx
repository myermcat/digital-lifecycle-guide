export type SourceItem = {
  label: string;
  href?: string;
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
        {items.map((item) => (
          <li key={item.label}>
            <span className="text-muted-foreground/35">{item.label}: </span>
            {item.href ? (
              <a
                href={item.href}
                className={sourceLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.description ?? item.href}
              </a>
            ) : (
              <span className="text-muted-foreground/40">{item.description}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
