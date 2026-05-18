import type { Locale } from '../i18n/translations';
import { blogPosts } from './blog';
import { blogPostsEn } from './blog-en';
import { blogPostsDe } from './blog-de';
import { blogPostsEs } from './blog-es';
import { blogPostsFr } from './blog-fr';
import { events as eventsIt } from './events-it';
import { events as eventsEn } from './events-en';
import { events as eventsDe } from './events-de';
import { events as eventsEs } from './events-es';
import { events as eventsFr } from './events-fr';

const blogByLang = {
  'it-it': blogPosts,
  'en-us': blogPostsEn,
  'de-de': blogPostsDe,
  'es-es': blogPostsEs,
  'fr-fr': blogPostsFr,
} as const;

const eventsByLang = {
  'it-it': eventsIt,
  'en-us': eventsEn,
  'de-de': eventsDe,
  'es-es': eventsEs,
  'fr-fr': eventsFr,
} as const;

export interface SearchItem {
  title: string;
  description: string;
  category: string;
  url: string;
  icon: string;
}

type CategoryLabels = Record<string, Record<Locale, string>>;

const catLabels: CategoryLabels = {
  destination: { 'it-it': 'Destinazione', 'en-us': 'Destination', 'de-de': 'Reiseziel', 'fr-fr': 'Destination', 'es-es': 'Destino' },
  beach: { 'it-it': 'Spiaggia', 'en-us': 'Beach', 'de-de': 'Strand', 'fr-fr': 'Plage', 'es-es': 'Playa' },
  guide: { 'it-it': 'Guida', 'en-us': 'Guide', 'de-de': 'Ratgeber', 'fr-fr': 'Guide', 'es-es': 'Guia' },
  experience: { 'it-it': 'Esperienza', 'en-us': 'Experience', 'de-de': 'Erlebnis', 'fr-fr': 'Experience', 'es-es': 'Experiencia' },
  event: { 'it-it': 'Evento', 'en-us': 'Event', 'de-de': 'Veranstaltung', 'fr-fr': 'Evenement', 'es-es': 'Evento' },
  blog: { 'it-it': 'Blog', 'en-us': 'Blog', 'de-de': 'Blog', 'fr-fr': 'Blog', 'es-es': 'Blog' },
  itinerary: { 'it-it': 'Itinerario', 'en-us': 'Itinerary', 'de-de': 'Reiseroute', 'fr-fr': 'Itineraire', 'es-es': 'Itinerario' },
  island: { 'it-it': 'Isola', 'en-us': 'Island', 'de-de': 'Insel', 'fr-fr': 'Ile', 'es-es': 'Isla' },
};

const icons: Record<string, string> = {
  destination: 'M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
  beach: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
  guide: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  experience: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  event: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  blog: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
  itinerary: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  island: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
};

