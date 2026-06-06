import type { Locale } from '../i18n/translations';

export type MapCategory = 'costiera' | 'isole' | 'penisola';

export interface MapDestination {
  slug: string;
  name: string;
  cat: MapCategory;
  lat: number;
  lon: number;
}

export const mapDestinations: MapDestination[] = [
  // Costiera Amalfitana (15)
  { slug: 'agerola',          name: 'Agerola',          cat: 'costiera', lat: 40.6383, lon: 14.5417 },
  { slug: 'amalfi',           name: 'Amalfi',           cat: 'costiera', lat: 40.6339, lon: 14.6027 },
  { slug: 'atrani',           name: 'Atrani',           cat: 'costiera', lat: 40.6364, lon: 14.6083 },
  { slug: 'cetara',           name: 'Cetara',           cat: 'costiera', lat: 40.5961, lon: 14.6083 },
  { slug: 'conca-dei-marini', name: 'Conca dei Marini', cat: 'costiera', lat: 40.6192, lon: 14.5739 },
  { slug: 'erchie',           name: 'Erchie',           cat: 'costiera', lat: 40.6278, lon: 14.6792 },
  { slug: 'furore',           name: 'Furore',           cat: 'costiera', lat: 40.6264, lon: 14.5525 },
  { slug: 'maiori',           name: 'Maiori',           cat: 'costiera', lat: 40.6493, lon: 14.6450 },
  { slug: 'minori',           name: 'Minori',           cat: 'costiera', lat: 40.6500, lon: 14.6275 },
  { slug: 'positano',         name: 'Positano',         cat: 'costiera', lat: 40.6281, lon: 14.4849 },
  { slug: 'praiano',          name: 'Praiano',          cat: 'costiera', lat: 40.6123, lon: 14.5337 },
  { slug: 'ravello',          name: 'Ravello',          cat: 'costiera', lat: 40.6492, lon: 14.6122 },
  { slug: 'salerno',          name: 'Salerno',          cat: 'costiera', lat: 40.6824, lon: 14.7681 },
  { slug: 'tramonti',         name: 'Tramonti',         cat: 'costiera', lat: 40.6933, lon: 14.6333 },
  { slug: 'vietri-sul-mare',  name: 'Vietri sul Mare',  cat: 'costiera', lat: 40.6819, lon: 14.6945 },

  // Penisola Sorrentina (5)
  { slug: 'sorrento',        name: 'Sorrento',        cat: 'penisola', lat: 40.6260, lon: 14.3752 },
  { slug: 'massa-lubrense',  name: 'Massa Lubrense',  cat: 'penisola', lat: 40.6092, lon: 14.3450 },
  { slug: 'meta',            name: 'Meta',            cat: 'penisola', lat: 40.6412, lon: 14.4097 },
  { slug: 'sant-agnello',    name: "Sant'Agnello",    cat: 'penisola', lat: 40.6340, lon: 14.3970 },
  { slug: 'vico-equense',    name: 'Vico Equense',    cat: 'penisola', lat: 40.6630, lon: 14.4310 },

  // Isole (5)
  { slug: 'capri',    name: 'Capri',    cat: 'isole', lat: 40.5530, lon: 14.2270 },
  { slug: 'anacapri', name: 'Anacapri', cat: 'isole', lat: 40.5520, lon: 14.2150 },
  { slug: 'ischia',   name: 'Ischia',   cat: 'isole', lat: 40.7300, lon: 13.9000 },
  { slug: 'forio',    name: 'Forio',    cat: 'isole', lat: 40.7365, lon: 13.8570 },
  { slug: 'procida',  name: 'Procida',  cat: 'isole', lat: 40.7620, lon: 14.0270 },
];

export const categoryColors: Record<MapCategory, string> = {
  costiera: '#1e6091', // med-blue
  penisola: '#c9a45c', // med-gold
  isole:    '#2d8659', // green
};

// Per-locale path prefix per category (matches actual file system routes)
const CAT_PATH: Record<MapCategory, Record<Locale, string>> = {
  costiera: {
    'it-it': '/it-it/costiera-amalfitana',
    'en-us': '/en-us/amalfi-coast',
    'de-de': '/de-de/amalfikueste',
    'fr-fr': '/fr-fr/cote-amalfitaine',
    'es-es': '/es-es/costa-amalfitana',
  },
  penisola: {
    'it-it': '/it-it/penisola-sorrentina',
    'en-us': '/en-us/sorrento-peninsula',
    'de-de': '/de-de/sorrentinische-halbinsel',
    'fr-fr': '/fr-fr/peninsule-sorrentine',
    'es-es': '/es-es/peninsula-sorrentina',
  },
  isole: {
    'it-it': '/it-it/isole',
    'en-us': '/en-us/islands',
    'de-de': '/de-de/inseln',
    'fr-fr': '/fr-fr/iles',
    'es-es': '/es-es/islas',
  },
};

// Slug overrides where a specific locale uses a different slug.
// Sorrento has localized slugs in DE/FR; all other towns share the same slug.
const SLUG_OVERRIDES: Record<string, Partial<Record<Locale, string>>> = {
  sorrento: { 'de-de': 'sorrent', 'fr-fr': 'sorrente' },
};

export function getDestinationUrl(d: MapDestination, lang: Locale): string {
  const base = CAT_PATH[d.cat][lang];
  const slug = SLUG_OVERRIDES[d.slug]?.[lang] ?? d.slug;
  return `${base}/${slug}/`;
}
