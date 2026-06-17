#!/usr/bin/env node
/**
 * One-shot: optimize blog hero images used on /it-it/blog/.
 * - JPGs => create .webp sibling (max 1400 wide, q85). Keep only if smaller than source.
 * - WebPs already 1400 wide but heavy => re-encode at q85 in place. Keep only if smaller.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_WIDTH = 1400;
const QUALITY = 85;

// Images referenced by the it-it blog index (post.image list) + hero.
const FILES = [
  'blog-hub-hero.jpg',
  'torre-dello-ziro-hero.webp',
  'sentiero-dei-limoni-hero.webp',
  'piazzetta-capri-hero.webp',
  'study-abroad-sorrento-hero.webp',
  'film-fatti-a-sorrento-hero.webp',
  'praiano-vs-positano-hero.webp',
  'maiori-vs-minori-hero.webp',
  'procida-vs-ischia-hero.webp',
  'sorrento-vs-positano-hero.webp',
  'positano-vs-amalfi-hero.webp',
  'sorrento-vs-amalfi-hero.webp',
  'capri-vs-ischia-hero.webp',
  'limoncello-ricetta-hero.jpg',
  'scialatielli-hero.jpg',
  'cuoppo-fritto-hero.jpg',
  'giardini-tiberio-via-krupp-hero.jpg',
  'baia-recommone-hero.jpg',
  'fiordo-crapolla-hero.jpg',
  'punta-campanella-hero.jpg',
  'sorrento-vs-praiano-hero.jpg',
  'tramonto-costiera.jpg',
  'spiagge-bambini.jpg',
  'spiagge-selvagge.jpg',
  'grotta-smeraldo-hero.webp',
  'vini-costa-amalfi-hero.jpg',
  'atrani-hero.jpg',
  'delizia-limone-hero.jpg',
  'valle-ferriere-hero.jpg',
  'alici-cetara-hero.jpg',
];

(async () => {
  let totalBefore = 0;
  let totalAfter = 0;
  let totalSaved = 0;
  const conversions = []; // { from, to } for source updates

  for (const f of FILES) {
    const fp = path.join(IMAGES_DIR, f);
    if (!fs.existsSync(fp)) {
      console.log(f.padEnd(45) + 'MISSING');
      continue;
    }
    const inputBuf = fs.readFileSync(fp);
    const origSize = inputBuf.length;
    const meta = await sharp(inputBuf).metadata();
    totalBefore += origSize;

    const ext = path.extname(f).toLowerCase();
    const base = f.slice(0, f.length - ext.length);
    const isJpg = ext === '.jpg' || ext === '.jpeg';
    const targetName = base + '.webp';
    const targetPath = path.join(IMAGES_DIR, targetName);

    let pipeline = sharp(inputBuf);
    if (meta.width > MAX_WIDTH) pipeline = pipeline.resize(MAX_WIDTH);
    const outBuf = await pipeline.webp({ quality: QUALITY }).toBuffer();

    if (isJpg) {
      // Create webp sibling. Keep only if smaller than original jpg.
      if (outBuf.length < origSize) {
        fs.writeFileSync(targetPath, outBuf);
        conversions.push({ from: f, to: targetName });
        totalAfter += outBuf.length;
        totalSaved += origSize - outBuf.length;
        console.log(
          f.padEnd(45) +
            meta.width + 'x' + meta.height +
            '  ' + Math.round(origSize / 1024) + 'K -> ' +
            Math.round(outBuf.length / 1024) + 'K  (-' +
            Math.round((origSize - outBuf.length) / 1024) + 'K)  =>' + targetName
        );
      } else {
        totalAfter += origSize;
        console.log(f.padEnd(45) + 'SKIP (webp larger than source jpg)');
      }
    } else {
      // Re-encode webp in place if result is smaller.
      if (outBuf.length < origSize) {
        fs.writeFileSync(fp, outBuf);
        totalAfter += outBuf.length;
        totalSaved += origSize - outBuf.length;
        console.log(
          f.padEnd(45) +
            meta.width + 'x' + meta.height +
            '  ' + Math.round(origSize / 1024) + 'K -> ' +
            Math.round(outBuf.length / 1024) + 'K  (-' +
            Math.round((origSize - outBuf.length) / 1024) + 'K)'
        );
      } else {
        totalAfter += origSize;
        console.log(f.padEnd(45) + 'SKIP (already optimal)');
      }
    }
  }

  console.log('---');
  console.log('Before: ' + Math.round(totalBefore / 1024) + 'K');
  console.log('After : ' + Math.round(totalAfter / 1024) + 'K');
  console.log('Saved : ' + Math.round(totalSaved / 1024) + 'K');
  console.log('JPG -> WebP conversions: ' + conversions.length);
  fs.writeFileSync(path.join(__dirname, 'blog-image-conversions.json'), JSON.stringify(conversions, null, 2));
  console.log('Wrote scripts/blog-image-conversions.json');
})();
