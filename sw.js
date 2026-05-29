const CACHE = 'serials-v1';
const ASSETS = [
  '/serials-wheel/',
  '/serials-wheel/index.html',
  '/serials-wheel/manifest.json',
  '/serials-wheel/icon.svg',
  '/serials-wheel/sw.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
