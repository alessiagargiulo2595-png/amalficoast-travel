import type { APIRoute } from 'astro';

const BASE = 'https://amalficoast-travel.com';
const TODAY = new Date().toISOString().split('T')[0];

const urls: { loc: string; priority: string; changefreq: string }[] = [
  // Home - tutte le lingue
  { loc: '/it-it/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/en-us/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/de-de/', priority: '0.9', changefreq: 'weekly' },
  { loc: '/fr-fr/', priority: '0.9', changefreq: 'weekly' },
  { loc: '/es-es/', priority: '0.9', changefreq: 'weekly' },

  // Hub principali - en-us
  { loc: '/en-us/destinations/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/en-us/beaches/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/en-us/itineraries/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/en-us/getting-here/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/when-to-visit/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/isole/', priority: '0.9', changefreq: 'monthly' },

  // Islands - en-us
  { loc: '/en-us/isole/capri/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/isole/ischia/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/isole/procida/', priority: '0.8', changefreq: 'monthly' },

  // Amalfi Coast - en-us
  { loc: '/en-us/amalfi-coast/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/en-us/amalfi-coast/positano/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/amalfi-coast/amalfi/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/amalfi-coast/ravello/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/amalfi-coast/praiano/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/amalfi-coast/maiori/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/amalfi-coast/minori/', priority: '0.7', changefreq: 'monthly' },

  // Guida pratica - en-us
  { loc: '/en-us/guide/ferries/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/guide/sita-bus/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/guide/parking-ztl/', priority: '0.7', changefreq: 'monthly' },

  // Hub principali - de-de
  { loc: '/de-de/destinations/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/strande/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/reiserouten/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/anreise/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/reisezeit/', priority: '0.7', changefreq: 'yearly' },

  // Inseln - de-de
  { loc: '/de-de/inseln/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/de-de/inseln/capri/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/inseln/ischia/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/inseln/procida/', priority: '0.8', changefreq: 'monthly' },

  // Ratgeber - de-de
  { loc: '/de-de/ratgeber/faehren/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/ratgeber/sita-bus/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/ratgeber/parken-ztl/', priority: '0.7', changefreq: 'monthly' },

  // Amalfiküste - de-de
  { loc: '/de-de/amalfikueste/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/de-de/amalfikueste/positano/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/amalfikueste/amalfi/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/amalfikueste/ravello/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/amalfikueste/praiano/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/amalfikueste/maiori/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/amalfikueste/minori/', priority: '0.7', changefreq: 'monthly' },

  // Hub principali - fr-fr
  { loc: '/fr-fr/destinations/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/plages/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/itineraires/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/comment-venir/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/quand-visiter/', priority: '0.7', changefreq: 'yearly' },

  // Îles - fr-fr
  { loc: '/fr-fr/iles/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/fr-fr/iles/capri/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/iles/ischia/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/iles/procida/', priority: '0.8', changefreq: 'monthly' },

  // Guide pratique - fr-fr
  { loc: '/fr-fr/guide/ferries/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/guide/bus-sita/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/guide/parking-ztl/', priority: '0.7', changefreq: 'monthly' },

  // Côte Amalfitaine - fr-fr
  { loc: '/fr-fr/cote-amalfitaine/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/fr-fr/cote-amalfitaine/positano/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/cote-amalfitaine/amalfi/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/cote-amalfitaine/ravello/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/cote-amalfitaine/praiano/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/cote-amalfitaine/maiori/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/cote-amalfitaine/minori/', priority: '0.7', changefreq: 'monthly' },

  // Hub principali - es-es
  { loc: '/es-es/destinos/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/playas/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/itinerarios/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/como-llegar/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/cuando-visitar/', priority: '0.7', changefreq: 'yearly' },

  // Islas - es-es
  { loc: '/es-es/islas/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/es-es/islas/capri/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/islas/ischia/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/islas/procida/', priority: '0.8', changefreq: 'monthly' },

  // Guía práctica - es-es
  { loc: '/es-es/guia/ferries/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/guia/bus-sita/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/guia/aparcamiento-ztl/', priority: '0.7', changefreq: 'monthly' },

  // Costa Amalfitana - es-es
  { loc: '/es-es/costa-amalfitana/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/es-es/costa-amalfitana/positano/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/costa-amalfitana/amalfi/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/costa-amalfitana/ravello/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/costa-amalfitana/praiano/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/costa-amalfitana/maiori/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/costa-amalfitana/minori/', priority: '0.7', changefreq: 'monthly' },

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

  // Spiagge - Costiera
  { loc: '/it-it/spiagge/costiera-amalfitana/fiordo-di-furore/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/it-it/spiagge/costiera-amalfitana/spiaggia-grande-positano/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/it-it/spiagge/costiera-amalfitana/santa-croce-amalfi/', priority: '0.7', changefreq: 'yearly' },

  // Spiagge - Penisola
  { loc: '/it-it/spiagge/penisola-sorrentina/regina-giovanna/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/spiagge/penisola-sorrentina/marina-del-cantone/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/spiagge/penisola-sorrentina/cala-mitigliano/', priority: '0.7', changefreq: 'yearly' },

  // Spiagge - Isole
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

  // Itinerari - en-us (Wave 1)
  { loc: '/en-us/itineraries/1-day/amalfi-coast-from-naples/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/en-us/itineraries/1-day/amalfi-coast-from-salerno/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/en-us/itineraries/1-day/capri-from-sorrento/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/en-us/itineraries/1-day/sorrentine-peninsula-from-naples/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/itineraries/1-day/path-of-the-gods-trek/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/itineraries/3-days/classic-amalfi-coast/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/en-us/itineraries/3-days/islands-ischia-procida/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/itineraries/3-days/sorrento-pompeii-history/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/itineraries/7-days/grand-tour-coast-peninsula/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/itineraries/7-days/slow-travel-villages-food/', priority: '0.7', changefreq: 'yearly' },

  // Itinerari - de-de (Wave 1)
  { loc: '/de-de/reiserouten/1-tag/amalfikueste-von-neapel/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/de-de/reiserouten/1-tag/amalfikueste-von-salerno/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/de-de/reiserouten/1-tag/capri-von-sorrent/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/de-de/reiserouten/1-tag/sorrentinische-halbinsel-von-neapel/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/reiserouten/1-tag/weg-der-goetter-trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/reiserouten/3-tage/klassische-amalfikueste/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/de-de/reiserouten/3-tage/inseln-ischia-procida/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/reiserouten/3-tage/sorrent-pompeji-geschichte/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/reiserouten/7-tage/grand-tour-kueste-halbinsel/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/reiserouten/7-tage/slow-travel-doerfer-kulinarik/', priority: '0.7', changefreq: 'yearly' },

  // Itinéraires - fr-fr (Wave 1)
  { loc: '/fr-fr/itineraires/1-jour/cote-amalfitaine-depuis-naples/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/fr-fr/itineraires/1-jour/cote-amalfitaine-depuis-salerne/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/fr-fr/itineraires/1-jour/capri-depuis-sorrente/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/fr-fr/itineraires/1-jour/peninsule-sorrentine-depuis-naples/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/itineraires/1-jour/sentier-des-dieux-trek/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/itineraires/3-jours/cote-amalfitaine-classique/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/fr-fr/itineraires/3-jours/iles-ischia-procida/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/itineraires/3-jours/sorrente-pompei-histoire/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/itineraires/7-jours/grand-tour-cote-peninsule/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/itineraires/7-jours/slow-travel-villages-gastronomie/', priority: '0.7', changefreq: 'yearly' },

  // Itinerarios - es-es (Wave 1)
  { loc: '/es-es/itinerarios/1-dia/costa-amalfitana-desde-napoles/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/es-es/itinerarios/1-dia/costa-amalfitana-desde-salerno/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/es-es/itinerarios/1-dia/capri-desde-sorrento/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/es-es/itinerarios/1-dia/peninsula-sorrentina-desde-napoles/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/itinerarios/1-dia/sendero-de-los-dioses-trek/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/itinerarios/3-dias/costa-amalfitana-clasica/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/es-es/itinerarios/3-dias/islas-ischia-procida/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/itinerarios/3-dias/sorrento-pompeya-historia/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/itinerarios/7-dias/gran-tour-costa-peninsula/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/itinerarios/7-dias/slow-travel-pueblos-gastronomia/', priority: '0.7', changefreq: 'yearly' },

  // Sorrento Peninsula - en-us
  { loc: '/en-us/sorrento-peninsula/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/en-us/sorrento-peninsula/sorrento/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/sorrento-peninsula/vico-equense/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/sorrento-peninsula/massa-lubrense/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/sorrento-peninsula/sant-agnello/', priority: '0.7', changefreq: 'monthly' },

  // Sorrentinische Halbinsel - de-de
  { loc: '/de-de/sorrentinische-halbinsel/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/de-de/sorrentinische-halbinsel/sorrent/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/sorrentinische-halbinsel/vico-equense/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/sorrentinische-halbinsel/massa-lubrense/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/sorrentinische-halbinsel/sant-agnello/', priority: '0.7', changefreq: 'monthly' },

  // Péninsule Sorrentine - fr-fr
  { loc: '/fr-fr/peninsule-sorrentine/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/fr-fr/peninsule-sorrentine/sorrente/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/peninsule-sorrentine/vico-equense/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/peninsule-sorrentine/massa-lubrense/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/peninsule-sorrentine/sant-agnello/', priority: '0.7', changefreq: 'monthly' },

  // Península Sorrentina - es-es
  { loc: '/es-es/peninsula-sorrentina/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/es-es/peninsula-sorrentina/sorrento/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/peninsula-sorrentina/vico-equense/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/peninsula-sorrentina/massa-lubrense/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/peninsula-sorrentina/sant-agnello/', priority: '0.7', changefreq: 'monthly' },

  // Guida pratica
  { loc: '/it-it/guida/traghetti/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/guida/bus-sita/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/guida/parcheggi-ztl/', priority: '0.7', changefreq: 'monthly' },

  // Esperienze - it-it
  { loc: '/it-it/esperienze/trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/esperienze/tour-barca/', priority: '0.7', changefreq: 'yearly' },

  // Experiences - en-us
  { loc: '/en-us/experiences/trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/experiences/boat-tours/', priority: '0.7', changefreq: 'yearly' },

  // Erlebnisse - de-de
  { loc: '/de-de/erlebnisse/trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/erlebnisse/bootstouren/', priority: '0.7', changefreq: 'yearly' },

  // Expériences - fr-fr
  { loc: '/fr-fr/experiences/trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/experiences/tours-en-bateau/', priority: '0.7', changefreq: 'yearly' },

  // Experiencias - es-es
  { loc: '/es-es/experiencias/trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/experiencias/tours-en-barco/', priority: '0.7', changefreq: 'yearly' },

  // Eventi - Costiera Amalfitana
  { loc: '/it-it/eventi/costiera-amalfitana/ravello-festival/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/festa-sant-andrea-amalfi/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/fuochi-ferragosto-positano-maiori/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/luminaria-san-domenico-praiano/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/festa-san-gennaro-praiano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/notte-blu-vietri/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/costiera-amalfitana/sagra-del-pesce-positano/', priority: '0.6', changefreq: 'yearly' },

  // Eventi - Penisola Sorrentina
  { loc: '/it-it/eventi/penisola-sorrentina/sagra-limone-massa-lubrense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/penisola-sorrentina/sagra-melanzana-preazzano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/penisola-sorrentina/gustamincanto-vico-equense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/penisola-sorrentina/madonna-della-libera/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/it-it/eventi/penisola-sorrentina/sorrento-meeting-cultura/', priority: '0.6', changefreq: 'yearly' },

  // Eventi - Isole
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
