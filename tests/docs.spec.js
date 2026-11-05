const { test, expect } = require('@playwright/test');

test('published worker retires scoped cache entries without touching other app files', async ({ page, baseURL }) => {
  test.skip(!process.env.PLAYWRIGHT_DOCS, 'This verifies the published docs directory.');
  test.setTimeout(20000);
  await page.goto('./');
  await expect(page.getByRole('button', { name: /Login$/ })).toBeVisible();
  const scope = new URL('./', baseURL).href;
  await page.evaluate(async scope => {
    const cache = await caches.open('docs-retirement-probe');
    await cache.put(scope + 'old-hash.chunk.js', new Response('old'));
    await cache.put(new URL('../another-app/preserved.js', scope).href, new Response('keep'));
    await navigator.serviceWorker.register(scope + 'service-worker.js', { scope });
  }, scope);
  await page.waitForFunction(async scope => {
    const cache = await caches.open('docs-retirement-probe');
    return !await cache.match(scope + 'old-hash.chunk.js')
      && Boolean(await cache.match(new URL('../another-app/preserved.js', scope).href))
      && !await navigator.serviceWorker.getRegistration(scope);
  }, scope, { timeout: 10000 });
});
