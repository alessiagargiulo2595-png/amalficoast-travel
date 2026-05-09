import type { APIRoute } from 'astro';
import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

const BASE = 'https://amalficoast-travel.com';
const TODAY = new Date().toISOString().split('T')[0];

// Read redirect sources from _redirects file
function getRedirectSources(): Set<string> {
  const sources = new Set<string>();
  try {
    const redirectsPath = join(process.cwd(), 'public', '_redirects');
    const content = readFileSync(redirectsPath, 'utf-8');
    const lines = content.split('\n');

    for (const line of lines) {
      // Skip comments and empty lines
      if (!line.trim() || line.trim().startsWith('#')) continue;

      // Extract source URL (first column)
      const parts = line.trim().split(/\s+/);
      if (parts[0]) {
        sources.add(parts[0]);
      }
    }
  } catch (error) {
    console.warn('Could not read _redirects file:', error);
  }
  return sources;
}

// Function to recursively find all HTML files in dist directory
function getAllPages(dir: string, prefix = ''): string[] {
  const pages: string[] = [];

  try {
    const files = readdirSync(dir);

    for (const file of files) {
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        // Recursively search subdirectories
        const subPages = getAllPages(fullPath, prefix + '/' + file);
        pages.push(...subPages);
      } else if (file === 'index.html') {
        // Found an index.html, add its path
        const pagePath = prefix === '' ? '/' : prefix + '/';
        pages.push(pagePath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return pages;
}

function getPriority(url: string): string {
  // Home pages
  if (url.match(/^\/(en-us|de-de|fr-fr|es-es|it-it)\/?$/)) {
    return '1.0';
  }

  // Hub pages (beaches, islands, itineraries, events, guide, etc.)
  if (url.match(/(beaches|islands|itineraries|events|destinos|playas|islas|itinerarios|eventos|strande|inseln|reiserouten|veranstaltungen|plages|iles|itineraires|cote-amalfitaine|amalfikueste|amalfi-coast|costiera-amalfitana|penisola-sorrentina|spiagge|destinazioni|esperienze|experiences|experiences|guide|ratgeber|guia|pratico|guides)\/$/)) {
    return '0.9';
  }

  // Destination pages and region hubs
  if (url.match(/(positano|amalfi|ravello|praiano|maiori|minori|capri|ischia|procida|sorrentina|sorrento|costa-amalfitana|peninsula-sorrentina|amalfikueste|sorrentinische-halbinsel|cote-amalfitaine|peninsule-sorrentine|peninsula-sorrentina|penisola-sorrentina|spiaggia|massa-lubrense|vico-equense|sant-agnello)\/$/)) {
    return '0.8';
  }

  // Blog pages
  if (url.includes('/blog/')) {
    return '0.6';
  }

  // Event detail pages
  if (url.match(/\/eventi|eventos|veranstaltungen|evenements|events/)) {
    return '0.6';
  }

  // Itinerary detail pages
  if (url.match(/(itineraries|reiserouten|itineraires|itinerarios|itinerari)\//) && !url.endsWith('/')) {
    return '0.7';
  }

  // Guide pages
  if (url.match(/(guide|ratgeber|guia|pratico)\//)) {
    return '0.7';
  }

  // Planning pages
  if (url.match(/planning|planificacion|planung|planification|pianificazione/)) {
    return '0.8';
  }

  // Experiences/Esperienze
  if (url.match(/experiences|esperienze|erlebnisse|experiences|experencias/)) {
    return '0.7';
  }

  // Everything else
  return '0.7';
}

function getChangefreq(url: string): string {
  // Home pages
  if (url.match(/^\/(en-us|de-de|fr-fr|es-es|it-it)\/?$/)) {
    return 'weekly';
  }

  // Hub pages
  if (url.match(/(beaches|islands|itineraries|events|destinos|playas|islas|itinerarios|eventos|strande|inseln|reiserouten|veranstaltungen|plages|iles|itineraires|cote-amalfitaine|amalfikueste|amalfi-coast|costiera-amalfitana|penisola-sorrentina|spiagge|destinazioni|esperienze|experiences|guide|ratgeber|guia|pratico)\/$|guide|ratgeber/)) {
    return 'monthly';
  }

  // Blog and events
  if (url.includes('/blog/') || url.match(/\/eventi|eventos|veranstaltungen|evenements|events/)) {
    return 'yearly';
  }

  // Planning pages
  if (url.match(/planning|planificacion|planung|planification|pianificazione/)) {
    return 'monthly';
  }

  // Default
  return 'monthly';
}

export const GET: APIRoute = async () => {
  const distDir = join(process.cwd(), 'dist');
  const pages = getAllPages(distDir);

  // Get all redirect sources that should NOT be in sitemap
  const redirectSources = getRedirectSources();

  // Filter out 404 pages and redirect sources
  const filteredPages = pages.filter(page => {
    // Exclude 404 pages
    if (page.includes('/404')) return false;

    // Exclude pages that are source of redirects
    if (redirectSources.has(page)) return false;

    return true;
  });

  // Sort pages for consistent output
  filteredPages.sort();

  const urls = filteredPages.map(page => ({
    loc: page,
    priority: getPriority(page),
    changefreq: getChangefreq(page),
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE}${u.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
