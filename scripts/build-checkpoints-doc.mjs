/**
 * Runs the checkpoints-document builder with the French module hook in place.
 *
 * Same reason as the search index: the builder's imports are static, so a hook
 * registered inside it would arrive too late. Registering here and reaching the
 * builder through a dynamic import gets it in first.
 */
import { register } from "node:module";

register(new URL("./french-module-hook.mjs", import.meta.url));
await import("./build-checkpoints-doc.ts");
