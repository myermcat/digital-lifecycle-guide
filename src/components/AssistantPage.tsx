/**
 * The guide's assistant.
 *
 * Retrieval runs in the reader's browser over a static corpus, so it costs nothing and
 * works with no key. A model then rewrites the question into the guide's vocabulary and
 * writes an answer over what retrieval found, labelled with the KIND of answer it is.
 *
 * WHY THE READER SUPPLIES THE KEY. The site is static, so a key shipped with the page
 * would be readable by everyone who loads it. The reader's own key never leaves their
 * browser except to go to the model provider. `MODEL_ENDPOINT` in model.ts is the seam
 * for a server that holds one key on everybody's behalf.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { loadCorpus, loadMap, loadSources, matchSources, guideLink, type SourceLink } from "@/lib/assistant/corpus";
import type { Hit, Retriever, Section } from "@/lib/assistant/retrieval";
import {
  answerFrom,
  rewriteQuestion,
  storedKey,
  storeKey,
  MODEL_LABEL,
  type Answer,
} from "@/lib/assistant/model";

/** Real questions from the corpus, so nothing here promises what it cannot do. */
const TOPICS: Array<[string, string]> = [
  ["Alpha and Beta", "Where does Alpha stop and Beta start?"],
  ["Approvals", "What happens if my project scores above the capacity class?"],
  ["Procurement", "How long does a procurement take?"],
  ["Privacy", "Do I need a privacy impact assessment?"],
  ["Options analysis", "Should we reuse, buy, or build this?"],
  ["Contracts", "Can I extend the contract we already have?"],
  ["Accessibility", "Which accessibility standard applies now?"],
  ["Sunset", "How do I decommission an application?"],
  ["Monitoring", "What numbers should I be tracking?"],
  ["Team", "Nobody knows who owns this service any more."],
  ["Funding", "How do I get money for this?"],
  ["Discovery", "I have been handed an app. Where do I start?"],
];

const SHAPE: Record<string, { name: string; gloss: string }> = {
  quoted: { name: "Quoted", gloss: "the guide states it" },
  conditional: { name: "Conditional", gloss: "the dependency is the answer" },
  asked_back: { name: "Asked back", gloss: "one question decides it" },
  routed: { name: "Routed", gloss: "no fixed answer exists" },
};

type Turn = {
  question: string;
  /** Sections the model was given, or the plain search hits when there is no key. */
  hits: Hit[];
  answer?: Answer & { citedSections: Section[] };
  error?: string;
  pending?: boolean;
  /** Taking long enough that the reader deserves to know why. */
  waiting?: boolean;
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

/**
 * Render the answer as the structure it actually has.
 *
 * Splitting on blank lines only produced one long paragraph, because the model writes
 * lists with single newlines and sometimes runs "1. ... 2. ..." together on one line.
 * This walks the lines instead, groups consecutive bullets or numbers into a real list,
 * and leaves everything else as paragraphs.
 */
function renderAnswer(text: string) {
  /* a line holding several numbered items becomes several lines */
  const lines = text
    .split("\n")
    /* a line holding several numbered items becomes several lines */
    .flatMap((line) =>
      (line.match(/\d+[.)]\s/g) ?? []).length >= 2 ? line.split(/\s(?=\d+[.)]\s)/) : [line],
    )
    /* and the same for bullets, which the model also runs together on one line */
    .flatMap((line) =>
      (line.match(/[•*]\s|(?:^|\s)-\s/g) ?? []).length >= 2 ? line.split(/\s(?=[•*]\s|-\s)/) : [line],
    )
    /* a bold heading followed by its first item belongs on two lines */
    .flatMap((line) => {
      const m = /^(\*\*[^*]+\*\*:?)\s+(.+)$/.exec(line);
      return m && m[2].length > 40 ? [m[1], m[2]] : [line];
    })
    .map((l) => l.trim())
    .filter(Boolean);

  const isBullet = (l: string) => /^[-*•]\s+/.test(l);
  const isNumber = (l: string) => /^\d+[.)]\s+/.test(l);

  const blocks: Array<{ kind: "p" | "ul" | "ol"; items: string[] }> = [];
  for (const line of lines) {
    const kind = isBullet(line) ? "ul" : isNumber(line) ? "ol" : "p";
    const body = line.replace(/^[-*•]\s+/, "").replace(/^\d+[.)]\s+/, "");
    const last = blocks[blocks.length - 1];
    if (last && last.kind === kind && kind !== "p") last.items.push(body);
    else blocks.push({ kind, items: [body] });
  }

  return blocks.map((block, i) => {
    if (block.kind === "p") {
      return (
        <p key={i} className="text-pretty">
          {renderBold(block.items[0])}
        </p>
      );
    }
    const List = block.kind === "ol" ? "ol" : "ul";
    return (
      <List
        key={i}
        className={
          block.kind === "ol"
            ? "flex list-decimal flex-col gap-1.5 pl-5"
            : "flex flex-col gap-1.5 pl-4"
        }
      >
        {block.items.map((item, k) => (
          <li
            key={k}
            className={
              block.kind === "ol"
                ? "text-pretty"
                : "relative text-pretty before:absolute before:-left-4 before:top-[0.62em] before:h-px before:w-2 before:bg-muted-foreground"
            }
          >
            {renderBold(item)}
          </li>
        ))}
      </List>
    );
  });
}

