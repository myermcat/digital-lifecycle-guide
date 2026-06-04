export interface WatchForItem {
  title?: string;
  body: string;
}

export function WatchForCallouts({ items }: { items: WatchForItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-chart-4/35 bg-chart-4/12 px-4 py-3.5"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/65 mb-1.5">
            {item.title ?? "Key"}
          </p>
          <p className="font-serif text-sm leading-[1.65] text-foreground/90">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
