const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  use: { channel: 'chrome', baseURL: 'http://127.0.0.1:4311', viewport: { width: 1440, height: 1000 }, trace: 'retain-on-failure' },
  webServer: { command: process.env.PLAYWRIGHT_DEV ? 'npm start -- --port 4311 --strictPort' : 'npm run preview -- --port 4311 --strictPort', url: 'http://127.0.0.1:4311' },
});
