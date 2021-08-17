/* eslint-disable max-len */
const snakeCaseKeys = require('snakecase-keys');

const alpacaAccountCreationGateway = require('../../../alpaca-gateway/broker/accounts/account-creation-gateway');

const accountCreationService = {

  async createBrokerageAccount(accountObject) {
    const alpacaAccountObject = snakeCaseKeys(accountObject, { deep: true });

    const alpacaResponse = await alpacaAccountCreationGateway.createAlpacaBrokerageAccount(alpacaAccountObject);

    const response = {
      success: alpacaResponse.success,
      message: alpacaResponse.alpacaMessage,
      status: alpacaResponse.status,
    };

    return response;
  },

};

module.exports = accountCreationService;
