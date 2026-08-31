/**
 * Retrieval over the guide corpus. Pure, no I/O, runs in a browser or in Node.
 *
 * This is the half of the assistant that needs no model, no API key and no server.
 * The corpus ships as a static asset (about 184 KB gzipped), so a reader's browser
 * does the ranking and the page can answer with the right sections and deep links
 * before any model is involved. When a model is added it only has to choose an
 * answer shape and write prose over three sections, which keeps the prompt small
 * enough to live comfortably inside a free tier.
 *
 * Two things do more for quality here than the ranking maths:
 *
 *   ALIASES. Government vocabulary is acronyms. Somebody types "PIA" or "EARB" and
 *   the corpus says "privacy impact assessment" and "Enterprise Architecture Review
 *   Board". Without expansion, the most common phrasing returns nothing.
 *
 *   FACETS. A "how long" question should prefer sections that actually contain a
 *   duration, and a "how much" question sections carrying a dollar threshold. Both
 *   are detected when the corpus is built, so this costs nothing at query time.
 */

export type SectionFacets = {
  hasDuration: boolean;
  hasThreshold: boolean;
  hasRole: boolean;
};

export type Section = {
  id: string;
  /** Set when the section is an excerpt of an external instrument, not a guide page. */
  external?: string;
  page: string;
  path: string;
  slug: string;
  heading: string;
  text: string;
  words: number;
  tokens: number;
  visibility: string;
  facets: SectionFacets;
};

export type Hit = {
  section: Section;
  score: number;
  /** Why this ranked where it did, so the page can be honest about it. */
  why: string[];
  snippet: string;
};

export type SearchResult = {
  hits: Hit[];
  expansions: string[];
  intents: string[];
};

/* ------------------------------------------------------------------ *
 * Vocabulary
 * ------------------------------------------------------------------ */

/** Works in both directions: typing either side finds the other. */
export const ALIASES: Array<[string, string[]]> = [
  ["pia", ["privacy", "impact", "assessment"]],
  ["earb", ["enterprise", "architecture", "review", "board"]],
  ["gcearb", ["enterprise", "architecture", "review", "board"]],
  ["pcra", ["project", "complexity", "risk", "assessment"]],
  ["opmca", ["organizational", "project", "management", "capacity", "assessment"]],
  ["tb", ["treasury", "board"]],
  ["tbs", ["treasury", "board", "secretariat"]],
  ["pspc", ["public", "services", "procurement", "canada"]],
  ["sow", ["statement", "of", "work"]],
  ["soo", ["statement", "of", "objectives"]],
  ["rfp", ["request", "for", "proposals"]],
  ["rfi", ["request", "for", "information"]],
  ["itq", ["invitation", "to", "qualify"]],
  ["saa", ["security", "assessment", "authorization"]],
  ["ato", ["authority", "to", "operate"]],
  ["atip", ["access", "to", "information", "privacy"]],
  ["pib", ["personal", "information", "bank"]],
  ["mvp", ["minimum", "viable", "product", "smallest", "version"]],
  ["cio", ["chief", "information", "officer"]],
  ["dg", ["director", "general"]],
  ["clca", ["comprehensive", "land", "claims", "agreement"]],
  ["wcag", ["accessibility", "standard"]],
  ["decommission", ["sunset", "retire", "decommissioning"]],
  ["retire", ["sunset", "decommission"]],
  ["procure", ["procurement", "buying", "contract"]],
  ["buy", ["procurement", "buying", "purchase"]],
  ["vendor", ["supplier", "contractor"]],
  ["timeline", ["long", "months", "weeks"]],

  /**
   * Words readers use that the guide does not.
   *
   * "Can I pilot it in one region" was answered from the Sunset page, because the only
   * section containing the word "pilot" is a replacement rollout, while the thing being
   * asked about is called a private beta. "Should we stop" missed the guide's own line
   * that the cheapest decision is the one to stop, because nothing matched.
   */
  ["pilot", ["private", "beta", "small", "group", "invited", "prove"]],
  ["piloting", ["private", "beta", "invited", "prove"]],
  ["rollout", ["public", "beta", "release", "launch", "open"]],
  ["launch", ["public", "beta", "live", "release"]],
  ["stop", ["stop", "cancel", "abandon", "exit", "decision"]],
  ["cancel", ["stop", "abandon", "exit"]],
  ["abandon", ["stop", "cancel", "exit"]],
  ["continue", ["forward", "proceed", "stop", "exit"]],
  ["scrap", ["stop", "retire", "sunset"]],
  ["allowed", ["authority", "approval", "delegated", "permitted"]],
  ["permission", ["authority", "approval", "sign", "delegated"]],
  ["authority", ["approval", "authorization", "delegated", "sign"]],
];

