import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://amalficoast-travel.com',
  integrations: [
    tailwind(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'en-gb', 'de', 'fr', 'es', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
