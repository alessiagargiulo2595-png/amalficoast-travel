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
    title: 'Trekking & Sentier des Dieux',
    subtitle: "Les randonnées les plus spectaculaires d'Europe.",
    category: 'OUTDOOR',
    image: '/images/trekking-hero.jpg',
    description: "Du légendaire Sentier des Dieux aux cascades de la Vallée des Ferrières.",
    path: '/fr-fr/experiences/trekking/',
  },
  {
    id: 'tours-en-bateau',
    title: 'Tours en Bateau',
    subtitle: 'Explorez la côte et les grottes depuis la mer.',
    category: 'MER',
    image: '/images/tour-barca-hero.jpg',
    description: 'Grottes marines, criques secrètes et panorama de la Côte Amalfitaine vu de la mer.',
    path: '/fr-fr/experiences/tours-en-bateau/',
  },
  {
    id: 'experience-mozzarella',
    title: 'Expérience Mozzarella',
    subtitle: "L'Art du Fromager et la Légende du Provolone del Monaco.",
    category: 'GASTRONOMIE',
    image: '/images/mozzarella-provolone-hero.jpg',
    description: 'De la caille filante au trésor affiné des Monti Lattari.',
    path: '/fr-fr/experiences/experience-mozzarella/',
  },
  {
    id: 'tour-limoncello',
    title: 'Tour du Limoncello',
    subtitle: 'La Liqueur Dorée et la Légende du Femminiello IGP de Sorrente.',
    category: 'GASTRONOMIE',
    image: '/images/limoncello-mercato-hero.jpg',
    description: 'Un voyage sensoriel à travers les arômes du Citron IGP de Sorrente.',
    path: '/fr-fr/experiences/tour-limoncello/',
  },
  {
    id: 'restaurants-etoiles',
    title: 'Restaurants Étoilés',
    subtitle: 'La Constellation des Saveurs 2026.',
    category: 'GASTRONOMIE',
    image: '/images/stellati-hero.jpg',
    description: 'Un pèlerinage au cœur de l\'excellence gastronomique entre Sorrente et la Côte Amalfitaine.',
    path: '/fr-fr/experiences/restaurants-etoiles/',
  },
  {
    id: 'cours-de-cuisine',
    title: 'Cours de Cuisine',
    subtitle: 'Les Secrets de la Cuisine Côtière.',
    category: 'GASTRONOMIE',
    image: '/images/cooking-class-hero.jpg',
    description: 'Un voyage à travers la farine, le basilic et les traditions de la Péninsule Sorrentine.',
    path: '/fr-fr/experiences/cours-de-cuisine/',
  },
  {
    id: 'mariages',
    title: 'Mariages',
    subtitle: 'Vœux Suspendus entre Roc et Sel.',
    category: 'MARIAGE',
    image: '/images/matrimoni-chiostro-hero.jpg',
    description: 'Pourquoi la Terre des Sirènes est la capitale mondiale des mariages de destination.',
    path: '/fr-fr/experiences/mariages/',
  },
];
