#!/usr/bin/env node
/* eslint-disable */
/**
 * Refactor every event page schema:
 *   - Wrap the existing Event in an EventSeries (Google rich-result friendly)
 *   - Add eventStatus, eventAttendanceMode, image, description (EEAT signals)
 *   - Keep all original data: name, startDate, endDate, location, url
 *
 * Run with: node scripts/upgrade-event-schemas.cjs [--dry]
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SITE = 'https://amalficoast-travel.com';
const DRY = process.argv.includes('--dry');

const EVENT_GLOBS = [
  'src/pages/it-it/eventi/**/index.astro',
  'src/pages/en-us/events/**/index.astro',
  'src/pages/de-de/veranstaltungen/**/index.astro',
  'src/pages/fr-fr/evenements/**/index.astro',
  'src/pages/es-es/eventos/**/index.astro',
];

function findEventFiles() {
  const files = new Set();
  for (const pattern of EVENT_GLOBS) {
    for (const f of glob.sync(pattern, { nodir: true })) {
      // Skip hub index pages — only individual event detail pages have eventSchema
      if (path.basename(path.dirname(f)).match(/^(eventi|events|veranstaltungen|evenements|eventos)$/)) continue;
      files.add(f);
    }
  }
  return [...files].sort();
}

function findBalancedObject(text, openIdx) {
  // openIdx points to '{'. Return index of matching '}'.
  let depth = 0;
  for (let i = openIdx; i < text.length; i++) {
    const c = text[i];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function extractEventSchemaBlock(src) {
  const decl = src.match(/const\s+eventSchema\s*=\s*\{/);
  if (!decl) return null;
  const openIdx = decl.index + decl[0].length - 1;
  const closeIdx = findBalancedObject(src, openIdx);
  if (closeIdx < 0) return null;
  // Include trailing `;`
  let end = closeIdx + 1;
  while (end < src.length && src[end] !== ';') end++;
  if (src[end] === ';') end++;
  return { start: decl.index, end, body: src.slice(openIdx, closeIdx + 1) };
}

function pickStringField(body, key) {
  const m = body.match(new RegExp(`"${key}"\\s*:\\s*"([^"]+)"`));
  return m ? m[1] : null;
}

function extractLocationBlock(body) {
  const m = body.match(/"location"\s*:\s*\{/);
  if (!m) return null;
  const openIdx = m.index + m[0].length - 1;
  const closeIdx = findBalancedObject(body, openIdx);
  if (closeIdx < 0) return null;
  return body.slice(openIdx, closeIdx + 1);
}

function extractBaseLayoutAttr(src, attr) {
  // Match attr="value" inside the <BaseLayout ...> opening tag (until first >)
  const tag = src.match(/<BaseLayout[\s\S]*?>/);
  if (!tag) return null;
  const m = tag[0].match(new RegExp(`${attr}=["']([^"']+)["']`));
  return m ? m[1] : null;
}

function stripYearFromName(name) {
  return name.replace(/\s+(19|20)\d{2}$/, '').trim();
}

function buildNewSchema({ name, startDate, endDate, locationBlock, url, description, image }) {
  const seriesName = stripYearFromName(name);
  const absImage = image ? (image.startsWith('http') ? image : SITE + image) : null;
  const indent = '  ';

  const subEventLines = [
    `${indent}${indent}{`,
    `${indent}${indent}${indent}"@type": "Event",`,
    `${indent}${indent}${indent}"name": ${JSON.stringify(name)},`,
    `${indent}${indent}${indent}"startDate": ${JSON.stringify(startDate)},`,
    endDate ? `${indent}${indent}${indent}"endDate": ${JSON.stringify(endDate)},` : null,
    `${indent}${indent}${indent}"eventStatus": "https://schema.org/EventScheduled",`,
    `${indent}${indent}${indent}"eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",`,
    `${indent}${indent}${indent}"location": ${locationBlock.replace(/\n/g, '\n' + indent + indent + indent)},`,
    `${indent}${indent}${indent}"url": ${JSON.stringify(url)}` + (absImage || description ? ',' : ''),
  ].filter(Boolean);
  if (absImage) subEventLines.push(`${indent}${indent}${indent}"image": ${JSON.stringify(absImage)}` + (description ? ',' : ''));
  if (description) subEventLines.push(`${indent}${indent}${indent}"description": ${JSON.stringify(description)}`);
  subEventLines.push(`${indent}${indent}}`);

  const lines = [
    `const eventSchema = {`,
    `${indent}"@context": "https://schema.org",`,
    `${indent}"@type": "EventSeries",`,
    `${indent}"name": ${JSON.stringify(seriesName)},`,
    description ? `${indent}"description": ${JSON.stringify(description)},` : null,
    absImage ? `${indent}"image": ${JSON.stringify(absImage)},` : null,
    `${indent}"url": ${JSON.stringify(url)},`,
    `${indent}"location": ${locationBlock.replace(/\n/g, '\n' + indent)},`,
    `${indent}"eventStatus": "https://schema.org/EventScheduled",`,
    `${indent}"eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",`,
    `${indent}"subEvent": [`,
    subEventLines.join('\n'),
    `${indent}]`,
    `};`,
  ].filter(Boolean);
  return lines.join('\n');
}

function processFile(file) {
  const src = fs.readFileSync(file, 'utf8');
  const block = extractEventSchemaBlock(src);
  if (!block) return { file, status: 'skip', reason: 'no eventSchema block' };

  const name = pickStringField(block.body, 'name');
  const startDate = pickStringField(block.body, 'startDate');
  const endDate = pickStringField(block.body, 'endDate');
  const url = pickStringField(block.body, 'url');
  const locationBlock = extractLocationBlock(block.body);
  if (!name || !startDate || !url || !locationBlock) {
    return { file, status: 'skip', reason: 'missing required field' };
  }

  const description = extractBaseLayoutAttr(src, 'description');
  const image = extractBaseLayoutAttr(src, 'heroImage');

  const newSchema = buildNewSchema({ name, startDate, endDate, locationBlock, url, description, image });
  const next = src.slice(0, block.start) + newSchema + src.slice(block.end);

  if (!DRY) fs.writeFileSync(file, next, 'utf8');
  return { file, status: 'ok', name, hasDesc: !!description, hasImage: !!image };
}

function main() {
  const files = findEventFiles();
  let ok = 0, skip = 0;
  const skipped = [];
  for (const f of files) {
    const r = processFile(f);
    if (r.status === 'ok') ok++;
    else { skip++; skipped.push(`${r.file} — ${r.reason}`); }
  }
  console.log(`\nEvent schema refactor ${DRY ? '(DRY RUN)' : ''}`);
  console.log(`  processed: ${ok}`);
  console.log(`  skipped:   ${skip}`);
  if (skipped.length) {
    console.log('\nSkipped files:');
    skipped.forEach(s => console.log('  ' + s));
  }
}

main();
