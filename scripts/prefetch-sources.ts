/**
 * Fetch the public sources the guide cites, once, into corpus/sources/.
 *
 * WHY PREFETCH RATHER THAN FETCH LIVE.
 *
 * The guide is a middle layer over Government of Canada instruments, and a reader
 * asking a specific question often needs the instrument rather than the summary.
 * Fetching at answer time is slow enough to feel broken, costs more per answer, and
 * a page that changed can contradict the guide mid-sentence with no way for the
 * reader to tell which is right. A dated local copy is slower to go stale and honest
 * about when it was taken.
 *
 * The list is not a guess. src/lib/external-links.ts enumerates every cited source
 * with a public / gc-network-only flag, and this reads it through corpus/links.json.
 * gc-network-only sources are never requested: they are unreachable from here, and
 * the assistant has to tell readers so rather than pretend it can show them.
 *
 * Run:  npx tsx scripts/prefetch-sources.ts --sample 8   measure before committing
 *       npx tsx scripts/prefetch-sources.ts              fetch everything public
 *       npx tsx scripts/prefetch-sources.ts --resume      skip what is already saved
 *
 * Polite by construction: three at a time, a pause between batches, one retry, and
 * a real user agent. These are public pages on canada.ca and tbs-sct.canada.ca.
 */