/**
 * The first screen, when there is no key yet.
 *
 * Cards drift across the whole viewport rather than only the gutters, because there is
 * no column of text to protect: the only thing in the middle is the one card asking for
 * a key. Clicking a drifting question stores it and asks it the moment a key arrives.
 */
function Splash({
  cards,
  keyDraft,
  setKeyDraft,
  onSaveKey,
  onSkip,
  onPickQuestion,
}: {
  cards: Array<[string, string]>;
  keyDraft: string;
  setKeyDraft: (v: string) => void;
  onSaveKey: () => void;
  onSkip: () => void;
  onPickQuestion: (q: string) => void;
}) {
  return (
    <div className="relative flex min-h-[82vh] w-full items-center justify-center overflow-hidden px-5 py-12">
      <div
        className="dlg-drift-layer dlg-splash-drift pointer-events-none absolute inset-0 z-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0,black_9%,black_100%)]"
        role="group"
        aria-label="Example questions you can ask"
      >
        {cards.map(([topic, question], i) => {
          /* spread across the width in lanes, so nothing stacks on the middle card */
          const lanes = [4, 17, 30, 58, 71, 84, 11, 77, 24, 64, 38, 50];
          return (
            <button
              key={question}
              type="button"
              onClick={() => onPickQuestion(question)}
              style={
                {
                  left: `${lanes[i % lanes.length]}%`,
                  width: "min(14rem, 42vw)",
                  ["--dur" as string]: `${58 + ((i * 7) % 22)}s`,
                  ["--delay" as string]: `${-i * 6.5}s`,
                  ["--tilt" as string]: `${((i % 3) - 1) * 0.6}deg`,
                } as React.CSSProperties
              }
              className="dlg-drift-card pointer-events-auto absolute top-0 rounded-xl border border-border/70 bg-card p-3 text-left opacity-[0.72] shadow-sm transition hover:border-primary hover:opacity-100"
            >
              <span className="block font-mono text-[0.58rem] uppercase tracking-[0.11em] text-muted-foreground">
                {topic}
              </span>
              <span className="mt-1.5 block text-[0.88rem] leading-snug text-muted-foreground">
                {question}
              </span>
            </button>
          );
        })}
      </div>

      <section className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card/95 p-7 shadow-lg backdrop-blur-sm">
        <h1 className="text-2xl font-normal leading-tight tracking-tight text-balance sm:text-3xl">
          Ask the guide
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Put a question in your own words and get an answer from the guide, with a link to
          the part it came from.
        </p>

        <form
          className="mt-6 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSaveKey();
          }}
        >
          <label htmlFor="splash-key" className="text-sm font-semibold">
            Paste an AI key to begin
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              id="splash-key"
              type="password"
              value={keyDraft}
              onChange={(e) => setKeyDraft(e.target.value)}
              placeholder="gsk_..."
              className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-[0.82rem] outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={keyDraft.trim().length === 0}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
            >
              Begin
            </button>
          </div>
        </form>

        <p className="mt-3 text-[0.78rem] leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">Your key stays on this device.</strong>{" "}
          It is sent only to the AI that writes the answer. It never reaches this website or
          anyone running it.
        </p>

        <p className="mt-2 text-[0.78rem] leading-relaxed text-muted-foreground">
          A free key from{" "}
          <a
            className="underline underline-offset-2"
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noreferrer"
          >
            console.groq.com
          </a>{" "}
          covers about a thousand questions a day and needs no credit card.
        </p>

        <button
          type="button"
          onClick={onSkip}
          className="mt-5 text-[0.78rem] text-muted-foreground underline decoration-dotted underline-offset-2 hover:text-foreground"
        >
          Or continue without AI, and get the guide's own sections instead
        </button>
      </section>
    </div>
  );
}

