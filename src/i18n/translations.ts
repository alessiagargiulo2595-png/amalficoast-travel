export type Locale = 'en-us' | 'de-de' | 'fr-fr' | 'es-es' | 'it-it';

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
    planning_title: string;
    planning_description: string;
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
      destinations_title: 'Towns of Amalfi Coast Destinations - Towns & Villages Guide',
      destinations_description: 'Explore every town of the Amalfi Coast: Positano, Amalfi, Ravello, Praiano, Cetara, Vietri sul Mare. Find the perfect base for your visit.',
      beaches_title: 'Best Beaches on the Amalfi Coast - Complete Guide',
      beaches_description: 'Discover the most beautiful beaches on the Amalfi Coast, from the pebble shores of Positano to hidden sea caves. Swimming, snorkeling, and beach clubs.',
      getting_here_title: 'How to Go to Amalfi - Get to the Amalfi Coast Transport Guide',
      getting_here_description: 'How to go to Amalfi - Everything you need to know about getting to the Amalfi Coast: from Naples, from Rome, by ferry, by car, and by bus. Practical travel tips.',
      itineraries_title: 'Amalfi Coast Itineraries - 1 Day, 3 Days, 1 Week',
      itineraries_description: 'The best Amalfi Coast itineraries for every trip length. One day, three days, or a full week - make the most of your visit to Italy\'s Costiera Amalfitana.',
      planning_title: 'Planning - Practical Travel Guides for the Amalfi Coast',
      planning_description: 'Practical guides to plan your trip: transport, buses, ferries, parking, best seasons and local tips. Everything you need to explore the Amalfi Coast.',
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
      planning_title: 'Planning - Practical Travel Guides for the Amalfi Coast',
      planning_description: 'Practical guides for your Amalfi Coast trip: how to get there, local transport, ferries, parking, best times to visit and insider tips.',
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
      planning_title: 'Planung - Praktische Reiseführer für die Amalfiküste',
      planning_description: 'Praktische Reiseführer: Anreise, öffentliche Verkehrsmittel, Fähren, Parkplätze, beste Jahreszeiten und Insider-Tipps für die Amalfiküste.',
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
      planning_title: 'Planification - Guides pratiques pour la Côte Amalfitaine',
      planning_description: 'Guides pratiques : comment vous y rendre, transports locaux, ferries, parking, meilleures saisons et conseils d\'experts.',
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
      planning_title: 'Planificación - Guías prácticas para la Costa Amalfitana',
      planning_description: 'Guías prácticas: cómo llegar, transporte local, ferries, estacionamiento, mejores épocas y consejos de expertos.',
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
      planning_title: 'Pianificazione - Guide pratiche per la Costiera Amalfitana',
      planning_description: 'Guide pratiche: come arrivare, trasporti locali, traghetti, parcheggi, migliori stagioni e consigli esperti.',
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

export function getDefaultLocale(): Locale {
  return 'en-us';
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations['en-us'];
}

export type SlugMap = Record<Locale, string>;

