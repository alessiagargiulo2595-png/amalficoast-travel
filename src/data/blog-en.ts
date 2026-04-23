export interface BlogPostEn {
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

export const blogPostsEn: BlogPostEn[] = [
  {
    id: '01',
    title: 'Emerald Grotto: Complete Guide to the Pearl of Conca dei Marini',
    slug: 'emerald-grotto',
    excerpt: 'Discovered in 1932 by a local fisherman: a submerged world of stalactites, emerald reflections and an underwater nativity scene.',
    category: 'DISCOVERIES',
    date: 'April 22, 2026',
    readTime: '6 min',
    image: '/images/grotta-smeraldo-hero.webp',
    path: '/en-us/blog/emerald-grotto/',
  },
  {
    id: '06',
    title: 'Amalfi Coast Wines: A Journey Through the Heroic Vineyards of Tramonti and Scala',
    slug: 'amalfi-coast-wines',
    excerpt: '200-year-old pre-phylloxera vines, nearly extinct indigenous varieties and hand-harvesting on steep terraces: the story of the Amalfi Coast DOC between Tramonti and Scala.',
    category: 'FOOD',
    date: 'April 22, 2026',
    readTime: '8 min',
    image: '/images/vini-costa-amalfi-hero.jpg',
    path: '/en-us/blog/amalfi-coast-wines/',
  },
  {
    id: '05',
    title: "Atrani: Italy's Smallest Village Where Time Stood Still",
    slug: 'atrani',
    excerpt: "700 meters from Amalfi, Italy's smallest municipality (0.12 km²): a medieval amphitheater of white alleys, the Doges' church and the set of Netflix's Ripley.",
    category: 'DISCOVERIES',
    date: 'April 22, 2026',
    readTime: '6 min',
    image: '/images/atrani-hero.jpg',
    path: '/en-us/blog/atrani/',
  },
  {
    id: '04',
    title: 'Lemon Delight: History and Secrets of the Coast\'s Most Beloved Dome',
    slug: 'lemon-delight',
    excerpt: 'Invented in 1978 by a Sorrentine pastry chef, the Delizia al Limone is the essence of the Coast\'s sunshine captured in a dome of sponge cake and lemon cream.',
    category: 'FOOD',
    date: 'April 22, 2026',
    readTime: '7 min',
    image: '/images/delizia-limone-hero.jpg',
    path: '/en-us/blog/lemon-delight/',
  },
  {
    id: '03',
    title: 'Ferriere Valley: Trekking in the Wild Green Heart of Amalfi',
    slug: 'ferriere-valley',
    excerpt: 'Prehistoric ferns, waterfalls and ruins of ancient medieval paper mills: the best-kept secret of the Coast, just minutes\' walk from the center of Amalfi.',
    category: 'DISCOVERIES',
    date: 'April 22, 2026',
    readTime: '8 min',
    image: '/images/valle-ferriere-hero.jpg',
    path: '/en-us/blog/ferriere-valley/',
  },
  {
    id: '02',
    title: 'Cetara Anchovies: The Silver Gold of the Amalfi Coast',
    slug: 'cetara-anchovies',
    excerpt: 'From the oak barrel to the table: the story of the PDO Colatura, heir to Roman Garum, and the Spaghetti alla Colatura, the cult dish of a village of 2,000 souls.',
    category: 'FOOD',
    date: 'April 22, 2026',
    readTime: '7 min',
    image: '/images/alici-cetara-hero.jpg',
    path: '/en-us/blog/cetara-anchovies/',
  },
];
