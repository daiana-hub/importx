// pages/EmbarquesPage.js
const embarquesLocators = require('../locators/embarques');

class EmbarquesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Ajusta para buscar o campo de pesquisa exclusivo da tela de embarques
    this.pesquisaInput = page.locator('[data-testid="base-input"][placeholder*="Pesquisar"]');
    this.resultFornecedor = page.locator(embarquesLocators.resultFornecedor);
    this.resultList = page.locator(embarquesLocators.resultList);
    this.boardingNumber = page.locator(embarquesLocators.boardingNumber);
  }

  async goto() {
    await this.page.goto('/pt');
    await this.page.waitForURL(/\/pt$/);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async pesquisar(termo) {
    await this.pesquisaInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.pesquisaInput.click();
    await this.pesquisaInput.fill(termo);
    await this.page.keyboard.press('Enter');
  }

  async resultadosFornecedorVisiveis(termo) {
    await this.page.waitForTimeout(1000);
    return this.resultFornecedor.filter({ hasText: termo });
  }

  async resultadosVisiveis(termo) {
    await this.page.waitForTimeout(1000);
    return this.resultList.filter({ hasText: termo });
  }

  async resultadoPorNumero(numero) {
    return this.page.locator(embarquesLocators.boardingNumberWithText(numero));
  }
}

module.exports = { EmbarquesPage };
