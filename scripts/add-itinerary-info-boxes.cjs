#!/usr/bin/env node
/* eslint-disable */
/**
 * Add a 4-box stats grid (Duration/Base/Transport/Budget …) at the top of
 * the wrapper div, mirroring the IT page for the same itinerary.
 *
 * Targets the 3 multi-day itineraries that have the grid on IT:
 *   - 4-day  complete amalfi coast
 *   - 7-day  grand tour coast peninsula
 *   - 7-day  slow travel villages food
 *
 * For 4 locales (en-us, de-de, fr-fr, es-es) → 12 files.
 *
 * Run with: node scripts/add-itinerary-info-boxes.cjs [--dry]
 */
const fs = require('fs');
const glob = require('glob');

const DRY = process.argv.includes('--dry');

const ICONS = {
  duration: `<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>`,
  base:     `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`,
  transport:`<path d="M6 9l6-6 6 6M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M9 14h6"/>`,
  budget:   `<circle cx="12" cy="12" r="1"/><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>`,
  season:   `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>`,
  pace:     `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`,
};

// One 4-box config per itinerary × locale.
const DATA = {
  'complete-amalfi-coast': {
    matches: /(complete-amalfi-coast|komplette-amalfikueste|cote-amalfitaine-complete|costa-amalfitana-completa)/,
    'en-us': [
      { icon: 'duration',  label: 'Duration',  value: '4 days / 3 nights' },
      { icon: 'base',      label: 'Base',      value: 'Amalfi' },
      { icon: 'transport', label: 'Transport', value: 'SITA bus + ferries' },
      { icon: 'budget',    label: 'Budget',    value: '€400-700<br/><span class="text-xs">p.p.</span>' },
    ],
    'de-de': [
      { icon: 'duration',  label: 'Dauer',      value: '4 Tage / 3 Nächte' },
      { icon: 'base',      label: 'Basis',      value: 'Amalfi' },
      { icon: 'transport', label: 'Verkehr',    value: 'SITA Bus + Fähren' },
      { icon: 'budget',    label: 'Budget',     value: '€400-700<br/><span class="text-xs">p.P.</span>' },
    ],
    'fr-fr': [
      { icon: 'duration',  label: 'Durée',      value: '4 jours / 3 nuits' },
      { icon: 'base',      label: 'Base',       value: 'Amalfi' },
      { icon: 'transport', label: 'Transports', value: 'Bus SITA + ferries' },
      { icon: 'budget',    label: 'Budget',     value: '€400-700<br/><span class="text-xs">p.p.</span>' },
    ],
    'es-es': [
      { icon: 'duration',  label: 'Duración',    value: '4 días / 3 noches' },
      { icon: 'base',      label: 'Base',        value: 'Amalfi' },
      { icon: 'transport', label: 'Transporte',  value: 'Bus SITA + ferries' },
      { icon: 'budget',    label: 'Presupuesto', value: '€400-700<br/><span class="text-xs">p.p.</span>' },
    ],
  },
  'grand-tour-coast-peninsula': {
    matches: /(grand-tour-coast-peninsula|grand-tour-kueste-halbinsel|grand-tour-cote-peninsule|gran-tour-costa-peninsula)/,
    'en-us': [
      { icon: 'duration',  label: 'Duration',         value: '7 days<br/>6 nights' },
      { icon: 'base',      label: 'Bases',            value: 'Naples +<br/>Amalfi/Sorrento' },
      { icon: 'transport', label: 'Transport',        value: 'Train + bus<br/>+ hydrofoils' },
      { icon: 'budget',    label: 'Transport budget', value: '€80–120<br/><span class="text-xs">p.p.</span>' },
    ],
    'de-de': [
      { icon: 'duration',  label: 'Dauer',                value: '7 Tage<br/>6 Nächte' },
      { icon: 'base',      label: 'Standorte',            value: 'Neapel +<br/>Amalfi/Sorrent' },
      { icon: 'transport', label: 'Verkehr',              value: 'Zug + Bus<br/>+ Tragflügelboot' },
      { icon: 'budget',    label: 'Transportbudget',      value: '€80–120<br/><span class="text-xs">p.P.</span>' },
    ],
    'fr-fr': [
      { icon: 'duration',  label: 'Durée',                value: '7 jours<br/>6 nuits' },
      { icon: 'base',      label: 'Bases',                value: 'Naples +<br/>Amalfi/Sorrente' },
      { icon: 'transport', label: 'Transports',           value: 'Train + bus<br/>+ hydroglisseurs' },
      { icon: 'budget',    label: 'Budget transports',    value: '€80–120<br/><span class="text-xs">p.p.</span>' },
    ],
    'es-es': [
      { icon: 'duration',  label: 'Duración',             value: '7 días<br/>6 noches' },
      { icon: 'base',      label: 'Bases',                value: 'Nápoles +<br/>Amalfi/Sorrento' },
      { icon: 'transport', label: 'Transporte',           value: 'Tren + bus<br/>+ aliscafos' },
      { icon: 'budget',    label: 'Presupuesto trans.',   value: '€80–120<br/><span class="text-xs">p.p.</span>' },
    ],
  },
  'slow-travel-villages-food': {
    matches: /(slow-travel-villages-food|slow-travel-doerfer-kulinarik|slow-travel-villages-gastronomie|slow-travel-pueblos-gastronomia)/,
    'en-us': [
      { icon: 'duration', label: 'Duration', value: '7 days<br/>6 nights' },
      { icon: 'base',     label: 'Base',     value: 'Praiano or<br/>Amalfi' },
      { icon: 'season',   label: 'Season',   value: 'May–Oct<br/>(off: Nov–Apr)' },
      { icon: 'pace',     label: 'Pace',     value: 'Slow &<br/>authentic' },
    ],
    'de-de': [
      { icon: 'duration', label: 'Dauer',   value: '7 Tage<br/>6 Nächte' },
      { icon: 'base',     label: 'Basis',   value: 'Praiano oder<br/>Amalfi' },
      { icon: 'season',   label: 'Saison',  value: 'Mai–Okt<br/>(off: Nov–Apr)' },
      { icon: 'pace',     label: 'Tempo',   value: 'Langsam &<br/>authentisch' },
    ],
    'fr-fr': [
      { icon: 'duration', label: 'Durée',   value: '7 jours<br/>6 nuits' },
      { icon: 'base',     label: 'Base',    value: 'Praiano ou<br/>Amalfi' },
      { icon: 'season',   label: 'Saison',  value: 'Mai–Oct<br/>(off : Nov–Avr)' },
      { icon: 'pace',     label: 'Rythme',  value: 'Lent &<br/>authentique' },
    ],
    'es-es': [
      { icon: 'duration', label: 'Duración', value: '7 días<br/>6 noches' },
      { icon: 'base',     label: 'Base',     value: 'Praiano o<br/>Amalfi' },
      { icon: 'season',   label: 'Temporada',value: 'May–Oct<br/>(off: Nov–Abr)' },
      { icon: 'pace',     label: 'Ritmo',    value: 'Lento &<br/>auténtico' },
    ],
  },
};

