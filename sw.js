const VERSION = '20260925-v49';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => Promise.all(clients.map(c => c.navigate(c.url))))
  );
});

// תמיד טען מהרשת
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(e.request))
  );
});
