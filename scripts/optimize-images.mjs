import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const optimizedDir = path.join(publicDir, "optimized");
const supportedExtensions = new Set([".jpg", ".jpeg"]);
const outputExtension = ".webp";
const maxDimension = 1600;
const webpQuality = 74;
const webpEffort = 6;

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (fullPath === optimizedDir) {
          return [];
        }

        return walk(fullPath);
      }

      return [fullPath];
    }),
  );

  return files.flat();
};

const ensureDirectory = async (targetPath) => {
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
};

const toOptimizedRelativePath = (relativePath) =>
  relativePath.replace(/\.(jpe?g)$/i, outputExtension);

const needsRefresh = async (sourcePath, outputPath) => {
  try {
    const [sourceStat, outputStat] = await Promise.all([fs.stat(sourcePath), fs.stat(outputPath)]);
    return sourceStat.mtimeMs > outputStat.mtimeMs;
  } catch {
    return true;
  }
};

const optimizeImage = async (sourcePath, relativePath) => {
  const outputRelativePath = toOptimizedRelativePath(relativePath);
  const outputPath = path.join(optimizedDir, outputRelativePath);

  if (!(await needsRefresh(sourcePath, outputPath))) {
    return { status: "skipped", outputRelativePath };
  }

  const image = sharp(sourcePath).rotate();
  const metadata = await image.metadata();

  await ensureDirectory(outputPath);

  let pipeline = image;
  if (
    (metadata.width && metadata.width > maxDimension) ||
    (metadata.height && metadata.height > maxDimension)
  ) {
    pipeline = pipeline.resize({
      width: maxDimension,
      height: maxDimension,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality: webpQuality, effort: webpEffort }).toFile(outputPath);

  return { status: "optimized", outputRelativePath };
};

const removeStaleOutputs = async (expectedOutputPaths) => {
  try {
    const existingFiles = await walk(optimizedDir);
    const staleFiles = existingFiles.filter((filePath) => !expectedOutputPaths.has(filePath));

    await Promise.all(staleFiles.map((filePath) => fs.unlink(filePath)));

    return staleFiles.length;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return 0;
    }

    throw error;
  }
};

const main = async () => {
  const allFiles = await walk(publicDir);
  const sourceFiles = allFiles.filter((filePath) =>
    supportedExtensions.has(path.extname(filePath).toLowerCase()),
  );

  const expectedOutputPaths = new Set(
    sourceFiles.map((filePath) =>
      path.join(optimizedDir, toOptimizedRelativePath(path.relative(publicDir, filePath))),
    ),
  );

  const results = await Promise.all(
    sourceFiles.map((filePath) => optimizeImage(filePath, path.relative(publicDir, filePath))),
  );

  const optimizedCount = results.filter((result) => result.status === "optimized").length;
  const skippedCount = results.length - optimizedCount;
  const staleCount = await removeStaleOutputs(expectedOutputPaths);

  console.log(
    `Optimized ${optimizedCount} image(s), reused ${skippedCount}, removed ${staleCount} stale output(s).`,
  );
};

main().catch((error) => {
  console.error("Image optimization failed.");
  console.error(error);
  process.exit(1);
});
