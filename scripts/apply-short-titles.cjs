#!/usr/bin/env node
/**
 * Replace long page titles with shortened versions.
 *
 * Reads:
 *  - scripts/titles-input.txt   (URL \t OLD_TITLE \t WIDTH)
 *  - scripts/titles-new.json    (URL -> NEW_TITLE)
 *
 * For each URL:
 *  - Maps URL -> src/pages/.../index.astro
 *  - Searches file for the old title (possibly with JS-escaped apostrophes)
 *  - Replaces with the new title
 *
 * Skips entries whose new title length > 65 chars.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC_PAGES = path.join(ROOT, 'src', 'pages');
const SITE = 'https://amalficoast-travel.com';

const input = fs.readFileSync(path.join(__dirname, 'titles-input.txt'), 'utf8')
  .split(/\r?\n/).filter(Boolean);
const newMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'titles-new.json'), 'utf8'));

function urlToFile(url) {
  // url: https://amalficoast-travel.com/it-it/blog/foo/
  const p = url.slice(SITE.length).replace(/^\//, '').replace(/\/$/, '');
  const candidates = [
    path.join(SRC_PAGES, p, 'index.astro'),
    path.join(SRC_PAGES, p + '.astro'),
  ];
  for (const c of candidates) if (fs.existsSync(c)) return c;
  return null;
}

// JS-escape apostrophes for string-literal matching variants.
function variants(s) {
  return [
    s,
    s.replace(/'/g, "\\'"),
  ];
}

let updated = 0, missing = 0, notMatched = 0, skipped = 0, tooLong = 0;
const report = [];

for (const line of input) {
  const parts = line.split('\t');
  if (parts.length < 2) continue;
  const url = parts[0].trim();
  const oldTitle = parts[1].trim();
  const newTitle = newMap[url];

  if (!newTitle) { skipped++; report.push(['SKIP-no-new', url]); continue; }
  if (newTitle.length > 65) { tooLong++; report.push(['TOO-LONG', url, newTitle.length]); continue; }

  const file = urlToFile(url);
  if (!file) { missing++; report.push(['NO-FILE', url]); continue; }

  let txt = fs.readFileSync(file, 'utf8');
  let matched = false;
  for (const old of variants(oldTitle)) {
    if (txt.includes(old)) {
      // Replace ALL occurrences (some files may have metaTitle + breadcrumb + JSON-LD copies).
      // But we only want to replace title contexts. To be safe, only replace inside delimited strings.
      // Strategy: replace the exact substring (likely unique).
      txt = txt.split(old).join(newTitle);
      matched = true;
      break;
    }
  }
  if (!matched) {
    notMatched++;
    report.push(['NO-MATCH', url, file]);
    continue;
  }
  fs.writeFileSync(file, txt);
  updated++;
  report.push(['OK', url, file, `${oldTitle.length}->${newTitle.length}`]);
}

console.log('Updated:', updated);
console.log('Skipped (no new):', skipped);
console.log('Too long new title:', tooLong);
console.log('File missing:', missing);
console.log('Old title not found in file:', notMatched);
console.log('---');
for (const r of report) {
  if (r[0] !== 'OK') console.log(r.join('  '));
}
