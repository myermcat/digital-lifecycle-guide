/**
 * Node resolve hook for the corpus builder.
 *
 * Several content modules import image assets, because the page renders them. Node cannot
 * import an .svg, so those modules fail to load and their pages vanish from the corpus
 * without any error that looks like missing content. This points every asset import at an
 * inert stub so the prose beside it can be read.
 *
 * The stub is a FILE, not a data: URL. A data: URL worked on one machine and failed in CI
 * with "Unexpected token '?'", which broke a deploy. A file has no encoding to get wrong.
 *
 * Nothing here touches the site build. It affects only `tsx scripts/build-corpus.ts`.
 */

import { fileURLToPath } from "node:url";

const ASSET = /\.(svg|png|jpe?g|gif|webp|avif|woff2?|ttf|css)(\?.*)?$/i;
const STUB = new URL("./asset-stub.mjs", import.meta.url).href;

export async function resolve(specifier, context, next) {
  if (ASSET.test(specifier)) {
    return { url: STUB, format: "module", shortCircuit: true };
  }
  return next(specifier, context);
}
