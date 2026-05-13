import type { Locale } from './translations';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export interface Town {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  highlights: string[];
  area: 'costiera-amalfitana' | 'isole' | 'penisola-sorrentina';
}

export interface Beach {
  name: string;
  location: string;
  description: string;
  type: string;
  bestFor: string;
}

export interface HomeContent {
  intro: string;
  why_visit: { title: string; text: string }[];
  towns: Town[];
  beaches: Beach[];
}

export interface GetHereContent {
  intro: string;
  methods: { title: string; icon: string; description: string; tips: string[] }[];
}

export interface ItineraryContent {
  intro: string;
  itineraries: { duration: string; title: string; days: { day: string; description: string }[] }[];
}

export interface WhenToVisitContent {
  intro: string;
  seasons: { name: string; months: string; weather: string; crowds: string; pros: string[]; cons: string[] }[];
}

export interface BeachesContent {
  intro: string;
  beaches: { name: string; location: string; description: string; type: string; bestFor: string; access: string }[];
}

export interface DestinationsContent {
  intro: string;
  towns: { name: string; description: string; mustSee: string[]; bestFor: string; howToGet: string }[];
}

// ===== HOME CONTENT =====

export const homeContent: Record<Locale, HomeContent> = {
  'en-us': {
    intro: 'The Amalfi Coast is one of those rare places that genuinely exceeds expectations. Stretching 50 kilometres along the southern edge of the Sorrentine Peninsula, this UNESCO World Heritage Site packs extraordinary scenery, ancient towns, and crystal-clear Mediterranean waters into a compact, dramatic landscape. Vertical cliffs plunge into the sea, villages cling to terraced hillsides, and lemons the size of grapefruits hang from pergolas lining the winding SS163 coastal road.',
    why_visit: [
      { title: 'Unmatched Scenery', text: 'The interplay of mountains, sea, and colourful architecture creates landscapes that have inspired painters, writers, and filmmakers for centuries. Every bend in the road reveals a new postcard view.' },
      { title: 'Rich History', text: 'The Republic of Amalfi was once a major Mediterranean maritime power. Its 9th-century cathedral, Arab-Norman architecture, and ancient paper mills tell a story of civilisations layered across millennia.' },
      { title: 'Authentic Flavours', text: 'Sfogliatelle, limoncello, fresh anchovies from Cetara, and buffalo mozzarella from the nearby plains - the food alone justifies the trip. Every town has its own culinary speciality.' },
      { title: 'Diverse Experiences', text: "Whether you're hiking the Path of the Gods, swimming in hidden sea caves, exploring the gardens of Ravello, or simply sipping Campari watching the sunset from a clifftop terrace, there's something for every traveller." },
    ],
    towns: [
      {
        name: 'Positano', slug: 'positano',
        tagline: 'The jewel of the Amalfi Coast',
        description: 'Positano is the most photographed town on the coast - and for good reason. Its pastel-coloured houses cascade down a steep hillside directly into the sea, creating one of the most dramatic urban landscapes in Europe. The beach is lively, the boutiques are stylish, and the restaurant terraces offer unbeatable views.',
        highlights: ['Spiaggia Grande beach', 'Via dei Mulini shopping', 'Church of Santa Maria Assunta', 'Li Galli islands viewpoint', 'Path of the Gods trailhead'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Amalfi', slug: 'amalfi',
        tagline: 'Once a mighty maritime republic',
        description: 'The namesake town of the coast punches far above its weight. The Cathedral of Sant\'Andrea, with its stunning Arab-Norman façade, dominates the Piazza del Duomo. The historic paper mills of the Valle dei Mulini were producing paper before most of Europe. Amalfi is the perfect base for exploring the coast by ferry.',
        highlights: ['Cathedral of Sant\'Andrea', 'Valle dei Mulini', 'Piazza del Duomo', 'Grotto dello Smeraldo nearby', 'Ferry connections to all coastal towns'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Ravello', slug: 'ravello',
        tagline: 'The city of music and gardens',
        description: "Perched 350 metres above the sea, Ravello is a world apart from the coastal bustle. Villa Rufolo and Villa Cimbrone offer some of the most celebrated garden terraces in Italy - Wagner drew inspiration here, and Gore Vidal called it home for decades. The annual Ravello Festival brings world-class music to the clifftop stage.",
        highlights: ['Villa Rufolo gardens', 'Villa Cimbrone terrace', 'Ravello Festival (July-September)', 'Duomo di Ravello', 'Views over Minori and Maiori'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Praiano', slug: 'praiano',
        tagline: 'The quiet alternative to Positano',
        description: "Just 5 km from Positano but worlds away in atmosphere, Praiano is the coast's best-kept secret for those who want to live like a local. Fewer tourists, lower prices, and genuine fishing-village character. The beach at Marina di Praia is one of the most charming on the coast, tucked into a narrow gorge.",
        highlights: ['Marina di Praia beach', 'Furore fjord nearby', 'Hiking the Path of the Gods', 'San Gennaro church', 'Sunset views toward Positano'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Cetara', slug: 'cetara',
        tagline: 'The anchovy capital of the Mediterranean',
        description: "Cetara is the most authentically Italian town on the coast - a genuine fishing village where the main export is colatura di alici, a fermented anchovy sauce prized by chefs across Italy. The beach is uncrowded, the restaurants are exceptional value, and the pace of life is gloriously unhurried.",
        highlights: ['Colatura di alici tasting', 'Piazza San Francesco', 'Torre di Cetara', 'Local fish restaurants', 'Uncrowded beach'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Vietri sul Mare', slug: 'vietri-sul-mare',
        tagline: 'The gateway to the coast',
        description: 'The eastern gateway to the Amalfi Coast is famous for its distinctive hand-painted ceramics - the colourful tiles that decorate church domes and café walls across southern Italy often come from Vietri workshops. It\'s an ideal first or last stop on any coastal itinerary.',
        highlights: ['Ceramic workshops and studios', 'Church of San Giovanni Battista dome', 'Museo della Ceramica', 'Marina di Vietri beach', 'Accessible from Salerno by bus'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Capri', slug: 'capri',
        tagline: 'The enchanted island of the Naples Bay',
        description: 'Capri is the most celebrated of Campania\'s islands, famous for its dramatic Faraglioni rocks, the legendary Blue Grotto, and exclusive gardens. A preferred destination for generations of artists and notable figures, Capri combines wild natural beauty with sophistication and exclusive lifestyle.',
        highlights: ['The Faraglioni rocks', 'Blue Grotto', 'Villa Jovis', 'Anacapri and the chairlift', 'Marina Piccola'],
        area: 'isole',
      },
      {
        name: 'Ischia', slug: 'ischia',
        tagline: 'The green island of wellness and nature',
        description: 'Ischia is the largest island in the Naples Bay, characterised by sandy beaches, natural thermal springs, and lush vegetation. It\'s the perfect destination for those seeking relaxation, thermal wellness, and authentic local life away from mass tourism.',
        highlights: ['Golden sand beaches', 'Natural thermal springs', 'Mount Epomeo', 'Sant\'Angelo', 'Aleppo pine forest'],
        area: 'isole',
      },
      {
        name: 'Procida', slug: 'procida',
        tagline: 'The colorful island of simplicity',
        description: 'Procida is the smallest and most intimate of Campania\'s islands, famous for its colourful houses reflected in crystal-clear waters. Here time flows at the rhythm of fishermen, far from tourist excesses, offering an authentic and peaceful experience.',
        highlights: ['Corricella', 'Marina Grande', 'Abbey of Saint Michael the Archangel', 'Traditional cheese makers', 'Terrace sunsets'],
        area: 'isole',
      },
      {
        name: 'Sorrento', slug: 'sorrento',
        tagline: 'The gateway to the Sorrentine Peninsula',
        description: 'Sorrento is the pulsing heart of the Sorrentine Peninsula, perched on cliffs high above the sea with breathtaking views of Mount Vesuvius and the islands. The town is renowned for its limoncello, ceramics, and romantic atmosphere that has inspired poets and artists.',
        highlights: ['Piazza Tasso', 'Cloister of San Francesco', 'Museo Correale', 'Marina Grande', 'Views of Mount Vesuvius'],
        area: 'penisola-sorrentina',
      },
      {
        name: 'Vico Equense', slug: 'vico-equense',
        tagline: 'The land of lemons and gastronomic delights',
        description: 'Vico Equense is a charming village perched in the heights of the Sorrentine Peninsula, celebrated for its excellent cuisine, IGP lemons, and warm local hospitality. It\'s the ideal place to savour the authentic flavours of the region away from tourist crowds.',
        highlights: ['Piazza Gesù', 'Church of the Immaculate', 'Lemon market', 'Local cuisine', 'Panoramic views of the coast'],
        area: 'penisola-sorrentina',
      },
      {
        name: 'Massa Lubrense', slug: 'massa-lubrense',
        tagline: 'The border between two seas',
        description: 'Massa Lubrense stretches between the Naples Bay and the Salerno Bay, offering wild beaches, hiking trails, and peace that contrasts with crowded tourist centres. It\'s the ideal destination for those seeking authenticity, nature, and tranquillity.',
        highlights: ['Punta Campanella', 'Gavitella beach', 'Panoramic hiking trails', 'Marina della Lobra', 'Local fishermen'],
        area: 'penisola-sorrentina',
      },
    ],
    beaches: [
      { name: 'Spiaggia Grande', location: 'Positano', description: 'The main beach in Positano, lively and well-equipped with sun loungers and beach clubs.', type: 'Pebble', bestFor: 'Atmosphere & convenience' },
      { name: 'Marina di Praia', location: 'Praiano', description: 'A tiny cove tucked between high cliffs, with crystal-clear water and a relaxed vibe.', type: 'Pebble & sand', bestFor: 'Snorkelling & peace' },
      { name: 'Lido delle Sirene', location: 'Amalfi', description: 'Close to the centre of Amalfi town, with easy access and views of the coast.', type: 'Pebble', bestFor: 'Easy access' },
      { name: 'Spiaggia di Cetara', location: 'Cetara', description: 'A laid-back beach in front of the fishing village, far from the tourist crowds.', type: 'Pebble', bestFor: 'Authentic experience' },
    ],
  },

  'en-gb': {
    intro: 'The Amalfi Coast is one of those rare places that genuinely exceeds expectations. Stretching 50 kilometres along the southern edge of the Sorrentine Peninsula, this UNESCO World Heritage Site packs extraordinary scenery, ancient towns, and crystal-clear Mediterranean waters into a compact, dramatic landscape. Sheer cliffs plunge into the sea, villages cling to terraced hillsides, and enormous lemons hang from pergolas along the winding SS163 coastal road.',
    why_visit: [
      { title: 'Unmatched Scenery', text: 'The interplay of mountains, sea, and colourful architecture creates landscapes that have inspired painters, writers, and filmmakers for centuries. Every bend in the road reveals a new postcard view.' },
      { title: 'Rich History', text: 'The Republic of Amalfi was once a major Mediterranean maritime power. Its 9th-century cathedral, Arab-Norman architecture, and ancient paper mills tell a story of civilisations layered across millennia.' },
      { title: 'Outstanding Food & Drink', text: 'Sfogliatelle, limoncello, fresh anchovies from Cetara, and buffalo mozzarella from the nearby Campanian plains - the food alone justifies the trip. Every town has its own culinary tradition.' },
      { title: 'Something for Everyone', text: "Whether you fancy hiking the Path of the Gods, swimming in hidden sea caves, exploring the gardens of Ravello, or simply sipping Aperol watching the sunset from a clifftop terrace, the Amalfi Coast delivers." },
    ],
    towns: [
      {
        name: 'Positano', slug: 'positano',
        tagline: 'The jewel of the Amalfi Coast',
        description: 'Positano is the most photographed town on the coast - and rightly so. Its pastel-coloured houses cascade down a steep hillside directly into the sea, creating one of the most spectacular urban landscapes in Europe. The beach is lively, the boutiques are stylish, and the restaurant terraces offer unbeatable views.',
        highlights: ['Spiaggia Grande beach', 'Via dei Mulini shopping', 'Church of Santa Maria Assunta', 'Li Galli islands viewpoint', 'Path of the Gods trailhead'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Amalfi', slug: 'amalfi',
        tagline: 'Once a mighty maritime republic',
        description: 'The namesake town of the coast punches far above its weight. The Cathedral of Sant\'Andrea, with its stunning Arab-Norman façade, dominates the Piazza del Duomo. The historic paper mills of the Valle dei Mulini were producing paper before most of Europe. Amalfi makes an excellent base for exploring the coast by ferry.',
        highlights: ['Cathedral of Sant\'Andrea', 'Valle dei Mulini', 'Piazza del Duomo', 'Grotto dello Smeraldo nearby', 'Ferry connections to all coastal towns'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Ravello', slug: 'ravello',
        tagline: 'The city of music and gardens',
        description: "Perched 350 metres above the sea, Ravello is a world apart from the coastal bustle. Villa Rufolo and Villa Cimbrone offer some of the most celebrated garden terraces in Italy - Wagner drew inspiration here, and Gore Vidal called it home for decades. The Ravello Festival brings world-class music to the clifftop stage each summer.",
        highlights: ['Villa Rufolo gardens', 'Villa Cimbrone terrace', 'Ravello Festival (July–September)', 'Duomo di Ravello', 'Panoramic views over Minori and Maiori'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Praiano', slug: 'praiano',
        tagline: 'The quiet alternative to Positano',
        description: "Just 5 km from Positano but worlds away in atmosphere, Praiano is the coast's best-kept secret for those who want to experience life as a local. Fewer tourists, lower prices, and genuine fishing-village character. The beach at Marina di Praia is one of the most charming on the coast.",
        highlights: ['Marina di Praia beach', 'Furore fjord nearby', 'Hiking the Path of the Gods', 'San Gennaro church', 'Sunset views toward Positano'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Cetara', slug: 'cetara',
        tagline: 'The anchovy capital of the Mediterranean',
        description: "Cetara is the most authentically Italian town on the coast - a genuine fishing village where the main export is colatura di alici, a fermented anchovy sauce prized by chefs across Italy. The beach is uncrowded, the restaurants are excellent value, and the pace of life is gloriously relaxed.",
        highlights: ['Colatura di alici tasting', 'Piazza San Francesco', 'Torre di Cetara', 'Local fish restaurants', 'Peaceful beach'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Vietri sul Mare', slug: 'vietri-sul-mare',
        tagline: 'The gateway to the coast',
        description: 'The eastern gateway to the Amalfi Coast is famed for its distinctive hand-painted ceramics - the colourful tiles that decorate church domes and café walls across southern Italy often originate from Vietri workshops. An ideal first or last stop on any coastal itinerary.',
        highlights: ['Ceramic workshops and studios', 'Church of San Giovanni Battista dome', 'Museo della Ceramica', 'Marina di Vietri beach', 'Accessible from Salerno by bus'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Capri', slug: 'capri',
        tagline: 'The enchanted island of the Naples Bay',
        description: 'Capri is the most celebrated of Campania\'s islands, famous for its dramatic Faraglioni rocks, the legendary Blue Grotto, and exclusive gardens. A preferred destination for generations of artists and notable figures, Capri combines wild natural beauty with sophistication and exclusive lifestyle.',
        highlights: ['The Faraglioni rocks', 'Blue Grotto', 'Villa Jovis', 'Anacapri and the chairlift', 'Marina Piccola'],
        area: 'isole',
      },
      {
        name: 'Ischia', slug: 'ischia',
        tagline: 'The green island of wellness and nature',
        description: 'Ischia is the largest island in the Naples Bay, characterised by sandy beaches, natural thermal springs, and lush vegetation. It\'s the perfect destination for those seeking relaxation, thermal wellness, and authentic local life away from mass tourism.',
        highlights: ['Golden sand beaches', 'Natural thermal springs', 'Mount Epomeo', 'Sant\'Angelo', 'Aleppo pine forest'],
        area: 'isole',
      },
      {
        name: 'Procida', slug: 'procida',
        tagline: 'The colourful island of simplicity',
        description: 'Procida is the smallest and most intimate of Campania\'s islands, famous for its colourful houses reflected in crystal-clear waters. Here time flows at the rhythm of fishermen, far from tourist excesses, offering an authentic and peaceful experience.',
        highlights: ['Corricella', 'Marina Grande', 'Abbey of Saint Michael the Archangel', 'Traditional cheese makers', 'Terrace sunsets'],
        area: 'isole',
      },
      {
        name: 'Sorrento', slug: 'sorrento',
        tagline: 'The gateway to the Sorrentine Peninsula',
        description: 'Sorrento is the pulsing heart of the Sorrentine Peninsula, perched on cliffs high above the sea with breathtaking views of Mount Vesuvius and the islands. The town is renowned for its limoncello, ceramics, and romantic atmosphere that has inspired poets and artists.',
        highlights: ['Piazza Tasso', 'Cloister of San Francesco', 'Museo Correale', 'Marina Grande', 'Views of Mount Vesuvius'],
        area: 'penisola-sorrentina',
      },
      {
        name: 'Vico Equense', slug: 'vico-equense',
        tagline: 'The land of lemons and gastronomic delights',
        description: 'Vico Equense is a charming village perched in the heights of the Sorrentine Peninsula, celebrated for its excellent cuisine, IGP lemons, and warm local hospitality. It\'s the ideal place to savour the authentic flavours of the region away from tourist crowds.',
        highlights: ['Piazza Gesù', 'Church of the Immaculate', 'Lemon market', 'Local cuisine', 'Panoramic views of the coast'],
        area: 'penisola-sorrentina',
      },
      {
        name: 'Massa Lubrense', slug: 'massa-lubrense',
        tagline: 'The border between two seas',
        description: 'Massa Lubrense stretches between the Naples Bay and the Salerno Bay, offering wild beaches, hiking trails, and peace that contrasts with crowded tourist centres. It\'s the ideal destination for those seeking authenticity, nature, and tranquillity.',
        highlights: ['Punta Campanella', 'Gavitella beach', 'Panoramic hiking trails', 'Marina della Lobra', 'Local fishermen'],
        area: 'penisola-sorrentina',
      },
    ],
    beaches: [
      { name: 'Spiaggia Grande', location: 'Positano', description: 'The main beach in Positano, lively and well-equipped with sun loungers and beach clubs.', type: 'Pebble', bestFor: 'Atmosphere & convenience' },
      { name: 'Marina di Praia', location: 'Praiano', description: 'A tiny cove tucked between high cliffs, with crystal-clear water and a wonderfully relaxed atmosphere.', type: 'Pebble & sand', bestFor: 'Snorkelling & peace' },
      { name: 'Lido delle Sirene', location: 'Amalfi', description: 'Close to the centre of Amalfi town, with easy access and fine coastal views.', type: 'Pebble', bestFor: 'Easy access' },
      { name: 'Spiaggia di Cetara', location: 'Cetara', description: 'A laid-back beach in front of the fishing village, well away from the tourist crowds.', type: 'Pebble', bestFor: 'Authentic experience' },
    ],
  },

  'de-de': {
    intro: 'Die Amalfiküste ist einer jener seltenen Orte, die die Erwartungen wirklich übertreffen. Auf 50 Kilometern entlang des südlichen Randes der Sorrentinischen Halbinsel vereint dieses UNESCO-Weltkulturerbe außergewöhnliche Landschaften, uralte Städte und kristallklares Mittelmeerwasser in einer kompakten, dramatischen Kulisse. Steile Klippen stürzen ins Meer, Dörfer klammern sich an terrassierte Hänge, und riesige Zitronen hängen von Pergolen entlang der kurvenreichen Küstenstraße SS163.',
    why_visit: [
      { title: 'Unvergleichliche Landschaften', text: 'Das Zusammenspiel von Bergen, Meer und bunter Architektur schafft Landschaften, die seit Jahrhunderten Maler, Schriftsteller und Filmemacher inspiriert haben. Jede Kurve der Straße offenbart eine neue Postkarten-Ansicht.' },
      { title: 'Reiche Geschichte', text: 'Die Republik Amalfi war einst eine bedeutende mediterrane Seemacht. Ihr Dom aus dem 9. Jahrhundert, die arabisch-normannische Architektur und die alten Papiermühlen erzählen eine Geschichte von Zivilisationen, die über Jahrtausende geschichtet sind.' },
      { title: 'Authentische Küche', text: 'Sfogliatelle, Limoncello, frische Sardellen aus Cetara und Büffelmozzarella aus der nahegelegenen Ebene - allein das Essen rechtfertigt die Reise. Jede Stadt hat ihre eigene kulinarische Spezialität.' },
      { title: 'Vielfältige Erlebnisse', text: 'Ob Wandern auf dem Weg der Götter, Schwimmen in versteckten Meereshöhlen, Erkundung der Gärten von Ravello oder einfach bei einem Aperitif den Sonnenuntergang von einer Klippentetrasse genießen - für jeden Reisenden ist etwas dabei.' },
    ],
    towns: [
      {
        name: 'Positano', slug: 'positano',
        tagline: 'Das Juwel der Amalfiküste',
        description: 'Positano ist die meistfotografierte Stadt an der Küste - und das aus gutem Grund. Die pastellfarbenen Häuser kaskadieren einen steilen Hang direkt ins Meer hinunter und schaffen eine der dramatischsten Stadtlandschaften Europas. Der Strand ist lebhaft, die Boutiquen sind stilvoll, und die Restaurantterrassen bieten unvergessliche Ausblicke.',
        highlights: ['Spiaggia Grande', 'Einkaufen in der Via dei Mulini', 'Kirche Santa Maria Assunta', 'Aussichtspunkt Li-Galli-Inseln', 'Ausgangspunkt Weg der Götter'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Amalfi', slug: 'amalfi',
        tagline: 'Einst eine mächtige Seerepublik',
        description: 'Die namensgebende Stadt der Küste ist weit mehr als ihr bescheidenes Format vermuten lässt. Der Dom Sant\'Andrea mit seiner beeindruckenden arabisch-normannischen Fassade dominiert die Piazza del Duomo. Die historischen Papiermühlen des Valle dei Mulini produzierten Papier, als Europa noch im Dunkeln lag. Amalfi ist der ideale Ausgangspunkt für Fährentouren entlang der Küste.',
        highlights: ['Dom Sant\'Andrea', 'Valle dei Mulini', 'Piazza del Duomo', 'Grotta dello Smeraldo in der Nähe', 'Fährverbindungen zu allen Küstenstädten'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Ravello', slug: 'ravello',
        tagline: 'Die Stadt der Musik und Gärten',
        description: '350 Meter über dem Meer gelegen, ist Ravello eine Welt für sich, weit entfernt vom Trubel der Küste. Villa Rufolo und Villa Cimbrone bieten einige der berühmtesten Gartentetrassen Italiens - Wagner fand hier Inspiration, und Gore Vidal nannte es jahrzehntelang sein Zuhause. Das Ravello Festival bringt weltklasse Musik auf die Klippenbühne.',
        highlights: ['Gärten der Villa Rufolo', 'Terrasse der Villa Cimbrone', 'Ravello Festival (Juli–September)', 'Dom von Ravello', 'Panoramablick über Minori und Maiori'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Praiano', slug: 'praiano',
        tagline: 'Die ruhige Alternative zu Positano',
        description: 'Nur 5 km von Positano entfernt, aber in einer völlig anderen Atmosphäre - Praiano ist das bestgehütete Geheimnis der Küste für alle, die wie Einheimische leben möchten. Weniger Touristen, günstigere Preise und echtes Fischereidorf-Flair. Der Strand von Marina di Praia ist einer der reizvollsten der gesamten Küste.',
        highlights: ['Strand Marina di Praia', 'Fjord von Furore in der Nähe', 'Wanderung auf dem Weg der Götter', 'Kirche San Gennaro', 'Sonnenuntergang in Richtung Positano'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Cetara', slug: 'cetara',
        tagline: 'Die Sardellenhauptstadt des Mittelmeers',
        description: 'Cetara ist die authentischste Stadt an der Küste - ein echtes Fischerdorf, dessen bekanntester Export die Colatura di Alici ist, eine fermentierte Sardellensoße, die von Köchen in ganz Italien geschätzt wird. Der Strand ist wenig überfüllt, die Restaurants sind außergewöhnlich preiswert, und das Lebenstempo ist herrlich gemächlich.',
        highlights: ['Colatura di Alici Verkostung', 'Piazza San Francesco', 'Torre di Cetara', 'Lokale Fischrestaurants', 'Ruhiger Strand'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Vietri sul Mare', slug: 'vietri-sul-mare',
        tagline: 'Das Tor zur Küste',
        description: 'Das östliche Tor zur Amalfiküste ist berühmt für seine unverwechselbaren handbemalten Keramiken - die bunten Fliesen, die Kirchenkuppeln und Café-Wände in Süditalien schmücken, stammen oft aus Vietri-Werkstätten. Ein idealer erster oder letzter Halt auf jedem Küstenbesuch.',
        highlights: ['Keramikwerkstätten und Ateliers', 'Kirchenkuppel San Giovanni Battista', 'Museo della Ceramica', 'Strand Marina di Vietri', 'Erreichbar von Salerno per Bus'],
        area: 'costiera-amalfitana',
      },
    ],
    beaches: [
      { name: 'Spiaggia Grande', location: 'Positano', description: 'Der Hauptstrand von Positano, lebhaft und gut ausgestattet mit Liegestühlen und Strandclubs.', type: 'Kieselstrand', bestFor: 'Atmosphäre & Komfort' },
      { name: 'Marina di Praia', location: 'Praiano', description: 'Eine kleine Bucht, die zwischen hohen Klippen eingeklemmt ist, mit kristallklarem Wasser und entspannter Atmosphäre.', type: 'Kiesel & Sand', bestFor: 'Schnorcheln & Ruhe' },
      { name: 'Lido delle Sirene', location: 'Amalfi', description: 'Nah am Zentrum von Amalfi, mit einfachem Zugang und schönem Blick auf die Küste.', type: 'Kieselstrand', bestFor: 'Einfacher Zugang' },
      { name: 'Strand von Cetara', location: 'Cetara', description: 'Ein entspannter Strand vor dem Fischerdorf, fernab der Touristenmassen.', type: 'Kieselstrand', bestFor: 'Authentisches Erlebnis' },
    ],
  },

  'fr-fr': {
    intro: 'La Côte Amalfitaine est l\'un de ces rares endroits qui dépassent véritablement les attentes. S\'étendant sur 50 kilomètres le long du bord sud de la péninsule Sorrentine, ce site du Patrimoine mondial de l\'UNESCO concentre des paysages extraordinaires, des villes antiques et des eaux méditerranéennes cristallines dans un décor compact et dramatique. Des falaises abruptes plongent dans la mer, des villages s\'accrochent à des collines en terrasses, et d\'énormes citrons pendent des pergolas le long de la sinueuse route côtière SS163.',
    why_visit: [
      { title: 'Des paysages incomparables', text: 'L\'interaction entre les montagnes, la mer et l\'architecture colorée crée des paysages qui inspirent peintres, écrivains et cinéastes depuis des siècles. Chaque virage de la route révèle une nouvelle vue de carte postale.' },
      { title: 'Une riche histoire', text: 'La République d\'Amalfi fut autrefois une grande puissance maritime méditerranéenne. Sa cathédrale du IXe siècle, son architecture arabo-normande et ses anciens moulins à papier racontent une histoire de civilisations superposées sur des millénaires.' },
      { title: 'Une gastronomie authentique', text: 'Sfogliatelle, limoncello, anchois frais de Cetara et mozzarella di bufala des plaines environnantes - la cuisine seule justifie le voyage. Chaque ville a sa propre spécialité culinaire.' },
      { title: 'Des expériences variées', text: 'Que vous souhaitiez randonner sur le Sentier des Dieux, nager dans des grottes marines cachées, explorer les jardins de Ravello ou simplement déguster un Campari en regardant le coucher de soleil depuis une terrasse perchée sur les falaises, la Côte Amalfitaine saura vous combler.' },
    ],
    towns: [
      {
        name: 'Positano', slug: 'positano',
        tagline: 'Le joyau de la Côte Amalfitaine',
        description: 'Positano est la ville la plus photographiée de la côte - et pour cause. Ses maisons aux couleurs pastel dévalent un flanc escarpé directement vers la mer, créant l\'un des paysages urbains les plus dramatiques d\'Europe. La plage est animée, les boutiques sont élégantes, et les terrasses de restaurants offrent des vues incomparables.',
        highlights: ['Plage Spiaggia Grande', 'Shopping Via dei Mulini', 'Église Santa Maria Assunta', 'Belvédère des îles Li Galli', 'Départ du Sentier des Dieux'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Amalfi', slug: 'amalfi',
        tagline: 'Ancienne puissante république maritime',
        description: 'La ville éponyme de la côte est bien plus que sa taille modeste ne le laisse supposer. La cathédrale Sant\'Andrea, avec sa somptueuse façade arabo-normande, domine la Piazza del Duomo. Les anciens moulins à papier de la Valle dei Mulini produisaient du papier avant la majeure partie de l\'Europe. Amalfi est la base idéale pour explorer la côte en ferry.',
        highlights: ['Cathédrale Sant\'Andrea', 'Valle dei Mulini', 'Piazza del Duomo', 'Grotte Émeraude à proximité', 'Liaisons en ferry vers toutes les villes côtières'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Ravello', slug: 'ravello',
        tagline: 'La cité de la musique et des jardins',
        description: 'Perché à 350 mètres au-dessus de la mer, Ravello est un autre monde, loin de l\'agitation côtière. La Villa Rufolo et la Villa Cimbrone offrent quelques-unes des terrasses de jardins les plus célèbres d\'Italie - Wagner y trouva l\'inspiration, et Gore Vidal en fit sa résidence pendant des décennies. Le Festival de Ravello apporte chaque été une musique de classe mondiale sur la scène des falaises.',
        highlights: ['Jardins de la Villa Rufolo', 'Terrasse de la Villa Cimbrone', 'Festival de Ravello (juillet–septembre)', 'Cathédrale de Ravello', 'Panoramas sur Minori et Maiori'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Praiano', slug: 'praiano',
        tagline: 'L\'alternative tranquille à Positano',
        description: 'À seulement 5 km de Positano mais dans une atmosphère totalement différente, Praiano est le secret le mieux gardé de la côte pour ceux qui souhaitent vivre comme les locaux. Moins de touristes, des prix plus abordables et un vrai caractère de village de pêcheurs. La plage de Marina di Praia est l\'une des plus charmantes de la côte.',
        highlights: ['Plage de Marina di Praia', 'Fjord de Furore à proximité', 'Randonnée sur le Sentier des Dieux', 'Église San Gennaro', 'Couchers de soleil vers Positano'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Cetara', slug: 'cetara',
        tagline: 'La capitale de l\'anchois de Méditerranée',
        description: 'Cetara est la ville la plus authentiquement italienne de la côte - un vrai village de pêcheurs dont la principale exportation est la colatura di alici, une sauce d\'anchois fermentée prisée par les chefs dans toute l\'Italie. La plage est peu fréquentée, les restaurants sont d\'un excellent rapport qualité-prix, et le rythme de vie est délicieusement tranquille.',
        highlights: ['Dégustation de colatura di alici', 'Piazza San Francesco', 'Torre di Cetara', 'Restaurants de poissons locaux', 'Plage tranquille'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Vietri sul Mare', slug: 'vietri-sul-mare',
        tagline: 'La porte d\'entrée de la côte',
        description: 'La porte d\'entrée orientale de la Côte Amalfitaine est célèbre pour ses céramiques peintes à la main - les carreaux colorés qui ornent les coupoles d\'églises et les murs de cafés dans tout le sud de l\'Italie proviennent souvent des ateliers de Vietri. C\'est l\'arrêt idéal pour commencer ou terminer tout itinéraire côtier.',
        highlights: ['Ateliers et studios de céramique', 'Coupole de l\'église San Giovanni Battista', 'Museo della Ceramica', 'Plage de Marina di Vietri', 'Accessible depuis Salerne en bus'],
        area: 'costiera-amalfitana',
      },
    ],
    beaches: [
      { name: 'Spiaggia Grande', location: 'Positano', description: 'La plage principale de Positano, animée et bien équipée avec transats et clubs de plage.', type: 'Galets', bestFor: 'Ambiance & commodité' },
      { name: 'Marina di Praia', location: 'Praiano', description: 'Une petite crique nichée entre de hautes falaises, avec une eau cristalline et une atmosphère apaisante.', type: 'Galets & sable', bestFor: 'Plongée & tranquillité' },
      { name: 'Lido delle Sirene', location: 'Amalfi', description: 'Proche du centre-ville d\'Amalfi, avec un accès facile et de belles vues sur la côte.', type: 'Galets', bestFor: 'Accès facile' },
      { name: 'Plage de Cetara', location: 'Cetara', description: 'Une plage détendue devant le village de pêcheurs, loin des foules touristiques.', type: 'Galets', bestFor: 'Expérience authentique' },
    ],
  },

  'es-es': {
    intro: 'La Costa Amalfitana es uno de esos lugares raros que genuinamente superan las expectativas. Extendiéndose 50 kilómetros a lo largo del borde sur de la Península Sorrentina, este Patrimonio Mundial de la UNESCO concentra paisajes extraordinarios, ciudades antiguas y aguas mediterráneas cristalinas en un paisaje compacto y dramático. Los acantilados verticales se precipitan al mar, los pueblos se aferran a colinas en terrazas, y enormes limones cuelgan de pérgolas a lo largo de la sinuosa carretera costera SS163.',
    why_visit: [
      { title: 'Paisajes incomparables', text: 'La interacción entre montañas, mar y arquitectura colorida crea paisajes que han inspirado a pintores, escritores y cineastas durante siglos. Cada curva del camino revela una nueva vista de postal.' },
      { title: 'Rica historia', text: 'La República de Amalfi fue una vez una importante potencia marítima mediterránea. Su catedral del siglo IX, la arquitectura árabe-normanda y los antiguos molinos de papel cuentan una historia de civilizaciones estratificadas a lo largo de milenios.' },
      { title: 'Gastronomía auténtica', text: 'Sfogliatelle, limoncello, anchoas frescas de Cetara y mozzarella de búfala de las llanuras cercanas - la comida sola justifica el viaje. Cada ciudad tiene su propia especialidad culinaria.' },
      { title: 'Experiencias diversas', text: 'Ya sea que prefieras hacer senderismo por el Camino de los Dioses, nadar en cuevas marinas escondidas, explorar los jardines de Ravello o simplemente tomar un Campari viendo el atardecer desde una terraza en los acantilados, hay algo para cada viajero.' },
    ],
    towns: [
      {
        name: 'Positano', slug: 'positano',
        tagline: 'La joya de la Costa Amalfitana',
        description: 'Positano es el pueblo más fotografiado de la costa - y con razón. Sus casas de colores pastel caen en cascada por una empinada ladera directamente hasta el mar, creando uno de los paisajes urbanos más dramáticos de Europa. La playa es animada, las boutiques son elegantes y las terrazas de los restaurantes ofrecen vistas insuperables.',
        highlights: ['Playa Spiaggia Grande', 'Compras en Via dei Mulini', 'Iglesia Santa Maria Assunta', 'Mirador islas Li Galli', 'Inicio del Camino de los Dioses'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Amalfi', slug: 'amalfi',
        tagline: 'Antigua y poderosa república marítima',
        description: 'La ciudad que da nombre a la costa tiene mucho más de lo que su tamaño sugiere. La Catedral de Sant\'Andrea, con su impresionante fachada árabe-normanda, domina la Piazza del Duomo. Los históricos molinos de papel del Valle dei Mulini producían papel antes que la mayor parte de Europa. Amalfi es la base perfecta para explorar la costa en ferry.',
        highlights: ['Catedral de Sant\'Andrea', 'Valle dei Mulini', 'Piazza del Duomo', 'Gruta Esmeralda cercana', 'Conexiones en ferry a todos los pueblos costeros'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Ravello', slug: 'ravello',
        tagline: 'La ciudad de la música y los jardines',
        description: 'Encaramada a 350 metros sobre el mar, Ravello es un mundo aparte del bullicio costero. La Villa Rufolo y la Villa Cimbrone ofrecen algunas de las terrazas de jardines más celebradas de Italia - Wagner encontró inspiración aquí, y Gore Vidal la llamó su hogar durante décadas. El Festival de Ravello trae música de clase mundial al escenario en los acantilados cada verano.',
        highlights: ['Jardines de Villa Rufolo', 'Terraza de Villa Cimbrone', 'Festival de Ravello (julio–septiembre)', 'Duomo di Ravello', 'Vistas panorámicas sobre Minori y Maiori'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Praiano', slug: 'praiano',
        tagline: 'La alternativa tranquila a Positano',
        description: 'A solo 5 km de Positano pero en un ambiente completamente diferente, Praiano es el secreto mejor guardado de la costa para quienes quieren vivir como un local. Menos turistas, precios más bajos y genuino carácter de pueblo pesquero. La playa de Marina di Praia es una de las más encantadoras de toda la costa.',
        highlights: ['Playa Marina di Praia', 'Fiordo de Furore cercano', 'Senderismo en el Camino de los Dioses', 'Iglesia San Gennaro', 'Atardeceres hacia Positano'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Cetara', slug: 'cetara',
        tagline: 'La capital de la anchoa del Mediterráneo',
        description: 'Cetara es el pueblo más auténticamente italiano de la costa - un genuino pueblo de pescadores cuya principal exportación es la colatura di alici, una salsa de anchoas fermentada apreciada por los chefs de toda Italia. La playa no está abarrotada, los restaurantes tienen una excelente relación calidad-precio y el ritmo de vida es gloriosamente tranquilo.',
        highlights: ['Degustación de colatura di alici', 'Piazza San Francesco', 'Torre di Cetara', 'Restaurantes locales de pescado', 'Playa tranquila'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Vietri sul Mare', slug: 'vietri-sul-mare',
        tagline: 'La puerta de entrada a la costa',
        description: 'La puerta de entrada oriental a la Costa Amalfitana es famosa por sus distintivas cerámicas pintadas a mano - los coloridos azulejos que decoran cúpulas de iglesias y paredes de cafés en todo el sur de Italia suelen provenir de los talleres de Vietri. Es la parada ideal para comenzar o terminar cualquier itinerario costero.',
        highlights: ['Talleres y estudios de cerámica', 'Cúpula de la iglesia San Giovanni Battista', 'Museo della Ceramica', 'Playa Marina di Vietri', 'Accesible desde Salerno en autobús'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Maiori', slug: 'maiori',
        tagline: 'La playa más grande de la costa',
        description: 'Maiori es el centro de playa por excelencia de la Costa Amalfitana, con la playa más larga y arenosa de la costa. Perfecta para familias y quienes aman el sol sin prisa, ofrece una amplia variedad de establecimientos, restaurantes y tiendas, manteniendo una atmósfera genuina y acogedora.',
        highlights: ['Playa Grande de arena fina', 'Basílica de Santa María del Mar', 'Establecimientos de playa modernos', 'Sendero costero hacia Minori', 'Gastronomía local auténtica'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Minori', slug: 'minori',
        tagline: 'El pueblo dulce de la costa',
        description: 'Minori es el gemelo afectuoso de Maiori, más pequeño y tranquilo, perfecto para quienes buscan una playa hermosa sin las multitudes. Es famosa por sus limones, delicias gastronómicas y la producción de licores tradicionales. La villa romana que se asoma al mar es un tesoro arqueológico único.',
        highlights: ['Playa arenosa tranquila', 'Villa romana con museo', 'Producción de licores y dulces típicos', 'Paseos por el corso', 'Acceso al sendero costero'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Capri', slug: 'capri',
        tagline: 'La isla encantada del golfo de Nápoles',
        description: 'Capri es la más célebre de las islas campanas, con sus vertiginosos Farallones, grutas azules y jardines exclusivos. Un destino predilecto de generaciones de artistas y personajes ilustres, Capri combina belleza natural salvaje con elegancia y estilo de vida sofisticado.',
        highlights: ['Los Farallones', 'Gruta Azul', 'Villa Jovis', 'Anacapri y la Silla elevada', 'Marina Piccola'],
        area: 'isole',
      },
      {
        name: 'Ischia', slug: 'ischia',
        tagline: 'La isla verde del bienestar y la naturaleza',
        description: 'Ischia es la isla más grande del golfo de Nápoles, caracterizada por playas de arena, fuentes termales naturales y una vegetación exuberante. Es el destino perfecto para quienes buscan relajación, bienestar termal y una vida local auténtica lejos de los circuitos turísticos masificados.',
        highlights: ['Playas de arena dorada', 'Termas naturales', 'Monte Epomeo', 'Sant\'Angelo', 'Bosque de pinos de Alepo'],
        area: 'isole',
      },
      {
        name: 'Procida', slug: 'procida',
        tagline: 'La isla colorida de la simplicidad',
        description: 'Procida es la más pequeña e íntima de las islas campanas, famosa por sus casas de colores que se reflejan en el mar cristalino. Aquí el tiempo transcurre al ritmo de los pescadores, lejos de los excesos turísticos, ofreciendo una experiencia auténtica y relajante.',
        highlights: ['Corricella', 'Marina Grande', 'Abadía de San Miguel Arcángel', 'Quesería tradicional', 'Atardeceres desde las terrazas'],
        area: 'isole',
      },
      {
        name: 'Sorrento', slug: 'sorrento',
        tagline: 'La puerta de la Península de Sorrento',
        description: 'Sorrento es el corazón palpitante de la Península de Sorrento, encaramado en acantilados a pico sobre el mar con vistas de infarto al Vesubio y las islas. La ciudad es renombrada por su limoncello, cerámica y atmósferas románticas que han inspirado a poetas y artistas.',
        highlights: ['Plaza Tasso', 'Claustro de San Francisco', 'Museo Correale', 'Marina Grande', 'Vistas al Vesubio'],
        area: 'penisola-sorrentina',
      },
      {
        name: 'Vico Equense', slug: 'vico-equense',
        tagline: 'El balcón de la Península de Sorrento',
        description: 'Encaramado a 140 metros sobre el mar, Vico Equense ofrece vistas panorámicas espectaculares sobre el Golfo de Nápoles. Menos turístico que Sorrento pero igualmente encantador, es conocido por sus fábricas de pasta de mozzarella y su auténtica cocina local.',
        highlights: ['Vistas panorámicas del golfo', 'Iglesia de Nuestra Señora de Graccias', 'Fábricas de mozzarella', 'Marina d\'Equa', 'Gastronomía local'],
        area: 'penisola-sorrentina',
      },
      {
        name: 'Massa Lubrense', slug: 'massa-lubrense',
        tagline: 'La joya oculta de la Península de Sorrento',
        description: 'Masa Lubrense es un pueblo pintoresco que combina la belleza natural con la tranquilidad local. Menos conocido que sus vecinos, ofrece auténticas calas de playa, restaurantes de pescado fresco y vistas impresionantes sin las multitudes de turismo masificado.',
        highlights: ['Playa de Termini', 'Iglesia de Nuestra Señora de Lobra', 'Calas escondidas', 'Restaurantes de pescado local', 'Senderos costeros'],
        area: 'penisola-sorrentina',
      },
      {
        name: 'Sant\'Agnello', slug: 'sant-agnello',
        tagline: 'La puerta occidental de la Península de Sorrento',
        description: 'Situado en el extremo occidental de la Península de Sorrento, Sant\'Agnello es una fusión perfecta de Sorrento con una sensación más local y relajada. Las casas se extienden sobre terrazas con vistas al golfo y ofrece un excelente acceso a las playas.',
        highlights: ['Vistas al Golfo de Nápoles', 'Playa de Deserto', 'Iglesia Santa Maria Assunta', 'Fácil acceso a Positano en ferry', 'Ritmo relajado'],
        area: 'penisola-sorrentina',
      },
    ],
    beaches: [
      { name: 'Spiaggia Grande', location: 'Positano', description: 'La playa principal de Positano, animada y bien equipada con tumbonas y clubs de playa.', type: 'Guijarros', bestFor: 'Ambiente y comodidad' },
      { name: 'Marina di Praia', location: 'Praiano', description: 'Una pequeña cala encajada entre altos acantilados, con agua cristalina y ambiente relajado.', type: 'Guijarros y arena', bestFor: 'Snorkel y tranquilidad' },
      { name: 'Lido delle Sirene', location: 'Amalfi', description: 'Cerca del centro de Amalfi, con fácil acceso y vistas a la costa.', type: 'Guijarros', bestFor: 'Fácil acceso' },
      { name: 'Playa de Cetara', location: 'Cetara', description: 'Una playa relajada frente al pueblo de pescadores, lejos de las multitudes turísticas.', type: 'Guijarros', bestFor: 'Experiencia auténtica' },
    ],
  },

  'it-it': {
    intro: 'La Costiera Amalfitana è uno di quei rari luoghi che superano genuinamente le aspettative. Estendendosi per 50 chilometri lungo il bordo meridionale della Penisola Sorrentina, questo Sito del Patrimonio Mondiale dell\'UNESCO concentra paesaggi straordinari, borghi antichi e acque mediterranee cristalline in un paesaggio compatto e drammatico. Scogliere verticali si tuffano nel mare, i villaggi si aggrappano ai fianchi delle colline terrazzate, e limoni enormi pendono dai pergolati lungo la tortuosa strada costiera SS163.',
    why_visit: [
      { title: 'Paesaggi senza pari', text: 'L\'interazione tra monti, mare e architettura colorata crea paesaggi che hanno ispirato pittori, scrittori e registi per secoli. Ogni curva della strada svela un nuovo panorama da cartolina.' },
      { title: 'Storia millenaria', text: 'La Repubblica di Amalfi fu una delle più grandi potenze marittime del Mediterraneo. Il suo Duomo del IX secolo, l\'architettura arabo-normanna e le antiche cartiere raccontano una storia di civiltà stratificate nel corso dei millenni.' },
      { title: 'Sapori autentici', text: 'Sfogliatelle, limoncello, alici fresche di Cetara e mozzarella di bufala delle pianure vicine - il cibo da solo giustifica il viaggio. Ogni paese ha la propria specialità culinaria.' },
      { title: 'Esperienze per tutti', text: 'Che tu voglia percorrere il Sentiero degli Dei, nuotare in grotte marine nascoste, esplorare i giardini di Ravello o semplicemente sorseggiare un Campari guardando il tramonto da una terrazza sul mare, la Costiera ha qualcosa per ogni viaggiatore.' },
    ],
    towns: [
      {
        name: 'Positano', slug: 'positano',
        tagline: 'Il gioiello della Costiera Amalfitana',
        description: 'Positano è il borgo più fotografato della costiera - e per buone ragioni. Le sue case dai colori pastello scendono a cascata lungo un ripido pendio direttamente verso il mare, creando uno dei paesaggi urbani più drammatici d\'Europa. La spiaggia è vivace, le boutique sono eleganti e le terrazze dei ristoranti offrono viste impareggiabili.',
        highlights: ['Spiaggia Grande', 'Shopping in Via dei Mulini', 'Chiesa di Santa Maria Assunta', 'Belvedere isole Li Galli', 'Punto di partenza del Sentiero degli Dei'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Amalfi', slug: 'amalfi',
        tagline: 'Un tempo potente repubblica marinara',
        description: 'La città che dà il nome alla costiera vale molto più di quanto le sue dimensioni suggeriscano. Il Duomo di Sant\'Andrea, con la sua straordinaria facciata arabo-normanna, domina la Piazza del Duomo. Le storiche cartiere della Valle dei Mulini producevano carta prima della maggior parte dell\'Europa. Amalfi è la base ideale per esplorare la costiera in traghetto.',
        highlights: ['Duomo di Sant\'Andrea', 'Valle dei Mulini', 'Piazza del Duomo', 'Grotta dello Smeraldo nelle vicinanze', 'Traghetti per tutti i paesi della costiera'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Ravello', slug: 'ravello',
        tagline: 'La città della musica e dei giardini',
        description: 'Arroccata a 350 metri sul mare, Ravello è un mondo a parte rispetto all\'animazione costiera. Villa Rufolo e Villa Cimbrone offrono alcune delle terrazze di giardini più celebrate d\'Italia - Wagner vi trovò ispirazione, e Gore Vidal la chiamò casa per decenni. Il Ravello Festival porta musica di livello mondiale sulla scena affacciata sui dirupi ogni estate.',
        highlights: ['Giardini di Villa Rufolo', 'Terrazza di Villa Cimbrone', 'Ravello Festival (luglio–settembre)', 'Duomo di Ravello', 'Panorama su Minori e Maiori'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Praiano', slug: 'praiano',
        tagline: 'L\'alternativa tranquilla a Positano',
        description: 'A soli 5 km da Positano ma in un\'atmosfera completamente diversa, Praiano è il segreto meglio custodito della costiera per chi vuole vivere come un locale. Meno turisti, prezzi più bassi e un genuino carattere di villaggio di pescatori. La spiaggia di Marina di Praia è una delle più suggestive di tutta la costiera.',
        highlights: ['Spiaggia di Marina di Praia', 'Fiordo di Furore nelle vicinanze', 'Escursione sul Sentiero degli Dei', 'Chiesa di San Gennaro', 'Tramonti verso Positano'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Cetara', slug: 'cetara',
        tagline: 'La capitale delle alici del Mediterraneo',
        description: 'Cetara è il paese più autenticamente italiano della costiera - un vero villaggio di pescatori la cui principale esportazione è la colatura di alici, una salsa di alici fermentata apprezzata dai cuochi di tutta Italia. La spiaggia non è affollata, i ristoranti offrono un ottimo rapporto qualità-prezzo e il ritmo di vita è gloriosamente tranquillo.',
        highlights: ['Degustazione di colatura di alici', 'Piazza San Francesco', 'Torre di Cetara', 'Ristoranti locali di pesce', 'Spiaggia tranquilla'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Vietri sul Mare', slug: 'vietri-sul-mare',
        tagline: 'La porta d\'accesso alla costiera',
        description: 'La porta orientale della Costiera Amalfitana è famosa per le sue caratteristiche ceramiche dipinte a mano - le colorate mattonelle che decorano cupole di chiese e pareti di caffè in tutto il Sud Italia spesso provengono dalle botteghe di Vietri. È la tappa ideale per iniziare o concludere qualsiasi itinerario costiero.',
        highlights: ['Botteghe e studi di ceramica', 'Cupola della chiesa di San Giovanni Battista', 'Museo della Ceramica', 'Spiaggia di Marina di Vietri', 'Raggiungibile da Salerno in autobus'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Marina di Praia', slug: 'marina-di-praia',
        tagline: 'La spiaggia incantata di Praiano',
        description: 'Marina di Praia è una delle spiagge più affascinanti della Costiera Amalfitana, incastonata in una stretta gola tra due scogliere frastagliate. L\'acqua è cristallina, la spiaggia è piccola e intima, perfetta per chi vuole sfuggire alle folle. Il tramonto da Marina di Praia è uno dei più spettacolari della costiera.',
        highlights: ['Spiaggia intima e tranquilla', 'Acqua cristallina per lo snorkeling', 'Tramonti spettacolari', 'Ristoranti con tavoli sulla spiaggia', 'Accesso dal Sentiero degli Dei'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Maiori', slug: 'maiori',
        tagline: 'La spiaggia più grande della costiera',
        description: 'Maiori è il centro balneare per eccellenza della Costiera Amalfitana, con la spiaggia più lunga e sabbiosa della costa. Perfetta per famiglie e chi ama il sole senza fretta, offre una vasta scelta di stabilimenti balneari, ristoranti e negozi, mantenendo un\'atmosfera genuina e accogliente.',
        highlights: ['Spiaggia Grande di sabbia fine', 'Basilica di Santa Maria a Mare', 'Stabilimenti balneari moderni', 'Sentiero costiero verso Minori', 'Cucina locale autentica'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Minori', slug: 'minori',
        tagline: 'Il borgo dolce della costiera',
        description: 'Minori è il gemello affettuoso di Maiori, più piccolo e tranquillo, perfetto per chi cerca una spiaggia bella senza l\'affollamento. È famosa per i limoni, le delizie gastronomiche e la produzione di liquori tradizionali. La villa romana che si affaccia sul mare è un tesoro archeologico unico.',
        highlights: ['Spiaggia sabbiosa tranquilla', 'Villa romana con museo', 'Produzione di liquori e dolci tipici', 'Passeggiate lungo il corso', 'Accesso al sentiero costiero'],
        area: 'costiera-amalfitana',
      },
      {
        name: 'Capri', slug: 'capri',
        tagline: 'L\'isola incantata del golfo di Napoli',
        description: 'Capri è la più celebre tra le isole campane, con i suoi vertiginosi Faraglioni, le grotte blu e i giardini esclusivi. Una meta prediletta da generazioni di artisti e personaggi illustri, Capri combina bellezza naturale selvaggia con eleganza e lifestyle sofisticato.',
        highlights: ['I Faraglioni', 'Grotta Azzurra', 'Villa Jovis', 'Anacapri e la Seggiovia', 'Marina Piccola'],
        area: 'isole',
      },
      {
        name: 'Ischia', slug: 'ischia',
        tagline: 'L\'isola verde del benessere e della natura',
        description: 'Ischia è l\'isola più grande del golfo di Napoli, caratterizzata da spiagge sabbiose, sorgenti termali naturali e lussureggiante vegetazione. È la destinazione perfetta per chi cerca relax, benessere termale e una vita locale autentica lontana dai circuiti turistici di massa.',
        highlights: ['Spiagge di sabbia dorata', 'Terme naturali', 'Monte Epomeo', 'Sant\'Angelo', 'Foresta di pini d\'Aleppo'],
        area: 'isole',
      },
      {
        name: 'Procida', slug: 'procida',
        tagline: 'L\'isola colorata della semplicità',
        description: 'Procida è la più piccola e intima delle isole campane, famosa per i suoi case colorate che si riflettono sul mare cristallino. Qui il tempo scorre al ritmo dei pescatori, lontano dagli eccessi turistici, offendo un\'esperienza autentica e rilassante.',
        highlights: ['Corricella', 'Marina Grande', 'Abbazia di San Michele Arcangelo', 'Caseifici tradizionali', 'Tramonti dai terrazzi'],
        area: 'isole',
      },
      {
        name: 'Sorrento', slug: 'sorrento',
        tagline: 'La porta della Penisola Sorrentina',
        description: 'Sorrento è il cuore pulsante della Penisola Sorrentina, arroccata su falesie a picco sul mare con viste mozzafiato sul Vesuvio e sulle isole. La città è rinomata per il limoncello, la ceramica e le atmosfere romantiche che hanno ispirato poeti e artisti.',
        highlights: ['Piazza Tasso', 'Chiostro di San Francesco', 'Museo Correale', 'Marina Grande', 'Viste sul Vesuvio'],
        area: 'penisola-sorrentina',
      },
      {
        name: 'Vico Equense', slug: 'vico-equense',
        tagline: 'La terra dei limoni e delle delizie gastronomiche',
        description: 'Vico Equense è un affascinante borgo arroccato sulle alture della Penisola Sorrentina, celebre per la sua eccellente cucina, i limoni IGP e la calorosa ospitalità locale. È il luogo ideale per assaporare i sapori autentici della regione lontano dalla folla turistica.',
        highlights: ['Piazza Gesù', 'Chiesa dell\'Immacolata', 'Mercato dei limoni', 'Cucina locale', 'Panorami sulla costiera'],
        area: 'penisola-sorrentina',
      },
      {
        name: 'Massa Lubrense', slug: 'massa-lubrense',
        tagline: 'Il confine tra due mari',
        description: 'Massa Lubrense si estende tra il Golfo di Napoli e il Golfo di Salerno, offrendo spiagge selvagge, sentieri escursionistici e una pace che contrasta con i centri turistici affollati. È la meta ideale per chi cerca autenticità, natura e tranquillità.',
        highlights: ['Punta Campanella', 'Spiaggia Gavitella', 'Sentieri panoramici', 'Marina della Lobra', 'Pescatori locali'],
        area: 'penisola-sorrentina',
      },
      {
        name: 'Sant\'Agnello', slug: 'sant-agnello',
        tagline: 'Il balcone sul golfo',
        description: 'Sant\'Agnello è un piccolo gioiello della Penisola Sorrentina, arroccato su un promontorio con vista spettacolare sul Golfo di Napoli. Famosa per la sua chiesa e le terrazze panoramiche, offre un\'esperienza più autentica e rilassata rispetto alla vicina Sorrento, pur mantenendo tutti i servizi necessari.',
        highlights: ['Basilica di Sant\'Agnello', 'Terrazza panoramica sul golfo', 'Marina privata', 'Ristoranti con vista', 'Sentieri verso Sorrento'],
        area: 'penisola-sorrentina',
      },
    ],
    beaches: [
      { name: 'Spiaggia Grande', location: 'Positano', description: 'La spiaggia principale di Positano, vivace e ben attrezzata con lettini e stabilimenti balneari.', type: 'Ciottoli', bestFor: 'Atmosfera e comodità' },
      { name: 'Marina di Praia', location: 'Praiano', description: 'Una piccola caletta incastonata tra alte scogliere, con acqua cristallina e un\'atmosfera rilassata.', type: 'Ciottoli e sabbia', bestFor: 'Snorkeling e pace' },
      { name: 'Lido delle Sirene', location: 'Amalfi', description: 'Vicino al centro di Amalfi, con facile accesso e belle viste sulla costiera.', type: 'Ciottoli', bestFor: 'Facile accesso' },
      { name: 'Spiaggia di Cetara', location: 'Cetara', description: 'Una spiaggia rilassata di fronte al villaggio di pescatori, lontana dalle folle turistiche.', type: 'Ciottoli', bestFor: 'Esperienza autentica' },
    ],
  },
};
