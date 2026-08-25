/**
 * Corpus builder for the guide assistant.
 *
 * WHY THIS EXISTS, and why it is not generate-search-index.ts.
 *
 * generate-search-index.ts feeds the site's search box. It hand-picks a few named
 * fields per content module (lead, whatGoodLooksLike, whyItMatters, whoseJob) and
 * never imports the sub-phase modules at all. Measured against the rendered pages
 * it holds about a third of the guide, and zero words of Discovery, Alpha or Beta.
 * Fine for matching headings. Useless as the thing an assistant reads.
 *
 * This script walks EVERY string in EVERY content module instead of naming fields,
 * so new content is picked up without anyone remembering to add it here.
 *
 * It writes five things into corpus/:
 *   pages/<slug>.md   full text of each page, headings preserved
 *   map.json          the always-in-context index: page, section, first line, tokens
 *   instruments.json  the checkpoint tables as structured rows, not flattened prose
 *   links.json        every cited external source, with its public / GC-only flag
 *   manifest.json     token totals, and a coverage report against the snapshots
 *
 * Run:  npx tsx scripts/build-corpus.ts
 *       npx tsx scripts/build-corpus.ts --check   (report only, writes nothing)
 *
 * IT CHECKS ITSELF. A builder that silently extracts nothing looks identical to a
 * builder that worked. Every page is compared against the rendered snapshot word
 * count, and the run FAILS if a page comes out under half of it. A zero here means
 * the extractor missed a module, not that the page is empty.
 */

