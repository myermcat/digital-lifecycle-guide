import { guideProse, guideLink } from "@/lib/guide-typography";

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
          className={`${guideProse} rounded-xl border border-border/80 px-4 py-3.5`}
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
          className={`${guideProse} rounded-lg px-4 py-3 border border-border/70`}
          style={{ backgroundColor: "var(--region-group)" }}
        >
          {item.href ? (
            <>
              <a href={item.href} className={`font-semibold text-foreground/90 ${guideLink}`}>
                {item.lead}
              </a>{" "}
              {item.rest}
            </>
          ) : (
            <>
              <span className="font-semibold text-foreground/90">{item.lead}</span> {item.rest}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
