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
