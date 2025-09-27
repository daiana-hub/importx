require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { EmbarquesPage } = require('../pages/EmbarquesPage');
const embarquesLocators = require('../locators/embarques');

test.use({ launchOptions: { slowMo: 500 } });

// Teste de busca por importadora

test('buscar embarque por importadora Royal', async ({ page }) => {

  // Realizar login manual
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
  // Aguarda redirecionamento para /pt após login
  await page.waitForURL(/\/pt$/, { timeout: 15000 });
  await page.screenshot({ path: 'login-pos-login.png' });

  // Acessar tela de embarques
  const embarquesPage = new EmbarquesPage(page);
  await embarquesPage.goto();

  // Pesquisar por importadora Royal com digitação lenta usando locator correto
  const termo = 'Royal';
  await embarquesPage.pesquisaInput.waitFor({ state: 'visible', timeout: 10000 });
  await embarquesPage.pesquisaInput.click();
  await embarquesPage.pesquisaInput.type(termo, { delay: 200 });
  await page.keyboard.press('Enter');

  // Screenshot para debug
  await page.screenshot({ path: 'royal-debug.png' });

  // Aguarda que pelo menos um resultado com "Royal" esteja visível antes de contar
  const resultados = page.locator(embarquesLocators.resultList).filter({ hasText: /royal/i });
  await resultados.first().waitFor({ state: 'visible', timeout: 10000 });
  const count = await resultados.count();
  expect(count).toBeGreaterThan(0);
});
