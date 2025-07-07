const { test, expect } = require('@playwright/test');
const { EmbarquesPage } = require('../pages/EmbarquesPage');

test.use({ launchOptions: { slowMo: 500 } });

test('buscar embarque por número 5000000848', async ({ page }) => {
  // Acessar tela de embarques
  const embarquesPage = new EmbarquesPage(page);
  await embarquesPage.goto();

  // Pesquisar pelo número do embarque
  await embarquesPage.pesquisar('5000000848');

  // Esperar o resultado aparecer
  await page.waitForSelector('[data-testid="row-item-boardingNumber"]');

  // Screenshot para debug
  await page.screenshot({ path: 'embarque-5000000848-debug.png' });

  // Verificar se pelo menos um resultado esperado aparece usando seletor robusto
  const resultados = page.locator('[data-testid="row-item-boardingNumber"]:has-text("5000000848")');
  const count = await resultados.count();
  expect(count).toBeGreaterThan(0);
});