export function buildSearchIndex(lang: Locale): SearchItem[] {
  const items: SearchItem[] = [];

  const costieraBase = ({ 'en-us': '/en-us/amalfi-coast', 'de-de': '/de-de/amalfikueste', 'fr-fr': '/fr-fr/cote-amalfitaine', 'es-es': '/es-es/costa-amalfitana', 'it-it': '/it-it/costiera-amalfitana' } as const)[lang];

  // Destinations - Costiera
  const costieraBorghi: { name: string; href: string; desc: string }[] = ({
    'it-it': [
      { name: 'Positano', href: `${costieraBase}/positano/`, desc: 'Il borgo verticale piu fotografato della Costiera Amalfitana' },
      { name: 'Amalfi', href: `${costieraBase}/amalfi/`, desc: 'La storica Repubblica Marinara con il Duomo e i vicoli' },
      { name: 'Ravello', href: `${costieraBase}/ravello/`, desc: 'Il balcone della Costiera, Villa Rufolo e giardini panoramici' },
      { name: 'Praiano', href: `${costieraBase}/praiano/`, desc: 'Il borgo autentico tra Positano e Amalfi, tramonti spettacolari' },
      { name: 'Maiori', href: `${costieraBase}/maiori/`, desc: 'La spiaggia piu lunga della Costiera e la Torre Normanna' },
      { name: 'Minori', href: `${costieraBase}/minori/`, desc: 'La citta del gusto con la Villa Romana e la pasta fresca' },
      { name: 'Vietri sul Mare', href: `${costieraBase}/vietri-sul-mare/`, desc: 'La porta della Costiera, famosa per le ceramiche artistiche' },
      { name: 'Cetara', href: `${costieraBase}/cetara/`, desc: 'Il borgo dei pescatori e la colatura di alici DOP' },
      { name: 'Marina di Praia', href: `${costieraBase}/marina-di-praia/`, desc: 'La caletta nascosta tra le falesie di Praiano' },
    ],
    'en-us': [
      { name: 'Positano', href: `${costieraBase}/positano/`, desc: 'The most photographed vertical village on the Amalfi Coast' },
      { name: 'Amalfi', href: `${costieraBase}/amalfi/`, desc: 'Historic maritime republic with the Cathedral and alleyways' },
      { name: 'Ravello', href: `${costieraBase}/ravello/`, desc: 'The balcony of the Coast with Villa Rufolo and panoramic gardens' },
      { name: 'Praiano', href: `${costieraBase}/praiano/`, desc: 'Authentic village between Positano and Amalfi, spectacular sunsets' },
      { name: 'Maiori', href: `${costieraBase}/maiori/`, desc: 'The longest beach on the Coast and the Norman Tower' },
      { name: 'Minori', href: `${costieraBase}/minori/`, desc: 'City of taste with Roman Villa and fresh pasta' },
      { name: 'Vietri sul Mare', href: `${costieraBase}/vietri-sul-mare/`, desc: 'Gateway to the Coast, famous for artistic ceramics' },
      { name: 'Cetara', href: `${costieraBase}/cetara/`, desc: 'Fishing village and home of colatura di alici' },
      { name: 'Marina di Praia', href: `${costieraBase}/marina-di-praia/`, desc: 'Hidden cove between the cliffs of Praiano' },
    ],
    'de-de': [
      { name: 'Positano', href: `${costieraBase}/positano/`, desc: 'Das meistfotografierte vertikale Dorf der Amalfikuste' },
      { name: 'Amalfi', href: `${costieraBase}/amalfi/`, desc: 'Historische Seerepublik mit Dom und Gassen' },
      { name: 'Ravello', href: `${costieraBase}/ravello/`, desc: 'Der Balkon der Kuste mit Villa Rufolo und Panoramagarten' },
      { name: 'Praiano', href: `${costieraBase}/praiano/`, desc: 'Authentisches Dorf zwischen Positano und Amalfi' },
      { name: 'Maiori', href: `${costieraBase}/maiori/`, desc: 'Der langste Strand der Kuste und der Normannenturm' },
      { name: 'Minori', href: `${costieraBase}/minori/`, desc: 'Stadt des Geschmacks mit Romischer Villa' },
      { name: 'Vietri sul Mare', href: `${costieraBase}/vietri-sul-mare/`, desc: 'Tor zur Kuste, beruhmt fur kunstlerische Keramik' },
      { name: 'Cetara', href: `${costieraBase}/cetara/`, desc: 'Fischerdorf und Heimat der Colatura di Alici' },
      { name: 'Marina di Praia', href: `${costieraBase}/marina-di-praia/`, desc: 'Versteckte Bucht zwischen den Klippen von Praiano' },
    ],
    'fr-fr': [
      { name: 'Positano', href: `${costieraBase}/positano/`, desc: 'Le village vertical le plus photographie de la Cote Amalfitaine' },
      { name: 'Amalfi', href: `${costieraBase}/amalfi/`, desc: 'Republique maritime historique avec sa cathedrale et ses ruelles' },
      { name: 'Ravello', href: `${costieraBase}/ravello/`, desc: 'Le balcon de la Cote avec Villa Rufolo et jardins panoramiques' },
      { name: 'Praiano', href: `${costieraBase}/praiano/`, desc: 'Village authentique entre Positano et Amalfi' },
      { name: 'Maiori', href: `${costieraBase}/maiori/`, desc: 'La plus longue plage de la Cote et la Tour Normande' },
      { name: 'Minori', href: `${costieraBase}/minori/`, desc: 'Cite du gout avec la Villa Romaine et les pates fraiches' },
      { name: 'Vietri sul Mare', href: `${costieraBase}/vietri-sul-mare/`, desc: 'Porte de la Cote, celebre pour ses ceramiques artistiques' },
      { name: 'Cetara', href: `${costieraBase}/cetara/`, desc: 'Village de pecheurs et la colatura di alici' },
      { name: 'Marina di Praia', href: `${costieraBase}/marina-di-praia/`, desc: 'Crique cachee entre les falaises de Praiano' },
    ],
    'es-es': [
      { name: 'Positano', href: `${costieraBase}/positano/`, desc: 'El pueblo vertical mas fotografiado de la Costa Amalfitana' },
      { name: 'Amalfi', href: `${costieraBase}/amalfi/`, desc: 'Historica republica maritima con catedral y callejuelas' },
      { name: 'Ravello', href: `${costieraBase}/ravello/`, desc: 'El balcon de la Costa con Villa Rufolo y jardines panoramicos' },
      { name: 'Praiano', href: `${costieraBase}/praiano/`, desc: 'Pueblo autentico entre Positano y Amalfi' },
      { name: 'Maiori', href: `${costieraBase}/maiori/`, desc: 'La playa mas larga de la Costa y la Torre Normanda' },
      { name: 'Minori', href: `${costieraBase}/minori/`, desc: 'Ciudad del gusto con Villa Romana y pasta fresca' },
      { name: 'Vietri sul Mare', href: `${costieraBase}/vietri-sul-mare/`, desc: 'Puerta de la Costa, famosa por ceramicas artisticas' },
      { name: 'Cetara', href: `${costieraBase}/cetara/`, desc: 'Pueblo de pescadores y hogar de la colatura di alici' },
      { name: 'Marina di Praia', href: `${costieraBase}/marina-di-praia/`, desc: 'Cala escondida entre los acantilados de Praiano' },
    ],
  })[lang];

  costieraBorghi.forEach(b => {
    items.push({ title: b.name, description: b.desc, category: catLabels.destination[lang], url: b.href, icon: icons.destination });
  });

  // Destinations - Sorrentina
  const sorrentina: { name: string; href: string; desc: string }[] = ({
    'it-it': [
      { name: 'Sorrento', href: '/it-it/penisola-sorrentina/sorrento/', desc: 'La perla della Penisola Sorrentina affacciata sul Golfo di Napoli' },
      { name: 'Vico Equense', href: '/it-it/penisola-sorrentina/vico-equense/', desc: 'La citta della pizza a metro e delle terme naturali' },
      { name: 'Massa Lubrense', href: '/it-it/penisola-sorrentina/massa-lubrense/', desc: 'Tra ulivi e sentieri con vista su Capri' },
      { name: "Sant'Agnello", href: '/it-it/penisola-sorrentina/sant-agnello/', desc: 'Borgo tranquillo tra Sorrento e Piano di Sorrento' },
    ],
    'en-us': [
      { name: 'Sorrento', href: '/en-us/sorrento-peninsula/sorrento/', desc: 'The pearl of the Sorrentine Peninsula overlooking the Gulf of Naples' },
      { name: 'Vico Equense', href: '/en-us/sorrento-peninsula/vico-equense/', desc: 'City of pizza by the meter and natural hot springs' },
      { name: 'Massa Lubrense', href: '/en-us/sorrento-peninsula/massa-lubrense/', desc: 'Among olive groves and trails with views of Capri' },
      { name: "Sant'Agnello", href: '/en-us/sorrento-peninsula/sant-agnello/', desc: 'Peaceful village between Sorrento and Piano di Sorrento' },
    ],
    'de-de': [
      { name: 'Sorrent', href: '/de-de/sorrentinische-halbinsel/sorrent/', desc: 'Die Perle der Sorrentinischen Halbinsel am Golf von Neapel' },
      { name: 'Vico Equense', href: '/de-de/sorrentinische-halbinsel/vico-equense/', desc: 'Stadt der Meterpizza und naturlichen Thermalquellen' },
      { name: 'Massa Lubrense', href: '/de-de/sorrentinische-halbinsel/massa-lubrense/', desc: 'Zwischen Olivenhainen und Wanderwegen mit Blick auf Capri' },
      { name: "Sant'Agnello", href: '/de-de/sorrentinische-halbinsel/sant-agnello/', desc: 'Ruhiges Dorf zwischen Sorrent und Piano di Sorrento' },
    ],
    'fr-fr': [
      { name: 'Sorrente', href: '/fr-fr/peninsule-sorrentine/sorrente/', desc: 'La perle de la Peninsule Sorrentine surplombant le Golfe de Naples' },
      { name: 'Vico Equense', href: '/fr-fr/peninsule-sorrentine/vico-equense/', desc: 'Cite de la pizza au metre et sources thermales' },
      { name: 'Massa Lubrense', href: '/fr-fr/peninsule-sorrentine/massa-lubrense/', desc: 'Entre oliviers et sentiers avec vue sur Capri' },
      { name: "Sant'Agnello", href: '/fr-fr/peninsule-sorrentine/sant-agnello/', desc: 'Village paisible entre Sorrente et Piano di Sorrento' },
    ],
    'es-es': [
      { name: 'Sorrento', href: '/es-es/peninsula-sorrentina/sorrento/', desc: 'La perla de la Peninsula Sorrentina sobre el Golfo de Napoles' },
      { name: 'Vico Equense', href: '/es-es/peninsula-sorrentina/vico-equense/', desc: 'Ciudad de la pizza al metro y termas naturales' },
      { name: 'Massa Lubrense', href: '/es-es/peninsula-sorrentina/massa-lubrense/', desc: 'Entre olivos y senderos con vistas a Capri' },
      { name: "Sant'Agnello", href: '/es-es/peninsula-sorrentina/sant-agnello/', desc: 'Pueblo tranquilo entre Sorrento y Piano di Sorrento' },
    ],
  })[lang];

  sorrentina.forEach(b => {
    items.push({ title: b.name, description: b.desc, category: catLabels.destination[lang], url: b.href, icon: icons.destination });
  });

  // Islands
  const isole: { name: string; href: string; desc: string }[] = ({
    'it-it': [
      { name: 'Capri', href: '/it-it/isole/capri/', desc: 'L\'isola glamour con i Faraglioni, la Grotta Azzurra e Villa Jovis' },
      { name: 'Ischia', href: '/it-it/isole/ischia/', desc: 'L\'isola termale piu grande del Golfo con il Castello Aragonese' },
      { name: 'Procida', href: '/it-it/isole/procida/', desc: 'L\'isola colorata di Marina Corricella, Capitale della Cultura 2022' },
    ],
    'en-us': [
      { name: 'Capri', href: '/en-us/islands/capri/', desc: 'Glamorous island with Faraglioni, Blue Grotto and Villa Jovis' },
      { name: 'Ischia', href: '/en-us/islands/ischia/', desc: 'Largest thermal island in the Gulf with Aragonese Castle' },
      { name: 'Procida', href: '/en-us/islands/procida/', desc: 'Colorful island of Marina Corricella, Capital of Culture 2022' },
    ],
    'de-de': [
      { name: 'Capri', href: '/de-de/inseln/capri/', desc: 'Glamourose Insel mit Faraglioni, Blauer Grotte und Villa Jovis' },
      { name: 'Ischia', href: '/de-de/inseln/ischia/', desc: 'Grosste Thermalinsel im Golf mit Aragonesischer Burg' },
      { name: 'Procida', href: '/de-de/inseln/procida/', desc: 'Bunte Insel von Marina Corricella, Kulturhauptstadt 2022' },
    ],
    'fr-fr': [
      { name: 'Capri', href: '/fr-fr/iles/capri/', desc: 'Ile glamour avec les Faraglioni, la Grotte Bleue et Villa Jovis' },
      { name: 'Ischia', href: '/fr-fr/iles/ischia/', desc: 'Plus grande ile thermale du Golfe avec le Chateau Aragonais' },
      { name: 'Procida', href: '/fr-fr/iles/procida/', desc: 'Ile coloree de Marina Corricella, Capitale de la Culture 2022' },
    ],
    'es-es': [
      { name: 'Capri', href: '/es-es/islas/capri/', desc: 'Isla glamurosa con Faraglioni, Gruta Azul y Villa Jovis' },
      { name: 'Ischia', href: '/es-es/islas/ischia/', desc: 'La mayor isla termal del Golfo con Castillo Aragones' },
      { name: 'Procida', href: '/es-es/islas/procida/', desc: 'Isla colorida de Marina Corricella, Capital de la Cultura 2022' },
    ],
  })[lang];

  isole.forEach(b => {
    items.push({ title: b.name, description: b.desc, category: catLabels.island[lang], url: b.href, icon: icons.island });
  });

  // Guide pages
  const guide: { name: string; href: string; desc: string }[] = ({
    'it-it': [
      { name: 'Come arrivare', href: '/it-it/guida/come-arrivare/', desc: 'Aeroporti, treni, bus e traghetti per raggiungere la Costiera' },
      { name: 'Quando andare', href: '/it-it/guida/quando-visitare/', desc: 'Stagioni, clima e periodo migliore per visitare la Costiera' },
      { name: 'Traghetti e Aliscafi', href: '/it-it/guida/traghetti/', desc: 'Orari, prezzi e rotte dei traghetti nel Golfo di Napoli' },
      { name: 'Bus SITA', href: '/it-it/guida/bus-sita/', desc: 'Orari e fermate del bus SITA tra Amalfi, Positano e Sorrento' },
      { name: 'Parcheggi e ZTL', href: '/it-it/guida/parcheggi-ztl/', desc: 'Dove parcheggiare e zone a traffico limitato della Costiera' },
    ],
    'en-us': [
      { name: 'Getting Here', href: '/en-us/guide/getting-here/', desc: 'Airports, trains, buses and ferries to reach the Coast' },
      { name: 'When to Visit', href: '/en-us/guide/when-to-visit/', desc: 'Seasons, climate and best time to visit the Coast' },
      { name: 'Ferries & Hydrofoils', href: '/en-us/guide/ferries/', desc: 'Schedules, prices and routes in the Gulf of Naples' },
      { name: 'SITA Bus', href: '/en-us/guide/sita-bus/', desc: 'Schedules and stops between Amalfi, Positano and Sorrento' },
      { name: 'Parking & ZTL', href: '/en-us/guide/parking-ztl/', desc: 'Where to park and restricted traffic zones on the Coast' },
    ],
    'de-de': [
      { name: 'Anreise', href: '/de-de/ratgeber/anreise/', desc: 'Flughafen, Zuge, Busse und Fahren zur Kuste' },
      { name: 'Beste Reisezeit', href: '/de-de/ratgeber/reisezeit/', desc: 'Jahreszeiten, Klima und beste Reisezeit' },
      { name: 'Fahren & Tragflugelboote', href: '/de-de/ratgeber/faehren/', desc: 'Fahrplane, Preise und Routen im Golf von Neapel' },
      { name: 'SITA Bus', href: '/de-de/ratgeber/sita-bus/', desc: 'Fahrplane und Haltestellen zwischen Amalfi und Sorrento' },
      { name: 'Parken & ZTL', href: '/de-de/ratgeber/parken-ztl/', desc: 'Parkplatze und verkehrsberuhigte Zonen' },
    ],
    'fr-fr': [
      { name: 'Comment venir', href: '/fr-fr/guide/comment-venir/', desc: 'Aeroports, trains, bus et ferries pour la Cote' },
      { name: 'Quand visiter', href: '/fr-fr/guide/quand-visiter/', desc: 'Saisons, climat et meilleure periode pour visiter' },
      { name: 'Ferries & Hydroglisseurs', href: '/fr-fr/guide/ferries/', desc: 'Horaires, tarifs et itineraires dans le Golfe de Naples' },
      { name: 'Bus SITA', href: '/fr-fr/guide/bus-sita/', desc: 'Horaires et arrets entre Amalfi, Positano et Sorrente' },
      { name: 'Parking & ZTL', href: '/fr-fr/guide/parking-ztl/', desc: 'Ou se garer et zones a trafic limite' },
    ],
    'es-es': [
      { name: 'Como llegar', href: '/es-es/guia/como-llegar/', desc: 'Aeropuertos, trenes, autobuses y ferries a la Costa' },
      { name: 'Cuando visitar', href: '/es-es/guia/cuando-visitar/', desc: 'Estaciones, clima y mejor epoca para visitar' },
      { name: 'Ferries y Aliscafos', href: '/es-es/guia/ferries/', desc: 'Horarios, precios y rutas en el Golfo de Napoles' },
      { name: 'Bus SITA', href: '/es-es/guia/bus-sita/', desc: 'Horarios y paradas entre Amalfi, Positano y Sorrento' },
      { name: 'Aparcamiento & ZTL', href: '/es-es/guia/aparcamiento-ztl/', desc: 'Donde aparcar y zonas de trafico restringido' },
    ],
  })[lang];

  guide.forEach(g => {
    items.push({ title: g.name, description: g.desc, category: catLabels.guide[lang], url: g.href, icon: icons.guide });
  });

  // Experiences
  const experiences: { name: string; href: string; desc: string }[] = ({
    'it-it': [
      { name: 'Trekking & Sentiero degli Dei', href: '/it-it/esperienze/trekking/', desc: 'I percorsi piu spettacolari della Costiera a piedi' },
      { name: 'Tour in Barca', href: '/it-it/esperienze/tour-barca/', desc: 'Grotte marine, calette segrete e la costa vista dal mare' },
      { name: 'Mozzarella Experience', href: '/it-it/esperienze/mozzarella-experience/', desc: 'L\'arte del casaro e il provolone del Monaco' },
      { name: 'Limoncello Tour', href: '/it-it/esperienze/limoncello-tour/', desc: 'Dai limoneti di Amalfi al liquore piu famoso d\'Italia' },
      { name: 'Corso di Cucina', href: '/it-it/esperienze/corso-cucina/', desc: 'Impara la vera cucina campana con chef locali' },
      { name: 'Ristoranti Stellati', href: '/it-it/esperienze/ristoranti-stellati/', desc: 'L\'alta cucina della Costiera Amalfitana e Penisola Sorrentina' },
      { name: 'Matrimoni in Costiera', href: '/it-it/esperienze/matrimoni/', desc: 'Location da sogno per matrimoni sulla Costiera' },
    ],
    'en-us': [
      { name: 'Trekking & Path of the Gods', href: '/en-us/experiences/trekking/', desc: 'The most spectacular hiking trails on the Coast' },
      { name: 'Boat Tours', href: '/en-us/experiences/boat-tours/', desc: 'Sea caves, secret coves and the coast from the water' },
      { name: 'Mozzarella Experience', href: '/en-us/experiences/mozzarella-experience/', desc: 'The art of cheesemaking and Provolone del Monaco' },
      { name: 'Limoncello Tour', href: '/en-us/experiences/limoncello-tour/', desc: 'From Amalfi lemon groves to Italy\'s most famous liqueur' },
      { name: 'Cooking Class', href: '/en-us/experiences/cooking-class/', desc: 'Learn authentic Campanian cuisine with local chefs' },
      { name: 'Starred Restaurants', href: '/en-us/experiences/starred-restaurants/', desc: 'Fine dining on the Amalfi Coast and Sorrentine Peninsula' },
      { name: 'Weddings', href: '/en-us/experiences/weddings/', desc: 'Dream wedding venues on the Amalfi Coast' },
    ],
    'de-de': [
      { name: 'Wandern & Gotterpfad', href: '/de-de/erlebnisse/trekking/', desc: 'Die spektakularsten Wanderwege der Kuste' },
      { name: 'Bootstouren', href: '/de-de/erlebnisse/bootstouren/', desc: 'Meereshohlen, geheime Buchten und die Kuste vom Wasser' },
      { name: 'Mozzarella-Erlebnis', href: '/de-de/erlebnisse/mozzarella-erlebnis/', desc: 'Die Kunst des Kasemachens und Provolone del Monaco' },
      { name: 'Limoncello Tour', href: '/de-de/erlebnisse/limoncello-tour/', desc: 'Von den Zitronenhainen Amalfis zum beruhmtesten Likor' },
      { name: 'Kochkurs', href: '/de-de/erlebnisse/kochkurs/', desc: 'Authentische kampanische Kuche mit lokalen Kochen' },
      { name: 'Sterne-Restaurants', href: '/de-de/erlebnisse/sterne-restaurants/', desc: 'Gehobene Kuche an der Amalfikuste' },
      { name: 'Hochzeiten', href: '/de-de/erlebnisse/hochzeiten/', desc: 'Traumhafte Hochzeitslocations an der Amalfikuste' },
    ],
    'fr-fr': [
      { name: 'Randonnee & Sentier des Dieux', href: '/fr-fr/experiences/randonnee/', desc: 'Les sentiers les plus spectaculaires de la Cote' },
      { name: 'Tours en Bateau', href: '/fr-fr/experiences/tours-bateau/', desc: 'Grottes marines, criques secretes et la cote vue de la mer' },
      { name: 'Experience Mozzarella', href: '/fr-fr/experiences/experience-mozzarella/', desc: 'L\'art du fromager et le Provolone del Monaco' },
      { name: 'Tour du Limoncello', href: '/fr-fr/experiences/limoncello-tour/', desc: 'Des citronniers d\'Amalfi a la liqueur la plus celebre' },
      { name: 'Cours de Cuisine', href: '/fr-fr/experiences/cours-cuisine/', desc: 'Apprenez la vraie cuisine campanienne avec des chefs locaux' },
      { name: 'Restaurants Etoiles', href: '/fr-fr/experiences/restaurants-etoiles/', desc: 'Haute cuisine sur la Cote Amalfitaine' },
      { name: 'Mariages', href: '/fr-fr/experiences/mariages/', desc: 'Lieux de reve pour se marier sur la Cote' },
    ],
    'es-es': [
      { name: 'Senderismo & Sendero de los Dioses', href: '/es-es/experiencias/senderismo/', desc: 'Las rutas mas espectaculares de la Costa' },
      { name: 'Tours en Barco', href: '/es-es/experiencias/tours-barco/', desc: 'Cuevas marinas, calas secretas y la costa desde el agua' },
      { name: 'Experiencia Mozzarella', href: '/es-es/experiencias/experiencia-mozzarella/', desc: 'El arte del quesero y el Provolone del Monaco' },
      { name: 'Tour del Limoncello', href: '/es-es/experiencias/limoncello-tour/', desc: 'De los limonares de Amalfi al licor mas famoso' },
      { name: 'Clase de Cocina', href: '/es-es/experiencias/clase-cocina/', desc: 'Aprende la autentica cocina campana con chefs locales' },
      { name: 'Restaurantes con Estrella', href: '/es-es/experiencias/restaurantes-estrella/', desc: 'Alta cocina en la Costa Amalfitana' },
      { name: 'Bodas', href: '/es-es/experiencias/bodas/', desc: 'Lugares de ensueno para bodas en la Costa' },
    ],
  })[lang];

  experiences.forEach(e => {
    items.push({ title: e.name, description: e.desc, category: catLabels.experience[lang], url: e.href, icon: icons.experience });
  });

  // Hub pages
  const hubs: { name: string; href: string; desc: string; cat: string; icon: string }[] = ({
    'it-it': [
      { name: 'Tutte le Destinazioni', href: '/it-it/destinazioni/', desc: 'Scopri tutti i borghi della Costiera, Penisola e Isole', cat: catLabels.destination[lang], icon: icons.destination },
      { name: 'Tutte le Spiagge', href: '/it-it/spiagge/', desc: 'Le spiagge piu belle della Costiera e delle Isole', cat: catLabels.beach[lang], icon: icons.beach },
      { name: 'Tutti gli Itinerari', href: '/it-it/itinerari/', desc: 'Itinerari da 1, 3 e 7 giorni per ogni tipo di viaggio', cat: catLabels.itinerary[lang], icon: icons.itinerary },
      { name: 'Tutte le Esperienze', href: '/it-it/esperienze/', desc: 'Trekking, barche, cucina e molto altro', cat: catLabels.experience[lang], icon: icons.experience },
      { name: 'Tutti gli Eventi', href: '/it-it/eventi/', desc: 'Festival, sagre e celebrazioni locali', cat: catLabels.event[lang], icon: icons.event },
      { name: 'Tutte le Isole', href: '/it-it/isole/', desc: 'Capri, Ischia e Procida - le isole del Golfo', cat: catLabels.island[lang], icon: icons.island },
    ],
    'en-us': [
      { name: 'All Destinations', href: '/en-us/destinations/', desc: 'Discover all towns on the Coast, Peninsula and Islands', cat: catLabels.destination[lang], icon: icons.destination },
      { name: 'All Beaches', href: '/en-us/beaches/', desc: 'The most beautiful beaches on the Coast and Islands', cat: catLabels.beach[lang], icon: icons.beach },
      { name: 'All Itineraries', href: '/en-us/itineraries/', desc: '1, 3 and 7-day itineraries for every type of trip', cat: catLabels.itinerary[lang], icon: icons.itinerary },
      { name: 'All Experiences', href: '/en-us/experiences/', desc: 'Trekking, boats, cooking and much more', cat: catLabels.experience[lang], icon: icons.experience },
      { name: 'All Events', href: '/en-us/events/', desc: 'Festivals, food fairs and local celebrations', cat: catLabels.event[lang], icon: icons.event },
      { name: 'All Islands', href: '/en-us/islands/', desc: 'Capri, Ischia and Procida - islands of the Gulf', cat: catLabels.island[lang], icon: icons.island },
    ],
    'de-de': [
      { name: 'Alle Reiseziele', href: '/de-de/reiseziele/', desc: 'Entdecke alle Orte der Kuste, Halbinsel und Inseln', cat: catLabels.destination[lang], icon: icons.destination },
      { name: 'Alle Strande', href: '/de-de/strande/', desc: 'Die schonsten Strande der Kuste und Inseln', cat: catLabels.beach[lang], icon: icons.beach },
      { name: 'Alle Reiserouten', href: '/de-de/reiserouten/', desc: '1, 3 und 7-Tage Reiserouten fur jeden Reisetyp', cat: catLabels.itinerary[lang], icon: icons.itinerary },
      { name: 'Alle Erlebnisse', href: '/de-de/erlebnisse/', desc: 'Wandern, Boote, Kochen und vieles mehr', cat: catLabels.experience[lang], icon: icons.experience },
      { name: 'Alle Veranstaltungen', href: '/de-de/veranstaltungen/', desc: 'Festivals, Sagre und lokale Feiern', cat: catLabels.event[lang], icon: icons.event },
      { name: 'Alle Inseln', href: '/de-de/inseln/', desc: 'Capri, Ischia und Procida - die Inseln des Golfs', cat: catLabels.island[lang], icon: icons.island },
    ],
    'fr-fr': [
      { name: 'Toutes les Destinations', href: '/fr-fr/destinations/', desc: 'Decouvrez tous les villages de la Cote, Peninsule et Iles', cat: catLabels.destination[lang], icon: icons.destination },
      { name: 'Toutes les Plages', href: '/fr-fr/plages/', desc: 'Les plus belles plages de la Cote et des Iles', cat: catLabels.beach[lang], icon: icons.beach },
      { name: 'Tous les Itineraires', href: '/fr-fr/itineraires/', desc: 'Itineraires de 1, 3 et 7 jours pour chaque type de voyage', cat: catLabels.itinerary[lang], icon: icons.itinerary },
      { name: 'Toutes les Experiences', href: '/fr-fr/experiences/', desc: 'Randonnee, bateaux, cuisine et bien plus', cat: catLabels.experience[lang], icon: icons.experience },
      { name: 'Tous les Evenements', href: '/fr-fr/evenements/', desc: 'Festivals, sagre et celebrations locales', cat: catLabels.event[lang], icon: icons.event },
      { name: 'Toutes les Iles', href: '/fr-fr/iles/', desc: 'Capri, Ischia et Procida - les iles du Golfe', cat: catLabels.island[lang], icon: icons.island },
    ],
    'es-es': [
      { name: 'Todos los Destinos', href: '/es-es/destinos/', desc: 'Descubre todos los pueblos de la Costa, Peninsula e Islas', cat: catLabels.destination[lang], icon: icons.destination },
      { name: 'Todas las Playas', href: '/es-es/playas/', desc: 'Las playas mas bonitas de la Costa y las Islas', cat: catLabels.beach[lang], icon: icons.beach },
      { name: 'Todos los Itinerarios', href: '/es-es/itinerarios/', desc: 'Itinerarios de 1, 3 y 7 dias para cada tipo de viaje', cat: catLabels.itinerary[lang], icon: icons.itinerary },
      { name: 'Todas las Experiencias', href: '/es-es/experiencias/', desc: 'Senderismo, barcos, cocina y mucho mas', cat: catLabels.experience[lang], icon: icons.experience },
      { name: 'Todos los Eventos', href: '/es-es/eventos/', desc: 'Festivales, sagre y celebraciones locales', cat: catLabels.event[lang], icon: icons.event },
      { name: 'Todas las Islas', href: '/es-es/islas/', desc: 'Capri, Ischia y Procida - islas del Golfo', cat: catLabels.island[lang], icon: icons.island },
    ],
  })[lang];

  hubs.forEach(h => {
    items.push({ title: h.name, description: h.desc, category: h.cat, url: h.href, icon: h.icon });
  });

  // Blog posts
  const blogs = blogByLang[lang];
  blogs.forEach(post => {
    items.push({
      title: post.title,
      description: post.excerpt,
      category: catLabels.blog[lang],
      url: post.path,
      icon: icons.blog,
    });
  });

  // Events
  const evts = eventsByLang[lang];
  evts.forEach(evt => {
    items.push({
      title: evt.title,
      description: evt.description,
      category: catLabels.event[lang],
      url: evt.path,
      icon: icons.event,
    });
  });

  return items;
}
