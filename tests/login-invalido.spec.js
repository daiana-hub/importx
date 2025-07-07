const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

// Teste de login inválido

test('login inválido', async ({ page }) => {
  // Este teste deve ser rodado sem storageState!
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // Tentar login com dados inválidos
  await loginPage.login('usuario.invalido@exemplo.com', 'senhaErrada123');

  // Verificar se mensagem de erro aparece
  await expect(page.locator('text=E-mail ou senha incorretos.')).toBeVisible();
});
