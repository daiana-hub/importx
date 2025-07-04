const { test, expect } = require('@playwright/test');
const { EmbarquesPage } = require('../pages/EmbarquesPage');

test('login', async ({ page }) => {
  // Teste de login não faz sentido com storageState, pode ser removido ou marcado como skip
  test.skip();
});
