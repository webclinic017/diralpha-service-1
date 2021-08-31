/* eslint-disable max-len */
const axios = require('axios');

const accountCreationGateway = {

  async updateAlpacaBrokerageAccount(accountId, alpacaAccountObject) {
    let response;

    try {
      // Send POST request to /v1/accounts endpoint on Alpaca
      const alpacaResponse = await axios({
        headers: {
          Authorization: process.env.ALPACA_AUTHORIZATION_HEADER,
        },
        method: 'PATCH',
        url: `${process.env.ALPACA_ACCOUNT_ENDPOINT}/${accountId}`,
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
        status: error.status,
        message: error,
      };
    }

    return response;
  },

};

module.exports = accountCreationGateway;
