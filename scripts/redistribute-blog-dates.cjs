#!/usr/bin/env node
/**
 * Redistribute blog post dates evenly between 2026-04-01 and 2026-07-15.
 * Newest post id (29) -> 2026-07-15, oldest (01) -> 2026-04-01.
 * Updates:
 *  - src/data/blog*.ts (post.date field per id)
 *  - src/pages/<lang>/blog/<slug>/index.astro: const post = { ..., date: '...' }
 *  - related-article entries inside per-post files (matched by path:)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');

// id (string with leading zero) -> ISO date.
const SCHEDULE = {
  '29': '2026-07-15',
  '28': '2026-07-11',
  '27': '2026-07-08',
  '26': '2026-07-04',
  '25': '2026-06-30',
  '24': '2026-06-26',
  '23': '2026-06-23',
  '22': '2026-06-19',
  '21': '2026-06-15',
  '20': '2026-06-11',
  '19': '2026-06-08',
  '18': '2026-06-04',
  '17': '2026-05-31',
  '16': '2026-05-27',
  '15': '2026-05-23',
  '14': '2026-05-19',
  '13': '2026-05-15',
  '12': '2026-05-11',
  '11': '2026-05-08',
  '10': '2026-05-04',
  '09': '2026-05-01',
  '08': '2026-04-27',
  '07': '2026-04-23',
  '06': '2026-04-19',
  '05': '2026-04-16',
  '04': '2026-04-12',
  '03': '2026-04-08',
  '02': '2026-04-04',
  '01': '2026-04-01',
};

const MONTH_NAMES = {
  'it-it': { 4: 'Aprile', 5: 'Maggio', 6: 'Giugno', 7: 'Luglio' },
  'en-us': { 4: 'April', 5: 'May', 6: 'June', 7: 'July' },
  'de-de': { 4: 'April', 5: 'Mai', 6: 'Juni', 7: 'Juli' },
  'es-es': { 4: 'abril', 5: 'mayo', 6: 'junio', 7: 'julio' },
  'fr-fr': { 4: 'avril', 5: 'mai', 6: 'juin', 7: 'juillet' },
};

function format(lang, iso) {
  const [, mm, dd] = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const day = parseInt(dd.slice(-2), 10);
  // mm is captured here as the YEAR; rewrite the split.
  const parts = iso.split('-');
  const y = parts[0], m = parseInt(parts[1], 10), d = parseInt(parts[2], 10);
  const month = MONTH_NAMES[lang][m];
  switch (lang) {
    case 'it-it': return `${d} ${month} ${y}`;
    case 'en-us': return `${month} ${d}, ${y}`;
    case 'de-de': return `${d}. ${month} ${y}`;
    case 'es-es': return `${d} de ${month} de ${y}`;
    case 'fr-fr': return `${d} ${month} ${y}`;
  }
}

const DATA_FILES = {
  'it-it': path.join(SRC, 'data', 'blog.ts'),
  'en-us': path.join(SRC, 'data', 'blog-en.ts'),
  'de-de': path.join(SRC, 'data', 'blog-de.ts'),
  'es-es': path.join(SRC, 'data', 'blog-es.ts'),
  'fr-fr': path.join(SRC, 'data', 'blog-fr.ts'),
};

// Build a map (per language) path -> id, derived from data files.
function loadPathToId(lang) {
  const txt = fs.readFileSync(DATA_FILES[lang], 'utf8');
  // Match each entry's id and path. We assume the entry order: id appears before path.
  const out = {};
  const blockRe = /id:\s*'([^']+)'[\s\S]*?path:\s*'([^']+)'/g;
  let m;
  while ((m = blockRe.exec(txt)) !== null) {
    const id = m[1], p = m[2];
    out[p] = id;
  }
  return out;
}

// --- Step 1: update blog data files ---
let dataUpdates = 0;
for (const [lang, file] of Object.entries(DATA_FILES)) {
  let txt = fs.readFileSync(file, 'utf8');
  const before = txt;
  // For each entry, replace the date that follows the id within the same block.
  txt = txt.replace(
    /(id:\s*'([^']+)'[\s\S]*?date:\s*')([^']+)(')/g,
    (full, lead, id, _old, tail) => {
      const iso = SCHEDULE[id];
      if (!iso) return full;
      dataUpdates++;
      return lead + format(lang, iso) + tail;
    }
  );
  if (txt !== before) {
    fs.writeFileSync(file, txt);
    console.log('updated', path.relative(ROOT, file));
  }
}

// --- Step 2: update per-post .astro files ---
const LANGS = Object.keys(DATA_FILES);
const pathToId = {};
const idToFiles = {}; // not strictly needed but helpful for debug
for (const lang of LANGS) pathToId[lang] = loadPathToId(lang);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) walk(path.join(dir, e.name), out);
    else if (e.name === 'index.astro') out.push(path.join(dir, e.name));
  }
  return out;
}

let postUpdates = 0;
let relatedUpdates = 0;
const unknown = [];

for (const lang of LANGS) {
  const blogDir = path.join(SRC, 'pages', lang, 'blog');
  if (!fs.existsSync(blogDir)) continue;
  // Walk individual post directories (skip the hub index.astro at top level).
  const files = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => path.join(blogDir, e.name, 'index.astro'))
    .filter(fs.existsSync);

  for (const file of files) {
    let txt = fs.readFileSync(file, 'utf8');
    const before = txt;

    // The post's own path: determine by matching the file's directory back to a blog data path.
    const rel = path.relative(SRC, file).split(path.sep).join('/');
    const slug = rel.split('/')[3]; // pages/<lang>/blog/<slug>/index.astro
    const ownPath = `/${lang}/blog/${slug}/`;
    const ownId = pathToId[lang][ownPath];
    if (!ownId) {
      unknown.push(ownPath);
      continue;
    }

    // 2a. Update main post.date inside the `const post = { ... };` block.
    // Strategy: replace the date in the first object that contains a `path: '<ownPath>'` line.
    // Easier: match `const post = { ... };` then update its date line.
    txt = txt.replace(
      /(const\s+post\s*=\s*\{[\s\S]*?date:\s*')([^']+)(')/,
      (full, lead, _old, tail) => {
        postUpdates++;
        return lead + format(lang, SCHEDULE[ownId]) + tail;
      }
    );

    // 2b. Update relatedArticles entries: for each object literal containing a `path:` line
    // pointing to a blog post we know, also update its date line in the same object.
    // Use a balanced-ish match on objects starting with `{` and ending before a `},` or `}`.
    txt = txt.replace(
      /\{([^{}]*?date:\s*')([^']+)('[^{}]*?path:\s*'([^']+)'[^{}]*?)\}/g,
      (full, lead, _old, mid, p) => {
        const id = pathToId[lang][p];
        if (!id) return full;
        relatedUpdates++;
        return '{' + lead + format(lang, SCHEDULE[id]) + mid + '}';
      }
    );
    // Also handle the other order (path before date) in a related object.
    txt = txt.replace(
      /\{([^{}]*?path:\s*'([^']+)'[^{}]*?date:\s*')([^']+)('[^{}]*?)\}/g,
      (full, lead, p, _old, tail) => {
        const id = pathToId[lang][p];
        if (!id) return full;
        relatedUpdates++;
        return '{' + lead + format(lang, SCHEDULE[id]) + tail + '}';
      }
    );

    if (txt !== before) {
      fs.writeFileSync(file, txt);
    }
  }
}

console.log('---');
console.log('Data-file date replacements:', dataUpdates);
console.log('post.date updates :', postUpdates);
console.log('related date upd. :', relatedUpdates);
if (unknown.length) {
  console.log('UNKNOWN paths (no id mapping found):');
  for (const u of unknown) console.log('  ', u);
}
