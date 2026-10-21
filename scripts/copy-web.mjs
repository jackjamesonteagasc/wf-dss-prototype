import { copyFileSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "docs");
mkdirSync(out, { recursive: true });
mkdirSync(join(out, "data"), { recursive: true });

for (const file of ["index.html", "theme.css", "app.css", "teagasc-logo.png"]) {
  copyFileSync(join(root, "web", file), join(out, file));
}

for (const file of readdirSync(join(root, "data"))) {
  if (file.endsWith(".json") || file === "DATA_SOURCES.md") {
    copyFileSync(join(root, "data", file), join(out, "data", file));
  }
}

writeFileSync(join(out, ".nojekyll"), "");
console.log("Static site assembled in docs/");