export const slugMap: Record<string, SlugMap> = {
  destinations: {
    'en-us': 'destinations',
    'en-gb': 'destinations',
    'de-de': 'reiseziele',
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
    'en-us': 'guide/getting-here',
    'en-gb': 'guide/getting-here',
    'de-de': 'ratgeber/anreise',
    'fr-fr': 'guide/comment-venir',
    'es-es': 'guia/como-llegar',
    'it-it': 'guida/come-arrivare',
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
    'en-us': 'guide/when-to-visit',
    'en-gb': 'guide/when-to-visit',
    'de-de': 'ratgeber/reisezeit',
    'fr-fr': 'guide/quand-visiter',
    'es-es': 'guia/cuando-visitar',
    'it-it': 'guida/quando-visitare',
  },
  planning: {
    'en-us': 'planning',
    'en-gb': 'planning',
    'de-de': 'planung',
    'fr-fr': 'planification',
    'es-es': 'planificacion',
    'it-it': 'pianificazione',
  },
  // Destination town pages (Amalfi Coast)
  amalfi: {
    'en-us': 'amalfi-coast/amalfi',
    'en-gb': 'amalfi-coast/amalfi',
    'de-de': 'amalfikueste/amalfi',
    'fr-fr': 'cote-amalfitaine/amalfi',
    'es-es': 'costa-amalfitana/amalfi',
    'it-it': 'costiera-amalfitana/amalfi',
  },
  positano: {
    'en-us': 'amalfi-coast/positano',
    'en-gb': 'amalfi-coast/positano',
    'de-de': 'amalfikueste/positano',
    'fr-fr': 'cote-amalfitaine/positano',
    'es-es': 'costa-amalfitana/positano',
    'it-it': 'costiera-amalfitana/positano',
  },
  ravello: {
    'en-us': 'amalfi-coast/ravello',
    'en-gb': 'amalfi-coast/ravello',
    'de-de': 'amalfikueste/ravello',
    'fr-fr': 'cote-amalfitaine/ravello',
    'es-es': 'costa-amalfitana/ravello',
    'it-it': 'costiera-amalfitana/ravello',
  },
  praiano: {
    'en-us': 'amalfi-coast/praiano',
    'en-gb': 'amalfi-coast/praiano',
    'de-de': 'amalfikueste/praiano',
    'fr-fr': 'cote-amalfitaine/praiano',
    'es-es': 'costa-amalfitana/praiano',
    'it-it': 'costiera-amalfitana/praiano',
  },
  maiori: {
    'en-us': 'amalfi-coast/maiori',
    'en-gb': 'amalfi-coast/maiori',
    'de-de': 'amalfikueste/maiori',
    'fr-fr': 'cote-amalfitaine/maiori',
    'es-es': 'costa-amalfitana/maiori',
    'it-it': 'costiera-amalfitana/maiori',
  },
  minori: {
    'en-us': 'amalfi-coast/minori',
    'en-gb': 'amalfi-coast/minori',
    'de-de': 'amalfikueste/minori',
    'fr-fr': 'cote-amalfitaine/minori',
    'es-es': 'costa-amalfitana/minori',
    'it-it': 'costiera-amalfitana/minori',
  },
  'vietri-sul-mare': {
    'en-us': 'amalfi-coast/vietri-sul-mare',
    'en-gb': 'amalfi-coast/vietri-sul-mare',
    'de-de': 'amalfikueste/vietri-sul-mare',
    'fr-fr': 'cote-amalfitaine/vietri-sul-mare',
    'es-es': 'costa-amalfitana/vietri-sul-mare',
    'it-it': 'costiera-amalfitana/vietri-sul-mare',
  },
  // Island pages
  capri: {
    'en-us': 'islands/capri',
    'en-gb': 'islands/capri',
    'de-de': 'inseln/capri',
    'fr-fr': 'iles/capri',
    'es-es': 'islas/capri',
    'it-it': 'isole/capri',
  },
  ischia: {
    'en-us': 'islands/ischia',
    'en-gb': 'islands/ischia',
    'de-de': 'inseln/ischia',
    'fr-fr': 'iles/ischia',
    'es-es': 'islas/ischia',
    'it-it': 'isole/ischia',
  },
  procida: {
    'en-us': 'islands/procida',
    'en-gb': 'islands/procida',
    'de-de': 'inseln/procida',
    'fr-fr': 'iles/procida',
    'es-es': 'islas/procida',
    'it-it': 'isole/procida',
  },
  // Peninsula town pages
  sorrento: {
    'en-us': 'sorrento-peninsula/sorrento',
    'en-gb': 'sorrento-peninsula/sorrento',
    'de-de': 'sorrentinische-halbinsel/sorrent',
    'fr-fr': 'peninsule-sorrentine/sorrente',
    'es-es': 'peninsula-sorrentina/sorrento',
    'it-it': 'penisola-sorrentina/sorrento',
  },
  'vico-equense': {
    'en-us': 'sorrento-peninsula/vico-equense',
    'en-gb': 'sorrento-peninsula/vico-equense',
    'de-de': 'sorrentinische-halbinsel/vico-equense',
    'fr-fr': 'peninsule-sorrentine/vico-equense',
    'es-es': 'peninsula-sorrentina/vico-equense',
    'it-it': 'penisola-sorrentina/vico-equense',
  },
  'massa-lubrense': {
    'en-us': 'sorrento-peninsula/massa-lubrense',
    'en-gb': 'sorrento-peninsula/massa-lubrense',
    'de-de': 'sorrentinische-halbinsel/massa-lubrense',
    'fr-fr': 'peninsule-sorrentine/massa-lubrense',
    'es-es': 'peninsula-sorrentina/massa-lubrense',
    'it-it': 'penisola-sorrentina/massa-lubrense',
  },
  'sant-agnello': {
    'en-us': 'sorrento-peninsula/sant-agnello',
    'en-gb': 'sorrento-peninsula/sant-agnello',
    'de-de': 'sorrentinische-halbinsel/sant-agnello',
    'fr-fr': 'peninsule-sorrentine/sant-agnello',
    'es-es': 'peninsula-sorrentina/sant-agnello',
    'it-it': 'penisola-sorrentina/sant-agnello',
  },
  // Region hub pages
  'amalfi-coast': {
    'en-us': 'amalfi-coast',
    'en-gb': 'amalfi-coast',
    'de-de': 'amalfikueste',
    'fr-fr': 'cote-amalfitaine',
    'es-es': 'costa-amalfitana',
    'it-it': 'costiera-amalfitana',
  },
  islands: {
    'en-us': 'islands',
    'en-gb': 'islands',
    'de-de': 'inseln',
    'fr-fr': 'iles',
    'es-es': 'islas',
    'it-it': 'isole',
  },
  'sorrento-peninsula': {
    'en-us': 'sorrento-peninsula',
    'en-gb': 'sorrento-peninsula',
    'de-de': 'sorrentinische-halbinsel',
    'fr-fr': 'peninsule-sorrentine',
    'es-es': 'peninsula-sorrentina',
    'it-it': 'penisola-sorrentina',
  },
  experiences: {
    'en-us': 'experiences',
    'en-gb': 'experiences',
    'de-de': 'erlebnisse',
    'fr-fr': 'experiences',
    'es-es': 'experiencias',
    'it-it': 'esperienze',
  },
  'boat-tours': {
    'en-us': 'experiences/boat-tours',
    'en-gb': 'experiences/boat-tours',
    'de-de': 'erlebnisse/bootstouren',
    'fr-fr': 'experiences/tours-en-bateau',
    'es-es': 'experiencias/tours-en-barco',
    'it-it': 'esperienze/tour-barca',
  },
  'cooking-class': {
    'en-us': 'experiences/cooking-class',
    'en-gb': 'experiences/cooking-class',
    'de-de': 'erlebnisse/kochkurs',
    'fr-fr': 'experiences/cours-de-cuisine',
    'es-es': 'experiencias/clase-cocina',
    'it-it': 'esperienze/cooking-class',
  },
  weddings: {
    'en-us': 'experiences/weddings',
    'en-gb': 'experiences/weddings',
    'de-de': 'erlebnisse/hochzeiten',
    'fr-fr': 'experiences/mariages',
    'es-es': 'experiencias/bodas',
    'it-it': 'esperienze/matrimoni',
  },
  'starred-restaurants': {
    'en-us': 'experiences/starred-restaurants',
    'en-gb': 'experiences/starred-restaurants',
    'de-de': 'erlebnisse/sterne-restaurants',
    'fr-fr': 'experiences/restaurants-etoiles',
    'es-es': 'experiencias/restaurantes-estrella',
    'it-it': 'esperienze/ristoranti-stellati',
  },
  'limoncello-tour': {
    'en-us': 'experiences/limoncello-tour',
    'en-gb': 'experiences/limoncello-tour',
    'de-de': 'erlebnisse/limoncello-tour',
    'fr-fr': 'experiences/tour-limoncello',
    'es-es': 'experiencias/tour-limoncello',
    'it-it': 'esperienze/limoncello-tour',
  },
  'mozzarella-experience': {
    'en-us': 'experiences/mozzarella-experience',
    'en-gb': 'experiences/mozzarella-experience',
    'de-de': 'erlebnisse/mozzarella-erlebnis',
    'fr-fr': 'experiences/experience-mozzarella',
    'es-es': 'experiencias/experiencia-mozzarella',
    'it-it': 'esperienze/mozzarella-experience',
  },
  trekking: {
    'en-us': 'experiences/trekking',
    'en-gb': 'experiences/trekking',
    'de-de': 'erlebnisse/trekking',
    'fr-fr': 'experiences/trekking',
    'es-es': 'experiencias/trekking',
    'it-it': 'esperienze/trekking',
  },
  // Event slugs (same in all languages, nested under region)
  'capodanno-bizantino': { 'en-us': 'events/amalfi-coast/capodanno-bizantino', 'de-de': 'veranstaltungen/amalfikueste/capodanno-bizantino', 'fr-fr': 'evenements/cote-amalfitaine/capodanno-bizantino', 'es-es': 'eventos/costa-amalfitana/capodanno-bizantino', 'it-it': 'eventi/costiera-amalfitana/capodanno-bizantino' },
  'festa-san-gennaro-praiano': { 'en-us': 'events/amalfi-coast/festa-san-gennaro-praiano', 'de-de': 'veranstaltungen/amalfikueste/festa-san-gennaro-praiano', 'fr-fr': 'evenements/cote-amalfitaine/festa-san-gennaro-praiano', 'es-es': 'eventos/costa-amalfitana/festa-san-gennaro-praiano', 'it-it': 'eventi/costiera-amalfitana/festa-san-gennaro-praiano' },
  'festa-sant-andrea-amalfi': { 'en-us': 'events/amalfi-coast/festa-sant-andrea-amalfi', 'de-de': 'veranstaltungen/amalfikueste/festa-sant-andrea-amalfi', 'fr-fr': 'evenements/cote-amalfitaine/festa-sant-andrea-amalfi', 'es-es': 'eventos/costa-amalfitana/festa-sant-andrea-amalfi', 'it-it': 'eventi/costiera-amalfitana/festa-sant-andrea-amalfi' },
  'festival-limone-minori': { 'en-us': 'events/amalfi-coast/festival-limone-minori', 'de-de': 'veranstaltungen/amalfikueste/festival-limone-minori', 'fr-fr': 'evenements/cote-amalfitaine/festival-limone-minori', 'es-es': 'eventos/costa-amalfitana/festival-limone-minori', 'it-it': 'eventi/costiera-amalfitana/festival-limone-minori' },
  'fuochi-ferragosto-positano-maiori': { 'en-us': 'events/amalfi-coast/fuochi-ferragosto-positano-maiori', 'de-de': 'veranstaltungen/amalfikueste/fuochi-ferragosto-positano-maiori', 'fr-fr': 'evenements/cote-amalfitaine/fuochi-ferragosto-positano-maiori', 'es-es': 'eventos/costa-amalfitana/fuochi-ferragosto-positano-maiori', 'it-it': 'eventi/costiera-amalfitana/fuochi-ferragosto-positano-maiori' },
  'luminaria-san-domenico-praiano': { 'en-us': 'events/amalfi-coast/luminaria-san-domenico-praiano', 'de-de': 'veranstaltungen/amalfikueste/luminaria-san-domenico-praiano', 'fr-fr': 'evenements/cote-amalfitaine/luminaria-san-domenico-praiano', 'es-es': 'eventos/costa-amalfitana/luminaria-san-domenico-praiano', 'it-it': 'eventi/costiera-amalfitana/luminaria-san-domenico-praiano' },
  'notte-blu-vietri': { 'en-us': 'events/amalfi-coast/notte-blu-vietri', 'de-de': 'veranstaltungen/amalfikueste/notte-blu-vietri', 'fr-fr': 'evenements/cote-amalfitaine/notte-blu-vietri', 'es-es': 'eventos/costa-amalfitana/notte-blu-vietri', 'it-it': 'eventi/costiera-amalfitana/notte-blu-vietri' },
  'positano-mare-sole-cultura': { 'en-us': 'events/amalfi-coast/positano-mare-sole-cultura', 'de-de': 'veranstaltungen/amalfikueste/positano-mare-sole-cultura', 'fr-fr': 'evenements/cote-amalfitaine/positano-mare-sole-cultura', 'es-es': 'eventos/costa-amalfitana/positano-mare-sole-cultura', 'it-it': 'eventi/costiera-amalfitana/positano-mare-sole-cultura' },
  'ravello-festival': { 'en-us': 'events/amalfi-coast/ravello-festival', 'de-de': 'veranstaltungen/amalfikueste/ravello-festival', 'fr-fr': 'evenements/cote-amalfitaine/ravello-festival', 'es-es': 'eventos/costa-amalfitana/ravello-festival', 'it-it': 'eventi/costiera-amalfitana/ravello-festival' },
  'regata-storica-amalfi': { 'en-us': 'events/amalfi-coast/regata-storica-amalfi', 'de-de': 'veranstaltungen/amalfikueste/regata-storica-amalfi', 'fr-fr': 'evenements/cote-amalfitaine/regata-storica-amalfi', 'es-es': 'eventos/costa-amalfitana/regata-storica-amalfi', 'it-it': 'eventi/costiera-amalfitana/regata-storica-amalfi' },
  'sagra-del-pesce-positano': { 'en-us': 'events/amalfi-coast/sagra-del-pesce-positano', 'de-de': 'veranstaltungen/amalfikueste/sagra-del-pesce-positano', 'fr-fr': 'evenements/cote-amalfitaine/sagra-del-pesce-positano', 'es-es': 'eventos/costa-amalfitana/sagra-del-pesce-positano', 'it-it': 'eventi/costiera-amalfitana/sagra-del-pesce-positano' },
  'anacapri-settembre-borgo': { 'en-us': 'events/islands/anacapri-settembre-borgo', 'de-de': 'veranstaltungen/inseln/anacapri-settembre-borgo', 'fr-fr': 'evenements/iles/anacapri-settembre-borgo', 'es-es': 'eventos/islas/anacapri-settembre-borgo', 'it-it': 'eventi/isole/anacapri-settembre-borgo' },
  'ischia-global-film-festival': { 'en-us': 'events/islands/ischia-global-film-festival', 'de-de': 'veranstaltungen/inseln/ischia-global-film-festival', 'fr-fr': 'evenements/iles/ischia-global-film-festival', 'es-es': 'eventos/islas/ischia-global-film-festival', 'it-it': 'eventi/isole/ischia-global-film-festival' },
  'sagra-del-mare-graziella-procida': { 'en-us': 'events/islands/sagra-del-mare-graziella-procida', 'de-de': 'veranstaltungen/inseln/sagra-del-mare-graziella-procida', 'fr-fr': 'evenements/iles/sagra-del-mare-graziella-procida', 'es-es': 'eventos/islas/sagra-del-mare-graziella-procida', 'it-it': 'eventi/isole/sagra-del-mare-graziella-procida' },
  'festa-sant-antonino': { 'en-us': 'events/sorrento-peninsula/festa-sant-antonino', 'de-de': 'veranstaltungen/sorrentinische-halbinsel/festa-sant-antonino', 'fr-fr': 'evenements/peninsule-sorrentine/festa-sant-antonino', 'es-es': 'eventos/peninsula-sorrentina/festa-sant-antonino', 'it-it': 'eventi/penisola-sorrentina/festa-sant-antonino' },
  'gustamincanto-vico-equense': { 'en-us': 'events/sorrento-peninsula/gustamincanto-vico-equense', 'de-de': 'veranstaltungen/sorrentinische-halbinsel/gustamincanto-vico-equense', 'fr-fr': 'evenements/peninsule-sorrentine/gustamincanto-vico-equense', 'es-es': 'eventos/peninsula-sorrentina/gustamincanto-vico-equense', 'it-it': 'eventi/penisola-sorrentina/gustamincanto-vico-equense' },
  'madonna-della-libera': { 'en-us': 'events/sorrento-peninsula/madonna-della-libera', 'de-de': 'veranstaltungen/sorrentinische-halbinsel/madonna-della-libera', 'fr-fr': 'evenements/peninsule-sorrentine/madonna-della-libera', 'es-es': 'eventos/peninsula-sorrentina/madonna-della-libera', 'it-it': 'eventi/penisola-sorrentina/madonna-della-libera' },
  'sagra-limone-massa-lubrense': { 'en-us': 'events/sorrento-peninsula/sagra-limone-massa-lubrense', 'de-de': 'veranstaltungen/sorrentinische-halbinsel/sagra-limone-massa-lubrense', 'fr-fr': 'evenements/peninsule-sorrentine/sagra-limone-massa-lubrense', 'es-es': 'eventos/peninsula-sorrentina/sagra-limone-massa-lubrense', 'it-it': 'eventi/penisola-sorrentina/sagra-limone-massa-lubrense' },
  'sagra-melanzana-preazzano': { 'en-us': 'events/sorrento-peninsula/sagra-melanzana-preazzano', 'de-de': 'veranstaltungen/sorrentinische-halbinsel/sagra-melanzana-preazzano', 'fr-fr': 'evenements/peninsule-sorrentine/sagra-melanzana-preazzano', 'es-es': 'eventos/peninsula-sorrentina/sagra-melanzana-preazzano', 'it-it': 'eventi/penisola-sorrentina/sagra-melanzana-preazzano' },
  'sorrento-meeting-cultura': { 'en-us': 'events/sorrento-peninsula/sorrento-meeting-cultura', 'de-de': 'veranstaltungen/sorrentinische-halbinsel/sorrento-meeting-cultura', 'fr-fr': 'evenements/peninsule-sorrentine/sorrento-meeting-cultura', 'es-es': 'eventos/peninsula-sorrentina/sorrento-meeting-cultura', 'it-it': 'eventi/penisola-sorrentina/sorrento-meeting-cultura' },
  // Beach slugs (same in all languages, nested under region)
  'fiordo-di-furore': { 'en-us': 'beaches/amalfi-coast/fiordo-di-furore', 'de-de': 'strande/amalfikueste/fiordo-di-furore', 'fr-fr': 'plages/cote-amalfitaine/fiordo-di-furore', 'es-es': 'playas/costa-amalfitana/fiordo-di-furore', 'it-it': 'spiagge/costiera-amalfitana/fiordo-di-furore' },
  'marina-di-praia': { 'en-us': 'beaches/amalfi-coast/marina-di-praia', 'de-de': 'strande/amalfikueste/marina-di-praia', 'fr-fr': 'plages/cote-amalfitaine/marina-di-praia', 'es-es': 'playas/costa-amalfitana/marina-di-praia', 'it-it': 'spiagge/costiera-amalfitana/marina-di-praia' },
  'santa-croce-amalfi': { 'en-us': 'beaches/amalfi-coast/santa-croce-amalfi', 'de-de': 'strande/amalfikueste/santa-croce-amalfi', 'fr-fr': 'plages/cote-amalfitaine/santa-croce-amalfi', 'es-es': 'playas/costa-amalfitana/santa-croce-amalfi', 'it-it': 'spiagge/costiera-amalfitana/santa-croce-amalfi' },
  'spiaggia-grande-positano': { 'en-us': 'beaches/amalfi-coast/spiaggia-grande-positano', 'de-de': 'strande/amalfikueste/spiaggia-grande-positano', 'fr-fr': 'plages/cote-amalfitaine/spiaggia-grande-positano', 'es-es': 'playas/costa-amalfitana/spiaggia-grande-positano', 'it-it': 'spiagge/costiera-amalfitana/spiaggia-grande-positano' },
  'cala-del-pozzo-vecchio': { 'en-us': 'beaches/islands/cala-del-pozzo-vecchio', 'de-de': 'strande/inseln/cala-del-pozzo-vecchio', 'fr-fr': 'plages/iles/cala-del-pozzo-vecchio', 'es-es': 'playas/islas/cala-del-pozzo-vecchio', 'it-it': 'spiagge/isole/cala-del-pozzo-vecchio' },
  'faraglioni-capri': { 'en-us': 'beaches/islands/faraglioni-capri', 'de-de': 'strande/inseln/faraglioni-capri', 'fr-fr': 'plages/iles/faraglioni-capri', 'es-es': 'playas/islas/faraglioni-capri', 'it-it': 'spiagge/isole/faraglioni-capri' },
  'marina-piccola-capri': { 'en-us': 'beaches/islands/marina-piccola-capri', 'de-de': 'strande/inseln/marina-piccola-capri', 'fr-fr': 'plages/iles/marina-piccola-capri', 'es-es': 'playas/islas/marina-piccola-capri', 'it-it': 'spiagge/isole/marina-piccola-capri' },
  'spiaggia-maronti': { 'en-us': 'beaches/islands/spiaggia-maronti', 'de-de': 'strande/inseln/spiaggia-maronti', 'fr-fr': 'plages/iles/spiaggia-maronti', 'es-es': 'playas/islas/spiaggia-maronti', 'it-it': 'spiagge/isole/spiaggia-maronti' },
  'cala-mitigliano': { 'en-us': 'beaches/sorrentine-peninsula/cala-mitigliano', 'de-de': 'strande/sorrentinische-halbinsel/cala-mitigliano', 'fr-fr': 'plages/peninsule-sorrentine/cala-mitigliano', 'es-es': 'playas/peninsula-sorrentina/cala-mitigliano', 'it-it': 'spiagge/penisola-sorrentina/cala-mitigliano' },
  'marina-del-cantone': { 'en-us': 'beaches/sorrentine-peninsula/marina-del-cantone', 'de-de': 'strande/sorrentinische-halbinsel/marina-del-cantone', 'fr-fr': 'plages/peninsule-sorrentine/marina-del-cantone', 'es-es': 'playas/peninsula-sorrentina/marina-del-cantone', 'it-it': 'spiagge/penisola-sorrentina/marina-del-cantone' },
  'regina-giovanna': { 'en-us': 'beaches/sorrentine-peninsula/regina-giovanna', 'de-de': 'strande/sorrentinische-halbinsel/regina-giovanna', 'fr-fr': 'plages/peninsule-sorrentine/regina-giovanna', 'es-es': 'playas/peninsula-sorrentina/regina-giovanna', 'it-it': 'spiagge/penisola-sorrentina/regina-giovanna' },
  'spiaggia-di-ieranto': { 'en-us': 'beaches/sorrentine-peninsula/spiaggia-di-ieranto', 'de-de': 'strande/sorrentinische-halbinsel/spiaggia-di-ieranto', 'fr-fr': 'plages/peninsule-sorrentine/spiaggia-di-ieranto', 'es-es': 'playas/peninsula-sorrentina/spiaggia-di-ieranto', 'it-it': 'spiagge/penisola-sorrentina/spiaggia-di-ieranto' },
  // Itinerary slugs (same in all languages, nested under duration)
  'amalfi-coast-from-naples': { 'en-us': 'itineraries/1-day/amalfi-coast-from-naples', 'de-de': 'reiserouten/1-tag/amalfikueste-von-neapel', 'fr-fr': 'itineraires/1-jour/cote-amalfitaine-depuis-naples', 'es-es': 'itinerarios/1-dia/costa-amalfitana-desde-napoles', 'it-it': 'itinerari/1-giorno/costiera-amalfitana-da-napoli' },
  'amalfi-coast-from-salerno': { 'en-us': 'itineraries/1-day/amalfi-coast-from-salerno', 'de-de': 'reiserouten/1-tag/amalfikueste-von-salerno', 'fr-fr': 'itineraires/1-jour/cote-amalfitaine-depuis-salerne', 'es-es': 'itinerarios/1-dia/costa-amalfitana-desde-salerno', 'it-it': 'itinerari/1-giorno/costiera-amalfitana-da-salerno' },
  'capri-from-sorrento': { 'en-us': 'itineraries/1-day/capri-from-sorrento', 'de-de': 'reiserouten/1-tag/capri-von-sorrent', 'fr-fr': 'itineraires/1-jour/capri-depuis-sorrente', 'es-es': 'itinerarios/1-dia/capri-desde-sorrento', 'it-it': 'itinerari/1-giorno/capri-da-sorrento' },
  'path-of-the-gods-trek': { 'en-us': 'itineraries/1-day/path-of-the-gods-trek', 'de-de': 'reiserouten/1-tag/weg-der-goetter-trekking', 'fr-fr': 'itineraires/1-jour/sentier-des-dieux-trek', 'es-es': 'itinerarios/1-dia/sendero-de-los-dioses-trek', 'it-it': 'itinerari/1-giorno/trekking-sentiero-degli-dei' },
  'sorrentine-peninsula-from-naples': { 'en-us': 'itineraries/1-day/sorrentine-peninsula-from-naples', 'de-de': 'reiserouten/1-tag/sorrentinische-halbinsel-von-neapel', 'fr-fr': 'itineraires/1-jour/peninsule-sorrentine-depuis-naples', 'es-es': 'itinerarios/1-dia/peninsula-sorrentina-desde-napoles', 'it-it': 'itinerari/1-giorno/penisola-sorrentina-da-napoli' },
  'classic-amalfi-coast': { 'en-us': 'itineraries/3-days/classic-amalfi-coast', 'de-de': 'reiserouten/3-tage/klassische-amalfikueste', 'fr-fr': 'itineraires/3-jours/cote-amalfitaine-classique', 'es-es': 'itinerarios/3-dias/costa-amalfitana-clasica', 'it-it': 'itinerari/3-giorni/classico-costiera-amalfitana' },
  'islands-ischia-procida': { 'en-us': 'itineraries/3-days/islands-ischia-procida', 'de-de': 'reiserouten/3-tage/inseln-ischia-procida', 'fr-fr': 'itineraires/3-jours/iles-ischia-procida', 'es-es': 'itinerarios/3-dias/islas-ischia-procida', 'it-it': 'itinerari/3-giorni/isole-ischia-procida' },
  'sorrento-pompeii-history': { 'en-us': 'itineraries/3-days/sorrento-pompeii-history', 'de-de': 'reiserouten/3-tage/sorrent-pompeji-geschichte', 'fr-fr': 'itineraires/3-jours/sorrente-pompei-histoire', 'es-es': 'itinerarios/3-dias/sorrento-pompeya-historia', 'it-it': 'itinerari/3-giorni/sorrento-pompei-storia' },
  'grand-tour-coast-peninsula': { 'en-us': 'itineraries/7-days/grand-tour-coast-peninsula', 'de-de': 'reiserouten/7-tage/grand-tour-kueste-halbinsel', 'fr-fr': 'itineraires/7-jours/grand-tour-cote-peninsule', 'es-es': 'itinerarios/7-dias/gran-tour-costa-peninsula', 'it-it': 'itinerari/7-giorni/grand-tour-costiera-penisola' },
  'slow-travel-villages-food': { 'en-us': 'itineraries/7-days/slow-travel-villages-food', 'de-de': 'reiserouten/7-tage/slow-travel-doerfer-kulinarik', 'fr-fr': 'itineraires/7-jours/slow-travel-villages-gastronomie', 'es-es': 'itinerarios/7-dias/slow-travel-pueblos-gastronomia', 'it-it': 'itinerari/7-giorni/slow-travel-borghi-cibo' },
  // Guide sub-pages
  ferries: { 'en-us': 'guide/ferries', 'de-de': 'ratgeber/faehren', 'fr-fr': 'guide/ferries', 'es-es': 'guia/ferries', 'it-it': 'guida/traghetti' },
  'sita-bus': { 'en-us': 'guide/sita-bus', 'de-de': 'ratgeber/sita-bus', 'fr-fr': 'guide/bus-sita', 'es-es': 'guia/bus-sita', 'it-it': 'guida/bus-sita' },
  'parking-ztl': { 'en-us': 'guide/parking-ztl', 'de-de': 'ratgeber/parken-ztl', 'fr-fr': 'guide/parking-ztl', 'es-es': 'guia/aparcamiento-ztl', 'it-it': 'guida/parcheggi-ztl' },
  // Event hub pages (with language-specific paths)
  events: { 'en-us': 'events', 'de-de': 'veranstaltungen', 'fr-fr': 'evenements', 'es-es': 'eventos', 'it-it': 'eventi' },
  // Marina-di-praia destination page (NOT beach page - different from marina-di-praia-beach)
  'marina-di-praia-dest': { 'en-us': 'amalfi-coast/marina-di-praia', 'de-de': 'amalfikueste/marina-di-praia', 'fr-fr': 'cote-amalfitaine/marina-di-praia', 'es-es': 'costa-amalfitana/marina-di-praia', 'it-it': 'costiera-amalfitana/marina-di-praia' },
  // NOTE: Marina-di-praia beach page does NOT exist in sitemap (not built)
  // It would be: 'en-us': 'beaches/amalfi-coast/marina-di-praia', but this isn't created
  // Blog pages (same slug in most languages)
  'amalfi-coast-wines': { 'en-us': 'blog/amalfi-coast-wines', 'de-de': 'blog/amalfi-weine', 'fr-fr': 'blog/vins-cote-amalfi', 'es-es': 'blog/vinos-costa-amalfi', 'it-it': 'blog/vini-costa-amalfi' },
  'cetara-anchovies': { 'en-us': 'blog/cetara-anchovies', 'de-de': 'blog/cetara-sardellen', 'fr-fr': 'blog/anchois-cetara', 'es-es': 'blog/anchoas-cetara', 'it-it': 'blog/alici-di-cetara' },
  'comfortable-beaches': { 'en-us': 'blog/comfortable-beaches', 'de-de': 'blog/komfortable-ausgestattete-strande', 'fr-fr': 'blog/plages-confortables-equipees', 'es-es': 'blog/playas-comodas-equipadas', 'it-it': 'blog/spiagge-comode-attrezzate' },
  'emerald-grotto': { 'en-us': 'blog/emerald-grotto', 'de-de': 'blog/smaragd-grotte', 'fr-fr': 'blog/grotte-emeraude', 'es-es': 'blog/gruta-esmeralda', 'it-it': 'blog/grotta-dello-smeraldo' },
  'ferriere-valley': { 'en-us': 'blog/ferriere-valley', 'de-de': 'blog/ferriere-tal', 'fr-fr': 'blog/vallee-des-ferriere', 'es-es': 'blog/valle-ferriere', 'it-it': 'blog/valle-delle-ferriere' },
  'lemon-delight': { 'en-us': 'blog/lemon-delight', 'de-de': 'blog/zitronen-koestlichkeit', 'fr-fr': 'blog/delice-citron', 'es-es': 'blog/delizia-limon', 'it-it': 'blog/delizia-al-limone' },
  'sunset-beaches': { 'en-us': 'blog/sunset-beaches', 'de-de': 'blog/sonnenuntergang-strande', 'fr-fr': 'blog/coucher-soleil-plages', 'es-es': 'blog/puesta-de-sol-playas', 'it-it': 'blog/tramonto-spiaggia-costiera' },
  'wild-remote-beaches': { 'en-us': 'blog/wild-remote-beaches', 'de-de': 'blog/wilde-abgelegene-strande', 'fr-fr': 'blog/oasis-sauvages-plages', 'es-es': 'blog/oasis-salvajes-playas', 'it-it': 'blog/oasi-selvagge-spiagge-mare' },
  'atrani': { 'en-us': 'blog/atrani', 'de-de': 'blog/atrani', 'fr-fr': 'blog/atrani', 'es-es': 'blog/atrani', 'it-it': 'blog/atrani' },
  'sorrento-vs-praiano': { 'en-us': 'blog/sorrento-vs-praiano', 'de-de': 'blog/sorrento-vs-praiano', 'fr-fr': 'blog/sorrento-vs-praiano', 'es-es': 'blog/sorrento-vs-praiano', 'it-it': 'blog/sorrento-vs-praiano' },
  // Experience hub pages
  'boat-tours-hub': { 'en-us': 'experiences/boat-tours', 'de-de': 'erlebnisse/bootstouren', 'fr-fr': 'experiences/tours-en-bateau', 'es-es': 'experiencias/tours-en-barco', 'it-it': 'esperienze/tour-barca' },
  'cooking-class-hub': { 'en-us': 'experiences/cooking-class', 'de-de': 'erlebnisse/kochkurs', 'fr-fr': 'experiences/cours-de-cuisine', 'es-es': 'experiencias/clase-cocina', 'it-it': 'esperienze/cooking-class' },
  'weddings-hub': { 'en-us': 'experiences/weddings', 'de-de': 'erlebnisse/hochzeiten', 'fr-fr': 'experiences/mariages', 'es-es': 'experiencias/bodas', 'it-it': 'esperienze/matrimoni' },
  'starred-restaurants-hub': { 'en-us': 'experiences/starred-restaurants', 'de-de': 'erlebnisse/sterne-restaurants', 'fr-fr': 'experiences/restaurants-etoiles', 'es-es': 'experiencias/restaurantes-estrella', 'it-it': 'esperienze/ristoranti-stellati' },
  'limoncello-tour-hub': { 'en-us': 'experiences/limoncello-tour', 'de-de': 'erlebnisse/limoncello-tour', 'fr-fr': 'experiences/tour-limoncello', 'es-es': 'experiencias/tour-limoncello', 'it-it': 'esperienze/limoncello-tour' },
  'mozzarella-experience-hub': { 'en-us': 'experiences/mozzarella-experience', 'de-de': 'erlebnisse/mozzarella-erlebnis', 'fr-fr': 'experiences/experience-mozzarella', 'es-es': 'experiencias/experiencia-mozzarella', 'it-it': 'esperienze/mozzarella-experience' },
  'trekking-hub': { 'en-us': 'experiences/trekking', 'de-de': 'erlebnisse/trekking', 'fr-fr': 'experiences/trekking', 'es-es': 'experiencias/trekking', 'it-it': 'esperienze/trekking' },
  // Blog articles - recent discoveries
  'baia-recommone': { 'en-us': 'blog/baia-recommone', 'de-de': 'blog/baia-recommone', 'fr-fr': 'blog/baia-recommone', 'es-es': 'blog/baia-recommone', 'it-it': 'blog/baia-recommone' },
  'punta-campanella': { 'en-us': 'blog/punta-campanella', 'de-de': 'blog/punta-campanella', 'fr-fr': 'blog/punta-campanella', 'es-es': 'blog/punta-campanella', 'it-it': 'blog/punta-campanella' },
  'fiordo-di-crapolla': { 'en-us': 'blog/fiordo-di-crapolla', 'de-de': 'blog/fiordo-di-crapolla', 'fr-fr': 'blog/fiordo-di-crapolla', 'es-es': 'blog/fiordo-di-crapolla', 'it-it': 'blog/fiordo-di-crapolla' },
  // NOTE: Sorrento peninsula events only exist in non-English locales (de-de, fr-fr, es-es, it-it)
  // They are handled by pattern-matching in the hreflang generation script

  // NOTE: Some Italian Sorrento beach pages have unique URL structures
  // /penisola-sorrentina/massa-lubrense/spiaggia-di-ieranto/ (town nesting)
  // /spiagge/penisola-sorrentina/ieranto/ (beach page variant)
  // These are handled by pattern-matching in the hreflang generation script
};

