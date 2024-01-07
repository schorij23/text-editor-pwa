const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
// Precache and route all the assets defined in the Webpack manifest
precacheAndRoute(self.__WB_MANIFEST);
// Set up page cache strategy
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // Cache responses with HTTP status codes 0 and 200
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Set expiration for the cached responses (30 days)
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
// Warm the page cache by preloading specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});
// The precacheAndRoute() method takes an array of URLs to precache. The self._WB_MANIFEST is an array that contains the list of URLs to precache
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// Set up asset cache strategy
registerRoute(
  // Here we define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
new StaleWhileRevalidate({
  // Name of the cache
  cacheName: 'asset-cache',
  // This plugin will cache responses with these headers to a maximum-age of 30 days
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
})
);
