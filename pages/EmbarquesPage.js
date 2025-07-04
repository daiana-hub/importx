// pages/EmbarquesPage.js
class EmbarquesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.pesquisaInput = page.getByTestId('base-input');
    this.resultFornecedor = page.locator('h2.sc-eced4ead-0');
    this.resultList = page.getByTestId('badge-importer-name');
  }

  async goto() {
    await this.page.goto('/pt');
    await this.page.waitForURL(/\/pt$/);
    await this.page.waitForLoadState('networkidle');
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
}

module.exports = { EmbarquesPage };
