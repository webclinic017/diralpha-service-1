/* eslint-disable max-len */
const alpacaAccountCreationGateway = require('../../../alpaca-gateway/broker/accounts/account-creation-gateway');

const accountCreationService = {

  async createBrokerageAccount(alpacaAccountObject) {
    const alpacaResponse = await alpacaAccountCreationGateway.createAlpacaBrokerageAccount(alpacaAccountObject);

    return alpacaResponse;
  },

};

module.exports = accountCreationService;
