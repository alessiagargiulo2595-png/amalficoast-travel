export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  path: string;
}

export const experiences: Experience[] = [
  {
    id: 'trekking',
    title: 'Trekking & Path of the Gods',
    subtitle: "The most spectacular hiking routes in Europe.",
    category: 'OUTDOOR',
    image: '/images/trekking-hero.jpg',
    description: 'From the legendary Path of the Gods to the waterfalls of the Ferriere Valley.',
    path: '/en-us/experiences/trekking/',
  },
  {
    id: 'boat-tours',
    title: 'Boat Tours',
    subtitle: 'Explore the coast and grottos from the sea.',
    category: 'SEA',
    image: '/images/tour-barca-hero.jpg',
    description: 'Sea grottos, secret coves and the Amalfi Coast panorama seen from the water.',
    path: '/en-us/experiences/boat-tours/',
  },
  {
    id: 'mozzarella-experience',
    title: 'Mozzarella Experience',
    subtitle: 'The Art of the Cheesemaker and the Legend of Provolone del Monaco.',
    category: 'FOOD',
    image: '/images/mozzarella-provolone-hero.jpg',
    description: 'From stretchy curd to the aged treasure of the Monti Lattari.',
    path: '/en-us/experiences/mozzarella-experience/',
  },
  {
    id: 'limoncello-tour',
    title: 'Limoncello Tour',
    subtitle: 'The Golden Liqueur and the Legend of the Sorrento IGP Femminiello.',
    category: 'FOOD',
    image: '/images/limoncello-mercato-hero.jpg',
    description: 'A sensory journey through the scents of the Sorrento IGP Lemon.',
    path: '/en-us/experiences/limoncello-tour/',
  },
  {
    id: 'starred-restaurants',
    title: 'Starred Restaurants',
    subtitle: 'The Constellation of Taste 2026.',
    category: 'FOOD',
    image: '/images/stellati-hero.jpg',
    description: 'A pilgrimage through the heart of gastronomic excellence between Sorrento and the Amalfi Coast.',
    path: '/en-us/experiences/starred-restaurants/',
  },
  {
    id: 'cooking-class',
    title: 'Cooking Class',
    subtitle: 'The Secrets of Coastal Cuisine.',
    category: 'FOOD',
    image: '/images/cooking-class-hero.jpg',
    description: 'A journey through flour, basil and traditions handed down on the Sorrentine Peninsula.',
    path: '/en-us/experiences/cooking-class/',
  },
  {
    id: 'weddings',
    title: 'Weddings',
    subtitle: 'Vows Suspended Between Rock and Salt.',
    category: 'WEDDING',
    image: '/images/matrimoni-chiostro-hero.jpg',
    description: 'Why the Land of the Sirens is the world capital of destination weddings.',
    path: '/en-us/experiences/weddings/',
  },
];
