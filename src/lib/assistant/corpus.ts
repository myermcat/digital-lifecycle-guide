/**
 * Loads the corpus slice in the browser and builds the retriever once.
 *
 * The asset is about 176 KB gzipped and is fetched on demand, so it costs nothing
 * for readers who never open the assistant. It is cached for the life of the tab:
 * the corpus only changes when the site is rebuilt.
 */

import { Retriever, type Section } from "./retrieval";

/**
 * GitHub Pages serves this site from a sub-path, so an absolute "/assistant/..."
 * would resolve to the domain root and 404. Vite's BASE_URL carries the right
 * prefix in every environment, which is why it is used rather than a literal.
 */
function assetUrl(file: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}/assistant/${file}`;
}

let cachedMap: Promise<Array<{ title: string; path: string; sections: string[] }>> | null = null;

/** The table of contents the rewrite prompt needs. Small, and fetched only with a key. */
export function loadMap() {
  if (!cachedMap) {
    cachedMap = fetch(assetUrl("map.json"))
      .then((res) => {
        if (!res.ok) throw new Error(`map unavailable (${res.status})`);
        return res.json();
      })
      .catch((err) => {
        cachedMap = null;
        throw err;
      });
  }
  return cachedMap;
}

export type SourceLink = { id: string; url: string; title: string; description: string };

let cachedSources: Promise<SourceLink[]> | null = null;

/**
 * The instruments the guide cites, as links.
 *
 * These were fetched once and their full text is far too large to ship or to put in a
 * prompt. The index is small, so an answer can offer the instrument itself alongside the
 * guide's explanation of it. Matching happens in the browser against the answer text, so
 * it costs nothing and cannot invent a link.
 */
export function loadSources(): Promise<SourceLink[]> {
  if (!cachedSources) {
    cachedSources = fetch(assetUrl("sources.json"))
      .then((res) => (res.ok ? (res.json() as Promise<SourceLink[]>) : []))
      .catch(() => {
        cachedSources = null;
        return [];
      });
  }
  return cachedSources;
}

/**
 * Which cited instruments does this answer actually mention?
 *
 * Title words are matched rather than the whole title, because an answer says "the
 * Directive on the Management of Procurement" while the page title carries a suffix. A
 * match needs the distinctive words, so "Directive" alone never counts.
 */
export function matchSources(answer: string, sources: SourceLink[], limit = 3): SourceLink[] {
  const haystack = answer.toLowerCase();
  const GENERIC = new Set([
    "the", "of", "and", "on", "for", "canada", "government", "policy", "directive",
    "standard", "guideline", "act", "tool", "guide", "treasury", "board", "management",
  ]);

  const scored = sources
    .map((s) => {
      const words = s.title
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length > 3 && !GENERIC.has(w));
      if (words.length < 2) return { s, hits: 0 };
      const hits = words.filter((w) => haystack.includes(w)).length;
      return { s, hits: hits >= 2 ? hits / words.length : 0 };
    })
    .filter((x) => x.hits > 0.5)
    .sort((a, b) => b.hits - a.hits);

  return scored.slice(0, limit).map((x) => x.s);
}

let cached: Promise<Retriever> | null = null;

export function loadCorpus(): Promise<Retriever> {
  if (!cached) {
    cached = fetch(assetUrl("sections.json"))
      .then((res) => {
        if (!res.ok) throw new Error(`corpus unavailable (${res.status})`);
        return res.json() as Promise<Section[]>;
      })
      .then((sections) => new Retriever(sections))
      .catch((err) => {
        // let the next attempt retry rather than caching the failure forever
        cached = null;
        throw err;
      });
  }
  return cached;
}

/** Deep link into the guide. Corpus paths are the site's real routes. */
export function guideLink(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}${path}`;
}
