const accountCreationGateway = require('../../alpaca-gateway/broker/accounts/account-creation-gateway');

const accountsController = {

  register(req, res) {
    /* TODO:
        Need to check if user already has account registered. Users cannot multiple accounts
    */
    const response = accountCreationGateway.createAccount(res, req.body);

    console.log(`HI! ${response}`);
    response.then(
      (value) => {
        console.log(`VALUE: ${value}`);
        res.send('Hello');
      },
      (error) => {
        console.log(`ERROR: ${error}`);
        res.send(error);
      },
    );
  },

};

module.exports = accountsController;
