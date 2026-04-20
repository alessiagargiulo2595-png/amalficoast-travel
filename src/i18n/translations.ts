export type Locale = 'en-us' | 'en-gb' | 'de-de' | 'fr-fr' | 'es-es' | 'it-it';

export interface Translations {
  nav: {
    home: string;
    destinations: string;
    beaches: string;
    itineraries: string;
    getting_here: string;
    when_to_visit: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    cta_secondary: string;
  };
  sections: {
    featured_towns: string;
    why_visit: string;
    top_beaches: string;
    plan_your_trip: string;
    explore_more: string;
    read_more: string;
    back_to_home: string;
  };
  footer: {
    about_title: string;
    about_text: string;
    quick_links: string;
    contact_title: string;
    contact_email: string;
    copyright: string;
    tagline: string;
  };
  meta: {
    home_title: string;
    home_description: string;
    destinations_title: string;
    destinations_description: string;
    beaches_title: string;
    beaches_description: string;
    getting_here_title: string;
    getting_here_description: string;
    itineraries_title: string;
    itineraries_description: string;
    when_to_visit_title: string;
    when_to_visit_description: string;
  };
  lang_switcher: string;
  languages: Record<Locale, string>;
}

export const translations: Record<Locale, Translations> = {
  'en-us': {
    nav: {
      home: 'Home',
      destinations: 'Destinations',
      beaches: 'Beaches',
      itineraries: 'Itineraries',
      getting_here: 'Getting Here',
      when_to_visit: 'When to Visit',
    },
    hero: {
      title: 'Discover the Amalfi Coast',
      subtitle: 'Where cliffs meet the Mediterranean - explore Italy\'s most breathtaking coastline, from the rainbow-colored villages of Positano to the cathedral city of Amalfi.',
      cta: 'Explore Destinations',
      cta_secondary: 'Plan Your Trip',
    },
    sections: {
      featured_towns: 'Iconic Towns & Villages',
      why_visit: 'Why Visit the Amalfi Coast',
      top_beaches: 'Top Beaches',
      plan_your_trip: 'Plan Your Trip',
      explore_more: 'Explore More',
      read_more: 'Read More',
      back_to_home: 'Back to Home',
    },
    footer: {
      about_title: 'About This Guide',
      about_text: 'Amalfi Coast Travel helps travelers from around the world plan their trip to the Amalfi Coast through guides, travel tips, and much more. The entire project is lovingly curated by Alessia, directly from Massa Lubrense.',
      quick_links: 'Quick Links',
      contact_title: 'Get in Touch',
      contact_email: 'hello@amalficoast-travel.com',
      copyright: '© 2026 Amalfi Coast Travel Guide. All rights reserved.',
      tagline: 'The Amalfi Coast - A UNESCO World Heritage Site',
    },
    meta: {
      home_title: 'Amalfi Coast Travel Guide - Positano, Amalfi & Beyond',
      home_description: 'Complete travel guide to the Amalfi Coast, Italy. Discover Positano, Amalfi, Ravello and hidden gems. Best beaches, itineraries, how to get there, and when to visit.',
      destinations_title: 'Amalfi Coast Destinations - Towns & Villages Guide',
      destinations_description: 'Explore every town on the Amalfi Coast: Positano, Amalfi, Ravello, Praiano, Cetara, Vietri sul Mare. Find the perfect base for your visit.',
      beaches_title: 'Best Beaches on the Amalfi Coast - Complete Guide',
      beaches_description: 'Discover the most beautiful beaches on the Amalfi Coast, from the pebble shores of Positano to hidden sea caves. Swimming, snorkeling, and beach clubs.',
      getting_here_title: 'How to Get to the Amalfi Coast - Transport Guide',
      getting_here_description: 'Everything you need to know about getting to the Amalfi Coast: from Naples, from Rome, by ferry, by car, and by bus. Practical travel tips.',
      itineraries_title: 'Amalfi Coast Itineraries - 1 Day, 3 Days, 1 Week',
      itineraries_description: 'The best Amalfi Coast itineraries for every trip length. One day, three days, or a full week - make the most of your visit to Italy\'s Costiera Amalfitana.',
      when_to_visit_title: 'Best Time to Visit the Amalfi Coast - Month by Month',
      when_to_visit_description: 'When is the best time to visit the Amalfi Coast? Month-by-month weather guide, crowd levels, prices, and seasonal highlights.',
    },
    lang_switcher: 'Language',
    languages: {
      'en-us': '🇺🇸 English (US)',
      'en-gb': '🇬🇧 English (UK)',
      'de-de': '🇩🇪 Deutsch',
      'fr-fr': '🇫🇷 Français',
      'es-es': '🇪🇸 Español',
      'it-it': '🇮🇹 Italiano',
    },
  },

  'en-gb': {
    nav: {
      home: 'Home',
      destinations: 'Destinations',
      beaches: 'Beaches',
      itineraries: 'Itineraries',
      getting_here: 'Getting Here',
      when_to_visit: 'When to Visit',
    },
    hero: {
      title: 'Discover the Amalfi Coast',
      subtitle: 'Where rugged cliffs plunge into the Mediterranean - explore Italy\'s most spectacular coastline, from the pastel villages of Positano to the magnificent cathedral city of Amalfi.',
      cta: 'Explore Destinations',
      cta_secondary: 'Plan Your Holiday',
    },
    sections: {
      featured_towns: 'Iconic Towns & Villages',
      why_visit: 'Why Visit the Amalfi Coast',
      top_beaches: 'Top Beaches',
      plan_your_trip: 'Plan Your Holiday',
      explore_more: 'Explore More',
      read_more: 'Read More',
      back_to_home: 'Back to Home',
    },
    footer: {
      about_title: 'About This Guide',
      about_text: 'Amalfi Coast Travel helps travellers from around the world plan their trip to the Amalfi Coast through guides, travel tips, and much more. The entire project is lovingly curated by Alessia, directly from Massa Lubrense.',
      quick_links: 'Quick Links',
      contact_title: 'Get in Touch',
      contact_email: 'hello@amalficoast-travel.com',
      copyright: '© 2026 Amalfi Coast Travel Guide. All rights reserved.',
      tagline: 'The Amalfi Coast - A UNESCO World Heritage Site',
    },
    meta: {
      home_title: 'Amalfi Coast Travel Guide - Positano, Amalfi & Beyond',
      home_description: 'Complete holiday guide to the Amalfi Coast, Italy. Discover Positano, Amalfi, Ravello and hidden gems. Best beaches, itineraries, how to get there, and when to visit.',
      destinations_title: 'Amalfi Coast Destinations - Towns & Villages Guide',
      destinations_description: 'Explore every town on the Amalfi Coast: Positano, Amalfi, Ravello, Praiano, Cetara, Vietri sul Mare. Find the perfect base for your holiday.',
      beaches_title: 'Best Beaches on the Amalfi Coast - Complete Guide',
      beaches_description: 'Discover the most beautiful beaches on the Amalfi Coast, from the shingle shores of Positano to hidden sea caves. Swimming, snorkelling, and beach clubs.',
      getting_here_title: 'How to Get to the Amalfi Coast - Transport Guide',
      getting_here_description: 'Everything you need to know about getting to the Amalfi Coast from the UK: from Naples, from Rome, by ferry, by car, and by bus. Practical travel tips.',
      itineraries_title: 'Amalfi Coast Itineraries - 1 Day, 3 Days, 1 Week',
      itineraries_description: 'The best Amalfi Coast itineraries for every trip length. One day, three days, or a full week - make the most of your holiday on Italy\'s Costiera Amalfitana.',
      when_to_visit_title: 'Best Time to Visit the Amalfi Coast - Month by Month',
      when_to_visit_description: 'When is the best time to visit the Amalfi Coast? Month-by-month weather guide, crowd levels, prices, and what\'s on each season.',
    },
    lang_switcher: 'Language',
    languages: {
      'en-us': '🇺🇸 English (US)',
      'en-gb': '🇬🇧 English (UK)',
      'de-de': '🇩🇪 Deutsch',
      'fr-fr': '🇫🇷 Français',
      'es-es': '🇪🇸 Español',
      'it-it': '🇮🇹 Italiano',
    },
  },

  'de-de': {
    nav: {
      home: 'Startseite',
      destinations: 'Reiseziele',
      beaches: 'Strände',
      itineraries: 'Reiserouten',
      getting_here: 'Anreise',
      when_to_visit: 'Reisezeit',
    },
    hero: {
      title: 'Entdecken Sie die Amalfiküste',
      subtitle: 'Wo dramatische Klippen auf das Mittelmeer treffen - erkunden Sie Italiens atemberaubendste Küste, von den bunten Dörfern Positanos bis zur Kathedralenstadt Amalfi.',
      cta: 'Reiseziele entdecken',
      cta_secondary: 'Reise planen',
    },
    sections: {
      featured_towns: 'Berühmte Städte & Dörfer',
      why_visit: 'Warum die Amalfiküste besuchen?',
      top_beaches: 'Die schönsten Strände',
      plan_your_trip: 'Reise planen',
      explore_more: 'Mehr entdecken',
      read_more: 'Mehr lesen',
      back_to_home: 'Zurück zur Startseite',
    },
    footer: {
      about_title: 'Über diesen Reiseführer',
      about_text: 'Amalfi Coast Travel hilft Reisenden aus aller Welt, ihre Reise an die Amalfiküste zu planen – mit Reiseführern, Reisetipps und vielem mehr. Das gesamte Projekt wird mit ❤ von Alessia direkt aus Massa Lubrense betreut.',
      quick_links: 'Schnelllinks',
      contact_title: 'Kontakt',
      contact_email: 'hello@amalficoast-travel.com',
      copyright: '© 2026 Amalfiküste Reiseführer. Alle Rechte vorbehalten.',
      tagline: 'Die Amalfiküste - UNESCO-Weltkulturerbe',
    },
    meta: {
      home_title: 'Amalfiküste Reiseführer - Positano, Amalfi & mehr',
      home_description: 'Kompletter Reiseführer für die Amalfiküste in Italien. Entdecken Sie Positano, Amalfi, Ravello und versteckte Perlen. Beste Strände, Reiserouten, Anreise und Reisezeit.',
      destinations_title: 'Reiseziele an der Amalfiküste - Städte & Dörfer',
      destinations_description: 'Erkunden Sie jede Stadt an der Amalfiküste: Positano, Amalfi, Ravello, Praiano, Cetara, Vietri sul Mare.',
      beaches_title: 'Die schönsten Strände der Amalfiküste',
      beaches_description: 'Entdecken Sie die schönsten Strände der Amalfiküste, von den Kiesstränden Positanos bis zu versteckten Meereshöhlen.',
      getting_here_title: 'Anreise zur Amalfiküste - Reiseinformationen',
      getting_here_description: 'Alles Wichtige zur Anreise an die Amalfiküste: ab Neapel, ab Rom, per Fähre, mit dem Auto und per Bus.',
      itineraries_title: 'Amalfiküste Reiserouten - 1 Tag, 3 Tage, 1 Woche',
      itineraries_description: 'Die besten Reiserouten für die Amalfiküste. Ein Tag, drei Tage oder eine ganze Woche - das Beste aus Ihrem Besuch herausholen.',
      when_to_visit_title: 'Beste Reisezeit für die Amalfiküste - Monat für Monat',
      when_to_visit_description: 'Wann ist die beste Reisezeit für die Amalfiküste? Monatsweiser Wetterführer, Besucherzahlen, Preise und saisonale Highlights.',
    },
    lang_switcher: 'Sprache',
    languages: {
      'en-us': '🇺🇸 English (US)',
      'en-gb': '🇬🇧 English (UK)',
      'de-de': '🇩🇪 Deutsch',
      'fr-fr': '🇫🇷 Français',
      'es-es': '🇪🇸 Español',
      'it-it': '🇮🇹 Italiano',
    },
  },

  'fr-fr': {
    nav: {
      home: 'Accueil',
      destinations: 'Destinations',
      beaches: 'Plages',
      itineraries: 'Itinéraires',
      getting_here: 'Comment venir',
      when_to_visit: 'Quand visiter',
    },
    hero: {
      title: 'Découvrez la Côte Amalfitaine',
      subtitle: 'Là où les falaises vertigineuses plongent dans la Méditerranée - explorez le plus beau littoral d\'Italie, des villages colorés de Positano à la majestueuse cité cathédrale d\'Amalfi.',
      cta: 'Explorer les destinations',
      cta_secondary: 'Planifier votre voyage',
    },
    sections: {
      featured_towns: 'Villes et villages emblématiques',
      why_visit: 'Pourquoi visiter la Côte Amalfitaine ?',
      top_beaches: 'Les plus belles plages',
      plan_your_trip: 'Planifier votre voyage',
      explore_more: 'Explorer davantage',
      read_more: 'En savoir plus',
      back_to_home: 'Retour à l\'accueil',
    },
    footer: {
      about_title: 'À propos de ce guide',
      about_text: 'Amalfi Coast Travel aide les voyageurs du monde entier à planifier leur séjour sur la Côte Amalfitaine grâce à des guides, des conseils de voyage et bien plus encore. L\'ensemble du projet est géré avec ❤ par Alessia, directement depuis Massa Lubrense.',
      quick_links: 'Liens rapides',
      contact_title: 'Nous contacter',
      contact_email: 'hello@amalficoast-travel.com',
      copyright: '© 2026 Guide de voyage Côte Amalfitaine. Tous droits réservés.',
      tagline: 'La Côte Amalfitaine - Site du patrimoine mondial de l\'UNESCO',
    },
    meta: {
      home_title: 'Guide de voyage Côte Amalfitaine - Positano, Amalfi et plus',
      home_description: 'Guide complet de la Côte Amalfitaine en Italie. Découvrez Positano, Amalfi, Ravello et des joyaux cachés. Meilleures plages, itinéraires, comment s\'y rendre et quand y aller.',
      destinations_title: 'Destinations Côte Amalfitaine - Villes et villages',
      destinations_description: 'Explorez chaque ville de la Côte Amalfitaine : Positano, Amalfi, Ravello, Praiano, Cetara, Vietri sul Mare.',
      beaches_title: 'Les plus belles plages de la Côte Amalfitaine',
      beaches_description: 'Découvrez les plus belles plages de la Côte Amalfitaine, des galets de Positano aux grottes marines cachées.',
      getting_here_title: 'Comment se rendre sur la Côte Amalfitaine',
      getting_here_description: 'Tout sur comment rejoindre la Côte Amalfitaine : depuis Naples, depuis Rome, en ferry, en voiture et en bus.',
      itineraries_title: 'Itinéraires Côte Amalfitaine - 1 jour, 3 jours, 1 semaine',
      itineraries_description: 'Les meilleurs itinéraires pour la Côte Amalfitaine selon la durée de votre séjour. Un jour, trois jours ou une semaine entière.',
      when_to_visit_title: 'Meilleure période pour visiter la Côte Amalfitaine',
      when_to_visit_description: 'Quelle est la meilleure période pour visiter la Côte Amalfitaine ? Guide météo mois par mois, affluence, prix et événements saisonniers.',
    },
    lang_switcher: 'Langue',
    languages: {
      'en-us': '🇺🇸 English (US)',
      'en-gb': '🇬🇧 English (UK)',
      'de-de': '🇩🇪 Deutsch',
      'fr-fr': '🇫🇷 Français',
      'es-es': '🇪🇸 Español',
      'it-it': '🇮🇹 Italiano',
    },
  },

  'es-es': {
    nav: {
      home: 'Inicio',
      destinations: 'Destinos',
      beaches: 'Playas',
      itineraries: 'Itinerarios',
      getting_here: 'Cómo llegar',
      when_to_visit: 'Cuándo visitar',
    },
    hero: {
      title: 'Descubre la Costa Amalfitana',
      subtitle: 'Donde los acantilados dramáticos se encuentran con el Mediterráneo - explora el litoral más impresionante de Italia, desde los coloridos pueblos de Positano hasta la ciudad catedralicia de Amalfi.',
      cta: 'Explorar destinos',
      cta_secondary: 'Planifica tu viaje',
    },
    sections: {
      featured_towns: 'Pueblos y ciudades icónicas',
      why_visit: '¿Por qué visitar la Costa Amalfitana?',
      top_beaches: 'Las mejores playas',
      plan_your_trip: 'Planifica tu viaje',
      explore_more: 'Explorar más',
      read_more: 'Leer más',
      back_to_home: 'Volver al inicio',
    },
    footer: {
      about_title: 'Sobre esta guía',
      about_text: 'Amalfi Coast Travel ayuda a viajeros de todo el mundo a planificar su viaje a la Costa Amalfitana a través de guías, consejos de viaje y mucho más. Todo el proyecto está cuidado con ❤ por Alessia, directamente desde Massa Lubrense.',
      quick_links: 'Enlaces rápidos',
      contact_title: 'Contacto',
      contact_email: 'hello@amalficoast-travel.com',
      copyright: '© 2026 Guía de viaje Costa Amalfitana. Todos los derechos reservados.',
      tagline: 'La Costa Amalfitana - Patrimonio Mundial de la UNESCO',
    },
    meta: {
      home_title: 'Guía de la Costa Amalfitana - Positano, Amalfi y más',
      home_description: 'Guía completa de la Costa Amalfitana en Italia. Descubre Positano, Amalfi, Ravello y joyas escondidas. Las mejores playas, itinerarios, cómo llegar y cuándo ir.',
      destinations_title: 'Destinos de la Costa Amalfitana - Pueblos y ciudades',
      destinations_description: 'Explora cada pueblo de la Costa Amalfitana: Positano, Amalfi, Ravello, Praiano, Cetara, Vietri sul Mare.',
      beaches_title: 'Las mejores playas de la Costa Amalfitana',
      beaches_description: 'Descubre las playas más hermosas de la Costa Amalfitana, desde las orillas de guijarros de Positano hasta cuevas marinas escondidas.',
      getting_here_title: 'Cómo llegar a la Costa Amalfitana - Guía de transporte',
      getting_here_description: 'Todo lo que necesitas saber para llegar a la Costa Amalfitana: desde Nápoles, desde Roma, en ferry, en coche y en autobús.',
      itineraries_title: 'Itinerarios Costa Amalfitana - 1 día, 3 días, 1 semana',
      itineraries_description: 'Los mejores itinerarios para la Costa Amalfitana según la duración de tu viaje. Un día, tres días o una semana completa.',
      when_to_visit_title: 'Mejor época para visitar la Costa Amalfitana',
      when_to_visit_description: '¿Cuándo es mejor visitar la Costa Amalfitana? Guía meteorológica mes a mes, nivel de turistas, precios y eventos de temporada.',
    },
    lang_switcher: 'Idioma',
    languages: {
      'en-us': '🇺🇸 English (US)',
      'en-gb': '🇬🇧 English (UK)',
      'de-de': '🇩🇪 Deutsch',
      'fr-fr': '🇫🇷 Français',
      'es-es': '🇪🇸 Español',
      'it-it': '🇮🇹 Italiano',
    },
  },

  'it-it': {
    nav: {
      home: 'Home',
      destinations: 'Destinazioni',
      beaches: 'Spiagge',
      itineraries: 'Itinerari',
      getting_here: 'Come arrivare',
      when_to_visit: 'Quando visitare',
    },
    hero: {
      title: 'Scopri la Costiera Amalfitana',
      subtitle: 'Dove le scogliere incontrano il Mediterraneo - esplora la costa più bella d\'Italia, dai colorati borghi di Positano alla maestosa città cattedrale di Amalfi.',
      cta: 'Scopri le destinazioni',
      cta_secondary: 'Pianifica il viaggio',
    },
    sections: {
      featured_towns: 'Borghi e città iconiche',
      why_visit: 'Perché visitare la Costiera Amalfitana',
      top_beaches: 'Le migliori spiagge',
      plan_your_trip: 'Pianifica il tuo viaggio',
      explore_more: 'Esplora ancora',
      read_more: 'Leggi di più',
      back_to_home: 'Torna alla home',
    },
    footer: {
      about_title: 'Sulla guida',
      about_text: 'Amalfi Coast Travel aiuta i viaggiatori di tutto il mondo a pianificare il loro viaggio in Costiera Amalfitana attraverso guide, consigli di viaggio e molto altro. L\'intero progetto è curato con ❤ da Alessia, direttamente da Massa Lubrense.',
      quick_links: 'Link rapidi',
      contact_title: 'Contattaci',
      contact_email: 'hello@amalficoast-travel.com',
      copyright: '© 2026 Guida turistica Costiera Amalfitana. Tutti i diritti riservati.',
      tagline: 'La Costiera Amalfitana - Un patrimonio dell\'umanità UNESCO',
    },
    meta: {
      home_title: 'Guida alla Costiera Amalfitana - Positano, Amalfi e dintorni',
      home_description: 'Guida completa alla Costiera Amalfitana. Scopri Positano, Amalfi, Ravello e le gemme nascoste. Le migliori spiagge, itinerari, come arrivare e quando visitare.',
      destinations_title: 'Destinazioni Costiera Amalfitana - Borghi e città',
      destinations_description: 'Esplora ogni borgo della Costiera Amalfitana: Positano, Amalfi, Ravello, Praiano, Cetara, Vietri sul Mare.',
      beaches_title: 'Le migliori spiagge della Costiera Amalfitana',
      beaches_description: 'Scopri le spiagge più belle della Costiera Amalfitana, dalle rive di ciottoli di Positano alle grotte marine nascoste.',
      getting_here_title: 'Come arrivare alla Costiera Amalfitana - Guida ai trasporti',
      getting_here_description: 'Tutto ciò che devi sapere per raggiungere la Costiera Amalfitana: da Napoli, da Roma, in traghetto, in auto e in autobus.',
      itineraries_title: 'Itinerari Costiera Amalfitana - 1 giorno, 3 giorni, 1 settimana',
      itineraries_description: 'I migliori itinerari per la Costiera Amalfitana a seconda della durata del soggiorno. Un giorno, tre giorni o una settimana intera.',
      when_to_visit_title: 'Quando visitare la Costiera Amalfitana - Guida mese per mese',
      when_to_visit_description: 'Qual è il momento migliore per visitare la Costiera Amalfitana? Guida meteo mese per mese, affluenza turistica, prezzi e eventi stagionali.',
    },
    lang_switcher: 'Lingua',
    languages: {
      'en-us': '🇺🇸 English (US)',
      'en-gb': '🇬🇧 English (UK)',
      'de-de': '🇩🇪 Deutsch',
      'fr-fr': '🇫🇷 Français',
      'es-es': '🇪🇸 Español',
      'it-it': '🇮🇹 Italiano',
    },
  },
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations['en-us'];
}

