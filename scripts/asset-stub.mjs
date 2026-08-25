/**
 * Stands in for an image import when the corpus builder loads a content module.
 *
 * The builder needs the prose next to the picture, never the picture. A real file is used
 * rather than a data: URL because a data: URL worked locally and failed in CI with
 * "Unexpected token '?'", which took a failed deploy to discover.
 */
export default "";
