/* eslint-disable max-len */
const axios = require('axios');

const accountCreationGateway = {

  async createAlpacaBrokerageAccount(alpacaAccountObject) {
    let response;

    try {
      // Send POST request to /v1/accounts endpoint on Alpaca
      const alpacaResponse = await axios({
        headers: {
          Authorization: process.env.ALPACA_AUTHORIZATION_HEADER,
        },
        method: 'POST',
        url: process.env.ALPACA_ACCOUNT_ENDPOINT,
        data: alpacaAccountObject,
      });

      // Handle successfull alpaca response and attach data
      response = {
        success: true,
        status: alpacaResponse.status,
        message: alpacaResponse.data,
      };
    } catch (error) {
      // Handle alpaca error
      response = {
        success: false,
        status: error.message,
        message: error,
      };
    }

    return response;
  },

};

module.exports = accountCreationGateway;