export function getLocalePath(locale: Locale, pageKey: string): string {
  const prefix = `/${locale}`;
  if (pageKey === 'home') return `${prefix}/`;
  const slug = slugMap[pageKey]?.[locale] ?? pageKey;
  return `${prefix}/${slug}/`;
}

// Path-segment translation table for automatic hreflang computation on deep pages
// Updated 2026-04-30: Added experience hub and experience slug translations
export const pathSegments: Array<Record<Locale, string>> = [
  // Coast hub + sub-paths (beaches/events/…)
  { 'en-us': 'amalfi-coast',         'en-gb': 'amalfi-coast',         'de-de': 'amalfikueste',       'fr-fr': 'cote-amalfitaine',     'es-es': 'costa-amalfitana',     'it-it': 'costiera-amalfitana'  },
  // Islands hub
  { 'en-us': 'islands',              'en-gb': 'islands',              'de-de': 'inseln',              'fr-fr': 'iles',                 'es-es': 'islas',                'it-it': 'isole'                },
  // Beaches hub
  { 'en-us': 'beaches',              'en-gb': 'beaches',              'de-de': 'strande',             'fr-fr': 'plages',               'es-es': 'playas',               'it-it': 'spiagge'              },
  // Guide hub
  { 'en-us': 'guide',                'en-gb': 'guide',                'de-de': 'ratgeber',            'fr-fr': 'guide',                'es-es': 'guia',                 'it-it': 'guida'                },
  // Events hub
  { 'en-us': 'events',               'en-gb': 'events',               'de-de': 'veranstaltungen',     'fr-fr': 'evenements',           'es-es': 'eventos',              'it-it': 'eventi'               },
  // Experiences hub (updated with correct translations)
  { 'en-us': 'experiences',          'en-gb': 'experiences',          'de-de': 'erlebnisse',          'fr-fr': 'experiences',          'es-es': 'experiencias',         'it-it': 'esperienze'           },
  // Experience detail slugs
  { 'en-us': 'boat-tours',                       'en-gb': 'boat-tours',                       'de-de': 'bootstouren',                        'fr-fr': 'tours-en-bateau',                   'es-es': 'tours-en-barco',                    'it-it': 'tour-barca'                        },
  { 'en-us': 'cooking-class',                    'en-gb': 'cooking-class',                    'de-de': 'kochkurs',                           'fr-fr': 'cours-de-cuisine',                  'es-es': 'clase-cocina',                      'it-it': 'cooking-class'                     },
  { 'en-us': 'weddings',                         'en-gb': 'weddings',                         'de-de': 'hochzeiten',                         'fr-fr': 'mariages',                          'es-es': 'bodas',                             'it-it': 'matrimoni'                         },
  { 'en-us': 'starred-restaurants',              'en-gb': 'starred-restaurants',              'de-de': 'sterne-restaurants',                  'fr-fr': 'restaurants-etoiles',               'es-es': 'restaurantes-estrella',             'it-it': 'ristoranti-stellati'               },
  { 'en-us': 'limoncello-tour',                  'en-gb': 'limoncello-tour',                  'de-de': 'limoncello-tour',                    'fr-fr': 'tour-limoncello',                   'es-es': 'tour-limoncello',                   'it-it': 'limoncello-tour'                   },
  { 'en-us': 'mozzarella-experience',            'en-gb': 'mozzarella-experience',            'de-de': 'mozzarella-erlebnis',                 'fr-fr': 'experience-mozzarella',             'es-es': 'experiencia-mozzarella',            'it-it': 'mozzarella-experience'             },
  { 'en-us': 'trekking',                         'en-gb': 'trekking',                         'de-de': 'trekking',                           'fr-fr': 'trekking',                          'es-es': 'trekking',                          'it-it': 'trekking'                          },
  // Itineraries hub
  { 'en-us': 'itineraries',          'en-gb': 'itineraries',          'de-de': 'reiserouten',         'fr-fr': 'itineraires',          'es-es': 'itinerarios',          'it-it': 'itinerari'            },
  // Getting here
  { 'en-us': 'getting-here',         'en-gb': 'getting-here',         'de-de': 'anreise',             'fr-fr': 'comment-venir',        'es-es': 'como-llegar',          'it-it': 'come-arrivare'        },
  // When to visit
  { 'en-us': 'when-to-visit',        'en-gb': 'when-to-visit',        'de-de': 'reisezeit',           'fr-fr': 'quand-visiter',        'es-es': 'cuando-visitar',       'it-it': 'quando-visitare'      },
  // Destinations page
  { 'en-us': 'destinations',         'en-gb': 'destinations',         'de-de': 'reiseziele',          'fr-fr': 'destinations',         'es-es': 'destinos',             'it-it': 'destinazioni'         },
  // Guide sub-pages
  { 'en-us': 'ferries',              'en-gb': 'ferries',              'de-de': 'faehren',             'fr-fr': 'ferries',              'es-es': 'ferries',              'it-it': 'traghetti'            },
  { 'en-us': 'sita-bus',             'en-gb': 'sita-bus',             'de-de': 'sita-bus',            'fr-fr': 'bus-sita',             'es-es': 'bus-sita',             'it-it': 'bus-sita'             },
  { 'en-us': 'parking-ztl',          'en-gb': 'parking-ztl',          'de-de': 'parken-ztl',          'fr-fr': 'parking-ztl',          'es-es': 'aparcamiento-ztl',     'it-it': 'parcheggi-ztl'        },
  // Itinerary duration folders
  { 'en-us': '1-day',                'en-gb': '1-day',                'de-de': '1-tag',               'fr-fr': '1-jour',               'es-es': '1-dia',                'it-it': '1-giorno'             },
  { 'en-us': '3-days',               'en-gb': '3-days',               'de-de': '3-tage',              'fr-fr': '3-jours',              'es-es': '3-dias',               'it-it': '3-giorni'             },
  { 'en-us': '7-days',               'en-gb': '7-days',               'de-de': '7-tage',              'fr-fr': '7-jours',              'es-es': '7-dias',               'it-it': '7-giorni'             },
  // Beach region names (must come before Events sub-area slugs to match correctly in lookup)
  { 'en-us': 'sorrento-peninsula',    'en-gb': 'sorrento-peninsula',   'de-de': 'sorrentinische-halbinsel', 'fr-fr': 'peninsule-sorrentine',  'es-es': 'peninsula-sorrentina',  'it-it': 'penisola-sorrentina'  },
  // Events sub-area slugs (amalfi-coast already defined above)
  { 'en-us': 'islands',              'en-gb': 'islands',              'de-de': 'inseln',              'fr-fr': 'iles',                 'es-es': 'islas',                'it-it': 'isole'                },
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
  // Blog post slugs
  { 'en-us': 'amalfi-coast-wines',                'en-gb': 'amalfi-coast-wines',                'de-de': 'amalfi-weine',                       'fr-fr': 'vins-cote-amalfi',                  'es-es': 'vinos-costa-amalfi',                'it-it': 'vini-costa-amalfi'                 },
  { 'en-us': 'cetara-anchovies',                  'en-gb': 'cetara-anchovies',                  'de-de': 'cetara-sardellen',                   'fr-fr': 'anchois-cetara',                    'es-es': 'anchoas-cetara',                    'it-it': 'alici-di-cetara'                   },
  { 'en-us': 'comfortable-beaches',               'en-gb': 'comfortable-beaches',               'de-de': 'komfortable-ausgestattete-strande',  'fr-fr': 'plages-confortables-equipees',      'es-es': 'playas-comodas-equipadas',          'it-it': 'spiagge-comode-attrezzate'         },
  { 'en-us': 'emerald-grotto',                    'en-gb': 'emerald-grotto',                    'de-de': 'smaragd-grotte',                     'fr-fr': 'grotte-emeraude',                   'es-es': 'gruta-esmeralda',                   'it-it': 'grotta-dello-smeraldo'             },
  { 'en-us': 'ferriere-valley',                   'en-gb': 'ferriere-valley',                   'de-de': 'ferriere-tal',                       'fr-fr': 'vallee-des-ferriere',               'es-es': 'valle-ferriere',                    'it-it': 'valle-delle-ferriere'              },
  { 'en-us': 'sunset-beaches',                    'en-gb': 'sunset-beaches',                    'de-de': 'sonnenuntergang-strande',             'fr-fr': 'coucher-soleil-plages',             'es-es': 'puesta-de-sol-playas',              'it-it': 'tramonto-spiaggia-costiera'        },
  { 'en-us': 'wild-remote-beaches',               'en-gb': 'wild-remote-beaches',               'de-de': 'wilde-abgelegene-strande',            'fr-fr': 'oasis-sauvages-plages',             'es-es': 'oasis-salvajes-playas',             'it-it': 'oasi-selvagge-spiagge-mare'        },
  { 'en-us': 'lemon-delight',                     'en-gb': 'lemon-delight',                     'de-de': 'zitronen-koestlichkeit',              'fr-fr': 'delice-citron',                     'es-es': 'delizia-limon',                     'it-it': 'delizia-al-limone'                 },
  { 'en-us': 'atrani',                            'en-gb': 'atrani',                            'de-de': 'atrani',                             'fr-fr': 'atrani',                            'es-es': 'atrani',                            'it-it': 'atrani'                            },
  { 'en-us': 'sorrento-vs-praiano',                'en-gb': 'sorrento-vs-praiano',                'de-de': 'sorrento-vs-praiano',                 'fr-fr': 'sorrento-vs-praiano',               'es-es': 'sorrento-vs-praiano',               'it-it': 'sorrento-vs-praiano'               },
  // Destination town slugs (same in all languages)
  { 'en-us': 'positano',                          'en-gb': 'positano',                          'de-de': 'positano',                           'fr-fr': 'positano',                          'es-es': 'positano',                          'it-it': 'positano'                          },
  { 'en-us': 'amalfi',                            'en-gb': 'amalfi',                            'de-de': 'amalfi',                             'fr-fr': 'amalfi',                            'es-es': 'amalfi',                            'it-it': 'amalfi'                            },
  { 'en-us': 'ravello',                           'en-gb': 'ravello',                           'de-de': 'ravello',                            'fr-fr': 'ravello',                           'es-es': 'ravello',                           'it-it': 'ravello'                           },
  { 'en-us': 'praiano',                           'en-gb': 'praiano',                           'de-de': 'praiano',                            'fr-fr': 'praiano',                           'es-es': 'praiano',                           'it-it': 'praiano'                           },
  { 'en-us': 'marina-di-praia',                   'en-gb': 'marina-di-praia',                   'de-de': 'marina-di-praia',                    'fr-fr': 'marina-di-praia',                   'es-es': 'marina-di-praia',                   'it-it': 'marina-di-praia'                   },
  { 'en-us': 'maiori',                            'en-gb': 'maiori',                            'de-de': 'maiori',                             'fr-fr': 'maiori',                            'es-es': 'maiori',                            'it-it': 'maiori'                            },
  { 'en-us': 'minori',                            'en-gb': 'minori',                            'de-de': 'minori',                             'fr-fr': 'minori',                            'es-es': 'minori',                            'it-it': 'minori'                            },
  { 'en-us': 'vietri-sul-mare',                   'en-gb': 'vietri-sul-mare',                   'de-de': 'vietri-sul-mare',                    'fr-fr': 'vietri-sul-mare',                   'es-es': 'vietri-sul-mare',                   'it-it': 'vietri-sul-mare'                   },
  // Peninsula town names (names that differ by language)
  { 'en-us': 'sorrento',                          'en-gb': 'sorrento',                          'de-de': 'sorrent',                            'fr-fr': 'sorrente',                          'es-es': 'sorrento',                          'it-it': 'sorrento'                          },
  { 'en-us': 'vico-equense',                       'en-gb': 'vico-equense',                      'de-de': 'vico-equense',                       'fr-fr': 'vico-equense',                      'es-es': 'vico-equense',                      'it-it': 'vico-equense'                      },
  { 'en-us': 'massa-lubrense',                     'en-gb': 'massa-lubrense',                    'de-de': 'massa-lubrense',                     'fr-fr': 'massa-lubrense',                    'es-es': 'massa-lubrense',                    'it-it': 'massa-lubrense'                    },
  { 'en-us': 'sant-agnello',                       'en-gb': 'sant-agnello',                      'de-de': 'sant-agnello',                       'fr-fr': 'sant-agnello',                      'es-es': 'sant-agnello',                      'it-it': 'sant-agnello'                      },
  // Event detail slugs (same in all languages)
  { 'en-us': 'capodanno-bizantino',               'en-gb': 'capodanno-bizantino',               'de-de': 'capodanno-bizantino',                'fr-fr': 'capodanno-bizantino',               'es-es': 'capodanno-bizantino',               'it-it': 'capodanno-bizantino'              },
  { 'en-us': 'festa-san-gennaro-praiano',         'en-gb': 'festa-san-gennaro-praiano',         'de-de': 'festa-san-gennaro-praiano',          'fr-fr': 'festa-san-gennaro-praiano',         'es-es': 'festa-san-gennaro-praiano',         'it-it': 'festa-san-gennaro-praiano'        },
  { 'en-us': 'festa-sant-andrea-amalfi',          'en-gb': 'festa-sant-andrea-amalfi',          'de-de': 'festa-sant-andrea-amalfi',           'fr-fr': 'festa-sant-andrea-amalfi',          'es-es': 'festa-sant-andrea-amalfi',          'it-it': 'festa-sant-andrea-amalfi'         },
  { 'en-us': 'festival-limone-minori',            'en-gb': 'festival-limone-minori',            'de-de': 'festival-limone-minori',             'fr-fr': 'festival-limone-minori',            'es-es': 'festival-limone-minori',            'it-it': 'festival-limone-minori'           },
  { 'en-us': 'fuochi-ferragosto-positano-maiori', 'de-de': 'fuochi-ferragosto-positano-maiori',  'fr-fr': 'fuochi-ferragosto-positano-maiori', 'es-es': 'fuochi-ferragosto-positano-maiori', 'it-it': 'fuochi-ferragosto-positano-maiori' },
  { 'en-us': 'luminaria-san-domenico-praiano',    'en-gb': 'luminaria-san-domenico-praiano',    'de-de': 'luminaria-san-domenico-praiano',     'fr-fr': 'luminaria-san-domenico-praiano',    'es-es': 'luminaria-san-domenico-praiano',    'it-it': 'luminaria-san-domenico-praiano'   },
  { 'en-us': 'notte-blu-vietri',                  'en-gb': 'notte-blu-vietri',                  'de-de': 'notte-blu-vietri',                   'fr-fr': 'notte-blu-vietri',                  'es-es': 'notte-blu-vietri',                  'it-it': 'notte-blu-vietri'                 },
  { 'en-us': 'positano-mare-sole-cultura',        'en-gb': 'positano-mare-sole-cultura',        'de-de': 'positano-mare-sole-cultura',         'fr-fr': 'positano-mare-sole-cultura',        'es-es': 'positano-mare-sole-cultura',        'it-it': 'positano-mare-sole-cultura'       },
  { 'en-us': 'ravello-festival',                  'en-gb': 'ravello-festival',                  'de-de': 'ravello-festival',                   'fr-fr': 'ravello-festival',                  'es-es': 'ravello-festival',                  'it-it': 'ravello-festival'                 },
  { 'en-us': 'regata-storica-amalfi',             'en-gb': 'regata-storica-amalfi',             'de-de': 'regata-storica-amalfi',              'fr-fr': 'regata-storica-amalfi',             'es-es': 'regata-storica-amalfi',             'it-it': 'regata-storica-amalfi'            },
  { 'en-us': 'sagra-del-pesce-positano',          'en-gb': 'sagra-del-pesce-positano',          'de-de': 'sagra-del-pesce-positano',           'fr-fr': 'sagra-del-pesce-positano',          'es-es': 'sagra-del-pesce-positano',          'it-it': 'sagra-del-pesce-positano'         },
  { 'en-us': 'anacapri-settembre-borgo',          'en-gb': 'anacapri-settembre-borgo',          'de-de': 'anacapri-settembre-borgo',           'fr-fr': 'anacapri-settembre-borgo',          'es-es': 'anacapri-settembre-borgo',          'it-it': 'anacapri-settembre-borgo'         },
  { 'en-us': 'ischia-global-film-festival',       'en-gb': 'ischia-global-film-festival',       'de-de': 'ischia-global-film-festival',        'fr-fr': 'ischia-global-film-festival',       'es-es': 'ischia-global-film-festival',       'it-it': 'ischia-global-film-festival'      },
  { 'en-us': 'sagra-del-mare-graziella-procida',  'en-gb': 'sagra-del-mare-graziella-procida',  'de-de': 'sagra-del-mare-graziella-procida',   'fr-fr': 'sagra-del-mare-graziella-procida',  'es-es': 'sagra-del-mare-graziella-procida',  'it-it': 'sagra-del-mare-graziella-procida' },
  { 'en-us': 'festa-sant-antonino',               'en-gb': 'festa-sant-antonino',               'de-de': 'festa-sant-antonino',                'fr-fr': 'festa-sant-antonino',               'es-es': 'festa-sant-antonino',               'it-it': 'festa-sant-antonino'              },
  { 'en-us': 'gustamincanto-vico-equense',        'en-gb': 'gustamincanto-vico-equense',        'de-de': 'gustamincanto-vico-equense',         'fr-fr': 'gustamincanto-vico-equense',        'es-es': 'gustamincanto-vico-equense',        'it-it': 'gustamincanto-vico-equense'       },
  { 'en-us': 'madonna-della-libera',              'en-gb': 'madonna-della-libera',              'de-de': 'madonna-della-libera',               'fr-fr': 'madonna-della-libera',              'es-es': 'madonna-della-libera',              'it-it': 'madonna-della-libera'             },
  { 'en-us': 'sagra-limone-massa-lubrense',       'en-gb': 'sagra-limone-massa-lubrense',       'de-de': 'sagra-limone-massa-lubrense',        'fr-fr': 'sagra-limone-massa-lubrense',       'es-es': 'sagra-limone-massa-lubrense',       'it-it': 'sagra-limone-massa-lubrense'      },
  { 'en-us': 'sagra-melanzana-preazzano',         'en-gb': 'sagra-melanzana-preazzano',         'de-de': 'sagra-melanzana-preazzano',          'fr-fr': 'sagra-melanzana-preazzano',         'es-es': 'sagra-melanzana-preazzano',         'it-it': 'sagra-melanzana-preazzano'        },
  { 'en-us': 'sorrento-meeting-cultura',          'en-gb': 'sorrento-meeting-cultura',          'de-de': 'sorrento-meeting-cultura',           'fr-fr': 'sorrento-meeting-cultura',          'es-es': 'sorrento-meeting-cultura',          'it-it': 'sorrento-meeting-cultura'         },
  // Beach name translations
  { 'en-us': 'spiaggia-di-ieranto',               'en-gb': 'spiaggia-di-ieranto',               'de-de': 'spiaggia-di-ieranto',                'fr-fr': 'spiaggia-di-ieranto',               'es-es': 'spiaggia-di-ieranto',               'it-it': 'ieranto'                          },
  { 'en-us': 'cala-mitigliano',                   'en-gb': 'cala-mitigliano',                   'de-de': 'cala-mitigliano',                    'fr-fr': 'cala-mitigliano',                  'es-es': 'cala-mitigliano',                  'it-it': 'cala-mitigliano'                 },
  { 'en-us': 'marina-del-cantone',                'en-gb': 'marina-del-cantone',                'de-de': 'marina-del-cantone',                 'fr-fr': 'marina-del-cantone',               'es-es': 'marina-del-cantone',               'it-it': 'marina-del-cantone'              },
  { 'en-us': 'regina-giovanna',                   'en-gb': 'regina-giovanna',                   'de-de': 'regina-giovanna',                    'fr-fr': 'regina-giovanna',                  'es-es': 'regina-giovanna',                  'it-it': 'regina-giovanna'                 },
  { 'en-us': 'marina-di-praia',                   'en-gb': 'marina-di-praia',                   'de-de': 'marina-di-praia',                    'fr-fr': 'marina-di-praia',                  'es-es': 'marina-di-praia',                  'it-it': 'marina-di-praia'                 },
];

