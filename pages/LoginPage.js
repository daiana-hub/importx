const loginLocators = require('../locators/login');

// pages/LoginPage.js
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator(loginLocators.emailInput);
    this.passwordInput = page.locator(loginLocators.passwordInput);
    this.loginButton = page.locator(loginLocators.loginButton);
  }

  async goto() {
    const response = await this.page.goto('/pt/login?next=%2Fpt', { timeout: 60000 });
    if (response) {
      console.log('Status da resposta do goto:', response.status());
    } else {
      console.log('Nenhuma resposta recebida do goto.');
    }
  }

  async login(email, password) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 20000 });
    await this.loginButton.waitFor({ state: 'visible', timeout: 20000 });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.page.waitForTimeout(500); // pequeno delay para simular digitação humana
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
