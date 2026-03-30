import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const repoBase = "/webiste";
const deployedUrl = "https://powerinteriosolutions-hash.github.io/webiste";
const oldUrl = "https://poweroninterio.com";
const textFileExtensions = new Set([".html", ".txt", ".xml", ".webmanifest"]);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!textFileExtensions.has(path.extname(entry.name))) {
      continue;
    }

    const current = fs.readFileSync(fullPath, "utf8");
    const updated = current
      .replaceAll(oldUrl, deployedUrl)
      .replace(/(["'=])\/(?!\/|webiste\/)/g, `$1${repoBase}/`);

    if (updated !== current) {
      fs.writeFileSync(fullPath, updated);
    }
  }
}

if (fs.existsSync(outDir)) {
  walk(outDir);
  console.log("Prepared static export for GitHub Pages.");
} else {
  console.error("No out directory found. Run the build first.");
  process.exit(1);
}
