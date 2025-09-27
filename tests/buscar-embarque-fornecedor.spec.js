require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { EmbarquesPage } = require('../pages/EmbarquesPage');
const embarquesLocators = require('../locators/embarques');
test.use({ launchOptions: { slowMo: 500 } });

// Teste de busca por fornecedor

test('buscar embarque por fornecedor Fornecedor 194', async ({ page }) => {

  // Realizar login manual
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

  // Acessar tela de embarques
  const embarquesPage = new EmbarquesPage(page);
  await embarquesPage.goto();

  // Digitar o nome do fornecedor mais devagar usando locator correto
  const termo = 'Fornecedor 194';
  await embarquesPage.pesquisaInput.waitFor({ state: 'visible', timeout: 10000 });
  await embarquesPage.pesquisaInput.click();
  await embarquesPage.pesquisaInput.type(termo, { delay: 200 });
  await page.keyboard.press('Enter');

  // Screenshot para debug
  await page.screenshot({ path: 'fornecedor-194-debug.png' });

  // Aguarda que pelo menos um resultado com o termo esteja visível antes de contar
  const resultados = page.locator(embarquesLocators.resultFornecedor).filter({ hasText: termo });
  await resultados.first().waitFor({ state: 'visible', timeout: 10000 });
  const count = await resultados.count();
  console.log('Quantidade de resultados encontrados:', count);
  expect(count).toBeGreaterThan(0);
});