const ALIAS_MAP = new Map(ALIASES);

const STOP = new Set(
  ("a an the and or but if then than that this these those is are was were be been being do does did " +
    "of to in on for with at by from as it its i we you my our your me us they them he she " +
    "what which who whom whose when where why how need can should would could will shall may might must " +
    "about into over under again further once here there all any both each few more most other some such " +
    "no nor not only own same so too very s t just don now get got").split(" "),
);

/** Question shapes worth detecting mechanically: they change which sections help. */
const INTENTS: Array<{ name: string; test: RegExp; facet: keyof SectionFacets }> = [
  {
    name: "duration",
    test: /\b(how long|how many (?:years|months|weeks|days)|timeline|lead time|when will|duration|takes?)\b/i,
    facet: "hasDuration",
  },
  {
    name: "threshold",
    test: /\b(how much|threshold|dollar|cost|limit|over \$|budget|above)\b/i,
    facet: "hasThreshold",
  },
  {
    name: "who",
    test: /\b(who (?:signs|approves|owns|decides|does|is responsible)|whose job|which team|accountable)\b/i,
    facet: "hasRole",
  },
  /*
   * A decision question needs the decider even when it does not ask for one.
   *
   * "we are over budget and behind schedule, do i stop or push through" carries no "who"
   * wording, so it got no role boost, and the answer told the reader to weigh the evidence
   * without naming a single person or body who could act on it. In this guide the answer to
   * "should I" is almost always "you, up to a limit, and someone else above it", so a
   * question shaped like a decision is a question about authority whether it says so or not.
   */
  {
    name: "decision",
    test: /\b(should (?:i|we)|do (?:i|we) (?:stop|continue|need|have to)|can (?:i|we)|am (?:i|we) allowed|are we allowed|is it ok(?:ay)?|stop or|push through|go ahead)\b/i,
    facet: "hasRole",
  },
];

