import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

test('retired worker clears only scoped cached responses and reloads only scoped clients', async () => {
  const scope = 'https://example.test/app/';
  const saved = new Set([scope + 'static/js/old.chunk.js', scope + 'index.html', 'https://example.test/other-app/file.js', 'https://cdn.example.test/library.js']);
  const navigated = [];
  const events = {};
  let skipped = 0, unregistered = 0;
  const self = {
    addEventListener: (name, handler) => { events[name] = handler; },
    skipWaiting: async () => { skipped++; },
    registration: { scope, unregister: async () => { unregistered++; } },
    clients: { matchAll: async () => [
      { url: scope + '#/dashboard', navigate: async url => navigated.push(url) },
      { url: 'https://example.test/other-app/', navigate: async url => navigated.push(url) },
    ] },
  };
  const caches = {
    keys: async () => ['legacy-precache'],
    open: async () => ({ keys: async () => [...saved].map(url => ({ url })), delete: async request => saved.delete(request.url) }),
  };
  vm.runInNewContext(readFileSync(new URL('../public/service-worker.js', import.meta.url), 'utf8'), { self, caches });
  let work;
  events.install({ waitUntil: promise => { work = promise; } });
  await work;
  events.activate({ waitUntil: promise => { work = promise; } });
  await work;
  assert.equal(skipped, 1);
  assert.equal(unregistered, 1);
  assert.deepEqual([...saved], ['https://example.test/other-app/file.js', 'https://cdn.example.test/library.js']);
  assert.deepEqual(navigated, [scope + '#/dashboard']);
  assert.equal(events.fetch, undefined);
});
