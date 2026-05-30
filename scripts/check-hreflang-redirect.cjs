const fs = require('fs');
const path = require('path');

const SITE = 'https://amalficoast-travel.com';
const REDIRECTS_FILE = path.join(__dirname, '..', 'public', '_redirects');
const HREFLANG_FILE = path.join(__dirname, '..', 'src', 'i18n', 'hreflang-map.ts');

// Parse _redirects file: source -> destination
const redirectSrc = new Set();
const redirectsExact = new Map(); // url -> dest
if (fs.existsSync(REDIRECTS_FILE)) {
  for (const line of fs.readFileSync(REDIRECTS_FILE, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) continue;
    const [src, dest, code] = parts;
    if (src.includes('*')) continue; // skip wildcards
    redirectSrc.add(src);
    redirectsExact.set(src, dest);
  }
}

// Extract hreflang URLs
const src = fs.readFileSync(HREFLANG_FILE, 'utf8');
const urlRe = new RegExp(`'${SITE.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}([^']+)'`, 'g');
const refs = new Map(); // url -> count
let m;
while ((m = urlRe.exec(src)) !== null) {
  const u = m[1];
  refs.set(u, (refs.get(u) || 0) + 1);
}

console.log(`Hreflang map: ${refs.size} unique URLs referenced.`);
console.log(`_redirects sources: ${redirectSrc.size} exact paths.`);

const bad = [];
for (const [u] of refs) {
  if (redirectSrc.has(u)) bad.push({ url: u, dest: redirectsExact.get(u) });
}

console.log(`\n❌ Hreflang URLs that are 301 sources: ${bad.length}`);
for (const b of bad.slice(0, 50)) {
  console.log(`  ${b.url}  →  ${b.dest}`);
}
process.exit(bad.length > 0 ? 1 : 0);
