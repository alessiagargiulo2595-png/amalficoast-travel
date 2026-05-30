const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const SRC_DIR = path.join(__dirname, '..', 'src');
const MAX_WIDTH = 1400;
const QUALITY = 85;

// Files to convert
const files = [
  'amalfi-coast-from-naples-map.png',
  'costa-amalfitana-desde-napoles-map.png',
  'amalfikueste-ab-neapel-map.png',
  'cote-amalfitaine-depuis-naples-map.png',
  'pexels-hellojoshwithers-27025494.jpg',
  'pexels-daniel-eliashevsky-30667400-9718902.jpg',
  'pexels-fran-33839182.jpg',
  'pexels-greta-soave-10436112.jpg',
];

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name === 'node_modules') continue;
      walk(p, out);
    } else if (/\.(astro|ts|tsx|js|jsx|md|html)$/.test(f.name)) {
      out.push(p);
    }
  }
  return out;
}

(async () => {
  let totalOrig = 0;
  let totalNew = 0;

  for (const f of files) {
    const fp = path.join(IMAGES_DIR, f);
    if (!fs.existsSync(fp)) {
      console.log(`MISSING  ${f}`);
      continue;
    }
    const inputBuf = fs.readFileSync(fp);
    const meta = await sharp(inputBuf).metadata();
    const origSize = inputBuf.length;
    totalOrig += origSize;

    const newName = f.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const newPath = path.join(IMAGES_DIR, newName);

    const pipeline = sharp(inputBuf);
    if (meta.width > MAX_WIDTH) pipeline.resize(MAX_WIDTH);
    const outBuf = await pipeline.webp({ quality: QUALITY }).toBuffer();

    if (outBuf.length >= origSize) {
      console.log(`SKIP     ${f}  (webp ${Math.round(outBuf.length/1024)}K >= orig ${Math.round(origSize/1024)}K)`);
      continue;
    }

    fs.writeFileSync(newPath, outBuf);
    totalNew += outBuf.length;
    console.log(
      f.padEnd(50) +
      meta.width + 'x' + meta.height +
      ' -> ' + Math.min(meta.width, MAX_WIDTH) + 'px  ' +
      Math.round(origSize/1024) + 'K -> ' + Math.round(outBuf.length/1024) + 'K  (-' +
      Math.round((origSize - outBuf.length)/1024) + 'K)'
    );

    // Update references in src/
    const oldRef = '/images/' + f;
    const newRef = '/images/' + newName;
    let filesUpdated = 0;
    for (const srcFile of walk(SRC_DIR)) {
      const content = fs.readFileSync(srcFile, 'utf8');
      if (content.includes(oldRef)) {
        fs.writeFileSync(srcFile, content.split(oldRef).join(newRef), 'utf8');
        filesUpdated++;
      }
    }
    console.log('         ↳ updated ' + filesUpdated + ' source file(s)');

    // Delete original
    fs.unlinkSync(fp);
  }

  console.log('---');
  console.log('Total: ' + Math.round(totalOrig/1024) + 'K -> ' + Math.round(totalNew/1024) + 'K');
  console.log('Saved: ' + Math.round((totalOrig - totalNew)/1024) + 'K');
})();
