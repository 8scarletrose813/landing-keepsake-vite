import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const inputDir = 'raw-images';
const outputDir = 'src/assets/images';
const widths = [400, 800];

fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

for (const file of files) {
  const name = path.parse(file).name;
  const inputPath = path.join(inputDir, file);

  for (const width of widths) {
    const resized = sharp(inputPath).resize(width);

    await resized
      .clone()
      .avif({ quality: 65 })
      .toFile(path.join(outputDir, `${name}-${width}.avif`));
    await resized
      .clone()
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, `${name}-${width}.webp`));
    await resized
      .clone()
      .jpeg({ quality: 85 })
      .toFile(path.join(outputDir, `${name}-${width}.jpg`));
  }
}

console.log(`Готово! Оптимізовано ${files.length} зображень у AVIF, WebP та JPEG.`);
