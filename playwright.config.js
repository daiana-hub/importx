// playwright.config.js
// Configuração padrão para Playwright
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'only-on-failure',
    baseURL: 'https://qas.importx.app',
    storageState: 'storageState.json',
  },
};

module.exports = config;
