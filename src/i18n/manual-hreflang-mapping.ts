/**
 * Manual hreflang mappings for pages with language-specific URLs
 *
 * These pages have different slug names across languages, so they can't be
 * auto-matched by the generateHreflangs() function. This mapping ensures
 * complete reciprocal hreflangs for these pages.
 *
 * Structure: key is the canonical en-us URL, value is mapping of locale → full URL
 */

export const manualHrefLangMappings: Record<string, Record<string, string>> = {
  // Guide: Ferries
  '/en-us/guide/ferries/': {
    'en-us': 'https://amalficoast-travel.com/en-us/guide/ferries/',
    'de-de': 'https://amalficoast-travel.com/de-de/ratgeber/faehren/',
    'fr-fr': 'https://amalficoast-travel.com/fr-fr/guide/ferries/',
    'es-es': 'https://amalficoast-travel.com/es-es/guia/ferries/',
    'it-it': 'https://amalficoast-travel.com/it-it/guida/traghetti/',
  },

  // Guide: Getting Here
  '/en-us/guide/getting-here/': {
    'en-us': 'https://amalficoast-travel.com/en-us/guide/getting-here/',
    'de-de': 'https://amalficoast-travel.com/de-de/ratgeber/anreise/',
    'fr-fr': 'https://amalficoast-travel.com/fr-fr/guide/comment-venir/',
    'es-es': 'https://amalficoast-travel.com/es-es/guia/como-llegar/',
    'it-it': 'https://amalficoast-travel.com/it-it/guida/come-arrivare/',
  },

  // Guide: Parking & ZTL
  '/en-us/guide/parking-ztl/': {
    'en-us': 'https://amalficoast-travel.com/en-us/guide/parking-ztl/',
    'de-de': 'https://amalficoast-travel.com/de-de/ratgeber/parken-ztl/',
    'fr-fr': 'https://amalficoast-travel.com/fr-fr/guide/parking-ztl/',
    'es-es': 'https://amalficoast-travel.com/es-es/guia/aparcamiento-ztl/',
    'it-it': 'https://amalficoast-travel.com/it-it/guida/parcheggi-ztl/',
  },

  // Guide: SITA Bus
  '/en-us/guide/sita-bus/': {
    'en-us': 'https://amalficoast-travel.com/en-us/guide/sita-bus/',
    'de-de': 'https://amalficoast-travel.com/de-de/ratgeber/sita-bus/',
    'fr-fr': 'https://amalficoast-travel.com/fr-fr/guide/bus-sita/',
    'es-es': 'https://amalficoast-travel.com/es-es/guia/bus-sita/',
    'it-it': 'https://amalficoast-travel.com/it-it/guida/bus-sita/',
  },

  // Guide: When to Visit
  '/en-us/guide/when-to-visit/': {
    'en-us': 'https://amalficoast-travel.com/en-us/guide/when-to-visit/',
    'de-de': 'https://amalficoast-travel.com/de-de/ratgeber/reisezeit/',
    'fr-fr': 'https://amalficoast-travel.com/fr-fr/guide/quand-visiter/',
    'es-es': 'https://amalficoast-travel.com/es-es/guia/cuando-visitar/',
    'it-it': 'https://amalficoast-travel.com/it-it/guida/quando-visitare/',
  },
};

/**
 * Helper function to check if a URL is in the manual mapping
 */
export function isManuallyMapped(url: string): boolean {
  const path = new URL(url).pathname;
  return Object.keys(manualHrefLangMappings).some(
    (key) => path.includes(key.replace(/^\//, '')) || key.includes(path)
  );
}

/**
 * Get manual mapping for a URL and its variants
 */
export function getManualMapping(url: string): Record<string, string> | null {
  // Extract the locale and path from the URL
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const match = pathname.match(/\/([a-z]{2}-[a-z]{2})(.*)\//);

  if (!match) return null;

  const [, locale, path] = match;

  // Find the canonical mapping (en-us version)
  for (const [canonicalKey, mapping] of Object.entries(manualHrefLangMappings)) {
    // Check if this URL is one of the variants in this mapping
    for (const [mappingLocale, mappingUrl] of Object.entries(mapping)) {
      if (mappingUrl === url) {
        // Found it! Return the complete mapping
        return mapping;
      }
    }
  }

  return null;
}
