export interface BlogPostFr {
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

export const blogPostsFr: BlogPostFr[] = [
  {
    id: '09',
    title: 'L\'Heure d\'Or : Où Admirer le Coucher de Soleil sur la Plage',
    slug: 'heure-or-coucher-soleil',
    excerpt: 'La Gavitella à Praiano, les Bains de la Reine Giovanna, Positano Fornillo, Marina di Cassano : les meilleurs points de vue pour regarder le soleil se coucher sur la Côte.',
    category: 'GUIDES',
    date: '28 Avril 2026',
    readTime: '8 min',
    image: '/images/tramonto-costiera.jpg',
    path: '/fr-fr/blog/coucher-soleil-plages/',
  },
  {
    id: '08',
    title: 'Confort et Détente : Les Plages Accessibles et Bien Équipées',
    slug: 'plages-accessibles-equipees',
    excerpt: 'Maiori avec son kilomètre de plage, Minori au cœur du village, Atrani le secret le mieux gardé : des plages sans escaliers et pleines de services.',
    category: 'GUIDES',
    date: '28 Avril 2026',
    readTime: '8 min',
    image: '/images/spiagge-bambini.jpg',
    path: '/fr-fr/blog/plages-confortables-equipees/',
  },
  {
    id: '07',
    title: 'Oasis Sauvages : Les Plages Accessibles Uniquement par Mer',
    slug: 'oasis-plages-mer',
    excerpt: 'Santa Croce à Amalfi, Cavallo Morto à Maiori, La Vite à Conca dei Marini : des criques secrètes accessibles uniquement en bateau avec les plus pures sources souterraines.',
    category: 'GUIDES',
    date: '28 Avril 2026',
    readTime: '9 min',
    image: '/images/spiagge-selvagge.jpg',
    path: '/fr-fr/blog/oasis-sauvages-plages/',
  },
  {
    id: '01',
    title: 'Grotte Émeraude : Guide Complet du Joyau de Conca dei Marini',
    slug: 'grotte-emeraude',
    excerpt: 'Découverte en 1932 par un pêcheur local : un monde englouti de stalactites, de reflets émeraude et d\'une crèche sous l\'eau.',
    category: 'DÉCOUVERTES',
    date: '22 Avril 2026',
    readTime: '6 min',
    image: '/images/grotta-smeraldo-hero.webp',
    path: '/fr-fr/blog/grotte-emeraude/',
  },
  {
    id: '06',
    title: 'Vins de la Côte d\'Amalfi : Voyage parmi les Vignobles Héroïques de Tramonti et Scala',
    slug: 'vins-cote-amalfi',
    excerpt: 'Des vignes pré-phylloxéra de 200 ans, des cépages autochtones quasi disparus et des vendanges à la main sur des terrasses à pic : l\'histoire de la DOC Côte d\'Amalfi entre Tramonti et Scala.',
    category: 'GASTRONOMIE',
    date: '22 Avril 2026',
    readTime: '8 min',
    image: '/images/vini-costa-amalfi-hero.jpg',
    path: '/fr-fr/blog/vins-cote-amalfi/',
  },
  {
    id: '05',
    title: 'Atrani : Le Plus Petit Village d\'Italie où le Temps s\'est Arrêté',
    slug: 'atrani',
    excerpt: 'À 700 mètres d\'Amalfi, la plus petite commune d\'Italie (0,12 km²) : un amphithéâtre médiéval de ruelles blanches, l\'église des Doges et le décor de Ripley sur Netflix.',
    category: 'DÉCOUVERTES',
    date: '22 Avril 2026',
    readTime: '6 min',
    image: '/images/atrani-hero.jpg',
    path: '/fr-fr/blog/atrani/',
  },
  {
    id: '04',
    title: 'Délice au Citron : Histoire et Secrets de la Coupole la Plus Aimée de la Côte',
    slug: 'delice-citron',
    excerpt: 'Inventée en 1978 par un maître pâtissier sorrentais, la Delizia al Limone est l\'essence du soleil de la Côte enfermée dans une coupole de génoise et de crème parfumée.',
    category: 'GASTRONOMIE',
    date: '22 Avril 2026',
    readTime: '7 min',
    image: '/images/delizia-limone-hero.jpg',
    path: '/fr-fr/blog/delice-citron/',
  },
  {
    id: '03',
    title: 'Vallée des Ferriere : Randonnée au Cœur Vert et Sauvage d\'Amalfi',
    slug: 'vallee-des-ferriere',
    excerpt: 'Fougères préhistoriques, cascades et ruines d\'anciennes papeteries médiévales : le secret le mieux gardé de la Côte, à quelques minutes à pied du centre d\'Amalfi.',
    category: 'DÉCOUVERTES',
    date: '22 Avril 2026',
    readTime: '8 min',
    image: '/images/valle-ferriere-hero.jpg',
    path: '/fr-fr/blog/vallee-des-ferriere/',
  },
  {
    id: '02',
    title: 'Les Anchois de Cetara : L\'Or d\'Argent de la Côte Amalfitaine',
    slug: 'anchois-cetara',
    excerpt: 'Du tonnelet de chêne à la table : l\'histoire de la Colatura DOP, héritière du Garum romain, et des Spaghetti alla Colatura, plat culte d\'un village de 2 000 âmes.',
    category: 'GASTRONOMIE',
    date: '22 Avril 2026',
    readTime: '7 min',
    image: '/images/alici-cetara-hero.jpg',
    path: '/fr-fr/blog/anchois-cetara/',
  },
];
