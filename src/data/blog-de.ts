export interface BlogPostDe {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  path: string;
}

export const blogPostsDe: BlogPostDe[] = [
  {
    id: '09',
    title: 'Die Goldene Stunde: Wo Man den Sonnenuntergang am Strand Bewundern Kann',
    slug: 'goldene-stunde-sonnenuntergang',
    excerpt: 'La Gavitella in Praiano, Bäder der Königin Giovanna, Positano Fornillo, Marina di Cassano: die besten Aussichtspunkte, um den Sonnenuntergang über der Küste zu beobachten.',
    category: 'REISEFÜHRER',
    date: '28. April 2026',
    readTime: '8 min',
    image: '/images/tramonto-costiera.jpg',
    path: '/de-de/blog/goldene-stunde-sonnenuntergang/',
  },
  {
    id: '08',
    title: 'Komfort und Entspannung: Zugängliche und Gut Ausgestattete Strände',
    slug: 'zugaengliche-ausgestattete-straende',
    excerpt: 'Maiori mit seinem Kilometer langer Strand, Minori im Herzen des Dorfes, Atrani das bestgehütete Geheimnis: Strände ohne Stufen und voll mit Einrichtungen.',
    category: 'REISEFÜHRER',
    date: '28. April 2026',
    readTime: '8 min',
    image: '/images/spiagge-bambini.jpg',
    path: '/de-de/blog/zugaengliche-ausgestattete-straende/',
  },
  {
    id: '07',
    title: 'Wilde Oasen: Strände Nur Auf Dem Seeweg Erreichbar',
    slug: 'wilde-oasen-seeweg',
    excerpt: 'Santa Croce in Amalfi, Cavallo Morto in Maiori, La Vite in Conca dei Marini: geheime Buchten, die nur mit dem Boot erreichbar sind, mit den reinsten unterirdischen Quellen.',
    category: 'REISEFÜHRER',
    date: '28. April 2026',
    readTime: '9 min',
    image: '/images/spiagge-selvagge.jpg',
    path: '/de-de/blog/wilde-oasen-seeweg/',
  },
  {
    id: '01',
    title: 'Smaragdgrotte: Der vollständige Reiseführer zum Juwel von Conca dei Marini',
    slug: 'smaragd-grotte',
    excerpt: '1932 von einem lokalen Fischer entdeckt: eine versunkene Welt aus Stalaktiten, smaragdgrünen Reflexen und einer Unterwasser-Weihnachtskrippe.',
    category: 'ENTDECKUNGEN',
    date: '22. April 2026',
    readTime: '6 min',
    image: '/images/grotta-smeraldo-hero.webp',
    path: '/de-de/blog/smaragd-grotte/',
  },
  {
    id: '06',
    title: 'Weine der Amalfiküste: Eine Reise durch die heroischen Weinberge von Tramonti und Scala',
    slug: 'amalfi-weine',
    excerpt: '200 Jahre alte Prä-Phylloxera-Reben, fast ausgestorbene einheimische Rebsorten und Handlese auf steilen Terrassen: die Geschichte der DOC Amalfiküste.',
    category: 'KULINARIK',
    date: '22. April 2026',
    readTime: '8 min',
    image: '/images/vini-costa-amalfi-hero.jpg',
    path: '/de-de/blog/amalfi-weine/',
  },
  {
    id: '05',
    title: 'Atrani: Italiens kleinstes Dorf, in dem die Zeit stehen geblieben ist',
    slug: 'atrani',
    excerpt: '700 Meter von Amalfi entfernt, Italiens kleinste Gemeinde (0,12 km²): ein mittelalterliches Amphitheater aus weißen Gassen, die Doges-Kirche und das Set von Ripley auf Netflix.',
    category: 'ENTDECKUNGEN',
    date: '22. April 2026',
    readTime: '6 min',
    image: '/images/atrani-hero.jpg',
    path: '/de-de/blog/atrani/',
  },
  {
    id: '04',
    title: 'Zitronen-Köstlichkeit: Geschichte und Geheimnisse der beliebtesten Kuppel der Küste',
    slug: 'zitronen-koestlichkeit',
    excerpt: '1978 von einem Konditormeister aus Sorrent erfunden, ist die Delizia al Limone die Essenz der Küstensonne, eingeschlossen in einer Kuppel aus Biskuitteig und Zitronencreme.',
    category: 'KULINARIK',
    date: '22. April 2026',
    readTime: '7 min',
    image: '/images/delizia-limone-hero.jpg',
    path: '/de-de/blog/zitronen-koestlichkeit/',
  },
  {
    id: '03',
    title: 'Ferriere-Tal: Wandern im wilden grünen Herzen von Amalfi',
    slug: 'ferriere-tal',
    excerpt: 'Prähistorische Farne, Wasserfälle und Ruinen mittelalterlicher Papiermühlen: das bestgehütete Geheimnis der Küste, nur wenige Gehminuten vom Zentrum Amolfis entfernt.',
    category: 'ENTDECKUNGEN',
    date: '22. April 2026',
    readTime: '8 min',
    image: '/images/valle-ferriere-hero.jpg',
    path: '/de-de/blog/ferriere-tal/',
  },
  {
    id: '02',
    title: 'Cetara-Sardellen: Das Silbergold der Amalfiküste',
    slug: 'cetara-sardellen',
    excerpt: 'Vom Eichenfass bis auf den Tisch: die Geschichte der g.U.-Colatura, Erbin des römischen Garum, und der Spaghetti alla Colatura, das Kultgericht eines Dorfes mit 2.000 Seelen.',
    category: 'KULINARIK',
    date: '22. April 2026',
    readTime: '7 min',
    image: '/images/alici-cetara-hero.jpg',
    path: '/de-de/blog/cetara-sardellen/',
  },
];
