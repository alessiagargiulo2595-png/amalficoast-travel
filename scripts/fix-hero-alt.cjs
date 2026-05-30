const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src', 'pages');

// Alt text by hero slug, then by language
const ALT = {
  'amalfi': {
    'en-us': 'Amalfi cathedral and harbour, historic capital of the Amalfi Coast',
    'it-it': 'Duomo e porto di Amalfi, capitale storica della Costiera Amalfitana',
    'de-de': 'Dom und Hafen von Amalfi, historische Hauptstadt der Amalfiküste',
    'es-es': 'Catedral y puerto de Amalfi, capital histórica de la Costa Amalfitana',
    'fr-fr': "Cathédrale et port d'Amalfi, capitale historique de la Côte Amalfitaine",
  },
  'positano': {
    'en-us': 'Positano: pastel houses cascading down the Amalfi Coast cliffs',
    'it-it': 'Positano: case pastello che scendono dalla scogliera della Costiera Amalfitana',
    'de-de': 'Positano: Pastellfarbene Häuser an den Klippen der Amalfiküste',
    'es-es': 'Positano: casas pastel cayendo por los acantilados de la Costa Amalfitana',
    'fr-fr': 'Positano : maisons pastel sur les falaises de la Côte Amalfitaine',
  },
  'ravello': {
    'en-us': 'Ravello: Villa Cimbrone terrace and the Tyrrhenian Sea',
    'it-it': 'Ravello: terrazza di Villa Cimbrone e mar Tirreno',
    'de-de': 'Ravello: Terrasse der Villa Cimbrone und Tyrrhenisches Meer',
    'es-es': 'Ravello: terraza de Villa Cimbrone y mar Tirreno',
    'fr-fr': 'Ravello : terrasse de la Villa Cimbrone et mer Tyrrhénienne',
  },
  'praiano': {
    'en-us': 'Praiano: cliff village between Positano and Amalfi at sunset',
    'it-it': 'Praiano: borgo a strapiombo tra Positano e Amalfi al tramonto',
    'de-de': 'Praiano: Klippendorf zwischen Positano und Amalfi bei Sonnenuntergang',
    'es-es': 'Praiano: pueblo de acantilado entre Positano y Amalfi al atardecer',
    'fr-fr': 'Praiano : village perché entre Positano et Amalfi au coucher du soleil',
  },
  'maiori': {
    'en-us': 'Maiori: longest sandy beach on the Amalfi Coast',
    'it-it': 'Maiori: la spiaggia sabbiosa più lunga della Costiera Amalfitana',
    'de-de': 'Maiori: der längste Sandstrand der Amalfiküste',
    'es-es': 'Maiori: la playa de arena más larga de la Costa Amalfitana',
    'fr-fr': 'Maiori : la plus longue plage de sable de la Côte Amalfitaine',
  },
  'minori': {
    'en-us': 'Minori: the artisanal pasta village on the Amalfi Coast',
    'it-it': 'Minori: il borgo della pasta artigianale in Costiera Amalfitana',
    'de-de': 'Minori: das Dorf der handgemachten Pasta an der Amalfiküste',
    'es-es': 'Minori: el pueblo de la pasta artesanal en la Costa Amalfitana',
    'fr-fr': 'Minori : le village des pâtes artisanales de la Côte Amalfitaine',
  },
  'vietri': {
    'en-us': 'Vietri sul Mare: gateway to the Amalfi Coast and home of majolica ceramics',
    'it-it': 'Vietri sul Mare: porta della Costiera Amalfitana e patria della ceramica maiolicata',
    'de-de': 'Vietri sul Mare: Tor zur Amalfiküste und Heimat der Majolika-Keramik',
    'es-es': 'Vietri sul Mare: puerta de la Costa Amalfitana y hogar de la cerámica mayólica',
    'fr-fr': 'Vietri sul Mare : porte de la Côte Amalfitaine et patrie de la céramique majolique',
  },
  'sorrento': {
    'en-us': 'Sorrento and the Gulf of Naples seen from the cliffs',
    'it-it': 'Sorrento e il golfo di Napoli visti dalle scogliere',
    'de-de': 'Sorrent und der Golf von Neapel von den Klippen aus gesehen',
    'es-es': 'Sorrento y el golfo de Nápoles vistos desde los acantilados',
    'fr-fr': 'Sorrente et le golfe de Naples vus depuis les falaises',
  },
  'capri': {
    'en-us': 'Capri: the Faraglioni rocks and the cliffs of the island',
    'it-it': 'Capri: i Faraglioni e le scogliere dell\'isola',
    'de-de': 'Capri: die Faraglioni und die Klippen der Insel',
    'es-es': 'Capri: los Faraglioni y los acantilados de la isla',
    'fr-fr': "Capri : les Faraglioni et les falaises de l'île",
  },
  'anacapri': {
    'en-us': 'Anacapri: the upper village of Capri with views of Monte Solaro',
    'it-it': 'Anacapri: il borgo alto di Capri con vista sul Monte Solaro',
    'de-de': 'Anacapri: das obere Dorf von Capri mit Blick auf den Monte Solaro',
    'es-es': 'Anacapri: el pueblo alto de Capri con vistas al Monte Solaro',
    'fr-fr': 'Anacapri : le village haut de Capri avec vue sur le Monte Solaro',
  },
  'ischia': {
    'en-us': 'Ischia: the Aragonese Castle and thermal island in the Gulf of Naples',
    'it-it': 'Ischia: il Castello Aragonese e l\'isola termale nel golfo di Napoli',
    'de-de': 'Ischia: das Aragonesische Schloss und die Thermalinsel im Golf von Neapel',
    'es-es': 'Ischia: el Castillo Aragonés y la isla termal en el golfo de Nápoles',
    'fr-fr': "Ischia : le château aragonais et l'île thermale dans le golfe de Naples",
  },
  'procida': {
    'en-us': 'Procida: pastel houses of Marina Corricella, Italian Capital of Culture 2022',
    'it-it': 'Procida: case pastello di Marina Corricella, capitale italiana della cultura 2022',
    'de-de': 'Procida: Pastellfarbene Häuser von Marina Corricella, italienische Kulturhauptstadt 2022',
    'es-es': 'Procida: casas pastel de Marina Corricella, capital italiana de la cultura 2022',
    'fr-fr': 'Procida : maisons pastel de Marina Corricella, capitale italienne de la culture 2022',
  },
  'forio': {
    'en-us': 'Forio on Ischia: the Soccorso church at sunset',
    'it-it': 'Forio a Ischia: la chiesa del Soccorso al tramonto',
    'de-de': 'Forio auf Ischia: die Soccorso-Kirche bei Sonnenuntergang',
    'es-es': 'Forio en Ischia: la iglesia del Soccorso al atardecer',
    'fr-fr': "Forio à Ischia : l'église du Soccorso au coucher du soleil",
  },
  'costiera': {
    'en-us': 'Aerial view of the Amalfi Coast and its dramatic cliffs',
    'it-it': 'Vista aerea della Costiera Amalfitana e delle sue scogliere',
    'de-de': 'Luftaufnahme der Amalfiküste und ihrer dramatischen Klippen',
    'es-es': 'Vista aérea de la Costa Amalfitana y sus acantilados',
    'fr-fr': 'Vue aérienne de la Côte Amalfitaine et de ses falaises',
  },
  'punta-campanella': {
    'en-us': 'Punta Campanella: marine reserve at the tip of the Sorrentine Peninsula',
    'it-it': 'Punta Campanella: riserva marina sulla punta della penisola sorrentina',
    'de-de': 'Punta Campanella: Meeresschutzgebiet an der Spitze der Sorrentinischen Halbinsel',
    'es-es': 'Punta Campanella: reserva marina en la punta de la península sorrentina',
    'fr-fr': 'Punta Campanella : réserve marine à la pointe de la péninsule sorrentine',
  },
  'fiordo-crapolla': {
    'en-us': 'Fiordo di Crapolla: hidden fjord on the Sorrentine Peninsula',
    'it-it': 'Fiordo di Crapolla: il fiordo nascosto della penisola sorrentina',
    'de-de': 'Fiordo di Crapolla: versteckter Fjord auf der Sorrentinischen Halbinsel',
    'es-es': 'Fiordo di Crapolla: el fiordo escondido de la península sorrentina',
    'fr-fr': 'Fiordo di Crapolla : fjord caché de la péninsule sorrentine',
  },
};

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, out);
    else if (f.name.endsWith('.astro')) out.push(p);
  }
  return out;
}

function detectLang(filePath) {
  const m = filePath.match(/[\\/]src[\\/]pages[\\/]([a-z]{2}-[a-z]{2})[\\/]/);
  return m ? m[1] : null;
}

const files = walk(ROOT);
let updated = 0;
const missingMap = new Set();

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  const lang = detectLang(file);
  if (!lang) continue;
  let changed = false;

  src = src.replace(
    /(<img\s+src="\/images\/([a-z-]+)-hero\.jpg"\s+)alt=""/g,
    (match, prefix, slug) => {
      const entry = ALT[slug];
      if (!entry || !entry[lang]) {
        missingMap.add(`${slug}/${lang}`);
        return match;
      }
      changed = true;
      return `${prefix}alt="${entry[lang]}"`;
    }
  );

  if (changed) {
    fs.writeFileSync(file, src, 'utf8');
    updated++;
  }
}

console.log(`Updated: ${updated}`);
if (missingMap.size > 0) {
  console.log(`\nMissing alt entries:`);
  for (const m of missingMap) console.log(`  ${m}`);
}
