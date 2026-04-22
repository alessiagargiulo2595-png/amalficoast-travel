export interface Esperienza {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  path: string;
}

export const esperienze: Esperienza[] = [
  {
    id: 'trekking',
    title: 'Trekking & Sentiero degli Dei',
    subtitle: 'I percorsi più spettacolari d\'Europa da percorrere a piedi.',
    category: 'OUTDOOR',
    image: '/images/trekking-hero.jpg',
    description: 'Dal leggendario Sentiero degli Dei alle cascate della Valle delle Ferriere.',
    path: '/it-it/esperienze/trekking/',
  },
  {
    id: 'tour-barca',
    title: 'Tour in Barca',
    subtitle: 'Esplora la costa e le grotte dal mare.',
    category: 'MARE',
    image: '/images/tour-barca-hero.jpg',
    description: 'Grotte marine, calette segrete e il panorama della Costiera visto dall\'acqua.',
    path: '/it-it/esperienze/tour-barca/',
  },
  {
    id: 'mozzarella-experience',
    title: 'Mozzarella Experience',
    subtitle: 'L\'Arte del Casaro e il Mito del Provolone del Monaco.',
    category: 'FOOD',
    image: '/images/mozzarella-experience.jpg',
    description: 'Dalla cagliata filante al tesoro stagionato dei Monti Lattari.',
    path: '/it-it/esperienze/mozzarella-experience/',
  },
];
