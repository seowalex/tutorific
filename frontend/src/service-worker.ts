/// <reference lib="webworker" />
import storage from 'localforage';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';
import { WorkboxError } from 'workbox-core/_private';
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { googleFontsCache, imageCache } from 'workbox-recipes';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, NetworkOnly } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// eslint-disable-next-line no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = /\/[^/?]+\.[^/]+$/;
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
    if (fileExtensionRegexp.test(url.pathname)) {
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

// Matches all strings starting with '/api/' but not '/api/auth/'
const apiRegexp = /^\/api\/(?!auth\/)/;

// Cache successful API GET queries
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && apiRegexp.test(url.pathname),
  new NetworkFirst({
    cacheName: 'api',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

// Custom logic to get a new auth token before replaying requests
const backgroundSync = new NetworkOnly({
  plugins: [
    new BackgroundSyncPlugin('offlineQueue', {
      onSync: async ({ queue }) => {
        const auth = JSON.parse(
          JSON.parse((await storage.getItem('persist:root')) as string).auth
        );

        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            userId: auth.id,
            refreshToken: auth.refreshToken,
          }),
        });
        const data = await response.json();

        let entry;

        /* eslint-disable no-await-in-loop, no-cond-assign */
        while ((entry = await queue.shiftRequest())) {
          try {
            const request = entry.request.clone();
            request.headers.set('Authorization', `Bearer ${data.jwtToken}`);

            await fetch(request);
          } catch (error) {
            await queue.unshiftRequest(entry);

            throw new WorkboxError('queue-replay-failed', {
              name: 'offlineQueue',
            });
          }
        }
        /* eslint-enable no-await-in-loop, no-cond-assign */

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
    url.origin === self.location.origin && apiRegexp.test(url.pathname),
  backgroundSync,
  'POST'
);

// Retry failed API PUT queries when online
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && apiRegexp.test(url.pathname),
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

self.addEventListener('push', async (event) => {
  const data = event.data?.json();
  const clients = await self.clients.matchAll();

  self.registration.showNotification(data.title, data);

  for (const client of clients) {
    client.postMessage(data);
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  self.clients.openWindow(`/chats/${event.notification.tag}`);
});
