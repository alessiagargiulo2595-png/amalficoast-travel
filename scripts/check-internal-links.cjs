const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST = path.join(__dirname, '..', 'dist');
const LANGS = ['en-us', 'it-it', 'de-de', 'es-es', 'fr-fr'];

function walk(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) out.push(...walk(p));
    else if (f.name.endsWith('.html')) out.push(p);
  }
  return out;
}

// Build set of valid URL paths from dist (every directory with index.html)
const validPaths = new Set();
function indexDist(dir, rel = '') {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.isDirectory()) {
      const next = rel + '/' + f.name;
      indexDist(path.join(dir, f.name), next);
    } else if (f.name === 'index.html') {
      validPaths.add((rel || '/') + '/');
      validPaths.add(rel || '/');
    } else if (f.name.endsWith('.html')) {
      validPaths.add(rel + '/' + f.name.replace(/\.html$/, ''));
    }
  }
}
indexDist(DIST);
// Normalize: ensure trailing slash variants
const valid = new Set();
for (const p of validPaths) {
  valid.add(p.endsWith('/') ? p : p + '/');
  valid.add(p.replace(/\/$/, '') || '/');
}

// Load redirects from _redirects file if exists
const redirectSources = new Set();
const redirectsFile = path.join(DIST, '_redirects');
if (fs.existsSync(redirectsFile)) {
  for (const line of fs.readFileSync(redirectsFile, 'utf8').split('\n')) {
    const m = line.match(/^(\S+)\s+\S+/);
    if (m) redirectSources.add(m[1].replace(/\*$/, ''));
  }
}

// Scan all HTML files for internal links
const broken = new Map(); // url -> Set of source files
const allFiles = walk(DIST);
let totalLinks = 0;
for (const file of allFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const re = /href="(\/[^"#?]*)/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    let url = m[1];
    if (url.startsWith('//')) continue;
    if (url.startsWith('/_astro/') || url.startsWith('/images/') || url.startsWith('/data/') || url.startsWith('/scripts/')) continue;
    if (url.endsWith('.xml') || url.endsWith('.txt') || url.endsWith('.ico') || url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.webp') || url.endsWith('.svg') || url.endsWith('.pdf') || url.endsWith('.json')) continue;
    totalLinks++;
    const withSlash = url.endsWith('/') ? url : url + '/';
    const noSlash = url.replace(/\/$/, '') || '/';
    if (valid.has(withSlash) || valid.has(noSlash) || valid.has(url)) continue;
    // Check redirect prefix match
    let redirected = false;
    for (const src of redirectSources) {
      if (url.startsWith(src)) { redirected = true; break; }
    }
    if (redirected) continue;
    if (!broken.has(url)) broken.set(url, new Set());
    broken.get(url).add(path.relative(DIST, file));
  }
}

console.log(`Scanned ${allFiles.length} HTML files, ${totalLinks} internal links.`);
console.log(`Valid paths in dist: ${valid.size}`);
console.log(`\nBroken internal links: ${broken.size}\n`);

const sorted = [...broken.entries()].sort((a, b) => b[1].size - a[1].size);
for (const [url, sources] of sorted.slice(0, 50)) {
  console.log(`❌ ${url}  (referenced by ${sources.size} file${sources.size > 1 ? 's' : ''})`);
  for (const s of [...sources].slice(0, 3)) {
    console.log(`     ↳ ${s}`);
  }
}
if (sorted.length > 50) console.log(`\n... and ${sorted.length - 50} more.`);
process.exit(broken.size > 0 ? 1 : 0);
