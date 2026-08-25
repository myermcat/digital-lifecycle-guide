/**
 * The guide's assistant, mechanical stage.
 *
 * Everything here runs in the reader's browser: no model, no API key, no server.
 * A question is ranked against the corpus and answered with the sections that match,
 * each linking back into the guide. That is deliberately not a chat answer, and the
 * page says so, because pretending to reason without a model is the one thing that
 * would make it untrustworthy.
 *
 * The model stage adds one call on top of this, choosing an answer shape and writing
 * prose over the top three sections. Retrieval does not change when it arrives.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { loadCorpus, loadMap, guideLink } from "@/lib/assistant/corpus";
import type { Hit, Retriever, Section } from "@/lib/assistant/retrieval";
import {
  answerFrom,
  rewriteQuestion,
  storedKey,
  storeKey,
  type Answer,
} from "@/lib/assistant/model";

/** Real questions drawn from the corpus, so nothing here promises what it cannot do. */
const SUGGESTIONS = [
  "Where does Alpha stop and Beta start?",
  "What happens if my project scores above the capacity class?",
  "How long does a procurement take?",
  "Do I need a privacy impact assessment?",
  "What do I need to prepare for GC EARB?",
  "Should we reuse, buy, or build?",
  "Which accessibility standard applies now?",
  "How do I decommission an application?",
];

type Turn = {
  question: string;
  hits: Hit[];
  expansions: string[];
  intents: string[];
  /** Present once a model has written an answer over the retrieved sections. */
  answer?: Answer & { citedSections: Section[] };
  /** What the rewrite produced, shown so the reader can see why it searched that way. */
  queries?: string[];
  error?: string;
  pending?: boolean;
};

/** What each shape means, said in the reader's terms rather than ours. */
const SHAPE_LABEL: Record<string, { name: string; gloss: string }> = {
  quoted: { name: "Quoted", gloss: "the guide states it" },
  conditional: { name: "Conditional", gloss: "the dependency is the answer" },
  asked_back: { name: "Asked back", gloss: "one question decides it" },
  routed: { name: "Routed", gloss: "no fixed answer exists" },
};

