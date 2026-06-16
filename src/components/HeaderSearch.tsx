import { useEffect, useMemo, useRef, useState } from "react";
import MiniSearch from "minisearch";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { loadSearchIndex, type SearchIndexRecord } from "@/lib/search-index";

type SearchHit = SearchIndexRecord & { score: number; terms?: string[] };

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; mini: MiniSearch<SearchIndexRecord>; records: SearchIndexRecord[] }
  | { status: "error"; message: string };

function useSearchData(open: boolean) {
  const [state, setState] = useState<SearchState>({ status: "idle" });

  useEffect(() => {
    if (!open) return;
    if (state.status === "ready" || state.status === "loading") return;

    let cancelled = false;
    setState({ status: "loading" });

    loadSearchIndex()
      .then((records) => {
        if (cancelled) return;
        const mini = new MiniSearch<SearchIndexRecord>({
          fields: ["pageTitle", "sectionHeading", "text"],
          storeFields: [
            "id",
            "pageTitle",
            "pagePath",
            "sectionId",
            "sectionHeading",
            "region",
            "text",
          ],
          searchOptions: {
            prefix: true,
            fuzzy: 0.2,
            boost: { pageTitle: 4, sectionHeading: 3, text: 1 },
          },
        });
        mini.addAll(records);
        setState({ status: "ready", mini, records });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          status: "error",
          message: err instanceof Error ? err.message : "Failed to load search.",
        });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return state;
}

function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(text: string, terms: string[]) {
  const source = String(text ?? "");
  if (!source || terms.length === 0) return source;

  const escaped = terms
    .filter(Boolean)
    .slice(0, 6)
    .map(escapeRegex);
  if (escaped.length === 0) return source;

  let parts: string[];
  try {
    const re = new RegExp(`(${escaped.join("|")})`, "gi");
    parts = source.split(re);
  } catch {
    return source;
  }

  const matchers = terms
    .filter(Boolean)
    .slice(0, 6)
    .map((term) => new RegExp(`^${escapeRegex(term)}$`, "i"));

  return parts.map((part, i) => {
    const isMatch = matchers.some((matcher) => matcher.test(part));
    return isMatch ? (
      <mark
        key={`${part}-${i}`}
        className="bg-transparent text-primary font-semibold underline underline-offset-2"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${i}`}>{part}</span>
    );
  });
}

function snippet(text: string, terms: string[]) {
  const body = String(text ?? "").replace(/\s+/g, " ").trim();
  if (!body) return "";

  const lowered = body.toLowerCase();
  const first = terms
    .map((t) => lowered.indexOf(t.toLowerCase()))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];

  const anchor = first ?? 0;
  const start = Math.max(0, anchor - 48);
  const end = Math.min(body.length, anchor + 96);
  const s = body.slice(start, end).trim();
  return `${start > 0 ? "…" : ""}${s}${end < body.length ? "…" : ""}`;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const searchState = useSearchData(open);

  // Global hotkeys: Cmd/Ctrl+K, "/" and Escape.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const metaK = key === "k" && (event.metaKey || event.ctrlKey);
      const slash = key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;

      if (metaK) {
        event.preventDefault();
        setOpen(true);
        return;
      }

      if (slash && !isTypingTarget(event.target)) {
        event.preventDefault();
        setOpen(true);
        return;
      }

      if (key === "escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (open) return;
    setQuery("");
    triggerRef.current?.focus();
  }, [open]);

  const results = useMemo(() => {
    if (searchState.status !== "ready") return [] as SearchHit[];
    const q = query.trim();
    if (!q) return [] as SearchHit[];

    try {
      return searchState.mini.search(q, {
        prefix: true,
        fuzzy: 0.2,
        boost: { pageTitle: 4, sectionHeading: 3, text: 1 },
      }) as SearchHit[];
    } catch {
      return [] as SearchHit[];
    }
  }, [query, searchState]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchHit[]>();
    results.forEach((r) => {
      const list = map.get(r.pagePath) ?? [];
      list.push(r);
      map.set(r.pagePath, list);
    });
    return [...map.entries()];
  }, [results]);

  const isLoading = searchState.status === "loading";
  const isError = searchState.status === "error";

  const onSelect = (recordId: string) => {
    if (searchState.status !== "ready") return;
    const record = searchState.records.find((r) => r.id === recordId);
    if (!record) return;

    setOpen(false);
    void navigate({
      to: record.pagePath,
      hash: record.sectionId || undefined,
    });
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Search the guide"
        aria-keyshortcuts="Meta+K Control+K /"
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 backdrop-blur-sm",
          "px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-sans text-foreground/65",
          "hover:bg-muted/60 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "md:w-[240px] md:justify-between",
        )}
      >
        <span className="inline-flex items-center gap-2">
          <Search className="size-3.5 opacity-70" aria-hidden />
          <span className="hidden md:inline normal-case tracking-normal text-xs text-foreground/60">
            Search the guide
          </span>
        </span>
        <span className="hidden md:inline-flex items-center rounded-md border border-border/60 bg-background/50 px-1.5 py-0.5 text-[10px] text-foreground/55">
          ⌘K
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[640px] w-[min(640px,calc(100vw-1.5rem))] rounded-2xl border border-border/60 bg-card/95 backdrop-blur-sm p-0 overflow-hidden shadow-xl">
          <Command shouldFilter={false} className="w-full">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60">
              <Search className="size-4 text-foreground/55" aria-hidden />
              <Command.Input
                ref={inputRef}
                value={query}
                onValueChange={setQuery}
                placeholder="Search the guide…"
                aria-label="Search the guide"
                className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-foreground/45"
              />
            </div>

            <Command.List className="max-h-[420px] overflow-auto p-2">
              {isLoading ? (
                <p className="px-3 py-2 text-sm text-foreground/60">Loading search…</p>
              ) : isError ? (
                <p className="px-3 py-2 text-sm text-foreground/60">
                  {(searchState as { status: "error"; message: string }).message}
                </p>
              ) : query.trim().length === 0 ? (
                <p className="px-3 py-2 text-sm text-foreground/60">
                  Type a page name or a phrase from the guide.
                </p>
              ) : results.length === 0 ? (
                <Command.Empty className="px-3 py-2 text-sm text-foreground/60">
                  Nothing matched. Try another word.
                </Command.Empty>
              ) : (
                grouped.map(([pagePath, pageResults]) => {
                  const pageTitle = pageResults[0]?.pageTitle ?? pagePath;
                  return (
                    <Command.Group
                      key={pagePath}
                      heading={pageTitle}
                      className="px-1 py-1.5 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-foreground/55"
                    >
                      {pageResults.slice(0, 8).map((r) => {
                        const terms = r.terms ?? query.trim().split(/\s+/).filter(Boolean);
                        const line = snippet(r.text, terms);
                        return (
                          <Command.Item
                            key={r.id}
                            value={r.id}
                            onSelect={() => onSelect(r.id)}
                            className={cn(
                              "cursor-pointer rounded-xl px-3 py-2",
                              "data-[selected=true]:bg-muted/60",
                              "focus:outline-none",
                            )}
                          >
                            <div className="text-sm font-medium text-foreground/80">
                              {highlight(r.sectionHeading, terms)}
                            </div>
                            {line ? (
                              <div className="mt-1 text-xs leading-relaxed text-foreground/60 line-clamp-2">
                                {highlight(line, terms)}
                              </div>
                            ) : null}
                          </Command.Item>
                        );
                      })}
                    </Command.Group>
                  );
                })
              )}
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
