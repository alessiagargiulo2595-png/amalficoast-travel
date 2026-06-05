#!/usr/bin/env node
/* eslint-disable */
/**
 * Inject TouristTrip schema (with ItemList itinerary) into all 55 itinerary
 * detail pages. Builds itinerary ItemList from either `days` or `schedule`
 * arrays already in the frontmatter.
 *
 * Run with: node scripts/add-tourist-trip-schemas.cjs [--dry]
 */
const fs = require('fs');
const glob = require('glob');

const SITE = 'https://amalficoast-travel.com';
const DRY = process.argv.includes('--dry');

const PATTERNS = [
  'src/pages/it-it/itinerari/*/*/index.astro',
  'src/pages/en-us/itineraries/*/*/index.astro',
  'src/pages/de-de/reiserouten/*/*/index.astro',
  'src/pages/fr-fr/itineraires/*/*/index.astro',
  'src/pages/es-es/itinerarios/*/*/index.astro',
];

function findFiles() {
  const out = new Set();
  for (const p of PATTERNS) for (const f of glob.sync(p, { nodir: true })) out.add(f);
  return [...out].sort();
}

function findBalanced(text, openIdx, open = '{', close = '}') {
  let depth = 0;
  for (let i = openIdx; i < text.length; i++) {
    const c = text[i];
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function extractFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  return { body: m[1], start: m.index, end: m.index + m[0].length };
}

function extractBaseLayoutAttr(src, attr) {
  const tag = src.match(/<BaseLayout[\s\S]*?>/);
  if (!tag) return null;
  const m = tag[0].match(new RegExp(`${attr}=["']([^"']+)["']`));
  return m ? m[1] : null;
}

function extractLastBreadcrumb(fm) {
  // const breadcrumbs = [ ... { name: 'X', url: '/...' } ];
  const decl = fm.match(/const\s+breadcrumbs\s*=\s*\[/);
  if (!decl) return null;
  const openIdx = decl.index + decl[0].length - 1;
  const closeIdx = findBalanced(fm, openIdx, '[', ']');
  if (closeIdx < 0) return null;
  const body = fm.slice(openIdx, closeIdx + 1);
  const objs = [...body.matchAll(/\{\s*name:\s*["']([^"']+)["']\s*,\s*url:\s*["']([^"']+)["']\s*\}/g)];
  if (!objs.length) return null;
  const last = objs[objs.length - 1];
  return { name: last[1], url: last[2] };
}

function extractArrayDecl(fm, varName) {
  const decl = fm.match(new RegExp(`const\\s+${varName}\\s*=\\s*\\[`));
  if (!decl) return null;
  const openIdx = decl.index + decl[0].length - 1;
  const closeIdx = findBalanced(fm, openIdx, '[', ']');
  if (closeIdx < 0) return null;
  return { start: decl.index, end: closeIdx + 1 };
}

function hasFaqSchema(fm) {
  return /const\s+faqSchema\s*=/.test(fm);
}

function getKind(fm) {
  if (extractArrayDecl(fm, 'days')) return 'days';
  if (extractArrayDecl(fm, 'schedule')) return 'schedule';
  return null;
}

function generateTouristTripBlock(kind, { name, url, description, image }) {
  const absImg = image && (image.startsWith('http') ? image : SITE + image);
  const absUrl = SITE + url;
  const descLine = description ? `  "description": ${JSON.stringify(description)},\n` : '';
  const imageLine = absImg ? `  "image": ${JSON.stringify(absImg)},\n` : '';

  const itineraryBlock = kind === 'days'
    ? `
  "itinerary": {
    "@type": "ItemList",
    "numberOfItems": days.length,
    "itemListElement": days.map((d, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": \`\${d.day}: \${d.title}\`,
      "description": d.items.join(' \\u00b7 ')
    }))
  },`
    : `
  "itinerary": {
    "@type": "ItemList",
    "numberOfItems": schedule.length,
    "itemListElement": schedule.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": \`\${s.time} \\u00b7 \${s.place}\`,
      "description": s.action
    }))
  },`;

  return `\nconst touristTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": ${JSON.stringify(name)},
${descLine}${imageLine}  "url": ${JSON.stringify(absUrl)},${itineraryBlock}
  "touristType": "Sightseeing"
};`;
}

function processFile(file) {
  const src = fs.readFileSync(file, 'utf8');
  const fm = extractFrontmatter(src);
  if (!fm) return { file, status: 'skip', reason: 'no frontmatter' };

  if (/const\s+touristTripSchema\s*=/.test(fm.body)) return { file, status: 'skip', reason: 'already injected' };

  const kind = getKind(fm.body);
  if (!kind) return { file, status: 'skip', reason: 'no days or schedule array' };

  const last = extractLastBreadcrumb(fm.body);
  if (!last) return { file, status: 'skip', reason: 'no last breadcrumb' };

  const description = extractBaseLayoutAttr(src, 'description');
  const image = extractBaseLayoutAttr(src, 'heroImage');
  if (!description) return { file, status: 'skip', reason: 'no description' };

  const block = generateTouristTripBlock(kind, { name: last.name, url: last.url, description, image });

  // Insert at end of frontmatter (just before closing `---`)
  const closingIdx = src.indexOf('---', fm.start + 3);
  const beforeClose = src.slice(0, closingIdx);
  const afterClose = src.slice(closingIdx);
  let next = beforeClose.replace(/(\r?\n)$/, '') + block + '\n';
  next += afterClose;

  // Update schema={[faqSchema]} → schema={[faqSchema, touristTripSchema]}
  const before = next;
  next = next.replace(/schema=\{\[faqSchema\]\}/g, 'schema={[faqSchema, touristTripSchema]}');
  if (next === before) {
    // No faqSchema reference: add bare schema={[touristTripSchema]} on BaseLayout
    next = next.replace(/(<BaseLayout[\s\S]*?lang=\{lang\})/, '$1\n  schema={[touristTripSchema]}');
  }

  if (!DRY) fs.writeFileSync(file, next, 'utf8');
  return { file, status: 'ok', kind };
}

function main() {
  const files = findFiles();
  let ok = 0, skip = 0;
  const skipped = [];
  const byKind = { days: 0, schedule: 0 };
  for (const f of files) {
    const r = processFile(f);
    if (r.status === 'ok') { ok++; byKind[r.kind]++; }
    else { skip++; skipped.push(`${r.file} — ${r.reason}`); }
  }
  console.log(`\nTouristTrip schema injection ${DRY ? '(DRY RUN)' : ''}`);
  console.log(`  processed: ${ok} (days=${byKind.days}, schedule=${byKind.schedule})`);
  console.log(`  skipped:   ${skip}`);
  if (skipped.length) {
    console.log('\nSkipped files:');
    skipped.forEach(s => console.log('  ' + s));
  }
}

main();
