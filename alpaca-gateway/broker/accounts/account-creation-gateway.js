const axios = require('axios');

const alpacaAccountEndpoint = process.env.ALPACA_ACCOUNT_ENDPOINT;

const accountCreationGateWay = {

  async createAccount(alpacaAccountObject) {
    // TODO
    axios.post({
      alpacaAccountEndpoint,
      alpacaAccountObject,
    })
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        return response;
      }, (error) => {
        console.log(error);
      });
  },
};

module.exports = accountCreationGateWay;