const TARGETS = glob.sync('src/pages/{en-us,de-de,fr-fr,es-es}/{itineraries,reiserouten,itineraires,itinerarios}/{4-days,4-tage,4-jours,4-dias,7-days,7-tage,7-jours,7-dias}/*/index.astro');

function buildBoxes(cards) {
  return cards.map(c => `      <div class="bg-slate-900 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col items-center justify-center aspect-square snap-start">
        <svg class="w-8 h-8 text-med-gold mb-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          ${ICONS[c.icon]}
        </svg>
        <p class="text-xs text-white/60 font-semibold uppercase tracking-wide mb-2">${c.label}</p>
        <p class="font-serif text-lg font-semibold text-med-gold text-center">${c.value}</p>
      </div>`).join('\n');
}

function detectLang(file) {
  for (const l of ['en-us', 'de-de', 'fr-fr', 'es-es']) if (file.includes(`/pages/${l}/`)) return l;
  return null;
}
function detectItinerary(file) {
  for (const key of Object.keys(DATA)) if (DATA[key].matches.test(file)) return key;
  return null;
}

let ok = 0, skip = 0;
const lines = [];
for (const f of TARGETS) {
  const lang = detectLang(f);
  const itin = detectItinerary(f);
  if (!lang || !itin) { skip++; continue; }
  const src = fs.readFileSync(f, 'utf8');
  if (src.includes('<!-- Quick Stats Grid -->')) { skip++; lines.push(`SKIP already-has-grid: ${f}`); continue; }
  const cards = DATA[itin][lang];
  if (!cards) { skip++; lines.push(`SKIP no-cards: ${f}`); continue; }

  // Insert right after `<div class="max-w-editorial mx-auto … space-y-10">` opening line.
  const wrapMatch = src.match(/<div class="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 space-y-10">/);
  if (!wrapMatch) { skip++; lines.push(`SKIP no-wrapper: ${f}`); continue; }
  const insertAt = wrapMatch.index + wrapMatch[0].length;
  const block = `

    <!-- Quick Stats Grid -->
    <section class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 overflow-x-auto snap-x snap-mandatory sm:overflow-visible">
${buildBoxes(cards)}
    </section>
`;
  const next = src.slice(0, insertAt) + block + src.slice(insertAt);
  if (!DRY) fs.writeFileSync(f, next);
  ok++;
  lines.push(`OK ${lang} ${itin}: ${f}`);
}

console.log(`\nInfo boxes ${DRY ? '(DRY RUN)' : ''}: updated=${ok} skipped=${skip}`);
lines.forEach(l => console.log('  ' + l));
