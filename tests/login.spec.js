require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const loginLocators = require('../locators/login');

// Ignora storageState para garantir que não use cache/sessão
test.use({ storageState: undefined });

const chromeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

test.use({ userAgent: chromeUserAgent });

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });
  test('login inválido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.evaluate(() => localStorage.clear());
    await loginPage.login('usuario.invalido@exemplo.com', 'senhaErrada123');
    await expect(page.locator(loginLocators.errorMessage)).toBeVisible();
  });

  test('login válido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.evaluate(() => localStorage.clear());
    // Use as credenciais do .env
    const email = process.env.USER_EMAIL || 'usuario.valido@exemplo.com';
    const senha = process.env.USER_PASSWORD || 'senhaCorreta123';
    await loginPage.login(email, senha);
    // Aguarda redirecionamento para /pt após login
    await page.waitForURL(/\/pt$/, { timeout: 15000 });
    await page.screenshot({ path: 'login-valido-debug.png' });
    // Se falhar, verifica se há mensagem de erro na tela
    const erroVisivel = await page.locator(loginLocators.errorMessage).isVisible();
    if (erroVisivel) {
      const erroTexto = await page.locator(loginLocators.errorMessage).innerText();
      throw new Error('Mensagem de erro exibida após login válido: ' + erroTexto);
    }
    // Verifique se redirecionou para a home ou dashboard
    await expect(page).toHaveURL(/\/pt$/);
  });
});
