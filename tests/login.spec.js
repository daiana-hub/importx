const { test, expect } = require('@playwright/test');
const { USER_EMAIL, USER_PASSWORD } = require('../utils/env');
const { LoginPage } = require('../pages/LoginPage');

test('login', async ({ page, baseURL }) => {
  const loginPage = new LoginPage(page);
  try {
    await loginPage.goto();
    await expect(page).toHaveURL(/login/);

    // Login usando método da page object
    await loginPage.login(USER_EMAIL, USER_PASSWORD);

    // Verificar se entrou na aplicação
    await expect(page).not.toHaveURL(/login/);
  } catch (error) {
    await page.screenshot({ path: 'login-error.png' });
    throw error;
  }
});
