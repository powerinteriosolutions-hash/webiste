import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");

const siteUrlFromEnv = process.env.NEXT_PUBLIC_SITE_URL;
const derivedBasePath =
  siteUrlFromEnv && (() => {
    try {
      const url = new URL(siteUrlFromEnv);
      return url.pathname.replace(/\/$/, "");
    } catch {
      return "";
    }
  })();

const basePathEnv = process.env.BASE_PATH ?? derivedBasePath ?? "";
const repoBase = basePathEnv
  ? basePathEnv.startsWith("/")
    ? basePathEnv
    : `/${basePathEnv}`
  : "";

const deployedUrl =
  siteUrlFromEnv ?? "https://poweroninterio.com";
const oldUrl = "https://poweroninterio.com";
const textFileExtensions = new Set([".html", ".txt", ".xml", ".webmanifest"]);

if (!repoBase) {
  console.log("BASE_PATH not set and no path in NEXT_PUBLIC_SITE_URL; skipping GitHub Pages rewrite.");
  process.exit(0);
}

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
    let updated = current;

    if (deployedUrl && deployedUrl !== oldUrl) {
      updated = updated.replaceAll(oldUrl, deployedUrl);
    }

    updated = updated.replace(
      /(href|src)=(["'])\/(?!\/)/g,
      (_match, attr, quote) => `${attr}=${quote}${repoBase}/`,
    );

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
