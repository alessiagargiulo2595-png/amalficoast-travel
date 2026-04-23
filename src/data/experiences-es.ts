export interface Experiencia {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  path: string;
}

export const experiencias: Experiencia[] = [
  {
    id: 'trekking',
    title: 'Senderismo y Senda de los Dioses',
    subtitle: 'Las rutas de senderismo más espectaculares de Europa.',
    category: 'OUTDOOR',
    image: '/images/trekking-hero.jpg',
    description: 'Desde la legendaria Senda de los Dioses hasta las cascadas del Valle delle Ferriere.',
    path: '/es-es/experiencias/trekking/',
  },
  {
    id: 'tours-en-barco',
    title: 'Tours en Barco',
    subtitle: 'Explora la costa y las grutas desde el mar.',
    category: 'MAR',
    image: '/images/tour-barca-hero.jpg',
    description: 'Grutas marinas, calas secretas y el panorama de la Costa Amalfitana visto desde el agua.',
    path: '/es-es/experiencias/tours-en-barco/',
  },
  {
    id: 'experiencia-mozzarella',
    title: 'Experiencia Mozzarella',
    subtitle: 'El Arte del Quesero y la Leyenda del Provolone del Monaco.',
    category: 'GASTRONOMÍA',
    image: '/images/mozzarella-provolone-hero.jpg',
    description: 'Desde la cuajada elástica al tesoro curado de los Montes Lattari.',
    path: '/es-es/experiencias/experiencia-mozzarella/',
  },
  {
    id: 'tour-limoncello',
    title: 'Tour del Limoncello',
    subtitle: 'El Licor Dorado y la Leyenda del Femminiello de Sorrento IGP.',
    category: 'GASTRONOMÍA',
    image: '/images/limoncello-mercato-hero.jpg',
    description: 'Un viaje sensorial a través de los aromas del Limón de Sorrento IGP.',
    path: '/es-es/experiencias/tour-limoncello/',
  },
  {
    id: 'restaurantes-estrella',
    title: 'Restaurantes con Estrella',
    subtitle: 'El Firmamento del Sabor 2026.',
    category: 'GASTRONOMÍA',
    image: '/images/stellati-hero.jpg',
    description: 'Una peregrinación al corazón de la excelencia gastronómica entre Sorrento y la Costa Amalfitana.',
    path: '/es-es/experiencias/restaurantes-estrella/',
  },
  {
    id: 'clase-cocina',
    title: 'Clase de Cocina',
    subtitle: 'Los Secretos de la Cocina Costera.',
    category: 'GASTRONOMÍA',
    image: '/images/cooking-class-hero.jpg',
    description: 'Un viaje entre harina, albahaca y tradiciones transmitidas en la Península Sorrentina.',
    path: '/es-es/experiencias/clase-cocina/',
  },
  {
    id: 'bodas',
    title: 'Bodas',
    subtitle: 'Promesas Suspendidas entre Roca y Sal.',
    category: 'BODAS',
    image: '/images/matrimoni-chiostro-hero.jpg',
    description: 'Por qué la Tierra de las Sirenas es la capital mundial de las bodas de destino.',
    path: '/es-es/experiencias/bodas/',
  },
];
