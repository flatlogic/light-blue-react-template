// Retire the old CRA worker and cached files belonging to this app's scope.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  const scope = self.registration.scope;
  for (const name of await caches.keys()) {
    const cache = await caches.open(name);
    for (const request of await cache.keys()) {
      if (request.url.startsWith(scope)) {
        await cache.delete(request);
      }
    }
  }
  await self.registration.unregister();
  const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  await Promise.all(windows.filter(client => client.url.startsWith(scope)).map(client => client.navigate(client.url)));
})()));
