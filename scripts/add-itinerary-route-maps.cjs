#!/usr/bin/env node
/* eslint-disable */
/**
 * Insert <ItineraryMap stops={[...]} /> on every itinerary detail page
 * (where there isn't already a map/iframe). The route is auto-extracted
 * from the existing `days[]` or `schedule[]` arrays by matching known
 * destination names (in any of the 5 supported locales) against a
 * lat/lon lookup.
 *
 * Placed immediately above the planner banner.
 *
 * Run with: node scripts/add-itinerary-route-maps.cjs [--dry]
 */
const fs = require('fs');
const glob = require('glob');

const DRY = process.argv.includes('--dry');

// Canonical coordinates per place name (extra waypoints like Naples/Pompeii
// added on top of map-destinations data).
const COORDS = {
  positano: [40.6281, 14.4849],
  amalfi: [40.6339, 14.6027],
  ravello: [40.6492, 14.6122],
  praiano: [40.6123, 14.5337],
  atrani: [40.6364, 14.6083],
  maiori: [40.6493, 14.6450],
  minori: [40.6500, 14.6275],
  cetara: [40.5961, 14.6083],
  'vietri sul mare': [40.6819, 14.6945],
  vietri: [40.6819, 14.6945],
  furore: [40.6264, 14.5525],
  tramonti: [40.6933, 14.6333],
  salerno: [40.6824, 14.7681],
  agerola: [40.6383, 14.5417],
  bomerano: [40.6383, 14.5417],
  'conca dei marini': [40.6192, 14.5739],
  erchie: [40.6278, 14.6792],
  sorrento: [40.6260, 14.3752],
  sorrent: [40.6260, 14.3752],
  sorrente: [40.6260, 14.3752],
  'massa lubrense': [40.6092, 14.3450],
  meta: [40.6412, 14.4097],
  "sant'agnello": [40.6340, 14.3970],
  'sant agnello': [40.6340, 14.3970],
  'vico equense': [40.6630, 14.4310],
  capri: [40.5530, 14.2270],
  anacapri: [40.5520, 14.2150],
  ischia: [40.7300, 13.9000],
  forio: [40.7365, 13.8570],
  procida: [40.7620, 14.0270],
  nocelle: [40.6334, 14.5170],
  // Extra waypoints
  napoli: [40.8518, 14.2681],
  naples: [40.8518, 14.2681],
  neapel: [40.8518, 14.2681],
  'nápoles': [40.8518, 14.2681],
  pompei: [40.7497, 14.4869],
  pompeii: [40.7497, 14.4869],
  pompeji: [40.7497, 14.4869],
  pompeya: [40.7497, 14.4869],
  ercolano: [40.8062, 14.3480],
  herculaneum: [40.8062, 14.3480],
};

// Display name preference (so the popup shows "Naples" on EN pages instead of "Napoli", etc.)
const DISPLAY = {
  'en-us': { napoli: 'Naples', neapel: 'Naples', 'nápoles': 'Naples', pompei: 'Pompeii', pompeji: 'Pompeii', pompeya: 'Pompeii', sorrent: 'Sorrento', sorrente: 'Sorrento', vietri: 'Vietri sul Mare' },
  'de-de': { naples: 'Neapel', napoli: 'Neapel', 'nápoles': 'Neapel', pompei: 'Pompeji', pompeii: 'Pompeji', pompeya: 'Pompeji', sorrento: 'Sorrent', sorrente: 'Sorrent' },
  'fr-fr': { naples: 'Naples', napoli: 'Naples', neapel: 'Naples', 'nápoles': 'Naples', pompei: 'Pompéi', pompeii: 'Pompéi', pompeji: 'Pompéi', pompeya: 'Pompéi', sorrento: 'Sorrente', sorrent: 'Sorrente' },
  'es-es': { napoli: 'Nápoles', naples: 'Nápoles', neapel: 'Nápoles', pompei: 'Pompeya', pompeii: 'Pompeya', pompeji: 'Pompeya', sorrent: 'Sorrento', sorrente: 'Sorrento' },
  'it-it': { naples: 'Napoli', neapel: 'Napoli', 'nápoles': 'Napoli', pompeii: 'Pompei', pompeji: 'Pompei', pompeya: 'Pompei', sorrent: 'Sorrento', sorrente: 'Sorrento' },
};

function detectLang(file) {
  for (const l of ['it-it', 'en-us', 'de-de', 'fr-fr', 'es-es']) if (file.includes(`/pages/${l}/`)) return l;
  return null;
}

function pickDisplayName(canonicalKey, lang) {
  const localized = DISPLAY[lang]?.[canonicalKey];
  if (localized) return localized;
  // Title case the raw key.
  return canonicalKey.split(' ').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ');
}

