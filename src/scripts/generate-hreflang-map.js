#!/usr/bin/env node

/**
 * Generate hreflang mapping from sitemap.xml
 * Creates a TypeScript file with all URL variants grouped by content
 *
 * Usage: node src/scripts/generate-hreflang-map.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse sitemap.xml and extract all URLs
function parseSitemap(sitemapPath) {
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const urlRegex = /<loc>(https:\/\/amalficoast-travel\.com([^<]+))<\/loc>/g;
  const urls = [];
  let match;

  while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[2]); // Extract path only (without domain)
  }

  return urls.sort();
}

// Extract language code and content path from a URL
function parseUrl(url) {
  const match = url.match(/^\/([a-z]{2}-[a-z]{2})(.*)$/);
  if (!match) return null;

  return {
    locale: match[1],
    path: match[2] || '/',
  };
}

// Group URLs by their content (ignoring language)
function groupByContent(urls) {
  const groups = new Map();

  for (const url of urls) {
    const parsed = parseUrl(url);
    if (!parsed) continue;

    // Generate a content key by removing language-specific segments
    const contentKey = generateContentKey(parsed.path, parsed.locale);

    if (!groups.has(contentKey)) {
      groups.set(contentKey, {});
    }

    groups.get(contentKey)[parsed.locale] = parsed.path;
  }

  return groups;
}

// Generate a normalized content key by replacing language-specific terms
function generateContentKey(path, locale) {
  // Normalize path by replacing known language-specific segments
  // The key should be identical across all locales for the same content

  const localeReplacements = {
    'en-us': {
      'amalfi-coast': '__AMALFI_COAST__',
      'beaches': '__BEACHES__',
      'islands': '__ISLANDS__',
      'sorrento-peninsula': '__SORRENTO_PENINSULA__',
      'guide': '__GUIDE__',
      'experiences': '__EXPERIENCES__',
      'events': '__EVENTS__',
      'itineraries': '__ITINERARIES__',
      'planning': '__PLANNING__',
      'blog': '__BLOG__',
    },
    'de-de': {
      'amalfikueste': '__AMALFI_COAST__',
      'strande': '__BEACHES__',
      'inseln': '__ISLANDS__',
      'sorrentinische-halbinsel': '__SORRENTO_PENINSULA__',
      'ratgeber': '__GUIDE__',
      'erlebnisse': '__EXPERIENCES__',
      'veranstaltungen': '__EVENTS__',
      'reiserouten': '__ITINERARIES__',
      'planung': '__PLANNING__',
      'blog': '__BLOG__',
    },
    'fr-fr': {
      'cote-amalfitaine': '__AMALFI_COAST__',
      'plages': '__BEACHES__',
      'iles': '__ISLANDS__',
      'peninsule-sorrentine': '__SORRENTO_PENINSULA__',
      'guide': '__GUIDE__',
      'experiences': '__EXPERIENCES__',
      'evenements': '__EVENTS__',
      'itineraires': '__ITINERARIES__',
      'planification': '__PLANNING__',
      'blog': '__BLOG__',
    },
    'es-es': {
      'costa-amalfitana': '__AMALFI_COAST__',
      'playas': '__BEACHES__',
      'islas': '__ISLANDS__',
      'peninsula-sorrentina': '__SORRENTO_PENINSULA__',
      'guia': '__GUIDE__',
      'experiencias': '__EXPERIENCES__',
      'eventos': '__EVENTS__',
      'itinerarios': '__ITINERARIES__',
      'planificacion': '__PLANNING__',
      'blog': '__BLOG__',
    },
    'it-it': {
      'costiera-amalfitana': '__AMALFI_COAST__',
      'spiagge': '__BEACHES__',
      'isole': '__ISLANDS__',
      'penisola-sorrentina': '__SORRENTO_PENINSULA__',
      'guida': '__GUIDE__',
      'esperienze': '__EXPERIENCES__',
      'eventi': '__EVENTS__',
      'itinerari': '__ITINERARIES__',
      'pianificazione': '__PLANNING__',
      'blog': '__BLOG__',
    },
  };

  let key = path;
  const replacements = localeReplacements[locale] || {};

  for (const [term, placeholder] of Object.entries(replacements)) {
    key = key.replace(new RegExp(`(^|/)${term}(/|$)`, 'g'), `$1${placeholder}$2`);
  }

  return key;
}

// Load manual hreflang mappings
function loadManualMappings() {
  const manualMappings = {
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

  return manualMappings;
}

// Generate TypeScript mapping file
function generateTypeScriptFile(groups, manualMappings) {
  const locales = ['en-us', 'de-de', 'fr-fr', 'es-es', 'it-it'];
  const baseUrl = 'https://amalficoast-travel.com';

  // Build the mapping structure
  const hreflangs = [];
  const hreflangsMap = new Map();

  // First, apply manual mappings
  console.log(`Applying ${Object.keys(manualMappings).length} manual mappings...`);
  for (const [canonicalKey, mapping] of Object.entries(manualMappings)) {
    const alternate = mapping;
    const primaryUrl = mapping['en-us'];

    // Add all variants from this manual mapping
    for (const [locale, url] of Object.entries(alternate)) {
      const key = url.replace(baseUrl, '');
      if (!hreflangsMap.has(key)) {
        hreflangsMap.set(key, {
          url,
          canonical: primaryUrl,
          alternates: alternate,
          'x-default': primaryUrl,
        });
      }
    }
  }

  // Then, apply auto-generated mappings for remaining URLs
  console.log(`Processing ${groups.size} auto-generated groups...`);
  for (const [contentKey, variants] of groups) {
    // Build complete hreflang set for this content
    const alternate = {};
    let primaryUrl = '';

    for (const locale of locales) {
      if (variants[locale]) {
        alternate[locale] = `${baseUrl}/${locale}${variants[locale]}`;
        if (locale === 'en-us') {
          primaryUrl = `${baseUrl}/${locale}${variants[locale]}`;
        }
      }
    }

    // Ensure all variants have the complete alternate set
    // Only add if not already in map from manual mappings (to avoid duplicates)
    for (const [locale, url] of Object.entries(alternate)) {
      const key = url.replace(baseUrl, '');
      if (!hreflangsMap.has(key)) {
        hreflangsMap.set(key, {
          url,
          canonical: primaryUrl,
          alternates: alternate,
          'x-default': primaryUrl,
        });
      }
    }
  }

  // Generate TypeScript file content
  let content = `/**
 * AUTO-GENERATED HREFLANG MAPPING
 * Generated from dist/sitemap.xml
 *
 * Do not edit manually. Regenerate with: npm run generate-hreflang
 *
 * This mapping ensures every URL has reciprocal links to all language variants
 * plus an x-default pointing to the English (en-us) version.
 */

