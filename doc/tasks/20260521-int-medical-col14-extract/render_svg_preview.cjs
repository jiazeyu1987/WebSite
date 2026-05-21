const sharp = require("sharp");

async function main() {
  const [, , inputPath, outputPath, sizeArg] = process.argv;
  if (!inputPath || !outputPath) {
    throw new Error("Usage: node render_svg_preview.cjs <input.svg> <output.png> [size]");
  }
  const size = Number(sizeArg || 96);
  await sharp(inputPath)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toFile(outputPath);
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exit(1);
});
