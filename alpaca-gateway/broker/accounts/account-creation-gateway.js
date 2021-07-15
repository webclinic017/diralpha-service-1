const axios = require('axios');

const accountCreationGateway = {

  async createAccount(res, alpacaAccountObject) {
    // TODO
    axios.post(process.env.ALPACA_ACCOUNT_ENDPOINT,
      alpacaAccountObject)
      .then((response) => {
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        console.log(response.headers);
        return response;
      }, (error) => {
        console.log(error);
      });
  },
};

module.exports = accountCreationGateway;