import { readFile, mkdir, writeFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = resolve(HERE, "..");
const CORPUS = join(PROJECT, "corpus");
const OUT = join(CORPUS, "sources");

const ARGS = process.argv.slice(2);
const SAMPLE = ARGS.includes("--sample") ? Number(ARGS[ARGS.indexOf("--sample") + 1] || 8) : 0;
const RESUME = ARGS.includes("--resume");

const CONCURRENCY = 3;
const PAUSE_MS = 400;
const TIMEOUT_MS = 45_000;  // tbs-sct.canada.ca is slow enough to need it
const UA = "DigitalLifecycleGuide-corpus-builder/1.0 (one-time citation fetch; contact: repo owner)";

type Link = { id: string; url: string; description: string; accessibility: string };

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const tokens = (s: string) => Math.ceil(s.length / 3.8);

/* ------------------------------------------------------------------ *
 * HTML to text
 *
 * No parser dependency on purpose. These are canada.ca pages: server
 * rendered, semantic, and consistent. Strip the furniture, keep the
 * structure that makes a policy instrument readable (headings, list
 * items, table cells), and collapse the rest.
 * ------------------------------------------------------------------ */

function htmlToText(html: string): { title: string; text: string } {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decode(stripTags(titleMatch[1])).trim() : "";

  /**
   * Try every plausible content container and keep whichever yields the most text.
   * Trusting the first <main> match loses any page whose <main> is an empty shell,
   * which cost three of the first eight sources.
   */
  const candidates = [
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1],
    html.match(/<div[^>]+(?:id|class)="[^"]*(?:mwsbodytext|main-content|body-content)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i)?.[1],
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1],
    html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1],
    html,
  ].filter((c): c is string => typeof c === "string");

  const main = candidates.reduce((best, c) =>
    stripTags(c).replace(/\s+/g, " ").trim().length > stripTags(best).replace(/\s+/g, " ").trim().length ? c : best,
  candidates[0]);

  let s = main
    // furniture that carries no instrument text
    .replace(/<(script|style|noscript|svg|nav|header|footer|form)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    // keep structure as markdown-ish so headings survive for the section index
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, lvl, inner) => `\n\n${"#".repeat(Number(lvl))} ${stripTags(inner)}\n\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, inner) => `\n- ${stripTags(inner)}`)
    .replace(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi, (_m, inner) => ` | ${stripTags(inner)}`)
    .replace(/<\/tr>/gi, "\n")
    .replace(/<\/(p|div|section|article|blockquote)>/gi, "\n\n");

  s = decode(stripTags(s))
    .replace(/[ \t ]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { title, text: s };
}

const stripTags = (s: string) => s.replace(/<[^>]+>/g, " ");

function decode(s: string): string {
  const named: Record<string, string> = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
    rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“",
    mdash: "—", ndash: "–", hellip: "…", eacute: "é",
  };
  return s
    .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => named[n.toLowerCase()] ?? m);
}

/* ------------------------------------------------------------------ *
 * Fetch
 * ------------------------------------------------------------------ */

type Result = {
  id: string;
  url: string;
  description: string;
  ok: boolean;
  status?: number;
  error?: string;
  title?: string;
  words?: number;
  tokens?: number;
  bytes?: number;
  headings?: string[];
};

async function fetchOne(link: Link, attempt = 1): Promise<Result> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(link.url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
    });
    clearTimeout(timer);

    if (!res.ok) {
      if (attempt === 1 && res.status >= 500) return fetchOne(link, 2);
      return { ...link, ok: false, status: res.status };
    }

    const type = res.headers.get("content-type") ?? "";
    if (!/text\/html|xhtml|text\/plain/.test(type)) {
      // a PDF or an office document: record it, do not try to read it here
      return { ...link, ok: false, status: res.status, error: `not html (${type.split(";")[0]})` };
    }

    const html = await res.text();
    const { title, text } = htmlToText(html);

    if (words(text) < 80) {
      // usually a page that builds itself with JavaScript. Recorded as unreachable so
      // the assistant knows to send the reader to the link instead of paraphrasing.
      return { ...link, ok: false, status: res.status, error: `needs a browser (extracted ${words(text)} words)` };
    }

    const headings = [...text.matchAll(/^#{1,4} (.+)$/gm)].map((m) => m[1].trim()).slice(0, 40);
    const front = [
      "---",
      `id: ${link.id}`,
      `source_url: ${link.url}`,
      `guide_description: ${link.description}`,
      `page_title: ${title.replace(/\n/g, " ")}`,
      `fetched: ${new Date().toISOString().slice(0, 10)}`,
      "---",
      "",
    ].join("\n");

    const body = front + text + "\n";
    await writeFile(join(OUT, `${link.id}.md`), body, "utf8");

    return {
      ...link, ok: true, status: res.status, title,
      words: words(text), tokens: tokens(text), bytes: Buffer.byteLength(body), headings,
    };
  } catch (err) {
    clearTimeout(timer);
    if (attempt === 1) return fetchOne(link, 2);
    return { ...link, ok: false, error: (err as Error).message.slice(0, 80) };
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const links: Link[] = JSON.parse(await readFile(join(CORPUS, "links.json"), "utf8"));
  const gcOnly = links.filter((l) => l.accessibility !== "public");
  let queue = links.filter((l) => l.accessibility === "public");

  await mkdir(OUT, { recursive: true });

  if (RESUME) {
    const have = new Set((await readdir(OUT)).map((f) => f.replace(/\.md$/, "")));
    const before = queue.length;
    queue = queue.filter((l) => !have.has(l.id));
    console.log(`--resume: ${before - queue.length} already saved, ${queue.length} to go`);
  }

  if (SAMPLE) {
    // spread the sample across the list rather than taking the first few
    const step = Math.max(1, Math.floor(queue.length / SAMPLE));
    queue = queue.filter((_, i) => i % step === 0).slice(0, SAMPLE);
    console.log(`--sample ${SAMPLE}: measuring before fetching all ${links.length - gcOnly.length} public sources\n`);
  }

  console.log(`${queue.length} to fetch, ${gcOnly.length} skipped as GC-network only\n`);

  const results: Result[] = [];
  for (let i = 0; i < queue.length; i += CONCURRENCY) {
    const batch = queue.slice(i, i + CONCURRENCY);
    const done = await Promise.all(batch.map((l) => fetchOne(l)));
    for (const r of done) {
      results.push(r);
      const label = r.ok
        ? `${String(r.words).padStart(6)} words  ${(r.bytes! / 1024).toFixed(0).padStart(4)} KB`
        : `FAILED  ${r.status ?? ""} ${r.error ?? ""}`.trim();
      console.log(`  ${r.id.padEnd(46)} ${label}`);
    }
    if (i + CONCURRENCY < queue.length) await sleep(PAUSE_MS);
  }

  const ok = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);
  const totalBytes = ok.reduce((a, r) => a + (r.bytes ?? 0), 0);
  const totalTokens = ok.reduce((a, r) => a + (r.tokens ?? 0), 0);
  const avgBytes = ok.length ? totalBytes / ok.length : 0;

  console.log("\n" + "-".repeat(64));
  console.log(`fetched      ${ok.length} of ${results.length}`);
  console.log(`on disk      ${(totalBytes / 1024 / 1024).toFixed(2)} MB   (average ${(avgBytes / 1024).toFixed(0)} KB per source)`);
  console.log(`tokens       ~${totalTokens.toLocaleString()}`);

  if (SAMPLE && ok.length) {
    const all = links.filter((l) => l.accessibility === "public").length;
    console.log("\nPROJECTION for all " + all + " public sources:");
    console.log(`  disk    ~${((avgBytes * all) / 1024 / 1024).toFixed(0)} MB`);
    console.log(`  tokens  ~${Math.round((totalTokens / ok.length) * all).toLocaleString()}`);
    console.log("  Far past any context window, which is why these are fetched on demand");
    console.log("  and indexed by title and description, never loaded together.");
  }

  if (failed.length) {
    console.log(`\nnot saved (${failed.length}):`);
    for (const f of failed) console.log(`  ${f.id.padEnd(46)} ${f.status ?? ""} ${f.error ?? ""}`.trimEnd());
  }

  if (!SAMPLE) {
    const index = ok.map((r) => ({
      id: r.id, url: r.url, title: r.title, description: r.description,
      tokens: r.tokens, headings: r.headings,
    }));
    await writeFile(join(CORPUS, "sources-index.json"), JSON.stringify(index, null, 2), "utf8");
    await writeFile(
      join(CORPUS, "sources-unreachable.json"),
      JSON.stringify(
        {
          note: "Cited by the guide but not saved. gc-network-only sources are unreachable outside the GC network; the assistant must say so rather than imply it can show them.",
          gcNetworkOnly: gcOnly,
          fetchFailed: failed.map((f) => ({ id: f.id, url: f.url, status: f.status, error: f.error })),
        },
        null,
        2,
      ),
      "utf8",
    );
    console.log(`\nWrote corpus/sources/ (${ok.length} files), sources-index.json, sources-unreachable.json`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
