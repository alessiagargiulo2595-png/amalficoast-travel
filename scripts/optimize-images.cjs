#!/usr/bin/env node
/**
 * Image optimization script
 *
 * Rule: max width 1400px (2x retina), quality 85.
 * Only overwrites if the result is SMALLER than the original.
 * Run: node scripts/optimize-images.cjs
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_WIDTH = 1400;
const QUALITY = 85;

(async () => {
  const files = fs.readdirSync(IMAGES_DIR).filter(f => f.endsWith('.webp'));

  let totalSaved = 0;
  let optimized = 0;
  let skippedSmall = 0;
  let skippedBigger = 0;

  for (const f of files) {
    const fp = path.join(IMAGES_DIR, f);
    const inputBuf = fs.readFileSync(fp);
    const meta = await sharp(inputBuf).metadata();
    const origSize = inputBuf.length;

    if (meta.width <= MAX_WIDTH) {
      skippedSmall++;
      continue;
    }

    const outBuf = await sharp(inputBuf)
      .resize(MAX_WIDTH)
      .webp({ quality: QUALITY })
      .toBuffer();

    if (outBuf.length < origSize) {
      fs.writeFileSync(fp, outBuf);
      const saved = origSize - outBuf.length;
      totalSaved += saved;
      optimized++;
      console.log(
        f.padEnd(45) +
          meta.width + 'x' + meta.height +
          ' -> ' + MAX_WIDTH + 'px  ' +
          Math.round(origSize / 1024) + 'K -> ' +
          Math.round(outBuf.length / 1024) + 'K  (-' +
          Math.round(saved / 1024) + 'K)'
      );
    } else {
      skippedBigger++;
      console.log(f.padEnd(45) + 'SKIP (result larger)');
    }
  }

  console.log('---');
  console.log('Optimized: ' + optimized + ' | Skipped (already small): ' + skippedSmall + ' | Skipped (result larger): ' + skippedBigger);
  console.log('Total saved: ' + Math.round(totalSaved / 1024) + 'K');
})();
