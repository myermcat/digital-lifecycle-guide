export interface ThreadItem {
  label: string;
  href: string;
  description: string;
}

export function ThreadList({
  leadIn,
  threads,
}: {
  leadIn?: string;
  threads: ThreadItem[];
}) {
  return (
    <div>
      {leadIn && (
        <p className="font-serif text-base md:text-[1.05rem] leading-[1.7] text-foreground/90 mb-5">
          {leadIn}
        </p>
      )}
    <ul className="space-y-4">
      {threads.map((thread) => (
        <li key={thread.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <a
            href={thread.href}
            className="inline-flex shrink-0 items-center rounded-full border border-chart-2/50 bg-chart-2/15 px-3.5 py-1 text-sm font-medium text-foreground hover:bg-chart-2/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {thread.label}
          </a>
          <span className="font-serif text-sm md:text-base leading-relaxed text-foreground/85">
            {thread.description}
          </span>
        </li>
      ))}
    </ul>
    </div>
  );
}