/**
 * Translates a URL pathname from one locale to another by mapping
 * locale-specific path segments using pathSegments table.
 * Segments not found in the table (e.g. town slugs) are kept as-is.
 *
 * Includes translations for: experiences, boat-tours, cooking-class, weddings,
 * starred-restaurants, limoncello-tour, mozzarella-experience, trekking, and blog posts.
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

/**
 * Intelligently extract pageKey from pathname by checking slugMap
 * For example: /it-it/spiagge/penisola-sorrentina/cala-mitigliano/ → 'cala-mitigliano'
 * Returns the pageKey if found in slugMap, otherwise null
 */
export function extractPageKeyFromPath(pathname: string): string | null {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 2) return null; // Must have at least locale + one more segment

  // Try last segment first (most specific)
  const lastSegment = parts[parts.length - 1];
  if (slugMap[lastSegment]) return lastSegment;

  // Try combinations of last 2 segments for nested pages
  if (parts.length >= 3) {
    const lastTwo = parts[parts.length - 2] + '-' + lastSegment;
    if (slugMap[lastTwo]) return lastTwo;
  }

  return null;
}

/**
 * Build-time generated redirect map from public/_redirects
 * Automatically constructed by parseRedirectsFile()
 * Maps source URLs (301 source) → destination URLs (200)
 *
 * This ensures hreflang tags always point to canonical URLs (200)
 * not redirect sources (301)
 */
