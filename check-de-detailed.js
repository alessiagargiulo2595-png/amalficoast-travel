const fs = require('fs');
const path = require('path');

// DE-DE URLs da testare
const deLinks = [
  '/de-de/',
  '/de-de/destinations/',
  '/de-de/amalfikueste/',
  '/de-de/sorrentinische-halbinsel/',
  '/de-de/inseln/',
  '/de-de/strande/',
  '/de-de/erlebnisse/',
  '/de-de/reiserouten/',
  '/de-de/ratgeber/faehren/',
  '/de-de/ratgeber/sita-bus/',
  '/de-de/ratgeber/parken-ztl/',
  '/de-de/blog/',
  '/de-de/amalfikueste/positano/',
  '/de-de/amalfikueste/amalfi/',
  '/de-de/amalfikueste/ravello/',
  '/de-de/amalfikueste/praiano/',
  '/de-de/amalfikueste/marina-di-praia/',
  '/de-de/amalfikueste/maiori/',
  '/de-de/amalfikueste/minori/',
  '/de-de/amalfikueste/vietri-sul-mare/',
  '/de-de/sorrentinische-halbinsel/sorrento/',
  '/de-de/sorrentinische-halbinsel/vico-equense/',
  '/de-de/sorrentinische-halbinsel/massa-lubrense/',
  '/de-de/sorrentinische-halbinsel/sant-agnello/',
  '/de-de/strande/amalfikueste/fiordo-di-furore/',
  '/de-de/strande/amalfikueste/spiaggia-grande-positano/',
  '/de-de/strande/amalfikueste/santa-croce-amalfi/',
  '/de-de/strande/amalfikueste/marina-di-praia/',
  '/de-de/strande/sorrentiner-halbinsel/regina-giovanna/',
  '/de-de/strande/sorrentiner-halbinsel/marina-del-cantone/',
  '/de-de/strande/sorrentiner-halbinsel/cala-mitigliano/',
  '/de-de/strande/sorrentiner-halbinsel/spiaggia-di-ieranto/',
  '/de-de/strande/inseln/marina-piccola-capri/',
  '/de-de/strande/inseln/spiaggia-maronti/',
  '/de-de/strande/inseln/cala-del-pozzo-vecchio/',
  '/de-de/strande/inseln/faraglioni-capri/',
  '/de-de/erlebnisse/kochkurs/',
  '/de-de/erlebnisse/hochzeiten/',
  '/de-de/erlebnisse/sterne-restaurants/',
  '/de-de/erlebnisse/limoncello-tour/',
  '/de-de/erlebnisse/mozzarella-erlebnis/',
];

console.log('🔍 Checking DE-DE links...\n');

let missing = [];

for (const url of deLinks) {
  let filePath = path.join(__dirname, 'dist', url);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!filePath.endsWith('.html')) {
    filePath = path.join(filePath, 'index.html');
  }
  
  if (!fs.existsSync(filePath)) {
    missing.push({ url, filePath });
    console.log(`❌ MISSING: ${url}`);
    console.log(`   File: ${filePath}\n`);
  } else {
    console.log(`✓ ${url}`);
  }
}

console.log(`\n✅ Total checked: ${deLinks.length}`);
console.log(`❌ Missing: ${missing.length}`);
