const fs = require('fs');
const path = require('path');

const SITE = 'https://amalficoast-travel.com';
const DIST = path.join(__dirname, '..', 'dist');

// Build set of valid paths from dist
const valid = new Set();
function indexDist(dir, rel = '') {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.isDirectory()) indexDist(path.join(dir, f.name), rel + '/' + f.name);
    else if (f.name === 'index.html') {
      valid.add((rel || '/') + '/');
    }
  }
}
indexDist(DIST);

// Load hreflang map
const map = require('../src/i18n/hreflang-map.ts');
// fallback: parse the file as text since it's TS
const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'i18n', 'hreflang-map.ts'), 'utf8');
const urlRe = new RegExp(`'${SITE.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}([^']+)'`, 'g');
const allUrls = new Set();
let m;
while ((m = urlRe.exec(src)) !== null) {
  allUrls.add(m[1]);
}

console.log(`Hreflang map references ${allUrls.size} unique URL paths.`);
const missing = [];
for (const u of allUrls) {
  const withSlash = u.endsWith('/') ? u : u + '/';
  if (!valid.has(withSlash)) missing.push(u);
}
console.log(`Missing from dist: ${missing.length}`);
for (const u of missing.slice(0, 50)) console.log(`  ❌ ${u}`);
if (missing.length > 50) console.log(`  ... and ${missing.length - 50} more.`);
process.exit(missing.length > 0 ? 1 : 0);