export function tokenise(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[’']/g, "")
    .split(/[^a-z0-9&]+/)
    .filter(Boolean)
    .filter((t) => !STOP.has(t))
    .map((t) => (t.length > 4 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t));
}

function expand(terms: string[]): { terms: string[]; expansions: string[] } {
  const out = new Set(terms);
  const expansions: string[] = [];
  for (const t of terms) {
    const alias = ALIAS_MAP.get(t);
    if (alias) {
      for (const a of alias) out.add(a);
      expansions.push(`${t} → ${alias.join(" ")}`);
    }
    for (const [acronym, wordsOf] of ALIASES) {
      if (wordsOf.includes(t)) out.add(acronym);
    }
  }
  return { terms: [...out], expansions };
}

/**
 * Page furniture, never an answer. Left alone these outrank real content: the shared
 * thread strip came first for "which accessibility standard applies now", and the
 * label list placed for "how do I decommission an application".
 */
const SCAFFOLDING = /^\/(shared|index)\b|^\/thread\/shared\b/;

/** Headings that name a list of pointers rather than an explanation. */
const REFERENCE_FURNITURE =
  /\b(sources?|further reading|see also|templates? and tools|supporting reference|governing instrument|communities|glossary)\b/i;

/* ------------------------------------------------------------------ *
 * Index
 * ------------------------------------------------------------------ */

export class Retriever {
  private readonly sections: Section[];
  private readonly postings = new Map<string, Map<number, number>>();
  private readonly lengths: number[] = [];
  private readonly avgLength: number;

  constructor(sections: Section[], opts: { includePrivate?: boolean } = {}) {
    this.sections = opts.includePrivate ? sections : sections.filter((s) => s.visibility === "public");

    this.sections.forEach((s, i) => {
      /*
       * The heading counts four times, because it is the most descriptive thing about a
       * section. It used to say three, and 405 of the 1107 sections then repeated their
       * heading as the first line of their own body, so those were really being counted four
       * times and the rest three. Taking the duplicate out of the corpus, which it had to be
       * because the model was reading the line twice and writing it twice, dropped NAMED
       * top-1 from 92 to 89 per cent and OWNER from 95 to 86: the accidental weight had been
       * doing real work. This says four on purpose, and every section gets it.
       */
      const terms = tokenise(`${s.heading} ${s.heading} ${s.heading} ${s.heading} ${s.page} ${s.text}`);
      this.lengths[i] = terms.length;
      for (const t of terms) {
        let posting = this.postings.get(t);
        if (!posting) this.postings.set(t, (posting = new Map()));
        posting.set(i, (posting.get(i) ?? 0) + 1);
      }
    });

    this.avgLength =
      this.lengths.reduce((a, b) => a + b, 0) / Math.max(1, this.lengths.length);
  }

  get size(): number {
    return this.sections.length;
  }

  search(query: string, limit = 6): SearchResult {
    const typed = tokenise(query);
    const { terms, expansions } = expand(typed);
    const intents = INTENTS.filter((i) => i.test.test(query));

    const k1 = 1.4;
    const b = 0.72;
    const total = this.sections.length;
    const scores = new Map<number, number>();
    const matched = new Map<number, Set<string>>();

    for (const term of terms) {
      const posting = this.postings.get(term);
      if (!posting) continue;
      const idf = Math.log(1 + (total - posting.size + 0.5) / (posting.size + 0.5));
      for (const [i, tf] of posting) {
        const norm =
          (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (this.lengths[i] / this.avgLength)));
        // a term the reader actually typed outweighs one an alias supplied
        const weight = typed.includes(term) ? 1 : 0.75;
        scores.set(i, (scores.get(i) ?? 0) + idf * norm * weight);
        let seen = matched.get(i);
        if (!seen) matched.set(i, (seen = new Set()));
        seen.add(term);
      }
    }

    const hits: Hit[] = [];
    for (const [i, raw] of scores) {
      const section = this.sections[i];
      let score = raw;
      const why: string[] = [];

      for (const intent of intents) {
        if (section.facets[intent.facet]) {
          score *= 1.45;
          why.push(`carries a ${intent.name}`);
        }
      }
      /**
       * Very short sections are almost never the answer. A 17-word "sources" list was
       * outranking the 304-word Threat and risk assessment for a question about threats,
       * because a link list mentions a term without explaining it.
       */
      if (section.words < 30) score *= 0.3;
      else if (section.words < 60) score *= 0.75;

      /**
       * Reference furniture: a list of links, a template list, a see-also. These mention
       * everything and explain nothing, so they match well and help nobody.
       */
      if (REFERENCE_FURNITURE.test(section.heading)) score *= 0.3;

      if (SCAFFOLDING.test(section.path)) score *= 0.35;

      hits.push({ section, score, why, snippet: snippetFor(section, matched.get(i) ?? new Set()) });
    }

    hits.sort((a, b2) => b2.score - a.score);
    return { hits: hits.slice(0, limit), expansions, intents: intents.map((i) => i.name) };
  }

  getSection(id: string): Section | undefined {
    return this.sections.find((s) => s.id === id);
  }

  /** Every section of one page in order: what a model gets handed after ranking. */
  getPage(slug: string): Section[] {
    return this.sections.filter((s) => s.slug === slug);
  }
}

