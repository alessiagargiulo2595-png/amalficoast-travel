#!/usr/bin/env node
/* eslint-disable */
/**
 * Align the design of every itinerary detail page to the IT template:
 * - centered hero, intro paragraph
 * - timeline-style Day-by-day with optional `highlight` and "Local tip:" rows
 * - destinations grid, numbered Practical Tips
 * - large itinerary planner banner + final "Ready to go?" CTA
 *
 * Keeps the existing frontmatter (days, breadcrumbs, schemas, etc) — only
 * rewrites the body between <BaseLayout ...> and </BaseLayout>.
 *
 * Run with: node scripts/align-itinerary-design.cjs [--dry] [--only=lang]
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const DRY = process.argv.includes('--dry');
const ONLY = (process.argv.find(a => a.startsWith('--only=')) || '').split('=')[1];

const HUB = {
  'it-it': 'itinerari',
  'en-us': 'itineraries',
  'de-de': 'reiserouten',
  'fr-fr': 'itineraires',
  'es-es': 'itinerarios',
};

const T = {
  'en-us': {
    badgeFor: n => `Itinerary · ${n} day${n === 1 ? '' : 's'}`,
    dayByDay: 'Day-by-day programme',
    destinations: 'Itinerary destinations',
    discover: 'Discover',
    tips: 'Practical tips',
    faq: 'Frequently asked questions',
    bannerBadge: 'New: Custom Trip',
    bannerH2a: 'Design your',
    bannerH2b: 'ideal itinerary',
    bannerDesc: 'Answer a few simple questions - starting point, days and interests - and get a personalized itinerary with transport, costs and times.',
    bannerInd1: '30 seconds to set up',
    bannerInd2: 'Anti-crowd tips included',
    bannerCta: 'Configure Now',
    bannerHref: '/en-us/itinerary-planner/',
    ready: 'Ready to go?',
    readyDesc: 'Read the complete public transport guide for the Amalfi Coast: how to get there, schedules, tickets and saving strategies.',
    readyCta: 'Transport guide →',
    readyHref: '/en-us/guide/getting-here/',
  },
  'de-de': {
    badgeFor: n => `Reiseroute · ${n} Tag${n === 1 ? '' : 'e'}`,
    dayByDay: 'Programm Tag für Tag',
    destinations: 'Reiseziele der Route',
    discover: 'Entdecken',
    tips: 'Praktische Tipps',
    faq: 'Häufige Fragen',
    bannerBadge: 'Neu: Maßgeschneiderte Reise',
    bannerH2a: 'Gestalte deinen',
    bannerH2b: 'idealen Reiseplan',
    bannerDesc: 'Beantworte ein paar einfache Fragen - Startpunkt, Tage und Interessen - und erhalte einen personalisierten Reiseplan mit Transport, Kosten und Zeiten.',
    bannerInd1: '30 Sekunden zur Konfiguration',
    bannerInd2: 'Anti-Crowd-Tipps inklusive',
    bannerCta: 'Jetzt konfigurieren',
    bannerHref: '/de-de/reiserouten-planer/',
    ready: 'Bereit zur Abreise?',
    readyDesc: 'Lies den kompletten Reiseführer zu den öffentlichen Verkehrsmitteln der Amalfiküste: Anreise, Fahrpläne, Tickets und Spartipps.',
    readyCta: 'Transportführer →',
    readyHref: '/de-de/ratgeber/anreise/',
  },
  'fr-fr': {
    badgeFor: n => `Itinéraire · ${n} jour${n === 1 ? '' : 's'}`,
    dayByDay: 'Programme jour par jour',
    destinations: 'Destinations de l\'itinéraire',
    discover: 'Découvrir',
    tips: 'Conseils pratiques',
    faq: 'Questions fréquentes',
    bannerBadge: 'Nouveau : Voyage sur Mesure',
    bannerH2a: 'Concevez votre',
    bannerH2b: 'itinéraire idéal',
    bannerDesc: 'Répondez à quelques questions simples - point de départ, jours et intérêts - et recevez un itinéraire personnalisé avec transports, coûts et horaires.',
    bannerInd1: '30 secondes pour configurer',
    bannerInd2: 'Conseils anti-foule inclus',
    bannerCta: 'Configurer maintenant',
    bannerHref: '/fr-fr/planificateur-itineraire/',
    ready: 'Prêt à partir ?',
    readyDesc: 'Lisez le guide complet des transports publics de la Côte Amalfitaine : comment y aller, horaires, billets et astuces pour économiser.',
    readyCta: 'Guide des transports →',
    readyHref: '/fr-fr/guide/comment-venir/',
  },
  'es-es': {
    badgeFor: n => `Itinerario · ${n} día${n === 1 ? '' : 's'}`,
    dayByDay: 'Programa día a día',
    destinations: 'Destinos del itinerario',
    discover: 'Descubrir',
    tips: 'Consejos prácticos',
    faq: 'Preguntas frecuentes',
    bannerBadge: 'Novedad: Viaje a Medida',
    bannerH2a: 'Diseña tu',
    bannerH2b: 'itinerario ideal',
    bannerDesc: 'Responde a unas sencillas preguntas - punto de partida, días e intereses - y recibe un itinerario personalizado con transporte, costos y horarios.',
    bannerInd1: '30 segundos para configurar',
    bannerInd2: 'Consejos anti-multitud incluidos',
    bannerCta: 'Configurar Ahora',
    bannerHref: '/es-es/planificador-itinerario/',
    ready: '¿Listo para partir?',
    readyDesc: 'Lee la guía completa del transporte público en la Costa Amalfitana: cómo llegar, horarios, billetes y estrategias para ahorrar.',
    readyCta: 'Guía de transporte →',
    readyHref: '/es-es/guia/como-llegar/',
  },
};

function detectLang(file) {
  for (const lang of Object.keys(HUB)) if (file.includes(`/pages/${lang}/`)) return lang;
  return null;
}
function detectDayCount(file) {
  const m = file.match(/[\\/](\d+)-(?:day|days|giorno|giorni|tag|tage|jour|jours|dia|dias)[\\/]/);
  return m ? parseInt(m[1], 10) : 0;
}

// Find a balanced JSX tag span: from start index of <tag to corresponding </tag>.
function findBaseLayoutSpan(src) {
  const openMatch = src.match(/<BaseLayout\b/);
  if (!openMatch) return null;
  const openStart = openMatch.index;
  // find matching >
  let i = openStart;
  let inStr = null;
  let braceDepth = 0;
  while (i < src.length) {
    const c = src[i];
    if (inStr) {
      if (c === inStr) inStr = null;
    } else {
      if (c === '"' || c === '\'') inStr = c;
      else if (c === '{') braceDepth++;
      else if (c === '}') braceDepth--;
      else if (c === '>' && braceDepth === 0) break;
    }
    i++;
  }
  const openEnd = i;
  const closeIdx = src.indexOf('</BaseLayout>', openEnd);
  if (closeIdx < 0) return null;
  return { openStart, openEnd, closeStart: closeIdx, closeEnd: closeIdx + '</BaseLayout>'.length };
}

function extractFromExistingBody(body) {
  const altMatch = body.match(/<img[^>]*alt=["']([^"']+)["']/);
  const h1Match = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  // The first <p> after the <h1>
  let subtitle = '';
  if (h1Match) {
    const after = body.slice(h1Match.index + h1Match[0].length, h1Match.index + h1Match[0].length + 1500);
    const pMatch = after.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    if (pMatch) subtitle = pMatch[1].trim();
  }
  return {
    heroAlt: altMatch ? altMatch[1] : '',
    heroTitle: h1Match ? h1Match[1].trim() : '',
    heroSubtitle: subtitle,
  };
}

function ensureFrontmatterArrays(src) {
  // If destinationHighlights or planningTips don't exist, add empty arrays at end of frontmatter.
  const fmMatch = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return src;
  const body = fmMatch[1];
  const additions = [];
  if (!/const\s+destinationHighlights\s*=/.test(body)) {
    additions.push('const destinationHighlights = [];');
  }
  if (!/const\s+planningTips\s*=/.test(body)) {
    additions.push('const planningTips = [];');
  }
  if (!additions.length) return src;
  const newFm = body + '\n\n' + additions.join('\n');
  return src.slice(0, fmMatch.index) + '---\n' + newFm + '\n---' + src.slice(fmMatch.index + fmMatch[0].length);
}

function buildBody(lang, ctx) {
  const t = T[lang];
  const heroImage = ctx.heroImage || '/images/costiera-hero.jpg';
  const badge = t.badgeFor(ctx.dayCount);
  const heroAlt = ctx.heroAlt || ctx.heroTitle;
  return `

  <!-- Hero Section -->
  <section class="relative bg-charcoal overflow-hidden min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center">
    <img src="${heroImage}" alt="${heroAlt}" class="absolute inset-0 w-full h-full object-cover opacity-30" loading="eager" fetchpriority="high" decoding="sync" referrerpolicy="no-referrer"/>
    <div class="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/70"></div>
    <div class="relative max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="max-w-3xl mx-auto">
        <p class="text-med-gold text-xs sm:text-sm font-medium uppercase tracking-[0.3em] mb-3">${badge}</p>
        <h1 class="font-serif text-display text-white mb-4">${ctx.heroTitle}</h1>
        <p class="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
          ${ctx.heroSubtitle || ''}
        </p>
      </div>
    </div>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
  </section>

  <div class="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 space-y-10">

    <!-- Day by Day Itinerary -->
    <section>
      <h2 class="font-serif text-2xl font-semibold text-slate-900 mb-8">${t.dayByDay}</h2>
      <div class="space-y-6">
        {days.map((d) => (
          <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <div class="bg-slate-900 px-6 py-6 flex items-start gap-4 sm:items-center sm:gap-3">
              <span class="text-[10px] uppercase tracking-wide bg-white/15 text-white px-3 py-1.5 rounded-full font-bold flex-shrink-0">{d.day}</span>
              <div class="flex-1 min-w-0">
                <h3 class="font-serif font-semibold text-white text-lg">{d.title}</h3>
                {d.highlight && <p class="text-xs text-med-gold mt-1 font-medium">{d.highlight}</p>}
              </div>
            </div>
            <ul class="px-6 py-5 space-y-3">
              {d.items.map((item, itemIdx) => {
                const isLocalTip = item.includes('Local tip:');
                const displayText = item.replace('Local tip: ', '');
                const isLastItem = itemIdx === d.items.length - 1;
                return (
                  <li class={\`flex gap-3 text-sm relative \${isLocalTip ? 'bg-med-gold/10 p-3 rounded-lg border border-med-gold/20' : ''}\`}>
                    <div class="flex flex-col items-center">
                      {isLocalTip ? (
                        <svg class="w-5 h-5 text-med-gold flex-shrink-0 self-center" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                          <circle cx="12" cy="8" r="5"/>
                          <path d="M12 13v2"/>
                          <rect x="10" y="15" width="4" height="3" rx="0.5"/>
                        </svg>
                      ) : (
                        <span class="w-2 h-2 rounded-full bg-med-blue flex-shrink-0"></span>
                      )}
                      {!isLastItem && <div class="w-0.5 h-6 bg-med-blue/30 mt-1"></div>}
                    </div>
                    <span class={\`leading-relaxed \${isLocalTip ? 'font-semibold text-slate-800' : 'text-slate-700'}\`}>
                      {isLocalTip && <strong>Local tip: </strong>}
                      {displayText}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>

    {destinationHighlights.length > 0 && (
      <section>
        <h2 class="font-serif text-2xl font-semibold text-slate-900 mb-8">${t.destinations}</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinationHighlights.map((dest) => (
            <a href={dest.url} class="group block bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-med-blue/30 transition-all">
              <h3 class="font-semibold text-charcoal mb-2 group-hover:text-med-blue transition-colors">{dest.name}</h3>
              <p class="text-xs text-slate-500 leading-relaxed mb-3">{dest.desc}</p>
              <span class="text-xs font-semibold text-med-blue inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                ${t.discover} →
              </span>
            </a>
          ))}
        </div>
      </section>
    )}

    {planningTips.length > 0 && (
      <section class="bg-med-cream border border-med-gold/20 rounded-[2rem] p-6">
        <h2 class="font-serif text-xl font-semibold text-charcoal mb-6">${t.tips}</h2>
        <ul class="space-y-4">
          {planningTips.map(({ num, text }) => (
            <li class="flex items-start gap-4 text-sm text-charcoal">
              <span class="text-2xl font-bold text-white flex-shrink-0 leading-none mt-0.5 bg-[#E2725B] w-9 h-9 flex items-center justify-center rounded-full">{num}</span>
              <span class="leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </section>
    )}

    <!-- FAQ -->
    <section id="faq">
      <h2 class="font-serif text-2xl font-semibold text-slate-900 mb-6">${t.faq}</h2>
      <div class="space-y-4">
        {faqSchema.mainEntity.map((q) => (
          <details class="group border border-slate-200 rounded-2xl overflow-hidden">
            <summary class="flex items-center justify-between px-6 py-4 cursor-pointer select-none text-charcoal font-medium hover:bg-slate-50 transition-colors">
              {q.name}
              <svg class="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </summary>
            <div class="px-6 pb-5 text-slate-600 leading-relaxed text-sm border-t border-slate-100 pt-4">
              {q.acceptedAnswer.text}
            </div>
          </details>
        ))}
      </div>
    </section>

    <!-- Banner: Itinerary Planner -->
    <section class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 px-6 sm:px-10 md:px-14 py-10 md:py-14 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div class="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 grid md:grid-cols-[3fr_2fr] md:items-center gap-8">
        <div>
          <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-med-gold/15 text-med-gold border border-med-gold/25 mb-6">${t.bannerBadge}</span>
          <h2 class="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">${t.bannerH2a}</h2>
          <p class="font-serif text-3xl md:text-4xl italic text-med-blue mb-5">${t.bannerH2b}</p>
          <p class="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mb-8">${t.bannerDesc}</p>
          <div class="flex flex-wrap gap-6">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-med-gold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <span class="text-white/50 text-sm">${t.bannerInd1}</span>
            </div>
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-med-gold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"/></svg>
              </div>
              <span class="text-white/50 text-sm">${t.bannerInd2}</span>
            </div>
          </div>
        </div>
        <div class="mt-8 md:mt-0 md:flex md:justify-center">
          <a href="${t.bannerHref}" class="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-med-gold to-yellow-600 text-slate-900 font-bold rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2L2 12l4 0 0 6 4 0 0-4 4 0 0 4 4 0 0-6 4 0L12 2z"/></svg>
            ${t.bannerCta}
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-r from-med-blue to-med-blue/80 rounded-2xl p-10 text-center text-white">
      <h2 class="font-serif text-3xl font-bold mb-3">${t.ready}</h2>
      <p class="text-white/90 mb-6 max-w-2xl mx-auto">
        ${t.readyDesc}
      </p>
      <a href="${t.readyHref}" class="inline-block bg-white text-med-blue font-semibold px-8 py-3 rounded-full hover:bg-slate-100 transition-colors">
        ${t.readyCta}
      </a>
    </section>

  </div>

`;
}

const TARGETS = glob.sync(`src/pages/{en-us,de-de,fr-fr,es-es}/{itineraries,reiserouten,itineraires,itinerarios}/*/*/index.astro`);
let ok = 0, skip = 0;
const lines = [];
for (const f of TARGETS) {
  const lang = detectLang(f);
  if (!lang || lang === 'it-it') continue;
  if (ONLY && lang !== ONLY) continue;
  const dayCount = detectDayCount(f);
  const original = fs.readFileSync(f, 'utf8');
  const span = findBaseLayoutSpan(original);
  if (!span) { skip++; lines.push(`SKIP no-baselayout: ${f}`); continue; }
  const oldBody = original.slice(span.openEnd + 1, span.closeStart);
  const ctx = extractFromExistingBody(oldBody);
  const heroImageMatch = original.slice(span.openStart, span.openEnd + 1).match(/heroImage=["']([^"']+)["']/);
  ctx.heroImage = heroImageMatch ? heroImageMatch[1] : '/images/costiera-hero.jpg';
  ctx.dayCount = dayCount;
  if (!ctx.heroTitle) { skip++; lines.push(`SKIP no-h1: ${f}`); continue; }
  if (!/const\s+days\s*=\s*\[/.test(original)) { skip++; lines.push(`SKIP no-days (single-day schedule): ${f}`); continue; }

  let src = ensureFrontmatterArrays(original);
  const span2 = findBaseLayoutSpan(src);
  const newBody = buildBody(lang, ctx);
  const next = src.slice(0, span2.openEnd + 1) + newBody + src.slice(span2.closeStart);
  if (!DRY) fs.writeFileSync(f, next);
  ok++;
  lines.push(`OK ${lang} d=${dayCount}: ${f}`);
}

console.log(`\nItinerary design align ${DRY ? '(DRY RUN)' : ''}`);
console.log(`  updated: ${ok}`);
console.log(`  skipped: ${skip}`);
lines.forEach(l => console.log('  ' + l));
