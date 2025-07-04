const { chromium } = require('@playwright/test');
require('dotenv').config();

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://qas.importx.app/pt/login?next=%2Fpt');
  await page.fill('input[name="email"]', process.env.USER_EMAIL);
  await page.fill('input[name="password"]', process.env.USER_PASSWORD);
  await page.getByTestId('base-button-container-primary').click();
  await page.waitForURL('**/pt');
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
})();
