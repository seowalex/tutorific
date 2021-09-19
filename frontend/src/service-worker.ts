/// <reference lib="webworker" />
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { googleFontsCache, imageCache } from 'workbox-recipes';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, NetworkOnly } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// eslint-disable-next-line no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(`${process.env.PUBLIC_URL}/index.html`)
);

imageCache({
  warmCache: [
    '/assets/icon/favicon.png',
    '/assets/icon/icon.png',
    '/assets/icon/maskable.png',
    '/assets/welcome.png',
  ],
});

googleFontsCache();

// Cache successful API GET queries
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

const backgroundSync = new NetworkOnly({
  plugins: [
    new BackgroundSyncPlugin('offlineQueue', {
      onSync: async ({ queue }) => {
        await queue.replayRequests();
        const clients = await self.clients.matchAll();

        for (const client of clients) {
          client.postMessage({});
        }
      },
    }),
  ],
});

// Retry failed API POST queries when online
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.startsWith('/api/'),
  backgroundSync,
  'POST'
);

// Retry failed API PUT queries when online
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.startsWith('/api/'),
  backgroundSync,
  'PUT'
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