export interface HrefLangEntry {
  url: string;
  canonical: string;
  alternates: Record<string, string>;
  'x-default': string;
}

export const hrefLangMap: Record<string, HrefLangEntry> = {
`;

  // Sort by URL for consistent output
  const sortedEntries = Array.from(hreflangsMap.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  for (const [url, entry] of sortedEntries) {
    content += `  '${url}': {
    url: '${entry.url}',
    canonical: '${entry.canonical}',
    alternates: {
`;
    for (const [locale, altUrl] of Object.entries(entry.alternates)) {
      content += `      '${locale}': '${altUrl}',\n`;
    }
    content += `    },
    'x-default': '${entry['x-default']}',
  },\n`;
  }

  content += `};

/**
 * Helper function to get hreflangs for a URL
 */
export function getHreflangs(url: string): HrefLangEntry | null {
  return hrefLangMap[url] || null;
}

/**
 * Get all alternate URLs for a given URL
 */
export function getAlternates(url: string): Record<string, string> | null {
  const entry = hrefLangMap[url];
  return entry ? entry.alternates : null;
}

/**
 * Get x-default URL for a given URL
 */
export function getXDefault(url: string): string | null {
  const entry = hrefLangMap[url];
  return entry ? entry['x-default'] : null;
}

/**
 * Map statistics
 */
export const hrefLangStats = {
  totalUrls: ${hreflangsMap.size},
  totalGroups: ${groups.size},
  locales: ${JSON.stringify(locales)},
  generatedAt: '${new Date().toISOString()}',
};
`;

  return content;
}

// Main execution
try {
  const sitemapPath = path.resolve(__dirname, '../../dist/sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    console.error(`Sitemap not found at: ${sitemapPath}`);
    console.error('Make sure to run "npm run build" first to generate the sitemap.');
    process.exit(1);
  }

  console.log('Parsing sitemap...');
  const urls = parseSitemap(sitemapPath);
  console.log(`Found ${urls.length} URLs`);

  console.log('Grouping URLs by content...');
  const groups = groupByContent(urls);
  console.log(`Created ${groups.size} content groups`);

  console.log('Loading manual hreflang mappings...');
  const manualMappings = loadManualMappings();
  console.log(`Loaded ${Object.keys(manualMappings).length} manual mappings`);

  console.log('Generating TypeScript file...');
  const tsContent = generateTypeScriptFile(groups, manualMappings);

  const outputPath = path.resolve(__dirname, '../i18n/hreflang-map.ts');
  fs.writeFileSync(outputPath, tsContent, 'utf-8');

  console.log(`✓ Generated: ${outputPath}`);
  console.log(`✓ Total entries: ${urls.length}`);
} catch (error) {
  console.error('Error generating hreflang map:', error);
  process.exit(1);
}
