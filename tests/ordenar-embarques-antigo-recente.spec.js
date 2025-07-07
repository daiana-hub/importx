const { test, expect } = require('@playwright/test');
const { EmbarquesPage } = require('../pages/EmbarquesPage');

test.use({ launchOptions: { slowMo: 500 } });

test('ordenar embarques do mais antigo para o mais recente pelo listbox', async ({ page }) => {
  // Acessar tela de embarques
  const embarquesPage = new EmbarquesPage(page);
  await embarquesPage.goto();

  // Clicar no elemento que abre as opções de ordenação
  await page.click('[data-testid="option-selected"]');

  // Selecionar a opção "Mais antigo" pelo data-testid
  await page.click('[data-testid="box-option-1"]');

  // Aguarda ordenação
  await page.waitForTimeout(2000);

  // Captura as datas dos embarques listados
  const datas = await page.$$eval('td[data-testid="embarque-date"]', nodes => nodes.map(n => n.textContent.trim()));

  // Converte as datas para objetos Date (ajuste o formato conforme necessário)
  const datasConvertidas = datas.map(d => new Date(d.split('/').reverse().join('-')));

  // Verifica se está ordenado do mais antigo para o mais recente
  for (let i = 1; i < datasConvertidas.length; i++) {
    expect(datasConvertidas[i] >= datasConvertidas[i-1]).toBeTruthy();
  }
});
