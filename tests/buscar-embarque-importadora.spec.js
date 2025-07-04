const { test, expect } = require('@playwright/test');
const { EmbarquesPage } = require('../pages/EmbarquesPage');

// Teste de busca por importadora

test('buscar embarque por importadora Royal', async ({ page }) => {
  // Acessar tela de embarques
  const embarquesPage = new EmbarquesPage(page);
  await embarquesPage.goto();

  // Pesquisar por importadora Royal
  await embarquesPage.pesquisar('Royal');

  // Screenshot para debug
  await page.screenshot({ path: 'royal-debug.png' });

  // Verificar se pelo menos um resultado esperado aparece (case-insensitive)
  const resultados = page.locator('text=/royal/i');
  const count = await resultados.count();
  expect(count).toBeGreaterThan(0);
});
