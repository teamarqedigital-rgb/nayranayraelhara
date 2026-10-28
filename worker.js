self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Instalando...');
  event.waitUntil(
    caches.open('nayra-cache').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './nayra.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
