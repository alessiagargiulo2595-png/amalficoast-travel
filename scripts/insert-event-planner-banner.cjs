#!/usr/bin/env node
/* eslint-disable */
/**
 * Insert the itinerary planner banner just before the "Related Events"
 * section on every event detail page (100 pages: 20 events × 5 locales).
 *
 * Run with: node scripts/insert-event-planner-banner.cjs [--dry]
 */
const fs = require('fs');
const glob = require('glob');

const DRY = process.argv.includes('--dry');

const LOCALES = ['it-it', 'en-us', 'de-de', 'fr-fr', 'es-es'];

const HUB_BY_LOCALE = {
  'it-it': { dir: 'eventi',         markers: ['<!-- Eventi Correlati -->'] },
  'en-us': { dir: 'events',         markers: ['<!-- Related Events -->', '<!-- Recommended Events -->'] },
  'de-de': { dir: 'veranstaltungen', markers: ['<!-- Zugehörige Veranstaltungen -->'] },
  'fr-fr': { dir: 'evenements',     markers: ['<!-- Événements Connexes -->'] },
  'es-es': { dir: 'eventos',        markers: ['<!-- Eventos Relacionados -->', '<!-- Eventos Correlados -->'] },
};

const BANNER_BY_LOCALE = {
  'it-it': {
    badge: 'Novità: Viaggio su Misura',
    h2: 'Disegna il tuo',
    italic: 'itinerario ideale',
    desc: 'Rispondi a poche semplici domande - punto di partenza, giorni e interessi - e ricevi un itinerario personalizzato con trasporti, costi e orari.',
    ind1: '30 secondi per configurare',
    ind2: 'Consigli anti-folla inclusi',
    cta: 'Configura Ora',
    href: '/it-it/configuratore-itinerario/',
  },
  'en-us': {
    badge: 'New: Custom Trip',
    h2: 'Design your',
    italic: 'ideal itinerary',
    desc: 'Answer a few simple questions - starting point, days and interests - and get a personalized itinerary with transport, costs and times.',
    ind1: '30 seconds to set up',
    ind2: 'Anti-crowd tips included',
    cta: 'Configure Now',
    href: '/en-us/itinerary-planner/',
  },
  'de-de': {
    badge: 'Neu: Maßgeschneiderte Reise',
    h2: 'Gestalte deinen',
    italic: 'idealen Reiseplan',
    desc: 'Beantworte ein paar einfache Fragen - Startpunkt, Tage und Interessen - und erhalte einen personalisierten Reiseplan mit Transport, Kosten und Zeiten.',
    ind1: '30 Sekunden zur Konfiguration',
    ind2: 'Anti-Crowd-Tipps inklusive',
    cta: 'Jetzt konfigurieren',
    href: '/de-de/reiserouten-planer/',
  },
  'fr-fr': {
    badge: 'Nouveau : Voyage sur Mesure',
    h2: 'Concevez votre',
    italic: 'itinéraire idéal',
    desc: 'Répondez à quelques questions simples - point de départ, jours et intérêts - et recevez un itinéraire personnalisé avec transports, coûts et horaires.',
    ind1: '30 secondes pour configurer',
    ind2: 'Conseils anti-foule inclus',
    cta: 'Configurer maintenant',
    href: '/fr-fr/planificateur-itineraire/',
  },
  'es-es': {
    badge: 'Novedad: Viaje a Medida',
    h2: 'Diseña tu',
    italic: 'itinerario ideal',
    desc: 'Responde a unas sencillas preguntas - punto de partida, días e intereses - y recibe un itinerario personalizado con transporte, costos y horarios.',
    ind1: '30 segundos para configurar',
    ind2: 'Consejos anti-multitud incluidos',
    cta: 'Configurar Ahora',
    href: '/es-es/planificador-itinerario/',
  },
};

function buildBanner(lang) {
  const t = BANNER_BY_LOCALE[lang];
  return `  <!-- BANNER: Itinerary Planner -->
  <section class="py-10 md:py-14 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 px-6 sm:px-10 md:px-14 py-10 md:py-14 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div class="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 grid md:grid-cols-[3fr_2fr] md:items-center gap-8">
          <div>
            <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-med-gold/15 text-med-gold border border-med-gold/25 mb-6">${t.badge}</span>
            <h2 class="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">${t.h2}</h2>
            <p class="font-serif text-3xl md:text-4xl italic text-med-blue mb-5">${t.italic}</p>
            <p class="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              ${t.desc}
            </p>
            <div class="flex flex-wrap gap-6">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-med-gold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <span class="text-white/50 text-sm">${t.ind1}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-med-gold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"/></svg>
                </div>
                <span class="text-white/50 text-sm">${t.ind2}</span>
              </div>
            </div>
          </div>
          <div class="mt-8 md:mt-0 md:flex md:justify-center">
            <a href="${t.href}" class="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-med-gold to-yellow-600 text-slate-900 font-bold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2L2 12l4 0 0 6 4 0 0-4 4 0 0 4 4 0 0-6 4 0L12 2z"/></svg>
              ${t.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

`;
}

let totalChanges = 0;
const summary = [];

for (const lang of LOCALES) {
  const { dir, markers } = HUB_BY_LOCALE[lang];
  const pages = glob.sync(`src/pages/${lang}/${dir}/*/*/index.astro`);
  for (const f of pages) {
    const src = fs.readFileSync(f, 'utf8');
    if (src.includes('<!-- BANNER: Itinerary Planner -->')) continue; // already inserted
    const marker = markers.find(m => src.includes(m));
    if (!marker) {
      summary.push(`SKIP no-marker: ${f}`);
      continue;
    }
    const banner = buildBanner(lang);
    const next = src.replace(marker, banner + '  ' + marker);
    if (!DRY) fs.writeFileSync(f, next);
    totalChanges++;
    summary.push(`OK ${f}`);
  }
}

console.log(`\nInsert planner banner ${DRY ? '(DRY RUN)' : ''}`);
console.log(`  pages updated: ${totalChanges}`);
const skipped = summary.filter(s => s.startsWith('SKIP'));
if (skipped.length) {
  console.log(`\nSkipped (${skipped.length}):`);
  skipped.forEach(s => console.log('  ' + s));
}
