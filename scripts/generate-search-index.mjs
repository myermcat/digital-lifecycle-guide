/**
 * Runs the search-index generator with the French module hook in place.
 *
 * The generator's imports are static, so registering a resolve hook inside it would be
 * too late: the modules are already resolved by the time its first line runs. Registering
 * here and reaching the generator through a dynamic import gets the hook in first.
 */
import { register } from "node:module";

register(new URL("./french-module-hook.mjs", import.meta.url));
await import("./generate-search-index.ts");
