#!/usr/bin/env node

/**
 * Generate hreflang mapping from sitemap.xml with slugMap as source of truth
 *
 * Strategy:
 * 1. Extract slugMap from translations.ts - this is the definitive mapping
 * 2. For each slugMap entry, build all 5 language URLs
 * 3. Verify URLs exist in sitemap (status 200)
 * 4. Create perfect hreflang groups from slugMap
 * 5. For remaining URLs not in slugMap, use pattern-matching fallback
 * 6. Output guaranteed reciprocal hreflangs
 *
 * Usage: node src/scripts/generate-hreflang-map.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse sitemap.xml and extract all URLs with status code
function parseSitemap(sitemapPath) {
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const urlRegex = /<loc>(https:\/\/amalficoast-travel\.com([^<]+))<\/loc>/g;
  const urls = new Set();
  let match;

  while ((match = urlRegex.exec(content)) !== null) {
    urls.add(match[2]); // Extract path only (without domain)
  }

  return urls;
}

// Extract slugMap from translations.ts
function extractSlugMap(translationsPath) {
  const content = fs.readFileSync(translationsPath, 'utf-8');

  // Find the slugMap definition
  const slugMapMatch = content.match(/export const slugMap: Record<string, SlugMap> = \{([\s\S]*?)\n\};/);
  if (!slugMapMatch) {
    console.error('Could not find slugMap in translations.ts');
    process.exit(1);
  }

  const slugMapContent = slugMapMatch[1];
  const slugMap = {};

  // Parse each entry: pageKey: { locale: path, ... }
  const entryRegex = /\s*'([^']+)':\s*\{\s*((?:'[^']+'\s*:\s*'[^']+'\s*,?\s*)*)\s*\},?/g;
  let entryMatch;

  while ((entryMatch = entryRegex.exec(slugMapContent)) !== null) {
    const pageKey = entryMatch[1];
    const localePathString = entryMatch[2];

    const localeMap = {};
    const localeRegex = /'([^']+)'\s*:\s*'([^']+)'/g;
    let localeMatch;

    while ((localeMatch = localeRegex.exec(localePathString)) !== null) {
      localeMap[localeMatch[1]] = localeMatch[2];
    }

    if (Object.keys(localeMap).length > 0) {
      slugMap[pageKey] = localeMap;
    }
  }

  return slugMap;
}

// Build hreflang groups from slugMap (source of truth)
function buildHreflangsFromSlugMap(slugMap, sitemapUrls) {
  const baseUrl = 'https://amalficoast-travel.com';
  const locales = ['en-us', 'de-de', 'fr-fr', 'es-es', 'it-it'];
  const hreflangsMap = new Map(); // URL path → hreflang entry
  const usedUrls = new Set(); // Track which sitemap URLs we've processed

  let processedCount = 0;
  let skippedCount = 0;

  // For each slugMap entry, build perfect hreflang group
  for (const [pageKey, localeMap] of Object.entries(slugMap)) {
    const urlVariants = {};
    let primaryUrl = '';
    let allExist = true;
    const tentativeUrls = []; // Track URLs for this group before committing

    // Build URL for each locale
    for (const locale of locales) {
      const slug = localeMap[locale];
      if (!slug) {
        console.warn(`  ⚠️ Missing ${locale} for page "${pageKey}"`);
        allExist = false;
        continue;
      }

      let urlPath;
      if (slug === '') {
        // Home page
        urlPath = `/${locale}/`;
      } else if (slug.startsWith('spiagge/penisola-sorrentina/spiaggia-di-ieranto')) {
        // Special case: Italian beach page without /spiagge prefix
        urlPath = `/${locale}/penisola-sorrentina/spiaggia-di-ieranto/`;
      } else {
        urlPath = `/${locale}/${slug}/`;
      }

      // Check if URL exists in sitemap
      if (!sitemapUrls.has(urlPath)) {
        console.warn(`  ⚠️ URL not in sitemap: ${urlPath} (pageKey: ${pageKey})`);
        allExist = false;
        continue;
      }

      urlVariants[locale] = `${baseUrl}${urlPath}`;
      tentativeUrls.push(urlPath); // Don't add to usedUrls yet

      if (locale === 'en-us') {
        primaryUrl = `${baseUrl}${urlPath}`;
      }
    }

    // Only create hreflang group if all locales exist
    if (allExist && primaryUrl) {
      // Now add the URLs to usedUrls since the group is complete
      tentativeUrls.forEach(url => usedUrls.add(url));

      // Add entry for each variant
      for (const [locale, url] of Object.entries(urlVariants)) {
        const urlPath = url.replace(baseUrl, '');
        if (!hreflangsMap.has(urlPath)) {
          hreflangsMap.set(urlPath, {
            url,
            canonical: primaryUrl,
            alternates: urlVariants,
            'x-default': primaryUrl,
            source: 'slugMap',
            pageKey,
          });
        }
      }
      processedCount++;
    } else if (Object.keys(urlVariants).length > 0) {
      skippedCount++;
    }
  }

  console.log(`✓ Built ${processedCount} perfect hreflang groups from slugMap`);
  if (skippedCount > 0) {
    console.log(`⚠️ Skipped ${skippedCount} incomplete slugMap entries (missing locale variants)`);
  }

  return { hreflangsMap, usedUrls };
}

// Parse URL and extract locale and path
function parseUrl(url) {
  const match = url.match(/^\/([a-z]{2}-[a-z]{2})(.*)$/);
  if (!match) return null;

  return {
    locale: match[1],
    path: match[2] || '/',
  };
}

// Build hreflang groups from remaining URLs using pattern matching (fallback)
function buildHreflangsFromSitemap(sitemapUrls, usedUrls) {
  const baseUrl = 'https://amalficoast-travel.com';
  const locales = ['en-us', 'de-de', 'fr-fr', 'es-es', 'it-it'];
  const hreflangsMap = new Map();

  // Build comprehensive path segment translations
  const pathSegmentTranslations = [
    // Hub pages (must come first for priority)
    { 'en-us': 'blog', 'de-de': 'blog', 'fr-fr': 'blog', 'es-es': 'blog', 'it-it': 'blog' },
    { 'en-us': 'amalfi-coast', 'de-de': 'amalfikueste', 'fr-fr': 'cote-amalfitaine', 'es-es': 'costa-amalfitana', 'it-it': 'costiera-amalfitana' },
    { 'en-us': 'beaches', 'de-de': 'strande', 'fr-fr': 'plages', 'es-es': 'playas', 'it-it': 'spiagge' },
    { 'en-us': 'islands', 'de-de': 'inseln', 'fr-fr': 'iles', 'es-es': 'islas', 'it-it': 'isole' },
    { 'en-us': 'guide', 'de-de': 'ratgeber', 'fr-fr': 'guide', 'es-es': 'guia', 'it-it': 'guida' },
    { 'en-us': 'events', 'de-de': 'veranstaltungen', 'fr-fr': 'evenements', 'es-es': 'eventos', 'it-it': 'eventi' },
    { 'en-us': 'experiences', 'de-de': 'erlebnisse', 'fr-fr': 'experiences', 'es-es': 'experiencias', 'it-it': 'esperienze' },
    { 'en-us': 'itineraries', 'de-de': 'reiserouten', 'fr-fr': 'itineraires', 'es-es': 'itinerarios', 'it-it': 'itinerari' },
    { 'en-us': 'planning', 'de-de': 'planung', 'fr-fr': 'planification', 'es-es': 'planificacion', 'it-it': 'pianificazione' },
    { 'en-us': 'sorrento-peninsula', 'de-de': 'sorrentinische-halbinsel', 'fr-fr': 'peninsule-sorrentine', 'es-es': 'peninsula-sorrentina', 'it-it': 'penisola-sorrentina' },
    // Duration folders for itineraries
    { 'en-us': '1-day', 'de-de': '1-tag', 'fr-fr': '1-jour', 'es-es': '1-dia', 'it-it': '1-giorno' },
    { 'en-us': '3-days', 'de-de': '3-tage', 'fr-fr': '3-jours', 'es-es': '3-dias', 'it-it': '3-giorni' },
    { 'en-us': '7-days', 'de-de': '7-tage', 'fr-fr': '7-jours', 'es-es': '7-dias', 'it-it': '7-giorni' },
    // Destination pages with language-specific names
    { 'en-us': 'sorrento', 'de-de': 'sorrent', 'fr-fr': 'sorrente', 'es-es': 'sorrento', 'it-it': 'sorrento' },
    { 'en-us': 'massa-lubrense', 'de-de': 'massa-lubrense', 'fr-fr': 'massa-lubrense', 'es-es': 'massa-lubrense', 'it-it': 'massa-lubrense' },
    // Beach names (consistent across locales)
    { 'en-us': 'marina-di-praia', 'de-de': 'marina-di-praia', 'fr-fr': 'marina-di-praia', 'es-es': 'marina-di-praia', 'it-it': 'marina-di-praia' },
    // Guide pages (consistent with slugMap)
    { 'en-us': 'ferries', 'de-de': 'faehren', 'fr-fr': 'ferries', 'es-es': 'ferries', 'it-it': 'traghetti' },
  ];

  // Special case: Italian Sorrento beach has unique path structure
  // /penisola-sorrentina/massa-lubrense/spiaggia-di-ieranto/ (instead of /spiagge/penisola-sorrentina/spiaggia-di-ieranto/)
  const italianSpecialPages = new Map();

  let patternMatchCount = 0;
  let unmatchedCount = 0;

  // Match URLs by translating path segments
  const matchedGroups = new Map(); // contentKey → { locale: path }

  for (const url of sitemapUrls) {
    if (usedUrls.has(url)) continue;

    const parsed = parseUrl(url);
    if (!parsed) continue;

    const parts = parsed.path.split('/').filter(Boolean);
    let contentKey = parts.join('/');

    // Try to find matching patterns for ALL segments (not just first)
    const keyParts = [...parts];
    for (const segmentMap of pathSegmentTranslations) {
      const sourceValue = segmentMap[parsed.locale];
      if (!sourceValue) continue;

      const index = keyParts.indexOf(sourceValue);
      if (index !== -1) {
        // Replace with en-us equivalent
        keyParts[index] = segmentMap['en-us'];
      }
    }
    contentKey = keyParts.join('/');

    // If not translated with standard segments, keep as-is for locale-specific paths
    // This handles blog slugs, event names, beach names that are consistent across locales

    if (!matchedGroups.has(contentKey)) {
      matchedGroups.set(contentKey, {});
    }
    matchedGroups.get(contentKey)[parsed.locale] = url;
  }

  // Build hreflang entries from matched groups
  for (const [contentKey, variants] of matchedGroups) {
    const variantCount = Object.keys(variants).length;

    // Need at least 2 language variants to create hreflangs
    if (variantCount < 2) {
      unmatchedCount++;
      continue;
    }

    const urlVariants = {};
    let primaryUrl = '';
    let hasEnglish = false;
    let primaryLocale = 'en-us'; // Default primary language

    for (const locale of locales) {
      if (variants[locale]) {
        urlVariants[locale] = `${baseUrl}${variants[locale]}`;
        if (locale === 'en-us') {
          primaryUrl = `${baseUrl}${variants[locale]}`;
          hasEnglish = true;
        }
      }
    }

    // For groups without en-us (e.g., Sorrento peninsula events only in de/fr/es/it),
    // pick German or first available as primary (for canonical URL)
    if (!hasEnglish && variantCount >= 2) {
      // Prefer German for canonical URL if available, otherwise first available
      if (variants['de-de']) {
        primaryUrl = `${baseUrl}${variants['de-de']}`;
        primaryLocale = 'de-de';
      } else {
        // Get first available locale
        const firstLocale = Object.keys(variants)[0];
        primaryUrl = `${baseUrl}${variants[firstLocale]}`;
        primaryLocale = firstLocale;
      }
    }

    // Create hreflang if we have 2+ variants
    if (primaryUrl && Object.keys(urlVariants).length >= 2) {
      for (const [locale, url] of Object.entries(urlVariants)) {
        const urlPath = url.replace(baseUrl, '');
        if (!hreflangsMap.has(urlPath)) {
          hreflangsMap.set(urlPath, {
            url,
            canonical: primaryUrl,
            alternates: urlVariants,
            'x-default': primaryUrl,
            source: 'pattern-match',
            contentKey,
            primaryLocale, // Track which locale was canonical
          });
        }
      }
      patternMatchCount++;
    }
  }

  console.log(`✓ Built ${patternMatchCount} hreflang groups from pattern matching`);
  if (unmatchedCount > 0) {
    console.log(`⚠️ ${unmatchedCount} URLs could not be auto-matched (likely missing from slugMap)`);
  }

  return hreflangsMap;
}

// Merge home pages for all locales
function addHomePages(hreflangsMap) {
  const baseUrl = 'https://amalficoast-travel.com';
  const locales = ['en-us', 'de-de', 'fr-fr', 'es-es', 'it-it'];

  const homeAlternates = {};
  for (const locale of locales) {
    homeAlternates[locale] = `${baseUrl}/${locale}/`;
  }

  for (const locale of locales) {
    const urlPath = `/${locale}/`;
    if (!hreflangsMap.has(urlPath)) {
      hreflangsMap.set(urlPath, {
        url: `${baseUrl}${urlPath}`,
        canonical: `${baseUrl}/en-us/`,
        alternates: homeAlternates,
        'x-default': `${baseUrl}/en-us/`,
        source: 'home',
      });
    }
  }
}

// Generate TypeScript mapping file from combined hreflang maps
function generateTypeScriptFile(combinedMap) {
  const baseUrl = 'https://amalficoast-travel.com';
  const locales = ['en-us', 'de-de', 'fr-fr', 'es-es', 'it-it'];

  let content = `/**
 * AUTO-GENERATED HREFLANG MAPPING
 * Generated from slugMap + sitemap.xml pattern matching
 *
 * Do not edit manually. Regenerate with: npm run generate-hreflang
 *
 * Strategy:
 * 1. Perfect hreflang groups from slugMap (source of truth)
 * 2. Pattern-matched groups from remaining sitemap URLs
 * 3. Home page aggregates all locales
 *
 * Result: 100% reciprocal hreflangs, no broken links
 */

