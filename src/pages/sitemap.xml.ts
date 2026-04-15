import type { APIRoute } from 'astro';

const BASE = 'https://amalficoast-travel.com';
const TODAY = new Date().toISOString().split('T')[0];

const urls: { loc: string; priority: string; changefreq: string }[] = [
  // Home — tutte le lingue
  { loc: '/it-it/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/en-us/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/de-de/', priority: '0.9', changefreq: 'weekly' },
  { loc: '/fr-fr/', priority: '0.9', changefreq: 'weekly' },
  { loc: '/es-es/', priority: '0.9', changefreq: 'weekly' },

  // Hub principali — en-us
  { loc: '/en-us/destinations/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/en-us/beaches/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/en-us/itineraries/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/en-us/getting-here/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/when-to-visit/', priority: '0.7', changefreq: 'yearly' },

  // Hub principali — de-de
  { loc: '/de-de/destinations/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/strande/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/reiserouten/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/anreise/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/reisezeit/', priority: '0.7', changefreq: 'yearly' },

  // Hub principali — fr-fr
  { loc: '/fr-fr/destinations/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/plages/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/itineraires/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/comment-venir/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/quand-visiter/', priority: '0.7', changefreq: 'yearly' },

  // Hub principali — es-es
  { loc: '/es-es/destinos/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/playas/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/itinerarios/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/como-llegar/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/cuando-visitar/', priority: '0.7', changefreq: 'yearly' },

  // Hub principali
  { loc: '/it-it/costiera-amalfitana/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/it-it/penisola-sorrentina/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/it-it/isole/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/it-it/spiagge/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/it-it/itinerari/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/it-it/destinazioni/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/it-it/quando-visitare/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/come-arrivare/', priority: '0.7', changefreq: 'yearly' },

  // Costiera Amalfitana
  { loc: '/it-it/costiera-amalfitana/positano/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/it-it/costiera-amalfitana/amalfi/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/it-it/costiera-amalfitana/ravello/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/it-it/costiera-amalfitana/praiano/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/it-it/costiera-amalfitana/maiori/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/costiera-amalfitana/minori/', priority: '0.7', changefreq: 'monthly' },

  // Penisola Sorrentina
  { loc: '/it-it/penisola-sorrentina/sorrento/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/it-it/penisola-sorrentina/massa-lubrense/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/penisola-sorrentina/vico-equense/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/penisola-sorrentina/sant-agnello/', priority: '0.7', changefreq: 'monthly' },

  // Isole
  { loc: '/it-it/isole/capri/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/it-it/isole/ischia/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/it-it/isole/procida/', priority: '0.8', changefreq: 'monthly' },

  // Spiagge — Costiera
  { loc: '/it-it/spiagge/costiera-amalfitana/fiordo-di-furore/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/it-it/spiagge/costiera-amalfitana/spiaggia-grande-positano/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/it-it/spiagge/costiera-amalfitana/santa-croce-amalfi/', priority: '0.7', changefreq: 'yearly' },

  // Spiagge — Penisola
  { loc: '/it-it/spiagge/penisola-sorrentina/regina-giovanna/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/spiagge/penisola-sorrentina/marina-del-cantone/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/spiagge/penisola-sorrentina/cala-mitigliano/', priority: '0.7', changefreq: 'yearly' },

  // Spiagge — Isole
  { loc: '/it-it/spiagge/isole/marina-piccola-capri/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/spiagge/isole/spiaggia-maronti/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/spiagge/isole/cala-del-pozzo-vecchio/', priority: '0.7', changefreq: 'yearly' },

  // Itinerari
  { loc: '/it-it/itinerari/1-giorno/costiera-amalfitana-da-napoli/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/itinerari/1-giorno/costiera-amalfitana-da-salerno/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/itinerari/1-giorno/penisola-sorrentina-da-napoli/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/itinerari/1-giorno/trekking-sentiero-degli-dei/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/itinerari/1-giorno/capri-da-sorrento/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/itinerari/3-giorni/classico-costiera-amalfitana/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/itinerari/3-giorni/sorrento-pompei-storia/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/itinerari/3-giorni/isole-ischia-procida/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/itinerari/7-giorni/grand-tour-costiera-penisola/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/itinerari/7-giorni/slow-travel-borghi-cibo/', priority: '0.7', changefreq: 'yearly' },

  // Guida pratica
  { loc: '/it-it/guida/traghetti/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/guida/bus-sita/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/guida/parcheggi-ztl/', priority: '0.7', changefreq: 'monthly' },

  // Esperienze
  { loc: '/it-it/esperienze/trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/esperienze/tour-barca/', priority: '0.7', changefreq: 'yearly' },

  // Eventi — Costiera Amalfitana
  { loc: '/it-it/eventi/costiera-amalfitana/ravello-festival/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/festa-sant-andrea-amalfi/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/fuochi-ferragosto-positano-maiori/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/luminaria-san-domenico-praiano/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/festa-san-gennaro-praiano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/notte-blu-vietri/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/sagra-del-pesce-positano/', priority: '0.6', changefreq: 'yearly' },

  // Eventi — Penisola Sorrentina
  { loc: '/it-it/eventi/penisola-sorrentina/sagra-limone-massa-lubrense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/penisola-sorrentina/sagra-melanzana-preazzano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/penisola-sorrentina/gustamincanto-vico-equense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/penisola-sorrentina/madonna-della-libera/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/penisola-sorrentina/sorrento-meeting-cultura/', priority: '0.6', changefreq: 'yearly' },

  // Eventi — Isole
  { loc: '/it-it/eventi/isole/ischia-global-film-festival/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/isole/sagra-del-mare-graziella-procida/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/isole/anacapri-settembre-borgo/', priority: '0.6', changefreq: 'yearly' },
];

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE}${u.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
