// locators/embarques.js
// Seletores centralizados para EmbarquesPage

module.exports = {
  pesquisaInput: '[data-testid="base-input"]',
  resultFornecedor: 'h2.sc-eced4ead-0',
  resultList: '[data-testid="badge-importer-name"]',
  boardingNumber: '[data-testid="row-item-boardingNumber"]',
  boardingNumberWithText: (numero) => `[data-testid="row-item-boardingNumber"]:has-text("${numero}")`,
  // Adicione outros seletores conforme necessário
};
