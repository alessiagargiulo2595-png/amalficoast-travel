const fs = require('fs');
const path = require('path');

// All menu links to check
const testLinks = {
  'en-us': {
    navbar: [
      '/en-us/',
      '/en-us/destinations/',
      '/en-us/amalfi-coast/',
      '/en-us/sorrento-peninsula/',
      '/en-us/islands/',
      '/en-us/beaches/',
      '/en-us/experiences/',
      '/en-us/itineraries/',
      '/en-us/guide/ferries/',
      '/en-us/guide/sita-bus/',
      '/en-us/guide/parking-ztl/',
      '/en-us/blog/',
    ],
    footer: {
      towns: [
        '/en-us/amalfi-coast/positano/',
        '/en-us/amalfi-coast/amalfi/',
        '/en-us/amalfi-coast/ravello/',
        '/en-us/amalfi-coast/praiano/',
        '/en-us/amalfi-coast/marina-di-praia/',
        '/en-us/amalfi-coast/maiori/',
        '/en-us/amalfi-coast/minori/',
        '/en-us/amalfi-coast/vietri-sul-mare/',
      ],
      guida: [
        '/en-us/guide/ferries/',
        '/en-us/guide/sita-bus/',
        '/en-us/guide/parking-ztl/',
        '/en-us/beaches/',
        '/en-us/experiences/trekking/',
        '/en-us/blog/',
      ],
      esperienze: [
        '/en-us/experiences/cooking-class/',
        '/en-us/experiences/weddings/',
        '/en-us/experiences/starred-restaurants/',
        '/en-us/experiences/limoncello-tour/',
        '/en-us/experiences/mozzarella-experience/',
      ],
      itinerari1g: [
        '/en-us/itineraries/1-day/amalfi-coast-from-naples/',
        '/en-us/itineraries/1-day/amalfi-coast-from-salerno/',
        '/en-us/itineraries/1-day/sorrentine-peninsula-from-naples/',
        '/en-us/itineraries/1-day/path-of-the-gods-trek/',
        '/en-us/itineraries/1-day/capri-from-sorrento/',
      ],
      itinerari3g: [
        '/en-us/itineraries/3-days/classic-amalfi-coast/',
        '/en-us/itineraries/3-days/sorrento-pompeii-history/',
        '/en-us/itineraries/3-days/islands-ischia-procida/',
      ],
      itinerari7g: [
        '/en-us/itineraries/7-days/grand-tour-coast-peninsula/',
        '/en-us/itineraries/7-days/slow-travel-villages-food/',
      ],
    },
  },
  'it-it': {
    navbar: [
      '/it-it/',
      '/it-it/destinazioni/',
      '/it-it/costiera-amalfitana/',
      '/it-it/penisola-sorrentina/',
      '/it-it/isole/',
      '/it-it/spiagge',
      '/it-it/esperienze/',
      '/it-it/itinerari/',
      '/it-it/guida/traghetti/',
      '/it-it/guida/bus-sita/',
      '/it-it/guida/parcheggi-ztl/',
      '/it-it/blog/',
    ],
    footer: {
      towns: [
        '/it-it/costiera-amalfitana/positano/',
        '/it-it/costiera-amalfitana/amalfi/',
        '/it-it/costiera-amalfitana/ravello/',
        '/it-it/costiera-amalfitana/praiano/',
        '/it-it/costiera-amalfitana/marina-di-praia/',
        '/it-it/costiera-amalfitana/maiori/',
        '/it-it/costiera-amalfitana/minori/',
        '/it-it/costiera-amalfitana/vietri-sul-mare/',
      ],
      guida: [
        '/it-it/guida/traghetti/',
        '/it-it/guida/bus-sita/',
        '/it-it/guida/parcheggi-ztl/',
        '/it-it/spiagge',
        '/it-it/esperienze/trekking/',
        '/it-it/blog/',
      ],
      esperienze: [
        '/it-it/esperienze/cooking-class/',
        '/it-it/esperienze/matrimoni/',
        '/it-it/esperienze/ristoranti-stellati/',
        '/it-it/esperienze/limoncello-tour/',
        '/it-it/esperienze/mozzarella-experience/',
      ],
      itinerari1g: [
        '/it-it/itinerari/1-giorno/costiera-amalfitana-da-napoli/',
        '/it-it/itinerari/1-giorno/costiera-amalfitana-da-salerno/',
        '/it-it/itinerari/1-giorno/penisola-sorrentina-da-napoli/',
        '/it-it/itinerari/1-giorno/trekking-sentiero-degli-dei/',
        '/it-it/itinerari/1-giorno/capri-da-sorrento/',
      ],
      itinerari3g: [
        '/it-it/itinerari/3-giorni/classico-costiera-amalfitana/',
        '/it-it/itinerari/3-giorni/sorrento-pompei-storia/',
        '/it-it/itinerari/3-giorni/isole-ischia-procida/',
      ],
      itinerari7g: [
        '/it-it/itinerari/7-giorni/grand-tour-costiera-penisola/',
        '/it-it/itinerari/7-giorni/slow-travel-borghi-cibo/',
      ],
    },
  },
  'de-de': {
    navbar: [
      '/de-de/',
      '/de-de/destinations/',
      '/de-de/amalfikueste/',
      '/de-de/sorrentinische-halbinsel/',
      '/de-de/inseln/',
      '/de-de/strande',
      '/de-de/erlebnisse/',
      '/de-de/reiserouten/',
      '/de-de/ratgeber/faehren/',
      '/de-de/ratgeber/sita-bus/',
      '/de-de/ratgeber/parken-ztl/',
      '/de-de/blog/',
    ],
    footer: {
      towns: [
        '/de-de/amalfikueste/positano/',
        '/de-de/amalfikueste/amalfi/',
        '/de-de/amalfikueste/ravello/',
        '/de-de/amalfikueste/praiano/',
        '/de-de/amalfikueste/marina-di-praia/',
        '/de-de/amalfikueste/maiori/',
        '/de-de/amalfikueste/minori/',
        '/de-de/amalfikueste/vietri-sul-mare/',
      ],
      guida: [
        '/de-de/ratgeber/faehren/',
        '/de-de/ratgeber/sita-bus/',
        '/de-de/ratgeber/parken-ztl/',
        '/de-de/strande',
        '/de-de/erlebnisse/trekking/',
        '/de-de/blog/',
      ],
      esperienze: [
        '/de-de/erlebnisse/kochkurs/',
        '/de-de/erlebnisse/hochzeiten/',
        '/de-de/erlebnisse/sterne-restaurants/',
        '/de-de/erlebnisse/limoncello-tour/',
        '/de-de/erlebnisse/mozzarella-erlebnis/',
      ],
      itinerari1g: [
        '/de-de/reiserouten/1-tag/amalfikueste-von-neapel/',
        '/de-de/reiserouten/1-tag/amalfikueste-von-salerno/',
        '/de-de/reiserouten/1-tag/sorrentinische-halbinsel-von-neapel/',
        '/de-de/reiserouten/1-tag/weg-der-goetter-trekking/',
        '/de-de/reiserouten/1-tag/capri-von-sorrent/',
      ],
      itinerari3g: [
        '/de-de/reiserouten/3-tage/klassische-amalfikueste/',
        '/de-de/reiserouten/3-tage/sorrent-pompeji-geschichte/',
        '/de-de/reiserouten/3-tage/inseln-ischia-procida/',
      ],
      itinerari7g: [
        '/de-de/reiserouten/7-tage/grand-tour-kueste-halbinsel/',
        '/de-de/reiserouten/7-tage/slow-travel-doerfer-kulinarik/',
      ],
    },
  },
  'fr-fr': {
    navbar: [
      '/fr-fr/',
      '/fr-fr/destinations/',
      '/fr-fr/cote-amalfitaine/',
      '/fr-fr/peninsule-sorrentine/',
      '/fr-fr/iles/',
      '/fr-fr/plages',
      '/fr-fr/experiences/',
      '/fr-fr/itineraires/',
      '/fr-fr/guide/ferries/',
      '/fr-fr/guide/bus-sita/',
      '/fr-fr/guide/parking-ztl/',
      '/fr-fr/blog/',
    ],
    footer: {
      towns: [
        '/fr-fr/cote-amalfitaine/positano/',
        '/fr-fr/cote-amalfitaine/amalfi/',
        '/fr-fr/cote-amalfitaine/ravello/',
        '/fr-fr/cote-amalfitaine/praiano/',
        '/fr-fr/cote-amalfitaine/marina-di-praia/',
        '/fr-fr/cote-amalfitaine/maiori/',
        '/fr-fr/cote-amalfitaine/minori/',
        '/fr-fr/cote-amalfitaine/vietri-sul-mare/',
      ],
      guida: [
        '/fr-fr/guide/ferries/',
        '/fr-fr/guide/bus-sita/',
        '/fr-fr/guide/parking-ztl/',
        '/fr-fr/plages',
        '/fr-fr/experiences/trekking/',
        '/fr-fr/blog/',
      ],
      esperienze: [
        '/fr-fr/experiences/cours-de-cuisine/',
        '/fr-fr/experiences/mariages/',
        '/fr-fr/experiences/restaurants-etoiles/',
        '/fr-fr/experiences/tour-limoncello/',
        '/fr-fr/experiences/experience-mozzarella/',
      ],
      itinerari1g: [
        '/fr-fr/itineraires/1-jour/cote-amalfitaine-depuis-naples/',
        '/fr-fr/itineraires/1-jour/cote-amalfitaine-depuis-salerne/',
        '/fr-fr/itineraires/1-jour/peninsule-sorrentine-depuis-naples/',
        '/fr-fr/itineraires/1-jour/sentier-des-dieux-trek/',
        '/fr-fr/itineraires/1-jour/capri-depuis-sorrente/',
      ],
      itinerari3g: [
        '/fr-fr/itineraires/3-jours/cote-amalfitaine-classique/',
        '/fr-fr/itineraires/3-jours/sorrente-pompei-histoire/',
        '/fr-fr/itineraires/3-jours/iles-ischia-procida/',
      ],
      itinerari7g: [
        '/fr-fr/itineraires/7-jours/grand-tour-cote-peninsule/',
        '/fr-fr/itineraires/7-jours/slow-travel-villages-gastronomie/',
      ],
    },
  },
  'es-es': {
    navbar: [
      '/es-es/',
      '/es-es/destinos/',
      '/es-es/costa-amalfitana/',
      '/es-es/peninsula-sorrentina/',
      '/es-es/islas/',
      '/es-es/playas',
      '/es-es/experiencias/',
      '/es-es/itinerarios/',
      '/es-es/guia/ferries/',
      '/es-es/guia/bus-sita/',
      '/es-es/guia/aparcamiento-ztl/',
      '/es-es/blog/',
    ],
    footer: {
      towns: [
        '/es-es/costa-amalfitana/positano/',
        '/es-es/costa-amalfitana/amalfi/',
        '/es-es/costa-amalfitana/ravello/',
        '/es-es/costa-amalfitana/praiano/',
        '/es-es/costa-amalfitana/marina-di-praia/',
        '/es-es/costa-amalfitana/maiori/',
        '/es-es/costa-amalfitana/minori/',
        '/es-es/costa-amalfitana/vietri-sul-mare/',
      ],
      guida: [
        '/es-es/guia/ferries/',
        '/es-es/guia/bus-sita/',
        '/es-es/guia/aparcamiento-ztl/',
        '/es-es/playas',
        '/es-es/experiencias/trekking/',
        '/es-es/blog/',
      ],
      esperienze: [
        '/es-es/experiencias/clase-cocina/',
        '/es-es/experiencias/bodas/',
        '/es-es/experiencias/restaurantes-estrella/',
        '/es-es/experiencias/tour-limoncello/',
        '/es-es/experiencias/experiencia-mozzarella/',
      ],
      itinerari1g: [
        '/es-es/itinerarios/1-dia/costa-amalfitana-desde-napoles/',
        '/es-es/itinerarios/1-dia/costa-amalfitana-desde-salerno/',
        '/es-es/itinerarios/1-dia/peninsula-sorrentina-desde-napoles/',
        '/es-es/itinerarios/1-dia/sendero-de-los-dioses-trek/',
        '/es-es/itinerarios/1-dia/capri-desde-sorrento/',
      ],
      itinerari3g: [
        '/es-es/itinerarios/3-dias/costa-amalfitana-clasica/',
        '/es-es/itinerarios/3-dias/sorrento-pompeya-historia/',
        '/es-es/itinerarios/3-dias/islas-ischia-procida/',
      ],
      itinerari7g: [
        '/es-es/itinerarios/7-dias/gran-tour-costa-peninsula/',
        '/es-es/itinerarios/7-dias/slow-travel-pueblos-gastronomia/',
      ],
    },
  },
};

