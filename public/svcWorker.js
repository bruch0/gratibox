/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'task-manager-pwa';
const urlsToCache = ['/', '/completed'];

// Install service worker
self.addEventListener('install', (event) => {
  // Perform the install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache opened');
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return the requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return response as Cache is hit
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['task-manager-pwa'];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        // eslint-disable-next-line consistent-return
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
