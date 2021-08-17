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
        alpacaSuccess: true,
        alpacaStatus: alpacaResponse.status,
        alpacaMessage: alpacaResponse.data,
      };
    } catch (error) {
      // Handle alpaca error
      response = {
        alpacaSuccess: false,
        alpacaStatus: error.message,
        alpacaMessage: error,
      };
    }

    return response;
  },

};

module.exports = accountCreationGateway;
