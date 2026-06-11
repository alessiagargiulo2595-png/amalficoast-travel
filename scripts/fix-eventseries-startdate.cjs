// Fix Google Search Console error: EventSeries missing startDate
// Adds startDate + endDate to the outer EventSeries schema by copying
// from the first subEvent.
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const files = glob.sync('src/pages/**/eventi/**/index.astro')
  .concat(glob.sync('src/pages/**/events/**/index.astro'))
  .concat(glob.sync('src/pages/**/veranstaltungen/**/index.astro'))
  .concat(glob.sync('src/pages/**/evenements/**/index.astro'))
  .concat(glob.sync('src/pages/**/eventos/**/index.astro'));

let fixed = 0;
let skipped = 0;
let errors = 0;

for (const file of files) {
  const txt = fs.readFileSync(file, 'utf8');
  if (!txt.includes('"@type": "EventSeries"')) { skipped++; continue; }

  // Skip if EventSeries already has top-level startDate (between EventSeries and subEvent)
  const seriesMatch = txt.match(/("@type":\s*"EventSeries",[\s\S]*?)("subEvent":\s*\[)/);
  if (!seriesMatch) { console.warn('SKIP no series block:', file); skipped++; continue; }

  if (/"startDate"\s*:/.test(seriesMatch[1])) { skipped++; continue; }

  // Pull startDate from first subEvent (endDate optional)
  const startMatch = txt.match(/"subEvent":\s*\[\s*\{[\s\S]*?"startDate":\s*"([^"]+)"/);
  if (!startMatch) { console.warn('SKIP no subEvent startDate:', file); errors++; continue; }
  const startDate = startMatch[1];

  const endMatch = txt.match(/"subEvent":\s*\[\s*\{[\s\S]*?"endDate":\s*"([^"]+)"/);
  const endDate = endMatch ? endMatch[1] : startDate; // single-day event fallback

  // Insert before "subEvent": [ with same indentation
  const updated = txt.replace(
    /(\n(\s+))("subEvent":\s*\[)/,
    `$1"startDate": "${startDate}",\n$2"endDate": "${endDate}",\n$2$3`
  );

  if (updated === txt) { console.warn('SKIP no insertion:', file); errors++; continue; }

  fs.writeFileSync(file, updated, 'utf8');
  fixed++;
}

console.log(`Fixed: ${fixed} | Skipped: ${skipped} | Errors: ${errors}`);
