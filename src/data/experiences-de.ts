export interface Erlebnis {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  path: string;
}

export const erlebnisse: Erlebnis[] = [
  {
    id: 'trekking',
    title: 'Trekking & Götterweg',
    subtitle: 'Die spektakulärsten Wanderrouten Europas.',
    category: 'OUTDOOR',
    image: '/images/trekking-hero.jpg',
    description: 'Vom legendären Götterweg bis zu den Wasserfällen des Ferriere-Tals.',
    path: '/de-de/erlebnisse/trekking/',
  },
  {
    id: 'bootstouren',
    title: 'Bootstouren',
    subtitle: 'Entdecke die Küste und Grotten vom Meer aus.',
    category: 'MEER',
    image: '/images/tour-barca-hero.jpg',
    description: 'Meeresgrotten, geheime Buchten und das Panorama der Amalfiküste vom Wasser aus.',
    path: '/de-de/erlebnisse/bootstouren/',
  },
  {
    id: 'mozzarella-erlebnis',
    title: 'Mozzarella-Erlebnis',
    subtitle: 'Die Kunst des Käsers und die Legende des Provolone del Monaco.',
    category: 'KULINARIK',
    image: '/images/mozzarella-provolone-hero.jpg',
    description: 'Von der zähflüssigen Käsemasse zum gereiften Schatz der Monti Lattari.',
    path: '/de-de/erlebnisse/mozzarella-erlebnis/',
  },
  {
    id: 'limoncello-tour',
    title: 'Limoncello-Tour',
    subtitle: 'Das goldene Getränk und die Legende der Sorrenter Femminiello g.g.A.',
    category: 'KULINARIK',
    image: '/images/limoncello-mercato-hero.jpg',
    description: 'Eine sinnliche Reise durch die Düfte der Sorrenter Zitrone g.g.A.',
    path: '/de-de/erlebnisse/limoncello-tour/',
  },
  {
    id: 'sterne-restaurants',
    title: 'Sterne-Restaurants',
    subtitle: 'Das Firmament des Geschmacks 2026.',
    category: 'KULINARIK',
    image: '/images/stellati-hero.jpg',
    description: 'Eine Pilgerfahrt ins Herz der gastronomischen Exzellenz zwischen Sorrent und der Amalfiküste.',
    path: '/de-de/erlebnisse/sterne-restaurants/',
  },
  {
    id: 'kochkurs',
    title: 'Kochkurs',
    subtitle: 'Die Geheimnisse der Küstenküche.',
    category: 'KULINARIK',
    image: '/images/cooking-class-hero.jpg',
    description: 'Eine Reise durch Mehl, Basilikum und überlieferte Traditionen auf der Sorrentiner Halbinsel.',
    path: '/de-de/erlebnisse/kochkurs/',
  },
  {
    id: 'hochzeiten',
    title: 'Hochzeiten',
    subtitle: 'Versprechen zwischen Fels und Salz.',
    category: 'HOCHZEIT',
    image: '/images/matrimoni-chiostro-hero.jpg',
    description: 'Warum das Land der Sirenen die Welthauptstadt der Destination Weddings ist.',
    path: '/de-de/erlebnisse/hochzeiten/',
  },
];