export type SlugMap = Record<Locale, string>;

export const slugMap: Record<string, SlugMap> = {
  destinations: {
    'en-us': 'destinations',
    'en-gb': 'destinations',
    'de-de': 'destinations',
    'fr-fr': 'destinations',
    'es-es': 'destinos',
    'it-it': 'destinazioni',
  },
  beaches: {
    'en-us': 'beaches',
    'en-gb': 'beaches',
    'de-de': 'strande',
    'fr-fr': 'plages',
    'es-es': 'playas',
    'it-it': 'spiagge',
  },
  'getting-here': {
    'en-us': 'getting-here',
    'en-gb': 'getting-here',
    'de-de': 'anreise',
    'fr-fr': 'comment-venir',
    'es-es': 'como-llegar',
    'it-it': 'come-arrivare',
  },
  itineraries: {
    'en-us': 'itineraries',
    'en-gb': 'itineraries',
    'de-de': 'reiserouten',
    'fr-fr': 'itineraires',
    'es-es': 'itinerarios',
    'it-it': 'itinerari',
  },
  'when-to-visit': {
    'en-us': 'when-to-visit',
    'en-gb': 'when-to-visit',
    'de-de': 'reisezeit',
    'fr-fr': 'quand-visiter',
    'es-es': 'cuando-visitar',
    'it-it': 'quando-visitare',
  },
};

