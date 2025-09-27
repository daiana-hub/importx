require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { EmbarquesPage } = require('../pages/EmbarquesPage');
const ordenacaoLocators = require('../locators/ordenacao');

test.use({ launchOptions: { slowMo: 500 } });

test('ordenar embarques do mais antigo para o mais recente pelo listbox', async ({ page }) => {
  // Realizar login manual
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
  // Aguarda redirecionamento para /pt após login
  await page.waitForURL(/\/pt$/, { timeout: 15000 });

  // Acessar tela de embarques
  const embarquesPage = new EmbarquesPage(page);
  await embarquesPage.goto();

  // Garante que está na tela de embarques
  await expect(page).toHaveURL(/\/pt$/);

  // Clicar no elemento que abre as opções de ordenação
  await page.click(ordenacaoLocators.optionSelected);

  // Selecionar a opção "Mais antigo" pelo data-testid
  await page.click(ordenacaoLocators.boxOptionMaisAntigo);

  // Aguarda ordenação
  await page.waitForTimeout(2000);

  // Captura as datas dos embarques listados
  const datas = await page.$$eval(ordenacaoLocators.embarqueDate, nodes => nodes.map(n => n.textContent.trim()));

  // Converte as datas para objetos Date (ajuste o formato conforme necessário)
  const datasConvertidas = datas.map(d => new Date(d.split('/').reverse().join('-')));

  // Verifica se está ordenado do mais antigo para o mais recente
  for (let i = 1; i < datasConvertidas.length; i++) {
    expect(datasConvertidas[i] >= datasConvertidas[i-1]).toBeTruthy();
  }
});