function fileExists(pathname) {
  try {
    return fs.statSync(pathname).isFile() || fs.statSync(pathname).isDirectory();
  } catch {
    return false;
  }
}

function getFilePath(urlPath) {
  let filePath = path.join(__dirname, 'dist', urlPath);

  // Check if it's a directory with index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  // If no extension, try adding index.html
  else if (!filePath.endsWith('.html')) {
    filePath = path.join(filePath, 'index.html');
  }

  return filePath;
}

async function checkLinks() {
  const results = {
    total: 0,
    found: 0,
    missing: 0,
    errors: [],
  };

  for (const [lang, links] of Object.entries(testLinks)) {
    console.log(`\n📋 Checking ${lang.toUpperCase()} links...`);

    // Check navbar links
    if (links.navbar) {
      for (const url of links.navbar) {
        results.total++;
        const filePath = getFilePath(url);
        if (fileExists(filePath)) {
          results.found++;
          process.stdout.write('✓');
        } else {
          results.missing++;
          process.stdout.write('✗');
          results.errors.push({ lang, url, type: 'navbar', path: filePath });
        }
      }
    }

    // Check footer links
    if (links.footer) {
      for (const [category, urls] of Object.entries(links.footer)) {
        for (const url of urls) {
          results.total++;
          const filePath = getFilePath(url);
          if (fileExists(filePath)) {
            results.found++;
            process.stdout.write('✓');
          } else {
            results.missing++;
            process.stdout.write('✗');
            results.errors.push({ lang, url, type: 'footer', category, path: filePath });
          }
        }
      }
    }
    console.log('');
  }

  console.log('\n════════════════════════════════════════════');
  console.log(`\n📊 Check Results:\n`);
  console.log(`  Total: ${results.total}`);
  console.log(`  ✓ Found: ${results.found}`);
  console.log(`  ✗ Missing: ${results.missing}`);

  if (results.errors.length > 0) {
    console.log(`\n❌ MISSING FILES:\n`);
    results.errors.forEach(err => {
      console.log(`  [${err.lang}] ${err.url}`);
      console.log(`    Type: ${err.type}${err.category ? ` (${err.category})` : ''}`);
      console.log(`    File: ${err.path}`);
      console.log('');
    });
    process.exit(1);
  } else {
    console.log(`\n✅ All menu links found in dist folder!\n`);
    process.exit(0);
  }
}

checkLinks().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
