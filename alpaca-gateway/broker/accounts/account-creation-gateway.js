const axios = require('axios');

const alpacaAccountEndpoint = 'https://CKQ76245TJS5U0EPO1TT:dM1IHTyDnp7wi6UzooIXl28DAAZ4fA6fLfQfMgrH@broker-api.sandbox.alpaca.markets/v1/accounts';

const accountCreationGateway = {

  async createAccount(res, alpacaAccountObject) {
    // TODO
    axios.post(alpacaAccountEndpoint,
      alpacaAccountObject)
      .then((response) => {
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        console.log('hey');
        // res.send('hi');
        return response;
      }, (error) => {
        console.log(error);
      });
  },
};

module.exports = accountCreationGateway;
