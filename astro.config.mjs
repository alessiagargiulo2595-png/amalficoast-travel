import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://amalficoast-travel.com',
  integrations: [
    tailwind(),
  ],
  i18n: {
    defaultLocale: 'en-us',
    locales: ['en-us', 'de-de', 'fr-fr', 'es-es', 'it-it'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
