import { guideProseTight, guideLink } from "@/lib/guide-typography";

export type CompactLinkedItem = {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
};

export function CompactLinkedList({ items }: { items: CompactLinkedItem[] }) {
  return (
    <ul className="mt-5 space-y-3 list-none pl-0">
      {items.map((item) => (
        <li
          key={item.href}
          className={`${guideProseTight} rounded-xl border border-border/80 px-4 py-3.5`}
          style={{ backgroundColor: "var(--region-group)" }}
        >
          <span className="font-semibold text-foreground/90">{item.title}</span> {item.body}{" "}
          <a href={item.href} className={guideLink}>
            {item.linkLabel}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function CompactExitList({
  items,
}: {
  items: { lead: string; rest: string; href?: string }[];
}) {
  return (
    <ul className="mt-5 space-y-2.5 list-none pl-0">
      {items.map((item) => (
        <li
          key={item.lead}
          className="rounded-lg border border-primary/20 px-4 py-4"
          style={{ backgroundColor: "var(--region-group)" }}
        >
          <p className="font-sans text-[11px] leading-[1.35] text-foreground/55">
            {item.href ? (
              <a href={item.href} className={`font-serif text-sm font-medium ${guideLink}`}>
                {item.lead}
              </a>
            ) : (
              <span className="font-serif text-sm font-medium text-foreground">{item.lead}</span>
            )}{" "}
            {item.rest}
          </p>
        </li>
      ))}
    </ul>
  );
}
