
require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { EmbarquesPage } = require('../pages/EmbarquesPage');
const embarquesLocators = require('../locators/embarques');

// Dados de input centralizados e parametrizados
const BUSCA_CENARIOS = [
  {
    nome: 'buscar embarque por número',
    termo: '5000000848',
    tipo: 'numero',
    resultadoLocator: async (page, embarquesPage, termo) => embarquesPage.resultadoPorNumero(termo),
    screenshot: termo => `embarque-${termo}-debug.png`,
    espera: async (page, embarquesPage, termo) => page.waitForSelector(embarquesLocators.boardingNumber),
  },
  {
    nome: 'buscar embarque por importadora',
    termo: 'Royal',
    tipo: 'importadora',
    resultadoLocator: async (page, embarquesPage, termo) => page.locator(embarquesLocators.resultList).filter({ hasText: new RegExp(termo, 'i') }),
    screenshot: () => 'royal-debug.png',
    espera: async (page, embarquesPage, termo) => page.locator(embarquesLocators.resultList).filter({ hasText: new RegExp(termo, 'i') }).first().waitFor({ state: 'visible', timeout: 10000 }),
  },
  {
    nome: 'buscar embarque por fornecedor',
    termo: 'Fornecedor 194',
    tipo: 'fornecedor',
    resultadoLocator: async (page, embarquesPage, termo) => page.locator(embarquesLocators.resultFornecedor).filter({ hasText: termo }),
    screenshot: () => 'fornecedor-194-debug.png',
    espera: async (page, embarquesPage, termo) => page.locator(embarquesLocators.resultFornecedor).filter({ hasText: termo }).first().waitFor({ state: 'visible', timeout: 10000 }),
  },
];

test.use({ launchOptions: { slowMo: 500 } });

test.describe('Cenários de busca de embarques', () => {
  for (const cenario of BUSCA_CENARIOS) {
    test(cenario.nome, async ({ page }) => {
      // Realizar login manual
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
      // Screenshot e log do HTML após login para depuração
      await page.screenshot({ path: `login-pos-login-${cenario.tipo}.png` });
      const html = await page.content();
      console.log(`[${cenario.nome}] HTML após login:`, html);
      // Aguarda redirecionamento para /pt após login
      await page.waitForURL(/\/pt$/, { timeout: 15000 });
      // Acessar tela de embarques
      const embarquesPage = new EmbarquesPage(page);
      await embarquesPage.goto();
      // Pesquisar termo
      await embarquesPage.pesquisaInput.waitFor({ state: 'visible', timeout: 10000 });
      await embarquesPage.pesquisaInput.click();
      await embarquesPage.pesquisaInput.type(cenario.termo, { delay: 200 });
      await page.keyboard.press('Enter');
      // Espera resultado específico
      await cenario.espera(page, embarquesPage, cenario.termo);
      // Screenshot para debug
      await page.screenshot({ path: cenario.screenshot(cenario.termo) });
      // Verificar se pelo menos um resultado esperado aparece
      const resultados = await cenario.resultadoLocator(page, embarquesPage, cenario.termo);
      const count = await resultados.count();
      if (cenario.tipo === 'fornecedor') {
        console.log('Quantidade de resultados encontrados:', count);
      }
      expect(count).toBeGreaterThan(0);
    });
  }
});
