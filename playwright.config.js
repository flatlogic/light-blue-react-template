const { defineConfig } = require('@playwright/test');
const docs = Boolean(process.env.PLAYWRIGHT_DOCS);
const baseURL = docs ? 'http://127.0.0.1:4311/light-blue-react-template/' : 'http://127.0.0.1:4311/';
module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  workers: 1,
  use: { channel: 'chrome', baseURL, viewport: { width: 1440, height: 1000 }, trace: 'retain-on-failure' },
  webServer: { command: docs ? 'npm run preview -- --outDir docs --base /light-blue-react-template/ --port 4311 --strictPort' : process.env.PLAYWRIGHT_DEV ? 'npm start -- --port 4311 --strictPort' : 'npm run preview -- --port 4311 --strictPort', url: baseURL },
});
