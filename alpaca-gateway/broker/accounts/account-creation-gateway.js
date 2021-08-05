const axios = require('axios');

const accountCreationGateway = {

  async createAlpacaBrokerageAccount(alpacaAccountObject) {
    let alpacaResponse;

    try {
      alpacaResponse = await axios.post(process.env.ALPACA_ACCOUNT_ENDPOINT, alpacaAccountObject);
    } catch (error) {
      alpacaResponse = {
        success: false,
        status: error.status,
        message: `Alpaca Error: ${error.message}`,
        timestamp: Date.now(),
        alpacaError: error,
      };
    }

    return alpacaResponse;
  },

};

module.exports = accountCreationGateway;
