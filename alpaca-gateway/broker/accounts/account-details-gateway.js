const axios = require('axios');

const accountDetailsGateway = {

  async getAlpacaBrokerageAccountDetails(accountId) {
    let response;

    try {
      const alpacaResponse = await axios({
        headers: {
          Authorization: process.env.ALPACA_AUTHORIZATION_HEADER,
        },
        method: 'GET',
        url: `${process.env.ALPACA_ACCOUNT_ENDPOINT}/${accountId}`,
      });

      response = {
        success: true,
        message: alpacaResponse.data,
        status: alpacaResponse.status,
      };
    } catch (error) {
      response = {
        success: false,
        message: error,
      };
    }

    return response;
  },

};

module.exports = accountDetailsGateway;
