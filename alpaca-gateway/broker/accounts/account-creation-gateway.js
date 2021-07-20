const axios = require('axios');

const accountCreationGateway = {

  async createAccount(alpacaAccountObject) {
    return axios.post(process.env.ALPACA_ACCOUNT_ENDPOINT,
      alpacaAccountObject);
  },

};

module.exports = accountCreationGateway;