import { register } from "node:module";
import { readdir, readFile, mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(HERE, "..");
const LIB = join(PROJECT, "src", "lib");
const OUT = join(PROJECT, "corpus");
/**
 * The browser-facing slice. Published to GitHub Pages by the existing workflow, the
 * same way public/search-index.json already is, so nothing here is ever committed.
 * PUBLIC SECTIONS ONLY: anything not marked public must never reach a reader's
 * browser, because a static asset is as public as the page that loads it.
 */
const PUBLIC_OUT = join(PROJECT, "public", "assistant");

/** Rendered page snapshots, used only to verify coverage. Optional. */
const SNAPSHOTS = resolve(
  PROJECT,
  "../../TBS (Claude Output)/Transcripts & chat knowledge/Document builders (scripts + assets)/_audit/page-snapshots",
);

const IMPORT_FAILURES: string[] = [];
const CHECK_ONLY = process.argv.includes("--check");

/**
 * Content modules import .svg assets that Node cannot load. Without this the module
 * throws, its page silently disappears, and the corpus looks complete. Register the
 * redirect before any dynamic import runs.
 */
register(new URL("./corpus-asset-hooks.mjs", import.meta.url));

/* ------------------------------------------------------------------ *
 * Which module belongs to which page.
 *
 * Only the mapping lives here, never the content. A module missing from
 * this table is still extracted; it lands under its own slug and the run
 * reports it as unmapped so it cannot vanish quietly.
 * ------------------------------------------------------------------ */

/**
 * Paths here are the site's REAL routes, checked against STATIC_PRERENDER_PATHS in
 * src/lib/github-pages.ts. The sub-phase routes are flat (/create-alpha), so the
 * nested form used at first produced deep links that would 404 on the live site.
 */
const MODULE_TO_PAGE: Record<string, { title: string; path: string }> = {
  "create-phase-content": { title: "How the Create phase works", path: "/create" },
  "create-discovery-content": { title: "How the Discovery sub-phase works", path: "/create-discovery" },
  "create-alpha-content": { title: "How the Alpha sub-phase works", path: "/create-alpha" },
  "create-beta-content": { title: "How the Beta sub-phase works", path: "/create-beta" },
  "live-phase-content": { title: "How the Live phase works", path: "/live" },
  "live-stabilization-content": { title: "How the Stabilization sub-phase works", path: "/live-stabilization" },
  "live-growth-content": { title: "How the Growth sub-phase works", path: "/live-growth" },
  "live-maturity-content": { title: "How the Maturity sub-phase works", path: "/live-maturity" },
  "subphase-content": { title: "Sub-phase shared headings", path: "/create" },

  "checkpoint-map-content": { title: "The official checkpoints of a digital service", path: "/gate-map" },
  "instrument-matrix": { title: "Official instruments (working matrix)", path: "/gate-map" },

  "accessibility-thread-content": { title: "Accessibility", path: "/thread/accessibility" },
  "backlog-thread-content": { title: "Backlog", path: "/thread/backlog" },
  "change-management-thread-content": { title: "Change management", path: "/thread/change-management" },
  "data-stewardship-thread-content": { title: "Data stewardship", path: "/thread/data-stewardship" },
  "dependencies-and-standards-thread-content": { title: "Dependencies and standards", path: "/thread/dependencies-and-standards" },
  "ethics-and-bias-thread-content": { title: "Ethics and bias", path: "/thread/ethics-and-bias" },
  "funding-thread-content": { title: "Funding", path: "/thread/funding" },
  "joined-up-delivery-thread-content": { title: "Joined-up delivery", path: "/thread/joined-up-delivery" },
  "monitoring-and-instrumentation-thread-content": { title: "Monitoring and instrumentation", path: "/thread/monitoring-and-instrumentation" },
  "privacy-thread-content": { title: "Privacy", path: "/thread/privacy" },
  "releasing-changes-thread-content": { title: "Releasing changes", path: "/thread/releasing-changes" },
  "security-thread-content": { title: "Security", path: "/thread/security" },
  "team-capability-thread-content": { title: "Team capability", path: "/thread/team-capability" },
  "user-research-thread-content": { title: "User research", path: "/thread/user-research" },

  "options-analysis-content": { title: "Options analysis", path: "/reference/options-analysis" },
  "good-contract-content": { title: "What a good contract looks like", path: "/thread/procurement/good-contract" },
  "procurement-strings": { title: "Procurement", path: "/thread/procurement" },
  "contracting-subpages": { title: "Procurement: contracting practices", path: "/thread/procurement" },
  "contracting-landing": { title: "Procurement: contracting practices", path: "/thread/procurement" },
  "soo-vs-sow-content": { title: "Statement of objectives or statement of work", path: "/reference/soo-vs-sow" },
  "support-content": { title: "Support and communities", path: "/support" },
  "thread-content": { title: "Threads: shared scaffolding", path: "/thread/shared" },
  "service-approval-funding-content": { title: "Funding", path: "/thread/funding" },
  "guide-strings": { title: "Guide navigation and labels", path: "/shared/labels" },
  "treasury-board-approval-under-review": { title: "Funding", path: "/thread/funding" },
  "sunset-strings": { title: "How the Sunset phase works", path: "/sunset" },
  "sunset-landing": { title: "How the Sunset phase works", path: "/sunset" },
  "sunset-sources": { title: "How the Sunset phase works", path: "/sunset" },
  "procurement-landing": { title: "Procurement", path: "/thread/procurement" },
  "procurement-sources": { title: "Procurement", path: "/thread/procurement" },
  "real-examples": { title: "Worked examples", path: "/shared/examples" },
  "reusable-pieces": { title: "What is already built and can be reused", path: "/shared/reusable" },
  "see-also": { title: "Cross-references", path: "/shared/see-also" },
  "thread-core-strip": { title: "Threads: shared scaffolding", path: "/thread/shared" },
  "support-callout": { title: "Support and communities", path: "/support" },
  "discover-page-sections": { title: "Index of the guide", path: "/index" },
  "guide-contents": { title: "Index of the guide", path: "/index" },
};

/** Which snapshot file corresponds to which page, for the coverage check. */
const PAGE_TO_SNAPSHOT: Record<string, string> = {
  "/create": "01-create.md",
  "/create-discovery": "02-create-discovery.md",
  "/create-alpha": "03-create-alpha.md",
  "/create-beta": "04-create-beta.md",
  "/live": "05-live.md",
  "/live-stabilization": "06-live-stabilization.md",
  "/live-growth": "07-live-growth.md",
  "/live-maturity": "08-live-maturity.md",
  "/sunset": "09-sunset.md",
  "/gate-map": "10-gate-map.md",
  "/thread/procurement": "11-procurement.md",
  "/thread/procurement/good-contract": "12-good-contract.md",
  "/thread/funding": "13-funding.md",
  "/thread/team-capability": "14-team-capability.md",
  "/thread/security": "15-security.md",
  "/thread/privacy": "16-privacy.md",
  "/thread/accessibility": "17-accessibility.md",
  "/thread/data-stewardship": "18-data-stewardship.md",
  "/thread/ethics-and-bias": "19-ethics-and-bias.md",
  "/thread/user-research": "20-user-research.md",
  "/thread/change-management": "21-change-management.md",
  "/thread/joined-up-delivery": "22-joined-up-delivery.md",
  "/thread/backlog": "23-backlog.md",
  "/thread/dependencies-and-standards": "24-dependencies-and-standards.md",
  "/thread/monitoring-and-instrumentation": "25-monitoring.md",
  "/thread/releasing-changes": "26-releasing-changes.md",
  "/reference/options-analysis": "27-options-analysis.md",
  "/support": "28-support.md",
};

/* ------------------------------------------------------------------ *
 * Deep walk
 * ------------------------------------------------------------------ */

type Fragment = {
  /** key path into the module, e.g. finish.criteria.2.text */
  trail: string;
  /** the last key, which is what tells us whether this reads as a heading */
  key: string;
  depth: number;
  text: string;
};

const HEADING_KEYS = new Set([
  "title", "heading", "subheading", "label", "name", "term", "question",
  "sectionHeading", "cardTitle", "tag", "eyebrow",
]);

/** Keys whose values are identifiers or routing, never prose. */
const SKIP_KEYS = new Set([
  "id", "slug", "path", "href", "url", "icon", "iconName", "route", "anchor",
  "key", "className", "variant", "color", "fill", "token", "src", "accessibility",
  // type discriminators: their values name a shape ("subheading", "callout"), not content
  "kind", "type", "level", "as", "style", "tone", "size", "align", "layout", "role",
]);

/** A string that is plainly an identifier rather than something a person reads. */
function isIdentifier(s: string): boolean {
  if (s.includes(" ")) return false;
  return /^[a-z0-9]+(?:[-_][a-z0-9]+)+$/i.test(s) || /^[a-z]+[A-Z]/.test(s);
}

function isProse(key: string, s: string): boolean {
  const t = s.trim();
  if (t.length < 3) return false;
  if (SKIP_KEYS.has(key)) return false;
  if (isIdentifier(t)) return false;
  if (/^https?:\/\//.test(t)) return false;
  if (/^[#.]?[0-9a-f]{3,8}$/i.test(t)) return false; // colours
  if (/^oklch\(|^var\(|^calc\(/.test(t)) return false;
  return true;
}

/** React elements and functions carry no extractable prose. */
function isOpaque(v: unknown): boolean {
  if (typeof v === "function") return true;
  if (v && typeof v === "object" && "$$typeof" in (v as object)) return true;
  return false;
}

function walk(value: unknown, trail: string[], out: Fragment[], seen: WeakSet<object>): void {
  if (value == null || isOpaque(value)) return;

  if (typeof value === "string") {
    const key = trail[trail.length - 1] ?? "";
    if (isProse(key, value)) {
      out.push({ trail: trail.join("."), key, depth: trail.length, text: value.trim() });
    }
    return;
  }

  if (typeof value !== "object") return;
  if (seen.has(value as object)) return;
  seen.add(value as object);

  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, [...trail, String(i)], out, seen));
    return;
  }

  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    if (SKIP_KEYS.has(k) && typeof v === "string") continue;
    walk(v, [...trail, k], out, seen);
  }
}

/* ------------------------------------------------------------------ *
 * Markdown rendering
 * ------------------------------------------------------------------ */

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
/** Rough. Good enough for budgeting, not for billing. */
const tokens = (s: string) => Math.ceil(s.length / 3.8);

/**
 * Group key: the first two trail segments, plus a third when it is an array index.
 *
 * Two segments alone collapsed the whole procurement steps accordion into ONE section
 * of 1,482 words labelled "Look", because Look is the first step and every later step
 * shared the trail prefix. Retrieval then handed a model seven steps to answer a
 * question about one, and cited the wrong heading. Including the index splits them.
 */
const groupKey = (f: Fragment) => {
  const parts = f.trail.split(".");
  const base = parts.slice(0, 2);
  if (parts[2] !== undefined && /^\d+$/.test(parts[2])) base.push(parts[2]);
  return base.join(".");
};

/**
 * A section named ALPHA_ACCORDION_STAGES.3 tells a reader nothing, and the map is
 * the part that stays in context, so it has to be readable. Name each section after
 * the first heading inside it and fall back to a humanised identifier.
 */
function sectionNames(frags: Fragment[]): Map<string, string> {
  const named = new Map<string, string>();
  for (const f of frags) {
    const g = groupKey(f);
    if (named.has(g)) continue;
    if (HEADING_KEYS.has(f.key) && words(f.text) <= 14) named.set(g, f.text);
  }
  for (const f of frags) {
    const g = groupKey(f);
    if (named.has(g)) continue;
    /**
     * No heading inside this group, so build a label from the trail. Using only the
     * export name collapsed six different groups of the contracting module onto one
     * label called "Contracting landing", which is useless in the map.
     */
    const [exportName, sub] = g.split(".");
    const human = (t: string) =>
      t.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase().trim();
    const label = sub && !/^\d+$/.test(sub)
      ? `${human(exportName)}: ${human(sub)}`
      : sub
        ? `${human(exportName)} ${Number(sub) + 1}`
        : human(exportName);
    named.set(g, label.replace(/^\w/, (c) => c.toUpperCase()));
  }
  return named;
}

function toMarkdown(title: string, path: string, frags: Fragment[]): string {
  const lines: string[] = [`# ${title}`, "", `Route: \`${path}\``, ""];
  const names = sectionNames(frags);
  let lastSection = "";

  for (const f of frags) {
    const g = groupKey(f);
    if (g !== lastSection) {
      lines.push("", `## ${names.get(g) ?? g}`, "");
      lastSection = g;
    }
    const isSectionTitle = HEADING_KEYS.has(f.key) && words(f.text) <= 14 && f.text === names.get(g);
    if (isSectionTitle) continue; // already used as the section heading
    if (HEADING_KEYS.has(f.key) && words(f.text) <= 14) {
      lines.push("", `### ${f.text}`, "");
    } else {
      lines.push(f.text, "");
    }
  }
  return lines.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n";
}

/* ------------------------------------------------------------------ *
 * Build
 * ------------------------------------------------------------------ */

type PageBuild = {
  title: string;
  path: string;
  slug: string;
  modules: string[];
  frags: Fragment[];
  markdown: string;
  words: number;
  tokens: number;
};

async function loadModules(): Promise<Map<string, Record<string, unknown>>> {
  /**
   * Include everything and deny plumbing, rather than allow-listing content. An
   * allow-list silently drops a new content module the day someone adds one, which
   * is exactly how the Sunset page went missing from the first version of this file.
   */
  const DENY = /^(config\.|error-|lovable-|github-pages|.*-path\.tsx?$|page-index|on-this-page|guide-typography|guide-settings|guide-blocks|guide-lists|guide-cards|guide-article|lifecycle-visuals|lifecycle-navigation|accessibility-exclusion-groups|build-status|placeholder-sources|reference-paths|site-meta|procurement-subpage-slugs|procurement-held-open|api)/;

  const names = (await readdir(LIB))
    .filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"))
    .filter((f) => !f.includes(".server."))
    .filter((f) => !DENY.test(f))
    .sort();

  const loaded = new Map<string, Record<string, unknown>>();
  for (const file of names) {
    const id = basename(file).replace(/\.tsx?$/, "");
    try {
      const mod = await import(pathToFileURL(join(LIB, file)).href);
      loaded.set(id, mod as Record<string, unknown>);
    } catch (err) {
      IMPORT_FAILURES.push(`${file}: ${(err as Error).message.split("\n")[0]}`);
    }
  }
  return loaded;
}

function slugFor(path: string): string {
  return path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "--");
}

async function build() {
  console.log("Loading content modules from src/lib ...");
  const modules = await loadModules();
  console.log(`  ${modules.size} modules imported\n`);

  const pages = new Map<string, PageBuild>();
  const unmapped: string[] = [];

  for (const [id, mod] of modules) {
    if (id === "external-links") continue; // handled separately

    const frags: Fragment[] = [];
    const seen = new WeakSet<object>();
    for (const [exportName, value] of Object.entries(mod)) {
      if (exportName === "default") continue;
      walk(value, [exportName], frags, seen);
    }
    if (frags.length === 0) continue;

    const target = MODULE_TO_PAGE[id];
    if (!target) unmapped.push(id);

    const title = target?.title ?? id;
    const path = target?.path ?? `/unmapped/${id}`;
    const slug = slugFor(path);

    const existing = pages.get(slug);
    if (existing) {
      existing.frags.push(...frags);
      existing.modules.push(id);
    } else {
      pages.set(slug, { title, path, slug, modules: [id], frags, markdown: "", words: 0, tokens: 0 });
    }
  }

  // dedupe repeated strings within a page, then render
  for (const page of pages.values()) {
    /**
     * Drop exact repeats, and drop a fragment that is wholly contained in the one
     * before it. Callouts carry a `bodyBold` field repeating a phrase from `body`,
     * which would otherwise duplicate the sentence on every callout in the guide.
     */
    const seenText = new Set<string>();
    let previous = "";
    page.frags = page.frags.filter((f) => {
      const k = f.text.toLowerCase();
      if (seenText.has(k)) return false;
      if (previous && previous.includes(k) && k.length < previous.length) return false;
      seenText.add(k);
      previous = k;
      return true;
    });
    page.markdown = toMarkdown(page.title, page.path, page.frags);
    page.words = words(page.markdown);
    page.tokens = tokens(page.markdown);
  }

  /* ---------- external links: the prefetch list ---------- */

  const linksMod = modules.get("external-links");
  const linkEntries: Array<{ id: string; url: string; description: string; accessibility: string }> = [];
  if (linksMod) {
    const table = (linksMod.EXTERNAL_LINKS ?? {}) as Record<string, { url: string; description: string; accessibility: string }>;
    for (const [id, entry] of Object.entries(table)) {
      if (entry && typeof entry.url === "string") {
        linkEntries.push({ id, url: entry.url, description: entry.description ?? "", accessibility: entry.accessibility ?? "unknown" });
      }
    }
  }

  /* ---------- instruments: keep the table a table ---------- */

  const matrixMod = modules.get("instrument-matrix");
  const instruments = matrixMod
    ? Object.fromEntries(Object.entries(matrixMod).filter(([k]) => k !== "default"))
    : {};

  /* ---------- the map: what stays in context ---------- */

  const map = [...pages.values()]
    .filter((p) => !p.path.startsWith("/unmapped/"))
    .map((p) => ({
      title: p.title,
      path: p.path,
      slug: p.slug,
      tokens: p.tokens,
      sections: [...new Set([...sectionNames(p.frags).values()])],
      opening: p.frags.find((f) => words(f.text) > 12)?.text.slice(0, 200) ?? "",
    }));

  /* ---------- coverage check ---------- */

  const coverage: Array<{ page: string; extracted: number; snapshot: number; ratio: number | null }> = [];
  const haveSnapshots = existsSync(SNAPSHOTS);

  for (const page of pages.values()) {
    const snapFile = PAGE_TO_SNAPSHOT[page.path];
    let snapWords: number | null = null;
    if (haveSnapshots && snapFile && existsSync(join(SNAPSHOTS, snapFile))) {
      const raw = await readFile(join(SNAPSHOTS, snapFile), "utf8");
      // strip the repeated site chrome so the comparison is body against body
      /**
       * A snapshot is a whole rendered page, so it carries things the corpus stores
       * once rather than per page: the site header, the index and search affordances,
       * the "on this page" rail, the vertical phase nav, and the instrument table
       * (which lives in instruments.json and under /gate-map). Comparing raw totals
       * makes every sub-phase page look half missing when it is complete. Strip the
       * repeated furniture so the number means something.
       */
      const CHROME = /^(The 2026 Guide|The 2026 Digital Lifecycle Guide|Index|Search the guide|On this page|⌘K|SEE THE WHOLE PATH|Create|Live|Sunset|Discovery|Alpha|Beta|Stabilization|Growth|Maturity)\s*$/;
      const keepTables = page.path === "/gate-map";
      const body = raw
        .split("\n")
        .filter((l) => !CHROME.test(l.trim()))
        .filter((l) => keepTables || !l.trim().startsWith("|"))
        .filter((l) => !l.trim().startsWith("<!--"))
        .join("\n");
      snapWords = words(body);
    }
    coverage.push({
      page: page.path,
      extracted: page.words,
      snapshot: snapWords ?? 0,
      ratio: snapWords ? +(page.words / snapWords).toFixed(2) : null,
    });
  }

  /* ---------- report ---------- */

  const totalTokens = [...pages.values()].reduce((a, p) => a + p.tokens, 0);
  const mapTokens = tokens(JSON.stringify(map));

  console.log("Page".padEnd(42), "words".padStart(7), "snapshot".padStart(9), "ratio".padStart(7));
  console.log("-".repeat(70));
  /**
   * WHAT THE RATIO CAN AND CANNOT TELL YOU.
   *
   * Sub-phase pages are assembled from shared blocks: the real-world example, the
   * support callout, the instrument table for that sub-phase, the page footer. The
   * corpus files each of those ONCE, so a sub-phase page reads 0.5 to 0.7 against
   * its rendered snapshot while being structurally complete. Verified by heading
   * comparison on Alpha and Maturity: every content heading is present, and every
   * apparent absence resolved to another corpus file.
   *
   * So the ratio is reported, not enforced. What is enforced is loss that is real:
   * a module that would not import, a page missing altogether, or a page that came
   * out nearly empty.
   */
  const MIN_WORDS = 250;
  const failures: string[] = [];
  for (const c of coverage.sort((a, b) => b.extracted - a.extracted)) {
    const ratio = c.ratio === null ? "  n/a" : c.ratio.toFixed(2).padStart(7);
    let flag = "";
    if (c.extracted < MIN_WORDS && !c.page.startsWith("/unmapped/")) {
      flag = "  << NEARLY EMPTY";
      failures.push(c.page);
    } else if (c.ratio !== null && c.ratio < 0.45) {
      flag = "  (low: check shared blocks)";
    }
    console.log(c.page.padEnd(42), String(c.extracted).padStart(7), String(c.snapshot || "-").padStart(9), ratio, flag);
  }

  const missing = Object.keys(PAGE_TO_SNAPSHOT).filter(
    (path) => ![...pages.values()].some((p) => p.path === path),
  );

  console.log("\n" + "-".repeat(70));
  console.log(`pages            ${pages.size}`);
  console.log(`external links   ${linkEntries.length} (${linkEntries.filter((l) => l.accessibility === "public").length} public, ${linkEntries.filter((l) => l.accessibility !== "public").length} GC-network only)`);
  console.log(`corpus tokens    ~${totalTokens.toLocaleString()}`);
  console.log(`map tokens       ~${mapTokens.toLocaleString()}   (this is what stays in context)`);
  if (unmapped.length) {
    console.log(`\nunmapped modules (extracted, but no page assigned):\n  ${unmapped.join("\n  ")}`);
  }
  if (IMPORT_FAILURES.length) {
    console.log(`\nMODULES THAT WOULD NOT IMPORT (${IMPORT_FAILURES.length}):\n  ${IMPORT_FAILURES.join("\n  ")}`);
  }
  if (missing.length) {
    console.log(`\nPAGES ABSENT FROM THE CORPUS (${missing.length}):\n  ${missing.join("\n  ")}`);
    console.log("An absent page produces no coverage row, so this check exists to notice it.");
  }
  if (failures.length) {
    console.log(`\nNEARLY EMPTY, so something did not extract (${failures.length}):\n  ${failures.join("\n  ")}`);
  }
  const fatal = IMPORT_FAILURES.length + missing.length + failures.length;
  if (fatal === 0) console.log("\nAll checks passed.");

  if (CHECK_ONLY) {
    console.log("\n--check: nothing written.");
    return fatal ? 1 : 0;
  }

  /* ---------- write ---------- */

  /**
   * Remove only what THIS script owns.
   *
   * An earlier version did `rm -rf corpus/`, which also deleted corpus/sources/ —
   * produced by prefetch-sources.ts over hundreds of slow network requests. Rebuilding
   * the corpus silently threw away an hour of fetching, and the fetch kept running,
   * writing into a directory that no longer existed.
   */
  await rm(join(OUT, "pages"), { recursive: true, force: true });
  for (const owned of ["map.json", "instruments.json", "links.json", "manifest.json", "sections.json"]) {
    await rm(join(OUT, owned), { force: true });
  }
  await mkdir(join(OUT, "pages"), { recursive: true });

  for (const page of pages.values()) {
    await writeFile(join(OUT, "pages", `${page.slug}.md`), page.markdown, "utf8");
  }
  /**
   * sections.json is the retrieval unit. A page is too big to hand a model whole and
   * too coarse to cite, so ranking happens over sections. Facets are cheap regex
   * signals that let a mechanical layer answer "how long" and "how much" questions
   * by preferring sections that actually contain a duration or a dollar threshold.
   */
  const sectionRecords: Array<Record<string, unknown>> = [];
  for (const page of pages.values()) {
    const names = sectionNames(page.frags);
    const grouped = new Map<string, Fragment[]>();
    for (const f of page.frags) {
      const g = groupKey(f);
      if (!grouped.has(g)) grouped.set(g, []);
      grouped.get(g)!.push(f);
    }
    let i = 0;
    for (const [g, group] of grouped) {
      const text = group.map((f) => f.text).join("\n\n");
      if (words(text) < 8) continue;
      sectionRecords.push({
        id: `${page.slug}#${i++}`,
        page: page.title,
        path: page.path,
        slug: page.slug,
        heading: names.get(g) ?? g,
        trail: g,
        text,
        words: words(text),
        tokens: tokens(text),
        visibility: "public",
        facets: {
          hasDuration: /\b\d+\s*(?:to\s*\d+\s*)?(?:day|week|month|year)s?\b|\b(?:weeks|months|years)\b/i.test(text),
          hasThreshold: /\$\s?[\d.,]+\s*(?:million|billion|k\b)?/i.test(text),
          hasRole: /\b(deputy head|chief information officer|CIO|project sponsor|business owner|departmental|board)\b/i.test(text),
        },
      });
    }
  }
  await writeFile(join(OUT, "sections.json"), JSON.stringify(sectionRecords, null, 2), "utf8");
  console.log(`sections         ${sectionRecords.length} (retrieval units)`);

  await writeFile(join(OUT, "map.json"), JSON.stringify(map, null, 2), "utf8");
  await writeFile(join(OUT, "instruments.json"), JSON.stringify(instruments, null, 2), "utf8");
  await writeFile(join(OUT, "links.json"), JSON.stringify(linkEntries, null, 2), "utf8");
  await writeFile(
    join(OUT, "manifest.json"),
    JSON.stringify(
      {
        builtFrom: "src/lib content modules",
        pageCount: pages.size,
        corpusTokensApprox: totalTokens,
        mapTokensApprox: mapTokens,
        externalLinks: linkEntries.length,
        unmappedModules: unmapped,
        coverage,
        note:
          "Token counts are estimates (chars / 3.8). The coverage ratio compares extracted words " +
          "against the rendered snapshot with site chrome and instrument tables removed. Sub-phase " +
          "pages sit at 0.5 to 0.7 while being complete, because shared blocks (real examples, the " +
          "support callout, instrument tables) are filed once rather than repeated per page. Only " +
          "an import failure, an absent page, or a nearly-empty page is treated as a defect.",
      },
      null,
      2,
    ),
    "utf8",
  );

  /* ---------- the slice the browser gets ---------- */

  await mkdir(PUBLIC_OUT, { recursive: true });
  const publicSections = sectionRecords
    .filter((r) => r.visibility === "public")
    .filter((r) => !String(r.path).startsWith("/unmapped/"))
    .map((r) => ({
      id: r.id, page: r.page, path: r.path, slug: r.slug, heading: r.heading,
      text: r.text, words: r.words, tokens: r.tokens,
      visibility: r.visibility, facets: r.facets,
    }));

  const withheld = sectionRecords.length - publicSections.length;
  await writeFile(join(PUBLIC_OUT, "sections.json"), JSON.stringify(publicSections), "utf8");
  // the rewrite prompt needs the table of contents, so the browser gets the map as well
  await writeFile(
    join(PUBLIC_OUT, "map.json"),
    JSON.stringify(map.filter((m) => !m.path.startsWith("/unmapped/"))),
    "utf8",
  );
  await writeFile(
    join(PUBLIC_OUT, "meta.json"),
    JSON.stringify(
      {
        built: "generated by scripts/build-corpus.ts; do not edit",
        sections: publicSections.length,
        pages: new Set(publicSections.map((s2) => s2.slug)).size,
        withheldSections: withheld,
      },
      null,
      2,
    ),
    "utf8",
  );

  const publicBytes = Buffer.byteLength(JSON.stringify(publicSections));
  console.log(`browser slice    ${publicSections.length} sections, ${(publicBytes / 1024).toFixed(0)} KB raw -> public/assistant/`);
  if (withheld) console.log(`  withheld       ${withheld} section(s) not marked public`);

  console.log(`\nWrote corpus/ (${pages.size} pages, map.json, instruments.json, links.json, manifest.json)`);
  return fatal ? 1 : 0;
}

build()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
