import { defineMiddleware } from 'astro:middleware';

// Supported language locales
const SUPPORTED_LOCALES = ['en-us', 'de-de', 'fr-fr', 'es-es', 'it-it'];

// Define middleware
export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Get the response
  const response = await next();

  // Check if it's a 404 response
  if (response.status === 404) {
    // Extract locale from pathname
    const pathParts = pathname.split('/').filter(part => part.length > 0);
    const firstSegment = pathParts[0];

    // Check if first segment is a supported locale
    if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment.toLowerCase())) {
      const locale = firstSegment.toLowerCase();
      // Redirect to language-specific 404 page
      return context.redirect(`/${locale}/404/`, 404);
    }

    // For requests without locale prefix, redirect to default locale 404
    return context.redirect('/en-us/404/', 404);
  }

  return response;
});
