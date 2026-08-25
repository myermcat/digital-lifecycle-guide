/**
 * Node resolve hook for the corpus builder.
 *
 * Several content modules import image assets (create_subphases.svg and friends)
 * because the page renders them. Node cannot import an .svg, so those modules fail
 * to load and their pages vanish from the corpus without any error that looks like
 * missing content. This redirects every asset import to an inert module so the
 * prose next to it can be read.
 *
 * Nothing here touches the site build. It only affects `tsx scripts/build-corpus.ts`.
 */

const ASSET = /\.(svg|png|jpe?g|gif|webp|avif|woff2?|ttf|css)(\?.*)?$/i;

export async function resolve(specifier, context, next) {
  if (ASSET.test(specifier)) {
    return {
      url: "data:text/javascript,export default %22%22%3B",
      format: "module",
      shortCircuit: true,
    };
  }
  return next(specifier, context);
}
