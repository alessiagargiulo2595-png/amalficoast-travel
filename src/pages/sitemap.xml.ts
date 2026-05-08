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

  // Blog - it-it
  { loc: '/it-it/blog/', priority: '0.8', changefreq: 'weekly' },
  { loc: '/it-it/blog/grotta-dello-smeraldo/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/blog/alici-di-cetara/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/blog/valle-delle-ferriere/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/blog/delizia-al-limone/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/blog/atrani/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/blog/vini-costa-amalfi/', priority: '0.7', changefreq: 'monthly' },

  // Esperienze - it-it
  { loc: '/it-it/esperienze/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/it-it/esperienze/trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/esperienze/tour-barca/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/esperienze/mozzarella-experience/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/esperienze/limoncello-tour/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/esperienze/matrimoni/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/esperienze/cooking-class/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/esperienze/ristoranti-stellati/', priority: '0.7', changefreq: 'yearly' },

  // Beaches individual - en-us
  { loc: '/en-us/beaches/amalfi-coast/fiordo-di-furore/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/en-us/beaches/amalfi-coast/spiaggia-grande-positano/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/en-us/beaches/amalfi-coast/santa-croce-amalfi/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/beaches/sorrentine-peninsula/regina-giovanna/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/beaches/sorrentine-peninsula/marina-del-cantone/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/beaches/sorrentine-peninsula/cala-mitigliano/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/beaches/islands/marina-piccola-capri/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/beaches/islands/spiaggia-maronti/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/beaches/islands/cala-del-pozzo-vecchio/', priority: '0.7', changefreq: 'yearly' },

  // Experiences - en-us
  { loc: '/en-us/experiences/trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/experiences/boat-tours/', priority: '0.7', changefreq: 'yearly' },

  // Erlebnisse - de-de
  { loc: '/de-de/erlebnisse/trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/erlebnisse/bootstouren/', priority: '0.7', changefreq: 'yearly' },

  // Plages individuelles - fr-fr
  { loc: '/fr-fr/plages/cote-amalfitaine/fiordo-di-furore/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/fr-fr/plages/cote-amalfitaine/spiaggia-grande-positano/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/fr-fr/plages/cote-amalfitaine/santa-croce-amalfi/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/plages/peninsule-sorrentine/regina-giovanna/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/plages/peninsule-sorrentine/marina-del-cantone/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/plages/peninsule-sorrentine/cala-mitigliano/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/plages/iles/marina-piccola-capri/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/plages/iles/spiaggia-maronti/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/plages/iles/cala-del-pozzo-vecchio/', priority: '0.7', changefreq: 'yearly' },

  // Expériences - fr-fr
  { loc: '/fr-fr/experiences/trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/experiences/tours-en-bateau/', priority: '0.7', changefreq: 'yearly' },

  // Experiencias - es-es
  { loc: '/es-es/experiencias/trekking/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/experiencias/tours-en-barco/', priority: '0.7', changefreq: 'yearly' },

  // Playas individuales - es-es
  { loc: '/es-es/playas/costa-amalfitana/fiordo-di-furore/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/es-es/playas/costa-amalfitana/spiaggia-grande-positano/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/es-es/playas/costa-amalfitana/santa-croce-amalfi/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/playas/peninsula-sorrentina/regina-giovanna/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/playas/peninsula-sorrentina/marina-del-cantone/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/playas/peninsula-sorrentina/cala-mitigliano/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/playas/islas/marina-piccola-capri/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/playas/islas/spiaggia-maronti/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/playas/islas/cala-del-pozzo-vecchio/', priority: '0.7', changefreq: 'yearly' },

  // Strände individuell - de-de
  { loc: '/de-de/strande/amalfikueste/fiordo-di-furore/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/de-de/strande/amalfikueste/spiaggia-grande-positano/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/de-de/strande/amalfikueste/santa-croce-amalfi/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/strande/sorrentiner-halbinsel/regina-giovanna/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/strande/sorrentiner-halbinsel/marina-del-cantone/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/strande/sorrentiner-halbinsel/cala-mitigliano/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/strande/inseln/marina-piccola-capri/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/strande/inseln/spiaggia-maronti/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/strande/inseln/cala-del-pozzo-vecchio/', priority: '0.7', changefreq: 'yearly' },

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

  // Blog - en-us
  { loc: '/en-us/blog/', priority: '0.8', changefreq: 'weekly' },
  { loc: '/en-us/blog/atrani/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/blog/lemon-delight/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/blog/ferriere-valley/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/blog/emerald-grotto/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/blog/cetara-anchovies/', priority: '0.7', changefreq: 'monthly' },

  // Blog - de-de
  { loc: '/de-de/blog/', priority: '0.8', changefreq: 'weekly' },
  { loc: '/de-de/blog/ferriere-tal/', priority: '0.7', changefreq: 'monthly' },

  // Events - en-us
  { loc: '/en-us/events/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/events/amalfi-coast/notte-blu-vietri/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/amalfi-coast/sagra-del-pesce-positano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/islands/anacapri-settembre-borgo/', priority: '0.6', changefreq: 'yearly' },

  // Events - de-de
  { loc: '/de-de/veranstaltungen/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/veranstaltungen/amalfikueste/notte-blu-vietri/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/amalfikueste/sagra-del-pesce-positano/', priority: '0.6', changefreq: 'yearly' },

  // Events - es-es
  { loc: '/es-es/eventos/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/eventos/islas/anacapri-settembre-borgo/', priority: '0.6', changefreq: 'yearly' },

  // Events - fr-fr
  { loc: '/fr-fr/evenements/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/evenements/iles/anacapri-settembre-borgo/', priority: '0.6', changefreq: 'yearly' },

  // Experiences hub pages
  { loc: '/en-us/experiences/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/experiences/cooking-class/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/erlebnisse/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/de-de/erlebnisse/mozzarella-erlebnis/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/experiencias/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/es-es/experiencias/clase-cocina/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/experiences/', priority: '0.8', changefreq: 'monthly' },

  // Additional guide pages
  { loc: '/en-us/guide/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/guide/when-to-visit/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/ratgeber/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/fr-fr/guide/', priority: '0.8', changefreq: 'monthly' },

  // Beaches hub pages
  { loc: '/en-us/beaches/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/en-us/beaches/amalfi-coast/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/beaches/islands/', priority: '0.8', changefreq: 'monthly' },

  // Additional individual beach pages
  { loc: '/en-us/beaches/amalfi-coast/marina-di-praia/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/beaches/sorrentine-peninsula/cala-mitigliano/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/beaches/sorrentine-peninsula/marina-del-cantone/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/beaches/islands/marina-piccola-capri/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/beaches/islands/faraglioni-capri/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/beaches/islands/spiaggia-maronti/', priority: '0.7', changefreq: 'yearly' },

  // Additional destination pages
  { loc: '/en-us/islands/', priority: '0.9', changefreq: 'monthly' },
  { loc: '/en-us/islands/capri/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/islands/ischia/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/en-us/islands/procida/', priority: '0.8', changefreq: 'monthly' },

  // Additional Amalfi Coast pages - en-us
  { loc: '/en-us/amalfi-coast/vietri-sul-mare/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/amalfi-coast/marina-di-praia/', priority: '0.7', changefreq: 'yearly' },

  // Additional beaches - en-us
  { loc: '/en-us/beaches/sorrentine-peninsula/spiaggia-di-ieranto/', priority: '0.7', changefreq: 'yearly' },

  // Experiences - en-us
  { loc: '/en-us/experiences/mozzarella-experience/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/experiences/limoncello-tour/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/experiences/starred-restaurants/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/en-us/experiences/weddings/', priority: '0.7', changefreq: 'yearly' },

  // Events - Amalfi Coast - en-us
  { loc: '/en-us/events/amalfi-coast/capodanno-bizantino/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/amalfi-coast/festa-sant-andrea-amalfi/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/amalfi-coast/festa-san-gennaro-praiano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/amalfi-coast/luminaria-san-domenico-praiano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/amalfi-coast/positano-mare-sole-cultura/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/amalfi-coast/festival-limone-minori/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/amalfi-coast/fuochi-ferragosto-positano-maiori/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/amalfi-coast/ravello-festival/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/amalfi-coast/regata-storica-amalfi/', priority: '0.6', changefreq: 'yearly' },

  // Events - Sorrentine Peninsula - en-us
  { loc: '/en-us/events/sorrentine-peninsula/festa-sant-antonino/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/sorrentine-peninsula/gustamincanto-vico-equense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/sorrentine-peninsula/madonna-della-libera/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/sorrentine-peninsula/sagra-limone-massa-lubrense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/sorrentine-peninsula/sagra-melanzana-preazzano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/sorrentine-peninsula/sorrento-meeting-cultura/', priority: '0.6', changefreq: 'yearly' },

  // Events - Islands - en-us
  { loc: '/en-us/events/islands/ischia-global-film-festival/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/en-us/events/islands/sagra-del-mare-graziella-procida/', priority: '0.6', changefreq: 'yearly' },

  // Blog - en-us additional
  { loc: '/en-us/blog/sorrento-vs-praiano/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/blog/amalfi-coast-wines/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/blog/sunset-beaches/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/blog/comfortable-beaches/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/en-us/blog/wild-remote-beaches/', priority: '0.7', changefreq: 'monthly' },

  // Planning - en-us
  { loc: '/en-us/planning/', priority: '0.8', changefreq: 'monthly' },

  // Guide - en-us additional
  { loc: '/en-us/guide/getting-here/', priority: '0.7', changefreq: 'yearly' },

  // Events hub - it-it
  { loc: '/it-it/eventi/', priority: '0.8', changefreq: 'monthly' },

  // Guide - it-it additional
  { loc: '/it-it/guida/come-arrivare/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/it-it/guida/quando-visitare/', priority: '0.7', changefreq: 'yearly' },

  // Beaches - it-it additional
  { loc: '/it-it/penisola-sorrentina/spiaggia-di-ieranto/', priority: '0.7', changefreq: 'yearly' },

  // Amalfi Coast additional - it-it
  { loc: '/it-it/costiera-amalfitana/vietri-sul-mare/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/costiera-amalfitana/marina-di-praia/', priority: '0.7', changefreq: 'yearly' },

  // Blog - it-it additional
  { loc: '/it-it/blog/sorrento-vs-praiano/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/blog/spiagge-comode-attrezzate/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/blog/oasi-selvagge-spiagge-mare/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/it-it/blog/tramonto-spiaggia-costiera/', priority: '0.7', changefreq: 'monthly' },

  // Blog - de-de additional
  { loc: '/de-de/blog/atrani/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/blog/amalfi-weine/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/blog/sorrento-vs-praiano/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/blog/zitronen-koestlichkeit/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/blog/smaragd-grotte/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/blog/cetara-sardellen/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/blog/komfortable-ausgestattete-strande/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/blog/wilde-abgelegene-strande/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/blog/sonnenuntergang-strande/', priority: '0.7', changefreq: 'monthly' },

  // Guide - de-de additional
  { loc: '/de-de/ratgeber/anreise/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/ratgeber/reisezeit/', priority: '0.7', changefreq: 'yearly' },

  // Amalfi Coast - de-de additional
  { loc: '/de-de/amalfikueste/vietri-sul-mare/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/de-de/amalfikueste/marina-di-praia/', priority: '0.7', changefreq: 'yearly' },

  // Beaches - de-de additional
  { loc: '/de-de/strande/sorrentiner-halbinsel/spiaggia-di-ieranto/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/strande/amalfikueste/marina-di-praia/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/strande/inseln/faraglioni-capri/', priority: '0.7', changefreq: 'yearly' },

  // Experiences - de-de additional
  { loc: '/de-de/erlebnisse/mozzarella-tour/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/erlebnisse/limoncello-tour/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/erlebnisse/sterne-restaurants/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/erlebnisse/kochkurs/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/de-de/erlebnisse/hochzeiten/', priority: '0.7', changefreq: 'yearly' },

  // Events - Amalfi Coast - de-de
  { loc: '/de-de/veranstaltungen/amalfikueste/capodanno-bizantino/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/amalfikueste/festa-sant-andrea-amalfi/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/amalfikueste/festa-san-gennaro-praiano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/amalfikueste/luminaria-san-domenico-praiano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/amalfikueste/positano-mare-sole-cultura/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/amalfikueste/festival-limone-minori/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/amalfikueste/fuochi-ferragosto-positano-maiori/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/amalfikueste/ravello-festival/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/amalfikueste/regata-storica-amalfi/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/amalfikueste/notte-blu-vietri/', priority: '0.6', changefreq: 'yearly' },

  // Events - Sorrentine Peninsula - de-de
  { loc: '/de-de/veranstaltungen/sorrentinische-halbinsel/festa-sant-antonino/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/sorrentinische-halbinsel/gustamincanto-vico-equense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/sorrentinische-halbinsel/madonna-della-libera/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/sorrentinische-halbinsel/sagra-limone-massa-lubrense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/sorrentinische-halbinsel/sagra-melanzana-preazzano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/sorrentinische-halbinsel/sorrento-meeting-cultura/', priority: '0.6', changefreq: 'yearly' },

  // Events - Islands - de-de
  { loc: '/de-de/veranstaltungen/inseln/ischia-global-film-festival/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/inseln/sagra-del-mare-graziella-procida/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/de-de/veranstaltungen/inseln/anacapri-settembre-borgo/', priority: '0.6', changefreq: 'yearly' },

  // Planning - de-de
  { loc: '/de-de/planung/', priority: '0.8', changefreq: 'monthly' },

  // Blog - fr-fr additional
  { loc: '/fr-fr/blog/', priority: '0.8', changefreq: 'weekly' },
  { loc: '/fr-fr/blog/atrani/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/blog/grotte-emeraude/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/blog/delice-citron/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/blog/vallee-des-ferriere/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/blog/anchois-cetara/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/blog/vins-cote-amalfi/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/blog/sorrento-vs-praiano/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/blog/coucher-soleil-plages/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/blog/plages-confortables-equipees/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/blog/oasis-sauvages-plages/', priority: '0.7', changefreq: 'monthly' },

  // Guide - fr-fr additional
  { loc: '/fr-fr/guide/comment-venir/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/guide/quand-visiter/', priority: '0.7', changefreq: 'yearly' },

  // Amalfi Coast - fr-fr additional
  { loc: '/fr-fr/cote-amalfitaine/vietri-sul-mare/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/fr-fr/cote-amalfitaine/marina-di-praia/', priority: '0.7', changefreq: 'yearly' },

  // Beaches - fr-fr additional
  { loc: '/fr-fr/plages/cote-amalfitaine/marina-di-praia/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/plages/peninsule-sorrentine/spiaggia-di-ieranto/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/plages/iles/faraglioni-capri/', priority: '0.7', changefreq: 'yearly' },

  // Experiences - fr-fr additional
  { loc: '/fr-fr/experiences/tour-limoncello/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/experiences/restaurants-etoiles/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/experiences/experience-mozzarella/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/experiences/cours-de-cuisine/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/fr-fr/experiences/mariages/', priority: '0.7', changefreq: 'yearly' },

  // Events - Amalfi Coast - fr-fr
  { loc: '/fr-fr/evenements/cote-amalfitaine/capodanno-bizantino/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/cote-amalfitaine/festa-sant-andrea-amalfi/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/cote-amalfitaine/festa-san-gennaro-praiano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/cote-amalfitaine/luminaria-san-domenico-praiano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/cote-amalfitaine/positano-mare-sole-cultura/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/cote-amalfitaine/festival-limone-minori/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/cote-amalfitaine/fuochi-ferragosto-positano-maiori/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/cote-amalfitaine/ravello-festival/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/cote-amalfitaine/regata-storica-amalfi/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/cote-amalfitaine/notte-blu-vietri/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/cote-amalfitaine/sagra-del-pesce-positano/', priority: '0.6', changefreq: 'yearly' },

  // Events - Sorrentine Peninsula - fr-fr
  { loc: '/fr-fr/evenements/peninsule-sorrentine/festa-sant-antonino/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/peninsule-sorrentine/gustamincanto-vico-equense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/peninsule-sorrentine/madonna-della-libera/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/peninsule-sorrentine/sagra-limone-massa-lubrense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/peninsule-sorrentine/sagra-melanzana-preazzano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/peninsule-sorrentine/sorrento-meeting-cultura/', priority: '0.6', changefreq: 'yearly' },

  // Events - Islands - fr-fr
  { loc: '/fr-fr/evenements/iles/ischia-global-film-festival/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/iles/sagra-del-mare-graziella-procida/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/fr-fr/evenements/iles/anacapri-settembre-borgo/', priority: '0.6', changefreq: 'yearly' },

  // Planning - fr-fr
  { loc: '/fr-fr/planification/', priority: '0.8', changefreq: 'monthly' },

  // Blog - es-es additional
  { loc: '/es-es/blog/', priority: '0.8', changefreq: 'weekly' },
  { loc: '/es-es/blog/atrani/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/blog/gruta-esmeralda/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/blog/delizia-limon/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/blog/valle-ferriere/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/blog/anchoas-cetara/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/blog/vinos-costa-amalfi/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/blog/sorrento-vs-praiano/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/blog/oasis-salvajes-playas/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/blog/playas-comodas-equipadas/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/blog/puesta-de-sol-playas/', priority: '0.7', changefreq: 'monthly' },

  // Guide - es-es additional
  { loc: '/es-es/guia/como-llegar/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/guia/cuando-visitar/', priority: '0.7', changefreq: 'yearly' },

  // Amalfi Coast - es-es additional
  { loc: '/es-es/costa-amalfitana/vietri-sul-mare/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/es-es/costa-amalfitana/marina-di-praia/', priority: '0.7', changefreq: 'yearly' },

  // Beaches - es-es additional
  { loc: '/es-es/playas/peninsula-sorrentina/spiaggia-di-ieranto/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/playas/costa-amalfitana/marina-di-praia/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/playas/islas/faraglioni-capri/', priority: '0.7', changefreq: 'yearly' },

  // Experiences - es-es additional
  { loc: '/es-es/experiencias/tour-limoncello/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/experiencias/restaurantes-estrella/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/experiencias/experiencia-mozzarella/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/experiencias/clases-de-cocina/', priority: '0.7', changefreq: 'yearly' },
  { loc: '/es-es/experiencias/bodas/', priority: '0.7', changefreq: 'yearly' },

  // Events - Amalfi Coast - es-es
  { loc: '/es-es/eventos/costa-amalfitana/capodanno-bizantino/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/costa-amalfitana/festa-sant-andrea-amalfi/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/costa-amalfitana/festa-san-gennaro-praiano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/costa-amalfitana/luminaria-san-domenico-praiano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/costa-amalfitana/positano-mare-sole-cultura/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/costa-amalfitana/festival-limone-minori/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/costa-amalfitana/fuochi-ferragosto-positano-maiori/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/costa-amalfitana/ravello-festival/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/costa-amalfitana/regata-storica-amalfi/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/costa-amalfitana/notte-blu-vietri/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/costa-amalfitana/sagra-del-pesce-positano/', priority: '0.6', changefreq: 'yearly' },

  // Events - Sorrentine Peninsula - es-es
  { loc: '/es-es/eventos/peninsula-sorrentina/festa-sant-antonino/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/peninsula-sorrentina/gustamincanto-vico-equense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/peninsula-sorrentina/madonna-della-libera/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/peninsula-sorrentina/sagra-limone-massa-lubrense/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/peninsula-sorrentina/sagra-melanzana-preazzano/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/peninsula-sorrentina/sorrento-meeting-cultura/', priority: '0.6', changefreq: 'yearly' },

  // Events - Islands - es-es
  { loc: '/es-es/eventos/islas/ischia-global-film-festival/', priority: '0.6', changefreq: 'yearly' },
  { loc: '/es-es/eventos/islas/sagra-del-mare-graziella-procida/', priority: '0.6', changefreq: 'yearly' },

  // Planning - es-es
  { loc: '/es-es/planificacion/', priority: '0.8', changefreq: 'monthly' },

  // Blog hub pages
  { loc: '/it-it/blog/', priority: '0.8', changefreq: 'weekly' },
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