/**
 * Choose the sections to hand a model, spread across pages.
 *
 * Pooling by score alone handed over four sections from one page, which is why "I have no
 * money" got an answer built entirely from the Sunset page and never mentioned money. The
 * guide answers a constrained question from several threads at once: the phase page says
 * what to do, the funding thread says what it costs and where money comes from, the
 * checkpoint map says who has to approve it. Capping how many sections one page can
 * contribute forces that breadth.
 */
export function selectSections(
  scored: Array<{ section: Section; score: number }>,
  limit = 4,
  perPage = 2,
): Section[] {
  const ordered = [...scored].sort((a, b) => b.score - a.score);
  const taken = new Map<string, number>();
  const chosen: Section[] = [];

  for (const { section } of ordered) {
    if (chosen.length >= limit) break;
    const used = taken.get(section.slug) ?? 0;
    if (used >= perPage) continue;
    taken.set(section.slug, used + 1);
    chosen.push(section);
  }

  /* if the cap starved the list, fill it from what is left rather than under-supplying */
  if (chosen.length < limit) {
    for (const { section } of ordered) {
      if (chosen.length >= limit) break;
      if (!chosen.includes(section)) chosen.push(section);
    }
  }

  return chosen;
}

/** The sentence carrying the most query terms, so a reader can see why it matched. */
function snippetFor(section: Section, terms: Set<string>): string {
  const sentences = section.text
    .split(/(?<=[.?!])\s+|\n+/)
    .filter((s) => s.trim().length > 30);
  let best = sentences[0] ?? section.text.slice(0, 220);
  let bestCount = -1;
  for (const sentence of sentences) {
    const inSentence = new Set(tokenise(sentence));
    let count = 0;
    for (const term of terms) if (inSentence.has(term)) count++;
    if (count > bestCount) {
      bestCount = count;
      best = sentence;
    }
  }
  return best.replace(/\s+/g, " ").trim().slice(0, 320);
}

/**
 * The one place a question becomes a set of sections.
 *
 * This used to live inside the component, and a copy of it lived in each command-line
 * script. They drifted, and the drift was invisible: a change made in the component was
 * verified against a script that pooled differently over a different corpus, and reported
 * as working when it was not. Three times. Anything that wants to know what the model will
 * be given calls this.
 *
 * Three sources of query, pooled by summing scores so a section several of them agree on
 * outranks one that a single query liked a lot:
 *   the reader's own words, which are the only thing guaranteed to be about their question;
 *   the vocabulary bridge, deterministic and in the guide's own words;
 *   the model's rewrite, which is usually the best of the three and cannot be relied on,
 *   because the proxy answers this step with whichever provider has allowance left.
 */
export function poolSections<H extends { section: Section; score: number }>(
  retriever: { search(query: string, n: number): { hits: H[] } },
  question: string,
  rewrites: string[],
  bridge: string[] = [],
  limit = 4,
  perPage = 2,
): { given: Section[]; hits: H[]; queries: string[] } {
  const queries = [question, ...bridge, ...rewrites].filter(Boolean);
  /* the pooled score is the sum; the kept hit is the best single one, so its snippet is real */
  const pooled = new Map<string, { section: Section; score: number; best: H }>();
  for (const q of queries) {
    for (const hit of retriever.search(q, 5).hits) {
      const prev = pooled.get(hit.section.id);
      pooled.set(hit.section.id, {
        section: hit.section,
        score: (prev?.score ?? 0) + hit.score,
        best: prev && prev.best.score >= hit.score ? prev.best : hit,
      });
    }
  }
  const given = selectSections([...pooled.values()], limit, perPage);
  const byId = new Map([...pooled.values()].map((p) => [p.section.id, p.best]));
  return { given, hits: given.map((s) => byId.get(s.id)!).filter(Boolean), queries };
}