export function AssistantPage() {
  const [retriever, setRetriever] = useState<Retriever | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [keyDraft, setKeyDraft] = useState("");
  /** Set once the reader chooses to carry on without a key. */
  const [skippedKey, setSkippedKey] = useState(false);
  const [showKeyPanel, setShowKeyPanel] = useState(false);
  const [busy, setBusy] = useState(false);
  /** A question clicked on the welcome screen, asked as soon as a key exists. */
  const [queued, setQueued] = useState<string | null>(null);
  const [sources, setSources] = useState<SourceLink[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setApiKey(storedKey()), []);
  useEffect(() => {
    void loadSources().then(setSources);
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadCorpus()
      .then((r) => !cancelled && setRetriever(r))
      .catch((e: Error) => !cancelled && setLoadError(e.message));
    return () => {
      cancelled = true;
    };
  }, []);

  const ask = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || !retriever || busy) return;

      const plain = retriever.search(trimmed, 5);
      const index = turns.length;
      setTurns((prev) => [
        ...prev,
        { question: trimmed, hits: plain.hits, pending: Boolean(apiKey) },
      ]);
      setDraft("");

      if (!apiKey) return;
      setBusy(true);
      const patch = (fields: Partial<Turn>) =>
        setTurns((prev) => prev.map((t, i) => (i === index ? { ...t, ...fields } : t)));

      /**
       * The last two answered exchanges. Without them a follow-up like "threats like what"
       * arrives with no idea what was being discussed, and gets answered as if it were the
       * opening question.
       */
      const history = turns
        .filter((t) => t.answer)
        .slice(-2)
        .map((t) => ({ question: t.question, answer: t.answer!.answer }));

      /**
       * A free key allows 6,000 tokens a minute, so a burst of questions makes the client
       * wait. Say that, because otherwise the page looks frozen for a minute.
       */
      const slowTimer = window.setTimeout(
        () => patch({ waiting: true }),
        9000,
      );

      try {
        const map = await loadMap();
        const previous = turns.length ? turns[turns.length - 1].question : undefined;
        const rewritten = await rewriteQuestion(apiKey, trimmed, map, previous);

        /**
         * Pool the rewritten queries by summing scores, so a section two queries agree
         * on outranks one a single query liked a lot.
         */
        const pooled = new Map<string, { hit: Hit; score: number }>();
        for (const q of rewritten.queries) {
          for (const hit of retriever.search(q, 5).hits) {
            const prev = pooled.get(hit.section.id);
            pooled.set(hit.section.id, { hit, score: (prev?.score ?? 0) + hit.score });
          }
        }
        const chosen = [...pooled.values()].sort((a, b) => b.score - a.score).slice(0, 3);
        const given = chosen.length ? chosen.map((c) => c.hit) : plain.hits;

        const written = await answerFrom(
          apiKey,
          trimmed,
          given.map((h) => h.section),
          rewritten.situation,
          history,
        );
        /**
         * Replace the hits with the ones the model was actually given. Leaving the plain
         * search results underneath a written answer showed the reader the pre-rewrite
         * results, which are the bad ones, and they read as irrelevant because they were.
         */
        patch({ answer: written, hits: given, pending: false, waiting: false });
      } catch (err) {
        patch({ error: (err as Error).message, pending: false, waiting: false });
      } finally {
        window.clearTimeout(slowTimer);
        setBusy(false);
      }
    },
    [retriever, apiKey, busy, turns.length],
  );

  useEffect(() => {
    if (turns.length) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns.length]);

  /** A question picked before there was a key gets asked once one arrives. */
  useEffect(() => {
    if (queued && retriever && (apiKey || skippedKey)) {
      const q = queued;
      setQueued(null);
      void ask(q);
    }
  }, [queued, retriever, apiKey, skippedKey, ask]);

  const started = turns.length > 0;
  const gateOpen = !apiKey && !skippedKey;
  const drifting = useMemo(() => [...TOPICS].sort(() => Math.random() - 0.5), []);

  const status = loadError
    ? `The guide could not be loaded: ${loadError}`
    : !retriever
      ? "Loading the guide"
      : apiKey
        ? `${retriever.size} sections, AI answers by ${MODEL_LABEL}`
        : `${retriever.size} sections, searched in your browser, no AI`;

  const driftStyles = (
    <style>{`
      /* start below the fold and end above it, so a card rises into view rather than
         appearing in the middle of the screen */
      @keyframes dlg-drift {
        from { transform: translateY(105vh) rotate(var(--tilt, 0deg)); }
        to   { transform: translateY(-115vh) rotate(var(--tilt, 0deg)); }
      }
      .dlg-drift-card { animation: dlg-drift var(--dur, 64s) linear var(--delay, 0s) infinite; }
      @media (prefers-reduced-motion: reduce) { .dlg-drift-card { animation: none; } }
      @media (max-width: 40rem) { .dlg-drift-layer { display: none; } }
    `}</style>
  );

  if (gateOpen) {
    return (
      <>
        {driftStyles}
        <Splash
          cards={drifting}
          keyDraft={keyDraft}
          setKeyDraft={setKeyDraft}
          onSaveKey={() => {
            storeKey(keyDraft);
            setApiKey(keyDraft.trim());
          }}
          onSkip={() => setSkippedKey(true)}
          onPickQuestion={(q) => setQueued(q)}
        />
      </>
    );
  }

  return (
    <div className="relative mx-auto flex min-h-[100vh] w-full max-w-5xl flex-col gap-7 px-5 py-8">
      <style>{`
        /* start below the fold and end above it, so a card rises into view rather than
           appearing in the middle of the screen */
        @keyframes dlg-drift {
          from { transform: translateY(105vh) rotate(var(--tilt, 0deg)); }
          to   { transform: translateY(-115vh) rotate(var(--tilt, 0deg)); }
        }
        .dlg-drift-card { animation: dlg-drift var(--dur, 64s) linear var(--delay, 0s) infinite; }
        @media (prefers-reduced-motion: reduce) { .dlg-drift-card { animation: none; } }
        /* below this there is no gutter left once the column takes its 48rem */
        /* the chat's cards live in the gutters, so they need a wide screen */
        @media (max-width: 72rem) { .dlg-chat-drift { display: none; } }
        /* the splash spreads them across the whole width, so only a phone is too narrow */
        @media (max-width: 40rem) { .dlg-splash-drift { display: none; } }
      `}</style>

      {/* Drifting topic cards, in the gutters either side of the reading column. */}
      {!started && (
        <div
          className="dlg-drift-layer dlg-chat-drift pointer-events-none fixed inset-0 z-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0,black_11%,black_100%)]"
          role="group"
          aria-label="Example questions you can ask"
        >
          {drifting.slice(0, 8).map(([topic, question], i) => (
            <button
              key={question}
              type="button"
              onClick={() => ask(question)}
              style={
                {
                  /**
                   * The column is 48rem, so its half is 24rem. 27rem leaves a 3rem gap,
                   * because at 25rem the cards were still touching the text on a wide
                   * screen once their shadow was counted.
                   */
                  /**
                   * Clearance is measured against the 48rem reading column, not the wider
                   * composer: the composer is opaque and sticky at the foot, so a card
                   * passing behind it is hidden anyway. Measuring against the composer
                   * pushed the cards off every screen narrower than 1568px.
                   */
                  [i % 2 === 0 ? "right" : "left"]: "calc(50% + 25.5rem)",
                  ["--dur" as string]: "64s",
                  ["--delay" as string]: `${-i * 8}s`,
                  ["--tilt" as string]: `${((i % 3) - 1) * 0.5}deg`,
                  width: "min(13rem, calc(50% - 26.5rem))",
                } as React.CSSProperties
              }
              className="dlg-drift-card pointer-events-auto absolute rounded-xl border border-border/70 bg-card p-3 text-left opacity-[0.78] shadow-sm transition hover:border-primary hover:opacity-100"
            >
              <span className="block font-mono text-[0.58rem] uppercase tracking-[0.11em] text-muted-foreground">
                {topic}
              </span>
              <span className="mt-1.5 block text-[0.9rem] leading-snug text-muted-foreground">
                {question}
              </span>
            </button>
          ))}
        </div>
      )}

      <header
        className={
          started
            ? "relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-2"
            : "relative z-10 flex flex-1 flex-col items-center justify-center gap-3 text-center"
        }
      >
        <a
          href={guideLink("/")}
          className={`font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground underline decoration-dotted underline-offset-2 hover:text-foreground ${started ? "self-start" : ""}`}
        >
          Back to the guide
        </a>
        <h1
          className={
            started
              ? "text-2xl font-normal leading-tight tracking-tight text-balance"
              : "text-4xl font-normal leading-[1.1] tracking-tight text-balance sm:text-5xl"
          }
        >
          Ask the guide
        </h1>
        <p
          className={`text-sm leading-relaxed text-muted-foreground ${started ? "max-w-prose" : "max-w-md text-[0.95rem]"}`}
        >
          Ask about a checkpoint, a sub-phase, or your own situation. Every answer says what
          kind of answer it is, and links to the part of the guide it came from.
        </p>
        <p className="font-mono text-[0.7rem] text-muted-foreground">{status}</p>
      </header>

      {/* Once a key is in, keep the control small but reachable. */}
      {(
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em]">
            <span
              className={`h-1.5 w-1.5 rounded-full ${apiKey ? "bg-primary" : "bg-muted-foreground"}`}
              aria-hidden="true"
            />
            {apiKey ? "AI answers on" : "AI answers off"}
          </span>
          <button
            type="button"
            onClick={() => setShowKeyPanel((v) => !v)}
            className="text-[0.75rem] underline decoration-dotted underline-offset-2 text-muted-foreground hover:text-foreground"
          >
            {apiKey ? "Change or remove AI key" : "Add an AI key"}
          </button>
          {showKeyPanel && (
            <form
              className="flex w-full flex-wrap gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                storeKey(keyDraft);
                setApiKey(keyDraft.trim());
                setShowKeyPanel(false);
              }}
            >
              <input
                type="password"
                value={keyDraft}
                onChange={(e) => setKeyDraft(e.target.value)}
                placeholder={apiKey ? "new key" : "gsk_..."}
                aria-label="Model API key"
                className="min-w-0 flex-1 rounded-lg border border-border bg-card px-3 py-2 font-mono text-[0.8rem] outline-none focus:border-primary"
              />
              <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                Save
              </button>
              {apiKey && (
                <button
                  type="button"
                  onClick={() => {
                    setApiKey("");
                    setKeyDraft("");
                    storeKey("");
                    setShowKeyPanel(false);
                  }}
                  className="rounded-lg border border-border px-3 py-2 text-sm"
                >
                  Forget it
                </button>
              )}
            </form>
          )}
        </div>
      )}

      {turns.map((turn, i) => (
        <article key={`${turn.question}-${i}`} className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-4">
          <h2 className="text-lg font-semibold leading-snug text-balance">{turn.question}</h2>

          {turn.pending && (
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
              {turn.waiting
                ? "Waiting out the free key's per-minute limit, then answering"
                : "Reading the guide and writing an answer"}
            </p>
          )}

          {turn.error && (
            <p className="rounded-lg border border-dashed border-border p-3 text-sm">
              {turn.error} The parts of the guide below were found without it.
            </p>
          )}

          {turn.answer && (
            <div className="flex flex-col gap-4 border-l-2 border-primary pl-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-primary">
                {SHAPE[turn.answer.shape]?.name ?? turn.answer.shape}
                <span className="ml-2 normal-case tracking-normal text-muted-foreground">
                  {SHAPE[turn.answer.shape]?.gloss}
                </span>
              </p>

              <div className="flex flex-col gap-3 text-[1rem] leading-relaxed">
                {renderAnswer(turn.answer.answer)}
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
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Where this comes from
                  </p>
                  <ul className="flex flex-col gap-1">
                    {turn.answer.citedSections.map((s) => (
                      <li key={s.id} className="text-[0.8rem]">
                        <a
                          href={s.external || guideLink(s.path)}
                          {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
                          className="underline underline-offset-2"
                        >
                          {s.page}
                        </a>
                        <span className="text-muted-foreground"> · {s.heading}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* The instruments this answer names, offered as the source itself. */}
              {(() => {
                const cited = matchSources(turn.answer.answer, sources);
                if (!cited.length) return null;
                return (
                  <div className="flex flex-col gap-1">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                      Read the instrument
                    </p>
                    <ul className="flex flex-col gap-1">
                      {cited.map((c) => (
                        <li key={c.id} className="text-[0.8rem]">
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-2"
                          >
                            {c.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}

              {turn.answer.followUps.length > 0 && (
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Ask next
                  </p>
                  <div className="flex flex-col items-start gap-1">
                    {turn.answer.followUps.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => ask(f)}
                        className="text-left text-[0.82rem] text-muted-foreground underline decoration-dotted underline-offset-2 hover:text-primary"
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/*
            With no key there is no written answer, so the sections ARE the answer and
            are shown in full. With a written answer, the citations above already name
            what it used, so the rest is not shown: an unexplained list of near misses
            reads as irrelevance, because that is what it is.
          */}
          {!turn.answer && !turn.pending && (
            turn.hits.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border p-4 text-sm leading-relaxed">
                Nothing in the guide matched that. That is the honest answer rather than a
                guess. The{" "}
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
                  </li>
                ))}
              </ol>
            )
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

      {/*
        The composer sits at the foot of the page with its suggestions attached above it,
        so the questions it can answer are part of the thing you type into rather than a
        list somewhere else. Both span wider than the reading column, which fits more
        suggestions on one line.
      */}
      <div className="sticky bottom-0 z-10 -mx-5 mt-auto flex flex-col gap-2 bg-gradient-to-t from-background via-background to-transparent px-5 pb-5 pt-6">
        {!started && (
          <div className="mx-auto w-full max-w-5xl">
            <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
              Questions it can answer
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {TOPICS.map(([, q]) => (
                <li key={q}>
                  <button
                    type="button"
                    onClick={() => ask(q)}
                    disabled={!retriever}
                    className="rounded-full border border-border bg-card/70 px-3 py-1.5 text-left text-[0.8rem] font-medium transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      <form
        className="mx-auto flex w-full max-w-5xl items-end gap-2 rounded-xl border border-border bg-card p-2 shadow-md focus-within:border-primary"
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
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          {busy ? "Working" : "Ask"}
        </button>
      </form>
      </div>
    </div>
  );
}