/** The model writes **bold lead-ins**, which is the guide's own house style. */
function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function AssistantPage() {
  const [retriever, setRetriever] = useState<Retriever | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showKeyPanel, setShowKeyPanel] = useState(false);
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setApiKey(storedKey());
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadCorpus()
      .then((r) => {
        if (!cancelled) setRetriever(r);
      })
      .catch((err: Error) => {
        if (!cancelled) setLoadError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const ask = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || !retriever || busy) return;

      /**
       * Retrieval runs first and always, so the page is useful with no key at all. The
       * model only rewrites the question and writes prose over what retrieval found.
       */
      const plain = retriever.search(trimmed, 5);
      const index = turns.length;
      setTurns((prev) => [
        ...prev,
        { question: trimmed, hits: plain.hits, expansions: plain.expansions, intents: plain.intents, pending: Boolean(apiKey) },
      ]);
      setDraft("");

      if (!apiKey) return;
      setBusy(true);

      const patch = (fields: Partial<Turn>) =>
        setTurns((prev) => prev.map((t, i) => (i === index ? { ...t, ...fields } : t)));

      try {
        const map = await loadMap();
        const rewritten = await rewriteQuestion(apiKey, trimmed, map);

        /**
         * Pool the rewritten queries by summing scores, so a section two queries agree
         * on outranks one a single query liked. Then hand the model four sections.
         */
        const pooled = new Map<string, { section: Section; score: number }>();
        for (const q of rewritten.queries) {
          for (const hit of retriever.search(q, 5).hits) {
            const prev = pooled.get(hit.section.id);
            pooled.set(hit.section.id, { section: hit.section, score: (prev?.score ?? 0) + hit.score });
          }
        }
        const chosen = [...pooled.values()].sort((a, b) => b.score - a.score).slice(0, 4);
        const sections = chosen.length ? chosen.map((c) => c.section) : plain.hits.map((h) => h.section);

        const written = await answerFrom(apiKey, trimmed, sections, rewritten.situation);
        patch({ answer: written, queries: rewritten.queries, pending: false });
      } catch (err) {
        patch({ error: (err as Error).message, pending: false });
      } finally {
        setBusy(false);
      }
    },
    [retriever, apiKey, busy, turns.length],
  );

  useEffect(() => {
    if (turns.length) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns.length]);

  const started = turns.length > 0;
  const status = useMemo(() => {
    if (loadError) return `The corpus could not be loaded: ${loadError}`;
    if (!retriever) return "Loading the guide…";
    return `${retriever.size} sections of the guide, searched in your browser`;
  }, [loadError, retriever]);

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col gap-8 px-5 py-10">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
          Prototype · no model attached
        </p>
        <h1 className="text-3xl font-normal leading-tight tracking-tight text-balance sm:text-4xl">
          Ask the guide
        </h1>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          Ask a question and this finds the parts of the guide that answer it, with a link
          to each one. It does the finding, not the reasoning: every word below is the
          guide&rsquo;s own. Nothing you type leaves your browser.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-[0.7rem] text-muted-foreground">{status}</p>
          <button
            type="button"
            onClick={() => setShowKeyPanel((v) => !v)}
            className="font-mono text-[0.7rem] underline decoration-dotted underline-offset-2 text-muted-foreground hover:text-foreground"
          >
            {apiKey ? "written answers on" : "written answers off"}
          </button>
        </div>

        {showKeyPanel && (
          <div className="flex flex-col gap-2 rounded-lg border border-dashed border-border p-4">
            <p className="text-sm leading-relaxed">
              <strong className="font-semibold">Written answers need a model key.</strong> This site
              is static, so it holds no key of its own: anything the page could read, every visitor
              could read. Paste your own and it stays in this browser, sent only to the model.
            </p>
            <p className="text-[0.78rem] leading-relaxed text-muted-foreground">
              A free key from console.groq.com allows about 1,000 questions a day and needs no card.
              Without one, the assistant still finds the right parts of the guide.
            </p>
            <div className="flex flex-wrap gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gsk_..."
                aria-label="Model API key"
                className="min-w-0 flex-1 rounded-md border border-border bg-card px-3 py-2 font-mono text-[0.8rem] outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => {
                  storeKey(apiKey);
                  setShowKeyPanel(false);
                }}
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Save
              </button>
              {apiKey && (
                <button
                  type="button"
                  onClick={() => {
                    setApiKey("");
                    storeKey("");
                  }}
                  className="rounded-md border border-border px-3 py-2 text-sm"
                >
                  Forget it
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {!started && (
        <section aria-labelledby="suggestions-heading" className="flex flex-col gap-3">
          <h2
            id="suggestions-heading"
            className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground"
          >
            Questions it can answer
          </h2>
          <ul className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => ask(s)}
                  disabled={!retriever}
                  className="rounded-full border border-border px-3 py-1.5 text-left text-[0.82rem] font-medium text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {turns.map((turn, i) => (
        <article key={`${turn.question}-${i}`} className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold leading-snug text-balance">{turn.question}</h2>

          {(turn.expansions.length > 0 || turn.intents.length > 0) && (
            <p className="font-mono text-[0.68rem] leading-relaxed text-muted-foreground">
              {turn.intents.length > 0 && (
                <>reads as a {turn.intents.join(" and ")} question, so sections carrying one rank higher</>
              )}
              {turn.expansions.length > 0 && (
                <>
                  {turn.intents.length > 0 ? " · " : ""}
                  expanded: {turn.expansions.join("; ")}
                </>
              )}
            </p>
          )}

          {turn.pending && (
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
              Reading the guide and writing an answer
            </p>
          )}

          {turn.error && (
            <p className="rounded-lg border border-dashed border-destructive/50 p-3 text-sm">
              {turn.error} The sections below come from the guide either way.
            </p>
          )}

          {turn.answer && (
            <div
              className="flex flex-col gap-3 border-l-2 border-primary pl-4"
              data-shape={turn.answer.shape}
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-primary">
                {SHAPE_LABEL[turn.answer.shape]?.name ?? turn.answer.shape}
                <span className="ml-2 normal-case tracking-normal text-muted-foreground">
                  {SHAPE_LABEL[turn.answer.shape]?.gloss}
                </span>
              </p>

              <div className="flex flex-col gap-2 text-[1rem] leading-relaxed">
                {turn.answer.answer.split(/\n{2,}/).map((para, k) => (
                  <p key={k} className="text-pretty">
                    {renderBold(para)}
                  </p>
                ))}
              </div>

              {turn.answer.options.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {turn.answer.options.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => ask(o)}
                      className="rounded-full border border-border px-3 py-1.5 text-[0.82rem] font-medium hover:border-primary hover:text-primary"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}

              {turn.answer.citedSections.length > 0 && (
                <ul className="flex flex-col gap-1">
                  {turn.answer.citedSections.map((s2) => (
                    <li key={s2.id} className="font-mono text-[0.7rem]">
                      <a href={guideLink(s2.path)} className="underline underline-offset-2">
                        {s2.page} · {s2.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {turn.answer.followUps.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {turn.answer.followUps.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => ask(f)}
                      className="text-left text-[0.8rem] text-muted-foreground underline decoration-dotted underline-offset-2 hover:text-primary"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {turn.answer && turn.hits.length > 0 && (
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
              What it read
            </p>
          )}

          {turn.hits.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border p-4 text-sm leading-relaxed">
              Nothing in the guide matched that. That is the honest answer rather than a
              guess, and it usually means the guide does not cover it. The{" "}
              <a className="underline" href={guideLink("/support")}>
                support page
              </a>{" "}
              lists where else to ask.
            </p>
          ) : (
            <ol className="flex flex-col gap-5">
              {turn.hits.map((hit) => (
                <li key={hit.section.id} className="border-l-2 border-border pl-4">
                  <a
                    href={guideLink(hit.section.path)}
                    className="text-sm font-semibold underline decoration-1 underline-offset-2"
                  >
                    {hit.section.page}
                  </a>
                  <span className="text-sm text-muted-foreground"> · {hit.section.heading}</span>
                  <p className="mt-2 text-[0.95rem] leading-relaxed">{hit.snippet}</p>
                  <p className="mt-2 font-mono text-[0.65rem] text-muted-foreground">
                    {hit.section.words} words
                    {hit.why.length > 0 ? ` · ${hit.why.join(", ")}` : ""}
                  </p>
                </li>
              ))}
            </ol>
          )}

          <p className="border-t border-dotted border-border pt-3 text-[0.75rem] leading-relaxed text-muted-foreground">
            Accurate as of the guide&rsquo;s 2026 review. Instruments move: the Standard on Web
            Accessibility was rescinded on 2 March 2026, and the stand-alone Directive on
            Privacy Impact Assessment on 9 October 2024. Confirm anything you are going to act
            on with your department.
          </p>
        </article>
      ))}

      <div ref={endRef} />

      <form
        className="sticky bottom-4 flex items-end gap-2 rounded-xl border border-border bg-card p-2 shadow-sm focus-within:border-primary"
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
        }}
      >
        <label className="sr-only" htmlFor="assistant-question">
          Your question
        </label>
        <textarea
          id="assistant-question"
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask(draft);
            }
          }}
          placeholder="Ask about a checkpoint, a sub-phase, or your own situation"
          className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 text-[0.95rem] leading-relaxed outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={!retriever || busy || draft.trim().length === 0}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Ask
        </button>
      </form>
    </div>
  );
}
