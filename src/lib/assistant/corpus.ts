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
