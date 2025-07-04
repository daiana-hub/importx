const { test, expect } = require('@playwright/test');
const { EmbarquesPage } = require('../pages/EmbarquesPage');

// Teste de busca por fornecedor

test('buscar embarque por fornecedor Fornecedor 280', async ({ page }) => {
  // Acessar tela de embarques
  const embarquesPage = new EmbarquesPage(page);
  await embarquesPage.goto();

  // Pesquisar por fornecedor Fornecedor 280
  await embarquesPage.pesquisar('Fornecedor 280');

  // Espera extra para garantir carregamento
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'fornecedor-280-debug.png' });

  // Verificar se pelo menos um resultado esperado aparece
  const resultados = page.locator('h2.sc-eced4ead-0', { hasText: 'Fornecedor 280' });
  const count = await resultados.count();
  expect(count).toBeGreaterThan(0);
});