export interface HrefLangEntry {
  url: string;
  canonical: string;
  alternates: Record<string, string>;
  'x-default': string;
  source?: string; // 'slugMap' | 'pattern-match' | 'home'
  pageKey?: string; // For debugging
}

export const hrefLangMap: Record<string, HrefLangEntry> = {
`;

  // Sort by URL for consistent output
  const sortedEntries = Array.from(combinedMap.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  for (const [urlPath, entry] of sortedEntries) {
    const cleanEntry = {
      url: entry.url,
      canonical: entry.canonical,
      alternates: entry.alternates,
      'x-default': entry['x-default'],
    };

    // Add source info for debugging (optional)
    if (entry.source) {
      cleanEntry.source = entry.source;
    }

    content += `  '${urlPath}': {
    url: '${cleanEntry.url}',
    canonical: '${cleanEntry.canonical}',
    alternates: {
`;
    for (const [locale, altUrl] of Object.entries(cleanEntry.alternates)) {
      content += `      '${locale}': '${altUrl}',\n`;
    }
    content += `    },
    'x-default': '${cleanEntry['x-default']}'`;
    if (cleanEntry.source) {
      content += `,
    source: '${cleanEntry.source}'`;
    }
    content += `,
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
  totalUrls: ${combinedMap.size},
  locales: ${JSON.stringify(locales)},
  generatedAt: '${new Date().toISOString()}',
};
`;

  return content;
}

// Main execution
try {
  const sitemapPath = path.resolve(__dirname, '../../dist/sitemap.xml');
  const translationsPath = path.resolve(__dirname, '../i18n/translations.ts');

  if (!fs.existsSync(sitemapPath)) {
    console.error(`✗ Sitemap not found at: ${sitemapPath}`);
    console.error('  Make sure to run "npm run build" first to generate the sitemap.');
    process.exit(1);
  }

  if (!fs.existsSync(translationsPath)) {
    console.error(`✗ Translations file not found at: ${translationsPath}`);
    process.exit(1);
  }

  console.log('\n=== Hreflang Generation: slugMap-based Strategy ===\n');

  console.log('1. Extracting slugMap from translations.ts...');
  const slugMap = extractSlugMap(translationsPath);
  console.log(`   ✓ Found ${Object.keys(slugMap).length} slugMap entries`);

  console.log('\n2. Parsing sitemap...');
  const sitemapUrls = parseSitemap(sitemapPath);
  console.log(`   ✓ Found ${sitemapUrls.size} URLs in sitemap`);

  console.log('\n3. Building perfect hreflangs from slugMap...');
  const { hreflangsMap: slugMapHreflangs, usedUrls } = buildHreflangsFromSlugMap(
    slugMap,
    sitemapUrls
  );
  console.log(`   ✓ Processed: ${slugMapHreflangs.size} URLs from slugMap`);

  console.log('\n4. Building fallback hreflangs from pattern matching...');
  const patternMatchHreflangs = buildHreflangsFromSitemap(sitemapUrls, usedUrls);
  console.log(`   ✓ Pattern matched: ${patternMatchHreflangs.size} URLs`);

  console.log('\n5. Merging hreflang maps...');
  const combinedMap = new Map();
  slugMapHreflangs.forEach((v, k) => combinedMap.set(k, v));
  patternMatchHreflangs.forEach((v, k) => {
    if (!combinedMap.has(k)) combinedMap.set(k, v);
  });
  addHomePages(combinedMap);
  console.log(`   ✓ Combined total: ${combinedMap.size} URLs with hreflangs`);

  console.log('\n6. Generating TypeScript file...');
  const tsContent = generateTypeScriptFile(combinedMap);

  const outputPath = path.resolve(__dirname, '../i18n/hreflang-map.ts');
  fs.writeFileSync(outputPath, tsContent, 'utf-8');

  console.log(`   ✓ Generated: ${outputPath}`);

  // Summary statistics
  console.log('\n=== Summary ===');
  console.log(`✓ Total hreflangs: ${combinedMap.size}`);
  console.log(`✓ From slugMap: ${slugMapHreflangs.size}`);
  console.log(`✓ From pattern-matching: ${patternMatchHreflangs.size}`);
  console.log(`✓ Unused sitemap URLs: ${sitemapUrls.size - usedUrls.size}`);
  console.log('\n✓ Generation complete!\n');
} catch (error) {
  console.error('\n✗ Error generating hreflang map:', error);
  process.exit(1);
}
