// Post-build: copy per-language 404 pages to 404.html format for Cloudflare Pages
// Cloudflare looks for 404.html in each directory, not 404/index.html
import { copyFileSync, existsSync } from 'fs';

const locales = ['it-it', 'en-us', 'de-de', 'es-es', 'fr-fr'];

for (const locale of locales) {
  const src = `dist/${locale}/404/index.html`;
  const dest = `dist/${locale}/404.html`;
  if (existsSync(src)) {
    copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  }
}
