// locators.js
// Centraliza todos os seletores utilizados nos Page Objects e testes

module.exports = {
  login: {
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    loginButton: '[data-testid="base-button-container-primary"]',
    errorMessage: 'text=E-mail ou senha incorretos.'
  },
  embarques: {
    boardingNumber: '[data-testid="row-item-boardingNumber"]',
    boardingNumberWithText: (numero) => `[data-testid="row-item-boardingNumber"]:has-text("${numero}")`,
    // Adicione outros seletores conforme necessário
  }
};
