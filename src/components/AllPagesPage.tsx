import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  getPageIndexByType,
  PAGE_INDEX,
  type PageIndexEntry,
  type PageIndexStatus,
} from "@/lib/page-index";
import { guideLink, guideProseTight } from "@/lib/guide-typography";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<PageIndexStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  "in-review": "In review",
  done: "Done",
};

const STATUS_STYLES: Record<PageIndexStatus, string> = {
  "not-started": "border-border/80 bg-muted/30 text-muted-foreground/70",
  "in-progress": "border-primary/25 bg-primary/8 text-primary/90",
  "in-review": "border-amber-500/25 bg-amber-500/10 text-amber-900/75 dark:text-amber-200/80",
  done: "border-emerald-600/20 bg-emerald-600/8 text-emerald-900/75 dark:text-emerald-200/80",
};

const STATUS_FILTER_ORDER: PageIndexStatus[] = [
  "in-review",
  "in-progress",
  "not-started",
  "done",
];

type StatusFilter = PageIndexStatus | "all";

const STATUS_TOGGLE_ACTIVE: Record<StatusFilter, string> = {
  all: "border-foreground/20 bg-foreground/8 text-foreground",
  "not-started": STATUS_STYLES["not-started"],
  "in-progress": STATUS_STYLES["in-progress"],
  "in-review": STATUS_STYLES["in-review"],
  done: STATUS_STYLES.done,
};

function PageStatusTag({ status }: { status: PageIndexStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        STATUS_STYLES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function PageTable({ pages }: { pages: PageIndexEntry[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border/70">
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border/70 bg-muted/20">
            <th
              scope="col"
              className="px-4 py-2.5 text-left text-xs font-normal uppercase tracking-[0.14em] text-muted-foreground/50"
            >
              Page
            </th>
            <th
              scope="col"
              className="px-4 py-2.5 text-left text-xs font-normal uppercase tracking-[0.14em] text-muted-foreground/50 w-28"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-4 py-2.5 text-left text-xs font-normal uppercase tracking-[0.14em] text-muted-foreground/50 w-32"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page, index) => (
            <tr
              key={page.path}
              className={cn(
                "border-b border-border/50 last:border-b-0",
                index % 2 === 1 && "bg-muted/10",
              )}
            >
              <td className="px-4 py-3">
                <Link to={page.path} className={`font-medium ${guideLink}`}>
                  {page.title}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted-foreground/55 capitalize">{page.type}</td>
              <td className="px-4 py-3">
                <PageStatusTag status={page.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AllPagesPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const statusCounts = useMemo(() => {
    const counts: Record<StatusFilter, number> = {
      all: PAGE_INDEX.length,
      "not-started": 0,
      "in-progress": 0,
      "in-review": 0,
      done: 0,
    };

    PAGE_INDEX.forEach((page) => {
      counts[page.status] += 1;
    });

    return counts;
  }, []);

  const groups = useMemo(() => {
    return getPageIndexByType()
      .map((group) => ({
        ...group,
        pages:
          statusFilter === "all"
            ? group.pages
            : group.pages.filter((page) => page.status === statusFilter),
      }))
      .filter((group) => group.pages.length > 0);
  }, [statusFilter]);

  const filters: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "All" },
    ...STATUS_FILTER_ORDER.map((status) => ({
      value: status,
      label: STATUS_LABELS[status],
    })),
  ];

  return (
    <>
      <header className="mb-8 md:mb-10">
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span aria-hidden="true" className="mx-1.5 text-muted-foreground/70">
            ›
          </span>
          <span className="text-foreground/80">All pages</span>
        </nav>
        <h1 className="mt-4 font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.1]">
          All pages
        </h1>
        <p className={`${guideProseTight} mt-3 text-foreground/65 max-w-xl`}>
          Every page in the guide, including reference pages and stubs not linked from
          normal navigation. Status is maintained here as the build tracker.
        </p>
        <div className="mt-4 h-px w-16 bg-border" />
      </header>

      <div
        role="tablist"
        aria-label="Filter by status"
        className="mb-8 md:mb-10 flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const isActive = statusFilter === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setStatusFilter(filter.value)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? STATUS_TOGGLE_ACTIVE[filter.value]
                  : "border-border/60 bg-background text-muted-foreground/75 hover:bg-muted/40 hover:text-foreground/80",
              )}
            >
              {filter.label}
              <span
                className={cn(
                  "inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[10px] tabular-nums",
                  isActive ? "opacity-80" : "opacity-60",
                )}
              >
                {statusCounts[filter.value]}
              </span>
            </button>
          );
        })}
      </div>

      {groups.length === 0 ? (
        <p className={`${guideProseTight} text-foreground/60`}>
          No pages with this status yet.
        </p>
      ) : (
        <div className="space-y-10 md:space-y-12">
          {groups.map((group) => (
            <section key={group.type} aria-labelledby={`pages-${group.type}`}>
              <h2
                id={`pages-${group.type}`}
                className="text-xs uppercase tracking-[0.18em] font-normal text-muted-foreground/45 mb-3"
              >
                {group.label}
              </h2>
              <PageTable pages={group.pages} />
            </section>
          ))}
        </div>
      )}
    </>
  );
}
