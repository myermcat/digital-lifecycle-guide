/**
 * Node-side wrapper around the shared retrieval core.
 *
 * The ranking logic lives in src/lib/assistant/retrieval.ts so the browser and the
 * CLI cannot drift apart. Two copies of a BM25 index is exactly the kind of thing
 * that stays identical for a week and then quietly stops matching.
 */

import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { Retriever, type Section } from "../../src/lib/assistant/retrieval";

export { Retriever };
export type { Section, Hit } from "../../src/lib/assistant/retrieval";

export async function loadRetriever(
  corpusDir: string,
  opts: { includeReference?: boolean } = {},
): Promise<Retriever> {
  const sections = JSON.parse(
    await readFile(join(corpusDir, "sections.json"), "utf8"),
  ) as Section[];

  /**
   * Reference material (currently the PSPC guide) is marked "reference" rather than
   * "public", so it never reaches the browser slice. Loading it here is opt-in: the
   * CLI can read every detail, and a reader's browser still cannot.
   */
  if (opts.includeReference) {
    const path = join(corpusDir, "reference", "pspc-sections.json");
    if (existsSync(path)) {
      const reference = JSON.parse(await readFile(path, "utf8")) as Section[];
      return new Retriever([...sections, ...reference], { includePrivate: true });
    }
  }

  return new Retriever(sections);
}

/**
 * A link for guide sections, a citation for everything else.
 *
 * Reference material has no page on the site, so linking its path would send a reader
 * to a 404. Naming the source and letting them find it is the honest alternative.
 */
export function deepLink(
  section: Section,
  base = "https://myermcat.github.io/digital-lifecycle-guide",
): string {
  if (section.visibility !== "public") return `cited from: ${section.page} — ${section.heading}`;
  return `${base}${section.path}`;
}
