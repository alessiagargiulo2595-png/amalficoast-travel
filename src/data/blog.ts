export interface BlogPost {
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

export const blogPosts: BlogPost[] = [
  {
    id: '09',
    title: 'L\'Ora d\'Oro: Dove Ammirare il Tramonto in Spiaggia',
    slug: 'tramonto-spiaggia-costiera',
    excerpt: 'La Gavitella a Praiano, Bagni della Regina Giovanna, Positano Fornillo, Marina di Cassano: i migliori punti per ammirare il sole che cala sulla Costiera.',
    category: 'GUIDE',
    date: '28 Aprile 2026',
    readTime: '8 min',
    image: '/images/tramonto-costiera.jpg',
    path: '/it-it/blog/tramonto-spiaggia-costiera/',
  },
  {
    id: '08',
    title: 'Comodità e Relax: Le Spiagge Accessibili e Attrezzate',
    slug: 'spiagge-comode-attrezzate',
    excerpt: 'Maiori con il suo chilometro di spiaggia, Minori nel cuore del paese, Atrani il segreto meglio custodito: spiagge senza scalini e piene di servizi.',
    category: 'GUIDE',
    date: '28 Aprile 2026',
    readTime: '8 min',
    image: '/images/spiagge-bambini.jpg',
    path: '/it-it/blog/spiagge-comode-attrezzate/',
  },
  {
    id: '07',
    title: 'Oasi Selvagge: Le Spiagge Raggiungibili Solo via Mare',
    slug: 'oasi-selvagge-spiagge-mare',
    excerpt: 'Santa Croce ad Amalfi, Cavallo Morto a Maiori, La Vite a Conca dei Marini: calette segrete accessibili solo in barca con le sorgenti sottomarine più pure.',
    category: 'GUIDE',
    date: '28 Aprile 2026',
    readTime: '9 min',
    image: '/images/spiagge-selvagge.jpg',
    path: '/it-it/blog/oasi-selvagge-spiagge-mare/',
  },
  {
    id: '01',
    title: 'Grotta dello Smeraldo: Guida alla Perla di Conca dei Marini',
    slug: 'grotta-dello-smeraldo',
    excerpt: 'Scoperta nel 1932 da un pescatore locale: un mondo sommerso di stalattiti, riflessi smeraldini e un presepe sotto l\'acqua.',
    category: 'SCOPERTE',
    date: '22 Aprile 2026',
    readTime: '6 min',
    image: '/images/grotta-smeraldo-hero.webp',
    path: '/it-it/blog/grotta-dello-smeraldo/',
  },
  {
    id: '06',
    title: 'Vini della Costa d\'Amalfi: Viaggio tra i Vigneti Eroici di Tramonti e Scala',
    slug: 'vini-costa-amalfi',
    excerpt: 'Viti pre-fillossera di 200 anni, vitigni autoctoni quasi scomparsi e una vendemmia a mano su terrazzamenti a picco: la storia della DOC Costa d\'Amalfi tra Tramonti e Scala.',
    category: 'FOOD',
    date: '22 Aprile 2026',
    readTime: '8 min',
    image: '/images/vini-costa-amalfi-hero.jpg',
    path: '/it-it/blog/vini-costa-amalfi/',
  },
  {
    id: '05',
    title: 'Atrani: Il Borgo Più Piccolo d\'Italia Dove il Tempo si è Fermato',
    slug: 'atrani',
    excerpt: 'A 700 metri da Amalfi, il comune più piccolo d\'Italia (0,12 km²): un anfiteatro medievale di vicoli bianchi, la chiesa dei Dogi e il set di Ripley su Netflix.',
    category: 'SCOPERTE',
    date: '22 Aprile 2026',
    readTime: '6 min',
    image: '/images/atrani-hero.jpg',
    path: '/it-it/blog/atrani/',
  },
  {
    id: '04',
    title: 'Delizia al Limone: Storia e Segreti della Cupola più Amata della Costiera',
    slug: 'delizia-al-limone',
    excerpt: 'Inventata nel 1978 da un maestro pasticciere sorrentino, la Delizia al Limone è l\'essenza del sole della Costiera racchiusa in una cupola di pan di spagna e crema profumata.',
    category: 'FOOD',
    date: '22 Aprile 2026',
    readTime: '7 min',
    image: '/images/delizia-limone-hero.jpg',
    path: '/it-it/blog/delizia-al-limone/',
  },
  {
    id: '03',
    title: 'Valle delle Ferriere: Trekking nel Cuore Verde e Selvaggio di Amalfi',
    slug: 'valle-delle-ferriere',
    excerpt: 'Felci preistoriche, cascate e rovine di antiche cartiere medievali: il segreto meglio custodito della Costiera, a pochi minuti a piedi dal centro di Amalfi.',
    category: 'SCOPERTE',
    date: '22 Aprile 2026',
    readTime: '8 min',
    image: '/images/valle-ferriere-hero.jpg',
    path: '/it-it/blog/valle-delle-ferriere/',
  },
  {
    id: '02',
    title: 'Le Alici di Cetara: L\'Oro d\'Argento della Costiera Amalfitana',
    slug: 'alici-di-cetara',
    excerpt: 'Dal terzigno di rovere alla tavola: la storia della Colatura DOP, erede del Garum romano, e dello Spaghetto alla Colatura, piatto cult di un borgo di 2.000 anime.',
    category: 'FOOD',
    date: '22 Aprile 2026',
    readTime: '7 min',
    image: '/images/alici-cetara-hero.jpg',
    path: '/it-it/blog/alici-di-cetara/',
  },
];
