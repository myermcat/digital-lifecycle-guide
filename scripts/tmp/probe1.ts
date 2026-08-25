import { readFile } from "node:fs/promises";
import { Rewriter, buildContents, loadKey } from "../lib/rewrite";
const map = JSON.parse(await readFile("./corpus/map.json", "utf8"));
const rw = await Rewriter.create({
  key: await loadKey(".", "groq"),
  contents: buildContents(map),
  cachePath: "./corpus/.rewrite-cache.json",
  provider: "groq",
});
console.log("model:", rw.modelName);
const out = await rw.rewrite("Where do I even start?", { fresh: true });
console.log(JSON.stringify(out, null, 2));
