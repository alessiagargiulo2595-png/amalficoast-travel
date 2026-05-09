import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Validates that sitemap contains only URLs with status 200
 * - No redirect sources (301)
 * - No 404 pages
 * - All URLs must have corresponding index.html files
 */
async function validateSitemap() {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Read sitemap
    const sitemapPath = join(process.cwd(), 'dist', 'sitemap.xml');
    if (!existsSync(sitemapPath)) {
      errors.push('❌ Sitemap file not found at dist/sitemap.xml');
      throw new Error('Sitemap validation failed');
    }

    const sitemapContent = readFileSync(sitemapPath, 'utf-8');

    // Extract all URLs from sitemap
    const urlMatches = sitemapContent.match(/<loc>https:\/\/amalficoast-travel\.com(.*?)<\/loc>/g);
    if (!urlMatches || urlMatches.length === 0) {
      errors.push('❌ No URLs found in sitemap');
      throw new Error('Sitemap validation failed');
    }

    const sitemapUrls = urlMatches.map(match =>
      match.replace(/<loc>https:\/\/amalficoast-travel\.com/, '').replace(/<\/loc>/, '')
    );

    console.log(`\n📋 Validating ${sitemapUrls.length} URLs in sitemap...\n`);

    // Read redirect sources
    const redirectsPath = join(process.cwd(), 'public', '_redirects');
    const redirectSources = new Set<string>();

    if (existsSync(redirectsPath)) {
      const redirectsContent = readFileSync(redirectsPath, 'utf-8');
      const lines = redirectsContent.split('\n');

      for (const line of lines) {
        if (!line.trim() || line.trim().startsWith('#')) continue;
        const source = line.trim().split(/\s+/)[0];
        if (source) {
          redirectSources.add(source);
        }
      }
    }

    // Validate each URL
    let validUrls = 0;
    let invalidUrls = 0;

    for (const url of sitemapUrls) {
      // Check if URL is a redirect source (301)
      if (redirectSources.has(url)) {
        errors.push(
          `❌ REDIRECT SOURCE (301): ${url}\n   This URL redirects and should not be in sitemap`
        );
        invalidUrls++;
        continue;
      }

      // Check if URL is 404
      if (url.includes('/404')) {
        errors.push(`❌ 404 PAGE: ${url}\n   Error pages should not be in sitemap`);
        invalidUrls++;
        continue;
      }

      // Check if file exists in dist (corresponds to 200)
      let filePath: string;
      if (url.endsWith('/')) {
        filePath = join(process.cwd(), 'dist', url, 'index.html');
      } else {
        filePath = join(process.cwd(), 'dist', url + '/index.html');
      }

      if (!existsSync(filePath)) {
        errors.push(
          `❌ FILE NOT FOUND (404): ${url}\n   Expected file: ${filePath}`
        );
        invalidUrls++;
        continue;
      }

      validUrls++;
    }

    // Summary
    console.log(`✅ Valid URLs (200):        ${validUrls}`);
    console.log(`❌ Invalid URLs (301/404):  ${invalidUrls}`);

    if (errors.length > 0) {
      console.log('\n' + '='.repeat(70));
      console.log('VALIDATION ERRORS:\n');
      errors.forEach(error => console.log(error));
      console.log('='.repeat(70) + '\n');
      throw new Error(`Sitemap validation failed: ${errors.length} invalid URLs found`);
    }

    if (warnings.length > 0) {
      console.log('\n' + '='.repeat(70));
      console.log('WARNINGS:\n');
      warnings.forEach(warning => console.log(warning));
      console.log('='.repeat(70) + '\n');
    }

    console.log(`\n✅ Sitemap validation PASSED - all ${sitemapUrls.length} URLs return 200\n`);
  } catch (error) {
    console.error(`\n❌ Sitemap validation FAILED\n`);
    throw error;
  }
}

// Run validation
validateSitemap().catch(error => {
  process.exit(1);
});
