const accountCreationGateway = require('../../alpaca-gateway/broker/accounts/account-creation-gateway');

const accountsController = {

  register(req, res) {
    /* TODO:
        Need to check if user already has account registered. Users cannot multiple accounts
    */
    const response = accountCreationGateway.createAccount(res, req.body);

    res.send(`hi ${response}`);
  },

};

module.exports = accountsController;
