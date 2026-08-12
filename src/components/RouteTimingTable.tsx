import { guideProseTight } from "@/lib/guide-typography";

/**
 * Where the competition runs and where the contract is signed, per route.
 *
 * It is a table because the two columns only mean anything read against each
 * other: the point is that they move together, one sub-phase apart, and that is
 * invisible when the routes are described one at a time in prose.
 *
 * Below the small breakpoint it stacks into labelled cards, because a
 * three-column table at 375px is unreadable and the guide is read on phones.
 */

const ROWS = [
  {
    route: "Buy a Team",
    competition: "Discovery",
    signature: "As Alpha opens",
    why: "The team is what does Alpha, so it has to be there on the first day.",
  },
  {
    route: "The PSPC multi-supplier model",
    competition: "Discovery",
    signature: "As Alpha opens",
    why: "The prototypes are built under the contract, so the contract comes first. The build is an option inside it, exercised by amendment.",
  },
  {
    route: "Buy a Solution",
    competition: "Alpha",
    signature: "As Beta opens",
    why: "The department prototypes first, so it can say what it wants before asking anyone to price it.",
  },
  {
    route: "Buy a Finished Product",
    competition: "Alpha",
    signature: "As Beta opens",
    why: "Nothing is prototyped, because the product exists. Alpha is spent evaluating real products.",
  },
  {
    route: "Build in-house, or reuse",
    competition: "None",
    signature: "None",
    why: "There is no supplier, so there is nothing to compete and nothing to sign.",
  },
];

export function RouteTimingTable() {
  return (
    <div className="mt-5">
      <table className="hidden w-full border-collapse text-left sm:table">
        <caption className="sr-only">
          A few of the routes, showing where the competition runs and where the
          contract is signed
        </caption>
        <thead>
          <tr className="border-b border-border">
            {["Route", "Competition runs", "Contract signed", "Why"].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="pb-2 pr-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground last:pr-0"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.route} className="border-b border-border/60 align-top last:border-0">
              <th scope="row" className="w-[11rem] py-3 pr-4 font-sans">
                <span className="block text-sm font-semibold text-foreground">
                  {row.route}
                </span>
              </th>
              <td className={`${guideProseTight} w-[7.5rem] py-3 pr-4 text-foreground/80`}>
                {row.competition}
              </td>
              <td className={`${guideProseTight} w-[8.5rem] py-3 pr-4 text-foreground/80`}>
                {row.signature}
              </td>
              <td className={`${guideProseTight} py-3 text-muted-foreground`}>
                {row.why}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="list-none space-y-3 p-0 sm:hidden">
        {ROWS.map((row) => (
          <li
            key={row.route}
            className="rounded-lg border border-border bg-card px-4 py-3"
          >
            <p className="mb-1.5 text-sm font-semibold text-foreground">
              {row.route}
            </p>
            <p className={`${guideProseTight} text-foreground/80`}>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Competition
              </span>{" "}
              {row.competition}
            </p>
            <p className={`${guideProseTight} text-foreground/80`}>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Signed
              </span>{" "}
              {row.signature}
            </p>
            <p className={`${guideProseTight} mt-1 text-muted-foreground`}>{row.why}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
