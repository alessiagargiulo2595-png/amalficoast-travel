export interface BlogPostEs {
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

export const blogPostsEs: BlogPostEs[] = [
  {
    id: '01',
    title: 'Gruta Esmeralda: Guía Completa de la Joya de Conca dei Marini',
    slug: 'gruta-esmeralda',
    excerpt: 'Descubierta en 1932 por un pescador local: un mundo sumergido de estalactitas, reflejos esmeralda y un belén bajo el agua.',
    category: 'DESCUBRIMIENTOS',
    date: '22 de abril de 2026',
    readTime: '6 min',
    image: '/images/grotta-smeraldo-hero.webp',
    path: '/es-es/blog/gruta-esmeralda/',
  },
  {
    id: '06',
    title: 'Vinos de la Costa Amalfitana: Un Viaje por los Viñedos Heroicos de Tramonti y Scala',
    slug: 'vinos-costa-amalfi',
    excerpt: 'Vides pre-filoxera de 200 años, variedades autóctonas casi desaparecidas y vendimia a mano en terrazas escarpadas: la historia de la DOC Costa de Amalfi.',
    category: 'GASTRONOMÍA',
    date: '22 de abril de 2026',
    readTime: '8 min',
    image: '/images/vini-costa-amalfi-hero.jpg',
    path: '/es-es/blog/vinos-costa-amalfi/',
  },
  {
    id: '05',
    title: 'Atrani: El Pueblo Más Pequeño de Italia Donde el Tiempo se Detuvo',
    slug: 'atrani',
    excerpt: 'A 700 metros de Amalfi, el municipio más pequeño de Italia (0,12 km²): un anfiteatro medieval de callejuelas blancas, la iglesia de los Dogos y el escenario de Ripley en Netflix.',
    category: 'DESCUBRIMIENTOS',
    date: '22 de abril de 2026',
    readTime: '6 min',
    image: '/images/atrani-hero.jpg',
    path: '/es-es/blog/atrani/',
  },
  {
    id: '04',
    title: 'Delizia al Limone: Historia y Secretos de la Cúpula más Amada de la Costa',
    slug: 'delizia-limon',
    excerpt: 'Inventada en 1978 por un maestro pastelero sorrentino, la Delizia al Limone es la esencia del sol de la Costa encerrada en una cúpula de bizcocho y crema de limón perfumada.',
    category: 'GASTRONOMÍA',
    date: '22 de abril de 2026',
    readTime: '7 min',
    image: '/images/delizia-limone-hero.jpg',
    path: '/es-es/blog/delizia-limon/',
  },
  {
    id: '03',
    title: 'Valle delle Ferriere: Senderismo en el Corazón Verde y Salvaje de Amalfi',
    slug: 'valle-ferriere',
    excerpt: 'Helechos prehistóricos, cascadas y ruinas de antiguas fábricas de papel medievales: el secreto mejor guardado de la Costa, a pocos minutos a pie del centro de Amalfi.',
    category: 'DESCUBRIMIENTOS',
    date: '22 de abril de 2026',
    readTime: '8 min',
    image: '/images/valle-ferriere-hero.jpg',
    path: '/es-es/blog/valle-ferriere/',
  },
  {
    id: '02',
    title: 'Las Anchoas de Cetara: El Oro Plateado de la Costa Amalfitana',
    slug: 'anchoas-cetara',
    excerpt: 'Del barril de roble a la mesa: la historia de la Colatura DOP, heredera del Garum romano, y los Espaguetis alla Colatura, el plato de culto de un pueblo de 2.000 almas.',
    category: 'GASTRONOMÍA',
    date: '22 de abril de 2026',
    readTime: '7 min',
    image: '/images/alici-cetara-hero.jpg',
    path: '/es-es/blog/anchoas-cetara/',
  },
];