export function getLocalePath(locale: Locale, pageKey: string): string {
  const prefix = `/${locale}`;
  if (pageKey === 'home') return `${prefix}/`;
  const slug = slugMap[pageKey]?.[locale] ?? pageKey;
  return `${prefix}/${slug}/`;
}

// Path-segment translation table for automatic hreflang computation on deep pages
export const pathSegments: Array<Record<Locale, string>> = [
  // Coast hub + sub-paths (beaches/events/…)
  { 'en-us': 'amalfi-coast',         'en-gb': 'amalfi-coast',         'de-de': 'amalfikueste',       'fr-fr': 'cote-amalfitaine',     'es-es': 'costa-amalfitana',     'it-it': 'costiera-amalfitana'  },
  // Islands hub
  { 'en-us': 'isole',                'en-gb': 'isole',                'de-de': 'inseln',              'fr-fr': 'iles',                 'es-es': 'islas',                'it-it': 'isole'                },
  // Beaches hub
  { 'en-us': 'beaches',              'en-gb': 'beaches',              'de-de': 'strande',             'fr-fr': 'plages',               'es-es': 'playas',               'it-it': 'spiagge'              },
  // Guide hub
  { 'en-us': 'guide',                'en-gb': 'guide',                'de-de': 'ratgeber',            'fr-fr': 'guide',                'es-es': 'guia',                 'it-it': 'guida'                },
  // Events hub
  { 'en-us': 'events',               'en-gb': 'events',               'de-de': 'events',              'fr-fr': 'events',               'es-es': 'events',               'it-it': 'eventi'               },
  // Experiences hub
  { 'en-us': 'experiences',          'en-gb': 'experiences',          'de-de': 'experiences',         'fr-fr': 'experiences',          'es-es': 'experiences',          'it-it': 'esperienze'           },
  // Itineraries hub
  { 'en-us': 'itineraries',          'en-gb': 'itineraries',          'de-de': 'reiserouten',         'fr-fr': 'itineraires',          'es-es': 'itinerarios',          'it-it': 'itinerari'            },
  // Getting here
  { 'en-us': 'getting-here',         'en-gb': 'getting-here',         'de-de': 'anreise',             'fr-fr': 'comment-venir',        'es-es': 'como-llegar',          'it-it': 'come-arrivare'        },
  // When to visit
  { 'en-us': 'when-to-visit',        'en-gb': 'when-to-visit',        'de-de': 'reisezeit',           'fr-fr': 'quand-visiter',        'es-es': 'cuando-visitar',       'it-it': 'quando-visitare'      },
  // Destinations page
  { 'en-us': 'destinations',         'en-gb': 'destinations',         'de-de': 'destinations',        'fr-fr': 'destinations',         'es-es': 'destinos',             'it-it': 'destinazioni'         },
  // Guide sub-pages
  { 'en-us': 'ferries',              'en-gb': 'ferries',              'de-de': 'faehren',             'fr-fr': 'ferries',              'es-es': 'ferries',              'it-it': 'traghetti'            },
  { 'en-us': 'sita-bus',             'en-gb': 'sita-bus',             'de-de': 'sita-bus',            'fr-fr': 'bus-sita',             'es-es': 'bus-sita',             'it-it': 'bus-sita'             },
  { 'en-us': 'parking-ztl',          'en-gb': 'parking-ztl',          'de-de': 'parken-ztl',          'fr-fr': 'parking-ztl',          'es-es': 'aparcamiento-ztl',     'it-it': 'parcheggi-ztl'        },
  // Itinerary duration folders
  { 'en-us': '1-day',                'en-gb': '1-day',                'de-de': '1-tag',               'fr-fr': '1-jour',               'es-es': '1-dia',                'it-it': '1-giorno'             },
  { 'en-us': '3-days',               'en-gb': '3-days',               'de-de': '3-tage',              'fr-fr': '3-jours',              'es-es': '3-dias',               'it-it': '3-giorni'             },
  { 'en-us': '7-days',               'en-gb': '7-days',               'de-de': '7-tage',              'fr-fr': '7-jours',              'es-es': '7-dias',               'it-it': '7-giorni'             },
  // Events sub-area slugs
  { 'en-us': 'islands',              'en-gb': 'islands',              'de-de': 'inseln',              'fr-fr': 'iles',                 'es-es': 'islas',                'it-it': 'isole'                },
  { 'en-us': 'sorrentine-peninsula', 'en-gb': 'sorrentine-peninsula', 'de-de': 'penisola-sorrentina', 'fr-fr': 'penisola-sorrentina',  'es-es': 'penisola-sorrentina',  'it-it': 'penisola-sorrentina'  },
  // Experiences sub-pages
  { 'en-us': 'boat-tours',                        'en-gb': 'boat-tours',                        'de-de': 'boat-tours',                       'fr-fr': 'boat-tours',                        'es-es': 'boat-tours',                        'it-it': 'tour-barca'                        },
  // Itinerary detail slugs - 1 day
  { 'en-us': 'amalfi-coast-from-naples',          'en-gb': 'amalfi-coast-from-naples',          'de-de': 'amalfikueste-von-neapel',           'fr-fr': 'cote-amalfitaine-depuis-naples',    'es-es': 'costa-amalfitana-desde-napoles',    'it-it': 'costiera-amalfitana-da-napoli'     },
  { 'en-us': 'amalfi-coast-from-salerno',         'en-gb': 'amalfi-coast-from-salerno',         'de-de': 'amalfikueste-von-salerno',           'fr-fr': 'cote-amalfitaine-depuis-salerne',   'es-es': 'costa-amalfitana-desde-salerno',    'it-it': 'costiera-amalfitana-da-salerno'    },
  { 'en-us': 'capri-from-sorrento',               'en-gb': 'capri-from-sorrento',               'de-de': 'capri-von-sorrent',                  'fr-fr': 'capri-depuis-sorrente',             'es-es': 'capri-desde-sorrento',              'it-it': 'capri-da-sorrento'                 },
  { 'en-us': 'sorrentine-peninsula-from-naples',  'en-gb': 'sorrentine-peninsula-from-naples',  'de-de': 'sorrentinische-halbinsel-von-neapel','fr-fr': 'peninsule-sorrentine-depuis-naples','es-es': 'peninsula-sorrentina-desde-napoles','it-it': 'penisola-sorrentina-da-napoli'     },
  { 'en-us': 'path-of-the-gods-trek',             'en-gb': 'path-of-the-gods-trek',             'de-de': 'weg-der-goetter-trekking',           'fr-fr': 'sentier-des-dieux-trek',            'es-es': 'sendero-de-los-dioses-trek',        'it-it': 'trekking-sentiero-degli-dei'       },
  // Itinerary detail slugs - 3 days
  { 'en-us': 'classic-amalfi-coast',              'en-gb': 'classic-amalfi-coast',              'de-de': 'klassische-amalfikueste',            'fr-fr': 'cote-amalfitaine-classique',        'es-es': 'costa-amalfitana-clasica',          'it-it': 'classico-costiera-amalfitana'      },
  { 'en-us': 'islands-ischia-procida',            'en-gb': 'islands-ischia-procida',            'de-de': 'inseln-ischia-procida',              'fr-fr': 'iles-ischia-procida',               'es-es': 'islas-ischia-procida',              'it-it': 'isole-ischia-procida'              },
  { 'en-us': 'sorrento-pompeii-history',          'en-gb': 'sorrento-pompeii-history',          'de-de': 'sorrent-pompeji-geschichte',         'fr-fr': 'sorrente-pompei-histoire',          'es-es': 'sorrento-pompeya-historia',         'it-it': 'sorrento-pompei-storia'            },
  // Itinerary detail slugs - 7 days
  { 'en-us': 'grand-tour-coast-peninsula',        'en-gb': 'grand-tour-coast-peninsula',        'de-de': 'grand-tour-kueste-halbinsel',        'fr-fr': 'grand-tour-cote-peninsule',         'es-es': 'gran-tour-costa-peninsula',         'it-it': 'grand-tour-costiera-penisola'      },
  { 'en-us': 'slow-travel-villages-food',         'en-gb': 'slow-travel-villages-food',         'de-de': 'slow-travel-doerfer-kulinarik',      'fr-fr': 'slow-travel-villages-gastronomie',  'es-es': 'slow-travel-pueblos-gastronomia',   'it-it': 'slow-travel-borghi-cibo'           },
];

/**
 * Translates a URL pathname from one locale to another by mapping
 * locale-specific path segments using pathSegments table.
 * Segments not found in the table (e.g. town slugs) are kept as-is.
 */
export function translatePath(pathname: string, source: Locale, target: Locale): string {
  if (source === target) return pathname;

  // Build lookup: source-locale segment value → row (first match wins)
  const lookup = new Map<string, Record<Locale, string>>();
  for (const row of pathSegments) {
    const val = row[source];
    if (val && !lookup.has(val)) lookup.set(val, row);
  }

  const hasTrailingSlash = pathname.endsWith('/');
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return `/${target}/`;

  const out = parts.map((part, i) => {
    if (i === 0) return target; // replace locale prefix
    const row = lookup.get(part);
    return row ? (row[target] ?? part) : part;
  });

  const joined = '/' + out.join('/');
  return hasTrailingSlash ? joined + '/' : joined;
}
