const { chromium } = require('@playwright/test');
require('dotenv').config();

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://qas.importx.app/pt/login');
  await page.fill('[data-testid="base-input"][type="email"]', process.env.USER_EMAIL);
  await page.fill('[data-testid="base-input"][type="password"]', process.env.USER_PASSWORD);
  await page.keyboard.press('Enter');
  await page.waitForURL('https://qas.importx.app/pt');
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
})();