export const redirectMap: Record<string, string> = buildRedirectMap();

/**
 * Parse the _redirects file and build a complete source → destination map
 * Handles the Netlify _redirects format: "source destination 301"
 */
function buildRedirectMap(): Record<string, string> {
  const map: Record<string, string> = {};

  // Comprehensive redirect rules parsed from public/_redirects
  // Format: [source, destination, statusCode]
  const redirectRules = [
    // PLANNING
    ['/en-us/planification/', '/en-us/planning/'],
    ['/en-us/pianificazione/', '/en-us/planning/'],
    ['/it-it/planning/', '/it-it/pianificazione/'],
    ['/it-it/planification/', '/it-it/pianificazione/'],
    ['/de-de/planning/', '/de-de/planung/'],
    ['/de-de/planification/', '/de-de/planung/'],
    ['/de-de/pianificazione/', '/de-de/planung/'],
    ['/es-es/planning/', '/es-es/planificacion/'],
    ['/es-es/pianificazione/', '/es-es/planificacion/'],
    ['/fr-fr/planning/', '/fr-fr/planification/'],
    ['/fr-fr/pianificazione/', '/fr-fr/planification/'],

    // ISLANDS & DESTINATIONS
    ['/en-us/isole/', '/en-us/islands/'],
    ['/en-us/isole/procida/', '/en-us/islands/procida/'],
    ['/en-us/isole/capri/', '/en-us/islands/capri/'],
    ['/en-us/procida/', '/en-us/islands/procida/'],
    ['/en-us/capri/', '/en-us/islands/capri/'],
    ['/en-us/ischia/', '/en-us/islands/ischia/'],
    ['/de-de/isole/capri/', '/de-de/inseln/capri/'],
    ['/de-de/ischia/', '/de-de/inseln/ischia/'],
    ['/de-de/procida/', '/de-de/inseln/procida/'],
    ['/de-de/anacapri/', '/de-de/inseln/anacapri/'],
    ['/de-de/islands/capri/', '/de-de/inseln/capri/'],
    ['/de-de/islands/ischia/', '/de-de/inseln/ischia/'],
    ['/de-de/islands/procida/', '/de-de/inseln/procida/'],
    ['/de-de/islands/anacapri/', '/de-de/inseln/anacapri/'],
    ['/es-es/isole/', '/es-es/islas/'],
    ['/es-es/isole/capri/', '/es-es/islas/capri/'],
    ['/es-es/ischia/', '/es-es/islas/ischia/'],
    ['/es-es/procida/', '/es-es/islas/procida/'],
    ['/fr-fr/isole/capri/', '/fr-fr/iles/capri/'],
    ['/fr-fr/ischia/', '/fr-fr/iles/ischia/'],
    ['/fr-fr/capri/', '/fr-fr/iles/capri/'],
    ['/fr-fr/anacapri/', '/fr-fr/iles/anacapri/'],
    ['/fr-fr/isles/capri/', '/fr-fr/iles/capri/'],
    ['/fr-fr/isles/ischia/', '/fr-fr/iles/ischia/'],
    ['/fr-fr/isles/anacapri/', '/fr-fr/iles/anacapri/'],
    ['/fr-fr/isles/procida/', '/fr-fr/iles/procida/'],
    ['/it-it/ischia/', '/it-it/isole/ischia/'],
    ['/it-it/capri/', '/it-it/isole/capri/'],

    // AMALFI COAST & BEACHES
    ['/de-de/amalfiküste/', '/de-de/amalfikueste/'],
    ['/de-de/amalfiküste/amalfi/', '/de-de/amalfikueste/amalfi/'],
    ['/de-de/amalfiküste/positano/', '/de-de/amalfikueste/positano/'],
    ['/de-de/amalfiküste/maiori/', '/de-de/amalfikueste/maiori/'],
    ['/de-de/amalfiküste/ravello/', '/de-de/amalfikueste/ravello/'],
    ['/de-de/amalfiküste/vietri-sul-mare/', '/de-de/amalfikueste/vietri-sul-mare/'],
    ['/de-de/amalfiküste/minori/', '/de-de/amalfikueste/minori/'],
    ['/de-de/amalfi-coast/amalfi/', '/de-de/amalfikueste/amalfi/'],
    ['/de-de/amalfi-coast/positano/', '/de-de/amalfikueste/positano/'],
    ['/de-de/strände/amalfiküste/spiaggia-grande-positano/', '/de-de/straende/amalfikueste/spiaggia-grande-positano/'],
    ['/de-de/strände/amalfiküste/fiordo-di-furore/', '/de-de/straende/amalfikueste/fiordo-di-furore/'],
    ['/de-de/strände/inseln/marina-piccola-capri/', '/de-de/straende/islands/marina-piccola-capri/'],
    ['/de-de/spiagge/', '/de-de/straende/'],
    ['/es-es/costiera-amalfitana/', '/es-es/costa-amalfitana/'],
    ['/es-es/costiera-amalfitana/positano/', '/es-es/costa-amalfitana/positano/'],
    ['/es-es/costiera-amalfitana/amalfi/', '/es-es/costa-amalfitana/amalfi/'],
    ['/es-es/costiera-amalfitana/maiori/', '/es-es/costa-amalfitana/maiori/'],
    ['/es-es/costiera-amalfitana/ravello/', '/es-es/costa-amalfitana/ravello/'],
    ['/es-es/costiera-amalfitana/vietri-sul-mare/', '/es-es/costa-amalfitana/vietri-sul-mare/'],
    ['/es-es/costiera-amalfitana/minori/', '/es-es/costa-amalfitana/minori/'],
    ['/es-es/amalfi-coast/positano/', '/es-es/costa-amalfitana/positano/'],
    ['/es-es/amalfi-coast/amalfi/', '/es-es/costa-amalfitana/amalfi/'],
    ['/es-es/spiagge/', '/es-es/playas/'],
    ['/fr-fr/spiagge/', '/fr-fr/plages/'],

    // PENISOLA SORRENTINA
    ['/en-us/sorrentine-peninsula/sorrento/', '/en-us/sorrento-peninsula/sorrento/'],
    ['/en-us/sorrentine-peninsula/massa-lubrense/', '/en-us/sorrento-peninsula/massa-lubrense/'],
    ['/en-us/sorrentine-peninsula/sant-agnello/', '/en-us/sorrento-peninsula/sant-agnello/'],
    ['/en-us/sorrentine-peninsula/vico-equense/', '/en-us/sorrento-peninsula/vico-equense/'],
    ['/fr-fr/peninsule-sorrentine/sorrento/', '/fr-fr/peninsule-sorrentine/sorrente/'],
    ['/fr-fr/peninsule-sorrentine/sorrent/', '/fr-fr/peninsule-sorrentine/sorrente/'],
    ['/de-de/sorrentinische-halbinsel/sorrento/', '/de-de/sorrento-peninsula/sorrento/'],
    ['/de-de/sorrentinische-halbinsel/sorrente/', '/de-de/sorrento-peninsula/sorrento/'],
    ['/es-es/penisola-sorrentina/sorrente/', '/es-es/peninsula-sorrentina/sorrento/'],
    ['/es-es/peninsula-sorrentina/sorrent/', '/es-es/peninsula-sorrentina/sorrento/'],

    // DE-DE: sorrentiner-halbinsel → sorrentinische-halbinsel (beaches & events)
    ['/de-de/strande/sorrentiner-halbinsel/cala-mitigliano/', '/de-de/strande/sorrentinische-halbinsel/cala-mitigliano/'],
    ['/de-de/strande/sorrentiner-halbinsel/marina-del-cantone/', '/de-de/strande/sorrentinische-halbinsel/marina-del-cantone/'],
    ['/de-de/strande/sorrentiner-halbinsel/regina-giovanna/', '/de-de/strande/sorrentinische-halbinsel/regina-giovanna/'],
    ['/de-de/strande/sorrentiner-halbinsel/spiaggia-di-ieranto/', '/de-de/strande/sorrentinische-halbinsel/spiaggia-di-ieranto/'],
    ['/de-de/veranstaltungen/sorrentiner-halbinsel/festa-sant-antonino/', '/de-de/veranstaltungen/sorrentinische-halbinsel/festa-sant-antonino/'],
    ['/de-de/veranstaltungen/sorrentiner-halbinsel/gustamincanto-vico-equense/', '/de-de/veranstaltungen/sorrentinische-halbinsel/gustamincanto-vico-equense/'],
    ['/de-de/veranstaltungen/sorrentiner-halbinsel/madonna-della-libera/', '/de-de/veranstaltungen/sorrentinische-halbinsel/madonna-della-libera/'],
    ['/de-de/veranstaltungen/sorrentiner-halbinsel/sagra-limone-massa-lubrense/', '/de-de/veranstaltungen/sorrentinische-halbinsel/sagra-limone-massa-lubrense/'],
    ['/de-de/veranstaltungen/sorrentiner-halbinsel/sagra-melanzana-preazzano/', '/de-de/veranstaltungen/sorrentinische-halbinsel/sagra-melanzana-preazzano/'],
    ['/de-de/veranstaltungen/sorrentiner-halbinsel/sorrento-meeting-cultura/', '/de-de/veranstaltungen/sorrentinische-halbinsel/sorrento-meeting-cultura/'],

    // GUIDE & TRAGHETTI
    ['/en-us/guide/how-to-get-there/', '/en-us/guide/getting-here/'],
    ['/de-de/guida/anreise/', '/de-de/reisefuehrer/anreise/'],
    ['/de-de/guida/beste-reisezeit/', '/de-de/reisefuehrer/beste-reisezeit/'],
    ['/de-de/ratgeber/wie-man-anreist/', '/de-de/reisefuehrer/anreise/'],
    ['/de-de/reiseführer/faehren/', '/de-de/reisefuehrer/faehren/'],
    ['/de-de/quando-visitare/', '/de-de/reisefuehrer/beste-reisezeit/'],
    ['/fr-fr/guide/comment-arriver/', '/fr-fr/guide/comment-se-rendre/'],
    ['/fr-fr/guide/comment-sy-rendre/', '/fr-fr/guide/comment-se-rendre/'],
    ['/fr-fr/quando-visitare/', '/fr-fr/guide/quand-partir/'],
    ['/fr-fr/guide/quand-partir/', '/fr-fr/guide/quand-visiter/'],
    ['/es-es/guia/ferrys/', '/es-es/guia/ferries/'],
    ['/es-es/guia/traghetti/', '/es-es/guia/ferries/'],
    ['/es-es/quando-visitare/', '/es-es/guia/mejor-epoca-para-viajar/'],
    ['/en-us/sorrento-peninsula/ieranto-beach/', '/en-us/beaches/sorrentine-peninsula/spiaggia-di-ieranto/'],
    ['/en-us/beaches/sorrentine-peninsula/ieranto-bay/', '/en-us/beaches/sorrentine-peninsula/spiaggia-di-ieranto/'],
    ['/de-de/anreise/', '/de-de/ratgeber/anreise/'],
    ['/de-de/reisezeit/', '/de-de/ratgeber/reisezeit/'],
  ];

  // Build map from redirect rules
  for (const [source, destination] of redirectRules) {
    map[source] = destination;
  }

  return map;
}

/**
 * Risolvi una URL seguendo i redirect fino alla versione canonaca (200)
 * Se l'URL è source di un redirect, retorna la destinazione
 * Se no, retorna l'URL originale
 *
 * Questo assicura che gli hreflang puntino sempre a URL 200, mai a 301
 */
export function resolveCanonicalUrl(urlPath: string): string {
  // Segui i redirect fino a trovare la versione finale
  let current = urlPath;
  const visited = new Set<string>();
  const maxIterations = 5; // Evita loop infiniti
  let iterations = 0;

  while (iterations < maxIterations) {
    const target = redirectMap[current];
    if (!target) {
      // No redirect found, questo è il canonical URL
      return current;
    }

    if (visited.has(target)) {
      // Redirect loop detected, return current to avoid infinite loop
      return current;
    }

    visited.add(current);
    current = target;
    iterations++;
  }

  return current;
}
