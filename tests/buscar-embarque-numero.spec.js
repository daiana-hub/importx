require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { EmbarquesPage } = require('../pages/EmbarquesPage');
const embarquesLocators = require('../locators/embarques');

test.use({ launchOptions: { slowMo: 500 } });
const numeroEmbarque = '5000000848';

test('buscar embarque por número 5000000848', async ({ page }) => {

  // Realizar login manual
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

  // Acessar tela de embarques
  const embarquesPage = new EmbarquesPage(page);
  await embarquesPage.goto();

  // Pesquisar pelo número do embarque simulando digitação lenta usando locator correto
  await embarquesPage.pesquisaInput.waitFor({ state: 'visible', timeout: 10000 });
  await embarquesPage.pesquisaInput.click();
  await embarquesPage.pesquisaInput.type(numeroEmbarque, { delay: 200 });
  await page.keyboard.press('Enter');

  // Esperar o resultado aparecer usando locator centralizado
  await page.waitForSelector(embarquesLocators.boardingNumber);

  // Screenshot para debug
  await page.screenshot({ path: `embarque-${numeroEmbarque}-debug.png` });

  // Verificar se pelo menos um resultado esperado aparece usando locator centralizado
  const resultados = await embarquesPage.resultadoPorNumero(numeroEmbarque);
  const count = await resultados.count();
  expect(count).toBeGreaterThan(0);
});
