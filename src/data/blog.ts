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
];
