import { defineMiddleware } from 'astro:middleware';

// Supported language locales
const SUPPORTED_LOCALES = ['en-us', 'de-de', 'fr-fr', 'es-es', 'it-it'];

// Define middleware
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Check if it's a 404 response
  if (response.status === 404) {
    const url = new URL(context.request.url);
    const pathname = url.pathname;

    // Extract locale from pathname
    const pathParts = pathname.split('/').filter(part => part.length > 0);
    const firstSegment = pathParts[0];

    // Determine the locale
    let locale = 'en-us';
    if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment.toLowerCase())) {
      locale = firstSegment.toLowerCase();
    }

    // Fetch the language-specific 404 page
    try {
      const notFoundResponse = await fetch(`${url.origin}/${locale}/404/index.html`);
      if (notFoundResponse.ok) {
        const body = await notFoundResponse.text();
        return new Response(body, {
          status: 404,
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }
    } catch (e) {
      // Fallback if fetch fails
    }
  }

  return response;
});
