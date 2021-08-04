const axios = require('axios');

const accountCreationGateway = {

  async createAlpacaBrokerageAccount(alpacaAccountObject) {
    const alpacaReponse = await axios.post(process.env.ALPACA_ACCOUNT_ENDPOINT,
      alpacaAccountObject);
    return alpacaReponse;
  },

};

module.exports = accountCreationGateway;