function extractStops(src, lang) {
  const found = [];
  const seen = new Set();
  // Collect text from days[].items + days[].title + schedule[].action + schedule[].place
  const text = [];
  const daysMatch = src.match(/const\s+days\s*=\s*\[([\s\S]*?)\n\]\s*;/);
  if (daysMatch) text.push(daysMatch[1]);
  const scheduleMatch = src.match(/const\s+schedule\s*=\s*\[([\s\S]*?)\n\]\s*;/);
  if (scheduleMatch) text.push(scheduleMatch[1]);
  const blob = text.join('\n');
  if (!blob) return [];

  // For each canonical place, find first index of occurrence in blob (case-insensitive,
  // word-boundary-ish). Then sort by index = chronological order in itinerary.
  const lowerBlob = blob.toLowerCase();
  for (const key of Object.keys(COORDS)) {
    const idx = lowerBlob.indexOf(key);
    if (idx < 0) continue;
    // Avoid duplicates that map to the same coords
    const coord = COORDS[key].join(',');
    if (seen.has(coord)) continue;
    seen.add(coord);
    found.push({ key, idx, lat: COORDS[key][0], lon: COORDS[key][1] });
  }
  found.sort((a, b) => a.idx - b.idx);
  return found.map(f => ({
    name: pickDisplayName(f.key, lang),
    lat: f.lat,
    lon: f.lon,
  }));
}

function alreadyHasMap(src) {
  return /InteractiveMap|ItineraryMap|<iframe|leaflet/i.test(src) ||
         /<img[^>]*alt=["'][^"']*(?:map|karte|mappa|carte|mapa)[^"']*["']/i.test(src);
}

const TARGETS = glob.sync('src/pages/{it-it,en-us,de-de,fr-fr,es-es}/{itinerari,itineraries,reiserouten,itineraires,itinerarios}/*/*/index.astro');

const titles = {
  'it-it': 'Mappa del percorso',
  'en-us': 'Route map',
  'de-de': 'Streckenkarte',
  'fr-fr': 'Carte du parcours',
  'es-es': 'Mapa de la ruta',
};

let ok = 0, skip = 0;
const lines = [];
for (const f of TARGETS) {
  const lang = detectLang(f);
  if (!lang) continue;
  const src = fs.readFileSync(f, 'utf8');
  if (alreadyHasMap(src)) { skip++; lines.push(`SKIP has-map: ${f}`); continue; }
  const stops = extractStops(src, lang);
  if (stops.length < 2) { skip++; lines.push(`SKIP <2 stops (${stops.length}): ${f}`); continue; }

  // Insert import for ItineraryMap if missing.
  let next = src;
  if (!/from\s+['"][^'"]+ItineraryMap\.astro['"]/.test(next)) {
    // Derive relative path from file to src/components/ItineraryMap.astro.
    // For src/pages/<lang>/<hub>/<days>/<slug>/index.astro, that's 5 levels up.
    const parts = f.split(/[\\/]/);
    const pagesIdx = parts.indexOf('pages');
    const upLevels = parts.length - pagesIdx - 1; // segments between 'pages' and end
    const rel = '../'.repeat(upLevels) + 'components/ItineraryMap.astro';
    next = next.replace(/(import\s+BaseLayout[\s\S]*?;)/, `$1\nimport ItineraryMap from '${rel}';`);
  }

  // Add `const itineraryStops = [...];` to frontmatter (just before closing `---`)
  const fmEnd = next.indexOf('---', next.indexOf('---') + 3);
  const stopsBlock = `\nconst itineraryStops = ${JSON.stringify(stops, null, 2)};\nconst itineraryMapTitle = ${JSON.stringify(titles[lang])};\n`;
  next = next.slice(0, fmEnd) + stopsBlock + next.slice(fmEnd);

  // Insert <ItineraryMap /> before the planner banner section.
  // The banner is wrapped in either:
  //   <!-- BANNER: Itinerary Planner -->  OR  <!-- Banner: Configuratore Itinerario -->
  const bannerRegex = /([ \t]*<!--\s*(?:BANNER|Banner)[^>]*?(?:Planner|Configuratore|Itinerary|Itinerario|Reiserouten|Planificateur|Planificador)[^>]*-->)/i;
  const m = next.match(bannerRegex);
  if (!m) { skip++; lines.push(`SKIP no-banner-marker: ${f}`); continue; }
  const insert = `${m[1].match(/^[ \t]*/)[0]}<ItineraryMap stops={itineraryStops} title={itineraryMapTitle} />\n\n${m[1]}`;
  next = next.replace(bannerRegex, insert);

  if (!DRY) fs.writeFileSync(f, next);
  ok++;
  lines.push(`OK ${lang} stops=${stops.length}: ${f}`);
}

console.log(`\nItinerary route map ${DRY ? '(DRY RUN)' : ''}: updated=${ok} skipped=${skip}`);
lines.forEach(l => console.log('  ' + l));
